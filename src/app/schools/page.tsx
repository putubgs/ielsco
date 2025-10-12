"use client";

// src/app/schools/page.tsx
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


/**
 * IELS for Schools Landing Page
 * - Place in: src/app/schools/page.tsx
 * - Replace PDF links and contact details in the constants below as needed.
 */

const COLORS = {
  primary: "#294154", 
  accent: "#E56668", 
  accentDark: "#C04C4E",
};

const LINKS = {
  programOverview: "https://bit.ly/IELSforSchoolsOverview", // replace
  curriculumGuide: "https://bit.ly/IELSCurriculumGuide", // replace
  teacherGuide: "https://bit.ly/IELSTeacherTraining", // replace
  loungeGuide: "https://bit.ly/IELSLoungeGuide", // replace
  dashboardPreview: "https://bit.ly/IELSDashboardPreview", // replace
  caseStudies: "https://bit.ly/IELSCaseStudies", // replace
};

/* Contact (Principal) */
const PRINCIPAL = {
  name: "Arbadza Rido Adzariyat",
  email: "arbadza@ielsco.com",
  phone: "+62 882-9725-3491",
};

type InquiryFormState = {
  institution: string;
  contactName: string;
  position: string;
  email: string;
  phone: string;
  students?: string;
  startDate?: string;
  interest: string;
  message?: string;
};

export default function SchoolsPage() {
  

  const [form, setForm] = useState<InquiryFormState>({
    institution: "",
    contactName: "",
    position: "",
    email: "",
    phone: "",
    students: "",
    startDate: "",
    interest: "Pilot Program",
    message: "",
  });

  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    k: keyof InquiryFormState,
    v: string | undefined
  ) => {
    setForm((p) => ({ ...p, [k]: v ?? "" }));
  };

  const validateRequired = () => {
    if (!form.institution.trim()) return "Please enter your institution name.";
    if (!form.contactName.trim()) return "Please enter contact name.";
    if (!form.position.trim()) return "Please enter contact position.";
    if (!form.email.trim()) return "Please enter contact email.";
    if (!form.phone.trim()) return "Please enter contact phone/WhatsApp.";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const missing = validateRequired();
    if (missing) {
      setStatus({ ok: false, msg: missing });
      return;
    }

    // Placeholder submit — replace with API / Supabase / Google Form integration
    setIsSubmitting(true);
    try {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 900));

      // TODO: Replace with actual POST to API or Supabase
      // await fetch("/api/schools/inquiry", { method: "POST", body: JSON.stringify(form) });

      setStatus({
        ok: true,
        msg:
          "Thank you! Your inquiry has been received. Our team will contact you within 24 hours.",
      });

      // optionally reset form or keep it
      // setForm({ institution: "", contactName: "", position: "", email: "", phone: "", students: "", startDate: "", interest: "Pilot Program", message: "" });
    } catch (err) {
      setStatus({
        ok: false,
        msg: "Network error. Please try again or contact Arba directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#294154] font-inter">
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">

        {/* HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text */}
          <div className="lg:col-span-7 order-2 space-y-6">
            <p className="text-sm font-semibold text-[#E56668]">For Schools & Universities</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Bring Global English Opportunities to Your School
            </h1>
            <p className="text-gray-700 max-w-2xl text-base">
              IELS for Schools empowers teachers and students with structured English
              programs, measurable outcomes, and mentorship from global educators.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]"
              >
                Request a Pilot Program
              </a>

              <a
                href={LINKS.programOverview}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#294154] text-white font-semibold hover:bg-[#21363f] transition transform hover:scale-[1.02]"
              >
                View Program Overview
              </a>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              Designed for high schools and universities across Indonesia.
            </p>
          </div>

          {/* Visual: Mascot */}
          <div className="lg:col-span-5 order-1 flex justify-center lg:justify-end">
            <div className="w-[320px] sm:w-[420px] lg:w-[520px]">
              <Image
                src="/images/contents/general/ielsschool.svg"
                alt="IELS mascot in classroom"
                width={900}
                height={900}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </section>

        {/* WHY SCHOOLS */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Why Schools Partner with IELS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Curriculum that Delivers Results",
                desc:
                  "Designed around CEFR and IELTS frameworks with measurable student progress.",
                icon: "📘",
              },
              {
                title: "Empowered Teachers",
                desc:
                  "Workshops, co-teaching models, and complete lesson kits to support your staff.",
                icon: "👩‍🏫",
              },
              {
                title: "Smart Progress Tracking",
                desc:
                  "School dashboards, student reports, and class performance insights.",
                icon: "📊",
              },
              {
                title: "Global Pathways",
                desc:
                  "Support for scholarships, exchange programs, and international admissions.",
                icon: "🌏",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-2xl p-6 border border-[#294154]/8 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="text-2xl mb-3">{c.icon}</div>
                <h3 className="font-semibold mb-1">{c.title}</h3>
                <p className="text-sm text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROGRAM HIGHLIGHTS */}
        <section>
          <h2 className="text-2xl font-bold mb-6">What’s Inside the Program</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Placement & Diagnostic Tests",
                desc:
                  "Identify student levels and create learning paths instantly.",
                link: LINKS.programOverview,
              },
              {
                title: "English Curriculum Packages",
                desc:
                  "12-week modular courses for academic and occupational English.",
                link: LINKS.curriculumGuide,
              },
              {
                title: "Teacher Training & Mentorship",
                desc:
                  "Support your teachers with lesson plans, coaching, and workshops.",
                link: LINKS.teacherGuide,
              },
              {
                title: "IELS Lounge for Students",
                desc:
                  "Access community events, speaking clubs, and micro-lessons.",
                link: LINKS.loungeGuide,
              },
              {
                title: "Reporting & Assessment Dashboard",
                desc:
                  "Real-time insights and exportable student progress reports.",
                link: LINKS.dashboardPreview,
              },
            ].map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-2xl p-6 border border-[#294154]/8 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <h4 className="font-semibold mb-2">{p.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{p.desc}</p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-sm font-semibold text-[#294154] hover:underline"
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* PILOT PROGRAM */}
        <section>
          <div className="bg-[#fffaf0] rounded-2xl p-8 border border-[#294154]/6">
            <div className="lg:flex lg:items-center lg:justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Start with a Pilot Program</h3>
                <p className="text-gray-700 mb-4">
                  Try IELS for Schools in your classroom for 8 weeks — including placement tests,
                  teacher training, and progress reports. See real results before full rollout.
                </p>

                <p className="text-sm text-gray-600 italic mb-3">
                  *Ideal for up to 50 students. Custom cohorts available for schools and universities.
                </p>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]"
                >
                  Join the Pilot →
                </a>
              </div>

              {/* 3-step timeline */}
              <div className="mt-6 lg:mt-0 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { step: "1", title: "Onboard Teachers" },
                  { step: "2", title: "Run 8-week Module" },
                  { step: "3", title: "Review & Expand" },
                ].map((t) => (
                  <div key={t.step} className="bg-white rounded-xl p-4 text-center border border-[#294154]/8">
                    <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#294154] text-white flex items-center justify-center font-semibold">{t.step}</div>
                    <div className="font-semibold">{t.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROVEN IMPACT */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Proven Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { big: "+42%", text: "avg improvement in English confidence (8 weeks)" },
              { big: "+31%", text: "increase in reading & writing accuracy" },
              { big: "95%", text: "teacher satisfaction from workshops" },
              { big: "4.8★", text: "student rating (feedback survey)" },
            ].map((m) => (
              <div key={m.big} className="bg-white rounded-2xl p-6 border border-[#294154]/8 text-center hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="text-3xl font-extrabold text-[#294154] mb-2">{m.big}</div>
                <div className="text-sm text-gray-600">{m.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section>
          <h2 className="text-2xl font-bold mb-6">What Our Partners Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote:
                  "After joining IELS for Schools, our students became more confident in speaking and writing. The mentor feedback made a big difference.",
                by: "English Department Head, SMA Labschool Jakarta",
              },
              {
                quote:
                  "The teacher training was practical and classroom-ready. We saw immediate improvements in student engagement.",
                by: "Principal, SMAN 2 Bandung",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#294154]/8">
                <p className="italic text-gray-700 mb-3">“{t.quote}”</p>
                <p className="text-sm font-semibold text-[#294154]">— {t.by}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <a href={LINKS.caseStudies} target="_blank" rel="noreferrer" className="text-[#294154] font-semibold hover:underline">
              View Pilot Case Studies →
            </a>
          </div>
        </section>

        {/* CONTACT & PARTNERSHIP FORM */}
        <section id="contact">
          <div className="bg-gradient-to-br from-white via-[#fffaf0] to-[#eaf2ff] rounded-2xl p-8 border border-[#294154]/8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Contact Info */}
              <div>
                <h2 className="text-2xl font-bold mb-2">Let’s Build Global Opportunities Together.</h2>
                <p className="text-gray-700 mb-4">
                  We’d love to discuss how IELS can support your English programs. Reach out to our Principal
                  directly or fill out the form and we’ll get back within 24 hours.
                </p>

                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <div className="font-semibold">Principal</div>
                    <div>{PRINCIPAL.name}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div>
                      <a href={`mailto:${PRINCIPAL.email}`} className="text-[#294154] hover:underline">
                        {PRINCIPAL.email}
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">WhatsApp</div>
                    <div>
                      <a href={`tel:${PRINCIPAL.phone}`} className="text-[#294154] hover:underline">
                        {PRINCIPAL.phone}
                      </a>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    For immediate partnership discussions, email or WhatsApp Arba directly.
                  </p>
                </div>
              </div>

              {/* Right: Form */}
              <div>
                <form onSubmit={onSubmit} className="space-y-3 bg-white p-4 rounded-xl border border-[#294154]/8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      placeholder="School / Institution name *"
                      value={form.institution}
                      onChange={(e) => handleChange("institution", e.target.value)}
                      className="w-full border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#E56668]"
                    />
                    <input
                      placeholder="Contact person & position *"
                      value={form.contactName}
                      onChange={(e) => handleChange("contactName", e.target.value)}
                      className="w-full border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#E56668]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      placeholder="Email *"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#E56668]"
                    />
                    <input
                      placeholder="WhatsApp / Phone *"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="w-full border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#E56668]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      placeholder="Number of students (optional)"
                      value={form.students}
                      onChange={(e) => handleChange("students", e.target.value)}
                      className="w-full border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#E56668]"
                    />
                    <input
                      placeholder="Preferred start date (optional)"
                      type="date"
                      value={form.startDate}
                      onChange={(e) => handleChange("startDate", e.target.value)}
                      className="w-full border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#E56668]"
                    />
                  </div>

                  <div>
                    <select
                      value={form.interest}
                      onChange={(e) => handleChange("interest", e.target.value)}
                      className="w-full border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#E56668]"
                    >
                      <option>Pilot Program</option>
                      <option>Annual Partnership</option>
                      <option>Teacher Training</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      placeholder="Message (optional)"
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#E56668]"
                      rows={4}
                    />
                  </div>

                  {status && (
                    <div className={`text-sm text-center ${status.ok ? "text-green-600" : "text-red-600"}`}>
                      {status.msg}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-full bg-[#E56668] text-white font-semibold px-5 py-2 hover:bg-[#C04C4E] transition transform hover:scale-[1.02] disabled:opacity-60"
                    >
                      {isSubmitting ? "Sending..." : "Send Inquiry →"}
                    </button>
                  </div>
                  
              </form>
              </div>
              </div>
               </div>
          </section>

          <div className="max-w-5xl mx-auto">
            <div className="border-t border-gray-100 pt-6">
                For media, sponsorships, or collaborations, please visit our{" "}
                <Link href="/partnerships" className="text-[#294154] hover:underline">
                  Partnerships Page
                </Link>
              </div>
            </div>
          </div>
      
    </main>
  );
}