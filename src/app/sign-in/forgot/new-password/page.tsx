"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function NewPasswordPage() {
  const params = useSearchParams();
  const email = params.get("email") ?? "";

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function reset() {
    setLoading(true);
    setMsg("");

    const res = await fetch("/api/auth/reset", {
      method: "PUT",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setMsg("Something went wrong. Try again.");
      setLoading(false);
      return;
    }

    alert("Password updated! You may now sign in.");
    window.location.href = "/sign-in";
  }

  return (
    <div className="p-6 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-[#2F4157] text-center">
          Create New Password
        </h2>

        <p className="text-gray-600 text-center">
          Updating password for <b>{email}</b>
        </p>

        <input
          className="border rounded-xl w-full p-3 bg-[#F7F8FA] focus:outline-none focus:ring-2 focus:ring-[#E56668]"
          placeholder="New password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {msg && <p className="text-center text-sm text-[#E56668]">{msg}</p>}

        <button
          disabled={loading}
          onClick={reset}
          className="w-full py-3 rounded-full bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] disabled:bg-[#C04C4E]"
        >
          {loading ? "Updating…" : "Update Password"}
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