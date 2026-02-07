"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import { 
  Trophy, Headphones, FileText, PenTool, 
  Download, Share2, Star,
  CheckCircle2, TrendingUp, BookOpen, 
  SearchX, RefreshCcw, Home, ArrowLeft, Loader2, AlertCircle
} from "lucide-react";

// --- TIPE DATA (Biar Type Safety) ---
interface TestResult {
  id: string;
  full_name: string;
  email: string;
  listening_score: number | string; // Bisa string dari DB
  reading_score: number | string;
  writing_score: number | string;
  overall_score: number | string;
  writing_feedback: any;
  created_at: string;
  completed_at: string | null;
}

export default function ResultPage({ params }: { params: { id: string } }) {
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Ambil ID dengan aman
  const attemptId = params?.id;

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    let isMounted = true; 

    const fetchResult = async () => {
      if (!attemptId) {
        setLoading(false);
        return;
      }

      console.log("🔍 Fetching ID:", attemptId);

      try {
        const { data, error } = await supabase
          .from('test_attempts')
          .select('*')
          .eq('id', attemptId)
          .single();
        
        if (error) {
          console.error("❌ Supabase Error:", error);
          setErrorMsg(error.message);
        }

        if (isMounted && data) {
          console.log("✅ Data Found:", data);
          setResult(data);
        }
      } catch (err) {
        console.error("❌ Fetch Exception:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchResult();
    return () => { isMounted = false; };
  }, [attemptId, supabase]);

  // --- HELPER: FORMAT TANGGAL AMAN ---
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Recently Completed";
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  // --- 1. LOADING STATE ---
  if (loading) return <LoadingScreen />;

  // --- 2. NOT FOUND / ERROR STATE ---
  if (!result || !attemptId) {
    return (
      <DashboardLayout userName="Student" userTier="basic">
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-xl text-center max-w-lg w-full">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchX className="text-[#E56668]" size={40} />
            </div>
            <h1 className="text-2xl font-bold text-[#2F4157] mb-3">Result Not Found</h1>
            <p className="text-gray-500 mb-4 leading-relaxed">
              We couldn't retrieve your assessment data.
            </p>
            
            {/* DEBUG INFO BUAT LU NGINTIP ERRORNYA */}
            {errorMsg && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg mb-6 text-left font-mono break-all">
                System Error: {errorMsg}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => window.location.reload()} className="flex-1 py-3 px-4 bg-[#2F4157] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1e2b3a] transition-colors">
                <RefreshCcw size={18} /> Refresh
              </button>
              <Link href="/dashboard" className="flex-1 py-3 px-4 bg-white border-2 border-gray-200 text-gray-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <Home size={18} /> Dashboard
              </Link>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // --- 3. DATA PREPARATION ---
  const feedback = result.writing_feedback || {};
  const hasFeedback = feedback.strengths && feedback.strengths.length > 0;
  
  // Konversi skor string ke number untuk kalkulasi
  const overallScore = parseFloat(String(result.overall_score || 0));

  return (
    <DashboardLayout userName={result.full_name || "Student"} userTier="pro">
      <div className="max-w-6xl mx-auto p-4 sm:p-8">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
               <ArrowLeft size={24} className="text-gray-400"/>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#2F4157]">Assessment Report</h1>
              <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">ID: {attemptId.substring(0,8)}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-500">{formatDate(result.completed_at || result.created_at)}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <Download size={16}/> PDF
            </button>
            <button className="flex-1 sm:flex-none px-4 py-2 bg-[#2F4157] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#1e2b3a] shadow-lg shadow-blue-900/20 transition-colors">
              <Share2 size={16}/> Share
            </button>
          </div>
        </div>

        {/* HERO SCORE CARD */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1 bg-gradient-to-br from-[#2F4157] to-[#1e2b3a] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl transition-transform hover:scale-[1.01]">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 opacity-80">
                  <Trophy size={18} className="text-yellow-400" />
                  <span className="text-sm font-bold tracking-widest uppercase">Overall Band</span>
                </div>
                <h1 className="text-8xl font-bold mb-2 tracking-tighter">{overallScore}</h1>
                <CEFRBadge score={overallScore} />
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm opacity-60 mb-1">Predicted Proficiency</p>
                <p className="font-medium text-lg text-emerald-300">
                  {overallScore >= 7 ? "Proficient User" : overallScore >= 5 ? "Competent User" : "Modest User"}
                </p>
              </div>
            </div>
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          </div>

          {/* SKILL BARS */}
          <div className="lg:col-span-2 grid gap-4">
             <SkillBar 
                icon={<Headphones size={24} className="text-blue-500"/>} 
                title="Listening" 
                score={result.listening_score} 
                color="bg-blue-500" 
                desc="Comprehension of spoken English." 
             />
             <SkillBar 
                icon={<FileText size={24} className="text-green-500"/>} 
                title="Reading" 
                score={result.reading_score} 
                color="bg-green-500" 
                desc="Analysis of complex texts." 
             />
             <SkillBar 
                icon={<PenTool size={24} className="text-purple-500"/>} 
                title="Writing" 
                score={result.writing_score} 
                color="bg-purple-500" 
                desc="Coherence, vocabulary, and grammar." 
             />
          </div>
        </div>

        {/* FEEDBACK SECTION */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-50 rounded-xl"><Star className="text-amber-500 fill-amber-500" size={24} /></div>
                <div>
                  <h2 className="text-xl font-bold text-[#2F4157]">Writing Analysis</h2>
                  <p className="text-sm text-gray-400">AI-Generated Assessment</p>
                </div>
              </div>

              {hasFeedback ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <CriterionCard title="Task Achievement" score={feedback.task_achievement} />
                    <CriterionCard title="Coherence" score={feedback.coherence_cohesion} />
                    <CriterionCard title="Lexical Resource" score={feedback.lexical_resource} />
                    <CriterionCard title="Grammar" score={feedback.grammar} />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><CheckCircle2 className="text-green-500" size={20}/> Strengths</h3>
                      <div className="grid gap-2">
                        {feedback.strengths.map((item: string, i: number) => (
                          <div key={i} className="flex gap-3 text-gray-600 text-sm bg-green-50/50 p-3 rounded-xl border border-green-100/50">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"/>{item}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><TrendingUp className="text-blue-500" size={20}/> Improvements</h3>
                      <div className="grid gap-2">
                        {feedback.improvements.map((item: string, i: number) => (
                          <div key={i} className="flex gap-3 text-gray-600 text-sm bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"/>{item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 text-center">
                  <AlertCircle className="mx-auto text-gray-400 mb-3" size={32} />
                  <h3 className="font-bold text-gray-700">Analysis Pending</h3>
                  <p className="text-sm text-gray-500 mt-1">Detailed AI feedback is being generated or is unavailable for this test session.</p>
                </div>
              )}
            </div>
          </div>

          {/* RECOMMENDATIONS */}
          <div className="lg:col-span-1">
             <div className="bg-[#F8FAFC] rounded-3xl p-6 sticky top-24 border border-gray-100">
                <h3 className="font-bold text-[#2F4157] mb-4 flex items-center gap-2"><BookOpen size={20}/> Recommended Plan</h3>
                <div className="space-y-3">
                  <RecommendationCard title="Writing Task 2 Masterclass" type="Course" />
                  <RecommendationCard title="Vocab Builder PDF" type="Resource" />
                  <RecommendationCard title="Speaking Mock" type="Mentoring" />
                </div>
                <button className="w-full mt-6 py-3 bg-white border-2 border-[#E56668] text-[#E56668] rounded-xl font-bold text-sm hover:bg-[#E56668] hover:text-white transition-colors shadow-sm">View Full Study Plan</button>
             </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

// --- SUB COMPONENTS (DIPERBAIKI) ---

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Loader2 className="w-12 h-12 text-[#E56668] animate-spin mb-4" />
      <p className="text-gray-500 font-medium">Retrieving results...</p>
    </div>
  )
}

function CEFRBadge({ score }: { score: number }) {
  let level = "A2";
  if (score >= 4.0) level = "B1"; if (score >= 5.5) level = "B2"; if (score >= 7.0) level = "C1"; if (score >= 8.5) level = "C2";
  return <div className="inline-block px-3 py-1 rounded-lg bg-white/20 border border-white/20 text-xs font-bold backdrop-blur-sm shadow-sm">CEFR: {level}</div>
}

// ⚠️ FIXED: SkillBar sekarang menangani string score dengan aman
function SkillBar({ icon, title, score, color, desc }: any) {
  // Parsing string "5.5" -> float 5.5. Jika error/null -> 0
  const parsedScore = parseFloat(String(score || 0));
  const safeScore = isNaN(parsedScore) ? 0 : parsedScore;
  const percentage = Math.min((safeScore / 9) * 100, 100);

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center h-full hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-xl">{icon}</div>
            <div><h3 className="font-bold text-gray-800">{title}</h3></div>
        </div>
        {/* Tampilkan score apa adanya (bisa string) */}
        <div className="text-2xl font-bold text-[#2F4157]">{score || "0.0"}</div>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
        <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${percentage}%` }}/>
      </div>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  );
}

function CriterionCard({ title, score }: any) {
  return <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100"><span className="text-sm font-medium text-gray-700">{title}</span><span className="font-bold text-[#2F4157] bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100 min-w-[3rem] text-center">{score || "-"}</span></div>
}

function RecommendationCard({ title, type }: any) {
  return <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 cursor-pointer hover:border-blue-200 transition-colors group"><div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">{type[0]}</div><div className="flex-1 text-sm font-bold text-gray-700">{title}</div><ArrowLeft size={16} className="text-gray-300 rotate-180 group-hover:text-blue-500 transition-colors"/></div>
}