"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Cek apakah sedang di halaman dashboard
  const isDashboard = pathname?.startsWith("/dashboard");

  // JIKA DASHBOARD:
  // Render konten langsung tanpa Header public & tanpa padding atas.
  if (isDashboard) {
    return <>{children}</>;
  }

  // JIKA BUKAN DASHBOARD (Public Website):
  // Render Header Public + Main content dengan padding atas (biar gak ketutup header).
  return (
    <>
      <Header />
      <main className="pt-32">
        {children}
      </main>
    </>
  );
}