"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ArrowLeft,
  Crown,
  Video,
  FileText,
  Users,
  Calendar,
  Download,
  ExternalLink,
  Loader2,
  PlayCircle,
  Lock,
  Upload,
  Target,
  Award,
  BookOpen,
  Sparkles,
  TrendingUp,
  Clock
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

type MentoringSession = {
  week: number;
  title: string;
  date: string;
  status: 'upcoming' | 'completed' | 'locked';
  recording_url?: string;
  materials_url?: string;
};

export default function MentoringDashboard() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [projectLink, setProjectLink] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Mentoring sessions data
  const sessions: MentoringSession[] = [
    {
      week: 1,
      title: "Kickoff & SDG Framework Deep Dive",
      date: "Jan 20, 2026",
      status: 'completed',
      recording_url: "https://youtu.be/example1",
      materials_url: "https://drive.google.com/example1"
    },
    {
      week: 2,
      title: "Problem Definition & Target Audience",
      date: "Jan 27, 2026",
      status: 'completed',
      recording_url: "https://youtu.be/example2",
      materials_url: "https://drive.google.com/example2"
    },
    {
      week: 3,
      title: "Solution Design & Innovation Strategy",
      date: "Feb 3, 2026",
      status: 'completed',
      recording_url: "https://youtu.be/example3",
      materials_url: "https://drive.google.com/example3"
    },
    {
      week: 4,
      title: "Project Presentation & Final Review",
      date: "Feb 10, 2026",
      status: 'upcoming',
    }
  ];

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/login");
          return;
        }

        // 1. Fetch User Profile & Tier
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

        // 2. Check Mentoring Registration
        const { data } = await supabase
          .from('gif_registrations')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (data && data.is_mentoring_participant) {
          setAuthorized(true);
          setUserData(data);
          setProjectLink(data.mentoring_project_link || "");
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        console.error("Error:", err);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router, supabase]);

  const handleProjectSubmit = async () => {
    if (!projectLink.trim()) {
      alert("Please enter your project link");
      return;
    }
    if (!projectLink.includes("drive.google.com") && !projectLink.includes("docs.google.com")) {
      alert("Please enter a valid Google Drive link");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('gif_registrations')
        .update({
          mentoring_project_link: projectLink,
          mentoring_project_submitted_at: new Date().toISOString()
        })
        .eq('id', userData?.id);

      if (!error) {
        alert("✅ Project submitted successfully!");
        setUserData((prev: any) => ({ ...prev, mentoring_project_link: projectLink }));
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
        <div className="text-center">
          {/* Loader with Muted Red */}
          <Loader2 className="w-12 h-12 animate-spin text-[#914D4D] mx-auto mb-4" />
          <p className="text-sm text-gray-500">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      // Updated Layout Props
      <DashboardLayout
        userTier={userProfile?.tier} 
        userName={userProfile?.full_name} 
        userAvatar={userProfile?.avatar_url}
      >
        <div className="max-w-3xl mx-auto px-4 py-20 font-geologica">
          <div className="bg-white rounded-3xl border-2 border-[#914D4D]/20 p-12 text-center shadow-xl">
            <div className="bg-[#914D4D]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-[#914D4D]" />
            </div>
            <h1 className="text-3xl font-black text-[#304156] mb-4">Access Restricted</h1>
            <p className="text-[#304156]/80 mb-8 max-w-md mx-auto leading-relaxed">
              This dashboard is only accessible to registered mentoring participants. 
              Please apply for the mentoring program first.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/dashboard/gif">
                <Button className="rounded-xl bg-white text-[#304156] border border-[#304156]/20 hover:bg-[#304156]/5">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              {/* Button Gradient */}
              <Button 
                onClick={() => window.open("https://forms.gle/D4DMBFshr1JeydZC9", "_blank")}
                className="bg-gradient-to-r from-[#2F4055] to-[#914D4D] hover:to-[#2F4055] text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Apply for Mentoring
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const completedSessions = sessions.filter(s => s.status === 'completed').length;
  const progressPercent = (completedSessions / sessions.length) * 100;

  return (
    <DashboardLayout
      userTier={userProfile?.tier} 
      userName={userProfile?.full_name} 
      userAvatar={userProfile?.avatar_url}
    >
      <div className="max-w-6xl mx-auto pb-20 space-y-8 px-4 md:px-8 pt-6 font-geologica">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard/gif">
            <Button className="rounded-xl bg-white text-[#304156] border border-[#304156]/20 hover:bg-[#304156]/5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Hero Section - New Palette */}
        {/* Gradient Linear -> #2F4055 #914D4D #304156 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#2F4055] via-[#914D4D] to-[#304156] rounded-3xl shadow-2xl">
          {/* Background Effect */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#914D4D] rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#304156] rounded-full blur-[120px]"></div>
          </div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-[#2F4055] to-[#914D4D] p-3 rounded-2xl shadow-lg border border-white/10">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <span className="bg-[#304156] text-white px-4 py-1.5 rounded-full text-sm font-bold border border-white/10 shadow-sm">
                FAST TRACK PARTICIPANT
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white mb-3 drop-shadow-sm">
              Project Prep Mentoring
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mb-8 leading-relaxed">
              Welcome to your exclusive mentoring dashboard! Track your progress, access materials, 
              and submit your final project.
            </p>

            {/* Progress Stats - Updated to White/Transparent */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-3xl font-bold text-white mb-1">{completedSessions}</div>
                <div className="text-xs text-white/70 uppercase tracking-wider font-semibold">Sessions Completed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-3xl font-bold text-white mb-1">{Math.round(progressPercent)}%</div>
                <div className="text-xs text-white/70 uppercase tracking-wider font-semibold">Progress</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-3xl font-bold text-white mb-1">4</div>
                <div className="text-xs text-white/70 uppercase tracking-wider font-semibold">Total Weeks</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-3xl font-bold text-[#914D4D] mb-1 drop-shadow-sm">✓</div>
                <div className="text-xs text-white/70 uppercase tracking-wider font-semibold">Fast Track Status</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Banner - Updated to NightFall Blue Theme */}
        <div className="bg-[#304156]/5 rounded-2xl border-2 border-[#304156]/10 p-6">
          <div className="flex items-start gap-4">
            <div className="bg-[#304156] p-3 rounded-xl shadow-md">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#304156] mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#914D4D]" />
                Your Fast Track Benefits
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#914D4D] mt-0.5 flex-shrink-0" />
                  <span className="text-[#304156]/80">All requirements auto-completed</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#914D4D] mt-0.5 flex-shrink-0" />
                  <span className="text-[#304156]/80">Priority application review</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#914D4D] mt-0.5 flex-shrink-0" />
                  <span className="text-[#304156]/80">Direct founder feedback</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions Timeline */}
        <div className="bg-white rounded-2xl border border-[#304156]/10 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#304156]">Mentoring Sessions</h2>
            <span className="text-sm text-gray-500">
              {completedSessions} of {sessions.length} completed
            </span>
          </div>

          {/* Progress Bar - Updated Gradient */}
          <div className="mb-8">
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#2F4055] to-[#914D4D]"
              ></motion.div>
            </div>
          </div>

          {/* Sessions List - Palette Colors */}
          <div className="space-y-4">
            {sessions.map((session, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "border-2 rounded-2xl p-6 transition-all",
                  session.status === 'completed' 
                    ? "border-[#304156]/20 bg-[#304156]/5 hover:border-[#304156]/40" 
                    : session.status === 'upcoming'
                    ? "border-[#914D4D]/20 bg-[#914D4D]/5 hover:border-[#914D4D]/40"
                    : "border-gray-200 bg-gray-50 opacity-60"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Week Badge */}
                    <div className={cn(
                      "w-16 h-16 rounded-xl flex flex-col items-center justify-center font-bold flex-shrink-0 shadow-sm",
                      session.status === 'completed' 
                        ? "bg-[#304156] text-white" 
                        : session.status === 'upcoming'
                        ? "bg-[#914D4D] text-white"
                        : "bg-gray-300 text-gray-600"
                    )}>
                      <div className="text-xs">Week</div>
                      <div className="text-xl">{session.week}</div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-[#304156]">{session.title}</h3>
                        {session.status === 'completed' && (
                          <span className="bg-[#304156] text-white px-2 py-0.5 rounded-full text-xs font-bold">
                            <CheckCircle className="w-3 h-3 inline mr-1" />
                            Completed
                          </span>
                        )}
                        {session.status === 'upcoming' && (
                          <span className="bg-[#914D4D] text-white px-2 py-0.5 rounded-full text-xs font-bold">
                            <Clock className="w-3 h-3 inline mr-1" />
                            Upcoming
                          </span>
                        )}
                        {session.status === 'locked' && (
                          <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold">
                            <Lock className="w-3 h-3 inline mr-1" />
                            Locked
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>{session.date}</span>
                      </div>

                      {session.status === 'completed' && (
                        <div className="flex gap-3">
                          {session.recording_url && (
                            <Button
                              onClick={() => window.open(session.recording_url, "_blank")}
                              className="bg-[#914D4D] hover:bg-[#7a3e3e] text-white rounded-lg shadow-sm"
                            >
                              <PlayCircle className="w-4 h-4 mr-2" />
                              Watch Recording
                            </Button>
                          )}
                          {session.materials_url && (
                            <Button
                              onClick={() => window.open(session.materials_url, "_blank")}
                              className="rounded-lg bg-white text-[#304156] border border-[#304156]/20 hover:bg-[#304156]/5"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Materials
                            </Button>
                          )}
                        </div>
                      )}

                      {session.status === 'upcoming' && (
                        <p className="text-sm text-[#914D4D] font-medium">
                          Materials and recording will be available after the session.
                        </p>
                      )}

                      {session.status === 'locked' && (
                        <p className="text-sm text-gray-500">
                          This session will unlock after previous sessions are completed.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project Submission Section - Updated Gradient */}
        {/* Gradient Linear -> #2F4055 #914D4D #304156 */}
        <div className="bg-gradient-to-br from-[#2F4055] via-[#914D4D] to-[#304156] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#914D4D] rounded-full blur-[100px] opacity-50"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/20 p-3 rounded-2xl">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Final Project Submission</h2>
                <p className="text-white/80 text-sm">Submit your polished project proposal</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
              <h3 className="font-bold text-white mb-3">Submission Requirements</h3>
              <ul className="space-y-2 text-sm text-white/90">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Complete project proposal deck (max 15 slides)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Google Drive link with "Anyone with link can VIEW" access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>SDG alignment clearly demonstrated</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Incorporate feedback from mentoring sessions</span>
                </li>
              </ul>
            </div>

            {userData?.mentoring_project_link ? (
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center backdrop-blur-sm">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-[#914D4D]" />
                <h3 className="font-bold text-lg mb-2">Project Submitted!</h3>
                <p className="text-sm text-white/90 mb-4">
                  Your project has been received and is under review by our team.
                </p>
                <Button
                  onClick={() => window.open(projectLink, "_blank")}
                  className="bg-white text-[#304156] hover:bg-gray-100"
                >
                  View Submission
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="url"
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:bg-white/30 focus:border-white outline-none transition"
                />
                <Button
                  onClick={handleProjectSubmit}
                  disabled={submitting}
                  className="w-full py-6 rounded-xl font-bold text-lg bg-white text-[#304156] hover:bg-gray-100 shadow-lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      Submit Final Project
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Community & Support */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Community */}
          <div className="bg-white rounded-2xl border border-[#304156]/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#914D4D]/10 p-2 rounded-lg">
                <Users className="w-5 h-5 text-[#914D4D]" />
              </div>
              <h3 className="font-bold text-[#2F4157]">Mentoring Community</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Connect with fellow participants, share insights, and collaborate on ideas.
            </p>
            <Button 
              onClick={() => window.open("https://chat.whatsapp.com/example", "_blank")}
              className="w-full bg-[#914D4D] hover:bg-[#7a3e3e] text-white rounded-xl"
            >
              Join WhatsApp Group
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Support */}
          <div className="bg-white rounded-2xl border border-[#304156]/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#304156]/10 p-2 rounded-lg">
                <BookOpen className="w-5 h-5 text-[#304156]" />
              </div>
              <h3 className="font-bold text-[#2F4157]">Need Help?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Our mentoring coordinators are here to assist you with any questions.
            </p>
            <Link href="https://wa.me/6288297253491" target="_blank">
              <Button className="w-full bg-[#304156] hover:bg-[#2F4055] text-white rounded-xl">
                Contact Coordinator
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}