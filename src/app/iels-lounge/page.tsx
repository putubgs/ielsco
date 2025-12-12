"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState } from "react";
import { testimonialsData } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";

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
              <Link
                href="/iels-lounge/pricing"
                className="bg-[#e56668] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#cc4f54] hover:scale-[1.02] transition"
              >
                Start from Rp25.000 / Month →
              </Link>
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
            What’s IELS Lounge Speaking Club All About?
          </h2>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed">
            Speaking Club isn’t just about practicing English every night at{" "}
            <strong>8 PM</strong>. It’s where you share stories, discuss, and
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

              <Link
                href="https://www.instagram.com/p/YOUR_POST_LINK"
                target="_blank"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]"
              >
                Read More on Instagram →
              </Link>
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
        <section className="relative py-22 px-5 text-center overflow-hidden">
          <div className="absolute inset-0 flex justify-center opacity-100">
            <Image
              src="/images/contents/general/calendar.svg"
              alt="Calendar icon background"
              width={1000}
              height={800}
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Your Weekly Routine</h2>
            <p className="text-gray-700 mb-8">
              Tiny routines, big impact. Here’s what a typical week looks like.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left">
              {[
                ["Monday", "Word of the Day → daily vocabulary"],
                ["Tuesday", "Idiom of the Day → storytelling idioms"],
                ["Wednesday", "Listen & Engage → audio or video task"],
                ["Thursday", "Grammar Poll + Tip → tense or expression quiz"],
                ["Friday", "Weekly Recap Quiz → fun review"],
                ["Sunday", "Reflection & Journaling"],
              ].map(([day, detail], i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-2xl border border-[#e56668]/20 hover:border-[#e56668] hover:scale-[1.02] transition"
                >
                  <h3 className="font-semibold text-[#e56668] mb-1">{day}</h3>
                  <p className="text-gray-700 text-sm">{detail}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-gray-600 text-sm">
              Just 10–15 minutes a day can totally change how you learn English.
            </p>
          </div>
        </section>


       {/* ===== TESTIMONIALS ===== */}
        <section className="py-24 px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Members Say</h2>

          <div className="flex justify-center items-center gap-6 overflow-hidden">
            {testimonialsData.map((t, i) => {
              const pos =
                (i - index + testimonialsData.length) % testimonialsData.length;
              const isActive = pos === 0;
              const isPrev = pos === testimonialsData.length - 1;
              const isNext = pos === 1;

              return (
                <div
                  key={t.id}
                  className={`transition-all duration-500 ${
                    isActive
                      ? "scale-100 opacity-100 z-20"
                      : (isPrev || isNext)
                      ? "scale-90 opacity-50 blur-[1px] z-10"
                      : "hidden md:block opacity-0"
                  }`}
                  style={{ width: "320px" }}
                >
                  <div className="bg-[#f8fbfc] rounded-2xl p-6 shadow-sm border border-[#f1f1f1]">
                    <p
                      className="text-gray-700 italic mb-4 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: t.content }}
                    />
                    <div className="flex items-center justify-center gap-3">
                      <Image
                        src={t.author.avatar}
                        alt={t.author.name}
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                      />
                      <div className="text-left">
                        <p className="font-semibold">{t.author.name}</p>
                        <p className="text-sm text-gray-500">
                          {t.author.university}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrows */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="bg-[#e56668] text-white w-10 h-10 rounded-full font-bold hover:bg-[#cc4f54] transition"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="bg-[#e56668] text-white w-10 h-10 rounded-full font-bold hover:bg-[#cc4f54] transition"
            >
              ›
            </button>
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

          <Link
            href="/iels-lounge/pricing"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]"
          >
            Join the Lounge →
          </Link>

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