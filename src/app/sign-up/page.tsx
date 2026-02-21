"use client";

import AuthLayout from "@/components/auth/AuthLayout"; 
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import Link from "next/link"; 

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, ArrowRight, ShieldCheck, Loader2, ArrowLeft, X } from "lucide-react"; 
import Popup from "@/components/ui/popup";

const SignupSchema = z
  .object({
    fullName: z.string().min(3, "Your name looks too short — try again? 😊"),
    email: z.string().email("Hmm… that email doesn't look valid 👀"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Include at least 1 uppercase letter")
      .regex(/[a-z]/, "Include at least 1 lowercase letter")
      .regex(/[0-9]/, "Include at least 1 number"),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Both passwords must match!",
    path: ["confirmPassword"]
  });

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false); 
  const [otp, setOtp] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [popup, setPopup] = useState("");
  const [userEmail, setUserEmail] = useState(""); 
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const form = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSignupSubmit = async (values: z.infer<typeof SignupSchema>) => {
    setLoading(true);
    setUserEmail(values.email);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: { full_name: values.fullName },
        }
      });

      if (error) throw error;

      if (data.user) {
        setIsVerifying(true); 
        setPopup("Success! 🎉 Please check your email for the 6-digit code.");
      }
    } catch (error: any) {
      setPopup(error.message.includes("already registered") 
        ? "This email is already registered. Please sign in instead! 🔐" 
        : `Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email: userEmail,
        token: otp,
        type: "signup",
      });

      if (error) throw error;

      setPopup("Account verified! Redirecting to dashboard... 🚀");
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (error: any) {
      setPopup(`Invalid code: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard`,
      }
    });
  };

  return (
    <AuthLayout>


      {popup && <Popup message={popup} onClose={() => setPopup("")} />}

      <div className="space-y-6 pt-4"> {/* pt-4 biar ga terlalu nempel sama X */}

        {!isVerifying ? (
          <div className="animate-in fade-in duration-500">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSignupSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-[#294154]">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" className="rounded-xl bg-[#F7F8FA]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-[#294154]">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@mail.com" className="rounded-xl bg-[#F7F8FA]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-[#294154]">Password</FormLabel>
                      <div className="relative">
                        <Input type={showPass ? "text" : "password"} className="rounded-xl bg-[#F7F8FA]" {...field} />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-3 text-gray-400">
                          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-[#294154]">Confirm Password</FormLabel>
                      <div className="relative">
                        <Input type={showConfirm ? "text" : "password"} className="rounded-xl bg-[#F7F8FA]" {...field} />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-3 text-gray-400">
                          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={loading} type="submit" className="w-full py-3 rounded-full bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] disabled:bg-[#C04C4E]">
                  {loading ? "Creating Account…" : "Sign Up"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex-grow border-t" />
                <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">or</span>
                <div className="flex-grow border-t" />
              </div>

              <button
                onClick={handleGoogleSignUp}
                className="inline-flex items-center justify-center gap-3 rounded-full w-full py-3.5 bg-[#294154] text-white font-bold hover:shadow-lg transition active:scale-[0.97]"
              >
                <Image src="/images/contents/general/google.png" width={20} height={20} alt="Google" />
                Continue with Google
              </button>

              <p className="text-center text-gray-600 pt-2">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-[#E56668] font-bold hover:underline">Sign in here</Link>
              </p>
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-8 duration-500 space-y-8">
            <button 
              onClick={() => setIsVerifying(false)}
              className="flex items-center text-sm text-gray-400 hover:text-[#294154] transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" /> Back to Signup
            </button>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-[#F0F4F8] rounded-full flex items-center justify-center mx-auto text-[#294154]">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-2xl font-extrabold text-[#294154]">Verify Your Email</h2>
              <p className="text-gray-500 text-sm px-4">
                Enter the 6-digit code we just sent to <br />
                <span className="font-semibold text-[#294154]">{userEmail}</span>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <input
                required
                type="text"
                maxLength={6}
                placeholder="------"
                className="w-full text-center text-4xl tracking-[0.4em] font-extrabold text-[#294154] border-b-2 border-gray-200 bg-transparent py-4 focus:outline-none focus:border-[#E56668] transition-all"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              />

              <Button disabled={loading || otp.length < 6} type="submit" className="w-full py-3 rounded-full bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] disabled:bg-[#C04C4E]">
                {loading ? <Loader2 className="animate-spin" /> : "Complete Sign Up"}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-400">
              Didn't receive code?{" "}
              <button className="text-[#E56668] font-bold hover:underline">Resend</button>
            </p>
          </div>
        )}

        {/* PRIVACY POLICY & TERMS FOOTER */}
        <div className="pt-6 text-center text-[11px] text-gray-400 leading-relaxed space-y-1 border-t border-gray-100">
          <p>
            By signing in to IELS, you agree to our{" "}
            <Link href="/terms-of-service" className="underline hover:text-gray-600 transition-colors">Terms</Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="underline hover:text-gray-600 transition-colors">Privacy Policy</Link>.
          </p>
          <p>
            This site is protected by reCAPTCHA Enterprise and the Google{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline hover:text-gray-600 transition-colors">Privacy Policy</a>{" "}
            and{" "}
            <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline hover:text-gray-600 transition-colors">Terms of Service</a>{" "}
            apply.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}