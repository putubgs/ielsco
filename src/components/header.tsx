"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "News", path: "/news" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
  ];

  return (
    <div className="flex items-center justify-between py-10 px-[125px] bg-transparent relative z-50">
      {/* Logo Section */}
      <Link className="flex items-center font-geologica gap-[19px]" href="/">
        <Image
          src="/images/logos/iels_white.png"
          alt="IELS Logo White"
          width={75}
          height={75}
        />
        <div className="flex flex-col text-white text-[16px]">
          <p>Inclusive English</p>
          <p className="-mt-1">Learning Space</p>
        </div>
      </Link>

      {/* Navigation Section */}
      <div className="flex items-center text-white gap-3">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
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
    </div>
  );
}
