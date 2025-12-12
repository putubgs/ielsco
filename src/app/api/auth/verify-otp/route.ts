// pages/api/auth/verify-otp.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { compareOtp } from "@/lib/otp";
import bcrypt from "bcryptjs";
import { randomBytes } from "crypto";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
  if (req.method !== "POST") return res.status(405).end();

  const { email, code, purpose = "signup", name, password } = req.body;
  if (!email || !code) return res.status(400).json({ error: "Missing fields" });

  const record = await prisma.otp.findFirst({
    where: {
      email,
      purpose,
      used: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!record) return res.status(400).json({ error: "No valid OTP found" });

  const ok = await compareOtp(code, record.codeHash);
  if (!ok) return res.status(400).json({ error: "Invalid code" });

  // mark used
  await prisma.otp.update({ where: { id: record.id }, data: { used: true } });

  // create user if not exists
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    let passHash = null;
    if (password) {
      passHash = await bcrypt.hash(password, 10);
    }

    user = await prisma.user.create({
      data: {
        email,
        name: name ?? null,
        passwordHash: passHash,
      },
    });
  }

  // Optionally create a session token (or return success and let NextAuth handle)
  // Return user basic
  res.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } });
  return Response.json(
  { error: "OTP_INVALID" },
  { status: 400 }
);

}