"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AccessPage() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      setStatus({ ok: false, message: "Please enter your access code." });
      return;
    }

    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code: trimmed }),
      });
      const json = await res.json();
      if (!json.ok) {
        setStatus({ ok: false, message: json.message || "Invalid code" });
        return;
      }

      // store locally for test flow
      localStorage.setItem("accessCode", trimmed);
      router.push(`/test/ielts?access=${encodeURIComponent(trimmed)}`);
    } catch (err) {
      setStatus({ ok: false, message: "Network or server error." });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6">
      <form onSubmit={submit} className="w-full max-w-md border rounded-2xl shadow p-8 bg-white">
        <h1 className="text-2xl font-bold text-[#173E8C] mb-4">Enter Your Access Code</h1>
        <input
          className="w-full border rounded-xl p-3 mb-3"
          placeholder="e.g. IELS-001"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {status && <p className={`mb-3 ${status.ok ? "text-green-600" : "text-red-600"}`}>{status.message}</p>}
        <button type="submit" className="w-full bg-[#173E8C] text-white py-2 rounded-xl">Start Test</button>
      </form>
    </main>
  );
}
