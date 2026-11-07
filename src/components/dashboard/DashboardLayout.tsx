"use client";

import { ReactNode } from "react";
import DashboardHeader from "./DashboardHeader"; 

interface DashboardLayoutProps {
  children: ReactNode;
  userTier?: "explorer" | "insider" | "visionary"; // Logic tier sudah disiapkan di sini
  userName?: string;
  userAvatar?: string;
}

export default function DashboardLayout({
  children,
  userTier = "explorer", // Default ke explorer (free tier)
  userName = "Learner",
  userAvatar
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      
      {/* 1. TERUSKAN PROP userTier KE HEADER */}
      <DashboardHeader 
        userName={userName} 
        userAvatar={userAvatar} 
        userTier={userTier} // <--- Tambahkan ini
      />

      <main className="flex-1 w-full relative z-0">
        {children}
      </main>

      <footer className="py-8 text-center border-t border-gray-200/60 mt-auto bg-white/50">
        <p className="text-xs text-gray-400 font-medium">
          © 2026 IELS Ecosystem. All rights reserved.
        </p>
      </footer>
    </div>
  );
}