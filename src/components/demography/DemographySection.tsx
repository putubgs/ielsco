"use client";

import { useState } from "react";
import IndonesiaMap from "./IndonesiaMap";
import DemographyPanel from "./DemographyPanel";
import { RegionKey } from "../../types/demography";

export default function DemographySection() {
  const [activeRegion, setActiveRegion] = useState<RegionKey | null>(null);

  return (
    <div className="py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* HEADER */}
        <div className=" mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Our Reach, Backed by Real Participation
          </h2>
          <p className="text-white leading-relaxed text-center">
            IELS doesn&apos;t grow based on assumptions — it grows where students
            actively engage.
            <br />
            <span className="font-medium text-white text-center">
              This map reflects real learner participation, program execution,
              and partner-led initiatives across Indonesia.
            </span>
          </p>
          
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* MAP */}
          <div className="lg:col-span-2 bg-white rounded-2xl  p-2 sm:p-4">
            <IndonesiaMap
              activeRegion={activeRegion}
              onSelect={setActiveRegion}
            />

            {/* Helper */}
            {!activeRegion && (
              <p className="mt-3 text-xs sm:text-sm text-gray-500 text-center">
                Click a region to explore participation data
              </p>
            )}
          </div>
       

          {/* DATA PANEL */}
          <DemographyPanel activeRegion={activeRegion} />

        </div>       
      </div>
 
 
    </div>
  );
}