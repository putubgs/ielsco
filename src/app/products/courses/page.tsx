"use client";
// src/app/courses/page.tsx
/* Server component - exports metadata (App Router) */

import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#ffffff] to-[#eaf2ff] text-[#294154] font-geologica">
       <Header />

      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
              Master English with Personalized Mentorship — From Beginner to Global Professional
            </h1>

            <p className="text-lg text-gray-700 max-w-2xl">
              Join Arba&apos;s 1-on-1 or semi-private English programs tailored for your goals — whether it&apos;s speaking fluency, writing,
              or IELTS preparation. Learn with mentorship, custom materials, and a supportive community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]">
              <Link
                href="https://forms.gle/t8xijoi6umFeYAu86"
                target="_blank"
                rel="noopener noreferrer"
                 >
                Register Now
              </Link></Button>
              <Button asChild className="bg-[#294154] text-white font-semibold px-6 py-3 hover:bg-[#21363f]">
              <Link
                href="#packages"
               
              >
                View Class Packages
              </Link></Button>
            </div>

            <p className="text-sm text-gray-600 mt-3">
              Transparent pricing · Mentor-led sessions · Placement & certificate included
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-[320px] sm:w-[360px] lg:w-[420px]">
              <Image
                src="/images/contents/about/arba.png"
                alt="Arbadza Rido Adzariyat — IELS"
                width={880}
                height={880}
                className="rounded-2xl shadow-xl object-cover"
                priority
              />
              <div className="absolute -bottom-4 right-4 bg-white/90 border border-[#294154]/10 rounded-full px-3 py-1 text-xs font-semibold text-[#294154]">
                IELS Course — Mentor: Arba
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT ARBA */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border border-[#294154]/8">
          <div className="flex flex-col lg:flex-row items-center gap-6">
      
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold">Meet Your Teacher — Arbadza Rido Adzariyat</h2>
              <p className="text-gray-700 mt-2">
                English teacher across Southeast Asia with 3+ years of experience, specializing in personalized courses for students,
                professionals, and exam preparation.
              </p>

              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                <li>• Founder & Principal of IELS</li>
                <li>• TEFL & TESL certified (Arizona State University)</li>
                <li>• Project Manager, Pertamina Training Consulting, 2024</li>
                <li>• Volunteer, Tech in Asia & TEDx Jakarta, 2023</li>
                
              </ul>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="/docs/arba-credentials.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 bg-[#294154] text-white font-semibold hover:bg-[#21363f] transition transform hover:scale-[1.02]"
                >
                  View Credentials
                </a>
                <a
                  href="https://linkedin.com/in/arbadzarido"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]"
                >
                  🔗 LinkedIn
                </a>
                <a
                  href="https://instagram.com/arbadzarido"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]"
                >
                  📸 Instagram
                </a>
              </div>
             
          </div>
        </section>

 {/* COURSE FOCUS */}
<section>
  <h3 className="text-2xl font-bold mb-4">Choose Your Focus</h3>
  <p className="text-gray-700 mb-6">
    Each course is designed for a specific global outcome.  
    Choose your focus and explore the full program details.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {/* 🔥 FEATURED: Singapore Global Insight Trip */}
    <Link
      href="/products/courses/sgtrip-mentoring"
      className="relative bg-white rounded-2xl p-5 shadow-sm border-2 border-[#E56668]
                 flex flex-col gap-3 hover:shadow-lg hover:-translate-y-1 transition"
    >
      {/* Badge */}
      <span className="absolute -top-3 left-4 bg-[#E56668] text-white text-xs font-semibold px-3 py-1 rounded-full">
        Featured Program
      </span>

      <div className="text-3xl">🇸🇬</div>
      <h4 className="font-semibold text-lg leading-tight">
        Singapore Global Insight <br /> Trip Mentoring
      </h4>
      <p className="text-sm text-gray-600">
        Intensive mentoring for project proposal, interview,
        and presentation preparation for SG Global Insight Trip 2026.
      </p>

      <p className="text-sm font-semibold text-[#E56668] mt-auto">
        View program →
      </p>
    </Link>

    {/* Speaking */}
    <Link
      href="/courses/speaking"
      className="bg-white rounded-2xl p-4 shadow-sm border border-[#294154]/6
                 flex flex-col gap-3 hover:shadow-md hover:-translate-y-1 transition"
    >
      <div className="text-3xl">🗣</div>
      <h4 className="font-semibold">Speaking Fluency</h4>
      <p className="text-sm text-gray-600">
        Build real-world confidence, pronunciation,
        and professional conversation skills.
      </p>
      <p className="text-sm font-semibold text-[#294154] mt-auto">
        Explore →
      </p>
    </Link>

    {/* Writing */}
    <Link
      href="/courses/writing"
      className="bg-white rounded-2xl p-4 shadow-sm border border-[#294154]/6
                 flex flex-col gap-3 hover:shadow-md hover:-translate-y-1 transition"
    >
      <div className="text-3xl">✍</div>
      <h4 className="font-semibold">Writing Excellence</h4>
      <p className="text-sm text-gray-600">
        Academic essays, project proposals,
        and professional writing with clarity.
      </p>
      <p className="text-sm font-semibold text-[#294154] mt-auto">
        Explore →
      </p>
    </Link>

    {/* IELTS */}
    <Link
      href="/courses/ielts"
      className="bg-white rounded-2xl p-4 shadow-sm border border-[#294154]/6
                 flex flex-col gap-3 hover:shadow-md hover:-translate-y-1 transition"
    >
      <div className="text-3xl">🎓</div>
      <h4 className="font-semibold">IELTS / TOEFL Prep</h4>
      <p className="text-sm text-gray-600">
        Strategy-driven preparation
        for academic and global mobility goals.
      </p>
      <p className="text-sm font-semibold text-[#294154] mt-auto">
        Explore →
      </p>
    </Link>
  </div>
</section>

        {/* BENEFITS */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#294154]/8">
          <h3 className="text-2xl font-bold mb-4">Why Learners Love the IELS Course</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <BenefitCard title="Flexible schedule" desc="Pick times that suit your routine." emoji="🕒" />
            <BenefitCard title="Personalized materials" desc="Materials tailored to your goals." emoji="📚" />
            <BenefitCard title="Placement & progress" desc="Track real improvement with tests and reports." emoji="📈" />
            <BenefitCard title="Certificate" desc="Receive an international certificate upon completion." emoji="🎖" />
            <BenefitCard title="Free e-books" desc="Access IELS e-books included with your course." emoji="📘" />
            <BenefitCard title="Community access" desc="1-year free IELS Lounge Premium access (speaking clubs)." emoji="💬" />
          </div>

          <p className="mt-6 text-gray-700">
            Every course comes with mentorship, feedback, and community — because English is not just a skill, it’s your global passport.
          </p>
        </section>

        {/* LEARNING FLOW */}
        <section>
          <h3 className="text-2xl font-bold mb-4">Learning Flow — Before → During → After</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <FlowColumn
              color="[#DFF6E9]"
              title="Before the Course"
              items={[
                "Tell Me About You",
                "Take a Placement Test",
                "Receive Level Report",
                "Book Your Schedule",
              ]}
            />
            <FlowColumn
              color="[#FFF4D9]"
              title="During the Course"
              items={[
                "Receive Personalized Materials",
                "Join the 90-min Class",
                "Take Quick Quizzes",
                "Receive Personalized Feedback",
              ]}
            />
            <FlowColumn
              color="[#EAF4FF]"
              title="After the Course"
              items={[
                "Take Post-Test",
                "Earn Your Certificate",
                "Join IELS Community",
                "Continue Practice in Lounge",
              ]}
            />
          </div>

          <p className="mt-4 text-gray-700">
            You&apos;re not just taking a course — you&apos;re joining a global mentorship journey.
          </p>
        </section>

        {/* PERSONAL TOUCH */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#294154]/8 flex flex-col lg:flex-row items-center gap-6">
          <div className="flex-shrink-0 w-28 h-28 relative rounded-full overflow-hidden">
            <Image src="/images/arba.png" alt="Arba" fill className="object-cover" />
          </div>

          <div>
            <blockquote className="text-xl italic text-gray-800">
              “I&apos;ll personally accompany you throughout your learning journey — from zero until you reach your dream goal.
              It&apos;s not just about learning English. I&apos;ll ask where you want to go, what your dream career is, and help you build the path to get there.”
            </blockquote>

            <p className="mt-4 text-gray-700">You&apos;re not only learning. You&apos;re connecting to real opportunities.</p>

            <div className="mt-4">
              <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]">
                <Link href="/stories" >
                Discover Member Stories
              </Link></Button>
            </div>
          </div>
        </section>



        {/* FAQ */}
        <section>
          <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <details className="bg-white rounded-2xl p-4 border border-[#294154]/8">
              <summary className="font-semibold cursor-pointer">Can I reschedule a session?</summary>
              <p className="mt-2 text-gray-700">Yes — simply notify us 24 hours in advance and we&apos;ll rearrange your session.</p>
            </details>

            <details className="bg-white rounded-2xl p-4 border border-[#294154]/8">
              <summary className="font-semibold cursor-pointer">What if I don&apos;t reach my target level?</summary>
              <p className="mt-2 text-gray-700">We offer a level-up guarantee: one free evaluation session and retake if needed.</p>
            </details>

            <details className="bg-white rounded-2xl p-4 border border-[#294154]/8">
              <summary className="font-semibold cursor-pointer">What materials are included?</summary>
              <p className="mt-2 text-gray-700">Personalized materials, practice tests, and free access to IELS e-books are included.</p>
            </details>

            <details className="bg-white rounded-2xl p-4 border border-[#294154]/8">
              <summary className="font-semibold cursor-pointer">Will I still get support after the course?</summary>
              <p className="mt-2 text-gray-700">Yes — lifetime access to IELS Lounge and continued community support.</p>
            </details>
          </div>
        </section>

{/* REGISTER CTA */}
<section className="bg-[#294154] text-white rounded-2xl p-12 text-center space-y-8">
  <div>
    <h3 className="text-3xl font-bold mb-3">Ready to Start Your English Journey?</h3>
    <p className="text-white/90 max-w-3xl mx-auto text-lg leading-relaxed">
      Getting started with IELS is simple. Follow the steps below — and you&apos;ll be learning with Arba and the IELS community in no time.
    </p>
  </div>

{/* STEPS */}
<div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
  <div className="bg-white/10 rounded-xl p-5 border border-white/20">
    <div className="text-3xl mb-2">📝</div>
    <h4 className="font-semibold text-lg">1. Fill the Registration Form</h4>
    <p className="text-sm text-white/80">
      Complete the registration form with your personal details,
      learning goals, and preferred program.
      <br />
      <span className="italic">
        This helps us understand you before the program starts.
      </span>
    </p>
  </div>

  <div className="bg-white/10 rounded-xl p-5 border border-white/20">
    <div className="text-3xl mb-2">💳</div>
    <h4 className="font-semibold text-lg">2. Confirm & Transfer Payment</h4>
    <p className="text-sm text-white/80">
      After confirmation, complete your payment to:
      <br />
      <strong>Bank Jago</strong><br />
      <strong>103196849968</strong><br />
      (a.n. Arbadza Rido Adzariyat)
    </p>
  </div>

  <div className="bg-white/10 rounded-xl p-5 border border-white/20">
    <div className="text-3xl mb-2">🚀</div>
    <h4 className="font-semibold text-lg">3. Start Learning</h4>
    <p className="text-sm text-white/80">
      Receive onboarding instructions, schedule details,
      and start your learning journey with IELS.
    </p>
  </div>
</div>

{/* CTA BUTTONS */}
<div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
  
  <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]">
    <Link
    href="https://forms.gle/t8xijoi6umFeYAu86"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]"
  > Register Now
    
  </Link></Button>

  <Button asChild className="bg-white text-[#294154] font-semibold px-6 py-3 hover:bg-gray-200">
    <Link
    href="https://wa.me/6288297253491"
    target="_blank"
    rel="noopener noreferrer"
  
  >
    💬 Ask via WhatsApp
  </Link></Button>
</div>
      </section>

      {/* COMMUNITY INVITE */}
      <section className="bg-white rounded-2xl p-10 shadow-md border border-[#294154]/10 text-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            </div>

            <div className="text-left">
              <h4 className="text-xl font-semibold text-[#294154]">
                Continue Your Growth in IELS Lounge Premium 🌍
              </h4>
              <p className="text-gray-700 mt-1 text-base leading-relaxed">
                After completing your course, keep practicing daily in our exclusive Lounge. Join live speaking clubs, storytelling nights, 
                and professional networking sessions — all in English.
              </p>
          </div>

          <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]">
            <Link
            href="/iels-lounge"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02] whitespace-nowrap"
          >
            Explore IELS Lounge
          </Link></Button>
        </div>
      </section>
      
      </div>
      <Footer />
    </main>
  );
}

/* Small presentational helpers (server-safe) */

function BenefitCard({ title, desc, emoji }: { title: string; desc: string; emoji: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-[#294154]/8 shadow-sm flex items-start gap-3">
      <div className="text-2xl">{emoji}</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-600 mt-1">{desc}</div>
      </div>
    </div>
  );
}

function FlowColumn({ title, items, color }: { title: string; items: string[]; color?: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-[#294154]/8 shadow-sm">
      <h4 className="font-semibold mb-3">{title}</h4>
      <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ol>
    </div>
    
  );
}