// src/app/welcome/result/page.tsx
"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { generateAchievement } from "@/data/quizdata";
import Link from "next/link";

type Achievement = {
  title: string;
  text: string;
};

export default function ResultPage() {
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [dailyTarget, setDailyTarget] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = localStorage.getItem("iels_onboarding");
    if (!raw) return;

    try {
      const payload = JSON.parse(raw);
      const scores = payload.scoreMap || {};
      const dt = payload.dailyTarget ?? null;

      setAchievement(generateAchievement(scores));
      setDailyTarget(dt);
    } catch (e) {
      console.error("Failed parsing onboarding payload", e);
    }
  }, []);

  if (!achievement) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex justify-center items-center text-gray-600 bg-white">
          Loading your personalized result...
        </div>
        <Footer />
      </>
    );
  }

return (
  <>
    <Header />

    {/* FULL WHITE PAGE BACKGROUND */}
    <div className="min-h-screen w-full bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* NAVY RESULT CARD */}
        <div className="rounded-2xl p-8 md:p-10 shadow-xl bg-[#2F4157] text-white">

          {/* Presentation Image */}
          <div className="w-full bg-white rounded-xl overflow-hidden mb-8 shadow-lg">
            <img
              src="/images/contents/general/banner.png"
              alt="IELS Community"
              className="w-full h-56 object-cover"
            />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            {achievement.title}
          </h2>

          {/* Description */}
          <p className="text-gray-200 text-lg mb-10 leading-relaxed">
            {achievement.text}
            <br /><br />
            At IELS, you’re not just learning English — you’re building a global future.
            Your answers show a clear direction, and we're here to guide you every step of the way.
          </p>

          {/* Daily Target */}
          {dailyTarget && (
            <div className="bg-white/10 border border-white/20 p-5 rounded-xl mb-10">
              <h3 className="font-semibold text-lg mb-2">Your Daily Learning Target</h3>
              <p className="text-gray-100">
                You committed to <strong>{dailyTarget} minutes/day</strong>.
                Keep going — consistency is your superpower.
              </p>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center rounded-full w-1/2 py-3 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]"
            >
              Sign in! And begin your journey
            </Link>

            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center rounded-full w-1/2 py-3 bg-white text-[#294154] font-semibold hover:bg-gray-200 transition transform hover:scale-[1.02]" 
            >
              Sign Up! Create your IELS Account
            </Link>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </>
);

}