"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Stories", path: "/stories" },
    {
      name: "Events",
      path: "/events",
      children: [
        { name: "All Events", path: "/events" }, // 👈 khusus tablet
        { name: "Join Our Community", path: "/iels-lounge" },
      ],
    },
    { name: "Gallery", path: "/gallery" },
    { name: "Careers", path: "/careers" },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#2F4157] flex items-center justify-between py-6 lg:py-10 px-4 sm:px-8 lg:px-[100px] z-50 shadow-md">
      {/* Logo Section */}
      <Link
        className="flex items-center font-geologica gap-3 lg:gap-[19px]"
        href="/"
        onClick={closeMobileMenu}
      >
        <Image
          src="/images/logos/iels_white.png"
          alt="IELS Logo White"
          width={60}
          height={60}
          className="lg:w-[75px]"
        />
        <div className="flex flex-col text-white text-[14px] lg:text-[16px]">
          <p>Inclusive English</p>
          <p className="-mt-1">Learning Space</p>
        </div>
      </Link>

      {/* ================= TABLET NAVIGATION ================= */}
      <div className="hidden md:flex lg:hidden items-center gap-3 text-white">
        {navItems.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path === "/stories" && pathname.startsWith("/stories")) ||
            (item.path === "/events" && pathname.startsWith("/events"));

          if (item.children) {
            const isOpen = openDropdown === item.name;
            return (
              <div key={item.name} className="relative">
                <button
                  onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${
                    isActive
                      ? "bg-white text-[#2F4157]"
                      : "hover:bg-white/20 text-white"
                  }`}
                >
                  {item.name}
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Tablet Dropdown */}
                {isOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-2xl shadow-lg bg-white text-[#2F4157]">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        className="block px-4 py-2 rounded-2xl hover:bg-gray-100"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`rounded-full px-3 py-1 transition-colors cursor-pointer ${
                isActive
                  ? "bg-white text-[#2F4157]"
                  : "hover:bg-white/20 text-white"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center text-white gap-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path === "/stories" && pathname.startsWith("/stories")) ||
            (item.path === "/events" && pathname.startsWith("/events"));

          if (item.children) {
            return (
              <div key={item.name} className="relative group">
                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? "bg-white text-[#2F4157]"
                      : "hover:bg-white/20 text-white"
                  }`}
                >
                  {/* Link utama tetap bisa diklik */}
                  <Link href={item.path}>{item.name}</Link>

                  {/* Arrow hanya untuk indikasi dropdown */}
                  <svg
                    className="w-4 h-4 transform transition-transform duration-300 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-2 w-48 rounded-2xl shadow-lg bg-white text-[#2F4157] opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200">
                  {item.children.map((child) => (
                    <Link
                      key={child.path}
                      href={child.path}
                      className="block px-4 py-2 rounded-2xl hover:bg-gray-100"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`rounded-full px-3 py-1 transition-colors cursor-pointer ${
                isActive
                  ? "bg-white text-[#2F4157]"
                  : "hover:bg-white/20 text-white"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Mobile Hamburger/Cross Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden flex flex-col items-center justify-center w-8 h-8 relative z-50"
        aria-label="Toggle menu"
      >
        {/* Hamburger Icon */}
        <div
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isMobileMenuOpen
              ? "rotate-45 translate-y-1.5"
              : "rotate-0 translate-y-0"
          }`}
        />
        <div
          className={`w-6 h-0.5 bg-white transition-all duration-300 my-1 ${
            isMobileMenuOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <div
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isMobileMenuOpen
              ? "-rotate-45 -translate-y-1.5"
              : "rotate-0 translate-y-0"
          }`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-[#2F4157] transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logos/iels_white.png"
              alt="IELS Logo White"
              width={40}
              height={40}
            />
            <div className="flex flex-col text-white text-[12px]">
              <p>Inclusive English</p>
              <p className="-mt-1">Learning Space</p>
            </div>
          </div>
          <button
            onClick={closeMobileMenu}
            className="w-6 h-6 relative"
            aria-label="Close menu"
          >
            <div className="w-6 h-0.5 bg-white rotate-45 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <div className="w-6 h-0.5 bg-white -rotate-45 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <nav className="flex flex-col p-6 space-y-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path === "/stories" && pathname.startsWith("/stories")) ||
              (item.path === "/events" && pathname.startsWith("/events"));

            const isOpen = openDropdown === item.name;

            if (item.children) {
              return (
                <div key={item.name}>
                  <div className="flex items-center justify-between">
                    {/* Link utama tetap bisa diklik */}
                    <Link
                      href={item.path}
                      onClick={closeMobileMenu}
                      className={`flex-1 text-lg font-medium py-2 px-3 rounded-lg ${
                        isActive
                          ? "bg-white text-[#2F4157]"
                          : "text-white hover:bg-white/20"
                      }`}
                    >
                      {item.name}
                    </Link>

                    {/* Arrow toggle dropdown */}
                    <button
                      onClick={() =>
                        setOpenDropdown(isOpen ? null : item.name)
                      }
                      className="px-2 text-white"
                    >
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {isOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          onClick={closeMobileMenu}
                          className="block text-sm text-white hover:underline"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={closeMobileMenu}
                className={`text-lg font-medium transition-colors py-2 px-3 rounded-lg ${
                  isActive
                    ? "bg-white text-[#2F4157]"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
