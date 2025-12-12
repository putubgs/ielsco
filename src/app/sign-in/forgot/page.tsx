"use client";

import { useState } from "react";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    setMsg("");
    setError("");

    const res = await fetch("/api/auth/forgot", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError("We couldn't find an account with that email.");
      return;
    }

    setMsg("We just sent a 6-digit OTP to your inbox! 📩");
    window.location.href = "/sign-in/reset?email=" + email;
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#2F4157]">
        Reset your password
      </h2>

      <input
        className="border rounded-xl w-full p-3 bg-[#F7F8FA]"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {error && <p className="text-[#E56668] text-sm mt-2">{error}</p>}
      {msg && <p className="text-green-600 text-sm mt-2">{msg}</p>}

      <button
        className="mt-4 w-full bg-[#E56668] text-white py-3 rounded-full hover:bg-[#C04C4E]"
        onClick={submit}
      >
        Send OTP
      </button>
    </div>
  );
}