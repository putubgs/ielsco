"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr"; // Atau import dari @/data/supabase kalau sudah ada
import Link from "next/link";
import { ArrowLeft, Loader2, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; msg: string } | null>(null);

  // Inisialisasi Supabase (Pake fallback biar aman dari error build Vercel kemarin)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
  );

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    // Logic Langsung ke Supabase (Gak perlu API Route)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // Ganti link ini ke halaman update password kamu nanti
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      setFeedback({ type: "error", msg: error.message });
      setLoading(false);
      return;
    }

    setFeedback({ 
      type: "success", 
      msg: "Check your email! We've sent a password reset link. 📧" 
    });
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-6 border border-gray-100">
        
        {/* Back Button */}
        <Link href="/sign-in" className="flex items-center text-sm text-gray-500 hover:text-[#2F4157] transition-colors w-fit">
          <ArrowLeft size={16} className="mr-2" /> Back to Sign In
        </Link>

        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="text-[#E56668]" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-[#2F4157]">
            Forgot Password?
          </h2>
          <p className="text-gray-500 text-sm">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
             <label className="block text-sm font-medium text-[#2F4157] mb-1.5">Email Address</label>
             <input
              required
              type="email"
              className="border border-gray-200 rounded-xl w-full p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E56668]/20 focus:border-[#E56668] transition-all"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {feedback && (
            <div className={`p-3 rounded-lg text-sm font-medium text-center ${
              feedback.type === "error" 
                ? "bg-red-50 text-red-600 border border-red-100" 
                : "bg-green-50 text-green-700 border border-green-100"
            }`}>
              {feedback.msg}
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 rounded-full bg-[#E56668] text-white font-bold hover:bg-[#C04C4E] disabled:bg-[#ffb3b4] disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}