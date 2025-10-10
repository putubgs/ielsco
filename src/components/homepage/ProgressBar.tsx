// src/components/ProgressBar.tsx
"use client";
import React from "react";

type Props = { step: number; total: number };

export default function ProgressBar({ step, total }: Props) {
  const pct = Math.round(((step + 1) / total) * 100);
  return (
    <div className="max-w-3xl mx-auto mb-4">
      <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
        <div className="h-2 bg-[#e56668] transition-width" style={{ width: `${pct}%` }} />
      </div>
      <div className="text-xs text-white/70 mt-2 text-right">{pct}%</div>
    </div>
  );
}
