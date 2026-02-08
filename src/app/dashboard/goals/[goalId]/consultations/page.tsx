"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PricingModal from "@/components/subscription/PricingModal"; // Pastikan import ini ada
import { createBrowserClient } from "@supabase/ssr";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  MessageSquare,
  CheckCircle2,
  Crown,
  AlertCircle,
  X
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getGoalById, bookConsultation, getUpcomingConsultations } from "@/data/goals";
import type { GoalWithTasks, MentorConsultation } from "@/types/goals";

// --- TIPE DATA ---
type UserTier = "explorer" | "insider" | "visionary";

export default function ConsultationPage() {
  const params = useParams();
  const router = useRouter();
  const goalId = params?.goalId as string;

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
  );

  // State User Updated
  const [userData, setUserData] = useState<{
    id: string;
    name: string;
    tier: UserTier;
    email: string;
  }>({ 
    id: "", 
    name: "", 
    tier: "explorer",
    email: ""
  });

  const [goal, setGoal] = useState<GoalWithTasks | null>(null);
  const [consultations, setConsultations] = useState<MentorConsultation[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false); // Untuk Upgrade

  // Booking form state
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const initData = async () => {
      setLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/sign-in");
        return;
      }

      const { data: dbUser } = await supabase
        .from("users")
        .select(`*, memberships(tier)`)
        .eq("id", user.id)
        .single();

      // --- LOGIC MAPPING TIER ---
      const dbTier = dbUser?.memberships?.[0]?.tier;
      let uiTier: UserTier = "explorer";

      if (dbTier === "pro") {
        uiTier = "insider";
      } else if (dbTier === "premium" || dbTier === "visionary") {
        uiTier = "visionary";
      } else {
        uiTier = "explorer";
      }

      setUserData({
        id: user.id,
        name: user.user_metadata?.full_name || "Learner",
        tier: uiTier,
        email: user.email || ""
      });

      if (goalId) {
        const goalData = await getGoalById(goalId);
        if (goalData) setGoal(goalData);
        
        const upcomingConsults = await getUpcomingConsultations(user.id);
        setConsultations(upcomingConsults);
      }
      
      setLoading(false);
    };

    initData();
  }, [goalId, router, supabase]);

  const handleTopicToggle = (topic: string) => {
    setTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleBookConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || topics.length === 0) {
      alert("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}`);
      
      const result = await bookConsultation(userData.id, {
        goal_id: goalId,
        scheduled_at: scheduledDateTime.toISOString(),
        discussion_topics: topics,
        notes: notes || undefined
      });
      
      if (result) {
        alert("Consultation booked successfully!");
        setShowBookingModal(false);
        // Reload consultations
        const upcomingConsults = await getUpcomingConsultations(userData.id);
        setConsultations(upcomingConsults);
        // Reset form
        setSelectedDate("");
        setSelectedTime("");
        setTopics([]);
        setNotes("");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to book consultation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout userTier="explorer" userName="Loading..." userAvatar="">
        <div className="p-8 max-w-7xl mx-auto animate-pulse">
          <div className="h-12 bg-gray-200 rounded-xl w-64 mb-8"></div>
          <div className="h-96 bg-gray-200 rounded-2xl"></div>
        </div>
      </DashboardLayout>
    );
  }

  // --- LOCKED STATE (EXPLORER) ---
  if (userData.tier === "explorer") {
    return (
      <DashboardLayout userTier={userData.tier} userName={userData.name} userAvatar="">
        <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-3xl p-8 shadow-2xl text-center border border-gray-100">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-200">
              <Crown className="text-white" size={40} />
            </div>
            
            <h2 className="text-2xl font-bold text-[#2F4157] mb-3">
              Unlock Mentor Consultations
            </h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Get personalized 1-on-1 guidance from expert mentors. 
              <span className="font-bold text-[#2F4157]"> Insider & Visionary</span> members receive priority consultations to accelerate learning.
            </p>
            
            <div className="space-y-3 mb-8 text-left bg-gray-50 p-6 rounded-2xl">
              {[
                "30-minute video sessions",
                "Personalized learning strategy",
                "Progress review & feedback",
                "Priority scheduling"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setShowPricingModal(true)}
              className="w-full py-4 bg-gradient-to-r from-[#E56668] to-[#ff8f91] text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
            >
              Upgrade Membership
            </button>
            
            <Link
              href={`/dashboard/goals/${goalId}`}
              className="inline-block mt-6 text-sm text-gray-500 hover:text-[#E56668] transition-colors font-medium"
            >
              Back to Goal Details
            </Link>
          </div>
        </div>
        {/* Render Modal jika user klik upgrade */}
        {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}
      </DashboardLayout>
    );
  }

  const topicOptions = [
    { value: "progress_review", label: "Progress Review" },
    { value: "study_strategy", label: "Study Strategy" },
    { value: "test_preparation", label: "Test Preparation" },
    { value: "essay_feedback", label: "Essay Feedback" },
    { value: "speaking_practice", label: "Speaking Practice" },
    { value: "time_management", label: "Time Management" },
    { value: "motivation", label: "Motivation & Mindset" },
    { value: "application_help", label: "Application Help" }
  ];

  // --- UNLOCKED STATE (INSIDER / VISIONARY) ---
  return (
    <DashboardLayout userTier={userData.tier} userName={userData.name} userAvatar="">
      <div className="min-h-screen bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          
          {/* Header */}
          <div className="mb-8">
            <Link
              href={`/dashboard/goals/${goalId}`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2F4157] text-sm mb-4 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Goal
            </Link>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#2F4157] mb-2">
                  Mentor Consultations
                </h1>
                <p className="text-gray-600">
                  {goal?.objective || "Your Learning Goal"}
                </p>
              </div>
              
              <button 
                onClick={() => setShowBookingModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E56668] text-white rounded-xl font-semibold hover:bg-[#C04C4E] transition-colors shadow-lg shadow-red-900/10"
              >
                <Calendar size={18} />
                Book New Session
              </button>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Crown size={24} />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-1 capitalize">
                {userData.tier} Benefit Active
              </h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                As an <span className="font-bold capitalize">{userData.tier}</span> member, you have access to priority consultations. 
                Book at least 2 weeks in advance. 24-hour cancellation policy applies.
              </p>
            </div>
          </div>

          {/* Upcoming Consultations */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8 min-h-[300px]">
            <h2 className="text-xl font-bold text-[#2F4157] mb-6 flex items-center gap-2">
               <Video size={20} className="text-gray-400"/> Upcoming Sessions
            </h2>
            
            {consultations.length === 0 ? (
              <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <MessageSquare className="text-gray-400" size={32} />
                </div>
                <p className="text-gray-600 font-medium mb-1">
                  No upcoming consultations
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Ready to accelerate your progress?
                </p>
                <button 
                  onClick={() => setShowBookingModal(true)}
                  className="text-[#E56668] font-bold text-sm hover:underline"
                >
                  Book your first session
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {consultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="p-5 bg-white rounded-xl border border-gray-200 hover:border-[#E56668] hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                            <CheckCircle2 size={12}/> Scheduled
                          </span>
                          <span className="text-sm text-gray-500">
                            {consultation.duration_minutes} minutes
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-[#2F4157] mb-2">
                          <Calendar size={16} className="text-[#E56668]" />
                          <span className="font-semibold">
                            {new Date(consultation.scheduled_at).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="text-gray-300">|</span>
                          <Clock size={16} className="text-[#E56668]" />
                          <span className="font-semibold">
                            {new Date(consultation.scheduled_at).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        
                        {consultation.discussion_topics && consultation.discussion_topics.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {consultation.discussion_topics.map((topic, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600 font-medium"
                              >
                                {topic.replace('_', ' ')}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {consultation.meeting_link && (
                        <a
                          href={consultation.meeting_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-[#2F4157] text-white rounded-lg font-semibold text-sm hover:bg-[#1e2b3a] transition-colors"
                        >
                          <Video size={16} />
                          Join
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div 
          className="fixed inset-0 bg-[#2F4157]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowBookingModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 rounded-t-3xl z-10 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#2F4157]">
                  Book Mentor Consultation
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Schedule a 30-minute session with your mentor
                </p>
              </div>
              <button onClick={() => setShowBookingModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                 <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleBookConsultation} className="p-6 space-y-6">
              
              {/* Date & Time */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Preferred Date <span className="text-[#E56668]">*</span>
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E56668]"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 2 weeks advance
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Preferred Time <span className="text-[#E56668]">*</span>
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E56668]"
                    required
                  >
                    <option value="">Select time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="19:00">07:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Discussion Topics */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Discussion Topics <span className="text-[#E56668]">*</span>
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {topicOptions.map((topic) => (
                    <button
                      key={topic.value}
                      type="button"
                      onClick={() => handleTopicToggle(topic.value)}
                      className={cn(
                        "p-3 rounded-xl border-2 text-left text-sm font-medium transition-all",
                        topics.includes(topic.value)
                          ? "border-[#E56668] bg-[#E56668]/5 text-[#E56668]"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      )}
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Select at least one topic to discuss
                </p>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific questions or areas you'd like to focus on..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E56668] resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={cn(
                    "flex-1 py-3 rounded-xl font-bold transition-all",
                    isSubmitting
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#E56668] text-white hover:bg-[#C04C4E] shadow-lg"
                  )}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Pricing Modal Component */}
      {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}
    </DashboardLayout>
  );
}