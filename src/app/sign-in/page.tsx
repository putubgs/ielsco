"use client";

import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import Image from "next/image";
import Popup from "@/components/ui/popup";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Eye, EyeOff } from "lucide-react";

const LoginSchema = z.object({
  email: z.string().email("Oops! That email doesn’t look right 👀"),
  password: z.string().min(6, "Your password looks a bit short — try again?"),
});

export default function LoginPage() {
  const [serverError, setServerError] = useState(""); // inline error
  const [popup, setPopup] = useState(""); // for Google only
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    setServerError("");

    // ❗ TEMPORARY — DISABLE LOGIN BACKEND
    setTimeout(() => {
      setServerError("This email isn’t registered yet :( Try signing up first!");
      setLoading(false);
    }, 700);

    /*
    UNCOMMENT THIS WHEN BACKEND IS READY
    ------------------------------------

    const res = await fetch("/api/auth/sign-in", {
      method: "POST",
      body: JSON.stringify(values),
    });

    const json = await res.json();

    if (!res.ok) {
      if (json.error === "EMAIL_NOT_FOUND") {
        setServerError("This email isn’t registered yet :( Try signing up first!");
      } else if (json.error === "WRONG_PASSWORD") {
        setServerError("That password doesn’t look right — try again?");
      } else {
        setServerError("Unexpected issue — try again soon!");
      }
      setLoading(false);
      return;
    }

    window.location.href = "/dashboard";
    */
  };

  return (
    <AuthLayout>
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
                        placeholder="Your password"
                        className="w-full px-4 py-3 rounded-xl border bg-[#F7F8FA]"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-3 text-gray-500"
                      >
                        {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-[#E56668]" />
                </FormItem>
              )}
            />

            {/* INLINE SERVER ERROR */}
            {serverError && (
              <p className="text-[#E56668] text-sm text-center font-medium">
                {serverError}
              </p>
            )}

            {/* SUBMIT */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] disabled:bg-[#C04C4E]"
            >
              {loading ? "Checking…" : "Sign In"}
            </Button>
          </form>
        </Form>

        {/* FORGOT PASSWORD */}
        <a
          href="/sign-in/forgot"
          className="block text-right text-sm text-[#E56668] hover:underline"
        >
          Forgot password?
        </a>

        {/* DIVIDER */}
        <div className="flex items-center gap-3">
          <div className="flex-grow border-t" />
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t" />
        </div>

        {/* GOOGLE BTN */}
        <button
          onClick={() =>
            setPopup("Google sign-in is coming soon — stay tuned! 🚀")
          }
          className="inline-flex items-center justify-center gap-2 rounded-full w-full py-3 bg-[#294154] text-white font-semibold hover:bg-[#21363f]"
        >
          <Image src="/images/contents/general/google.png" width={25} height={25} alt="Google Icon" />
          Continue with Google
        </button>

        {/* FOOTER */}
        <p className="text-center text-gray-600 pt-2">
          Don’t have an account?{" "}
          <a href="/sign-up" className="text-[#E56668] font-semibold hover:underline">
            Create one
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}