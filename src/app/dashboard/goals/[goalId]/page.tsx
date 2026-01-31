"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TaskList from "@/components/goals/TaskList";
import TaskSubmission from "@/components/goals/TaskSubmission";
import { createBrowserClient } from "@supabase/ssr";
import {
  ArrowLeft,
  Calendar,
  Clock,
  TrendingUp,
  Download,
  MessageSquare,
  Sparkles,
  AlertCircle,
  Crown,
  Trash2, // <--- 1. Import Icon Trash
  AlertTriangle // Import Icon Alert
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getGoalById, toggleTaskCompletion, submitTaskForReview, getGoalAnalytics, deleteGoal } from "@/data/goals";
import { calculateStudyPlan, formatMinutes } from "@/data/progress-calculator";
import type { GoalWithTasks, GoalAnalytics as GoalAnalyticsType } from "@/types/goals";

export default function GoalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const goalId = params?.goalId as string;
  
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
);

  // State
  const [userData, setUserData] = useState({ 
    id: "", 
    name: "", 
    tier: "basic" as "basic" | "pro" 
  });
  const [goal, setGoal] = useState<GoalWithTasks | null>(null);
  const [analytics, setAnalytics] = useState<GoalAnalyticsType | null>(null);
  const [studyPlan, setStudyPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false); // State untuk loading delete
  const [submissionModalTask, setSubmissionModalTask] = useState<string | null>(null);

  // Load data
  useEffect(() => {
    const initData = async () => {
      setLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/sign-in");
        return;
      }

      const { data: dbUser } = await supabase
        .from("users")
        .select(`*, memberships(tier)`)
        .eq("id", user.id)
        .single();

      const tier = dbUser?.memberships?.[0]?.tier === "pro" ? "pro" : "basic";

      setUserData({
        id: user.id,
        name: user.user_metadata?.full_name || "Learner",
        tier: tier
      });

      if (goalId) {
        await loadGoalDetails(goalId, tier);
      }
    };

    initData();
  }, [goalId, router, supabase]);

  const loadGoalDetails = async (id: string, tier: "basic" | "pro") => {
    try {
      const goalData = await getGoalById(id);
      const analyticsData = await getGoalAnalytics(id);
      
      if (goalData) {
        setGoal(goalData);
        
        // Calculate study plan
        const daysRemaining = Math.max(
          0,
          Math.ceil(
            (new Date(goalData.target_deadline).getTime() - new Date().getTime()) /
              (24 * 60 * 60 * 1000)
          )
        );
        
        const plan = calculateStudyPlan(
          goalData.objective,
          { ielts: 5.5 }, // Default, should come from user profile
          7.0,
          daysRemaining,
          true // Include speaking club
        );
        
        setStudyPlan(plan);
      }
      
      if (analyticsData) {
        setAnalytics(analyticsData);
      }
    } catch (error) {
      console.error("Failed to load goal:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId: string) => {
    if (!userData.id) return;
    const success = await toggleTaskCompletion(taskId, userData.id);
    if (success && goalId) {
      await loadGoalDetails(goalId, userData.tier);
    }
  };

  const handleSubmitTask = async (taskId: string, url: string, notes?: string) => {
    const success = await submitTaskForReview(taskId, url, notes);
    if (success && goalId) {
      await loadGoalDetails(goalId, userData.tier);
    }
    return success;
  };

  // --- 3. FUNGSI DELETE BARU ---
  const handleDeleteGoal = async () => {
    // Konfirmasi dulu biar gak kepencet
    if (!window.confirm("Are you sure you want to delete this goal? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    const success = await deleteGoal(goalId);
    
    if (success) {
      // Redirect balik ke halaman list goals
      router.push("/dashboard/goals");
    } else {
      alert("Failed to delete goal. Please try again.");
      setIsDeleting(false);
    }
  };

  if (loading || !goal) {
    return (
      <DashboardLayout userTier={userData.tier} userName={userData.name} userAvatar="">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto animate-pulse">
          <div className="h-48 bg-gray-200 rounded-3xl mb-6"></div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-gray-200 rounded-2xl"></div>
            <div className="h-96 bg-gray-200 rounded-2xl"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const completedTasks = goal.tasks.filter(t => t.is_completed).length;
  const totalTasks = goal.tasks.length;
  const progressPercentage = goal.overall_progress;
  
  const daysRemaining = Math.max(
    0,
    Math.ceil(
      (new Date(goal.target_deadline).getTime() - new Date().getTime()) /
        (24 * 60 * 60 * 1000)
    )
  );

  const currentTask = submissionModalTask 
    ? goal.tasks.find(t => t.id === submissionModalTask) 
    : null;

  // Determine difficulty color
  const getDifficultyColor = (level: string) => {
    switch(level) {
      case 'easy': return 'text-green-600';
      case 'moderate': return 'text-blue-600';
      case 'challenging': return 'text-orange-600';
      case 'extreme': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <DashboardLayout userTier={userData.tier} userName={userData.name} userAvatar="">
      <div className="min-h-screen bg-[#F7F8FA]">
        
        {/* Header Section */}
        <div className="bg-gradient-to-br from-[#2F4157] via-[#3a4f66] to-[#2F4157] text-white">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
            
            {/* Back Link */}
            <Link
              href="/dashboard/goals"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Goals
            </Link>
            
            {/* Goal Title Row */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              
              {/* Left: Title & Meta */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wide mb-3 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  {goal.destination}
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                  {goal.objective}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={16} />
                    Target: {new Date(goal.target_deadline).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={16} />
                    {daysRemaining} days remaining
                  </span>
                </div>
              </div>

              {/* Right: Circular Progress */}
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-white/10"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className="text-[#E56668] transition-all duration-1000 ease-out drop-shadow-md"
                      strokeDasharray={`${progressPercentage}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{progressPercentage}%</span>
                    <span className="text-[10px] text-white/60 uppercase tracking-widest font-medium">Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* LEFT COLUMN: Task List (2/3) */}
            <div className="lg:col-span-2 space-y-6">
              <TaskList
                tasks={goal.tasks}
                userTier={userData.tier}
                onToggleTask={handleToggleTask}
                onSubmitTask={(taskId) => setSubmissionModalTask(taskId)}
              />
            </div>

            {/* RIGHT COLUMN: Sidebar (1/3) */}
            <div className="space-y-6">
              
              {/* Daily Study Plan Card */}
              {studyPlan && (
                <div className="bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-yellow-400" size={20} />
                    <h3 className="font-bold text-lg">Daily Study Plan</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Required Time */}
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide mb-1">
                        Required Time
                      </p>
                      <p className="text-3xl font-bold text-[#E56668]">
                        {studyPlan.dailyMinutesRequired}m
                        <span className="text-base text-white/60 font-normal ml-1">/day</span>
                      </p>
                    </div>
                    
                    {/* Feasibility */}
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide mb-1">
                        Feasibility
                      </p>
                      <p className={cn(
                        "text-sm font-bold uppercase tracking-wider",
                        studyPlan.difficultyLevel === 'easy' && "text-green-400",
                        studyPlan.difficultyLevel === 'moderate' && "text-blue-400",
                        studyPlan.difficultyLevel === 'challenging' && "text-orange-400",
                        studyPlan.difficultyLevel === 'extreme' && "text-red-400"
                      )}>
                        {studyPlan.difficultyLevel}
                      </p>
                    </div>
                    
                    {/* Recommendation */}
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs text-white/80 leading-relaxed flex items-start gap-2">
                        <AlertCircle size={14} className="flex-shrink-0 mt-0.5 text-yellow-400" />
                        <span>{studyPlan.recommendation}</span>
                      </p>
                    </div>
                    
                    {/* Speaking Club Impact */}
                    {studyPlan.speakingClubImpact && (
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-white/60 text-xs uppercase tracking-wide mb-2">
                          🎤 Speaking Club Impact
                        </p>
                        <div className="grid grid-cols-2 gap-3 text-center">
                          <div className="bg-white/5 rounded-lg p-2">
                            <p className="text-xl font-bold text-white">
                              {studyPlan.speakingClubImpact.contributionPercentage}%
                            </p>
                            <p className="text-[10px] text-white/60">Coverage</p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-2">
                            <p className="text-xl font-bold text-white">
                              {studyPlan.speakingClubImpact.totalSessions}
                            </p>
                            <p className="text-[10px] text-white/60">Sessions</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Quick Actions Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-[#2F4157] mb-4 text-lg">
                  Quick Actions
                </h3>
                
                <div className="space-y-3">
                  <Link
                    href={`/dashboard/goals/${goalId}/progress-report`}
                    className="group w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left border border-gray-100"
                  >
                    <span className="text-sm font-semibold text-[#2F4157] group-hover:text-[#E56668] transition-colors flex items-center gap-2">
                      <Download size={18} />
                      Export Progress Report
                    </span>
                  </Link>
                  
                  <Link
                    href={`/dashboard/goals/${goalId}/consultation`}
                    className={cn(
                      "group w-full flex items-center justify-between p-4 rounded-xl transition-colors text-left border",
                      userData.tier === "pro"
                        ? "bg-[#E56668]/5 hover:bg-[#E56668]/10 border-[#E56668]/20"
                        : "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed"
                    )}
                  >
                    <span className={cn(
                      "text-sm font-semibold flex items-center gap-2",
                      userData.tier === "pro" 
                        ? "text-[#E56668]" 
                        : "text-gray-500"
                    )}>
                      <MessageSquare size={18} />
                      Book Mentor Consultation
                    </span>
                    {userData.tier === "basic" && (
                      <Crown size={16} className="text-gray-400" />
                    )}
                  </Link>
            
{/* DELETE BUTTON */}
                <button 
                  onClick={handleDeleteGoal}
                  disabled={isDeleting}
                  className="w-full flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl transition-colors text-left group mt-4"
                >
                  <span className="text-sm font-semibold text-red-600">
                    {isDeleting ? "Deleting..." : "Delete Goal"}
                  </span>
                  <Trash2 size={18} className="text-red-400 group-hover:text-red-600" />
                </button>
               </div>
              </div>
              {/* Category Progress (if analytics available) */}
              {analytics && Object.keys(analytics.category_progress).length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-[#2F4157] mb-5 text-lg flex items-center gap-2">
                    <TrendingUp size={20} className="text-[#E56668]" />
                    Progress Breakdown
                  </h3>
                  <div className="space-y-5">
                    {Object.entries(analytics.category_progress).map(([category, data]) => (
                      <div key={category}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                            {category}
                          </span>
                          <span className="text-xs font-bold text-[#2F4157]">
                            {data.percentage}%
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#E56668] to-[#ff8f91] rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${data.percentage}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1 text-right font-medium">
                          {data.completed}/{data.total} tasks
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
       
      </div>
            </div>

      {/* Task Submission Modal */}
      {currentTask && (
        <TaskSubmission
          task={currentTask}
          isOpen={!!submissionModalTask}
          onClose={() => setSubmissionModalTask(null)}
          onSubmit={handleSubmitTask}
        />
      )}
    </DashboardLayout>
  );
}