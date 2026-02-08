// IELS Goals System - Utility Functions

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

// ============================================
// UPDATED: createGoal with Task Generation
// ============================================
// Add this to your src/data/goals.ts file
import { createBrowserClient } from "@supabase/ssr"; // 1. Fix: Tambahkan import ini
import { generateTaskBreakdown } from './task-generator'; // 2. Fix: Sesuaikan nama import

export async function createGoal(
  userId: string,
  // Sesuaikan tipe input agar menerima parameter tambahan
  goalData: {
    destination: string;
    objective: string;
    target_deadline: string;
    template_id?: string;
    timeline_months?: number; 
    // Tambahan untuk logic generator
    userTier?: 'explorer' | 'insider' | 'visionary'; 
    currentLevel?: number;
    targetLevel?: number;
  }
): Promise<Goal | null> {
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
);

  try {
    // 0. Arsipkan goal lama (jika ada logic one_active_goal)
    await supabase
      .from('goals')
      .update({ status: 'abandoned', updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('status', 'active');

    // 1. Create the goal
    const { data: goal, error: goalError } = await supabase
      .from("goals")
      .insert({
        user_id: userId,
        destination: goalData.destination,
        objective: goalData.objective,
        target_deadline: goalData.target_deadline,
        // template_id: goalData.template_id, // Uncomment jika kolom ini ada di DB
        status: "active",
        overall_progress: 0,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (goalError) throw goalError;

    // 2. Generate tasks based on objective and timeline
    // 3. Fix: Sesuaikan pemanggilan fungsi dengan parameter task-generator.ts
    const tasks = generateTaskBreakdown({
      goalId: goal.id,
      objective: goalData.objective,
      durationMonths: goalData.timeline_months || 6, // Default 6 bulan
      userTier: goalData.userTier || 'explorer',       // Default basic
      currentLevel: goalData.currentLevel || 5.0,   // Default level (bisa disesuaikan)
      targetLevel: goalData.targetLevel || 7.0      // Default target
    });

    // 3. Insert tasks into database
    // Kita perlu mapping sedikit agar sesuai dengan struktur tabel 'goal_tasks' kamu
    // (Menghapus properti 'week_number' atau 'materials' jika tabel DB belum support)
    const dbTasks = tasks.map((t, index) => ({
      goal_id: goal.id,
      title: t.title,
      description: t.description,
      task_type: t.task_type,
      category: t.category,
      weight: t.weight,
      display_order: index,
      requires_verification: t.task_type === 'mentor_assessed',
      // Pastikan field di bawah ini ada di tabel goal_tasks kamu, 
      // atau hapus jika belum ada di database
      created_at: new Date().toISOString()
    }));

    if (dbTasks.length > 0) {
      const { error: tasksError } = await supabase
        .from("goal_tasks")
        .insert(dbTasks);

      if (tasksError) {
        console.error("Error creating tasks:", tasksError);
      }
    }

    // 4. Create initial progress log (Opsional, jika tabel ada)
    // Cek dulu apakah tabel goal_progress atau goal_progress_logs yang kamu pakai
    /* await supabase.from("goal_progress_logs").insert({
      goal_id: goal.id,
      progress_before: 0,
      progress_after: 0,
      changed_by: 'system',
      change_reason: 'Goal initialization'
    });
    */

    return goal;
  } catch (error) {
    console.error("Error in createGoal:", JSON.stringify(error, null, 2));
    return null;
  }
}

/**
 * Get user's active goal with all tasks
 */
export async function getActiveGoal(userId: string): Promise<GoalWithTasks | null> {
  try {
    const { data: goal, error } = await supabase
      .from('goals')
      .select(`
        *,
        tasks:goal_tasks(*)
      `)
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
/**
 * Delete a goal and all related tasks
 */
export async function deleteGoal(goalId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', goalId);

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
    // FIX: Cegah query jika userId kosong/undefined
    if (!userId) {
      console.warn('getUserGoals dibatalkan: User ID tidak ditemukan.');
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
    // Gunakan JSON.stringify agar error object {} terlihat isinya (misal: "relation does not exist")
    console.error('Error fetching goals:', JSON.stringify(error, null, 2));
    return [];
  }
}
/**
 * Get single goal with full details
 */
// FIX: Ganti return type dari GoalWithTasks menjadi Intersection Type yang lengkap
export async function getGoalById(goalId: string): Promise<(GoalWithTasks & { progress_logs: GoalProgressLog[], consultations: MentorConsultation[] }) | null> {
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
    
    // Cast ke 'any' dulu sebelum ke tipe kompleks agar aman
    return data as any;
  } catch (error) {
    console.error('Error fetching goal:', JSON.stringify(error, null, 2));
    return null;
  }
}
/**
 * Update goal status
 */
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
/**
 * Toggle task completion (Updated & Fix Logging)
 */
export async function toggleTaskCompletion(
  taskId: string,
  userId: string
): Promise<boolean> {
  try {
    // 1. Ambil data task (Kita sederhanakan query-nya dulu)
    const { data: task, error: fetchError } = await supabase
      .from('goal_tasks')
      .select('id, goal_id, is_completed')
      .eq('id', taskId)
      .single();

    if (fetchError) throw fetchError;

    // 2. Toggle Status (True <-> False)
    const newStatus = !task.is_completed;
    
    const { error: updateError } = await supabase
      .from('goal_tasks')
      .update({
        is_completed: newStatus,
        completed_at: newStatus ? new Date().toISOString() : null
      })
      .eq('id', taskId);

    if (updateError) throw updateError;

    // 3. Hitung Ulang Progress Goal
    await recalculateGoalProgress(task.goal_id);

    return true;
  } catch (error) {
    // FIX LOGGING: Gunakan JSON.stringify agar error {} terlihat isinya
    console.error('Error toggling task:', JSON.stringify(error, null, 2));
    return false;
  }
}
/**
 * Submit task for mentor assessment
 */
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

/**
 * Mentor verifies and scores a task
 */
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

    // Recalculate progress
    await recalculateGoalProgress(task.goal_id);

    return true;
  } catch (error) {
    console.error('Error verifying task:', error);
    return false;
  }
}

/**
 * Recalculate goal progress based on task completion
 */
export async function recalculateGoalProgress(goalId: string): Promise<number> {
  try {
    const { data, error } = await supabase.rpc('calculate_goal_progress', {
      goal_uuid: goalId
    });

    if (error) throw error;
    return data as number;
  } catch (error) {
    // Update logging biar error terbaca
    console.error('Error recalculating progress:', JSON.stringify(error, null, 2));
    return 0;
  }
}

/**
 * Get goal analytics
 */
export async function getGoalAnalytics(goalId: string): Promise<GoalAnalytics | null> {
  try {
    const goal = await getGoalById(goalId);
    if (!goal) return null;

    const tasks = goal.tasks;
    const progressLogs = goal.progress_logs || [];

    // --- FIX LOGIC DATE & VELOCITY ---
    const now = new Date();
    const createdAt = new Date(goal.created_at);
    
    // Hitung minggu berjalan (min 1 minggu untuk hindari pembagian 0)
    const weeksElapsed = Math.max(1, Math.floor((now.getTime() - createdAt.getTime()) / (7 * 24 * 60 * 60 * 1000)));
    
    // Kecepatan progress per minggu
    const averageProgressPerWeek = goal.overall_progress / weeksElapsed;

    // Default proyeksi selesai = Deadline asli
    let projectedCompletionDate = new Date(goal.target_deadline);

    // Hanya hitung prediksi jika user punya progress (velocity > 0)
    if (averageProgressPerWeek > 0) {
      const remainingProgress = 100 - goal.overall_progress;
      const weeksRemaining = remainingProgress / averageProgressPerWeek;
      
      // Pastikan weeksRemaining adalah angka valid (bukan Infinity)
      if (isFinite(weeksRemaining)) {
        const projection = new Date();
        projection.setDate(projection.getDate() + Math.ceil(weeksRemaining * 7));
        
        // Pastikan hasil tanggal valid sebelum di-assign
        if (!isNaN(projection.getTime())) {
          projectedCompletionDate = projection;
        }
      }
    }
    // ----------------------------------

    const isAheadOfSchedule = projectedCompletionDate <= new Date(goal.target_deadline);

    // Kategori Breakdown
    const categoryProgress: any = {};
    const categories = [...new Set(tasks.map(t => t.category).filter(Boolean))];
    
    categories.forEach(category => {
      const categoryTasks = tasks.filter(t => t.category === category);
      const completed = categoryTasks.filter(t => t.is_completed).length;
      categoryProgress[category!] = {
        completed,
        total: categoryTasks.length,
        percentage: categoryTasks.length > 0 ? Math.round((completed / categoryTasks.length) * 100) : 0
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
      projected_completion_date: projectedCompletionDate.toISOString(), // Sekarang aman
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
/**
 * Calculate completion streak
 */
function calculateCompletionStreak(tasks: GoalTask[]): number {
  const completedTasks = tasks
    .filter(t => t.is_completed && t.completed_at)
    .sort((a, b) => 
      new Date(b.completed_at!).getTime() - new Date(a.completed_at!).getTime()
    );

  if (completedTasks.length === 0) return 0;

  let streak = 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < completedTasks.length - 1; i++) {
    const currentDate = new Date(completedTasks[i].completed_at!);
    currentDate.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(completedTasks[i + 1].completed_at!);
    nextDate.setHours(0, 0, 0, 0);

    const dayDiff = Math.floor(
      (currentDate.getTime() - nextDate.getTime()) / (24 * 60 * 60 * 1000)
    );

    if (dayDiff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Get goal summary for dashboard widget
 */
export async function getGoalSummary(userId: string): Promise<GoalSummary | null> {
  try {
    const goal = await getActiveGoal(userId);
    if (!goal) return null;

    const totalTasks = goal.tasks.length;
    const completedTasks = goal.tasks.filter(t => t.is_completed).length;
    
    // Next task = first incomplete task by display_order
    const nextTask = goal.tasks
      .filter(t => !t.is_completed)
      .sort((a, b) => a.display_order - b.display_order)[0];

    // Days remaining
    const targetDate = new Date(goal.target_deadline);
    const today = new Date();
    const daysRemaining = Math.max(
      0,
      Math.ceil((targetDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000))
    );

    // Is on track? (progress should be proportional to time elapsed)
    const totalDays = Math.ceil(
      (targetDate.getTime() - new Date(goal.created_at).getTime()) /
        (24 * 60 * 60 * 1000)
    );
    const daysElapsed = totalDays - daysRemaining;
    const expectedProgress = (daysElapsed / totalDays) * 100;
    const isOnTrack = goal.overall_progress >= expectedProgress * 0.9; // 90% of expected

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

/**
 * Book a consultation
 */
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

/**
 * Get upcoming consultations for user
 */
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
    // FIX: Gunakan JSON.stringify agar error terbaca jelas
    console.error('Error fetching templates:', JSON.stringify(error, null, 2));
    return [];
  }
}

// ============================================
// SYSTEM INTEGRATIONS
// ============================================

/**
 * Auto-complete tasks based on event attendance
 * Called when user attends an event
 */
export async function syncEventAttendance(
  userId: string,
  eventId: string
): Promise<void> {
  try {
    // Find tasks linked to this event for this user's active goal
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

/**
 * Auto-complete tasks based on test scores
 * Called when user completes a test
 */
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
        // Check if score meets requirement
        if (!task.required_score || score >= task.required_score) {
          await toggleTaskCompletion(task.id, userId);
        }
      }
    }
  } catch (error) {
    console.error('Error syncing test completion:', error);
  }
}