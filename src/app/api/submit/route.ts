import { NextResponse } from "next/server";
import { sendResultEmail } from "@/utils/emails";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, message: "Empty body" }, { status: 400 });
    }

    const { name, email, access, answers } = body;
    if (!email || !name) {
      return NextResponse.json({ ok: false, message: "Missing name or email" }, { status: 400 });
    }

    const summaryHtml = `
      <h3>Test Summary</h3>
      <p><strong>Access Code:</strong> ${access}</p>
      <p><strong>Sections Completed:</strong> ${Object.keys(answers || {}).join(", ")}</p>
    `;

    await sendResultEmail(name, email, summaryHtml);
    return NextResponse.json({ ok: true, message: "Result submitted and email sent" });
  } catch (error) {
    console.error("Error in /api/submit:", error);
    return NextResponse.json({ ok: false, message: "Server error" }, { status: 500 });
  }
}
