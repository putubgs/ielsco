"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ===== CONFIG ===== */
const DEADLINE = new Date("2026-01-31T23:59:59+07:00");
const STORAGE_KEY = "iels-oprec-state";

/* ===== COUNTDOWN ===== */
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(
    DEADLINE.getTime() - new Date().getTime()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(DEADLINE.getTime() - new Date().getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (timeLeft <= 0) {
    return (
      <span className="text-[#E56668] font-bold text-sm">
        Recruitment Closed
      </span>
    );
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="flex gap-3 justify-center">
      {[
        ["Days", days],
        ["Hours", hours],
        ["Min", minutes],
        ["Sec", seconds],
      ].map(([label, value]) => (
        <div
          key={label}
          className="bg-[#294154]/5 rounded-xl px-4 py-2 text-center"
        >
          <div className="text-xl font-extrabold">{value}</div>
          <p className="text-[10px] uppercase tracking-wide text-gray-500">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ===== POPUP ===== */
export default function OprecPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "minimized") {
      setIsMinimized(true);
    } else if (!saved) {
      setTimeout(() => setIsOpen(true), 800);
    }
  }, []);

  const minimize = () => {
    setIsOpen(false);
    setIsMinimized(true);
    localStorage.setItem(STORAGE_KEY, "minimized");
  };

  const reopen = () => {
    setIsMinimized(false);
    setIsOpen(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <>
      {/* ===== MODAL ===== */}
<div
  className={`
    fixed inset-0 z-[100]
    flex items-center justify-center px-4
    transition-all duration-300 ease-out

    ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
  `}
>
<div
  onClick={minimize}
  className={`
    absolute inset-0
    bg-black/40
    transition-opacity duration-300
    ${isOpen ? "opacity-100" : "opacity-0"}
  `}
/>

          {/* MODAL CONTAINER */}
<div
  className={`
    relative z-10
    w-full max-w-md
    max-h-[85vh]
    bg-white rounded-3xl shadow-2xl
    flex flex-col overflow-hidden

    transition-all duration-300 ease-out
    ${isOpen
      ? "opacity-100 scale-100 translate-y-0"
      : "opacity-0 scale-95 translate-y-4"}
  `}
>
            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <p className="text-sm font-semibold text-[#294154]">
                IELS Open Recruitment Batch 3
              </p>
              <button
                onClick={minimize}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto">
              <Image
                src="/images/contents/careers/oprec-poster.png"
                alt="IELS Open Recruitment Poster"
                width={1080}
                height={1350}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* FOOTER (STICKY) */}
            <div className="border-t px-5 py-4 bg-white space-y-4">
              <p className="text-sm text-gray-600 text-center">
                We’re inviting passionate students to build
                <b> real educational impact</b> with IELS.
              </p>

              <div className="text-center">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                  Recruitment closes in
                </p>
                <CountdownTimer />
              </div>

              <Link
                href="/careers"
                className="
                  block text-center
                  rounded-full
                  bg-[#E56668]
                  text-white
                  py-2.5
                  font-semibold
                  hover:bg-[#C04C4E]
                  transition
                  active:scale-[0.97]
                "
              >
                View Open Positions
              </Link>
            </div>
          </div>
        </div>
      
{/* ===== MINIMIZED BUBBLE ===== */}
{isMinimized && (
 <button
  onClick={reopen}
  className={`
    fixed bottom-6 right-6 z-[90]
    flex items-center gap-2

    bg-[#E56668] text-white shadow-xl
    rounded-full

    transition-all duration-300 ease-out
    ${isMinimized
      ? "opacity-100 scale-100 pointer-events-auto"
      : "opacity-0 scale-90 pointer-events-none"}

    px-4 py-3 sm:px-5 sm:py-3
    hover:scale-105 active:scale-95
  `}
>
    {/* ICON */}
    <span className="text-lg">🎯</span>

    {/* TEXT — DESKTOP ONLY */}
    <span className="
      hidden sm:inline
      text-sm font-semibold whitespace-nowrap
    ">
      IELS Open Recruitment · Batch 3
    </span>

 
  </button>
)}
    </>
  );
}