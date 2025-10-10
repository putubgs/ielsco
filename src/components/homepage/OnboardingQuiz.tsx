// src/components/OnboardingQuiz.tsx
"use client";
import React, { useMemo, useState } from "react";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import { motion } from "framer-motion";
import { QUESTIONS, PERSONAS } from "@/data/quizdata";
import { useRouter } from "next/navigation";

export default function OnboardingQuiz() {
  const total = QUESTIONS.length;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(total).fill(null));
  const router = useRouter();

  const handleSelect = (index: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = index;
      return next;
    });
  };

  const onNext = () => {
    if (answers[step] === null) return; // require selection
    if (step < total - 1) setStep((s) => s + 1);
    else {
      // finished -> compute scores
      const scoreMap: Record<string, number> = {};
      QUESTIONS.forEach((q, qi) => {
        const sel = answers[qi];
        if (sel === null) return;
        const points = q.options[sel].points ?? {};
        Object.entries(points).forEach(([k, v]) => {
          scoreMap[k] = (scoreMap[k] || 0) + (v ?? 0);
        });
      });
      // choose winner
      const sorted = Object.entries(scoreMap).sort((a, b) => b[1] - a[1]);
      const winner = sorted[0]?.[0] ?? "dreamer";
      // save to localStorage for /result reading
      const payload = {
        answers,
        scoreMap,
        winner,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("iels_onboarding", JSON.stringify(payload));
      }
      // navigate to /result
      router.push("/result");
    }
  };

  const onBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

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
        <button onClick={onBack} className="px-5 py-2 rounded-full bg-white/10 text-white border hover:bg-white/20" disabled={step === 0}>
          Back
        </button>
        <button onClick={onNext} className="px-6 py-2 rounded-full bg-[#e56668] text-white font-semibold hover:opacity-95">
          {step === total - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
