import { prisma } from "@/lib/prisma";

// ⚠️ DEV MODE: EMAIL & OTP DISABLED
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: "EMAIL_REQUIRED" }, { status: 400 });
    }

    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      // NOTE: jangan leak info user existence di production
      return Response.json({ error: "EMAIL_NOT_FOUND" }, { status: 404 });
    }

    // TODO: ENABLE OTP GENERATION & EMAIL
    // const code = makeOtpCode(6)
    // await prisma.otp.create(...)
    // await sendOtpEmail(...)

    console.log("[DEV] Forgot password requested for:", email);

    return Response.json({
      ok: true,
      message: "OTP flow disabled (DEV MODE)",
    });
  } catch (err) {
    console.error("FORGOT ERROR:", err);
    return Response.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}