// IELS Goals System - TypeScript Types

export type GoalStatus = 'active' | 'completed' | 'paused' | 'abandoned';

export type TaskType = 'system' | 'self_track' | 'mentor_assessed';

export type TaskCategory =
  | 'reading'
  | 'writing'
  | 'speaking'
  | 'listening'
  | 'test'
  | 'event'
  | 'research'
  | 'admin';

export type ConsultationStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show';

export interface Goal {
  id: string;
  user_id: string;
  
  // Goal Definition
  destination: string;
  objective: string;
  target_deadline: string; // ISO date string
  
  // Progress
  overall_progress: number; // 0-100
  status: GoalStatus;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface GoalTask {
  id: string;
  goal_id: string;
  
  // Task Definition
  title: string;
  description?: string;
  task_type: TaskType;
  category?: TaskCategory;
  
  // Progress
  weight: number; // percentage weight (1-100)
  is_completed: boolean;
  completed_at?: string;
  
  // Verification
  requires_verification: boolean;
  verified_by?: string; // user_id of mentor
  verified_at?: string;
  
  // System Links
  linked_event_id?: string;
  linked_test_id?: string;
  required_score?: number;
  required_attendance_count?: number;
  current_attendance_count?: number;
  
  // Assignment
  submission_url?: string;
  submission_date?: string;
  mentor_feedback?: string;
  mentor_score?: number;
  
  // Display
  display_order: number;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface MentorConsultation {
  id: string;
  goal_id: string;
  user_id: string;
  mentor_id?: string;
  
  // Consultation Details
  scheduled_at: string;
  duration_minutes: number;
  status: ConsultationStatus;
  meeting_link?: string;
  
  // Content
  discussion_topics?: string[];
  notes?: string;
  action_items?: string[];
  
  // Ratings
  user_rating?: number; // 1-5
  mentor_rating?: number; // 1-5
  user_feedback?: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface GoalProgressLog {
  id: string;
  goal_id: string;
  
  // Change Details
  progress_before: number;
  progress_after: number;
  task_id?: string;
  changed_by: 'user' | 'system' | 'mentor';
  change_reason?: string;
  
  // Timestamp
  created_at: string;
}

export interface GoalTemplate {
  id: string;
  name: string;
  destination?: string;
  objective: string;
  recommended_duration_months: number;
  description?: string;
  tasks: TemplateTask[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TemplateTask {
  title: string;
  type: TaskType;
  weight: number;
  category: TaskCategory;
  description?: string;
  required_score?: number;
}

// Extended types with relations
export interface GoalWithTasks extends Goal {
  tasks: GoalTask[];
}

export interface GoalWithProgress extends Goal {
  tasks: GoalTask[];
  progress_logs: GoalProgressLog[];
  consultations: MentorConsultation[];
}

// Dashboard display types
export interface GoalSummary {
  goal: Goal;
  total_tasks: number;
  completed_tasks: number;
  next_task?: GoalTask;
  days_remaining: number;
  is_on_track: boolean;
}

export interface TaskWithProgress extends GoalTask {
  progress_percentage: number; // for multi-step tasks
}

// Analytics types
export interface GoalAnalytics {
  goal_id: string;
  
  // Progress velocity
  average_progress_per_week: number;
  projected_completion_date: string;
  is_ahead_of_schedule: boolean;
  
  // Task breakdown
  system_tasks_completed: number;
  self_track_tasks_completed: number;
  mentor_assessed_tasks_completed: number;
  
  // Engagement
  days_active: number;
  last_activity_date: string;
  completion_streak: number;
  
  // Category breakdown
  category_progress: {
    [key in TaskCategory]?: {
      completed: number;
      total: number;
      percentage: number;
    };
  };
}

// Form input types
export interface CreateGoalInput {
  destination: string;
  objective: string;
  target_deadline: string;
  template_id?: string; // if using a template
  custom_tasks?: Omit<GoalTask, 'id' | 'goal_id' | 'created_at' | 'updated_at'>[];
}

export interface UpdateTaskInput {
  is_completed?: boolean;
  submission_url?: string;
  notes?: string;
}

export interface SubmitTaskInput {
  task_id: string;
  submission_url: string;
  notes?: string;
}

export interface BookConsultationInput {
  goal_id: string;
  scheduled_at: string;
  discussion_topics: string[];
  notes?: string;
}

export interface MentorAssessmentInput {
  task_id: string;
  mentor_feedback: string;
  mentor_score: number; // 0-100
  verified: boolean;
}

// API Response types
export interface GoalsApiResponse {
  goals: Goal[];
  total: number;
  page: number;
  page_size: number;
}

export interface GoalDetailApiResponse {
  goal: Goal;
  tasks: GoalTask[];
  consultations: MentorConsultation[];
  analytics: GoalAnalytics;
}

// Notification types
export interface GoalNotification {
  type: 'task_due' | 'consultation_reminder' | 'milestone_reached' | 'goal_completed' | 'mentor_feedback';
  goal_id: string;
  task_id?: string;
  consultation_id?: string;
  title: string;
  message: string;
  action_url?: string;
  created_at: string;
}

// Filter & Sort types
export interface GoalFilters {
  status?: GoalStatus[];
  destination?: string[];
  created_after?: string;
  created_before?: string;
}

export interface TaskFilters {
  task_type?: TaskType[];
  category?: TaskCategory[];
  is_completed?: boolean;
  requires_verification?: boolean;
}

export type GoalSortBy = 'created_at' | 'target_deadline' | 'overall_progress';
export type SortOrder = 'asc' | 'desc';