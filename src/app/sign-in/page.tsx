"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, Suspense } from "react"; // Tambahkan import Suspense
import { supabase } from "@/data/supabase";
import { useRouter, useSearchParams } from "next/navigation";

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
import { Eye, EyeOff } from "lucide-react";

import Popup from "@/components/ui/popup";

const SignInSchema = z.object({
  email: z.string().email("Hmm… that email doesn't look valid 👀"),
  password: z.string().min(1, "Password is required")
});

// 1. Pindahkan semua logika utama ke komponen ini (bukan export default)
function SignInContent() {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [popup, setPopup] = useState("");
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Ambil URL tujuan dari parameter 'next', default ke '/dashboard'
  const nextUrl = searchParams.get("next") || "/dashboard";

  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  type SignInForm = {
    email: string;
    password: string;
  };

  const onSubmit = async (values: SignInForm) => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setPopup("Invalid email or password. Please try again! 🔐");
        } else if (error.message.includes("Email not confirmed")) {
          setPopup("Please verify your email before signing in. Check your inbox! 📧");
        } else {
          setPopup(`Error: ${error.message}`);
        }
        setLoading(false);
        return;
      }

      if (data.user) {
        setPopup("Welcome back! Redirecting... 🎉");
        
        router.refresh(); 
        
        setTimeout(() => {
          router.push(nextUrl); 
        }, 1000);
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      setPopup("Something went wrong — please try again! 😔");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=${nextUrl}`,
          // Opsional: Paksa prompt login biar keliatan flow-nya
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });

      if (error) {
        setPopup(`Google sign-in error: ${error.message}`);
      }
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      setPopup("Google sign-in failed — please try again! 😔");
    }
  };

  return (
    <>
      {popup && <Popup message={popup} onClose={() => setPopup("")} />}

      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* EMAIL */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-[#2F4157]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@mail.com"
                      className="border rounded-xl w-full p-3 bg-[#F7F8FA] focus:outline-none focus:ring-2 focus:ring-[#E56668]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E56668]" />
                </FormItem>
              )}
            />

            {/* PASSWORD */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-[#2F4157]">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPass ? "text" : "password"}
                        placeholder="Enter your password"
                        className="border rounded-xl w-full p-3 bg-[#F7F8FA] focus:outline-none focus:ring-2 focus:ring-[#E56668]"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-3 text-gray-500"
                        onClick={() => setShowPass(!showPass)}
                      >
                        {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-[#E56668]" />
                </FormItem>
              )}
            />

            {/* FORGOT PASSWORD LINK */}
            <div className="text-right">
              <a 
                href="/forgot-password" 
                className="text-sm text-[#E56668] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* SIGN IN BUTTON */}
            <Button
              disabled={loading}
              type="submit"
              className="w-full py-3 rounded-full bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] disabled:bg-[#C04C4E]"
            >
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>
        </Form>

        {/* DIVIDER */}
        <div className="flex items-center gap-3">
          <div className="flex-grow border-t" />
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t" />
        </div>

        {/* GOOGLE SIGN IN */}
        <button
          onClick={handleGoogleSignIn}
          className="inline-flex items-center justify-center gap-2 rounded-full w-full py-3 bg-[#294154] text-white font-semibold hover:bg-[#21363f] transition active:scale-[0.97]"
        >
          <Image src="/images/contents/general/google.png" width={25} height={25} alt="Google" />
          Continue with Google
        </button>

        {/* FOOTER */}
        <p className="text-center text-gray-600 pt-2">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-[#E56668] font-semibold hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </>
  );
}

// 2. Export Default sebagai Wrapper Suspense
export default function SignInPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E56668]"></div></div>}>
        <SignInContent />
      </Suspense>
    </AuthLayout>
  );
}