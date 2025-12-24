"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import RoleModal from "@/components/careers/RoleModal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { divisions, Role } from "@/data/careers/divisions";

interface DivisionPageProps {
  params: Promise<{
    division: string;
  }>;
}

export default function DivisionPage({ params }: DivisionPageProps) {
  const { division: divisionSlug } = use(params);
  const division = divisions.find((d) => d.slug === divisionSlug);

  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [pressedRole, setPressedRole] = useState<string | null>(null);

  if (!division) return notFound();

  return (
    <>
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[65vh] lg:min-h-[75vh] overflow-hidden flex items-center">
        <img
          src={division.image}
          alt={`${division.title} Division`}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2F4157]/80 via-[#2F4157]/70 to-[#1f2d3d]/90" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-white text-center py-24">
          <p className="uppercase tracking-widest text-sm text-white/70 mb-3">
            IELS Open Recruitment · Batch 3
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            {division.title} Division
          </h1>

          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {division.description}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            
            <Button
              asChild
              className="bg-[#E56668] text-white px-6 py-3 hover:bg-[#C04C4E]"
            >
              <a
                href="https://forms.gle/DotTzXLZ9vzcF4BJA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply for this Division
              </a>
            </Button>

            <Button
              asChild
              className="bg-white text-[#2F4157] px-6 py-3 hover:bg-white/80"
            >
              <Link href="https://ielsco.com/about" target="_blank">
                Ask before Applying
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="bg-[#F7F8FA] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {division.subDivisions.map((sub) => (
            <div
              key={sub.name}
              className="mb-16 bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#2F4157] mb-2">
                  {sub.name}
                </h2>
                <p className="text-gray-600">{sub.objective}</p>
              </div>

              {/* ===== ROLES ===== */}
              <div className="grid gap-6">
                {sub.roles.map((role) => {
                  const isActive = pressedRole === role.title;

                  return (
                    <button
                      key={role.title}
                      onClick={() => setActiveRole(role)}
                      onPointerDown={() => setPressedRole(role.title)}
                      onPointerUp={() =>
                        setTimeout(() => setPressedRole(null), 120)
                      }
                      onPointerLeave={() => setPressedRole(null)}
                      className={`
                        group relative w-full text-left
                        rounded-3xl border bg-white p-6
                        transition-all duration-300
                        ${
                          isActive
                            ? "border-[#E56668] shadow-xl -translate-y-1"
                            : "border-gray-200 hover:-translate-y-1 hover:shadow-xl hover:border-[#E56668]/60"
                        }
                      `}
                    >
                      {/* ACCENT BAR */}
                      <div
                        className={`
                          absolute left-0 top-6 bottom-6 w-1 rounded-full
                          transition-all duration-300
                          ${
                            isActive
                              ? "bg-[#E56668]"
                              : "bg-transparent group-hover:bg-[#E56668]"
                          }
                        `}
                      />

                      <div className="flex flex-col gap-4 pl-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3
                              className={`
                                text-xl font-bold transition
                                ${
                                  isActive
                                    ? "text-[#E56668]"
                                    : "text-[#2F4157] group-hover:text-[#E56668]"
                                }
                              `}
                            >
                              {role.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                              {role.level} · {role.mode}
                            </p>
                          </div>

                          <span
                            className={`
                              text-sm font-semibold text-[#E56668]
                              transition-all duration-300
                              ${
                                isActive
                                  ? "opacity-100 translate-x-0"
                                  : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                              }
                            `}
                          >
                            View →
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                          {role.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* ===== BOTTOM CTA ===== */}
          <div className="mt-24 text-center">
            <div className="bg-[#2F4157] rounded-3xl px-8 py-12 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Grow in {division.title}?
              </h3>

              <p className="text-white/80 max-w-xl mx-auto mb-8">
                Work on real projects, global collaborations, and structured
                learning. No salary — but real skills, network, and credibility.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-[#E56668] text-white px-6 py-3 hover:bg-[#C04C4E]"
                >
                  <a
                    href="https://forms.gle/DotTzXLZ9vzcF4BJA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply for this Division
                  </a>
                </Button>

                <Button
                  asChild
                  className="bg-white text-[#2F4157] px-6 py-3 hover:bg-white/80"
                >
                  <Link href="https://ielsco.com/about" target="_blank">
                    Ask before Applying
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ROLE MODAL ===== */}
      {activeRole && (
        <RoleModal role={activeRole} onClose={() => setActiveRole(null)} />
      )}

      <Footer />
    </>
  );
}