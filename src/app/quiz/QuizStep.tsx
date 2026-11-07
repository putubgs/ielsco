// src/app/quiz/QuizStep.tsx
"use client";

import React from "react";

type Props = {
  step: number;
  total: number;
  title: string;
  image?: string;
  prompt: string;
  options: { label: string }[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function QuizStep({
  step,
  total,
  title,
  prompt,
  image,
  options,
  selectedIndex,
  onSelect,
  onNext,
  onBack,
}: Props) {
  const progress = Math.round(((step + 1) / total) * 100);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 md:p-8 shadow">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-gray-600">
            Step {step + 1} of {total}
          </span>
          <span className="text-gray-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#e56668] h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
        {image && (
          <div className="mb-6 flex justify-center">
            <img
              src={image}
              alt="Scene Illustration"
              className="w-270 h-48 object-contain animate-fadeIn"
            />
          </div>
        )}

      <h2 className="text-xl md:text-2xl font-bold text-[#2F4157] mb-2">{title}</h2>
      <p className="text-gray-700 mb-6">{prompt}</p>

      <div className="grid gap-3">
        {options.map((o, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          className={`w-full rounded-xl border p-4 text-left transition
  ${
    selectedIndex === idx
      ? "bg-blue-600 text-white border-blue-600 shadow-md"
      : "bg-white text-gray-800 border-gray-200 hover:border-blue-400 hover:bg-blue-50"
            }
          `}
        >
          {o.label}
        </button>
      ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={selectedIndex === null}
          className={`px-4 py-2 rounded-full text-white transition
            ${selectedIndex === null ? "bg-gray-300 cursor-not-allowed" : "bg-[#e56668] hover:opacity-90"}`}
        >
          {step + 1 === total ? "See Result" : "Next"}
        </button>
      </div>
    </div>
  );
}
