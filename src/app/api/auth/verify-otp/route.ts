import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { compareOtp } from "@/lib/otp";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, code, purpose = "signup", name, password } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "MISSING_FIELDS" },
        { status: 400 }
      );
    }

    const record = await prisma.otp.findFirst({
      where: {
        email,
        purpose,
        used: false,
        expiresAt: { gt: new Date() },
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
      return NextResponse.json({ error: "INVALID_OTP" }, { status: 400 });
    }

    await prisma.otp.update({
      where: { id: record.id },
      data: { used: true },
    });

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const passHash = password ? await bcrypt.hash(password, 10) : null;

      user = await prisma.user.create({
        data: {
          email,
          fullName: name ?? null,
          passwordHash: passHash,
        },
      });
    }

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}