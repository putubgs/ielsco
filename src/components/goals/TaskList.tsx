"use client";

import { useState, useMemo } from "react";
import {
  SortAsc,
  CheckCircle2,
  Circle,
  Crown,
  Trophy,
  Flame,
  Target,
  Clock,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import TaskCard from "./TaskCard";
import type { GoalTask } from "@/types/goals";
import PricingModal from "@/components/subscription/PricingModal";

// ─────────────────────────────────────────────
// Extended task type (matches new task-generator)
// ─────────────────────────────────────────────

interface QuizQuestion {
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

type ExtendedTask = GoalTask & {
  verification_quiz?: QuizQuestion[];
  completion_criteria?: string;
  deadline_days?: number | null;
  deadline_date?: string | null;
};

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

interface TaskListProps {
  tasks: ExtendedTask[];
  userTier: "explorer" | "insider" | "visionary";
  onToggleTask?: (taskId: string) => Promise<boolean>;
  onSubmitTask?: (taskId: string, submissionUrl: string, notes?: string) => Promise<boolean>;
  onViewMaterials?: (taskId: string) => void;
}

type FilterType = "all" | "pending" | "completed" | "overdue" | "pro_only";
type SortType = "order" | "weight" | "deadline" | "recent";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function getDaysLeft(deadlineDate?: string | null): number | null {
  if (!deadlineDate) return null;
  const diff = new Date(deadlineDate).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function isOverdue(task: ExtendedTask): boolean {
  const dl = getDaysLeft(task.deadline_date);
  return dl !== null && dl < 0 && !task.is_completed;
}

// ─────────────────────────────────────────────
// Progress ring (mini SVG)
// ─────────────────────────────────────────────

function ProgressRing({ percent, size = 56 }: { percent: number; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#F3F4F6" strokeWidth={6} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        stroke="#E56668" strokeWidth={6} fill="none"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-700"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────
// Stat card
// ─────────────────────────────────────────────

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: string;
}) {
  return (
    <div className={cn("rounded-2xl p-4 border flex items-center gap-3", color)}>
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <p className="text-2xl font-black leading-none">{value}</p>
        <p className="text-xs font-medium opacity-70 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

export default function TaskList({
  tasks,
  userTier,
  onToggleTask,
  onSubmitTask,
  onViewMaterials,
}: TaskListProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("order");
  const [showPricingModal, setShowPricingModal] = useState(false);

  // ── Stats ─────────────────────────────────────────────────────────────────

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.is_completed).length;
    const pending = tasks.filter((t) => !t.is_completed && !isOverdue(t) && !t.submission_url).length;
    const overdue = tasks.filter((t) => isOverdue(t)).length;
    const proOnly = tasks.filter((t) => t.requires_verification).length;
    const locked = userTier === "explorer" ? proOnly : 0;
    const inReview = tasks.filter((t) => t.submission_url && !t.is_completed).length;
    const weightCompleted = tasks.filter((t) => t.is_completed).reduce((s, t) => s + t.weight, 0);
    const progressPercent = total === 0 ? 0 : Math.round(weightCompleted);

    // Streak (consecutive days with a completion)
    const completedDates = tasks
      .filter((t) => t.is_completed && t.completed_at)
      .map((t) => new Date(t.completed_at!).toDateString())
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort();
    let streak = 0;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (completedDates.includes(today) || completedDates.includes(yesterday)) {
      streak = 1;
      let checkDate = completedDates.includes(today)
        ? new Date(Date.now() - 86400000)
        : new Date(Date.now() - 2 * 86400000);
      while (completedDates.includes(checkDate.toDateString())) {
        streak++;
        checkDate = new Date(checkDate.getTime() - 86400000);
      }
    }

    return { total, completed, pending, overdue, proOnly, locked, inReview, progressPercent, streak };
  }, [tasks, userTier]);

  // ── Filtered + sorted tasks ───────────────────────────────────────────────

  const filteredTasks = useMemo(() => {
    let list = [...tasks] as ExtendedTask[];

    switch (filter) {
      case "pending":
        list = list.filter((t) => !t.is_completed);
        break;
      case "completed":
        list = list.filter((t) => t.is_completed);
        break;
      case "overdue":
        list = list.filter((t) => isOverdue(t));
        break;
      case "pro_only":
        list = list.filter((t) => t.requires_verification);
        break;
    }

    switch (sort) {
      case "weight":
        list.sort((a, b) => b.weight - a.weight);
        break;
      case "deadline":
        list.sort((a, b) => {
          const da = getDaysLeft(a.deadline_date) ?? 9999;
          const db = getDaysLeft(b.deadline_date) ?? 9999;
          return da - db;
        });
        break;
      case "recent":
        list.sort((a, b) => {
          const aD = a.completed_at || a.created_at;
          const bD = b.completed_at || b.created_at;
          return new Date(bD).getTime() - new Date(aD).getTime();
        });
        break;
      default:
        list.sort((a, b) => a.display_order - b.display_order);
    }

    return list;
  }, [tasks, filter, sort]);

  // ── Priority tasks (overdue or due soon, incomplete) ─────────────────────

  const priorityTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (t.is_completed) return false;
      const dl = getDaysLeft(t.deadline_date);
      return dl !== null && dl <= 7;
    });
  }, [tasks]);

  // ─────────────────────────────────────────────────────────────────────────

  const filterTabs: { key: FilterType; label: string; count: number }[] = [
    { key: "all",      label: "All",      count: stats.total },
    { key: "pending",  label: "Pending",  count: stats.pending },
    { key: "completed",label: "Done",     count: stats.completed },
    ...(stats.overdue > 0 ? [{ key: "overdue" as FilterType, label: "⚠️ Overdue", count: stats.overdue }] : []),
    ...(stats.proOnly > 0 ? [{ key: "pro_only" as FilterType, label: "Pro", count: stats.proOnly }] : []),
  ];

  return (
    <>
      <div className="space-y-6">

        {/* ── Progress header ─────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h2 className="text-2xl font-bold text-[#2F4157] mb-0.5">Learning Roadmap</h2>
            <p className="text-sm text-gray-500">
              {stats.completed}/{stats.total} tasks complete · {stats.progressPercent}% weighted progress
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Streak */}
            {stats.streak > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-xl">
                <Flame size={18} className="text-orange-500" />
                <div>
                  <p className="text-lg font-black text-orange-700 leading-none">{stats.streak}</p>
                  <p className="text-[10px] text-orange-600 font-semibold">Day streak</p>
                </div>
              </div>
            )}

            {/* Progress ring */}
            <div className="relative flex items-center justify-center">
              <ProgressRing percent={stats.progressPercent} />
              <span className="absolute text-sm font-black text-[#E56668]">
                {stats.progressPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* ── Stat row ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            icon={<CheckCircle2 size={22} className="text-green-600" />}
            value={stats.completed}
            label="Completed"
            color="bg-green-50 border-green-100 text-green-900"
          />
          <StatCard
            icon={<Circle size={22} className="text-blue-500" />}
            value={stats.pending}
            label="Pending"
            color="bg-blue-50 border-blue-100 text-blue-900"
          />
          {stats.overdue > 0 && (
            <StatCard
              icon={<AlertCircle size={22} className="text-red-500" />}
              value={stats.overdue}
              label="Overdue"
              color="bg-red-50 border-red-100 text-red-900"
            />
          )}
          {stats.inReview > 0 && (
            <StatCard
              icon={<Clock size={22} className="text-purple-600" />}
              value={stats.inReview}
              label="In Review"
              color="bg-purple-50 border-purple-100 text-purple-900"
            />
          )}
        </div>

        {/* ── Priority alert ───────────────────────────────────────────────── */}
        {priorityTasks.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={16} className="text-red-600" />
              <p className="text-sm font-bold text-red-900">
                {priorityTasks.length} task{priorityTasks.length > 1 ? "s" : ""} need{priorityTasks.length === 1 ? "s" : ""} attention
              </p>
            </div>
            <div className="space-y-1">
              {priorityTasks.slice(0, 3).map((t) => {
                const dl = getDaysLeft(t.deadline_date);
                return (
                  <p key={t.id} className="text-xs text-red-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span className="font-medium truncate">{t.title}</span>
                    <span className="flex-shrink-0 font-bold">
                      {dl !== null && dl < 0 ? `${Math.abs(dl)}d overdue` : `due in ${dl}d`}
                    </span>
                  </p>
                );
              })}
              {priorityTasks.length > 3 && (
                <p className="text-xs text-red-600 font-medium">+{priorityTasks.length - 3} more…</p>
              )}
            </div>
          </div>
        )}

        {/* ── Pro locked warning ───────────────────────────────────────────── */}
        {userTier === "explorer" && stats.locked > 0 && (
          <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Crown size={20} className="text-[#E56668] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800 mb-0.5">{stats.locked} Pro Tasks Locked</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Mentor reviews, Speaking Club sessions, and mock interviews unlock with Pro membership.
                </p>
              </div>
              <button
                onClick={() => setShowPricingModal(true)}
                className="px-4 py-2 bg-[#E56668] text-white rounded-lg text-xs font-bold hover:bg-[#C04C4E] transition-all flex-shrink-0"
              >
                Upgrade
              </button>
            </div>
          </div>
        )}

        {/* ── Filters & Sort ───────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex bg-gray-100 p-1 rounded-xl flex-wrap gap-1">
            {filterTabs.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={cn(
                  "flex-1 sm:flex-initial px-3 py-2 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap flex items-center gap-1.5",
                  filter === key
                    ? key === "pro_only"
                      ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-sm"
                      : key === "overdue"
                      ? "bg-red-500 text-white shadow-sm"
                      : "bg-white text-[#2F4157] shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                )}
              >
                {key === "pro_only" && filter !== "pro_only" && <Crown size={11} />}
                {label} ({count})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <SortAsc size={15} className="text-gray-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortType)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E56668] cursor-pointer"
            >
              <option value="order">Default Order</option>
              <option value="weight">By Importance</option>
              <option value="deadline">By Deadline</option>
              <option value="recent">Recently Updated</option>
            </select>
          </div>
        </div>

        {/* ── Task list ────────────────────────────────────────────────────── */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-14 px-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              {filter === "completed" ? (
                <Trophy className="text-gray-400" size={30} />
              ) : (
                <Target className="text-gray-300" size={30} />
              )}
            </div>
            <p className="text-gray-600 font-semibold mb-1">
              {filter === "completed"
                ? "No tasks completed yet — start with your first task!"
                : filter === "overdue"
                ? "No overdue tasks. Great work staying on track! 🎉"
                : "No tasks match this filter."}
            </p>
            <p className="text-sm text-gray-400">
              {filter !== "all" && "Try switching to a different filter."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                userTier={userTier}
                onToggle={onToggleTask}
                onSubmit={onSubmitTask}
                onViewMaterials={onViewMaterials}
              />
            ))}
          </div>
        )}

        {/* ── Footer summary ───────────────────────────────────────────────── */}
        {filteredTasks.length > 0 && (
          <div className="pt-5 border-t border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-5 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-gray-600"><strong className="text-[#2F4157]">{stats.completed}</strong> Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <span className="text-gray-600"><strong className="text-[#2F4157]">{stats.pending}</strong> Pending</span>
                </div>
                {stats.inReview > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                    <span className="text-gray-600"><strong className="text-[#2F4157]">{stats.inReview}</strong> In Review</span>
                  </div>
                )}
                {stats.overdue > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="text-gray-600"><strong className="text-red-600]">{stats.overdue}</strong> Overdue</span>
                  </div>
                )}
                {stats.locked > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                    <span className="text-gray-500"><strong className="text-gray-600">{stats.locked}</strong> Locked</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Target size={13} />
                <span>Weighted progress: {stats.progressPercent}%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}
    </>
  );
}