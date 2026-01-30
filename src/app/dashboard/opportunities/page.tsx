"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Target,
  Briefcase,
  GraduationCap,
  Users,
  ExternalLink,
  Clock,
  MapPin,
  Crown,
  Lock,
  Filter
} from "lucide-react";

const MOCK_USER = {
  tier: "pro" as const, // Change to "basic" to see locked state
  name: "Anisa Rahman"
};

const MOCK_OPPORTUNITIES = [
  {
    id: "1",
    title: "Chevening Scholarship 2026",
    type: "scholarship" as const,
    organization: "UK Government",
    description:
      "Fully funded master's scholarship to study in the UK for students from around the world with leadership potential.",
    deadline: "2026-03-15",
    location: "United Kingdom",
    requirements: "IELTS 6.5+, Bachelor's degree, 2 years work experience",
    link: "https://chevening.org",
    featured: true
  },
  {
    id: "2",
    title: "Google STEP Internship",
    type: "internship" as const,
    organization: "Google",
    description:
      "Software engineering internship program for first and second-year university students interested in tech.",
    deadline: "2026-02-28",
    location: "Remote/Multiple locations",
    requirements: "Computer Science major, Programming skills",
    link: "https://careers.google.com",
    featured: true
  },
  {
    id: "3",
    title: "IELS Community Lead Position",
    type: "leadership" as const,
    organization: "IELS",
    description:
      "Lead a team of volunteers to organize events, manage community engagement, and support learners.",
    deadline: "2026-02-20",
    location: "Remote",
    requirements: "6+ months IELS membership, Event attendance 80%+",
    link: "#",
    featured: false
  },
  {
    id: "4",
    title: "Fulbright Scholarship",
    type: "scholarship" as const,
    organization: "US Embassy",
    description:
      "Graduate study scholarship to pursue master's or PhD programs in the United States.",
    deadline: "2026-04-30",
    location: "United States",
    requirements: "TOEFL 90+, Bachelor's degree with GPA 3.0+",
    link: "https://fulbright.org",
    featured: false
  },
  {
    id: "5",
    title: "Microsoft Internship Program",
    type: "internship" as const,
    organization: "Microsoft",
    description:
      "12-week internship working on real projects with mentorship from senior engineers.",
    deadline: "2026-03-10",
    location: "Seattle, USA / Remote",
    requirements: "CS/Engineering major, Strong coding skills",
    link: "https://careers.microsoft.com",
    featured: false
  },
  {
    id: "6",
    title: "LPDP Scholarship",
    type: "scholarship" as const,
    organization: "Indonesian Government",
    description:
      "Full scholarship for Indonesian students to pursue master's or doctoral degrees abroad.",
    deadline: "2026-05-15",
    location: "Worldwide",
    requirements: "Indonesian citizen, IELTS 6.5+, GPA 3.0+",
    link: "https://lpdp.kemenkeu.go.id",
    featured: false
  }
];

export default function OpportunitiesPage() {
  const [user] = useState(MOCK_USER);
  const [opportunities] = useState(MOCK_OPPORTUNITIES);
  const [filter, setFilter] = useState<
    "all" | "scholarship" | "internship" | "leadership"
  >("all");

  const isPro = user.tier === "pro";

  const filteredOpportunities =
    filter === "all"
      ? opportunities
      : opportunities.filter((o) => o.type === filter);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "scholarship":
        return GraduationCap;
      case "internship":
        return Briefcase;
      case "leadership":
        return Users;
      default:
        return Target;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "scholarship":
        return "from-blue-500 to-blue-600";
      case "internship":
        return "from-green-500 to-green-600";
      case "leadership":
        return "from-purple-500 to-purple-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <DashboardLayout
      userTier={user.tier}
      userName={user.name}
      userAvatar={undefined}
    >
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Locked State (for Basic users) */}
        {!isPro && (
          <div className="bg-gradient-to-br from-[#2F4157] via-[#3d5570] to-[#294154] rounded-2xl p-8 lg:p-12 text-white text-center">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Lock className="text-white" size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-4">
              Opportunities Board Locked
            </h1>
            <p className="text-white/80 text-lg mb-4 max-w-2xl mx-auto">
              Upgrade to Pro to access exclusive scholarships, internships, and
              leadership opportunities verified by IELS.
            </p>
            <div className="bg-white/10 rounded-xl p-6 max-w-md mx-auto mb-8">
              <p className="text-white/90 text-sm mb-4">Sneak peek:</p>
              <div className="space-y-2 text-left">
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <GraduationCap size={20} className="flex-shrink-0" />
                  <span>6 scholarship opportunities</span>
                </div>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <Briefcase size={20} className="flex-shrink-0" />
                  <span>4 internship programs</span>
                </div>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <Users size={20} className="flex-shrink-0" />
                  <span>2 leadership positions</span>
                </div>
              </div>
            </div>
            <button className="px-8 py-4 bg-white text-[#E56668] rounded-xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-2">
              <Crown size={24} />
              Upgrade to Pro - IDR 99k/month
            </button>
          </div>
        )}

        {/* Pro User View */}
        {isPro && (
          <>
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl lg:text-4xl font-bold text-[#2F4157] mb-3">
                Opportunities Board 🎯
              </h1>
              <p className="text-gray-600 text-lg">
                Exclusive scholarships, internships, and leadership roles
                curated for IELS Pro members
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <GraduationCap className="text-blue-600" size={20} />
                  </div>
                  <p className="text-2xl font-bold text-[#2F4157]">
                    {
                      opportunities.filter((o) => o.type === "scholarship")
                        .length
                    }
                  </p>
                </div>
                <p className="text-sm text-gray-600">Scholarships</p>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Briefcase className="text-green-600" size={20} />
                  </div>
                  <p className="text-2xl font-bold text-[#2F4157]">
                    {
                      opportunities.filter((o) => o.type === "internship")
                        .length
                    }
                  </p>
                </div>
                <p className="text-sm text-gray-600">Internships</p>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Users className="text-purple-600" size={20} />
                  </div>
                  <p className="text-2xl font-bold text-[#2F4157]">
                    {
                      opportunities.filter((o) => o.type === "leadership")
                        .length
                    }
                  </p>
                </div>
                <p className="text-sm text-gray-600">Leadership</p>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[#E56668]/10 flex items-center justify-center">
                    <Target className="text-[#E56668]" size={20} />
                  </div>
                  <p className="text-2xl font-bold text-[#2F4157]">
                    {opportunities.length}
                  </p>
                </div>
                <p className="text-sm text-gray-600">Total Active</p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-600" />
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      filter === "all"
                        ? "bg-[#E56668] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All Opportunities
                  </button>
                  <button
                    onClick={() => setFilter("scholarship")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      filter === "scholarship"
                        ? "bg-[#E56668] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Scholarships
                  </button>
                  <button
                    onClick={() => setFilter("internship")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      filter === "internship"
                        ? "bg-[#E56668] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Internships
                  </button>
                  <button
                    onClick={() => setFilter("leadership")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      filter === "leadership"
                        ? "bg-[#E56668] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Leadership
                  </button>
                </div>
              </div>
            </div>

            {/* Opportunities Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredOpportunities.map((opportunity) => {
                const Icon = getTypeIcon(opportunity.type);
                const daysLeft = getDaysUntilDeadline(opportunity.deadline);
                const isUrgent = daysLeft <= 7;

                return (
                  <div
                    key={opportunity.id}
                    className={`bg-white rounded-2xl border-2 overflow-hidden hover:shadow-xl transition-shadow ${
                      opportunity.featured
                        ? "border-[#E56668]"
                        : "border-gray-100"
                    }`}
                  >
                    {opportunity.featured && (
                      <div className="bg-gradient-to-r from-[#E56668] to-[#C04C4E] px-4 py-2 text-white text-sm font-semibold">
                        ⭐ Featured Opportunity
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getTypeColor(
                            opportunity.type
                          )} flex items-center justify-center flex-shrink-0`}
                        >
                          <Icon className="text-white" size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[#2F4157] text-lg mb-1">
                            {opportunity.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {opportunity.organization}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {opportunity.description}
                      </p>

                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex items-start gap-2 text-gray-600">
                          <MapPin
                            size={16}
                            className="flex-shrink-0 mt-0.5"
                          />
                          <span>{opportunity.location}</span>
                        </div>
                        <div className="flex items-start gap-2 text-gray-600">
                          <Clock size={16} className="flex-shrink-0 mt-0.5" />
                          <span>
                            Deadline:{" "}
                            {new Date(
                              opportunity.deadline
                            ).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric"
                            })}{" "}
                            {isUrgent && (
                              <span className="text-red-600 font-semibold">
                                ({daysLeft} days left!)
                              </span>
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-3 mb-4">
                        <p className="text-xs font-semibold text-gray-700 mb-1">
                          Requirements:
                        </p>
                        <p className="text-sm text-gray-600">
                          {opportunity.requirements}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <a
                          href={opportunity.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#E56668] text-white rounded-xl font-semibold hover:bg-[#C04C4E] transition-all"
                        >
                          Apply Now
                          <ExternalLink size={16} />
                        </a>
                        <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredOpportunities.length === 0 && (
              <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Target className="text-gray-400" size={32} />
                </div>
                <p className="text-gray-600 text-lg mb-2">
                  No opportunities found
                </p>
                <p className="text-gray-500 text-sm">
                  Try changing your filter or check back later for new
                  opportunities
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}