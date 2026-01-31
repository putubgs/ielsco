"use client";

import { useState, useEffect } from "react";
import { Target, TrendingUp, Calendar, ArrowRight, Sparkles, CheckCircle2, Crown } from "lucide-react";
import { getGoalSummary } from "@/data/goals";
import type { GoalSummary } from "@/types/goals";
import Link from "next/link";
import GoalWizard from "./GoalWizard";
import { cn } from "@/lib/utils";

interface GoalDashboardWidgetProps {
  userId: string;
  userTier?: "basic" | "pro";
}

export default function GoalDashboardWidget({ userId, userTier = "basic" }: GoalDashboardWidgetProps) {
  const [summary, setSummary] = useState<GoalSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    loadSummary();
  }, [userId]);

  const loadSummary = async () => {
    setLoading(true);
    const data = await getGoalSummary(userId);
    setSummary(data);
    setLoading(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-8 animate-pulse h-[300px]">
        <div className="h-8 bg-gray-200 rounded-full w-1/3 mb-6"></div>
        <div className="space-y-3">
           <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
           <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
        </div>
      </div>
    );
  }

  // --- NO GOAL STATE (HERO) ---
  if (!summary) {
    return (
      <>
        {/* Container: FULL NAVY #2F4157 (No Gradient) */}
        <div className="bg-[#2F4157] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
          
          {/* Decorative Background Elements (Subtle) */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E56668] opacity-10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
          
          <div className="relative z-10 flex flex-col items-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#E56668] text-white text-xs font-bold uppercase tracking-widest mb-4 border border-white/5">
              <Target size={14} /> Set Your Goal
            </div>
            
            <h3 className="font-bold text-3xl md:text-4xl mb-3 tracking-tight">
              Where do you want to go? 🚀
            </h3>
            
            <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl mb-8">
              Don't just learn randomly. Tell us your dream (e.g., "Study in UK", "Remote Job") 
              and we'll build a personalized roadmap with measurable milestones.
            </p>
            
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <button 
                onClick={() => setShowWizard(true)}
                className="
                  flex-1 sm:flex-none
                  px-8 py-2.5
                  bg-[#E56668] text-white 
                  rounded-full font-bold text-sm 
                  shadow-lg shadow-red-900/20
                  transition-all duration-200 ease-out
                  hover:bg-[#d65557] hover:scale-[1.02]
                  active:scale-[0.96] active:brightness-95
                  flex items-center justify-center gap-2
                "
              >
                Start Goal Setting
                <ArrowRight size={18} />
              </button>
              
              <Link
                href="/dashboard/goals"
                className="
                  px-8 py-2.5
                  bg-white text-[#2F4157]
                  rounded-full font-bold text-sm 
                  border border-white/10
                  transition-all duration-200
                  hover:bg-white/90
                  active:scale-[0.96]
                  flex items-center justify-center gap-2
                "
              >
                Learn More
              </Link>
            </div>

   {/* --- PRO FEATURE CARD (WHITE SHAPE - FIXED FULL WIDTH) --- */}
            {userTier === "basic" && (
              <div className="mt-8 w-full"> {/* Wrapper div w-full */}
                <div className="p-5 bg-white rounded-2xl shadow-lg border border-gray-100 w-full relative overflow-hidden group/card">
                  
                  {/* Background Icon (Crown) */}
                  <div className="absolute -right-4 -bottom-4 opacity-5 transform rotate-12 group-hover/card:scale-110 group-hover/card:opacity-10 transition-all duration-500">
                     <Crown size={120} className="text-[#2F4157]" />
                  </div>

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-[#E56668] text-xs font-bold uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <Crown size={14} fill="currentColor" />
                        Pro Feature Coming
                      </p>
                      <p className="text-[#2F4157] font-semibold text-sm leading-snug max-w-lg">
                        Get personalized mentor consultations and verified progress tracking with Pro membership.
                      </p>
                    </div>
                    
                    {/* Optional: Add small upgrade button inside if needed */}
                    {/* <button className="...">Upgrade</button> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {showWizard && (
          <GoalWizard
            userId={userId}
            onClose={() => setShowWizard(false)}
            onSuccess={() => {
              setShowWizard(false);
              loadSummary();
            }}
          />
        )}
      </>
    );
  }

  // --- ACTIVE GOAL STATE ---
  const { goal, completed_tasks, total_tasks, next_task, days_remaining, is_on_track } = summary;
  const progressPercentage = goal.overall_progress;

  return (
    <>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
        {/* Header: Full Navy */}
        <div className="bg-[#2F4157] p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E56668]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-[10px] font-bold uppercase tracking-wider border border-white/5">
                <Target size={12} className="text-[#E56668]" />
                Active Goal
              </div>
              
              {is_on_track ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-[10px] font-bold border border-green-500/20">
                  <TrendingUp size={12} /> On Track
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-[10px] font-bold border border-orange-500/20">
                  <Calendar size={12} /> Need Focus
                </div>
              )}
            </div>
            
            <h3 className="font-bold text-xl md:text-2xl mb-1 text-white leading-tight">
              {goal.objective}
            </h3>
            <p className="text-white/60 text-xs font-medium uppercase tracking-wide">
              Target: {goal.destination}
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            
            {/* Circular Progress */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-100"
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
                  <span className="text-2xl font-bold text-[#2F4157]">
                    {progressPercentage}%
                  </span>
                  <span className="text-[9px] text-gray-400 uppercase tracking-wide font-bold">
                    Completed
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center border border-green-100">
                    <CheckCircle2 className="text-green-600" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Milestones</p>
                    <p className="font-bold text-[#2F4157] text-sm">
                      {completed_tasks} <span className="text-gray-400 font-normal">/ {total_tasks}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                    <Calendar className="text-blue-600" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Deadline</p>
                    <p className="font-bold text-[#2F4157] text-sm">
                      {days_remaining} Days Left
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center border border-orange-100">
                    <Sparkles className="text-orange-600" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Target Date</p>
                    <p className="font-bold text-[#2F4157] text-sm">
                      {new Date(goal.target_deadline).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Task */}
          {next_task && (
            <div className="bg-[#F8F9FC] border border-gray-200/60 rounded-2xl p-4 mb-4 mt-auto">
              <div className="flex items-center justify-between mb-2">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                   Up Next
                 </p>
                 <span className={`
                  px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border
                  ${next_task.task_type === 'system' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    next_task.task_type === 'self_track' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                    'bg-purple-50 text-purple-600 border-purple-100'}
                `}>
                  {next_task.task_type.replace('_', ' ')}
                </span>
              </div>
              
              <p className="font-semibold text-[#2F4157] text-sm mb-1 line-clamp-1">
                {next_task.title}
              </p>
              
              {next_task.weight >= 20 && (
                 <p className="text-[10px] text-[#E56668] font-bold flex items-center gap-1">
                   🔥 High Impact ({next_task.weight}%)
                 </p>
              )}
            </div>
          )}

          {/* Action Button */}
          <Link
            href={`/dashboard/goals/${goal.id}`}
            className="
              block w-full py-3 
              bg-[#2F4157] text-white text-center 
              rounded-full font-bold text-sm
              transition-all duration-200
              hover:bg-[#3d5570] hover:scale-[1.02]
              active:scale-[0.96]
            "
          >
            View Full Roadmap
          </Link>
        </div>
      </div>
    </>
  );
}