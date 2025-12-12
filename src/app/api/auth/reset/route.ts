import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { compareOtp } from "@/lib/otp";

export async function POST(req: Request) {
  try {
    const { email, code, password } = await req.json();

    if (!email || !code || !password) {
      return NextResponse.json(
        { error: "MISSING_FIELDS" },
        { status: 400 }
      );
    }

    const record = await prisma.otp.findFirst({
      where: {
        email,
        purpose: "reset",
        expiresAt: { gt: new Date() },
        used: false, // pastikan field kamu ini bernama isUsed
      },
      orderBy: { createdAt: "desc" },
    });

    if (!record) {
      return NextResponse.json(
        { error: "NO_VALID_OTP" },
        { status: 400 }
      );
    }

    const ok = await compareOtp(code, record.codeHash);
    if (!ok) {
      return NextResponse.json(
        { error: "INVALID_CODE" },
        { status: 400 }
      );
    }

    await prisma.otp.update({
      where: { id: record.id },
      data: { used: true },
    });

    const hash = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email },
      data: { passwordHash: hash },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("RESET ERROR:", err);
    return NextResponse.json(
      { error: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}