"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState } from "react";
import Link from "next/link";
import codesRaw from "@/data/codes.json";

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
                <Link
                  href="https://drive.google.com/file/d/1h2IPjkahj1yKqU1_pK0T3L1cYAMz2pQk/view?usp=drive_link"
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]"
                >
                  Read Full IELTS Overview
                </Link>
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#294154] text-white font-semibold hover:bg-[#21363f] transition transform hover:scale-[1.02]"
                >
                  Register for IELTS Mock Test
                </a>
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

        {/* HOW IT WORKS */}
        <section className="bg-[#f9fafb] rounded-2xl p-8 shadow-sm border border-[#294154]/10">
          <h2 className="text-2xl font-bold mb-6">How the IELS Mock Test Works</h2>
          <ol className="list-decimal pl-5 text-gray-700 space-y-3">
            <li><strong>Register</strong> via the form below and choose your preferred date and package.</li>
            <li>After validation and payment, you’ll receive an <strong>access code</strong> and detailed schedule by email.</li>
            <li>On your chosen test day, join your assigned <strong>Zoom session</strong> and follow instructions from our test coordinator.</li>
            <li><strong>Complete your mock test</strong> (Listening, Reading, Writing) through the secure online platform.</li>
            <li><strong>No cheating!</strong> Each session is proctored, and switching tabs or using translators is strictly prohibited.</li>
            <li>Submit your answers — your results will be processed automatically.</li>
            <li>Receive detailed feedback from an <strong>IELS Expert Tutor</strong> within 3 working days.</li>
            <li>Claim your <strong>digital certificate</strong> directly from your IELS profile or email.</li>
          </ol>
        </section>

        {/* PACKAGES & PRICING */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-[#294154]/10">
          <h2 className="text-2xl font-bold mb-6 text-center">Select the Registration Package that Works Best for You! 🎓</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Package A */}
            <div className="bg-[#fff9f8] border border-[#f0d8d9] rounded-2xl p-6 shadow-sm hover:shadow-md transition hover:-translate-y-1">
              <h3 className="text-lg font-bold mb-2 text-[#294154]">Package A — Basic Mock Test</h3>
              <div className="text-3xl font-extrabold mb-1">Rp 50.000</div>
              <p className="text-sm text-gray-600 mb-3">Perfect for first-time takers or quick assessment.</p>
              <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1 mb-4">
                <li>IELTS Mock Test (Listening, Reading, Writing)</li>
                <li>AI-generated Score</li>
                <li>Expert Feedback</li>
              </ul>
            </div>

            {/* Package B */}
            <div className="bg-[#f9fbff] border border-[#d9e4f7] rounded-2xl p-6 shadow-sm hover:shadow-md transition hover:-translate-y-1">
              <h3 className="text-lg font-bold mb-2 text-[#294154]">Package B — Mock Test + Preparation Kit</h3>
              <div className="text-3xl font-extrabold mb-1">Rp 75.000</div>
              <p className="text-sm text-gray-600 mb-3">Best for learners who want structured preparation before testing.</p>
              <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1 mb-4">
                <li>Everything in Package A</li>
                <li>3 IELTS Prep Videos</li>
                <li>10 eBooks + 100+ Practice Questions</li>
              </ul>
            </div>

            {/* Package C */}
            <div className="bg-[#f8fcfa] border border-[#d3eedf] rounded-2xl p-6 shadow-sm hover:shadow-md transition hover:-translate-y-1">
              <h3 className="text-lg font-bold mb-2 text-[#294154]">Package C — Full IELTS Learning Experience</h3>
              <div className="text-3xl font-extrabold mb-1">Rp 125.000</div>
              <p className="text-sm text-gray-600 mb-3">For those aiming to experience the complete IELTS journey.</p>
              <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1 mb-4">
                <li>Everything in Package B</li>
                <li>Speaking Simulation</li>
                <li>1-Year IELS Lounge Premium</li>
                <li>Chance to Win Free Official IELTS Test (Worth Rp 3.6M)</li>
              </ul>
            </div>
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
            <Link
              href="https://drive.google.com/file/d/1h2IPjkahj1yKqU1_pK0T3L1cYAMz2pQk/view?usp=drive_link"
              target="_blank"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]"
            >
              Read IELTS Test Details
            </Link>
            <a
              href={formUrl}
              target="_blank"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#294154] text-white font-semibold hover:bg-[#21363f] transition transform hover:scale-[1.02]"
            >
              Register Now
            </a>
          </div>
        </section>

        {/* ===== ACCESS / VALIDATION CTA (FINAL) ===== */}
        <section className="mt-16">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl p-6 shadow-sm border border-[#e6eef4]">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Left: copy + form */}
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold text-[#294154]">Start Your Test Now!</h3>
                <p className="mt-1 text-sm text-gray-700">
                  Enter the access code we sent to your email. Validate the code first — once it’s confirmed and unused, you’ll be able to start the test.
                </p>

                <div className="mt-4">
                  <label htmlFor="access-code-input" className="sr-only">Access code</label>
                  <div className="flex gap-3">
                    <input
                      id="access-code-input"
                      type="text"
                      inputMode="text"
                      value={accessCode}
                      onChange={(e) => { setAccessCode(e.target.value.toUpperCase()); setValidation(null); }}
                      placeholder="Enter access code (e.g. IELS-ABC123)"
                      className="flex-1 border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#e56668]/30"
                    />

                    <button
                      type="button"
                      onClick={validateCode}
                      className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]"
                    >
                      Validate
                    </button>
                  </div>

                  {/* validation status */}
                  <div className="mt-3 min-h-[1.25rem]">
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
                      <div className="text-sm text-gray-500">Press <strong>Validate</strong> to check your code.</div>
                    )}
                  </div>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  • If you didn’t receive your code, check spam or your payment confirmation email. • For group / organization bundles, email <span className="font-semibold text-[#294154]">partnership@ielsco.com</span>.
                </div>
              </div>

              {/* Right: mascot + start button */}
              <div className="w-full lg:w-[360px] flex-shrink-0">
                <div className="flex flex-col items-center gap-4">

                  <button
                    type="button"
                    onClick={() => {
                      // Only allow navigation if validated and not used
                      if (validation?.status === "valid") {
                        // include code as query param so /test/access can pick it up
                        window.location.href = `/test/access?code=${encodeURIComponent(accessCode)}`
                      } else {
                        // gentle hint
                        alert("Please validate a valid access code before starting the test.");
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-full font-semibold transition ${
                      validation?.status === "valid"
                        ? "inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#294154] text-white font-semibold hover:bg-[#21363f] transition transform hover:scale-[1.02]"
                        : "bg-[#f3f4f6] text-[#6b7280] cursor-not-allowed"
                    }`}
                    aria-disabled={validation?.status !== "valid"}
                  >
                    Start Test
                  </button>

                  <Link href="mailto:support@ielsco.com" className="text-xs text-[#294154] hover:underline">
                    Need help validating your code?
                  </Link>
                </div>

                <p className="mt-4 text-center text-xs text-gray-500">
                  Tests run on scheduled Zoom slots. After you validate and start, you’ll be shown scheduling options (or get the slot already assigned in your confirmation email).
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}