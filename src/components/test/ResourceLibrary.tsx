"use client";

import { Download, FileText, BookOpen, Headphones, Image as ImageIcon, ExternalLink, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResourceLibraryProps {
  className?: string;
}

const resources = [
  {
    id: 1,
    title: "IELTS Writing Templates Collection",
    description: "50+ proven templates for Task 1 & Task 2. Optimized for Band 7+ score.",
    type: "PDF",
    size: "2.4 MB",
    icon: <FileText size={20} />,
    driveId: "1PuIGIt0e_V1MOhCBSolSWris47PywoV3", 
  },
  {
    id: 2,
    title: "Cambridge IELTS 1-18 Answer Keys",
    description: "Complete answer keys with deep explanations for every section.",
    type: "PDF",
    size: "5.1 MB",
    icon: <BookOpen size={20} />,
    driveId: "1PuIGIt0e_V1MOhCBSolSWris47PywoV3",
  },
  {
    id: 3,
    title: "IELTS Vocabulary by Topic",
    description: "2000+ essential words organized by themes used in real exams.",
    type: "PDF",
    size: "1.8 MB",
    icon: <FileText size={20} />,
    driveId: "1PuIGIt0e_V1MOhCBSolSWris47PywoV3",
  },
  {
    id: 4,
    title: "Listening Practice Audio Pack",
    description: "Authentic listening exercises with transcripts and audio files.",
    type: "ZIP",
    size: "124 MB",
    icon: <Headphones size={20} />,
    driveId: "1PuIGIt0e_V1MOhCBSolSWris47PywoV3",
  }
];

export default function ResourceLibrary({ className }: ResourceLibraryProps) {
  return (
    <div className={cn("mb-20", className)}>
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-[#304156] tracking-tight">
            Learning Resources
          </h2>
          <p className="text-[#577E90] font-medium">
            Full access to all IELS curated materials
          </p>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search materials..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#CDC6BC]/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#577E90]/20 transition-all"
          />
        </div>
      </div>

      {/* Resource List (Bikin List Style biar gak kaku kayak Card) */}
      <div className="grid gap-4">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="group bg-white hover:bg-[#F6F3EF] border border-[#CDC6BC]/30 rounded-2xl p-4 lg:p-6 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-5">
              {/* File Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#577E90]/10 flex items-center justify-center text-[#577E90] group-hover:bg-[#CB2129]/10 group-hover:text-[#CB2129] transition-colors">
                {resource.icon}
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-[#577E90] uppercase tracking-widest bg-[#577E90]/5 px-2 py-0.5 rounded">
                    {resource.type}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {resource.size}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#304156] group-hover:text-[#304156]">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {resource.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`https://drive.google.com/file/d/${resource.driveId}/view`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#304156] text-white rounded-xl text-sm font-bold hover:bg-[#1e2936] transition-all"
              >
                <ExternalLink size={16} />
                Preview
              </a>
              <a
                href={`https://drive.google.com/file/d/${resource.driveId}/view`}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#E56668] text-white rounded-xl text-sm font-bold hover:bg-[#A81B22] transition-all shadow-lg shadow-red-100"
              >
                <Download size={16} />
                Download
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Simplified Footer */}
      <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-sm italic">
        <BookOpen size={14} />
        <span>More resources are added to the IELS database regularly.</span>
      </div>
    </div>
  );
}