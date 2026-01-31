"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createBrowserClient } from "@supabase/ssr";
import { eventsData, EventData } from "@/data/events";
import Image from "next/image";
import {
  Calendar, Clock, MapPin, ExternalLink, CheckCircle2,
  Filter, Loader2, Star, Trophy, AlertCircle, PlusCircle, MessageSquare
} from "lucide-react";

// --- TYPES ---
type MergedEvent = EventData & {
  db_status: "registered" | "attended" | null;
  is_past: boolean;
  eventDateObj: Date; // Helper date object
};

// --- HELPER: GOOGLE CALENDAR LINK ---
const getGoogleCalendarLink = (event: MergedEvent) => {
  const title = encodeURIComponent(event.title);
  // Asumsi durasi 2 jam jika tidak ada info
  const start = new Date(event.startDate);
  start.setHours(19, 0, 0); // Default jam 7 malam jika tidak ada data jam spesifik
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // +2 jam

  const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");
  
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(start)}/${formatDate(end)}&details=Join+this+event+by+IELS!&sf=true&output=xml`;
};

export default function EventsPage() {
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"
);

  const [loading, setLoading] = useState(true);
  const [mergedEvents, setMergedEvents] = useState<MergedEvent[]>([]);
  const [filter, setFilter] = useState<"upcoming" | "past" | "all">("upcoming");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // --- 1. FETCH & MERGE DATA ---
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: registrations } = await supabase
          .from("event_registrations")
          .select("event_id, attended")
          .eq("user_id", user.id);

        const now = new Date();
        
        const processed = eventsData.map((staticEv) => {
          const userReg = registrations?.find((r) => r.event_id === staticEv.id);
          
          let status: "registered" | "attended" | null = null;
          if (userReg) {
            status = userReg.attended ? "attended" : "registered"; 
          }

          const eventDate = new Date(staticEv.startDate);
          
          return {
            ...staticEv,
            db_status: status,
            is_past: eventDate < now,
            eventDateObj: eventDate
          };
        });

        // Sort: Upcoming (terdekat dulu), Past (terbaru dulu)
        processed.sort((a, b) => a.eventDateObj.getTime() - b.eventDateObj.getTime());
        
        setMergedEvents(processed);
      }
      setLoading(false);
    };

    initData();
  }, [supabase, refreshTrigger]);

  // --- ACTIONS ---
  const handleRegister = async (event: MergedEvent) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("event_registrations")
      .upsert({
        user_id: user.id,
        event_id: event.id, 
        name: user.user_metadata.full_name,
        email: user.email,
        attended: false,
        created_at: new Date().toISOString()
      }, { onConflict: 'user_id, event_id' });

    if (!error) setRefreshTrigger(prev => prev + 1);
    window.open(event.registrationLink, "_blank");
  };

  const handleMarkAttended = async (eventId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (window.confirm("Confirm your attendance? This will update your learning stats.")) {
      const { error } = await supabase
        .from("event_registrations")
        .upsert({
           user_id: user.id,
           event_id: eventId,
           attended: true,
           updated_at: new Date().toISOString()
        }, { onConflict: 'user_id, event_id' });

      if (!error) setRefreshTrigger(prev => prev + 1);
    }
  };

  // --- STATS CALCULATION ---
  const totalEvents = mergedEvents.length;
  const attendedCount = mergedEvents.filter(e => e.db_status === "attended").length;
  const upcomingCount = mergedEvents.filter(e => !e.is_past).length;

  const displayEvents = mergedEvents.filter(ev => {
    if (filter === "upcoming") return !ev.is_past;
    if (filter === "past") return ev.is_past;
    return true;
  });

  // Hero Event = Event Upcoming Paling Dekat
  const heroEvent = mergedEvents.find(e => !e.is_past);

  return (
    <DashboardLayout userTier="basic" userName="" userAvatar="">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-10">
        
        {/* --- HEADER & STATS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-gradient-to-r from-[#2F4157] to-[#1a253a] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
             <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-2">My Event Journey</h1>
                <p className="text-white/80 max-w-xl">
                  Track your participation, register for exclusive workshops, and build your learning portfolio.
                </p>
                <div className="flex gap-6 mt-8">
                   <div>
                      <p className="text-3xl font-bold">{attendedCount}</p>
                      <p className="text-sm text-white/60 uppercase tracking-wider font-medium">Completed</p>
                   </div>
                   <div className="w-px bg-white/20 h-12"></div>
                   <div>
                      <p className="text-3xl font-bold">{upcomingCount}</p>
                      <p className="text-sm text-white/60 uppercase tracking-wider font-medium">Upcoming</p>
                   </div>
                </div>
             </div>
             {/* Decor */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#E56668]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          </div>

          {/* Quick Stat Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-center items-center text-center">
             <div className="w-14 h-14 bg-yellow-50 rounded-full flex items-center justify-center mb-3">
                <Trophy className="text-yellow-600" size={28} />
             </div>
             <p className="text-[#2F4157] font-bold text-lg">Participation Rate</p>
             <p className="text-3xl font-bold text-[#E56668] mt-1">
               {totalEvents > 0 ? Math.round((attendedCount / totalEvents) * 100) : 0}%
             </p>
             <p className="text-xs text-gray-400 mt-2">Keep it up!</p>
          </div>
        </div>

        {/* --- TABS --- */}
        <div className="flex items-center gap-2 border-b border-gray-200">
           {(['upcoming', 'past', 'all'] as const).map((t) => (
             <button
               key={t}
               onClick={() => setFilter(t)}
               className={`px-6 py-3 font-medium text-sm transition-all relative ${
                 filter === t 
                   ? "text-[#E56668]" 
                   : "text-gray-500 hover:text-gray-700"
               }`}
             >
               {t.charAt(0).toUpperCase() + t.slice(1)}
               {filter === t && (
                 <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E56668] rounded-t-full"></div>
               )}
             </button>
           ))}
        </div>

        {loading ? (
           <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#E56668]" size={32}/></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            
            {/* --- HERO CARD (If filter is Upcoming & Hero exists) --- */}
            {filter === "upcoming" && heroEvent && (
               <div className="col-span-full mb-4">
                  <div className="group relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all">
                     <div className="grid md:grid-cols-2 h-full">
                        {/* Image Side */}
                        <div className="relative h-64 md:h-auto overflow-hidden">
                           <Image 
                             src={heroEvent.poster} 
                             alt={heroEvent.title}
                             fill
                             className="object-cover transition-transform duration-700 group-hover:scale-105"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                           <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-[#E56668] uppercase tracking-wide">
                              Recommended for You
                           </div>
                        </div>

                        {/* Content Side */}
                        <div className="p-8 md:p-10 flex flex-col justify-center">
                           <div className="flex items-center gap-2 mb-3 text-sm text-gray-500 font-medium">
                              <Calendar size={16} className="text-[#E56668]"/>
                              {heroEvent.eventDateObj.toLocaleDateString("en-US", { weekday: 'long', day: 'numeric', month: 'long' })}
                           </div>
                           
                           <h2 className="text-3xl font-bold text-[#2F4157] mb-4 leading-tight">{heroEvent.title}</h2>
                           
                           <div 
                             className="text-gray-600 line-clamp-3 mb-8 prose prose-sm"
                             dangerouslySetInnerHTML={{ __html: heroEvent.description }} 
                           />

                           <div className="flex flex-wrap gap-4">
                              {heroEvent.db_status === "registered" ? (
                                <button className="px-8 py-3 bg-green-50 text-green-700 border border-green-200 rounded-xl font-bold flex items-center gap-2 cursor-default">
                                   <CheckCircle2 size={20}/> Registered
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleRegister(heroEvent)}
                                  className="px-8 py-3 bg-[#E56668] text-white rounded-xl font-bold hover:bg-[#C04C4E] hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
                                >
                                  Register Now <ExternalLink size={18}/>
                                </button>
                              )}
                              
                              {/* Reminder Button */}
                              <a 
                                href={getGoogleCalendarLink(heroEvent)}
                                target="_blank"
                                rel="noreferrer"
                                className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
                              >
                                <PlusCircle size={18}/> Add Reminder
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* --- STANDARD EVENT CARDS --- */}
            {displayEvents.filter(e => e.id !== heroEvent?.id || filter !== 'upcoming').map((event) => (
              <div 
                key={event.id} 
                className={`bg-white rounded-3xl border flex flex-col overflow-hidden transition-all duration-300 group ${
                  event.is_past ? "border-gray-100 opacity-80 hover:opacity-100" : "border-gray-200 hover:shadow-xl hover:-translate-y-1 hover:border-[#E56668]/30"
                }`}
              >
                {/* Poster Image */}
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                   {event.poster ? (
                      <Image 
                        src={event.poster} 
                        alt={event.title} 
                        fill
                        className={`object-cover transition-transform duration-500 group-hover:scale-110 ${event.is_past ? 'grayscale' : ''}`}
                      />
                   ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#2F4157] to-[#4B5B6E]"></div>
                   )}
                   
                   {/* Date Badge Overlay */}
                   <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-2 text-center min-w-[60px] shadow-sm">
                      <p className="text-xs font-bold text-[#E56668] uppercase">
                        {event.eventDateObj.toLocaleDateString('en-US', { month: 'short' })}
                      </p>
                      <p className="text-xl font-bold text-[#2F4157]">
                        {event.eventDateObj.getDate()}
                      </p>
                   </div>

                   {/* Status Badge Overlay */}
                   {event.db_status === 'attended' && (
                      <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                         <Star size={12} fill="white"/> Completed
                      </div>
                   )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                   <h3 className="text-lg font-bold text-[#2F4157] mb-2 line-clamp-2 group-hover:text-[#E56668] transition-colors">
                     {event.title}
                   </h3>
                   
                   <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                         <Clock size={14}/> 
                         {event.eventDateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="flex items-center gap-1">
                         <MapPin size={14}/> Online
                      </div>
                   </div>

                   <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      {/* LOGIC TOMBOL TERGANTUNG STATUS */}
                      {!event.is_past ? (
                         event.db_status === 'registered' ? (
                            <div className="flex gap-2 w-full">
                               <button 
                                 onClick={() => window.open(event.registrationLink, "_blank")}
                                 className="flex-1 py-2 bg-green-50 text-green-700 text-sm font-semibold rounded-lg hover:bg-green-100 transition"
                               >
                                 Open Link
                               </button>
                               <a 
                                 href={getGoogleCalendarLink(event)}
                                 target="_blank"
                                 className="p-2 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50"
                                 title="Add to Calendar"
                               >
                                 <PlusCircle size={18}/>
                               </a>
                            </div>
                         ) : (
                            <button 
                              onClick={() => handleRegister(event)}
                              className="w-full py-2 bg-[#2F4157] text-white text-sm font-semibold rounded-lg hover:bg-[#1a253a] transition shadow-md shadow-gray-200"
                            >
                              Register
                            </button>
                         )
                      ) : (
                         /* LOGIC PAST EVENT */
                         event.db_status === 'attended' ? (
                            <button className="w-full py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                               <MessageSquare size={16}/> Give Feedback
                            </button>
                         ) : (
                            <div className="w-full flex items-center justify-between gap-2">
                               <p className="text-xs text-gray-400 italic">Joined this?</p>
                               <button 
                                 onClick={() => handleMarkAttended(event.id)}
                                 className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg hover:bg-green-50 hover:text-green-700 transition"
                               >
                                 Yes, Count Me In
                               </button>
                            </div>
                         )
                      )}
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && displayEvents.length === 0 && (
           <div className="text-center py-20">
              <div className="inline-block p-4 bg-gray-50 rounded-full mb-4">
                 <AlertCircle className="text-gray-400" size={32}/>
              </div>
              <p className="text-gray-500">No events found in this category.</p>
           </div>
        )}

      </div>
    </DashboardLayout>
  );
}