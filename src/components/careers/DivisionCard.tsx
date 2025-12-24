"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  slug: string;
  title: string;
  image: string;
  description: string;
};

export default function DivisionCard({
  slug,
  title,
  image,
  description,
}: Props) {
  const [active, setActive] = useState(false);

  return (
    <Link
      href={`/careers/${slug}`}
      onPointerDown={() => setActive(true)}
      onPointerUp={() => setTimeout(() => setActive(false), 120)}
      onPointerLeave={() => setActive(false)}
      className={`
        group relative block overflow-hidden
        rounded-3xl border bg-white
        transition-all duration-300
        ${
          active
            ? "border-[#E56668] shadow-xl -translate-y-1"
            : "border-gray-200 hover:-translate-y-1 hover:shadow-xl hover:border-[#E56668]/60"
        }
      `}
    >
      {/* IMAGE */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className={`
            object-cover transition-transform duration-500
            ${active ? "scale-105" : "group-hover:scale-105"}
          `}
        />

        {/* OVERLAY */}
        <div
          className={`
            absolute inset-0
            bg-gradient-to-t from-black/60 via-black/30 to-transparent
            transition-opacity duration-300
            ${active ? "opacity-100" : "opacity-70"}
          `}
        />

        {/* TITLE */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white leading-tight">
            {title}
          </h3>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative p-6 flex flex-col gap-4">

        {/* LEFT ACCENT BAR */}
        <div
          className={`
            absolute left-0 top-6 bottom-6 w-1 rounded-full
            transition-all duration-300
            ${
              active
                ? "bg-[#E56668]"
                : "bg-transparent group-hover:bg-[#E56668]"
            }
          `}
        />

        {/* DESCRIPTION */}
        <p className="pl-4 text-sm text-gray-600 leading-relaxed">
          {description}
        </p>

        {/* FOOTER */}
        <div className="pl-4 flex items-center justify-between pt-2">
          <span
            className={`
              text-sm font-semibold text-[#E56668]
              transition-all duration-300
              ${
                active
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              }
            `}
          >
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}