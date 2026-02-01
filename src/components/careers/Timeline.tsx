"use client";

import { useMemo } from "react";

type TimelineItem = {
  title: string;
  date: string;
  desc: string;
  start: Date;
  end: Date;
};

const timeline: TimelineItem[] = [
  {
    title: "EXTENDED! Open Recruitment",
    date: "11 Jan - 5 Feb 2026",
    desc: "Submit your application and choose your preferred division.",
    start: new Date("2026-01-14"),
    end: new Date("2026-01-31"),
  },
  {
    title: "Announcement to Interview",
    date: "8 February 2026",
    desc: "Shortlisted candidates will be invited to interview.",
    start: new Date("2026-02-08"),
    end: new Date("2026-02-08"),
  },
  {
    title: "Interview",
    date: "10–15 February 2026",
    desc: "Structured interviews with IELS principals & core team.",
    start: new Date("2026-02-08"),
    end: new Date("2026-02-16"),
  },
  {
    title: "Announcement to Apprenticeship",
    date: "19 February 2026",
    desc: "Selected candidates proceed as IELS Apprentices.",
    start: new Date("2026-02-19"),
    end: new Date("2026-02-19"),
  },
  {
    title: "Training & Apprenticeship",
    date: "20 Feb – 29 March 2026",
    desc: "Training, real tasks, and performance evaluation.",
    start: new Date("2026-02-23"),
    end: new Date("2026-03-31"),
  },
  {
    title: "Final Announcement",
    date: "1 April 2026",
    desc: "Official announcement of IELS Batch 3 internal team.",
    start: new Date("2026-04-01"),
    end: new Date("2026-04-01"),
  },
  {
    title: "Onboarding",
    date: "6 April 2026",
    desc: "Formal onboarding and start of Batch 3 journey.",
    start: new Date("2026-04-04"),
    end: new Date("2026-04-04"),
  },
];

export default function Timeline() {
  const now = new Date();

  /** FIND ACTIVE PHASE */
  const activeIndex = useMemo(() => {
    const idx = timeline.findIndex(
      (item) => now >= item.start && now <= item.end
    );
    return idx === -1 ? 0 : idx; // fallback biar GA PERNAH kosong
  }, [now]);

  const daysLeft = Math.max(
    0,
    Math.ceil(
      (timeline[activeIndex].end.getTime() - now.getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  return (
    <section className="bg-white py-20 overflow-hidden">
      {/* HEADER */}
      <div className="text-center mb-12 px-6">
        <h2 className="text-3xl font-extrabold text-[#2F4157] mb-3">
          Recruitment Timeline
        </h2>
        <p className="text-gray-600">
          Swipe to track where the recruitment is happening right now.
        </p>
      </div>

      {/* OUTER FRAME (DESKTOP GAP) */}
      <div className="relative max-w-[1400px] mx-auto">
          {/* RED TIMELINE TRACK */}
  <div className="
    absolute left-0 right-0 top-1/2
    h-[6px]
    bg-[#E56668]/40
    rounded-full
    -translate-y-1/2
  " />
        {/* GRADIENT FADE */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#F7F8FA] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#F7F8FA] to-transparent z-10" />

        {/* SCROLL AREA */}
        <div className="overflow-x-auto scrollbar-none px-12">
          <div className="flex gap-8 w-max py-6 mx-auto">
            {timeline.map((item, i) => {
              const isActive = i === activeIndex;

              return (
                <div
                  key={i}
                  className={`
                    relative min-w-[280px] max-w-[280px]
                    rounded-3xl bg-white p-6
                    transition-all duration-300
                    ${
                      isActive
                        ? "border-2 border-[#E56668] shadow-2xl scale-[1.05]"
                        : "border border-gray-200 hover:shadow-lg hover:-translate-y-1"
                    }
                  `}
                >
                  {/* ACTIVE BADGE */}
                  {isActive && (
                    <div className="absolute -top-4 left-6 right-6 text-center">
                      <div className="rounded-full bg-[#E56668] py-2 text-xs font-bold text-white shadow-md">
                        {daysLeft} DAYS LEFT!!
                      </div>
                    </div>
                  )}

                  {/* CONTENT */}
                  <p className="text-sm font-semibold text-[#E56668] mb-2">
                    {item.date}
                  </p>

                  <h3 className="text-lg font-bold text-[#2F4157] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>

                  {/* ACTIVE INDICATOR */}
                  {isActive && (
                    <div className="mt-5 text-xs font-semibold text-[#E56668]">
                      Current Phase
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}