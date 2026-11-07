"use client";

import Link from "next/link";
import {
  ChevronRight,
  Calendar,
  Clock,
  TrendingUp,
  ArrowUpRight, Trash2
} from "lucide-react";
import type { Goal } from "@/types/goals";
// 1. Tambahkan onDelete ke interface Props (tanda ? artinya optional)
interface GoalCardProps {
  goal: Goal;
  onDelete?: () => void; 
}

export default function GoalCard({ goal, onDelete }: GoalCardProps) {
  
 
  const daysRemaining = Math.max(
    0,
    Math.ceil(
      (new Date(goal.target_deadline).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );
  const statusAccent = () => {
    switch (goal.status) {
      case "active":
        return "bg-[#E56668]";
      case "completed":
        return "bg-green-500";
      case "paused":
        return "bg-orange-400";
      default:
        return "bg-gray-300";
    }
  };

  const statusLabel = goal.status.charAt(0).toUpperCase() + goal.status.slice(1);

  return (
    <div className="group relative flex flex-col bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#E56668]/30 hover:-translate-y-1 transition-all duration-300">
    {/* --- 2. TOMBOL DELETE (Hanya muncul jika props onDelete ada) --- */}
      {onDelete && (
        <button 
          onClick={(e) => {
            e.preventDefault(); // Mencegah masuk ke halaman detail
            e.stopPropagation();
            onDelete(); // Panggil fungsi delete
          }}
          className="absolute top-4 right-4 z-20 p-2 bg-white text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100 shadow-sm border border-gray-100 cursor-pointer"
          title="Delete Goal"
        >
          <Trash2 size={16} />
        </button>
      )}
    <Link
      href={`/dashboard/goals/${goal.id}`}
      className="
        flex-1 flex flex-col h-full
      "
    >

      <div className="p-6 pl-7">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#2F4157] group-hover:text-[#E56668] transition-colors">
              {goal.objective}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {goal.destination}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-[#E56668] transition">
            <span className="hidden sm:inline">View</span>
            <ChevronRight size={20} />
          </div>
        </div>

        {/* META INFO */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <MetaItem
            icon={<TrendingUp size={14} />}
            label="Progress"
            value={`${goal.overall_progress}%`}
          />
          <MetaItem
            icon={<Calendar size={14} />}
            label="Target"
            value={new Date(goal.target_deadline).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          />
          <MetaItem
            icon={<Clock size={14} />}
            label="Remaining"
            value={`${daysRemaining} days`}
          />
          <MetaItem
            label="Status"
            value={statusLabel}
            accent
          />
        </div>

        {/* PROGRESS BAR */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Overall progress</span>
            <span>{goal.overall_progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="
                h-full rounded-full
                bg-gradient-to-r from-[#E56668] to-[#C04C4E]
                transition-all duration-500
              "
              style={{ width: `${goal.overall_progress}%` }}
            />
          </div>
        </div>
      </div>
    </Link></div>
  );
}

/* ===== SUB COMPONENT ===== */

function MetaItem({
  icon,
  label,
  value,
  accent = false
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      {icon && (
        <div className="mt-0.5 text-gray-400">
          {icon}
        </div>
      )}
      <div>
        <p className="text-xs text-gray-500 mb-0.5">
          {label}
        </p>
        <p
          className={`text-sm font-semibold ${
            accent ? "text-[#E56668]" : "text-[#2F4157]"
          }`}
        >
          {value}
        </p>
      </div>
      
    </div>
  );
}
