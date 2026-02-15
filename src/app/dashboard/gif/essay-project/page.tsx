"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Lock,
  FileText,
  ArrowLeft,
  Upload,
  Info,
  AlertCircle,
  Download,
  BookOpen,
  Target,
  Lightbulb,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from "lucide-react";

// UI Components
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


export default function EssayProjectPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [regData, setRegData] = useState<any>(null);
  
  // Form States
  const [driveLink, setDriveLink] = useState("");
  const [essay, setEssay] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Accordion states
  const [essayGuideOpen, setEssayGuideOpen] = useState(true);
  const [projectGuideOpen, setProjectGuideOpen] = useState(false);

  // DEADLINE LOGIC: April 11, 2026
  const DEADLINE = new Date("2026-04-11T23:59:59");
  const now = new Date();
  const isPastDeadline = now > DEADLINE;

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/login");
          return;
        }

        // 1. Fetch User Profile & Tier (For Dashboard Layout)
        const { data: dbUser } = await supabase
          .from('users')
          .select('*, memberships(tier)')
          .eq('id', user.id)
          .single();

        const dbTier = dbUser?.memberships?.[0]?.tier || "explorer";
        const avatarUrl = dbUser?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture;

        setUserProfile({
          full_name: dbUser?.full_name || user.user_metadata?.full_name || "Learner",
          email: user.email || "",
          avatar_url: avatarUrl,
          tier: dbTier
        });

        // 2. Fetch Registration Data
        const { data } = await supabase
          .from('gif_registrations')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (data) {
          setRegData(data);
          setDriveLink(data.project_drive_link || "");
          setEssay(data.essay_motivation || "");
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router, supabase]);

  const handleSubmit = async () => {
    if (isPastDeadline) {
        alert("The submission deadline (April 11th) has passed. Updates are no longer accepted.");
        return;
    }

    // Validation
    if (!driveLink.trim()) {
      alert("Please enter your Google Drive link");
      return;
    }
    if (!essay.trim()) {
      alert("Please enter your motivation essay");
      return;
    }
    if (!driveLink.includes("drive.google.com") && !driveLink.includes("docs.google.com")) {
      alert("Please enter a valid Google Drive or Google Docs link");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('gif_registrations')
        .update({
          project_drive_link: driveLink,
          essay_motivation: essay,
          phase2_status: 'submitted',
          phase2_submitted_at: new Date().toISOString()
        })
        .eq('id', regData?.id);

      if (!error) {
        setRegData((prev: any) => ({ ...prev, phase2_status: 'submitted' }));
        alert("✅ Project and essay updated successfully!");
      } else {
        alert("Error submitting. Please try again.");
      }
    } catch (err) {
      alert("Error submitting. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#914D4D]"></div>
      </div>
    );
  }

  const isSubmitted = regData?.phase2_status === 'submitted';
  const isAutoComplete = regData?.is_mentoring_participant;

  return (
    <DashboardLayout 
      userTier={userProfile?.tier} 
      userName={userProfile?.full_name} 
      userAvatar={userProfile?.avatar_url}>
      <div className="max-w-5xl mx-auto pb-20 space-y-8 px-4 md:px-8 pt-6 font-geologica">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/gif">
            <Button className="rounded-xl bg-white text-[#304156] border border-[#304156]/20 hover:bg-[#304156]/5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Hero Section - Updated Gradient */}
        {/* Gradient Linear -> #2F4055 #914D4D #304156 */}
        <div className="bg-gradient-to-br from-[#2F4055] via-[#914D4D] to-[#304156] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          {/* Subtle Background Blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#914D4D] rounded-full blur-[100px] opacity-50"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-3 rounded-2xl">
                <FileText className="w-8 h-8" />
              </div>
              {isAutoComplete ? (
                <span className="bg-green-400/90 text-[#304156] px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                  Auto-Completed via Mentoring
                </span>
              ) : isSubmitted ? (
                <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-green-100">
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  Submitted
                </span>
              ) : (
                <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold">
                  Step 2 of 3
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black mb-3">Essay & Project Proposal</h1>
            <p className="text-white/90 text-lg max-w-2xl">
              This page provides comprehensive guidance to help you craft a compelling motivation essay 
              and a solid SDG-focused project proposal. Follow the frameworks below!
            </p>
          </div>
        </div>

        {/* Auto-Complete Notice */}
        {isAutoComplete && (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-green-900 text-lg mb-2">Requirements Automatically Met</h3>
                <p className="text-green-800 text-sm leading-relaxed">
                  As a mentoring participant, your essay and project proposal submissions are handled 
                  through the mentoring dashboard. You don't need to submit anything here.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ESSAY GUIDE SECTION - Theme: NightFall Blue */}
        <div className="bg-white rounded-2xl border border-[#304156]/20 overflow-hidden shadow-sm">
          <button
            onClick={() => setEssayGuideOpen(!essayGuideOpen)}
            className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#304156]/10 p-2 rounded-lg">
                <BookOpen className="w-5 h-5 text-[#304156]" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold text-[#304156]">Motivation Essay Guidelines</h2>
                <p className="text-sm text-gray-500">Complete framework for writing your essay</p>
              </div>
            </div>
            {essayGuideOpen ? <ChevronUp className="w-5 h-5 text-[#304156]" /> : <ChevronDown className="w-5 h-5 text-[#304156]" />}
          </button>

          {essayGuideOpen && (
            <div className="px-6 pb-6 space-y-6">
              <div className="h-px bg-gray-200"></div>

              {/* Format Requirements */}
              <div className="bg-[#304156]/5 rounded-xl p-6 border border-[#304156]/10">
                <h3 className="font-bold text-[#304156] mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Format Requirements
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#914D4D] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-[#304156]">Font:</span>
                        <span className="text-[#304156]/80"> Times New Roman or Arial</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#914D4D] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-[#304156]">Font Size:</span>
                        <span className="text-[#304156]/80"> 12pt</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#914D4D] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-[#304156]">Line Spacing:</span>
                        <span className="text-[#304156]/80"> 1.5 or Double</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#914D4D] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-[#304156]">Margins:</span>
                        <span className="text-[#304156]/80"> 1 inch (2.54 cm) all sides</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#914D4D] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-[#304156]">Length:</span>
                        <span className="text-[#304156]/80"> Maximum 2 pages</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#914D4D] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-[#304156]">Alignment:</span>
                        <span className="text-[#304156]/80"> Justify or Left-aligned</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Essay Structure */}
              <div>
                <h3 className="font-bold text-[#304156] mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#914D4D]" />
                  Recommended Essay Structure
                </h3>
                
                <div className="space-y-4">
                  {/* Introduction */}
                  <div className="border border-gray-200 rounded-xl p-5 hover:border-[#914D4D] transition group">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#914D4D] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md">
                        1
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#304156] mb-2 group-hover:text-[#914D4D] transition-colors">Introduction: Hook & Background</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Start with a compelling opening that grabs attention. Share a brief personal story or observation 
                          that sparked your interest in social impact.
                        </p>
                        <div className="bg-[#304156]/5 rounded-lg p-3 text-xs text-[#304156] border-l-4 border-[#914D4D]">
                          <span className="font-semibold">Example:</span> "Growing up in a coastal community, I witnessed 
                          firsthand how plastic pollution affected local fishermen's livelihoods..."
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body 1 */}
                  <div className="border border-gray-200 rounded-xl p-5 hover:border-[#914D4D] transition group">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#914D4D] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md">
                        2
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#304156] mb-2 group-hover:text-[#914D4D] transition-colors">Body: Your Motivation & Experience</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Explain what drives you. Connect your past experiences, skills, and values to your desire 
                          to create social impact. Be specific and authentic.
                        </p>
                        <ul className="space-y-1 text-xs text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="text-[#914D4D] mt-0.5">•</span>
                            <span>What social/environmental issues matter most to you?</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#914D4D] mt-0.5">•</span>
                            <span>What relevant experiences have you had (volunteering, internships, projects)?</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Body 2 */}
                  <div className="border border-gray-200 rounded-xl p-5 hover:border-[#914D4D] transition group">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#914D4D] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md">
                        3
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#304156] mb-2 group-hover:text-[#914D4D] transition-colors">Body: Why GIF & Learning Goals</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Articulate why GIF specifically is important for your growth. What do you hope to learn? 
                          How will this experience help you achieve your impact goals?
                        </p>
                        <ul className="space-y-1 text-xs text-gray-600">
                          <li className="flex items-start gap-2">
                            <span className="text-[#914D4D] mt-0.5">•</span>
                            <span>Why Singapore? Why this fellowship?</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#914D4D] mt-0.5">•</span>
                            <span>What specific learning outcomes do you seek?</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Conclusion */}
                  <div className="border border-gray-200 rounded-xl p-5 hover:border-[#914D4D] transition group">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#914D4D] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md">
                        4
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#304156] mb-2 group-hover:text-[#914D4D] transition-colors">Conclusion: Future Vision & Commitment</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          End with a strong closing that reinforces your commitment to social impact. Paint a picture 
                          of how you'll apply what you learn from GIF.
                        </p>
                        <div className="bg-[#304156]/5 rounded-lg p-3 text-xs text-[#304156] border-l-4 border-[#914D4D]">
                          <span className="font-semibold">Tip:</span> Leave the reader with a memorable statement 
                          about your long-term vision for impact.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Writing Tips - Theme: Light Muted Red/Neutral */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-bold text-[#304156] mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#914D4D]" />
                  Pro Writing Tips
                </h3>
                <ul className="space-y-2 text-sm text-[#304156]/80">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#914D4D]" />
                    <span><strong>Be authentic:</strong> Write in your own voice, not what you think we want to hear</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#914D4D]" />
                    <span><strong>Show, don't tell:</strong> Use specific examples and stories rather than general statements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#914D4D]" />
                    <span><strong>Connect to SDGs:</strong> Reference relevant Sustainable Development Goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#914D4D]" />
                    <span><strong>Proofread carefully:</strong> Check for grammar, spelling, and clarity</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* PROJECT PROPOSAL GUIDE SECTION - Theme: Muted Red */}
        <div className="bg-white rounded-2xl border border-[#914D4D]/20 overflow-hidden shadow-sm">
          <button
            onClick={() => setProjectGuideOpen(!projectGuideOpen)}
            className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#914D4D]/10 p-2 rounded-lg">
                <Target className="w-5 h-5 text-[#914D4D]" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold text-[#304156]">Project Proposal Framework</h2>
                <p className="text-sm text-gray-500">Step-by-step guide for your SDG project</p>
              </div>
            </div>
            {projectGuideOpen ? <ChevronUp className="w-5 h-5 text-[#914D4D]" /> : <ChevronDown className="w-5 h-5 text-[#914D4D]" />}
          </button>

          {projectGuideOpen && (
            <div className="px-6 pb-6 space-y-6">
              <div className="h-px bg-gray-200"></div>

              {/* Format Requirements */}
              <div className="bg-[#914D4D]/5 rounded-xl p-6 border border-[#914D4D]/20">
                <h3 className="font-bold text-[#914D4D] mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Presentation Format Requirements
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#304156] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-[#914D4D]">Format:</span>
                        <span className="text-[#304156]"> PowerPoint, Google Slides, or Canva</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#304156] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-[#914D4D]">Length:</span>
                        <span className="text-[#304156]"> Maximum 15 slides</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#304156] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-[#914D4D]">Submission:</span>
                        <span className="text-[#304156]"> Google Drive link (view access)</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#304156] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-semibold text-[#914D4D]">Focus:</span>
                        <span className="text-[#304156]"> Must align with SDGs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide-by-Slide Framework */}
              <div>
                <h3 className="font-bold text-[#304156] mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#914D4D]" />
                  Recommended Slide Structure
                </h3>
                
                <div className="space-y-3">
                  {[
                    {
                      num: "1",
                      title: "Cover Slide",
                      content: "Project title, your name, team (if any), date. Make it visually compelling!"
                    },
                    {
                      num: "2-3",
                      title: "Problem Statement",
                      content: "What social/environmental problem are you addressing? Use data and real-world examples. Connect to specific SDG(s)."
                    },
                    {
                      num: "4-5",
                      title: "Target Audience & Impact",
                      content: "Who will benefit from your project? How many people? What specific change do you aim to create?"
                    },
                    {
                      num: "6-8",
                      title: "Solution/Innovation",
                      content: "Your proposed solution. What makes it innovative? How does it work? Include visuals, diagrams, or prototypes if possible."
                    },
                    {
                      num: "9-10",
                      title: "Implementation Plan",
                      content: "Timeline, key activities, resources needed. Be realistic but ambitious."
                    },
                    {
                      num: "11-12",
                      title: "Budget & Sustainability",
                      content: "Estimated costs breakdown. How will the project sustain itself? Revenue model or funding strategy."
                    },
                    {
                      num: "13-14",
                      title: "Team & Metrics",
                      content: "Your team's strengths and how you will measure success (KPIs)."
                    },
                    {
                      num: "15",
                      title: "Call to Action",
                      content: "What support do you need? How can GIF help you scale your impact?"
                    }
                  ].map((slide, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-[#914D4D] transition">
                      <div className="flex items-start gap-3">
                        <div className="bg-[#304156] text-white px-3 py-1 rounded-lg font-bold text-sm flex-shrink-0">
                          Slide {slide.num}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[#304156] mb-1">{slide.title}</h4>
                          <p className="text-sm text-gray-600">{slide.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>{/* SUBMISSION FORM - Updated Colors & Edit Logic */}
        <div className="bg-white rounded-2xl border-2 border-[#914D4D] p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#914D4D] p-3 rounded-xl">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#304156]">Submit Your Work</h2>
              <p className="text-sm text-gray-500">Upload your essay and project proposal</p>
            </div>
          </div>

          {isAutoComplete ? (
            <div className="bg-gray-50 border-2 border-[#304156]/20 rounded-xl p-6 text-center">
              <CheckCircle className="w-12 h-12 text-[#304156] mx-auto mb-3" />
              <h3 className="font-bold text-[#304156] mb-2">Automatically Completed</h3>
              <p className="text-sm text-[#304156]/80">
                Your submissions are managed through the mentoring dashboard.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Important Notice */}
              <div className="bg-[#304156]/5 border border-[#304156]/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#914D4D] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[#304156]">
                    <p className="font-bold mb-1 text-[#914D4D]">Important Submission Requirements:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Your Google Drive link must be set to <strong>"Anyone with the link can VIEW"</strong></li>
                      <li>• Essay should be in Google Docs or PDF format</li>
                      <li>• Project proposal should be in Google Slides or PowerPoint format</li>
                      <li>• Both files can be in a single folder or separate links</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[#304156] mb-2">
                    Google Drive Link (Essay & Project)
                  </label>
                  <input
                    type="url"
                    // LOGIC EDIT: Hanya disable jika SUDAH LEWAT deadline.
                    // Jika user sudah submit tapi belum deadline, input TETAP AKTIF untuk edit.
                    disabled={isPastDeadline}
                    value={driveLink}
                    onChange={(e) => setDriveLink(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#914D4D] focus:ring-2 focus:ring-[#914D4D]/20 outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed text-[#304156]"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Link to your Google Drive folder or document containing both your essay and project proposal
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#304156] mb-2">
                    Essay Preview (Optional)
                  </label>
                  <textarea
                    rows={6}
                    disabled={isPastDeadline}
                    value={essay}
                    onChange={(e) => setEssay(e.target.value)}
                    placeholder="Paste a short excerpt or summary of your motivation essay here..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#914D4D] focus:ring-2 focus:ring-[#914D4D]/20 outline-none transition resize-none disabled:bg-gray-100 disabled:cursor-not-allowed text-[#304156]"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    This is optional but helps us quickly understand your motivation
                  </p>
                </div>
              </div>

              {/* Submit Button Area */}
              <div className="pt-4">
                {isSubmitted && !isPastDeadline && (
                   <div className="mb-4 text-center">
                      <div className="inline-flex items-center gap-2 bg-[#304156]/10 px-4 py-2 rounded-lg text-[#304156] text-sm font-semibold">
                          <CheckCircle className="w-4 h-4" />
                          <span>Currently Submitted. You can update this until March 23.</span>
                      </div>
                   </div>
                )}

                <Button
                    onClick={handleSubmit}
                    disabled={submitting || isPastDeadline}
                    // Updated py-3
                    className={cn(
                        "w-full py-3 rounded-xl font-bold text-lg text-white shadow-lg transition-all",
                        isPastDeadline 
                            ? "bg-gray-400 cursor-not-allowed" 
                            : "bg-gradient-to-r from-[#2F4055] to-[#914D4D] hover:to-[#2F4055] hover:shadow-xl"
                    )}
                >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {isSubmitted ? "Updating..." : "Submitting..."}
                      </>
                    ) : isPastDeadline ? (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Deadline Passed
                      </>
                    ) : isSubmitted ? (
                      <>
                        <Upload className="w-5 h-5 mr-2" />
                        Update Submission
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 mr-2" />
                        Submit Essay & Project
                      </>
                    )}
                </Button>

                {isSubmitted && (
                    <div className="mt-4 text-center">
                        {/* FIX TS ERROR: Hapus variant="link", gunakan className manual */}
                        <Button
                            onClick={() => window.open(driveLink, "_blank")}
                            className="bg-transparent hover:bg-transparent text-[#304156] hover:text-[#914D4D] underline shadow-none p-0 h-auto font-normal"
                        >
                            Check Current Link <ExternalLink className="w-3 h-3 ml-1 inline" />
                        </Button>
                    </div>
                )}
              </div>
            </div>
          )}
        </div>\
        {/* Help Section - Updated Layout */}
        <div className="bg-[#304156]/5 rounded-2xl border border-[#304156]/20 p-6 font-geologica">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            
            {/* Icon & Text Group */}
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-[#304156]/10 p-3 rounded-xl flex-shrink-0">
                <Info className="w-6 h-6 text-[#304156]" />
              </div>
              <div>
                <h3 className="font-bold text-[#304156] mb-1">Need Help?</h3>
                <p className="text-sm text-[#304156]/80 leading-relaxed">
                  If you have questions about the essay or project proposal requirements, contact our team.
                </p>
              </div>
            </div>

            {/* Button Group */}
            <div className="w-full md:w-auto mt-4 md:mt-0">
              <Link href="https://wa.me/6288297253491" target="_blank" className="block w-full">
                {/* Menggunakan py-3, w-full, dan rounded-xl agar sesuai style sebelumnya */}
                <Button className="w-full md:w-auto min-w-[200px] py-3 px-6 rounded-xl font-bold bg-[#304156] hover:bg-[#2F4055] text-white shadow-md transition-all flex items-center justify-center gap-2">
                  Contact via WhatsApp
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}