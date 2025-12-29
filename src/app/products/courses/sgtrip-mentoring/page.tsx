"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type CurriculumItem = {
  date: string;
  title: string;
  desc: string;
  output: string;
};

const curriculum: CurriculumItem[] = [
  {
    date: "10 Jan 2026",
    title: "IELTS Master Class",
    desc: "As part of this mentoring journey, all mentees are required to follow the IELTS Master Class in January 2026.",
    output: "building academic and professional English readiness for project writing, interviews, andinternational-level discussions.",
  },
  {
    date: "3 Mar 2026",
    title: "Onboarding & Selection Framework",
    desc: "Understand the full structure of the Singapore Global Insight Trip, evaluation criteria, and selection mindset. This session aligns your personal objectives with selection expectations.",
    output: "Clear positioning statement & readiness roadmap.",
  },
  {
    date: "7 Mar 2026",
    title: "Project Ideation (SDG 4 & SDG 8)",
    desc: "Develop and evaluate project ideas aligned with Quality Education and Decent Work, tested for impact, feasibility, and relevance.",
    output: "One validated project direction.",
  },
  {
    date: "10 Mar 2026",
    title: "Problem Framing & Impact Logic",
    desc: "Sharpen your problem statement and build an impact logic evaluators can clearly trust.",
    output: "Problem tree & impact logic model.",
  },
  {
    date: "14 Mar 2026",
    title: "Project Deck Structuring",
    desc: "Structure your project into a clear, persuasive deck using international presentation standards.",
    output: "Complete draft of project deck.",
  },
  {
    date: "17 Mar 2026",
    title: "Deck Review & Refinement",
    desc: "Deep review on logic, clarity, and persuasion to elevate your deck to submission-ready quality.",
    output: "Refined final deck.",
  },
  {
    date: "24 Mar 2026",
    title: "Interview Preparation",
    desc: "Mock interviews and structured answer frameworks for personal motivation and project defense.",
    output: "Interview answer bank.",
  },
  {
    date: "28 Mar 2026",
    title: "Presentation Simulation",
    desc: "Live simulation of project presentation with Q&A handling and performance feedback.",
    output: "Presentation-ready confidence.",
  },
  {
    date: "31 Mar 2026",
    title: "Final Review & Closing",
    desc: "Final readiness evaluation, private feedback, and strategic advice before entering selection.",
    output: "Clear next steps & confidence.",
  },
];

const DEADLINE = new Date("2026-01-05T23:59:59+07:00");

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
            <div className="text-2xl font-extrabold">{value}</div>
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
        <strong>EXTENDED!</strong> Registration closes in
      </p>
      <CountdownTimer />
    </div>

    {/* CTA */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
       <Button asChild className="bg-[#E56668] text-white font-semibold px-8 py-3 hover:bg-[#C04C4E]">
        <Link
        href="https://forms.gle/D4DMBFshr1JeydZC9"
        target="_blank"
      
      >
        Apply for Mentoring
      </Link></Button>
      <Button asChild className="bg-white text-[#294154] font-semibold px-8 py-3 hover:bg-gray-200">
        <Link
        href="https://wa.me/6288297253491"
        target="_blank"
       
      >
        Ask Before Applying
      </Link></Button>
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
    Singapore&apos;s world-class academic ecosystem and global career landscape—
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
  <div className="pt-5">
  <Button
    asChild
    className="
      bg-[#E56668] text-white
      font-semibold
      px-6 py-3
      rounded-full
      hover:bg-[#C04C4E]
      transition-all duration-300
      active:scale-[0.97]
      shadow-lg hover:shadow-xl
  
      w-full sm:w-auto
      max-w-full
    "
  >
    <Link
      href="/events/sgit"
    >
      Read More
    </Link>
  </Button>  
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

      <section className="bg-[#F7F8FA] py-20 overflow-hidden">
      {/* HEADER */}
      <div className="text-center mb-12 px-6">
        <h2 className="text-3xl font-extrabold text-[#2F4157] mb-3">
          Mentoring Curriculum & Timeline
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A structured mentoring journey designed to prepare you strategically,
          academically, and professionally for international selection.
        </p>
      </div>

      {/* OUTER FRAME */}
      <div className="relative max-w-[1400px] mx-auto">
        {/* TRACK */}
        <div
          className="
            absolute left-0 right-0 top-1/2
            h-[6px]
            bg-[#E56668]/30
            rounded-full
            -translate-y-1/2
          "
        />

        {/* GRADIENT FADE */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[#F7F8FA] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#F7F8FA] to-transparent z-10" />

        {/* SCROLL AREA */}
        <div className="overflow-x-auto scrollbar-none px-12">
          <div className="flex gap-8 w-max py-6 mx-auto">
            {curriculum.map((item, i) => (
              <div
                key={i}
                className="
                  relative min-w-[300px] max-w-[300px]
                  rounded-3xl bg-white p-6
                  border border-gray-200
                  transition-all duration-300
                  hover:shadow-xl hover:-translate-y-1
                "
              >
                <p className="text-sm font-semibold text-[#E56668] mb-2">
                  {item.date}
                </p>

                <h3 className="text-lg font-bold text-[#2F4157] mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {item.desc}
                </p>

                <div className="text-sm font-semibold text-[#2F4157]">
                  Output:
                  <span className="block mt-1 font-normal text-gray-600">
                    {item.output}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTNOTE */}
      <p className="mt-10 text-sm text-gray-600 max-w-4xl mx-auto px-6 text-center">
        All sessions are recorded. If you miss a session, you may access the
        recording, book a 1-on-1 mentoring session, and consult privately outside
        scheduled meetings.
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
              <strong>EXTENDED!</strong> Registration closes in
            </p>
            <CountdownTimer />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button asChild className="bg-[#E56668] text-white font-semibold px-8 py-3 hover:bg-[#C04C4E]">
            <Link
              href="https://forms.gle/D4DMBFshr1JeydZC9"
              target="_blank"
             >
              Apply Now
            </Link></Button>
            <Button asChild className="bg-white text-[#294154] font-semibold px-8 py-3 hover:bg-gray-200">
        <Link
              href="https://wa.me/6288297253491"
              target="_blank"
              className="inline-flex items-center justify-center rounded-full px-8 py-3 bg-white text-[#294154] font-semibold hover:bg-gray-200 transition transform hover:scale-[1.02]"
            >
              Ask Before Applying
            </Link></Button>
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