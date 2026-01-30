"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  ShoppingBag, 
  Bell, 
  UserCircle, 
  LogOut, 
  Settings,
  Menu,
  X,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardHeader({ userAvatar, userName }: { userAvatar?: string, userName?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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
    { name: "My Schedule", path: "/dashboard/events", icon: CalendarDays },
    { name: "Community", path: "/dashboard/community", icon: Users },
    { name: "Marketplace", path: "/dashboard/shop", icon: ShoppingBag },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#2F4157] shadow-lg border-b border-white/10 transition-all duration-300">
      {/* REVISI SPACING:
        - px-4 sm:px-8 lg:px-[100px] -> Mengikuti padding horizontal Public Header
        - py-4 lg:py-6 -> Memberikan ruang vertikal (height) agar tidak gepeng
      */}
      <div className="w-full px-4 sm:px-8 lg:px-[100px] py-8 lg:py-10">
        <div className="flex items-center justify-between">
          
          {/* 1. LOGO (LEFT) */}
          <div className="flex-shrink-0 flex items-center gap-3 lg:gap-5">
             <Link href="/dashboard" className="flex items-center font-geologica gap-3 lg:gap-[19px]">
                <Image 
                  src="/images/logos/iels_white.png" 
                  alt="IELS" 
                  width={60} 
                  height={60} 
                  // Ukuran logo diperbesar agar proporsional dengan header yang lebih tinggi
                  className="lg:w-[75px]"
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
              const isActive = pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    // Padding tombol diperbesar (px-5 py-2.5) agar lebih estetik
                    "flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                    "hover:scale-[1.03] active:scale-95",
                    isActive 
                      ? "bg-white text-[#2F4157] shadow-md font-semibold" 
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  )}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* 3. RIGHT ACTIONS (Cart, Bell, Profile) */}
          <div className="flex items-center gap-4 lg:gap-6">
            
            {/* Cart & Bell */}
            <div className="flex items-center gap-3 border-r border-white/10 pr-5">
              <button className="relative p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all">
                <ShoppingBag size={22} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#E56668] rounded-full border border-[#2F4157]"></span>
              </button>
              <button className="relative p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all">
                <Bell size={22} />
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
                   <span className="text-[11px] text-gray-400 mt-0.5">View Profile</span>
                </div>
                <div className="relative">
                  {userAvatar ? (
                    <Image 
                      src={userAvatar} 
                      alt="Profile" 
                      width={44} 
                      height={44} 
                      className="rounded-full border-2 border-white/20 group-hover:border-[#E56668] transition-colors object-cover"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white border-2 border-white/20">
                      <UserCircle size={24} />
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-[3px] text-[#2F4157]">
                    <ChevronDown size={12} strokeWidth={3} />
                  </div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-4 w-60 bg-white rounded-2xl shadow-2xl py-2 border border-gray-100 transform transition-all origin-top-right z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-5 py-4 border-b border-gray-100 mb-1 bg-gray-50/50 rounded-t-2xl">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Signed in as</p>
                    <p className="text-sm font-bold text-[#2F4157] truncate">{userName}</p>
                  </div>
                  
                  <div className="p-2 space-y-1">
                    <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#2F4157] rounded-xl transition-colors">
                      <Settings size={18} className="text-gray-400" />
                      Settings & Billing
                    </Link>
                    <Link href="/dashboard/shop/orders" className="flex items-center gap-3 px-3 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#2F4157] rounded-xl transition-colors">
                      <ShoppingBag size={18} className="text-gray-400" />
                      My Orders
                    </Link>
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
           {navItems.map((item) => (
             <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  pathname === item.path 
                    ? "bg-[#E56668] text-white" 
                    : "text-gray-300 hover:bg-white/5"
                )}
             >
                <item.icon size={20} />
                {item.name}
             </Link>
           ))}
        </div>
      )}
    </header>
  );
}