"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function VerifyContent() {
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  async function submit() {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, code, purpose: "signup" }),
    });

    const data = await res.json();
    if (!res.ok) return setMsg(data.error || "Invalid code");

    window.location.href = "/dashboard";
  }

  return (
    <div className="p-10 max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-[#2F4157]">Verify Your Email</h2>

      <p className="text-gray-600">
        We sent a 6-digit code to <b>{email}</b>
      </p>

      <input
        className="border rounded-xl w-full p-3 bg-[#F7F8FA] focus:outline-none focus:ring-2 focus:ring-[#E56668]"
        placeholder="Enter OTP"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        className="w-full py-3 rounded-full bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] disabled:bg-[#C04C4E] transition active:scale-[0.97]"
        onClick={submit}
      >
        Verify
      </button>

      {msg && <p className="text-red-500 text-sm">{msg}</p>}
    </div>
  );
}