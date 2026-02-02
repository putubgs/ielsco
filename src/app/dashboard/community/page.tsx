"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createBrowserClient } from "@supabase/ssr";
import {
  MessageCircle,
  Users,
  Crown,
  Lock,
  Send,
  FileText,
  Award,
  Heart,
  Sparkles,
  TrendingUp,
  Calendar,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Share2,
  BookOpen,
  Target,
  X
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PricingModal from "@/components/subscription/PricingModal";

export default function CommunityPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    tier: "basic" as "basic" | "pro",
    avatar: ""
  });
  const [loading, setLoading] = useState(true);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [storySubmitted, setStorySubmitted] = useState(false);
  
  // Story submission form
  const [storyForm, setStoryForm] = useState({
    title: "",
    description: "",
    category: ""
  });

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

      const tier = dbUser?.memberships?.[0]?.tier === "pro" ? "pro" : "basic";

      setUserData({
        id: user.id,
        name: user.user_metadata?.full_name || "Member",
        email: user.email || "",
        tier: tier,
        avatar: user.user_metadata?.avatar_url || ""
      });

      setLoading(false);
    };

    initData();
  }, [router, supabase]);

  const handleStorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Open Google Form in new tab with pre-filled data
    const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSdpfik-xAviTLsauSN_h4yVI-Af19ydbRC6-nM0QGDmuPEWIA/viewform?usp=pp_url&entry.NAME=${encodeURIComponent(userData.name)}&entry.EMAIL=${encodeURIComponent(userData.email)}&entry.TITLE=${encodeURIComponent(storyForm.title)}`;
    
    window.open(formUrl, '_blank');
    setStorySubmitted(true);
    
    setTimeout(() => {
      setShowStoryModal(false);
      setStorySubmitted(false);
      setStoryForm({ title: "", description: "", category: "" });
    }, 2000);
  };

  if (loading) {
    return (
      <DashboardLayout userTier={userData.tier} userName={userData.name} userAvatar={userData.avatar}>
        <div className="p-8 max-w-7xl mx-auto animate-pulse">
          <div className="h-48 bg-gray-200 rounded-3xl mb-8"></div>
          <div className="grid grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>)}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const isPro = userData.tier === "pro";

  return (
    <DashboardLayout userTier={userData.tier} userName={userData.name} userAvatar={userData.avatar}>
      <div className="min-h-screen bg-[#F7F8FA]">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#2F4157] via-[#3a4f66] to-[#2F4157] text-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm font-semibold mb-4 border border-white/20">
                  <Users size={14} />
                  IELS Community Hub
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Learn, Empower, Inspire Together
                </h1>
                <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
                  Join a community of ambitious learners. Share your journey, inspire others, and grow together towards global opportunities.
                </p>
              </div>
              
              {/* Community Stats */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold">1,200+</p>
                    <p className="text-white/60 text-sm">Active Members</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">350+</p>
                    <p className="text-white/60 text-sm">Success Stories</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">50+</p>
                    <p className="text-white/60 text-sm">Countries</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">24/7</p>
                    <p className="text-white/60 text-sm">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          
          {/* Quick Actions - Join Channels */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            
            {/* Discord - Free for Everyone */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-[#5865F2] rounded-2xl flex items-center justify-center">
                  <MessageCircle className="text-white" size={32} />
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                  FREE
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-[#2F4157] mb-2">
                Join Discord Community
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Connect with fellow learners, ask questions, and share resources in our active Discord server. Open to all IELS members!
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 size={16} className="text-green-500" />
                  General discussion channels
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 size={16} className="text-green-500" />
                  Event announcements
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 size={16} className="text-green-500" />
                  Study buddy matching
                </li>
                {!isPro && (
                  <li className="flex items-center gap-2 text-sm text-gray-400">
                    <Lock size={16} />
                    Insider-only channels
                  </li>
                )}
              </ul>
              
              <a
                href="https://discord.gg/iels-community"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#5865F2] text-white rounded-xl font-bold hover:bg-[#4752C4] transition-colors"
              >
                <ExternalLink size={18} />
                Join Discord Server
              </a>
            </div>

            {/* WhatsApp Group - Insider Only */}
            <div className={cn(
              "bg-white rounded-2xl p-6 border shadow-sm relative overflow-hidden",
              isPro ? "border-green-200" : "border-gray-200"
            )}>
              {!isPro && (
                <div className="absolute inset-0 bg-gray-900/5 backdrop-blur-[2px] z-10 flex items-center justify-center">
                  <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-[#E56668]/20 text-center max-w-xs">
                    <Crown className="mx-auto text-[#E56668] mb-3" size={40} />
                    <p className="font-bold text-[#2F4157] mb-2">Insider Exclusive</p>
                    <p className="text-sm text-gray-600 mb-4">
                      Upgrade to access private WhatsApp group
                    </p>
                    <button
                      onClick={() => setShowPricingModal(true)}
                      className="px-6 py-2 bg-[#E56668] text-white rounded-lg font-semibold hover:bg-[#C04C4E] transition-colors text-sm"
                    >
                      Upgrade Now
                    </button>
                  </div>
                </div>
              )}
              
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center">
                  <MessageCircle className="text-white" size={32} />
                </div>
                <span className={cn(
                  "px-3 py-1 text-xs font-bold rounded-full",
                  isPro ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-500"
                )}>
                  INSIDER
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-[#2F4157] mb-2">
                WhatsApp Inner Circle
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Exclusive group for Insider members. Get priority support, networking opportunities, and insider updates.
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 size={16} className="text-green-500" />
                  Priority mentor responses
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 size={16} className="text-green-500" />
                  Early event access
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 size={16} className="text-green-500" />
                  Alumni networking
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 size={16} className="text-green-500" />
                  Weekly study sessions
                </li>
              </ul>
              
              {isPro && (
                <a
                  href="https://chat.whatsapp.com/iels-insider"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#1FAF54] transition-colors"
                >
                  <ExternalLink size={18} />
                  Join WhatsApp Group
                </a>
              )}
            </div>
          </div>

          {/* Share Your Story Section */}
          <div className="bg-gradient-to-br from-[#E56668]/10 to-[#E56668]/5 rounded-3xl p-8 mb-8 border border-[#E56668]/20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E56668]/20 rounded-full text-sm font-bold text-[#E56668] mb-4">
                  <Sparkles size={14} />
                  Inspire Others
                </div>
                <h2 className="text-2xl font-bold text-[#2F4157] mb-3">
                  Share Your Learning Journey
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Did you get accepted to your dream university? Land that scholarship? Ace your IELTS? Your story could inspire the next generation of IELS learners. Share it with the community!
                </p>
                
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E56668]/20 rounded-full flex items-center justify-center">
                      <Heart size={18} className="text-[#E56668]" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Inspire Others</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E56668]/20 rounded-full flex items-center justify-center">
                      <Award size={18} className="text-[#E56668]" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Get Featured</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E56668]/20 rounded-full flex items-center justify-center">
                      <TrendingUp size={18} className="text-[#E56668]" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Build Portfolio</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowStoryModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#E56668] text-white rounded-xl font-bold hover:bg-[#C04C4E] transition-colors shadow-lg"
                >
                  <FileText size={18} />
                  Submit Your Story
                </button>
              </div>
              
              <div className="w-full md:w-auto">
                <Image
                  src="/images/contents/general/hi!.svg"
                  alt="Share your story"
                  width={250}
                  height={250}
                  className="w-full max-w-[200px] md:max-w-[250px] mx-auto"
                />
              </div>
            </div>
          </div>

          {/* Community Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            
            {/* Latest Success Stories */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#2F4157] flex items-center gap-2">
                  <Award size={20} className="text-[#E56668]" />
                  Success Stories
                </h3>
                <Link href="/stories" className="text-xs text-[#E56668] font-semibold hover:underline">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "Sarah M.", achievement: "Accepted to Oxford University", days: "2 days ago" },
                  { name: "Kevin L.", achievement: "LPDP Scholarship Winner", days: "1 week ago" },
                  { name: "Dina R.", achievement: "IELTS 8.5 Achievement", days: "2 weeks ago" }
                ].map((story, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                    <p className="font-semibold text-sm text-[#2F4157] mb-1">{story.name}</p>
                    <p className="text-xs text-gray-600">{story.achievement}</p>
                    <p className="text-xs text-gray-400 mt-1">{story.days}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#2F4157] flex items-center gap-2">
                  <Calendar size={20} className="text-[#E56668]" />
                  Community Events
                </h3>
                <Link href="/dashboard/events" className="text-xs text-[#E56668] font-semibold hover:underline">
                  See All
                </Link>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded">MON</span>
                    <p className="font-semibold text-sm text-[#2F4157]">Speaking Club</p>
                  </div>
                  <p className="text-xs text-gray-600">7:00 PM WIB • Online</p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-purple-600 text-white text-xs font-bold rounded">WED</span>
                    <p className="font-semibold text-sm text-[#2F4157]">Group Mentoring</p>
                  </div>
                  <p className="text-xs text-gray-600">8:00 PM WIB • Zoom</p>
                  {!isPro && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Crown size={10} /> Insider only
                    </span>
                  )}
                </div>
                
                <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded">SAT</span>
                    <p className="font-semibold text-sm text-[#2F4157]">Study Marathon</p>
                  </div>
                  <p className="text-xs text-gray-600">2:00 PM WIB • Discord</p>
                </div>
              </div>
            </div>

            {/* Learning Resources */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#2F4157] flex items-center gap-2">
                  <BookOpen size={20} className="text-[#E56668]" />
                  Shared Resources
                </h3>
              </div>
              
              <div className="space-y-3">
                <a href="#" className="block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <p className="font-semibold text-sm text-[#2F4157] mb-1">IELTS Writing Templates</p>
                  <p className="text-xs text-gray-600">Community-curated collection</p>
                </a>
                
                <a href="#" className="block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <p className="font-semibold text-sm text-[#2F4157] mb-1">Speaking Practice Partners</p>
                  <p className="text-xs text-gray-600">Find your study buddy</p>
                </a>
                
                <a href="#" className="block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors relative">
                  <p className="font-semibold text-sm text-[#2F4157] mb-1">Scholarship Database</p>
                  <p className="text-xs text-gray-600">Exclusive opportunities</p>
                  {!isPro && (
                    <Crown size={14} className="absolute top-3 right-3 text-gray-400" />
                  )}
                </a>
              </div>
            </div>
          </div>

          {/* Member Referral Program */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <Share2 size={24} />
                  Refer Friends, Earn Rewards
                </h2>
                <p className="text-white/90 leading-relaxed mb-4">
                  Invite friends to IELS and earn 1 month of free Insider access for every 3 successful referrals. Help grow our community while unlocking premium features!
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                    Get Referral Link
                  </button>
                  <span className="text-sm text-white/70">
                    You've referred: <strong className="text-white">0 members</strong>
                  </span>
                </div>
              </div>
              
              <div className="hidden md:block">
                <Target size={120} className="text-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Story Submission Modal */}
      {showStoryModal && (
        <div className="fixed inset-0 bg-[#2F4157]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 rounded-t-3xl z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-[#2F4157]">
                  Share Your Success Story
                </h3>
                <button
                  onClick={() => setShowStoryModal(false)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Inspire fellow learners by sharing your achievement!
              </p>
            </div>
            
            {storySubmitted ? (
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={40} className="text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-[#2F4157] mb-2">
                  Story Submitted! 🎉
                </h4>
                <p className="text-gray-600">
                  Thank you for sharing! Our team will review and publish your story soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleStorySubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Story Title <span className="text-[#E56668]">*</span>
                  </label>
                  <input
                    type="text"
                    value={storyForm.title}
                    onChange={(e) => setStoryForm({...storyForm, title: e.target.value})}
                    placeholder="e.g., How I Got Accepted to Oxford University"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E56668]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={storyForm.category}
                    onChange={(e) => setStoryForm({...storyForm, category: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E56668]"
                  >
                    <option value="">Select category</option>
                    <option value="scholarship">Scholarship Success</option>
                    <option value="university">University Admission</option>
                    <option value="ielts">IELTS Achievement</option>
                    <option value="career">Career Growth</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Your Story <span className="text-[#E56668]">*</span>
                  </label>
                  <textarea
                    value={storyForm.description}
                    onChange={(e) => setStoryForm({...storyForm, description: e.target.value})}
                    placeholder="Share your journey, challenges, and how IELS helped you achieve your goal..."
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E56668] resize-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Minimum 100 words. Be authentic and specific!
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-blue-900 mb-1">
                        What happens next?
                      </p>
                      <ul className="text-xs text-blue-800 space-y-1">
                        <li>• Your story will be reviewed by our team (2-3 business days)</li>
                        <li>• We may contact you for photo/additional details</li>
                        <li>• Once approved, it will be featured on IELS Insight</li>
                        <li>• You'll receive a notification when published</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowStoryModal(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#E56668] text-white rounded-xl font-bold hover:bg-[#C04C4E] transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    Submit Story
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Pricing Modal */}
      {showPricingModal && (
        <PricingModal onClose={() => setShowPricingModal(false)} />
      )}
    </DashboardLayout>
  );
}