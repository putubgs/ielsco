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
  ExternalLink,
  HelpCircle,
  X,
  AlertCircle,
  CheckCheck,
  ChevronDown,
  ChevronUp,
  Upload,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { GoalTask } from "@/types/goals";
import PricingModal from "@/components/subscription/PricingModal";
import TaskSubmission from "./TaskSubmission";

// ─────────────────────────────────────────────
// Quiz types (matches task-generator)
// ─────────────────────────────────────────────

interface QuizQuestion {
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

interface TaskCardProps {
  task: GoalTask & {
    verification_quiz?: QuizQuestion[];
    completion_criteria?: string;
    deadline_days?: number | null;
    deadline_date?: string | null; // ISO string, calculated at goal creation
  };
  userTier: "explorer" | "insider" | "visionary";
  onToggle?: (taskId: string) => Promise<boolean>;
  onSubmit?: (taskId: string, submissionUrl: string, notes?: string) => Promise<boolean>;
  onViewMaterials?: (taskId: string) => void;
}

// ─────────────────────────────────────────────
// Mini Quiz Modal
// ─────────────────────────────────────────────

interface QuizModalProps {
  questions: QuizQuestion[];
  taskTitle: string;
  onPass: () => void;
  onClose: () => void;
}

function QuizModal({ questions, taskTitle, onPass, onClose }: QuizModalProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);
  const [passed, setPassed] = useState(false);

  const q = questions[current];

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);

    if (idx !== q.correct_index) {
      setWrongCount((w) => w + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      // Final result
      const totalWrong = wrongCount + (selected !== q.correct_index ? 1 : 0);
      if (totalWrong === 0) {
        setPassed(true);
      } else {
        // Reset quiz with shuffled order
        setCurrent(0);
        setSelected(null);
        setShowResult(false);
        setWrongCount(0);
      }
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  if (passed) {
    return (
      <div className="fixed inset-0 bg-[#2F4157]/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl space-y-5">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCheck size={40} className="text-green-500" />
          </div>
          <h3 className="text-2xl font-black text-[#2F4157]">Quiz Passed! 🎉</h3>
          <p className="text-gray-500 text-sm">
            You answered all questions correctly. Your task is now marked as complete.
          </p>
          <button
            onClick={onPass}
            className="w-full py-3 bg-gradient-to-r from-[#E56668] to-[#C04C4E] text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Confirm Completion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#2F4157]/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#E56668] to-[#C04C4E] p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <X size={16} className="text-white" />
          </button>
          <div className="flex items-center gap-2 text-white/80 text-xs font-semibold mb-1">
            <HelpCircle size={14} />
            Completion Quiz
          </div>
          <h3 className="text-white font-bold text-lg leading-snug pr-8">{taskTitle}</h3>
          <div className="mt-3 flex gap-1.5">
            {questions.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-all",
                  i < current ? "bg-white" : i === current ? "bg-white/60" : "bg-white/20"
                )}
              />
            ))}
          </div>
        </div>

        {/* Question */}
        <div className="p-6 space-y-5">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
              Question {current + 1} of {questions.length}
            </p>
            <p className="text-[#2F4157] font-bold text-base leading-snug">{q.question}</p>
          </div>

          <div className="space-y-2.5">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correct_index;
              const isSelected = i === selected;
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={showResult}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 text-left text-sm font-medium transition-all",
                    !showResult && "hover:border-[#E56668]/50 hover:bg-gray-50 border-gray-200",
                    showResult && isCorrect && "border-green-500 bg-green-50 text-green-900",
                    showResult && isSelected && !isCorrect && "border-red-400 bg-red-50 text-red-900",
                    showResult && !isSelected && !isCorrect && "border-gray-100 bg-gray-50 text-gray-400",
                    !showResult && "border-gray-200 text-[#2F4157]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-[10px] font-black",
                        showResult && isCorrect ? "border-green-500 bg-green-500 text-white" :
                        showResult && isSelected && !isCorrect ? "border-red-400 bg-red-400 text-white" :
                        "border-gray-300 text-gray-400"
                      )}
                    >
                      {["A", "B", "C", "D"][i]}
                    </div>
                    {opt}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div
              className={cn(
                "p-4 rounded-xl border text-sm leading-relaxed",
                selected === q.correct_index
                  ? "bg-green-50 border-green-200 text-green-900"
                  : "bg-orange-50 border-orange-200 text-orange-900"
              )}
            >
              <p className="font-bold mb-1">
                {selected === q.correct_index ? "✅ Correct!" : "❌ Not quite."}
              </p>
              <p>{q.explanation}</p>
              {selected !== q.correct_index && (
                <p className="mt-2 font-semibold text-xs">
                  Don't worry — you'll need to answer all questions correctly to complete this task. You can retry.
                </p>
              )}
            </div>
          )}

          {showResult && (
            <button
              onClick={handleNext}
              className="w-full py-3 bg-[#E56668] text-white rounded-xl font-bold hover:bg-[#C04C4E] transition-all"
            >
              {current + 1 >= questions.length
                ? selected === q.correct_index
                  ? "Complete Task ✓"
                  : "Try Again"
                : "Next Question →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Deadline badge helper
// ─────────────────────────────────────────────

function DeadlineBadge({ deadlineDate }: { deadlineDate?: string | null }) {
  if (!deadlineDate) return null;

  const now = new Date();
  const dl = new Date(deadlineDate);
  const diffDays = Math.ceil((dl.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return (
      <span className="px-2.5 py-1 bg-red-100 text-red-700 border border-red-200 rounded-lg text-[10px] font-bold flex items-center gap-1">
        <AlertCircle size={10} />
        Overdue {Math.abs(diffDays)}d
      </span>
    );
  }
  if (diffDays <= 3) {
    return (
      <span className="px-2.5 py-1 bg-orange-100 text-orange-700 border border-orange-200 rounded-lg text-[10px] font-bold flex items-center gap-1 animate-pulse">
        <Clock size={10} />
        Due in {diffDays}d
      </span>
    );
  }
  if (diffDays <= 14) {
    return (
      <span className="px-2.5 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg text-[10px] font-bold flex items-center gap-1">
        <Calendar size={10} />
        Due in {diffDays}d
      </span>
    );
  }
  return (
    <span className="px-2.5 py-1 bg-gray-50 text-gray-500 border border-gray-200 rounded-lg text-[10px] font-medium flex items-center gap-1">
      <Calendar size={10} />
      {dl.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
    </span>
  );
}

// ─────────────────────────────────────────────
// Main TaskCard
// ─────────────────────────────────────────────

export default function TaskCard({
  task,
  userTier,
  onToggle,
  onSubmit,
  onViewMaterials,
}: TaskCardProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [completing, setCompleting] = useState(false);

  const isLocked = task.requires_verification && userTier === "explorer";
  const hasQuiz = Array.isArray(task.verification_quiz) && task.verification_quiz.length > 0;
  const isMentorTask = task.task_type === "mentor_assessed";
  const isSelfTrack = task.task_type === "self_track";
  const isSystemTask = task.task_type === "system";
  const canComplete = !isLocked && !task.is_completed;

  // Handle checkbox click — route based on task type
  const handleCompleteClick = () => {
    if (!canComplete) return;

    if (hasQuiz && isSelfTrack) {
      // Must pass quiz first
      setShowQuiz(true);
      return;
    }

    if (isSelfTrack && task.completion_criteria) {
      // Has evidence criteria — open submission
      setShowSubmitModal(true);
      return;
    }

    if (isMentorTask && !task.submission_url) {
      // Need to submit first
      setShowSubmitModal(true);
      return;
    }

    // Simple toggle (system events or tasks already submitted)
    handleDirectToggle();
  };

  const handleDirectToggle = async () => {
    if (!onToggle) return;
    setCompleting(true);
    await onToggle(task.id);
    setCompleting(false);
  };

  const handleQuizPass = async () => {
    setShowQuiz(false);
    // If there's also a submission criteria, open that next
    if (task.completion_criteria) {
      setShowSubmitModal(true);
    } else {
      await handleDirectToggle();
    }
  };

  const handleSubmitSuccess = async (taskId: string, url: string, notes?: string) => {
    if (!onSubmit) return false;
    const ok = await onSubmit(taskId, url, notes);
    if (ok) setShowSubmitModal(false);
    return ok;
  };

  // Task type styling
  const getTypeStyle = () => {
    switch (task.task_type) {
      case "system":        return "bg-blue-50 text-blue-700 border-blue-100";
      case "self_track":    return "bg-orange-50 text-orange-700 border-orange-100";
      case "mentor_assessed": return "bg-purple-50 text-purple-700 border-purple-100";
      default:              return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  const getTypeLabel = () => {
    switch (task.task_type) {
      case "system":        return "Auto-tracked";
      case "self_track":    return "Self-report";
      case "mentor_assessed": return "Mentor review";
      default:              return task.task_type;
    }
  };

  const getCategoryIcon = () => {
    switch (task.category) {
      case "reading":   return <FileText size={13} />;
      case "writing":   return <FileText size={13} />;
      case "speaking":  return <Zap size={13} />;
      case "listening": return <Clock size={13} />;
      case "test":      return <Star size={13} />;
      case "event":     return <Calendar size={13} />;
      default:          return <CheckCircle2 size={13} />;
    }
  };

  // Completion action label
  const completionActionLabel = () => {
    if (isMentorTask)   return task.submission_url ? "Awaiting review" : "Submit to Mentor";
    if (hasQuiz)        return "Take Quiz to Complete";
    if (task.completion_criteria) return "Upload Evidence";
    if (isSystemTask)   return "Mark Attended";
    return "Mark Complete";
  };

  return (
    <>
      <div
        className={cn(
          "group relative rounded-2xl border-2 transition-all duration-200 overflow-hidden",
          task.is_completed
            ? "bg-green-50/40 border-green-100"
            : isLocked
            ? "bg-gray-50 border-gray-200 opacity-80"
            : "bg-white border-gray-100 hover:border-[#E56668]/30 hover:shadow-md hover:-translate-y-0.5"
        )}
      >
        {/* Pro lock overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-gray-900/10 rounded-2xl z-10 flex items-end justify-center backdrop-blur-[1px] pb-5">
            <button
              onClick={() => setShowPricingModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#E56668] to-[#ff8f91] text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all"
            >
              <Crown size={15} /> Upgrade to Unlock
            </button>
          </div>
        )}

        <div className="p-5">
          {/* Top row */}
          <div className="flex items-start gap-3.5 mb-3">
            {/* Status button */}
            <button
              onClick={handleCompleteClick}
              disabled={!canComplete || completing || !!task.submission_url}
              className={cn(
                "w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all mt-0.5",
                task.is_completed
                  ? "bg-green-500 border-green-500 shadow-lg shadow-green-500/30 scale-110"
                  : canComplete && !completing
                  ? "border-gray-300 group-hover:border-[#E56668] group-hover:scale-110 cursor-pointer"
                  : "border-gray-200 bg-gray-50 cursor-not-allowed"
              )}
            >
              {completing ? (
                <div className="w-3.5 h-3.5 border-2 border-gray-300 border-t-[#E56668] rounded-full animate-spin" />
              ) : task.is_completed ? (
                <CheckCircle2 size={15} className="text-white" strokeWidth={3} />
              ) : isLocked ? (
                <Lock size={13} className="text-gray-400" />
              ) : (
                <Circle size={15} className="text-gray-200" />
              )}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3
                  className={cn(
                    "font-bold text-base leading-snug",
                    task.is_completed
                      ? "text-green-800 line-through decoration-green-400/50"
                      : isLocked
                      ? "text-gray-400"
                      : "text-[#2F4157] group-hover:text-[#E56668] transition-colors"
                  )}
                >
                  {task.title}
                </h3>
                {task.weight >= 14 && !task.is_completed && (
                  <span className="flex-shrink-0 px-2 py-0.5 bg-gradient-to-r from-[#E56668] to-[#ff8f91] text-white text-[10px] font-black rounded-full shadow">
                    🔥 {task.weight}%
                  </span>
                )}
              </div>

              {/* Badge row */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className={cn("px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border flex items-center gap-1", getTypeStyle())}>
                  {getCategoryIcon()}
                  {getTypeLabel()}
                </span>
                {task.category && (
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-500 border border-gray-200 rounded-lg text-[10px] font-bold uppercase">
                    {task.category}
                  </span>
                )}
                {hasQuiz && !task.is_completed && (
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg text-[10px] font-bold flex items-center gap-1">
                    <HelpCircle size={10} /> Quiz Required
                  </span>
                )}
                {task.requires_verification && (
                  <span className="px-2.5 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-sm">
                    <Crown size={10} /> Pro Only
                  </span>
                )}
                <DeadlineBadge deadlineDate={task.deadline_date} />
                {task.is_completed && task.completed_at && (
                  <span className="px-2.5 py-1 bg-green-100 text-green-700 border border-green-200 rounded-lg text-[10px] font-medium flex items-center gap-1">
                    <CheckCircle2 size={10} />
                    Done {new Date(task.completed_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Expandable description */}
          <div className="ml-[2.625rem]">
            {task.description && (
              <button
                className="w-full text-left"
                onClick={() => setExpanded(!expanded)}
              >
                <p
                  className={cn(
                    "text-sm text-gray-500 leading-relaxed transition-all",
                    !expanded && "line-clamp-2"
                  )}
                >
                  {task.description}
                </p>
                {task.description.length > 100 && (
                  <span className="text-xs text-[#E56668] font-semibold flex items-center gap-0.5 mt-1 hover:text-[#C04C4E]">
                    {expanded ? <><ChevronUp size={12} /> Show less</> : <><ChevronDown size={12} /> Show more</>}
                  </span>
                )}
              </button>
            )}

            {/* Completion criteria (what evidence is needed) */}
            {task.completion_criteria && !task.is_completed && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                <p className="text-xs font-bold text-blue-900 mb-0.5 flex items-center gap-1.5">
                  <Upload size={12} /> Evidence Required
                </p>
                <p className="text-xs text-blue-700">{task.completion_criteria}</p>
              </div>
            )}

            {/* Materials */}
            {task.linked_event_id && (
              <button
                onClick={() => onViewMaterials?.(task.id)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#E56668] hover:text-[#C04C4E] transition-colors"
              >
                <FileText size={12} />
                View Materials
                <ChevronRight size={11} />
              </button>
            )}

            {/* Submission status for mentor tasks */}
            {isMentorTask && !isLocked && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                {task.is_completed && task.mentor_feedback ? (
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-blue-900 uppercase tracking-wide flex items-center gap-1.5">
                        <Star size={11} className="fill-blue-600 text-blue-600" />
                        Mentor Feedback
                      </p>
                      {task.mentor_score && (
                        <span className="px-2 py-0.5 bg-blue-600 text-white rounded-lg text-xs font-bold">
                          {task.mentor_score}/100
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-blue-900/80 italic leading-relaxed">
                      "{task.mentor_feedback}"
                    </p>
                  </div>
                ) : task.submission_url ? (
                  <div className="flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 border border-purple-100 rounded-xl text-xs font-medium">
                    <Clock size={14} className="flex-shrink-0" />
                    <span>Submitted — waiting for mentor review</span>
                    <a
                      href={task.submission_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto flex items-center gap-1 underline hover:text-purple-900"
                    >
                      <Eye size={12} /> View
                    </a>
                  </div>
                ) : !task.is_completed ? (
                  <button
                    onClick={() => setShowSubmitModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E56668] text-white text-xs font-bold uppercase tracking-wide rounded-xl hover:bg-[#C04C4E] hover:shadow-lg transition-all"
                  >
                    <Send size={13} />
                    Submit to Mentor
                  </button>
                ) : null}
              </div>
            )}

            {/* Action button for self-track tasks */}
            {!task.is_completed && !isLocked && isSelfTrack && canComplete && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={handleCompleteClick}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wide rounded-xl transition-all",
                    hasQuiz
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg"
                      : task.completion_criteria
                      ? "bg-[#E56668] text-white hover:bg-[#C04C4E] hover:shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {hasQuiz ? (
                    <><HelpCircle size={13} /> {completionActionLabel()}</>
                  ) : task.completion_criteria ? (
                    <><Upload size={13} /> {completionActionLabel()}</>
                  ) : (
                    <><CheckCheck size={13} /> {completionActionLabel()}</>
                  )}
                </button>
              </div>
            )}

            {/* System task mark button */}
            {!task.is_completed && !isLocked && isSystemTask && canComplete && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={handleDirectToggle}
                  disabled={completing}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 text-xs font-bold uppercase rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50"
                >
                  {completing ? (
                    <div className="w-3 h-3 border-2 border-gray-400 border-t-gray-700 rounded-full animate-spin" />
                  ) : (
                    <CheckCheck size={13} />
                  )}
                  {completionActionLabel()}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals — rendered outside card */}
      {showQuiz && task.verification_quiz && (
        <QuizModal
          questions={task.verification_quiz}
          taskTitle={task.title}
          onPass={handleQuizPass}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {showSubmitModal && (
        <TaskSubmission
          task={task}
          isOpen={showSubmitModal}
          onClose={() => setShowSubmitModal(false)}
          onSubmit={handleSubmitSuccess}
        />
      )}

      {showPricingModal && (
        <PricingModal onClose={() => setShowPricingModal(false)} />
      )}
    </>
  );
}