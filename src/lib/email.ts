// lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendOtpEmail(to: string, code: string, purpose: string) {
  return await resend.emails.send({
    from: "IELS <onboarding@resend.dev>",
    to,
    subject: purpose === "signup" ? "Your IELS Verification Code" : "Reset Your Password",
    html: `
      <div style="font-family:Arial; padding:20px;">
        <h2>Your IELS Verification Code</h2>
        <p>Your one-time code is:</p>
        <h1 style="font-size:32px; letter-spacing:4px;">${code}</h1>
        <p>This code expires in 10 minutes.</p>
      </div>
    `,
  });
}