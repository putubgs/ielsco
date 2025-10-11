import { NextResponse } from "next/server";
import codes from "@/data/codes.json";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ ok: false, message: "Code is required." }, { status: 400 });
    }

    const found = codes.find((c: { code: string; used: boolean }) => c.code === code);

    if (!found) {
      return NextResponse.json({ ok: false, message: "Invalid code." }, { status: 400 });
    }

    if (found.used) {
      return NextResponse.json({ ok: false, message: "Code already used." }, { status: 400 });
    }

    // ✅ SUCCESS
    return NextResponse.json({ ok: true, code });
  } catch (error) {
    console.error("Error validating code:", error);
    return NextResponse.json({ ok: false, message: "Server error." }, { status: 500 });
  }
}