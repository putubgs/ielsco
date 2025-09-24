"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import { useState } from "react";

type ActiveSection = "vision" | "curriculum" | "impact";

export default function About() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("vision");
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleSectionChange = (newSection: ActiveSection) => {
    if (newSection === activeSection) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

    if (isMobile) {
      if (isAnimating) return;

      const sections: ActiveSection[] = ["vision", "curriculum", "impact"];
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
    const sections: ActiveSection[] = ["vision", "curriculum", "impact"];
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
      const sections: ActiveSection[] = ["vision", "curriculum", "impact"];
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
                  To provide high-quality global English education across
                  Indonesia, preparing students to meet international academic
                  standards and access real-world opportunities including
                  scholarships, remote jobs, global internships, and
                  entrepreneurial ventures. We aim to democratize access to
                  English learning to empower Indonesians to compete globally.
                </p>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[20px] sm:text-[22px] lg:text-[24px] mb-3">
                  Our Mission
                </h3>
                <p className="text-[14px] sm:text-[15px] text-justify mb-4 leading-relaxed">
                  IELS is dedicated to making English education practical,
                  inclusive, and future-ready. Our mission is built on four key
                  pillars:
                </p>
                <ol className="text-[14px] sm:text-[15px] space-y-2 list-decimal list-inside leading-relaxed">
                  <li>Fostering a supportive learning community.</li>
                  <li>Providing high-quality English mentorship.</li>
                  <li>
                    Equipping students with essential skills for international
                    scholarships, remote work, and global careers.
                  </li>
                  <li>
                    Bridging educational and socio-economic gaps through
                    accessible and scalable learning solutions.
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
              Our ESP-Based Curriculum
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-[14px] sm:text-[15px] text-justify leading-relaxed">
                IELS specializes in English for Specific Purposes (ESP)—a
                focused approach that develops English skills directly tied to
                learners&apos; academic, professional, and global aspirations.
                Unlike traditional English courses, ESP targets real-life needs
                and industry-specific contexts, making the learning process more
                efficient and relevant.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[16px] sm:text-[17px] lg:text-[18px] mb-3">
                    ESP Program Tracks:
                  </h3>
                  <ul className="text-[14px] sm:text-[15px] space-y-2 list-disc list-inside leading-relaxed">
                    <li>
                      <strong>English for Academic Purposes (EAP):</strong>{" "}
                      Preparing students for IELTS/TOEFL exams, research
                      writing, and academic success abroad.
                    </li>
                    <li>
                      <strong>English for Occupational Purposes (EOP):</strong>{" "}
                      Supporting professional English skills for careers in
                      global industries, including remote work, networking, and
                      internships.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-[16px] sm:text-[17px] lg:text-[18px] mb-3">
                    Key Areas of Focus:
                  </h3>
                  <ul className="text-[14px] sm:text-[15px] space-y-2 list-disc list-inside leading-relaxed">
                    <li>
                      <strong>Academic Pathways:</strong> Study abroad
                      readiness, academic writing, test preparation.
                    </li>
                    <li>
                      <strong>Professional Development:</strong> Workplace
                      communication, job interviews, digital collaboration.
                    </li>
                    <li>
                      <strong>International Engagement:</strong> Public
                      speaking, cultural fluency, cross-border networking.
                    </li>
                  </ul>
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
                    We are driven by three core values that define our approach
                    and impact:
                  </p>
                  <ul className="text-[14px] sm:text-[15px] space-y-2 list-disc list-inside leading-relaxed">
                    <li>
                      <strong>Inclusivity:</strong> We believe every learner
                      deserves the chance to grow. We work to make English
                      education accessible, affordable, and adaptable for
                      diverse needs across Indonesia.
                    </li>
                    <li>
                      <strong>Quality:</strong> Our programs are designed with
                      excellence and relevance in mind, combining real-world
                      applications, evidence-based methods, and experienced
                      mentors.
                    </li>
                    <li>
                      <strong>Community:</strong> Learning is better together.
                      We build a strong, inclusive community where learners
                      support one another and grow together.
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[20px] sm:text-[22px] lg:text-[24px] mb-3">
                    Who We Serve
                  </h3>
                  <p className="text-[14px] sm:text-[15px] mb-3 leading-relaxed">
                    IELS supports a wide range of learners and institutions,
                    with tailored programs for:
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
                  We deliver meaningful value to students, educational
                  institutions, and partner organizations:
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
              IELS (Inclusive English Learning Space) is a learning platform
              dedicated to empowering Indonesian students and young
              professionals by equipping them with practical and globally
              relevant English skills. Our mission is to bridge the gap between
              English education and real-world application by offering
              mentorship, structured learning programs, and a strong support
              community.
            </p>
            <p className="text-[14px] sm:text-[15px] text-justify">
              In today&apos;s interconnected world, English is more than just a
              language—it&apos;s a gateway to academic excellence, professional
              growth, and global collaboration. IELS is here to ensure that
              learners in Indonesia, regardless of their background or location,
              have the tools, guidance, and confidence to thrive
              internationally.
            </p>
          </div>
        </div>
        <div className="w-full">
          <div className="block sm:hidden">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-1 relative">
              {/* Animated Background */}
              <div
                className={`absolute top-1 bottom-1 bg-[#E56668] rounded-xl shadow-lg transition-transform duration-300 ease-in-out ${
                  isButtonAnimating ? "opacity-80" : "opacity-100"
                }`}
                style={{
                  width: "calc(33.333% - 2px)",
                  transform: `translateX(${getActiveIndex() * 100}%)`,
                }}
              />

              <div className="grid grid-cols-3 gap-1 relative z-10">
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
              </div>
            </div>
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
