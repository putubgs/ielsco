import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, password } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "MISSING_FIELDS" },
        { status: 400 }
      );
    }

    // 1. Check if user already exists
    const existing = await prisma.users.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "EMAIL_ALREADY_EXISTS" },
        { status: 400 }
      );
    }

    // 2. Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 3. Create user
    const user = await prisma.users.create({
      data: {
        full_name: fullName,
        email,
        password_hash: passwordHash,
      },
    });

    return NextResponse.json(
      {
        message: "USER_CREATED",
        user: {
          id: user.id,
          email: user.email,
          displayName: user.full_name,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("SIGN-UP ERROR:", err);
    return NextResponse.json(
      { error: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}