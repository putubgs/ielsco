// IELS Goals - Smart Task Breakdown Generator
// Automatically generates tasks based on goal timeline and objective

import type { GoalTask, TaskType, TaskCategory } from '@/types/goals';

export interface TaskBreakdownConfig {
  goalId: string;
  objective: string;
  durationMonths: number;
  userTier: 'basic' | 'pro';
  currentLevel: number; // IELTS equivalent
  targetLevel: number;
}

export interface GeneratedTask {
  title: string;
  description: string;
  task_type: TaskType;
  category: TaskCategory;
  weight: number;
  requires_pro: boolean;
  week_number?: number; // When task should be done
  estimated_minutes: number;
  materials?: string[];
  linked_event_type?: string; // "speaking_club", "workshop", etc.
}

/**
 * Generate personalized task breakdown for goal duration
 */
export function generateTaskBreakdown(config: TaskBreakdownConfig): GeneratedTask[] {
  const { objective, durationMonths, userTier, currentLevel, targetLevel } = config;
  
  const tasks: GeneratedTask[] = [];
  const objectiveLower = objective.toLowerCase();
  
  // === IELTS/TOEFL PATH ===
  if (objectiveLower.includes('ielts')) {
    tasks.push(...generateIELTSTasks(durationMonths, currentLevel, targetLevel, userTier));
  }
  // === SCHOLARSHIP PATH ===
  else if (objectiveLower.includes('scholarship') || objectiveLower.includes('lpdp') || objectiveLower.includes('chevening')) {
    tasks.push(...generateScholarshipTasks(durationMonths, userTier));
  }
  // === BUSINESS/WORK PATH ===
  else if (objectiveLower.includes('job') || objectiveLower.includes('work') || objectiveLower.includes('business')) {
    tasks.push(...generateBusinessTasks(durationMonths, userTier));
  }
  // === CONVERSATION PATH ===
  else {
    tasks.push(...generateConversationTasks(durationMonths, userTier));
  }
  
  return tasks;
}

/**
 * IELTS Task Breakdown (3-12 months)
 */
function generateIELTSTasks(months: number, current: number, target: number, tier: 'basic' | 'pro'): GeneratedTask[] {
  const tasks: GeneratedTask[] = [];
  const weeksAvailable = months * 4;
  const bandGap = target - current;
  
  // === WEEK 1: DIAGNOSTIC & ONBOARDING ===
  tasks.push({
    title: "Complete IELTS Diagnostic Test",
    description: "Take full-length diagnostic to determine your baseline in all 4 sections",
    task_type: "system",
    category: "test",
    weight: 8,
    requires_pro: false,
    week_number: 1,
    estimated_minutes: 180,
    materials: ["diagnostic-test-2024.pdf"]
  });
  
  tasks.push({
    title: "Read 'IELTS Success Strategy Guide'",
    description: "Understand test format, scoring, and preparation approach",
    task_type: "self_track",
    category: "reading",
    weight: 3,
    requires_pro: false,
    week_number: 1,
    estimated_minutes: 45,
    materials: ["ielts-strategy-guide.pdf"]
  });
  
  // === SPEAKING CLUBS (PRO ONLY - Recurring every Mon/Wed/Fri) ===
  const speakingClubSessions = Math.floor(weeksAvailable * 3); // 3 sessions per week
  tasks.push({
    title: `Attend ${Math.min(speakingClubSessions, 36)} Speaking Club Sessions`,
    description: "Join Mon/Wed/Fri speaking practice (7 PM WIB). Pro members only.",
    task_type: "system",
    category: "speaking",
    weight: 15,
    requires_pro: true, // 🔒 PRO ONLY
    estimated_minutes: 90 * Math.min(speakingClubSessions, 36),
    linked_event_type: "speaking_club"
  });
  
  // === MONTHLY BREAKDOWN ===
  
  // Month 1: Foundation
  if (months >= 3) {
    tasks.push({
      title: "Complete 10 Reading Practice Passages",
      description: "Academic passages with True/False/Not Given questions",
      task_type: "self_track",
      category: "reading",
      weight: 6,
      requires_pro: false,
      week_number: 4,
      estimated_minutes: 600, // 60 mins each
      materials: ["reading-practice-set-1.pdf"]
    });
    
    tasks.push({
      title: "Write 8 Task 1 Essays (Graphs/Charts)",
      description: "Practice describing visual data with correct structure",
      task_type: "self_track",
      category: "writing",
      weight: 5,
      requires_pro: false,
      week_number: 4,
      estimated_minutes: 320, // 40 mins each
      materials: ["task1-templates.pdf", "sample-graphs.pdf"]
    });
    
    tasks.push({
      title: "Submit 2 Writing Essays for Mentor Review",
      description: "Get professional feedback on structure, coherence, and vocabulary",
      task_type: "mentor_assessed",
      category: "writing",
      weight: 10,
      requires_pro: true, // 🔒 PRO ONLY
      week_number: 4,
      estimated_minutes: 120
    });
  }
  
  // Month 2: Skill Building
  if (months >= 6) {
    tasks.push({
      title: "Complete 15 Listening Practice Tests",
      description: "Section 1-4 practice with note completion and multiple choice",
      task_type: "self_track",
      category: "listening",
      weight: 6,
      requires_pro: false,
      week_number: 8,
      estimated_minutes: 450, // 30 mins each
      materials: ["listening-practice-cambridge.zip"]
    });
    
    tasks.push({
      title: "Write 10 Task 2 Opinion Essays",
      description: "Discuss, agree/disagree, two-part questions",
      task_type: "self_track",
      category: "writing",
      weight: 7,
      requires_pro: false,
      week_number: 8,
      estimated_minutes: 400,
      materials: ["task2-question-bank.pdf"]
    });
    
    tasks.push({
      title: "Attend 4 IELTS Strategy Workshops",
      description: "Live workshops covering Writing, Speaking, Reading techniques",
      task_type: "system",
      category: "event",
      weight: 8,
      requires_pro: false,
      week_number: 8,
      estimated_minutes: 480, // 2 hours each
      linked_event_type: "workshop"
    });
  }
  
  // Month 3+: Intensive Practice
  if (months >= 9) {
    tasks.push({
      title: "Pass 6 Weekly Practice Tests (Band 6.0+)",
      description: "Full-length timed tests to track improvement",
      task_type: "system",
      category: "test",
      weight: 12,
      requires_pro: false,
      week_number: 12,
      estimated_minutes: 1080, // 180 mins each
      materials: ["weekly-test-schedule.pdf"]
    });
    
    tasks.push({
      title: "Complete 4 Speaking Mock Interviews",
      description: "Full Part 1-3 simulation with mentor feedback",
      task_type: "mentor_assessed",
      category: "speaking",
      weight: 8,
      requires_pro: true, // 🔒 PRO ONLY
      week_number: 12,
      estimated_minutes: 240 // 60 mins each (30 test + 30 feedback)
    });
  }
  
  // Final Month: Mock Exams
  tasks.push({
    title: `Achieve Band ${target - 0.5}+ in Full Mock Test`,
    description: "Complete mock exam under real test conditions",
    task_type: "system",
    category: "test",
    weight: 15,
    requires_pro: false,
    week_number: weeksAvailable - 2,
    estimated_minutes: 180
  });
  
  tasks.push({
    title: "Review All Mistakes & Weak Areas",
    description: "Analyze errors from all practice tests and essays",
    task_type: "self_track",
    category: "admin",
    weight: 5,
    requires_pro: false,
    week_number: weeksAvailable - 1,
    estimated_minutes: 240
  });
  
  return tasks;
}

/**
 * Scholarship Task Breakdown
 */
function generateScholarshipTasks(months: number, tier: 'basic' | 'pro'): GeneratedTask[] {
  const tasks: GeneratedTask[] = [];
  
  // Test Prep (first 6 months)
  tasks.push({
    title: "Achieve IELTS 6.5+ or TOEFL 90+",
    description: "Meet minimum English proficiency requirement",
    task_type: "system",
    category: "test",
    weight: 20,
    requires_pro: false,
    week_number: 24,
    estimated_minutes: 7200 // Substantial prep time
  });
  
  // Research Phase
  tasks.push({
    title: "Research 15 Target Universities",
    description: "Create spreadsheet comparing programs, costs, requirements",
    task_type: "self_track",
    category: "research",
    weight: 8,
    requires_pro: false,
    week_number: 8,
    estimated_minutes: 600,
    materials: ["university-comparison-template.xlsx"]
  });
  
  // Application Documents
  tasks.push({
    title: "Draft Personal Statement (Version 1)",
    description: "Write initial draft explaining motivation and goals",
    task_type: "self_track",
    category: "writing",
    weight: 10,
    requires_pro: false,
    week_number: 16,
    estimated_minutes: 480
  });
  
  tasks.push({
    title: "Submit Final Personal Statement for Expert Review",
    description: "Get professional editing and feedback from scholarship mentor",
    task_type: "mentor_assessed",
    category: "writing",
    weight: 15,
    requires_pro: true, // 🔒 PRO ONLY
    week_number: 24,
    estimated_minutes: 240
  });
  
  tasks.push({
    title: "Secure 2 Recommendation Letters",
    description: "Identify referees and request strong letters of support",
    task_type: "self_track",
    category: "admin",
    weight: 8,
    requires_pro: false,
    week_number: 20,
    estimated_minutes: 180
  });
  
  // Interview Prep
  tasks.push({
    title: "Attend 5 Scholarship Preparation Workshops",
    description: "Learn application strategies from past awardees",
    task_type: "system",
    category: "event",
    weight: 12,
    requires_pro: false,
    week_number: 32,
    estimated_minutes: 600,
    linked_event_type: "workshop"
  });
  
  tasks.push({
    title: "Complete 3 Mock Interview Sessions",
    description: "Practice answering scholarship panel questions with mentor",
    task_type: "mentor_assessed",
    category: "speaking",
    weight: 12,
    requires_pro: true, // 🔒 PRO ONLY
    week_number: 40,
    estimated_minutes: 270
  });
  
  // Final Submission
  tasks.push({
    title: "Complete Full Application Package Review",
    description: "Final check of all documents before submission",
    task_type: "mentor_assessed",
    category: "admin",
    weight: 5,
    requires_pro: true, // 🔒 PRO ONLY
    week_number: months * 4 - 2,
    estimated_minutes: 120
  });
  
  return tasks;
}

/**
 * Business/Work English Task Breakdown
 */
function generateBusinessTasks(months: number, tier: 'basic' | 'pro'): GeneratedTask[] {
  const tasks: GeneratedTask[] = [];
  
  tasks.push({
    title: "Complete Business English Assessment",
    description: "Baseline test for professional communication skills",
    task_type: "system",
    category: "test",
    weight: 10,
    requires_pro: false,
    week_number: 1,
    estimated_minutes: 90
  });
  
  tasks.push({
    title: "Join 12 Business English Speaking Clubs",
    description: "Practice professional conversations and presentations (Pro only)",
    task_type: "system",
    category: "speaking",
    weight: 18,
    requires_pro: true, // 🔒 PRO ONLY
    week_number: months * 4,
    estimated_minutes: 1080,
    linked_event_type: "speaking_club"
  });
  
  tasks.push({
    title: "Write 20 Professional Emails",
    description: "Requests, complaints, proposals, follow-ups",
    task_type: "self_track",
    category: "writing",
    weight: 12,
    requires_pro: false,
    week_number: 8,
    estimated_minutes: 600,
    materials: ["email-templates-business.pdf"]
  });
  
  tasks.push({
    title: "Complete 3 Mock Job Interviews in English",
    description: "Technical + behavioral questions with mentor feedback",
    task_type: "mentor_assessed",
    category: "speaking",
    weight: 15,
    requires_pro: true, // 🔒 PRO ONLY
    week_number: 12,
    estimated_minutes: 270
  });
  
  tasks.push({
    title: "Submit CV & Cover Letter for Professional Review",
    description: "Get expert feedback on English resume and application",
    task_type: "mentor_assessed",
    category: "writing",
    weight: 10,
    requires_pro: true, // 🔒 PRO ONLY
    week_number: months * 4 - 4,
    estimated_minutes: 120
  });
  
  tasks.push({
    title: "Read 8 Business Communication Guides",
    description: "Learn industry-specific vocabulary and phrases",
    task_type: "self_track",
    category: "reading",
    weight: 8,
    requires_pro: false,
    week_number: months * 4,
    estimated_minutes: 480,
    materials: ["business-vocab-tech.pdf", "business-vocab-finance.pdf"]
  });
  
  tasks.push({
    title: "Attend 5 Professional English Workshops",
    description: "Meetings, presentations, negotiations",
    task_type: "system",
    category: "event",
    weight: 12,
    requires_pro: false,
    week_number: months * 4,
    estimated_minutes: 600,
    linked_event_type: "workshop"
  });
  
  tasks.push({
    title: "Practice 10 Presentation Deliveries",
    description: "Record yourself presenting business topics",
    task_type: "self_track",
    category: "speaking",
    weight: 10,
    requires_pro: false,
    week_number: months * 4,
    estimated_minutes: 600
  });
  
  return tasks;
}

/**
 * Conversation Fluency Task Breakdown
 */
function generateConversationTasks(months: number, tier: 'basic' | 'pro'): GeneratedTask[] {
  const tasks: GeneratedTask[] = [];
  
  tasks.push({
    title: "Complete Conversation Level Assessment",
    description: "Determine current CEFR level (A1-C2)",
    task_type: "system",
    category: "test",
    weight: 8,
    requires_pro: false,
    week_number: 1,
    estimated_minutes: 60
  });
  
  const clubSessions = months * 12; // 3 per week
  tasks.push({
    title: `Attend ${clubSessions} Speaking Club Sessions`,
    description: "Mon/Wed/Fri conversation practice (Pro members priority)",
    task_type: "system",
    category: "speaking",
    weight: 25,
    requires_pro: true, // 🔒 PRO ONLY
    week_number: months * 4,
    estimated_minutes: clubSessions * 90,
    linked_event_type: "speaking_club"
  });
  
  tasks.push({
    title: "Complete 30 Daily Speaking Logs",
    description: "Record yourself speaking for 5 minutes daily on random topics",
    task_type: "self_track",
    category: "speaking",
    weight: 15,
    requires_pro: false,
    week_number: months * 4,
    estimated_minutes: 150
  });
  
  tasks.push({
    title: "Watch 20 English Movies/Series with Journal",
    description: "Write summary and new vocabulary after each episode",
    task_type: "self_track",
    category: "listening",
    weight: 10,
    requires_pro: false,
    week_number: months * 4,
    estimated_minutes: 2400, // 120 mins each
    materials: ["movie-learning-worksheet.pdf"]
  });
  
  tasks.push({
    title: "Read 10 English Novels or Books",
    description: "Graded readers or popular fiction for vocabulary building",
    task_type: "self_track",
    category: "reading",
    weight: 10,
    requires_pro: false,
    week_number: months * 4,
    estimated_minutes: 1200,
    materials: ["recommended-reading-list.pdf"]
  });
  
  tasks.push({
    title: "Write 20 Daily Journal Entries in English",
    description: "Practice writing naturally about daily experiences",
    task_type: "self_track",
    category: "writing",
    weight: 8,
    requires_pro: false,
    week_number: months * 4 / 2,
    estimated_minutes: 300
  });
  
  tasks.push({
    title: "Complete 4 Fluency Assessment Check-ins",
    description: "Quarterly speaking evaluations with mentor",
    task_type: "mentor_assessed",
    category: "speaking",
    weight: 12,
    requires_pro: true, // 🔒 PRO ONLY
    week_number: months * 4,
    estimated_minutes: 240
  });
  
  tasks.push({
    title: "Attend 6 General English Workshops",
    description: "Pronunciation, idioms, slang, cultural nuances",
    task_type: "system",
    category: "event",
    weight: 12,
    requires_pro: false,
    week_number: months * 4,
    estimated_minutes: 720,
    linked_event_type: "workshop"
  });
  
  return tasks;
}

/**
 * Calculate total weight to ensure it sums to 100%
 */
export function normalizeTaskWeights(tasks: GeneratedTask[]): GeneratedTask[] {
  const totalWeight = tasks.reduce((sum, task) => sum + task.weight, 0);
  
  if (totalWeight === 100) return tasks;
  
  // Proportionally adjust weights to sum to 100
  return tasks.map(task => ({
    ...task,
    weight: Math.round((task.weight / totalWeight) * 100)
  }));
}

/**
 * Filter tasks based on user tier
 */
export function filterTasksByTier(tasks: GeneratedTask[], tier: 'basic' | 'pro'): {
  accessible: GeneratedTask[];
  locked: GeneratedTask[];
} {
  const accessible = tasks.filter(t => !t.requires_pro || tier === 'pro');
  const locked = tier === 'basic' ? tasks.filter(t => t.requires_pro) : [];
  
  return { accessible, locked };
}