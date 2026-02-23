"use client";

import { useState, useEffect } from "react";
import {
  X, ChevronRight, ChevronLeft, Target, Calendar,
  Sparkles, Globe, GraduationCap, Briefcase, Check,
  ExternalLink, HelpCircle, ArrowRight, Info, Ban,
} from "lucide-react";
import { createGoal, getGoalTemplates } from "@/data/goals";
import {
  calculateStudyPlan,
  type CEFRLevel,
  type StudyPlanResult,
  CEFR_TO_IELTS,
  CEFR_LABELS,
  cefrGap,
} from "@/data/progress-calculator";
import type { GoalTemplate } from "@/types/goals";
import { createPortal } from "react-dom";

interface GoalWizardProps {
  userId: string;
  onClose: () => void;
  onSuccess: () => void;
}

// ============================================
// CEFR DATA
// ============================================

const CEFR_LEVELS: {
  level: CEFRLevel;
  label: string;
  desc: string;
  examples: string;
}[] = [
  { level: 'A1', label: 'A1', desc: 'Beginner',           examples: 'Can introduce myself, understand simple words' },
  { level: 'A2', label: 'A2', desc: 'Elementary',         examples: 'Can handle simple transactions, describe my background' },
  { level: 'B1', label: 'B1', desc: 'Intermediate',       examples: 'Can travel in English, express opinions on familiar topics' },
  { level: 'B2', label: 'B2', desc: 'Upper-Intermediate', examples: 'Can understand complex texts, speak fluently with native speakers' },
  { level: 'C1', label: 'C1', desc: 'Advanced',           examples: 'Can express spontaneously, use language flexibly and effectively' },
  { level: 'C2', label: 'C2', desc: 'Mastery',            examples: 'Near-native proficiency, understand virtually everything' },
];

// ============================================
// DESTINATIONS
// ============================================

const COUNTRIES_BY_REGION = {
  "Popular Destinations": [
    { code: "GB", name: "United Kingdom",  flag: "🇬🇧" },
    { code: "US", name: "United States",   flag: "🇺🇸" },
    { code: "AU", name: "Australia",       flag: "🇦🇺" },
    { code: "CA", name: "Canada",          flag: "🇨🇦" },
    { code: "SG", name: "Singapore",       flag: "🇸🇬" },
    { code: "NZ", name: "New Zealand",     flag: "🇳🇿" },
  ],
  "Europe": [
    { code: "DE", name: "Germany",         flag: "🇩🇪" },
    { code: "FR", name: "France",          flag: "🇫🇷" },
    { code: "NL", name: "Netherlands",     flag: "🇳🇱" },
    { code: "SE", name: "Sweden",          flag: "🇸🇪" },
    { code: "NO", name: "Norway",          flag: "🇳🇴" },
    { code: "DK", name: "Denmark",         flag: "🇩🇰" },
    { code: "CH", name: "Switzerland",     flag: "🇨🇭" },
    { code: "IE", name: "Ireland",         flag: "🇮🇪" },
    { code: "ES", name: "Spain",           flag: "🇪🇸" },
    { code: "IT", name: "Italy",           flag: "🇮🇹" },
  ],
  "Asia Pacific": [
    { code: "JP", name: "Japan",           flag: "🇯🇵" },
    { code: "KR", name: "South Korea",     flag: "🇰🇷" },
    { code: "MY", name: "Malaysia",        flag: "🇲🇾" },
    { code: "TH", name: "Thailand",        flag: "🇹🇭" },
    { code: "TW", name: "Taiwan",          flag: "🇹🇼" },
    { code: "HK", name: "Hong Kong",       flag: "🇭🇰" },
  ],
  "Middle East": [
    { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
    { code: "QA", name: "Qatar",           flag: "🇶🇦" },
    { code: "SA", name: "Saudi Arabia",    flag: "🇸🇦" },
  ],
  "Remote/Global": [
    { code: "REMOTE", name: "Remote Work (Global)", flag: "🌍" },
  ],
};

// ============================================
// OBJECTIVES
// ============================================

const STUDY_OBJECTIVES = [
  { value: "Get IELTS 6.5+",             label: "IELTS 6.5+",             icon: "📝", desc: "General undergraduate entry" },
  { value: "Get IELTS 7.0+",             label: "IELTS 7.0+",             icon: "📝", desc: "Postgraduate programs" },
  { value: "Get IELTS 8.0+",             label: "IELTS 8.0+",             icon: "🎯", desc: "Top-tier universities / Medicine" },
  { value: "Get TOEFL 90+",              label: "TOEFL 90+",              icon: "✍️", desc: "US & Canada universities" },
  { value: "Win LPDP Scholarship",       label: "LPDP Scholarship",       icon: "🎓", desc: "Indonesian government scholarship" },
  { value: "Win Chevening Scholarship",  label: "Chevening Scholarship",  icon: "🇬🇧", desc: "UK government scholarship" },
  { value: "Win Fulbright Scholarship",  label: "Fulbright Scholarship",  icon: "🇺🇸", desc: "US government scholarship" },
];

const WORK_OBJECTIVES = [
  { value: "Get Remote Job",             label: "Remote Work English",     icon: "💼", desc: "Global companies & startups" },
  { value: "Work in Tech Industry",      label: "Tech Industry English",   icon: "💻", desc: "Software, data, IT roles" },
  { value: "Work in Healthcare",         label: "Healthcare English",      icon: "🏥", desc: "Medical & healthcare professionals" },
  { value: "Business English Fluency",   label: "Business Fluency",        icon: "📊", desc: "Corporate & professional environment" },
  { value: "Fluent Conversation",        label: "General Conversation",    icon: "💬", desc: "Everyday & social communication" },
];

// ============================================
// DIFFICULTY COLOUR MAP
// ============================================

const DIFFICULTY_STYLES = {
  easy:        { bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-800',  badge: 'bg-green-100 text-green-700 border-green-200' },
  moderate:    { bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-800',   badge: 'bg-blue-100 text-blue-700 border-blue-200' },
  challenging: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', badge: 'bg-orange-100 text-orange-700 border-orange-200' },
  extreme:     { bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-800',    badge: 'bg-red-100 text-red-700 border-red-200' },
  impossible:  { bg: 'bg-gray-900',  border: 'border-gray-700',   text: 'text-gray-100',   badge: 'bg-gray-800 text-gray-300 border-gray-600' },
} as const;

// ============================================
// COMPONENT
// ============================================

export default function GoalWizard({ userId, onClose, onSuccess }: GoalWizardProps) {
  const [step, setStep]           = useState(1);
  const [templates, setTemplates] = useState<GoalTemplate[]>([]);
  const [mounted, setMounted]     = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    countries:    [] as string[],
    purpose:      "" as "study" | "work" | "",
    objective:    "",
    currentCEFR:  "" as CEFRLevel | "",
    targetCEFR:   "" as CEFRLevel | "",
    target_months: "",
  });

  const [studyPlan, setStudyPlan] = useState<StudyPlanResult | null>(null);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    getGoalTemplates().then(setTemplates);
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // ── Derived ───────────────────────────────────────────────────────────────

  const currentIELTS = formData.currentCEFR ? CEFR_TO_IELTS[formData.currentCEFR] : 0;
  const targetIELTS  = formData.targetCEFR  ? CEFR_TO_IELTS[formData.targetCEFR]  : 0;

  const validTargetLevels = CEFR_LEVELS.filter(l =>
    formData.currentCEFR
      ? CEFR_LEVELS.findIndex(x => x.level === l.level) >
        CEFR_LEVELS.findIndex(x => x.level === formData.currentCEFR)
      : true
  );

  const isImpossible = studyPlan?.difficultyLevel === 'impossible';

  // ── Navigation ────────────────────────────────────────────────────────────

  const canProceed = (): boolean => {
    if (step === 1) return formData.countries.length > 0;
    if (step === 2) return !!formData.purpose;
    if (step === 3) return !!formData.objective;
    if (step === 4) return !!formData.currentCEFR && !!formData.targetCEFR && !!formData.target_months;
    return true;
  };

  const handleNext = () => {
    if (step === 4 && formData.currentCEFR && formData.targetCEFR && formData.target_months) {
      const plan = calculateStudyPlan(
        formData.objective,
        { cefr: formData.currentCEFR as CEFRLevel },
        { cefr: formData.targetCEFR  as CEFRLevel },
        parseInt(formData.target_months),
        true
      );
      setStudyPlan(plan);
    }
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!studyPlan?.canCreateGoal) return; // extra safety guard
    setSubmitting(true);
    try {
      const deadline = new Date();
      deadline.setMonth(deadline.getMonth() + parseInt(formData.target_months));

      const result = await createGoal(userId, {
        destination:    formData.countries.join(", "),
        objective:      formData.objective,
        target_deadline: deadline.toISOString().split('T')[0],
        timeline_months: parseInt(formData.target_months),
        currentCEFR:    formData.currentCEFR as CEFRLevel,
        targetCEFR:     formData.targetCEFR  as CEFRLevel,
        currentIELTS,
        targetIELTS,
      });

      if (result) onSuccess();
    } catch (error) {
      console.error("Error creating goal:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  // ── UI helpers ────────────────────────────────────────────────────────────

  const diffStyle = studyPlan
    ? DIFFICULTY_STYLES[studyPlan.difficultyLevel]
    : DIFFICULTY_STYLES.moderate;

  return createPortal(
    <div className="fixed inset-0 bg-[#2F4157]/90 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-white rounded-none sm:rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden h-[100dvh] sm:h-auto sm:max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#E56668] to-[#C04C4E] p-6 text-white relative overflow-hidden flex-shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors z-10"
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

        {/* Progress bar */}
        <div className="px-6 pt-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of 5</span>
            <span className="text-sm font-medium text-[#E56668]">{Math.round((step / 5) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#E56668] to-[#C04C4E] h-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Scrollable content */}
        <div className="p-4 sm:p-8 overflow-y-auto overflow-x-hidden flex-1 scrollbar-thin scrollbar-thumb-gray-300">

          {/* ── STEP 1: DESTINATION ── */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-2xl font-bold text-[#2F4157] mb-2 flex items-center gap-2">
                  <Globe size={28} className="text-[#E56668]" /> Where do you want to go? 🌍
                </h3>
                <p className="text-gray-600">Select up to 3 countries. You can pick multiple destinations!</p>
              </div>

              {Object.entries(COUNTRIES_BY_REGION).map(([region, countries]) => (
                <div key={region} className="space-y-3">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide">{region}</h4>
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3">
                    {countries.map((country) => {
                      const isSelected = formData.countries.includes(country.name);
                      const canSelect  = formData.countries.length < 3 || isSelected;
                      return (
                        <button
                          key={country.code}
                          onClick={() => {
                            if (isSelected) {
                              setFormData({ ...formData, countries: formData.countries.filter(c => c !== country.name) });
                            } else if (canSelect) {
                              setFormData({ ...formData, countries: [...formData.countries, country.name] });
                            }
                          }}
                          disabled={!canSelect && !isSelected}
                          className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                            isSelected
                              ? "border-[#E56668] bg-[#E56668]/5 shadow-md ring-2 ring-[#E56668]/30"
                              : canSelect
                              ? "border-gray-200 hover:border-[#E56668]/50 hover:bg-gray-50"
                              : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-[#E56668] rounded-full flex items-center justify-center">
                              <Check size={14} className="text-white" strokeWidth={3} />
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{country.flag}</span>
                            <p className="font-semibold text-sm text-[#2F4157]">{country.name}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {formData.countries.length > 0 && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-900">
                    <strong>Selected ({formData.countries.length}/3):</strong>{" "}
                    {formData.countries.join(", ")}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 2: PURPOSE ── */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-2xl font-bold text-[#2F4157] mb-2">What's your main purpose? 🎯</h3>
                <p className="text-gray-600">Choose between studying abroad or working internationally</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { value: "study", label: "Study Abroad",          Icon: GraduationCap, desc: "University programs, scholarships, academic preparation" },
                  { value: "work",  label: "Work Internationally",  Icon: Briefcase,      desc: "Remote jobs, professional skills, career advancement" },
                ].map(({ value, label, Icon, desc }) => (
                  <button
                    key={value}
                    onClick={() => setFormData({ ...formData, purpose: value as "study" | "work", objective: "" })}
                    className={`relative p-8 rounded-2xl border-2 text-center transition-all ${
                      formData.purpose === value
                        ? "border-[#E56668] bg-[#E56668]/5 shadow-lg scale-105"
                        : "border-gray-200 hover:border-[#E56668]/50 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={48} className={`mx-auto mb-4 ${formData.purpose === value ? "text-[#E56668]" : "text-gray-400"}`} />
                    <h4 className="font-bold text-xl text-[#2F4157] mb-2">{label}</h4>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 3: OBJECTIVE ── */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-2xl font-bold text-[#2F4157] mb-2">What's your specific goal? 🎯</h3>
                <p className="text-gray-600">
                  Choose the objective that best matches your {formData.purpose === "study" ? "academic" : "career"} plans
                </p>
              </div>
              <div className="space-y-3">
                {(formData.purpose === "study" ? STUDY_OBJECTIVES : WORK_OBJECTIVES).map((obj) => (
                  <button
                    key={obj.value}
                    onClick={() => setFormData({ ...formData, objective: obj.value })}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${
                      formData.objective === obj.value
                        ? "border-[#E56668] bg-[#E56668]/5 shadow-md"
                        : "border-gray-200 hover:border-[#E56668]/50 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{obj.icon}</span>
                      <div>
                        <p className="font-semibold text-[#2F4157]">{obj.label}</p>
                        <p className="text-xs text-gray-500">{obj.desc}</p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`transition-all ${formData.objective === obj.value ? "text-[#E56668]" : "text-gray-300 group-hover:text-[#E56668]"}`}
                      size={20}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 4: LEVEL + TIMELINE ── */}
          {step === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-2xl font-bold text-[#2F4157] mb-2">Your level & timeline ⏱️</h3>
                <p className="text-gray-600">We'll calculate exactly how many minutes per day you need to study</p>
              </div>

              {/* Current level */}
              <div className="space-y-4">
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
                      onClick={() => setFormData({
                        ...formData,
                        currentCEFR: level,
                        targetCEFR: formData.targetCEFR && cefrGap(level, formData.targetCEFR as CEFRLevel) > 0
                          ? formData.targetCEFR
                          : "",
                      })}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                        formData.currentCEFR === level
                          ? "border-[#E56668] bg-[#E56668]/5 shadow-md ring-2 ring-[#E56668]/20"
                          : "border-gray-200 hover:border-[#E56668]/50 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                          formData.currentCEFR === level ? 'bg-[#E56668] text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {label}
                        </span>
                      </div>
                      <p className="font-bold text-sm text-[#2F4157]">{desc}</p>
                      <p className="text-xs text-gray-400 mt-1 leading-snug line-clamp-2">{examples}</p>
                      <div className="mt-2 text-[10px] text-gray-400 font-medium">≈ IELTS {CEFR_TO_IELTS[level]}</div>
                    </button>
                  ))}
                </div>

                {/* CEFR info box */}
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
                  <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800 space-y-1">
                    <p className="font-semibold">How to know your CEFR level?</p>
                    <p className="text-blue-700 leading-relaxed">
                      CEFR is the global standard for measuring English ability.
                      If you've taken IELTS: 4.0–4.5 = B1, 5.5–6.0 = B2, 7.0+ = C1.
                      Never been tested?{" "}
                      <a
                        href="https://forms.gle/97a2MGc4VfvTtLyj8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold underline hover:text-blue-900"
                      >
                        Take our free placement test →
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Target level — only after current selected */}
              {formData.currentCEFR && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <label className="block text-sm font-bold text-gray-700">Your Target English Level</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {validTargetLevels.map(({ level, label, desc }) => {
                      const gap = cefrGap(formData.currentCEFR as CEFRLevel, level);
                      return (
                        <button
                          key={level}
                          onClick={() => setFormData({ ...formData, targetCEFR: level })}
                          className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                            formData.targetCEFR === level
                              ? "border-[#E56668] bg-[#E56668]/5 shadow-md ring-2 ring-[#E56668]/20"
                              : "border-gray-200 hover:border-[#E56668]/50 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                              formData.targetCEFR === level ? 'bg-[#E56668] text-white' : 'bg-gray-100 text-gray-600'
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
                            ≈ IELTS {CEFR_TO_IELTS[level]} · {gap} level{gap > 1 ? 's' : ''} up
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Timeline — only after both levels selected */}
              {formData.currentCEFR && formData.targetCEFR && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <label className="block text-sm font-bold text-gray-700">How long do you have?</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { value: "3",  label: "3 Months",  desc: "Intensive" },
                      { value: "6",  label: "6 Months",  desc: "Balanced",     recommended: true },
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
                        {t.recommended && (
                          <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                            <Sparkles size={10} /> Best
                          </span>
                        )}
                        <Calendar className="mx-auto mb-2 text-[#E56668]" size={24} />
                        <p className="font-bold text-[#2F4157]">{t.label}</p>
                        <p className="text-xs text-gray-500 mt-1">{t.desc}</p>
                      </button>
                    ))}
                  </div>

                  {formData.target_months && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3 animate-in fade-in duration-200">
                      <Sparkles size={18} className="text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-800">
                        <strong>{formData.currentCEFR} → {formData.targetCEFR}</strong> in{" "}
                        <strong>{formData.target_months} months.</strong> Click{" "}
                        <strong>"Calculate Plan"</strong> to see your daily study requirement.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── STEP 5: STUDY PLAN ── */}
          {step === 5 && studyPlan && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-2xl font-bold text-[#2F4157] mb-2">Your Personalised Study Plan 📋</h3>
                <p className="text-gray-600">Based on Cambridge CEFR benchmarks and IELS learner data</p>
              </div>

              {/* Goal summary */}
              <div className="bg-gradient-to-br from-[#2F4157] to-[#1e2b3a] rounded-2xl p-6 text-white space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wide mb-1">Destination</p>
                    <p className="font-bold">{formData.countries.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wide mb-1">Goal</p>
                    <p className="font-bold">{formData.objective}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wide mb-1">Level Journey</p>
                    <p className="font-bold flex items-center gap-2">
                      <span>{studyPlan.currentCEFR}</span>
                      <ArrowRight size={14} className="text-[#E56668]" />
                      <span>{studyPlan.targetCEFR}</span>
                    </p>
                    <p className="text-white/40 text-xs">IELTS {studyPlan.currentIELTS} → {studyPlan.targetIELTS}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wide mb-1">Total Hours</p>
                    <p className="font-bold">{studyPlan.totalHoursNeeded} hours</p>
                    <p className="text-white/40 text-xs">Cambridge benchmark</p>
                  </div>
                </div>
              </div>

              {/* IMPOSSIBLE BLOCKER */}
              {isImpossible && (
                <div className="rounded-2xl border-2 border-gray-800 bg-gray-900 p-6 flex gap-4 animate-in fade-in zoom-in-95 duration-300">
                  <Ban size={32} className="text-red-400 shrink-0 mt-1" />
                  <div className="space-y-3">
                    <h4 className="text-lg font-extrabold text-white">This Goal Can't Be Created</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {studyPlan.recommendation}
                    </p>
                    <div className="pt-2 space-y-2 text-sm text-gray-400 font-medium">
                      <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
                        Extend your timeline (e.g. choose 9 or 12 months)
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
                        Reduce the gap — target one CEFR level at a time
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
                        Go back and adjust your settings
                      </p>
                    </div>
                    <button
                      onClick={handleBack}
                      className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft size={16} />
                      Go Back & Adjust
                    </button>
                  </div>
                </div>
              )}

              {/* Daily requirement — only when not impossible */}
              {!isImpossible && (
                <>
                  <div className={`rounded-2xl p-6 border ${diffStyle.bg} ${diffStyle.border}`}>
                    <h4 className={`font-bold mb-4 flex items-center gap-2 ${diffStyle.text}`}>
                      <Sparkles size={20} />
                      Daily Study Requirement
                    </h4>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                        <p className="text-3xl font-extrabold text-[#E56668]">
                          {studyPlan.breakdown.selfStudy.minutesPerDay}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Self-Study min/day</p>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                        <p className="text-3xl font-extrabold text-[#E56668]">
                          {studyPlan.dailyMinutesRequired}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Total min/day</p>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                        <p className="text-3xl font-extrabold text-[#E56668]">
                          {studyPlan.weeklyHoursRequired}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Hours/week</p>
                      </div>
                    </div>

                    {/* Difficulty badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${diffStyle.badge}`}>
                        {studyPlan.difficultyLevel}
                      </span>
                    </div>

                    {/* Recommendation text */}
                    <div className={`p-4 rounded-xl border text-sm font-medium ${diffStyle.bg} ${diffStyle.border} ${diffStyle.text}`}>
                      {studyPlan.recommendation}
                    </div>
                  </div>

                  {/* Speaking Club */}
                  <div className="bg-[#E56668]/5 rounded-2xl p-6 border border-[#E56668]/20">
                    <h4 className="font-bold text-[#2F4157] mb-3">🎤 Speaking Club Contribution</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      Attending Mon–Wed–Fri sessions covers{" "}
                      <strong>{studyPlan.speakingClubImpact.contributionPercentage}%</strong> of your weekly
                      learning target — cutting your solo study hours significantly.
                    </p>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-2xl font-bold text-[#E56668]">{studyPlan.speakingClubImpact.totalSessions}</p>
                        <p className="text-xs text-gray-500">Total Sessions</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#E56668]">{studyPlan.breakdown.speakingClubs.weeklyMinutes}</p>
                        <p className="text-xs text-gray-500">Mins/Week</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#E56668]">{studyPlan.speakingClubImpact.contributionPercentage}%</p>
                        <p className="text-xs text-gray-500">Of Weekly Target</p>
                      </div>
                    </div>
                  </div>

                  {/* Weekly breakdown */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-bold text-[#2F4157] mb-4">Weekly Activity Breakdown</h4>
                    <div className="space-y-3">
                      {[
                        { label: "Self-Study",            value: `${studyPlan.breakdown.selfStudy.minutesPerDay} min/day × ${studyPlan.breakdown.selfStudy.daysPerWeek} days` },
                        { label: "Speaking Club (Pro)",   value: "90 min × 3 sessions" },
                        { label: "Mentor Sessions (Pro)", value: `${studyPlan.breakdown.mentorSessions.minutesPerSession} min × 2/month` },
                        { label: "Assignments",           value: `${studyPlan.breakdown.assignments.minutesPerAssignment} min × ${studyPlan.breakdown.assignments.perWeek}/week` },
                      ].map((row) => (
                        <div key={row.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                          <span className="text-sm font-medium text-gray-700">{row.label}</span>
                          <span className="text-sm font-bold text-[#2F4157]">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 pb-8 flex items-center justify-between gap-4 border-t border-gray-100 pt-6 flex-shrink-0">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold disabled:opacity-0 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={20} />
            Back
          </button>

          {step < 5 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-8 py-3 bg-[#E56668] text-white rounded-xl font-bold hover:bg-[#C04C4E] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              {step === 4 ? 'Calculate Plan' : 'Next'}
              <ChevronRight size={20} />
            </button>
          ) : isImpossible ? (
            /* IMPOSSIBLE: disabled button with clear explanation */
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-500 font-medium hidden sm:block">
                Adjust your settings to continue
              </p>
              <button
                disabled
                className="flex items-center gap-2 px-8 py-3 bg-gray-200 text-gray-400 rounded-xl font-bold cursor-not-allowed"
              >
                <Ban size={18} />
                Cannot Create Goal
              </button>
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#E56668] to-[#C04C4E] text-white rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Target size={20} />
                  Create My Goal
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