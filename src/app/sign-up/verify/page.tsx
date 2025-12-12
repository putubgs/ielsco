"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function VerifyOtpPage() {
  const params = useSearchParams();
  const email = params.get("email") || "";

  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  async function submit() {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, code, purpose: "signup" }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error || "Invalid code");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <div className="p-10 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Verify Your Email</h2>

      <p className="text-gray-600">We sent a 6-digit code to <b>{email}</b></p>

      <input
        className="border w-full p-3 rounded"
        placeholder="Enter OTP"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        className="w-full bg-[#E56668] text-white py-3 rounded"
        onClick={submit}
      >
        Verify
      </button>

      {msg && <p className="text-red-500 text-sm">{msg}</p>}
    </div>
  );
}