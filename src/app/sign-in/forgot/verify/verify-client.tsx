"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { ShieldCheck, Loader2, AlertCircle, ArrowRight } from "lucide-react";

export default function VerifyOtpForgotClient() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") ?? "";

  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Inisialisasi Supabase (Fallback aman)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
  );

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    if (!email) {
      setMsg("Email is missing. Please restart the process.");
      setLoading(false);
      return;
    }

    // --- LOGIC BARU: Verifikasi OTP via Supabase Client ---
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "recovery", // Penting: Tipe 'recovery' untuk reset password
    });

    if (error) {
      setMsg(error.message || "Invalid code. Please try again.");
      setLoading(false);
      return;
    }

    // Jika sukses, user otomatis login (session aktif).
    // Langsung arahkan ke halaman Update Password.
    // Pastikan route ini sesuai dengan lokasi file NewPasswordPage kamu.
    router.push("/sign-in/forgot/new-password"); 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8 space-y-8 border border-gray-100">
        
        {/* Header Icon */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#2F4157]">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[#2F4157]">Verify Identity</h2>
          <p className="text-gray-500 text-center text-sm px-4">
            Enter the 6-digit code we sent to <br />
            <span className="font-semibold text-[#2F4157]">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block text-center">
              Secure Code
            </label>
            <input
              required
              type="text" // Text biar gak ada panah up/down angka
              maxLength={6}
              placeholder="123456"
              className="w-full text-center text-3xl tracking-[0.5em] font-bold text-[#2F4157] border-b-2 border-gray-200 bg-transparent py-4 focus:outline-none focus:border-[#E56668] transition-all placeholder:text-gray-200 placeholder:tracking-normal"
              value={otp}
              onChange={(e) => {
                // Hanya terima angka
                const val = e.target.value.replace(/\D/g, "");
                setOtp(val);
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

          <button
            disabled={loading || otp.length < 6}
            type="submit"
            className="w-full rounded-full bg-[#E56668] py-3.5 text-white font-bold text-lg hover:bg-[#C04C4E] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Verifying...
              </>
            ) : (
              <>
                Verify Code <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Didn't receive code?{" "}
          <button className="text-[#E56668] font-semibold hover:underline">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}