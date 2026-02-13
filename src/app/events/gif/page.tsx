"use client";
import { BookOpen, Briefcase, Clock, Search, Rocket, FileText, ArrowRight, CheckCircle, XCircle, Calendar, ShieldCheck, Gem, Users } from 'lucide-react';
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
    phase: "GIF Selection — Phase 1",
    date: "16 Feb – 23 Mar 2026",
    title: "Administration Screening",
    desc: "Initial screening of motivation, background, and readiness to join a global exposure program.",
  },
  {
    phase: "GIF Selection — Phase 2",
    date: "4 – 11 Apr 2026",
    title: "Essay & Project Submission",
    desc: "Participants submit essays and SDG-aligned project ideas. Mentoring participants receive priority advantage.",
  },
  {
    phase: "GIF Selection — Phase 3",
    date: "15 – 22 Apr 2026",
    title: "Interview & Project Presentation",
    desc: "Final evaluation through structured interviews and project presentations.",
  },
  {
    phase: "Final Announcement",
    date: "25 Apr 2026",
    title: "Selected Participants Revealed",
    desc: "Official announcement of GIF 2026 delegates.",
  },
  {
    phase: "Global Impact Fellowship in Singapore",
    date: "5 – 12 May 2026",
    title: "Academic & Career Immersion",
    desc: "Academic immersion at NUS and career exposure at Glints with structured global learning experience.",
  },
];
export default function SGITPage() {
  return (
 <main className="min-h-screen bg-gradient-to-b from-white to-[#eaf2ff] text-[#294154] font-geologica">
      <Header />

      

  <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-[#2F4157]">
      <div className="absolute inset-0 bg-[url('/images/contents/stories/member-stories/banner/singapore-banner.png')] bg-cover bg-center" />
      {/* BACKGROUND IMAGE & OVERLAY */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/singapore-bg.jpg" 
          alt="Singapore Skyline"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient Overlay tetap ada supaya teks jelas */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2F4157]/90 via-[#2F4157]/85 to-[#1a2533]/95" />
      </div>

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 text-center">
        
        {/* LOGO EVENT - Diperkecil */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-[#E56668] blur-[30px] opacity-20 rounded-full"></div>
            <Image
              src="/images/logos/events/gifsg.png"
              alt="Global Impact Fellowship in Singapore"
              width={200}
              height={80}
              // UBAHAN 2: Ukuran logo lebih compact
              className="relative h-auto w-[240px] md:w-[280px] drop-shadow-xl"
              priority
            />
          </div>
        </div>

        {/* HEADLINE - Font size dikurangi */}
        {/* UBAHAN 3: text-4xl jadi 3xl, md:text-6xl jadi 5xl */}
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Bridging Indonesian Potential <br className="hidden md:block" />
          with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E56668] to-orange-400">Global Excellence.</span>
        </h1>

        {/* SUBHEADLINE */}
        <p className="text-base md:text-lg text-gray-200 max-w-xl mx-auto leading-relaxed mb-8 font-light">
          A high-stakes leadership and project incubation for future leaders to design and execute meaningful projects for Indonesia.
         
        </p>

        {/* FUNDING BADGES - Padding diperkecil */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <div className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-2 text-xs md:text-sm text-white font-medium shadow-sm">
            <CheckCircle className="w-4 h-4 text-[#E56668]" /> 
            <span>10 Fully Funded</span>
          </div>
          <div className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-2 text-xs md:text-sm text-white font-medium shadow-sm">
            <CheckCircle className="w-4 h-4 text-[#E56668]" /> 
            <span>10 Partially Funded</span>
          </div>
        </div>

        {/* CTA BUTTON - Lebih ramping */}
        <div className="flex flex-col items-center gap-3">
         <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#C04C4E] shadow-lg">
                      <Link href="/events/gif">Apply - 16 Feb 2026  <ArrowRight className="w-5 h-5"/></Link>
                    </Button> 
          
          <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">
            Limited & Selective Program
          </span>
        </div>

      </div>
    </section>

     {/* ================= FUNDING & QUOTA (THE HIGHLIGHT) ================= */}
      <section className="py-12 px-6 from-white to-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-[#2F4157] mb-4">
              Merit-Based. Transparent. <br/> <span className="text-[#E56668]">No Hidden Business Models.</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Unlike commercial programs where "1 Fully Funded" seat is subsidized by hundreds of paid participants, 
              <strong> GIF is genuinely sponsored</strong>. We invest in 20 leaders who have the potential to change Indonesia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* FULLY FUNDED CARD */}
            <div className="relative bg-white rounded-3xl p-8 border-2 border-[#E56668] shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-0 right-0 bg-[#E56668] text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl rounded-tr-2xl uppercase tracking-wider">
                Top 10 Candidates
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-50 rounded-xl text-[#E56668]">
                  <Gem className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2F4157]">Fully Funded</h3>
                  <p className="text-sm text-gray-500">10 Seats Available</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Round-trip Flights (Jakarta - SG)",
                  "NUS Campus Accommodation",
                  "All Meals & Transport in SG",
                  "Program & Workshop Fees",
                  "Visa & Travel Insurance"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#E56668] shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="text-center bg-red-50 text-[#E56668] py-2 rounded-lg text-sm font-bold">
                $0 Cost for Delegates
              </div>
            </div>

            {/* PARTIALLY FUNDED CARD */}
            <div className="relative bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:border-[#2F4157]/30 transform hover:-translate-y-2 transition-all duration-300">
              <div className="absolute top-0 right-0 bg-[#2F4157] text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl rounded-tr-2xl uppercase tracking-wider">
                Next Top 10 Candidates
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-xl text-[#2F4157]">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2F4157]">Partially Funded</h3>
                  <p className="text-sm text-gray-500">10 Seats Available</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "NUS Campus Accommodation",
                  "All Meals & Transport in SG",
                  "Program & Workshop Fees"
                  
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#2F4157] shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
                <li className="flex items-start gap-3 text-gray-400 line-through decoration-gray-400">
                  <XCircle className="w-5 h-5 text-gray-300 shrink-0" />
                  <span className="text-sm">"Visa & Travel Insurance"</span></li>
                <li className="flex items-start gap-3 text-gray-400 line-through decoration-gray-400">
                  <XCircle className="w-5 h-5 text-gray-300 shrink-0" />
                  <span className="text-sm">Round-trip Flights (Self-Funded)</span>
                </li>
              </ul>
              <div className="text-center bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-bold">
                Flights Covered by Delegate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT IS GIF (Definition) ================= */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2F4157]">
              More Than Just <br/> A Visit.
            </h2>
            <div className="h-1 w-20 bg-[#E56668] rounded-full"></div>
            <p className="text-gray-600 text-lg leading-relaxed">
              The Global Impact Fellowship (GIF) is designed to equip Indonesian students with 
              <strong> global academic awareness</strong>, <strong>career readiness</strong>, and <strong>leadership responsibility</strong>.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We connect participants directly with Singapore’s world-class ecosystem—through 
              <strong> National University of Singapore (NUS)</strong> and <strong>Glints</strong>—to explore how English proficiency and real-world skills intersect in top universities.
            </p>
          </div>
          
          {/* Comparison Card */}
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden group hover:border-[#E56668]/30 transition-all">
            <div className="absolute top-0 right-0 bg-[#2F4157] text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
              THE IELS STANDARD
            </div>
            <h3 className="text-xl font-bold text-[#2F4157] mb-6">What Makes GIF Different?</h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3 opacity-50">
                <XCircle className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
                <span className="text-gray-500 line-through decoration-gray-400">Just a sightseeing tour</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#E56668] mt-1 shrink-0" />
                <span className="text-gray-700 font-medium">Mandatory Academic Research & SDG Project</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#E56668] mt-1 shrink-0" />
                <span className="text-gray-700 font-medium">Accountability to post-trip outcomes</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#E56668] mt-1 shrink-0" />
                <span className="text-gray-700 font-medium">Long-term ecosystem guidance by IELS</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* ================= DUAL TRACK LEARNING ================= */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#2F4157] mb-4">Dual-Track Learning Ecosystem</h2>
            <p className="text-gray-600">Benchmarking against the best in Academia and Industry.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* NUS Track */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#2F4157] transition-colors">
                <BookOpen className="w-6 h-6 text-[#2F4157] group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2F4157] mb-2">Academic Excellence</h3>
              <p className="text-sm font-semibold text-[#E56668] mb-4 tracking-wide uppercase">National University of Singapore (NUS)</p>
              <p className="text-gray-600 mb-6">
                Fellows conduct applied research inspired by Singapore’s education system.
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-gray-700">
                  <span className="text-[#E56668]">•</span> Innovation culture & research rigor
                </li>
                <li className="flex gap-3 text-sm text-gray-700">
                  <span className="text-[#E56668]">•</span> English as an academic mobility tool
                </li>
                <li className="flex gap-3 text-sm text-gray-700">
                  <span className="text-[#E56668]">•</span> Output: <strong>Research Paper</strong>
                </li>
              </ul>
            </div>

            {/* Glints Track */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#E56668] transition-colors">
                <Briefcase className="w-6 h-6 text-[#E56668] group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2F4157] mb-2">Career Readiness</h3>
              <p className="text-sm font-semibold text-[#E56668] mb-4 tracking-wide uppercase">Glints Singapore HQ</p>
              <p className="text-gray-600 mb-6">
                Fellows analyze how global hiring ecosystems operate in Southeast Asia.
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-gray-700">
                  <span className="text-[#E56668]">•</span> International employability standards
                </li>
                <li className="flex gap-3 text-sm text-gray-700">
                  <span className="text-[#E56668]">•</span> Remote work & regional career paths
                </li>
                <li className="flex gap-3 text-sm text-gray-700">
                  <span className="text-[#E56668]">•</span> Output: <strong>Career Roadmap</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

 {/* ================= SDG FOCUS ================= */}
<section className="py-12 px-6">
  <div className="max-w-6xl mx-auto">

    {/* HEADER */}
    <div className="text-center mb-20">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F4157] mb-4">
        Core Focus Areas
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto">
        GIF is designed to create <b>measurable educational and economic impact</b>,
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
              GIF expands access to international education exposure —
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

 {/* ================= PROGRAM STRUCTURE & TIMELINE ================= */}
<section className="py-10 overflow-hidden">

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
<section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#2F4157] px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-blue-100">
            <Clock className="w-4 h-4 text-[#E56668]" />
            <span>Post-Residency Phase</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F4157] mb-4">
            The Real Impact Happens <span className="text-[#E56668]">Back Home</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            The Singapore trip is just the spark. Upon returning to Indonesia, Fellows enter a 
            <strong> 6-month incubation period</strong> facilitated by IELS to turn their insights into tangible outcomes.
          </p>
        </div>

        {/* CONTENT GRID */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* CARD 1: PROJECT REALIZATION */}
          <div className="relative bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#E56668]/30 transition-all duration-300 group">
            
            {/* ICON HEADER */}
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#E56668] transition-colors duration-300">
              <Rocket className="w-8 h-8 text-[#E56668] group-hover:text-white transition-colors" />
            </div>

            <h3 className="text-2xl font-bold text-[#2F4157] mb-3">Project Realization</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Fellows must execute the social project they proposed during the incubation. 
              This is where ideas meet reality—solving real problems in local communities (SDG 4 or 8).
            </p>

            {/* IELS SUPPORT BLOCK */}
            <div className="bg-[#F7F8FA] rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#2F4157]" />
                <span className="text-sm font-bold text-[#2F4157] uppercase tracking-wide">Facilitated by IELS</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-[#E56668] mt-1">•</span>
                  <span>Access to IELS community pool (2,800+ members) as project audience.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-[#E56668] mt-1">•</span>
                  <span>Monthly progress monitoring & mentorship.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CARD 2: ACADEMIC RESEARCH */}
          <div className="relative bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#E56668]/30 transition-all duration-300 group">
            
            {/* ICON HEADER */}
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#2F4157] transition-colors duration-300">
              <FileText className="w-8 h-8 text-[#2F4157] group-hover:text-white transition-colors" />
            </div>

            <h3 className="text-2xl font-bold text-[#2F4157] mb-3">Academic Research</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Fellows conduct field research based on the frameworks learned at NUS. 
              The goal is to publish evidence-based findings on Indonesia's education or employment challenges.
            </p>

            {/* IELS SUPPORT BLOCK */}
            <div className="bg-[#F7F8FA] rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-5 h-5 text-[#2F4157]" />
                <span className="text-sm font-bold text-[#2F4157] uppercase tracking-wide">Facilitated by IELS</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-[#E56668] mt-1">•</span>
                  <span>Guidance on data processing & paper structure.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-[#E56668] mt-1">•</span>
                  <span>Opportunity to publish in the IELS Knowledge Hub.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* TIMELINE VISUALIZATION (Optional footer) */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 text-center text-sm text-gray-500 bg-gray-50 p-4 rounded-2xl border border-dashed border-gray-300">
           <span className="font-semibold text-[#2F4157]">Timeline:</span>
           <span>May (Singapore Trip)</span>
           <span className="text-gray-300 hidden md:block">→</span>
           <span className="font-bold text-[#E56668]">June - Nov (Execution in Indonesia)</span>
           <span className="text-gray-300 hidden md:block">→</span>
           <span>Dec (Final Impact Report)</span>
        </div>

      </div>
    </section>
{/* ================= CLOSING CTA ================= */}
      <section className="py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <ShieldCheck className="w-4 h-4" /> 20 Exclusive Seats Available
          </div>
          <h2 className="text-3xl font-bold text-[#2F4157] mb-6">Ready to Bridge the Gap?</h2>
          <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            This is a merit-based selection process. We are looking for the top 20 emerging leaders who are ready to research, lead, and implement real change in Indonesia.
          </p>
         
                    <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#C04C4E] shadow-lg">
                      <Link href="/events/gif">Apply for Scholarship <ArrowRight className="w-5 h-5"/></Link>
                    </Button> 
        </div>
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
      alt="GIF Mentoring Session"
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
      alt="GIF Group Discussion"
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
    src="/images/logos/events/gif.png"
    alt="Global Impact Fellowship in Singapore"
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
          Want to <span className="text-[#E56668]">Increase Your Chance</span> of GIF Selection?
        </h2>

        {/* DESCRIPTION */}
        <p className="text-white/90 leading-relaxed max-w-xl mb-8">
          Join <b>GIF Project Prep Mentoring</b> — a founder-led preparation
          program focused on <b>project clarity</b>, <b>English communication</b>,
          and <b>interview readiness</b>.
          <br /><br />
          This is not a webinar.  
          This is where serious candidates are sharpened.
        </p>

        {/* PROOF POINTS */}
        <ul className="space-y-3 text-sm text-white/80 mb-10">
          <li>• Founder-led mentoring & real project feedback</li>
          <li>• Priority advantage in GIF Phase 2</li>
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
    href="/events/gif/mentoring"
  >
    Join GIF Project Prep
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
        GIF is a selective and limited-capacity program.
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