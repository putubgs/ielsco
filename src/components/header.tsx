"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Stories", path: "/stories" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex items-center justify-between py-6 lg:py-10 px-4 sm:px-8 lg:px-[100px] bg-transparent relative z-50">
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

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center text-white gap-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path === "/stories" && pathname.startsWith("/stories")) ||
            (item.path === "/events" && pathname.startsWith("/events"));
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
