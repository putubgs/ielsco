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

      {/* IMAGE */}
      {image && (
        <div className="w-full h-48 mb-6 overflow-hidden rounded-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      {/* HEADER */}
      <h3 className="text-2xl font-bold mb-2 text-[#2F4157]">
        {title}
      </h3>
      <p className="text-base text-gray-600 mb-8 leading-relaxed">
        {prompt}
      </p>

      {/* OPTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((opt, i) => {
          const isSelected = selectedIndex === i;

          return (
            <motion.button
              key={`${opt.id}-${i}`} // ✅ FIXED: unique key
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => onSelect(i)}
              className={`
                group flex items-center gap-4 p-4 rounded-2xl border-2
                transition-all duration-300 text-left
                ${
                  isSelected
                    ? "bg-[#E56668] border-[#E56668] text-white shadow-lg"
                    : "bg-white border-gray-200 text-[#2F4157] hover:border-[#E56668]/60 hover:bg-[#fff7f7]"
                }
              `}
            >
              {/* EMOJI / ICON */}
              <div
                className={`
                  w-12 h-12 flex items-center justify-center text-2xl rounded-xl
                  transition-all duration-300
                  ${
                    isSelected
                      ? "bg-white/20"
                      : "bg-gray-100 group-hover:bg-[#E56668]/10"
                  }
                `}
              >
                {opt.emoji ?? "✨"}
              </div>

              {/* LABEL */}
              <span
                className={`
                  font-medium text-base leading-snug transition-colors
                  ${
                    isSelected
                      ? "text-white"
                      : "text-[#2F4157] group-hover:text-[#E56668]"
                  }
                `}
              >
                {opt.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}