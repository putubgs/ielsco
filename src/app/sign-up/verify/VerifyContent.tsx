"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { MailCheck, Loader2, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function VerifyContent() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"error" | "success">("error");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Inisialisasi Supabase
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  // Lempar balik ke sign-up kalau gak ada email di URL
  useEffect(() => {
    if (!email) {
      router.push("/sign-up");
    }
  }, [email, router]);

  async function submit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setLoading(true);
    setMsg("");
    setMsgType("error");

    if (!code) {
      setMsg("Please enter the activation code.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "signup", // Tipe ini khusus untuk aktivasi akun baru
    });

    if (error) {
      setMsg(error.message || "Invalid activation code. Please try again.");
      setLoading(false);
      return;
    }

    // Sukses -> Redirect ke Dashboard
    router.push("/dashboard");
  }

  // --- Fitur Kirim Ulang Kode ---
  async function handleResendCode() {
    setResendLoading(true);
    setMsg("");

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });

    if (error) {
      setMsgType("error");
      setMsg(error.message || "Failed to resend activation code.");
    } else {
      setMsgType("success");
      setMsg("A new activation code has been sent to your email.");
    }
    setResendLoading(false);
  }

  if (!email) return null; // Cegah render kedip

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F8FA] px-4 py-10 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#EAEAEA] space-y-8">
          
          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 bg-[#F0F4F8] rounded-full flex items-center justify-center text-[#294154]">
              <MailCheck size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-[#294154]">Verify Email</h2>
              <p className="text-gray-500 text-sm leading-relaxed px-2">
                We sent a 6-digit activation code to <br/>
                <span className="font-semibold text-[#294154] break-all">{email}</span>
              </p>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-6">
            {/* Input Code */}
            <div>
              <label className="text-xs font-bold text-[#E56668] uppercase tracking-wider mb-2 block text-center">
                Activation Code
              </label>
              <input
                required
                type="text"
                className="w-full text-center text-4xl tracking-[0.4em] font-extrabold text-[#294154] border-b-2 border-gray-200 bg-transparent py-4 focus:outline-none focus:border-[#E56668] transition-all placeholder:text-gray-300 placeholder:tracking-[0.4em]"
                placeholder="------"
                maxLength={6}
                value={code}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, ""); // Hanya terima angka
                  setCode(val);
                }}
                suppressHydrationWarning
              />
            </div>

            {/* Error / Success Message */}
            {msg && (
              <div className={`p-4 rounded-xl flex items-start gap-3 text-sm animate-in fade-in zoom-in-95 duration-200 ${
                msgType === "error" 
                  ? "bg-red-50 text-red-700 border border-red-100" 
                  : "bg-green-50 text-green-700 border border-green-100"
              }`}>
                {msgType === "error" ? <AlertCircle size={20} className="shrink-0"/> : <CheckCircle2 size={20} className="shrink-0"/>}
                <p className="font-medium">{msg}</p>
              </div>
            )}

            {/* Button */}
            <button
              disabled={loading || code.length < 6}
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E56668] py-3.5 text-white font-bold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.96] active:brightness-95 disabled:pointer-events-none disabled:opacity-50 disabled:bg-[#ffb3b4]"
              suppressHydrationWarning
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
          </form>

          {/* Footer Area (Resend & Typo) */}
          <div className="flex flex-col items-center gap-3 pt-2">
            <p className="text-sm text-gray-400">
              Didn't receive code?{" "}
              <button 
                onClick={handleResendCode}
                disabled={resendLoading}
                className="text-[#E56668] font-bold hover:text-[#C04C4E] disabled:opacity-50 transition-colors"
                type="button"
                suppressHydrationWarning
              >
                {resendLoading ? "Sending..." : "Resend"}
              </button>
            </p>
            <p className="text-sm text-gray-400">
              Typo in email?{" "}
              <Link href="/sign-up" className="text-[#294154] font-semibold hover:underline">
                Register again
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}