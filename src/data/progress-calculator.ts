// IELS Goals - Advanced Progress Calculation System
// Realistic formulas based on language acquisition research & IELS data

import type { Goal, GoalTask } from '@/types/goals';

// ============================================
// LEARNING VELOCITY CONSTANTS (Research-based)
// ============================================

// Based on Common European Framework of Reference (CEFR) & IELTS research
const SKILL_IMPROVEMENT_RATES = {
  // Minutes needed per 0.5 band improvement (IELTS)
  ielts: {
    reading: 25 * 60,      // 25 hours for 0.5 band (1500 mins)
    writing: 35 * 60,      // 35 hours for 0.5 band (2100 mins)
    speaking: 30 * 60,     // 30 hours for 0.5 band (1800 mins)
    listening: 20 * 60     // 20 hours for 0.5 band (1200 mins)
  },
  
  // Minutes needed per 5-point improvement (TOEFL iBT)
  toefl: {
    reading: 22 * 60,      // 22 hours for 5 points (1320 mins)
    writing: 30 * 60,      // 30 hours for 5 points (1800 mins)
    speaking: 28 * 60,     // 28 hours for 5 points (1680 mins)
    listening: 18 * 60     // 18 hours for 5 points (1080 mins)
  },
  
  // CEFR Level progression (hours needed)
  conversation: {
    a1_to_a2: 150 * 60,    // 150 hours (9000 mins) - Beginner → Elementary
    a2_to_b1: 200 * 60,    // 200 hours (12000 mins) - Elementary → Intermediate
    b1_to_b2: 250 * 60,    // 250 hours (15000 mins) - Intermediate → Upper-Intermediate
    b2_to_c1: 300 * 60,    // 300 hours (18000 mins) - Upper → Advanced
    c1_to_c2: 400 * 60     // 400 hours (24000 mins) - Advanced → Mastery
  },
  
  // Professional English contexts
  professional: {
    basic: 120 * 60,       // 120 hours (7200 mins) - Basic business fluency
    advanced: 180 * 60,    // 180 hours (10800 mins) - Professional mastery
    industry_specific: 90 * 60  // 90 hours (5400 mins) - Industry vocab on top of basic
  }
};

// Activity effectiveness multipliers (based on active learning research)
const ACTIVITY_EFFECTIVENESS = {
  speaking_club: 1.8,        // 1 hour speaking club = 1.8 hours self-study
  mentor_session: 2.5,       // 1 hour with mentor = 2.5 hours self-study
  self_study: 1.0,           // Baseline
  passive_listening: 0.6,    // Podcasts, videos without exercises
  reading_materials: 0.8,    // Reading without active practice
  writing_practice: 1.4,     // Active writing with feedback
  test_practice: 1.6         // Mock tests & review
};

// Speaking Club Schedule (IELS Lounge)
const SPEAKING_CLUB_SCHEDULE = {
  days_per_week: 3,          // Monday, Wednesday, Friday
  minutes_per_session: 90,   // 1.5 hours per session
  weekly_total: 270          // 3 × 90 mins = 4.5 hours/week
};

// ============================================
// INTERFACES
// ============================================

export interface StudyPlanResult {
  // Total requirements
  totalMinutesNeeded: number;
  totalHoursNeeded: number;
  
  // Daily breakdown
  dailyMinutesRequired: number;
  weeklyHoursRequired: number;
  
  // Schedule recommendation
  studyDaysPerWeek: number;
  minutesPerSession: number;
  
  // Feasibility
  isRealistic: boolean;
  difficultyLevel: 'easy' | 'moderate' | 'challenging' | 'extreme';
  recommendation: string;
  
  // Activity breakdown (how to distribute time)
  breakdown: {
    speakingClubs: {
      sessionsPerWeek: number;
      weeklyMinutes: number;
      effectiveMinutes: number; // After multiplier
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
  
  // Speaking Club integration
  speakingClubImpact: {
    weeksNeeded: number;
    totalSessions: number;
    contributionPercentage: number;
  };
}

export interface CurrentLevel {
  ielts?: number;    // 4.0 - 9.0
  toefl?: number;    // 0 - 120
  cefr?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

// ============================================
// CALCULATION FUNCTIONS
// ============================================

/**
 * Calculate realistic daily study time based on goal & timeline
 */
export function calculateStudyPlan(
  objective: string,
  currentLevel: CurrentLevel,
  targetLevel: string | number,
  durationDays: number,
  includesSpeakingClub: boolean = true
): StudyPlanResult {
  
  let totalMinutesNeeded = 0;
  const objectiveLower = objective.toLowerCase();
  
  // === STEP 1: Determine total minutes needed ===
  
  if (objectiveLower.includes('ielts')) {
    totalMinutesNeeded = calculateIELTSMinutes(
      currentLevel.ielts || 5.0,
      typeof targetLevel === 'number' ? targetLevel : parseFloat(targetLevel)
    );
  } 
  else if (objectiveLower.includes('toefl')) {
    totalMinutesNeeded = calculateTOEFLMinutes(
      currentLevel.toefl || 60,
      typeof targetLevel === 'number' ? targetLevel : parseInt(targetLevel)
    );
  } 
  else if (objectiveLower.includes('conversation') || objectiveLower.includes('fluent')) {
    totalMinutesNeeded = calculateConversationMinutes(currentLevel.cefr || 'A2');
  } 
  else if (objectiveLower.includes('job') || objectiveLower.includes('work') || objectiveLower.includes('business')) {
    totalMinutesNeeded = SKILL_IMPROVEMENT_RATES.professional.basic;
  } 
  else if (objectiveLower.includes('scholarship')) {
    // Scholarship = Test prep + Application work
    totalMinutesNeeded = calculateIELTSMinutes(5.5, 7.0) + (40 * 60);
  } 
  else {
    // Default: B1 level conversation
    totalMinutesNeeded = SKILL_IMPROVEMENT_RATES.conversation.a2_to_b1;
  }
  
  // === STEP 2: Calculate weekly available time ===
  
  const weeksAvailable = Math.ceil(durationDays / 7);
  const weeklyMinutesNeeded = totalMinutesNeeded / weeksAvailable;
  
  // === STEP 3: Account for Speaking Club (if included) ===
  
  let speakingClubContribution = 0;
  let remainingWeeklyMinutes = weeklyMinutesNeeded;
  
  if (includesSpeakingClub) {
    const clubMinutesPerWeek = SPEAKING_CLUB_SCHEDULE.weekly_total;
    speakingClubContribution = clubMinutesPerWeek * ACTIVITY_EFFECTIVENESS.speaking_club;
    remainingWeeklyMinutes = Math.max(0, weeklyMinutesNeeded - speakingClubContribution);
  }
  
  // === STEP 4: Calculate self-study requirements ===
  
  // Assume learner can study 5-6 days per week realistically
  const selfStudyDays = 5;
  const dailySelfStudyMinutes = Math.ceil(remainingWeeklyMinutes / selfStudyDays);
  
  // === STEP 5: Add mentor sessions (Pro feature boost) ===
  
  const mentorSessionsPerMonth = 2; // Pro users get 2 sessions/month
  const mentorMinutesPerSession = 30;
  const mentorWeeklyMinutes = (mentorSessionsPerMonth * mentorMinutesPerSession) / 4;
  const mentorEffectiveMinutes = mentorWeeklyMinutes * ACTIVITY_EFFECTIVENESS.mentor_session;
  
  // === STEP 6: Assignments ===
  
  const assignmentsPerWeek = 2;
  const minutesPerAssignment = 45; // ~45 mins per assignment
  const assignmentWeeklyMinutes = assignmentsPerWeek * minutesPerAssignment;
  const assignmentEffectiveMinutes = assignmentWeeklyMinutes * ACTIVITY_EFFECTIVENESS.writing_practice;
  
  // === STEP 7: Feasibility Check ===
  
  const totalDailyMinutes = dailySelfStudyMinutes + 
    (SPEAKING_CLUB_SCHEDULE.weekly_total / 7); // Spread club across week for daily avg
  
  let isRealistic = true;
  let difficultyLevel: 'easy' | 'moderate' | 'challenging' | 'extreme' = 'moderate';
  let recommendation = '';
  
  if (totalDailyMinutes < 30) {
    difficultyLevel = 'easy';
    recommendation = '✅ Very manageable! This pace allows steady progress without overwhelming your schedule.';
    isRealistic = true;
  } else if (totalDailyMinutes <= 60) {
    difficultyLevel = 'moderate';
    recommendation = '👍 Realistic and effective. Combine Speaking Club with consistent daily practice for best results.';
    isRealistic = true;
  } else if (totalDailyMinutes <= 120) {
    difficultyLevel = 'challenging';
    recommendation = '⚠️ Ambitious but achievable. Requires strong commitment. Consider extending timeline if lifestyle permits.';
    isRealistic = true;
  } else {
    difficultyLevel = 'extreme';
    recommendation = '🚫 This pace is extremely demanding and may lead to burnout. We recommend extending your timeline by 50% for sustainable progress.';
    isRealistic = false;
  }
  
  // === STEP 8: Build result object ===
  
  const totalSpeakingClubSessions = weeksAvailable * SPEAKING_CLUB_SCHEDULE.days_per_week;
  const speakingClubPercentage = Math.round((speakingClubContribution / weeklyMinutesNeeded) * 100);
  
  return {
    totalMinutesNeeded: Math.round(totalMinutesNeeded),
    totalHoursNeeded: Math.round((totalMinutesNeeded / 60) * 10) / 10,
    
    dailyMinutesRequired: Math.round(totalDailyMinutes),
    weeklyHoursRequired: Math.round((weeklyMinutesNeeded / 60) * 10) / 10,
    
    studyDaysPerWeek: selfStudyDays,
    minutesPerSession: dailySelfStudyMinutes,
    
    isRealistic,
    difficultyLevel,
    recommendation,
    
    breakdown: {
      speakingClubs: {
        sessionsPerWeek: SPEAKING_CLUB_SCHEDULE.days_per_week,
        weeklyMinutes: SPEAKING_CLUB_SCHEDULE.weekly_total,
        effectiveMinutes: Math.round(speakingClubContribution)
      },
      selfStudy: {
        daysPerWeek: selfStudyDays,
        minutesPerDay: dailySelfStudyMinutes,
        weeklyMinutes: Math.round(dailySelfStudyMinutes * selfStudyDays)
      },
      mentorSessions: {
        sessionsPerMonth: mentorSessionsPerMonth,
        minutesPerSession: mentorMinutesPerSession,
        monthlyMinutes: mentorSessionsPerMonth * mentorMinutesPerSession,
        effectiveMinutes: Math.round(mentorEffectiveMinutes * 4) // Monthly
      },
      assignments: {
        perWeek: assignmentsPerWeek,
        minutesPerAssignment: minutesPerAssignment,
        weeklyMinutes: assignmentWeeklyMinutes
      }
    },
    
    speakingClubImpact: {
      weeksNeeded: weeksAvailable,
      totalSessions: totalSpeakingClubSessions,
      contributionPercentage: speakingClubPercentage
    }
  };
}

/**
 * Calculate minutes needed for IELTS improvement
 */
function calculateIELTSMinutes(currentBand: number, targetBand: number): number {
  const bandDifference = targetBand - currentBand;
  const halfBandsNeeded = bandDifference * 2; // 0.5 band increments
  
  // Weighted average across all skills
  const avgMinutesPerHalfBand = (
    SKILL_IMPROVEMENT_RATES.ielts.reading +
    SKILL_IMPROVEMENT_RATES.ielts.writing +
    SKILL_IMPROVEMENT_RATES.ielts.speaking +
    SKILL_IMPROVEMENT_RATES.ielts.listening
  ) / 4;
  
  // Add 10% buffer for consolidation & practice tests
  return Math.round(halfBandsNeeded * avgMinutesPerHalfBand * 1.1);
}

/**
 * Calculate minutes needed for TOEFL improvement
 */
function calculateTOEFLMinutes(currentScore: number, targetScore: number): number {
  const scoreDifference = targetScore - currentScore;
  const fivePointIncrements = Math.ceil(scoreDifference / 5);
  
  // Weighted average
  const avgMinutesPerIncrement = (
    SKILL_IMPROVEMENT_RATES.toefl.reading +
    SKILL_IMPROVEMENT_RATES.toefl.writing +
    SKILL_IMPROVEMENT_RATES.toefl.speaking +
    SKILL_IMPROVEMENT_RATES.toefl.listening
  ) / 4;
  
  return Math.round(fivePointIncrements * avgMinutesPerIncrement * 1.1);
}

/**
 * Calculate minutes needed for conversation fluency
 */
function calculateConversationMinutes(currentLevel: string): number {
  const levelMap: { [key: string]: number } = {
    'A1': SKILL_IMPROVEMENT_RATES.conversation.a1_to_a2,
    'A2': SKILL_IMPROVEMENT_RATES.conversation.a2_to_b1,
    'B1': SKILL_IMPROVEMENT_RATES.conversation.b1_to_b2,
    'B2': SKILL_IMPROVEMENT_RATES.conversation.b2_to_c1,
    'C1': SKILL_IMPROVEMENT_RATES.conversation.c1_to_c2
  };
  
  return levelMap[currentLevel] || SKILL_IMPROVEMENT_RATES.conversation.a2_to_b1;
}

/**
 * Format minutes into human-readable time
 */
export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins} minutes`;
  if (mins === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  return `${hours}h ${mins}m`;
}

/**
 * Get next Speaking Club schedule
 */
export function getNextSpeakingClubDates(): Date[] {
  const today = new Date();
  const daysOfWeek = [1, 3, 5]; // Monday, Wednesday, Friday (0 = Sunday)
  const next7Days: Date[] = [];
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    if (daysOfWeek.includes(date.getDay())) {
      date.setHours(19, 0, 0, 0); // 7 PM
      next7Days.push(date);
      
      if (next7Days.length >= 6) break; // Next 6 sessions
    }
  }
  
  return next7Days;
}