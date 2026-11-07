// src/app/welcome/result/page.tsx
"use client";
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
      console.error(e);
    }
  }, []);

  if (!achievement) {
    return (
      <>

        <div className="min-h-screen flex items-center justify-center text-gray-600">
          Loading your personalized result…
        </div>
  
      </>
    );
  }

  return (
    <>

      <div className="min-h-screen bg-white px-4 py-12 flex justify-center">
        <div className="w-full max-w-xl">

          {/* RESULT CARD */}
          <div className="bg-[#2F4157] text-white rounded-2xl shadow-xl p-6 sm:p-8">

            {/* IMAGE */}
            <div className="bg-white rounded-xl overflow-hidden mb-6">
              <img
                src="/images/contents/general/banner.png"
                alt="IELS Community"
                className="w-full h-40 sm:h-56 object-cover"
              />
            </div>

            {/* TITLE */}
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
              {achievement.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed mb-8">
              {achievement.text}
              <br /><br />
              At IELS, you&apos;re not just learning English — you&apos;re building a global future.
            </p>

            {/* DAILY TARGET */}
            {dailyTarget && (
              <div className="bg-white/10 border border-white/20 rounded-xl p-4 mb-8">
                <h3 className="font-semibold mb-1">
                  Your Daily Learning Target
                </h3>
                <p className="text-sm text-gray-100">
                  <strong>{dailyTarget} minutes/day</strong>.  
                  Consistency beats intensity.
                </p>
              </div>
            )}

            {/* CTA PRIMARY */}
            <Link
              href="/sign-in"
              className="w-full block inline-flex items-center justify-center rounded-full bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E] transition active:scale-[0.97]"
            >
              Sign in, start your journey
            </Link>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-grow border-t border-white/30" />
              <span className="text-sm text-gray-300">or</span>
              <div className="flex-grow border-t border-white/30" />
            </div>

            {/* CTA SECONDARY */}
            <Link
              href="/sign-up"
              className="w-full block inline-flex items-center justify-center rounded-full bg-white text-[#294154] font-semibold px-6 py-3 hover:bg-gray-200 transition active:scale-[0.97]"
            >
              Create an IELS account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}