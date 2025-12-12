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
    // DAILY TARGET SLIDER
    return (
      <div className="space-y-8 text-center">
        <h2 className="text-2xl font-semibold">Daily Learning Target</h2>
        <p className="text-gray-600">
          How many minutes can you commit each day?
        </p>

        <div className="flex flex-col items-center space-y-4">
          <input
            type="range"
            min={DAILY_TARGET.min}
            max={DAILY_TARGET.max}
            step={DAILY_TARGET.step}
            value={dailyTarget}
            onChange={(e) => setDailyTarget(Number(e.target.value))}
            className="w-full max-w-md"
          />
          <p className="text-lg font-semibold">{dailyTarget} minutes/day</p>
        </div>

        <div className="flex gap-3 justify-center">
          <button onClick={onBack} className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#294154] text-white font-semibold hover:bg-[#21363f] transition transform hover:scale-[1.02]">
            Back
          </button>
          <button onClick={onFinish} className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]">
            Finish
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
        <button onClick={onBack} className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#294154] text-white font-semibold hover:bg-[#21363f] transition transform hover:scale-[1.02]" disabled={step === 0}>
          Back
        </button>
        <button onClick={onNext} className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]">
          {step === total - 1 ? "Next" : "Next"}
        </button>
      </div>
    </div>
  );
}