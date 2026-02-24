// IELS Goals System - Utility Functions
// Updated: CEFR-aware, passes currentCEFR + targetCEFR + subObjectiveId to task generator

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

// ─────────────────────────────────────────────────────────────────────────────
// Sub-objective ID extraction
// ─────────────────────────────────────────────────────────────────────────────

function extractSubObjectiveId(objectiveLabel: string): string {
  const lower = objectiveLabel.toLowerCase();
  if (lower.includes("ielts")) {
    if (lower.includes("8.0") || lower.includes("8+") || lower.includes("elite") || lower.includes("medicine")) return "ielts_80";
    if (lower.includes("7.5")) return "ielts_75";
    if (lower.includes("7.0") || lower.includes("postgraduate")) return "ielts_70";
    return "ielts_65";
  }
  if (lower.includes("toefl")) {
    if (lower.includes("itp")) return "toefl_itp";
    if (lower.includes("90")) return "toefl_ibt_90";
    return "toefl_ibt";
  }
  if (lower.includes("lpdp")) return "lpdp";
  if (lower.includes("iisma")) return "iisma";
  if (lower.includes("beasiswa unggulan")) return "beasiswa_unggulan";
  if (lower.includes("bim") || lower.includes("indonesia maju")) return "bim";
  if (lower.includes("chevening")) return "chevening";
  if (lower.includes("fulbright")) return "fulbright";
  if (lower.includes("australia awards") || lower.includes("aas")) return "aas";
  if (lower.includes("mext") || lower.includes("japan")) return "mext";
  if (lower.includes("gks") || lower.includes("south korea")) return "gks";
  if (lower.includes("gates")) return "gates";
  if (lower.includes("journal") || lower.includes("conference paper")) return "aw_journal";
  if (lower.includes("thesis") || lower.includes("skripsi")) return "aw_thesis";
  if (lower.includes("abstract") || lower.includes("literature")) return "aw_abstract";
  if (lower.includes("grant") || lower.includes("proposal")) return "aw_grant";
  if (lower.includes("summer") || lower.includes("winter")) return "ex_summer";
  if (lower.includes("short course")) return "ex_shortcourse";
  if (lower.includes("conference") && lower.includes("presentation")) return "ex_conference";
  if (lower.includes("semester exchange") || lower.includes("full semester")) return "ex_exchange";
  if (lower.includes("oxford") || lower.includes("cambridge")) return "ivy_oxbridge";
  if (lower.includes("ivy") || lower.includes("harvard") || lower.includes("stanford") || lower.includes("mit")) return "ivy_us";
  if (lower.includes("qs top 50")) return "ivy_qs_50";
  if (lower.includes("qs top 100")) return "ivy_qs_100";
  if (lower.includes("sma") || lower.includes("smk") || lower.includes("unbk")) return "fin_sma";
  if (lower.includes("diploma") || lower.includes("d3")) return "fin_d3";
  if (lower.includes("mkwu") || lower.includes("s1")) return "fin_s1";
  if (lower.includes("s2") || lower.includes("s3") || lower.includes("phd")) return "fin_s2";
  if (lower.includes("interview")) {
    if (lower.includes("consult") || lower.includes("mckinsey") || lower.includes("bcg")) return "iv_consult";
    if (lower.includes("banking")) return "iv_banking";
    if (lower.includes("startup") || lower.includes("tech")) return "iv_startup";
    return "iv_mnc";
  }
  if (lower.includes("remote")) {
    if (lower.includes("async") || lower.includes("slack")) return "rw_async";
    if (lower.includes("video") || lower.includes("zoom")) return "rw_video";
    if (lower.includes("writing") || lower.includes("documentation")) return "rw_writing";
    return "rw_all";
  }
  if (lower.includes("speaking") || lower.includes("presentation")) {
    if (lower.includes("board") || lower.includes("executive")) return "ps_board";
    if (lower.includes("conference")) return "ps_conference";
    if (lower.includes("client")) return "ps_client";
    return "ps_internal";
  }
  if (lower.includes("working holiday") || lower.includes("whv")) {
    if (lower.includes("new zealand") || lower.includes("nz")) return "whv_nz";
    if (lower.includes("uk") || lower.includes("youth mobility")) return "whv_uk";
    if (lower.includes("canada") || lower.includes("iec")) return "whv_ca";
    return "whv_au";
  }
  if (lower.includes("freelanc") || lower.includes("upwork") || lower.includes("fiverr")) {
    if (lower.includes("negotiat")) return "fl_negotiate";
    if (lower.includes("content") || lower.includes("copywriting")) return "fl_content";
    if (lower.includes("tech") || lower.includes("dev")) return "fl_tech";
    return "fl_pitch";
  }
  if (lower.includes("leadership") || lower.includes("managerial")) {
    if (lower.includes("negotiat")) return "le_negotiation";
    if (lower.includes("conflict")) return "le_conflict";
    if (lower.includes("cross-cultural") || lower.includes("multicultural")) return "le_crosscult";
    return "le_strategy";
  }
  if (lower.includes("technical")) {
    if (lower.includes("healthcare") || lower.includes("medical")) return "te_health";
    if (lower.includes("engineering") || lower.includes("manufacturing")) return "te_engineering";
    if (lower.includes("marketing") || lower.includes("creative")) return "te_marketing";
    if (lower.includes("finance") || lower.includes("accounting")) return "te_finance";
    if (lower.includes("legal") || lower.includes("compliance")) return "te_legal";
    return "te_tech";
  }
  if (lower.includes("pitch") || lower.includes("startup")) {
    if (lower.includes("investor") || lower.includes("vc")) return "sp_investor";
    if (lower.includes("accelerator")) return "sp_accelerator";
    if (lower.includes("corporate")) return "sp_corporate";
    return "sp_competition";
  }
  return "rw_all";
}

// ─────────────────────────────────────────────────────────────────────────────
// createGoal
// ─────────────────────────────────────────────────────────────────────────────

export async function createGoal(
  userId: string,
  goalData: {
    destination: string;
    objective: string;
    target_deadline: string;
    template_id?: string;
    timeline_months?: number;
    userTier?: 'explorer' | 'insider' | 'visionary';
    currentCEFR?: CEFRLevel;
    targetCEFR?: CEFRLevel;
    subObjectiveId?: string;
    currentIELTS?: number;
    targetIELTS?: number;
  }
): Promise<Goal | null> {

  const supabaseClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
  );

  const currentCEFR: CEFRLevel = goalData.currentCEFR || 'B1';
  const targetCEFR: CEFRLevel  = goalData.targetCEFR  || 'B2';
  const currentIELTS = goalData.currentIELTS ?? CEFR_TO_IELTS[currentCEFR];
  const targetIELTS  = goalData.targetIELTS  ?? CEFR_TO_IELTS[targetCEFR];
  const subObjectiveId = goalData.subObjectiveId || extractSubObjectiveId(goalData.objective);

  try {
    // 0. Archive previous active goal
    await supabaseClient
      .from('goals')
      .update({ status: 'abandoned', updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('status', 'active');

    // 1. Create goal row
    const { data: goal, error: goalError } = await supabaseClient
      .from("goals")
      .insert({
        user_id:          userId,
        destination:      goalData.destination,
        objective:        goalData.objective,
        target_deadline:  goalData.target_deadline,
        status:           "active",
        overall_progress: 0,
        current_cefr:     currentCEFR,
        target_cefr:      targetCEFR,
        current_ielts:    currentIELTS,
        target_ielts:     targetIELTS,
        sub_objective_id: subObjectiveId,
        created_at:       new Date().toISOString(),
      })
      .select()
      .single();

    if (goalError) {
      console.error("[createGoal] Goal row insert failed:", JSON.stringify(goalError, null, 2));
      throw goalError;
    }

    // 2. Generate tasks
    const durationMonths = goalData.timeline_months || 6;
    const tasks = generateTaskBreakdown({
      goalId: goal.id,
      objective: goalData.objective,
      subObjectiveId,
      durationMonths,
      userTier:  goalData.userTier || 'explorer',
      currentCEFR,
      targetCEFR,
      currentIELTS,
      targetIELTS,
    });

    console.log(`[createGoal] Generated ${tasks.length} tasks for subObjectiveId="${subObjectiveId}"`);

    if (tasks.length === 0) {
      console.warn("[createGoal] 0 tasks generated — check task-generator routing for:", subObjectiveId);
      return goal;
    }

    // 3. Build insert rows
    const goalCreatedAt = new Date();

    // Build rows with only the CORE columns guaranteed to exist in every schema.
    // Extended columns (deadline_date, completion_criteria, verification_quiz)
    // are added separately if they exist — detected by error code on first attempt.
    const coreRows = tasks.map((t, i) => ({
      goal_id:               goal.id,
      title:                 t.title,
      description:           t.description ?? "",
      task_type:             t.task_type,
      category:              t.category,
      weight:                t.weight,
      display_order:         t.display_order ?? i + 1,
      requires_verification: t.task_type === 'mentor_assessed',
      estimated_minutes:     t.estimated_minutes ?? 60,
      is_completed:          false,
      created_at:            goalCreatedAt.toISOString(),
    }));

    const extendedRows = tasks.map((t, i) => ({
      ...coreRows[i],
      deadline_date:       t.deadline_days != null
        ? new Date(goalCreatedAt.getTime() + t.deadline_days * 24 * 60 * 60 * 1000).toISOString()
        : null,
      completion_criteria: t.completion_criteria ?? null,
      verification_quiz:   t.verification_quiz   ?? null,
    }));

    // 4. Try inserting with extended columns first; fall back to core-only on column error
    const BATCH = 20;
    let useExtended = true;

    for (let i = 0; i < extendedRows.length; i += BATCH) {
      const batchExt  = extendedRows.slice(i, i + BATCH);
      const batchCore = coreRows.slice(i, i + BATCH);

      const { error } = await supabaseClient
        .from("goal_tasks")
        .insert(useExtended ? batchExt : batchCore);

      if (error) {
        // Code 42703 = column does not exist
        const isColumnError = error.code === "42703"
          || (error.message ?? "").toLowerCase().includes("column")
          || (error.details ?? "").toLowerCase().includes("column");

        if (isColumnError && useExtended) {
          // Switch to core-only for this and all future batches
          useExtended = false;
          console.warn(
            "[createGoal] Extended columns not found in DB schema.",
            "Run migration_add_task_columns.sql to unlock deadline + quiz features.",
            "Retrying with core columns only."
          );

          const { error: retryError } = await supabaseClient
            .from("goal_tasks")
            .insert(batchCore);

          if (retryError) {
            console.error(
              `[createGoal] Core insert also failed (batch ${Math.floor(i / BATCH) + 1}):`,
              "\nCode:",    retryError.code,
              "\nMessage:", retryError.message,
              "\nDetails:", retryError.details,
              "\nHint:",    retryError.hint
            );
          } else {
            console.log(`[createGoal] Batch ${Math.floor(i / BATCH) + 1} OK (core-only, ${batchCore.length} tasks)`);
          }
        } else {
          // Some other error — log everything
          console.error(
            `[createGoal] Insert failed (batch ${Math.floor(i / BATCH) + 1}):`,
            "\nCode:",    error.code,
            "\nMessage:", error.message,
            "\nDetails:", error.details,
            "\nHint:",    error.hint,
            "\nSample row:", JSON.stringify(
              (useExtended ? batchExt : batchCore)[0],
              null, 2
            )
          );
        }
      } else {
        console.log(`[createGoal] Batch ${Math.floor(i / BATCH) + 1} OK (${(useExtended ? batchExt : batchCore).length} tasks, extended=${useExtended})`);
      }
    }

    return goal;

  } catch (error) {
    console.error("[createGoal] Fatal error:", JSON.stringify(error, null, 2));
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// READ OPERATIONS
// ─────────────────────────────────────────────────────────────────────────────

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
    if (!userId) { console.warn('getUserGoals: userId is empty'); return []; }
    const from = (page - 1) * pageSize;
    const to   = from + pageSize - 1;
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
      .update({ status, completed_at: status === 'completed' ? new Date().toISOString() : null })
      .eq('id', goalId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating goal status:', error);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TASK OPERATIONS
// ─────────────────────────────────────────────────────────────────────────────

export async function toggleTaskCompletion(taskId: string, userId: string): Promise<boolean> {
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
      .update({ is_completed: newStatus, completed_at: newStatus ? new Date().toISOString() : null })
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
    const updatePayload: Record<string, string> = {
      submission_url:  submissionUrl,
      submission_date: new Date().toISOString(),
    };
    if (notes) updatePayload.submission_notes = notes;

    const { error } = await supabase.from('goal_tasks').update(updatePayload).eq('id', taskId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error submitting task:', error);
    return false;
  }
}

export async function mentorVerifyTask(
  taskId: string, mentorId: string, feedback: string, score: number
): Promise<boolean> {
  try {
    const { data: task, error: updateError } = await supabase
      .from('goal_tasks')
      .update({
        is_completed: true,
        completed_at: new Date().toISOString(),
        verified_by:  mentorId,
        verified_at:  new Date().toISOString(),
        mentor_feedback: feedback,
        mentor_score: score,
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
    const { data, error } = await supabase.rpc('calculate_goal_progress', { goal_uuid: goalId });
    if (error) throw error;
    return data as number;
  } catch (error) {
    console.error('Error recalculating progress:', JSON.stringify(error, null, 2));
    return 0;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ANALYTICS
// ─────────────────────────────────────────────────────────────────────────────

export async function getGoalAnalytics(goalId: string): Promise<GoalAnalytics | null> {
  try {
    const goal = await getGoalById(goalId);
    if (!goal) return null;

    const tasks        = goal.tasks;
    const progressLogs = goal.progress_logs || [];
    const now          = new Date();
    const createdAt    = new Date(goal.created_at);
    const weeksElapsed = Math.max(1, Math.floor((now.getTime() - createdAt.getTime()) / (7 * 24 * 60 * 60 * 1000)));
    const averageProgressPerWeek = goal.overall_progress / weeksElapsed;

    let projectedCompletionDate = new Date(goal.target_deadline);
    if (averageProgressPerWeek > 0) {
      const weeksRemaining = (100 - goal.overall_progress) / averageProgressPerWeek;
      if (isFinite(weeksRemaining)) {
        const projection = new Date();
        projection.setDate(projection.getDate() + Math.ceil(weeksRemaining * 7));
        if (!isNaN(projection.getTime())) projectedCompletionDate = projection;
      }
    }

    const categoryProgress: any = {};
    [...new Set(tasks.map(t => t.category).filter(Boolean))].forEach(cat => {
      const ct = tasks.filter(t => t.category === cat);
      const done = ct.filter(t => t.is_completed).length;
      categoryProgress[cat!] = { completed: done, total: ct.length, percentage: ct.length > 0 ? Math.round((done / ct.length) * 100) : 0 };
    });

    const activeDays   = new Set(progressLogs.map(l => new Date(l.created_at).toDateString())).size;
    const lastActivity = progressLogs.length > 0 ? progressLogs[progressLogs.length - 1].created_at : goal.created_at;

    return {
      goal_id:                         goalId,
      average_progress_per_week:       Math.round(averageProgressPerWeek * 10) / 10,
      projected_completion_date:       projectedCompletionDate.toISOString(),
      is_ahead_of_schedule:            projectedCompletionDate <= new Date(goal.target_deadline),
      system_tasks_completed:          tasks.filter(t => t.task_type === 'system'          && t.is_completed).length,
      self_track_tasks_completed:      tasks.filter(t => t.task_type === 'self_track'      && t.is_completed).length,
      mentor_assessed_tasks_completed: tasks.filter(t => t.task_type === 'mentor_assessed' && t.is_completed).length,
      days_active:                     activeDays,
      last_activity_date:              lastActivity,
      completion_streak:               calculateCompletionStreak(tasks),
      category_progress:               categoryProgress,
    };
  } catch (error) {
    console.error('Error calculating analytics:', error);
    return null;
  }
}

function calculateCompletionStreak(tasks: GoalTask[]): number {
  const completed = tasks
    .filter(t => t.is_completed && t.completed_at)
    .sort((a, b) => new Date(b.completed_at!).getTime() - new Date(a.completed_at!).getTime());
  if (completed.length === 0) return 0;
  let streak = 1;
  for (let i = 0; i < completed.length - 1; i++) {
    const c = new Date(completed[i].completed_at!); c.setHours(0,0,0,0);
    const n = new Date(completed[i+1].completed_at!); n.setHours(0,0,0,0);
    if (Math.floor((c.getTime() - n.getTime()) / 86400000) === 1) streak++;
    else break;
  }
  return streak;
}

export async function getGoalSummary(userId: string): Promise<GoalSummary | null> {
  try {
    const goal = await getActiveGoal(userId);
    if (!goal) return null;
    const totalTasks     = goal.tasks.length;
    const completedTasks = goal.tasks.filter(t => t.is_completed).length;
    const nextTask       = goal.tasks.filter(t => !t.is_completed).sort((a,b) => a.display_order - b.display_order)[0];
    const targetDate     = new Date(goal.target_deadline);
    const today          = new Date();
    const daysRemaining  = Math.max(0, Math.ceil((targetDate.getTime() - today.getTime()) / 86400000));
    const totalDays      = Math.ceil((targetDate.getTime() - new Date(goal.created_at).getTime()) / 86400000);
    const daysElapsed    = totalDays - daysRemaining;
    const isOnTrack      = goal.overall_progress >= ((daysElapsed / totalDays) * 100) * 0.9;
    return { goal, total_tasks: totalTasks, completed_tasks: completedTasks, next_task: nextTask, days_remaining: daysRemaining, is_on_track: isOnTrack };
  } catch (error) {
    console.error('Error getting goal summary:', error);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSULTATION OPERATIONS
// ─────────────────────────────────────────────────────────────────────────────

export async function bookConsultation(userId: string, input: BookConsultationInput): Promise<MentorConsultation | null> {
  try {
    const { data, error } = await supabase
      .from('mentor_consultations')
      .insert({ goal_id: input.goal_id, user_id: userId, scheduled_at: input.scheduled_at, discussion_topics: input.discussion_topics, notes: input.notes, status: 'scheduled' })
      .select().single();
    if (error) throw error;
    return data as MentorConsultation;
  } catch (error) {
    console.error('Error booking consultation:', error);
    return null;
  }
}

export async function getUpcomingConsultations(userId: string): Promise<MentorConsultation[]> {
  try {
    const { data, error } = await supabase.from('mentor_consultations').select('*')
      .eq('user_id', userId).eq('status', 'scheduled').gte('scheduled_at', new Date().toISOString()).order('scheduled_at', { ascending: true });
    if (error) throw error;
    return data as MentorConsultation[];
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return [];
  }
}

export async function getGoalTemplates() {
  try {
    const { data, error } = await supabase.from('goal_templates').select('*').eq('is_active', true).order('name');
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching templates:', JSON.stringify(error, null, 2));
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM INTEGRATIONS
// ─────────────────────────────────────────────────────────────────────────────

export async function syncEventAttendance(userId: string, eventId: string): Promise<void> {
  try {
    const { data: tasks, error } = await supabase
      .from('goal_tasks').select('*, goal:goals!inner(user_id, status)')
      .eq('goal.user_id', userId).eq('goal.status', 'active').eq('linked_event_id', eventId);
    if (error) throw error;
    for (const task of tasks || []) { if (!task.is_completed) await toggleTaskCompletion(task.id, userId); }
  } catch (error) { console.error('Error syncing event attendance:', error); }
}

export async function syncTestCompletion(userId: string, testId: string, score: number): Promise<void> {
  try {
    const { data: tasks, error } = await supabase
      .from('goal_tasks').select('*, goal:goals!inner(user_id, status)')
      .eq('goal.user_id', userId).eq('goal.status', 'active').eq('linked_test_id', testId);
    if (error) throw error;
    for (const task of tasks || []) {
      if (!task.is_completed && (!task.required_score || score >= task.required_score)) {
        await toggleTaskCompletion(task.id, userId);
      }
    }
  } catch (error) { console.error('Error syncing test completion:', error); }
}