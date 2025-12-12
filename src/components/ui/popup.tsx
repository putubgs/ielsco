"use client";

import { motion } from "framer-motion";

export default function Popup({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl p-6 max-w-sm text-center shadow-xl border"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-[#2F4157] mb-2">Heads up! 👀</h3>
        <p className="text-gray-600">{message}</p>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 rounded-full bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition"
        >
          Got it!
        </button>
      </motion.div>
    </motion.div>
  );
}