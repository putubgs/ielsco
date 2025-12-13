import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ⚠️ DEV MODE: OTP AUTO-VALID
export async function POST(req: Request) {
  const { email, name, password } = await req.json();

  if (!email) {
    return NextResponse.json(
      { error: "EMAIL_REQUIRED" },
      { status: 400 }
    );
  }

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        fullName: name ?? null,
        passwordHash: password ?? null, // TODO: hash later
      },
    });
  }

  console.log("[DEV] OTP auto-verified for:", email);

  return NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}