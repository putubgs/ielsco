"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { 
  LayoutDashboard, 
  CalendarDays, 
  ShoppingBag, 
  Bell, 
  UserCircle, 
  LogOut, 
  Settings,
  Menu,
  X,
  ChevronDown,
  Trophy,
  User,
  HelpCircle,
  MessageSquarePlus,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardHeader({ userAvatar, userName }: { userAvatar?: string, userName?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Goals", path: "/dashboard/goals", icon: Trophy },
    { name: "My Schedule", path: "/dashboard/events", icon: CalendarDays },
    { name: "Marketplace", path: "/dashboard/shop", icon: ShoppingBag },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#2F4157] shadow-lg border-b border-white/10 transition-all duration-300">
      <div className="w-full px-4 sm:px-8 lg:px-[100px] py-6 lg:py-9"> {/* Padding disesuaikan sedikit biar ga terlalu tebal */}
        <div className="flex items-center justify-between">
          
          {/* 1. LOGO (LEFT) */}
          <div className="flex-shrink-0 flex items-center gap-3 lg:gap-5">
             <Link href="/dashboard" className="flex items-center font-geologica gap-3 lg:gap-[19px]">
                <Image 
                  src="/images/logos/iels_white.png" 
                  alt="IELS" 
                  width={60} 
                  height={60} 
                  className="lg:w-[65px]" // Sedikit diperkecil agar proporsional
                />
                <div className="hidden lg:flex flex-col text-white">
                  <span className="font-bold text-lg lg:text-xl leading-none tracking-tight group-hover:text-gray-200">
                    Dashboard [BETA]
                  </span>
                  <span className="text-[10px] lg:text-xs text-white/60 tracking-wider uppercase mt-0.5">
                    Learning Space
                  </span>
                </div>
             </Link>
          </div>

          {/* 2. NAVIGATION (CENTER - DESKTOP ONLY) */}
          <nav className="hidden md:flex items-center gap-2 justify-center flex-1 px-8">
            {navItems.map((item) => {
              // LOGIC HIGHLIGHT BARU:
              // 1. Jika path tepat sama (strict equality) -> Active
              // 2. Jika path startsWith dan BUKAN dashboard root -> Active (untuk sub-halaman goals/shop)
              const isActive = item.path === "/dashboard" 
                ? pathname === "/dashboard" 
                : pathname?.startsWith(item.path);

              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                    "hover:scale-[1.03] active:scale-95",
                    isActive 
                      ? "bg-white text-[#2F4157] shadow-md font-bold" 
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  )}
                >
                  <Icon size={18} className={cn(isActive ? "text-[#E56668]" : "text-gray-400 group-hover:text-white")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* 3. RIGHT ACTIONS (Cart, Bell, Profile) */}
          <div className="flex items-center gap-4 lg:gap-6">
            
            {/* Cart & Bell */}
            <div className="flex items-center gap-3 border-r border-white/10 pr-5">
              <button className="relative p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all group">
                <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#E56668] rounded-full border border-[#2F4157]"></span>
              </button>
              <button className="relative p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all group">
                <Bell size={22} className="group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 group focus:outline-none"
              >
                <div className="hidden lg:flex flex-col items-end">
                   <span className="text-sm font-bold text-white leading-none">{userName?.split(" ")[0]}</span>
                   <span className="text-[11px] text-gray-400 mt-0.5 group-hover:text-[#E56668] transition-colors">Personalize</span>
                </div>
                <div className="relative">
                  {userAvatar ? (
                    <Image 
                      src={userAvatar} 
                      alt="Profile" 
                      width={44} 
                      height={44} 
                      className="rounded-full border-2 border-white/20 group-hover:border-[#E56668] transition-all object-cover"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white border-2 border-white/20 group-hover:border-[#E56668] transition-all">
                      <UserCircle size={24} />
                    </div>
                  )}
                  <div className={`absolute -bottom-1 -right-1 bg-white rounded-full p-[3px] text-[#2F4157] transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}>
                    <ChevronDown size={12} strokeWidth={3} />
                  </div>
                </div>
              </button>

              {/* === IMPROVED DROPDOWN MENU === */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-4 w-72 bg-white rounded-2xl shadow-2xl py-2 border border-gray-100 transform transition-all origin-top-right z-50 animate-in fade-in zoom-in-95 duration-100">
                  
                  {/* Header: Clickable Profile */}
                  <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#2F4157] flex items-center justify-center text-white font-bold text-lg">
                      {userName?.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-[#2F4157] truncate">{userName}</p>
                      <Link href="/dashboard/profile" className="text-xs text-[#E56668] hover:underline font-medium flex items-center gap-1">
                        View & Edit Profile <ChevronDown size={10} className="-rotate-90" />
                      </Link>
                    </div>
                  </div>
                  
                  {/* Menu Groups */}
                  <div className="p-2 space-y-1">
                    <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2 mb-1">Account</p>
                    
                    <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#2F4157] rounded-xl transition-colors">
                      <User size={18} className="text-gray-400" />
                      My Profile
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#2F4157] rounded-xl transition-colors">
                      <Settings size={18} className="text-gray-400" />
                      Settings & Billing
                    </Link>
                    <Link href="/dashboard/shop/orders" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#2F4157] rounded-xl transition-colors">
                      <CreditCard size={18} className="text-gray-400" />
                      My Orders & Transactions
                    </Link>

                    <div className="h-px bg-gray-100 my-1 mx-3" />
                    
                    <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-2 mb-1">Support</p>
                    <Link href="/dashboard/help" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#2F4157] rounded-xl transition-colors">
                      <HelpCircle size={18} className="text-gray-400" />
                      Help Center
                    </Link>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#2F4157] rounded-xl transition-colors text-left">
                      <MessageSquarePlus size={18} className="text-gray-400" />
                      Give Feedback (Beta)
                    </button>
                  </div>
                  
                  <div className="p-2 border-t border-gray-100 mt-1">
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-3 py-3 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl font-bold transition-colors"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV DROPDOWN */}
      {isMobileOpen && (
        <div className="md:hidden bg-[#263546] border-t border-white/10 p-4 space-y-2 shadow-inner absolute w-full left-0 z-50">
           {navItems.map((item) => {
             const isActive = item.path === "/dashboard" 
                ? pathname === "/dashboard" 
                : pathname?.startsWith(item.path);

             return (
               <Link
                 key={item.path}
                 href={item.path}
                 onClick={() => setIsMobileOpen(false)}
                 className={cn(
                   "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                   isActive 
                     ? "bg-[#E56668] text-white" 
                     : "text-gray-300 hover:bg-white/5"
                 )}
              >
                 <item.icon size={20} />
                 {item.name}
              </Link>
             );
           })}
        </div>
      )}
    </header>
  );
}