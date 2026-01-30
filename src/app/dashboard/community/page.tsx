"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  MessageCircle,
  Users,
  Calendar,
  FileText,
  ExternalLink,
  Clock,
  Shield
} from "lucide-react";
import Image from "next/image";

const MOCK_USER = {
  // UBAH BARIS INI:
  tier: "basic" as "basic" | "pro", // Izinkan tipe datanya 'basic' ATAU 'pro'
  name: "Anisa Rahman"
};

const COMMUNITY_LINKS = [
  {
    id: "1",
    name: "Discord Community Server",
    description:
      "Join our main community hub for daily conversations, events, and announcements",
    icon: MessageCircle,
    url: "https://discord.gg/iels",
    color: "from-indigo-500 to-purple-600",
    members: "500+"
  },
  {
    id: "2",
    name: "WhatsApp Discussion Group",
    description: "Quick updates, peer discussions, and event reminders",
    icon: MessageCircle,
    url: "https://chat.whatsapp.com/iels",
    color: "from-green-500 to-emerald-600",
    members: "250+"
  },
  {
    id: "3",
    name: "Office Hours Calendar",
    description: "Book 1-on-1 sessions with mentors and community leads",
    icon: Calendar,
    url: "#",
    color: "from-blue-500 to-cyan-600",
    members: "Pro Only",
    pro: true
  }
];

const RESOURCES = [
  {
    id: "1",
    title: "IELS Orientation Guide",
    description: "Everything you need to know about getting started",
    type: "PDF",
    size: "2.5 MB",
    url: "#"
  },
  {
    id: "2",
    title: "Community Guidelines",
    description: "Our code of conduct and community standards",
    type: "PDF",
    size: "1.2 MB",
    url: "#"
  },
  {
    id: "3",
    title: "Event Archive 2024",
    description: "Recordings and materials from past events",
    type: "Folder",
    size: "Multiple files",
    url: "#"
  }
];

const OFFICE_HOURS = [
  {
    id: "1",
    mentor: "Dr. Sarah Johnson",
    role: "IELTS Expert",
    avatar: undefined,
    available: "Mon, Wed, Fri • 3-5 PM",
    topics: ["IELTS Preparation", "Academic Writing", "Speaking Skills"]
  },
  {
    id: "2",
    mentor: "Michael Chen",
    role: "Career Counselor",
    avatar: undefined,
    available: "Tue, Thu • 4-6 PM",
    topics: ["Study Abroad", "Scholarship Applications", "Career Planning"]
  },
  {
    id: "3",
    mentor: "Anindita Putri",
    role: "Community Lead",
    avatar: undefined,
    available: "Sat, Sun • 2-4 PM",
    topics: ["General Questions", "Community Support", "Event Planning"]
  }
];

export default function CommunityPage() {
  const [user] = useState(MOCK_USER);
  const isPro = user.tier === "pro";

  return (
    <DashboardLayout
      userTier={user.tier}
      userName={user.name}
      userAvatar={undefined}
    >
      <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#2F4157] mb-3">
            Community Hub 🌐
          </h1>
          <p className="text-gray-600 text-lg">
            Connect with fellow learners, join discussions, and access
            community resources
          </p>
        </div>

        {/* Community Links */}
        <div>
          <h2 className="text-2xl font-bold text-[#2F4157] mb-4">
            Join Our Community
          </h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {COMMUNITY_LINKS.map((link) => {
              const Icon = link.icon;
              const isLocked = link.pro && !isPro;

              return (
                <div
                  key={link.id}
                  className={`bg-white rounded-2xl p-6 border border-gray-100 ${
                    isLocked
                      ? "opacity-60"
                      : "hover:shadow-lg transition-shadow"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="text-white" size={28} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-[#2F4157] text-lg">
                          {link.name}
                        </h3>
                        {link.pro && (
                          <span className="px-2 py-1 bg-[#E56668]/10 text-[#E56668] text-xs font-semibold rounded-full">
                            Pro
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {link.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          <Users size={14} className="inline mr-1" />
                          {link.members}
                        </span>
                        {!isLocked ? (
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[#E56668] text-white rounded-lg font-semibold hover:bg-[#C04C4E] transition-all text-sm"
                          >
                            Join Now
                            <ExternalLink size={14} />
                          </a>
                        ) : (
                          <button
                            disabled
                            className="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg font-semibold text-sm cursor-not-allowed"
                          >
                            🔒 Locked
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Community Resources */}
        <div>
          <h2 className="text-2xl font-bold text-[#2F4157] mb-4">
            Community Resources
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {RESOURCES.map((resource, index) => (
              <a
                key={resource.id}
                href={resource.url}
                className={`flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors ${
                  index !== RESOURCES.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="w-14 h-14 rounded-xl bg-[#E56668]/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="text-[#E56668]" size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#2F4157] mb-1">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {resource.description}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium text-gray-700">
                    {resource.type}
                  </p>
                  <p className="text-xs text-gray-500">{resource.size}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Office Hours */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#2F4157]">
              Mentor Office Hours
            </h2>
            {!isPro && (
              <span className="px-3 py-1.5 bg-[#E56668]/10 text-[#E56668] rounded-lg text-sm font-semibold">
                Pro Only
              </span>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {OFFICE_HOURS.map((mentor) => (
              <div
                key={mentor.id}
                className={`bg-white rounded-2xl p-6 border border-gray-100 ${
                  isPro ? "hover:shadow-lg transition-shadow" : "opacity-60"
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E56668] to-[#C04C4E] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {mentor.avatar ? (
                      <img
                        src={mentor.avatar}
                        alt={mentor.mentor}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      mentor.mentor.charAt(0)
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#2F4157] text-lg mb-1">
                      {mentor.mentor}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{mentor.role}</p>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>{mentor.available}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Expertise:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {isPro ? (
                  <button className="w-full py-3 bg-[#E56668] text-white rounded-xl font-semibold hover:bg-[#C04C4E] transition-all">
                    Book Session
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 bg-gray-200 text-gray-500 rounded-xl font-semibold cursor-not-allowed"
                  >
                    🔒 Upgrade to Pro
                  </button>
                )}
              </div>
            ))}
          </div>

          {!isPro && (
            <div className="mt-6 bg-gradient-to-br from-[#E56668] to-[#C04C4E] rounded-2xl p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">
                Unlock 1-on-1 Mentor Sessions
              </h3>
              <p className="text-white/90 mb-4">
                Get personalized guidance from experts with Pro membership
              </p>
              <button className="px-8 py-3 bg-white text-[#E56668] rounded-xl font-semibold hover:shadow-xl transition-all">
                Upgrade to Pro
              </button>
            </div>
          )}
        </div>

        {/* Community Guidelines */}
        <div className="bg-blue-50 rounded-2xl p-6 lg:p-8 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Shield className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#2F4157] mb-2">
                Community Guidelines
              </h3>
              <p className="text-gray-700 mb-4">
                IELS is a safe, inclusive space for everyone. Please read and
                follow our community guidelines to ensure a positive experience
                for all members.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Be respectful and supportive to all members</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>
                    Keep discussions relevant and constructive
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>
                    No spam, self-promotion, or inappropriate content
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>
                    Report any violations to community moderators
                  </span>
                </li>
              </ul>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
              >
                Read Full Guidelines
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}