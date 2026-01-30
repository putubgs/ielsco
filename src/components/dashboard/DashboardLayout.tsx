"use client";

import { ReactNode } from "react";
// Pastikan kamu SUDAH punya file DashboardHeader.tsx di folder yang sama
import DashboardHeader from "./DashboardHeader"; 

interface DashboardLayoutProps {
  children: ReactNode;
  userTier?: "basic" | "pro";
  userName?: string;
  userAvatar?: string;
}

export default function DashboardLayout({
  children,
  userTier = "basic",
  userName = "Learner",
  userAvatar
}: DashboardLayoutProps) {
  return (
    // Container utama
    <div className="min-h-screen bg-white flex flex-col font-sans">
      
      {/* 1. PANGGIL DASHBOARD HEADER DI SINI */}
      {/* Ini yang membuat menu dashboard muncul di atas */}
      <DashboardHeader 
        userName={userName} 
        userAvatar={userAvatar} 
      />

      {/* 2. AREA KONTEN (PAGE.TSX MASUK KE SINI) */}
      <main className="flex-1 w-full relative z-0">
        {children}
      </main>

      {/* 3. Footer Kecil */}
      <footer className="py-8 text-center border-t border-gray-200/60 mt-auto bg-white/50">
        <p className="text-xs text-gray-400 font-medium">
          © 2026 IELS Ecosystem. All rights reserved.
        </p>
      </footer>
    </div>
  );
}