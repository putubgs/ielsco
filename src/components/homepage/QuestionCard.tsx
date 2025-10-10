// src/components/QuestionCard.tsx
"use client";
import { motion } from "framer-motion";
import React from "react";

type Option = {
  id: string;
  label: string;
  emoji?: string;
};

type Props = {
  image?: string;
  title: string;
  prompt: string;
  options: Option[];
  selectedIndex?: number | null;
  onSelect: (index: number) => void;
};

export default function QuestionCard({ image, title, prompt, options, selectedIndex, onSelect }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 text-[#2F4157] shadow-lg max-w-3xl mx-auto">
      {image && (
        <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{prompt}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt, i) => {
          const isSelected = selectedIndex === i;
          return (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onSelect(i)}
              className={`flex items-center gap-3 p-3 rounded-xl border transition
                ${isSelected ? "bg-[#e56668] text-white border-transparent shadow" : "bg-white text-[#2F4157] border-gray-200 hover:shadow-sm"}`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${isSelected ? "bg-white/20" : "bg-gray-100"}`}>
                {opt.emoji ?? "✨"}
              </div>
              <div className="text-left">
                <div className="font-medium">{opt.label}</div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
