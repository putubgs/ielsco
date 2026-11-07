"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useNotifications, type Notification } from "@/hooks/useNotifications";
import {
  Bell, X, Check, CheckCheck,
  Shield, Target, Flame, MessageCircle, Calendar,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

// Icon per tipe notif
const NotifIcon = ({ type }: { type: Notification["type"] }) => {
  const map = {
    system:    { icon: Shield,        bg: "bg-blue-100",   text: "text-blue-600" },
    goal:      { icon: Target,        bg: "bg-purple-100", text: "text-purple-600" },
    streak:    { icon: Flame,         bg: "bg-orange-100", text: "text-orange-600" },
    community: { icon: MessageCircle, bg: "bg-green-100",  text: "text-green-600" },
    event:     { icon: Calendar,      bg: "bg-pink-100",   text: "text-pink-600" },
  };
  const { icon: Icon, bg, text } = map[type];
  return (
    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", bg)}>
      <Icon size={18} className={text} />
    </div>
  );
};

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } = useNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNotifClick = (notif: Notification) => {
    if (!notif.is_read) markAsRead(notif.id);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl hover:bg-white/10 transition-colors"
        aria-label="Notifications"
      >
        <Bell size={20} className="text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#E56668] text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 animate-in zoom-in-50">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in slide-in-from-top-3 fade-in duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-[#2F4157] text-base">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-[#E56668] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#E56668] hover:text-[#C04C4E] transition-colors"
                >
                  <CheckCheck size={14} />
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors text-gray-400"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="max-h-[420px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin text-[#E56668]" size={24} />
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                  <Bell size={28} className="text-gray-300" />
                </div>
                <p className="font-bold text-gray-400 text-sm">All caught up!</p>
                <p className="text-gray-300 text-xs mt-1">No notifications yet</p>
              </div>
            ) : (
              <ul>
                {notifications.map((notif) => (
                  <li key={notif.id}>
                    {notif.link ? (
                      <Link
                        href={notif.link}
                        onClick={() => handleNotifClick(notif)}
                        className={cn(
                          "flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0",
                          !notif.is_read && "bg-blue-50/50 hover:bg-blue-50"
                        )}
                      >
                        <NotifItem notif={notif} />
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleNotifClick(notif)}
                        className={cn(
                          "w-full flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 text-left",
                          !notif.is_read && "bg-blue-50/50 hover:bg-blue-50"
                        )}
                      >
                        <NotifItem notif={notif} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-gray-100 px-5 py-3 bg-gray-50/50">
              <Link
                href="/dashboard/notifications"
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-[#E56668] hover:text-[#C04C4E] transition-colors"
              >
                View all notifications →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Sub-component isi notif
function NotifItem({ notif }: { notif: Notification }) {
  return (
    <>
      <NotifIcon type={notif.type} />
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-sm leading-snug text-[#2F4157]",
          !notif.is_read ? "font-bold" : "font-medium"
        )}>
          {notif.title}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
          {notif.message}
        </p>
        <p className="text-[10px] text-gray-400 mt-1.5 font-medium">
          {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
        </p>
      </div>
      {!notif.is_read && (
        <div className="w-2 h-2 bg-[#E56668] rounded-full shrink-0 mt-1.5" />
      )}
    </>
  );
}