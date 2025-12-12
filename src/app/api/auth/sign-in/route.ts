// pages/api/auth/sign-in.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import bcrypt, { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email & password required" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  if (!user) {
  return Response.json(
    { error: "EMAIL_NOT_FOUND" },
    { status: 400 }
  );
}

  const valid = await compare(password, user.passwordHash);
  if (!valid) {
  return Response.json(
    { error: "WRONG_PASSWORD" },
    { status: 400 }
    );
}

  // sign simple JWT (or use NextAuth session)
  const token = sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

  res.json({ ok: true, token, user: { id: user.id, email: user.email, name: user.fullName } });
}