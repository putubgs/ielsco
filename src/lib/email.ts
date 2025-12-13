export async function sendOtpEmail(
  email: string,
  code: string,
  purpose: string
) {
  console.log("[EMAIL DISABLED]", { email, code, purpose });

  // TODO: enable SMTP later
  return true;
}