"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState } from "react";
import Link from "next/link";
import codesRaw from "@/data/codes.json";
import { Button } from "@/components/ui/button";

type CodeEntry = {
  code: string;
  used: boolean;
  name?: string;
  email?: string;
};

const codes: CodeEntry[] = (codesRaw as unknown) as CodeEntry[];

export default function IELTSGuidePage() {
  const formUrl = "https://forms.gle/yFCdzbeR8uMBzM5X8"; // Replace with actual form link

  // ----- Access code state & validation -----
  const [accessCode, setAccessCode] = useState("");
  const [validation, setValidation] = useState<
    { status: "valid" | "used" | "invalid" } | null
  >(null);

function validateCode() {
  const codeValue = accessCode.trim().toUpperCase();
  if (!codeValue) {
    setValidation({ status: "invalid" });
    return;
  }

  const found = codes.find((item) => item.code === codeValue);

  if (!found) {
    setValidation({ status: "invalid" });
    return;
  }

  if (found.used) {
    setValidation({ status: "used" });
    return;
  }

  setValidation({ status: "valid" });
}
  return (
    <div className="min-h-screen bg-white text-[#294154] antialiased">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-12 lg:py-20 space-y-12">
        {/* HERO */}
        <section className="bg-gradient-to-b from-white to-[#fff9f8] rounded-2xl p-8 lg:p-12 shadow-sm border border-[#294154]/10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight">
                IELTS-style Mock Test by IELS
              </h1>
              <p className="mt-3 text-gray-700 max-w-2xl">
                The IELS Mock Test helps you measure your English proficiency with real test standards — 
                combining AI-powered scoring and expert tutor feedback.  
                Experience how the real IELTS feels, but more affordable and accessible anywhere.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]">
                              <Link
                              href={formUrl}
                              target="https://forms.gle/yFCdzbeR8uMBzM5X8"
                              rel="noopener noreferrer"
                            >
                              Register for IELTS Mock Test
                            </Link></Button>
              
                            <Button asChild className="bg-[#294154] text-white font-semibold px-6 py-3 hover:bg-[#21363f]"><Link
                              href="https://drive.google.com/file/d/1h2IPjkahj1yKqU1_pK0T3L1cYAMz2pQk/view?usp=drive_link"
                              rel="noopener noreferrer"
                            >
                              Read Full IELTS Overview
                            </Link></Button>
            
            
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT IELTS */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-[#294154]/10">
          <h2 className="text-2xl font-bold mb-4">What Is IELTS?</h2>
          <p className="text-gray-700 mb-3">
            IELTS (International English Language Testing System) is the world’s most recognized English proficiency test. 
            It measures your ability to communicate effectively in English across <strong>four key skills:</strong>
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
            <li><strong>Listening</strong> — understand ideas and details from audio clips or conversations.</li>
            <li><strong>Reading</strong> — comprehend academic and general English texts.</li>
            <li><strong>Writing</strong> — respond to visual data and express arguments in essay form.</li>
            <li><strong>Speaking</strong> — hold a conversation fluently and naturally with an examiner.</li>
          </ul>
          <p className="text-gray-700 mb-2">
            The IELS Mock Test follows the same structure — offering a realistic practice experience with accurate scoring and personalized feedback.
          </p>
        </section>

   {/* PACKAGES & PRICING */}
<section className="bg-white rounded-2xl p-8 shadow-sm border border-[#294154]/10">
  {/* HEADER */}
  <div className="text-center mb-14">
    <h2 className="text-2xl font-bold mb-3">
      Select the Registration Package That Works Best for You 🎓
    </h2>
    <p className="text-gray-700 max-w-3xl mx-auto">
      Choose a package based on your preparation needs — from quick assessment
      to a full IELTS learning experience.
    </p>
  </div>

  {/* GRID */}
  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-[#294154]">
    {[
      {
        title: "Package A — Basic Mock Test",
        price: "Rp 50.000",
        desc: "Perfect for first-time takers or quick assessment.",
        bg: "bg-[#FAFAFA]",
        border: "border-gray-200",
        highlight: false,
        points: [
          "IELTS Mock Test (Listening, Reading, Writing)",
          "AI-generated score report",
          "Expert feedback & recommendations",
        ],
      },
      {
        title: "Package B — Mock Test + Preparation Kit",
        price: "Rp 75.000",
        desc: "Best for learners who want structured preparation before testing.",
        bg: "bg-[#FAFAFA]",
        border: "border-gray-200",
        highlight: false,
        points: [
          "Everything in Package A",
          "3 IELTS preparation videos",
          "10 eBooks + 100+ practice questions",
        ],
      },
      {
        title: "Package C — Full IELTS Learning Experience",
        price: "Rp 125.000",
        desc: "For those aiming to experience the complete IELTS journey.",
        bg: "bg-[#FAFAFA]",
        border: "border-[#E56668]/40",
        highlight: true,
        points: [
          "Everything in Package B",
          "Live speaking simulation",
          "1-Year IELS Lounge Premium access",
          "Chance to win free Official IELTS Test (worth Rp 3.6M)",
        ],
      },
    ].map((p, i) => (
      <div
        key={i}
        className={`
          group relative rounded-3xl border ${p.bg} ${p.border}
          flex flex-col h-full
          transition-all duration-300
          hover:border-[#E56668]/60 hover:-translate-y-1 hover:shadow-xl
        `}
      >
        {/* ACCENT BAR */}
        <div
          className={`
            absolute left-0 top-6 bottom-6 w-1 rounded-full
            transition-all duration-300
            ${
              p.highlight
                ? "bg-[#E56668]"
                : "bg-transparent group-hover:bg-[#E56668]"
            }
          `}
        />

        {/* RECOMMENDED BADGE */}
        {p.highlight && (
          <div className="absolute top-2 right-3 bg-[#294154]/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            Recommended
          </div>
        )}

        {/* CONTENT */}
        <div className="pl-4 p-7 flex-1 flex flex-col gap-4">
          <div>
            <h3
              className={`
                text-lg font-bold transition
                ${p.highlight ? "text-[#E56668]" : "group-hover:text-[#E56668]"}
              `}
            >
              {p.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {p.desc}
            </p>
          </div>

          <div>
            <div className="text-3xl font-extrabold">
              {p.price}
            </div>
          </div>

          <ul className="text-sm text-gray-700 space-y-2">
            {p.points.map((pt, idx) => (
              <li key={idx}>• {pt}</li>
            ))}
          </ul>
        </div>

        {/* FOOTER (READY FOR CTA IF NEEDED) */}
        <div className="border-t border-gray-100 p-5 text-center text-sm text-gray-500">
          Secure checkout • Limited slots
        </div>
      </div>
    ))}
  </div>
</section>

        {/* REGISTRATION CTA */}
        <section className="rounded-2xl p-8 text-center shadow-sm">
          <h3 className="text-xl font-bold mb-2">Ready to Begin?</h3>
          <p className="text-90 mb-4 max-w-2xl mx-auto">
            Choose your package, complete your registration, and start your IELTS Mock Test journey today.  
            Accessible, affordable, and globally aligned.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]">
                              <Link
                              href={formUrl}
                              target="https://forms.gle/yFCdzbeR8uMBzM5X8"
                              rel="noopener noreferrer"
                            >
                              Register for IELTS Mock Test
                            </Link></Button>
              
                            <Button asChild className="bg-[#294154] text-white font-semibold px-6 py-3 hover:bg-[#21363f]"><Link
                              href="https://drive.google.com/file/d/1h2IPjkahj1yKqU1_pK0T3L1cYAMz2pQk/view?usp=drive_link"
                              rel="noopener noreferrer"
                            >
                              Read Full IELTS Overview
                            </Link></Button>
          </div>
        </section>

    {/* ===== ACCESS / VALIDATION CTA (FINAL, FIXED) ===== */}
  <section id="access" className="mt-16">
    <div className="max-w-6xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e6eef4]">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-bold text-[#294154] mb-2">Start Your Test Now!</h3>
          <p className="text-sm text-gray-700 max-w-2xl">
            Enter the access code we sent to your email. Validate the code first — once it’s confirmed and unused, you’ll be able to start your test.
          </p>
        </div>
  
        {/* Input + Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <input
            id="access-code-input"
            type="text"
            inputMode="text"
            value={accessCode}
            onChange={(e) => {
              setAccessCode(e.target.value.toUpperCase());
              setValidation(null);
            }}
            placeholder="Enter access code (e.g. IELS-ABCD-EFGH)"
            className="flex-1 border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e56668]/30 w-full sm:w-auto"
          />
  
          <button
            type="button"
            onClick={validateCode}
            className="inline-flex items-center justify-center rounded-full bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E] transition active:scale-[0.97]"
          >
            Validate
          </button>
        </div>
  
        {/* Validation Status */}
        <div className="min-h-[1.25rem]">
          {validation?.status === "valid" && (
            <div className="text-sm text-green-700">
              ✅ Code valid — not used. You can start your test.
            </div>
          )}
          {validation?.status === "used" && (
            <div className="text-sm text-yellow-800">
              ⚠ This code has already been used. If you believe this is an error, contact support.
            </div>
          )}
          {validation?.status === "invalid" && (
            <div className="text-sm text-red-700">
              ❌ Code not found. Check your email or the code you entered.
            </div>
          )}
          {!validation && accessCode.length > 0 && (
            <div className="text-sm text-gray-500">
              Press <strong>Validate</strong> to check your code.
            </div>
          )}
        </div>
  
        {/* Start Button */}
        <div className="flex flex-col items-center sm:items-start gap-3">
          <button
            type="button"
            onClick={() => {
              if (validation?.status === "valid") {
                window.location.href = `/test/access?code=${encodeURIComponent(accessCode)}`;
              } else {
                alert("Please validate a valid access code before starting the test.");
              }
            }}
            className={`w-full sm:w-auto px-6 py-3 rounded-full font-semibold transition text-center transition active:scale-[0.97] ${
              validation?.status === "valid"
                ? "bg-[#294154] text-white hover:bg-[#21363f]"
                : "bg-[#f3f4f6] text-[#6b7280] cursor-not-allowed"
            }`}
            aria-disabled={validation?.status !== "valid"}
          >
            Start Test
          </button>
  
          <Link
            href="mailto:support@ielsco.com"
            className="text-xs text-[#294154] hover:underline text-center sm:text-left"
          >
            Need help validating your code?
          </Link>
        </div>
  
        {/* Notes */}
        <p className="mt-4 text-xs text-gray-500 text-center sm:text-left">
          Tests run on scheduled Zoom slots. After you validate and start, you’ll be shown scheduling options or get the slot assigned in your confirmation email.
        </p>
  
        <div className="text-xs text-gray-500 mt-2">
          • If you didn&apos;t receive your code, check spam or your payment confirmation email. <br />
          • For group / organization bundles, email{" "}
          <span className="font-semibold text-[#294154]">support@ielsco.com</span>.
        </div>
      </div>
    </div>
  </section>
      </main>
      <Footer />
    </div>
  );
}