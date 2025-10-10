"use client";
import React from "react";
import { motion } from "framer-motion";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export default function LoadingOverlay({
  isLoading,
  message = "Loading...",
}: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl p-10 shadow-2xl flex flex-col items-center gap-5 border border-gray-100"
      >
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-gray-300"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-[#E56668] animate-spin"></div>
        </div>

        <p className="text-[#2F4157] font-semibold text-lg">{message}</p>

        <div className="flex gap-1">
          <div className="w-2 h-2 bg-[#E56668] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#E56668] rounded-full animate-bounce delay-150"></div>
          <div className="w-2 h-2 bg-[#E56668] rounded-full animate-bounce delay-300"></div>
        </div>
      </motion.div>
    </div>
  );
}