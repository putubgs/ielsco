"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import {
  Instagram,
  Linkedin,
  ExternalLink,
  Globe2,
  Target,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function About() {
  const principals = [
    {
      name: "Arbadza Rido Adzariyat",
      role: "Principal of Operations & Business",
      image: "/images/contents/about/arba.png",
      instagram: "https://instagram.com/arbadzarido",
      linkedin: "https://linkedin.com/in/arbadzarido",
    },
    {
      name: "Fadhila Qurotul Aini",
      role: "Principal of Growth & Finance",
      image: "/images/contents/about/dhila.png",
      instagram: "https://www.instagram.com/fadhilaqa._/",
      linkedin: "https://linkedin.com/in/fadhilaqa/",
    },
    {
      name: "Syifa Hana Nabila",
      role: "Principal of Talent",
      image: "/images/contents/about/hana.png",
      instagram: "https://www.instagram.com/ssyifahana/",
      linkedin: "https://www.linkedin.com/in/syifahana/",
    },
  ];

  return (
    <div className="bg-white min-h-screen text-[#2F4157] font-sans selection:bg-[#E56668] selection:text-white">
      <Header />

      {/* =========================================
          1️⃣ THE PROBLEM (HERO SECTION)
      ========================================= */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-6 max-w-5xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/logos/iels_blue.png"
            width={200}
            height={200}
            alt="IELS Logo"
            className="w-[120px] sm:w-[160px] h-auto object-contain"
          />
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-8">
          Indonesia has millions of <br className="hidden sm:block" />
          talented students. <br />
          <span className="text-[#E56668]">But talent alone is not enough.</span>
        </h1>

        <div className="max-w-3xl mx-auto space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed">
          <p>
            Many students have dreams to study abroad, work in global companies, win
            scholarships, or build international careers — yet they lack access, structure,
            and the right environment to turn those dreams into reality.
          </p>
          <p className="font-semibold text-xl sm:text-2xl text-[#2F4157] mt-8">
            English is often seen as a subject. <br />
            But in reality, <span className="text-[#E56668]">English is access.</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-6 font-bold text-[#2F4157] text-lg mt-4">
            <span className="flex items-center justify-center gap-2">
              <Globe2 size={20} className="text-[#E56668]" /> Access to information.
            </span>
            <span className="flex items-center justify-center gap-2">
              <Target size={20} className="text-[#E56668]" /> Access to opportunities.
            </span>
            <span className="flex items-center justify-center gap-2">
              <Compass size={20} className="text-[#E56668]" /> Access to the world.
            </span>
          </div>
          <p className="pt-6 font-medium">That gap is what IELS exists to solve.</p>
        </div>
      </section>

      {/* =========================================
          2️⃣ OUR BELIEF (NIGHTFALL BACKGROUND)
      ========================================= */}
      <section className="bg-[#2F4157] text-white py-20 sm:py-28 px-6 rounded-t-[40px] sm:rounded-t-[60px]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-widest text-[#E56668] text-sm font-bold mb-3">
              Our Belief
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
              Ambitious students deserve more than classes.
            </h2>
            <p className="text-lg text-white/80">They deserve an ecosystem that pushes them forward.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Clarity", desc: "In their goals and life direction." },
              { title: "Structure", desc: "A clear development path to follow." },
              { title: "Mentorship", desc: "From people who have walked the journey." },
              { title: "Community", desc: "An environment that pushes them forward." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-[#E56668] flex items-center justify-center font-bold text-lg mb-4">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto border-t border-white/20 pt-10">
            <p className="text-xl sm:text-2xl font-semibold leading-relaxed">
              We believe English is not the final goal. <br />
              <span className="text-[#E56668]">
                It is the bridge toward global academic and professional opportunities.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          3️⃣ WHAT IS IELS?
      ========================================= */}
      <section className="py-20 sm:py-28 px-6 max-w-4xl mx-auto text-center">
        <p className="uppercase tracking-widest text-gray-400 text-sm font-bold mb-3">
          What Is IELS?
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 leading-tight">
          A goal-driven English development ecosystem designed for ambitious Indonesian students.
        </h2>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          We combine structured English growth, mentorship, leadership exposure, and
          opportunity preparation into one integrated journey.
        </p>
        <div className="bg-[#F7F8FA] p-6 sm:p-8 rounded-3xl border border-gray-100 inline-block mb-10">
          <p className="font-bold text-xl sm:text-2xl">
            This is not just about improving speaking skills. <br />
            <span className="text-[#E56668]">This is about building students who are globally ready.</span>
          </p>
        </div>

        {/* STRATEGIC PLAN CTA */}
        <div>
          <a
            href="https://drive.google.com/file/d/1JgTczzvuf6nwpMMkLmMUGO0TrUkkJLXN/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-3
              bg-[#E56668] text-white
              px-8 py-4
              rounded-2xl
              font-bold text-base sm:text-lg
              shadow-lg shadow-[#E56668]/30
              transition-all duration-300
              hover:bg-[#c94f51] hover:-translate-y-1 hover:shadow-xl
              active:scale-95
              w-full sm:w-auto
            "
          >
            Read Our 1-Year Strategic Plan
            <ExternalLink size={20} />
          </a>
        </div>
      </section>

      {/* =========================================
          4️⃣ HOW WE WORK (PATHWAY)
      ========================================= */}
      <section className="bg-[#F7F8FA] py-20 sm:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-widest text-[#E56668] text-sm font-bold mb-3">
              How We Work
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Growth at IELS is intentional, not random.
            </h2>
            <p className="text-gray-600">IELS is built around a structured growth pathway.</p>
          </div>

          {/* Timeline Flow */}
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-4 sm:gap-6 justify-center">
            {[
              { step: "Clarity", text: "Define your global goals." },
              { step: "Development", text: "Strengthen English & professional skills." },
              { step: "Exposure", text: "Prepare for scholarships, remote work, etc." },
              { step: "Opportunity", text: "Access real international opportunities." },
              { step: "Alumni Impact", text: "Return as mentors and contributors." },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm w-full lg:w-48 h-full flex flex-col justify-center">
                  <h4 className="font-bold text-lg text-[#2F4157] mb-2">{item.step}</h4>
                  <p className="text-sm text-gray-500">{item.text}</p>
                </div>
                {/* Arrow - hidden on last item */}
                {idx !== 4 && (
                  <ArrowRight className="hidden lg:block text-gray-300 shrink-0" size={24} />
                )}
                {/* Mobile down arrow */}
                {idx !== 4 && (
                  <div className="block lg:hidden w-px h-6 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          5️⃣ WHO IS IELS FOR?
      ========================================= */}
      <section className="py-20 sm:py-28 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="uppercase tracking-widest text-gray-400 text-sm font-bold mb-3">
              Who Is IELS For?
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 leading-tight">
              For ambitious, growth-oriented students.
            </h2>
            <ul className="space-y-4">
              {[
                "Have big academic or career aspirations",
                "Want global exposure",
                "Are ready to commit to consistent development",
                "Believe that English is a tool to unlock bigger opportunities",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#E56668] shrink-0 mt-1" size={20} />
                  <span className="text-gray-700 font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#2F4157] text-white p-8 sm:p-12 rounded-[32px] text-center shadow-xl">
            <XCircle className="text-white/30 mx-auto mb-6" size={48} />
            <h3 className="text-2xl font-bold mb-4">We are not for everyone.</h3>
            <p className="text-white/80 text-lg">
              If you are just looking for a casual English chat without a clear goal, 
              we might not be the right fit. <br /><br />
              <span className="font-bold text-white">And that’s intentional.</span>
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          6️⃣ THE BIGGER VISION
      ========================================= */}
      <section className="bg-[#E56668] text-white py-20 sm:py-28 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="uppercase tracking-widest text-white/80 text-sm font-bold mb-3">
            The Bigger Vision
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-8 leading-tight">
            Our vision is to build a generation of globally competitive Indonesian leaders.
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            We aim to create thousands of alumni who study abroad, work in global
            companies, lead international projects, and contribute back to Indonesia.
          </p>
          
          <div className="bg-[#c94f51] rounded-3xl p-8 sm:p-10 inline-block">
            <h3 className="text-2xl sm:text-3xl font-bold leading-relaxed">
              IELS is not just building English skills. <br />
              We are building access. <br />
              We are building exposure. <br />
              We are building global readiness.
            </h3>
          </div>
        </div>
      </section>

      {/* =========================================
          7️⃣ THE TEAM
      ========================================= */}
      <section className="py-20 sm:py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-widest text-gray-400 text-sm font-bold mb-3">
              Organizational Team
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Meet the Principals
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Behind every initiative of IELS is a strong and passionate team committed 
              to building a platform that connects Indonesian students with global opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {principals.map((p) => (
              <div
                key={p.name}
                className="
                  group bg-[#F7F8FA] rounded-[32px] p-8
                  flex flex-col items-center text-center
                  border border-gray-100
                  transition-all duration-300
                  hover:-translate-y-2 hover:shadow-xl hover:shadow-[#2F4157]/5
                "
              >
                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-[#E56668] rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={144}
                    height={144}
                    className="
                      w-36 h-36 rounded-full object-cover relative z-10
                      transition-transform duration-300
                      group-hover:scale-105 border-4 border-white shadow-sm
                    "
                  />
                </div>

                {/* Name */}
                <h4 className="font-bold text-xl text-[#2F4157] mb-1">
                  {p.name}
                </h4>

                {/* Role */}
                <p className="text-sm text-[#E56668] font-semibold mb-6 uppercase tracking-wider">
                  {p.role}
                </p>

                {/* Socials */}
                <div className="flex gap-4 mt-auto">
                  <a
                    href={p.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      p-3 rounded-2xl bg-white border border-gray-200
                      text-gray-500 hover:text-white hover:bg-[#E56668] hover:border-[#E56668]
                      transition-all duration-200 active:scale-95
                    "
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>

                  <a
                    href={p.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      p-3 rounded-2xl bg-white border border-gray-200
                      text-gray-500 hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2]
                      transition-all duration-200 active:scale-95
                    "
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}