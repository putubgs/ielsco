"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function NewPasswordClient() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Inisialisasi Supabase (Dengan Fallback Aman)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
  );

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    // Validasi Sederhana
    if (password.length < 6) {
      setFeedback({ type: "error", msg: "Password must be at least 6 characters." });
      setLoading(false);
      return;
    }

    // Logic Update Password via Supabase Client
    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setFeedback({ type: "error", msg: error.message });
      setLoading(false);
    } else {
      setFeedback({ type: "success", msg: "Password updated successfully! Redirecting..." });
      
      // Tunggu sebentar biar user baca pesan sukses sebelum redirect
      setTimeout(() => {
        router.push("/dashboard"); 
      }, 2000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-4 py-10">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8 md:p-10 space-y-8 border border-gray-100">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-[#2F4157]">
            <Lock size={28} />
          </div>
          <h2 className="text-3xl font-bold text-[#2F4157]">Set New Password</h2>
          <p className="text-gray-500 text-sm">
            Your new password must be different from previously used passwords.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#2F4157] ml-1">New Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pl-11 focus:outline-none focus:ring-2 focus:ring-[#E56668]/20 focus:border-[#E56668] transition-all text-[#2F4157]"
              />
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {/* Password Hint */}
            <p className="text-xs text-gray-400 ml-1">Must be at least 6 characters.</p>
          </div>

          {/* Feedback Message */}
          {feedback && (
            <div className={`p-4 rounded-xl flex items-start gap-3 text-sm ${
              feedback.type === "error" 
                ? "bg-red-50 text-red-700 border border-red-100" 
                : "bg-green-50 text-green-700 border border-green-100"
            }`}>
              {feedback.type === "error" ? <AlertCircle size={20} className="shrink-0"/> : <CheckCircle2 size={20} className="shrink-0"/>}
              <p className="font-medium">{feedback.msg}</p>
            </div>
          )}

          {/* Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-full bg-[#E56668] py-3.5 text-white font-bold text-lg hover:bg-[#C04C4E] disabled:bg-[#ffb3b4] disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Updating...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center pt-2">
          <a href="/sign-in" className="text-sm text-gray-400 hover:text-[#2F4157] flex items-center justify-center gap-2 transition-colors group">
            ← Back to Sign In
          </a>
        </div>

      </div>
    </div>
  );
}