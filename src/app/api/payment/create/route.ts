import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from "next/headers";

const MAYAR_API_KEY = process.env.MAYAR_API_KEY!;
const MAYAR_BASE_URL = "https://api.mayar.id/ks/api/v1";

interface PaymentRequest {
  tier: "pro" | "premium" | "visionary";
  duration: number; // months
}

const tierPricing: Record<string, { name: string; price: number; firstMonthPrice?: number }> = {
  pro: {
    name: "Insider Membership",
    price: 129000,
    firstMonthPrice: 99000,
  },
  premium: {
    name: "Visionary Membership",
    price: 249000,
    firstMonthPrice: 199000,
  },
};

export async function POST(request: NextRequest) {
  try {
    // TAMBAHIN AWAIT DI SINI 👇
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            try { cookieStore.set({ name, value, ...options }); } catch (error) {}
          },
          remove(name: string, options: CookieOptions) {
            try { cookieStore.set({ name, value: '', ...options }); } catch (error) {}
          },
        },
      }
    );
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: PaymentRequest = await request.json();
    const { tier, duration } = body;

    if (!tier || !tierPricing[tier]) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    const { data: existingMembership } = await supabase
      .from("memberships")
      .select("*")
      .eq("user_id", user.id)
      .single();

    const isNewCustomer = !existingMembership;
    const pricing = tierPricing[tier];
    const amount = isNewCustomer && pricing.firstMonthPrice 
      ? pricing.firstMonthPrice 
      : pricing.price;

    const { data: transaction, error: txError } = await supabase
      .from("transactions")
      .insert({
        user_id: user.id,
        tier: tier,
        amount: amount,
        currency: "IDR",
        status: "pending",
        duration_months: duration,
        metadata: {
          user_email: user.email,
          tier_name: pricing.name,
        },
      })
      .select()
      .single();

    if (txError || !transaction) {
      console.error("Failed to create transaction:", txError);
      return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
    }

    const mayarResponse = await fetch(`${MAYAR_BASE_URL}/payment-links/`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MAYAR_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${pricing.name} - ${duration} Month${duration > 1 ? 's' : ''}`,
        amount: amount,
        description: `IELS Lounge ${pricing.name} subscription for ${duration} month${duration > 1 ? 's' : ''}`,
        redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/community?payment=success&new=${isNewCustomer}&tx=${transaction.id}`,
        cancel_redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/community?payment=cancelled`,
        callback_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/mayar-webhook`,
        metadata: {
          transaction_id: transaction.id,
          user_id: user.id,
          tier: tier,
          duration: duration,
        },
      }),
    });

    if (!mayarResponse.ok) {
      const errorData = await mayarResponse.json();
      console.error("Mayar API error:", errorData);
      
      await supabase
        .from("transactions")
        .update({ status: "failed" })
        .eq("id", transaction.id);
      
      return NextResponse.json(
        { error: "Failed to create payment link" }, 
        { status: 500 }
      );
    }

    const mayarData = await mayarResponse.json();
    
    await supabase
      .from("transactions")
      .update({
        mayar_order_id: mayarData.data.payment_link_id,
        payment_url: mayarData.data.link,
      })
      .eq("id", transaction.id);

    return NextResponse.json({
      success: true,
      payment_url: mayarData.data.link,
      transaction_id: transaction.id,
    });

  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}