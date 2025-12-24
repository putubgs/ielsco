"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-[#ffffff] text-[#294154] font-geologica">
       <Header />
       <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
      {/* ===== HERO SECTION ===== */}
      <section className="bg-white text-[#294154] font-geologica">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Partner with IELS — Empower English Education Across Indonesia
            </h1>
            <p className="text-[#294154]-90 max-w-2xl text-lg">
              Join our mission to bridge equal access to quality English education.
              Together, we create real impact — from schools to global communities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]"><Link
                href="mailto:partnership@ielsco.com"
               >
                🤝 Let&apos;s Collaborate
              </Link></Button>

                <Button asChild className="bg-[#294154] text-white font-semibold px-6 py-3 hover:bg-[#21363f]">
                  <Link
                href="/docs/IELS_Partnership_Deck.pdf"
                target="_blank"
                rel="noopener noreferrer"
                
              >
                📄 View Partnership Deck
              </Link></Button>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 flex justify-center lg:justify-end">
            <div className="w-[320px] sm:w-[420px] lg:w-[520px]">
              <Image
                src="/images/contents/general/ielspartner.svg"
                alt="IELS mascot handshake"
                width={400}
                height={400}
                className="w-full h-auto object-contain"
              />
              <div className="absolute -bottom-4 right-0 bg-white text-[#294154] px-4 py-2 rounded-full text-sm font-semibold shadow">
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PARTNERSHIP CATEGORIES ===== */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-3">Partnership Opportunities</h2>
        <p className="text-gray-700 mb-12">
          We collaborate with organizations that share our vision for accessible, high-quality English education.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <PartnerCard
            emoji="🎓"
            title="Schools & Universities"
            desc="Integrate IELS programs into your curriculum and empower students to reach global standards."
            link="/schools"
          />
          <PartnerCard
            emoji="💼"
            title="Corporate Partners"
            desc="Equip your employees and interns with world-class English skills through tailored programs."
          />
          <PartnerCard
            emoji="🌍"
            title="Global Institutions & NGOs"
            desc="Join forces with IELS to build international exposure programs, mentorships, and scholarships."
          />
          <PartnerCard
            emoji="📢"
            title="Sponsors & Media Partners"
            desc="Support IELS projects and events — gain visibility while empowering young learners."
          />
        </div>
      </section>

 {/* ===== PARTNER BENEFITS (Enhanced) ===== */}
<section className="relative bg-[#fdfdfd] py-16 sm:py-20 px-6 overflow-hidden">
  {/* Subtle top accent line */}
  <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-[#294154] to-[#E56668]" />

  <div className="max-w-6xl mx-auto text-center relative z-10">
    <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-[#294154] leading-tight">
      Why Partner with IELS?
    </h2>

    <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
      Because we don’t just teach English — we build futures.  
      Together with our partners, we’re unlocking access, opportunities, and impact across Indonesia.
    </p>

    {/* Benefit Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
      {[
        {
          emoji: "🇮🇩",
          title: "Nationwide Reach",
          desc: "Connect with 10,000+ learners and schools across Indonesia through IELS programs and activations.",
        },
        {
          emoji: "🚀",
          title: "High-Impact Programs",
          desc: "Co-create English initiatives that drive measurable change — from language upskilling to career readiness.",
        },
        {
          emoji: "🤝",
          title: "Strong Brand Network",
          desc: "Join a trusted ecosystem of schools, corporations, and NGOs committed to equal education access.",
        },
        {
          emoji: "📊",
          title: "Data-Driven Results",
          desc: "Receive transparent reports, growth metrics, and real stories of learners impacted through your partnership.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="group relative bg-white rounded-2xl p-6 shadow-sm border border-[#294154]/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* Accent overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#E56668]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="text-4xl mb-3">{item.emoji}</div>
            <h4 className="font-bold text-lg text-[#294154] mb-2">{item.title}</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Impact Summary */}
    <div className="mt-14 sm:mt-16 space-y-2">
      <p className="text-base text-gray-700 font-medium">
        💡 Every partnership fuels our mission to make English learning accessible for every student — from cities to villages.
      </p>
      <p className="text-sm text-gray-600">
        Backed by measurable outcomes, community growth, and nationwide engagement.
      </p>
    </div>

    {/* CTA Button */}
    <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E] mt-6">
      
    <Link
      href="https://bit.ly/IELSImpact2025"
      target="_blank"
      rel="noopener noreferrer"
  
    >
      📈 View IELS Impact Report
    </Link>
    </Button>
  </div>

  {/* Decorative elements */}
  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#294154]/10 rounded-full blur-2xl" />
  <div className="absolute -top-16 -right-10 w-52 h-52 bg-[#E56668]/10 rounded-full blur-3xl" />
</section>
</div>

      {/* ===== PREVIOUS PARTNERS ===== */}
      <section className="relative bg-[#294154] flex flex-col gap-3">
        <div className="text-[20px] lg:text-[32px] text-start text-white px-4 lg:px-[28vw] pt-[30px] leading-tight">
          <p className="font-bold block lg:hidden">Global & National Company Partners</p>
          <p className="font-bold hidden lg:block">Global & National</p>
          <p className="hidden lg:block">Company Partners</p>
        </div>

        {/* Decoration Images */}
        <div className="hidden lg:block">
          <Image
            src="/images/contents/general/bookmark_icon.png"
            alt="Bookmark"
            width={80}
            height={80}
            className="absolute top-10 left-10 opacity-30"
          />
        </div>

        {/* Company Logos */}
        <div className="flex flex-col lg:flex-row w-full gap-6">
          <div className="hidden lg:flex bg-white rounded-r-[20px] flex-col gap-4 py-8 pr-8 w-[20%]">
            {[...Array(8)].map((_, i) => (
              <hr key={i} className="h-px bg-black border-0" />
            ))}
          </div>

          <div className="w-full lg:w-[60%] bg-white rounded-[20px] flex items-center justify-center lg:p-0 min-h-[100px]">
            <Image
              src="/images/logos/media-partners/media_partners.png"
              alt="Media Partners"
              width={1000}
              height={0}
              className="w-full px-4 lg:px-[100px] py-6"
            />
          </div>

          <div className="hidden lg:flex bg-white rounded-l-[20px] flex-col gap-4 py-8 pl-8 w-[20%]">
            {[...Array(8)].map((_, i) => (
              <hr key={i} className="h-px bg-black border-0" />
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full gap-6">
          <div className="hidden lg:block bg-white rounded-r-[20px] w-[20%]"></div>
          <div className="w-full lg:w-[60%] bg-white rounded-[20px] flex items-center justify-center p-4 lg:p-0 min-h-[100px]">
            <Image
              src="/images/logos/company/company_logos.png"
              alt="Company Partners"
              width={1000}
              height={80}
              className="w-full object-contain md:p-12"
            />
          </div>
          <div className="hidden lg:flex bg-white rounded-l-[20px] flex-col gap-4 py-8 pl-8 w-[20%]">
            {[...Array(8)].map((_, i) => (
              <hr key={i} className="h-px bg-black border-0" />
            ))}
          </div>
        </div>

        <div className="text-[20px] lg:text-[32px] text-end text-white px-4 lg:px-[28vw] pb-[30px] leading-tight">
          <p className="font-bold block lg:hidden">Media Partners</p>
          <p className="font-bold hidden lg:block">Media</p>
          <p className="hidden lg:block">Partners</p>
        </div>
      </section>

 {/* ===== CONTACT SECTION (Improved) ===== */}
<section className="bg-white text-[#294154] py-20 px-6 text-center border-t border-[#294154]/10">
  <div className="max-w-4xl mx-auto space-y-8">

    {/* Headline */}
    <div>
      <h2 className="text-4xl font-extrabold mb-3">Let’s Build Impact — Together 🤝</h2>
      <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed">
        Partnering with IELS is simple, flexible, and built for real outcomes.  
        Whether you represent a <strong>school, university, company, or NGO</strong>, we’ll help you empower learners and amplify your social impact.
      </p>
    </div>

    {/* Steps / Flow */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left text-gray-700">
      <div className="bg-[#f9fafb] rounded-xl p-6 border border-[#294154]/10">
        <div className="text-3xl mb-2">📩</div>
        <h4 className="font-semibold text-lg mb-1">1. Reach Out</h4>
        <p className="text-sm">Send us an email or WhatsApp message about your organization and goals.</p>
      </div>

      <div className="bg-[#f9fafb] rounded-xl p-6 border border-[#294154]/10">
        <div className="text-3xl mb-2">💡</div>
        <h4 className="font-semibold text-lg mb-1">2. Co-Design the Program</h4>
        <p className="text-sm">We’ll collaborate to tailor a partnership or pilot that fits your needs.</p>
      </div>

      <div className="bg-[#f9fafb] rounded-xl p-6 border border-[#294154]/10">
        <div className="text-3xl mb-2">🚀</div>
        <h4 className="font-semibold text-lg mb-1">3. Launch & Grow Together</h4>
        <p className="text-sm">Execute the project, monitor the impact, and share success stories together.</p>
      </div>
    </div>

    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]">
            <Link
        href="https://wa.me/6288297253491"
        target="_blank"
        rel="noopener noreferrer"
        
      >
        💬 Chat on WhatsApp
      </Link></Button>

      <Button asChild className="bg-[#294154] text-white font-semibold px-6 py-3 hover:bg-[#21363f]">
                  
        <Link
        href="mailto:partnership@ielsco.com"
      >
        ✉ Send Email
      </Link></Button>
    </div>

    {/* Info */}
    <div className="text-sm text-gray-600 mt-6 space-y-1">
      <p>📱 WhatsApp: 0882-9725-3491 · 📧 partnership@ielsco.com</p>
    </div>
  </div>
</section>
      <Footer />
    </main>
  );
}

/* Subcomponents */
function PartnerCard({ emoji, title, desc, link }: { emoji: string; title: string; desc: string; link?: string }) {
  const content = (
    <div className="bg-white p-6 rounded-2xl border border-[#294154]/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="text-4xl mb-2">{emoji}</div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-700">{desc}</p>
    </div>
  );
  return link ? <Link href={link}>{content}</Link> : content;
}

function BenefitCard({ emoji, title, desc }: { emoji: string; title: string; desc: string }) {
  return (
    <div className="bg-[#fdfdfd] p-6 rounded-2xl border border-[#294154]/10 shadow-sm hover:shadow-md transition-all">
      <div className="text-3xl mb-2">{emoji}</div>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-sm text-gray-700 mt-1">{desc}</p>
    </div>
  );
}