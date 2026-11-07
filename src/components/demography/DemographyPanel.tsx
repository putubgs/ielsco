"use client";

import { RegionKey } from "../../types/demography";
import { DEMOGRAPHY_DATA } from "@/data/demography";



type Props = {
  activeRegion: RegionKey | null;
};

export default function DemographyPanel({ activeRegion }: Props) {
  if (!activeRegion) {
    return (
      <div className="rounded-2xl border border-[#294154]/10 p-6 bg-white">
        <p className="font-semibold text-[#294154] mb-2">
          📍 Explore IELS Learner Distribution
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Click a region on the map to explore where IELS learners, programs,
          and partnerships are most actively growing across Indonesia.
        </p>
         {/* Data Note */}
<br/><p className="text-xs text-gray-500 max-w-3xl leading-relaxed">
  <span className="font-medium text-[#294154]">Data note:</span>{" "}
  Distribution insights are sourced from a consolidated dataset of
  approximately <strong>2,800+ IELS learner leads</strong>, program participants,
  and community members collected across Indonesia, spanning
  collaborations with <strong>10+ universities</strong> and multiple partner-led initiatives.
</p>
      </div>
    );
  }

  const data = DEMOGRAPHY_DATA[activeRegion];

  return (
    <div className="rounded-2xl border border-[#294154]/10 p-6 bg-white space-y-4">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-wider text-gray-500">
          Regional Snapshot
        </p>
        <h3 className="text-xl font-extrabold text-[#294154]">
          {data.label}
        </h3>
        <p className="text-sm font-medium text-[#E56668] mt-1">
          {data.headline}
        </p>
      </div>

      {/* Percentage */}
      <div>
        <p className="text-4xl font-extrabold text-[#E56668]">
          {data.percentage}%
        </p>
        <p className="text-xs text-gray-500">
          of total IELS learners & program activities
        </p>
      </div>

      {/* Summary */}
      <p className="text-sm text-gray-700 leading-relaxed">
        {data.summary}
      </p>

      {/* Highlights */}
      {data.highlights && (
        <ul className="space-y-1 text-sm text-gray-600">
          {data.highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#E56668] mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Proof Link */}
      {data.link && (
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#E56668] hover:underline"
        >
          {data.proofLabel ?? "View documentation →"}
        </a>
      )}
    </div>
  );
}