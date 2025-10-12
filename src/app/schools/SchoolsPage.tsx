
import { schoolsMetadata } from "@/data/metadata/schoolsMetadata";

export const metadata = schoolsMetadata;

import Link from "next/link";

export default function SchoolsPage() {
  return (
    <main className="min-h-screen bg-white text-[#294154] px-6 py-20 flex flex-col items-center justify-center text-center font-inter">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl font-extrabold leading-tight">
          IELS for Schools 🏫
        </h1>

        <p className="text-gray-600 text-lg">
          Empower your students and teachers with a structured English program designed
          to build measurable skills and real-world confidence.  
          From daily challenges to annual English festivals — IELS brings global learning to your classrooms.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <a
            href="https://forms.gle/YOUR_SCHOOL_PARTNERSHIP_FORM_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#E56668] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#c94c4f] transition-colors duration-300"
          >
            🚀 Request Pilot Program
          </a>

          <Link
            href="/"
            className="border border-[#294154] text-[#294154] px-6 py-3 rounded-full font-semibold hover:bg-[#294154] hover:text-white transition-colors duration-300"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="text-gray-500 text-sm mt-10">
          Need more information?{" "}
          <a
            href="mailto:partnership@ielsco.com"
            className="underline hover:text-[#E56668]"
          >
            Contact our team
          </a>
        </div>
      </div>
    </main>
  );
}