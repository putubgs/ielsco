"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

/**
 * /app/resources/page.tsx
 * IELS Resources Hub — Search + Pagination (events-like style)
 *
 * Features:
 *  - Category tabs
 *  - Keyword search (title, description, tags)
 *  - Client-side pagination with numbered pills + Prev/Next
 *  - Card layout, responsive (1 / 2 / 3 columns)
 *  - TailwindCSS (brand colors: #294154, #e56668)
 */

/* ---------- Types ---------- */
type ResourceType = "E-Book" | "Template" | "Audio" | "Guide";
interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  thumbnail?: string; // optional local image path
  tags?: string[];
}

/* ---------- Sample Data (replace with real data or fetch from Supabase) ---------- */
const resourcesData: Resource[] = [
  {
    id: "r1",
    title: "IELTS Speaking Cue Card Pack",
    description: "50+ real speaking cue cards with model answers and topic prompts.",
    type: "E-Book",
    url: "/docs/ielts-speaking-cards.pdf",
    thumbnail: "/images/resources/ielts_speaking.png",
  },
  {
    id: "r2",
    title: "Academic Essay Structure Template",
    description: "Step-by-step template for clear academic essays (Google Doc).",
    type: "Template",
    url: "https://docs.google.com/...",
    thumbnail: "/images/resources/essay_template.png",
  },
  {
    id: "r3",
    title: "English Grammar Essentials (Summary)",
    description: "40-page quick grammar reference from A1 to C1.",
    type: "E-Book",
    url: "/docs/grammar-essentials.pdf",
    thumbnail: "/images/resources/grammar_book.png",
  },
  {
    id: "r4",
    title: "Listening Mini Test Series (Audio + Script)",
    description: "Real test simulations with transcripts and answers.",
    type: "Audio",
    url: "/resources/listening-series",
    thumbnail: "/images/resources/listening.png",
  },
  {
    id: "r5",
    title: "Scholarship CV Template",
    description: "Editable CV template tailored for scholarship applications.",
    type: "Template",
    url: "/docs/scholarship-cv-template.docx",
    thumbnail: "/images/resources/cv_template.png",
  },
  {
    id: "r6",
    title: "Mastering IELTS Writing — 2025 Edition",
    description: "Complete guide to high-scoring essays with annotated examples.",
    type: "E-Book",
    url: "/docs/ielts-writing-2025.pdf",
    thumbnail: "/images/resources/writing_ebook.png",
  },
  {
    id: "r7",
    title: "Professional Email Writing Guide",
    description: "20 ready-to-use formal email templates for work and school.",
    type: "Guide",
    url: "/docs/email-guide.pdf",
    thumbnail: "/images/resources/email_guide.png",
  },
  {
    id: "r8",
    title: "Pronunciation Drill Pack (Audio)",
    description: "Short daily drills to improve pronunciation and rhythm.",
    type: "Audio",
    url: "/resources/pronunciation-drills",
    thumbnail: "/images/resources/pronounce.png",
  },
  {
    id: "r9",
    title: "Presentation & Pitch Template",
    description: "Slide templates and planning checklist for project pitches.",
    type: "Template",
    url: "/docs/pitch-template.pptx",
    thumbnail: "/images/resources/pitch.png",
  },
  {
    id: "r10",
    title: "Teaching Toolkit: Placement Test",
    description: "Question bank and scoring sheet for placement tests (schools).",
    type: "Guide",
    url: "/docs/placement-toolkit.pdf",
    thumbnail: "/images/resources/placement.png",
  },
  // add more items as needed...
];

/* ---------- Constants ---------- */
const CATEGORIES: (ResourceType | "All")[] = ["All", "E-Book", "Template", "Audio", "Guide"];
const PAGE_SIZE = 6;

/* ---------- Helper components ---------- */
function ResourceCard({ r }: { r: Resource }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-md transition transform hover:-translate-y-1 border border-transparent hover:border-[#e56668]/30 overflow-hidden">
      <div className="relative h-40 md:h-36 lg:h-40 w-full bg-[#f8fafb]">
        {r.thumbnail ? (
          <Image
            src={r.thumbnail}
            alt={r.title}
            fill
            style={{ objectFit: "cover" }}
            className="object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-4xl text-[#294154]/40">
            📘
          </div>
        )}
      </div>

      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-[#294154]">{r.title}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-3">{r.description}</p>
          </div>
          <span className="ml-2 text-xs px-2 py-1 rounded-full bg-[#294154] text-white font-medium self-start">
            {r.type}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Link
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#e56668] text-white text-sm font-semibold hover:bg-[#cc4f54] transition"
            aria-label={`open resource ${r.title}`}
          >
            📥 Download / Open
          </Link>

          <div className="text-xs text-gray-500">
            {r.tags?.slice(0, 2).map((t, i) => (
              <span key={t} className="mr-2">
                #{t.replace(/\s+/g, "")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- Page component ---------- */
export default function ResourcesPage() {
  // UI state
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ResourceType | "All">("All");
  const [page, setPage] = useState(1);

  // derived data: filtered list
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = resourcesData;

    if (category !== "All") {
      list = list.filter((r) => r.type === category);
    }

    if (q) {
      list = list.filter((r) => {
        return (
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          (r.tags ?? []).some((t) => t.toLowerCase().includes(q))
        );
      });
    }

    return list;
  }, [query, category]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  // helpers
  const resetToFirst = () => setPage(1);
  const handleCategoryClick = (cat: ResourceType | "All") => {
    setCategory(cat);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const goToPage = (n: number) => setPage(Math.max(1, Math.min(totalPages, n)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f8fbfc] to-[#fff6f6] text-[#294154]">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
        <div className="lg:col-span-7 order-2 space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Learn. Access. Grow. 
            </h1>
            <p className="mt-3 text-gray-700 max-w-2xl">
              Curated downloadable materials to help you study smarter — e-books,
              templates, audio practice, and teacher guides. Use the search and
              filters to find what you need instantly.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/lounge"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e56668] text-white font-semibold hover:bg-[#cc4f54] transition"
              >
                Access Free E-Books
              </Link>
              <Link
                href="/lounge"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#294154] text-[#294154] font-semibold hover:bg-[#294154] hover:text-white transition"
              >
                Join IELS Lounge
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 flex justify-center lg:justify-end">
            <div className="w-[320px] sm:w-[420px] lg:w-[420px]">
              <Image
                src="/images/contents/general/ielsresources.svg"
                alt="IELS mascot in classroom"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </section>

        {/* FILTERS (tabs + search) */}
        <section className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-[#e6eef4] mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => handleCategoryClick(c)}
                   className={`whitespace-nowrap px-3 py-2 rounded-full text-sm font-medium transition ${
                    category === c
                      ? "bg-[#294154] text-white shadow"
                      : "bg-white text-[#294154] border border-[#e6eef4] hover:bg-[#f8fafb]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="w-full md:w-1/2">
              <label htmlFor="resource-search" className="sr-only">
                Search resources
              </label>
              <div className="relative shadow-sm">
                <input
                  id="resource-search"
                  value={query}
                  onChange={handleSearchChange}
                  placeholder="Search by title, description, or tag (e.g. 'IELTS', 'cv', 'listening')"
                  className="w-full border border-gray-200 rounded-full px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#e56668]/40"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  🔎
                </div>
              </div>
            </div>
          </div>

          {/* Small status row */}
          <div className="mt-3 text-sm text-gray-500 flex items-center justify-between gap-3">
            <div>
              {filtered.length} resource{filtered.length !== 1 ? "s" : ""} found
              {category !== "All" && ` • ${category}`}
            </div>
            <div className="text-xs">Tip: search by keyword or pick category</div>
          </div>
        </section>

        {/* GRID OF RESOURCES */}
        <section className="mb-8">
          {paged.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
              <h3 className="text-lg font-semibold">No materials found</h3>
              <p className="text-sm text-gray-600 mt-2">
                Try a different keyword or choose a broader category.
              </p>
              <div className="mt-4">
                <button
                  onClick={() => {
                    setQuery("");
                    setCategory("All");
                    resetToFirst();
                  }}
                  className="px-4 py-2 rounded-full border border-[#294154] text-[#294154] hover:bg-[#294154] hover:text-white transition"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paged.map((r) => (
                <ResourceCard key={r.id} r={r} />
              ))}
            </div>
          )}
        </section>

        {/* PAGINATION (events-like style: pills + prev/next) */}
        <section className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={currentPage <= 1}
              className="px-3 py-2 rounded-full border border-gray-200 bg-white text-sm hover:bg-gray-50 disabled:opacity-50"
              aria-label="Previous page"
            >
              ← Prev
            </button>
          </div>

          <nav aria-label="Pagination" className="flex gap-2 items-center">
            {/* render page numbers but keep it compact if many pages */}
            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              // show first, last, current +/-1, and ellipses
              const show =
                n === 1 ||
                n === totalPages ||
                Math.abs(n - currentPage) <= 1 ||
                (currentPage <= 3 && n <= 4) ||
                (currentPage >= totalPages - 2 && n >= totalPages - 3);

              if (!show) {
                // conditionally show ellipsis placeholder
                const prevShown = i > 0 && (i - 1 === 0 || Math.abs(i - 1 - currentPage) <= 1);
                // In simple implementation, return null for hidden ones
                return (
                  <span key={n} className="hidden" />
                );
              }

              return (
                <button
                  key={n}
                  onClick={() => goToPage(n)}
                  className={`px-3 py-2 rounded-full text-sm transition ${
                    n === currentPage
                      ? "bg-[#294154] text-white shadow"
                      : "bg-white border border-gray-200 text-[#294154] hover:bg-gray-50"
                  }`}
                  aria-current={n === currentPage ? "page" : undefined}
                >
                  {n}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(page + 1)}
              disabled={currentPage >= totalPages}
              className="px-3 py-2 rounded-full border border-gray-200 bg-white text-sm hover:bg-gray-50 disabled:opacity-50"
              aria-label="Next page"
            >
              Next →
            </button>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="mt-10 bg-white rounded-2xl p-6 text-center border border-[#e6eef4] shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Can’t find what you need?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Contact our content team — we can prepare custom resources for institutions and teachers.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:hello@ielsco.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e56668] text-white font-semibold hover:bg-[#cc4f54] transition"
            >
              📧 Email us
            </a>

            <Link
              href="/partners"
              className="px-4 py-2 rounded-full border border-[#294154] text-[#294154] font-semibold hover:bg-[#294154] hover:text-white transition"
            >
              🔗 Partnership & Institutional Kits
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}