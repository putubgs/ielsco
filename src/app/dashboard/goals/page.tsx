"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Target, Plus, AlertCircle, Trash2 } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { getUserGoals, deleteGoal } from "@/data/goals"; // Import deleteGoal
import type { Goal } from "@/types/goals";
import GoalCard from "@/components/goals/GoalCard";
import GoalWizard from "@/components/goals/GoalWizard";

export default function GoalsPage() {
  const router = useRouter();
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
);

  // State
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  const [userData, setUserData] = useState({ id: "", name: "", tier: "basic" as "basic" | "pro" });

  const fetchGoals = async (userId: string) => {
    const userGoals = await getUserGoals(userId);
    setGoals(userGoals);
  };

  useEffect(() => {
    const initData = async () => {
      setLoading(true);

      // 1. Ambil User Login
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/sign-in");
        return;
      }

      // 2. Ambil Profil Tambahan
      const { data: dbUser } = await supabase
        .from("users")
        .select(`*, memberships(tier)`)
        .eq("id", user.id)
        .single();

      // Set Data User
      setUserData({
        id: user.id,
        name: user.user_metadata?.full_name || "Learner",
        tier: dbUser?.memberships?.[0]?.tier === "pro" ? "pro" : "basic"
      });

      // 3. Fetch Goals
      await fetchGoals(user.id);
      setLoading(false);
    };

    initData();
  }, [router, supabase]);

  // Handle Create
  const handleGoalCreated = async () => {
    setShowWizard(false);
    setLoading(true);
    if (userData.id) {
      await fetchGoals(userData.id);
    }
    setLoading(false);
  };

  // Handle Delete (Fitur Baru)
  const handleDeleteGoal = async (goalId: string) => {
    if (confirm("Are you sure you want to delete this goal? This cannot be undone.")) {
      setLoading(true);
      const success = await deleteGoal(goalId);
      if (success && userData.id) {
        await fetchGoals(userData.id);
      }
      setLoading(false);
    }
  };

  return (
    <DashboardLayout userTier={userData.tier} userName={userData.name} userAvatar={undefined}>
      
      {/* ===== GOALS HERO SECTION (Container Sendiri) ===== */}
      <div className="relative overflow-hidden w-full bg-[#F7F8FA] border-b border-gray-200">
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-12 px-6">

          {/* LEFT: TEXT CONTENT */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-[#2F4157]">
              My Learning Goals
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl leading-relaxed">
              This is your personal commitment space. Set clear goals, track real progress, 
              and let consistency shape your academic and professional journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={() => setShowWizard(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#E56668] text-white font-semibold shadow-md transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              >
                <Plus size={18} /> Set a New Goal
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#294154] text-white font-semibold transition-all hover:bg-[#21363f] active:scale-[0.98]">
                <Target size={18} /> Why Goals Matter
              </button>
            </div>
          </div>

          {/* RIGHT: MASCOT */}
          <div className="lg:col-span-5 order-first lg:order-last flex justify-center lg:justify-end relative">
            <div className="relative w-[280px] sm:w-[350px] lg:w-[450px]">
              <img
                src="/images/contents/general/hi!.svg"
                alt="IELS mascot"
                className="w-full h-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Decorative Shapes */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#2F4157]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E56668]/10 rounded-full blur-3xl pointer-events-none" />
      </div>
      {/* ===== END HERO SECTION ===== */}


      {/* ===== GOALS LIST SECTION (Container Terpisah agar Rapi) ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading your goals...</div>
        ) : goals.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-[#2F4157]">No Goals Yet</h3>
            <p className="text-gray-500 mb-6">Start your journey by setting your first goal above.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => (
              <GoalCard 
                key={goal.id} 
                goal={goal} 
                onDelete={() => handleDeleteGoal(goal.id)} // Pass fungsi delete
              />
            ))}
          </div>
        )}
      </div>

      {/* Goal Creation Wizard */}
      {showWizard && (
        <GoalWizard
          userId={userData.id}
          onClose={() => setShowWizard(false)}
          onSuccess={handleGoalCreated}
        />
      )}

    </DashboardLayout>
  );
}