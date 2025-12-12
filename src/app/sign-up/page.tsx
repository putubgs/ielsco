"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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

/*
  PASSWORD RULES:
  - Min 8 chars
  - Uppercase
  - Lowercase
  - Number
*/
const SignupSchema = z
  .object({
    fullName: z.string().min(3, "Your name looks too short — try again? 😊"),
    email: z.string().email("Hmm… that email doesn’t look valid 👀"),

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
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [popup, setPopup] = useState("");

  const form = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  type SignupForm = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const onSubmit = async (values: SignupForm) => {
    setLoading(true);

    // 👇 TEMPORARY POPUP (hilangkan setelah sistem siap)
    setTimeout(() => {
      setPopup(
        "Sign-up isn’t available yet — we’re still preparing your smooth onboarding experience! 🚀✨"
      );
      setLoading(false);
    }, 700);

    /*
    ---------------------------------------------------------------
    NOTE FOR FUTURE WHEN BACKEND IS READY
    ---------------------------------------------------------------

    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: values.email, purpose: "signup" })
    });

    const json = await res.json();

    if (json.ok) {
      window.location.href = `/sign-up/verify?email=${values.email}`;
    } else {
      setPopup("Something went wrong — try again!");
      setLoading(false);
    }
    */
  };

  return (
    <AuthLayout>
      {popup && <Popup message={popup} onClose={() => setPopup("")} />}

      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* FULL NAME */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-[#2F4157]">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border bg-[#F7F8FA]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#E56668]" />
                </FormItem>
              )}
            />

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
                      className="w-full px-4 py-3 rounded-xl border bg-[#F7F8FA]"
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
                        placeholder="Choose a strong password"
                        className="w-full px-4 py-3 rounded-xl border bg-[#F7F8FA]"
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

            {/* CONFIRM PASSWORD */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-[#2F4157]">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Re-enter your password"
                        className="w-full px-4 py-3 rounded-xl border bg-[#F7F8FA]"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-3 text-gray-500"
                        onClick={() => setShowConfirm(!showConfirm)}
                      >
                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage className="text-[#E56668]" />
                </FormItem>
              )}
            />

            {/* SIGN UP BUTTON */}
            <Button
              disabled={loading}
              type="submit"
              className="w-full py-3 rounded-full bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] disabled:bg-[#C04C4E]"
            >
              {loading ? "Sending OTP…" : "Sign Up"}
            </Button>
          </form>
        </Form>

        {/* DIVIDER */}
        <div className="flex items-center gap-3">
          <div className="flex-grow border-t" />
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t" />
        </div>

        {/* GOOGLE SIGN UP (TEMPORARY DISABLED) */}
        <button
          onClick={() =>
            setPopup("Google sign-up isn’t available yet — but coming very soon! ⚡️")
          }
          className="inline-flex items-center justify-center gap-2 rounded-full w-full py-3 bg-[#294154] text-white font-semibold hover:bg-[#21363f]"
        >
          <Image src="/images/contents/general/google.png" width={25} height={25} alt="Google" />
          Continue with Google
        </button>

        {/* FOOTER */}
        <p className="text-center text-gray-600 pt-2">
          Already have an account?{" "}
          <a href="/sign-in" className="text-[#E56668] font-semibold hover:underline">
            Sign in here
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}