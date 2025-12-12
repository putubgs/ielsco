"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyOtpForgotPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") ?? "";

  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function verify() {
    setLoading(true);
    setMsg("");

    const res = await fetch("/api/auth/reset", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });

    if (!res.ok) {
      setMsg("Incorrect OTP. Please try again.");
      setLoading(false);
      return;
    }

    router.push(`/sign-in/forgot/new-password?email=${email}`);
  }

  return (
    <div className="p-6 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-[#2F4157] text-center">
          Verify OTP
        </h2>

        <p className="text-gray-600 text-center">
          We sent a 6-digit code to <b>{email}</b>
        </p>

        <input
          className="border rounded-xl w-full p-3 bg-[#F7F8FA] focus:outline-none focus:ring-2 focus:ring-[#E56668]"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {msg && <p className="text-center text-sm text-[#E56668]">{msg}</p>}

        <button
          disabled={loading}
          onClick={verify}
          className="w-full py-3 rounded-full bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] disabled:bg-[#C04C4E]"
        >
          {loading ? "Verifying…" : "Verify"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Didn’t receive the email? Check your spam folder.
        </p>
      </div>
    </div>
  );
}