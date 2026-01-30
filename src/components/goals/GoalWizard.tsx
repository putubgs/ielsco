"use client";

import { useState } from "react";
import { X, ChevronRight, ChevronLeft, Target, Calendar, Sparkles, Globe, GraduationCap, Briefcase, Check } from "lucide-react";
import { createGoal, getGoalTemplates } from "@/data/goals";
import { calculateStudyPlan } from "@/data/progress-calculator";
import type { GoalTemplate } from "@/types/goals";

interface GoalWizardProps {
  userId: string;
  onClose: () => void;
  onSuccess: () => void;
}

// ============================================
// COMPREHENSIVE COUNTRY LIST (Grouped)
// ============================================

const COUNTRIES_BY_REGION = {
  "Popular Destinations": [
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "SG", name: "Singapore", flag: "🇸🇬" },
    { code: "NZ", name: "New Zealand", flag: "🇳🇿" }
  ],
  "Europe": [
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "NL", name: "Netherlands", flag: "🇳🇱" },
    { code: "SE", name: "Sweden", flag: "🇸🇪" },
    { code: "NO", name: "Norway", flag: "🇳🇴" },
    { code: "DK", name: "Denmark", flag: "🇩🇰" },
    { code: "CH", name: "Switzerland", flag: "🇨🇭" },
    { code: "IE", name: "Ireland", flag: "🇮🇪" },
    { code: "ES", name: "Spain", flag: "🇪🇸" },
    { code: "IT", name: "Italy", flag: "🇮🇹" }
  ],
  "Asia Pacific": [
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "KR", name: "South Korea", flag: "🇰🇷" },
    { code: "MY", name: "Malaysia", flag: "🇲🇾" },
    { code: "TH", name: "Thailand", flag: "🇹🇭" },
    { code: "TW", name: "Taiwan", flag: "🇹🇼" },
    { code: "HK", name: "Hong Kong", flag: "🇭🇰" }
  ],
  "Middle East": [
    { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
    { code: "QA", name: "Qatar", flag: "🇶🇦" },
    { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" }
  ],
  "Remote/Global": [
    { code: "REMOTE", name: "Remote Work (Global)", flag: "🌍" }
  ]
};

export default function GoalWizard({ userId, onClose, onSuccess }: GoalWizardProps) {
  const [step, setStep] = useState(1);
  const [templates, setTemplates] = useState<GoalTemplate[]>([]);
  
  const [formData, setFormData] = useState({
    countries: [] as string[], // Changed to array for multi-select
    purpose: "" as "study" | "work" | "",
    objective: "",
    currentLevel: "",
    target_months: "",
    template_id: ""
  });

  const [studyPlan, setStudyPlan] = useState<any>(null);

  // Load templates on mount
  useState(() => {
    getGoalTemplates().then(setTemplates);
  });

  // ============================================
  // PURPOSE-BASED OBJECTIVES
  // ============================================

  const STUDY_OBJECTIVES = [
    { value: "Get IELTS 7.0+", label: "IELTS 7.0+", icon: "📝", desc: "For undergraduate/postgraduate" },
    { value: "Get IELTS 8.0+", label: "IELTS 8.0+", icon: "🎯", desc: "For top-tier universities" },
    { value: "Get TOEFL 100+", label: "TOEFL 100+", icon: "✍️", desc: "US/Canada universities" },
    { value: "Win LPDP Scholarship", label: "LPDP Scholarship", icon: "🎓", desc: "Indonesian government" },
    { value: "Win Chevening Scholarship", label: "Chevening Scholarship", icon: "🇬🇧", desc: "UK government" },
    { value: "Win Fulbright Scholarship", label: "Fulbright Scholarship", icon: "🇺🇸", desc: "US government" }
  ];

  const WORK_OBJECTIVES = [
    { value: "Get Remote Job", label: "Remote Work English", icon: "💼", desc: "Global companies" },
    { value: "Work in Tech Industry", label: "Tech Industry English", icon: "💻", desc: "Software/IT roles" },
    { value: "Work in Healthcare", label: "Healthcare English", icon: "🏥", desc: "Medical professionals" },
    { value: "Business English Fluency", label: "Business Fluency", icon: "📊", desc: "Corporate environment" },
    { value: "Fluent Conversation", label: "General Fluency", icon: "💬", desc: "Everyday communication" }
  ];

  // ============================================
  // NAVIGATION LOGIC
  // ============================================

  const handleNext = () => {
    if (step === 4 && formData.objective && formData.target_months) {
      // Calculate study plan before showing review
      const plan = calculateStudyPlan(
        formData.objective,
        { ielts: parseFloat(formData.currentLevel) || 5.0 },
        7.0,
        parseInt(formData.target_months) * 30,
        true // Include speaking club
      );
      setStudyPlan(plan);
    }
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
  try {
    const deadline = new Date();
    deadline.setMonth(deadline.getMonth() + parseInt(formData.target_months));
    
    const template = templates.find(t => t.objective === formData.objective);

    // ✅ NOW PASSES timeline_months so tasks get generated!
    const result = await createGoal(userId, {
      destination: formData.countries.join(", "),
      objective: formData.objective,
      target_deadline: deadline.toISOString().split('T')[0],
      template_id: template?.id,
      timeline_months: parseInt(formData.target_months) // ⭐ ADD THIS
    });

    if (result) {
      onSuccess();
    }
  } catch (error) {
    console.error("Error creating goal:", error);
  }
};

  const canProceed = () => {
    if (step === 1) return formData.countries.length > 0;
    if (step === 2) return !!formData.purpose;
    if (step === 3) return !!formData.objective;
    if (step === 4) return !!formData.currentLevel && !!formData.target_months;
    return true;
  };

  return (
    <div className="fixed inset-0 bg-[#2F4157]/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
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
              <span className="text-sm font-semibold uppercase tracking-wide">
                Goal Setting Wizard
              </span>
            </div>
            <h2 className="text-2xl font-bold">Let's Build Your Learning Journey</h2>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-6 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {step} of 5
            </span>
            <span className="text-sm font-medium text-[#E56668]">
              {Math.round((step / 5) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#E56668] to-[#C04C4E] h-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Content (Scrollable) */}
        <div className="p-8 overflow-y-auto flex-1">
          
          {/* ===== STEP 1: COUNTRY SELECTION (Multi-select) ===== */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-2xl font-bold text-[#2F4157] mb-2 flex items-center gap-2">
                  <Globe size={28} className="text-[#E56668]" />
                  Where do you want to go? 🌍
                </h3>
                <p className="text-gray-600">
                  Select up to 3 countries you're interested in. You can choose multiple destinations!
                </p>
              </div>

              {Object.entries(COUNTRIES_BY_REGION).map(([region, countries]) => (
                <div key={region} className="space-y-3">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                    {region}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {countries.map((country) => {
                      const isSelected = formData.countries.includes(country.name);
                      const canSelect = formData.countries.length < 3 || isSelected;
                      
                      return (
                        <button
                          key={country.code}
                          onClick={() => {
                            if (isSelected) {
                              setFormData({
                                ...formData,
                                countries: formData.countries.filter(c => c !== country.name)
                              });
                            } else if (canSelect) {
                              setFormData({
                                ...formData,
                                countries: [...formData.countries, country.name]
                              });
                            }
                          }}
                          disabled={!canSelect && !isSelected}
                          className={`
                            relative p-4 rounded-xl border-2 text-left transition-all
                            ${isSelected
                              ? "border-[#E56668] bg-[#E56668]/5 shadow-md ring-2 ring-[#E56668]/30"
                              : canSelect
                              ? "border-gray-200 hover:border-[#E56668]/50 hover:bg-gray-50"
                              : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                            }
                          `}
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
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-900">
                    <strong>Selected ({formData.countries.length}/3):</strong>{" "}
                    {formData.countries.join(", ")}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ===== STEP 2: PURPOSE (Study or Work) ===== */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-2xl font-bold text-[#2F4157] mb-2">
                  What's your main purpose? 🎯
                </h3>
                <p className="text-gray-600">
                  Choose between studying abroad or working internationally
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData({ ...formData, purpose: "study" })}
                  className={`
                    relative p-8 rounded-2xl border-2 text-center transition-all group
                    ${formData.purpose === "study"
                      ? "border-[#E56668] bg-[#E56668]/5 shadow-lg scale-105"
                      : "border-gray-200 hover:border-[#E56668]/50 hover:bg-gray-50"
                    }
                  `}
                >
                  <GraduationCap size={48} className={`mx-auto mb-4 ${formData.purpose === "study" ? "text-[#E56668]" : "text-gray-400"}`} />
                  <h4 className="font-bold text-xl text-[#2F4157] mb-2">Study Abroad</h4>
                  <p className="text-sm text-gray-500">
                    University programs, scholarships, academic preparation
                  </p>
                </button>

                <button
                  onClick={() => setFormData({ ...formData, purpose: "work" })}
                  className={`
                    relative p-8 rounded-2xl border-2 text-center transition-all group
                    ${formData.purpose === "work"
                      ? "border-[#E56668] bg-[#E56668]/5 shadow-lg scale-105"
                      : "border-gray-200 hover:border-[#E56668]/50 hover:bg-gray-50"
                    }
                  `}
                >
                  <Briefcase size={48} className={`mx-auto mb-4 ${formData.purpose === "work" ? "text-[#E56668]" : "text-gray-400"}`} />
                  <h4 className="font-bold text-xl text-[#2F4157] mb-2">Work Internationally</h4>
                  <p className="text-sm text-gray-500">
                    Remote jobs, professional skills, career advancement
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* ===== STEP 3: SPECIFIC OBJECTIVE ===== */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-2xl font-bold text-[#2F4157] mb-2">
                  What's your specific goal? 🎯
                </h3>
                <p className="text-gray-600">
                  Choose the objective that best matches your {formData.purpose === "study" ? "academic" : "career"} plans
                </p>
              </div>

              <div className="space-y-3">
                {(formData.purpose === "study" ? STUDY_OBJECTIVES : WORK_OBJECTIVES).map((obj) => (
                  <button
                    key={obj.value}
                    onClick={() => setFormData({ ...formData, objective: obj.value })}
                    className={`
                      w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group
                      ${formData.objective === obj.value
                        ? "border-[#E56668] bg-[#E56668]/5 shadow-md"
                        : "border-gray-200 hover:border-[#E56668]/50 hover:bg-gray-50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{obj.icon}</span>
                      <div>
                        <p className="font-semibold text-[#2F4157]">{obj.label}</p>
                        <p className="text-xs text-gray-500">{obj.desc}</p>
                      </div>
                    </div>
                    <ChevronRight 
                      className={`transition-all ${
                        formData.objective === obj.value ? "text-[#E56668]" : "text-gray-300 group-hover:text-[#E56668]"
                      }`} 
                      size={20} 
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ===== STEP 4: CURRENT LEVEL & TIMELINE ===== */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-2xl font-bold text-[#2F4157] mb-2">
                  Your current level & timeline ⏱️
                </h3>
                <p className="text-gray-600">
                  Help us create a personalized study plan
                </p>
              </div>

              {/* Current Level */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Current English Level (IELTS equivalent)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {["4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setFormData({ ...formData, currentLevel: level })}
                      className={`
                        p-3 rounded-xl border-2 font-bold transition-all
                        ${formData.currentLevel === level
                          ? "border-[#E56668] bg-[#E56668] text-white"
                          : "border-gray-200 text-gray-700 hover:border-[#E56668]/50"
                        }
                      `}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  How many months do you have?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { value: "3", label: "3 Months", desc: "Intensive" },
                    { value: "6", label: "6 Months", desc: "Balanced", recommended: true },
                    { value: "9", label: "9 Months", desc: "Steady" },
                    { value: "12", label: "12 Months", desc: "Comprehensive" }
                  ].map((timeline) => (
                    <button
                      key={timeline.value}
                      onClick={() => setFormData({ ...formData, target_months: timeline.value })}
                      className={`
                        relative p-4 rounded-xl border-2 text-center transition-all
                        ${formData.target_months === timeline.value
                          ? "border-[#E56668] bg-[#E56668]/5 shadow-lg scale-105"
                          : "border-gray-200 hover:border-[#E56668]/50 hover:bg-gray-50"
                        }
                      `}
                    >
                      {timeline.recommended && (
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                          <Sparkles size={10} /> Best
                        </span>
                      )}
                      <Calendar className="mx-auto mb-2 text-[#E56668]" size={24} />
                      <p className="font-bold text-[#2F4157]">{timeline.label}</p>
                      <p className="text-xs text-gray-500 mt-1">{timeline.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== STEP 5: REVIEW & STUDY PLAN ===== */}
          {step === 5 && studyPlan && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <h3 className="text-2xl font-bold text-[#2F4157] mb-2">
                  Your Personalized Study Plan 📋
                </h3>
                <p className="text-gray-600">
                  Based on research and IELS learner data
                </p>
              </div>

              {/* Goal Summary */}
              <div className="bg-gradient-to-br from-[#2F4157] to-[#1e2b3a] rounded-2xl p-6 text-white">
                <div className="space-y-3">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Destination(s)</p>
                    <p className="font-bold text-lg">{formData.countries.join(", ")}</p>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Goal</p>
                    <p className="font-bold text-lg">{formData.objective}</p>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Timeline</p>
                    <p className="font-bold text-lg">{formData.target_months} Months</p>
                  </div>
                </div>
              </div>

              {/* Study Plan Details */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h4 className="font-bold text-[#2F4157] mb-4 flex items-center gap-2">
                  <Sparkles size={20} className="text-blue-600" />
                  Daily Study Requirement
                </h4>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 border border-blue-100">
                    <p className="text-3xl font-bold text-[#E56668] mb-1">
                      {studyPlan.dailyMinutesRequired}
                    </p>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Minutes/Day</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-blue-100">
                    <p className="text-3xl font-bold text-[#E56668] mb-1">
                      {studyPlan.weeklyHoursRequired}
                    </p>
                    <p className="text-xs text-gray-600 uppercase tracking-wide">Hours/Week</p>
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${
                  studyPlan.difficultyLevel === 'easy' ? 'bg-green-100 border-green-200' :
                  studyPlan.difficultyLevel === 'moderate' ? 'bg-blue-100 border-blue-200' :
                  studyPlan.difficultyLevel === 'challenging' ? 'bg-orange-100 border-orange-200' :
                  'bg-red-100 border-red-200'
                } border`}>
                  <p className="text-sm font-medium text-gray-800">{studyPlan.recommendation}</p>
                </div>
              </div>

              {/* Speaking Club Integration */}
              <div className="bg-[#E56668]/5 rounded-2xl p-6 border border-[#E56668]/20">
                <h4 className="font-bold text-[#2F4157] mb-3">
                  🎤 Speaking Club Integration
                </h4>
                <p className="text-sm text-gray-700 mb-4">
                  By attending Mon-Wed-Fri sessions ({studyPlan.breakdown.speakingClubs.sessionsPerWeek}× per week), 
                  Speaking Club will contribute <strong>{studyPlan.speakingClubImpact.contributionPercentage}%</strong> of your weekly learning time!
                </p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-2xl font-bold text-[#E56668]">{studyPlan.speakingClubImpact.totalSessions}</p>
                    <p className="text-xs text-gray-600">Total Sessions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#E56668]">{studyPlan.breakdown.speakingClubs.weeklyMinutes}</p>
                    <p className="text-xs text-gray-600">Mins/Week</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#E56668]">{studyPlan.breakdown.speakingClubs.effectiveMinutes}</p>
                    <p className="text-xs text-gray-600">Effective Mins</p>
                  </div>
                </div>
              </div>

              {/* Activity Breakdown */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h4 className="font-bold text-[#2F4157] mb-4">Weekly Activity Breakdown</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Self-Study</span>
                    <span className="text-sm font-bold text-[#2F4157]">
                      {studyPlan.breakdown.selfStudy.minutesPerDay} mins/day × {studyPlan.breakdown.selfStudy.daysPerWeek} days
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Speaking Club</span>
                    <span className="text-sm font-bold text-[#2F4157]">
                      90 mins × 3 sessions
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Mentor Sessions (Pro)</span>
                    <span className="text-sm font-bold text-[#2F4157]">
                      {studyPlan.breakdown.mentorSessions.minutesPerSession} mins × 2/month
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Assignments</span>
                    <span className="text-sm font-bold text-[#2F4157]">
                      {studyPlan.breakdown.assignments.minutesPerAssignment} mins × {studyPlan.breakdown.assignments.perWeek}/week
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
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
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#E56668] to-[#C04C4E] text-white rounded-xl font-bold hover:shadow-xl transition-all"
            >
              <Target size={20} />
              Create My Goal
            </button>
          )}
        </div>
      </div>
    </div>
  );
}