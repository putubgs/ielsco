// pages/api/auth/forgot.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { makeOtpCode, hashOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/email";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  // optionally verify user exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: "User not found" });

  const code = makeOtpCode();
  const codeHash = await hashOtp(code);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.otp.create({ data: { email, codeHash, purpose: "reset", expiresAt } });

  await sendOtpEmail(email, code, "Reset your IELS password");
  res.json({ ok: true });

return Response.json(
  { error: "EMAIL_NOT_FOUND" },
  { status: 400 }
);
}