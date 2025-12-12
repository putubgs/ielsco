// pages/api/auth/send-otp.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { makeOtpCode, hashOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/email";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, purpose = "signup" } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  const code = makeOtpCode(6);
  const codeHash = await hashOtp(code);

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.otp.create({
    data: {
      email,
      codeHash,
      purpose,
      expiresAt,
    },
  });

  // send email (async)
  try {
    await sendOtpEmail(email, code, purpose);
    return res.json({ ok: true, message: "OTP sent" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to send email" });
  }
}