"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";

export default function ProductsPage() {
  const products = [
    {
      name: "IELS Lounge",
      desc: "A structured English learning community where learners grow together through practice, mentorship, and global connections.",
      emoji: "💬",
      href: "/iels-lounge",
    },
    {
      name: "IELS Courses",
      desc: "Affordable, guided English courses focusing on real-world communication, test preparation, and professional growth.",
      emoji: "🎓",
      href: "/courses",
    },
    {
      name: "IELS English Test",
      desc: "Experience IELTS, TOEFL, and TOEIC mock tests with AI scoring and teacher feedback — practice like the real exam.",
      emoji: "🧠",
      href: "/test",
    },
    {
      name: "IELS for Schools",
      desc: "Comprehensive English program for schools and universities — structured, measurable, and empowering for both teachers and students.",
      emoji: "🏫",
      href: "/schools",
    },
    {
      name: "E-books & Recordings",
      desc: "Access premium materials, recorded sessions, and digital resources to strengthen your English anytime, anywhere.",
      emoji: "📚",
      href: "/resources",
    },
  ];

  return (
    <div>
      <Header />
    
    <main className="min-h-screen bg-gradient-to-b from-white to-[#f7f9f8] text-[#294154] font-geologica">
      {/* === HERO SECTION === */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          Explore the IELS Ecosystem 🌍
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Every IELS product is built to help learners, educators, and institutions grow globally.  
          From personalized mentorship to academic testing — we connect education with real opportunities.
        </p>
      </section>

      {/* === PRODUCT GRID === */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <div
            key={p.name}
            className="bg-white rounded-2xl p-8 shadow-sm border border-[#294154]/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="text-4xl mb-4">{p.emoji}</div>
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <p className="text-gray-600 text-sm mb-6">{p.desc}</p>
            </div>

            <Link
              href={p.href}
              className="inline-block text-center bg-[#E56668] text-white py-2 rounded-full font-semibold hover:bg-[#c94c4f] transition-colors"
            >
              Explore
            </Link>
          </div>
        ))}
      </section>
    </main>
    <Footer />
    </div>
  );
}