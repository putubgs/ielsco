"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { careersData } from "@/data/careers-data";
import { generateSlug } from "@/utils/slug";

type CareerItem = {
  id: string;
  title: string;
  division: string;
  level: string;
  description: string;
  deadline?: string;
  applyLink: string;
  mode: "Onsite" | "Hybrid" | "Remote";
};


export default function CareersPage() {
  const [divisionFilter, setDivisionFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

// track state open untuk setiap filter
  const [openDivision, setOpenDivision] = useState(false);
  const [openLevel, setOpenLevel] = useState(false);
  const [openMode, setOpenMode] = useState(false);

  const itemsPerPage = 6;

  const images = [
    "/images/contents/careers/iels_team_0.png",
    "/images/contents/careers/iels_team_1.png",
    "/images/contents/careers/iels_team_2.png",
    "/images/contents/careers/iels_team_3.png",
    "/images/contents/careers/iels_team_4.png",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  const nextSlide = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

// Sort by deadline
  const sortedCareers = [...careersData].sort((a, b) => {
    if (!a.deadline || !b.deadline) return 0;
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  // Filtered
  const filteredCareers = sortedCareers.filter((item) => {
    const matchesDivision =
      divisionFilter === "All" || item.division === divisionFilter;
    const matchesLevel = levelFilter === "All" || item.level === levelFilter;
    const matchesMode = modeFilter === "All" || item.mode === modeFilter;
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.division.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDivision && matchesLevel && matchesMode && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCareers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = filteredCareers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
    <Header />
    <div className="min-h-screen bg-[#3a4b60] text-white">
      {/* Hero */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-4">💼 Join Our Team at IELS</h1>
        <p className="max-w-2xl mx-auto text-base text-gray-200">
          We’re a student-led organization empowering youths for global
          opportunities. Explore open positions and be part of our journey.
        </p>
{/* Carousel */}
<div className="relative mt-8 flex justify-center">
  <div className="relative w-[800px] h-[400px] overflow-hidden rounded-2xl shadow-md">
    {images.map((src, index) => (
      <Image
        key={index}
        src={src}
        alt={`IELS Image ${index + 1}`}
        fill
        className={`object-cover transition-opacity duration-700 ease-in-out absolute top-0 left-0
          ${currentImage === index ? "opacity-100" : "opacity-0"}`}
      />
    ))}

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-white transition"
      >
        <span className="text-2xl leading-none text-gray-800">‹</span>
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-white transition"
      >
        <span className="text-2xl leading-none text-gray-800">›</span>
      </button>
  </div>
</div>

{/* Dots */}
<div className="flex justify-center mt-4 gap-2">
  {images.map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentImage(index)}
      className={`w-2 h-2 rounded-full transition ${
        currentImage === index ? "bg-white" : "bg-gray-400"
      }`}
    />
  ))}
</div>
        </section>

  {/* Filters */}
      <section className="flex flex-wrap justify-center gap-4 px-4 py-6 bg-[#f5f5f5] text-black">

        {/* Division */}
        <div className="relative">
          <select
            value={divisionFilter}
            onChange={(e) => setDivisionFilter(e.target.value)}
            onClick={() => setOpenDivision(!openDivision)}
            onBlur={() => setOpenDivision(false)}
            className="appearance-none bg-white px-4 py-2 rounded-full border pr-8"
          >
            <option value="All">All Divisions</option>
            <option value="Project">Project</option>  
            <option value="Business">Business</option>
            <option value="Community">Community</option>
            <option value="Product">Product</option>
            <option value="Tech">Tech</option>
            <option value="Creative">Creative</option>
            <option value="Marketing">Marketing</option>

          </select>
          {/* custom arrow */}
          <span
            className={`absolute right-3 top-1/2 -translate-y-1/2 
              w-0 h-0 border-l-4 border-r-4 border-t-6 
              border-l-transparent border-r-transparent border-t-black
              transition-transform duration-300
              ${openDivision ? "rotate-180" : ""}`}
          />
        </div>

        {/* Level */}
        <div className="relative">
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            onClick={() => setOpenLevel(!openLevel)}
            onBlur={() => setOpenLevel(false)}
            className="appearance-none bg-white px-4 py-2 rounded-full border pr-8"
          >
            <option value="All">All Levels</option>
            <option value="Manager">Manager</option>
            <option value="Associate">Associate</option>
            <option value="Intern">Intern</option>
            <option value="Volunteer">Volunteer</option>
          </select>
          <span
            className={`absolute right-3 top-1/2 -translate-y-1/2 
              w-0 h-0 border-l-4 border-r-4 border-t-6 
              border-l-transparent border-r-transparent border-t-black
              transition-transform duration-300
              ${openLevel ? "rotate-180" : ""}`}
          />
        </div>

        {/* Mode */}
        <div className="relative">
          <select
            value={modeFilter}
            onChange={(e) => setModeFilter(e.target.value)}
            onClick={() => setOpenMode(!openMode)}
            onBlur={() => setOpenMode(false)}
            className="appearance-none bg-white px-4 py-2 rounded-full border pr-8"
          >
            <option value="All">All Modes</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>
          <span
            className={`absolute right-3 top-1/2 -translate-y-1/2 
              w-0 h-0 border-l-4 border-r-4 border-t-6 
              border-l-transparent border-r-transparent border-t-black
              transition-transform duration-300
              ${openMode ? "rotate-180" : ""}`}
          />
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search position..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 rounded-full border bg-white"
        />
      </section>

      {/* Careers Grid */}
      <section className="px-6 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentJobs.length > 0 ? (
          currentJobs.map((career) => (
            <div
              key={career.id}
              className="bg-white text-black rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">{career.title}</h2>
                <p className="text-sm text-gray-500 mb-1">
                  {career.division} – {career.level} ({career.mode})
                </p>
                <p className="text-gray-700 mb-3">{career.description}</p>
                {career.deadline && (
                  <p className="text-sm text-[#e56668] font-semibold">
                    Apply by {career.deadline}
                  </p>
                )}
              </div>
              <div className="mt-4 flex gap-3">
                <a
                  href={career.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#e56668] hover:bg-red-500 text-center rounded-full px-4 py-2 text-sm font-semibold text-white"
                >
                  Apply Now
                </a>
              <Link
                href={`/careers/${generateSlug(career.title)}`}

                className="flex-1 bg-[#f5f5f5] hover:bg-gray-200 text-center rounded-full px-4 py-2 text-sm font-semibold"
              >
                Read More
              </Link>

              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-2xl font-semibold mb-4">
              🚀 No open opportunities right now
            </p>
            <p className="text-gray-200 max-w-lg mx-auto mb-6">
              Thanks for your interest in joining IELS! Currently, we don’t
              have any open positions. Stay tuned for our next recruitment
              cycle.
            </p>
          </div>
        )}
      </section>

      {/* Pagination */}
      {filteredCareers.length > 0 && totalPages > 1 && (
        <div className="pb-12">
          <Pagination
            pageCount={totalPages}
            onPageChange={(selectedItem) =>
              setCurrentPage(selectedItem.selected + 1)
            }
            currentPage={currentPage - 1}
          />
        </div>
      )}

      {/* Contact */}
      <div className="text-center pb-12">
        <p>
          Questions? Reach us at{" "}
          <a
            href="mailto:careers@ielsco.com"
            className="underline text-white font-semibold"
          >
            careers@ielsco.com
          </a>
        </p>
      </div>
      </div>
      <Footer />
    </div>
  );
}
