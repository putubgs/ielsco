"use client";

import { PlayCircle, Clock, BookOpen, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface MasterClassSectionProps {
  className?: string;
}

const masterClassVideos = [
  {
    id: 1,
    title: "IELTS Writing Task 1 - Complete Guide",
    description: "Learn how to describe graphs, charts, and diagrams effectively",
    duration: "45 mins",
    instructor: "Sarah Johnson",
    youtubeId: "1IVFRWCpNxE", // Diambil dari link yang kamu kasih
    completed: false,
  },
  {
    id: 2,
    title: "IELTS Writing Task 2 - Essay Structure",
    description: "Master the art of writing high-scoring IELTS essays",
    duration: "52 mins",
    instructor: "Michael Chen",
    youtubeId: "h_04WjGv7Tc", 
    completed: false,
  },
  {
    id: 3,
    title: "IELTS Speaking Part 1 & 2 - Strategies",
    description: "Boost your speaking confidence with proven techniques",
    duration: "38 mins",
    instructor: "Emma Williams",
    youtubeId: "sRFEVatCo6A",
    completed: false,
  },
  {
    id: 4,
    title: "IELTS Listening - Note-taking Skills",
    description: "Improve your listening score with effective note-taking",
    duration: "41 mins",
    instructor: "David Park",
    youtubeId: "P_v9E_v_EXAMPLE", // Ganti dengan ID real nanti
    completed: false,
  },
];

// Helper untuk generate Thumbnail YouTube HQ
const getYoutubeThumbnail = (id: string) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

export default function MasterClassSection({ className }: MasterClassSectionProps) {
  return (
    <div className={cn("mb-12", className)}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#CB2129] font-bold text-sm uppercase tracking-wider mb-2">
            <Sparkles size={16} />
            Premium Access
          </div>
          <h2 className="text-3xl font-bold text-[#304156] font-geologica">
            IELS Master Class
          </h2>
          <p className="text-gray-500 mt-1">
            Expert-led video lessons to boost your IELTS score.
          </p>
        </div>
        <div className="px-4 py-2 bg-[#F6F3EF] border border-[#CDC6BC] rounded-full">
          <p className="text-sm font-bold text-[#553223]">
            {masterClassVideos.length} Modules Available
          </p>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {masterClassVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-2xl border border-[#CDC6BC]/50 shadow-sm hover:shadow-xl transition-all overflow-hidden group flex flex-col"
          >
            {/* Thumbnail Box */}
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={getYoutubeThumbnail(video.youtubeId)} 
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#304156]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle size={60} className="text-white drop-shadow-2xl" />
              </div>
              
              {/* Badges */}
              <div className="absolute top-3 right-3 px-3 py-1 bg-[#304156]/80 backdrop-blur-md rounded-lg text-white text-xs font-bold flex items-center gap-1">
                <Clock size={12} />
                {video.duration}
              </div>

              {video.completed && (
                <div className="absolute top-3 left-3 px-3 py-1 bg-[#CB2129] rounded-lg text-white text-xs font-bold flex items-center gap-1 shadow-lg">
                  <CheckCircle2 size={12} />
                  Completed
                </div>
              )}
            </div>

            {/* Content Box */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-[#304156] mb-3 line-clamp-2 leading-tight group-hover:text-[#CB2129] transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                {video.description}
              </p>

              <div className="mt-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#F6F3EF] rounded-full flex items-center justify-center border border-[#CDC6BC]">
                    <BookOpen size={16} className="text-[#553223]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold">Instructor</p>
                    <p className="text-sm font-bold text-[#304156]">{video.instructor}</p>
                  </div>
                </div>

                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#E56668] text-white rounded-xl font-bold hover:bg-[#A81B22] shadow-md hover:shadow-red-200 transition-all active:scale-95"
                >
                  <PlayCircle size={18} />
                  Watch
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom IELS Style Banner */}
      <div className="mt-12 p-8 bg-[#304156] rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-full bg-[#577E90]/20 skew-x-12 translate-x-20 transition-transform group-hover:translate-x-10 duration-700" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-[#CB2129] rounded-2xl flex items-center justify-center shadow-xl rotate-3">
            <PlayCircle size={32} className="text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-xl font-bold text-white mb-1 font-geologica">
              Unlock Your Potential with IELS Weekly Updated Classes
            </h4>
            <p className="text-[#577E90] font-medium">
              We add new materials every week to ensure you get the best preparation.
            </p>
          </div>
          <button className="px-8 py-3 bg-[#E56668] text-white rounded-xl font-bold hover:bg-[#A81B22] transition-all shadow-lg hover:shadow-red-900/40">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}