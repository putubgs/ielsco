import { NextResponse } from "next/server";

// ⚠️ DEV MODE: OTP DISABLED
export async function POST(req: Request) {
  const { email, purpose = "signup" } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "EMAIL_REQUIRED" }, { status: 400 });
  }

  console.log("[DEV] send-otp skipped:", { email, purpose });

  return NextResponse.json({
    ok: true,
    message: "OTP disabled (DEV MODE)",
  });
}