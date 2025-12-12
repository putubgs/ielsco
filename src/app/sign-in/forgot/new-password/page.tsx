"use client";
import { useState } from "react";

export default function NewPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function reset() {
    await fetch("/api/auth/reset", {
      method: "PUT",
      body: JSON.stringify({ email, password }),
    });

    alert("Password updated! You may now sign in.");
    window.location.href = "/sign-in";
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create new password</h2>

      <input
        className="border w-full p-3 rounded"
        placeholder="Your email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border w-full p-3 rounded mt-2"
        placeholder="New password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="mt-4 w-full bg-[#E56668] text-white py-3 rounded"
        onClick={reset}
      >
        Update Password
      </button>
    </div>
  );
}