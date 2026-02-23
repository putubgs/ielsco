"use client";

import { useState } from "react";
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  Clock, 
  Star, 
  Send,
  FileText,
  Calendar,
  Zap,
  Crown,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { GoalTask } from "@/types/goals";
import PricingModal from "@/components/subscription/PricingModal";

interface TaskCardProps {
  task: GoalTask;
  userTier: "explorer" | "insider" | "visionary";
  onToggle?: (taskId: string) => void;
  onSubmit?: (taskId: string) => void;
  onViewMaterials?: (taskId: string) => void;
}

export default function TaskCard({ 
  task, 
  userTier, 
  onToggle, 
  onSubmit,
  onViewMaterials 
}: TaskCardProps) {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  
  // Check if task is locked (Pro only for Basic users)
  const isLocked = task.requires_verification && userTier === "explorer";
  const canInteract = !isLocked && (task.task_type === "self_track" || !task.is_completed);
  
  // Get task type styling
  const getTaskTypeStyle = () => {
    switch (task.task_type) {
      case "system":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "self_track":
        return "bg-orange-50 text-orange-700 border-orange-100";
      case "mentor_assessed":
        return "bg-purple-50 text-purple-700 border-purple-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };
  
  // Get category icon
  const getCategoryIcon = () => {
    switch (task.category) {
      case "reading": return <FileText size={14} />;
      case "writing": return <FileText size={14} />;
      case "speaking": return <Zap size={14} />;
      case "listening": return <Clock size={14} />;
      case "test": return <Star size={14} />;
      case "event": return <Calendar size={14} />;
      default: return <CheckCircle2 size={14} />;
    }
  };
  
  return (
    <>
      <div
        className={cn(
          "group relative p-5 rounded-2xl border-2 transition-all duration-200",
          task.is_completed
            ? "bg-green-50/30 border-green-100"
            : isLocked
            ? "bg-gray-50 border-gray-200 opacity-75"
            : "bg-white border-gray-100 hover:border-[#E56668]/30 hover:shadow-lg hover:-translate-y-0.5"
        )}
      >
        {/* Pro Lock Overlay - Posisi di z-10 */}
        {isLocked && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-gray-900/10 rounded-2xl z-10 flex items-center justify-center backdrop-blur-[1px]">
            <div className="bg-white rounded-full p-4 shadow-xl border-2 border-[#E56668]/20">
              <Crown className="text-[#E56668]" size={32} />
            </div>
          </div>
        )}
        
        <div className="flex items-start gap-4 relative">
          {/* Checkbox/Status Indicator */}
          <button
            onClick={() => canInteract && onToggle?.(task.id)}
            disabled={!canInteract || isLocked}
            className={cn(
              "w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all mt-0.5",
              task.is_completed
                ? "bg-green-500 border-green-500 scale-110 shadow-lg shadow-green-500/30"
                : canInteract && !isLocked
                ? "border-gray-300 group-hover:border-[#E56668] group-hover:scale-110 cursor-pointer"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            )}
          >
            {task.is_completed ? (
              <CheckCircle2 size={16} className="text-white" strokeWidth={3} />
            ) : isLocked ? (
              <Lock size={14} className="text-gray-400" />
            ) : (
              <Circle size={16} className="text-gray-300" />
            )}
          </button>
          
          {/* Task Content */}
          <div className="flex-1 min-w-0">
            {/* Title Row */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className={cn(
                "font-bold text-base leading-tight",
                task.is_completed 
                  ? "text-green-800 line-through decoration-green-500/40" 
                  : isLocked
                  ? "text-gray-500"
                  : "text-[#2F4157] group-hover:text-[#E56668] transition-colors"
              )}>
                {task.title}
              </h3>
              
              {/* Weight Badge (High Impact) */}
              {task.weight >= 15 && (
                <span className="flex-shrink-0 px-2.5 py-1 bg-gradient-to-r from-[#E56668] to-[#ff8f91] text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-md">
                  🔥 {task.weight}%
                </span>
              )}
            </div>
            
            {/* Description */}
            {task.description && (
              <p className={cn(
                "text-sm leading-relaxed mb-3",
                isLocked ? "text-gray-400" : "text-gray-600"
              )}>
                {task.description}
              </p>
            )}
            
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {/* Task Type Badge */}
              <span className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border flex items-center gap-1",
                getTaskTypeStyle()
              )}>
                {getCategoryIcon()}
                {task.task_type.replace('_', ' ')}
              </span>
              
              {/* Category Badge */}
              {task.category && (
                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 border border-gray-200 rounded-lg text-[10px] font-bold uppercase tracking-wide">
                  {task.category}
                </span>
              )}
              
              {/* Pro Required Badge */}
              {task.requires_verification && (
                <span className="px-2.5 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white border border-yellow-500/20 rounded-lg text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-sm">
                  <Crown size={10} />
                  Pro Only
                </span>
              )}
              
              {/* Completed Badge */}
              {task.is_completed && task.completed_at && (
                <span className="px-2.5 py-1 bg-green-100 text-green-700 border border-green-200 rounded-lg text-[10px] font-medium flex items-center gap-1">
                  <CheckCircle2 size={10} />
                  Done {new Date(task.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              )}
            </div>
            
            {/* Materials Link */}
            {task.linked_event_id && (
              <button
                onClick={() => onViewMaterials?.(task.id)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E56668] hover:text-[#C04C4E] transition-colors mb-3"
              >
                <FileText size={12} />
                View Materials
                <ChevronRight size={12} />
              </button>
            )}
            
            {/* Mentor Assessment Section */}
            {task.task_type === "mentor_assessed" && !isLocked && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                {!task.is_completed ? (
                  <>
                    {!task.submission_url ? (
                      <button
                        onClick={() => setShowSubmitModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E56668] text-white text-xs font-bold uppercase tracking-wide rounded-xl hover:bg-[#C04C4E] hover:shadow-lg transition-all"
                      >
                        <Send size={14} />
                        Submit Assignment
                      </button>
                    ) : (
                      <div className="inline-flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 border border-purple-100 rounded-xl text-xs font-medium">
                        <Clock size={14} className="flex-shrink-0" />
                        <span>Waiting for mentor review...</span>
                        <a
                          href={task.submission_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto flex items-center gap-1 underline hover:text-purple-900"
                        >
                          View
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    )}
                  </>
                ) : task.mentor_feedback && (
                  // Mentor Feedback Display
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-xs font-bold text-blue-900 uppercase tracking-wide flex items-center gap-1.5">
                        <Star size={12} className="fill-blue-600 text-blue-600" />
                        Mentor Feedback
                      </p>
                      {task.mentor_score && (
                        <span className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold">
                          {task.mentor_score}/100
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-blue-900/90 italic leading-relaxed">
                      "{task.mentor_feedback}"
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Pro Upgrade CTA (for locked tasks) */}
            {/* DITAMBAHKAN: relative z-20 pointer-events-auto BIAR NAIK KE ATAS OVERLAY */}
            {isLocked && (
              <div className="mt-4 pt-4 border-t border-gray-200 relative z-20 pointer-events-auto">
                <button 
                  onClick={() => setShowPricingModal(true)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#E56668] to-[#ff8f91] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Crown size={16} />
                  Upgrade to Pro to Unlock
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Submission Modal Placeholder */}
        {showSubmitModal && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSubmitModal(false)}
          >
            <div 
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-[#2F4157] mb-4">
                Submit Assignment
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                This will open the full submission form. (Component to be integrated)
              </p>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  onSubmit?.(task.id);
                }}
                className="w-full py-3 bg-[#E56668] text-white rounded-xl font-bold hover:bg-[#C04C4E]"
              >
                Continue to Submit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RENDER PRICING MODAL DI LUAR CARD BIAR AMAN DARI Z-INDEX & OVERLAY */}
      {showPricingModal && (
        <PricingModal 
          onClose={() => setShowPricingModal(false)} 
        />
      )}
    </>
  );
}