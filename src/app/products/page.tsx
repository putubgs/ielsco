"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ProductsPage() {
  const [pressed, setPressed] = useState<string | null>(null);

  const products = [
    {
      name: "IELS Lounge",
      desc: "A structured English learning community for daily practice, mentorship, and global networking.",
      emoji: "💬",
      href: "/iels-lounge",
    },
    {
      name: "IELS Courses",
      desc: "Guided English courses focused on real-world communication, tests, and professional growth.",
      emoji: "🎓",
      href: "/products/courses",
    },
    {
      name: "IELS English Test",
      desc: "IELTS, TOEFL, and TOEIC mock tests with AI scoring and educator feedback.",
      emoji: "🧠",
      href: "/test",
    },
    {
      name: "IELS for Schools",
      desc: "One-year structured English programs for schools & universities with measurable outcomes.",
      emoji: "🏫",
      href: "/products/schools",
    },
    {
      name: "Resources & Recordings",
      desc: "Premium e-books, recorded sessions, and digital resources for independent learning.",
      emoji: "📚",
      href: "/products/resources",
    },
  ];

  const events = [
    {
      title: "English Global Festival",
      desc: "IELS flagship annual event connecting English learners, educators, and global partners.",
    },
    {
      title: "Step Up!",
      desc: "Skill-boosting program focused on academic & professional English readiness.",
    },
    {
      title: "IELS Insight Series",
      desc: "Regular discussions with mentors, universities, and global professionals.",
    },
    {
      title: "Singapore Global Insight Trip",
      desc: "International exposure program with universities & institutions in Singapore.",
    },
  ];

  return (
    <div>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-white to-[#f7f9f8] text-[#294154]">

        {/* ================= HERO ================= */}
        <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
            The IELS Learning Ecosystem 🌍
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            IELS is not just a course or a community.  
            It is a connected ecosystem designed to help learners grow, perform,
            and access global opportunities.
          </p>
        </section>

        {/* ================= PRODUCTS ================= */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => {
              const isActive = pressed === p.name;

              return (
                <Link
                  key={p.name}
                  href={p.href}
                  onPointerDown={() => setPressed(p.name)}
                  onPointerUp={() => setTimeout(() => setPressed(null), 120)}
                  onPointerLeave={() => setPressed(null)}
                  className={`
                    relative group rounded-3xl border bg-white p-8
                    transition-all duration-300
                    ${
                      isActive
                        ? "border-[#E56668] shadow-2xl -translate-y-1"
                        : "border-[#294154]/10 hover:border-[#E56668]/60 hover:-translate-y-1 hover:shadow-xl"
                    }
                  `}
                >
                  {/* Accent */}
                  <div
                    className={`
                      absolute left-0 top-6 bottom-6 w-1 rounded-full
                      transition-all duration-300
                      ${isActive ? "bg-[#E56668]" : "bg-transparent group-hover:bg-[#E56668]"}
                    `}
                  />

                  <div className="pl-4 flex flex-col h-full justify-between gap-6">
                    <div>
                      <div className="text-4xl mb-4">{p.emoji}</div>
                      <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                      <p className="text-gray-600 text-sm">{p.desc}</p>
                    </div>

                    <span
                      className={`
                        text-sm font-semibold text-[#E56668]
                        transition-all duration-300
                        ${
                          isActive
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                        }
                      `}
                    >
                      Explore →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

{/* ================= FLAGSHIP EVENTS (EDITORIAL) ================= */}
<section className="py-24 px-6">
  <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 items-center">

    {/* LEFT — EVENT DOCUMENTATION IMAGE */}
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl shadow-xl">
      <img
        src="/images/contents/careers/iels_team_0.png"
        alt="IELS Flagship Event"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* SOFT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#2F4157]/40 via-transparent to-transparent" />
    </div>

    {/* RIGHT — CONTENT */}
    <div className="flex flex-col gap-6">

      <div>
        <p className="uppercase tracking-widest text-sm text-[#E56668] font-semibold mb-3">
          IELS Experiences
        </p>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2F4157] mb-4">
          Inside IELS Flagship Events
        </h2>

        <p className="text-gray-600 max-w-xl leading-relaxed">
          IELS events are not seminars or webinars.
          They are <b>real exposure platforms</b> where learners collaborate,
          present ideas, and connect with global institutions.
        </p>
      </div>

      {/* EVENT LIST */}
      <ul className="space-y-4">
        {[
          "English Global Festival",
          "Step Up!",
          "IELS Insight Series",
          "Singapore Global Insight Trip",
        ].map((event) => (
          <li
            key={event}
            className="
              flex items-center gap-3 text-[#2F4157]
              font-semibold
            "
          >
            <span className="w-2 h-2 rounded-full bg-[#E56668]" />
            {event}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="pt-4">
        <Button
          asChild
          className="bg-[#E56668] text-white px-8 py-3 hover:bg-[#C04C4E]"
        >
          <Link href="/events">
            See What&apos;s Running Now
          </Link>
        </Button>
      </div>
    </div>

  </div>
</section>

      </main>

      <Footer />
    </div>
  );
}