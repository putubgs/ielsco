"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import EventIcon from "@mui/icons-material/Event";
import EventCard from "@/components/events/EventCard";
import Pagination from "@/components/Pagination";
import { eventsData } from "@/data/events";
import { generateSlug } from "@/utils/slug";
import { useState, useMemo } from "react";

export default function Events() {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<typeof eventsData>([]);
  const [isSearching, setIsSearching] = useState(false);
  const eventsPerPage = 3;

  // Check if eventsData is empty
  const isEmpty = eventsData.length === 0;

  // Find the event with the closest registration deadline
  const upcomingEvent = useMemo(() => {
    if (isEmpty) return null;

    const now = new Date();

    const validEvents = eventsData.filter((event) => {
      // Parse deadline date and time - treat as GMT+7
      const [year, month, day] = event.registrationDateDeadline
        .split("-")
        .map(Number);
      const [hours, minutes] = event.registrationTimeDeadline
        .split(":")
        .map(Number);

      // Create deadline date in UTC (GMT+7 time minus 7 hours = UTC)
      const deadlineUTC = new Date(
        Date.UTC(year, month - 1, day, hours - 7, minutes, 0)
      );

      return deadlineUTC > now;
    });

    if (validEvents.length === 0) return null;

    return validEvents.reduce((closest, current) => {
      const [closestYear, closestMonth, closestDay] =
        closest.registrationDateDeadline.split("-").map(Number);
      const [closestHours, closestMinutes] = closest.registrationTimeDeadline
        .split(":")
        .map(Number);
      const closestDeadlineUTC = new Date(
        Date.UTC(
          closestYear,
          closestMonth - 1,
          closestDay,
          closestHours - 7,
          closestMinutes,
          0
        )
      );

      const [currentYear, currentMonth, currentDay] =
        current.registrationDateDeadline.split("-").map(Number);
      const [currentHours, currentMinutes] = current.registrationTimeDeadline
        .split(":")
        .map(Number);
      const currentDeadlineUTC = new Date(
        Date.UTC(
          currentYear,
          currentMonth - 1,
          currentDay,
          currentHours - 7,
          currentMinutes,
          0
        )
      );

      return currentDeadlineUTC < closestDeadlineUTC ? current : closest;
    });
  }, [isEmpty]);

  // Format date for display in GMT+7
  const formatEventDate = (dateString: string) => {
    // Parse the date string and convert to GMT+7
    const date = new Date(`${dateString}T00:00:00+07:00`);
    const month = date.toLocaleDateString("en-US", {
      month: "short",
      timeZone: "Asia/Jakarta", // GMT+7 timezone
    });
    const day = date.getDate();
    const year = date.getFullYear();
    return { month, day, year };
  };

  // Search function
  const handleSearch = () => {
    console.log("Search function called with query:", searchQuery);

    if (searchQuery.trim() === "") {
      setFilteredEvents([]);
      setIsSearching(false);
      return;
    }

    const filtered = eventsData.filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log("Filtered results:", filtered.length);

    setFilteredEvents(filtered);
    setIsSearching(true);
    setCurrentPage(0);
  };

  // Clear search function
  const clearSearch = () => {
    console.log("Clear search function called");
    setSearchQuery("");
    setFilteredEvents([]);
    setIsSearching(false);
    setCurrentPage(0);
  };

  // Handle search icon click
  const handleSearchIconClick = () => {
    console.log("Search icon clicked, query:", searchQuery);
    if (searchQuery.trim()) {
      handleSearch();
    }
  };

  // Calculate pagination for desktop
  const eventsToShow = isSearching ? filteredEvents : eventsData;
  const totalPages = Math.ceil(eventsToShow.length / eventsPerPage);
  const startIndex = currentPage * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = eventsToShow.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // Empty State Component
  const EmptyState = ({ isSearch = false }: { isSearch?: boolean }) => (
    <div className="flex flex-col items-center justify-center py-[150px] px-6">
      <div className="bg-gray-100 rounded-full p-6 mb-6">
        <EventIcon className="text-gray-400 text-6xl" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">
        {isSearch ? "No Events Found" : "No Events Yet"}
      </h3>
      <p className="text-gray-500 text-center max-w-md mb-6">
        {isSearch
          ? `We couldn't find any events matching "${searchQuery}". Try searching with different keywords.`
          : "IELS doesn't have any events scheduled at the moment. Please check back later for exciting upcoming events!"}
      </p>
      {isSearch && (
        <button
          onClick={clearSearch}
          className="bg-[#2F4157] text-white px-6 py-2 rounded-[15px] hover:bg-[#4B5B6E] transition-colors"
        >
          Clear Search
        </button>
      )}
    </div>
  );

  // If eventsData is completely empty, show empty state
  if (isEmpty) {
    return (
      <div>
        <Header />
        <div className="flex flex-col bg-white lg:px-[100px] w-full py-12">
          <EmptyState />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col bg-white lg:px-[100px] w-full py-12">
        <div>
          {/* Mobile Design - Completely Different Layout */}
          <div className="block lg:hidden">
            {/* Mobile Header Card - Only show if there's an upcoming event */}
            {upcomingEvent && (
              <div className="bg-gradient-to-br from-[#2F4157] to-[#4B5B6E] rounded-[20px] p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 rounded-full px-3 py-1">
                    <p className="text-white text-sm">Upcoming Events</p>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
                    <Image
                      src="/images/contents/general/calendar_icon.png"
                      alt="Calendar"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    <span className="text-white text-sm font-bold">
                      {formatEventDate(upcomingEvent.startDate).month}{" "}
                      {formatEventDate(upcomingEvent.startDate).day},{" "}
                      {formatEventDate(upcomingEvent.startDate).year}
                    </span>
                  </div>
                </div>

                <h1 className="text-white text-3xl font-bold mb-4 text-center">
                  {upcomingEvent.title}
                </h1>

                <div className="relative mb-6 flex justify-center">
                  <Image
                    src={upcomingEvent.poster}
                    width={280}
                    height={350}
                    alt={upcomingEvent.title}
                    className="w-[280px] h-[350px] rounded-[15px] object-cover"
                  />
                </div>

                <p className="text-white/90 text-center mb-6 leading-relaxed">
                  {upcomingEvent.description.length > 215
                    ? `${upcomingEvent.description.substring(0, 215)}...`
                    : upcomingEvent.description}
                </p>

                <div className="flex flex-col gap-3">
                  <Link
                    href={upcomingEvent.registrationLink}
                    className="bg-white text-[#2F4157] rounded-[15px] px-6 py-3 text-center font-semibold"
                  >
                    Register Now
                  </Link>
                  <Link
                    href={`/events/${generateSlug(upcomingEvent.title)}`}
                    className="border-2 border-white text-white rounded-[15px] px-6 py-3 text-center font-semibold"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            )}

            {/* Mobile Search Section */}
            <div className="bg-[#F5F5F5] rounded-[20px] p-4">
              <h3 className="text-[#2F4157] font-semibold mb-3 text-center">
                Search Past Events
              </h3>
              <div className="flex items-center bg-white rounded-[15px] p-3 shadow-sm">
                <MenuIcon className="text-gray-500 mr-3" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="flex-1 outline-none text-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                  type="button"
                  className="text-gray-500 ml-3 cursor-pointer hover:text-gray-700 p-1"
                  onClick={isSearching ? clearSearch : handleSearchIconClick}
                >
                  {isSearching ? (
                    <CancelIcon className="text-gray-500 hover:text-gray-700" />
                  ) : (
                    <SearchIcon />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Design - Original Layout */}
          <div className="hidden lg:block">
            {upcomingEvent && (
              <div className="flex bg-[#4B5B6E] rounded-[20px] h-[800px] sm:h-[700px] md:h-[600px] lg:h-[500px] xl:h-[496px] items-stretch">
                <div className="relative w-full flex bg-[#2F4157] rounded-[20px] items-stretch p-12">
                  <div className="relative w-[450px]">
                    <Image
                      src={upcomingEvent.poster}
                      width={450}
                      height={450}
                      alt={upcomingEvent.title}
                      className="absolute top-0 left-0 w-[450px] h-auto rounded-[10px]"
                    />
                  </div>
                  <div className="w-[30vw] pl-6 text-white py-12 flex flex-col gap-4 text-[15px] justify-center">
                    <p>Upcoming Events</p>
                    <p className="text-[32px]">{upcomingEvent.title}</p>
                    <p className="w-[50vm]">
                      {upcomingEvent.description.length > 215
                        ? `${upcomingEvent.description.substring(0, 215)}...`
                        : upcomingEvent.description}
                    </p>
                    <div className="flex gap-5 pt-6">
                      <Link
                        href={`/events/${generateSlug(upcomingEvent.title)}`}
                        className="border-1 border-white rounded-[20px] px-2 py-1"
                      >
                        Read More
                      </Link>
                      <Link
                        href={upcomingEvent.registrationLink}
                        className="border-1 border-white rounded-[20px] px-2 py-1"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-[20vw] items-center justify-center flex flex-col gap-1">
                  <Image
                    src="/images/contents/general/calendar_icon.png"
                    alt="Calendar Icon"
                    width={62}
                    height={62}
                    className="w-[62px] h-auto"
                  />
                  <div className="flex flex-col">
                    <p className="text-white text-[15px] text-end">
                      <span className="font-bold">
                        {formatEventDate(upcomingEvent.startDate).month}{" "}
                        {formatEventDate(upcomingEvent.startDate).day}
                      </span>{" "}
                      <br />
                      {formatEventDate(upcomingEvent.startDate).year}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="w-full flex pt-4 pl-12 justify-between">
              <div className="w-[450px]"></div>
              <div className="w-[45vw] flex rounded-[20px] bg-[#D3D3D3] items-end p-3 ml-[1.5vw]">
                <div className="flex gap-2 items-center w-full">
                  <MenuIcon className="text-gray-600" />
                  <input
                    type="text"
                    placeholder="Search Past Events"
                    className="px-2 w-full outline-none bg-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <button
                    type="button"
                    className="text-gray-600 cursor-pointer hover:text-gray-800 p-1"
                    onClick={isSearching ? clearSearch : handleSearchIconClick}
                  >
                    {isSearching ? (
                      <CancelIcon className="text-gray-500 hover:text-gray-700" />
                    ) : (
                      <SearchIcon />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Events - Pagination */}
        <div className="block lg:hidden">
          {/* Search Results Indicator */}
          {isSearching && (
            <div className="px-6 pt-4">
              <p className="text-gray-600 text-sm">
                {filteredEvents.length > 0
                  ? `Found ${filteredEvents.length} event${
                      filteredEvents.length === 1 ? "" : "s"
                    } for "${searchQuery}"`
                  : `No events found for "${searchQuery}"`}
              </p>
            </div>
          )}

          {/* Show empty state for search results or events */}
          {currentEvents.length === 0 ? (
            <EmptyState isSearch={isSearching} />
          ) : (
            <>
              <div className="pt-[50px] grid grid-cols-1 gap-6 p-6">
                {currentEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              <Pagination
                pageCount={totalPages}
                onPageChange={handlePageChange}
                currentPage={currentPage}
              />
            </>
          )}
        </div>

        {/* Desktop Events - Pagination */}
        <div className="hidden lg:block">
          {/* Show empty state for search results or events */}
          {currentEvents.length === 0 ? (
            <EmptyState isSearch={isSearching} />
          ) : (
            <>
              <div className="pt-[100px] grid grid-cols-3 gap-8 p-12">
                {currentEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              <Pagination
                pageCount={totalPages}
                onPageChange={handlePageChange}
                currentPage={currentPage}
              />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
