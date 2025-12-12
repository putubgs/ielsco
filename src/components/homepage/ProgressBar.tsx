// src/components/homepage/ProgressBar.tsx
"use client";
import React from "react";

type Props = { step: number; total: number };

export default function ProgressBar({ step, total }: Props) {
  const pct = Math.round(((step + 1) / total) * 100);
  return (
    <div className="w-full">
      <div className="text-sm text-gray-500 mb-2">
        Step {Math.min(step + 1, total)} of {total}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div style={{ width: `${pct}%` }} className="h-2 rounded-full bg-[#e56668]" />
      </div>
    </div>
  );
}