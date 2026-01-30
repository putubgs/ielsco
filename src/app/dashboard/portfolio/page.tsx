"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Briefcase,
  Plus,
  ExternalLink,
  Share2,
  Download,
  Crown,
  Lock,
  Edit2,
  Trash2,
  Link as LinkIcon
} from "lucide-react";

const MOCK_USER = {
  tier: "pro" as const, // Change to "basic" to see locked state
  name: "Anisa Rahman"
};

const MOCK_CONTRIBUTIONS = [
  {
    id: "1",
    project_name: "IELS Social Media Campaign",
    role: "Content Creator",
    description:
      "Created engaging Instagram posts and captions for IELS community events. Designed graphics using Canva and wrote compelling copy to increase event attendance.",
    output_links: [
      "https://instagram.com/p/example1",
      "https://drive.google.com/file/d/example1"
    ],
    date: "2026-01-15",
    tags: ["Content Creation", "Social Media", "Design"]
  },
  {
    id: "2",
    project_name: "English Conversation Club Documentation",
    role: "Event Documentor",
    description:
      "Documented weekly conversation club sessions through detailed recap articles. Published on IELS blog and shared across community channels.",
    output_links: ["https://iels.co/blog/conversation-club-recap"],
    date: "2026-01-10",
    tags: ["Writing", "Documentation", "Communication"]
  },
  {
    id: "3",
    project_name: "Community Podcast Production",
    role: "Audio Editor",
    description:
      "Edited 2 podcast episodes featuring IELS alumni sharing their study abroad experiences. Managed audio quality, transitions, and final production.",
    output_links: [
      "https://spotify.com/episode/1",
      "https://spotify.com/episode/2"
    ],
    date: "2025-12-20",
    tags: ["Audio Editing", "Production", "Storytelling"]
  }
];

export default function PortfolioPage() {
  const [user] = useState(MOCK_USER);
  const [contributions] = useState(MOCK_CONTRIBUTIONS);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const isPro = user.tier === "pro";
  const portfolioLink = `https://iels.co/portfolio/${user.name
    .toLowerCase()
    .replace(" ", "-")}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioLink);
    alert("Portfolio link copied to clipboard!");
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    alert("Exporting portfolio as PDF...");
  };

  return (
    <DashboardLayout
      userTier={user.tier}
      userName={user.name}
      userAvatar={undefined}
    >
      <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
        {/* Locked State (for Basic users) */}
        {!isPro && (
          <div className="bg-gradient-to-br from-[#2F4157] via-[#3d5570] to-[#294154] rounded-2xl p-8 lg:p-12 text-white text-center">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Lock className="text-white" size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-4">
              Portfolio Feature Locked
            </h1>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Upgrade to Pro to showcase your contributions, share your
              portfolio publicly, and export professional summaries.
            </p>
            <button className="px-8 py-4 bg-white text-[#E56668] rounded-xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-2">
              <Crown size={24} />
              Upgrade to Pro - IDR 99k/month
            </button>
          </div>
        )}

        {/* Pro User View */}
        {isPro && (
          <>
            {/* Header with Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#2F4157] mb-2">
                  My Portfolio
                </h1>
                <p className="text-gray-600">
                  Showcase your contributions and share your learning journey
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-5 py-3 bg-[#E56668] text-white rounded-xl font-semibold hover:bg-[#C04C4E] transition-all"
                >
                  <Plus size={20} />
                  Add Contribution
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center gap-2 px-5 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  <Share2 size={20} />
                  Share Portfolio
                </button>
                <button
                  onClick={handleExportPDF}
                  className="flex items-center gap-2 px-5 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  <Download size={20} />
                  Export PDF
                </button>
              </div>
            </div>

            {/* Portfolio Link Card */}
            <div className="bg-gradient-to-r from-[#E56668] to-[#C04C4E] rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-sm mb-2">
                    Your Public Portfolio
                  </p>
                  <p className="font-mono text-lg font-semibold truncate">
                    {portfolioLink}
                  </p>
                </div>
                <button
                  onClick={handleCopyLink}
                  className="ml-4 px-5 py-3 bg-white text-[#E56668] rounded-xl font-semibold hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <LinkIcon size={18} />
                  Copy Link
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <p className="text-gray-600 text-sm mb-1">
                  Total Contributions
                </p>
                <p className="text-3xl font-bold text-[#2F4157]">
                  {contributions.length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <p className="text-gray-600 text-sm mb-1">Projects</p>
                <p className="text-3xl font-bold text-[#2F4157]">
                  {new Set(contributions.map((c) => c.project_name)).size}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <p className="text-gray-600 text-sm mb-1">Skills</p>
                <p className="text-3xl font-bold text-[#2F4157]">
                  {
                    new Set(
                      contributions.flatMap((c) => c.tags)
                    ).size
                  }
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <p className="text-gray-600 text-sm mb-1">Portfolio Views</p>
                <p className="text-3xl font-bold text-[#2F4157]">47</p>
              </div>
            </div>

            {/* Contributions List */}
            <div>
              <h2 className="text-2xl font-bold text-[#2F4157] mb-4">
                Contributions & Projects
              </h2>

              {contributions.length > 0 ? (
                <div className="space-y-6">
                  {contributions.map((contribution) => (
                    <div
                      key={contribution.id}
                      className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-[#2F4157] mb-2">
                            {contribution.project_name}
                          </h3>
                          <p className="text-[#E56668] font-semibold mb-3">
                            {contribution.role}
                          </p>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            {contribution.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {contribution.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Output Links */}
                          {contribution.output_links.length > 0 && (
                            <div className="bg-gray-50 rounded-xl p-4">
                              <p className="font-semibold text-sm text-gray-700 mb-3">
                                Output Links:
                              </p>
                              <div className="space-y-2">
                                {contribution.output_links.map((link, idx) => (
                                  <a
                                    key={idx}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-[#E56668] hover:underline text-sm"
                                  >
                                    <ExternalLink size={16} />
                                    <span className="truncate">{link}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 ml-4">
                          <button className="p-2 text-gray-600 hover:text-[#E56668] hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit2 size={18} />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                          Added on{" "}
                          {new Date(contribution.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric"
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="text-gray-400" size={32} />
                  </div>
                  <p className="text-gray-600 text-lg mb-2">
                    No contributions yet
                  </p>
                  <p className="text-gray-500 text-sm mb-6">
                    Start building your portfolio by adding your first
                    contribution
                  </p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#E56668] text-white rounded-xl font-semibold hover:bg-[#C04C4E] transition-all"
                  >
                    <Plus size={20} />
                    Add Your First Contribution
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && isPro && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#E56668]/10 flex items-center justify-center mx-auto mb-4">
                <Share2 className="text-[#E56668]" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[#2F4157] mb-2">
                Share Your Portfolio
              </h2>
              <p className="text-gray-600 mb-6">
                Share your public portfolio link on social media and with
                potential employers
              </p>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">
                  Your Portfolio Link:
                </p>
                <p className="font-mono text-sm text-[#2F4157] break-all mb-4">
                  {portfolioLink}
                </p>
                <button
                  onClick={handleCopyLink}
                  className="w-full py-3 bg-[#E56668] text-white rounded-xl font-semibold hover:bg-[#C04C4E] transition-all"
                >
                  Copy Link
                </button>
              </div>

              <div className="space-y-3">
                <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
                  Share on LinkedIn
                </button>
                <button className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all">
                  Share on Twitter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Contribution Modal */}
      {showAddModal && isPro && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative my-8">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-[#2F4157] mb-6">
              Add New Contribution
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#2F4157] mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., IELS Social Media Campaign"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E56668]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2F4157] mb-2">
                  Your Role
                </label>
                <input
                  type="text"
                  placeholder="e.g., Content Creator, Designer, Writer"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E56668]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2F4157] mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your contribution and impact..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E56668] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2F4157] mb-2">
                  Output Links (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/your-work"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E56668] mb-2"
                />
                <button
                  type="button"
                  className="text-sm text-[#E56668] hover:underline"
                >
                  + Add another link
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2F4157] mb-2">
                  Skills/Tags
                </label>
                <input
                  type="text"
                  placeholder="e.g., Content Writing, Design, Social Media"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E56668]"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate with commas
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#E56668] text-white rounded-xl font-semibold hover:bg-[#C04C4E] transition-all"
                >
                  Add Contribution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}