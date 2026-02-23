"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ExternalLink,
  Crown,
  Rocket,
  AlertCircle,
  BookOpen,
  Target,
  Award,
  ChevronRight,
  Sparkles,
  Globe,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  User,
  Loader2,
  FileText
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- TYPES ---
type UserProfile = {
  full_name: string;
  email: string;
  avatar_url?: string;
  tier?: "explorer" | "insider" | "visionary";
};

type GIFRegistration = {
  id: string;
  phase1_status: 'open' | 'submitted';
  phase2_status: 'open' | 'submitted';
  lounge_status: 'open' | 'submitted';
  project_drive_link: string;
  essay_motivation: string;
  is_mentoring_participant: boolean;
};

export default function GIFDashboardPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [regData, setRegData] = useState<GIFRegistration | null>(null);

  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0];
  };

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/sign-in");
          return;
        }

        // 1. Fetch Extended Profile
        const { data: dbUser } = await supabase
          .from('users')
          .select('*, memberships(tier)')
          .eq('id', user.id)
          .single();

        const dbTier = dbUser?.memberships?.[0]?.tier || "explorer";
        const avatarUrl = dbUser?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture;

        const profile: UserProfile = {
          full_name: dbUser?.full_name || user.user_metadata?.full_name || "Learner",
          email: user.email || "",
          avatar_url: avatarUrl,
          tier: dbTier
        };
        setUserProfile(profile);

        // 2. Fetch Registration Data
        const { data, error } = await supabase
          .from('gif_registrations')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (!data) {
          const { data: newData } = await supabase
            .from('gif_registrations')
            .insert([{ 
                user_id: user.id,
                full_name: profile.full_name,
                email: profile.email,
                avatar_url: profile.avatar_url,
                phase1_status: 'open',
                phase2_status: 'open',
                lounge_status: 'open'
            }])
            .select()
            .single();
          setRegData(newData);
        } else {
          setRegData(data);
        }

      } catch (err) {
        console.error("Error init:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router, supabase]);

  const handlePhase1Click = async () => {
    window.open("https://forms.gle/EYGdX54TtvQvaaM89", "_blank");
    
    if (regData?.phase1_status !== 'submitted') {
      const { error } = await supabase
        .from('gif_registrations')
        .update({ 
          phase1_status: 'submitted', 
          phase1_submitted_at: new Date().toISOString() 
        })
        .eq('id', regData?.id);
        
      if (!error) setRegData(prev => prev ? ({ ...prev, phase1_status: 'submitted' }) : null);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Loader with new Accent Color */}
      <Loader2 className="w-10 h-10 animate-spin text-[#914D4D]" />
    </div>
  );

  const allRequirementsMet = regData?.is_mentoring_participant;

  return (
    <DashboardLayout 
      userTier={userProfile?.tier} 
      userName={userProfile?.full_name} 
      userAvatar={userProfile?.avatar_url}
    >
      <div className="max-w-7xl mx-auto pb-20 space-y-8 px-4 md:px-8 pt-8 font-geologica">
{/* === HERO SECTION === */}
        {/* Gradient Linear -> #2F4055 #914D4D #304156 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#2F4055] via-[#914D4D] to-[#304156] rounded-3xl shadow-2xl font-geologica">
          {/* Background Pattern */}
          <div className="absolute bg-[url('/images/contents/stories/member-stories/banner/singapore-banner.png')] bg-cover bg-center inset-0 opacity-10 mix-blend-overlay">
            {/* Blurs aligned with palette */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#914D4D] rounded-full blur-[120px] opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#304156] rounded-full blur-[120px] opacity-80"></div>
          </div>
          
          <div className="relative z-10 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              
              {/* --- LEFT CONTENT --- */}
              <div className="space-y-6">
                {/* Logos */}
                <div className="flex items-center gap-4">
                  <Image 
                    src="/images/logos/events/gif.png" 
                    alt="Global Impact Fellowship" 
                    width={140} 
                    height={50}
                    className="h-10 w-auto drop-shadow-lg brightness-0 invert opacity-100"
                  />
                  <div className="h-8 w-px bg-white/30"></div>
                  <div className="bg-white/10 px-3 py-1 rounded-full border border-white/20 text-xs font-bold text-white tracking-widest">
                    BATCH 1
                  </div>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                    Hello, {getFirstName(userProfile?.full_name || 'Learner')}! 👋
                  </h1>
                  <p className="text-white/90 text-lg leading-relaxed font-light">
                    Welcome to your <span className="font-bold text-[#FFD1D1]">GIF in Singapore 2026</span> application hub.
                    Prepare yourself for a transformative journey at NUS.
                  </p>
                </div>

                {/* Mentoring Badge */}
                {regData?.is_mentoring_participant && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-2 bg-[#914D4D] border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg"
                  >
                    <Crown className="w-4 h-4 fill-white" />
                    Mentoring Fast Track Active
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                  </motion.div>
                )}

                {/* Dynamic Stats Grid */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div className="text-center">
                    {(() => {
                      const deadline = new Date("2026-03-23T23:59:59");
                      const now = new Date();
                      const diffTime = deadline.getTime() - now.getTime();
                      const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                      
                      return (
                        <>
                          <div className="text-3xl font-black text-white">
                            {daysLeft > 0 ? daysLeft : 0}
                          </div>
                          <div className="text-[10px] md:text-xs text-white/70 uppercase tracking-widest font-semibold mt-1">Days Left</div>
                        </>
                      );
                    })()}
                  </div>
                  <div className="text-center border-l border-r border-white/10">
                    <div className="text-3xl font-black text-[#FFD1D1]">
                      {[regData?.phase1_status, regData?.phase2_status, regData?.lounge_status].filter(s => s === 'submitted').length}/3
                    </div>
                    <div className="text-[10px] md:text-xs text-white/70 uppercase tracking-widest font-semibold mt-1">Steps Done</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-white">20</div>
                    <div className="text-[10px] md:text-xs text-white/70 uppercase tracking-widest font-semibold mt-1">Fellows</div>
                  </div>
                </div>
              </div>

              {/* --- RIGHT VISUAL (SYMMETRICAL CARD) --- */}
              <div className="flex justify-center items-center h-full">
                <div className="relative w-full max-w-sm">
                  {/* Glassmorphism Card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#914D4D] to-[#304156] rounded-3xl blur-xl opacity-60"></div>
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl flex flex-col items-center text-center space-y-6">
                    
                    {/* Logo Centerpiece */}
                    
                       <Image 
                        src="/images/logos/events/gifsgp.png" 
                        alt="GIF Singapore Logo" 
                        width={180} 
                        height={60}
                        className="h-34 w-auto drop-shadow-2xl object-contain"
                      />
                   

                    {/* Divider */}
                    <div className="w-16 h-1 bg-[#914D4D] rounded-full"></div>

                    {/* Event Details */}
                    <div className="space-y-4 w-full">
                      <div className="flex items-center justify-between text-white border-b border-white/10 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#304156] p-2 rounded-lg">
                                <MapPin className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-medium">Location</span>
                        </div>
                        <span className="text-sm font-bold text-right">NUS, Singapore</span>
                      </div>

                      <div className="flex items-center justify-between text-white border-b border-white/10 pb-3">
                         <div className="flex items-center gap-3">
                            <div className="bg-[#304156] p-2 rounded-lg">
                                <Calendar className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-medium">Date</span>
                        </div>
                        <span className="text-sm font-bold text-right">5 - 12 May 2026</span>
                      </div>

                      <div className="flex items-center justify-between text-white">
                         <div className="flex items-center gap-3">
                            <div className="bg-[#304156] p-2 rounded-lg">
                                <Users className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-medium">Quota</span>
                        </div>
                        <span className="text-sm font-bold text-right">20 Fellows</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>{/* --- BOTTOM BANNER (DEADLINE & CTA) --- */}
            {/* 1. Ganti items-stretch jadi items-center agar align tengah secara vertikal */}
            <div className="mt-10 flex flex-col md:flex-row gap-4 items-center">
                
                {/* Deadline Info */}
                <div className="w-full md:flex-1 bg-[#304156]/40 rounded-2xl px-5 py-3 flex items-center gap-4 border border-white/10 backdrop-blur-sm">
                    <div className="bg-[#914D4D] p-2.5 rounded-xl shadow-lg animate-pulse flex-shrink-0">
                        <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="text-[#FFD1D1] text-[10px] md:text-xs font-bold uppercase tracking-wider mb-0.5">Administration Phase Deadline</div>
                        <div className="text-white font-black text-base md:text-xl leading-none">
                            March 23, 2026 
                            <span className="text-xs md:text-sm font-normal opacity-80 ml-1.5 align-middle">(23:59 WIB)</span>
                        </div>
                    </div>
                </div>

                {/* Read More Button */}
                <Link href="https://ielsco.com/events/gif" target="_blank" className="w-full md:w-auto">
                    {/* 2. Gunakan py-3, h-auto (bawaan), dan hapus h-full/min-h */}
                    <Button className="w-full md:w-auto py-3 px-8 rounded-2xl bg-white hover:bg-gray-100 text-[#304156] font-bold text-base shadow-xl hover:shadow-2xl transition-all group flex items-center justify-center">
                        Program Details
                        <ExternalLink className="w-5 h-5 ml-2 text-[#914D4D] group-hover:scale-110 transition-transform" />
                    </Button>
                </Link>
            </div>
          </div>
        </div>
        
        {/* === PROGRESS TRACKER === */}
        <div className="bg-white rounded-2xl border border-[#304156]/10 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#304156]">Your Application Progress</h2>
            <span className="text-sm text-gray-500">
              {[regData?.phase1_status, regData?.phase2_status, regData?.lounge_status].filter(s => s === 'submitted').length} of 3 steps completed
            </span>
          </div>
          
          <div className="relative">
            <div className="absolute top-5 left-8 right-8 h-1 bg-gray-100"></div>
            {/* Progress Bar Fill - Updated to #914D4D */}
            <div 
              className="absolute top-5 left-8 h-1 bg-[#914D4D] transition-all duration-500"
              style={{ 
                width: `calc(${([regData?.phase1_status, regData?.phase2_status, regData?.lounge_status].filter(s => s === 'submitted').length / 3) * 100}% - 4rem)` 
              }}
            ></div>
            
            <div className="relative flex justify-between items-start">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center w-24">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-2 transition-all",
                  regData?.phase1_status === 'submitted' ? "bg-[#914D4D]" : "bg-gray-200"
                )}>
                  {regData?.phase1_status === 'submitted' ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-white font-bold text-sm">1</span>
                  )}
                </div>
                <span className="text-xs font-medium text-[#304156]">Administration Data</span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center w-24">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-2 transition-all",
                  regData?.phase2_status === 'submitted' ? "bg-[#914D4D]" : "bg-gray-200"
                )}>
                  {regData?.phase2_status === 'submitted' ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-white font-bold text-sm">2</span>
                  )}
                </div>
                <span className="text-xs font-medium text-[#304156]">Essay & Project</span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center w-24">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-2 transition-all",
                  regData?.lounge_status === 'submitted' ? "bg-[#914D4D]" : "bg-gray-200"
                )}>
                  {regData?.lounge_status === 'submitted' ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-white font-bold text-sm">3</span>
                  )}
                </div>
                <span className="text-xs font-medium text-[#304156]">IELS Lounge</span>
              </div>
            </div>
          </div>
        </div>

        {/* === MAIN CARDS GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* CARD 1: ADMINISTRATION PHASE (Theme: NightFall Blue) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl border border-[#304156]/10 p-6 flex flex-col h-full hover:shadow-xl hover:border-[#304156]/30 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Top Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#304156]"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-[#304156] p-4 rounded-2xl shadow-lg">
                  <User className="w-7 h-7 text-white" />
                </div>
                {allRequirementsMet ? (
                  <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-green-100">
                    <CheckCircle className="w-3.5 h-3.5" /> Auto-Complete
                  </span>
                ) : regData?.phase1_status === 'submitted' ? (
                  <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-green-100">
                    <CheckCircle className="w-3.5 h-3.5" /> Submitted
                  </span>
                ) : (
                  <span className="bg-[#304156]/10 text-[#304156] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    Required
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-[#304156] mb-3">Administration Data</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Complete your biodata, academic background, and social engagement verification through our Google Form.
              </p>

              {/* What's Included */}
              <div className="bg-[#304156]/5 rounded-xl p-4 mb-6 border border-[#304156]/10">
                <div className="text-xs font-bold text-[#304156] mb-2 uppercase tracking-wide">What to Prepare:</div>
                <ul className="space-y-2 text-xs text-[#304156]/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>Personal & contact information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>University/institution verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>Social media proof</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto space-y-3">
                {allRequirementsMet ? (
                  <Button 
                    disabled
                    className="w-full py-5 rounded-xl font-bold bg-green-50 text-green-700 border-2 border-green-200 cursor-not-allowed"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completed via Mentoring
                  </Button>
                ) : (
                  <Button 
                    onClick={handlePhase1Click}
                    className={cn(
                      "w-full py-3 rounded-xl font-bold shadow-md hover:shadow-xl transition-all group relative overflow-hidden",
                      regData?.phase1_status === 'submitted' 
                        ? "bg-[#304156] hover:bg-[#2F4055] text-white"
                        : "bg-[#304156] hover:bg-[#2F4055] text-white"
                    )}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {regData?.phase1_status === 'submitted' ? "View Form Response" : "Fill Administration Form"} 
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          {/* CARD 2: ESSAY & PROJECT (Theme: Muted Red) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl border border-[#914D4D]/10 p-6 flex flex-col h-full hover:shadow-xl hover:border-[#914D4D]/30 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Top Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#914D4D]"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-[#914D4D] p-4 rounded-2xl shadow-lg">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                {allRequirementsMet ? (
                  <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-green-100">
                    <CheckCircle className="w-3.5 h-3.5" /> Auto-Complete
                  </span>
                ) : regData?.phase2_status === 'submitted' ? (
                  <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-green-100">
                    <CheckCircle className="w-3.5 h-3.5" /> Submitted
                  </span>
                ) : (
                  <span className="bg-[#914D4D]/10 text-[#914D4D] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    Required
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-[#2F4157] mb-3">Essay & Project Proposal</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Submit your motivation essay and SDG-focused project proposal. We'll guide you through every step!
              </p>

              {/* Features List */}
              <div className="bg-[#914D4D]/5 rounded-xl p-4 mb-6 border border-[#914D4D]/10">
                <div className="text-xs font-bold text-[#914D4D] mb-2 uppercase tracking-wide">What You'll Get:</div>
                <ul className="space-y-2 text-xs text-[#914D4D]">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>Essay writing frameworks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>Project proposal templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>SDG impact framework</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto">
                {allRequirementsMet ? (
                  <Button 
                    disabled
                    className="w-full py-3 rounded-xl font-bold bg-green-50 text-green-700 border-2 border-green-200 cursor-not-allowed"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completed via Mentoring
                  </Button>
                ) : (
                  <Link href="/dashboard/gif/essay-project" className="block">
                    <Button 
                      className="w-full py-3 rounded-xl font-bold bg-[#914D4D] hover:bg-[#7a3e3e] text-white shadow-md hover:shadow-xl transition-all group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {regData?.phase2_status === 'submitted' ? 'View Submission' : 'Start Submission'}
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>

          {/* CARD 3: IELS LOUNGE (Theme: Gradient #2F4055 -> #914D4D) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl border border-[#2F4055]/20 p-6 flex flex-col h-full hover:shadow-xl hover:border-[#2F4055]/40 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Top Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2F4055] to-[#914D4D]"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-gradient-to-br from-[#2F4055] to-[#914D4D] p-4 rounded-2xl shadow-lg">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                {allRequirementsMet ? (
                  <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-green-100">
                    <CheckCircle className="w-3.5 h-3.5" /> Auto-Complete
                  </span>
                ) : regData?.lounge_status === 'submitted' ? (
                  <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-green-100">
                    <CheckCircle className="w-3.5 h-3.5" /> Enrolled
                  </span>
                ) : (
                  <span className="bg-[#2F4055]/10 text-[#2F4055] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    Required
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-[#2F4157] mb-3">IELS Lounge Access</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Test your English proficiency and get free learning resources. Required for all GIF applicants.
              </p>

              {/* Price Banner */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4 border-2 border-dashed border-[#914D4D]/20">
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <div className="text-xs text-[#304156] font-medium">Special GIF Price</div>
                    <div className="text-2xl font-black text-[#914D4D]">Rp 50.000</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 line-through">Rp 100.000</div>
                    <div className="text-sm font-bold text-green-600">Save 50%!</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-2 text-center border border-gray-200">
                  <div className="text-xs text-gray-500 font-medium mb-1">Use Promo Code</div>
                  <div className="font-mono font-black text-lg text-[#304156] tracking-wider">GIFSG</div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-xl p-4 mb-6 border border-gray-100">
                <div className="text-xs font-bold text-[#304156] mb-2 uppercase tracking-wide">What's Included:</div>
                <ul className="space-y-2 text-xs text-gray-600">
                  <li className="flex items-start gap-2">
                    <Award className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#914D4D]" />
                    <span>3 months full access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#914D4D]" />
                    <span>Free learning materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#914D4D]" />
                    <span>English proficiency assessment</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto">
                {allRequirementsMet ? (
                  <Button 
                    disabled
                    className="w-full py-5 rounded-xl font-bold bg-green-50 text-green-700 border-2 border-green-200 cursor-not-allowed"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Completed via Mentoring
                  </Button>
                ) : (
                  <Button 
                    onClick={() => window.open("https://ielsco.myr.id/m/iels-lounge-premium", "_blank")}
                    className="w-full py-3 rounded-xl font-bold bg-gradient-to-br from-[#2F4055] to-[#914D4D] hover:to-gradient-to-br from-[#2F4055] to-[#914D4D]/90 text-white shadow-md hover:shadow-xl transition-all group"
                  >
                    <span className="flex items-center justify-center">
                      {regData?.lounge_status === 'submitted' ? 'Access Lounge' : 'Enroll Now (Rp 50k)'}
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

        </div>

  {/* === MENTORING UPSELL (FULL WIDTH) === */}
        {!regData?.is_mentoring_participant && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden bg-gradient-to-br from-[#2F4055] via-[#914D4D] to-[#304156] rounded-3xl shadow-2xl mt-12 font-geologica"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#914D4D] rounded-full blur-[120px] opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#304156] rounded-full blur-[120px] opacity-30"></div>
              {/* Optional: Add a subtle texture/pattern if available, otherwise rely on gradient */}
            </div>

            {/* Rocket Illustration (Optional - Positioned absolutely to not mess with grid) */}
            <div className="absolute top-0 right-0 opacity-5 pointer-events-none hidden xl:block">
              <Rocket className="w-96 h-96 text-white transform translate-x-1/4 -translate-y-1/4 rotate-45" />
            </div>

            <div className="relative z-10 p-8 md:p-12">
              
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 bg-[#914D4D]/90 backdrop-blur-sm border border-white/10 px-4 py-1.5 rounded-full mb-8 shadow-lg">
                <Crown className="w-4 h-4 text-[#FFD1D1]" />
                <span className="text-white font-bold text-xs md:text-sm tracking-wide uppercase">Recommended Program</span>
                <Sparkles className="w-4 h-4 text-[#FFD1D1] animate-pulse" />
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                
                {/* --- LEFT COLUMN: Headline & Quick Benefits --- */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                      Want to Maximize <br/> Your Chances? 🚀
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                      Join <span className="font-bold text-[#FFD1D1] border-b-2 border-[#FFD1D1]/30">Project Prep Mentoring</span> to get direct feedback from GIF Founders and unlock <span className="font-bold text-white bg-white/10 px-2 rounded-md">Fast Track Status</span>.
                    </p>
                  </div>

                  {/* 4-Grid Feature Icons */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Target, title: "Expert Review", desc: "Founder feedback" },
                      { icon: Award, title: "Fast Track", desc: "Priority review" },
                      { icon: CheckCircle, title: "Auto-Complete", desc: "All requirements" },
                      { icon: Users, title: "Community", desc: "Fellow support" }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 transition-colors group">
                        <item.icon className="w-6 h-6 text-[#FFD1D1] mb-3 group-hover:scale-110 transition-transform" />
                        <div className="text-white font-bold text-base">{item.title}</div>
                        <div className="text-white/60 text-xs">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* --- RIGHT COLUMN: Program Details Card --- */}
                <div className="relative">
                  {/* Decorative Glow behind card */}
                  <div className="absolute inset-0 bg-white/5 blur-2xl transform rotate-3 rounded-3xl"></div>
                  
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
                    
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                           Program Includes:
                           <div className="h-px flex-1 bg-white/20"></div>
                        </h3>
                        <ul className="space-y-4">
                          {[
                            "5-session structured mentoring sessions",
                            "1-on-1 project proposal review",
                            "Exclusive resources & templates",
                            "Recording access for all sessions"
                          ].map((text, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="bg-[#914D4D] rounded-full p-1 mt-0.5">
                                <CheckCircle className="w-3 h-3 text-white" />
                              </div>
                              <span className="text-white/90 text-sm md:text-base font-medium">{text}</span>
                            </li>
                          ))}
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
                      <Button 
                        onClick={() => window.open("https://forms.gle/D4DMBFshr1JeydZC9", "_blank")}
                        className="flex-1 py-3 rounded-xl font-bold bg-white text-[#304156] hover:bg-gray-100 shadow-xl hover:shadow-white/20 transition-all text-base"
                      >
                        Apply Now
                        <ExternalLink className="w-4 h-4 ml-2 text-[#914D4D]" />
                      </Button>
                      
                      
                     <Link href="/events/gif/mentoring" className="flex-1">
                        <Button 
                          
                          className="w-full py-3 rounded-xl font-bold border-2 border-white/20 text-white hover:bg-white/10 transition-all text-base"
                        >
                          Learn More
                        </Button>
                      </Link>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
        {/* === HELPDESK FOOTER === */}
        <div className="bg-white rounded-2xl border border-[#304156]/10 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#304156]/5 p-3 rounded-xl">
                <AlertCircle className="w-6 h-6 text-[#304156]" />
              </div>
              <div>
                <h4 className="font-bold text-[#304156] text-lg">Need Help?</h4>
                <p className="text-sm text-gray-600">Our team is ready to assist with any registration issues.</p>
              </div>
            </div>
            
            <Link href="https://wa.me/6288297253491" target="_blank">
              {/* Contact Button using NightFall Blue */}
              <Button className="px-6 py-3 bg-[#304156] hover:bg-[#2F4055] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Contact via WhatsApp
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}