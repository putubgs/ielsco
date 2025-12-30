"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type TimelineItem = {
  phase: string;
  date: string;
  title: string;
  desc: string;
};

const timeline: TimelineItem[] = [
  {
    phase: "English & Academic Preparation",
    date: "10 Jan – 7 Feb 2026",
    title: "IELTS Master Class",
    desc: "Building academic and professional English readiness for project writing, interviews, and international-level discussions.",
  },
  {
    phase: "SGIT Selection — Phase 1",
    date: "8 Feb – 14 Mar 2026",
    title: "Administration Screening",
    desc: "Initial screening of motivation, background, and readiness to join a global exposure program.",
  },
  {
    phase: "SGIT Selection — Phase 2",
    date: "25 Mar – 4 Apr 2026",
    title: "Essay & Project Submission",
    desc: "Participants submit essays and SDG-aligned project ideas. Mentoring participants receive priority advantage.",
  },
  {
    phase: "SGIT Selection — Phase 3",
    date: "12 – 18 Apr 2026",
    title: "Interview & Project Presentation",
    desc: "Final evaluation through structured interviews and project presentations.",
  },
  {
    phase: "Final Announcement",
    date: "22 Apr 2026",
    title: "Selected Participants Revealed",
    desc: "Official announcement of SGIT 2026 delegates.",
  },
  {
    phase: "Singapore Global Insight Trip",
    date: "5 – 12 May 2026",
    title: "Academic & Career Immersion",
    desc: "Academic immersion at NUS and career exposure at Glints with structured global learning experience.",
  },
];
export default function SGITPage() {
  return (
 <main className="min-h-screen bg-gradient-to-b from-white to-[#eaf2ff] text-[#294154] font-geologica">
      <Header />

      

        {/* ================= HERO ================= */}
<section className="relative overflow-hidden">

  {/* BACKGROUND IMAGE */}
  <div className="absolute inset-0 bg-[url('/images/contents/stories/member-stories/banner/singapore-banner.png')] bg-cover bg-center" />
  <div className="absolute inset-0 bg-gradient-to-b from-[#2F4157]/90 via-[#2F4157]/85 to-[#1f2d3d]/95" />

  <div className="relative max-w-6xl mx-auto px-6 py-15">

    {/* BADGE */}
    <div className="inline-flex items-center gap-2 bg-[#E56668]/20 text-[#FFD7D8] border border-[#E56668]/40 px-4 py-2 rounded-full text-sm font-semibold mb-6">
      <span className="w-2 h-2 bg-[#E56668] rounded-full animate-pulse" />
      COMING SOON! Registration Opens — February 2026
    </div>

    {/* TITLE */}
<div className="mb-6">
  <Image
    src="/images/logos/events/sgit.png"
    alt="Singapore Global Insight Trip"
    width={270}
    height={72}
    className="
     h-38 sm:h-55 w-auto object-contain
      brightness-0 invert
      opacity-90
    "
    priority
  />
</div>

    {/* TAGLINE */}
    <p className="mt-6 text-lg text-white/90 max-w-3xl">
      From Global Exposure to Local Impact
    </p>

    {/* DESCRIPTION */}
    <p className="mt-4 text-white/80 max-w-3xl leading-relaxed">
      A flagship international exposure program by IELS — designed to prepare
      Indonesian students and young professionals to access global education
      and career ecosystems, and translate that exposure into real impact
      back home.
    </p>

    {/* CTA */}
    <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <button
      disabled
        className="
          bg-[#E56668] text-white
          hover:bg-[#C04C4E]
          px-10 py-3
          rounded-full
          font-semibold
          shadow-lg hover:shadow-xl
          transition-all duration-300
          active:scale-[0.97] cursor-not-allowed w-full sm:w-auto
    max-w-full
        "
      >
        Register — Feb 2026
      </button>

      <span className="text-sm text-white/70">
        Limited & selective program
      </span>
    </div>
  </div>
</section>

        {/* ================= INTRO ================= */}
        <section className="max-w-5xl mx-auto px-6 py-20 space-y-6">
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

        </section>

        {/* ================= WHY SGIT ================= */}
        <section className="bg-[#F7F8FA] py-5">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-extrabold mb-6">
              Why Singapore Global Insight Trip Exists
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              Many Indonesian students and young professionals have the potential
              to compete globally — but lack access to international academic
              environments, global career standards, and opportunities to use
              English meaningfully.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li>• Understanding global academic & career expectations</li>
              <li>• Strengthening English as a working skill</li>
              <li>• Translating exposure into community-level impact</li>
            </ul>
          </div>
        </section>

 {/* ================= SDG FOCUS ================= */}
<section className="py-24 px-6">
  <div className="max-w-6xl mx-auto">

    {/* HEADER */}
    <div className="text-center mb-20">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F4157] mb-4">
        Core Focus Areas (SDG-Aligned)
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto">
        SGIT is designed to create <b>measurable educational and economic impact</b>,
        aligned with global Sustainable Development Goals.
      </p>
    </div>

    {/* GRID */}
    <div className="grid gap-10 sm:grid-cols-2">

      {/* SDG 4 */}
      <div className="group relative rounded-3xl overflow-hidden border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#E56668]/60">
        {/* IMAGE */}
        <div className="relative h-56">
          <img
            src="/images/contents/general/sdg4.jpg"
            alt="SDG 4 Quality Education"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-5 left-6 right-6">
            <h3 className="text-2xl font-bold text-white">
              SDG 4 — Quality Education
            </h3>
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative p-8">

          {/* ACCENT BAR */}
          <div className="absolute left-0 top-8 bottom-8 w-1 rounded-full bg-[#E56668]" />

          <div className="pl-4 space-y-3 text-gray-700 text-sm leading-relaxed">
            <p>
              SGIT expands access to international education exposure —
              connecting English learning with real academic environments.
            </p>
            <ul className="space-y-2">
              <li>• International education pathways awareness</li>
              <li>• Exposure to global academic ecosystems</li>
              <li>• English used in real academic contexts</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SDG 8 */}
      <div className="group relative rounded-3xl overflow-hidden border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#E56668]/60">
        {/* IMAGE */}
        <div className="relative h-56">
          <img
            src="/images/contents/careers/iels_team_0.png"
            alt="SDG 8 Decent Work"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-5 left-6 right-6">
            <h3 className="text-2xl font-bold text-white">
              SDG 8 — Decent Work & Economic Growth
            </h3>
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative p-8">

          {/* ACCENT BAR */}
          <div className="absolute left-0 top-8 bottom-8 w-1 rounded-full bg-[#E56668]" />

          <div className="pl-4 space-y-3 text-gray-700 text-sm leading-relaxed">
            <p>
              Participants learn how global career systems work —
              and how English functions as professional infrastructure.
            </p>
            <ul className="space-y-2">
              <li>• Global hiring & career readiness standards</li>
              <li>• English for professional & remote work</li>
              <li>• Exposure to international employability models</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
{/* ================= PROGRAM HIGHLIGHTS ================= */}
<section className="bg-[#F7F8FA] py-10 px-6">
  <div className="max-w-6xl mx-auto">

    {/* HEADER */}
    <div className="text-center mb-20">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F4157] mb-4">
        Program Highlights
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto">
        SGIT is designed as a <b>learning + exposure system</b>,
        not a one-off international visit.
      </p>
    </div>

    {/* GRID */}
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

      {[
        {
          icon: "🎓",
          title: "Academic Immersion @ NUS",
          proof: "World-class academic exposure",
          points: [
            "Campus immersion & guided exploration",
            "Academic dialogue & student interaction",
            "Understanding global learning culture",
          ],
        },
        {
          icon: "💼",
          title: "Career Exposure @ Glints",
          proof: "Real-world employability insight",
          points: [
            "Global & regional hiring standards",
            "English for professional communication",
            "Remote & international career pathways",
          ],
        },
        {
          icon: "🌍",
          title: "English in Real Contexts",
          proof: "Beyond classrooms & test scores",
          points: [
            "Professional discussions in English",
            "Project presentations & explanations",
            "Confidence-building through real usage",
          ],
        },
      ].map((item, i) => (
        <div
          key={i}
          className="
            relative rounded-3xl border bg-white p-7
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-2xl hover:border-[#E56668]/60
          "
        >
          {/* ACCENT BAR */}
          <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-[#E56668]" />

          <div className="pl-4 flex flex-col gap-4">

            {/* HEADER */}
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="text-xl font-bold text-[#2F4157]">
                {item.title}
              </h3>
            </div>

            {/* PROOF */}
            <p className="text-sm font-semibold text-[#E56668]">
              {item.proof}
            </p>

            {/* DETAILS */}
            <ul className="text-sm text-gray-600 space-y-2 leading-relaxed">
              {item.points.map((p, idx) => (
                <li key={idx}>• {p}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

    </div>
  </div>
</section>

 {/* ================= PROGRAM STRUCTURE & TIMELINE ================= */}
<section className="bg-[#F7F8FA] py-10 overflow-hidden">

  {/* HEADER */}
  <div className="text-center mb-10 px-6">
    <h2 className="text-3xl font-extrabold text-[#2F4157] mb-3">
      Program Structure & Timeline
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto">
      A multi-phase journey — from preparation and selection
      to global exposure and post-trip impact.
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

        {timeline.map((item, i) => (
          <div
            key={i}
            className="
              group relative min-w-[320px] max-w-[320px]
              rounded-3xl bg-white p-6
              border border-gray-200
              transition-all duration-300
              hover:shadow-xl hover:-translate-y-1
            "
          >
            {/* PHASE */}
            <p className="text-xs font-semibold text-[#E56668] mb-2 uppercase tracking-wide">
              {item.phase}
            </p>

            {/* TITLE */}
            <h3 className="text-lg font-bold text-[#2F4157] mb-1">
              {item.title}
            </h3>

            {/* DATE */}
            <p className="text-sm text-gray-500 mb-3">
              {item.date}
            </p>

            {/* DESC */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </div>
  </div>

  {/* FOOTNOTE */}
  <p className="mt-10 text-sm text-gray-600 max-w-4xl mx-auto px-6 text-center">
    Timeline is subject to refinement. Detailed briefings and
    official instructions will be shared with selected participants.
  </p>
</section>

{/* ================= MENTORSHIP CTA ================= */}
<section className="relative bg-[#2f4157] py-15 overflow-hidden">
  
  {/* SUBTLE BACKGROUND GLOW */}
  <div className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-[#E56668]/20 rounded-full blur-[120px]" />
  <div className="absolute -bottom-24 -left-24 w-[420px] h-[420px] bg-white/10 rounded-full blur-[120px]" />

  <div className="relative max-w-6xl mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

{/* IMAGE COLLAGE */}
<div className="relative h-[300px] sm:h-[360px] lg:h-[440px] w-full flex items-center justify-center">

  {/* IMAGE 1 (BACK) */}
  <div
    className="
      absolute
      left-4 sm:left-6 lg:left-0
      top-10 sm:top-8 lg:top-10

      w-[78%] sm:w-[70%] lg:w-[65%]

      rotate-[-3deg] lg:rotate-[-6deg]

      rounded-3xl
      border-4 border-white
      shadow-2xl
      overflow-hidden
      z-10
    "
  >
    <Image
      src="/images/contents/careers/iels_team_2.png"
      alt="SGIT Mentoring Session"
      width={600}
      height={420}
      className="object-cover"
    />
  </div>

  {/* IMAGE 2 (FRONT) */}
  <div
    className="
      absolute
      right-2 sm:right-4 lg:right-0
      bottom-6 sm:bottom-4 lg:bottom-8

      w-[82%] sm:w-[75%] lg:w-[70%]

      rotate-[2deg] lg:rotate-[4deg]

      rounded-3xl
      border-4 border-white
      shadow-2xl
      overflow-hidden
      z-20
    "
  >
    <Image
      src="/images/contents/careers/iels_team_3.png"
      alt="SGIT Group Discussion"
      width={600}
      height={420}
      className="object-cover"
    />
  </div>

</div>

      {/* CONTENT SIDE */}
      <div className="text-white">

  <div className="mb-6">
  <Image
    src="/images/logos/events/sgit.png"
    alt="Singapore Global Insight Trip"
    width={270}
    height={72}
    className="
     h-15 w-auto
      brightness-0 invert
      opacity-90
    "
    priority
  /></div>


        {/* HEADLINE */}
        <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-6">
          Want to <span className="text-[#E56668]">Increase Your Chance</span> of SGIT Selection?
        </h2>

        {/* DESCRIPTION */}
        <p className="text-white/90 leading-relaxed max-w-xl mb-8">
          Join <b>SGIT Project Prep Mentoring</b> — a founder-led preparation
          program focused on <b>project clarity</b>, <b>English communication</b>,
          and <b>interview readiness</b>.
          <br /><br />
          This is not a webinar.  
          This is where serious candidates are sharpened.
        </p>

        {/* PROOF POINTS */}
        <ul className="space-y-3 text-sm text-white/80 mb-10">
          <li>• Founder-led mentoring & real project feedback</li>
          <li>• Priority advantage in SGIT Phase 2</li>
          <li>• International-standard project & interview prep</li>
        </ul>

        {/* CTA */}
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
    href="/events/sgit/mentoring"
  >
    Join SGIT Project Prep
  </Link>
</Button>
      </div>
    </div>
  </div>
  {/* ================= FOOTER NOTE ================= */}
<div className="max-w-6xl mx-auto px-6 py-15">
  <div className="relative rounded-3xl border border-[#E56668]/30 bg-[#FFF7F7] p-8 md:p-10">

    {/* ACCENT BAR */}
    <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-[#E56668]" />

    <div className="pl-4 space-y-4 text-gray-700">
      <p className="font-semibold text-[#2F4157]">
        SGIT is a selective and limited-capacity program.
      </p>

      <p className="text-sm leading-relaxed">
        Participation in preparation programs does <b>not guarantee selection</b>.
        Every decision is based on readiness, commitment, clarity of purpose,
        and orientation toward long-term impact.
      </p>

      <p className="text-sm leading-relaxed">
        This program is designed for participants who are willing to prepare
        seriously — not just apply casually.
      </p>

      {/* SOCIAL */}
      <div className="pt-4 border-t border-[#E56668]/20 text-sm">
        Follow official updates on Instagram{" "}
        <span className="font-semibold text-[#E56668]">@iels_co</span>{" "}
        or revisit this page regularly.
      </div>
    </div>
  </div>
</div>
</section>



  

      <Footer />
      </main>
  );
}