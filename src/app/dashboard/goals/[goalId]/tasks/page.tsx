"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TaskList from "@/components/goals/TaskList";
import TaskSubmission from "@/components/goals/TaskSubmission";
import { createBrowserClient } from "@supabase/ssr";
import {
  ArrowLeft,
  Filter,
  Download,
  BookOpen,
  FileText,
  Video,
  Headphones,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { getGoalById, toggleTaskCompletion, submitTaskForReview } from "@/data/goals";
import { getPersonalizedAssignments, getPersonalizedMaterials } from "@/data/assignments-materials";
import type { GoalWithTasks } from "@/types/goals";

export default function TasksPage() {
  const params = useParams();
  const router = useRouter();
  const goalId = params?.goalId as string;
  
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
);

  const [userData, setUserData] = useState({ 
    id: "", 
    name: "", 
    tier: "basic" as "basic" | "pro" 
  });
  const [goal, setGoal] = useState<GoalWithTasks | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissionModalTask, setSubmissionModalTask] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"tasks" | "materials">("tasks");

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
        const goalData = await getGoalById(goalId);
        if (goalData) setGoal(goalData);
      }
      
      setLoading(false);
    };

    initData();
  }, [goalId, router, supabase]);

  const handleToggleTask = async (taskId: string) => {
    if (!userData.id) return;
    const success = await toggleTaskCompletion(taskId, userData.id);
    if (success && goalId) {
      const goalData = await getGoalById(goalId);
      if (goalData) setGoal(goalData);
    }
  };

  const handleSubmitTask = async (taskId: string, url: string, notes?: string) => {
    const success = await submitTaskForReview(taskId, url, notes);
    if (success && goalId) {
      const goalData = await getGoalById(goalId);
      if (goalData) setGoal(goalData);
    }
    return success;
  };

  if (loading || !goal) {
    return (
      <DashboardLayout userTier={userData.tier} userName={userData.name} userAvatar="">
        <div className="p-8 max-w-7xl mx-auto animate-pulse">
          <div className="h-12 bg-gray-200 rounded-xl w-64 mb-8"></div>
          <div className="h-96 bg-gray-200 rounded-2xl"></div>
        </div>
      </DashboardLayout>
    );
  }

  const assignments = getPersonalizedAssignments(goal.objective, 10);
  const materials = getPersonalizedMaterials(goal.objective, userData.tier);
  const currentTask = submissionModalTask 
    ? goal.tasks.find(t => t.id === submissionModalTask) 
    : null;

  const getMaterialIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video size={16} />;
      case 'podcast': return <Headphones size={16} />;
      case 'ebook': return <BookOpen size={16} />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <DashboardLayout userTier={userData.tier} userName={userData.name} userAvatar="">
      <div className="min-h-screen bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          
          {/* Header */}
          <div className="mb-8">
            <Link
              href={`/dashboard/goals/${goalId}`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2F4157] text-sm mb-4 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Goal
            </Link>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#2F4157] mb-2">
                  Tasks & Materials
                </h1>
                <p className="text-gray-600">
                  {goal.objective}
                </p>
              </div>
              
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-[#2F4157] rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                <Download size={18} />
                Export Task List
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-white border border-gray-200 p-1 rounded-xl mb-6 w-fit">
            <button
              onClick={() => setActiveTab("tasks")}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                activeTab === "tasks"
                  ? "bg-[#E56668] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              All Tasks ({goal.tasks.length})
            </button>
            <button
              onClick={() => setActiveTab("materials")}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                activeTab === "materials"
                  ? "bg-[#E56668] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Learning Materials ({materials.length})
            </button>
          </div>

          {/* Content */}
          {activeTab === "tasks" ? (
            <TaskList
              tasks={goal.tasks}
              userTier={userData.tier}
              onToggleTask={handleToggleTask}
              onSubmitTask={(taskId) => setSubmissionModalTask(taskId)}
            />
          ) : (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#2F4157] mb-4">
                  Recommended Learning Materials
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Curated resources to support your {goal.objective} journey
                </p>
                
                <div className="grid gap-4">
                  {materials.map((material) => (
                    <div
                      key={material.id}
                      className="group p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-100 hover:border-[#E56668]/30 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#E56668] flex-shrink-0">
                          {getMaterialIcon(material.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <h3 className="font-bold text-[#2F4157] group-hover:text-[#E56668] transition-colors">
                              {material.title}
                            </h3>
                            {material.isLocked && (
                              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded">
                                Pro
                              </span>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            {material.description}
                          </p>
                          
                          <div className="flex items-center gap-3 text-xs">
                            <span className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 font-medium">
                              {material.type}
                            </span>
                            <span className="px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 font-medium">
                              {material.difficulty}
                            </span>
                            {material.duration && (
                              <span className="text-gray-500">
                                {material.duration}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {material.url && !material.isLocked && (
                          <a
                            href={material.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-4 py-2 bg-[#E56668] text-white rounded-lg font-semibold text-sm hover:bg-[#C04C4E] transition-colors"
                          >
                            Access
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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