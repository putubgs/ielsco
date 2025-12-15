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

  let user = await prisma.users.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.users.create({
      data: {
        email,
        full_name: name ?? null,
        password_hash: password ?? null, // TODO: hash later
      },
    });
  }

  console.log("[DEV] OTP auto-verified for:", email);

  return NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
    },
  });
}