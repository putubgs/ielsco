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
      name: "Products",
      path: "/products",
      children: [
        { name: "IELS Lounge", path: "/iels-lounge" },
        { name: "IELS Courses", path: "/products/courses" },
        { name: "IELS English Test", path: "/test" },
        { name: "IELS for Schools", path: "/products/schools" },
        { name: "E-books & Recordings", path: "/products/resources" },
      ],
    },

    // Start — no dropdown, special styling
    {
      name: "Start!",
      path: "/welcome/start",
      isStart: true,
    },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#2F4157] flex items-center justify-between py-6 lg:py-10 px-4 sm:px-8 lg:px-[100px] z-50 shadow-md">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center font-geologica gap-3 lg:gap-[19px]"
        onClick={closeMobileMenu}
      >
        <Image
          src="/images/logos/iels_white.png"
          width={60}
          height={60}
          className="lg:w-[75px]"
          alt="IELS Logo White"
        />
        <div className="flex flex-col text-white text-[14px] lg:text-[16px]">
          <p>Inclusive English</p>
          <p className="-mt-1">Learning Space</p>
        </div>
      </Link>

      {/* ---------------- TABLET NAV (md only) ---------------- */}
      <div className="hidden md:flex lg:hidden items-center gap-3 text-white">
        {navItems.map((item) => {
          // handle Start specifically so it never inherits the "active => white bg" rule
          if (item.isStart) {
            return (
              <div key={item.name} className="relative">
                <Link
                  href={item.path}
                  onClick={closeMobileMenu}
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]"
                  aria-label="Start"
                >
                  {item.name}
                </Link>
              </div>
            );
          }

          // normal items with dropdown
          if (item.children) {
            const isOpen = openDropdown === item.name;
            const isActive = pathname === item.path;
            return (
              <div key={item.name} className="relative">
                <button
                  onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all ${
                    isActive ? "bg-white text-[#2F4157]" : "hover:bg-white/20"
                  }`}
                >
                  {item.name}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-2xl bg-white text-[#2F4157] shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        onClick={closeMobileMenu}
                        className="block px-4 py-2 hover:bg-gray-100 rounded-2xl"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // plain link (non-dropdown)
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`px-4 py-2 rounded-full transition-colors ${
                isActive ? "bg-white text-[#2F4157]" : "hover:bg-white/20"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* ---------------- DESKTOP NAV ---------------- */}
      <div className="hidden lg:flex items-center text-white gap-3">
        {navItems.map((item) => {
          // Start handled first: always red, hover scale, no arrow
          if (item.isStart) {
            return (
              <div key={item.name} className="relative group">
                <Link
                  href={item.path}
                  onClick={closeMobileMenu}
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E] transition transform hover:scale-[1.02]"
                >
                  {item.name}
                </Link>
              </div>
            );
          }

          // dropdown items
          if (item.children) {
            const isActive = pathname === item.path;
            return (
              <div key={item.name} className="relative group">
                <div
                  className={`flex items-center gap-1 px-4 py-2 rounded-full cursor-pointer transition-all ${
                    isActive ? "bg-white text-[#2F4157]" : "hover:bg-white/20 text-white"
                  }`}
                >
                  <Link href={item.path}>{item.name}</Link>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div className="absolute left-0 mt-2 w-48 rounded-2xl bg-white text-[#2F4157] shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200">
                  {item.children.map((child) => (
                    <Link key={child.path} href={child.path} className="block px-4 py-2 hover:bg-gray-100 rounded-2xl">
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          // plain link
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`px-4 py-2 rounded-full transition-colors ${
                isActive ? "bg-white text-[#2F4157]" : "hover:bg-white/20 text-white"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden flex flex-col items-center justify-center w-8 h-8"
        aria-label="Toggle menu"
      >
        <div className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
        <div className={`w-6 h-0.5 bg-white my-1 transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`} />
        <div className={`w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={closeMobileMenu} />}

      {/* MOBILE MENU */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-[#2F4157] z-50 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <nav className="p-6 space-y-4">
          {navItems.map((item) => {
            // Special mobile Start (always red)
            if (item.isStart) {
              return (
                <div key={item.name}>
                  <Link
                    href={item.path}
                    onClick={closeMobileMenu}
                    className="block w-full text-center px-4 py-2 rounded-lg bg-[#E56668] text-white font-medium hover:scale-[1.03] transition-all"
                  >
                    {item.name}
                  </Link>
                </div>
              );
            }

            // items with children (collapsible)
            if (item.children) {
              const isOpen = openDropdown === item.name;
              const isActive = pathname === item.path;
              return (
                <div key={item.name}>
                  <button
                    className={`w-full flex items-center justify-between px-4 py-2 text-white rounded-lg ${isActive ? "bg-white text-[#2F4157]" : ""}`}
                    onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                  >
                    {item.name}
                    <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} stroke="currentColor" strokeWidth="2" fill="none" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

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

            // plain mobile link
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={closeMobileMenu}
                className={`block px-4 py-2 rounded-lg text-white ${isActive ? "text-[#2F4157]" : "hover:bg-white/20"}`}
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
