"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function ResultContent() {
  const params = useSearchParams();
  const access = params.get("access") ?? "";
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  useEffect(() => {
    // Try reading stored submission info (optional)
    const payload = JSON.parse(localStorage.getItem("ielts_result_payload") || "null");
    if (payload?.name) setSubmittedName(payload.name);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-[#fefae0] text-[#173E8C] p-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">
          Submission Received{submittedName ? `, ${submittedName}` : ""}
        </h1>

        <p className="text-gray-700 mb-4">
          Your test has been submitted successfully. You&apos;ll receive a confirmation
          email and detailed feedback from an IELS teacher within 24 hours.
        </p>

        <div className="mt-6 p-6 bg-white border rounded-2xl shadow">
          <h3 className="font-bold">Reviewer</h3>
          <p className="mt-2">
            👩‍🏫 Ms. Amanda Li — IELTS Specialist (MA TESOL, University of Sydney)
          </p>
          <blockquote className="mt-3 text-sm text-gray-600">
            “I&apos;ll personally review your writing and send personalized feedback soon.”
          </blockquote>
        </div>

        <p className="text-gray-500 mt-6">
          Access code: <span className="font-mono">{access}</span>
        </p>

        <p className="text-gray-500 mt-4">
          If you didn&apos;t receive an email within 24 hours, contact{" "}
          <a href="mailto:careers@ielsco.com" className="underline">
            careers@ielsco.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-[#173E8C]">
          Loading your test result...
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
