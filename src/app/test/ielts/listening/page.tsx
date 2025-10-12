"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Timer from "@/components/Timer";
import { LISTENING_QUESTIONS } from "@/data/ielts-questions";

function ListeningContent() {
  const params = useSearchParams();
  const router = useRouter();
  const access = params.get("access") ?? "";

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSubmit = () => {
    const existingAnswers = JSON.parse(localStorage.getItem("ielts_answers") || "{}");
    localStorage.setItem(
      "ielts_answers",
      JSON.stringify({ ...existingAnswers, listening: answers })
    );

    router.push(`/test/ielts/reading?access=${encodeURIComponent(access)}`);
  };

  return (
    <main className="min-h-screen bg-white text-[#173E8C] p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Listening</h1>
          <Timer minutes={30} onFinish={handleSubmit} />
        </div>

        <div className="space-y-6">
          {LISTENING_QUESTIONS.map((q) => (
            <div key={q.id} className="p-4 border rounded-xl">
              <p className="font-medium mb-3">{q.question}</p>
              {q.options.map((opt) => (
                <label
                  key={opt}
                  className={`block border rounded-xl px-3 py-2 mb-2 cursor-pointer ${
                    answers[q.id] === opt ? "bg-[#173E8C] text-white" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    className="mr-2"
                    onChange={() =>
                      setAnswers((prev) => ({ ...prev, [q.id]: opt }))
                    }
                    checked={answers[q.id] === opt}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-[#173E8C] text-white px-4 py-2 rounded-xl hover:bg-[#122f6b] transition-colors"
          >
            Submit & Continue → Reading
          </button>
        </div>
      </div>
    </main>
  );
}

export default function ListeningPage() {
  return (
    <Suspense fallback={<div className="p-6 text-[#173E8C]">Loading listening section...</div>}>
      <ListeningContent />
    </Suspense>
  );
}
