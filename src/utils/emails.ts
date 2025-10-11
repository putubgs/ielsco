import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export async function sendResultEmail(
  name: string,
  email: string,
  summaryHtml = ""
) {
  if (!resend) {
    // No API key — skip real send in dev; log on server
    console.log("[EMAIL SKIPPED] No RESEND_API_KEY configured. Would send to:", email);
    return { ok: true, skipped: true };
  }

  const html = `
    <div style="font-family: Inter, Arial, sans-serif; color:#173E8C">
      <h2>Hi ${name},</h2>
      <p>Thank you for completing the IELS mock IELTS test. We received your submission.</p>
      <p>You will receive personalized feedback from an IELS teacher within 24 hours.</p>
      ${summaryHtml ? `<hr/>${summaryHtml}` : ""}
      <p>Best regards,<br/><strong>IELS Academic Team</strong></p>
    </div>
  `;

  const res = await resend.emails.send({
    from: "IELS Mock Test <no-reply@ielsco.com>",
    to: [email, "hello@ielsco.com"],
    subject: "Your IELS Mock Test Submission",
    html,
  });

  return res;
}
