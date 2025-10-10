// src/app/result/page.tsx
"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { PERSONAS } from "@/data/quizdata";
import Image from "next/image";

export default function ResultPage() {
  // read localStorage result
  let payload: any = null;
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("iels_onboarding");
    try { payload = raw ? JSON.parse(raw) : null; } catch (e) { payload = null; }
  }
  const winner = payload?.winner ?? "dreamer";
  const persona = PERSONAS[winner] ?? PERSONAS["dreamer"];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-[#2F4157] to-[#294055] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 md:p-10 text-[#2F4157] shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-40 h-40 relative">
                <Image src={persona.image ?? "/images/illustrations/personas/dreamer.png"} alt={persona.title} fill className="object-contain" />
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-extrabold">{persona.title}</h1>
                <p className="mt-3 text-gray-700">{persona.description}</p>

                <div className="mt-4 flex gap-3">
                  <Link href="/iels-lounge" className="bg-[#e56668] px-4 py-2 rounded-full text-white">Join IELS Community (Free)</Link>
                  <Link href="/pricing" className="bg-white px-4 py-2 rounded-full text-[#2F4157]">Start 7-Day Premium Trial</Link>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-bold mb-2">Recommended classes</h3>
              <ul className="list-disc ml-6 text-gray-700">
                {persona.classes.map((c: string) => (<li key={c}>{c}</li>))}
              </ul>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-600">If you want to keep or share your result, use the buttons below (or screenshot):</p>
              <div className="mt-3 flex gap-3">
                <button className="bg-white text-[#2F4157] px-4 py-2 rounded-full">Download Card (coming soon)</button>
                <Link href="/" className="bg-white/10 px-4 py-2 rounded-full text-white">Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
