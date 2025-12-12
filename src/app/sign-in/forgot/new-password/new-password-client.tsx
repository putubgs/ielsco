"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function NewPasswordClient() {
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
      setMsg("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    window.location.href = "/sign-in";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-[#2F4157]">
          Create New Password
        </h2>

        <p className="text-center text-gray-600">
          Updating password for <b>{email}</b>
        </p>

        <input
          type="password"
          placeholder="New password"
          className="w-full rounded-xl border bg-[#F7F8FA] px-4 py-3 focus:ring-2 focus:ring-[#E56668]"
          onChange={(e) => setPassword(e.target.value)}
        />

        {msg && <p className="text-center text-sm text-[#E56668]">{msg}</p>}

        <button
          disabled={loading}
          onClick={reset}
          className="w-full rounded-full bg-[#E56668] py-3 text-white font-semibold hover:bg-[#C04C4E] disabled:bg-[#C04C4E]"
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