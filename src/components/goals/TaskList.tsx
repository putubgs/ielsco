"use client";

import { useState, useMemo } from "react";
import { Filter, SortAsc, CheckCircle2, Circle, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import TaskCard from "./TaskCard";
import type { GoalTask } from "@/types/goals";

interface TaskListProps {
  tasks: GoalTask[];
  userTier: "explorer" | "insider";
  onToggleTask?: (taskId: string) => void;
  onSubmitTask?: (taskId: string) => void;
  onViewMaterials?: (taskId: string) => void;
}

type FilterType = "all" | "pending" | "completed" | "pro_only";
type SortType = "order" | "weight" | "recent";

export default function TaskList({
  tasks,
  userTier,
  onToggleTask,
  onSubmitTask,
  onViewMaterials
}: TaskListProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("order");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["all"]));
  
  // Calculate stats
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.is_completed).length;
    const pending = total - completed;
    const proOnly = tasks.filter(t => t.requires_verification).length;
    const locked = userTier === "explorer" ? proOnly : 0;
    
    return { total, completed, pending, proOnly, locked };
  }, [tasks, userTier]);
  
  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];
    
    // Apply filter
    switch (filter) {
      case "pending":
        filtered = filtered.filter(t => !t.is_completed);
        break;
      case "completed":
        filtered = filtered.filter(t => t.is_completed);
        break;
      case "pro_only":
        filtered = filtered.filter(t => t.requires_verification);
        break;
    }
    
    // Apply sort
    switch (sort) {
      case "weight":
        filtered.sort((a, b) => b.weight - a.weight);
        break;
      case "recent":
        filtered.sort((a, b) => {
          const aDate = a.completed_at || a.created_at;
          const bDate = b.completed_at || b.created_at;
          return new Date(bDate).getTime() - new Date(aDate).getTime();
        });
        break;
      case "order":
      default:
        filtered.sort((a, b) => a.display_order - b.display_order);
        break;
    }
    
    return filtered;
  }, [tasks, filter, sort]);
  
  // Group by category
  const tasksByCategory = useMemo(() => {
    const groups: { [key: string]: GoalTask[] } = {};
    
    filteredTasks.forEach(task => {
      const category = task.category || "other";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(task);
    });
    
    return groups;
  }, [filteredTasks]);
  
  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };
  
  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#2F4157] mb-1">
            Roadmap Tasks
          </h2>
          <p className="text-sm text-gray-600">
            Complete tasks to reach your goal • {stats.completed}/{stats.total} done
          </p>
        </div>
        
      </div>
      
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Filter Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl flex-wrap sm:flex-nowrap gap-1">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap",
              filter === "all"
                ? "bg-white text-[#2F4157] shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            )}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={cn(
              "flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap",
              filter === "pending"
                ? "bg-white text-[#2F4157] shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            )}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={cn(
              "flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap",
              filter === "completed"
                ? "bg-white text-[#2F4157] shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            )}
          >
            Done ({stats.completed})
          </button>
          {stats.proOnly > 0 && (
            <button
              onClick={() => setFilter("pro_only")}
              className={cn(
                "flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap flex items-center gap-1.5",
                filter === "pro_only"
                  ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              )}
            >
              <Crown size={12} />
              Pro ({stats.proOnly})
            </button>
          )}
        </div>
        
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 ml-auto">
          <SortAsc size={16} className="text-gray-400" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortType)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E56668] cursor-pointer"
          >
            <option value="order">Default Order</option>
            <option value="weight">By Importance</option>
            <option value="recent">Recently Updated</option>
          </select>
        </div>
      </div>
      
      {/* Locked Tasks Warning (Basic users) */}
      {userTier === "explorer" && stats.locked > 0 && (
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
          <div className="flex items-start gap-3">
            <Crown className="text-[#E56668] flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800 mb-1">
                {stats.locked} Pro Tasks Locked
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Unlock mentor-assessed tasks, speaking clubs, and exclusive materials with Pro membership.
              </p>
            </div>
            <button className="px-4 py-2 bg-[#E56668] text-white rounded-lg text-xs font-bold hover:bg-[#C04C4E] transition-colors whitespace-nowrap">
              Upgrade Now
            </button>
          </div>
        </div>
      )}
      
      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12 px-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            {filter === "completed" ? (
              <CheckCircle2 className="text-gray-400" size={32} />
            ) : (
              <Circle className="text-gray-400" size={32} />
            )}
          </div>
          <p className="text-gray-600 font-medium mb-1">
            {filter === "completed" 
              ? "No tasks completed yet" 
              : filter === "pro_only"
              ? "No Pro tasks in this goal"
              : "No tasks in this category"}
          </p>
          <p className="text-sm text-gray-500">
            {filter === "completed" 
              ? "Start completing tasks to track your progress" 
              : "Try changing your filter"}
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
      
      {/* Summary Footer */}
      {filteredTasks.length > 0 && (
        <div className="pt-6 border-t border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600">
                  <strong className="text-[#2F4157]">{stats.completed}</strong> Completed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                <span className="text-gray-600">
                  <strong className="text-[#2F4157]">{stats.pending}</strong> In Progress
                </span>
              </div>
              {stats.locked > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <span className="text-gray-600">
                    <strong className="text-[#2F4157]">{stats.locked}</strong> Locked
                  </span>
                </div>
              )}
            </div>
            
            <p className="text-xs text-gray-500">
              Total weight: {tasks.reduce((sum, t) => sum + t.weight, 0)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}