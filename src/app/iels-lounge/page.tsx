"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState } from "react";
import { testimonialsData } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";
import { Button } from "@/components/ui/button"

export default function LoungePage() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((index + 1) % testimonialsData.length);
  const prev = () => setIndex((index - 1 + testimonialsData.length) % testimonialsData.length);

  const testimonial: Testimonial = testimonialsData[index];
  
  const images = [
    "/images/contents/careers/iels_team_0.png",
    "/images/contents/careers/iels_team_1.png",
    "/images/contents/careers/iels_team_2.png",
    "/images/contents/careers/iels_team_3.png",
    "/images/contents/careers/iels_team_4.png",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  const nextSlide = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };


  return (
    <div className="bg-white via-[#f8fbfc] to-[#fff6f6] text-[#294154]">
      <Header />

      <main>
       {/* ===== HERO ===== */}
        <section className="px-6 py-15 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Left text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-snug">
              Practice English Every Night at{" "}
              <span className="text-[#e56668]">IELS Lounge Premium</span>
            </h1>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              <strong>Special This October:</strong> <br />From Sharing Stories to Shaping Ideas 🌍
              <br />
              Daily practice sessions that grow your storytelling, teamwork, and project planning skills.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]"><Link
                href="/iels-lounge/pricing"
        
              >
                Start from Rp25.000 / Month →
              </Link></Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <Image
              src="/images/contents/general/iels_lounge.png"
              alt="IELS Lounge Speaking Club"
              width={500}
              height={400}
              className="rounded-3xl shadow-lg object-cover"
            />
          </div>
        </section>
        {/* ===== SPEAKING CLUB STORY ===== */}
        <section className="py-24 px-6 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">
            What&apos;s IELS Lounge Speaking Club All About?
          </h2>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Speaking Club isn&apos;t just about practicing English every night at{" "}
            <strong>8 PM</strong>. It&apos;s where you share stories, discuss, and
            laugh with friends who are learning just like you. From nightly
            sessions to bi-weekly Zoom events like roleplays and games, to
            monthly events that connect you globally — IELS Lounge helps you
            <strong> build confidence step by step.</strong>
          </p>

         <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 text-left mt-10">{/* Carousel */}
          <div className="relative mt-8 flex justify-center">
            <div className="relative w-[800px] h-[400px] overflow-hidden rounded-2xl shadow-md">
              {images.map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`IELS Image ${index + 1}`}
                  fill
                  className={`object-cover transition-opacity duration-700 ease-in-out absolute top-0 left-0
                    ${currentImage === index ? "opacity-100" : "opacity-0"}`}
                />
              ))}
          
                {/* Left Arrow */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-white transition"
                >
                  <span className="text-2xl leading-none text-gray-800">‹</span>
                </button>
          
                {/* Right Arrow */}
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-white transition"
                >
                  <span className="text-2xl leading-none text-gray-800">›</span>
                </button>
            </div>
          </div>
          
          {/* Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition ${
                  currentImage === index ? "bg-black" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
          </div>
      </section>
        {/* ===== EXCLUSIVE EVENTS ===== */}
        <section className="py-15 px-5">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
            {/* Poster */}
            <div className="w-full lg:w-1/2">
              <Image
                src="/images/contents/events/talkroom.png"
                alt="Speak to Connect Poster"
                width={600}
                height={600}
                className="rounded-2xl shadow-lg object-cover"
              />
            </div>

            {/* Text */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <h2 className="text-3xl font-bold">
                IELS Lounge TalkRoom: <span className="text-[#e56668]">Speak to Connect</span>
              </h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>For IELS Premium Members</strong> — This month, take part
                in two collaborative challenges designed to help you speak,
                think, and create ideas in English.
              </p>

              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>Week 2:</strong> Group Work Challenge — Build team strategy together.
                </li>
                <li>
                  <strong>Week 4:</strong> Future Project Pitch — Practice project presentation in English.
                </li>
              </ul>

              <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]">
                <Link
                href="https://www.instagram.com/p/YOUR_POST_LINK"
                target="_blank"
              >
                Read More on Instagram
              </Link></Button>
            </div>
          </div>
        </section>

 {/* ===== WHY IELS SPECIAL ===== */}
<section className="py-24 px-6 max-w-6xl mx-auto">
  <h2 className="text-3xl font-bold text-center mb-16">
    Why Learners Love IELS Lounge
  </h2>

  <div className="flex flex-col gap-16">
    {[
      {
        emoji: "💬",
        title: "Daily Speaking Habit",
        desc: "Turn English into your daily rhythm with quick, fun practice sessions that help you build confidence naturally.",
      },
      {
        emoji: "🤝",
        title: "Community & Mentorship",
        desc: "Connect with mentors and peers who encourage growth through collaboration and constant support.",
      },
      {
        emoji: "🌍",
        title: "Global Connections",
        desc: "Join learners from different universities and cities, share stories, and expand your global mindset together.",
      },
      {
        emoji: "🎟",
        title: "IELS Member ID",
        desc: "Get access to exclusive resources, faster event registration, and member-only perks.",
        link: "https://docs.google.com/document/d/IELS_MEMBER_ID_GUIDE/view",
      },
    ].map((item, i) => (
      <div
        key={i}
        className={`flex flex-col md:flex-row items-center gap-8 md:gap-14 ${
          i % 2 === 1 ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Emoji Section */}
        <div className="flex-shrink-0 text-[70px] md:text-[90px] flex justify-center md:justify-center">
          <span className="block leading-none">{item.emoji}</span>
        </div>

        {/* Text Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg">
          <h3 className="text-2xl md:text-3xl font-semibold mb-2 text-[#294154]">
            {item.title}
          </h3>
          <p className="text-gray-700 mb-3 leading-relaxed">{item.desc}</p>
          {item.link && (
            <Link
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-[#e56668] font-semibold hover:underline hover:text-[#cc4f54] transition"
            >
              View Member ID Guide →
            </Link>
          )}
        </div>
      </div>
    ))}
  </div>
</section>

  {/* ===== WEEKLY ROUTINE ===== */}
<section className="bg-white py-24 px-4">
  <div className="max-w-6xl mx-auto">

    {/* HEADER */}
    <div className="text-center mb-20">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#2F4157] mb-4">
        Your Weekly English Routine
      </h2>
      <p className="text-gray-600 max-w-3xl mx-auto">
        Tiny routines, big impact.  
        This is how consistency is built — one small habit at a time.
      </p>
    </div>

    {/* GRID */}
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {[
        {
          day: "Monday",
          title: "Word of the Day",
          desc: "Build vocabulary daily with practical words you’ll actually use.",
        },
        {
          day: "Tuesday",
          title: "Idiom Practice",
          desc: "Learn storytelling idioms and sound more natural in conversations.",
        },
        {
          day: "Wednesday",
          title: "Listen & Engage",
          desc: "Short audio or video tasks to train your listening instincts.",
        },
        {
          day: "Thursday",
          title: "Grammar Poll & Tip",
          desc: "Quick grammar check-ins without the boring lectures.",
        },
        {
          day: "Friday",
          title: "Weekly Recap Quiz",
          desc: "Fun review to lock in what you learned this week.",
        },
        {
          day: "Sunday",
          title: "Reflection & Journaling",
          desc: "Slow down, reflect, and track how far you’ve grown.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className={`
            relative rounded-3xl border bg-[#FAFAFA] p-7
            transition-all duration-300
            border-gray-200
            hover:border-[#E56668]/60
            hover:-translate-y-1
            hover:shadow-xl
            active:scale-[0.98]
          `}
        >
          {/* RED ACCENT BAR */}
          <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-[#E56668]/70" />

          <div className="pl-4 flex flex-col gap-4">

            {/* DAY */}
            <p className="text-sm font-semibold text-[#E56668] uppercase tracking-wide">
              {item.day}
            </p>

            {/* TITLE */}
            <h3 className="text-xl font-bold text-[#2F4157]">
              {item.title}
            </h3>

            {/* DESC */}
            <p className="text-sm text-gray-600 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* FOOTNOTE */}
    <p className="mt-16 text-center text-gray-600 text-sm max-w-xl mx-auto">
      Just <b>10–15 minutes a day</b> is enough to build momentum.  
      Consistency beats intensity — every single time.
    </p>
  </div>
</section>
   {/* ===== TESTIMONIALS===== */}
<section className="bg-[#F7F8FA] py-20 overflow-hidden">
  {/* HEADER */}
  <div className="text-center mb-12 px-6">
    <h2 className="text-3xl font-extrabold text-[#2F4157] mb-3">
      What Our Members Say
    </h2>
    <p className="text-gray-600">
      Swipe to read real stories from the IELS community.
    </p>
  </div>

  {/* OUTER FRAME */}
  <div className="relative max-w-[1400px] mx-auto">
    {/* GRADIENT FADE */}
    <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#F7F8FA] to-transparent z-10" />
    <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#F7F8FA] to-transparent z-10" />

    {/* SCROLL AREA */}
    <div className="overflow-x-auto scrollbar-none px-12">
      <div className="flex gap-8 w-max py-6 mx-auto">
        {testimonialsData.map((t, i) => {
          const isActive = i === 0; // featured testimonial (simple & clean)

          return (
            <div
              key={t.id}
              className={`
                relative min-w-[320px] max-w-[320px]
                rounded-3xl bg-white p-6
                transition-all duration-300
                ${
                  isActive
                    ? "border-2 border-[#E56668] shadow-2xl scale-[1.05]"
                    : "border border-gray-200 hover:shadow-lg hover:-translate-y-1"
                }
              `}
            >
              {/* FEATURED BADGE */}
              {isActive && (
                <div className="absolute -top-4 left-6 right-6 text-center">
                  <div className="rounded-full bg-[#E56668] py-2 text-xs font-bold text-white shadow-md">
                    ⭐ Featured Story
                  </div>
                </div>
              )}

              {/* CONTENT */}
              <p
                className="text-sm italic text-gray-700 leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: t.content }}
              />

              {/* AUTHOR */}
              <div className="flex items-center gap-3 mt-auto">
                <Image
                  src={t.author.avatar}
                  alt={t.author.name}
                  width={44}
                  height={44}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-[#2F4157] text-sm">
                    {t.author.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t.author.university}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</section>

         {/* ===== FINAL CTA ===== */}
        <section className="py-24 text-center">
          <h2 className="text-3xl font-extrabold mb-6">
            Join a community that helps you actually use English.
          </h2>
          <p className="text-gray-700 mb-10 max-w-xl mx-auto">
            English isn’t something you memorize — it’s something you live.
            Take the first step with IELS Lounge today.
          </p>
          <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]">
          <Link
            href="/iels-lounge/pricing"
          >
            Join the Lounge
          </Link></Button>

          <p className="mt-8 text-sm text-gray-500">
            Questions? Email community@ielsco.com or WhatsApp +62 882-9725-3491
          </p>
        </section>
        {/* 🌊 Responsive Footer Wave Section */}
        <div className="relative w-full overflow-hidden">
          {/* Wave container: tinggi menyesuaikan device */}
          <div className="w-full h-[220px] sm:h-[280px] md:h-[350px] lg:h-[350px] relative">
            <img
              src="/images/contents/general/footer_wave.svg"
              alt="Footer Wave"
              className="absolute left-1/2 top-0 -translate-x-1/2 w-[160%] sm:w-[140%] md:w-screen h-full object-cover pointer-events-none select-none"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}