// src/app/api/validate/route.ts
import { NextResponse } from "next/server";
import { VALID_CODES } from "@/data/test/codes"; // Import file yang baru dibuat

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, name, email } = body;

    // Cari Access Code di list VALID_CODES yang diimport
    const foundEntry = VALID_CODES.find((item) => item.code === code.trim());

    if (!foundEntry) {
      return NextResponse.json(
        { ok: false, message: "Access Code not found. Please check your registration email." },
        { status: 404 }
      );
    }

    // Logic lain (cek used, dll) sama seperti sebelumnya...
    if (foundEntry.used) {
       if (foundEntry.email !== email) {
         return NextResponse.json(
           { ok: false, message: "This code has already been used." },
           { status: 400 }
         );
       }
    }

    return NextResponse.json({ 
      ok: true, 
      message: "Access Granted. Good luck!",
      data: foundEntry 
    }, { status: 200 });

  } catch (error) {
    console.error("Validation Error:", error);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}