import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  // DI SINI FIX-NYA: params sekarang harus berwujud Promise 👇
  { params }: { params: Promise<{ transactionId: string }> } 
) {
  try {
    // KITA AWAIT PARAMS-NYA DULU BUAT NGAMBIL ID-NYA 👇
    const { transactionId } = await params; 
    
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

    const { data: transaction, error } = await supabase
      .from("transactions")
      .select("*")
      // PAKE VARIABEL YANG UDAH DI-AWAIT TADI 👇
      .eq("id", transactionId) 
      .eq("user_id", user.id)
      .single();

    if (error || !transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json({
      status: transaction.status,
      transaction: transaction,
    });

  } catch (error) {
    console.error("Status check error:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}