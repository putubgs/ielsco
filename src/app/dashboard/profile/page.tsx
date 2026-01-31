"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createBrowserClient } from "@supabase/ssr";
import {
  User, Mail, Building2, Calendar, Target, Edit2, Save, X, Crown, Loader2
} from "lucide-react";

// Kita definisikan tipe data khusus supaya tidak error lagi
type TierType = "basic" | "pro";

export default function ProfilePage() {
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
);

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // FIX 1: Definisikan tipe tier secara eksplisit di sini
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    tier: "basic" as TierType, // <--- KUNCI PERBAIKANNYA DI SINI
    avatar: "",
    institution: "",
    batch: "",
    occupation: "",
    english_level: "",
    interests: [] as string[],
    goals: "",
    joined_date: "",
    user_id_code: ""
  });

  const [formData, setFormData] = useState({
    institution: "",
    batch: "",
    occupation: "",
    english_level: "",
    interests: [] as string[],
    goals: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (authUser) {
        const { data: dbUser } = await supabase
          .from('users')
          .select(`
            *,
            memberships ( tier )
          `) // Kita coba ambil tier dari relasi memberships
          .eq('id', authUser.id)
          .single();

        // Ambil tier dari DB, kalau tidak ada/error, default ke "basic"
        // FIX 2: Paksa tipe datanya dianggap sebagai TierType ("basic" | "pro")
        const dbTier = dbUser?.memberships?.[0]?.tier;
        const finalTier: TierType = (dbTier === "pro" || dbTier === "basic") ? dbTier : "basic";

        const realData = {
          id: authUser.id,
          name: authUser.user_metadata?.full_name || dbUser?.full_name || "Student", 
          email: authUser.email || "",
          tier: finalTier, // Gunakan variabel yang sudah dipastikan aman
          avatar: authUser.user_metadata?.avatar_url || "",
          institution: dbUser?.institution || "-",
          batch: dbUser?.batch || "-",
          occupation: dbUser?.occupation || "-",
          english_level: dbUser?.english_level || "Not Set",
          interests: dbUser?.interests || [], 
          goals: dbUser?.goals || "",
          joined_date: authUser.created_at,
          user_id_code: dbUser?.user_id_code || "IELS-NEW"
        };

        setUser(realData);
        
        setFormData({
          institution: realData.institution,
          batch: realData.batch,
          occupation: realData.occupation,
          english_level: realData.english_level,
          interests: realData.interests,
          goals: realData.goals
        });
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const isPro = user.tier === "pro";

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_profiles') // Harusnya update ke user_profiles, bukan users (sesuai schema baru)
        .upsert({ 
          user_id: user.id,
          institution: formData.institution, 
          batch: formData.batch,
          occupation: formData.occupation,
          english_level: formData.english_level,
          // interests: formData.interests, // Perlu handling array khusus
          goals: formData.goals
        });

        // Fallback update ke tabel users juga jika struktur DB kamu masih campur
        await supabase
        .from('users')
        .update({
             institution: formData.institution, // Hapus baris ini kalau kolomnya sudah pindah ke user_profiles
             batch: formData.batch
        })
        .eq('id', user.id);

      setUser(prev => ({ ...prev, ...formData }));
      setIsEditing(false);
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      institution: user.institution,
      batch: user.batch,
      occupation: user.occupation,
      english_level: user.english_level,
      interests: user.interests,
      goals: user.goals
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <DashboardLayout userTier="basic" userName="Loading..." userAvatar="">
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="animate-spin text-[#E56668]" size={48} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      userTier={user.tier} // <--- ERRORNYA HILANG KARENA TIPE DATA SUDAH COCOK
      userName={user.name}
      userAvatar={user.avatar}
    >
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2F4157] mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your personal information</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#E56668] text-white rounded-xl font-semibold hover:bg-[#C04C4E] transition-all"
            >
              <Edit2 size={18} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                <X size={18} />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-[#E56668] text-white rounded-xl font-semibold hover:bg-[#C04C4E] transition-all"
              >
                <Save size={18} />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="h-32 bg-gradient-to-br from-[#2F4157] via-[#3d5570] to-[#294154] relative" />

          <div className="px-8 pb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between -mt-16 mb-6">
              <div className="flex items-end gap-6 mb-6 lg:mb-0">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#E56668] to-[#C04C4E] flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-xl overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name?.charAt(0)?.toUpperCase() || "U"
                  )}
                </div>
                <div className="pb-2">
                  <h2 className="text-2xl font-bold text-[#2F4157] mb-1">
                    {user.name}
                  </h2>
                  <div className="flex items-center gap-2">
                     <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                        {user.tier === 'pro' ? 'Pro Member' : 'Basic Member'}
                     </span>
                     <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                       {user.user_id_code}
                     </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
               <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                  <Mail className="text-[#E56668]" size={24} />
               </div>
               <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-semibold text-[#2F4157]">{user.email}</p>
               </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
               <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2 font-semibold">Institution</p>
                  {isEditing ? (
                     <input 
                       className="w-full p-2 border rounded" 
                       value={formData.institution} 
                       onChange={e => setFormData({...formData, institution: e.target.value})}
                     />
                  ) : (
                     <p className="font-semibold">{user.institution}</p>
                  )}
               </div>

               <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2 font-semibold">Batch</p>
                  {isEditing ? (
                     <input 
                       className="w-full p-2 border rounded" 
                       value={formData.batch} 
                       onChange={e => setFormData({...formData, batch: e.target.value})}
                     />
                  ) : (
                     <p className="font-semibold">{user.batch}</p>
                  )}
               </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}