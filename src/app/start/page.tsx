// src/app/start/page.tsx
"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import OnboardingQuiz from "@/components/homepage/OnboardingQuiz";

export default function StartPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#3a4b60] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 rounded-2xl p-6 mb-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Let’s find your English journey!</h2>
            <p className="text-sm text-white/80">6 friendly questions — takes about 2 minutes. Your result is personal and actionable.</p>
          </div>

          <OnboardingQuiz />
        </div>
      </main>
      <Footer />
    </>
  );
}
