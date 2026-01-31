"use client";

import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createBrowserClient } from "@supabase/ssr";
import {
  User, Mail, Building2, Calendar, Target, Edit2, Save, X, 
  Crown, Loader2, Camera, MapPin, Phone, Linkedin, Instagram, 
  Briefcase, GraduationCap, Sparkles, HelpCircle
} from "lucide-react";
import Image from "next/image";

type TierType = "basic" | "pro";

// --- 🎭 PERSONA GENERATOR (GAMIFICATION V2) ---
const getUserPersona = (data: any) => {
  // 1. Cek Tier Level (The Vibe)
  const isExclusive = data.tier === "exclusive"; // Asumsi kalo nanti ada tier exclusive
  const isPro = data.tier === "pro";

  // 2. Base Title based on Occupation (Gen Z Slang)
  let title = "Learning Nomad 🎒"; 
  let desc = "Exploring the world, one word at a time.";
  let color = "bg-gray-100 text-gray-600 border-gray-200"; // Default Basic

  if (data.occupation === "Student") {
    title = isPro ? "Academic Weapon 📚" : "Campus Explorer 🎓";
    desc = isPro ? "GPA stonks going up! 📈" : "Surviving deadlines & coffee.";
  } else if (data.occupation === "Worker") {
    title = isPro ? "Corporate Hustler 💼" : "9-to-5 Survivor ☕";
    desc = isPro ? "Securing the bag & the English skills." : "Working for the weekend.";
  } else if (data.occupation === "Job Seeker") {
    title = "Future CEO 🚀";
    desc = "Manifesting that dream job.";
  }

  // 3. Tier Overrides (Status Symbol)
  if (isExclusive) {
    title = "The Visionary 👑";
    color = "bg-yellow-100 text-yellow-800 border-yellow-200 shadow-sm";
    desc = "Main Character Energy. Leading the way.";
  } else if (isPro) {
    // Tambahin prefix/suffix keren buat Pro
    title = `Insider: ${title}`; 
    color = "bg-purple-100 text-purple-700 border-purple-200 shadow-sm";
  } else {
    // Basic / Explorer
    title = `Explorer: ${title}`;
    color = "bg-blue-50 text-blue-600 border-blue-100";
  }

  return { title, color, desc };
};
export default function ProfilePage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
  );

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Easter Egg State
  const [clickCount, setClickCount] = useState(0);
  const [easterEggActive, setEasterEggActive] = useState(false);

  // State Data User
  const [user, setUser] = useState<any>({
    id: "",
    name: "",
    email: "",
    tier: "basic" as TierType,
    avatar: "",
    user_id_code: "IELS-NEW"
  });

  // State Form (Lengkap)
  const [formData, setFormData] = useState({
    // Basic
    gender: "",
    birth_date: "",
    phone: "",
    domicile: "",
    
    // Status Logic
    occupation: "Student" as "Student" | "Worker" | "Job Seeker" | "Other",
    institution_name: "", // Nama Kampus / Sekolah / Kantor
    institution_role: "", // Jurusan / Jabatan
    
    // Socials
    instagram: "",
    linkedin: "",
    
    // Learning
    english_level: "",
    goals: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (authUser) {
        // Fetch profile data (sesuaikan dengan nama tabel kamu, misal user_profiles)
        const { data: dbUser } = await supabase
          .from('users') // atau 'user_profiles'
          .select(`*, memberships(tier)`)
          .eq('id', authUser.id)
          .single();

        const dbTier = dbUser?.memberships?.[0]?.tier;
        const finalTier: TierType = (dbTier === "pro" || dbTier === "basic") ? dbTier : "basic";

        setUser({
          id: authUser.id,
          name: authUser.user_metadata?.full_name || dbUser?.full_name || "Student",
          email: authUser.email || "",
          tier: finalTier,
          avatar: authUser.user_metadata?.avatar_url || "",
          user_id_code: dbUser?.user_id_code || "IELS-MEMBER"
        });

        // Populate Form
        setFormData({
          gender: dbUser?.gender || "",
          birth_date: dbUser?.birth_date || "",
          phone: dbUser?.phone || "",
          domicile: dbUser?.domicile || "",
          occupation: dbUser?.occupation || "Student",
          institution_name: dbUser?.institution_name || dbUser?.institution || "", // Fallback ke field lama
          institution_role: dbUser?.institution_role || "",
          instagram: dbUser?.instagram || "",
          linkedin: dbUser?.linkedin || "",
          english_level: dbUser?.english_level || "",
          goals: dbUser?.goals || ""
        });
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  // --- HANDLERS ---

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert("Avatar upload logic needs Supabase Storage configured. (File selected: " + file.name + ")");
      // Di sini nanti logic upload ke Supabase Storage bucket 'avatars'
    }
  };

  const handlePersonaClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount + 1 === 5) {
      setEasterEggActive(true);
      alert("🎉 EASTER EGG FOUND: You are now officially a 'Grandmaster of English' (Just kidding, keep studying!)");
    }
  };

const handleSave = async () => {
    setLoading(true);
    try {
      // 1. Sanitasi Data: Ubah string kosong "" jadi null
      // Ini trik supaya database tidak error saat kolom kosong
      const sanitize = (val: string) => (val === "" ? null : val);

      // 2. Siapkan payload
      const updates = {
        gender: sanitize(formData.gender),
        birth_date: sanitize(formData.birth_date), // Kuncinya di sini!
        phone: sanitize(formData.phone),
        domicile: sanitize(formData.domicile),
        occupation: sanitize(formData.occupation),
        institution_name: sanitize(formData.institution_name),
        institution_role: sanitize(formData.institution_role),
        instagram: sanitize(formData.instagram),
        linkedin: sanitize(formData.linkedin),
        english_level: sanitize(formData.english_level),
        goals: sanitize(formData.goals),
        // updated_at: new Date().toISOString(), // Opsional: bagus untuk tracking
      };

      // 3. Kirim ke Supabase
      const { error } = await supabase
        .from('users') 
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setIsEditing(false);
      // alert("Profile updated!"); // Opsional
    } catch (err) {
      console.error("Gagal update profil:", err);
      // Pesan error yang lebih bersahabat
      alert("Gagal menyimpan. Pastikan SQL database sudah dijalankan!");
    } finally {
      setLoading(false);
    }
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

  const persona = getUserPersona({ ...formData, tier: user.tier });

  return (
    <DashboardLayout userTier={user.tier} userName={user.name} userAvatar={user.avatar}>
      <div className="min-h-screen bg-[#F7F8FA] pb-12">
        
        {/* --- HEADER BANNER --- */}
        <div className="h-48 bg-gradient-to-r from-[#2F4157] via-[#435770] to-[#2F4157] relative">
          <div className="absolute inset-0 bg-[url('/images/pattern-opacity.png')] opacity-20"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
          
          {/* --- PROFILE CARD UTAMA --- */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
            
            {/* Dekorasi Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E56668]/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

            {/* AVATAR SECTION */}
            <div className="flex-shrink-0 relative group mx-auto md:mx-0">
              <div 
                onClick={handleAvatarClick}
                className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden relative bg-gray-200 ${isEditing ? "cursor-pointer hover:opacity-90" : ""}`}
              >
                {user.avatar ? (
                  <Image src={user.avatar} alt="Profile" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#2F4157] text-white text-4xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
                
                {/* Overlay Edit Icon */}
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={32} />
                  </div>
                )}
              </div>
              <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} accept="image/*" />
              
 
</div>

            

            {/* INFO & ACTIONS */}
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-[#2F4157]">{user.name}</h1>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                     {/* BADGE TIER (Relatable Version) */}
                   
  <span className={`
    px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5
    ${user.tier === 'pro' 
      ? 'bg-[#E56668]/10 text-[#E56668] border-[#E56668]/20' 
      : (user.tier === 'exclusive' 
          ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
          : 'bg-blue-50 text-blue-600 border-blue-100')
    }
  `}>
    {user.tier === 'pro' && <Sparkles size={12} fill="currentColor" />}
    {user.tier === 'exclusive' && <Crown size={12} fill="currentColor" />}
    {user.tier === 'basic' && <MapPin size={12} />}
    
    {/* LOGIC NAMA TIER */}
    {user.tier === 'exclusive' ? 'The Visionary' : 
     user.tier === 'pro' ? 'The Insider' : 'The Explorer'}
  </span>
   <span className="text-gray-500 text-sm flex items-center gap-1">
                      <Mail size={14} /> {user.email}
                    </span>
  {/* USER ID BADGE */}
  <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-mono border border-gray-200">
    #{user.user_id_code}
  </span>
                   
                    <span className="text-gray-300">•</span>

                  </div>
                </div>

                {/* Edit/Save Buttons */}
                <div>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-200 text-[#2F4157] rounded-xl font-bold hover:border-[#E56668] hover:text-[#E56668] transition-all shadow-sm"
                    >
                      <Edit2 size={16} /> Edit Profile
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#E56668] text-white rounded-xl font-bold hover:bg-[#d65557] transition-all shadow-lg shadow-red-200"
                      >
                        <Save size={16} /> Save
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* INTERACTIVE PERSONA BADGE */}
              <div 
                onClick={handlePersonaClick}
                className={`
                  inline-flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all select-none
                  ${easterEggActive ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white animate-pulse" : persona.color}
                `}
              >
                <div className="p-1.5 bg-white/20 rounded-full">
                  {easterEggActive ? <Crown size={16} /> : <Sparkles size={16} />}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider opacity-80">Current Persona</p>
                  <p className="font-bold text-sm leading-none">{easterEggActive ? "Grandmaster of IELS 👑" : persona.title}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2 italic pl-1">
                "{easterEggActive ? "You unlocked the secret rank!" : persona.desc}"
              </p>
            </div>
          </div>

          {/* --- CONTENT GRID --- */}
          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            
            {/* LEFT COL: Personal Info (2/3 width on large) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* 1. BIODATA */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h3 className="text-lg font-bold text-[#2F4157] mb-6 flex items-center gap-2">
                  <User className="text-[#E56668]" size={20} /> Personal Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <InputGroup label="Gender" isEditing={isEditing}>
                    <select 
                      className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E56668]/20 transition-all"
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      disabled={!isEditing}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </InputGroup>

                  <InputGroup label="Date of Birth" isEditing={isEditing}>
                    <div className="relative">
                      <input 
                        type="date"
                        className="w-full p-3 pl-10 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E56668]/20 transition-all"
                        value={formData.birth_date}
                        onChange={(e) => setFormData({...formData, birth_date: e.target.value})}
                        disabled={!isEditing}
                      />
                      <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>
                  </InputGroup>

                  <InputGroup label="Phone Number" isEditing={isEditing}>
                    <div className="relative">
                      <input 
                        type="tel"
                        placeholder="+62..."
                        className="w-full p-3 pl-10 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E56668]/20 transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        disabled={!isEditing}
                      />
                      <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>
                  </InputGroup>

                  <InputGroup label="Domicile (City, Country)" isEditing={isEditing}>
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder="e.g. Jakarta, Indonesia"
                        className="w-full p-3 pl-10 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E56668]/20 transition-all"
                        value={formData.domicile}
                        onChange={(e) => setFormData({...formData, domicile: e.target.value})}
                        disabled={!isEditing}
                      />
                      <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>
                  </InputGroup>
                </div>
              </section>

              {/* 2. ACADEMIC / PROFESSIONAL */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h3 className="text-lg font-bold text-[#2F4157] mb-6 flex items-center gap-2">
                  <Briefcase className="text-[#E56668]" size={20} /> Occupation & Education
                </h3>

                <div className="space-y-6">
                  {/* Occupation Selector */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Student", "Worker", "Job Seeker", "Other"].map((type) => (
                      <button
                        key={type}
                        onClick={() => isEditing && setFormData({...formData, occupation: type as any})}
                        disabled={!isEditing}
                        className={`
                          py-2 px-4 rounded-xl text-sm font-bold border transition-all
                          ${formData.occupation === type 
                            ? "bg-[#2F4157] text-white border-[#2F4157]" 
                            : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"}
                          ${!isEditing && formData.occupation !== type ? "opacity-50" : ""}
                        `}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Fields */}
                  <div className="grid md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <InputGroup 
                      label={formData.occupation === "Worker" ? "Company / Organization" : "School / University"} 
                      isEditing={isEditing}
                    >
                      <div className="relative">
                        <input 
                          type="text"
                          placeholder={formData.occupation === "Worker" ? "e.g. GoTo, Google" : "e.g. Universitas Indonesia"}
                          className="w-full p-3 pl-10 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#E56668]/20 transition-all"
                          value={formData.institution_name}
                          onChange={(e) => setFormData({...formData, institution_name: e.target.value})}
                          disabled={!isEditing}
                        />
                        <Building2 className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      </div>
                    </InputGroup>

                    <InputGroup 
                      label={formData.occupation === "Worker" ? "Job Title / Role" : "Major / Field of Study"} 
                      isEditing={isEditing}
                    >
                      <div className="relative">
                        <input 
                          type="text"
                          placeholder={formData.occupation === "Worker" ? "e.g. Product Manager" : "e.g. International Relations"}
                          className="w-full p-3 pl-10 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#E56668]/20 transition-all"
                          value={formData.institution_role}
                          onChange={(e) => setFormData({...formData, institution_role: e.target.value})}
                          disabled={!isEditing}
                        />
                        <GraduationCap className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      </div>
                    </InputGroup>
                  </div>
                </div>
              </section>

            </div>

            {/* RIGHT COL: Socials & Settings (1/3 width) */}
            <div className="space-y-8">
              
              {/* SOCIALS */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-[#2F4157] flex items-center gap-2">
                    <Target className="text-[#E56668]" size={20} /> Socials
                  </h3>
                  <div className="group relative">
                    <HelpCircle size={16} className="text-gray-400 cursor-help" />
                    <div className="absolute right-0 top-6 w-48 bg-[#2F4157] text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      Networking features coming soon! Add your profiles to be ready.
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <InputGroup label="Instagram Username" isEditing={isEditing}>
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder="@username"
                        className="w-full p-3 pl-10 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E56668]/20 transition-all"
                        value={formData.instagram}
                        onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                        disabled={!isEditing}
                      />
                      <Instagram className="absolute left-3 top-3.5 text-pink-500" size={18} />
                    </div>
                  </InputGroup>

                  <InputGroup label="LinkedIn URL" isEditing={isEditing}>
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder="linkedin.com/in/..."
                        className="w-full p-3 pl-10 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E56668]/20 transition-all"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                        disabled={!isEditing}
                      />
                      <Linkedin className="absolute left-3 top-3.5 text-blue-600" size={18} />
                    </div>
                  </InputGroup>
                </div>
              </section>

              {/* LEARNING GOALS (READ ONLY FOR NOW) */}
              <section className="bg-gradient-to-br from-[#2F4157] to-[#1e2b3a] rounded-2xl shadow-sm border border-[#2F4157] p-6 text-white">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Target className="text-yellow-400" size={20} /> Learning Profile
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Current Goal</p>
                    <p className="font-semibold">{formData.goals || "No active goal set"}</p>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Self-Assessed Level</p>
                    <p className="font-semibold">{formData.english_level || "Not set"}</p>
                  </div>
                </div>
                <button className="w-full mt-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-colors">
                  Update Learning Goals
                </button>
              </section>

            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

// --- HELPER COMPONENT ---
const InputGroup = ({ label, children, isEditing }: { label: string, children: React.ReactNode, isEditing: boolean }) => (
  <div className={`transition-opacity duration-300 ${!isEditing ? "opacity-90" : "opacity-100"}`}>
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
      {label}
    </label>
    {children}
  </div>
);