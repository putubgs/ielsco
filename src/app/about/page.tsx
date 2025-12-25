"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import { useState } from "react";
import { Instagram, Linkedin } from "lucide-react";

type ActiveSection = "vision" | "curriculum" | "impact" | "team";

export default function About() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("vision");
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const principals = [
  {
    name: "Arbadza Rido Adzariyat",
    role: "Principal of Operations & Business",
    image: "/images/contents/about/arba.png",
    instagram: "https://instagram.com/arbadzarido",
    linkedin: "https://linkedin.com/in/arbadzarido",
  },
  {
    name: "Fadhila Qurotul Aini",
    role: "Principal of Growth & Finance",
    image: "/images/contents/about/dhila.png",
    instagram: "https://www.instagram.com/fadhilaqa._/",
    linkedin: "https://linkedin.com/in/fadhilaqa/",
  },
  {
    name: "Syifa Hana Nabila",
    role: "Principal of Talent",
    image: "/images/contents/about/hana.png",
    instagram: "https://www.instagram.com/ssyifahana/",
    linkedin: "https://www.linkedin.com/in/syifahana/",
  },
];
  const handleSectionChange = (newSection: ActiveSection) => {
    if (newSection === activeSection) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

    if (isMobile) {
      if (isAnimating) return;

      const sections: ActiveSection[] = ["vision", "curriculum", "impact", "team"];
      const currentIndex = sections.indexOf(activeSection);
      const newIndex = sections.indexOf(newSection);

      if (newIndex > currentIndex) {
        setSlideDirection("left");
      } else {
        setSlideDirection("right");
      }

      setIsAnimating(true);
      setIsButtonAnimating(true);
      setActiveSection(newSection);

      setTimeout(() => {
        setIsAnimating(false);
        setIsButtonAnimating(false);
      }, 300);
    } else {
      setActiveSection(newSection);
    }
  };

  const getActiveIndex = () => {
    const sections: ActiveSection[] = ["vision", "curriculum", "impact", "team"];
    return sections.indexOf(activeSection);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe || isRightSwipe) {
      const sections: ActiveSection[] = ["vision", "curriculum", "impact", "team"];
      const currentIndex = sections.indexOf(activeSection);

      if (isLeftSwipe && currentIndex < sections.length - 1) {
        handleSectionChange(sections[currentIndex + 1]);
      } else if (isRightSwipe && currentIndex > 0) {
        handleSectionChange(sections[currentIndex - 1]);
      }
    }
  };

  const getContent = () => {
    switch (activeSection) {
      case "vision":
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              <div className="flex-1">
                <h3 className="font-bold text-[20px] sm:text-[22px] lg:text-[24px] mb-3">
                  Our Vision
                </h3>
                <p className="text-[14px] sm:text-[15px] text-justify leading-relaxed">
                  To become a goal-driven English learning ecosystem that enables learners 
                  across Indonesia to clearly track, achieve, and sustain real-world outcomes—ranging 
                  from English proficiency and academic success to global opportunities such 
                  as exchanges, scholarships, internships, and remote work—regardless of 
                  their background or location.
                </p>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[20px] sm:text-[22px] lg:text-[24px] mb-3">
                  Our Mission
                </h3>
                <p className="text-[14px] sm:text-[15px] text-justify mb-4 leading-relaxed">
                  IELS is committed to making English learning practical, measurable, and accessible by:
                </p>
                <ol className="text-[14px] sm:text-[15px] space-y-2 list-decimal list-inside leading-relaxed">
                  <li>Building an active and supportive learning community that encourages consistency, accountability, and peer growth.</li>
                  <li>Guiding learners through structured and personalized learning journeys aligned with their individual goals.</li>
                  <li>
                    Providing clear progress tracking, feedback, and recommendations to help learners move from learning to real outcomes.
                  </li>
                  <li>
                    Expanding access to global exposure and opportunities while reducing educational and socio-economic barriers through affordable and scalable programs.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        );
      case "curriculum":
        return (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="font-bold text-[20px] sm:text-[22px] lg:text-[24px]">
              Our Outcome-Driven Learning Tracks
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-[14px] sm:text-[15px] text-justify leading-relaxed">
                IELS designs its learning programs around real goals, not generic English proficiency. Our approach focuses on helping learners use English for specific outcomes—such as academic success, professional growth, and global participation—by aligning language development with what learners actually need to achieve.
</p><p className="text-[14px] sm:text-[15px] text-justify leading-relaxed">
Instead of separating English into isolated skills, IELS integrates learning with clear objectives, progress tracking, and real-world application, ensuring that learners understand why they are learning and how each step moves them closer to their target.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[16px] sm:text-[17px] lg:text-[18px] mb-3">
                    IELS Learning Tracks
                  </h3>
                  <ul className="text-[14px] sm:text-[15px] space-y-2 list-disc list-inside leading-relaxed">
                    <li>
                      <strong>Academic Track</strong>{" "}
                      This track focuses on academic communication, test readiness (IELTS/TOEFL), research and writing skills, and the confidence needed to perform in global academic environments.
                    </li>
                    <li>
                      <strong>Professional & Global Track</strong>{" "}
                      This track emphasizes practical workplace communication, interviews, professional writing, digital collaboration, networking, and cross-cultural communication—especially for remote and global contexts.
                    </li>
                    <p className="text-[14px] sm:text-[15px] text-justify leading-relaxed">
                      Across all tracks, learners are guided through structured journeys with milestones, feedback, and measurable progress—so learning English is not just about improvement, but about reaching a clear outcome.
                    </p>
                  </ul>
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>
        );
      case "impact":
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              <div className="flex-1 space-y-4 sm:space-y-6">
                <div>
                  <h3 className="font-bold text-[20px] sm:text-[22px] lg:text-[24px] mb-3">
                    What We Value
                  </h3>
                  <p className="text-[14px] sm:text-[15px] mb-3 leading-relaxed">
                    We are guided by values that shape how we design learning, build systems, and grow our community:
                  </p>
                  <ul className="text-[14px] sm:text-[15px] space-y-2 list-disc list-inside leading-relaxed">
                    <li>
                      <strong>Accessibility with Purpose</strong> 
                     <p>We believe quality English education should be reachable for learners across Indonesia. IELS is committed to keeping learning affordable and flexible—while still providing clear structure, direction, and measurable progress.
                   </p> </li>
                    <li>
                      <strong>Outcome-Driven Learning</strong> 
                      <p>We focus on results, not just participation. Every program, activity, and product is designed to help learners move closer to a specific goal through structured journeys, progress tracking, and real-world application.
                    </p></li>
                    <li>
                      <strong>Community as a System</strong> 
                      <p>IELS believes growth happens faster and more sustainably in community. We cultivate an active learning environment where learners stay consistent, support each other, and evolve into contributors who create impact beyond themselves.
                   </p> </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[20px] sm:text-[22px] lg:text-[24px] mb-3">
                    Who We Serve
                  </h3>
                  <p className="text-[14px] sm:text-[15px] mb-3 leading-relaxed">
                    IELS is built for individuals and institutions that value progress, clarity, and long-term impact.
                  </p>
                  <ul className="text-[14px] sm:text-[15px] space-y-2 list-disc list-inside leading-relaxed">
                    <li>
                      Indonesian students and young professionals who want to
                      improve their English skills for study abroad, job
                      readiness, and career advancement.
                    </li>
                    <li>
                      Educational institutions and schools seeking
                      comprehensive, scalable English programs that align with
                      their academic and international goals.
                    </li>
                    <li>
                      Organizations and partners looking for a meaningful way to
                      invest in future-ready talent and connect with engaged
                      youth communities.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[20px] sm:text-[22px] lg:text-[24px] mb-3">
                  Our Value Proposition
                </h3>
                <p className="text-[14px] sm:text-[15px] mb-4 leading-relaxed">
                  IELS delivers value by turning English learning into a <strong>clear, trackable, and outcome-oriented journey.</strong>
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[15px] sm:text-[16px] mb-2">
                      For Students:
                    </h4>
                    <ul className="text-[14px] sm:text-[15px] space-y-2 list-disc list-inside leading-relaxed">
                      <li>
                        An affordable, accessible, and engaging English learning
                        experience that goes beyond the classroom.
                      </li>
                      <li>
                        Opportunities to practice real-life English and connect
                        with global learning and career opportunities.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[15px] sm:text-[16px] mb-2">
                      For Institutions:
                    </h4>
                    <ul className="text-[14px] sm:text-[15px] space-y-2 list-disc list-inside leading-relaxed">
                      <li>
                        Scalable and effective English programs that require
                        minimal operational setup.
                      </li>
                      <li>
                        A curriculum aligned with scholarship criteria and job
                        readiness for student success.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[15px] sm:text-[16px] mb-2">
                      For Partners:
                    </h4>
                    <ul className="text-[14px] sm:text-[15px] space-y-2 list-disc list-inside leading-relaxed">
                      <li>
                        Access to a pipeline of high-potential, upskilled
                        students across Indonesia.
                      </li>
                      <li>
                        Strategic brand visibility and community engagement
                        through meaningful partnerships in education and youth
                        empowerment.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
case "team":
  return (
<div className="space-y-10 sm:space-y-12">
  <h2 className="font-bold text-2xl sm:text-3xl text-center">
    Organizational Team
  </h2>

  <p className="text-[15px] sm:text-base text-gray-600 text-center max-w-3xl mx-auto leading-relaxed">
    Behind every initiative of IELS is a strong and passionate team.
    Together, we are committed to building a platform that connects
    Indonesian students with global opportunities.
  </p>

  <h3 className="font-semibold text-xl sm:text-2xl text-center mt-10">
    Principals
  </h3>

  <div className="flex justify-center">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
      {principals.map((p) => (
        <div
          key={p.name}
          className="
            group bg-[#F8F8F8] rounded-2xl p-6
            flex flex-col items-center text-center
            shadow-sm transition-all duration-300
            hover:-translate-y-1 hover:shadow-lg
          "
        >
          {/* Avatar */}
          <img
            src={p.image}
            alt={p.name}
            className="
              w-36 h-36 rounded-full object-cover mb-4
              transition-transform duration-300
              group-hover:scale-105
            "
          />

          {/* Name */}
          <h4 className="font-bold text-lg sm:text-xl text-[#2F4157]">
            {p.name}
          </h4>

          {/* Role */}
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            {p.role}
          </p>

          {/* Socials */}
          <div className="flex gap-4">
            <a
              href={p.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="
                p-2 rounded-full bg-white
                text-gray-500 hover:text-[#E56668]
                hover:shadow transition
              "
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>

            <a
              href={p.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="
                p-2 rounded-full bg-white
                text-gray-500 hover:text-[#0A66C2]
                hover:shadow transition
              "
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <div className="px-4 sm:px-8 md:px-[75px] gap-4 sm:gap-6 flex flex-col pb-8 sm:pb-12">
        <div className="bg-white flex flex-col lg:flex-row w-full rounded-[20px] sm:rounded-[30px] p-6 sm:p-8 lg:p-12 lg:px-[50px] items-center gap-6 sm:gap-8 lg:gap-12">
          <div className="flex flex-col w-full items-center">
            <Image
              src="/images/logos/iels_blue.png"
              width={408}
              height={408}
              alt="IELS Logo Blue"
              className="max-w-[200px] sm:max-w-[250px] lg:max-w-[308px] w-full h-auto"
            />
            <div className="flex items-center gap-3 sm:gap-5">
              <Image
                src="/images/contents/general/greeting.png"
                width={200}
                height={200}
                alt="Greeting"
                className="w-[120px] h-auto sm:w-[150px] lg:w-[200px]"
              />
              <div className="flex flex-col text-[#2F4157] text-[18px] sm:text-[20px] lg:text-[24px] font-bold">
                <p>Inclusive English</p>
                <p className="-mt-1">Learning Space</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full text-[#2F4157] gap-4 sm:gap-6">
            <h1 className="font-bold text-[20px] sm:text-[22px] lg:text-[24px] text-center lg:text-left">
              About IELS
            </h1>
            <p className="text-[14px] sm:text-[15px] text-justify">
              IELS (Inclusive English Learning Space) is a goal-driven English learning 
              community designed to help Indonesian students and young professionals 
              achieve real, measurable outcomes. IELS supports learners in setting 
              clear English-related goals—such as improving fluency, achieving test 
              scores, joining exchange programs, or accessing global opportunities—then 
              guides them through structured learning journeys with progress tracking, 
              mentorship, and community support.
            </p>
            <p className="text-[14px] sm:text-[15px] text-justify">
              Rather than focusing only on lessons or certificates, IELS focuses 
              on progress and outcomes. Through affordable programs, daily community 
              engagement, and access to real opportunities, IELS helps learners stay 
              consistent, understand where they are in their journey, and know what 
              steps to take next. By combining learning, tracking, and empowerment 
              in one ecosystem, IELS aims to make quality English education and 
              global exposure more accessible to learners across Indonesia.
            </p>
          </div>
        </div>
        <div className="w-full">
          <div className="block sm:hidden">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-1 relative">
              {/* Animated Background */}
<div className="relative">
  <div
    className={`absolute top-1 bottom-1 bg-[#E56668] rounded-xl shadow-lg transition-transform duration-300 ease-in-out ${
      isButtonAnimating ? "opacity-80" : "opacity-100"
    }`}
    style={{
      width: "25%", // 4 buttons = 25% each
      transform: `translateX(${getActiveIndex() * 100}%)`,
    }}
  />

  {/* Navigation Buttons */}
  <div className="grid grid-cols-4 gap-1 relative z-10">
    <button
      onClick={() => handleSectionChange("vision")}
      className={`py-3 px-2 rounded-xl text-[14px] font-medium transition-colors duration-300 ${
        activeSection === "vision"
          ? "text-white"
          : "text-white/80 hover:text-white hover:bg-white/20"
      }`}
    >
                  Vision & Mission
                </button>
                <button
                  onClick={() => handleSectionChange("curriculum")}
                  className={`py-3 px-2 rounded-xl text-[14px] font-medium transition-colors duration-300 ${
                    activeSection === "curriculum"
                      ? "text-white"
                      : "text-white/80 hover:text-white hover:bg-white/20"
                  }`}
                >
                  Curriculum
                </button>
                <button
                  onClick={() => handleSectionChange("impact")}
                  className={`py-3 px-2 rounded-xl text-[14px] font-medium transition-colors duration-300 ${
                    activeSection === "impact"
                      ? "text-white"
                      : "text-white/80 hover:text-white hover:bg-white/20"
                  }`}
                >
                  Impact & Value
                </button>
               <button
                 onClick={() => handleSectionChange("team")}
                 className={`py-3 px-2 rounded-xl text-[14px] font-medium transition-colors duration-300 ${
                   activeSection === "team"
                     ? "text-white"
                     : "text-white/80 hover:text-white hover:bg-white/20"
                  }`}
                >
                  Team
                </button>
              </div>
            </div>
            </div>

            {/* Swipe Hint */}
            <div className="text-center mt-3 text-white/60 text-sm">
              💡 Swipe content left/right to navigate
              </div>
            </div>

          <div className="hidden sm:flex gap-5 justify-center md:justify-start">
            <button
              onClick={() => handleSectionChange("vision")}
              className={`rounded-full px-7 py-2 text-[20px] cursor-pointer transition-all duration-200 font-medium ${
                activeSection === "vision"
                  ? "bg-[#E56668] text-white shadow-lg"
                  : "border-2 border-white text-white hover:bg-white hover:text-[#2F4157] hover:shadow-md"
              }`}
            >
              Vision & Mission
            </button>
            <button
              onClick={() => handleSectionChange("curriculum")}
              className={`rounded-full px-7 py-2 text-[20px] cursor-pointer transition-all duration-200 font-medium ${
                activeSection === "curriculum"
                  ? "bg-[#E56668] text-white shadow-lg"
                  : "border-2 border-white text-white hover:bg-white hover:text-[#2F4157] hover:shadow-md"
              }`}
            >
              Curriculum
            </button>
            <button
              onClick={() => handleSectionChange("impact")}
              className={`rounded-full px-7 py-2 text-[20px] cursor-pointer transition-all duration-200 font-medium ${
                activeSection === "impact"
                  ? "bg-[#E56668] text-white shadow-lg"
                  : "border-2 border-white text-white hover:bg-white hover:text-[#2F4157] hover:shadow-md"
              }`}
            >
              Impact & Value
            </button>
            <button
              onClick={() => handleSectionChange("team")}
              className={`rounded-full px-7 py-2 text-[20px] cursor-pointer transition-all duration-200 font-medium ${
                activeSection === "team"
                  ? "bg-[#E56668] text-white shadow-lg"
                  : "border-2 border-white text-white hover:bg-white hover:text-[#2F4157] hover:shadow-md"
              }`}
            >
              Team
            </button>
          </div>
        </div>
        <div className="bg-white w-full rounded-[20px] sm:rounded-[30px] p-6 sm:p-8 lg:p-12 lg:px-[50px] text-[#2F4157] shadow-lg overflow-hidden">
          <div
            className={`sm:transition-none transition-transform duration-300 ease-in-out ${
              isAnimating
                ? slideDirection === "left"
                  ? "translate-x-full opacity-0 sm:translate-x-0 sm:opacity-100"
                  : "-translate-x-full opacity-0 sm:translate-x-0 sm:opacity-100"
                : "translate-x-0 opacity-100"
            }`}

            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            >
            {getContent()}
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
}
