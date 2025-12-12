"use client";

import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-6 py-12">

      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-xl p-7 md:p-14">

        {/* ---------------------------- */}
        {/*            TITLE             */}
        {/* ---------------------------- */}
        <div className="text-center mb-10 mt-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#2F4157] leading-snug">
            Let&apos;s begin your journey ✨
          </h1>

          <p className="text-gray-600 text-lg mt-2">
            I&apos;m excited to help you unlock global opportunities.
          </p>
        </div>

        {/* ---------------------------- */}
        {/*     RESPONSIVE CONTAINER     */}
        {/* ---------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* ---------------------------- */}
          {/*           MASCOT            */}
          {/* ---------------------------- */}
          <div className="flex justify-center md:justify-start w-full">
            <div className="relative w-full h-64 md:h-96 select-none pointer-events-none">
              <Image
                src="/images/contents/general/Hi!.svg"
                alt="IELS Mascot"
                fill
                className="object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* ---------------------------- */}
          {/*            FORM              */}
          {/* ---------------------------- */}
          <div className="w-full max-w-md mx-auto md:mx-0">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}