// src/app/quiz/page.tsx
"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { useEffect, useMemo, useRef, useState } from "react";
import IntroPage from "./IntroPage";
import QuizStep from "./QuizStep";
import ResultCard from "./ResultCard";
import { SCENES, PERSONAS, type PersonaId, getPersona } from "@/data/personas";
import * as htmlToImage from "html-to-image";

type Phase = "intro" | "quiz" | "result";

export default function QuizPage() {
  const total = SCENES.length;
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<(number | null)[]>(
    Array(total).fill(null)
  );

  const [scores, setScores] = useState<Record<PersonaId, number>>({
    yankee: 0,
    british: 0,
    aussie: 0,
    german: 0,
    samurai: 0,
    kwave: 0,
    maple: 0,
    parisian: 0,
  });

  const handleSelect = (index: number) => {
    setSelected((prev) => {
      const next = [...prev];
      next[step] = index;
      return next;
    });
  };

  useEffect(() => {
    const newScores: Record<PersonaId, number> = {
      yankee: 0,
      british: 0,
      aussie: 0,
      german: 0,
      samurai: 0,
      kwave: 0,
      maple: 0,
      parisian: 0,
    };

    selected.forEach((choiceIndex, i) => {
      if (choiceIndex === null) return;
      const scene = SCENES[i];
      const picked = scene.options[choiceIndex];
      Object.entries(picked.score).forEach(([pid, pts]) => {
        newScores[pid as PersonaId] += pts || 0;
      });
    });

    setScores(newScores);
  }, [selected]);

  const onNext = () => {
    if (selected[step] === null) return; // cegah lanjut tanpa pilih
    const last = total - 1;
    if (step < last) setStep((s) => s + 1);
    else setPhase("result");
  };

  const onBack = () => step > 0 && setStep((s) => s - 1);
  const onRestart = () => {
    setPhase("intro");
    setStep(0);
    setSelected(Array(total).fill(null));
  };

  const topPersona = useMemo(() => {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [id] = sorted[0] as [PersonaId, number];
    return getPersona(id);
  }, [scores]);

  const cardRef = useRef<HTMLDivElement>(null);
  const onDownload = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = "IELS-Quiz-Result.png";
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error("Error generating image:", e);
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-[#3a4b60] text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* ================== INTRO ================== */}
          {phase === "intro" && (
            <div className="bg-white text-[#2F4157] rounded-2xl shadow-lg overflow-hidden">
              {/* Banner */}
              <div className="w-full h-48 md:h-64 relative">
                <img
                  src="/images/contents/quiz/banner.png"
                  alt="Quiz Banner"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Intro Content */}
              <div className="px-6 py-1 text-center">
                <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                  Discover what type of <strong>global dreamer</strong> you are,
                  and let IELS guide you from setting your dream to achieving it.
                </p>

                {/* Poin-poin — rata kiri tapi tetap center */}
                <div className="mt-6 text-gray-700 leading-relaxed max-w-2xl mx-auto text-left space-y-2">
                  <p>✨ Answer 10 quick storytelling questions.</p>
                  <p>
                    ✨ Get your <strong>IELS Persona</strong> — fun & personal
                    profile about your strengths and style.
                  </p>
                  <p>
                    ✨ Receive <strong>class & mentorship recommendations</strong>{" "}
                    to reach your goal faster.
                  </p>
                  <p>✨ Share your result card with friends on Instagram or LinkedIn!</p>
                </div>

                <button
                  onClick={() => setPhase("quiz")}
                  className="mt-8 mb-6 rounded-full bg-[#e56668] text-white text-lg px-8 py-3 hover:opacity-90 transition"
                >
                  Start Test →
                </button>
              </div>
            </div>
          )}

          {/* ================== QUIZ ================== */}
          {phase === "quiz" && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-extrabold">
                  Find Your IELS Persona ✨
                </h2>
                <p className="text-gray-200 mt-2">
                  10 quick storytelling scenes. Pick your path — get a personal
                  result, recommended classes, and a shareable card!
                </p>
              </div>

              <QuizStep
                step={step}
                total={total}
                image={SCENES[step].image}
                title={`${SCENES[step].id}. ${SCENES[step].title}`}
                prompt={SCENES[step].prompt}
                options={SCENES[step].options.map((o) => ({ label: o.label }))}
                selectedIndex={selected[step]}
                onSelect={handleSelect}
                onNext={onNext}
                onBack={onBack}
              />
            </>
          )}

          {/* ================== RESULT ================== */}
          {phase === "result" && (
            <>
              <ResultCard ref={cardRef} persona={topPersona} onRestart={onRestart} />
              <div className="flex flex-wrap gap-3 justify-center mt-4">
                <button
                  onClick={onDownload}
                  className="rounded-full px-5 py-2 bg-white text-[#2F4157] hover:bg-gray-100"
                >
                  Share / Download Result (PNG)
                </button>
                <button
                  onClick={onRestart}
                  className="rounded-full px-5 py-2 bg-[#e56668] text-white hover:opacity-90"
                >
                  Restart Quiz
                </button>
              </div>

              <div className="max-w-3xl mx-auto mt-6">
                <details className="bg-white rounded-xl p-4 shadow">
                  <summary className="cursor-pointer font-medium text-[#2F4157]">
                    See your score breakdown
                  </summary>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    {PERSONAS.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between border rounded-xl px-3 py-2"
                      >
                        <span className="font-medium text-[#2F4157]">
                          {p.title}
                        </span>
                        <span className="text-sm text-gray-600">
                          {scores[p.id]} pts
                        </span>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
