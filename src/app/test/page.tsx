"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import codesRaw from "@/data/codes.json";

type CodeEntry = {
  code: string;
  used: boolean;
  name?: string;
  email?: string;
};

const codes: CodeEntry[] = (codesRaw as unknown) as CodeEntry[];

export default function TestSelectionPage() {
  const googleFormLink = "https://forms.gle/yFCdzbeR8uMBzM5X8";
  const guidePdfLink = "/test/guide";

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
  
    // codes.json is an array
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

  const tests = [
    { title: "IELTS Mock Test", emoji: "🎓", active: true },
    { title: "TOEFL Mock Test", emoji: "🏫", active: false },
    { title: "TOEIC Mock Test", emoji: "💼", active: false },
    { title: "SAT English", emoji: "📚", active: false },
    { title: "Grammar Placement", emoji: "✏", active: false },
  ];

  return (
    <div>
    <Header />
    <main className="min-h-screen bg-gradient-to-b from-white to-[#f7f9f8] text-[#294154] font-geologica">
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">

        {/* ================= HERO ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* RIGHT: MASCOT */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-[300px] sm:w-[400px] lg:w-[520px]">
              <Image
                src="/images/contents/general/ielstest.svg"
                alt="IELS Mascot"
                width={800}
                height={800}
                priority
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* LEFT: TEXT */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Welcome to the IELS Test Platform 🌍
            </h1>
            <p className="max-w-2xl text-gray-700 text-base sm:text-lg">
              Practice global English exams in a structured, affordable, and guided environment.  
              IELS helps you get ready for real opportunities — from scholarships to international careers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a
                href={guidePdfLink}
                target="/test/guide"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]"
              >
                📘 View Test Guide
              </a>

              <a
                href={googleFormLink}
                target="https://forms.gle/yFCdzbeR8uMBzM5X8"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#294154] text-white font-semibold hover:bg-[#21363f] transition transform hover:scale-[1.02]"
              >
                📝 Register Now
              </a>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Registration and payment are handled externally via Google Form.  
              You’ll receive an access code after registration to unlock your test.
            </p>
          </div>
        </section>

        {/* ================= JOURNEY / HOW IT WORKS ================= */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-8">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Register", desc: "Complete the Google Form and payment." },
              { step: "2", title: "Receive Code", desc: "You’ll get an access code via email or WhatsApp." },
              { step: "3", title: "Start Test", desc: "Use your code to access the IELTS platform." },
              { step: "4", title: "Get Feedback", desc: "Receive evaluation and AI analysis in 24 hours." },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#294154]/10 hover:shadow-md hover:bg-[#fdfdfd] transition-all"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#E56668] text-white flex items-center justify-center font-semibold">
                  {item.step}
                </div>
                <h4 className="font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= TEST OPTIONS ================= */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">Choose Your Mock Test</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => (
              <div
                key={test.title}
                className={`rounded-2xl p-6 border ${
                  test.active
                    ? "bg-white border-[#294154]/10 hover:shadow-lg hover:bg-[#fdfdfd] transition-transform hover:-translate-y-1"
                    : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <div className="text-3xl mb-3">{test.emoji}</div>
                <h3 className="text-lg font-semibold mb-2">{test.title}</h3>

                {test.active ? (
                  <>
                    <p className="text-sm text-gray-600 mb-4">
                      Experience the full IELTS test: Listening, Reading, and Writing — with structured feedback from IELS teachers.
                    </p>
                    <div className="flex gap-3">
                      <a
                        href="/test/guide/ielts"
                        rel="noopener noreferrer"
                        className="flex-1 items-center justify-center rounded-full px-6 py-2 bg-[#E56668] text-white text-center font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]"
                      >
                        📘 Guide
                      </a>
                      <a
                    href={googleFormLink}
                    target="https://forms.gle/yFCdzbeR8uMBzM5X8"
                    rel="noopener noreferrer"
                    className="flex-1 items-center justify-center rounded-full px-6 py-2 bg-[#294154] text-white text-center font-semibold hover:bg-[#21363f] transition transform hover:scale-[1.02]"
                      >
                        📝 Register
                      </a>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-400 mt-2">Coming Soon</p>
                )}
              </div>
            ))}
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

          {/* Contact */}
          <article className="bg-white rounded-2xl p-6 shadow-sm border border-[#294154]/6">
            <h3 className="text-xl font-semibold mb-3">Need help?</h3>

            <p className="text-gray-700 mb-4">
              If you experience issues or have questions, contact our support team:
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a className="flex-1 items-center gap-3 p-4 rounded-lg border border-[#294154]/8 hover:shadow-sm transition"
                 href="mailto:support@ielsco.com">
                <span className="font-semibold">📧 Email</span>
                <span className="text-gray-600">support@ielsco.com</span>
              </a>

              <a className="flex-1 items-center gap-3 p-4 rounded-lg border border-[#294154]/8 hover:shadow-sm transition"
                 href="https://wa.me/6288297253491" target="_blank" rel="noreferrer">
                <span className="font-semibold">📱 WhatsApp</span>
                <span className="text-gray-600">+62 882-9725-3491</span>
              </a>

              <div className="flex-1 items-center gap-3 p-4 rounded-lg border border-[#294154]/8 hover:shadow-sm transition">
                <div className="font-semibold">🕘 Support hours</div>
                <div className="text-gray-600 text-sm">Mon–Fri, 09:00–17:00 (WIB)</div>
              </div>
            </div>
          </article>

        
      </div>
    </main>
    <Footer/>
    </div>
  );
}