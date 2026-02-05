"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  PlayCircle, 
  CalendarDays, 
  FileText, 
  ArrowRight, 
  GraduationCap,
  Download,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Lock
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createBrowserClient } from "@supabase/ssr";

// --- INTERFACES ---

interface ActiveLearningItem {
  id: string;
  title: string;
  type: "course" | "test";
  progress: number; // 0-100
  nextTask: string;
  thumbnail: string; // Gradient color class or image URL
  link: string;
}

// --- MOCK DATA (Active Learning) ---
const ACTIVE_LEARNING: ActiveLearningItem[] = [
  {
    id: "1",
    title: "IELTS Speaking Masterclass",
    type: "course",
    progress: 45,
    nextTask: "Module 3: Fluency & Coherence",
    thumbnail: "bg-[#E56668]",
    link: "/dashboard/courses/ielts-speaking"
  },
  {
    id: "2",
    title: "Prediction Test Batch 5",
    type: "test",
    progress: 100,
    nextTask: "View Analysis Report",
    thumbnail: "from-[#E56668] to-orange-500",
    link: "/dashboard/test/ielts/result/123"
  }
];

export default function LearningSpacePage() {
  const [userData, setUserData] = useState({ name: "", avatar: "", tier: "basic" });
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserData({
          name: user.user_metadata.full_name || "Member",
          avatar: user.user_metadata.avatar_url,
          tier: "basic" 
        });
      }
      setLoading(false);
    };
    fetchUser();
  }, [supabase]);

  return (
    <DashboardLayout userName={userData.name} userAvatar={userData.avatar} userTier={userData.tier as any}>
      <div className="min-h-screen bg-[#F7F8FA] pb-20">
        
        {/* === HERO SECTION (Personalized) === */}
        <div className="bg-[#2F4157] text-white pt-10 pb-24 px-4 lg:px-12 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E56668]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-[#E56668] font-bold text-sm tracking-wider uppercase mb-2">
                  <Sparkles size={16} />
                  My Learning Space
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold font-geologica mb-3">
                  Welcome back, {userData.name.split(" ")[0]}! 👋
                </h1>
                <p className="text-gray-300 max-w-xl text-lg leading-relaxed">
                  Ready to continue your progress? You have <strong className="text-white">2 active activities</strong> waiting for you today.
                </p>
              </div>
              
              {/* Quick Action Button */}
              <Link 
                href="/dashboard/goals"
                className="hidden md:flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 rounded-xl transition-all font-medium"
              >
                <CheckCircle2 size={18} className="text-[#E56668]" />
                View My Goals
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-12 -mt-16 relative z-20 space-y-12">
          
          {/* === SECTION 1: ACTIVE LEARNING TRACKER === */}
          {/* Ini adalah section "Apa yang user SUDAH beli/join" */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#2F4157]">Continue Learning</h2>
              <Link href="/dashboard/library" className="text-sm font-medium text-gray-500 hover:text-[#E56668] flex items-center gap-1 transition-colors">
                View All Library <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ACTIVE_LEARNING.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4">
                    {/* Thumbnail Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.thumbnail} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                      {item.type === 'course' ? <PlayCircle size={28} /> : <FileText size={28} />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 inline-block ${
                          item.type === 'course' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                        }`}>
                          {item.type}
                        </span>
                        {item.progress === 100 && <CheckCircle2 size={16} className="text-green-500" />}
                      </div>
                      
                      <h3 className="font-bold text-[#2F4157] line-clamp-1 group-hover:text-[#E56668] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {item.nextTask}
                      </p>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-[10px] font-semibold text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.type === 'course' ? 'bg-blue-500' : 'bg-orange-500'}`} 
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Link href={item.link} className="absolute inset-0" />
                </motion.div>
              ))}

              {/* Empty Slot / Upsell */}
              <div className="bg-gray-50 rounded-2xl p-5 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center hover:border-[#E56668]/30 hover:bg-[#E56668]/5 transition-all group cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-400 mb-3 group-hover:text-[#E56668] group-hover:scale-110 transition-all shadow-sm">
                  <BookOpen size={20} />
                </div>
                <h3 className="text-sm font-bold text-gray-600 group-hover:text-[#E56668]">Add New Goal</h3>
                <p className="text-xs text-gray-400 mt-1">Explore new skills to learn</p>
                <Link href="/dashboard/shop" className="absolute inset-0" />
              </div>
            </div>
          </section>

          {/* === SECTION 2: EXPLORE THE ECOSYSTEM (The 4 Pillars) === */}
          {/* Ini adalah inti request kamu: Portal ke 4 produk IELS */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[#2F4157] font-geologica">The IELS Ecosystem</h2>
              <p className="text-gray-500 mt-2">Everything you need to grow, perform, and access global opportunities.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* 1. IELS TEST */}
              <EcosystemCard 
                title="IELS Test"
                description="Take official simulation tests for IELTS, TOEFL, & TOEIC with AI Scoring."
                icon={FileText}
                color="bg-[#E56668]" // IELS Red
                href="/dashboard/test"
                stats="AI Scoring Available"
              />

              {/* 2. IELS COURSES */}
              <EcosystemCard 
                title="IELS Courses"
                description="Structured learning paths guided by expert mentors to boost your skills."
                icon={GraduationCap}
                color="bg-[#E56668]"
                href="/dashboard/courses"
                stats="12+ Active Courses"
              />

              {/* 3. IELS RESOURCES */}
              <EcosystemCard 
                title="IELS Resources"
                description="Access premium e-books, templates, and recorded masterclass sessions."
                icon={Download}
                color="bg-[#E56668]"
                href="/dashboard/resources"
                stats="Digital Library"
              />

              {/* 4. IELS EVENTS */}
              <EcosystemCard 
                title="IELS Events"
                description="Join webinars, workshops, and speaking clubs to network globally."
                icon={CalendarDays}
                color="bg-[#E56668]" // IELS Navy
                href="/dashboard/events"
                stats="Live Every Week"
              />

            </div>
          </section>

 {/* === SECTION 3: GLOBAL IMPACT FELLOWSHIP (GIF) === */}
          <section className="bg-white rounded-[32px] p-8 lg:p-12 border border-[#CDC6BC]/40 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-80 h-full bg-[#F6F3EF] skew-x-12 translate-x-20 transition-transform group-hover:translate-x-10 duration-700" />
             
             <div className="relative z-10 flex-1">
                <div className="flex items-center gap-2 text-[#CB2129] font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                   <Sparkles size={14} />
                   Flagship Program
                </div>
                <h3 className="text-3xl font-black text-[#304156] mb-4 font-geologica tracking-tighter">Global Impact Fellowship 2026</h3>
                <p className="text-gray-500 mb-8 max-w-lg leading-relaxed text-lg">
                   Elevate your academic journey with an exclusive fellowship trip to the National University of Singapore (NUS) and global industry leaders.
                </p>
                <div className="flex flex-wrap gap-4">
                   <Link href="/dashboard/events/gif-sg" className="px-8 py-3.5 bg-[#CB2129] text-white rounded-xl font-bold hover:bg-[#A81B22] transition-all shadow-lg hover:shadow-red-900/20">
                      Explore Fellowship
                   </Link>
                   <Link href="/dashboard/events" className="px-8 py-3.5 bg-white border border-[#CDC6BC] text-[#304156] rounded-xl font-bold hover:bg-[#F6F3EF] transition-all">
                      More Events
                   </Link>
                </div>
             </div>

             {/* Banner GIF Logo */}
             <div className="relative z-10 w-full lg:w-[400px] aspect-[16/9] bg-white rounded-2xl overflow-hidden flex items-center justify-center border border-[#CDC6BC]/50 shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                <img 
                   src="/images/logos/events/gifsg.png" 
                   alt="Global Impact Fellowship"
                   className="w-full h-full object-contain p-8"
                />
             </div>
          </section>

        </div>
      </div>
    </DashboardLayout>
  );
}

// --- SUB-COMPONENT: ECOSYSTEM CARD ---

function EcosystemCard({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  href,
  stats
}: { 
  title: string, 
  description: string, 
  icon: any, 
  color: string, 
  href: string,
  stats: string
}) {
  return (
    <Link href={href} className="group h-full">
      <div className="bg-white h-full rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col">
        
        {/* Top Accent Line */}
        <div className={`absolute top-0 left-0 w-full h-1 ${color}`} />
        
        {/* Icon Blob */}
        <div className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center text-white shadow-md mb-6 group-hover:scale-110 transition-transform duration-300`}>
           <Icon size={28} />
        </div>

        <h3 className="text-xl font-bold text-[#2F4157] mb-3 group-hover:text-[#E56668] transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
          {description}
        </p>

        {/* Footer info */}
        <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50 px-2 py-1 rounded-md">
             {stats}
           </span>
           <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#E56668] group-hover:text-white transition-all">
              <ArrowRight size={14} />
           </div>
        </div>
      </div>
    </Link>
  )
}