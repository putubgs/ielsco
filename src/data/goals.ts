// IELS Goals System - Utility Functions
// Updated: CEFR-aware, passes currentCEFR + targetCEFR to task generator

import { supabase } from '@/data/supabase';
import type {
  Goal,
  GoalTask,
  GoalWithTasks,
  GoalSummary,
  GoalAnalytics,
  CreateGoalInput,
  UpdateTaskInput,
  MentorConsultation,
  BookConsultationInput,
  GoalProgressLog
} from '@/types/goals';

import { createBrowserClient } from "@supabase/ssr";
import { generateTaskBreakdown } from './task-generator';
import type { CEFRLevel } from './progress-calculator';
import { CEFR_TO_IELTS } from './progress-calculator';

// ============================================
// createGoal — now CEFR-aware
// ============================================

export async function createGoal(
  userId: string,
  goalData: {
    destination: string;
    objective: string;
    target_deadline: string;
    template_id?: string;
    timeline_months?: number;
    userTier?: 'explorer' | 'insider' | 'visionary';
    // NEW: CEFR levels (required for accurate task generation)
    currentCEFR?: CEFRLevel;
    targetCEFR?: CEFRLevel;
    // Optional IELTS overrides (auto-derived from CEFR if not provided)
    currentIELTS?: number;
    targetIELTS?: number;
  }
): Promise<Goal | null> {

  const supabaseClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
  );

  // Resolve IELTS values from CEFR if not explicitly given
  const currentCEFR: CEFRLevel = goalData.currentCEFR || 'B1';
  const targetCEFR: CEFRLevel = goalData.targetCEFR || 'B2';
  const currentIELTS = goalData.currentIELTS ?? CEFR_TO_IELTS[currentCEFR];
  const targetIELTS = goalData.targetIELTS ?? CEFR_TO_IELTS[targetCEFR];

  try {
    // 0. Archive previous active goal
    await supabaseClient
      .from('goals')
      .update({ status: 'abandoned', updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('status', 'active');

    // 1. Create the goal row
    const { data: goal, error: goalError } = await supabaseClient
      .from("goals")
      .insert({
        user_id: userId,
        destination: goalData.destination,
        objective: goalData.objective,
        target_deadline: goalData.target_deadline,
        status: "active",
        overall_progress: 0,
        // Store CEFR data for reference
        current_cefr: currentCEFR,
        target_cefr: targetCEFR,
        current_ielts: currentIELTS,
        target_ielts: targetIELTS,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (goalError) throw goalError;

    // 2. Generate tasks with full CEFR context
    const tasks = generateTaskBreakdown({
      goalId: goal.id,
      objective: goalData.objective,
      durationMonths: goalData.timeline_months || 6,
      userTier: goalData.userTier || 'explorer',
      currentCEFR,
      targetCEFR,
      currentIELTS,
      targetIELTS,
    });

    // 3. Insert tasks
    const dbTasks = tasks.map((t, index) => ({
      goal_id: goal.id,
      title: t.title,
      description: t.description,
      task_type: t.task_type,
      category: t.category,
      weight: t.weight,
      display_order: index,
      requires_verification: t.task_type === 'mentor_assessed',
      estimated_minutes: t.estimated_minutes,
      created_at: new Date().toISOString()
    }));

    if (dbTasks.length > 0) {
      const { error: tasksError } = await supabaseClient
        .from("goal_tasks")
        .insert(dbTasks);

      if (tasksError) {
        console.error("Error creating tasks:", tasksError);
      }
    }

    return goal;
  } catch (error) {
    console.error("Error in createGoal:", JSON.stringify(error, null, 2));
    return null;
  }
}

// ============================================
// READ OPERATIONS (unchanged)
// ============================================

export async function getActiveGoal(userId: string): Promise<GoalWithTasks | null> {
  try {
    const { data: goal, error } = await supabase
      .from('goals')
      .select(`*, tasks:goal_tasks(*)`)
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return goal as GoalWithTasks;
  } catch (error) {
    console.error('Error fetching active goal:', error);
    return null;
  }
}

export async function deleteGoal(goalId: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('goals').delete().eq('id', goalId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting goal:', JSON.stringify(error, null, 2));
    return false;
  }
}

export async function getUserGoals(
  userId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<Goal[]> {
  try {
    if (!userId) {
      console.warn('getUserGoals: userId is empty');
      return [];
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;
    return data as Goal[];
  } catch (error) {
    console.error('Error fetching goals:', JSON.stringify(error, null, 2));
    return [];
  }
}

export async function getGoalById(goalId: string): Promise<(GoalWithTasks & {
  progress_logs: GoalProgressLog[];
  consultations: MentorConsultation[];
}) | null> {
  try {
    const { data, error } = await supabase
      .from('goals')
      .select(`
        *,
        tasks:goal_tasks(*),
        consultations:mentor_consultations(*),
        progress_logs:goal_progress_logs(*)
      `)
      .eq('id', goalId)
      .single();

    if (error) throw error;
    return data as any;
  } catch (error) {
    console.error('Error fetching goal:', JSON.stringify(error, null, 2));
    return null;
  }
}

export async function updateGoalStatus(
  goalId: string,
  status: 'active' | 'completed' | 'paused' | 'abandoned'
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('goals')
      .update({
        status,
        completed_at: status === 'completed' ? new Date().toISOString() : null
      })
      .eq('id', goalId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating goal status:', error);
    return false;
  }
}

// ============================================
// TASK OPERATIONS
// ============================================

export async function toggleTaskCompletion(
  taskId: string,
  userId: string
): Promise<boolean> {
  try {
    const { data: task, error: fetchError } = await supabase
      .from('goal_tasks')
      .select('id, goal_id, is_completed')
      .eq('id', taskId)
      .single();

    if (fetchError) throw fetchError;

    const newStatus = !task.is_completed;

    const { error: updateError } = await supabase
      .from('goal_tasks')
      .update({
        is_completed: newStatus,
        completed_at: newStatus ? new Date().toISOString() : null
      })
      .eq('id', taskId);

    if (updateError) throw updateError;

    await recalculateGoalProgress(task.goal_id);
    return true;
  } catch (error) {
    console.error('Error toggling task:', JSON.stringify(error, null, 2));
    return false;
  }
}

export async function submitTaskForReview(
  taskId: string,
  submissionUrl: string,
  notes?: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('goal_tasks')
      .update({
        submission_url: submissionUrl,
        submission_date: new Date().toISOString(),
        description: notes ? notes : undefined
      })
      .eq('id', taskId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error submitting task:', error);
    return false;
  }
}

export async function mentorVerifyTask(
  taskId: string,
  mentorId: string,
  feedback: string,
  score: number
): Promise<boolean> {
  try {
    const { data: task, error: updateError } = await supabase
      .from('goal_tasks')
      .update({
        is_completed: true,
        completed_at: new Date().toISOString(),
        verified_by: mentorId,
        verified_at: new Date().toISOString(),
        mentor_feedback: feedback,
        mentor_score: score
      })
      .eq('id', taskId)
      .select('goal_id')
      .single();

    if (updateError) throw updateError;

    await recalculateGoalProgress(task.goal_id);
    return true;
  } catch (error) {
    console.error('Error verifying task:', error);
    return false;
  }
}

export async function recalculateGoalProgress(goalId: string): Promise<number> {
  try {
    const { data, error } = await supabase.rpc('calculate_goal_progress', {
      goal_uuid: goalId
    });

    if (error) throw error;
    return data as number;
  } catch (error) {
    console.error('Error recalculating progress:', JSON.stringify(error, null, 2));
    return 0;
  }
}

// ============================================
// ANALYTICS
// ============================================

export async function getGoalAnalytics(goalId: string): Promise<GoalAnalytics | null> {
  try {
    const goal = await getGoalById(goalId);
    if (!goal) return null;

    const tasks = goal.tasks;
    const progressLogs = goal.progress_logs || [];

    const now = new Date();
    const createdAt = new Date(goal.created_at);
    const weeksElapsed = Math.max(1, Math.floor(
      (now.getTime() - createdAt.getTime()) / (7 * 24 * 60 * 60 * 1000)
    ));

    const averageProgressPerWeek = goal.overall_progress / weeksElapsed;

    let projectedCompletionDate = new Date(goal.target_deadline);

    if (averageProgressPerWeek > 0) {
      const remainingProgress = 100 - goal.overall_progress;
      const weeksRemaining = remainingProgress / averageProgressPerWeek;

      if (isFinite(weeksRemaining)) {
        const projection = new Date();
        projection.setDate(projection.getDate() + Math.ceil(weeksRemaining * 7));

        if (!isNaN(projection.getTime())) {
          projectedCompletionDate = projection;
        }
      }
    }

    const isAheadOfSchedule = projectedCompletionDate <= new Date(goal.target_deadline);

    const categoryProgress: any = {};
    const categories = [...new Set(tasks.map(t => t.category).filter(Boolean))];

    categories.forEach(category => {
      const categoryTasks = tasks.filter(t => t.category === category);
      const completed = categoryTasks.filter(t => t.is_completed).length;
      categoryProgress[category!] = {
        completed,
        total: categoryTasks.length,
        percentage: categoryTasks.length > 0
          ? Math.round((completed / categoryTasks.length) * 100)
          : 0
      };
    });

    const activeDays = new Set(
      progressLogs.map((log) => new Date(log.created_at).toDateString())
    ).size;

    const lastActivity = progressLogs.length > 0
      ? progressLogs[progressLogs.length - 1].created_at
      : goal.created_at;

    return {
      goal_id: goalId,
      average_progress_per_week: Math.round(averageProgressPerWeek * 10) / 10,
      projected_completion_date: projectedCompletionDate.toISOString(),
      is_ahead_of_schedule: isAheadOfSchedule,
      system_tasks_completed: tasks.filter(t => t.task_type === 'system' && t.is_completed).length,
      self_track_tasks_completed: tasks.filter(t => t.task_type === 'self_track' && t.is_completed).length,
      mentor_assessed_tasks_completed: tasks.filter(t => t.task_type === 'mentor_assessed' && t.is_completed).length,
      days_active: activeDays,
      last_activity_date: lastActivity,
      completion_streak: calculateCompletionStreak(tasks),
      category_progress: categoryProgress
    };
  } catch (error) {
    console.error('Error calculating analytics:', error);
    return null;
  }
}

function calculateCompletionStreak(tasks: GoalTask[]): number {
  const completedTasks = tasks
    .filter(t => t.is_completed && t.completed_at)
    .sort((a, b) =>
      new Date(b.completed_at!).getTime() - new Date(a.completed_at!).getTime()
    );

  if (completedTasks.length === 0) return 0;

  let streak = 1;
  for (let i = 0; i < completedTasks.length - 1; i++) {
    const curr = new Date(completedTasks[i].completed_at!);
    curr.setHours(0, 0, 0, 0);
    const next = new Date(completedTasks[i + 1].completed_at!);
    next.setHours(0, 0, 0, 0);
    const diff = Math.floor((curr.getTime() - next.getTime()) / (24 * 60 * 60 * 1000));
    if (diff === 1) streak++;
    else break;
  }

  return streak;
}

export async function getGoalSummary(userId: string): Promise<GoalSummary | null> {
  try {
    const goal = await getActiveGoal(userId);
    if (!goal) return null;

    const totalTasks = goal.tasks.length;
    const completedTasks = goal.tasks.filter(t => t.is_completed).length;

    const nextTask = goal.tasks
      .filter(t => !t.is_completed)
      .sort((a, b) => a.display_order - b.display_order)[0];

    const targetDate = new Date(goal.target_deadline);
    const today = new Date();
    const daysRemaining = Math.max(
      0,
      Math.ceil((targetDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000))
    );

    const totalDays = Math.ceil(
      (targetDate.getTime() - new Date(goal.created_at).getTime()) /
      (24 * 60 * 60 * 1000)
    );
    const daysElapsed = totalDays - daysRemaining;
    const expectedProgress = (daysElapsed / totalDays) * 100;
    const isOnTrack = goal.overall_progress >= expectedProgress * 0.9;

    return {
      goal,
      total_tasks: totalTasks,
      completed_tasks: completedTasks,
      next_task: nextTask,
      days_remaining: daysRemaining,
      is_on_track: isOnTrack
    };
  } catch (error) {
    console.error('Error getting goal summary:', error);
    return null;
  }
}

// ============================================
// CONSULTATION OPERATIONS
// ============================================

export async function bookConsultation(
  userId: string,
  input: BookConsultationInput
): Promise<MentorConsultation | null> {
  try {
    const { data, error } = await supabase
      .from('mentor_consultations')
      .insert({
        goal_id: input.goal_id,
        user_id: userId,
        scheduled_at: input.scheduled_at,
        discussion_topics: input.discussion_topics,
        notes: input.notes,
        status: 'scheduled'
      })
      .select()
      .single();

    if (error) throw error;
    return data as MentorConsultation;
  } catch (error) {
    console.error('Error booking consultation:', error);
    return null;
  }
}

export async function getUpcomingConsultations(
  userId: string
): Promise<MentorConsultation[]> {
  try {
    const { data, error } = await supabase
      .from('mentor_consultations')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'scheduled')
      .gte('scheduled_at', new Date().toISOString())
      .order('scheduled_at', { ascending: true });

    if (error) throw error;
    return data as MentorConsultation[];
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return [];
  }
}

export async function getGoalTemplates() {
  try {
    const { data, error } = await supabase
      .from('goal_templates')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching templates:', JSON.stringify(error, null, 2));
    return [];
  }
}

// ============================================
// SYSTEM INTEGRATIONS
// ============================================

export async function syncEventAttendance(
  userId: string,
  eventId: string
): Promise<void> {
  try {
    const { data: tasks, error } = await supabase
      .from('goal_tasks')
      .select('*, goal:goals!inner(user_id, status)')
      .eq('goal.user_id', userId)
      .eq('goal.status', 'active')
      .eq('linked_event_id', eventId);

    if (error) throw error;

    for (const task of tasks || []) {
      if (!task.is_completed) {
        await toggleTaskCompletion(task.id, userId);
      }
    }
  } catch (error) {
    console.error('Error syncing event attendance:', error);
  }
}

export async function syncTestCompletion(
  userId: string,
  testId: string,
  score: number
): Promise<void> {
  try {
    const { data: tasks, error } = await supabase
      .from('goal_tasks')
      .select('*, goal:goals!inner(user_id, status)')
      .eq('goal.user_id', userId)
      .eq('goal.status', 'active')
      .eq('linked_test_id', testId);

    if (error) throw error;

    for (const task of tasks || []) {
      if (!task.is_completed) {
        if (!task.required_score || score >= task.required_score) {
          await toggleTaskCompletion(task.id, userId);
        }
      }
    }
  } catch (error) {
    console.error('Error syncing test completion:', error);
  }
}