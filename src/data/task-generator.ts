// IELS Goals — Smart Task Breakdown Generator v2
// Aligned with GoalWizard study & work objectives
// Tasks are CEFR-aware, English-focused, measurable, with deadlines from task creation

import type { GoalTask, TaskType, TaskCategory } from "@/types/goals";
import type { CEFRLevel } from "./progress-calculator";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface TaskBreakdownConfig {
  goalId: string;
  objective: string;       // full label e.g. "IELTS Mastery — 7.0 — Postgraduate programs"
  subObjectiveId: string;  // e.g. "ielts_70"
  durationMonths: number;
  userTier: "explorer" | "insider" | "visionary";
  currentCEFR: CEFRLevel;
  targetCEFR: CEFRLevel;
  currentIELTS: number;
  targetIELTS: number;
}

export interface GeneratedTask {
  title: string;
  description: string;
  task_type: TaskType;
  category: TaskCategory;
  weight: number;           // 0–100, normalised at end
  requires_pro: boolean;
  // Days from task creation until deadline (null = no hard deadline)
  deadline_days: number | null;
  display_order: number;
  estimated_minutes: number;
  // For verification: quiz questions the user must answer correctly before marking done
  verification_quiz?: QuizQuestion[];
  // For self_track tasks: what evidence/proof we expect
  completion_criteria?: string;
  materials?: string[];
  linked_event_type?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
}

// ─────────────────────────────────────────────
// CEFR gap helper
// ─────────────────────────────────────────────

const CEFR_INDEX: Record<CEFRLevel, number> = {
  A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5,
};

function getLevelGap(from: CEFRLevel, to: CEFRLevel): number {
  return Math.max(0, CEFR_INDEX[to] - CEFR_INDEX[from]);
}

// ─────────────────────────────────────────────
// Router
// ─────────────────────────────────────────────

export function generateTaskBreakdown(config: TaskBreakdownConfig): GeneratedTask[] {
  const id = config.subObjectiveId.toLowerCase();
  const obj = config.objective.toLowerCase();

  // ── STUDY objectives ──
  if (id.startsWith("ielts_"))              return generateIELTSTasks(config);
  if (id.startsWith("toefl_"))             return generateTOEFLTasks(config);
  if (["lpdp","iisma","beasiswa_unggulan","bim"].includes(id)) return generateDomesticScholarshipTasks(config);
  if (["chevening","fulbright","aas","mext","gks","gates"].includes(id)) return generateGlobalScholarshipTasks(config);
  if (id.startsWith("aw_"))                return generateAcademicWritingTasks(config);
  if (id.startsWith("ex_"))                return generateStudentExchangeTasks(config);
  if (id.startsWith("ivy_"))               return generateIvyAdmissionsTasks(config);
  if (id.startsWith("fin_"))               return generateSchoolFinalsTasks(config);

  // ── WORK objectives ──
  if (id.startsWith("iv_"))                return generateInterviewMasteryTasks(config);
  if (id.startsWith("rw_"))                return generateRemoteWorkTasks(config);
  if (id.startsWith("ps_"))                return generatePublicSpeakingTasks(config);
  if (id.startsWith("whv_"))               return generateWHVTasks(config);
  if (id.startsWith("fl_"))                return generateFreelancingTasks(config);
  if (id.startsWith("le_"))               return generateLeadershipEnglishTasks(config);
  if (id.startsWith("te_"))               return generateTechnicalEnglishTasks(config);
  if (id.startsWith("sp_"))               return generateStartupPitchingTasks(config);

  // Fallback
  return generateConversationFluencyTasks(config);
}

// ─────────────────────────────────────────────
// Shared quiz bank
// ─────────────────────────────────────────────

const QUIZ_TASK_1: QuizQuestion[] = [
  {
    question: "In IELTS Task 1, what is the minimum word count required?",
    options: ["100 words", "150 words", "200 words", "250 words"],
    correct_index: 1,
    explanation: "Task 1 requires at least 150 words. Writing less will result in a penalty."
  },
  {
    question: "Which of these is NOT a feature IELTS Task 1 expects you to report?",
    options: ["Overall trend", "Key data points", "Your personal opinion on the data", "Notable comparisons"],
    correct_index: 2,
    explanation: "Task 1 is purely descriptive — you must not include personal opinions."
  }
];

const QUIZ_TASK_2: QuizQuestion[] = [
  {
    question: "What is the recommended minimum word count for IELTS Writing Task 2?",
    options: ["150 words", "200 words", "250 words", "300 words"],
    correct_index: 2,
    explanation: "Task 2 requires at least 250 words. Writing less will result in band reduction."
  },
  {
    question: "Which essay structure is generally recommended for an 'Agree or Disagree' Task 2?",
    options: [
      "Introduction, One body paragraph, Conclusion",
      "Introduction, Two body paragraphs, Conclusion",
      "Introduction, Three body paragraphs, Conclusion",
      "No fixed structure needed"
    ],
    correct_index: 1,
    explanation: "A 4-paragraph structure (Intro + 2 body paragraphs + Conclusion) is standard and scores well."
  }
];

const QUIZ_DIAGNOSTIC: QuizQuestion[] = [
  {
    question: "After completing your diagnostic test, which section had your lowest band score?",
    options: ["Reading", "Writing", "Listening", "Speaking"],
    correct_index: 0, // placeholder — in real app this is user-submitted free text or dynamic
    explanation: "Identifying your weakest section helps you allocate more study time to it."
  }
];

function makeReadingQuiz(level: string): QuizQuestion[] {
  return [
    {
      question: `Which of these strategies is most effective for ${level}-level academic reading?`,
      options: [
        "Read every word from start to finish",
        "Skim headings first, then scan for keywords",
        "Skip paragraphs you find difficult",
        "Only read the first sentence of each paragraph"
      ],
      correct_index: 1,
      explanation: "Skimming + scanning is the most efficient strategy for academic reading under time pressure."
    }
  ];
}

function makeSpeakingQuiz(): QuizQuestion[] {
  return [
    {
      question: "Which of these will most negatively impact your IELTS Speaking band score?",
      options: [
        "Using a slight accent",
        "Long pauses and fillers like 'um' repeated frequently",
        "Speaking slightly faster than usual",
        "Using simple vocabulary occasionally"
      ],
      correct_index: 1,
      explanation: "Excessive hesitation and fillers directly reduce your Fluency & Coherence score."
    }
  ];
}

// ─────────────────────────────────────────────
// STUDY PATHS
// ─────────────────────────────────────────────

// ── 1. IELTS ──────────────────────────────────

function generateIELTSTasks(c: TaskBreakdownConfig): GeneratedTask[] {
  const { durationMonths: m, targetIELTS, currentIELTS, targetCEFR, currentCEFR } = c;
  const weeks = m * 4;
  const gap = Math.max(0.5, targetIELTS - currentIELTS);
  const intensity = gap / 0.5;

  const tasks: GeneratedTask[] = [
    {
      title: "Complete Full IELTS Diagnostic Test",
      description:
        "Take a full timed IELTS mock (Reading 60 min, Listening 30 min, Writing 60 min). " +
        "Score yourself honestly using the official band descriptors. Record each section score.",
      task_type: "self_track",
      category: "test",
      weight: 8,
      requires_pro: false,
      deadline_days: 7,
      display_order: 1,
      estimated_minutes: 180,
      completion_criteria: "Screenshot or photo of your scored diagnostic sheet uploaded",
      verification_quiz: QUIZ_DIAGNOSTIC,
      materials: ["diagnostic-test-2024.pdf", "ielts-band-descriptors.pdf"],
    },
    {
      title: "Study IELTS Task 1 — Graph & Chart Writing",
      description:
        `Write ${Math.round(4 * intensity * (m / 6))} Task 1 responses covering bar charts, line graphs, pie charts, and process diagrams. ` +
        "Each must be 150–200 words, written within 20 minutes. Self-check using the Task Achievement and Coherence criteria.",
      task_type: "self_track",
      category: "writing",
      weight: 7,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.3 * 7),
      display_order: 2,
      estimated_minutes: Math.round(4 * intensity * (m / 6)) * 25,
      completion_criteria: "All essays saved in one Google Doc. Link submitted.",
      verification_quiz: QUIZ_TASK_1,
      materials: ["task1-sample-graphs.pdf", "task1-writing-template.pdf"],
    },
    {
      title: "Study IELTS Task 2 — Opinion & Discussion Essays",
      description:
        `Write ${Math.round(6 * intensity * (m / 6))} Task 2 essays covering opinion, discussion, problem-solution, and two-part questions. ` +
        "Each must exceed 250 words, completed within 40 minutes.",
      task_type: "self_track",
      category: "writing",
      weight: 8,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.5 * 7),
      display_order: 3,
      estimated_minutes: Math.round(6 * intensity * (m / 6)) * 40,
      completion_criteria: "All essays saved in one Google Doc. Link submitted.",
      verification_quiz: QUIZ_TASK_2,
      materials: ["task2-question-bank-2024.pdf"],
    },
    {
      title: "Submit 2 Writing Essays for Mentor Band-Score Review",
      description:
        "Choose your best Task 1 and best Task 2 essay. Submit to your IELS mentor for professional band-score feedback on Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range.",
      task_type: "mentor_assessed",
      category: "writing",
      weight: 12,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.55 * 7),
      display_order: 4,
      estimated_minutes: 60,
      completion_criteria: "Submission link to 2 essays sent via task submission form.",
    },
    {
      title: `Complete ${Math.round(10 * intensity * (m / 6))} Academic Reading Practice Passages`,
      description:
        "Timed academic passages (True/False/Not Given, Matching Headings, Sentence Completion). Each passage under 20 minutes. Record your score after each.",
      task_type: "self_track",
      category: "reading",
      weight: 7,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.45 * 7),
      display_order: 5,
      estimated_minutes: Math.round(10 * intensity * (m / 6)) * 25,
      completion_criteria: "Score log (date, passage title, score) uploaded.",
      verification_quiz: makeReadingQuiz("B2/C1"),
      materials: ["reading-cambridge-practice-tests.pdf"],
    },
    {
      title: `Complete ${Math.round(10 * intensity * (m / 6))} Listening Practice Tests (Sections 1–4)`,
      description:
        "Sections 1–4 in sequence under timed conditions. Check answers, categorise error types (mishearing, vocabulary gap, missed keyword).",
      task_type: "self_track",
      category: "listening",
      weight: 7,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.55 * 7),
      display_order: 6,
      estimated_minutes: Math.round(10 * intensity * (m / 6)) * 35,
      completion_criteria: "Error log (section, question type, error category) uploaded.",
      materials: ["listening-cambridge-17-18.zip"],
    },
    {
      title: "Speaking Practice — Record & Review 15 Responses",
      description:
        "Record yourself answering 5 Part 1 questions, 5 Part 2 cue cards, and 5 Part 3 discussion questions. " +
        "Listen back and note pronunciation issues, vocabulary gaps, and fluency.",
      task_type: "self_track",
      category: "speaking",
      weight: 8,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.5 * 7),
      display_order: 7,
      estimated_minutes: 15 * 12,
      completion_criteria: "Reflection note (50+ words per session) uploaded.",
      verification_quiz: makeSpeakingQuiz(),
    },
    {
      title: `Attend ${Math.min(Math.round(weeks * 3), 72)} Speaking Club Sessions (Mon/Wed/Fri)`,
      description:
        "Join IELS Speaking Club sessions for peer practice and coach feedback. Focus sessions on IELTS Speaking Part 2 and Part 3 responses.",
      task_type: "system",
      category: "speaking",
      weight: 12,
      requires_pro: true,
      deadline_days: m * 30,
      display_order: 8,
      estimated_minutes: Math.min(Math.round(weeks * 3), 72) * 90,
      linked_event_type: "speaking_club",
    },
    {
      title: `${Math.max(3, Math.round(m * 0.75))} Full IELTS Mock Tests (Band ${targetIELTS - 0.5}+ target)`,
      description:
        "Full 4-section timed mock under strict exam conditions. Mark yourself using official answer keys. Aim to hit your target band on all mocks before booking the real exam.",
      task_type: "system",
      category: "test",
      weight: 12,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.8 * 7),
      display_order: 9,
      estimated_minutes: Math.max(3, Math.round(m * 0.75)) * 185,
      materials: ["cambridge-ielts-mock-collection.zip"],
    },
    {
      title: "Complete 2 Speaking Mock Interviews with Mentor",
      description:
        `Full Parts 1–3 simulation with an IELS coach. Aim to reach Band ${targetIELTS - 0.5}+ before booking the real test.`,
      task_type: "mentor_assessed",
      category: "speaking",
      weight: 10,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.85 * 7),
      display_order: 10,
      estimated_minutes: 120,
    },
    {
      title: "Final Review — Error Log Analysis & Weak-Area Drill",
      description:
        "Review all previous scored work. Identify top 3 recurring error patterns in each skill. Do a targeted 2-hour drill on your weakest section.",
      task_type: "self_track",
      category: "admin",
      weight: 5,
      requires_pro: false,
      deadline_days: (weeks - 1) * 7,
      display_order: 11,
      estimated_minutes: 180,
      completion_criteria: "Error analysis summary (200+ words) uploaded.",
    },
    {
      title: `Attend ${Math.max(2, Math.round(m / 2))} IELTS Strategy Workshops`,
      description:
        "Live IELS workshops covering Writing Band 7+ strategies, Speaking fluency techniques, and Reading/Listening speed tactics.",
      task_type: "system",
      category: "event",
      weight: 5,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.7 * 7),
      display_order: 12,
      estimated_minutes: Math.max(2, Math.round(m / 2)) * 120,
      linked_event_type: "workshop",
    },
  ];

  return assignOrderAndNormalize(tasks);
}

// ── 2. TOEFL ─────────────────────────────────

function generateTOEFLTasks(c: TaskBreakdownConfig): GeneratedTask[] {
  const { durationMonths: m, subObjectiveId } = c;
  const isIBT = subObjectiveId !== "toefl_itp";
  const targetScore = subObjectiveId === "toefl_ibt_90" ? 90 : isIBT ? 80 : 500;
  const weeks = m * 4;

  const tasks: GeneratedTask[] = [
    {
      title: `Complete ${isIBT ? "TOEFL iBT" : "TOEFL ITP"} Diagnostic Test`,
      description: `Full-length diagnostic across Reading, Listening, ${isIBT ? "Speaking, and Writing (Integrated + Academic Discussion)" : "and Structure/Written Expression"}. Record your baseline score.`,
      task_type: "self_track",
      category: "test",
      weight: 8,
      requires_pro: false,
      deadline_days: 7,
      display_order: 1,
      estimated_minutes: isIBT ? 210 : 150,
      completion_criteria: "Scored diagnostic with section breakdown uploaded.",
    },
    {
      title: `Complete ${Math.round(12 * (m / 6))} TOEFL Reading Passages`,
      description: "Academic passages with inference, vocabulary-in-context, and prose summary questions. Track time per passage.",
      task_type: "self_track",
      category: "reading",
      weight: 8,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.45 * 7),
      display_order: 2,
      estimated_minutes: Math.round(12 * (m / 6)) * 40,
      completion_criteria: "Score log per passage (date, passage, score/10) uploaded.",
      verification_quiz: makeReadingQuiz("B2/C1"),
    },
    {
      title: `Complete ${Math.round(15 * (m / 6))} TOEFL Listening Exercises`,
      description: "Academic lectures and campus conversations. Practice Detail, Function, Attitude, and Organisation questions.",
      task_type: "self_track",
      category: "listening",
      weight: 8,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.45 * 7),
      display_order: 3,
      estimated_minutes: Math.round(15 * (m / 6)) * 25,
      completion_criteria: "Score log uploaded.",
    },
    ...(isIBT ? [
      {
        title: `Record ${Math.round(20 * (m / 6))} TOEFL Speaking Responses`,
        description: "Integrated tasks (Read + Listen + Speak) and Independent tasks. Time yourself to 45 or 60 seconds. Self-evaluate using TOEFL rubric.",
        task_type: "self_track" as TaskType,
        category: "speaking" as TaskCategory,
        weight: 9,
        requires_pro: false,
        deadline_days: Math.round(weeks * 0.55 * 7),
        display_order: 4,
        estimated_minutes: Math.round(20 * (m / 6)) * 15,
        completion_criteria: "Self-evaluation rubric scores uploaded.",
        verification_quiz: makeSpeakingQuiz(),
      },
      {
        title: `Write ${Math.round(10 * (m / 6))} TOEFL Writing Tasks`,
        description: "Integrated tasks (Read + Listen + Write 150–225 words) and Academic Discussion tasks (150+ words). Timed practice.",
        task_type: "self_track" as TaskType,
        category: "writing" as TaskCategory,
        weight: 9,
        requires_pro: false,
        deadline_days: Math.round(weeks * 0.6 * 7),
        display_order: 5,
        estimated_minutes: Math.round(10 * (m / 6)) * 30,
        completion_criteria: "All essays in one Google Doc. Link submitted.",
        verification_quiz: QUIZ_TASK_2,
      },
      {
        title: "Submit 2 Writing Tasks for Mentor Review",
        description: "1 Integrated + 1 Academic Discussion task. Mentor provides feedback on ideas, language use, and organisation.",
        task_type: "mentor_assessed" as TaskType,
        category: "writing" as TaskCategory,
        weight: 10,
        requires_pro: true,
        deadline_days: Math.round(weeks * 0.65 * 7),
        display_order: 6,
        estimated_minutes: 60,
        completion_criteria: "Submission link to 2 essays sent via task submission form.",
      },
    ] : []),
    {
      title: `Complete ${Math.max(2, Math.round(m * 0.6))} Full TOEFL Mock Tests`,
      description: `Timed full-length mock under exam conditions. Target ${targetScore}+ on all practice tests before the real exam.`,
      task_type: "system",
      category: "test",
      weight: 14,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.85 * 7),
      display_order: 7,
      estimated_minutes: Math.max(2, Math.round(m * 0.6)) * 210,
    },
    {
      title: `Attend ${Math.max(2, Math.round(m / 2))} TOEFL Prep Workshops`,
      description: "IELS workshops covering TOEFL-specific task types, note-taking strategies, and speaking delivery.",
      task_type: "system",
      category: "event",
      weight: 6,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.75 * 7),
      display_order: 8,
      estimated_minutes: Math.max(2, Math.round(m / 2)) * 120,
      linked_event_type: "workshop",
    },
  ];

  return assignOrderAndNormalize(tasks);
}

// ── 3. DOMESTIC SCHOLARSHIP ──────────────────

const DOMESTIC_SCHOLARSHIP_NAMES: Record<string, string> = {
  lpdp: "LPDP (Kemenkeu)",
  iisma: "IISMA Student Exchange",
  beasiswa_unggulan: "Beasiswa Unggulan",
  bim: "Beasiswa Indonesia Maju (BIM)",
};

function generateDomesticScholarshipTasks(c: TaskBreakdownConfig): GeneratedTask[] {
  const { durationMonths: m, subObjectiveId } = c;
  const scholarshipName = DOMESTIC_SCHOLARSHIP_NAMES[subObjectiveId] ?? "Domestic Scholarship";
  const weeks = m * 4;

  return assignOrderAndNormalize([
    {
      title: "Complete IELTS / TOEFL ITP Baseline Test",
      description: `Most ${scholarshipName} programs require TOEFL ITP 500+ or IELTS 5.5+. Take a full diagnostic now to know your gap.`,
      task_type: "self_track",
      category: "test",
      weight: 8,
      requires_pro: false,
      deadline_days: 7,
      display_order: 1,
      estimated_minutes: 150,
      completion_criteria: "Scored diagnostic uploaded.",
    },
    {
      title: `Research ${scholarshipName} Requirements & Essay Prompts`,
      description: "Study the official guidelines: required English score, essay topics, required documents, and past awardee advice.",
      task_type: "self_track",
      category: "reading",
      weight: 6,
      requires_pro: false,
      deadline_days: 14,
      display_order: 2,
      estimated_minutes: 180,
      completion_criteria: "Research summary (300+ words) uploaded.",
      verification_quiz: [
        {
          question: `What is the minimum TOEFL ITP score typically required for ${scholarshipName}?`,
          options: ["450", "477", "500", "550"],
          correct_index: 2,
          explanation: "Most domestic scholarships require TOEFL ITP 500+ or IELTS 5.5+ equivalent."
        }
      ],
    },
    {
      title: "Write Personal Statement Draft 1 — Motivation & Goals",
      description:
        "Write a 500–700 word essay explaining why you deserve the scholarship, your academic/career goals, and how you will contribute to Indonesia after graduating.",
      task_type: "self_track",
      category: "writing",
      weight: 10,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.3 * 7),
      display_order: 3,
      estimated_minutes: 300,
      completion_criteria: "Draft essay (min 500 words) uploaded.",
      verification_quiz: [
        {
          question: "Which component is MOST important in a scholarship personal statement?",
          options: [
            "Listing all your academic grades",
            "Connecting your personal story to concrete future impact",
            "Using complex vocabulary throughout",
            "Making it exactly 500 words"
          ],
          correct_index: 1,
          explanation: "Scholarship committees look for a clear connection between your background, goals, and societal impact — not just credentials."
        }
      ],
    },
    {
      title: "Revise Personal Statement — Language & Clarity",
      description:
        "Re-read your draft and improve: use active voice, eliminate filler phrases, ensure each paragraph has one clear point. Aim for B2-level academic English.",
      task_type: "self_track",
      category: "writing",
      weight: 7,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.5 * 7),
      display_order: 4,
      estimated_minutes: 180,
      completion_criteria: "Revised essay (min 500 words, clearly improved from Draft 1) uploaded.",
    },
    {
      title: "Submit Personal Statement for Expert English Review",
      description:
        "Mentor reviews English quality, coherence, argument structure, and scholarship committee appeal.",
      task_type: "mentor_assessed",
      category: "writing",
      weight: 14,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.6 * 7),
      display_order: 5,
      estimated_minutes: 60,
      completion_criteria: "Essay submission link sent via task submission form.",
    },
    {
      title: `Achieve TOEFL ITP 500+ / IELTS 5.5+`,
      description: "Pass the English proficiency threshold required by the scholarship. Take a certified test at an official test centre.",
      task_type: "self_track",
      category: "test",
      weight: 14,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.65 * 7),
      display_order: 6,
      estimated_minutes: 150,
      completion_criteria: "Official score report (screenshot) uploaded.",
    },
    {
      title: "Prepare Complete Application Document Package",
      description: "Collect: transcript, CV (English), personal statement (final), recommendation letters, English score report, ID. Check each for formatting and language.",
      task_type: "self_track",
      category: "admin",
      weight: 8,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.75 * 7),
      display_order: 7,
      estimated_minutes: 240,
      completion_criteria: "Complete folder shared (Google Drive link) uploaded.",
    },
    {
      title: `Attend ${Math.max(2, Math.round(m / 2))} Scholarship Interview Prep Workshops`,
      description: `Live practice for ${scholarshipName} selection interviews. Common questions: national contribution, leadership, study plan.`,
      task_type: "system",
      category: "event",
      weight: 8,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.8 * 7),
      display_order: 8,
      estimated_minutes: Math.max(2, Math.round(m / 2)) * 120,
      linked_event_type: "workshop",
    },
    {
      title: "Complete 2 Mock Scholarship Interviews",
      description: `Full panel simulation for ${scholarshipName} with IELS mentor. Feedback on English fluency, clarity of vision, and confidence.`,
      task_type: "mentor_assessed",
      category: "speaking",
      weight: 14,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.88 * 7),
      display_order: 9,
      estimated_minutes: 120,
    },
    {
      title: "Final Application & Submission Check",
      description: "Review all documents one final time for grammar, formatting, and completeness. Submit before the deadline.",
      task_type: "self_track",
      category: "admin",
      weight: 6,
      requires_pro: false,
      deadline_days: (weeks - 1) * 7,
      display_order: 10,
      estimated_minutes: 90,
      completion_criteria: "Submission confirmation screenshot uploaded.",
    },
  ]);
}

// ── 4. GLOBAL SCHOLARSHIP ────────────────────

const GLOBAL_SCHOLARSHIP_NAMES: Record<string, { name: string; englishMin: string }> = {
  chevening: { name: "Chevening (UK)",         englishMin: "IELTS 6.5" },
  fulbright: { name: "Fulbright (USA)",         englishMin: "TOEFL iBT 80 / IELTS 7.0" },
  aas:       { name: "Australia Awards (AAS)",  englishMin: "IELTS 6.5" },
  mext:      { name: "MEXT (Japan)",            englishMin: "IELTS 5.5 / TOEFL iBT 72" },
  gks:       { name: "GKS (South Korea)",       englishMin: "TOPIK Level 3 or TOEFL iBT 71" },
  gates:     { name: "Gates Cambridge",         englishMin: "IELTS 7.5" },
};

function generateGlobalScholarshipTasks(c: TaskBreakdownConfig): GeneratedTask[] {
  const { durationMonths: m, subObjectiveId } = c;
  const sch = GLOBAL_SCHOLARSHIP_NAMES[subObjectiveId] ?? { name: "Global Scholarship", englishMin: "IELTS 6.5" };
  const weeks = m * 4;

  return assignOrderAndNormalize([
    {
      title: "Complete Official Language Test Diagnostic",
      description: `${sch.name} requires ${sch.englishMin}. Take a full diagnostic now and identify your band gap.`,
      task_type: "self_track",
      category: "test",
      weight: 8,
      requires_pro: false,
      deadline_days: 7,
      display_order: 1,
      estimated_minutes: 185,
      completion_criteria: "Scored diagnostic uploaded.",
    },
    {
      title: `Achieve ${sch.englishMin} (Official Test)`,
      description: "Pass the minimum English proficiency test at an accredited centre. Upload your official score report.",
      task_type: "self_track",
      category: "test",
      weight: 15,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.55 * 7),
      display_order: 2,
      estimated_minutes: 3000,
      completion_criteria: "Official score report uploaded.",
    },
    {
      title: `Research ${sch.name} — Eligibility, Essays & Selection Process`,
      description: "Study eligibility criteria, essay prompts from recent years, and interviews of past scholars.",
      task_type: "self_track",
      category: "reading",
      weight: 6,
      requires_pro: false,
      deadline_days: 14,
      display_order: 3,
      estimated_minutes: 240,
      completion_criteria: "Research summary (400+ words) uploaded.",
    },
    {
      title: "Draft Leadership & Vision Essay (Draft 1)",
      description:
        "Write 600–800 words on: your leadership experience, why you chose this scholarship, and your vision for your country after graduating.",
      task_type: "self_track",
      category: "writing",
      weight: 9,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.3 * 7),
      display_order: 4,
      estimated_minutes: 360,
      completion_criteria: "Draft essay (min 600 words) uploaded.",
      verification_quiz: [
        {
          question: "What distinguishes a top-tier scholarship essay from an average one?",
          options: [
            "Perfect grammar with no errors",
            "Highly specific evidence linking past experience to future impact",
            "Using very formal academic vocabulary",
            "Writing exactly at the word limit"
          ],
          correct_index: 1,
          explanation: "Specificity is key. Committees see thousands of vague essays; concrete evidence and clear impact narratives stand out."
        }
      ],
    },
    {
      title: "Revise Essay — Narrative Strength & Language",
      description: "Sharpen your narrative arc, ensure consistent academic English register, and cut any filler content.",
      task_type: "self_track",
      category: "writing",
      weight: 6,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.45 * 7),
      display_order: 5,
      estimated_minutes: 180,
      completion_criteria: "Revised essay uploaded.",
    },
    {
      title: `Submit Essay for ${sch.name} Expert Review`,
      description: "Mentor provides comprehensive feedback on English quality, scholarship fit, persuasiveness, and structure.",
      task_type: "mentor_assessed",
      category: "writing",
      weight: 14,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.58 * 7),
      display_order: 6,
      estimated_minutes: 60,
    },
    {
      title: "Secure 2 Recommendation Letters",
      description: "Brief referees in English on your scholarship goals. Provide them a one-pager with key talking points.",
      task_type: "self_track",
      category: "admin",
      weight: 7,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.6 * 7),
      display_order: 7,
      estimated_minutes: 180,
      completion_criteria: "Confirmation emails from both referees (screenshot) uploaded.",
    },
    {
      title: "Prepare & Finalise Application Package",
      description: "CV (English), statement, references, score reports, research proposal (if required), transcript (translated if needed).",
      task_type: "self_track",
      category: "admin",
      weight: 7,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.75 * 7),
      display_order: 8,
      estimated_minutes: 360,
      completion_criteria: "Completed application folder (Google Drive link) uploaded.",
    },
    {
      title: `Attend ${Math.max(3, Math.round(m / 2))} Global Scholarship Interview Workshops`,
      description: `Practice mock interviews specific to ${sch.name}. Focus: English articulation, cross-cultural communication, panel dynamics.`,
      task_type: "system",
      category: "event",
      weight: 8,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.82 * 7),
      display_order: 9,
      estimated_minutes: Math.max(3, Math.round(m / 2)) * 120,
      linked_event_type: "workshop",
    },
    {
      title: "Complete 3 Mock Scholarship Interviews (Full Panel)",
      description: "Full panel simulation in English with hard motivational & leadership questions. IELS mentor evaluates fluency, clarity, and confidence.",
      task_type: "mentor_assessed",
      category: "speaking",
      weight: 13,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.9 * 7),
      display_order: 10,
      estimated_minutes: 180,
    },
  ]);
}

// ── 5. ACADEMIC WRITING ──────────────────────

const AW_SUBTYPES: Record<string, string> = {
  aw_journal:  "Journal / Conference Paper",
  aw_thesis:   "Skripsi / Thesis",
  aw_abstract: "Abstract & Literature Review",
  aw_grant:    "Research Grant Proposal",
};

function generateAcademicWritingTasks(c: TaskBreakdownConfig): GeneratedTask[] {
  const { durationMonths: m, subObjectiveId } = c;
  const type = AW_SUBTYPES[subObjectiveId] ?? "Academic Writing";
  const weeks = m * 4;

  return assignOrderAndNormalize([
    {
      title: `Read 5 Published ${type.includes("Journal") ? "Journal Articles" : "Academic Papers"} in Your Field`,
      description: "Read in English. For each: summarise the abstract, identify structural moves (Introduction, Methods, Results, Discussion), and note 10 new academic phrases.",
      task_type: "self_track",
      category: "reading",
      weight: 8,
      requires_pro: false,
      deadline_days: 21,
      display_order: 1,
      estimated_minutes: 300,
      completion_criteria: "Phrase bank (50+ entries) and 5 paper summaries uploaded.",
      verification_quiz: [
        {
          question: "What is the function of the 'Methods' section in an academic paper?",
          options: [
            "To summarise the literature",
            "To explain how the study was conducted so it can be replicated",
            "To present conclusions",
            "To introduce the research problem"
          ],
          correct_index: 1,
          explanation: "The Methods section documents the research design so other researchers can verify or replicate the study."
        }
      ],
    },
    {
      title: `Study Academic English Grammar — ${type}-Specific Structures`,
      description: "Focus on: hedging language (may, might, appears to), passive voice, citation verbs (argues, suggests, demonstrates), and cohesive devices.",
      task_type: "self_track",
      category: "reading",
      weight: 7,
      requires_pro: false,
      deadline_days: 28,
      display_order: 2,
      estimated_minutes: 180,
      completion_criteria: "Grammar exercise scores (min 80%) uploaded.",
      materials: ["academic-english-grammar-guide.pdf"],
    },
    {
      title: `Write Your First ${type} Draft (Section 1)`,
      description:
        type.includes("Journal") ? "Write Introduction and Literature Review (~800 words). Use hedging language and cite at least 5 sources." :
        type.includes("Thesis") ? "Write your thesis introduction chapter (~1000 words). State your research problem, objectives, and significance." :
        type.includes("Abstract") ? "Write a structured abstract (250 words) covering: background, objective, methods, results, conclusion." :
        "Write grant background and rationale section (~600 words) explaining the research problem and gap.",
      task_type: "self_track",
      category: "writing",
      weight: 10,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.35 * 7),
      display_order: 3,
      estimated_minutes: 300,
      completion_criteria: "Section 1 draft (correct word count) uploaded.",
    },
    {
      title: "Submit Draft for Expert Academic English Review",
      description: "Mentor checks: grammar, academic register, argument flow, citation format (APA/IEEE/Harvard), and plagiarism risk.",
      task_type: "mentor_assessed",
      category: "writing",
      weight: 14,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.5 * 7),
      display_order: 4,
      estimated_minutes: 60,
    },
    {
      title: `Write Full ${type} Draft`,
      description: "Complete all sections based on the mentor's feedback on your first draft. Ensure consistent academic register throughout.",
      task_type: "self_track",
      category: "writing",
      weight: 12,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.7 * 7),
      display_order: 5,
      estimated_minutes: 600,
      completion_criteria: "Full draft uploaded.",
    },
    {
      title: "Full Draft — Mentor Comprehensive Review & Edit",
      description: "Mentor provides a full review: language quality, structure, academic conventions, and target-journal/committee fit.",
      task_type: "mentor_assessed",
      category: "writing",
      weight: 15,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.82 * 7),
      display_order: 6,
      estimated_minutes: 90,
    },
    {
      title: "Attend 2 Academic Writing Workshops",
      description: "IELS workshops on: paraphrasing and citation ethics, structuring arguments, and proofreading strategies.",
      task_type: "system",
      category: "event",
      weight: 8,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.65 * 7),
      display_order: 7,
      estimated_minutes: 240,
      linked_event_type: "workshop",
    },
    {
      title: `Attend ${Math.max(2, Math.round(m * 2))} Speaking Club Sessions — Present Your Research`,
      description: "Use Speaking Club to practice presenting your research clearly in English. Get peer feedback on clarity and fluency.",
      task_type: "system",
      category: "speaking",
      weight: 8,
      requires_pro: true,
      deadline_days: m * 30,
      display_order: 8,
      estimated_minutes: Math.max(2, Math.round(m * 2)) * 90,
      linked_event_type: "speaking_club",
    },
    {
      title: "Final Proofreading & Submission",
      description: "Use Grammarly + manual check. Verify all citations, abstract word count, and formatting requirements.",
      task_type: "self_track",
      category: "admin",
      weight: 8,
      requires_pro: false,
      deadline_days: (m * 30) - 3,
      display_order: 9,
      estimated_minutes: 120,
      completion_criteria: "Final version + submission confirmation uploaded.",
    },
  ]);
}

// ── 6. STUDENT EXCHANGE ──────────────────────

function generateStudentExchangeTasks(c: TaskBreakdownConfig): GeneratedTask[] {
  const { durationMonths: m, subObjectiveId } = c;
  const weeks = m * 4;
  const isSummer = subObjectiveId === "ex_summer";
  const isConference = subObjectiveId === "ex_conference";

  return assignOrderAndNormalize([
    {
      title: "English Proficiency Diagnostic",
      description: "Take a full diagnostic to establish your current CEFR level for speaking, writing, listening, and reading.",
      task_type: "self_track",
      category: "test",
      weight: 7,
      requires_pro: false,
      deadline_days: 7,
      display_order: 1,
      estimated_minutes: 90,
      completion_criteria: "Diagnostic scores uploaded.",
    },
    {
      title: `Practice Formal Email Writing — ${isConference ? "Abstract & Registration Emails" : "Application Correspondence"}`,
      description: isConference
        ? "Write 3 formal emails: submitting your conference abstract, requesting registration info, and following up with the organizing committee."
        : "Write 5 formal emails: program inquiry, application follow-up, housing request, supervisor introduction, and thank-you note.",
      task_type: "self_track",
      category: "writing",
      weight: 9,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.25 * 7),
      display_order: 2,
      estimated_minutes: 180,
      completion_criteria: "All emails (polished, ready to send) in one Google Doc. Link uploaded.",
      verification_quiz: [
        {
          question: "Which salutation is most appropriate when emailing an unknown professor for the first time?",
          options: ["Hey Professor!", "Hi there,", "Dear Professor [Last Name],", "To whom it may concern,"],
          correct_index: 2,
          explanation: "Use 'Dear Professor [Last Name],' — formal, respectful, and standard in academic correspondence."
        }
      ],
    },
    {
      title: isConference ? "Write & Submit Conference Abstract (English)" : "Write Exchange Program Application Essay",
      description: isConference
        ? "Write a 250–300 word abstract: background, objectives, methods, expected results. Must meet conference formatting guidelines."
        : "Write a 400–600 word motivation letter explaining your research/study goals, what you'll contribute, and what you'll bring back to Indonesia.",
      task_type: "self_track",
      category: "writing",
      weight: 11,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.35 * 7),
      display_order: 3,
      estimated_minutes: 240,
      completion_criteria: "Draft (correct word count) uploaded.",
    },
    {
      title: "Submit Application Essay for Mentor Review",
      description: "Mentor checks English clarity, academic register, and persuasiveness.",
      task_type: "mentor_assessed",
      category: "writing",
      weight: 12,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.5 * 7),
      display_order: 4,
      estimated_minutes: 60,
    },
    {
      title: `Attend ${Math.min(Math.round(weeks * 3), 36)} Speaking Club Sessions`,
      description: "Practice conversational and presentation English relevant to cross-cultural academic settings.",
      task_type: "system",
      category: "speaking",
      weight: 12,
      requires_pro: true,
      deadline_days: m * 30,
      display_order: 5,
      estimated_minutes: Math.min(Math.round(weeks * 3), 36) * 90,
      linked_event_type: "speaking_club",
    },
    {
      title: isConference ? "Practice Conference Presentation (5–10 mins)" : "Practice Self-Introduction & Campus Navigation English",
      description: isConference
        ? "Prepare and record a 7-minute presentation of your research. Present at Speaking Club for feedback. Aim for clear structure: hook, research question, methods, findings."
        : "Role-play: introducing yourself to professors, asking for help in campus offices, joining group study sessions. Record 5 scenarios.",
      task_type: "self_track",
      category: "speaking",
      weight: 10,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.7 * 7),
      display_order: 6,
      estimated_minutes: 150,
      completion_criteria: "Recording link or reflection notes uploaded.",
      verification_quiz: makeSpeakingQuiz(),
    },
    {
      title: "Mock Interview / Presentation with Mentor",
      description: isConference
        ? "Full mock conference presentation in English. Mentor provides feedback on delivery, clarity, Q&A handling."
        : "Mock exchange program interview. Mentor gives feedback on fluency and confidence.",
      task_type: "mentor_assessed",
      category: "speaking",
      weight: 12,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.85 * 7),
      display_order: 7,
      estimated_minutes: 90,
    },
    {
      title: "Achieve Target English Score (IELTS / TOEFL ITP)",
      description: "Meet the language requirement of your target program. Upload official score.",
      task_type: "self_track",
      category: "test",
      weight: 10,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.65 * 7),
      display_order: 8,
      estimated_minutes: 180,
      completion_criteria: "Official score report uploaded.",
    },
  ]);
}

// ── 7. IVY LEAGUE ADMISSIONS ─────────────────

function generateIvyAdmissionsTasks(c: TaskBreakdownConfig): GeneratedTask[] {
  const { durationMonths: m, subObjectiveId } = c;
  const isOxbridge = subObjectiveId === "ivy_oxbridge";
  const weeks = m * 4;
  const targetIELTS = subObjectiveId === "ivy_oxbridge" || subObjectiveId === "ivy_us" ? 7.5 : 7.0;

  return assignOrderAndNormalize([
    {
      title: `Achieve IELTS ${targetIELTS}+ (Official Score)`,
      description: `Elite universities require IELTS ${targetIELTS}+. Take a diagnostic, plan intensive preparation, and sit the official test.`,
      task_type: "self_track",
      category: "test",
      weight: 16,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.5 * 7),
      display_order: 1,
      estimated_minutes: 5000,
      completion_criteria: "Official IELTS score report uploaded.",
    },
    {
      title: `Read 10 ${isOxbridge ? "Oxford/Cambridge" : "Ivy League"} Admission Essays (Past Applicants)`,
      description: "Analyse essay structure, personal narrative technique, and vocabulary level. Note what makes each one memorable.",
      task_type: "self_track",
      category: "reading",
      weight: 7,
      requires_pro: false,
      deadline_days: 21,
      display_order: 2,
      estimated_minutes: 300,
      completion_criteria: "Analysis notes (5+ per essay) uploaded.",
      verification_quiz: [
        {
          question: "What is the most common reason a top university admission essay fails?",
          options: [
            "Being too personal",
            "Having grammar mistakes",
            "Being too generic and not showing a unique voice",
            "Exceeding the word count"
          ],
          correct_index: 2,
          explanation: "Admissions officers read thousands of essays. Generic themes like 'I want to make a difference' without unique, specific stories are immediately forgettable."
        }
      ],
    },
    {
      title: `Write Personal Statement — Draft 1`,
      description:
        isOxbridge
          ? "Oxford/Cambridge personal statements (4000 characters) should be 80% academic passion and 20% extracurricular. Write Draft 1."
          : "US Common App essay (650 words) — pick one prompt and write a draft that shows your unique voice and experience.",
      task_type: "self_track",
      category: "writing",
      weight: 10,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.3 * 7),
      display_order: 3,
      estimated_minutes: 480,
      completion_criteria: "Draft 1 uploaded.",
    },
    {
      title: "Personal Statement — Mentor Review (Draft 1)",
      description: "Expert English editing: clarity, authenticity, vocabulary sophistication, and admissions appeal.",
      task_type: "mentor_assessed",
      category: "writing",
      weight: 14,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.42 * 7),
      display_order: 4,
      estimated_minutes: 90,
    },
    {
      title: "Write Personal Statement — Final Version",
      description: "Incorporate all feedback. Ensure perfect grammar, precise vocabulary, and a clear narrative arc. Proofread twice.",
      task_type: "self_track",
      category: "writing",
      weight: 8,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.55 * 7),
      display_order: 5,
      estimated_minutes: 300,
      completion_criteria: "Final personal statement uploaded.",
    },
    {
      title: "Write Supplemental Essays / Short Answers",
      description: isOxbridge
        ? "Draft a written work sample (if required) and any additional portfolio materials."
        : "Write all required supplemental essays (Why this school? Diversity statement, etc.) — typically 3–5 extras.",
      task_type: "self_track",
      category: "writing",
      weight: 9,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.65 * 7),
      display_order: 6,
      estimated_minutes: 480,
      completion_criteria: "All supplementals uploaded in one folder.",
    },
    {
      title: "Supplemental Essays — Mentor Final Review",
      description: "Comprehensive mentor review of all submitted essays for English quality, school fit, and authenticity.",
      task_type: "mentor_assessed",
      category: "writing",
      weight: 10,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.75 * 7),
      display_order: 7,
      estimated_minutes: 90,
    },
    {
      title: `Attend ${Math.max(3, Math.round(m / 2))} Speaking Club Sessions — Interview English Practice`,
      description: "Practice answering admissions interview questions in natural, sophisticated English. Focus on fluency and articulation.",
      task_type: "system",
      category: "speaking",
      weight: 8,
      requires_pro: true,
      deadline_days: m * 30,
      display_order: 8,
      estimated_minutes: Math.max(3, Math.round(m / 2)) * 90,
      linked_event_type: "speaking_club",
    },
    {
      title: `3 Mock Admissions Interviews with Mentor`,
      description: isOxbridge
        ? "Oxford/Cambridge-style tutorial interview simulation. Focus on subject knowledge articulation and intellectual curiosity in English."
        : "US college interview simulation — focused on why this school, your story, and intellectual passions.",
      task_type: "mentor_assessed",
      category: "speaking",
      weight: 12,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.88 * 7),
      display_order: 9,
      estimated_minutes: 180,
    },
    {
      title: "Finalise & Submit Application Package",
      description: "Double-check all essays, scores, recommendations, and transcripts. Submit before deadlines.",
      task_type: "self_track",
      category: "admin",
      weight: 6,
      requires_pro: false,
      deadline_days: (weeks - 1) * 7,
      display_order: 10,
      estimated_minutes: 180,
      completion_criteria: "Submission confirmation screenshot uploaded.",
    },
  ]);
}

// ── 8. SCHOOL FINALS ─────────────────────────

function generateSchoolFinalsTasks(c: TaskBreakdownConfig): GeneratedTask[] {
  const { durationMonths: m, subObjectiveId } = c;
  const isSMA = subObjectiveId === "fin_sma";
  const isD3 = subObjectiveId === "fin_d3";
  const weeks = m * 4;

  const level = isSMA ? "SMA/SMK" : isD3 ? "Diploma D3 Business English" : subObjectiveId === "fin_s1" ? "S1 MKWU" : "S2/S3 Academic English";

  return assignOrderAndNormalize([
    {
      title: `${level} English Diagnostic Test`,
      description: "Take a full-level diagnostic covering grammar, reading comprehension, and writing to identify your gap before finals.",
      task_type: "self_track",
      category: "test",
      weight: 7,
      requires_pro: false,
      deadline_days: 7,
      display_order: 1,
      estimated_minutes: 90,
      completion_criteria: "Diagnostic score uploaded.",
    },
    {
      title: `Review Core Grammar — ${isSMA ? "Tenses, Modal Verbs, Conditionals" : isD3 ? "Business Grammar & Correspondence" : "Academic Grammar & Hedging"}`,
      description: `Complete a structured grammar review covering the most exam-tested structures for ${level}. Minimum score 80% on each exercise.`,
      task_type: "self_track",
      category: "reading",
      weight: 9,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.3 * 7),
      display_order: 2,
      estimated_minutes: 300,
      completion_criteria: "Exercise scores (min 80%) uploaded.",
      materials: [isSMA ? "sma-grammar-practice.pdf" : "academic-grammar-guide.pdf"],
    },
    {
      title: `Reading Comprehension — ${Math.round(10 * (m / 3))} Passages`,
      description: isSMA
        ? "Practice narrative, descriptive, and analytical texts with comprehension questions typical of ujian sekolah."
        : "Practice academic reading passages with inference, vocabulary, and summary questions.",
      task_type: "self_track",
      category: "reading",
      weight: 10,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.45 * 7),
      display_order: 3,
      estimated_minutes: Math.round(10 * (m / 3)) * 20,
      completion_criteria: "Score log uploaded.",
      verification_quiz: makeReadingQuiz(isSMA ? "B1/B2" : "B2/C1"),
    },
    {
      title: `Writing Practice — ${isSMA ? "Narrative, Recount & Analytical Exposition" : isD3 ? "Business Reports & Emails" : "Academic Essays & Literature Reviews"}`,
      description: isSMA
        ? "Write 5 essays across text types tested in SMA English exams. Self-mark using the school rubric."
        : `Write ${Math.round(5 * (m / 3))} ${isD3 ? "business documents" : "academic essays"} with proper structure and register.`,
      task_type: "self_track",
      category: "writing",
      weight: 10,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.55 * 7),
      display_order: 4,
      estimated_minutes: Math.round(5 * (m / 3)) * 40,
      completion_criteria: "All essays uploaded in one folder.",
    },
    {
      title: "Submit 2 Essays for Mentor Review",
      description: "Mentor checks for grammar, structure, and marks according to the exam rubric used at your level.",
      task_type: "mentor_assessed",
      category: "writing",
      weight: 12,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.65 * 7),
      display_order: 5,
      estimated_minutes: 60,
    },
    {
      title: `${Math.max(2, Math.round(m * 0.75))} Full Past-Paper Mock Exams`,
      description: `Complete ${level} past papers under timed exam conditions. Aim to score above the passing grade threshold.`,
      task_type: "system",
      category: "test",
      weight: 14,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.85 * 7),
      display_order: 6,
      estimated_minutes: Math.max(2, Math.round(m * 0.75)) * 120,
      completion_criteria: "Marked past papers uploaded.",
    },
    {
      title: `Attend ${Math.max(2, Math.round(m / 2))} Speaking Club Sessions — Oral Exam Prep`,
      description: "Practice English oral presentations and discussion relevant to your final exam format.",
      task_type: "system",
      category: "speaking",
      weight: 8,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.78 * 7),
      display_order: 7,
      estimated_minutes: Math.max(2, Math.round(m / 2)) * 90,
      linked_event_type: "speaking_club",
    },
    {
      title: "Final Weak-Area Drill & Review Session",
      description: "Identify your 3 most common error types from past papers. Do a targeted 2-hour drill on those areas.",
      task_type: "self_track",
      category: "admin",
      weight: 6,
      requires_pro: false,
      deadline_days: (weeks - 1) * 7,
      display_order: 8,
      estimated_minutes: 120,
      completion_criteria: "Error analysis note (100+ words) uploaded.",
    },
  ]);
}

// ─────────────────────────────────────────────
// WORK PATHS
// ─────────────────────────────────────────────

// ── 9. INTERVIEW MASTERY ─────────────────────

const INTERVIEW_TYPES: Record<string, string> = {
  iv_mnc:     "Multinational Company (MNC)",
  iv_startup: "Global Startup / Tech",
  iv_consult: "Consulting Firm (McKinsey, BCG, etc.)",
  iv_banking: "Investment Banking / Finance",
};

function generateInterviewMasteryTasks(c: TaskBreakdownConfig): GeneratedTask[] {
  const { durationMonths: m, subObjectiveId } = c;
  const type = INTERVIEW_TYPES[subObjectiveId] ?? "Professional";
  const weeks = m * 4;
  const isConsulting = subObjectiveId === "iv_consult";

  return assignOrderAndNormalize([
    {
      title: "English Speaking Proficiency Baseline",
      description: "Record a 3-minute self-introduction in English. Rate yourself on fluency, pronunciation, vocabulary, and confidence (1–10).",
      task_type: "self_track",
      category: "speaking",
      weight: 6,
      requires_pro: false,
      deadline_days: 7,
      display_order: 1,
      estimated_minutes: 60,
      completion_criteria: "Recording link and self-ratings uploaded.",
    },
    {
      title: `Study ${type} Interview Format & Question Types`,
      description: `Research the typical structure of ${type} interviews. For each: list 10 common questions in English with ideal answer frameworks (STAR, SOAR, etc.).`,
      task_type: "self_track",
      category: "reading",
      weight: 7,
      requires_pro: false,
      deadline_days: 14,
      display_order: 2,
      estimated_minutes: 180,
      completion_criteria: "Question bank (min 30 questions with answers) uploaded.",
      verification_quiz: [
        {
          question: "What does the STAR method stand for in behavioural interviews?",
          options: [
            "Skill, Task, Action, Result",
            "Situation, Task, Action, Result",
            "Scenario, Technique, Approach, Resolution",
            "Situation, Target, Activity, Review"
          ],
          correct_index: 1,
          explanation: "STAR = Situation, Task, Action, Result. It's the most widely accepted framework for answering behavioural interview questions clearly."
        }
      ],
    },
    {
      title: `Record ${Math.round(10 * (m / 3))} STAR-Method Behavioural Answers`,
      description: "Record yourself answering: Tell me about yourself, leadership experience, conflict resolution, failure story, and greatest achievement. Each answer 90–120 seconds.",
      task_type: "self_track",
      category: "speaking",
      weight: 10,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.35 * 7),
      display_order: 3,
      estimated_minutes: Math.round(10 * (m / 3)) * 15,
      completion_criteria: "Recordings uploaded or reflection notes for each answer submitted.",
      verification_quiz: makeSpeakingQuiz(),
    },
    ...(isConsulting ? [
      {
        title: "Practice 8 Consulting Case Study Answers in English",
        description: "Practise case frameworks (market sizing, profit-loss, M&A) and present each answer clearly in structured English within 10 minutes.",
        task_type: "self_track" as TaskType,
        category: "speaking" as TaskCategory,
        weight: 10,
        requires_pro: false,
        deadline_days: Math.round(weeks * 0.5 * 7),
        display_order: 4,
        estimated_minutes: 8 * 25,
        completion_criteria: "Case answer recordings or written frameworks uploaded.",
      }
    ] : []),
    {
      title: "Write & Polish Professional English CV",
      description: "Rewrite or refine your CV in English. Use strong action verbs, quantified achievements, and ATS-friendly formatting.",
      task_type: "self_track",
      category: "writing",
      weight: 8,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.3 * 7),
      display_order: 5,
      estimated_minutes: 240,
      completion_criteria: "English CV (PDF format) uploaded.",
    },
    {
      title: "Submit CV for Expert English & Impact Review",
      description: "Mentor reviews: English quality, verb strength, formatting, and overall hiring appeal for your target company type.",
      task_type: "mentor_assessed",
      category: "writing",
      weight: 10,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.45 * 7),
      display_order: 6,
      estimated_minutes: 60,
    },
    {
      title: `Attend ${Math.max(2, Math.round(m / 2))} Interview English Workshops`,
      description: `IELS workshops covering ${type} interview English: how to sound confident, handle pressure questions, and deliver clear answers.`,
      task_type: "system",
      category: "event",
      weight: 8,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.7 * 7),
      display_order: 7,
      estimated_minutes: Math.max(2, Math.round(m / 2)) * 120,
      linked_event_type: "workshop",
    },
    {
      title: `Attend ${Math.min(Math.round(weeks * 2), 24)} Speaking Club Sessions — Interview English`,
      description: "Practise structured English responses and spontaneous Q&A with peers and coaches.",
      task_type: "system",
      category: "speaking",
      weight: 10,
      requires_pro: true,
      deadline_days: m * 30,
      display_order: 8,
      estimated_minutes: Math.min(Math.round(weeks * 2), 24) * 90,
      linked_event_type: "speaking_club",
    },
    {
      title: "3 Full Mock Interviews with IELS Mentor",
      description: `Full ${isConsulting ? "case + behavioural" : "behavioural + situational"} interview simulation in English. Mentor scores your fluency, structure, vocabulary, and confidence.`,
      task_type: "mentor_assessed",
      category: "speaking",
      weight: 14,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.88 * 7),
      display_order: 9,
      estimated_minutes: 180,
    },
    {
      title: "Final Self-Assessment & Personal Brand Statement",
      description: "Finalise your 2-minute 'Tell me about yourself' pitch. Record and listen back. Rate improvements against your baseline.",
      task_type: "self_track",
      category: "speaking",
      weight: 6,
      requires_pro: false,
      deadline_days: (weeks - 1) * 7,
      display_order: 10,
      estimated_minutes: 60,
      completion_criteria: "Final recording link uploaded.",
    },
  ]);
}

// ── 10. REMOTE WORK ───────────────────────────

function generateRemoteWorkTasks(c: TaskBreakdownConfig): GeneratedTask[] {
  const { durationMonths: m, subObjectiveId } = c;
  const weeks = m * 4;
  const isAsync = subObjectiveId === "rw_async" || subObjectiveId === "rw_all";
  const isVideo = subObjectiveId === "rw_video" || subObjectiveId === "rw_all";
  const isWriting = subObjectiveId === "rw_writing" || subObjectiveId === "rw_all";

  return assignOrderAndNormalize([
    {
      title: "Remote Work English Baseline Assessment",
      description: "Write a sample async project update email and record a 3-minute video team check-in. Rate both for clarity and professionalism.",
      task_type: "self_track",
      category: "test",
      weight: 6,
      requires_pro: false,
      deadline_days: 7,
      display_order: 1,
      estimated_minutes: 90,
      completion_criteria: "Email draft and video recording link uploaded.",
    },
    ...(isAsync ? [
      {
        title: `Write ${Math.round(15 * (m / 4))} Async Professional Communications`,
        description: "Slack messages, project update emails, meeting summaries, bug reports, and async stand-ups. Each must be clear, concise, and appropriately formal.",
        task_type: "self_track" as TaskType,
        category: "writing" as TaskCategory,
        weight: 11,
        requires_pro: false,
        deadline_days: Math.round(weeks * 0.45 * 7),
        display_order: 2,
        estimated_minutes: Math.round(15 * (m / 4)) * 20,
        completion_criteria: "All samples in one Google Doc. Link uploaded.",
        verification_quiz: [
          {
            question: "When writing an async Slack update to a global team, what's most important?",
            options: [
              "Using formal grammar throughout",
              "Being clear about status, blockers, and next steps",
              "Writing as much detail as possible",
              "Using bullet points always"
            ],
            correct_index: 1,
            explanation: "Async communication must answer: what's done, what's blocked, what's next — clearly and concisely."
          }
        ],
      }
    ] : []),
    ...(isVideo ? [
      {
        title: `Record & Review ${Math.round(8 * (m / 4))} Video Meeting Simulations`,
        description: "Simulate Zoom/Meet scenarios: project kick-off, status update, conflict resolution, and retrospective. Record and self-evaluate on clarity and confidence.",
        task_type: "self_track" as TaskType,
        category: "speaking" as TaskCategory,
        weight: 10,
        requires_pro: false,
        deadline_days: Math.round(weeks * 0.5 * 7),
        display_order: 3,
        estimated_minutes: Math.round(8 * (m / 4)) * 30,
        completion_criteria: "Recording links + evaluation notes uploaded.",
        verification_quiz: makeSpeakingQuiz(),
      }
    ] : []),
    ...(isWriting ? [
      {
        title: `Write ${Math.round(6 * (m / 4))} Technical Docs or Project Proposals`,
        description: "PRDs, feature specs, retrospective docs, or project proposals in English. Focus on clarity, structure, and appropriate register.",
        task_type: "self_track" as TaskType,
        category: "writing" as TaskCategory,
        weight: 10,
        requires_pro: false,
        deadline_days: Math.round(weeks * 0.55 * 7),
        display_order: 4,
        estimated_minutes: Math.round(6 * (m / 4)) * 60,
        completion_criteria: "All documents uploaded in shared folder.",
      }
    ] : []),
    {
      title: "Submit 2 Writing Samples for Mentor Professional Review",
      description: "Mentor reviews your best async message and document for English clarity, professional register, and global team readiness.",
      task_type: "mentor_assessed",
      category: "writing",
      weight: 12,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.6 * 7),
      display_order: 5,
      estimated_minutes: 60,
    },
    {
      title: `Attend ${Math.min(Math.round(weeks * 2), 20)} Speaking Club Sessions`,
      description: "Practice professional conversational English, managing discussions, and cross-cultural communication in real-time.",
      task_type: "system",
      category: "speaking",
      weight: 12,
      requires_pro: true,
      deadline_days: m * 30,
      display_order: 6,
      estimated_minutes: Math.min(Math.round(weeks * 2), 20) * 90,
      linked_event_type: "speaking_club",
    },
    {
      title: "3 Full Remote Work Simulation Sessions with Mentor",
      description: "Simulate a full Zoom meeting: check-in, project update, problem-solving discussion. Mentor scores English clarity, confidence, and professional tone.",
      task_type: "mentor_assessed",
      category: "speaking",
      weight: 12,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.85 * 7),
      display_order: 7,
      estimated_minutes: 180,
    },
    {
      title: `Attend ${Math.max(2, Math.round(m / 2))} Remote Work English Workshops`,
      description: "IELS workshops on async communication, managing time zones, and Zoom best practices for global teams.",
      task_type: "system",
      category: "event",
      weight: 8,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.75 * 7),
      display_order: 8,
      estimated_minutes: Math.max(2, Math.round(m / 2)) * 120,
      linked_event_type: "workshop",
    },
    {
      title: "Final Remote English Benchmark — Re-assessment",
      description: "Redo your baseline assessment. Compare your new email and video update against Day 1. Document improvements.",
      task_type: "self_track",
      category: "test",
      weight: 6,
      requires_pro: false,
      deadline_days: (weeks - 1) * 7,
      display_order: 9,
      estimated_minutes: 90,
      completion_criteria: "Before/after comparison note uploaded.",
    },
  ]);
}

// ── 11. PUBLIC SPEAKING ──────────────────────

function generatePublicSpeakingTasks(c: TaskBreakdownConfig): GeneratedTask[] {
  const { durationMonths: m, subObjectiveId } = c;
  const weeks = m * 4;
  const isBoard = subObjectiveId === "ps_board";
  const isConference = subObjectiveId === "ps_conference";

  return assignOrderAndNormalize([
    {
      title: "Record Baseline Presentation (3–5 minutes)",
      description: "Present any topic you know well. Record it. Evaluate: structure, fluency, eye contact, filler words, and vocabulary.",
      task_type: "self_track",
      category: "speaking",
      weight: 6,
      requires_pro: false,
      deadline_days: 7,
      display_order: 1,
      estimated_minutes: 60,
      completion_criteria: "Recording link and self-evaluation scores uploaded.",
    },
    {
      title: `Study ${isBoard ? "Executive Presentation" : isConference ? "Conference Talk" : "Business Presentation"} Structures`,
      description: "Analyse 3 top-rated English presentations (TED Talks or industry examples). Map their structure: hook, problem, solution, evidence, call-to-action.",
      task_type: "self_track",
      category: "reading",
      weight: 7,
      requires_pro: false,
      deadline_days: 14,
      display_order: 2,
      estimated_minutes: 180,
      completion_criteria: "Structure analysis notes (per presentation) uploaded.",
      verification_quiz: [
        {
          question: "In a business presentation opening, what is most effective in the first 30 seconds?",
          options: [
            "Introducing yourself with your full title",
            "Starting with a strong hook: data, story, or bold statement",
            "Explaining the agenda in detail",
            "Thanking the audience for attending"
          ],
          correct_index: 1,
          explanation: "The first 30 seconds determine whether the audience is engaged. A hook immediately establishes relevance and curiosity."
        }
      ],
    },
    {
      title: `Deliver ${Math.round(8 * (m / 4))} Recorded Practice Presentations`,
      description: `Each presentation is 5–10 minutes on a professional topic. Use correct ${isBoard ? "executive" : "business"} English register. Review recordings and note improvements.`,
      task_type: "self_track",
      category: "speaking",
      weight: 12,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.5 * 7),
      display_order: 3,
      estimated_minutes: Math.round(8 * (m / 4)) * 60,
      completion_criteria: "Recordings or self-evaluation sheets uploaded.",
      verification_quiz: makeSpeakingQuiz(),
    },
    {
      title: `Attend ${Math.min(Math.round(weeks * 3), 36)} Speaking Club Sessions`,
      description: "Present short segments and receive real-time feedback from peers and coaches on delivery and English clarity.",
      task_type: "system",
      category: "speaking",
      weight: 14,
      requires_pro: true,
      deadline_days: m * 30,
      display_order: 4,
      estimated_minutes: Math.min(Math.round(weeks * 3), 36) * 90,
      linked_event_type: "speaking_club",
    },
    {
      title: "Submit Presentation Recording for Mentor Feedback",
      description: "Mentor evaluates: English fluency, slide language quality, delivery confidence, and professional register.",
      task_type: "mentor_assessed",
      category: "speaking",
      weight: 12,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.6 * 7),
      display_order: 5,
      estimated_minutes: 90,
    },
    {
      title: `Attend ${Math.max(2, Math.round(m / 2))} Public Speaking Workshops`,
      description: "IELS workshops on: body language in English-speaking contexts, handling Q&A, voice projection, and structure.",
      task_type: "system",
      category: "event",
      weight: 8,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.7 * 7),
      display_order: 6,
      estimated_minutes: Math.max(2, Math.round(m / 2)) * 120,
      linked_event_type: "workshop",
    },
    {
      title: "2 Full Mock Presentations with Mentor (+ Q&A)",
      description: isBoard
        ? "Board presentation simulation: 15-minute strategy pitch + 10-minute Q&A from mentor in executive role."
        : isConference
        ? "Conference talk simulation: 15-minute research/topic presentation + 5-minute Q&A. Scored on English quality and confidence."
        : "Client or team presentation simulation: 10-minute pitch + Q&A. Scored on structure and fluency.",
      task_type: "mentor_assessed",
      category: "speaking",
      weight: 14,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.88 * 7),
      display_order: 7,
      estimated_minutes: 120,
    },
    {
      title: "Final Benchmark Presentation",
      description: "Deliver a final 7–10 minute presentation on a professional topic. Compare with baseline recording. Document measurable improvements.",
      task_type: "self_track",
      category: "speaking",
      weight: 7,
      requires_pro: false,
      deadline_days: (weeks - 1) * 7,
      display_order: 8,
      estimated_minutes: 90,
      completion_criteria: "Final recording link + improvement notes uploaded.",
    },
  ]);
}

// ── 12. WHV ──────────────────────────────────

function generateWHVTasks(c: TaskBreakdownConfig): GeneratedTask[] {
  const { durationMonths: m, subObjectiveId } = c;
  const country = { whv_au: "Australia", whv_nz: "New Zealand", whv_uk: "UK", whv_ca: "Canada" }[subObjectiveId] ?? "Australia";
  const weeks = m * 4;
  const ieltsTarget = subObjectiveId === "whv_uk" || subObjectiveId === "whv_ca" ? "5.0" : "4.5";

  return assignOrderAndNormalize([
    {
      title: `WHV ${country} English Survival Diagnostic`,
      description: `Take a short speaking + listening diagnostic to check your practical English for everyday situations in ${country}.`,
      task_type: "self_track",
      category: "test",
      weight: 6,
      requires_pro: false,
      deadline_days: 7,
      display_order: 1,
      estimated_minutes: 60,
      completion_criteria: "Diagnostic scores uploaded.",
    },
    {
      title: `Achieve IELTS ${ieltsTarget}+ / TOEFL ITP 477+ (Official Score)`,
      description: `Many WHV ${country} employers and visa requirements ask for IELTS ${ieltsTarget}+. Take the test and upload your official score.`,
      task_type: "self_track",
      category: "test",
      weight: 15,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.55 * 7),
      display_order: 2,
      estimated_minutes: 2000,
      completion_criteria: "Official score report uploaded.",
    },
    {
      title: `Practice ${Math.round(8 * (m / 3))} Real-Life ${country} English Conversations`,
      description: `Role-play: renting accommodation, calling about job vacancies, ordering at a café, resolving a workplace issue. Record each and review.`,
      task_type: "self_track",
      category: "speaking",
      weight: 10,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.45 * 7),
      display_order: 3,
      estimated_minutes: Math.round(8 * (m / 3)) * 20,
      completion_criteria: "Recordings or self-evaluation notes uploaded.",
      verification_quiz: [
        {
          question: `In ${country}, if your employer gives you a task verbally and you're not sure what to do, the best response is:`,
          options: [
            "Guess and do your best",
            "Wait until someone explains without asking",
            "Politely ask for clarification: 'Could you clarify what you mean by…?'",
            "Email your home country family for advice"
          ],
          correct_index: 2,
          explanation: "In English-speaking workplaces, asking for polite clarification is a sign of professionalism, not weakness."
        }
      ],
    },
    {
      title: "Write English CV & Cover Letter for WHV Jobs",
      description: `Create an English CV and 1 cover letter tailored to ${country} working holiday job types (hospitality, agriculture, retail, construction).`,
      task_type: "self_track",
      category: "writing",
      weight: 9,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.35 * 7),
      display_order: 4,
      estimated_minutes: 180,
      completion_criteria: "CV and cover letter (PDF) uploaded.",
    },
    {
      title: "Submit CV & Cover Letter for Mentor Review",
      description: `Mentor reviews English quality and ${country} job market suitability.`,
      task_type: "mentor_assessed",
      category: "writing",
      weight: 10,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.5 * 7),
      display_order: 5,
      estimated_minutes: 60,
    },
    {
      title: `Attend ${Math.min(Math.round(weeks * 2), 18)} Speaking Club Sessions`,
      description: `Focus on ${country} English accents, expressions, and casual workplace communication.`,
      task_type: "system",
      category: "speaking",
      weight: 12,
      requires_pro: true,
      deadline_days: m * 30,
      display_order: 6,
      estimated_minutes: Math.min(Math.round(weeks * 2), 18) * 90,
      linked_event_type: "speaking_club",
    },
    {
      title: "2 Mock Job Interviews for WHV Positions",
      description: `Simulate a phone interview for a ${country} working holiday role. Mentor scores English clarity and confidence.`,
      task_type: "mentor_assessed",
      category: "speaking",
      weight: 12,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.85 * 7),
      display_order: 7,
      estimated_minutes: 90,
    },
    {
      title: `Attend ${Math.max(1, Math.round(m / 2))} WHV Preparation Workshops`,
      description: `IELS workshops on working holiday English essentials: rights at work, housing negotiation, and social English in ${country}.`,
      task_type: "system",
      category: "event",
      weight: 8,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.75 * 7),
      display_order: 8,
      estimated_minutes: Math.max(1, Math.round(m / 2)) * 120,
      linked_event_type: "workshop",
    },
  ]);
}

// ── 13. FREELANCING ───────────────────────────

function generateFreelancingTasks(c: TaskBreakdownConfig): GeneratedTask[] {
  const { durationMonths: m, subObjectiveId } = c;
  const weeks = m * 4;
  const isPitch = subObjectiveId === "fl_pitch" || subObjectiveId === "fl_negotiate";
  const isContent = subObjectiveId === "fl_content";

  return assignOrderAndNormalize([
    {
      title: "Freelance English Baseline — Write a Sample Proposal",
      description: "Write a 300-word Upwork/Fiverr proposal for a real job listing. Evaluate: clarity, persuasiveness, and professional English.",
      task_type: "self_track",
      category: "writing",
      weight: 7,
      requires_pro: false,
      deadline_days: 7,
      display_order: 1,
      estimated_minutes: 90,
      completion_criteria: "Proposal draft uploaded.",
      verification_quiz: [
        {
          question: "What is the most important element of a winning Upwork proposal?",
          options: [
            "Starting with 'Dear Client' and listing your qualifications",
            "Showing you understand the client's specific problem and proposing a clear solution",
            "Using the most formal English possible",
            "Keeping it as short as possible"
          ],
          correct_index: 1,
          explanation: "Clients hire freelancers who demonstrate they understand the problem, not just those with long CVs."
        }
      ],
    },
    {
      title: `Write ${Math.round(8 * (m / 3))} Professional Client Proposals`,
      description: isPitch
        ? "Full proposals (300–500 words) for real or simulated Upwork/Fiverr listings. Include: understanding of brief, proposed solution, timeline, and pricing."
        : isContent
        ? "Content pitches for international clients: blog post outline, social media content proposal, or copywriting brief."
        : "Technical project proposals: scope of work, deliverables, and technical specs written in clear English.",
      task_type: "self_track",
      category: "writing",
      weight: 12,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.45 * 7),
      display_order: 2,
      estimated_minutes: Math.round(8 * (m / 3)) * 45,
      completion_criteria: "All proposals in one Google Doc. Link uploaded.",
    },
    {
      title: "Submit 2 Proposals for Mentor Review",
      description: "Mentor reviews: English quality, persuasiveness, client psychology, and competitive positioning.",
      task_type: "mentor_assessed",
      category: "writing",
      weight: 11,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.5 * 7),
      display_order: 3,
      estimated_minutes: 60,
    },
    {
      title: `Practice ${Math.round(6 * (m / 3))} Client Negotiation Conversations`,
      description: "Role-play: negotiating rates, handling revision requests, setting project boundaries, and asking for payment. Record and review.",
      task_type: "self_track",
      category: "speaking",
      weight: 10,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.55 * 7),
      display_order: 4,
      estimated_minutes: Math.round(6 * (m / 3)) * 20,
      completion_criteria: "Recordings or written dialogue notes uploaded.",
      verification_quiz: [
        {
          question: "How should you politely reject an unreasonable revision request from an international client?",
          options: [
            "'No, that wasn't in the contract.'",
            "'I understand your needs — this scope goes beyond our original agreement. I'd be happy to discuss a revision package.'",
            "Ignore it and wait for them to follow up",
            "'This is not possible. Please read the contract.'"
          ],
          correct_index: 1,
          explanation: "International clients respond better to empathy + clear professional boundaries than blunt refusals."
        }
      ],
    },
    {
      title: `Attend ${Math.min(Math.round(weeks * 2), 18)} Speaking Club Sessions`,
      description: "Practice business English conversations, pitching ideas, and handling spontaneous questions from clients.",
      task_type: "system",
      category: "speaking",
      weight: 12,
      requires_pro: true,
      deadline_days: m * 30,
      display_order: 5,
      estimated_minutes: Math.min(Math.round(weeks * 2), 18) * 90,
      linked_event_type: "speaking_club",
    },
    {
      title: "Optimise Upwork / Fiverr Profile in English",
      description: "Write a compelling English profile headline, summary, and portfolio descriptions. Must pass the 'would a foreign client hire this?' test.",
      task_type: "self_track",
      category: "writing",
      weight: 8,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.4 * 7),
      display_order: 6,
      estimated_minutes: 120,
      completion_criteria: "Profile screenshots uploaded.",
    },
    {
      title: "Submit Profile for Expert English Review",
      description: "Mentor reviews your freelance profile for English clarity, client appeal, and competitive positioning.",
      task_type: "mentor_assessed",
      category: "writing",
      weight: 10,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.55 * 7),
      display_order: 7,
      estimated_minutes: 60,
    },
    {
      title: "2 Mock Client Calls with Mentor",
      description: "Full client intake call simulation: scope discussion, rate negotiation, and project kickoff. Mentor evaluates professional English fluency.",
      task_type: "mentor_assessed",
      category: "speaking",
      weight: 10,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.85 * 7),
      display_order: 8,
      estimated_minutes: 90,
    },
  ]);
}

// ── 14. LEADERSHIP ENGLISH ───────────────────

function generateLeadershipEnglishTasks(c: TaskBreakdownConfig): GeneratedTask[] {
  const { durationMonths: m, subObjectiveId } = c;
  const weeks = m * 4;
  const type = { le_negotiation: "Negotiation", le_conflict: "Conflict Resolution", le_crosscult: "Cross-Cultural Management", le_strategy: "Strategic Communication" }[subObjectiveId] ?? "Leadership";

  return assignOrderAndNormalize([
    {
      title: `${type} English — Vocabulary & Frameworks Study`,
      description: `Learn 60+ high-frequency ${type.toLowerCase()} phrases in English. Study communication frameworks: non-violent communication (NVC), principled negotiation, or OKR communication.`,
      task_type: "self_track",
      category: "reading",
      weight: 8,
      requires_pro: false,
      deadline_days: 14,
      display_order: 1,
      estimated_minutes: 240,
      completion_criteria: "Vocabulary bank (60+ entries with examples) uploaded.",
      materials: ["leadership-english-phrase-bank.pdf"],
      verification_quiz: [
        {
          question: `What is the most effective approach when giving critical feedback to a team member in English?`,
          options: [
            "Be very direct: 'Your work is bad.'",
            "Use the SBI model: Situation, Behavior, Impact",
            "Use indirect hints and hope they understand",
            "Send an email so you don't have to say it face-to-face"
          ],
          correct_index: 1,
          explanation: "The SBI (Situation-Behavior-Impact) model is widely used in global companies to give feedback that is specific, actionable, and respectful."
        }
      ],
    },
    {
      title: `Practice ${Math.round(8 * (m / 4))} ${type} Scenario Conversations`,
      description: `Role-play ${type} situations: ${
        subObjectiveId === "le_negotiation" ? "salary negotiation, vendor negotiation, contract discussion" :
        subObjectiveId === "le_conflict" ? "team conflict mediation, performance review, difficult feedback session" :
        subObjectiveId === "le_crosscult" ? "managing a multicultural team, adapting communication styles, cross-cultural misunderstanding resolution" :
        "strategy presentation to board, vision-casting team meeting, all-hands update"
      }. Record and review each.`,
      task_type: "self_track",
      category: "speaking",
      weight: 12,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.5 * 7),
      display_order: 2,
      estimated_minutes: Math.round(8 * (m / 4)) * 25,
      completion_criteria: "Recordings or detailed reflection notes uploaded.",
      verification_quiz: makeSpeakingQuiz(),
    },
    {
      title: `Attend ${Math.min(Math.round(weeks * 2), 20)} Speaking Club Sessions`,
      description: `Focus on ${type} language: leading discussions, managing difficult conversations, and persuasive communication.`,
      task_type: "system",
      category: "speaking",
      weight: 13,
      requires_pro: true,
      deadline_days: m * 30,
      display_order: 3,
      estimated_minutes: Math.min(Math.round(weeks * 2), 20) * 90,
      linked_event_type: "speaking_club",
    },
    {
      title: `Write ${Math.round(5 * (m / 4))} Professional Communication Documents`,
      description: `${type}-relevant written English: team memos, strategy briefs, feedback emails, stakeholder updates, or meeting minutes.`,
      task_type: "self_track",
      category: "writing",
      weight: 9,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.5 * 7),
      display_order: 4,
      estimated_minutes: Math.round(5 * (m / 4)) * 45,
      completion_criteria: "All documents in shared folder uploaded.",
    },
    {
      title: "Submit Writing Samples for Expert Review",
      description: "Mentor reviews English quality, professional tone, and leadership communication effectiveness.",
      task_type: "mentor_assessed",
      category: "writing",
      weight: 10,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.6 * 7),
      display_order: 5,
      estimated_minutes: 60,
    },
    {
      title: `Attend ${Math.max(2, Math.round(m / 2))} Leadership English Workshops`,
      description: `IELS workshops on ${type} in English: cross-cultural dynamics, executive communication, and high-stakes conversations.`,
      task_type: "system",
      category: "event",
      weight: 9,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.75 * 7),
      display_order: 6,
      estimated_minutes: Math.max(2, Math.round(m / 2)) * 120,
      linked_event_type: "workshop",
    },
    {
      title: `2 Full ${type} Simulation Sessions with Mentor`,
      description: `Full ${type} role-play in English. Mentor evaluates language sophistication, empathy, and professional effectiveness.`,
      task_type: "mentor_assessed",
      category: "speaking",
      weight: 14,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.88 * 7),
      display_order: 7,
      estimated_minutes: 120,
    },
    {
      title: "Final Self-Reflection — Leadership English Progress",
      description: "Compare Day 1 scenario recordings vs. final recordings. Write a 200-word reflection on measurable improvements.",
      task_type: "self_track",
      category: "admin",
      weight: 5,
      requires_pro: false,
      deadline_days: (weeks - 1) * 7,
      display_order: 8,
      estimated_minutes: 60,
      completion_criteria: "Reflection (200+ words) uploaded.",
    },
  ]);
}

// ── 15. TECHNICAL ENGLISH ────────────────────

const TECH_INDUSTRIES: Record<string, { label: string; vocab: string }> = {
  te_tech:       { label: "Tech / Software Engineering",  vocab: "API, sprint, deployment, pull request, architecture, agile, CI/CD" },
  te_health:     { label: "Healthcare & Medical",          vocab: "diagnosis, treatment protocol, clinical trial, prognosis, contraindication" },
  te_engineering:{ label: "Engineering & Manufacturing",   vocab: "tolerance, load-bearing, CAD, specifications, failure mode, procurement" },
  te_marketing:  { label: "Marketing & Creative",         vocab: "brand positioning, conversion funnel, A/B testing, ROI, engagement rate" },
  te_finance:    { label: "Finance & Accounting",         vocab: "P&L, EBITDA, due diligence, amortisation, liquidity ratio, portfolio" },
  te_legal:      { label: "Legal & Compliance",           vocab: "indemnification, jurisdiction, breach, covenant, liability, arbitration" },
};

function generateTechnicalEnglishTasks(c: TaskBreakdownConfig): GeneratedTask[] {
  const { durationMonths: m, subObjectiveId } = c;
  const industry = TECH_INDUSTRIES[subObjectiveId] ?? { label: "Industry", vocab: "technical terms" };
  const weeks = m * 4;

  return assignOrderAndNormalize([
    {
      title: `Learn ${industry.label} Vocabulary — 100-Term Mastery`,
      description: `Build a personal glossary of 100 essential ${industry.label} terms in English. For each: definition, pronunciation, example sentence, and Indonesian equivalent. (e.g., ${industry.vocab})`,
      task_type: "self_track",
      category: "reading",
      weight: 10,
      requires_pro: false,
      deadline_days: 21,
      display_order: 1,
      estimated_minutes: 300,
      completion_criteria: "Vocabulary glossary (100+ entries) uploaded.",
      verification_quiz: [
        {
          question: `What's the best way to learn and retain technical English vocabulary for ${industry.label}?`,
          options: [
            "Memorising terms in isolation from a dictionary",
            "Using terms in real sentences and reading them in context (articles, reports)",
            "Translating everything into Indonesian first",
            "Focusing only on pronunciation"
          ],
          correct_index: 1,
          explanation: "Vocabulary retention improves significantly when terms are encountered in authentic contexts and used actively."
        }
      ],
      materials: [`${subObjectiveId.replace("te_", "")}-vocab-guide.pdf`],
    },
    {
      title: `Read ${Math.round(8 * (m / 4))} ${industry.label} Articles in English`,
      description: `Read industry reports, technical blogs, or professional publications in English. For each, write a 3-sentence summary and extract 5 new terms.`,
      task_type: "self_track",
      category: "reading",
      weight: 9,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.4 * 7),
      display_order: 2,
      estimated_minutes: Math.round(8 * (m / 4)) * 40,
      completion_criteria: "Reading log (summaries + terms) uploaded.",
      verification_quiz: makeReadingQuiz("B2"),
    },
    {
      title: `Write ${Math.round(6 * (m / 4))} Technical Documents in English`,
      description: `${subObjectiveId === "te_tech" ? "PRDs, technical specs, or code documentation" :
        subObjectiveId === "te_health" ? "Patient case summaries, research abstracts, or clinical reports" :
        subObjectiveId === "te_marketing" ? "Campaign briefs, performance reports, or content plans" :
        subObjectiveId === "te_finance" ? "Investment memos, financial analysis reports, or due diligence summaries" :
        subObjectiveId === "te_legal" ? "Contract summaries, compliance memos, or legal briefs" :
        "Technical reports or engineering specifications"} — in clear, professional English.`,
      task_type: "self_track",
      category: "writing",
      weight: 10,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.55 * 7),
      display_order: 3,
      estimated_minutes: Math.round(6 * (m / 4)) * 60,
      completion_criteria: "Documents in shared folder. Link uploaded.",
    },
    {
      title: "Submit 2 Technical Documents for Expert Review",
      description: "Mentor checks: technical accuracy of English terms, professional register, and document structure.",
      task_type: "mentor_assessed",
      category: "writing",
      weight: 12,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.62 * 7),
      display_order: 4,
      estimated_minutes: 60,
    },
    {
      title: `Attend ${Math.min(Math.round(weeks * 2), 18)} Speaking Club Sessions — ${industry.label} English`,
      description: `Practice using ${industry.label} vocabulary in natural conversation. Discuss industry news, present mini-reports.`,
      task_type: "system",
      category: "speaking",
      weight: 12,
      requires_pro: true,
      deadline_days: m * 30,
      display_order: 5,
      estimated_minutes: Math.min(Math.round(weeks * 2), 18) * 90,
      linked_event_type: "speaking_club",
    },
    {
      title: `Attend ${Math.max(2, Math.round(m / 2))} Technical English Workshops`,
      description: `IELS workshops on ${industry.label} English: reading technical content faster, writing clear documentation, and presenting data.`,
      task_type: "system",
      category: "event",
      weight: 8,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.75 * 7),
      display_order: 6,
      estimated_minutes: Math.max(2, Math.round(m / 2)) * 120,
      linked_event_type: "workshop",
    },
    {
      title: `3 Technical Presentation Simulations with Mentor`,
      description: `Present a ${industry.label} topic (10 mins) in English. Mentor evaluates vocabulary accuracy, clarity, and professional delivery.`,
      task_type: "mentor_assessed",
      category: "speaking",
      weight: 12,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.88 * 7),
      display_order: 7,
      estimated_minutes: 150,
    },
    {
      title: "Final Vocabulary Mastery Quiz — 100-Term Test",
      description: "Self-test: use flashcards or Anki to test all 100 terms from your glossary. Target 90%+ recall rate.",
      task_type: "self_track",
      category: "test",
      weight: 7,
      requires_pro: false,
      deadline_days: (m * 30) - 7,
      display_order: 8,
      estimated_minutes: 90,
      completion_criteria: "Flashcard test results (90%+ score) uploaded.",
      verification_quiz: [
        {
          question: "What is the target recall rate you should aim for on your final vocabulary quiz?",
          options: ["70%+", "80%+", "90%+", "100% exactly"],
          correct_index: 2,
          explanation: "90%+ recall ensures you can use terms confidently under pressure. Lower rates suggest you need more spaced repetition."
        }
      ],
    },
  ]);
}

// ── 16. STARTUP PITCHING ─────────────────────

function generateStartupPitchingTasks(c: TaskBreakdownConfig): GeneratedTask[] {
  const { durationMonths: m, subObjectiveId } = c;
  const weeks = m * 4;
  const context = { sp_competition: "Competition", sp_investor: "Investor", sp_accelerator: "Accelerator", sp_corporate: "Corporate Innovation" }[subObjectiveId] ?? "Startup";

  return assignOrderAndNormalize([
    {
      title: `Analyse 5 Winning ${context} Pitch Decks & Scripts`,
      description: `Read/watch 5 successful English ${context} pitches. Map the structure: problem, solution, market, traction, team, ask. Note vocabulary and delivery style.`,
      task_type: "self_track",
      category: "reading",
      weight: 8,
      requires_pro: false,
      deadline_days: 14,
      display_order: 1,
      estimated_minutes: 240,
      completion_criteria: "Analysis notes (per pitch) uploaded.",
      verification_quiz: [
        {
          question: "In a 3-minute startup pitch, what should you establish in the first 30 seconds?",
          options: [
            "Your team's credentials",
            "The problem you solve — with a relatable hook",
            "Your revenue projections",
            "Your technology stack"
          ],
          correct_index: 1,
          explanation: "Investors and judges must immediately understand what problem you solve and why it matters. Start with the problem, not the team."
        }
      ],
    },
    {
      title: "Write Your Pitch Script (Draft 1)",
      description: `Write a 3-minute ${context} pitch script in English. Include: problem (30s), solution (30s), market size (20s), traction (20s), team (20s), ask (20s).`,
      task_type: "self_track",
      category: "writing",
      weight: 10,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.25 * 7),
      display_order: 2,
      estimated_minutes: 240,
      completion_criteria: "Pitch script (correct structure) uploaded.",
    },
    {
      title: `Record & Review ${Math.round(6 * (m / 3))} Pitch Deliveries`,
      description: "Record yourself delivering your pitch. Each run: note filler words, awkward pauses, and unclear English. Improve with each iteration.",
      task_type: "self_track",
      category: "speaking",
      weight: 11,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.4 * 7),
      display_order: 3,
      estimated_minutes: Math.round(6 * (m / 3)) * 20,
      completion_criteria: "Recordings (min 3) and improvement log uploaded.",
      verification_quiz: makeSpeakingQuiz(),
    },
    {
      title: "Submit Pitch Script for Expert English & Impact Review",
      description: "Mentor reviews script for English clarity, persuasiveness, investor/judge appeal, and language sophistication.",
      task_type: "mentor_assessed",
      category: "writing",
      weight: 11,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.45 * 7),
      display_order: 4,
      estimated_minutes: 60,
    },
    {
      title: `Practice ${Math.round(5 * (m / 3))} Investor Q&A Sessions`,
      description: "Record yourself answering hard questions in English: 'Why now?', 'What's your moat?', 'What if Google builds this?', 'How do you plan to monetise?'",
      task_type: "self_track",
      category: "speaking",
      weight: 10,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.55 * 7),
      display_order: 5,
      estimated_minutes: Math.round(5 * (m / 3)) * 20,
      completion_criteria: "Recordings or written Q&A answers uploaded.",
    },
    {
      title: `Attend ${Math.min(Math.round(weeks * 2), 16)} Speaking Club Sessions — Pitching Practice`,
      description: "Deliver your pitch to peers. Get real-time feedback on English delivery, clarity, and persuasiveness.",
      task_type: "system",
      category: "speaking",
      weight: 12,
      requires_pro: true,
      deadline_days: m * 30,
      display_order: 6,
      estimated_minutes: Math.min(Math.round(weeks * 2), 16) * 90,
      linked_event_type: "speaking_club",
    },
    {
      title: `Attend ${Math.max(2, Math.round(m / 2))} Startup Pitching Workshops`,
      description: `IELS workshops on ${context} pitching: storytelling in English, handling tough questions, and pitch day performance.`,
      task_type: "system",
      category: "event",
      weight: 8,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.75 * 7),
      display_order: 7,
      estimated_minutes: Math.max(2, Math.round(m / 2)) * 120,
      linked_event_type: "workshop",
    },
    {
      title: `3 Full ${context} Pitch Simulations with Mentor`,
      description: `Simulate a complete ${context} pitch (3–5 mins) + 10-minute Q&A in English. Mentor plays investor/judge role. Scored on language, confidence, and persuasiveness.`,
      task_type: "mentor_assessed",
      category: "speaking",
      weight: 15,
      requires_pro: true,
      deadline_days: Math.round(weeks * 0.9 * 7),
      display_order: 8,
      estimated_minutes: 180,
    },
    {
      title: "Final Pitch — Record & Submit for Portfolio",
      description: "Deliver your best pitch on video (3–5 mins). This is your portfolio-ready pitch recording for competitions and applications.",
      task_type: "self_track",
      category: "speaking",
      weight: 8,
      requires_pro: false,
      deadline_days: (weeks - 1) * 7,
      display_order: 9,
      estimated_minutes: 60,
      completion_criteria: "Final pitch video link uploaded.",
    },
  ]);
}

// ── 17. GENERAL FLUENCY (fallback) ────────────

function generateConversationFluencyTasks(c: TaskBreakdownConfig): GeneratedTask[] {
  const { durationMonths: m, targetCEFR } = c;
  const weeks = m * 4;

  return assignOrderAndNormalize([
    {
      title: "CEFR Level Confirmation Assessment",
      description: "Complete the IELS placement assessment to confirm your starting level (A1–C1). Takes ~45 minutes.",
      task_type: "system",
      category: "test",
      weight: 6,
      requires_pro: false,
      deadline_days: 7,
      display_order: 1,
      estimated_minutes: 60,
    },
    {
      title: `Attend ${Math.min(Math.round(weeks * 3), 72)} Speaking Club Sessions`,
      description: "Mon/Wed/Fri speaking practice with peers and coaches (7 PM WIB). Core of your fluency journey.",
      task_type: "system",
      category: "speaking",
      weight: 25,
      requires_pro: true,
      deadline_days: m * 30,
      display_order: 2,
      estimated_minutes: Math.min(Math.round(weeks * 3), 72) * 90,
      linked_event_type: "speaking_club",
    },
    {
      title: `Record ${Math.round(30 * (m / 6))} Daily Speaking Logs`,
      description: "Record 3–5 minutes on a random topic each day. Listen back and note 1 thing to improve each time.",
      task_type: "self_track",
      category: "speaking",
      weight: 12,
      requires_pro: false,
      deadline_days: m * 30,
      display_order: 3,
      estimated_minutes: Math.round(30 * (m / 6)) * 10,
      completion_criteria: "Speaking log folder link uploaded.",
      verification_quiz: makeSpeakingQuiz(),
    },
    {
      title: `Write ${Math.round(20 * (m / 6))} Journal Entries in English`,
      description: "150–200 words per entry. Any topic: your day, an opinion, a memory. Natural, personal writing builds fluency.",
      task_type: "self_track",
      category: "writing",
      weight: 10,
      requires_pro: false,
      deadline_days: m * 30,
      display_order: 4,
      estimated_minutes: Math.round(20 * (m / 6)) * 20,
      completion_criteria: "Journal folder link uploaded.",
    },
    {
      title: `Read ${Math.round(4 * (m / 6))} English Books / Graded Readers`,
      description: "Graded to your CEFR level or popular fiction. Track new vocabulary and reading speed.",
      task_type: "self_track",
      category: "reading",
      weight: 8,
      requires_pro: false,
      deadline_days: m * 30,
      display_order: 5,
      estimated_minutes: Math.round(4 * (m / 6)) * 300,
      completion_criteria: "Book list with completion dates uploaded.",
    },
    {
      title: `${Math.max(2, Math.round(m / 3))} Fluency Assessment Check-ins with Mentor`,
      description: "Quarterly evaluation. Measure progress and adjust your learning strategy.",
      task_type: "mentor_assessed",
      category: "speaking",
      weight: 12,
      requires_pro: true,
      deadline_days: m * 30,
      display_order: 6,
      estimated_minutes: Math.max(2, Math.round(m / 3)) * 60,
    },
    {
      title: `Attend ${Math.max(3, Math.round(m / 2))} English Fluency Workshops`,
      description: "Pronunciation, idioms, cultural nuance, and conversation strategies.",
      task_type: "system",
      category: "event",
      weight: 12,
      requires_pro: false,
      deadline_days: Math.round(weeks * 0.8 * 7),
      display_order: 7,
      estimated_minutes: Math.max(3, Math.round(m / 2)) * 120,
      linked_event_type: "workshop",
    },
    {
      title: `Final CEFR Level Re-assessment — Confirm ${targetCEFR}`,
      description: `Confirm you've reached ${targetCEFR} or above with the IELS final assessment. Celebrate your milestone!`,
      task_type: "system",
      category: "test",
      weight: 7,
      requires_pro: false,
      deadline_days: (weeks - 1) * 7,
      display_order: 8,
      estimated_minutes: 60,
    },
  ]);
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function assignOrderAndNormalize(tasks: GeneratedTask[]): GeneratedTask[] {
  const total = tasks.reduce((s, t) => s + t.weight, 0);
  return tasks.map((t, i) => ({
    ...t,
    display_order: i + 1,
    weight: total === 0 ? 0 : Math.round((t.weight / total) * 100),
  }));
}

export function filterTasksByTier(
  tasks: GeneratedTask[],
  tier: TaskBreakdownConfig["userTier"]
): { accessible: GeneratedTask[]; locked: GeneratedTask[] } {
  const isPro = tier === "insider" || tier === "visionary";
  return {
    accessible: tasks.filter((t) => !t.requires_pro || isPro),
    locked: isPro ? [] : tasks.filter((t) => t.requires_pro),
  };
}