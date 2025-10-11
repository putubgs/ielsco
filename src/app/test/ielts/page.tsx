"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SectionCard from "@/components/SectionCard";

export default function IELTSOverview() {
  const params = useSearchParams();
  const router = useRouter();
  const access = params.get("access");

  useEffect(() => {
    if (!access) router.push("/test/access");
  }, [access, router]);

  const base = (path: string) => `/test/ielts/${path}?access=${encodeURIComponent(access ?? "")}`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-[#fefae0] text-[#173E8C] py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to IELS Mock IELTS Test</h1>
        <p className="text-gray-700 mb-8">
          Complete the sections in order: Listening → Reading → Writing. Each section has a timer.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <SectionCard title="Listening" emoji="🎧" description="30 minutes — listen and answer" href={base("listening")} />
          <SectionCard title="Reading" emoji="📖" description="60 minutes — comprehension" href={base("reading")} />
          <SectionCard title="Writing" emoji="✍️" description="60 minutes — 2 writing tasks" href={base("writing")} />
        </div>

        <p className="text-gray-500">Access Code: <span className="font-mono">{access}</span></p>
      </div>
    </main>
  );
}
