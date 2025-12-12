"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyForgotPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  async function verify() {
    const r = await fetch("/api/auth/reset", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });

    if (r.ok) {
      router.push("/forgot/new-password");
    } else {
      setMsg("Incorrect OTP ❌");
    }
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>

      <input
        className="border w-full p-3 rounded"
        placeholder="Your email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border w-full p-3 rounded mt-2"
        placeholder="OTP code"
        onChange={(e) => setOtp(e.target.value)}
      />

      <button className="mt-4 w-full bg-[#E56668] text-white py-3 rounded"
        onClick={verify}
      >
        Verify
      </button>

      {msg && <p className="text-sm mt-3 text-red-500">{msg}</p>}
    </div>
  );
}