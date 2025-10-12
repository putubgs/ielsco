"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";

export default function TestSelectionPage() {
  const googleFormLink = "https://forms.gle/yFCdzbeR8uMBzM5X8";
  const guidePdfLink = "/docs/iels-test-guide.pdf";

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
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-6 py-3 rounded-full bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition-colors duration-300 shadow-sm"
              >
                📘 View Test Guide
              </a>

              <a
                href={googleFormLink}
                target="https://forms.gle/yFCdzbeR8uMBzM5X8"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center px-6 py-3 rounded-full bg-[#294154] text-white font-semibold hover:bg-[#1F303C] transition-colors duration-300 shadow-sm"
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
                        href={guidePdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center rounded-full border border-[#294154] text-[#294154] py-2 font-semibold hover:bg-[#294154] hover:text-white transition-colors duration-300"
                      >
                        📘 Guide
                      </a>
                      <a
                        href={googleFormLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center rounded-full bg-[#E56668] text-white py-2 font-semibold hover:bg-[#C04C4E] transition-colors duration-300"
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

        {/* ================= ACCESS CODE CTA ================= */}
        <section className="mt-16">
          <div className="bg-[#294154] text-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div className="text-left">
              <h3 className="text-xl font-bold">Already Registered?</h3>
              <p className="text-sm text-white/80">
                Enter your access code to begin your test experience.
              </p>
            </div>

            <Link
              href="/test/access"
              className="px-6 py-3 rounded-full bg-[#E56668] font-semibold hover:bg-[#C04C4E] transition-colors duration-300 shadow-sm"
            >
              Start the Test →
            </Link>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <div className="text-center text-gray-500 text-sm mt-10">
          Need help? Contact{" "}
          <a
            href="mailto:support@ielsco.com"
            className="underline text-[#294154] hover:text-[#E56668]"
          >
            support@ielsco.com
          </a>
        </div>
        
      </div>
    </main>
    <Footer/>
    </div>
  );
}