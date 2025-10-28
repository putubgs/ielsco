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
                href="https://docs.google.com/document/d/1YSVY9lNDNmBCi7oaZZOhXoEa2xMWaYLuD4cVUc_4vFc/edit?usp=sharing"
                target="/blank"
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


  <article id="test-format"
  className="bg-white rounded-2xl p-8 shadow-sm border border-[#294154]/6">
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold mb-2">Test Format & Timing</h3>
      <p className="text-gray-700 max-w-3xl mx-auto">
        Each IELS test follows international standards but is simplified for accessibility and clarity.  
        Below is a quick comparison of our current and upcoming test formats — including duration, focus, and purpose.
      </p>
    </div>
  
    {/* Test Comparison Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-[#294154]">
      {/* IELTS-style */}
      <div className="relative bg-[#fffaf9] border border-[#f0d8d9] rounded-2xl p-6 shadow-sm hover:shadow-md transition hover:-translate-y-1">
        <div className="absolute top-4 right-4 bg-[#e56668]/10 text-[#e56668] text-xs font-semibold px-3 py-1 rounded-full">
          Available
        </div>
        <h4 className="text-lg font-bold mb-1 flex items-center gap-2">
          <span>📘</span> IELTS-style
        </h4>
        <p className="text-sm text-gray-700 mb-4">
          A balanced, academic-focused test for real communication skills. Ideal for students preparing for global study or scholarship programs.
        </p>
        <ul className="list-disc text-sm text-gray-700 pl-5 mb-4 space-y-1">
          <li>Listening — 25–30 min</li>
          <li>Reading — 45–60 min</li>
          <li>Writing — 45–60 min</li>
          <li>Speaking — 10–15 min live session</li>
        </ul>
        <Link
          href="https://drive.google.com/file/d/1h2IPjkahj1yKqU1_pK0T3L1cYAMz2pQk/view?usp=drive_link"
          target="/blank"
          className="text-[#e56668] font-semibold hover:underline"
        >
          Read full details →
        </Link>
      </div>
  
      {/* TOEFL-style */}
      <div className="relative bg-[#f9fbff] border border-[#d9e4f7] rounded-2xl p-6 shadow-sm hover:shadow-md transition hover:-translate-y-1 opacity-80">
        <div className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
          Coming Soon
        </div>
        <h4 className="text-lg font-bold mb-1 flex items-center gap-2">
          <span>🧠</span> TOEFL-style
        </h4>
        <p className="text-sm text-gray-700 mb-4">
          Focuses on academic comprehension and integrated writing. Ideal for university readiness and research-based learners.
        </p>
        <ul className="list-disc text-sm text-gray-700 pl-5 mb-4 space-y-1">
          <li>Listening — 30–40 min</li>
          <li>Reading — 60–80 min</li>
          <li>Writing — 50–60 min</li>
        </ul>
        <div className="text-sm text-gray-500">Details coming soon</div>
      </div>
  
      {/* TOEIC-style */}
      <div className="relative bg-[#f8fcfa] border border-[#d3eedf] rounded-2xl p-6 shadow-sm hover:shadow-md transition hover:-translate-y-1 opacity-80">
        <div className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
          Coming Soon
        </div>
        <h4 className="text-lg font-bold mb-1 flex items-center gap-2">
          <span>💼</span> TOEIC-style
        </h4>
        <p className="text-sm text-gray-700 mb-4">
          Workplace-oriented assessment built for communication efficiency and clarity. Perfect for professionals and job applicants.
        </p>
        <ul className="list-disc text-sm text-gray-700 pl-5 mb-4 space-y-1">
          <li>Listening — 45–60 min</li>
          <li>Reading — 45–60 min</li>
        </ul>
        <div className="text-sm text-gray-500">Details coming soon</div>
      </div>
    </div>
  
    {/* Important Note */}
    <p className="mt-6 text-sm text-gray-600 border-t border-gray-100 pt-4">
      ⏰ <strong>Note:</strong> Timers run per section and must be completed in order. During your test, 
      you’ll join a Zoom session or secure web portal. Each participant is monitored by IELS proctors to ensure fairness and prevent cheating.
    </p>
  </article>
  
  
            {/* Pricing & Packages */}
  <article id="register"
  className="bg-white rounded-2xl p-8 shadow-sm border border-[#294154]/6">
    <div className="text-center mb-8">
      <h3 className="text-2xl font-bold mb-2">Test Packages & Pricing</h3>
      <p className="text-gray-700 max-w-2xl mx-auto">
        Choose the right assessment for your goal. Each test is designed to evaluate real-world English skills, 
        guided by the same quality and feedback system used by our tutors.  
      
      </p>
    </div>
  
    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-[#294154]">
      {/* IELTS-style */}
      <div className="relative bg-white border border-[#e6eef4] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
        <div className="absolute top-4 right-4 bg-[#e56668]/10 text-[#e56668] text-xs font-semibold px-3 py-1 rounded-full">
          Available
        </div>
        <h4 className="text-lg font-bold mb-1">IELTS-style Assessment</h4>
        <p className="text-sm text-gray-600 mb-4">
          Academic and general English simulation — measures your ability to use English in real academic, professional, and daily contexts.
        </p>
        <div className="text-3xl font-extrabold text-[#294154] mb-1">Rp50.000</div>
        <div className="text-xs text-gray-500 mb-4">starting price per participant</div>
        <ul className="list-disc text-sm text-gray-700 pl-5 mb-5 space-y-1">
          <li>Listening, Reading, and Writing modules</li>
          <li>Optional live Speaking interview</li>
          <li>Expert feedback & personalized improvement plan</li>
        </ul>
        <Link
          href="/test/guide/ielts"
          className="inline-flex items-center justify-center w-full px-4 py-2 rounded-full bg-[#e56668] text-white font-semibold hover:bg-[#cc4f54] transition"
        >
          Register Now
        </Link>
      </div>
  
      {/* TOEFL-style */}
      <div className="relative bg-white border border-[#e6eef4] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 opacity-80">
        <div className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
          Coming Soon
        </div>
        <h4 className="text-lg font-bold mb-1">TOEFL-style Assessment</h4>
        <p className="text-sm text-gray-600 mb-4">
          Academic-integrated test designed for university and scholarship applicants. 
          Focuses on reading, listening, and integrated writing performance.
        </p>
        <div className="text-3xl font-extrabold text-[#294154] mb-1">Rp30.000</div>
        <div className="text-xs text-gray-500 mb-4">expected starting price</div>
        <ul className="list-disc text-sm text-gray-700 pl-5 mb-5 space-y-1">
          <li>Academic-oriented tasks & integrated sections</li>
          <li>Automated scoring with tutor review add-on</li>
          <li>Preparation-focused practice mode</li>
        </ul>
        <button
          disabled
          className="inline-flex items-center justify-center w-full px-4 py-2 rounded-full bg-gray-200 text-gray-500 font-semibold cursor-not-allowed"
        >
          Coming Soon
        </button>
      </div>
  
      {/* TOEIC-style */}
      <div className="relative bg-white border border-[#e6eef4] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 opacity-80">
        <div className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
          Coming Soon
        </div>
        <h4 className="text-lg font-bold mb-1">TOEIC-style Assessment</h4>
        <p className="text-sm text-gray-600 mb-4">
          Workplace English evaluation focused on comprehension, accuracy, and practical usage in professional settings.
        </p>
        <div className="text-3xl font-extrabold text-[#294154] mb-1">Rp30.000</div>
        <div className="text-xs text-gray-500 mb-4">expected starting price</div>
        <ul className="list-disc text-sm text-gray-700 pl-5 mb-5 space-y-1">
          <li>Listening & Reading sections</li>
          <li>Professional English task simulation</li>
          <li>Quick certificate for employment use</li>
        </ul>
        <button
          disabled
          className="inline-flex items-center justify-center w-full px-4 py-2 rounded-full bg-gray-200 text-gray-500 font-semibold cursor-not-allowed"
        >
          Coming Soon
        </button>
      </div>
    </div>
      <div className="text-center mb-8">
         <br className="hidden sm:block" />
        <span className="text-[#e56668] font-semibold">Organizations get 20% off</span> — email <strong>partnership@ielsco.com</strong> to claim your bundle.
      </div>
    {/* Footer CTA */}
    <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
      <a
        href="mailto:partnership@ielsco.com?subject=Organization%20Test%20Bundle%20Request"
        className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#294154] text-white font-semibold hover:bg-[#21363f] transition transform hover:scale-[1.02]"
      >
        🤝 Register for Your Organization — 20% Off
      </a>
    </div>
  </article>
  
           {/* Registration & Access Flow */}
  <article className="bg-white rounded-2xl p-8 shadow-sm border border-[#294154]/10">
    <h3 className="text-2xl font-bold mb-6 text-center text-[#294154]">
      Registration & Access — Step by Step
    </h3>
  
    <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
      A quick, no-drama guide to register, validate your access code, join the Zoom session,
      and receive your results. Follow these steps in order — the access code you receive by
      email is the single key that unlocks your test.
    </p>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        {
          step: 1,
          title: "Complete Registration",
          desc: "Fill the official registration form with your full name, valid email, phone number, and chosen test package.",
        },
        {
          step: 2,
          title: "Confirm & Pay",
          desc: "Follow the payment instructions in the confirmation email. Keep your payment proof — it may be required for verification.",
        },
        {
          step: 3,
          title: "Receive Access Code",
          desc: "After verification we send a one-time access code to your email/WhatsApp. Save it — this code is required to start the test.",
        },
        {
          step: 4,
          title: "Pick a Test Slot",
          desc: "Choose a Zoom schedule from available slots (or accept the slot we assigned). Slot link and time appear in your confirmation email.",
        },
        {
          step: 5,
          title: "Validate Your Code",
          desc: "Before test day, paste your access code into the Access form (section with id=\"access\") and press <strong>Validate</strong> — the form checks the code status.",
        },
        {
          step: 6,
          title: "Start the Test",
          desc: "After validation (code must be valid & unused), click <strong>Start Test</strong> to proceed — you’ll be routed to the test entry (or the form) and timers will begin when you start.",
        },
        {
          step: 7,
          title: "Receive Feedback",
          desc: "Tutors review your writing and speaking; expect personalized feedback within 24–72 hours after submission.",
        },
        {
          step: 8,
          title: "Get Certificate",
          desc: "After verification, we email your completion certificate and performance summary (if included with your package).",
        },
      ].map((item) => (
        <div
          key={item.step}
          className="bg-[#f9fafb] border border-[#e4e8ec] rounded-xl p-6 text-center shadow-sm hover:shadow-md transition hover:-translate-y-1"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E56668] text-white font-bold mx-auto mb-3 text-lg">
            {item.step}
          </div>
          <h4 className="text-lg font-semibold text-[#294154] mb-1">{item.title}</h4>
          <p className="text-sm text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
        </div>
      ))}
    </div>
  
    <p className="text-sm text-gray-600 text-center mt-8 max-w-2xl mx-auto">
      💡 Tip: validation (step 5) is mandatory — only codes that are <strong>valid</strong> and <strong>unused</strong> will allow you to start the test.
    </p>
  </article>
  
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
            className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02] w-full sm:w-auto"
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
            className={`w-full sm:w-auto px-6 py-3 rounded-full font-semibold transition text-center ${
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
          • If you didn’t receive your code, check spam or your payment confirmation email. <br />
          • For group / organization bundles, email{" "}
          <span className="font-semibold text-[#294154]">support@ielsco.com</span>.
        </div>
      </div>
    </div>
  </section>
  
            {/* FAQ */}
            <article className="bg-white rounded-2xl p-6 shadow-sm border border-[#294154]/6">
              <h3 className="text-xl font-semibold mb-3">FAQ</h3>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <details className="p-4 rounded-lg border border-gray-100">
                  <summary className="font-semibold cursor-pointer">Can I change my slot after I receive the access code?</summary>
                  <p className="mt-2 text-sm">You can request a slot change before test day depending on availability. Contact support as soon as possible.</p>
                </details>
  
                <details className="p-4 rounded-lg border border-gray-100">
                  <summary className="font-semibold cursor-pointer">What ID is required for verification?</summary>
                  <p className="mt-2 text-sm">A government-issued ID or student card is recommended. Keep it ready for the proctor on test day.</p>
                </details>
  
                <details className="p-4 rounded-lg border border-gray-100">
                  <summary className="font-semibold cursor-pointer">Who reviews my Writing & Speaking?</summary>
                  <p className="mt-2 text-sm">Qualified IELS tutors review tasks according to our rubric. Diagnostic packages get the most detailed commentary.</p>
                </details>
  
                <details className="p-4 rounded-lg border border-gray-100">
                  <summary className="font-semibold cursor-pointer">How soon will I get the certificate?</summary>
                  <p className="mt-2 text-sm">Certificates (if included) are sent by email after verification — usually within 5 working days for Premium/Diagnostic packages.</p>
                </details>
              </div>
            </article>
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