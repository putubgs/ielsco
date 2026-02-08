"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PricingModal from "@/components/subscription/PricingModal";
import { createBrowserClient } from "@supabase/ssr";
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
  Link as LinkIcon,
  Sparkles,
  Palette,
  PenTool,
  Mic
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- MOCK CONTRIBUTIONS (Masih mock karena belum ada tabel contributions) ---
// TODO: Nanti ganti dengan fetch real data dari tabel 'contributions'
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

// --- TYPE DEFINITIONS ---
type UserTier = "explorer" | "insider" | "visionary";

export default function PortfolioPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // State
  const [userData, setUserData] = useState<{
    id: string;
    name: string;
    tier: UserTier;
    avatar: string;
  }>({ 
    id: "", 
    name: "", 
    tier: "explorer", 
    avatar: "" 
  });
  
  const [loading, setLoading] = useState(true);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [contributions, setContributions] = useState(MOCK_CONTRIBUTIONS); // Nanti diganti fetch
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // 1. Fetch User Data & Tier
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/sign-in");
        return;
      }

      const { data: dbUser } = await supabase
        .from("users")
        .select(`*, memberships(tier)`)
        .eq("id", user.id)
        .single();

      // Mapping Logic
      const dbTier = dbUser?.memberships?.[0]?.tier;
      let uiTier: UserTier = "explorer";

      if (dbTier === "pro") {
        uiTier = "insider";
      } else if (dbTier === "premium" || dbTier === "visionary") {
        uiTier = "visionary";
      } else {
        uiTier = "explorer";
      }

      setUserData({
        id: user.id,
        name: user.user_metadata?.full_name || "Member",
        tier: uiTier,
        avatar: user.user_metadata?.avatar_url || ""
      });
      setLoading(false);
    };
    initData();
  }, [router, supabase]);

  const hasAccess = userData.tier === "insider" || userData.tier === "visionary";
  
  const portfolioLink = `https://ielsco.com/portfolio/${userData.name
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioLink);
    alert("Portfolio link copied to clipboard!");
  };

  const handleExportPDF = () => {
    alert("Exporting portfolio as PDF...");
  };

  if (loading) {
    return (
      <DashboardLayout userTier="explorer" userName="Loading..." userAvatar="">
        <div className="p-8 flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E56668]"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      userTier={userData.tier}
      userName={userData.name}
      userAvatar={userData.avatar}
    >
      <div className="min-h-screen bg-[#F7F8FA]">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">

          {/* === LOCKED STATE (EXPLORER) === */}
          {!hasAccess ? (
            <div className="relative rounded-3xl overflow-hidden bg-[#2F4157] text-white p-8 lg:p-16 text-center shadow-2xl">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E56668] blur-[100px] opacity-20 rounded-full"></div>
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-lg">
                  <Lock className="text-white" size={40} />
                </div>
                
                <h1 className="text-3xl lg:text-5xl font-bold mb-6">
                  Build Your Professional Portfolio
                </h1>
                
                <p className="text-white/80 text-lg lg:text-xl mb-10 leading-relaxed">
                  Upgrade to Insider to showcase your projects, track contributions, and share a verified portfolio link with recruiters and universities.
                </p>

                {/* Features Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">
                   <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/10">
                      <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center mb-3">
                         <Palette size={20} className="text-pink-300" />
                      </div>
                      <h3 className="font-bold text-white mb-1">Showcase Work</h3>
                      <p className="text-xs text-white/70">Display your best projects beautifully.</p>
                   </div>
                   <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/10">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
                         <Share2 size={20} className="text-blue-300" />
                      </div>
                      <h3 className="font-bold text-white mb-1">Shareable Link</h3>
                      <p className="text-xs text-white/70">Verified public profile URL.</p>
                   </div>
                   <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/10">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-3">
                         <Download size={20} className="text-green-300" />
                      </div>
                      <h3 className="font-bold text-white mb-1">PDF Export</h3>
                      <p className="text-xs text-white/70">Download resume-ready format.</p>
                   </div>
                </div>

                <button 
                  onClick={() => setShowPricingModal(true)}
                  className="px-8 py-4 bg-white text-[#2F4157] rounded-full font-bold text-lg hover:scale-105 transition-transform inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Crown size={20} className="text-[#E56668]" />
                  Unlock Portfolio Feature
                </button>
              </div>
            </div>
          ) : (
            
            /* === UNLOCKED STATE (INSIDER / VISIONARY) === */
            <>
              {/* Header with Actions */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-2">
                <div>
                  <h1 className="text-3xl font-bold text-[#2F4157] mb-2 flex items-center gap-3">
                    My Portfolio <Sparkles className="text-yellow-400" fill="currentColor" />
                  </h1>
                  <p className="text-gray-600">
                    Showcase your contributions and share your learning journey
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-[#E56668] text-white rounded-xl font-semibold hover:bg-[#C04C4E] transition-all shadow-md shadow-red-900/10"
                  >
                    <Plus size={20} />
                    Add Contribution
                  </button>
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    <Share2 size={20} />
                    Share
                  </button>
                  <button
                    onClick={handleExportPDF}
                    className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    <Download size={20} />
                    PDF
                  </button>
                </div>
              </div>

              {/* Portfolio Link Card */}
              <div className="bg-gradient-to-r from-[#E56668] to-[#C04C4E] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                  <div className="flex-1 min-w-0">
                    <p className="text-white/80 text-sm mb-1 font-medium">
                      Your Public Portfolio Link
                    </p>
                    <div className="flex items-center gap-2">
                        <p className="font-mono text-lg font-bold truncate opacity-90 hover:opacity-100 transition-opacity">
                        {portfolioLink}
                        </p>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-white hover:text-[#E56668] transition-all flex items-center gap-2"
                  >
                    <LinkIcon size={18} />
                    Copy Link
                  </button>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Contributions", value: contributions.length, icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Unique Projects", value: new Set(contributions.map((c) => c.project_name)).size, icon: PenTool, color: "text-purple-600", bg: "bg-purple-50" },
                  { label: "Skills Gained", value: new Set(contributions.flatMap((c) => c.tags)).size, icon: Palette, color: "text-pink-600", bg: "bg-pink-50" },
                  { label: "Total Views", value: 47, icon: ExternalLink, color: "text-orange-600", bg: "bg-orange-50" },
                ].map((stat, idx) => (
                   <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between h-full">
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-3", stat.bg)}>
                         <stat.icon size={20} className={stat.color} />
                      </div>
                      <div>
                         <p className="text-3xl font-bold text-[#2F4157]">{stat.value}</p>
                         <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                      </div>
                   </div>
                ))}
              </div>

              {/* Contributions List */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-bold text-[#2F4157]">
                     Contributions & Projects
                   </h2>
                   {/* Bisa tambah filter dropdown di sini nanti */}
                </div>

                {contributions.length > 0 ? (
                  <div className="grid gap-6">
                    {contributions.map((contribution) => (
                      <div
                        key={contribution.id}
                        className="group bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 hover:shadow-lg transition-all hover:border-[#E56668]/30 relative"
                      >
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                               <h3 className="text-xl font-bold text-[#2F4157] group-hover:text-[#E56668] transition-colors">
                                 {contribution.project_name}
                               </h3>
                               <span className="px-3 py-1 bg-[#E56668]/10 text-[#E56668] rounded-full text-xs font-bold uppercase tracking-wide">
                                 {contribution.role}
                               </span>
                            </div>
                            
                            <p className="text-gray-600 leading-relaxed mb-6">
                              {contribution.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                              {contribution.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg text-xs font-bold"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            {/* Output Links */}
                            {contribution.output_links.length > 0 && (
                              <div className="flex flex-wrap gap-3">
                                {contribution.output_links.map((link, idx) => (
                                  <a
                                    key={idx}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-600 text-xs font-semibold border border-gray-200 transition-colors"
                                  >
                                    <ExternalLink size={14} />
                                    View Output {idx + 1}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-gray-400 hover:text-[#2F4157] hover:bg-gray-100 rounded-lg transition-colors">
                              <Edit2 size={18} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-end">
                          <p className="text-xs text-gray-400 font-medium">
                            Added on {new Date(contribution.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-16 border border-gray-100 text-center border-dashed">
                    <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6">
                      <Briefcase className="text-gray-300" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-[#2F4157] mb-2">
                      No contributions yet
                    </h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                      Start building your portfolio by adding your first project, volunteer work, or achievement.
                    </p>
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#E56668] text-white rounded-xl font-semibold hover:bg-[#C04C4E] transition-all shadow-md"
                    >
                      <Plus size={20} />
                      Add First Contribution
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && hasAccess && (
        <div className="fixed inset-0 bg-[#2F4157]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              ✕
            </button>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#E56668]/10 flex items-center justify-center mx-auto mb-4">
                <Share2 className="text-[#E56668]" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[#2F4157] mb-2">
                Share Your Portfolio
              </h2>
              <p className="text-gray-500 mb-6 text-sm">
                Share your verified portfolio link with recruiters and on social media.
              </p>

              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 text-left">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                  Public Link
                </p>
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-200">
                    <p className="font-mono text-xs text-[#2F4157] truncate flex-1">
                    {portfolioLink}
                    </p>
                    <button onClick={handleCopyLink} className="p-1.5 hover:bg-gray-100 rounded">
                        <LinkIcon size={14} className="text-gray-500"/>
                    </button>
                </div>
              </div>

              <div className="space-y-3">
                <button onClick={handleCopyLink} className="w-full py-3 bg-[#E56668] text-white rounded-xl font-bold hover:bg-[#C04C4E] transition-all shadow-lg shadow-red-900/10">
                  Copy Link
                </button>
                <button className="w-full py-3 bg-[#0077b5] text-white rounded-xl font-bold hover:bg-[#006097] transition-all shadow-lg shadow-blue-900/10">
                  Share on LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Contribution Modal */}
      {showAddModal && hasAccess && (
        <div className="fixed inset-0 bg-[#2F4157]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 relative my-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#2F4157]">
                Add Contribution
                </h2>
                <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                ✕
                </button>
            </div>

            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-bold text-[#2F4157] mb-2">
                    Project Name
                    </label>
                    <input
                    type="text"
                    placeholder="e.g., IELS Social Media Campaign"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E56668] focus:bg-white transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-[#2F4157] mb-2">
                    Your Role
                    </label>
                    <input
                    type="text"
                    placeholder="e.g., Content Creator"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E56668] focus:bg-white transition-all"
                    />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2F4157] mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your contribution, tools used, and impact..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E56668] focus:bg-white transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2F4157] mb-2">
                  Output Links <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/your-work"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E56668] focus:bg-white transition-all mb-2"
                />
                <button
                  type="button"
                  className="text-xs font-bold text-[#E56668] hover:underline flex items-center gap-1"
                >
                  <Plus size={12} /> Add another link
                </button>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2F4157] mb-2">
                  Skills/Tags
                </label>
                <input
                  type="text"
                  placeholder="e.g., Content Writing, Canva, Leadership"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E56668] focus:bg-white transition-all"
                />
                <p className="text-xs text-gray-500 mt-1.5">
                  Separate with commas
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#E56668] text-white rounded-xl font-bold hover:bg-[#C04C4E] transition-all shadow-lg"
                >
                  Save Contribution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}
    </DashboardLayout>
  );
}