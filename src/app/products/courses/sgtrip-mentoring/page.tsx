"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const DEADLINE = new Date("2025-12-28T23:59:59+07:00");

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
    return <span className="text-[#E56668] font-bold">Registration Closed</span>;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="flex gap-3 justify-center text-center">
      {[["Days", days], ["Hours", hours], ["Min", minutes], ["Sec", seconds]].map(
        ([label, value]) => (
          <div key={label} className="bg-white/50 rounded-xl px-4 py-2">
            <p className="text-2xl font-extrabold">{value}</p>
            <p className="text-xs uppercase tracking-wide text-white/70">
              {label}
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default function SGTripMentoringPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#eaf2ff] text-[#294154] font-geologica">
      <Header />

  {/* ================= HERO ================= */}
<section className="relative overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0 bg-[url('/images/contents/stories/member-stories/banner/singapore-banner.png')] bg-cover bg-center" />
  <div className="absolute inset-0 bg-[#2F4157]/80" />

  {/* CONTENT */}
  <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-16 lg:pt-31 lg:pb-20 -mt-6 text-white text-center">

    <p className="uppercase tracking-[0.25em] text-xs text-white/70 mb-4">
      Founder-Led Flagship Program
    </p>

    <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
      Singapore Global Insight Trip <br />
      <span className="text-[#E56668]">Mentoring Program 2026</span>
    </h1>

    <p className="mt-6 max-w-3xl mx-auto text-lg text-white/90 leading-relaxed">
      An intensive 8-session mentoring program to prepare you for project
      selection, interviews, and presentations for the Singapore Global
      Insight Trip 2026 — mentored directly by the Founder of IELS.
    </p>

 {/* PARTNERS */}
<div className="mt-8 text-center">
  <p className="text-xs text-white/70 mb-2 tracking-widest uppercase">
    Exposure & Ecosystem Partners
  </p>

  {/* SMALLER SHAPE */}
  <div className="inline-flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2">
    <div className="flex items-center gap-5">
      <Image
        src="/images/contents/stories/partner-updates/nusenterprise.png"
        alt="NUS"
        width={80}
        height={30}
    
      />
      <Image
        src="/images/contents/stories/partner-updates/glintshq.png"
        alt="Glints"
        width={80}
        height={30}
    
      />
    </div>
  </div>
</div>

    {/* COUNTDOWN (TOP) */}
    <div className="mt-10">
      <p className="text-sm uppercase tracking-widest text-white/70 mb-3">
        Registration closes in
      </p>
      <CountdownTimer />
    </div>

    {/* CTA */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
      <a
        href="https://forms.gle/UhmqBAWdWmAiRJmc6"
        target="_blank"
        className="inline-flex items-center justify-center rounded-full px-8 py-3 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]"
      >
        Apply for Mentoring
      </a>
      <a
        href="https://wa.me/6288297253491"
        target="_blank"
        className="inline-flex items-center justify-center rounded-full px-8 py-3 bg-white text-[#294154] font-semibold hover:bg-gray-200 transition transform hover:scale-[1.02]"
      >
        Ask via WhatsApp
      </a>
    </div>
  </div>
</section>

   
 {/* ================= PROGRAM CONTEXT ================= */}
<section className="max-w-6xl mx-auto px-6 py-20 space-y-6">
  <h2 className="text-3xl font-bold">
    About the Singapore Global Insight Trip 2026
  </h2>

  <p className="text-gray-700 max-w-4xl leading-relaxed">
    Singapore Global Insight Trip is an intensive international exposure program
    designed by IELS to equip Indonesian students and young professionals with
    global academic awareness, career readiness, and leadership responsibility.
  </p>

  <p className="text-gray-700 max-w-4xl leading-relaxed">
    This program is <strong>not a sightseeing trip</strong>. It is a learning-
    and impact-driven journey that connects participants directly with
    Singapore’s world-class academic ecosystem and global career landscape—
    while preparing them to bring tangible outcomes back to Indonesia.
  </p>

  <p className="text-gray-700 max-w-4xl leading-relaxed">
    Through structured campus immersion at the{" "}
    <strong>National University of Singapore (NUS)</strong> and a career-focused
    company visit to <strong>Glints</strong>, participants will explore how
    English proficiency, global mindset, and real-world skills intersect in top
    universities and international workplaces.
  </p>

  {/* CTA */}
  <div className="pt-6">
    <button
      disabled
      className="inline-flex items-center justify-center rounded-full px-7 py-3 
                 bg-[#294154]/10 text-[#294154] font-semibold cursor-not-allowed"
    >
      Read More — Full Program Details Coming February 2026
    </button>
  </div>
</section>

      {/* ================= WHAT YOU WILL GET ================= */}
      <section className="bg-white rounded-2xl p-10 max-w-6xl mx-auto border border-[#294154]/8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Image
            src="/images/contents/careers/iels_team_2.png"
            alt="Mentoring Session"
            width={520}
            height={360}
            className="rounded-2xl object-cover"
          />

          <div>
            <h3 className="text-2xl font-bold mb-6">
              What You Will Gain From This Mentoring
            </h3>

            <ul className="space-y-4 text-gray-700 leading-relaxed">
              <li>
                <strong>Project Direction:</strong> A strong, SDG-aligned project
                idea refined for feasibility and relevance.
              </li>
              <li>
                <strong>International Deck:</strong> A project presentation
                structured to meet institutional expectations.
              </li>
              <li>
                <strong>Interview Readiness:</strong> Clear personal narrative
                and project defense strategy.
              </li>
              <li>
                <strong>Presentation Confidence:</strong> Simulation, feedback,
                and Q&A handling practice.
              </li>
              <li>
                <strong>Private Support:</strong> Session recordings, optional
                1-on-1 booking, and private consultation access.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= CURRICULUM ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold mb-10">
          Mentoring Curriculum & Timeline
        </h3>

        <div className="space-y-6">
          <Session
            date="10 Jan 2026"
            title="Onboarding & Selection Framework"
            desc="You will understand the full structure of the Singapore Global Insight Trip, evaluation criteria, and selection mindset. This session establishes your personal objective and success benchmark."
            output="Clear positioning statement & readiness roadmap."
          />
          <Session
            date="17 Jan 2026"
            title="Project Ideation (SDG 4 & SDG 8)"
            desc="You will develop and evaluate project ideas aligned with Quality Education and Decent Work. Ideas are tested for impact, feasibility, and relevance."
            output="One validated project direction."
          />
          <Session
            date="24 Jan 2026"
            title="Problem Framing & Impact Logic"
            desc="This session sharpens your problem statement and builds a logical impact framework evaluators can trust."
            output="Problem tree & impact logic model."
          />
          <Session
            date="31 Jan 2026"
            title="Project Deck Structuring"
            desc="You will structure your project into a clear, persuasive deck using international presentation standards."
            output="Complete draft of project deck."
          />
          <Session
            date="7 Feb 2026"
            title="Deck Review & Refinement"
            desc="Detailed feedback on logic, clarity, and persuasion to elevate your deck to submission-ready quality."
            output="Refined, final deck."
          />
          <Session
            date="14 Feb 2026"
            title="Interview Preparation"
            desc="Mock interviews and structured answer frameworks for personal motivation and project defense."
            output="Interview answer bank."
          />
          <Session
            date="21 Feb 2026"
            title="Presentation Simulation"
            desc="Live simulation of project presentation with Q&A handling and performance feedback."
            output="Presentation-ready confidence."
          />
          <Session
            date="28 Feb 2026"
            title="Final Review & Closing"
            desc="Final readiness evaluation, private feedback, and strategic advice before entering selection."
            output="Clear next steps & confidence."
          />
        </div>

        <p className="mt-6 text-sm text-gray-600 max-w-4xl">
          All sessions are recorded. If you miss a session, you can access the
          recording, book a 1-on-1 mentoring session, and consult privately
          outside scheduled meetings.
        </p>
      </section>

      {/* ================= INVESTMENT CARD ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-[#294154] text-white rounded-2xl p-12 text-center space-y-6">
          <h2 className="text-3xl font-extrabold mb-6">
            Ready to Prepare Your Global Impact?
          </h2>

          <div className="bg-white text-[#294154] rounded-2xl p-10 shadow-xl max-w-xl mx-auto">
            <p className="uppercase text-xs tracking-widest text-gray-500 mb-2">
              Investment
            </p>
            <p className="text-4xl font-extrabold text-[#E56668] mb-4">
              Just IDR 400,000
            </p>
            <p className="text-gray-700 leading-relaxed">
              For 8 founder-led mentoring sessions, international-level preparation,
              recordings, and optional 1-on-1 support — this investment is designed
              to be accessible without compromising quality.
            </p>
          </div>

          {/* COUNTDOWN (BOTTOM CTA) */}
          <div className="mt-12">
            <p className="uppercase tracking-widest text-sm text-white/70 mb-3">
              Registration closes in
            </p>
            <CountdownTimer />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a
              href="https://forms.gle/UhmqBAWdWmAiRJmc6"
              target="_blank"
              className="inline-flex items-center justify-center rounded-full px-8 py-3 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]"
            >
              Apply Now
            </a>
            <a
              href="https://wa.me/6288297253491"
              target="_blank"
              className="inline-flex items-center justify-center rounded-full px-8 py-3 bg-white text-[#294154] font-semibold hover:bg-gray-200 transition transform hover:scale-[1.02]"
            >
              Ask Before Applying
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
function Session({
  date,
  title,
  desc,
  output,
}: {
  date: string;
  title: string;
  desc: string;
  output: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#294154]/8 shadow-sm">
      <p className="text-sm font-semibold text-[#E56668]">{date}</p>
      <h4 className="font-semibold text-lg mt-1">{title}</h4>
      <p className="text-gray-700 mt-2 leading-relaxed">{desc}</p>
      <p className="text-sm mt-3 text-[#294154]/80">
        🎯 <strong>Outcome:</strong> {output}
      </p>
    </div>
  );
}