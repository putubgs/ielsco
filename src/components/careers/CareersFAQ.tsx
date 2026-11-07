"use client";

import { useMemo, useState } from "react";

/**
 * Careers FAQ — IELS Style (Updated)
 * - Interactive accordion
 * - Search
 * - 4 Major Categories (no "All")
 * - Horizontal swipe pills on mobile
 */

type MajorCategory =
  | "Recruitment Eligibility"
  | "Division"
  | "Recruitment Process"
  | "Work Culture";

type FAQItem = {
  id: string;
  majorCategory: MajorCategory;
  question: string;
  answer: string[];
};

const FAQS: FAQItem[] = [
  // ===== Recruitment & Eligibility =====
  {
    id: "a1",
    majorCategory: "Division",
    question: "4) What divisions are open in this recruitment?",
    answer: [
      "We’re opening Associate roles in: Marketing, Creative, Brand Experience, Finance, Project, Product, Community, Business, Talent Management, and Talent Development. You can explore all role details on ielsco.com/careers.",
    ],
  },
  {
    id: "a2",
    majorCategory: "Division",
    question: "5) Can I apply for more than one role?",
    answer: [
      "Yes! You can apply for up to 2 roles (First Preference and Second Preference). Choose roles that match your skills and interests most.",
    ],
  },
  {
    id: "a3",
    majorCategory: "Division",
    question: "6) If I choose “No” for second preference, what happens?",
    answer: [
      "No worries — you can simply skip the second preference question. You’ll only be considered for your first choice role.",
    ],
  },

  {
    id: "b4",
    majorCategory: "Recruitment Eligibility",
    question: "1) Who can apply? (Which college batches are eligible?)",
    answer: [
      "This recruitment is open for students from Batch 2022, 2023, 2024, and 2025 only. If you’re outside those batches, you won’t be eligible for this intake.",
    ],
  },
  {
    id: "b5",
    majorCategory: "Recruitment Eligibility",
    question: "2) Can fresh graduates apply?",
    answer: [
      "Unfortunately, fresh graduates are not eligible for this recruitment. This intake is strictly for active students from Batch 2022–2025.",
    ],
  },
  {
    id: "b6",
    majorCategory: "Recruitment Eligibility",
    question: "3) Do I need to be fluent in English?",
    answer: [
      "You don’t need perfect English — we value growth and consistency. We’ll train and support you through the process, especially during apprenticeship.",
    ],
  },

  // ===== Process & Commitment =====
  {
    id: "c7",
    majorCategory: "Recruitment Process",
    question: "8) Is this role online or offline? Can I join from anywhere?",
    answer: [
      "Most of our work is online, so you can join from anywhere. We may have occasional offline events (usually in big cities), but we’ll announce it early.",
    ],
  },
  {
    id: "c8",
    majorCategory: "Recruitment Process",
    question: "9) Is recruitment only for certain areas/cities?",
    answer: [
      "Nope — it’s open for eligible students across Indonesia. As long as you can commit online, you’re good to go.",
    ],
  },
  {
    id: "d9",
    majorCategory: "Recruitment Process",
    question: "10) What is the recruitment process?",
    answer: [
      "Our process: CV Screening → Online Interview → Apprenticeship → Final Announcement. Apprenticeship is where we see your teamwork, consistency, and execution in real tasks.",
    ],
  },
  {
    id: "d10",
    majorCategory: "Recruitment Process",
    question: "11) Will the interview be fully in English?",
    answer: [
      "The interview will be mostly in English, but we may mix languages if needed. We focus more on clarity and confidence, not perfect grammar.",
    ],
  },
  {
    id: "d11",
    majorCategory: "Recruitment Process",
    question: "12) Can we mix languages for the interview and registration form?",
    answer: [
      "Yes, you may mix languages, but English is highly recommended. Try your best — we want to see your effort and communication style.",
    ],
  },
  {
    id: "f15",
    majorCategory: "Recruitment Process",
    question: "13) Is this paid or unpaid?",
    answer: [
      "IELS is a student-led organization, so this role is unpaid. However, we offer quarterly profit-sharing for top performers, based on OKR & KPI achievement and organization performance.",
    ],
  },
  {
    id: "f16",
    majorCategory: "Recruitment Process",
    question: "14) How long is the program period?",
    answer: [
      "The Associate period runs for 9 months, from April to December 2026. Please make sure you can commit consistently throughout the period.",
    ],
  },

  // ===== Roles & Work =====
  {
    id: "e12",
    majorCategory: "Division",
    question: "7) What will I do as an Associate in general?",
    answer: [
      "You’ll support your division through weekly tasks, teamwork, and real project execution. You’ll also join meetings, track progress, and collaborate cross-division.",
    ],
  },

  // ===== Tools & Culture =====
  {
    id: "g17",
    majorCategory: "Work Culture",
    question: "15) What tools will we use?",
    answer: [
      "We mainly use Notion, Google Workspace, WhatsApp, and Discord. Some roles also use tools like Canva, CapCut, or spreadsheets — you’ll be guided during onboarding.",
    ],
  },
];

const MAJOR_CATEGORIES: MajorCategory[] = [
  "Recruitment Eligibility",
  "Division",
  "Recruitment Process",
  "Work Culture",
];

export default function CareersFAQ() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MajorCategory>(MAJOR_CATEGORIES[0]);
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return FAQS.filter((item) => {
      const matchesCategory = item.majorCategory === category;
      const matchesQuery =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.join(" ").toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const openAll = () => {
    const next: Record<string, boolean> = {};
    filtered.forEach((x) => (next[x.id] = true));
    setOpenIds(next);
  };

  const closeAll = () => setOpenIds({});

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-16 sm:py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* HEADER */}
        <div className="max-w-3xl">


          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#294154] mb-3">
            FAQ for Associates
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Quick answers to common questions — so you can apply with clarity and confidence.
          </p>
        </div>

    {/* CONTROLS (CLEAN VERSION) */}
        <div className="mb-8 space-y-6">
          
          {/* 1. CATEGORY FILTER (Horizontal Scroll - One Row) */}
          <div className="relative group">
            <div 
              className="
                flex gap-2 overflow-x-auto pb-4 
                scrollbar-hide mask-linear-fade
              "
              style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
              {MAJOR_CATEGORIES.map((c) => {
                const active = category === c;
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`
                      whitespace-nowrap shrink-0
                      inline-flex items-center justify-center
                      rounded-full px-5 py-2.5
                      text-sm font-semibold
                      transition-all duration-200
                      border
                      active:scale-95
                      ${
                        active
                          ? "bg-[#294154] text-white border-[#294154] shadow-md"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#E56668] hover:text-[#E56668]"
                      }
                    `}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. ACTIONS & COUNTER (Sub-controls) */}
          <div className="flex flex-row items-center justify-between px-1">
            <p className="text-sm text-gray-500">
              Showing <span className="font-bold text-[#294154]">{filtered.length}</span> results
            </p>

            <div className="flex items-center gap-4">
              <button 
                onClick={openAll}
                className="text-sm font-semibold text-[#E56668] hover:text-[#c04c4e] transition-colors"
              >
                Expand All
              </button>
              <div className="h-4 w-px bg-gray-300"></div>
              <button 
                onClick={closeAll}
                className="text-sm font-semibold text-gray-400 hover:text-[#294154] transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>

        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {filtered.map((item) => {
            const isOpen = !!openIds[item.id];

            return (
              <div
                key={item.id}
                className="
                  group relative rounded-3xl bg-white
                  border border-[#294154]/10
                  transition-all duration-300
                  hover:shadow-xl hover:border-[#E56668]/40
                "
              >
                {/* LEFT ACCENT BAR */}
                <div
                  className={`
                    absolute left-0 top-6 bottom-6 w-1 rounded-full
                    transition-all duration-300
                    ${isOpen ? "bg-[#E56668]" : "bg-transparent group-hover:bg-[#E56668]"}
                  `}
                />

                <button
                  onClick={() => toggle(item.id)}
                  className="
                    w-full text-left
                    px-6 py-5
                    flex items-start justify-between gap-4
                    active:scale-[0.99]
                    transition
                  "
                >
                  <div className="pl-4">
                    <p className="text-xs uppercase tracking-widest text-[#E56668] font-semibold mb-2">
                      {item.majorCategory}
                    </p>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[#294154] leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  <div
                    className={`
                      mt-2 shrink-0
                      w-10 h-10 rounded-full
                      border border-[#294154]/15
                      flex items-center justify-center
                      text-[#294154]
                      transition-all duration-300
                      ${isOpen ? "bg-[#E56668] text-white border-[#E56668]" : "bg-white group-hover:bg-[#294154]/5"}
                    `}
                    aria-hidden
                  >
                    <span
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      +
                    </span>
                  </div>
                </button>

                {/* ANSWER */}
                <div
                  className={`
                    grid transition-all duration-300 ease-in-out
                    ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6">
                      <div className="pl-4 space-y-2 text-gray-700 leading-relaxed">
                        {item.answer.map((line, idx) => (
                          <p key={idx} className="text-sm sm:text-[15px]">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* EMPTY STATE */}
          {filtered.length === 0 && (
            <div className="rounded-3xl bg-[#F7F8FA] border border-[#294154]/10 p-8 text-center">
              <p className="text-[#294154] font-extrabold text-lg mb-2">
                No results found
              </p>
              <p className="text-gray-600 text-sm">
                Try different keywords or switch the category filter.
              </p>
            </div>
          )}
        </div>

        {/* FOOTNOTE */}
        <div className="rounded-3xl bg-[#F7F8FA] border border-[#294154]/10 p-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            Still unsure? You can explore complete role details and updates directly on{" "}
            <span className="font-semibold text-[#294154]">ielsco.com/careers</span>.
          </p>
        </div>
      </div>
    </section>
  );
}