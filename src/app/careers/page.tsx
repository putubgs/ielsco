"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { divisions } from "@/data/careers/divisions";
import Timeline from "@/components/careers/Timeline";
import DivisionCard from "@/components/careers/DivisionCard";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: "🚀",
    title: "Real Project Experience",
    proof: "Live programs, not simulations",
    points: [
      "English Global Festival",
      "Global Insight Trips",
      "Institutional & school partnerships",
      "Community & product execution",
    ],
  },
  {
    icon: "🌍",
    title: "Global Exposure & Network",
    proof: "Cross-country collaboration",
    points: [
      "Global universities & mentors",
      "International student interaction",
      "Cross-division collaboration",
    ],
  },
  {
    icon: "📈",
    title: "Measurable Skill Growth",
    proof: "Clear output & evaluation",
    points: [
      "Weekly responsibilities",
      "Defined deliverables",
      "Performance review & feedback",
    ],
  },
  {
    icon: "🧠",
    title: "Leadership & Ownership",
    proof: "Startup-level responsibility",
    points: [
      "Systemic thinking",
      "Professional communication",
      "Decision-making ownership",
    ],
  },
  {
    icon: "📂",
    title: "Strong Portfolio Material",
    proof: "Proof of work, not titles",
    points: [
      "Projects & reports",
      "Campaigns & content",
      "Operational systems",
    ],
  },
  {
    icon: "🏅",
    title: "Long-Term Growth Path",
    proof: "Merit-based progression",
    points: [
      "Manager & Principal track",
      "Lead major IELS programs",
      "External representation",
    ],
  },
];
  


export default function CareersPage() {
  /* ===== CAROUSEL STATE ===== */
  const images = [
    "/images/contents/careers/iels_team_0.png",
    "/images/contents/careers/iels_team_1.png",
    "/images/contents/careers/iels_team_2.png",
    "/images/contents/careers/iels_team_3.png",
    "/images/contents/careers/iels_team_4.png",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [pressed, setPressed] = useState<number | null>(null);
  const nextSlide = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#3a4b60] text-white">
        {/* ===== HERO ===== */}
        <section className="text-center py-16 px-4">
          <h1 className="text-4xl font-bold mb-4">
            💼 IELS MT Open Recruitment Batch 3
          </h1>
          <p className="max-w-2xl mx-auto text-base text-gray-200">
            We&apos;re a student-led organization empowering youths for global
            opportunities. Explore open positions and be part of our journey.
          </p>

          {/* ===== CAROUSEL ===== */}
          <div className="relative mt-8 flex justify-center">
            <div className="relative w-[800px] h-[400px] overflow-hidden rounded-2xl shadow-md">
              {images.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`IELS Image ${index + 1}`}
                  fill
                  className={`object-cover transition-opacity duration-700 ease-in-out absolute inset-0 ${
                    currentImage === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* ARROWS */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-white transition"
              >
                <span className="text-2xl text-gray-800">‹</span>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-white transition"
              >
                <span className="text-2xl text-gray-800">›</span>
              </button>
            </div>
          </div>

          {/* DOTS */}
          <div className="flex justify-center mt-4 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full ${
                  currentImage === index
                    ? "bg-white"
                    : "bg-gray-400"
                }`}
              />
            ))}
          </div>
          {/* CTA BELOW CAROUSEL */}
<div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
  <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]"><a
    href="https://forms.gle/DotTzXLZ9vzcF4BJA"
    target="_blank"
    rel="noopener noreferrer"
  >
    Apply for IELS Batch 3
  </a>
</Button>
  <Button asChild className="bg-white text-[#2F4157] font-semibold px-6 py-3 hover:bg-white/80">
  <Link
    href="https://ielsco.com/about"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn About IELS
  </Link></Button>
</div>
</section>

    <section className="bg-white py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F4157] mb-4">
            What You’ll Gain from IELS
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            IELS is <b>not a paid internship</b>.  
            What you gain instead is ownership, exposure, and proof of growth —
            the kind that actually compounds.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => {
            const isActive = pressed === i;

            return (
              <div
                key={i}
                onPointerDown={() => setPressed(i)}
                onPointerUp={() => setTimeout(() => setPressed(null), 120)}
                onPointerLeave={() => setPressed(null)}
                className={`
                  relative rounded-3xl border bg-[#FAFAFA] p-7
                  transition-all duration-300
                  ${
                    isActive
                      ? "border-[#E56668] shadow-2xl -translate-y-1"
                      : "border-gray-200 hover:border-[#E56668]/60 hover:-translate-y-1 hover:shadow-xl"
                  }
                `}
              >
                {/* RED ACCENT BAR */}
                <div
                  className={`
                    absolute left-0 top-6 bottom-6 w-1 rounded-full
                    transition-all duration-300
                    ${isActive ? "bg-[#E56668]" : "bg-transparent group-hover:bg-[#E56668]"}
                  `}
                />

                <div className="pl-4 flex flex-col gap-4">

                  {/* HEADER */}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{b.icon}</span>
                    <h3
                      className={`
                        text-xl font-bold transition
                        ${
                          isActive
                            ? "text-[#E56668]"
                            : "text-[#2F4157] group-hover:text-[#E56668]"
                        }
                      `}
                    >
                      {b.title}
                    </h3>
                  </div>

                  {/* PROOF LINE */}
                  <p className="text-sm font-semibold text-[#E56668]">
                    {b.proof}
                  </p>

                  {/* DETAILS */}
                  <ul className="text-sm text-gray-600 space-y-2">
                    {b.points.map((p, idx) => (
                      <li key={idx}>• {p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

        

        {/* ===== TIMELINE ===== */}
        <Timeline />

        {/* ===== DIVISIONS ===== */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto text-center mb-14">
            <h2 className="text-3xl font-extrabold text-[#2F4157] mb-4">
              Explore Divisions
            </h2>
            <p className="text-gray-600">
              Choose where you want to grow and create impact.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {divisions.map((division) => (
              <DivisionCard
                key={division.slug}
                slug={division.slug}
                title={division.title}
                image={division.image}
                description={division.description}
              />
            ))}
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-20 items-center bg-[#2F4157] text-white text-center px-4">
          <h2 className="text-3xl font-extrabold mb-4">
            Ready to Grow with IELS?
          </h2>
          <p className="text-gray-200 max-w-xl mx-auto mb-8">
            Join IELS Batch 3 and be part of impactful projects, global
            collaborations, and a supportive learning-driven team.
          </p>

       {/* CTA BELOW CAROUSEL */}
<div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
  <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]"><a
    href="https://forms.gle/DotTzXLZ9vzcF4BJA"
    target="_blank"
    rel="noopener noreferrer"
  >
    Apply for IELS Batch 3
  </a>
</Button>
  <Button asChild className="bg-white text-[#2F4157] font-semibold px-6 py-3 hover:bg-white/80">
  <Link
    href="https://ielsco.com/about"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn About IELS
  </Link></Button>
  </div>
                  {/* CONTACT */}
        <div className="py-10 text-center pb-12">
          <p>
            Questions? Reach us at{" "}
            <a
              href="mailto:careers@ielsco.com"
              className="underline text-white font-semibold"
            >
              careers@ielsco.com
            </a>
          </p>
        </div>
        </section>



        <Footer />
      </div>
    </>
  );
}
