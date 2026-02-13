"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, ShieldCheck, Star, Zap, CheckCircle, XCircle } from "lucide-react";

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
    output: "Academic English readiness.",
  },
  {
    date: "3 Mar 2026",
    title: "Onboarding & Selection Framework",
    desc: "Understand the full structure of the Global Impact Fellowship, evaluation criteria, and selection mindset.",
    output: "Readiness roadmap.",
  },
  {
    date: "7 Mar 2026",
    title: "Project Ideation (SDG 4 & SDG 8)",
    desc: "Develop and evaluate project ideas aligned with Quality Education and Decent Work, tested for feasibility.",
    output: "One validated project direction.",
  },
  {
    date: "10 Mar 2026",
    title: "Problem Framing & Impact Logic",
    desc: "Sharpen your problem statement and build an impact logic evaluators can clearly trust.",
    output: "Impact logic model.",
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
    desc: "Final readiness evaluation and strategic advice before entering selection.",
    output: "Ready for Final Selection.",
  },
];

const DEADLINE = new Date("2026-02-16T23:59:59+07:00");

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
        <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-12 lg:pt-18 lg:pb-18-mt-0 text-white text-center">
          
          <div className="flex items-center justify-center">
            <Image
              src="/images/logos/events/gif.png"
              alt="Global Impact Fellowship in Singapore"
              width={270}
              height={72}
              className="h-28 sm:h-28 w-auto object-contain brightness-0 invert opacity-100"
              priority
            />
          </div>
          
          <h1 className="text-2xl lg:text-3xl font-semibold leading-tight mb-4 mt-4">
            <span className="text-[#E56668]">Project Prep Mentoring</span>
          </h1>

          {/* PRIVILEGE BADGE */}
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-400/50 rounded-full px-4 py-1.5 mb-4 text-yellow-200 text-sm font-semibold tracking-wide">
            <Zap className="w-4 h-4 fill-yellow-200" />
            Fast-Track to Final Selection
          </div>

          <p className="mt-2 max-w-3xl mx-auto text-lg text-white/90 leading-relaxed">
            An intensive 8-session mentoring program to prepare you for 
            the Global Impact Fellowship in Singapore 2026. <br/>
            <strong>Skip the essay screening and go straight to Project Presentation.</strong>
          </p>

       {/* PARTNERS (DI-HIDE DULU) */}
{/* <div className="mt-8 text-center">
  <p className="text-xs text-white/70 mb-2 tracking-widest uppercase">
    Exposure & Ecosystem Partners
  </p>
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
*/}

          {/* COUNTDOWN (TOP) */}
          <div className="mt-10">
            <p className="text-sm uppercase tracking-widest text-white/70 mb-3">
              <strong>EXTENDED!</strong> Registration closes in
            </p>
            <CountdownTimer />
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button asChild className="bg-[#E56668] text-white font-semibold px-8 py-3 hover:bg-[#C04C4E] shadow-lg shadow-red-900/20">
              <Link href="https://forms.gle/D4DMBFshr1JeydZC9" target="_blank">
                Apply for Mentoring
              </Link>
            </Button>
            <Button asChild className="bg-white text-[#294154] font-semibold px-8 py-3 hover:bg-gray-200">
              <Link href="https://wa.me/6288297253491" target="_blank">
                Ask Before Applying
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ================= THE GOLDEN TICKET (FAST TRACK) ================= */}
      <section className="max-w-6xl mx-auto px-6 py-16 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2F4157]">The "Golden Ticket" Privilege</h2>
            <p className="text-gray-600 mt-2">Mentoring participants bypass the early elimination rounds.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* REGULAR ROUTE */}
            <div className="space-y-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <h3 className="text-center font-bold text-gray-500 uppercase tracking-widest text-sm">Regular Applicant</h3>
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="bg-gray-200 p-2 rounded-full"><XCircle className="w-5 h-5 text-gray-500"/></div>
                <div>
                  <p className="font-bold text-gray-700">Phase 1: Admin Screening</p>
                  <p className="text-xs text-gray-500">CV & Documents Check</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="bg-gray-200 p-2 rounded-full"><XCircle className="w-5 h-5 text-gray-500"/></div>
                <div>
                  <p className="font-bold text-gray-700">Phase 2: Essay Selection</p>
                  <p className="text-xs text-gray-500">Writing & Motivation Test</p>
                </div>
              </div>
               <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-xl border border-gray-200 border-dashed">
                <div className="bg-gray-300 p-2 rounded-full"><Rocket className="w-5 h-5 text-gray-500"/></div>
                <div>
                  <p className="font-bold text-gray-600">Phase 3: Final Presentation</p>
                </div>
              </div>
            </div>

            {/* FAST TRACK ROUTE */}
            <div className="relative space-y-4">
              <div className="absolute -top-4 -right-4 bg-[#E56668] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-6">
                FAST TRACK
              </div>
              <h3 className="text-center font-bold text-[#E56668] uppercase tracking-widest text-sm">Mentoring Graduate</h3>
              
              <div className="flex items-center gap-4 bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="bg-green-100 p-2 rounded-full"><CheckCircle className="w-5 h-5 text-green-600"/></div>
                <div>
                  <p className="font-bold text-green-800">Phase 1 & 2 Skipped</p>
                  <p className="text-xs text-green-700">Pre-validated via Mentoring</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-[#2F4157] p-5 rounded-xl border border-[#2F4157] shadow-lg transform scale-105">
                <div className="bg-white/20 p-2 rounded-full"><Rocket className="w-6 h-6 text-white"/></div>
                <div>
                  <p className="font-bold text-white text-lg">Direct to Phase 3</p>
                  <p className="text-xs text-gray-300">Project Presentation & Interview</p>
                </div>
              </div>
              <p className="text-center text-xs text-gray-500 mt-2">
                *You will present the project you developed during mentoring.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PROGRAM CONTEXT ================= */}
      <section className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        <h2 className="text-3xl font-bold">
          About the Global Impact Fellowship in Singapore 2026
        </h2>

        <p className="text-gray-700 max-w-4xl leading-relaxed">
          Global Impact Fellowship in Singapore is an intensive international exposure program
          designed by IELS to equip Indonesian students and young professionals with
          global academic awareness, career readiness, and leadership responsibility.
        </p>

        <p className="text-gray-700 max-w-4xl leading-relaxed">
          This program is <strong>not a sightseeing trip</strong>. It is a learning-
          and impact-driven journey that connects participants directly with
          Singapore&apos;s world-class academic ecosystem through <strong>NUS</strong> and <strong>Glints</strong>.
        </p>

        <div className="pt-5">
          <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#C04C4E] shadow-lg">
            <Link href="/events/gif">Read Full Program Details</Link>
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
                <strong>Private Support:</strong> Session recordings, optional
                1-on-1 booking, and private consultation access.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= CURRICULUM ================= */}
      <section className="bg-[#F7F8FA] py-12 overflow-hidden">
        <div className="text-center mb-12 px-6">
          <h2 className="text-3xl font-extrabold text-[#2F4157] mb-3">
            Mentoring Curriculum & Timeline
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A structured mentoring journey designed to prepare you strategically,
            academically, and professionally for international selection.
          </p>
        </div>

        <div className="relative max-w-[1400px] mx-auto">
          <div className="absolute left-0 right-0 top-1/2 h-[6px] bg-[#E56668]/30 rounded-full -translate-y-1/2" />
          <div className="overflow-x-auto scrollbar-none px-12">
            <div className="flex gap-8 w-max py-6 mx-auto">
              {curriculum.map((item, i) => (
                <div key={i} className="relative min-w-[300px] max-w-[300px] rounded-3xl bg-white p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <p className="text-sm font-semibold text-[#E56668] mb-2">{item.date}</p>
                  <h3 className="text-lg font-bold text-[#2F4157] mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                  <div className="text-sm font-semibold text-[#2F4157]">
                    Output:
                    <span className="block mt-1 font-normal text-gray-600">{item.output}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 text-sm text-gray-600 max-w-4xl mx-auto px-6 text-center">
          All sessions are recorded. If you miss a session, you may access the
          recording, book a 1-on-1 mentoring session, and consult privately.
        </p>
      </section>

      {/* ================= SAFETY NET (NO RISK) ================= */}
      <section className="py-12 px-6 border-t border-gray-100">
         <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold text-[#2F4157]">
               Is It Worth It If I Don't Get Selected?
            </h2>
            <p className="text-gray-600 text-lg">
               Absolutely. We designed this mentoring to be a <span className="text-[#E56668] font-bold">"No-Wasted-Effort"</span> investment.
               Even if you are not selected for the Singapore trip, you still receive:
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-left">
               <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <ShieldCheck className="w-8 h-8 text-[#E56668] mb-4" />
                  <h4 className="font-bold text-[#2F4157] mb-2">Project Realization</h4>
                  <p className="text-sm text-gray-600">
                     Your SDG Project will still be supported! You will join the "Project Realization" phase in Indonesia, getting exposure and community support.
                  </p>
               </div>
               <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <Star className="w-8 h-8 text-[#E56668] mb-4" />
                  <h4 className="font-bold text-[#2F4157] mb-2">Priority for Next Batch</h4>
                  <p className="text-sm text-gray-600">
                     Mentoring graduates get "Priority Status" for the next GIF cohort later this year. You won't start from zero.
                  </p>
               </div>
               <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <Rocket className="w-8 h-8 text-[#E56668] mb-4" />
                  <h4 className="font-bold text-[#2F4157] mb-2">NUS-Standard Skillset</h4>
                  <p className="text-sm text-gray-600">
                     The frameworks you learn (Problem Tree, Impact Logic, Pitching) are based on NUS standards—skills you keep for your career forever.
                  </p>
               </div>
            </div>
         </div>
      </section>
{/* ================= INVESTMENT CARD ================= */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-[#294154] text-white rounded-3xl p-12 text-center space-y-6 relative overflow-hidden">
          {/* Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

          <h2 className="text-3xl font-extrabold mb-6 relative z-10">
            Ready to Fast-Track Your Global Impact?
          </h2>

          <div className="bg-white text-[#294154] rounded-2xl p-8 shadow-xl max-w-xl mx-auto relative z-10 transform hover:scale-105 transition-transform duration-300 border-4 border-[#E56668]/10">
            {/* EARLY BIRD BADGE */}
            <div className="absolute top-0 right-0 bg-[#E56668] text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg">
              EARLY BIRD ENDS 16 JAN
            </div>

            <p className="uppercase text-xs tracking-widest text-gray-500 mb-4">Investment</p>
            
            {/* PRICING VISUALIZATION */}
            <div className="flex flex-col items-center justify-center mb-6">
              <span className="text-gray-400 text-lg font-medium line-through decoration-red-400 decoration-2">
                IDR 500,000
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-[#E56668]">IDR</span>
                <span className="text-5xl font-extrabold text-[#2F4157]">400,000</span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base border-t border-gray-100 pt-4 mt-2">
              Lock in this price before the regular rate applies. Includes 8 founder-led sessions, 
              <strong> Direct Entry to Final Phase</strong>, recordings, and lifetime incubation access.
            </p>
          </div>

          <div className="mt-12 relative z-10">
            <p className="uppercase tracking-widest text-sm text-white/70 mb-3">
              <strong>ACT FAST!</strong> Early bird closes in
            </p>
            <CountdownTimer />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 relative z-10">
            <Button asChild className="bg-[#E56668] text-white font-semibold px-8 py-3 h-auto text-lg rounded-full hover:bg-[#C04C4E] shadow-lg hover:shadow-red-500/30">
              <Link href="https://forms.gle/D4DMBFshr1JeydZC9" target="_blank">
                Claim Early Bird (Fast Track)
              </Link>
            </Button>
            <Button asChild className="bg-white text-[#294154] font-semibold px-8 py-3 h-auto text-lg rounded-full hover:bg-gray-100">
              <Link href="https://wa.me/6288297253491" target="_blank">
                Ask Before Applying
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}