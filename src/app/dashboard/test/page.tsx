"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { motion } from "framer-motion"; // Optional: npm install framer-motion (Kalau belum ada, hapus motion.div)
import { 
  AlertCircle, 
  FileText, 
  Sparkles, 
  Lock, 
  Trophy,
  Activity
} from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import RegistrationStatusCard from "@/components/test/RegistrationStatusCard"; // Pastikan file sudah di-rename jadi Capital 'S'
import TestCard from "@/components/test/TestCard";
import TestResultCard from "@/components/test/TestResultCard";
import ResourceLibrary from "@/components/test/ResourceLibrary";
import MasterClassSection from "@/components/test/MasterClassSection";
import CertificateViewer from "@/components/test/CertificateViewer";

// --- Types ---
interface TestRegistration {
  id: string;
  email: string;
  full_name: string;
  test_type: 'ielts' | 'toefl' | 'toeic' | 'sat';
  registration_date: string;
  access_status: 'active' | 'expired';
}

interface TestAttempt {
  id: string;
  attempt_type: 'pre-test' | 'post-test';
  status: 'in_progress' | 'completed';
  started_at: string;
  completed_at?: string;
  listening_score?: number;
  reading_score?: number;
  writing_score?: number;
  speaking_score?: number;
  overall_score?: number;
  mentor_feedback?: string;
  strengths?: string[];
  weaknesses?: string[];
  recommendations?: string[];
}

export default function IELSTestDashboard() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // State Management
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    tier: "basic" as "basic" | "pro",
    avatar: ""
  });
  
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(true); // Default true biar ga flicker "Not Registered"
  const [registration, setRegistration] = useState<TestRegistration | null>(null);
  const [preTest, setPreTest] = useState<TestAttempt | null>(null);
  const [postTest, setPostTest] = useState<TestAttempt | null>(null);

  // --- Initial Data Fetch ---
  useEffect(() => {
    const initData = async () => {
      try {
        // 1. Get Auth User
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push("/sign-in");
          return;
        }

        // 2. Get User Profile & Tier
        const { data: dbUser } = await supabase
          .from("users")
          .select(`*, memberships(tier)`)
          .eq("id", user.id)
          .single();

        const tier = dbUser?.memberships?.[0]?.tier === "visionary" ? "pro" : 
                     dbUser?.memberships?.[0]?.tier === "insider" ? "pro" : "basic";

        setUserData({
          id: user.id,
          name: user.user_metadata?.full_name || dbUser?.full_name || "Member",
          email: user.email || "",
          tier: tier,
          avatar: user.user_metadata?.avatar_url || ""
        });

        // 3. Verify Test Access
        await verifyAccess(user.email!, user.id);

      } catch (error) {
        console.error("Dashboard Init Error:", error);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, [router, supabase]);

  // --- Verification Logic ---
  const verifyAccess = async (email: string, userId: string) => {
    try {
      setVerifying(true);
      const response = await fetch('/api/test/verify-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userId }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.hasAccess) {
          setRegistration(data.registration);
          setPreTest(data.preTest);
          setPostTest(data.postTest);
        }
      }
    } catch (error) {
      console.error('API Verification Error:', error);
    } finally {
      setVerifying(false);
    }
  };

  // --- Helper Variables ---
  const canTakePostTest = preTest?.status === 'completed';
  const isIELTS = registration?.test_type === 'ielts';
  const showResults = preTest?.status === 'completed' || postTest?.status === 'completed';

  // --- Render: Loading State (Skeleton) ---
  if (loading || verifying) {
    return (
      <DashboardLayout userTier={userData.tier} userName={userData.name} userAvatar={userData.avatar}>
        <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8 animate-pulse">
          <div className="h-64 bg-gray-200 rounded-3xl w-full" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-48 bg-gray-200 rounded-2xl" />
            <div className="h-48 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // --- Render: Not Registered State ---
  if (!registration) {
    return (
      <DashboardLayout userTier={userData.tier} userName={userData.name} userAvatar={userData.avatar}>
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white rounded-3xl p-8 border border-gray-100 shadow-xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 to-red-600" />
            
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-red-50/50">
              <AlertCircle className="text-[#E56668]" size={36} />
            </div>
            
            <h2 className="text-2xl font-bold text-[#2F4157] mb-3">
              Unlock Your Assessment
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              We couldn't find an active test registration for <strong>{userData.email}</strong>. 
              Start your journey by registering for the official IELS assessment.
            </p>
            
            <a
              href="https://forms.gle/iZsfxutCF5NYWqWn7" // GANTI LINK FORM KAMU
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#E56668] text-white rounded-xl font-bold hover:bg-[#d65557] hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center"
            >
              <FileText size={18} />
              Register Now
            </a>

            <div className="mt-8 pt-6 border-t border-gray-100">
               <p className="text-xs text-gray-400">Already registered? <button onClick={() => window.location.reload()} className="text-[#E56668] hover:underline">Refresh page</button></p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // --- Render: Main Dashboard ---
  return (
    <DashboardLayout userTier={userData.tier} userName={userData.name} userAvatar={userData.avatar}>
      <div className="min-h-screen pb-20">
        
        {/* 1. Hero Section */}
        <div className="relative bg-[#2F4157] text-white overflow-hidden">
           {/* Background Decoration */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
           
           <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium mb-4 backdrop-blur-sm">
                    <Sparkles size={12} className="text-yellow-400" />
                    <span>Official Assessment Portal</span>
                  </div>
                  <h1 className="text-3xl lg:text-5xl font-bold font-geologica mb-3">
                    Your {registration.test_type.toUpperCase()} Journey
                  </h1>
                  <p className="text-gray-300 max-w-xl text-lg">
                    Track your progress, access premium materials, and achieve your target score.
                  </p>
                </div>
                
                {/* Quick Stats (Optional Visual) */}
                <div className="flex gap-4">
                  <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Status</p>
                    <p className="font-bold text-green-400 capitalize">{registration.access_status}</p>
                  </div>
                  {preTest?.overall_score && (
                     <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-center">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Current Band</p>
                      <p className="font-bold text-yellow-400">{preTest.overall_score}</p>
                    </div>
                  )}
                </div>
              </div>
           </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-8 relative z-20 space-y-10">
          
          {/* 2. Registration Card */}
          <div className="shadow-xl rounded-2xl bg-white overflow-hidden">
            <RegistrationStatusCard registration={registration} />
          </div>

          {/* 3. Test Modules Grid */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Activity className="text-[#E56668]" />
              <h2 className="text-2xl font-bold text-[#2F4157]">Assessment Modules</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pre-Test */}
              <TestCard
                title={`${registration.test_type.toUpperCase()} Pre-Test`}
                description="Initial assessment to establish your baseline score."
                duration="2 Hours"
                sections={4}
                status={preTest?.status || 'not_started'}
                score={preTest?.overall_score}
                testType="pre-test"
                isLocked={false}
                href={preTest?.status === 'completed' ? undefined : `/dashboard/test/${registration.test_type}/pre-test`}
              />

              {/* Post-Test */}
              <TestCard
                title={`${registration.test_type.toUpperCase()} Post-Test`}
                description="Final assessment to measure your improvement."
                duration="2 Hours"
                sections={4}
                status={postTest?.status || 'not_started'}
                score={postTest?.overall_score}
                testType="post-test"
                isLocked={!canTakePostTest}
                lockReason={!canTakePostTest ? "Complete Pre-Test first" : undefined}
                href={postTest?.status === 'completed' 
                  ? undefined 
                  : canTakePostTest 
                    ? `/dashboard/test/${registration.test_type}/post-test`
                    : undefined
                }
              />
            </div>
          </section>

          {/* 4. Results Section (Conditional) */}
          {showResults && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="flex items-center gap-3 mb-6">
                  <Trophy className="text-yellow-500" />
                  <h2 className="text-2xl font-bold text-[#2F4157]">Performance Report</h2>
               </div>
               <div className="grid md:grid-cols-2 gap-6">
                  {preTest?.status === 'completed' && (
                    <TestResultCard 
                      title="Baseline Score (Pre-Test)" 
                      attempt={preTest} 
                      showCertificate={false} 
                    />
                  )}
                  {postTest?.status === 'completed' && (
                    <TestResultCard 
                      title="Final Score (Post-Test)" 
                      attempt={postTest} 
                      showCertificate={!!(postTest.overall_score && postTest.overall_score >= 0)} 
                    />
                  )}
               </div>
            </section>
          )}

          {/* 5. Learning Resources (IELTS Exclusive) */}
          {isIELTS && (
             <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                   <MasterClassSection />
                   <ResourceLibrary />
                </div>
                <div className="lg:col-span-1">
                   {/* Coming Soon / Sidebar */}
                   <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
                      <h3 className="font-bold text-[#2F4157] mb-4 flex items-center gap-2">
                        <Lock size={16} className="text-gray-400"/> Future Assessments
                      </h3>
                      <div className="space-y-3">
                        {['TOEFL iBT', 'TOEIC', 'SAT Math', 'SAT Verbal'].map((item) => (
                          <div key={item} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center opacity-60">
                            <span className="font-medium text-gray-500">{item}</span>
                            <span className="text-[10px] uppercase bg-gray-200 px-2 py-1 rounded text-gray-500">Soon</span>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
             </div>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
}