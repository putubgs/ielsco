"use client";
import OnboardingQuiz from "@/components/homepage/OnboardingQuiz";

export default function StartPage() {
  return (
    <>
      

      {/* MAIN SECTION */}
      <main className="min-h-screen flex flex-col justify-center items-center bg-white text-[#2F4157] px-6 pt-[120px] pb-20">
        <div className="w-full max-w-3xl text-center">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Let&apos;s Find Your <span className="text-[#E56668]">English Journey!</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Answer these friendly questions — it only takes 2 minutes.  
            Your result will be <strong>personalized and actionable</strong> to guide your English learning path.
          </p>

          {/* QUIZ SECTION */}
          <div className="w-full">
            <OnboardingQuiz />
          </div>
        </div>
      </main>
    </>
  );
}