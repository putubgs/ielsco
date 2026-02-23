// IELS Goals - Smart Task Breakdown Generator
// CEFR-aware, generates tasks proportional to level gap & timeline

import type { GoalTask, TaskType, TaskCategory } from '@/types/goals';
import type { CEFRLevel } from './progress-calculator';

export interface TaskBreakdownConfig {
  goalId: string;
  objective: string;
  durationMonths: number;
  userTier: 'explorer' | 'insider' | 'visionary';
  currentCEFR: CEFRLevel;
  targetCEFR: CEFRLevel;
  // IELTS equivalents (auto-converted from CEFR)
  currentIELTS: number;
  targetIELTS: number;
}

export interface GeneratedTask {
  title: string;
  description: string;
  task_type: TaskType;
  category: TaskCategory;
  weight: number;
  requires_pro: boolean;
  week_number?: number;
  estimated_minutes: number;
  materials?: string[];
  linked_event_type?: string;
}

// CEFR level numeric index for gap calculations
const CEFR_INDEX: Record<CEFRLevel, number> = {
  A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5,
};

function getLevelGap(from: CEFRLevel, to: CEFRLevel): number {
  return Math.max(0, CEFR_INDEX[to] - CEFR_INDEX[from]);
}

/**
 * Main entry point — routes to the right task set based on objective keyword
 */
export function generateTaskBreakdown(config: TaskBreakdownConfig): GeneratedTask[] {
  const { objective, durationMonths, userTier, currentCEFR, targetCEFR, currentIELTS, targetIELTS } = config;
  const objectiveLower = objective.toLowerCase();

  if (objectiveLower.includes('ielts')) {
    return generateIELTSTasks(durationMonths, currentIELTS, targetIELTS, userTier);
  }
  if (objectiveLower.includes('toefl')) {
    return generateTOEFLTasks(durationMonths, currentIELTS, targetIELTS, userTier);
  }
  if (
    objectiveLower.includes('lpdp') ||
    objectiveLower.includes('chevening') ||
    objectiveLower.includes('fulbright') ||
    objectiveLower.includes('scholarship')
  ) {
    return generateScholarshipTasks(durationMonths, userTier, currentIELTS);
  }
  if (
    objectiveLower.includes('job') ||
    objectiveLower.includes('work') ||
    objectiveLower.includes('business') ||
    objectiveLower.includes('remote') ||
    objectiveLower.includes('tech') ||
    objectiveLower.includes('healthcare') ||
    objectiveLower.includes('professional')
  ) {
    return generateProfessionalTasks(durationMonths, userTier, currentCEFR, targetCEFR);
  }
  // Default: conversation / fluency
  return generateConversationTasks(durationMonths, userTier, currentCEFR, targetCEFR);
}

// ============================================
// IELTS PATH
// ============================================

function generateIELTSTasks(
  months: number,
  currentBand: number,
  targetBand: number,
  tier: TaskBreakdownConfig['userTier']
): GeneratedTask[] {
  const tasks: GeneratedTask[] = [];
  const weeks = months * 4;
  const bandGap = Math.max(0, targetBand - currentBand);

  // Scale task volume proportionally to band gap & duration
  const intensity = Math.max(1, bandGap / 0.5); // each 0.5 band = 1 intensity unit

  // Diagnostic (always, week 1)
  tasks.push({
    title: 'Complete IELTS Diagnostic Test',
    description: 'Full-length diagnostic to determine your baseline across all 4 sections (Reading, Writing, Listening, Speaking)',
    task_type: 'system',
    category: 'test',
    weight: 8,
    requires_pro: false,
    week_number: 1,
    estimated_minutes: 180,
    materials: ['diagnostic-test-2024.pdf'],
  });

  tasks.push({
    title: "Read 'IELTS Success Strategy Guide'",
    description: 'Understand test format, scoring bands, and the best preparation approach for your target band',
    task_type: 'self_track',
    category: 'reading',
    weight: 3,
    requires_pro: false,
    week_number: 1,
    estimated_minutes: 45,
    materials: ['ielts-strategy-guide.pdf'],
  });

  // Speaking Club — sessions scale with duration
  const totalSpeakingClubSessions = Math.min(weeks * 3, 108); // max 3/week
  tasks.push({
    title: `Attend ${totalSpeakingClubSessions} Speaking Club Sessions`,
    description: 'Join Mon/Wed/Fri speaking practice (7 PM WIB). Live feedback from peers and coaches.',
    task_type: 'system',
    category: 'speaking',
    weight: 15,
    requires_pro: true,
    estimated_minutes: totalSpeakingClubSessions * 90,
    linked_event_type: 'speaking_club',
  });

  // Reading practice — more passages for bigger gap
  const readingPassages = Math.round(10 * intensity * (months / 6));
  tasks.push({
    title: `Complete ${readingPassages} Academic Reading Passages`,
    description: 'True/False/Not Given, matching headings, sentence completion with timed practice',
    task_type: 'self_track',
    category: 'reading',
    weight: 6,
    requires_pro: false,
    week_number: Math.round(weeks * 0.3),
    estimated_minutes: readingPassages * 60,
    materials: ['reading-practice-academic.pdf'],
  });

  // Writing Task 1
  const task1Count = Math.round(6 * intensity * (months / 6));
  tasks.push({
    title: `Write ${task1Count} Task 1 Graph/Chart Essays`,
    description: 'Practice describing visual data (bar charts, line graphs, pie charts, maps) with correct structure and vocabulary',
    task_type: 'self_track',
    category: 'writing',
    weight: 5,
    requires_pro: false,
    week_number: Math.round(weeks * 0.3),
    estimated_minutes: task1Count * 40,
    materials: ['task1-templates.pdf', 'sample-graphs.pdf'],
  });

  // Writing Task 2
  const task2Count = Math.round(8 * intensity * (months / 6));
  tasks.push({
    title: `Write ${task2Count} Task 2 Opinion Essays`,
    description: 'Discuss both views, agree/disagree, advantages/disadvantages, two-part questions',
    task_type: 'self_track',
    category: 'writing',
    weight: 7,
    requires_pro: false,
    week_number: Math.round(weeks * 0.5),
    estimated_minutes: task2Count * 40,
    materials: ['task2-question-bank.pdf'],
  });

  // Mentor writing review (Pro)
  const mentorEssays = Math.round(2 * Math.ceil(months / 3)); // 2 per quarter
  tasks.push({
    title: `Submit ${mentorEssays} Essays for Mentor Review`,
    description: 'Get professional band-score feedback on structure, coherence, lexical resource, and grammatical range',
    task_type: 'mentor_assessed',
    category: 'writing',
    weight: 10,
    requires_pro: true,
    week_number: Math.round(weeks * 0.5),
    estimated_minutes: mentorEssays * 60,
  });

  // Listening practice
  const listeningTests = Math.round(12 * intensity * (months / 6));
  tasks.push({
    title: `Complete ${listeningTests} Listening Practice Tests`,
    description: 'Section 1–4 practice: note completion, multiple choice, matching, plan/map/diagram labelling',
    task_type: 'self_track',
    category: 'listening',
    weight: 6,
    requires_pro: false,
    week_number: Math.round(weeks * 0.6),
    estimated_minutes: listeningTests * 30,
    materials: ['listening-cambridge-17.zip'],
  });

  // Workshops
  const workshopCount = Math.max(2, Math.round(months / 2));
  tasks.push({
    title: `Attend ${workshopCount} IELTS Strategy Workshops`,
    description: 'Live sessions covering Writing, Speaking, Reading & Listening techniques with IELS coaches',
    task_type: 'system',
    category: 'event',
    weight: 8,
    requires_pro: false,
    week_number: Math.round(weeks * 0.6),
    estimated_minutes: workshopCount * 120,
    linked_event_type: 'workshop',
  });

  // Practice tests
  const practiceTests = Math.max(3, Math.round(months * 0.75));
  tasks.push({
    title: `Pass ${practiceTests} Full Mock Tests (Band ${targetBand - 0.5}+)`,
    description: 'Full-length timed tests under real exam conditions. Track band improvement over time.',
    task_type: 'system',
    category: 'test',
    weight: 12,
    requires_pro: false,
    week_number: Math.round(weeks * 0.75),
    estimated_minutes: practiceTests * 180,
  });

  // Speaking mock interviews (Pro)
  const mockInterviews = Math.max(2, Math.round(months / 3));
  tasks.push({
    title: `Complete ${mockInterviews} Speaking Mock Interviews`,
    description: 'Full Part 1–3 simulation with band-score feedback from an IELS speaking coach',
    task_type: 'mentor_assessed',
    category: 'speaking',
    weight: 8,
    requires_pro: true,
    week_number: Math.round(weeks * 0.8),
    estimated_minutes: mockInterviews * 60,
  });

  // Final review
  tasks.push({
    title: `Achieve Band ${targetBand - 0.5}+ in Final Mock Test`,
    description: 'Final full mock under strict exam conditions to confirm readiness',
    task_type: 'system',
    category: 'test',
    weight: 10,
    requires_pro: false,
    week_number: weeks - 2,
    estimated_minutes: 180,
  });

  tasks.push({
    title: 'Review All Mistakes & Weak Areas',
    description: 'Analyse all errors from practice tests, essays, and speaking recordings. Create a personal error log.',
    task_type: 'self_track',
    category: 'admin',
    weight: 5,
    requires_pro: false,
    week_number: weeks - 1,
    estimated_minutes: 240,
  });

  return normalizeWeights(tasks);
}

// ============================================
// TOEFL PATH
// ============================================

function generateTOEFLTasks(
  months: number,
  currentBand: number,
  targetBand: number,
  tier: TaskBreakdownConfig['userTier']
): GeneratedTask[] {
  const tasks: GeneratedTask[] = [];
  const weeks = months * 4;

  tasks.push({
    title: 'Complete TOEFL iBT Diagnostic Test',
    description: 'Full-length diagnostic to assess baseline in Reading, Listening, Speaking, and Writing',
    task_type: 'system',
    category: 'test',
    weight: 8,
    requires_pro: false,
    week_number: 1,
    estimated_minutes: 210,
  });

  const readingCount = Math.round(12 * (months / 6));
  tasks.push({
    title: `Complete ${readingCount} TOEFL Reading Passages`,
    description: 'Academic texts with inference, vocabulary, and prose summary questions',
    task_type: 'self_track',
    category: 'reading',
    weight: 7,
    requires_pro: false,
    week_number: Math.round(weeks * 0.4),
    estimated_minutes: readingCount * 45,
  });

  const listeningCount = Math.round(15 * (months / 6));
  tasks.push({
    title: `Complete ${listeningCount} TOEFL Listening Exercises`,
    description: 'Lectures and conversations with detail, function, attitude questions',
    task_type: 'self_track',
    category: 'listening',
    weight: 7,
    requires_pro: false,
    week_number: Math.round(weeks * 0.4),
    estimated_minutes: listeningCount * 25,
  });

  const speakingResponseCount = Math.round(20 * (months / 6));
  tasks.push({
    title: `Record ${speakingResponseCount} TOEFL Speaking Responses`,
    description: 'Integrated and independent tasks timed to 45–60 seconds. Self-evaluate using rubric.',
    task_type: 'self_track',
    category: 'speaking',
    weight: 8,
    requires_pro: false,
    week_number: Math.round(weeks * 0.5),
    estimated_minutes: speakingResponseCount * 15,
  });

  const writingCount = Math.round(10 * (months / 6));
  tasks.push({
    title: `Write ${writingCount} TOEFL Writing Tasks`,
    description: 'Integrated (reading + lecture) and Academic Discussion tasks with timed practice',
    task_type: 'self_track',
    category: 'writing',
    weight: 8,
    requires_pro: false,
    week_number: Math.round(weeks * 0.6),
    estimated_minutes: writingCount * 30,
  });

  const mockCount = Math.max(2, Math.round(months * 0.6));
  tasks.push({
    title: `Complete ${mockCount} Full TOEFL Mock Tests`,
    description: 'Timed under exam conditions. Aim for your target score before test day.',
    task_type: 'system',
    category: 'test',
    weight: 15,
    requires_pro: false,
    week_number: Math.round(weeks * 0.8),
    estimated_minutes: mockCount * 210,
  });

  return normalizeWeights(tasks);
}

// ============================================
// SCHOLARSHIP PATH (LPDP / Chevening / Fulbright)
// ============================================

function generateScholarshipTasks(
  months: number,
  tier: TaskBreakdownConfig['userTier'],
  currentBand: number
): GeneratedTask[] {
  const tasks: GeneratedTask[] = [];
  const weeks = months * 4;

  // IELTS/TOEFL prep (most scholarships need 6.5+)
  const targetBand = Math.max(6.5, currentBand + 1.0);
  tasks.push({
    title: `Achieve IELTS ${targetBand}+ (or TOEFL 90+)`,
    description: 'Meet the minimum English proficiency requirement for most international scholarship programs',
    task_type: 'system',
    category: 'test',
    weight: 20,
    requires_pro: false,
    week_number: Math.round(weeks * 0.5),
    estimated_minutes: 6000,
  });

  tasks.push({
    title: 'Research 15 Target Universities & Programs',
    description: 'Compare programs, admission requirements, tuition costs, rankings, and scholarship compatibility',
    task_type: 'self_track',
    category: 'reading',
    weight: 8,
    requires_pro: false,
    week_number: Math.round(weeks * 0.2),
    estimated_minutes: 600,
    materials: ['university-comparison-template.xlsx'],
  });

  tasks.push({
    title: 'Draft Personal Statement (Version 1)',
    description: 'Write your initial draft: motivation, career goals, why this scholarship, what you bring',
    task_type: 'self_track',
    category: 'writing',
    weight: 8,
    requires_pro: false,
    week_number: Math.round(weeks * 0.35),
    estimated_minutes: 480,
  });

  tasks.push({
    title: 'Revise Personal Statement (Version 2)',
    description: 'Incorporate peer feedback, sharpen your narrative, strengthen evidence',
    task_type: 'self_track',
    category: 'writing',
    weight: 5,
    requires_pro: false,
    week_number: Math.round(weeks * 0.5),
    estimated_minutes: 300,
  });

  tasks.push({
    title: 'Submit Final Personal Statement for Expert Review',
    description: 'Professional editing and feedback from scholarship mentor on impact, clarity, and tone',
    task_type: 'mentor_assessed',
    category: 'writing',
    weight: 15,
    requires_pro: true,
    week_number: Math.round(weeks * 0.65),
    estimated_minutes: 240,
  });

  tasks.push({
    title: 'Secure 2 Strong Recommendation Letters',
    description: 'Identify the right referees (academic/professional), brief them on your goals, provide talking points',
    task_type: 'self_track',
    category: 'admin',
    weight: 8,
    requires_pro: false,
    week_number: Math.round(weeks * 0.5),
    estimated_minutes: 180,
  });

  tasks.push({
    title: 'Prepare Complete Application Package',
    description: 'CV, transcripts, statement, references, research proposal (if required), language certificate',
    task_type: 'self_track',
    category: 'admin',
    weight: 7,
    requires_pro: false,
    week_number: Math.round(weeks * 0.7),
    estimated_minutes: 360,
  });

  const workshopCount = Math.max(3, Math.round(months / 2));
  tasks.push({
    title: `Attend ${workshopCount} Scholarship Preparation Workshops`,
    description: 'Strategy sessions led by past LPDP/Chevening/Fulbright awardees. Application tips, essay writing, interview prep.',
    task_type: 'system',
    category: 'event',
    weight: 10,
    requires_pro: false,
    week_number: Math.round(weeks * 0.75),
    estimated_minutes: workshopCount * 120,
    linked_event_type: 'workshop',
  });

  tasks.push({
    title: 'Complete 3 Mock Scholarship Interviews',
    description: 'Full panel interview simulation with hard questions on motivation, leadership, and career vision',
    task_type: 'mentor_assessed',
    category: 'speaking',
    weight: 12,
    requires_pro: true,
    week_number: Math.round(weeks * 0.85),
    estimated_minutes: 270,
  });

  tasks.push({
    title: 'Final Application Package Review',
    description: 'Last check of all documents for consistency, quality, and completeness before submission deadline',
    task_type: 'mentor_assessed',
    category: 'admin',
    weight: 7,
    requires_pro: true,
    week_number: weeks - 1,
    estimated_minutes: 120,
  });

  return normalizeWeights(tasks);
}

// ============================================
// PROFESSIONAL ENGLISH PATH
// (Remote Job, Tech, Healthcare, Business)
// ============================================

function generateProfessionalTasks(
  months: number,
  tier: TaskBreakdownConfig['userTier'],
  currentCEFR: CEFRLevel,
  targetCEFR: CEFRLevel
): GeneratedTask[] {
  const tasks: GeneratedTask[] = [];
  const weeks = months * 4;

  tasks.push({
    title: 'Complete Professional English Baseline Assessment',
    description: 'Evaluate current business communication level: writing, speaking, vocabulary, and professional tone',
    task_type: 'system',
    category: 'test',
    weight: 8,
    requires_pro: false,
    week_number: 1,
    estimated_minutes: 90,
  });

  const emailCount = Math.round(15 * (months / 4));
  tasks.push({
    title: `Write ${emailCount} Professional Emails & Documents`,
    description: 'Requests, proposals, complaints, follow-ups, meeting summaries. Covers formal register and tone.',
    task_type: 'self_track',
    category: 'writing',
    weight: 12,
    requires_pro: false,
    week_number: Math.round(weeks * 0.4),
    estimated_minutes: emailCount * 30,
    materials: ['email-templates-business.pdf'],
  });

  const presentationCount = Math.round(8 * (months / 4));
  tasks.push({
    title: `Deliver ${presentationCount} Recorded Presentations`,
    description: 'Self-record 5–10 minute presentations on professional topics. Review for fluency, pronunciation, structure.',
    task_type: 'self_track',
    category: 'speaking',
    weight: 10,
    requires_pro: false,
    week_number: Math.round(weeks * 0.5),
    estimated_minutes: presentationCount * 60,
  });

  const speakingClubSessions = Math.round(weeks * 2); // 2/week for professionals
  tasks.push({
    title: `Attend ${speakingClubSessions} Professional Speaking Club Sessions`,
    description: 'Mon/Wed/Fri speaking practice focused on business topics, debates, and presentations (Pro members)',
    task_type: 'system',
    category: 'speaking',
    weight: 15,
    requires_pro: true,
    estimated_minutes: speakingClubSessions * 90,
    linked_event_type: 'speaking_club',
  });

  tasks.push({
    title: 'Complete 3 Mock Job Interviews in English',
    description: 'Technical + behavioral interviews in English. Get band-scored feedback from IELS coaches.',
    task_type: 'mentor_assessed',
    category: 'speaking',
    weight: 15,
    requires_pro: true,
    week_number: Math.round(weeks * 0.7),
    estimated_minutes: 270,
  });

  tasks.push({
    title: 'Submit English CV & Cover Letter for Review',
    description: 'Expert feedback on English quality, formatting, impact, and ATS-optimisation',
    task_type: 'mentor_assessed',
    category: 'writing',
    weight: 10,
    requires_pro: true,
    week_number: Math.round(weeks * 0.6),
    estimated_minutes: 120,
  });

  const readingCount = Math.round(6 * (months / 4));
  tasks.push({
    title: `Read ${readingCount} Industry Articles & Business Guides`,
    description: 'Tech, finance, healthcare, or general business articles. Build domain vocabulary and reading speed.',
    task_type: 'self_track',
    category: 'reading',
    weight: 8,
    requires_pro: false,
    week_number: Math.round(weeks * 0.8),
    estimated_minutes: readingCount * 45,
    materials: ['business-vocab-tech.pdf', 'business-vocab-finance.pdf'],
  });

  const workshopCount = Math.max(3, Math.round(months / 2));
  tasks.push({
    title: `Attend ${workshopCount} Professional English Workshops`,
    description: 'Meetings, negotiations, presentations, remote communication strategies',
    task_type: 'system',
    category: 'event',
    weight: 10,
    requires_pro: false,
    week_number: Math.round(weeks * 0.9),
    estimated_minutes: workshopCount * 120,
    linked_event_type: 'workshop',
  });

  tasks.push({
    title: 'Complete Final Professional English Assessment',
    description: 'Re-take baseline assessment to measure improvement and confirm readiness',
    task_type: 'system',
    category: 'test',
    weight: 12,
    requires_pro: false,
    week_number: weeks - 1,
    estimated_minutes: 90,
  });

  return normalizeWeights(tasks);
}

// ============================================
// CONVERSATION / GENERAL FLUENCY PATH
// ============================================

function generateConversationTasks(
  months: number,
  tier: TaskBreakdownConfig['userTier'],
  currentCEFR: CEFRLevel,
  targetCEFR: CEFRLevel
): GeneratedTask[] {
  const tasks: GeneratedTask[] = [];
  const weeks = months * 4;

  tasks.push({
    title: 'Complete CEFR Level Assessment',
    description: 'Confirm your starting level (A1–C1) across speaking, writing, reading, and listening. Takes ~45 mins.',
    task_type: 'system',
    category: 'test',
    weight: 6,
    requires_pro: false,
    week_number: 1,
    estimated_minutes: 60,
  });

  const totalSpeakingClubSessions = Math.round(weeks * 3); // 3/week
  tasks.push({
    title: `Attend ${totalSpeakingClubSessions} Speaking Club Sessions`,
    description: 'Mon/Wed/Fri conversation practice with peers and coaches (7 PM WIB). Pro members get priority access.',
    task_type: 'system',
    category: 'speaking',
    weight: 25,
    requires_pro: true,
    estimated_minutes: totalSpeakingClubSessions * 90,
    linked_event_type: 'speaking_club',
  });

  const speakingLogCount = Math.round(30 * (months / 6));
  tasks.push({
    title: `Record ${speakingLogCount} Daily Speaking Logs`,
    description: 'Record yourself for 3–5 minutes on random topics. Listen back and note pronunciation or fluency issues.',
    task_type: 'self_track',
    category: 'speaking',
    weight: 12,
    requires_pro: false,
    estimated_minutes: speakingLogCount * 10,
  });

  const movieCount = Math.round(12 * (months / 6));
  tasks.push({
    title: `Watch ${movieCount} English Movies/Series with Vocabulary Journal`,
    description: 'After each episode, write a 5-sentence summary and list 5+ new words/phrases with definitions',
    task_type: 'self_track',
    category: 'listening',
    weight: 10,
    requires_pro: false,
    estimated_minutes: movieCount * 120,
    materials: ['movie-learning-worksheet.pdf'],
  });

  const journalCount = Math.round(20 * (months / 6));
  tasks.push({
    title: `Write ${journalCount} Journal Entries in English`,
    description: 'Write naturally about your day, thoughts, or opinions. Aim for 150–200 words per entry.',
    task_type: 'self_track',
    category: 'writing',
    weight: 8,
    requires_pro: false,
    week_number: Math.round(weeks / 2),
    estimated_minutes: journalCount * 20,
  });

  const bookCount = Math.round(4 * (months / 6));
  tasks.push({
    title: `Read ${bookCount} English Books or Graded Readers`,
    description: 'Graded readers matched to your CEFR level or popular fiction. Focus on reading speed and vocabulary.',
    task_type: 'self_track',
    category: 'reading',
    weight: 8,
    requires_pro: false,
    estimated_minutes: bookCount * 300,
    materials: ['recommended-reading-list.pdf'],
  });

  const fluencyCheckCount = Math.max(2, Math.round(months / 3));
  tasks.push({
    title: `Complete ${fluencyCheckCount} Fluency Assessment Check-ins`,
    description: 'Quarterly evaluation with an IELS coach. Measure improvement and adjust your plan.',
    task_type: 'mentor_assessed',
    category: 'speaking',
    weight: 12,
    requires_pro: true,
    estimated_minutes: fluencyCheckCount * 60,
  });

  const workshopCount = Math.max(3, Math.round(months / 2));
  tasks.push({
    title: `Attend ${workshopCount} English Fluency Workshops`,
    description: 'Pronunciation, natural expressions, idioms, cultural nuances, and conversation strategies',
    task_type: 'system',
    category: 'event',
    weight: 12,
    requires_pro: false,
    estimated_minutes: workshopCount * 120,
    linked_event_type: 'workshop',
  });

  tasks.push({
    title: 'Final CEFR Level Re-assessment',
    description: `Confirm you've reached ${targetCEFR} or above. Celebrate and plan your next milestone!`,
    task_type: 'system',
    category: 'test',
    weight: 7,
    requires_pro: false,
    week_number: weeks - 1,
    estimated_minutes: 60,
  });

  return normalizeWeights(tasks);
}

// ============================================
// HELPERS
// ============================================

function normalizeWeights(tasks: GeneratedTask[]): GeneratedTask[] {
  const total = tasks.reduce((sum, t) => sum + t.weight, 0);
  if (total === 100) return tasks;
  return tasks.map(t => ({
    ...t,
    weight: Math.round((t.weight / total) * 100),
  }));
}

export function filterTasksByTier(
  tasks: GeneratedTask[],
  tier: TaskBreakdownConfig['userTier']
): { accessible: GeneratedTask[]; locked: GeneratedTask[] } {
  const isProUser = tier === 'insider' || tier === 'visionary';
  return {
    accessible: tasks.filter(t => !t.requires_pro || isProUser),
    locked: isProUser ? [] : tasks.filter(t => t.requires_pro),
  };
}