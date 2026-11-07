import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// POST: Insert notif baru (dari server action / logic lain)
export async function POST(req: NextRequest) {
  // PENTING: Wajib pakai await di Next.js versi baru
  const cookieStore = await cookies(); 
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // service role untuk bypass RLS
    { cookies: { get: (n) => cookieStore.get(n)?.value } }
  );

  try {
    const body = await req.json();
    const { user_id, type, title, message, link } = body;

    const { error } = await supabase.from("notifications").insert({
      user_id, type, title, message, link,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PATCH: Mark as read
export async function PATCH(req: NextRequest) {
  // PENTING: Wajib pakai await di Next.js versi baru
  const cookieStore = await cookies(); 
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (n) => cookieStore.get(n)?.value } }
  );

  try {
    const { id, markAllRead } = await req.json();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (markAllRead) {
      await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", user.id);
    } else {
      await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", id)
        .eq("user_id", user.id); // Guard tambahan: mastiin dia cuma bisa read notifnya sendiri
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}