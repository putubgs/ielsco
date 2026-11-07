"use client";

import { useState, useEffect } from "react";
import {
  X, ChevronRight, ChevronLeft, Target, Calendar,
  Sparkles, Globe, GraduationCap, Briefcase, Check,
  ExternalLink, HelpCircle, ArrowRight, Info, Ban,
  ArrowLeft, AlertTriangle,
} from "lucide-react";
import { createGoal, getGoalTemplates, getUserGoals } from "@/data/goals";
import {
  calculateStudyPlan,
  type CEFRLevel,
  type StudyPlanResult,
  CEFR_TO_IELTS,
  cefrGap,
} from "@/data/progress-calculator";
import type { GoalTemplate } from "@/types/goals";
import { createPortal } from "react-dom";

interface GoalWizardProps {
  userId: string;
  onClose: () => void;
  onSuccess: () => void;
}

// ============================================================
// CEFR DATA
// ============================================================

const CEFR_LEVELS: {
  level: CEFRLevel;
  label: string;
  desc: string;
  examples: string;
}[] = [
  { level: "A1", label: "A1", desc: "Beginner",           examples: "Can introduce myself, understand very simple words" },
  { level: "A2", label: "A2", desc: "Elementary",         examples: "Can handle basic transactions, describe my background" },
  { level: "B1", label: "B1", desc: "Intermediate",       examples: "Can travel in English, express opinions on familiar topics" },
  { level: "B2", label: "B2", desc: "Upper-Intermediate", examples: "Can understand complex texts, converse fluently with natives" },
  { level: "C1", label: "C1", desc: "Advanced",           examples: "Can express ideas spontaneously and flexibly" },
  { level: "C2", label: "C2", desc: "Mastery",            examples: "Near-native proficiency, understand virtually everything" },
];

// ============================================================
// DESTINATIONS
// ============================================================

const COUNTRIES_BY_REGION: Record<string, { code: string; name: string; flag: string }[]> = {
  "Popular Destinations": [
    { code: "GB",     name: "United Kingdom",       flag: "🇬🇧" },
    { code: "US",     name: "United States",        flag: "🇺🇸" },
    { code: "AU",     name: "Australia",            flag: "🇦🇺" },
    { code: "CA",     name: "Canada",               flag: "🇨🇦" },
    { code: "SG",     name: "Singapore",            flag: "🇸🇬" },
    { code: "NZ",     name: "New Zealand",          flag: "🇳🇿" },
  ],
  "Europe": [
    { code: "DE", name: "Germany",      flag: "🇩🇪" },
    { code: "FR", name: "France",       flag: "🇫🇷" },
    { code: "NL", name: "Netherlands",  flag: "🇳🇱" },
    { code: "SE", name: "Sweden",       flag: "🇸🇪" },
    { code: "NO", name: "Norway",       flag: "🇳🇴" },
    { code: "DK", name: "Denmark",      flag: "🇩🇰" },
    { code: "CH", name: "Switzerland",  flag: "🇨🇭" },
    { code: "IE", name: "Ireland",      flag: "🇮🇪" },
    { code: "ES", name: "Spain",        flag: "🇪🇸" },
    { code: "IT", name: "Italy",        flag: "🇮🇹" },
  ],
  "Asia Pacific": [
    { code: "JP", name: "Japan",        flag: "🇯🇵" },
    { code: "KR", name: "South Korea",  flag: "🇰🇷" },
    { code: "MY", name: "Malaysia",     flag: "🇲🇾" },
    { code: "TH", name: "Thailand",     flag: "🇹🇭" },
    { code: "TW", name: "Taiwan",       flag: "🇹🇼" },
    { code: "HK", name: "Hong Kong",    flag: "🇭🇰" },
  ],
  "Middle East": [
    { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
    { code: "QA", name: "Qatar",                flag: "🇶🇦" },
    { code: "SA", name: "Saudi Arabia",         flag: "🇸🇦" },
  ],
  "Remote / Global": [
    { code: "REMOTE", name: "Remote Work (Global)", flag: "🌍" },
  ],
};

// ============================================================
// OBJECTIVE TREE
// ============================================================

interface ObjectiveOption {
  id: string;           // stored in DB
  label: string;
  icon: string;
  desc: string;
  // If set, user picks one sub-option before proceeding
  subLabel?: string;
  subOptions?: { id: string; label: string; flag?: string }[];
}

const STUDY_OBJECTIVES: ObjectiveOption[] = [
  {
    id: "ielts",
    label: "IELTS Mastery",
    icon: "📝",
    desc: "Comprehensive prep for Undergraduate & Postgraduate admissions",
    subLabel: "What's your target IELTS band?",
    subOptions: [
      { id: "ielts_65", label: "6.5 — Undergraduate entry" },
      { id: "ielts_70", label: "7.0 — Postgraduate programs" },
      { id: "ielts_75", label: "7.5 — Competitive programs" },
      { id: "ielts_80", label: "8.0+ — Medicine / Elite universities" },
    ],
  },
  {
    id: "toefl",
    label: "TOEFL iBT / ITP Success",
    icon: "✍️",
    desc: "US & Canada admissions, or domestic scholarship requirements",
    subLabel: "Which TOEFL format are you taking?",
    subOptions: [
      { id: "toefl_ibt",    label: "TOEFL iBT — for US/Canada universities" },
      { id: "toefl_itp",    label: "TOEFL ITP — for domestic scholarship requirements" },
      { id: "toefl_ibt_90", label: "TOEFL iBT 90+ — competitive programs" },
    ],
  },
  {
    id: "domestic_scholarship",
    label: "Domestic Scholarship Mastery",
    icon: "🎓",
    desc: "Indonesian government scholarships & student exchange programs",
    subLabel: "Which scholarship are you targeting?",
    subOptions: [
      { id: "lpdp",      label: "LPDP — Kemenkeu",               flag: "🇮🇩" },
      { id: "iisma",     label: "IISMA — Student Exchange Kemendikbud", flag: "🇮🇩" },
      { id: "beasiswa_unggulan", label: "Beasiswa Unggulan",     flag: "🇮🇩" },
      { id: "bim",       label: "Beasiswa Indonesia Maju (BIM)", flag: "🇮🇩" },
    ],
  },
  {
    id: "global_scholarship",
    label: "Global Scholarship Excellence",
    icon: "🌟",
    desc: "Prestigious international scholarships — Chevening, Fulbright, AAS, and more",
    subLabel: "Which scholarship are you targeting?",
    subOptions: [
      { id: "chevening", label: "Chevening",              flag: "🇬🇧" },
      { id: "fulbright", label: "Fulbright",              flag: "🇺🇸" },
      { id: "aas",       label: "Australia Awards (AAS)", flag: "🇦🇺" },
      { id: "mext",      label: "MEXT (Japan)",           flag: "🇯🇵" },
      { id: "gks",       label: "GKS (South Korea)",      flag: "🇰🇷" },
      { id: "gates",     label: "Gates Cambridge",        flag: "🇬🇧" },
    ],
  },
  {
    id: "academic_writing",
    label: "Academic Writing & Research",
    icon: "📄",
    desc: "Journals, thesis, abstracts, and international-standard papers",
    subLabel: "What type of academic writing?",
    subOptions: [
      { id: "aw_journal",    label: "Journal / Conference paper submission" },
      { id: "aw_thesis",     label: "Skripsi / Thesis writing" },
      { id: "aw_abstract",   label: "Abstract & literature review" },
      { id: "aw_grant",      label: "Research grant proposal" },
    ],
  },
  {
    id: "student_exchange",
    label: "Global Student Exchange Readiness",
    icon: "✈️",
    desc: "Short courses, summer programs, or international conferences",
    subLabel: "What's your exchange goal?",
    subOptions: [
      { id: "ex_summer",     label: "Summer / Winter program abroad" },
      { id: "ex_shortcourse", label: "Short course (1–3 months)" },
      { id: "ex_conference",  label: "International conference / presentation" },
      { id: "ex_exchange",    label: "Full semester student exchange" },
    ],
  },
  {
    id: "ivy_admissions",
    label: "Ivy League & Top-Tier Admissions",
    icon: "🏛️",
    desc: "Oxford, Cambridge, Stanford, Harvard — elite university prep",
    subLabel: "Which university tier are you targeting?",
    subOptions: [
      { id: "ivy_oxbridge",  label: "Oxford / Cambridge",          flag: "🇬🇧" },
      { id: "ivy_us",        label: "Ivy League (Harvard, MIT, Stanford…)", flag: "🇺🇸" },
      { id: "ivy_qs_50",     label: "QS Top 50 globally" },
      { id: "ivy_qs_100",    label: "QS Top 100 globally" },
    ],
  },
  {
    id: "school_finals",
    label: "Academic English for School / Uni Finals",
    icon: "📚",
    desc: "Ace English exams — SMA/SMK subjects, MKWU university courses, and UAS",
    subLabel: "What level are you studying at?",
    subOptions: [
      { id: "fin_sma",    label: "SMA / SMK — Ujian sekolah & UNBK" },
      { id: "fin_d3",     label: "Diploma D3 — Bahasa Inggris Bisnis" },
      { id: "fin_s1",     label: "S1 — MKWU & mata kuliah umum" },
      { id: "fin_s2",     label: "S2 / S3 — Academic English requirements" },
    ],
  },
];

const WORK_OBJECTIVES: ObjectiveOption[] = [
  {
    id: "interview_mastery",
    label: "Professional Interview Mastery",
    icon: "🤝",
    desc: "Answer interview questions confidently for MNC & global companies",
    subLabel: "What type of interview are you preparing for?",
    subOptions: [
      { id: "iv_mnc",       label: "Multinational Company (MNC) interviews" },
      { id: "iv_startup",   label: "Global Startup / Tech company" },
      { id: "iv_consult",   label: "Consulting firm (McKinsey, BCG, etc.)" },
      { id: "iv_banking",   label: "Investment banking / Finance" },
    ],
  },
  {
    id: "remote_work",
    label: "English for Remote Work",
    icon: "💻",
    desc: "Slack, Zoom, async comms for distributed global teams",
    subLabel: "What's your remote work focus?",
    subOptions: [
      { id: "rw_async",     label: "Async communication (Slack, email, docs)" },
      { id: "rw_video",     label: "Video calls & Zoom meetings" },
      { id: "rw_writing",   label: "Professional writing & documentation" },
      { id: "rw_all",       label: "All of the above — full remote toolkit" },
    ],
  },
  {
    id: "public_speaking",
    label: "Public Speaking & Business Presentation",
    icon: "🎤",
    desc: "Present ideas, monthly reports, and project updates with confidence",
    subLabel: "What type of presentations?",
    subOptions: [
      { id: "ps_internal",  label: "Internal team presentations / standups" },
      { id: "ps_client",    label: "Client-facing presentations" },
      { id: "ps_conference", label: "International conference talks" },
      { id: "ps_board",     label: "Board / C-suite executive presentations" },
    ],
  },
  {
    id: "whv",
    label: "Working Holiday Visa (WHV) Preparation",
    icon: "🌏",
    desc: "Functional English + minimum scores for AU/NZ working holiday",
    subLabel: "Which country's WHV?",
    subOptions: [
      { id: "whv_au", label: "Australia WHV", flag: "🇦🇺" },
      { id: "whv_nz", label: "New Zealand WHV", flag: "🇳🇿" },
      { id: "whv_uk", label: "UK Youth Mobility Scheme", flag: "🇬🇧" },
      { id: "whv_ca", label: "Canada IEC Working Holiday", flag: "🇨🇦" },
    ],
  },
  {
    id: "freelancing",
    label: "Freelancing & Digital Nomadism",
    icon: "🚀",
    desc: "Pitch on Upwork/Fiverr, negotiate rates, manage international clients",
    subLabel: "What's your freelance focus?",
    subOptions: [
      { id: "fl_pitch",     label: "Client pitching & proposals" },
      { id: "fl_negotiate", label: "Rate negotiation & contracts" },
      { id: "fl_content",   label: "Content writing / copywriting for global clients" },
      { id: "fl_tech",      label: "Tech freelance (dev, design, data)" },
    ],
  },
  {
    id: "leadership_english",
    label: "Leadership & Managerial English",
    icon: "👔",
    desc: "Negotiate, manage conflict, and lead cross-cultural teams",
    subLabel: "What leadership area?",
    subOptions: [
      { id: "le_negotiation", label: "Negotiation & deal-making" },
      { id: "le_conflict",    label: "Conflict resolution & feedback" },
      { id: "le_crosscult",   label: "Cross-cultural team management" },
      { id: "le_strategy",    label: "Strategic communication & vision-casting" },
    ],
  },
  {
    id: "technical_english",
    label: "Technical English for Industry",
    icon: "⚙️",
    desc: "Industry-specific vocabulary: IT, Healthcare, Engineering, Marketing",
    subLabel: "Which industry?",
    subOptions: [
      { id: "te_tech",       label: "Tech / Software Engineering",  flag: "💻" },
      { id: "te_health",     label: "Healthcare & Medical",         flag: "🏥" },
      { id: "te_engineering", label: "Engineering & Manufacturing",  flag: "🔧" },
      { id: "te_marketing",  label: "Marketing & Creative",         flag: "📣" },
      { id: "te_finance",    label: "Finance & Accounting",         flag: "💰" },
      { id: "te_legal",      label: "Legal & Compliance",           flag: "⚖️" },
    ],
  },
  {
    id: "startup_pitching",
    label: "Global Business Pitching",
    icon: "💡",
    desc: "Pitch your startup idea at international competitions & investor meetings",
    subLabel: "What's your pitching context?",
    subOptions: [
      { id: "sp_competition", label: "Startup competition (global / regional)" },
      { id: "sp_investor",    label: "Investor / VC meetings" },
      { id: "sp_accelerator", label: "Accelerator program application" },
      { id: "sp_corporate",   label: "Corporate innovation pitch" },
    ],
  },
];

// ============================================================
// DIFFICULTY STYLES
// ============================================================

const DIFFICULTY_STYLES = {
  easy:        { bg: "bg-green-50",  border: "border-green-200",  text: "text-green-800",  badge: "bg-green-100 text-green-700 border-green-200" },
  moderate:    { bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-800",   badge: "bg-blue-100 text-blue-700 border-blue-200" },
  challenging: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", badge: "bg-orange-100 text-orange-700 border-orange-200" },
  extreme:     { bg: "bg-red-50",    border: "border-red-200",    text: "text-red-800",    badge: "bg-red-100 text-red-700 border-red-200" },
  impossible:  { bg: "bg-gray-900",  border: "border-gray-700",   text: "text-gray-100",   badge: "bg-gray-800 text-gray-300 border-gray-600" },
} as const;

// ============================================================
// FORM STATE
// ============================================================

interface FormData {
  countries:      string[];
  purpose:        "study" | "work" | "";
  objectiveId:    string;   // e.g. "ielts"
  subOptionId:    string;   // e.g. "ielts_70"
  currentCEFR:    CEFRLevel | "";
  targetCEFR:     CEFRLevel | "";
  target_months:  string;
}

// ============================================================
// COMPONENT
// ============================================================

export default function GoalWizard({ userId, onClose, onSuccess }: GoalWizardProps) {
  const [step, setStep]         = useState(1);
  const [mounted, setMounted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [goalCount, setGoalCount]   = useState<number | null>(null); // current active goals

  const [formData, setFormData] = useState<FormData>({
    countries:     [],
    purpose:       "",
    objectiveId:   "",
    subOptionId:   "",
    currentCEFR:   "",
    targetCEFR:    "",
    target_months: "",
  });

  const [studyPlan, setStudyPlan] = useState<StudyPlanResult | null>(null);

  // ── Mount + check goal count ─────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";

    // Check how many goals the user already has
    getUserGoals(userId).then((goals) => setGoalCount(goals.length));

    return () => { document.body.style.overflow = "unset"; };
  }, [userId]);

  // ── Derived helpers ──────────────────────────────────────────────────────

  const allObjectives    = formData.purpose === "study" ? STUDY_OBJECTIVES : WORK_OBJECTIVES;
  const selectedObj      = allObjectives.find((o) => o.id === formData.objectiveId) ?? null;
  const requiresSub      = !!selectedObj?.subOptions?.length;
  const hasSubSelected   = !requiresSub || !!formData.subOptionId;

  // The value we actually store in DB as "objective"
  const objectiveLabel = selectedObj
    ? selectedObj.subOptions
        ?.find((s) => s.id === formData.subOptionId)?.label
        ? `${selectedObj.label} — ${selectedObj.subOptions?.find((s) => s.id === formData.subOptionId)?.label}`
        : selectedObj.label
    : "";

  const currentIELTS     = formData.currentCEFR ? CEFR_TO_IELTS[formData.currentCEFR as CEFRLevel] : 0;
  const targetIELTS      = formData.targetCEFR  ? CEFR_TO_IELTS[formData.targetCEFR  as CEFRLevel] : 0;
  const isImpossible     = studyPlan?.difficultyLevel === "impossible";
  const isGoalLimitHit   = goalCount !== null && goalCount >= 3;

  const validTargetLevels = CEFR_LEVELS.filter((l) =>
    formData.currentCEFR
      ? CEFR_LEVELS.findIndex((x) => x.level === l.level) >
        CEFR_LEVELS.findIndex((x) => x.level === formData.currentCEFR)
      : true
  );

  // ── Navigation guards ────────────────────────────────────────────────────

  const canProceed = (): boolean => {
    if (step === 1) return formData.countries.length > 0;
    if (step === 2) return !!formData.purpose;
    if (step === 3) return !!formData.objectiveId && hasSubSelected;
    if (step === 4) return !!formData.currentCEFR && !!formData.targetCEFR && !!formData.target_months;
    return true;
  };

  const handleNext = () => {
    if (step === 4 && formData.currentCEFR && formData.targetCEFR && formData.target_months) {
      const plan = calculateStudyPlan(
        objectiveLabel,
        { cefr: formData.currentCEFR as CEFRLevel },
        { cefr: formData.targetCEFR  as CEFRLevel },
        parseInt(formData.target_months),
        true
      );
      setStudyPlan(plan);
    }
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => { if (step > 1) setStep(step - 1); };

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!studyPlan?.canCreateGoal || isGoalLimitHit) return;
    setSubmitting(true);
    try {
      const deadline = new Date();
      deadline.setMonth(deadline.getMonth() + parseInt(formData.target_months));

      const result = await createGoal(userId, {
        destination:     formData.countries.join(", "),
        objective:       objectiveLabel,
        target_deadline: deadline.toISOString().split("T")[0],
        timeline_months: parseInt(formData.target_months),
        currentCEFR:     formData.currentCEFR as CEFRLevel,
        targetCEFR:      formData.targetCEFR  as CEFRLevel,
        currentIELTS,
        targetIELTS,
      });

      if (result) onSuccess();
    } catch (err) {
      console.error("GoalWizard submit error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  const diffStyle = studyPlan
    ? DIFFICULTY_STYLES[studyPlan.difficultyLevel]
    : DIFFICULTY_STYLES.moderate;

  // ── GOAL LIMIT WALL ────────────────────────────────────────────────────────

  if (isGoalLimitHit) {
    return createPortal(
      <div className="fixed inset-0 bg-[#2F4157]/90 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl p-8 text-center space-y-5">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle size={32} className="text-orange-500" />
          </div>
          <h2 className="text-2xl font-black text-[#2F4157]">Goal Limit Reached</h2>
          <p className="text-gray-500 leading-relaxed">
            You already have <strong>3 active goals</strong> — the maximum we allow to keep you focused
            and avoid overwhelm. Complete or delete an existing goal before creating a new one.
          </p>
          <div className="pt-2 flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#E56668] text-white rounded-xl font-bold hover:bg-[#C04C4E] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  // ── MAIN WIZARD ────────────────────────────────────────────────────────────

  return createPortal(
    <div className="fixed inset-0 bg-[#2F4157]/90 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-white rounded-none sm:rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden h-[100dvh] sm:h-auto sm:max-h-[90vh] flex flex-col">

        {/* ── Header ── */}
        <div className="bg-gradient-to-r from-[#E56668] to-[#C04C4E] p-6 text-white relative overflow-hidden flex-shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors z-50"
          >
            <X size={20} />
          </button>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Target size={24} />
              <span className="text-sm font-semibold uppercase tracking-wide">Goal Setting Wizard</span>
            </div>
            <h2 className="text-2xl font-bold">Let's Build Your Learning Journey</h2>
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div className="px-6 pt-5 flex-shrink-0">
          <div className="flex justify-between mb-1.5 text-xs font-semibold text-gray-500">
            <span>Step {step} of 5</span>
            <span className="text-[#E56668]">{Math.round((step / 5) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#E56668] to-[#C04C4E] h-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* ── Scrollable content ── */}
        <div className="p-4 sm:p-8 overflow-y-auto overflow-x-hidden flex-1 min-h-0">

          {/* ===== STEP 1: DESTINATION ===== */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-2xl font-bold text-[#2F4157] mb-1 flex items-center gap-2">
                  <Globe size={26} className="text-[#E56668]" /> Where do you want to go? 🌍
                </h3>
                <p className="text-gray-500 text-sm">Select up to 3 destinations.</p>
              </div>

              {Object.entries(COUNTRIES_BY_REGION).map(([region, countries]) => (
                <div key={region} className="space-y-2">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">{region}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {countries.map((c) => {
                      const sel = formData.countries.includes(c.name);
                      const ok  = formData.countries.length < 3 || sel;
                      return (
                        <button
                          key={c.code}
                          onClick={() => {
                            if (sel) {
                              setFormData({ ...formData, countries: formData.countries.filter((x) => x !== c.name) });
                            } else if (ok) {
                              setFormData({ ...formData, countries: [...formData.countries, c.name] });
                            }
                          }}
                          disabled={!ok}
                          className={`relative p-3 rounded-xl border-2 text-left transition-all ${
                            sel
                              ? "border-[#E56668] bg-[#E56668]/5 ring-2 ring-[#E56668]/20 shadow-sm"
                              : ok
                              ? "border-gray-200 hover:border-[#E56668]/50 hover:bg-gray-50"
                              : "border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed"
                          }`}
                        >
                          {sel && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-[#E56668] rounded-full flex items-center justify-center">
                              <Check size={12} className="text-white" strokeWidth={3} />
                            </div>
                          )}
                          <span className="text-xl mr-2">{c.flag}</span>
                          <span className="font-semibold text-sm text-[#2F4157]">{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {formData.countries.length > 0 && (
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-sm text-blue-900">
                  <strong>Selected ({formData.countries.length}/3):</strong> {formData.countries.join(", ")}
                </div>
              )}
            </div>
          )}

          {/* ===== STEP 2: PURPOSE ===== */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-2xl font-bold text-[#2F4157] mb-1">What's your main purpose? 🎯</h3>
                <p className="text-gray-500 text-sm">This shapes which goals we offer you.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { value: "study", label: "Study & Academic",         Icon: GraduationCap, desc: "Scholarships, admissions, academic English" },
                  { value: "work",  label: "Career & Professional",    Icon: Briefcase,     desc: "Remote work, interviews, business English" },
                ].map(({ value, label, Icon, desc }) => (
                  <button
                    key={value}
                    onClick={() => setFormData({ ...formData, purpose: value as "study" | "work", objectiveId: "", subOptionId: "" })}
                    className={`p-8 rounded-2xl border-2 text-center transition-all ${
                      formData.purpose === value
                        ? "border-[#E56668] bg-[#E56668]/5 shadow-lg scale-105"
                        : "border-gray-200 hover:border-[#E56668]/50 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={44} className={`mx-auto mb-4 ${formData.purpose === value ? "text-[#E56668]" : "text-gray-400"}`} />
                    <h4 className="font-bold text-xl text-[#2F4157] mb-1">{label}</h4>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ===== STEP 3: OBJECTIVE + SUB-OPTION ===== */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              {/* Objective picker */}
              {!formData.objectiveId ? (
                <>
                  <div>
                    <h3 className="text-2xl font-bold text-[#2F4157] mb-1">What's your specific goal? 🎯</h3>
                    <p className="text-gray-500 text-sm">
                      Choose from {formData.purpose === "study" ? "academic" : "career"} goals below.
                    </p>
                  </div>
                  <div className="space-y-2">
                    {allObjectives.map((obj) => (
                      <button
                        key={obj.id}
                        onClick={() => setFormData({ ...formData, objectiveId: obj.id, subOptionId: "" })}
                        className="w-full p-4 rounded-xl border-2 border-gray-200 text-left hover:border-[#E56668]/60 hover:bg-gray-50 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{obj.icon}</span>
                          <div>
                            <p className="font-bold text-[#2F4157]">{obj.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{obj.desc}</p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-300 group-hover:text-[#E56668] transition-colors shrink-0" />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                /* Sub-option picker */
                <>
                  <button
                    onClick={() => setFormData({ ...formData, objectiveId: "", subOptionId: "" })}
                    className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#E56668] transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Back to objectives
                  </button>

                  <div className="flex items-center gap-3 p-4 bg-[#E56668]/5 rounded-2xl border border-[#E56668]/20">
                    <span className="text-3xl">{selectedObj!.icon}</span>
                    <div>
                      <p className="font-bold text-[#2F4157]">{selectedObj!.label}</p>
                      <p className="text-xs text-gray-500">{selectedObj!.desc}</p>
                    </div>
                  </div>

                  {requiresSub ? (
                    <>
                      <div>
                        <h3 className="text-lg font-bold text-[#2F4157] mb-1">{selectedObj!.subLabel}</h3>
                        <p className="text-gray-500 text-sm">Pick the option that best fits your situation.</p>
                      </div>
                      <div className="space-y-2">
                        {selectedObj!.subOptions!.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => setFormData({ ...formData, subOptionId: sub.id })}
                            className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                              formData.subOptionId === sub.id
                                ? "border-[#E56668] bg-[#E56668]/5 shadow-md"
                                : "border-gray-200 hover:border-[#E56668]/50 hover:bg-gray-50"
                            }`}
                          >
                            {sub.flag && <span className="text-2xl">{sub.flag}</span>}
                            <p className="font-semibold text-[#2F4157]">{sub.label}</p>
                            {formData.subOptionId === sub.id && (
                              <Check size={18} className="ml-auto text-[#E56668]" strokeWidth={3} />
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    /* No sub-options — auto-proceed notice */
                    <div className="p-4 bg-green-50 rounded-xl border border-green-200 text-sm text-green-800">
                      ✅ Great choice! Click <strong>Next</strong> to continue.
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* ===== STEP 4: LEVEL + TIMELINE ===== */}
          {step === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-2xl font-bold text-[#2F4157] mb-1">Your level & timeline ⏱️</h3>
                <p className="text-gray-500 text-sm">We'll calculate exactly how many minutes/day you need</p>
              </div>

              {/* Current CEFR */}
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <label className="text-sm font-bold text-gray-700">Your Current English Level (CEFR)</label>
                  <a
                    href="https://forms.gle/97a2MGc4VfvTtLyj8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-[#E56668] hover:text-[#C04C4E] transition-colors group"
                  >
                    <HelpCircle size={14} />
                    Not sure? Take placement test
                    <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {CEFR_LEVELS.map(({ level, label, desc, examples }) => (
                    <button
                      key={level}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          currentCEFR: level,
                          targetCEFR:
                            formData.targetCEFR &&
                            cefrGap(level, formData.targetCEFR as CEFRLevel) > 0
                              ? formData.targetCEFR
                              : "",
                        })
                      }
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        formData.currentCEFR === level
                          ? "border-[#E56668] bg-[#E56668]/5 shadow-md ring-2 ring-[#E56668]/20"
                          : "border-gray-200 hover:border-[#E56668]/50 hover:bg-gray-50"
                      }`}
                    >
                      <span className={`text-xs font-black px-2 py-0.5 rounded-full inline-block mb-2 ${
                        formData.currentCEFR === level ? "bg-[#E56668] text-white" : "bg-gray-100 text-gray-600"
                      }`}>
                        {label}
                      </span>
                      <p className="font-bold text-sm text-[#2F4157]">{desc}</p>
                      <p className="text-xs text-gray-400 mt-1 leading-snug line-clamp-2">{examples}</p>
                      <div className="mt-2 text-[10px] text-gray-400 font-medium">≈ IELTS {CEFR_TO_IELTS[level]}</div>
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
                  <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    <strong>Quick IELTS → CEFR mapping:</strong> 4.0–4.5 = B1 · 5.5–6.0 = B2 · 7.0+ = C1.{" "}
                    <a href="https://forms.gle/97a2MGc4VfvTtLyj8" target="_blank" rel="noopener noreferrer"
                      className="font-bold underline hover:text-blue-900">
                      Take our placement test →
                    </a>
                  </p>
                </div>
              </div>

              {/* Target CEFR */}
              {formData.currentCEFR && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <label className="block text-sm font-bold text-gray-700">Your Target English Level</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {validTargetLevels.map(({ level, label, desc }) => {
                      const gap = cefrGap(formData.currentCEFR as CEFRLevel, level);
                      return (
                        <button
                          key={level}
                          onClick={() => setFormData({ ...formData, targetCEFR: level })}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            formData.targetCEFR === level
                              ? "border-[#E56668] bg-[#E56668]/5 shadow-md ring-2 ring-[#E56668]/20"
                              : "border-gray-200 hover:border-[#E56668]/50 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                              formData.targetCEFR === level ? "bg-[#E56668] text-white" : "bg-gray-100 text-gray-600"
                            }`}>
                              {label}
                            </span>
                            {gap === 1 && (
                              <span className="text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-full">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className="font-bold text-sm text-[#2F4157]">{desc}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            ≈ IELTS {CEFR_TO_IELTS[level]} · {gap} level{gap > 1 ? "s" : ""} up
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Timeline */}
              {formData.currentCEFR && formData.targetCEFR && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <label className="block text-sm font-bold text-gray-700">How long do you have?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "3",  label: "3 Months",  desc: "Intensive" },
                      { value: "6",  label: "6 Months",  desc: "Balanced", rec: true },
                      { value: "9",  label: "9 Months",  desc: "Steady" },
                      { value: "12", label: "12 Months", desc: "Comprehensive" },
                    ].map((t) => (
                      <button
                        key={t.value}
                        onClick={() => setFormData({ ...formData, target_months: t.value })}
                        className={`relative p-4 rounded-xl border-2 text-center transition-all ${
                          formData.target_months === t.value
                            ? "border-[#E56668] bg-[#E56668]/5 shadow-lg scale-105"
                            : "border-gray-200 hover:border-[#E56668]/50 hover:bg-gray-50"
                        }`}
                      >
                        {t.rec && (
                          <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                            <Sparkles size={9} /> Best
                          </span>
                        )}
                        <Calendar className="mx-auto mb-2 text-[#E56668]" size={22} />
                        <p className="font-bold text-sm text-[#2F4157]">{t.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                      </button>
                    ))}
                  </div>

                  {formData.target_months && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3 animate-in fade-in duration-200">
                      <Sparkles size={16} className="text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-800">
                        <strong>{formData.currentCEFR} → {formData.targetCEFR}</strong> in{" "}
                        <strong>{formData.target_months} months.</strong> Click{" "}
                        <strong>"Calculate Plan"</strong> to see your exact daily study requirement.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ===== STEP 5: STUDY PLAN REVIEW ===== */}
          {step === 5 && studyPlan && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-2xl font-bold text-[#2F4157] mb-1">Your Personalised Study Plan 📋</h3>
                <p className="text-gray-500 text-sm">Based on Cambridge CEFR benchmarks and IELS learner data</p>
              </div>

              {/* Summary card */}
              <div className="bg-gradient-to-br from-[#2F4157] to-[#1e2b3a] rounded-2xl p-6 text-white">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-wide mb-1">Destination</p>
                    <p className="font-bold text-sm">{formData.countries.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-wide mb-1">Goal</p>
                    <p className="font-bold text-sm leading-snug">{objectiveLabel}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-wide mb-1">Level Journey</p>
                    <p className="font-bold flex items-center gap-2">
                      {studyPlan.currentCEFR}
                      <ArrowRight size={14} className="text-[#E56668]" />
                      {studyPlan.targetCEFR}
                    </p>
                    <p className="text-white/30 text-xs">IELTS {studyPlan.currentIELTS} → {studyPlan.targetIELTS}</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-wide mb-1">Total Hours</p>
                    <p className="font-bold">{studyPlan.totalHoursNeeded} hours</p>
                    <p className="text-white/30 text-xs">Cambridge benchmark</p>
                  </div>
                </div>
              </div>

              {/* IMPOSSIBLE blocker */}
              {isImpossible && (
                <div className="rounded-2xl border-2 border-gray-700 bg-gray-900 p-6 flex gap-4">
                  <Ban size={32} className="text-red-400 shrink-0 mt-1" />
                  <div className="space-y-3">
                    <h4 className="text-lg font-extrabold text-white">This Goal Can't Be Created</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{studyPlan.recommendation}</p>
                    <div className="space-y-2 text-sm text-gray-400 pt-1">
                      {[
                        "Extend your timeline (9 or 12 months)",
                        "Reduce the gap — target one CEFR level at a time",
                        "Go back and adjust your settings",
                      ].map((s) => (
                        <p key={s} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" /> {s}
                        </p>
                      ))}
                    </div>
                    <button
                      onClick={handleBack}
                      className="mt-1 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft size={16} /> Go Back & Adjust
                    </button>
                  </div>
                </div>
              )}

              {/* Daily plan — not impossible */}
              {!isImpossible && (
                <>
                  <div className={`rounded-2xl p-6 border ${diffStyle.bg} ${diffStyle.border}`}>
                    <h4 className={`font-bold mb-4 flex items-center gap-2 ${diffStyle.text}`}>
                      <Sparkles size={18} /> Daily Study Requirement
                    </h4>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[
                        { val: studyPlan.breakdown.selfStudy.minutesPerDay, label: "Self-Study min/day" },
                        { val: studyPlan.dailyMinutesRequired,              label: "Total min/day" },
                        { val: studyPlan.weeklyHoursRequired,               label: "Hours / week" },
                      ].map((item) => (
                        <div key={item.label} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                          <p className="text-3xl font-extrabold text-[#E56668]">{item.val}</p>
                          <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wide">{item.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${diffStyle.badge}`}>
                        {studyPlan.difficultyLevel}
                      </span>
                    </div>

                    <div className={`p-4 rounded-xl border text-sm font-medium ${diffStyle.bg} ${diffStyle.border} ${diffStyle.text}`}>
                      {studyPlan.recommendation}
                    </div>
                  </div>

                  {/* Speaking Club */}
                  <div className="bg-[#E56668]/5 rounded-2xl p-6 border border-[#E56668]/20">
                    <h4 className="font-bold text-[#2F4157] mb-2">🎤 Speaking Club Contribution</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Mon–Wed–Fri sessions cover{" "}
                      <strong>{studyPlan.speakingClubImpact.contributionPercentage}%</strong> of your weekly
                      learning target — significantly cutting your solo study load.
                    </p>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      {[
                        { val: studyPlan.speakingClubImpact.totalSessions, label: "Total Sessions" },
                        { val: studyPlan.breakdown.speakingClubs.weeklyMinutes, label: "Mins/Week" },
                        { val: `${studyPlan.speakingClubImpact.contributionPercentage}%`, label: "Weekly Target" },
                      ].map((item) => (
                        <div key={item.label}>
                          <p className="text-2xl font-bold text-[#E56668]">{item.val}</p>
                          <p className="text-xs text-gray-500">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weekly breakdown */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-bold text-[#2F4157] mb-4">Weekly Activity Breakdown</h4>
                    <div className="space-y-2">
                      {[
                        { label: "Self-Study",            val: `${studyPlan.breakdown.selfStudy.minutesPerDay} min/day × ${studyPlan.breakdown.selfStudy.daysPerWeek} days` },
                        { label: "Speaking Club (Pro)",   val: "90 min × 3 sessions/week" },
                        { label: "Mentor Sessions (Pro)", val: `${studyPlan.breakdown.mentorSessions.minutesPerSession} min × 2/month` },
                        { label: "Assignments",           val: `${studyPlan.breakdown.assignments.minutesPerAssignment} min × ${studyPlan.breakdown.assignments.perWeek}/week` },
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                          <span className="text-sm text-gray-600">{row.label}</span>
                          <span className="text-sm font-bold text-[#2F4157]">{row.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-5 flex items-center justify-between gap-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-2 px-5 py-2.5 text-gray-500 hover:text-gray-800 font-semibold disabled:opacity-0 disabled:cursor-not-allowed transition-all text-sm"
          >
            <ChevronLeft size={18} /> Back
          </button>

          {step < 5 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-7 py-3 bg-[#E56668] text-white rounded-xl font-bold hover:bg-[#C04C4E] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg disabled:shadow-none text-sm"
            >
              {step === 4 ? "Calculate Plan" : "Next"}
              <ChevronRight size={18} />
            </button>
          ) : isImpossible ? (
            <div className="flex items-center gap-3">
              <p className="text-xs text-gray-400 font-medium hidden sm:block">Adjust settings to continue</p>
              <button disabled className="flex items-center gap-2 px-7 py-3 bg-gray-200 text-gray-400 rounded-xl font-bold cursor-not-allowed text-sm">
                <Ban size={16} /> Cannot Create Goal
              </button>
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#E56668] to-[#C04C4E] text-white rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Target size={18} /> Create My Goal
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}