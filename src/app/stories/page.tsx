"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import LoadingOverlay from "@/components/LoadingOverlay";
import { memberStoriesData, MemberStory } from "@/data/member-stories";
import { programUpdatesData, ProgramUpdate } from "@/data/program-updates";
import { partnerUpdatesData, PartnerUpdate } from "@/data/partner-updates";
import { generateSlug } from "@/utils/slug";

type NewsItem =
  | (MemberStory & { type: "member" })
  | (ProgramUpdate & { type: "program" })
  | (PartnerUpdate & { type: "partner" });

// Combine all data into a single array
const newsData: NewsItem[] = [
  ...memberStoriesData.map((item) => ({
    ...item,
    type: "member" as const,
  })),
  ...programUpdatesData.map((item) => ({
    ...item,
    type: "program" as const,
  })),
  ...partnerUpdatesData.map((item) => ({
    ...item,
    type: "partner" as const,
  })),
];

export default function News() {
  const [activeFilter, setActiveFilter] = useState<
    "member" | "program" | "partner"
  >("member");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filteredNews = newsData.filter((item) => item.type === activeFilter);

  const sortedFilteredNews = filteredNews.sort((a, b) => {
    if (a.type === "member" && b.type === "member") {
      // Parse dates for comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    }
    return 0;
  });

  const itemsPerPage = activeFilter === "member" ? 4 : 3;
  const totalPages = Math.ceil(sortedFilteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = sortedFilteredNews.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFilterChange = (newFilter: "member" | "program" | "partner") => {
    if (newFilter === activeFilter) return;

    setIsAnimating(true);
    setActiveFilter(newFilter);
    setCurrentPage(1);

    setTimeout(() => setIsAnimating(false), 300);
  };

  const getActiveIndex = () => {
    const filters = ["member", "program", "partner"];
    return filters.indexOf(activeFilter);
  };

  const handleReadMore = () => {
    setIsLoading(true);
    // Simulate loading time for navigation
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Empty state components
  const EmptyState = ({ category }: { category: string }) => {
    const getEmptyMessage = () => {
      switch (category) {
        case "member":
          return {
            title: "No Member Stories Yet",
            message:
              "We're working on gathering inspiring stories from our community members. Check back soon for amazing journeys and experiences!",
            icon: "👥",
          };
        case "program":
          return {
            title: "No Program Updates Available",
            message:
              "We're preparing exciting program updates and announcements. Stay tuned for the latest developments in our educational offerings!",
            icon: "📚",
          };
        case "partner":
          return {
            title: "No Partner Updates Yet",
            message:
              "We're building partnerships and collaborations that will bring you valuable opportunities. More updates coming soon!",
            icon: "🤝",
          };
        default:
          return {
            title: "No Content Available",
            message:
              "We're working on bringing you fresh content. Please check back later!",
            icon: "📝",
          };
      }
    };

    const { title, message, icon } = getEmptyMessage();

    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-[#2F4157] mb-4 text-center">
          {title}
        </h3>
        <p className="text-gray-600 text-center max-w-md leading-relaxed">
          {message}
        </p>
      </div>
    );
  };

  return (
    <div className="">
      <Header />
      <LoadingOverlay isLoading={isLoading} message="Loading story..." />

      {/* Hero Section */}
      <div className="px-4 sm:px-6 lg:px-[100px] pt-1 pb-8 sm:pb-12 lg:pb-16 bg-white text-[#2F4157]">
        <div className="max-w-7xl mx-auto">
          {/* Hero Card */}
          <div className="p-4 sm:p-6 lg:p-8 xl:p-12 mb-2">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
              {/* Left Content */}
              <div className="w-full lg:w-2/6 text-[#2F4157]">
                {/* IELS Insight Logo */}
                <div className="flex items-center gap-3 mb-4 sm:mb-6 lg:mb-8">
                  <Image
                    src="/images/contents/general/iels_insight.png"
                    alt="IELS Insight Logo"
                    width={300}
                    height={50}
                    className="h-auto w-full max-w-[250px] sm:max-w-[300px]"
                  />
                </div>

                <h1 className="text-lg sm:text-xl lg:text-[24px] font-bold mb-3 sm:mb-4">
                  Stories From Our Community
                </h1>

                <p className="text-sm sm:text-[15px] leading-relaxed max-w-lg">
                  Discover how IELS members, programs, and partners are creating
                  impact. Explore real experiences, achievements, and updates
                  that show learning, growth, and opportunities in action.
                </p>
              </div>

              {/* Right Image */}
              <div className="w-full lg:w-4/6">
                <Image
                  src="/images/contents/general/iels_gathering.png"
                  alt="IELS Community"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-[15px] sm:rounded-[20px]"
                />
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="mb-8 sm:mb-10 lg:mb-12 px-4">
            {/* Mobile Version - Similar to About Page */}
            <div className="block sm:hidden">
              <div className="bg-gray-100 rounded-2xl p-1 relative">
                {/* Animated Background */}
                <div
                  className={`absolute top-1 bottom-1 bg-[#E56668] rounded-xl shadow-lg transition-transform duration-300 ease-in-out ${
                    isAnimating ? "opacity-80" : "opacity-100"
                  }`}
                  style={{
                    width: "calc(33.333% - 2px)",
                    transform: `translateX(${getActiveIndex() * 100}%)`,
                  }}
                />

                <div className="grid grid-cols-3 gap-1 relative z-10">
                  <button
                    onClick={() => handleFilterChange("member")}
                    className={`py-3 px-2 rounded-xl text-[14px] font-medium transition-colors duration-300 ${
                      activeFilter === "member"
                        ? "text-white"
                        : "text-[#2F4157] hover:text-[#2F4157] hover:bg-white/50"
                    }`}
                  >
                    Member Stories
                  </button>
                  <button
                    onClick={() => handleFilterChange("program")}
                    className={`py-3 px-2 rounded-xl text-[14px] font-medium transition-colors duration-300 ${
                      activeFilter === "program"
                        ? "text-white"
                        : "text-[#2F4157] hover:text-[#2F4157] hover:bg-white/50"
                    }`}
                  >
                    Program Updates
                  </button>
                  <button
                    onClick={() => handleFilterChange("partner")}
                    className={`py-3 px-2 rounded-xl text-[14px] font-medium transition-colors duration-300 ${
                      activeFilter === "partner"
                        ? "text-white"
                        : "text-[#2F4157] hover:text-[#2F4157] hover:bg-white/50"
                    }`}
                  >
                    Partner Updates
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Version - Keep Original Design */}
            <div className="hidden sm:flex flex-wrap gap-2 sm:gap-4 justify-center">
              <button
                onClick={() => {
                  setActiveFilter("member");
                  setCurrentPage(1);
                }}
                className={`px-3 sm:px-4 lg:px-5 py-1 sm:py-1.5 rounded-full font-semibold transition-colors cursor-pointer text-sm sm:text-base ${
                  activeFilter === "member"
                    ? "bg-[#E56668] text-white"
                    : "bg-white border border-[#2F4157] text-[#2F4157] hover:bg-gray-50"
                }`}
              >
                Member Stories
              </button>
              <button
                onClick={() => {
                  setActiveFilter("program");
                  setCurrentPage(1);
                }}
                className={`px-3 sm:px-4 lg:px-5 py-1 sm:py-1.5 rounded-full font-semibold transition-colors cursor-pointer text-sm sm:text-base ${
                  activeFilter === "program"
                    ? "bg-[#E56668] text-white"
                    : "bg-white border border-[#2F4157] text-[#2F4157] hover:bg-gray-50"
                }`}
              >
                Program Updates
              </button>
              <button
                onClick={() => {
                  setActiveFilter("partner");
                  setCurrentPage(1);
                }}
                className={`px-3 sm:px-4 lg:px-5 py-1 sm:py-1.5 rounded-full font-semibold transition-colors cursor-pointer text-sm sm:text-base ${
                  activeFilter === "partner"
                    ? "bg-[#E56668] text-white"
                    : "bg-white border border-[#2F4157] text-[#2F4157] hover:bg-gray-50"
                }`}
              >
                Partner Updates
              </button>
            </div>
          </div>

          {/* News Grid */}
          {currentNews.length === 0 ? (
            <EmptyState category={activeFilter} />
          ) : (
            <div
              className={`grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12 px-4 sm:px-0 ${
                activeFilter === "member"
                  ? "sm:grid-cols-1 lg:grid-cols-2"
                  : "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {currentNews.map((news) => (
                <div key={news.id}>
                  {/* Member Stories - Original Layout */}
                  {news.type === "member" && (
                    <div className="bg-white rounded-[15px] sm:rounded-[20px] overflow-hidden shadow-sm lg:shadow-none">
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-4 sm:p-6">
                        {/* Author Avatar */}
                        <div className="flex-shrink-0 mx-auto sm:mx-0">
                          <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] lg:w-[147px] lg:h-[147px] rounded-full bg-gray-200 overflow-hidden">
                            <Image
                              src={news.author.avatar}
                              alt={news.author.name}
                              width={147}
                              height={147}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="text-lg sm:text-xl font-bold text-[#2F4157] mb-2 sm:mb-3 leading-tight">
                            {news.title}
                          </h3>
                          <p className="text-sm sm:text-[15px] text-[#2F4157] leading-relaxed mb-3 sm:mb-4">
                            {news.cardContent}
                          </p>
                          <Link
                            href={`/stories/${generateSlug(news.title)}`}
                            onClick={handleReadMore}
                          >
                            <button className="border border-[#2F4157] cursor-pointer text-[#2F4157] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-gray-50 transition-colors text-sm sm:text-base">
                              Read More
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Program Updates & Partner Updates - Event Card Style */}
                  {(news.type === "program" || news.type === "partner") && (
                    <div className="flex flex-col gap-3 sm:gap-4 w-full">
                      {/* Image Container with 50% height crop */}
                      <div className="relative w-full h-[200px] sm:h-[250px] lg:h-[300px] overflow-hidden rounded-[15px] sm:rounded-[20px]">
                        <Image
                          src={news.image!}
                          alt={news.title}
                          width={450}
                          height={450}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      {/* Category Label */}
                      <div className="flex flex-col gap-2">
                        <p className="text-red-500 font-bold text-xs sm:text-sm uppercase tracking-wide">
                          {news.category}
                        </p>
                        <p className="font-bold text-lg sm:text-xl lg:text-[24px] text-[#2F4157] leading-tight">
                          {news.title}
                        </p>
                        <p className="text-sm sm:text-[15px] text-[#2F4157] leading-relaxed">
                          {news.description.length > 215
                            ? `${news.description.substring(0, 215)}...`
                            : news.description}
                        </p>
                      </div>
                      <button className="border-1 border-[#2F4157] cursor-pointer rounded-[15px] sm:rounded-[20px] px-2 sm:px-3 py-1 sm:py-1.5 w-fit mt-4 sm:mt-6 lg:mt-8 hover:bg-[#2F4157] hover:text-white transition-colors text-[#2F4157] text-sm sm:text-base">
                        Read More
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {currentNews.length > 0 && (
            <Pagination
              pageCount={totalPages}
              onPageChange={(selectedItem) =>
                setCurrentPage(selectedItem.selected + 1)
              }
              currentPage={currentPage - 1}
            />
          )}

          {/* Call to Action */}
          <div className="text-center pt-4 sm:pt-6 px-4">
            <p className="text-gray-600 mb-2 text-sm sm:text-base">
              Got a story to tell?
            </p>
            <Link
              href="/contact"
              className="text-red-500 hover:text-red-600 transition-colors underline text-sm sm:text-base"
            >
              Share it with us here.
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
