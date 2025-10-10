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

export default function QuestionCard({
  image,
  title,
  prompt,
  options,
  selectedIndex,
  onSelect,
}: Props) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl">
      {image && (
        <div className="w-full h-48 mb-6 overflow-hidden rounded-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      <h3 className="text-2xl font-bold mb-3 text-[#2F4157]">{title}</h3>
      <p className="text-base text-gray-600 mb-6 leading-relaxed">{prompt}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((opt, i) => {
          const isSelected = selectedIndex === i;
          return (
            <motion.button
              key={opt.id}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onSelect(i)}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
                isSelected
                  ? "bg-[#E56668] border-[#E56668] text-white shadow-md"
                  : "bg-white border-gray-200 text-[#2F4157] hover:border-[#E56668]/60 hover:bg-[#fff7f7]"
              }`}
            >
              <div
                className={`w-12 h-12 flex items-center justify-center text-2xl rounded-xl ${
                  isSelected ? "bg-white/20" : "bg-gray-100"
                }`}
              >
                {opt.emoji ?? "✨"}
              </div>
              <span className="font-medium text-left text-base leading-snug">
                {opt.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}