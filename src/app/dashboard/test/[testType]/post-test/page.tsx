"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  Clock, FileText, Headphones, PenTool, AlertTriangle,
  CheckCircle2, Loader2, ShieldCheck, PlayCircle,
  Eye, Trophy, Target
} from "lucide-react";

type UserTier = "explorer" | "insider" | "visionary";

type AttemptType = {
  id: string;
  status: string;
  overall_score?: number;
};

export default function PostTestPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [completedAttempt, setCompletedAttempt] = useState<AttemptType | null>(null); 
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [isCheckingHistory, setIsCheckingHistory] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState({ name: "", tier: "explorer" as UserTier });

  // --- 1. USER & POST-TEST HISTORY CHECK ---
  useEffect(() => {
    const checkUserAndHistory = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (!authUser) {
          router.push("/sign-in");
          return;
        }

        // Specifically check for POST_TEST completion
        const { data: existingAttempt } = await supabase
          .from('test_attempts')
          .select('id, status, overall_score')
          .eq('user_id', authUser.id)
          .eq('test_type', 'post_test') // Filtered for Post-Test
          .eq('status', 'completed')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (existingAttempt) {
          setCompletedAttempt(existingAttempt);
          setAttemptId(existingAttempt.id);
        }

        const { data: dbUser } = await supabase
          .from('users')
          .select(`*, memberships(tier)`)
          .eq('id', authUser.id)
          .single();

        const dbTier = dbUser?.memberships?.[0]?.tier;
        let uiTier: UserTier = "explorer";

        if (dbTier === "visionary") {
          uiTier = "visionary";
        } else if (dbTier === "insider" || dbTier === "pro") {
          uiTier = "insider";
        }

        setUser(authUser);
        setUserData({
          name: authUser.user_metadata?.full_name || "Student",
          tier: uiTier
        });
        
        setIsCheckingHistory(false);
      } catch (error) {
        console.error("Error checking post-test history:", error);
        setIsCheckingHistory(false);
      }
    };

    checkUserAndHistory();
  }, [supabase, router]);

  // --- 2. START POST-TEST ACTION ---
  const startPostTest = async () => {
    if (!user) return;
    
    if (completedAttempt) {
       window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
       return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('test_attempts')
        .insert({
          user_id: user.id,
          test_type: 'post_test', // Recorded as Post-Test
          status: 'in_progress',
          email: user.email,
          full_name: userData.name 
        })
        .select()
        .single();

      if (error) throw error;
      setAttemptId(data.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      alert('Post-test will be started on 13 February 2026');
    } finally {
      setLoading(false);
    }
  };

  const checkResults = async () => {
    if (completedAttempt) {
        router.push(`/dashboard/test/results/${completedAttempt.id}`);
        return;
    }
    if (!attemptId) return;
    setChecking(true);
    try {
      const { data } = await supabase
        .from('test_attempts')
        .select('status')
        .eq('id', attemptId)
        .single();

      if (data?.status === 'completed') {
        router.push(`/dashboard/test/results/${attemptId}`);
      } else {
        alert('Your results are being processed. Please try again in a moment.');
      }
    } finally {
      setChecking(false);
    }
  };

  const GFORM_URL = process.env.NEXT_PUBLIC_POSTTEST_FORM_URL!;
  const ENTRY_ID = process.env.NEXT_PUBLIC_POSTTEST_ENTRY_ID!;
  const formUrl = attemptId 
    ? `${GFORM_URL}?${ENTRY_ID}=${attemptId}&embedded=true` 
    : `${GFORM_URL}?embedded=true`; 

  if (isCheckingHistory) {
    return (
      <DashboardLayout userTier={userData.tier} userName={userData.name}>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin text-[#E56668] mb-4" size={40} />
          <p className="text-gray-500 font-medium">Validating your final assessment...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!attemptId && !completedAttempt) {
    return (
      <DashboardLayout userTier={userData.tier} userName={userData.name}>
        <div className="max-w-5xl mx-auto p-4 sm:p-8">
          
          <div className="bg-gradient-to-br from-[#304156] to-[#1a2635] rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E56668]/20 text-[#E56668] text-xs font-bold uppercase tracking-wider mb-4 border border-[#E56668]/30">
                <Target size={12} /> Final Benchmarking
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight font-geologica">
                IELTS Graduation <br/>Post-Test
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Congratulations on completing the IELS journey! This final assessment measures your growth
                and provides your final band score estimate. Finish strong!
              </p>
              
              <button 
                onClick={startPostTest} 
                disabled={loading}
                className="group bg-[#E56668] hover:bg-[#d64547] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center gap-3 active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin" /> : <PlayCircle className="fill-white text-[#E56668]" />}
                Start Final Assessment
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <FeatureCard 
              icon={<Headphones className="text-blue-500" size={24}/>}
              title="Listening Final"
              desc="Full-length 40 questions to test your refined listening skills."
              meta="~30 Minutes"
              bg="bg-blue-50"
            />
            <FeatureCard 
              icon={<FileText className="text-green-500" size={24}/>}
              title="Reading Final"
              desc="Complex academic texts to evaluate your advanced reading techniques."
              meta="~60 Minutes"
              bg="bg-green-50"
            />
            <FeatureCard 
              icon={<PenTool className="text-purple-500" size={24}/>}
              title="Writing Final"
              desc="Task 1 & 2. Apply everything you learned in the Master Class."
              meta="~60 Minutes"
              bg="bg-purple-50"
            />
          </div>

          <InstructionsBox />
        </div>
      </DashboardLayout>
    );
  }

  const isReviewMode = !!completedAttempt;

  return (
    <DashboardLayout userTier={userData.tier} userName={userData.name}>
      <div className="min-h-screen bg-gray-50 pb-20">
        
        <div className={`text-white p-4 sticky top-0 z-50 shadow-lg backdrop-blur-md bg-opacity-95 transition-colors ${isReviewMode ? 'bg-indigo-700' : 'bg-[#304156]'}`}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {isReviewMode ? <CheckCircle2 size={24} /> : <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />}
              <div>
                <p className="font-bold text-sm">{isReviewMode ? "Post-Test Completed" : "Final Test in Progress"}</p>
                <p className="text-xs text-gray-300 font-mono">Attempt ID: {completedAttempt?.id || attemptId}</p>
              </div>
            </div>

            <div className="flex gap-3">
                {isReviewMode ? (
                    <button 
                        onClick={checkResults}
                        className="bg-white text-indigo-700 hover:bg-gray-100 px-6 py-2.5 rounded-lg font-bold text-sm shadow-md transition-all flex items-center gap-2"
                    >
                      <Trophy size={16} /> View Graduation Analysis
                    </button>
                ) : (
                    <button 
                        onClick={checkResults} 
                        disabled={checking}
                        className="bg-[#E56668] hover:bg-[#d64547] text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {checking ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
                      I Have Submitted My Final Test
                    </button>
                )}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {isReviewMode && (
             <div className="bg-white border border-indigo-200 rounded-2xl p-6 mb-8 shadow-sm">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-indigo-100 p-3 rounded-xl"><Eye className="text-indigo-600" size={32} /></div>
                        <div>
                            <h2 className="text-xl font-bold text-[#2F4157]">Post-Test Review</h2>
                            <p className="text-gray-600 max-w-lg mt-1 text-sm">
                               You are viewing your final graduation assessment. Use this to compare with your Pre-Test baseline.
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Final Score</p>
                        <p className="text-4xl font-bold text-indigo-600">{completedAttempt.overall_score || "-"}</p>
                    </div>
                </div>
             </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[800px]">
             <iframe src={formUrl} width="100%" height="4500px" frameBorder="0" className="w-full" title="IELS Post-Test Form">
                Loading assessment form...
             </iframe>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function FeatureCard({ icon, title, desc, meta, bg }: any) {
  return (
    <div className={`p-6 rounded-2xl border border-gray-100 ${bg}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white rounded-xl shadow-sm">{icon}</div>
        <span className="text-xs font-bold px-2 py-1 bg-white/50 rounded-lg text-gray-500">{meta}</span>
      </div>
      <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function InstructionsBox() {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#2F4157] mb-6 flex items-center gap-2">
              <AlertTriangle className="text-amber-500" /> Critical Instructions
            </h3>
            <div className="space-y-4">
              <InstructionStep num="1" text="This is your final benchmark. Find a quiet space for 3 uninterrupted hours." />
              <InstructionStep num="2" text="Apply all strategies from your IELS Master Class lessons." />
              <InstructionStep num="3" text="Double-check your email and Attempt ID at the end of the form." />
              <InstructionStep num="4" text="Click 'I Have Submitted' above only after completing the Google Form." />
            </div>
        </div>
    )
}

function InstructionStep({ num, text }: { num: string, text: string }) {
  return (
    <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="w-8 h-8 rounded-full bg-[#304156] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
        {num}
      </div>
      <p className="text-gray-700 font-medium pt-1 text-sm">{text}</p>
    </div>
  );
}