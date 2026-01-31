"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { ShieldCheck, Loader2, ArrowRight, AlertCircle, Mail } from "lucide-react";

export default function VerifyContent() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Inisialisasi Supabase (Fallback aman)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
  );

  async function submit() {
    setLoading(true);
    setMsg("");

    if (!code) {
      setMsg("Please enter the code.");
      setLoading(false);
      return;
    }

    // --- LOGIC BARU: Direct Supabase ---
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "signup", // Bedanya disini: pake 'signup'
    });

    if (error) {
      setMsg(error.message || "Invalid code. Please try again.");
      setLoading(false);
      return;
    }

    // Sukses -> Redirect ke Dashboard
    // (Opsional: Bisa ke halaman onboarding/welcome dulu kalau ada)
    window.location.href = "/dashboard";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8 space-y-8 border border-gray-100">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#2F4157]">
            <Mail size={30} />
          </div>
          <h2 className="text-2xl font-bold text-[#2F4157]">Verify Email</h2>
          <p className="text-gray-500 text-sm px-2">
            We sent a verification code to <br/>
            <span className="font-semibold text-[#2F4157]">{email}</span>
          </p>
        </div>

        {/* Input Code */}
        <div className="space-y-6">
           <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block text-center">
              Activation Code
            </label>
            <input
              className="w-full text-center text-3xl tracking-[0.5em] font-bold text-[#2F4157] border-b-2 border-gray-200 bg-transparent py-4 focus:outline-none focus:border-[#E56668] transition-all placeholder:text-gray-200 placeholder:tracking-normal"
              placeholder="123456"
              maxLength={6}
              value={code}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, ""); // Hanya angka
                setCode(val);
              }}
            />
          </div>

          {/* Error Message */}
          {msg && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl flex items-center gap-2 justify-center animate-pulse">
              <AlertCircle size={16} />
              {msg}
            </div>
          )}

          {/* Button */}
          <button
            className="w-full rounded-full bg-[#E56668] py-3.5 text-white font-bold text-lg hover:bg-[#C04C4E] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            onClick={submit}
            disabled={loading || code.length < 6}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Verifying...
              </>
            ) : (
              <>
                Complete Signup <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>

        <p className="text-center text-sm text-gray-400">
          Typo in email?{" "}
          <a href="/sign-up" className="text-[#E56668] font-semibold hover:underline">
            Register again
          </a>
        </p>

      </div>
    </div>
  );
}