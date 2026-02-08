"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createBrowserClient } from "@supabase/ssr";
import {
  MessageCircle,
  Users,
  Award,
  Crown,
  Lock,
  Sparkles,
  Heart,
  ExternalLink,
  X,
  Plus,
  ArrowRight,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PricingModal from "@/components/subscription/PricingModal";
import { memberStoriesData } from "@/data/member-stories";
import { generateSlug } from "@/utils/slug";
import { motion } from "framer-motion";

// --- TIPE DATA ---
type UserTier = "explorer" | "insider" | "visionary";

export default function CommunityPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [userData, setUserData] = useState<{
    id: string;
    name: string;
    email: string;
    tier: UserTier;
    avatar: string;
  }>({ 
    id: "", 
    name: "", 
    email: "", 
    tier: "explorer", // Default
    avatar: "" 
  });

  const [loading, setLoading] = useState(true);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [counts, setCounts] = useState({ members: 0, stories: 0, careers: 0, abroad: 0 });

  // 1. Data Initialization & Auth
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

      // --- LOGIC MAPPING TIER BARU ---
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
        email: user.email || "",
        tier: uiTier,
        avatar: user.user_metadata?.avatar_url || ""
      });
      setLoading(false);
    };
    initData();
  }, [router, supabase]);

  // 2. Count-up animation
  useEffect(() => {
    if (loading) return;
    const targets = { members: 2800, stories: 110, careers: 35, abroad: 13 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setCounts({
        members: Math.floor(targets.members * progress),
        stories: Math.floor(targets.stories * progress),
        careers: Math.floor(targets.careers * progress),
        abroad: Math.floor(targets.abroad * progress)
      });
      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [loading]);

  const weeklyActivities = [
    {
      day: "Monday",
      title: "Speaking Class",
      time: "19:00 WIB",
      desc: "Practice session with a dedicated mentor to improve fluency and pronunciation.",
      color: "bg-[#CB2129]",
      icon: <Users size={20} />,
      gCalLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=IELS+Speaking+Class"
    },
    {
      day: "Wednesday",
      title: "Daily Conversation Club",
      time: "20:00 WIB",
      desc: "Master real-life English! Topic-based practice for daily natural speaking.",
      color: "bg-[#304156]",
      icon: <MessageCircle size={20} />,
      gCalLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=IELS+Conversation+Club"
    },
    {
      day: "Friday",
      title: "Open Thought Discussion",
      time: "19:30 WIB",
      desc: "A free-talk session to share your thoughts and critical thinking in English.",
      color: "bg-[#577E90]",
      icon: <Sparkles size={20} />,
      gCalLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=IELS+Free+Talk"
    },
    {
      day: "Saturday",
      title: "Talk Room: Community Spotlight",
      time: "14:00 WIB",
      desc: "Empowering our members. Hear real stories and insights from fellow IELS students.",
      color: "bg-[#553223]", // Warna cokelat/krem biar beda
      icon: <Award size={20} />, // Ganti icon jadi Award
      gCalLink: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=IELS+Talk+Room"
    }
  ];

  if (loading) {
    return (
      <DashboardLayout userTier="explorer" userName="Loading..." userAvatar="">
        <div className="p-12 flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB2129]"></div>
        </div>
      </DashboardLayout>
    );
  }

  // Helper Logic
  const isExplorer = userData.tier === "explorer";
  const hasPremiumAccess = userData.tier === "insider" || userData.tier === "visionary";

  return (
    <DashboardLayout userTier={userData.tier} userName={userData.name} userAvatar={userData.avatar}>
      <div className="min-h-screen bg-[#FAFAFA]">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#2F4157] via-[#3a4f66] to-[#2F4157] text-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-semibold mb-6 border border-white/20">
                <Users size={16} />
                IELS Community Hub
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Learn, Empower, Inspire Together
              </h1>
              <p className="text-white/80 text-lg">
                Join thousands of ambitious learners on their journey to global opportunities
              </p>
            </div>

            {/* Stats Counter */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {counts.members.toLocaleString()}+
                </div>
                <div className="text-sm text-white/60 uppercase tracking-wider font-semibold">Members</div>
                <div className="text-xs text-white/50 mt-1">Active learners worldwide</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {counts.stories}+
                </div>
                <div className="text-sm text-white/60 uppercase tracking-wider font-semibold">Winning Stories</div>
                <div className="text-xs text-white/50 mt-1">National & international achievements</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {counts.careers}+
                </div>
                <div className="text-sm text-white/60 uppercase tracking-wider font-semibold">Global Careers</div>
                <div className="text-xs text-white/50 mt-1">Remote work & internships abroad</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {counts.abroad}+
                </div>
                <div className="text-sm text-white/60 uppercase tracking-wider font-semibold">Study Abroad</div>
                <div className="text-xs text-white/50 mt-1">International study journeys</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-12 py-12">
          
          {/* Main Layout Grid */}
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Content: Activities & Channels */}
            <div className="flex-1 space-y-16">
              
              {/* Weekly Segments Section */}
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-[#304156]">Weekly Activity Segments</h2>
                  <div className="h-px flex-1 mx-6 bg-[#CDC6BC]/40 hidden md:block" />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {weeklyActivities.map((act, idx) => (
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      key={idx} 
                      className="group relative bg-white border border-[#CDC6BC]/30 p-6 rounded-2xl hover:shadow-xl transition-all overflow-hidden"
                    >
                      <div className={cn("absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 transition-transform group-hover:scale-150", act.color)} />
                      <div className="flex items-start justify-between mb-4">
                        <div className={cn("p-3 rounded-xl text-white shadow-lg", act.color)}>
                          {act.icon}
                        </div>
                        <span className="text-xs font-bold text-[#577E90] bg-[#F6F3EF] px-2 py-1 rounded italic">{act.day}</span>
                      </div>
                      <h4 className="text-lg font-bold text-[#304156] mb-1">{act.title}</h4>
                      <p className="text-[#CB2129] text-xs font-bold mb-3">{act.time}</p>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6">{act.desc}</p>
                      
                      <a 
                        href={act.gCalLink} 
                        target="_blank" 
                        className="flex items-center gap-2 text-xs font-bold text-[#304156] hover:text-[#CB2129] transition-colors"
                      >
                        <Bell size={14} />
                        Add to Google Calendar
                      </a>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Channels Section */}
              <section className="grid md:grid-cols-2 gap-6">
                <div className="p-8 bg-[#5865F2] rounded-3xl text-white shadow-xl relative overflow-hidden group">
                  <MessageCircle className="absolute -bottom-6 -right-6 text-white/10 w-32 h-32 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-2">Discord Global Server</h3>
                  <p className="text-white/80 text-sm mb-6">Free for all members. Resource sharing and general discussions.</p>
                  <a href="https://s.id/Lounge-DC" target="_blank" className="inline-flex items-center gap-2 bg-white text-[#5865F2] px-6 py-2.5 rounded-xl font-bold hover:bg-gray-100 transition-all">
                    Open Discord <ExternalLink size={16} />
                  </a>
                </div>

                <div className="p-8 bg-[#25D366] rounded-3xl text-white shadow-xl relative overflow-hidden group">
                  <Lock className="absolute -bottom-6 -right-6 text-white/10 w-32 h-32" />
                  <h3 className="text-2xl font-bold mb-2">WhatsApp Inner Circle</h3>
                  <p className="text-white/80 text-sm mb-6">Exclusive access for Insider & Visionary members. Priority mentoring and networking.</p>
                  <button onClick={() => !hasPremiumAccess && setShowPricingModal(true)} className="inline-flex items-center gap-2 bg-white text-[#25D366] px-6 py-2.5 rounded-xl font-bold hover:bg-gray-100 transition-all">
                    {hasPremiumAccess ? "Join Group" : "Unlock Access"} <Crown size={16} />
                  </button>
                </div>
              </section>
            </div>

            {/* ===== RIGHT SIDEBAR ===== */}
            <aside className="lg:w-1/3 space-y-8">
              <div className="sticky top-24 space-y-8">
                
                {/* 1. Member Spotlight Section */}
                <div className="bg-[#F6F3EF] p-6 rounded-3xl border border-[#CDC6BC]/40 shadow-sm">
                  <Image
                    src="/images/contents/general/iels_insight.png"
                    alt="IELS Insight"
                    width={180}
                    height={40}
                    className="mb-6"
                  />
                  <h3 className="text-xl font-bold text-[#304156] mb-6 border-b border-[#CDC6BC] pb-4">
                    Member Spotlight
                  </h3>

                  <div className="space-y-6">
                    {memberStoriesData.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-start group">
                        <div className="relative w-[80px] h-[80px] rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                          <Image
                            src={item.author.avatar}
                            alt={item.author.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                          <p className="text-[10px] font-black uppercase text-[#CB2129] tracking-widest">
                            {item.location}
                          </p>
                          <p className="font-bold text-[#304156] leading-tight line-clamp-2 text-sm group-hover:text-[#CB2129] transition-colors">
                            {item.title}
                          </p>
                          <Link
                            href={`https://ielsco.com/stories/${generateSlug(item.title)}`}
                            target="_blank"
                            className="text-[10px] font-bold text-[#577E90] hover:underline mt-1 flex items-center gap-1"
                          >
                            Read More <ArrowRight size={10} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="https://ielsco.com/stories"
                    target="_blank"
                    className="mt-8 flex items-center justify-center gap-2 w-full py-3 bg-[#304156] text-white rounded-xl font-bold text-xs hover:bg-[#253344] transition-all"
                  >
                    Explore All Stories
                  </Link>
                </div>

                {/* 2. Compact Share Your Story Section */}
                <div className="bg-[#CB2129] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
                  <Sparkles className="absolute -top-4 -right-4 text-white/20 w-20 h-20 rotate-12 group-hover:scale-110 transition-transform" />
                  
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                      <Heart size={18} fill="white" />
                      Share Your Journey
                    </h3>
                    <p className="text-white/80 text-xs leading-relaxed mb-6">
                      Did you ace your IELTS or get a scholarship? Inspire 2,800+ members by sharing your story!
                    </p>

                    <button
                      onClick={() => setShowStoryModal(true)}
                      className="w-full py-3 bg-white text-[#CB2129] rounded-xl font-bold text-sm hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <Plus size={16} />
                      Submit Story
                    </button>
                  </div>
                </div>

              </div>
            </aside>
            
          </div>
        </div>
      </div>

      {/* Reusable Modals */}
      {showStoryModal && (
        <div className="fixed inset-0 bg-[#304156]/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[32px] max-w-xl w-full p-8 shadow-2xl relative"
          >
            <button onClick={() => setShowStoryModal(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
            <h3 className="text-2xl font-bold text-[#304156] mb-2">Inspire the Community</h3>
            <p className="text-gray-500 mb-8">Share your learning journey and get featured on IELS Insight.</p>
            
            <form className="space-y-4">
               <div>
                 <label className="text-xs font-black uppercase tracking-widest text-[#577E90] block mb-2">Story Title</label>
                 <input type="text" placeholder="How I landed my first scholarship..." className="w-full bg-[#F6F3EF] border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#CB2129]" />
               </div>
               <div>
                 <label className="text-xs font-black uppercase tracking-widest text-[#577E90] block mb-2">Description</label>
                 <textarea rows={4} className="w-full bg-[#F6F3EF] border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#CB2129] resize-none" />
               </div>
               <button type="button" onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdpfik-xAviTLsauSN_h4yVI-Af19ydbRC6-nM0QGDmuPEWIA/viewform')} className="w-full bg-[#CB2129] text-white py-4 rounded-xl font-bold shadow-lg shadow-red-900/20 hover:bg-[#A81B22] transition-all">
                  Proceed to Official Form
               </button>
            </form>
          </motion.div>
        </div>
      )}

      {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}
    </DashboardLayout>
  );
}