"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    setFeedback(null);

    const res = await fetch("/api/auth/forgot", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setFeedback({ type: "error", msg: "We couldn't find an account with that email." });
      setLoading(false);
      return;
    }

    setFeedback({ type: "success", msg: "A 6-digit OTP has been sent to your email! 📩" });

    setTimeout(() => {
      window.location.href = `/sign-in/forgot/verify?email=${email}`;
    }, 800);
  }

  return (
    <div className="p-6 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-[#2F4157] text-center">
          Forgot Your Password?
        </h2>

        <p className="text-gray-600 text-center">
          Enter your email and we'll send you an OTP to reset your password.
        </p>

        <input
          className="border rounded-xl w-full p-3 bg-[#F7F8FA] focus:outline-none focus:ring-2 focus:ring-[#E56668]"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {feedback && (
          <p className={`text-sm text-center ${
            feedback.type === "error" ? "text-[#E56668]" : "text-green-600"
          }`}>
            {feedback.msg}
          </p>
        )}

        <button
          disabled={loading}
          onClick={submit}
          className="w-full py-3 rounded-full bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] disabled:bg-[#C04C4E]"
        >
          {loading ? "Sending OTP…" : "Send OTP"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Remember your password?{" "}
          <a href="/sign-in" className="text-[#E56668] font-semibold hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}