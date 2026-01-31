// app/api/webhooks/mayar/route.ts
// Handles payment status updates from Mayar

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Use service role key for privileged operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Required for bypassing RLS
);

const MAYAR_WEBHOOK_SECRET = process.env.MAYAR_WEBHOOK_SECRET!;

// Verify Mayar webhook signature
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: NextRequest) {
  try {
    // 1. Get raw body and signature
    const body = await request.text();
    const signature = request.headers.get('x-mayar-signature');

    if (!signature) {
      console.error('Missing webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // 2. Verify signature
    if (!verifyWebhookSignature(body, signature, MAYAR_WEBHOOK_SECRET)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // 3. Parse webhook data
    const event = JSON.parse(body);
    const { type, data } = event;

    console.log('Mayar webhook received:', type, data.id);

    // 4. Handle different event types
    switch (type) {
      case 'payment.success':
      case 'payment.completed':
        await handlePaymentSuccess(data);
        break;

      case 'payment.failed':
      case 'payment.expired':
        await handlePaymentFailed(data);
        break;

      case 'subscription.cancelled':
        await handleSubscriptionCancelled(data);
        break;

      default:
        console.log('Unhandled webhook type:', type);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// ============================================
// PAYMENT SUCCESS HANDLER
// ============================================
async function handlePaymentSuccess(data: any) {
  const paymentId = data.id;
  const userId = data.metadata?.user_id;
  const tier = data.metadata?.tier;

  if (!userId || !tier) {
    console.error('Missing metadata in payment:', paymentId);
    return;
  }

  console.log(`Processing successful payment for user ${userId}, tier ${tier}`);

  // 1. Update membership to active
  const { error: membershipError } = await supabase
    .from('memberships')
    .update({
      status: 'active',
      started_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('mayar_payment_id', paymentId);

  if (membershipError) {
    console.error('Failed to activate membership:', membershipError);
    throw membershipError;
  }

  // 2. Update payment transaction
  const { error: transactionError } = await supabase
    .from('payment_transactions')
    .update({
      status: 'success',
      paid_at: new Date().toISOString()
    })
    .eq('mayar_payment_id', paymentId);

  if (transactionError) {
    console.error('Failed to update transaction:', transactionError);
  }

  // 3. Update user's current_tier (trigger will handle this, but belt-and-suspenders)
  const { error: userError } = await supabase
    .from('users')
    .update({
      current_tier: tier,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);

  if (userError) {
    console.error('Failed to update user tier:', userError);
  }

  // 4. TODO: Send confirmation email
  console.log(`✅ Successfully activated ${tier} for user ${userId}`);
}

// ============================================
// PAYMENT FAILED HANDLER
// ============================================
async function handlePaymentFailed(data: any) {
  const paymentId = data.id;
  const userId = data.metadata?.user_id;

  console.log(`Payment failed for user ${userId}: ${paymentId}`);

  // Update membership to failed
  await supabase
    .from('memberships')
    .update({
      status: 'expired',
      updated_at: new Date().toISOString()
    })
    .eq('mayar_payment_id', paymentId);

  // Update transaction
  await supabase
    .from('payment_transactions')
    .update({
      status: 'failed',
      expired_at: new Date().toISOString()
    })
    .eq('mayar_payment_id', paymentId);

  // TODO: Send failure notification email
  console.log(`❌ Payment failed for user ${userId}`);
}

// ============================================
// SUBSCRIPTION CANCELLED HANDLER
// ============================================
async function handleSubscriptionCancelled(data: any) {
  const subscriptionId = data.id;
  const userId = data.metadata?.user_id;

  console.log(`Subscription cancelled for user ${userId}: ${subscriptionId}`);

  // Mark membership as cancelled (keep active until expires_at)
  await supabase
    .from('memberships')
    .update({
      status: 'cancelled',
      cancelled_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('mayar_subscription_id', subscriptionId);

  // TODO: Send cancellation confirmation email
  console.log(`🚫 Subscription cancelled for user ${userId}`);
}

// ============================================
// HELPER: Check and downgrade expired memberships
// (Run this via cron job or scheduled function)
// ============================================
export async function checkExpiredMemberships() {
  const { data: expiredMemberships } = await supabase
    .from('memberships')
    .select('id, user_id')
    .eq('status', 'active')
    .not('expires_at', 'is', null)
    .lt('expires_at', new Date().toISOString());

  if (expiredMemberships && expiredMemberships.length > 0) {
    console.log(`Found ${expiredMemberships.length} expired memberships`);

    for (const membership of expiredMemberships) {
      // Downgrade to explorer
      await supabase
        .from('memberships')
        .update({
          tier: 'explorer',
          status: 'expired',
          updated_at: new Date().toISOString()
        })
        .eq('id', membership.id);

      // Update user tier
      await supabase
        .from('users')
        .update({
          current_tier: 'explorer',
          updated_at: new Date().toISOString()
        })
        .eq('id', membership.user_id);

      console.log(`⬇️ Downgraded user ${membership.user_id} to Explorer`);
    }
  }
}