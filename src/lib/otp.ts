// src/lib/otp.ts
import bcrypt from "bcryptjs";

export function makeOtpCode(length = 6) {
  // numeric OTP
  const digits = "0123456789";
  let code = "";
  for (let i = 0; i < length; i++) code += digits[Math.floor(Math.random() * digits.length)];
  return code;
}

export async function hashOtp(code: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(code, salt);
}

export async function compareOtp(code: string, hash: string) {
  return bcrypt.compare(code, hash);
}