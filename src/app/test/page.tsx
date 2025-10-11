"use client";

import Link from "next/link";

export default function TestSelectionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-[#fefae0] text-[#173E8C] py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Choose Your English Test</h1>
        <p className="text-gray-600 mb-10">
          Registration and payment are done via Google Form.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* IELTS Active */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-[#173E8C]/10 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2">IELTS Mock Test</h2>
            <p className="text-sm text-gray-600 mb-4">
              Practice full IELTS test experience.
            </p>
            <a
              href="https://forms.gle/YOUR_GOOGLE_FORM_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#173E8C] text-white font-medium rounded-xl py-2 hover:bg-[#0f2d6b]"
            >
              Register via Google Form
            </a>
          </div>

          {/* Coming Soon */}
          {["TOEFL Mock Test", "TOEIC Mock Test", "SAT English", "Grammar Placement"].map((test) => (
            <div
              key={test}
              className="bg-gray-100 text-gray-400 rounded-2xl p-6 border border-gray-200 cursor-not-allowed"
            >
              <h2 className="text-xl font-semibold mb-2">{test}</h2>
              <p className="text-sm">Coming Soon</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-gray-700">
          <p>Already have an access code?</p>
          <Link href="/test/access" className="text-[#173E8C] font-semibold hover:underline">
            Start the Test →
          </Link>
        </div>
      </div>
    </main>
  );
}