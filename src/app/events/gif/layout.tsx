// src/app/events/gif/layout.tsx

import GIFHeader from "@/components/GIFHeader"; // Sesuaikan path importnya dengan foldermu

export default function GIFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Pasang headernya di sini */}
      <GIFHeader />
      
        <main>
        {children}
      </main>
    </div>
  );
}