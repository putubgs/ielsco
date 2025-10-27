"use client";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { PERSONAS } from "@/data/quizdata";
import Image from "next/image";

type Persona = {
  title: string;
  description: string;
  image?: string;
  classes: string[];
};

export default function ResultPage() {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Ambil data hasil quiz dari localStorage (client only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("iels_onboarding");
      if (raw) {
        try {
          const payload = JSON.parse(raw);
          const winner = payload?.winner ?? "dreamer";
          const found = PERSONAS[winner] ?? PERSONAS["dreamer"];
          setPersona(found);
        } catch {
          setPersona(PERSONAS["dreamer"]);
        }
      } else {
        setPersona(PERSONAS["dreamer"]);
      }
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white text-[#2F4157]">
        <p className="text-lg animate-pulse font-medium">Loading your result...</p>
      </main>
    );
  }

  if (!persona) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-[#2F4157]">
          <h1 className="text-2xl font-bold mb-3">No Result Found 😕</h1>
          <p className="text-gray-600 text-center max-w-md mb-6">
            It looks like you haven’t finished the quiz yet. Please complete it to see your personalized result.
          </p>
          <Link
            href="/start"
            className="bg-[#E56668] hover:bg-[#d25558] px-6 py-3 rounded-full text-white font-semibold transition"
          >
            Take the Quiz Again
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-white text-[#2F4157] py-20 px-6">
        <section className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image */}
          <div className="relative w-full max-w-[350px] h-[350px] mx-auto lg:mx-0">
            <Image
              src={persona.image ?? "/images/illustrations/personas/dreamer.png"}
              alt={persona.title}
              fill
              className="object-contain"
            />
          </div>

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
              You are: <span className="text-[#E56668]">{persona.title}</span>
            </h1>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
              {persona.description}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <Link
                href="/iels-lounge"
                className="bg-[#E56668] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#d25558] transition"
              >
                Join IELS Community (Free)
              </Link>
              <Link
                href="/iels-lounge/pricing"
                className="bg-[#2F4157] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#3e566b] hover:text-white transition"
              >
                Start 7-Day Premium Trial
              </Link>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Recommended Classes</h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                {persona.classes?.map((cls, i) => (
                  <li key={i}>{cls}</li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-3">
              <Link
                href="/courses"
                className="bg-[#E56668] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#d25558] transition"
            
              >
                See Courses
              </Link>
              <Link
                href="/#"
                className="bg-[#2F4157] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#3e566b] hover:text-white transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}