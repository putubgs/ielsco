"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  Trophy, Headphones, FileText, PenTool, 
  ChevronRight, Download, Share2, Star,
  CheckCircle2, XCircle, TrendingUp, BookOpen, Loader2
} from "lucide-react";
import confetti from 'canvas-confetti'; // Pastikan install: npm install canvas-confetti @types/canvas-confetti

export default function ResultPage({ params }: { params: { id: string } }) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

useEffect(() => {
    const fetchResult = async () => {
      console.log("Fetching result for ID:", params.id); // Debugging
      
      try {
        const { data, error } = await supabase
          .from('test_attempts')
          .select('*')
          .eq('id', params.id)
          .single();
        
        if (error) {
          console.error("Supabase Error:", error);
        }

        if (data) {
          setResult(data);
          // Trigger confetti only if score is decent
          if (data.overall_score >= 5.0) {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          }
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        // PENTING: Loading dimatikan APAPUN hasilnya (sukses/gagal)
        setLoading(false);
      }
    };
    fetchResult();
  }, [params.id]);

  if (loading) return <LoadingScreen />;
  if (!result) return <div className="p-20 text-center">Result not found.</div>;

  const feedback = result.writing_feedback || {};

  return (
    <DashboardLayout userName={result.full_name || "Student"} userTier="pro">
      <div className="max-w-6xl mx-auto p-4 sm:p-8">
        
        {/* TOP ACTION BAR */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#2F4157]">Assessment Report</h1>
            <p className="text-gray-500 text-sm">Attempt ID: {params.id.split('-')[0]}...</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              <Download size={16}/> Download PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#2F4157] text-white rounded-xl text-sm font-bold hover:bg-[#1e2b3a] transition-colors shadow-lg shadow-blue-900/20">
              <Share2 size={16}/> Share Result
            </button>
          </div>
        </div>

        {/* HERO SCORE CARD */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* LEFT: MAIN SCORE */}
          <div className="lg:col-span-1 bg-gradient-to-br from-[#2F4157] to-[#1e2b3a] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 opacity-80">
                  <Trophy size={18} className="text-yellow-400" />
                  <span className="text-sm font-bold tracking-widest uppercase">Overall Band Score</span>
                </div>
                <h1 className="text-8xl font-bold mb-2 tracking-tighter">{result.overall_score}</h1>
                <CEFRBadge score={result.overall_score} />
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm opacity-60 mb-1">Predicted IELTS Level</p>
                <p className="font-medium text-lg">Competent User</p>
              </div>
            </div>
            
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4">
               <Trophy size={300} />
            </div>
          </div>

          {/* RIGHT: SKILL BREAKDOWN */}
          <div className="lg:col-span-2 grid gap-4">
             <SkillBar 
                icon={<Headphones size={24} className="text-blue-500"/>}
                title="Listening"
                score={result.listening_score}
                max={9}
                color="bg-blue-500"
                desc="Ability to understand spoken English in academic contexts."
             />
             <SkillBar 
                icon={<FileText size={24} className="text-green-500"/>}
                title="Reading"
                score={result.reading_score}
                max={9}
                color="bg-green-500"
                desc="Ability to analyze complex texts and extract information."
             />
             <SkillBar 
                icon={<PenTool size={24} className="text-purple-500"/>}
                title="Writing"
                score={result.writing_score}
                max={9}
                color="bg-purple-500"
                desc="AI-Assessed based on Coherence, Vocabulary, and Grammar."
             />
          </div>
        </div>

        {/* AI FEEDBACK SECTION */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: DETAILED ANALYSIS */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-50 rounded-xl">
                  <Star className="text-amber-500 fill-amber-500" size={24} />
                </div>
                <h2 className="text-xl font-bold text-[#2F4157]">AI Writing Analysis</h2>
              </div>

              {/* Criterion Breakdown */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <CriterionCard title="Task Achievement" score={feedback.task_achievement || 0} />
                <CriterionCard title="Coherence & Cohesion" score={feedback.coherence_cohesion || 0} />
                <CriterionCard title="Lexical Resource" score={feedback.lexical_resource || 0} />
                <CriterionCard title="Grammar Accuracy" score={feedback.grammar || 0} />
              </div>

              <div className="space-y-6">
                <div>
                   <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                     <CheckCircle2 className="text-green-500" size={20}/> Strengths
                   </h3>
                   <ul className="space-y-2">
                     {(feedback.strengths || ["Detailed analysis pending..."]).map((item: string, i: number) => (
                       <li key={i} className="flex gap-3 text-gray-600 text-sm bg-green-50 p-3 rounded-lg border border-green-100">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"/>
                         {item}
                       </li>
                     ))}
                   </ul>
                </div>
                
                <div>
                   <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                     <TrendingUp className="text-blue-500" size={20}/> Areas for Improvement
                   </h3>
                   <ul className="space-y-2">
                     {(feedback.improvements || ["Detailed analysis pending..."]).map((item: string, i: number) => (
                       <li key={i} className="flex gap-3 text-gray-600 text-sm bg-blue-50 p-3 rounded-lg border border-blue-100">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"/>
                         {item}
                       </li>
                     ))}
                   </ul>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: RECOMMENDATIONS */}
          <div className="lg:col-span-1">
             <div className="bg-[#F8FAFC] rounded-3xl p-6 sticky top-24">
                <h3 className="font-bold text-[#2F4157] mb-4 flex items-center gap-2">
                  <BookOpen size={20}/> Recommended Plan
                </h3>
                
                <div className="space-y-3">
                  <RecommendationCard 
                    title="Mastering Writing Task 2"
                    type="Course"
                    time="2 Hours"
                  />
                  <RecommendationCard 
                    title="Advanced Vocabulary Builder"
                    type="Resource"
                    time="PDF"
                  />
                   <RecommendationCard 
                    title="1-on-1 Speaking Mock"
                    type="Mentoring"
                    time="15 Mins"
                  />
                </div>

                <button className="w-full mt-6 py-3 bg-white border-2 border-[#E56668] text-[#E56668] rounded-xl font-bold text-sm hover:bg-[#E56668] hover:text-white transition-all">
                  View Full Study Plan
                </button>
             </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

// --- SUB COMPONENTS ---

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center max-w-sm w-full text-center">
        <div className="relative mb-6">
           <div className="w-16 h-16 border-4 border-gray-100 rounded-full animate-spin border-t-[#E56668]"></div>
           <Star className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#E56668]" size={20} fill="#E56668"/>
        </div>
        <h2 className="text-xl font-bold text-[#2F4157] mb-2">Analyzing Results</h2>
        <p className="text-gray-500 text-sm">
          Our AI is grading your writing and compiling your personalized report...
        </p>
      </div>
    </div>
  )
}

function CEFRBadge({ score }: { score: number }) {
  let level = "A2";
  if (score >= 4.0) level = "B1";
  if (score >= 5.5) level = "B2";
  if (score >= 7.0) level = "C1";
  if (score >= 8.5) level = "C2";

  return (
    <div className="inline-block px-3 py-1 rounded-lg bg-white/20 border border-white/20 text-xs font-bold backdrop-blur-sm">
      CEFR Level: {level}
    </div>
  )
}

function SkillBar({ icon, title, score, max, color, desc }: any) {
  const percentage = (score / max) * 100;
  
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 rounded-xl">{icon}</div>
          <div>
            <h3 className="font-bold text-gray-800">{title}</h3>
            <p className="text-xs text-gray-400">Band Score</p>
          </div>
        </div>
        <div className="text-2xl font-bold text-[#2F4157]">{score}</div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function CriterionCard({ title, score }: any) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
      <span className="text-sm font-medium text-gray-700">{title}</span>
      <span className="font-bold text-[#2F4157] bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-100">
        {score}
      </span>
    </div>
  )
}

function RecommendationCard({ title, type, time }: any) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer group">
      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {type[0]}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-bold text-gray-700 leading-tight mb-1">{title}</h4>
        <p className="text-xs text-gray-400">{type} • {time}</p>
      </div>
      <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-500"/>
    </div>
  )
}