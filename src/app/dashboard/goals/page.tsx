"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Target, Plus, AlertCircle, Activity } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { getUserGoals, deleteGoal } from "@/data/goals"; 
import GoalCard from "@/components/goals/GoalCard";
import GoalWizard from "@/components/goals/GoalWizard";
import type { Goal } from "@/types/goals"; // Pastikan import ini benar

export default function GoalsPage() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
  );

  // State
  const [goals, setGoals] = useState<any[]>([]); // Gunakan any[] sementara jika tipe Goal belum fix, atau Goal[] jika sudah
  const [loading, setLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  
  // ⚠️ FIX: Update tipe state userTier agar sesuai dengan DashboardLayout
  const [userData, setUserData] = useState({ 
    id: "", 
    name: "", 
    tier: "explorer" as "explorer" | "insider" | "visionary", // Default ke explorer
    avatar: "" 
  });

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

      const avatarUrl = user.user_metadata?.avatar_url || "";

      // 2. Ambil Profil Tambahan from DB
      const { data: dbUser } = await supabase
        .from("users")
        .select(`*, memberships(tier)`)
        .eq("id", user.id)
        .single();

      // ⚠️ FIX: Logic Mapping dari Database (basic/pro) ke UI (explorer/insider/visionary)
      let uiTier: "explorer" | "insider" | "visionary" = "explorer";
      
      const dbTier = dbUser?.memberships?.[0]?.tier; // Misal di DB isinya 'pro' atau 'basic'

      if (dbTier === "pro") {
        uiTier = "insider"; // Mapping: Pro -> Insider
      } else if (dbTier === "premium" || dbTier === "visionary") {
        uiTier = "visionary"; // Mapping: Premium -> Visionary
      } else {
        uiTier = "explorer"; // Default: Basic -> Explorer
      }

      // Set Data User
      setUserData({
        id: user.id,
        name: user.user_metadata?.full_name || "Learner",
        tier: uiTier, // Gunakan hasil mapping
        avatar: avatarUrl
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

  // Handle Delete
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
    <DashboardLayout 
      userName={userData.name} 
      userTier={userData.tier} // Sekarang tipenya sudah cocok ("explorer" | "insider" | "visionary")
      userAvatar={userData.avatar}
    >
      {/* ===== GOALS HERO SECTION (OPTIMIZED) ===== */}
<div className="relative bg-[#2F4157] text-white overflow-hidden py-8 lg:py-12 px-4 sm:px-8 lg:px-12">
  {/* Background Decoration */}
  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E56668]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

  <div className="max-w-7xl mx-auto relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      
      {/* LEFT: Heading & Description (60%) */}
      <div className="lg:col-span-7 flex flex-col items-center text-center md:items-start md:text-left space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-[#E56668]">
          <Target size={14} />
          <span>Commitment Space</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-black font-geologica tracking-tighter leading-none">
          My Learning <br className="hidden sm:block" /> Goals & Vision
        </h1>
        
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0 font-medium opacity-80">
          Set clear objectives, track real-time progress, and let consistency 
          shape your academic journey.
        </p>
      </div>

      {/* RIGHT: Quick Actions & Stats (40%) - Mengisi "Zero Space" di kanan */}
      <div className="lg:col-span-5 flex flex-col items-center md:items-end gap-4 w-full">
        <div className="w-full sm:max-w-xs space-y-3">
          <button
            onClick={() => setShowWizard(true)}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#E56668] text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-red-900/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Plus size={18} strokeWidth={3} />
            Set a New Goal
          </button>
          
          <div className="grid grid-cols-2 gap-3">
             <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl text-center">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Active</p>
                <p className="text-xl font-black leading-none">02</p>
             </div>
             <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl text-center">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">Completed</p>
                <p className="text-xl font-black leading-none text-green-400">14</p>
             </div>
          </div>

          <button className="w-full py-3 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <Activity size={14} />
            View Analysis History
          </button>
        </div>
      </div>

    </div>
  </div>
</div>
{/* ===== END HERO SECTION ===== */}

      {/* ===== GOALS LIST SECTION ===== */}
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
                onDelete={() => handleDeleteGoal(goal.id)}
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