"use client";

// src/app/test/guide/page.tsx
/* Server component (App Router) */
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

export default function TestGuidePage() {
  const pdfUrl = "https://forms.gle/yFCdzbeR8uMBzM5X8"; // <-- replace with your Drive link

  return (
    <div className="min-h-screen bg-white text-[#294154] antialiased">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-12 lg:py-20 space-y-10">
        {/* Intro / Hero */}
        <section className="bg-gradient-to-b from-white to-[#fffaf6] rounded-2xl p-8 lg:p-12 shadow-sm border border-[#294154]/6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight">
                IELS Test Guide — How our assessment works
              </h1>
              <p className="mt-3 text-gray-700 max-w-2xl">
                This guide explains the general test process we use at IELS:
                registration, access code workflow, scheduling on test day (Zoom),
                rules to keep the assessment fair, submission, feedback, and certificate.
                Read it before registering so your test day is smooth.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#E56668] text-white px-5 py-3 rounded-full font-semibold hover:bg-[#cc4f54] transition"
                >
                  Register Now
                </a>

                <Link
                  href="/test/access"
                  className="inline-flex items-center gap-2 bg-[#294154] text-white px-5 py-3 rounded-full font-semibold hover:bg-[#1f3344] transition"
                >
                  🔐 Enter Access Code
                </Link>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                Note: Registration and payment steps are handled during sign-up. After validation, you will receive an access code to join the scheduled test session.
              </p>
            </div>
          </div>
        </section>

        {/* Quick summary */}
        <section className="rounded-2xl p-6 lg:p-8 shadow-sm border border-[#294154]/6 bg-white">
          <h2 className="text-2xl font-bold mb-4">Quick Test Summary</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SummaryCard title="How to Register" desc="1) Fill registration form → 2) Payment → 3) Receive validated access code" />
            <SummaryCard title="On Test Day" desc="Choose an available Zoom slot, join with access code, complete sections in order." />
            <SummaryCard title="Result & Certificate" desc="Feedback from our expert tutors within 24–72 hours. Certificate issued after verification." />
          </div>
        </section>

        {/* Detailed sections */}
        <section className="space-y-8">
          {/* Registration & Access Flow */}
          <article className="bg-white rounded-2xl p-6 shadow-sm border border-[#294154]/6">
            <h3 className="text-xl font-semibold mb-3">Registration & Access — Step by step</h3>

            <ol className="list-decimal pl-5 text-gray-700 space-y-3">
              <li>
                <strong>Register via the official form:</strong> Provide your full name, email, phone number, and preferred test type. (Form link is on the registration page.)
              </li>
              <li>
                <strong>Validation & Payment:</strong> Our team verifies your details. After payment verification you will receive an <em>access code</em> by email and/or WhatsApp.
              </li>
              <li>
                <strong>Choose a test slot:</strong> Before test day you can pick an available Zoom schedule from the slots we provide.
              </li>
              <li>
                <strong>Test day (Zoom):</strong> Join the Zoom room with your access code at the scheduled time. The proctor will validate identity and instructions will be given.
              </li>
              <li>
                <strong>Complete & submit:</strong> Finish all sections in order. Submit at the end — the system also auto-submits when the final timer ends.
              </li>
              <li>
                <strong>Feedback:</strong> Our expert tutors provide written feedback for productive sections (e.g., writing, speaking summaries) within 24–72 hours.
              </li>
              <li>
                <strong>Certificate:</strong> After verification, a completion confirmation or certificate (if included with your test package) will be issued and delivered via email.
              </li>
            </ol>
          </article>

          {/* Format & Timing (general) */}
 {/* ===== Test Format & Timing (IMPROVED) ===== */}
<article className="bg-white rounded-2xl p-8 shadow-sm border border-[#294154]/6">
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
        href="/test/guide/ielts"
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

  {/* Diagnostic */}
  <div className="mt-8 bg-[#f8fafb] border border-[#e6eef4] rounded-2xl p-6 shadow-sm">
    <h4 className="text-lg font-bold mb-1 flex items-center gap-2">
      <span>🔍</span> Diagnostic & Institutional Tests
    </h4>
    <p className="text-sm text-gray-700 mb-2">
      These are customizable assessments made for schools, institutions, and teachers who want placement or internal English tests.
    </p>
    <p className="text-sm text-gray-700 mb-4">
      Duration and structure vary depending on the goal — from 30-minute quick checks to 90-minute full diagnostic tests.
    </p>
    <Link
      href="/partners"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#294154] text-white text-sm font-semibold hover:bg-[#1f3344] transition"
    >
      🏫 Contact Us for Custom Setup
    </Link>
  </div>

  {/* Important Note */}
  <p className="mt-6 text-sm text-gray-600 border-t border-gray-100 pt-4">
    ⏰ <strong>Note:</strong> Timers run per section and must be completed in order. During your test, 
    you’ll join a Zoom session or secure web portal. Each participant is monitored by IELS proctors to ensure fairness and prevent cheating.
  </p>
</article>

          {/* Rules & Conduct */}
          <article className="bg-white rounded-2xl p-6 shadow-sm border border-[#294154]/6">
            <h3 className="text-xl font-semibold mb-3">Rules & Test Conduct</h3>

            <ol className="list-decimal pl-5 text-gray-700 space-y-2">
              <li><strong>Single device:</strong> Use one laptop/desktop. Mobile devices are not recommended.</li>
              <li><strong>No external assistance:</strong> No translators, notes, other people, or external websites during the test.</li>
              <li><strong>Do not switch windows:</strong> Navigating away from the test page or Zoom room without permission may invalidate your attempt.</li>
              <li><strong>Do not record or share:</strong> Recording the test or sharing access codes is prohibited.</li>
              <li><strong>Proctor checks:</strong> The proctor may require ID and a 360° room scan (using your webcam) before the session starts.</li>
              <li><strong>Consequences:</strong> Any evidence of cheating or manipulation will result in disqualification and removal from future sessions.</li>
            </ol>
          </article>

          {/* Technical requirements */}
          <article className="bg-white rounded-2xl p-6 shadow-sm border border-[#294154]/6">
            <h3 className="text-xl font-semibold mb-3">Technical Requirements</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">Recommended setup</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Desktop or laptop (Windows / macOS)</li>
                  <li>Latest Chrome or Edge browser</li>
                  <li>Stable internet connection (min 5 Mbps)</li>
                  <li>Disable VPN & ad-blockers during the test</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Before the test</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Charge your device and close unused apps</li>
                  <li>Use headphones for Listening if available</li>
                  <li>Allow popups and localStorage for ielsco.com</li>
                  <li>Have your access code & ID ready</li>
                </ul>
              </div>
            </div>
          </article>

          {/* Pricing & Packages */}
<article className="bg-white rounded-2xl p-8 shadow-sm border border-[#294154]/6">
  <div className="text-center mb-8">
    <h3 className="text-2xl font-bold mb-2">Test Packages & Pricing</h3>
    <p className="text-gray-700 max-w-2xl mx-auto">
      Choose the right assessment for your goal. Each test is designed to evaluate real-world English skills, 
      guided by the same quality and feedback system used by our tutors.  
      <br className="hidden sm:block" />
      <span className="text-[#e56668] font-semibold">Organizations get 20% off</span> — email <strong>partnership@ielsco.com</strong> to claim your bundle.
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
        Read Details — IELTS
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

  {/* Diagnostic Review (Full Width) */}
  <div className="mt-8 bg-[#f8fafb] border border-[#e6eef4] rounded-2xl p-6">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h4 className="text-lg font-bold mb-1">Diagnostic + Expert Review</h4>
        <p className="text-sm text-gray-600 max-w-xl">
          Deep diagnostic assessment across skills, reviewed by IELS expert tutors. Includes full writing and speaking feedback, 
          plus a personalized learning roadmap designed to accelerate improvement.
        </p>
      </div>
      <div className="text-right">
        <div className="text-3xl font-extrabold text-[#294154] mb-1">Rp550.000</div>
        <div className="text-xs text-gray-500 mb-2">premium one-time package</div>
        <Link
          href="/test/register"
          className="inline-block px-5 py-2 rounded-full bg-[#294154] text-white font-semibold hover:bg-[#1f3344] transition"
        >
          Register Now
        </Link>
      </div>
    </div>
  </div>

  {/* Footer CTA */}
  <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
    <Link
      href="/test/register"
      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#e56668] text-white font-semibold hover:bg-[#cc4f54] transition"
    >
      📝 Register Individually
    </Link>
    <a
      href="mailto:partnership@ielsco.com?subject=Organization%20Test%20Bundle%20Request"
      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#294154] text-[#294154] font-semibold hover:bg-[#294154] hover:text-white transition"
    >
      🤝 Register for Your Organization — 20% Off
    </a>
  </div>
</article>
          {/* Scoring & Certificate */}
          <article className="bg-white rounded-2xl p-6 shadow-sm border border-[#294154]/6">
            <h3 className="text-xl font-semibold mb-3">Scoring, Feedback & Certificate</h3>

            <p className="text-gray-700 mb-3">
              After submission, our process ensures quality and clear next steps:
            </p>

            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li><strong>Processing:</strong> Submissions are recorded immediately. Automated checks run first, followed by tutor review (depending on package).</li>
              <li><strong>Feedback window:</strong> Expect feedback (writing & speaking) in 24–72 hours for Premium and Diagnostic packages.</li>
              <li><strong>Certificate:</strong> Issued after verification. Download link sent by email when ready.</li>
              <li><strong>Quality assurance:</strong> Tutors follow a standardized rubric to ensure consistent scoring across sessions.</li>
            </ul>
          </article>

          {/* Submission & Troubleshooting */}
          <article className="bg-white rounded-2xl p-6 shadow-sm border border-[#294154]/6">
            <h3 className="text-xl font-semibold mb-3">Submission & Troubleshooting</h3>

            <p className="text-gray-700 mb-2">
              If you encounter errors during submission (network error, JSON parse error, etc.), please follow these steps:
            </p>

            <ol className="list-decimal pl-5 text-gray-700 space-y-2">
              <li>Check your internet and refresh the test page. Our client tries to persist answers in <code>localStorage</code>.</li>
              <li>Screenshot any error messages and contact support with your access code and timestamp.</li>
              <li>If automatic submission fails, send saved answers and access details to support — we will process manually when needed.</li>
            </ol>
          </article>

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
              <a className="inline-flex items-center gap-3 p-4 rounded-lg border border-[#294154]/8 hover:shadow-sm transition"
                 href="mailto:support@ielsco.com">
                <span className="font-semibold">📧 Email</span>
                <span className="text-gray-600">support@ielsco.com</span>
              </a>

              <a className="inline-flex items-center gap-3 p-4 rounded-lg border border-[#294154]/8 hover:shadow-sm transition"
                 href="https://wa.me/6288297253491" target="_blank" rel="noreferrer">
                <span className="font-semibold">📱 WhatsApp</span>
                <span className="text-gray-600">+62 882-9725-3491</span>
              </a>

              <div className="p-4 rounded-lg border border-[#294154]/8">
                <div className="font-semibold">🕘 Support hours</div>
                <div className="text-gray-600 text-sm">Mon–Fri, 09:00–17:00 (WIB)</div>
              </div>
            </div>
          </article>
        </section>

        {/* Footer CTA */}
        <section className="bg-[#294154] text-white rounded-2xl p-6 lg:p-8 text-center">
          <h4 className="text-xl font-bold">Ready to take a test with IELS?</h4>
          <p className="mt-2 text-white/90 max-w-2xl mx-auto">Follow the registration steps. After validation you’ll receive an access code and scheduling options. Good luck — you’ve got this!</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/test/register" className="bg-white text-[#294154] px-5 py-2 rounded-full font-semibold hover:bg-[#f1f5f9] transition">
              📝 Register Now
            </Link>

            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="bg-[#E56668] px-5 py-2 rounded-full font-semibold hover:bg-[#cc4f54] transition">
              Download Guide (PDF)
            </a>

            <a
              href="mailto:partnership@ielsco.com?subject=Organization%20Test%20Bundle%20Request"
              className="bg-[#1f3344] px-5 py-2 rounded-full font-semibold hover:bg-[#15222e] transition"
            >
              Group Registration — 20% off
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* Small helper components (pure presentational) */

function SummaryCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white rounded-lg p-4 border border-[#294154]/8 shadow-sm">
      <div className="font-semibold text-[#294154]">{title}</div>
      <div className="text-sm text-gray-700 mt-2">{desc}</div>
    </div>
  );
}