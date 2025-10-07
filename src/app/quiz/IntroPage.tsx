// src/app/quiz/IntroPage.tsx
"use client";

import Image from "next/image";

interface Props {
  onStart: () => void;
}

export default function IntroPage({ onStart }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* ===== Banner Atas ===== */}
      <div className="relative w-full h-48 sm:h-60 md:h-72 mb-8 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/images/contents/quiz/banner.png" // Ganti sesuai gambar banner kamu
          alt="IELS Global Journey Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center drop-shadow-lg">
            Your Global English Journey Starts Here 🚀
          </h1>
        </div>
      </div>

      {/* ===== Card Konten Intro ===== */}
      <div className="bg-white rounded-2xl shadow-lg px-6 sm:px-10 py-10">
        {/* Ilustrasi animasi */}
        <div className="mb-6 text-center">
          <Image
            src="/images/contents/quiz/banner.png"
            alt="Global Journey"
            width={200}
            height={200}
            className="mx-auto animate-bounce"
          />
        </div>

        {/* Judul & Deskripsi */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2F4157] text-center">
          Discover your IELS Persona ✨
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-center">
          Discover what type of <strong>global dreamer</strong> you are, and let
          IELS guide you from setting your dream to achieving it.
        </p>

        {/* Poin-poin — dipaksa kiri */}
        <div className="mt-8 max-w-2xl mx-auto text-left space-y-3 text-gray-700 leading-relaxed">
          <p>✨ Answer <strong>10 quick storytelling questions</strong> about your journey.</p>
          <p>✨ Get your <strong>IELS Persona</strong> — a fun & personal profile about your strengths and style.</p>
          <p>✨ Receive <strong>class & mentorship recommendations</strong> to reach your goal faster.</p>
          <p>✨ Share your <strong>result card</strong> with friends on Instagram or LinkedIn!</p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onStart}
            className="mt-10 rounded-full bg-[#e56668] text-white text-lg px-8 py-3 hover:opacity-90 transition"
          >
            Start Test →
          </button>
        </div>
      </div>
    </div>
  );
}
