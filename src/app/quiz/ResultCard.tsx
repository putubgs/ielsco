// src/app/quiz/ResultCard.tsx
"use client";

import React, { forwardRef } from "react";
import type { Persona } from "@/data/personas";

type Props = {
  persona: Persona;
  onRestart: () => void;
};

const ResultCard = forwardRef<HTMLDivElement, Props>(({ persona, onRestart }, ref) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div
        ref={ref}
        className={`rounded-2xl p-6 md:p-8 shadow-lg ${persona.theme.bg}`}
      >
        {/* Image / animation */}
        {persona.image && (
          <div className="flex justify-center mb-6">
            {/* Ganti next/image → img biasa */}
            <img
              src={persona.image}
              alt={persona.title}
              className="w-300 h-40 object-contain"
            />
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-2xl md:text-3xl font-extrabold ${persona.theme.text}`}>
            {persona.title}
          </h2>
          {/* Logo juga pakai img biasa */}
          <img
            src="/images/logos/iels_blue.png"
            alt="IELS Logo"
            className="w-12 h-10"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {persona.hashtags.map((tag) => (
            <span
              key={tag}
              className={`text-xs md:text-sm px-3 py-1 rounded-full border ${persona.theme.accent} border-current`}
            >
              {tag}
            </span>
          ))}
        </div>

        <p className={`mb-6 text-base md:text-lg ${persona.theme.text}`}>
          {persona.description}
        </p>

        {/* Traits */}
        <div className="mb-6">
          <h3 className={`font-bold mb-2 ${persona.theme.text}`}>Key Traits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {persona.traits.map((t) => (
              <div
                key={t.name}
                className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border"
              >
                <span className="text-sm font-medium text-gray-800">{t.name}</span>
                <span aria-label={`${t.stars} stars`}>{"⭐️".repeat(t.stars)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Classes */}
        <div className="mb-6">
          <h3 className={`font-bold mb-2 ${persona.theme.text}`}>Recommended Classes</h3>
          <ul className="list-disc ml-5 text-gray-800">
            {persona.classes.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <a
            href="/iels-lounge"
            className="flex-1 px-4 py-2 rounded-full bg-[#e56668] text-white text-center hover:opacity-90"
          >
            Join IELS Lounge
          </a>
          <a
            href="/about"
            className="flex-1 px-4 py-2 rounded-full bg-white border text-gray-800 text-center hover:bg-gray-50"
          >
            See Recommended Classes
          </a>
        </div>
      </div>
    </div>
  );
});

ResultCard.displayName = "ResultCard";
export default ResultCard;
