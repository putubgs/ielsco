"use client";

import { useEffect, useState, use } from "react";
import { createBrowserClient } from "@supabase/ssr";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import Image from "next/image";
import { 
  Trophy, Headphones, FileText, PenTool, 
  Download, Share2, Star, Award,
  CheckCircle2, TrendingUp, BookOpen, Target,
  SearchX, RefreshCcw, Home, ArrowLeft, Loader2, AlertCircle,
  Sparkles, ChevronRight, Calendar
} from "lucide-react";

interface TestResult {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  listening_score: number | string;
  reading_score: number | string;
  writing_score: number | string;
  overall_score: number | string;
  ielts_band: number | string;
  writing_feedback: any;
  created_at: string;
  completed_at: string | null;
}

export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params); 
  const attemptId = resolvedParams.id;

  const [result, setResult] = useState<TestResult | null>(null);
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    let isMounted = true;

    const fetchResult = async () => {
      if (!attemptId) return;

      try {
        // Fetch test result
        const { data: testData, error: testError } = await supabase
          .from('test_attempts')
          .select('*')
          .eq('id', attemptId)
          .single();
        
        if (testError) {
          console.error("❌ Test Error:", testError);
          setErrorMsg(testError.message);
          return;
        }

        if (testData && isMounted) {
  console.log("🔍 RAW FEEDBACK:", testData.writing_feedback); // Cek console browser
  console.log("TYPE:", typeof testData.writing_feedback);
  setResult(testData);
  // ... rest of code

          // Fetch user avatar
          if (testData.user_id) {
            const { data: userData } = await supabase
              .from('users')
              .select('avatar_url')
              .eq('id', testData.user_id)
              .single();

            if (userData?.avatar_url) {
              setUserAvatar(userData.avatar_url);
            }
          }
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Recently Completed";
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-4">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-[#E56668] animate-spin" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-[#E56668]/20 rounded-full animate-ping" />
        </div>
        <p className="text-gray-600 font-semibold mt-6 text-lg">Retrieving Your Results...</p>
        <p className="text-gray-400 text-sm mt-2">This won't take long</p>
      </div>
    );
  }

  // Not Found State
  if (!result) {
    return (
      <DashboardLayout userName="Student" userTier="explorer" userAvatar="">
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
          <div className="bg-white p-12 rounded-3xl border-2 border-gray-100 shadow-2xl text-center max-w-lg w-full">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-red-100">
              <SearchX className="text-[#E56668]" size={48} />
            </div>
            <h1 className="text-3xl font-bold text-[#2F4157] mb-3">Result Not Found</h1>
            <p className="text-gray-500 mb-6 leading-relaxed">
              We couldn't retrieve your assessment data. The test may still be processing or the ID is invalid.
            </p>
            {errorMsg && (
              <div className="bg-red-50 text-red-700 text-xs p-4 rounded-xl mb-6 text-left font-mono border border-red-100">
                <strong>Error:</strong> {errorMsg}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => window.location.reload()} 
                className="flex-1 py-3 px-6 bg-[#2F4157] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1e2b3a] transition-all"
              >
                <RefreshCcw size={18} /> Try Again
              </button>
              <Link 
                href="/dashboard/test" 
                className="flex-1 py-3 px-6 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:border-[#E56668] hover:text-[#E56668] transition-all"
              >
                <Home size={18} /> Dashboard
              </Link>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Data Preparation
  // ==========================================
  // FIX: ROBUST DATA PREPARATION
  // ==========================================
  
  let feedback = result.writing_feedback || {};

  // 1. Handle jika feedback dikembalikan sebagai string JSON
  if (typeof feedback === 'string') {
    try {
      feedback = JSON.parse(feedback);
    } catch (e) {
      console.error("Failed to parse feedback JSON", e);
      feedback = {};
    }
  }

  // 2. Mapping score dengan fallback (jaga-jaga nama key beda)
  // Ini memastikan data muncul meskipun nama key di DB sedikit berbeda
  const scores = {
    ta: feedback.task_achievement || feedback.task_response || feedback.Task_Achievement || 0,
    cc: feedback.coherence_cohesion || feedback.coherence || feedback.Coherence_Cohesion || 0,
    lr: feedback.lexical_resource || feedback.vocabulary || feedback.Lexical_Resource || 0,
    gr: feedback.grammar || feedback.grammar_range || feedback.grammatical_range || feedback.Grammar || 0
  };

  // 3. Cek validitas feedback yang lebih aman
  const hasFeedback = feedback && (
    (feedback.analysis && feedback.analysis.length > 0) || 
    (feedback.strengths && feedback.strengths.length > 0) ||
    scores.ta > 0
  );

  const overallScore = parseFloat(String(result.overall_score || result.ielts_band || 0));
  const listeningScore = parseFloat(String(result.listening_score || 0));
  const readingScore = parseFloat(String(result.reading_score || 0));
  const writingScore = parseFloat(String(result.writing_score || 0));

  return (
    <DashboardLayout 
      userName={result.full_name || "Student"} 
      userTier="explorer"
      userAvatar={userAvatar}
    >
      <div className="max-w-7xl mx-auto p-4 sm:p-8 pb-16">
        
        {/* Header with Back Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard/test" 
              className="p-3 hover:bg-gray-100 rounded-xl transition-all group"
            >
              <ArrowLeft size={24} className="text-gray-400 group-hover:text-[#E56668] transition-colors"/>
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-[#2F4157]">Assessment Report</h1>
                <div className="px-3 py-1 bg-green-50 border border-green-200 rounded-full">
                  <span className="text-green-700 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 size={14} /> Completed
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="font-mono bg-gray-50 px-3 py-1 rounded-lg text-gray-600 border border-gray-200">
                  ID: {attemptId.substring(0,8)}...
                </span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {formatDate(result.completed_at || result.created_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-5 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-300 transition-all">
              <Download size={16}/> Export PDF
            </button>
            <button className="flex-1 sm:flex-none px-5 py-2.5 bg-[#2F4157] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#1e2b3a] shadow-lg shadow-blue-900/10 transition-all">
              <Share2 size={16}/> Share Result
            </button>
          </div>
        </div>

        {/* Hero Score Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          
          {/* Overall Score Card */}
          <div className="lg:col-span-1 bg-gradient-to-br from-[#2F4157] via-[#2F4157] to-[#1e2b3a] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E56668]/10 rounded-full blur-3xl -ml-16 -mb-16" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 opacity-90">
                  <Trophy size={20} className="text-yellow-400" />
                  <span className="text-sm font-bold tracking-widest uppercase">Overall IELTS Band</span>
                </div>
                <h1 className="text-8xl font-bold mb-4 tracking-tighter leading-none">
                  {overallScore.toFixed(1)}
                </h1>
                <CEFRBadge score={overallScore} />
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
                <p className="text-sm opacity-60">Predicted Proficiency</p>
                <p className="font-bold text-xl text-emerald-300">
                  {overallScore >= 7 ? "🎯 Proficient User" : overallScore >= 5.5 ? "💪 Competent User" : "📚 Modest User"}
                </p>
                <p className="text-xs opacity-60 mt-2">
                  {overallScore >= 7 
                    ? "Ready for academic/professional English environments" 
                    : overallScore >= 5.5 
                    ? "Good foundation, room for improvement"
                    : "Keep practicing, you're making progress!"}
                </p>
              </div>
            </div>
          </div>

          {/* Skill Bars */}
          <div className="lg:col-span-2 grid gap-4">
            <SkillBar 
              icon={<Headphones size={28} className="text-blue-600"/>} 
              title="Listening Comprehension" 
              score={listeningScore} 
              color="bg-blue-500" 
              desc="Understanding spoken English in various contexts and accents."
              maxScore={9}
            />
            <SkillBar 
              icon={<FileText size={28} className="text-green-600"/>} 
              title="Reading Analysis" 
              score={readingScore} 
              color="bg-green-500" 
              desc="Comprehension and analysis of complex written texts."
              maxScore={9}
            />
            <SkillBar 
              icon={<PenTool size={28} className="text-purple-600"/>} 
              title="Writing Proficiency" 
              score={writingScore} 
              color="bg-purple-500" 
              desc="Task response, coherence, vocabulary, and grammatical accuracy."
              maxScore={9}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Writing Feedback Section (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* AI Analysis Card */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
                  <Sparkles className="text-amber-600" size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#2F4157]">AI Writing Analysis</h2>
                  <p className="text-sm text-gray-500">Comprehensive assessment powered by GPT-4</p>
                </div>
              </div>

              {hasFeedback ? (
                <div className="space-y-8">
                  
            {/* Criteria Grid */}
<div className="grid sm:grid-cols-2 gap-4">
  <CriterionCard 
    title="Task Achievement" 
    score={scores.ta} // Ganti ini
    description="How well you addressed the question"
  />
  <CriterionCard 
    title="Coherence & Cohesion" 
    score={scores.cc} // Ganti ini
    description="Logical flow and paragraph structure"
  />
  <CriterionCard 
    title="Lexical Resource" 
    score={scores.lr} // Ganti ini
    description="Vocabulary range and accuracy"
  />
  <CriterionCard 
    title="Grammar Range" 
    score={scores.gr} // Ganti ini
    description="Sentence variety and accuracy"
  />
</div>
  {/* --- NEW: DETAILED ANALYSIS SECTION --- */}
                  {feedback.analysis && (
                    <div className="bg-slate-50 rounded-2xl p-6 border-l-4 border-[#2F4157]">
                      <h3 className="font-bold text-[#2F4157] text-lg mb-3 flex items-center gap-2">
                        <FileText size={20} className="text-[#E56668]" />
                        Examiner's Note
                      </h3>
                      <div 
                        className="text-gray-700 text-sm leading-relaxed space-y-2 [&>b]:text-gray-900 [&>b]:font-bold"
                        dangerouslySetInnerHTML={{ __html: feedback.analysis }} 
                      />
                    </div>
                  )}
                  {/* -------------------------------------- */}
                  {/* Detailed Feedback */}
                  <div className="space-y-6 pt-6 border-t border-gray-100">
                    
                    {/* Strengths */}
                    {feedback.strengths && feedback.strengths.length > 0 && (
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                          <div className="p-2 bg-green-50 rounded-lg">
                            <CheckCircle2 className="text-green-600" size={20}/>
                          </div>
                          What You Did Well
                        </h3>
                        <div className="space-y-3">
                          {feedback.strengths.map((item: string, i: number) => (
                            <div 
                              key={i} 
                              className="flex gap-4 text-gray-700 text-sm bg-green-50/50 p-4 rounded-xl border border-green-100/50 hover:bg-green-50 transition-colors"
                            >
                              <Award size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                              <p className="leading-relaxed">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Improvements */}
                    {feedback.improvements && feedback.improvements.length > 0 && (
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <TrendingUp className="text-blue-600" size={20}/>
                          </div>
                          Areas for Improvement
                        </h3>
                        <div className="space-y-3">
                          {feedback.improvements.map((item: string, i: number) => (
                            <div 
                              key={i} 
                              className="flex gap-4 text-gray-700 text-sm bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 hover:bg-blue-50 transition-colors"
                            >
                              <Target size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                              <p className="leading-relaxed">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Summary & Recommendations */}
                    {(feedback.summary || feedback.recommendations) && (
                      <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <Star className="text-purple-600 fill-purple-600" size={18} />
                          Overall Assessment
                        </h4>
                        {feedback.summary && (
                          <p className="text-sm text-gray-700 leading-relaxed mb-4">
                            {feedback.summary}
                          </p>
                        )}
                        {feedback.recommendations && (
                          <div className="pt-4 border-t border-purple-100">
                            <p className="text-xs font-bold text-purple-900 uppercase tracking-wide mb-2">
                              Next Steps:
                            </p>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {feedback.recommendations}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center">
                  <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="font-bold text-gray-700 text-lg mb-2">Analysis In Progress</h3>
                  <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                    Detailed AI feedback is being generated. Please check back in a few minutes, or contact support if this persists.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar (1/3 width) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Recommended Plan */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 sticky top-24 border-2 border-gray-100 shadow-sm">
              <h3 className="font-bold text-[#2F4157] text-lg mb-1 flex items-center gap-2">
                <BookOpen size={20} className="text-[#E56668]"/> 
                Personalized Study Plan
              </h3>
              <p className="text-xs text-gray-500 mb-5">Based on your results</p>
              
              <div className="space-y-3">
                <RecommendationCard 
                  title="IELTS Writing Task 2 Masterclass" 
                  type="Course"
                  color="blue"
                />
                <RecommendationCard 
                  title="Academic Vocabulary Builder" 
                  type="Resource"
                  color="green"
                />
                <RecommendationCard 
                  title="1-on-1 Writing Review Session" 
                  type="Mentoring"
                  color="purple"
                />
              </div>
              
              <button className="w-full mt-6 py-3 bg-[#E56668] text-white rounded-xl font-bold text-sm hover:bg-[#E56668]/90 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 group">
                View Full Plan
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 mt-5 border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4">Quick Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Test Duration</span>
                  <span className="font-bold text-[#2F4157]">~60 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Questions Answered</span>
                  <span className="font-bold text-[#2F4157]">42/42</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Global Percentile</span>
                  <span className="font-bold text-green-600">
                    {Math.round((overallScore / 9) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
            </div>

      </div>
    </DashboardLayout>
  );
}

// ============================================
// SUB COMPONENTS
// ============================================

function CEFRBadge({ score }: { score: number }) {
  let level = "A2";
  let color = "bg-orange-500";
  
  if (score >= 8.5) { level = "C2"; color = "bg-purple-600"; }
  else if (score >= 7.0) { level = "C1"; color = "bg-blue-600"; }
  else if (score >= 5.5) { level = "B2"; color = "bg-green-600"; }
  else if (score >= 4.0) { level = "B1"; color = "bg-yellow-600"; }
  
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${color} text-white text-sm font-bold shadow-lg`}>
      <span>CEFR Level:</span>
      <span className="text-lg">{level}</span>
    </div>
  );
}

function SkillBar({ icon, title, score, color, desc, maxScore }: any) {
  const parsedScore = parseFloat(String(score || 0));
  const safeScore = isNaN(parsedScore) ? 0 : parsedScore;
  const percentage = Math.min((safeScore / maxScore) * 100, 100);

  return (
    <div className="bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
          </div>
        </div>
        <div className="text-3xl font-bold text-[#2F4157]">
          {safeScore.toFixed(1)}
        </div>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out rounded-full`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function CriterionCard({ title, score, description }: any) {
  return (
    <div className="flex justify-between items-center p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all">
      <div>
        <span className="text-sm font-bold text-gray-800">{title}</span>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
      <span className="font-bold text-2xl text-[#2F4157] bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 min-w-[4rem] text-center">
        {score ? parseFloat(score).toFixed(1) : "-"}
      </span>
    </div>
  );
}

function RecommendationCard({ title, type, color }: any) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 group-hover:bg-blue-600",
    green: "bg-green-50 text-green-700 group-hover:bg-green-600",
    purple: "bg-purple-50 text-purple-700 group-hover:bg-purple-600"
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 cursor-pointer hover:border-[#E56668] hover:shadow-md transition-all group">
      <div className={`w-12 h-12 rounded-xl ${colors[color as keyof typeof colors]} flex items-center justify-center font-bold text-sm transition-all group-hover:text-white shadow-sm`}>
        {type[0]}
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-gray-800 group-hover:text-[#E56668] transition-colors leading-tight">
          {title}
        </p>
        <p className="text-xs text-gray-500">{type}</p>
      </div>
      <ChevronRight size={18} className="text-gray-300 group-hover:text-[#E56668] group-hover:translate-x-1 transition-all"/>
    </div>
  );
}