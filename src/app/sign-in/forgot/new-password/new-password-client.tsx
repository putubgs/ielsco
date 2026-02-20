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

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    if (password.length < 6) {
      setFeedback({ type: "error", msg: "Password must be at least 6 characters long." });
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setFeedback({ type: "error", msg: error.message });
      setLoading(false);
    } else {
      setFeedback({ type: "success", msg: "Password updated securely! Redirecting to dashboard..." });
      
      setTimeout(() => {
        router.push("/dashboard"); 
      }, 2000);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F8FA] px-4 py-10 font-sans">
      <div className="w-full max-w-md">
        
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#EAEAEA] space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-[#F0F4F8] rounded-full flex items-center justify-center mx-auto text-[#294154]">
              <Lock size={28} />
            </div>
            <h2 className="text-2xl font-extrabold text-[#294154]">Set New Password</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Almost there! Please enter a new, strong password for your IELS account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#294154] ml-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-[#F7F8FA] px-4 py-3.5 pl-11 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E56668]/20 focus:border-[#E56668] transition-all text-[#294154]"
                  suppressHydrationWarning
                />
                <Lock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-[#294154] transition-colors"
                  suppressHydrationWarning
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-gray-400 ml-1 font-medium">Must be at least 6 characters.</p>
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

            {/* Interactive Button */}
            <button
              disabled={loading}
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E56668] py-3.5 text-white font-bold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.96] active:brightness-95 disabled:pointer-events-none disabled:opacity-50"
              suppressHydrationWarning
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Updating...
                </>
              ) : (
                "Save & Continue"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}