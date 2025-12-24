// src/components/homepage/OnboardingQuiz.tsx
"use client";
import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import { motion } from "framer-motion";
import { QUESTIONS, DAILY_TARGET } from "@/data/quizdata";
import { useRouter } from "next/navigation";


export default function OnboardingQuiz() {
  const total = QUESTIONS.length;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(total).fill(null));
  const [dailyTarget, setDailyTarget] = useState<number>(20);
  const router = useRouter();

  const handleSelect = (index: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = index;
      return next;
    });
  };

  const onNext = () => {
    // if we're on the last question (index total-1), next goes to daily target step
    if (step < total - 1) {
      // require selection before proceeding
      if (answers[step] === null) return;
      setStep((s) => s + 1);
      return;
    }

    // last question => ensure selected
    if (answers[step] === null) return;

    // Now go to daily target step (we'll use step === total to render slider)
    setStep((s) => s + 1);
  };

  const onBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  // finish: compute scores, save payload
  const onFinish = () => {
    // compute scores
    const scoreMap: Record<string, number> = {};
    QUESTIONS.forEach((q, qi) => {
      const sel = answers[qi];
      if (sel === null) return;
      const points = q.options[sel].points ?? {};
      Object.entries(points).forEach(([k, v]) => {
        scoreMap[k] = (scoreMap[k] || 0) + (v ?? 0);
      });
    });

    const payload = {
      answers,
      scoreMap,
      dailyTarget,
      createdAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("iels_onboarding", JSON.stringify(payload));
    }

    // go to result
    router.push("/welcome/result");
  };

  // render logic
  if (step === total) {
 // DAILY TARGET SLIDER (IMPROVED)
return (
  <div className="space-y-10 text-center">

    {/* HEADER */}
    <div className="space-y-3">
      <h2 className="text-2xl md:text-3xl font-bold text-[#2F4157]">
        Your Daily Learning Commitment
      </h2>
      <p className="text-gray-600 max-w-md mx-auto">
        Small, consistent effort beats motivation.  
        Choose a daily target you can realistically commit to.
      </p>
    </div>

    {/* SLIDER CARD */}
    <div className="bg-[#F7F8FA] border border-gray-200 rounded-3xl px-6 py-10 max-w-xl mx-auto shadow-sm">

      {/* VALUE DISPLAY */}
      <div className="mb-6">
        <div className="text-5xl font-extrabold text-[#E56668] leading-none">
          {dailyTarget}
        </div>
        <p className="text-sm text-gray-600 mt-1">
          minutes per day
        </p>
      </div>

      {/* SLIDER */}
      <div className="relative px-2">
        <input
          type="range"
          min={DAILY_TARGET.min}
          max={DAILY_TARGET.max}
          step={DAILY_TARGET.step}
          value={dailyTarget}
          onChange={(e) => setDailyTarget(Number(e.target.value))}
          className="
            w-full appearance-none bg-transparent
            [&::-webkit-slider-runnable-track]:h-3
            [&::-webkit-slider-runnable-track]:rounded-full
            [&::-webkit-slider-runnable-track]:bg-gradient-to-r
            [&::-webkit-slider-runnable-track]:from-[#E56668]
            [&::-webkit-slider-runnable-track]:to-[#E56668]/30

            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-4
            [&::-webkit-slider-thumb]:border-[#E56668]
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:-mt-[7px]
            [&::-webkit-slider-thumb]:transition
            [&::-webkit-slider-thumb]:hover:scale-110

            [&::-moz-range-track]:h-3
            [&::-moz-range-track]:rounded-full
            [&::-moz-range-track]:bg-[#E56668]/40

            [&::-moz-range-thumb]:w-6
            [&::-moz-range-thumb]:h-6
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-4
            [&::-moz-range-thumb]:border-[#E56668]
            [&::-moz-range-thumb]:cursor-pointer
          "
        />
      </div>

      {/* HELPER TEXT */}
      <p className="text-xs text-gray-500 mt-4">
        💡 Even 10–20 minutes daily can compound into real progress.
      </p>
    </div>

    {/* ACTION BUTTONS */}
    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
      <button
        onClick={onBack}
        className=
"inline-flex items-center justify-center rounded-full bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E] transition active:scale-[0.97]"
        
      >
        Back
      </button>

      <button
        onClick={onFinish}
        className="inline-flex items-center justify-center rounded-full bg-[#294154] text-white font-semibold px-6 py-3 hover:bg-[#21363f] transition active:scale-[0.97]"
      >
        Lock My Commitment
      </button>
    </div>

  </div>
);
   
  }

  // NORMAL QUESTION (step 0..total-1)
  const curr = QUESTIONS[step];
  const selectedIndex = answers[step];

  return (
    <div className="space-y-6">
      <ProgressBar step={step} total={total} />
      <motion.div
        key={curr.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.32 }}
      >
        <QuestionCard
          image={curr.image}
          title={`${curr.id}. ${curr.title}`}
          prompt={curr.prompt}
          options={curr.options.map((o) => ({ id: o.id, label: `${o.emoji ?? ""} ${o.label}`, emoji: o.emoji }))}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
        />
      </motion.div>

      <div className="flex gap-3 justify-center">
        <button onClick={onBack} className="inline-flex items-center justify-center rounded-full bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E] transition active:scale-[0.97]" disabled={step === 0}>
          Back
        </button>
        <button onClick={onNext} className="inline-flex items-center justify-center rounded-full bg-[#294154] text-white font-semibold px-6 py-3 hover:bg-[#21363f] transition active:scale-[0.97]">
          {step === total - 1 ? "Next" : "Next"}
        </button>
      </div>
    </div>
  );
}