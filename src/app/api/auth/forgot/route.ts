import { prisma } from "@/lib/prisma";
import { sendOtpEmail } from "@/lib/email";
import { makeOtpCode, hashOtp } from "@/lib/otp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return Response.json({ error: "EMAIL_REQUIRED" }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json({ error: "EMAIL_NOT_FOUND" }, { status: 404 });
    }

    // Generate OTP
    const code = makeOtpCode(6);
    const codeHash = await hashOtp(code);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.otp.create({
      data: {
        email,
        codeHash,
        purpose: "forgot",
        expiresAt,
      },
    });

    // Send OTP
    await sendOtpEmail(email, code, "forgot");

    return Response.json({ ok: true, message: "OTP sent!" });
  } catch (err) {
    console.error("FORGOT OTP ERROR:", err);
    return Response.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}