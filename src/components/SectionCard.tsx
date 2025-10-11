import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  emoji?: string;
  description?: string;
  href?: string;
};

export default function SectionCard({ title, emoji, description, href }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md border p-6 text-center">
      <h3 className="text-xl font-bold mb-2">{emoji} {title}</h3>
      {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
      {href ? (
        <Link href={href} className="inline-block px-4 py-2 rounded-xl bg-[#173E8C] text-white">
          Start
        </Link>
      ) : (
        <div className="inline-block px-4 py-2 rounded-xl bg-gray-200 text-gray-600">Locked</div>
      )}
    </div>
  );
}
