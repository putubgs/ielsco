"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyOtpForgotClient() {
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
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-[#2F4157]">
          Verify OTP
        </h2>

        <p className="text-center text-gray-600">
          We sent a 6-digit code to <b>{email}</b>
        </p>

        <input
          placeholder="Enter OTP"
          className="w-full rounded-xl border bg-[#F7F8FA] px-4 py-3 focus:ring-2 focus:ring-[#E56668]"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {msg && <p className="text-center text-sm text-[#E56668]">{msg}</p>}

        <button
          disabled={loading}
          onClick={verify}
          className="w-full rounded-full bg-[#E56668] py-3 text-white font-semibold hover:bg-[#C04C4E] disabled:bg-[#C04C4E]"
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