// IELS Goals - Progress Calculation System
// CEFR-based, research-backed formulas

import type { Goal, GoalTask } from '@/types/goals';

// ============================================
// CEFR LEVEL SYSTEM
// ============================================

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export const CEFR_TO_IELTS: Record<CEFRLevel, number> = {
  A1: 1.0,
  A2: 3.0,
  B1: 4.5,
  B2: 5.5,
  C1: 7.0,
  C2: 8.5,
};

export function ieltsToCEFR(band: number): CEFRLevel {
  if (band < 3.0) return 'A1';
  if (band < 4.5) return 'A2';
  if (band < 5.5) return 'B1';
  if (band < 7.0) return 'B2';
  if (band < 8.5) return 'C1';
  return 'C2';
}

export const CEFR_LABELS: Record<CEFRLevel, string> = {
  A1: 'A1 — Beginner',
  A2: 'A2 — Elementary',
  B1: 'B1 — Intermediate',
  B2: 'B2 — Upper Intermediate',
  C1: 'C1 — Advanced',
  C2: 'C2 — Mastery',
};

const CEFR_INDEX: Record<CEFRLevel, number> = {
  A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5,
};

export function cefrGap(from: CEFRLevel, to: CEFRLevel): number {
  return CEFR_INDEX[to] - CEFR_INDEX[from];
}

// ============================================
// RESEARCH-BASED HOUR BENCHMARKS
// ============================================

const CEFR_HOURS_PER_LEVEL: Record<string, number> = {
  'A1_A2': 150,
  'A2_B1': 200,
  'B1_B2': 300,
  'B2_C1': 400,
  'C1_C2': 600,
};

export function totalHoursNeeded(from: CEFRLevel, to: CEFRLevel): number {
  const fromIdx  = CEFR_INDEX[from];
  const toIdx    = CEFR_INDEX[to];
  if (toIdx <= fromIdx) return 0;

  const allLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as CEFRLevel[];
  const keys = allLevels.slice(fromIdx, toIdx).map(
    (l, i) => `${l}_${allLevels[fromIdx + i + 1]}`
  );
  return keys.reduce((sum, key) => sum + (CEFR_HOURS_PER_LEVEL[key] || 200), 0);
}

const IELTS_HOURS_PER_HALF_BAND = {
  reading: 25, writing: 35, speaking: 30, listening: 20,
};

function calculateIELTSHours(currentBand: number, targetBand: number): number {
  const halfBands = Math.max(0, targetBand - currentBand) * 2;
  const avg = (
    IELTS_HOURS_PER_HALF_BAND.reading +
    IELTS_HOURS_PER_HALF_BAND.writing +
    IELTS_HOURS_PER_HALF_BAND.speaking +
    IELTS_HOURS_PER_HALF_BAND.listening
  ) / 4;
  return Math.round(halfBands * avg * 1.1);
}

// ============================================
// ACTIVITY EFFECTIVENESS MULTIPLIERS
// ============================================

const EFFECTIVENESS = {
  speaking_club: 1.8,
  mentor_session: 2.5,
  self_study: 1.0,
  test_practice: 1.6,
  writing_practice: 1.4,
};

const SPEAKING_CLUB = {
  days_per_week: 3,
  minutes_per_session: 90,
  weekly_minutes: 270,
};

// ============================================
// DIFFICULTY THRESHOLDS (total daily mins)
// ============================================
//
//  easy:        <  30 min/day
//  moderate:   30–90 min/day
//  challenging: 91–180 min/day
//  extreme:    181–300 min/day  (allowed, but strongly warned)
//  impossible:  > 300 min/day  (blocked — cannot create goal)

const THRESHOLD = { easy: 30, moderate: 90, challenging: 180, extreme: 300 } as const;

// ============================================
// INTERFACES
// ============================================

export interface CurrentLevel {
  cefr: CEFRLevel;
  ielts?: number;
}

export interface TargetLevel {
  cefr: CEFRLevel;
  ielts?: number;
}

export type DifficultyLevel = 'easy' | 'moderate' | 'challenging' | 'extreme' | 'impossible';

export interface StudyPlanResult {
  currentCEFR: CEFRLevel;
  targetCEFR: CEFRLevel;
  currentIELTS: number;
  targetIELTS: number;
  durationMonths: number;
  levelGap: number;

  totalHoursNeeded: number;
  totalMinutesNeeded: number;

  dailyMinutesRequired: number;
  weeklyHoursRequired: number;

  isRealistic: boolean;   // false for extreme & impossible
  canCreateGoal: boolean; // false ONLY for impossible
  difficultyLevel: DifficultyLevel;
  recommendation: string;

  breakdown: {
    speakingClubs: {
      sessionsPerWeek: number;
      weeklyMinutes: number;
      effectiveMinutes: number;
    };
    selfStudy: {
      daysPerWeek: number;
      minutesPerDay: number;
      weeklyMinutes: number;
    };
    mentorSessions: {
      sessionsPerMonth: number;
      minutesPerSession: number;
      monthlyMinutes: number;
      effectiveMinutes: number;
    };
    assignments: {
      perWeek: number;
      minutesPerAssignment: number;
      weeklyMinutes: number;
    };
  };

  speakingClubImpact: {
    weeksNeeded: number;
    totalSessions: number;
    contributionPercentage: number;
  };
}

// ============================================
// MAIN CALCULATION FUNCTION
// ============================================

export function calculateStudyPlan(
  objective: string,
  currentLevel: CurrentLevel,
  targetLevel: TargetLevel,
  durationMonths: number,
  includesSpeakingClub: boolean = true
): StudyPlanResult {

  const currentIELTS   = currentLevel.ielts ?? CEFR_TO_IELTS[currentLevel.cefr];
  const targetIELTS    = targetLevel.ielts  ?? CEFR_TO_IELTS[targetLevel.cefr];
  const levelGap       = cefrGap(currentLevel.cefr, targetLevel.cefr);
  const objectiveLower = objective.toLowerCase();

  // ── Total hours ────────────────────────────────────────────────────────

  let totalHours: number;

  if (objectiveLower.includes('ielts') || objectiveLower.includes('toefl')) {
    totalHours = calculateIELTSHours(currentIELTS, targetIELTS);
  } else if (objectiveLower.includes('scholarship')) {
    totalHours = calculateIELTSHours(currentIELTS, Math.max(targetIELTS, 6.5)) + 40;
  } else {
    totalHours = totalHoursNeeded(currentLevel.cefr, targetLevel.cefr) || 120;
  }

  const totalMinutes = totalHours * 60;

  // ── Timeline ───────────────────────────────────────────────────────────

  const weeksAvailable      = Math.ceil((durationMonths * 30) / 7);
  const weeklyMinutesNeeded = totalMinutes / weeksAvailable;

  // ── Speaking Club contribution ─────────────────────────────────────────

  let speakingClubEffectivePerWeek = 0;
  let remainingWeeklyMinutes       = weeklyMinutesNeeded;

  if (includesSpeakingClub) {
    speakingClubEffectivePerWeek = SPEAKING_CLUB.weekly_minutes * EFFECTIVENESS.speaking_club;
    remainingWeeklyMinutes       = Math.max(0, weeklyMinutesNeeded - speakingClubEffectivePerWeek);
  }

  // ── Self-study per day ────────────────────────────────────────────────

  const selfStudyDaysPerWeek  = 5;
  const dailySelfStudyMinutes = Math.ceil(remainingWeeklyMinutes / selfStudyDaysPerWeek);

  // Spread Speaking Club across 7 days to get true daily average
  const speakingClubDailyAvg  = includesSpeakingClub ? SPEAKING_CLUB.weekly_minutes / 7 : 0;
  const totalDailyMinutes      = dailySelfStudyMinutes + speakingClubDailyAvg;
  const daily                  = Math.round(totalDailyMinutes); // for readability

  // ── Mentor & assignments ──────────────────────────────────────────────

  const mentorSessionsPerMonth  = 2;
  const mentorMinutesPerSession = 30;
  const mentorWeeklyMinutes     = (mentorSessionsPerMonth * mentorMinutesPerSession) / 4;
  const mentorEffectiveWeekly   = mentorWeeklyMinutes * EFFECTIVENESS.mentor_session;

  const assignmentsPerWeek      = 2;
  const minutesPerAssignment    = 45;
  const assignmentWeeklyMinutes = assignmentsPerWeek * minutesPerAssignment;

  // ── Feasibility ───────────────────────────────────────────────────────
  //
  // Evaluated on `daily` = self-study + speaking club (combined realistic load)

  let isRealistic: boolean;
  let canCreateGoal: boolean;
  let difficultyLevel: DifficultyLevel;
  let recommendation: string;

  if (daily < THRESHOLD.easy) {
    // < 30 min/day
    difficultyLevel = 'easy';
    isRealistic     = true;
    canCreateGoal   = true;
    recommendation  =
      `✅ Very manageable! At just ${daily} mins/day combined, you have plenty of breathing room. ` +
      `Consider adding extra vocabulary or listening practice to accelerate your progress.`;

  } else if (daily <= THRESHOLD.moderate) {
    // 30–90 min/day
    difficultyLevel = 'moderate';
    isRealistic     = true;
    canCreateGoal   = true;
    recommendation  =
      `👍 Realistic and sustainable. ${daily} mins/day — including Speaking Club sessions — ` +
      `fits comfortably into most daily routines. Stay consistent and you'll get there!`;

  } else if (daily <= THRESHOLD.challenging) {
    // 91–180 min/day
    difficultyLevel = 'challenging';
    isRealistic     = true;
    canCreateGoal   = true;
    recommendation  =
      `⚠️ Ambitious but achievable. ${daily} mins/day requires real commitment and a solid routine. ` +
      `Use Speaking Club sessions to maximise your efficiency, and consider extending ` +
      `your timeline if life gets busy.`;

  } else if (daily <= THRESHOLD.extreme) {
    // 181–300 min/day
    difficultyLevel = 'extreme';
    isRealistic     = false;
    canCreateGoal   = true;
    recommendation  =
      `🚫 Very demanding — ${daily} mins/day (nearly 5 hours!) is close to the limit of ` +
      `what's sustainable long-term. This pace risks serious burnout. ` +
      `We strongly recommend extending your timeline by at least 50%, or targeting ` +
      `one CEFR level at a time to reduce the load.`;

  } else {
    // > 300 min/day — IMPOSSIBLE
    difficultyLevel = 'impossible';
    isRealistic     = false;
    canCreateGoal   = false;
    recommendation  =
      `🚫 ${daily} mins/day exceeds what's humanly sustainable (over 5 hours of focused ` +
      `study every single day). This goal cannot be created with the current settings. ` +
      `Please extend your timeline, reduce the level gap by targeting one CEFR level ` +
      `at a time, or both.`;
  }

  // ── Speaking Club impact ──────────────────────────────────────────────

  const totalSessions             = weeksAvailable * SPEAKING_CLUB.days_per_week;
  const speakingClubContributionPct =
    weeklyMinutesNeeded > 0
      ? Math.min(99, Math.round((speakingClubEffectivePerWeek / weeklyMinutesNeeded) * 100))
      : 0;

  return {
    currentCEFR:   currentLevel.cefr,
    targetCEFR:    targetLevel.cefr,
    currentIELTS:  Math.round(currentIELTS * 10) / 10,
    targetIELTS:   Math.round(targetIELTS * 10) / 10,
    durationMonths,
    levelGap,

    totalHoursNeeded:    Math.round(totalHours),
    totalMinutesNeeded:  Math.round(totalMinutes),
    dailyMinutesRequired: daily,
    weeklyHoursRequired:  Math.round((weeklyMinutesNeeded / 60) * 10) / 10,

    isRealistic,
    canCreateGoal,
    difficultyLevel,
    recommendation,

    breakdown: {
      speakingClubs: {
        sessionsPerWeek:  SPEAKING_CLUB.days_per_week,
        weeklyMinutes:    SPEAKING_CLUB.weekly_minutes,
        effectiveMinutes: Math.round(speakingClubEffectivePerWeek),
      },
      selfStudy: {
        daysPerWeek:   selfStudyDaysPerWeek,
        minutesPerDay: dailySelfStudyMinutes,
        weeklyMinutes: Math.round(dailySelfStudyMinutes * selfStudyDaysPerWeek),
      },
      mentorSessions: {
        sessionsPerMonth:  mentorSessionsPerMonth,
        minutesPerSession: mentorMinutesPerSession,
        monthlyMinutes:    mentorSessionsPerMonth * mentorMinutesPerSession,
        effectiveMinutes:  Math.round(mentorEffectiveWeekly * 4),
      },
      assignments: {
        perWeek:              assignmentsPerWeek,
        minutesPerAssignment,
        weeklyMinutes:        assignmentWeeklyMinutes,
      },
    },

    speakingClubImpact: {
      weeksNeeded:            weeksAvailable,
      totalSessions,
      contributionPercentage: speakingClubContributionPct,
    },
  };
}

// ============================================
// HELPERS
// ============================================

export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins  = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins  === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export function getNextSpeakingClubDates(): Date[] {
  const today      = new Date();
  const daysOfWeek = [1, 3, 5];
  const result: Date[] = [];

  for (let i = 0; i < 14 && result.length < 6; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (daysOfWeek.includes(date.getDay())) {
      date.setHours(19, 0, 0, 0);
      result.push(date);
    }
  }
  return result;
}