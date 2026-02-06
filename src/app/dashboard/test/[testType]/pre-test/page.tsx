"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  Clock, FileText, Headphones, PenTool, AlertTriangle,
  CheckCircle2, Loader2, ArrowRight, ShieldCheck, PlayCircle
} from "lucide-react";

type LayoutTier = "basic" | "pro" | undefined;

export default function PreTestPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [isCheckingHistory, setIsCheckingHistory] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState({ 
    name: "", 
    tier: "explorer" as "explorer" | "insider" | "visionary" 
  });

  // --- 1. USER & HISTORY CHECK ---
  useEffect(() => {
    const checkUserAndHistory = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (!authUser) {
          router.push("/sign-in");
          return;
        }

        // Check if user already completed the test
        const { data: existingAttempt } = await supabase
          .from('test_attempts')
          .select('id, status')
          .eq('email', authUser.email)
          .eq('status', 'completed')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (existingAttempt) {
          // Redirect immediately if done
          router.replace(`/dashboard/test/results/${existingAttempt.id}`);
          return;
        }

        // If not, load user profile
        const { data: dbUser } = await supabase
          .from('users')
          .select(`*, memberships(tier)`)
          .eq('id', authUser.id)
          .single();

        setUser(authUser);
        setUserData({
          name: authUser.user_metadata?.full_name || "Student",
          tier: dbUser?.memberships?.[0]?.tier || "explorer"
        });
        setIsCheckingHistory(false);

      } catch (error) {
        console.error("Error checking user:", error);
        setIsCheckingHistory(false);
      }
    };

    checkUserAndHistory();
  }, [supabase, router]);

  const getLayoutTier = (tier: string): LayoutTier => {
    if (tier === "explorer") return "basic";
    if (tier === "insider" || tier === "visionary") return "pro";
    return undefined;
  };

  // --- 2. START TEST ACTION ---
  const startTest = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('test_attempts')
        .insert({
          user_id: user.id,
          test_type: 'pre_test',
          status: 'in_progress',
          email: user.email,
          full_name: userData.name // Capture name for certificate
        })
        .select()
        .single();

      if (error) throw error;
      setAttemptId(data.id);
      
      // Auto-scroll to top when test starts
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (err) {
      alert('Could not start test. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // --- 3. CHECK RESULT ACTION ---
  const checkResults = async () => {
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
        alert('Your results are being processed by our AI. Please wait 15-30 seconds and try clicking "Check Results" again.');
      }
    } finally {
      setChecking(false);
    }
  };

  const GFORM_URL = process.env.NEXT_PUBLIC_PRETEST_FORM_URL!;
  const ENTRY_ID = process.env.NEXT_PUBLIC_PRETEST_ENTRY_ID!;
  const formUrl = `${GFORM_URL}?${ENTRY_ID}=${attemptId}&embedded=true`;

  // --- UI: LOADING STATE ---
  if (isCheckingHistory) {
    return (
      <DashboardLayout userTier={getLayoutTier(userData.tier)} userName={userData.name}>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin text-[#E56668] mb-4" size={40} />
          <p className="text-gray-500 font-medium">Checking your eligibility...</p>
        </div>
      </DashboardLayout>
    );
  }

  // --- UI: PRE-TEST LANDING ---
  if (!attemptId) {
    return (
      <DashboardLayout userTier={getLayoutTier(userData.tier)} userName={userData.name}>
        <div className="max-w-5xl mx-auto p-4 sm:p-8">
          
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-[#2F4157] to-[#1e2b3a] rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
                <ShieldCheck size={12} /> Official IELS Assessment
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight font-geologica">
                IELTS Diagnostic <br/>Pre-Test
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Take this comprehensive assessment to discover your current English proficiency. 
                Get an estimated Band Score and personalized AI feedback instantly.
              </p>
              
              <button 
                onClick={startTest} 
                disabled={loading}
                className="group bg-[#E56668] hover:bg-[#d64547] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-900/20 transition-all flex items-center gap-3 active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin" /> : <PlayCircle className="fill-white text-[#E56668]" />}
                Start Assessment Now
              </button>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
              <Headphones size={300} />
            </div>
          </div>

          {/* Test Structure Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <FeatureCard 
              icon={<Headphones className="text-blue-500" size={24}/>}
              title="Listening Section"
              desc="4 sections, 40 questions based on real audio scenarios."
              meta="~30 Minutes"
              bg="bg-blue-50"
            />
            <FeatureCard 
              icon={<FileText className="text-green-500" size={24}/>}
              title="Reading Section"
              desc="3 long texts ranging from descriptive to factual."
              meta="~60 Minutes"
              bg="bg-green-50"
            />
            <FeatureCard 
              icon={<PenTool className="text-purple-500" size={24}/>}
              title="Writing Section"
              desc="Task 1 & Task 2 assessed by our Advanced AI Engine."
              meta="~60 Minutes"
              bg="bg-purple-50"
            />
          </div>

          {/* Instructions Box */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#2F4157] mb-6 flex items-center gap-2">
              <AlertTriangle className="text-amber-500" />
              Critical Instructions
            </h3>
            <div className="space-y-4">
              <InstructionStep num="1" text="Ensure you have a stable internet connection. The test cannot be paused." />
              <InstructionStep num="2" text="Do NOT refresh the page once the test starts, or you may lose progress." />
              <InstructionStep num="3" text="The 'Attempt ID' field at the bottom is auto-filled. Do not modify it." />
              <InstructionStep num="4" text="After clicking Submit on the form, click 'Check Results' at the top of this page." />
            </div>
          </div>

        </div>
      </DashboardLayout>
    );
  }

  // --- UI: ACTIVE TEST MODE ---
  return (
    <DashboardLayout userTier={getLayoutTier(userData.tier)} userName={userData.name}>
      <div className="min-h-screen bg-gray-50 pb-20">
        
        {/* Sticky Header */}
        <div className="bg-[#2F4157] text-white p-4 sticky top-0 z-50 shadow-lg backdrop-blur-md bg-opacity-95">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <div>
                <p className="font-bold text-sm">Test in Progress</p>
                <p className="text-xs text-gray-400 font-mono">ID: {attemptId}</p>
              </div>
            </div>

            <button 
              onClick={checkResults} 
              disabled={checking}
              className="bg-[#E56668] hover:bg-[#d64547] text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-wait"
            >
              {checking ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
              I Have Submitted the Form
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Alert Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex gap-3">
            <div className="bg-blue-100 p-2 rounded-lg h-fit">
              <ShieldCheck className="text-blue-600" size={20} />
            </div>
            <div className="text-sm text-blue-800">
              <p className="font-bold mb-1">System Connected</p>
              <p>Your results will be automatically synced. Please fill out the form below carefully.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[800px]">
             <iframe 
               src={formUrl} 
               width="100%" 
               height="4500px" 
               frameBorder="0" 
               className="w-full"
               title="IELTS Pre-Test Form"
             >
               Loading assessment form...
             </iframe>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// --- SUB-COMPONENTS ---

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

function InstructionStep({ num, text }: { num: string, text: string }) {
  return (
    <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="w-8 h-8 rounded-full bg-[#2F4157] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
        {num}
      </div>
      <p className="text-gray-700 font-medium pt-1">{text}</p>
    </div>
  );
}