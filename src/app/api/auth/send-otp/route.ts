import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { makeOtpCode, hashOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email, purpose = "signup" } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "EMAIL_REQUIRED" }, { status: 400 });
    }

    const code = makeOtpCode(6);
    const codeHash = await hashOtp(code);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.otp.create({
      data: {
        email,
        codeHash,
        purpose,
        expiresAt,
        used: false,
      },
    });

    await sendOtpEmail(email, code, purpose);

    return NextResponse.json({ ok: true, message: "OTP_SENT" });
  } catch (err) {
    console.error("SEND OTP ERROR:", err);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}