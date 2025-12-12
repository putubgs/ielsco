// pages/api/auth/reset.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { compareOtp } from "@/lib/otp";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { email, code, password } = req.body;
  if (!email || !code || !password) return res.status(400).json({ error: "Missing fields" });

  const record = await prisma.otp.findFirst({
    where: { email, purpose: "reset", used: false, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
  });

  if (!record) return res.status(400).json({ error: "No valid OTP" });
  const ok = await compareOtp(code, record.codeHash);
  if (!ok) return res.status(400).json({ error: "Invalid code" });

  await prisma.otp.update({ where: { id: record.id }, data: { used: true } });

  const passHash = await bcrypt.hash(password, 10);
  await prisma.user.update({ where: { email }, data: { passwordHash: passHash } });

  res.json({ ok: true });
}