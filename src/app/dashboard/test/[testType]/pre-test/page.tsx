"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createBrowserClient } from "@supabase/ssr";
import {
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Send
} from "lucide-react";
import { cn } from "@/lib/utils";

const TEST_DURATION = 120 * 60; // 2 hours in seconds

export default function PreTestPage() {
  const router = useRouter();
  const params = useParams();
  const testType = params.testType as string;
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    tier: "basic" as "basic" | "pro",
    avatar: ""
  });
  const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(TEST_DURATION);
  const [scores, setScores] = useState({
    listening: 0,
    reading: 0,
    writing: 0,
    speaking: 0
  });
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const sections = [
    {
      name: "Listening",
      duration: "30 minutes",
      description: "40 questions across 4 recordings",
      icon: "🎧"
    },
    {
      name: "Reading",
      duration: "60 minutes",
      description: "40 questions across 3 passages",
      icon: "📖"
    },
    {
      name: "Writing",
      duration: "60 minutes",
      description: "Task 1 (150 words) + Task 2 (250 words)",
      icon: "✍️"
    },
    {
      name: "Speaking",
      duration: "11-14 minutes",
      description: "3 parts: Introduction, Long turn, Discussion",
      icon: "🗣️"
    },
  ];

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

      const tier = dbUser?.memberships?.[0]?.tier === "pro" ? "pro" : "basic";

      setUserData({
        id: user.id,
        name: user.user_metadata?.full_name || "Member",
        email: user.email || "",
        tier: tier,
        avatar: user.user_metadata?.avatar_url || ""
      });

      setLoading(false);
    };

    initData();
  }, [router, supabase]);

  // Timer countdown
  useEffect(() => {
    if (!testStarted) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [testStarted]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTest = async () => {
    // Create test attempt
    const response = await fetch('/api/test/create-attempt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userData.email,
        testType,
        attemptType: 'pre-test'
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setAttemptId(data.attemptId);
      setTestStarted(true);
    } else {
      alert('Failed to start test. Please try again.');
    }
  };

  const handleScoreChange = (section: string, score: number) => {
    setScores(prev => ({ ...prev, [section.toLowerCase()]: score }));
  };

  const handleAutoSubmit = async () => {
    alert('Time is up! Submitting your test automatically.');
    await handleSubmit();
  };

  const handleSubmit = async () => {
    if (!attemptId) return;

    // Validate all scores are entered
    const allScoresEntered = Object.values(scores).every(score => score > 0);
    if (!allScoresEntered) {
      alert('Please enter scores for all sections before submitting.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/test/submit-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attemptId,
          scores,
          feedback: {
            mentor_feedback: "Pre-test completed. Great job on starting your learning journey!",
            strengths: ["Showed up and completed the test", "Good time management"],
            weaknesses: ["To be determined after detailed review"],
            recommendations: ["Focus on weakest areas", "Practice daily", "Take the post-test after preparation"]
          }
        }),
      });

      if (response.ok) {
        alert('Test submitted successfully! Redirecting to dashboard...');
        router.push('/dashboard/test');
      } else {
        throw new Error('Failed to submit test');
      }
    } catch (error) {
      alert('Error submitting test. Please try again.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout userTier={userData.tier} userName={userData.name} userAvatar={userData.avatar}>
        <div className="p-8 max-w-5xl mx-auto animate-pulse">
          <div className="h-32 bg-gray-200 rounded-3xl"></div>
        </div>
      </DashboardLayout>
    );
  }

  // Pre-test instructions
  if (!testStarted) {
    return (
      <DashboardLayout userTier={userData.tier} userName={userData.name} userAvatar={userData.avatar}>
        <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-blue-600" size={40} />
              </div>
              <h1 className="text-3xl font-bold text-[#2F4157] mb-2">
                {testType.toUpperCase()} Pre-test
              </h1>
              <p className="text-gray-600">
                Test your current level before starting your preparation
              </p>
            </div>

            {/* Test Instructions */}
            <div className="space-y-6 mb-8">
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                <h3 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                  <AlertCircle size={18} />
                  Important Instructions
                </h3>
                <ul className="text-sm text-orange-800 space-y-2">
                  <li>• Total test duration: <strong>2 hours</strong></li>
                  <li>• You must complete all 4 sections</li>
                  <li>• Timer will start immediately after clicking "Start Test"</li>
                  <li>• Test will auto-submit when time runs out</li>
                  <li>• Make sure you have a stable internet connection</li>
                </ul>
              </div>

              {/* Sections Overview */}
              <div className="grid md:grid-cols-2 gap-4">
                {sections.map((section) => (
                  <div key={section.name} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{section.icon}</span>
                      <h4 className="font-bold text-[#2F4157]">{section.name}</h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{section.duration}</p>
                    <p className="text-sm text-gray-700">{section.description}</p>
                  </div>
                ))}
              </div>

              {/* What you need */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h3 className="font-bold text-blue-900 mb-2">What You'll Need:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ Quiet environment with no distractions</li>
                  <li>✓ Headphones for listening section</li>
                  <li>✓ Pen and paper for notes (optional)</li>
                  <li>✓ 2+ hours of uninterrupted time</li>
                </ul>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartTest}
              className="w-full py-4 bg-[#E56668] text-white rounded-xl font-bold text-lg hover:bg-[#C04C4E] transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              Start Pre-test
              <ArrowRight size={24} />
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              By starting the test, you agree to complete it in one sitting.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Test interface
  return (
    <DashboardLayout userTier={userData.tier} userName={userData.name} userAvatar={userData.avatar}>
      <div className="min-h-screen bg-[#F7F8FA]">
        
        {/* Timer Bar (Sticky) */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-[#2F4157]">
                {sections[currentSection].name} Section
              </h2>
              <span className="text-sm text-gray-600">
                {currentSection + 1} of {sections.length}
              </span>
            </div>
            
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-bold",
              timeRemaining < 600 ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
            )}>
              <Clock size={20} />
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          
          {/* Section Instructions */}
          <div className="bg-white rounded-2xl p-8 mb-6 border border-gray-100">
            <h3 className="text-2xl font-bold text-[#2F4157] mb-4">
              {sections[currentSection].icon} {sections[currentSection].name}
            </h3>
            <p className="text-gray-600 mb-6">
              {sections[currentSection].description}
            </p>

            {/* Score Input */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Enter your {sections[currentSection].name} score (0-9):
              </label>
              <input
                type="number"
                min="0"
                max="9"
                step="0.5"
                value={scores[sections[currentSection].name.toLowerCase() as keyof typeof scores]}
                onChange={(e) => handleScoreChange(sections[currentSection].name, parseFloat(e.target.value))}
                className="w-full px-6 py-4 text-2xl font-bold text-center bg-white border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E56668] focus:border-transparent"
                placeholder="0.0"
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Band scores range from 0.0 to 9.0 (in 0.5 increments)
              </p>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
              className={cn(
                "px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2",
                currentSection === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              )}
            >
              <ArrowLeft size={20} />
              Previous
            </button>

            {currentSection < sections.length - 1 ? (
              <button
                onClick={() => setCurrentSection(currentSection + 1)}
                className="px-6 py-3 bg-[#E56668] text-white rounded-xl font-bold hover:bg-[#C04C4E] transition-colors flex items-center gap-2"
              >
                Next Section
                <ArrowRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className={cn(
                  "px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2",
                  submitting
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                )}
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Submit Test
                  </>
                )}
              </button>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="mt-6 grid grid-cols-4 gap-2">
            {sections.map((section, index) => (
              <div
                key={section.name}
                className={cn(
                  "p-3 rounded-lg text-center text-sm font-semibold transition-colors",
                  index === currentSection
                    ? "bg-[#E56668] text-white"
                    : scores[section.name.toLowerCase() as keyof typeof scores] > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                )}
              >
                {section.name}
                {scores[section.name.toLowerCase() as keyof typeof scores] > 0 && (
                  <CheckCircle2 size={14} className="inline ml-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}