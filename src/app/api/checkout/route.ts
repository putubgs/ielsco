// app/api/checkout/route.ts
// Handles payment checkout creation with Mayar

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Mayar API Config
const MAYAR_API_KEY = process.env.MAYAR_API_KEY!;
const MAYAR_API_URL = 'https://api.mayar.id/v1';

// Pricing structure
const PRICING = {
  insider: {
    monthly: 25000,
    yearly: 200000
  },
  visionary: {
    lifetime: 500000
  }
};

export async function POST(request: NextRequest) {
  try {
    // FIX: Next.js 15 cookies() is async, must use await
    const cookieStore = await cookies();

    // 1. Initialize Supabase Server Client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value, ...options });
            } catch (error) {
              // Handle error if called from a component that doesn't support setting cookies
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value: '', ...options });
            } catch (error) {
              // Handle error if called from a component that doesn't support deleting cookies
            }
          },
        },
      }
    );
    
    // 2. Verify authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 3. Parse request body
    const { tier, cycle } = await request.json();
    
    // Validate tier
    if (!tier || !['insider', 'visionary'].includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier' },
        { status: 400 }
      );
    }

    // 4. Calculate amount
    let amount: number;
    let billingCycle: string;

    if (tier === 'insider') {
      if (!cycle || !['monthly', 'yearly'].includes(cycle)) {
        return NextResponse.json(
          { error: 'Invalid billing cycle for Insider' },
          { status: 400 }
        );
      }
      amount = PRICING.insider[cycle as 'monthly' | 'yearly'];
      billingCycle = cycle;
    } else {
      amount = PRICING.visionary.lifetime;
      billingCycle = 'lifetime';
    }

    // 5. Check if user already has this tier or higher
    const { data: existingMembership } = await supabase
      .from('memberships')
      .select('tier, status')
      .eq('user_id', user.id)
      .single();

    if (existingMembership?.status === 'active') {
      const tierHierarchy: Record<string, number> = { explorer: 1, insider: 2, visionary: 3 };
      const currentRank = tierHierarchy[existingMembership.tier] || 0;
      const targetRank = tierHierarchy[tier as string] || 0;

      if (currentRank >= targetRank) {
        return NextResponse.json(
          { error: 'You already have this tier or higher' },
          { status: 400 }
        );
      }
    }

    // 6. Create payment with Mayar
    const mayarResponse = await fetch(`${MAYAR_API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAYAR_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amount,
        currency: 'IDR',
        customer: {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || 'IELS Member'
        },
        description: `IELS ${tier === 'visionary' ? 'Visionary' : 'Insider'} - ${billingCycle}`,
        redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mayar`,
        metadata: {
          user_id: user.id,
          tier: tier,
          billing_cycle: billingCycle
        }
      })
    });

    if (!mayarResponse.ok) {
      const error = await mayarResponse.json();
      console.error('Mayar API Error:', error);
      return NextResponse.json(
        { error: 'Failed to create payment session' },
        { status: 500 }
      );
    }

    const mayarData = await mayarResponse.json();

    // 7. Create pending membership logic
    let expiresAt: string | null = null;
    
    if (tier !== 'visionary') {
      const now = new Date();
      if (cycle === 'monthly') {
        now.setDate(now.getDate() + 30);
      } else if (cycle === 'yearly') {
        now.setDate(now.getDate() + 365);
      }
      expiresAt = now.toISOString();
    }

    const { data: membership, error: membershipError } = await supabase
      .from('memberships')
      .upsert({
        user_id: user.id,
        tier: tier,
        billing_cycle: billingCycle,
        status: 'pending',
        amount_paid: amount,
        payment_method: 'mayar',
        expires_at: expiresAt,
        mayar_payment_id: mayarData.id,
        mayar_customer_id: mayarData.customer.id
      }, {
        onConflict: 'user_id'
      })
      .select()
      .single();

    if (membershipError) {
      console.error('Membership creation error:', membershipError);
      return NextResponse.json(
        { error: 'Failed to create membership record' },
        { status: 500 }
      );
    }

    // 8. Create payment transaction record
    // Mayar response field: 'link' (checkout page)
    const paymentLink = mayarData.link || mayarData.checkout_url;

    await supabase
      .from('payment_transactions')
      .insert({
        user_id: user.id,
        membership_id: membership.id,
        amount: amount,
        tier: tier,
        billing_cycle: billingCycle,
        payment_method: 'mayar',
        status: 'pending',
        mayar_payment_id: mayarData.id,
        mayar_payment_url: paymentLink,
        mayar_checkout_url: paymentLink
      });

    // 9. Return payment URL
    return NextResponse.json({
      success: true,
      paymentUrl: paymentLink,
      sessionId: mayarData.id
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}