// supabase/functions/send-reminders/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

Deno.serve(async () => {
  const today = new Date();

  // ── 1. STREAK REMINDER ──────────────────────────────────────
  // Cari user yang belum ada aktivitas belajar hari ini
  const { data: inactiveUsers } = await supabase
    .from("users")
    .select("id, full_name, last_active_at")
    .lt("last_active_at", new Date(today.setHours(0, 0, 0, 0)).toISOString());

  if (inactiveUsers && inactiveUsers.length > 0) {
    const streakNotifs = inactiveUsers.map((user) => ({
      user_id: user.id,
      type: "streak",
      title: "🔥 Don't Break Your Streak!",
      message: `Hey ${user.full_name?.split(" ")[0] || "there"}! You haven't studied today. Keep your streak alive!`,
      link: "/dashboard/my-learning",
    }));

    await supabase.from("notifications").insert(streakNotifs);
  }

  // ── 2. GOAL DEADLINE REMINDER ────────────────────────────────
  // Cari goals yang deadlinenya H-3 dan H-1
  const threeDaysLater = new Date();
  threeDaysLater.setDate(threeDaysLater.getDate() + 3);

  const oneDayLater = new Date();
  oneDayLater.setDate(oneDayLater.getDate() + 1);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  const { data: upcomingGoals } = await supabase
    .from("goals")
    .select("id, user_id, title, deadline")
    .in("deadline", [formatDate(threeDaysLater), formatDate(oneDayLater)])
    .eq("is_completed", false);

  if (upcomingGoals && upcomingGoals.length > 0) {
    const goalNotifs = upcomingGoals.map((goal) => {
      const daysLeft =
        goal.deadline === formatDate(oneDayLater) ? "tomorrow" : "in 3 days";
      return {
        user_id: goal.user_id,
        type: "goal",
        title: "🎯 Goal Deadline Approaching",
        message: `Your goal "${goal.title}" is due ${daysLeft}. Keep pushing!`,
        link: "/dashboard/my-goals",
      };
    });

    await supabase.from("notifications").insert(goalNotifs);
  }

  // ── 3. EVENT REMINDER ────────────────────────────────────────
  // Cari events yang besok
  const { data: tomorrowEvents } = await supabase
    .from("events")
    .select("id, title, event_date, registrations(user_id)")
    .eq("event_date", formatDate(oneDayLater));

  if (tomorrowEvents && tomorrowEvents.length > 0) {
    const eventNotifs: any[] = [];

    for (const event of tomorrowEvents) {
      for (const reg of event.registrations || []) {
        eventNotifs.push({
          user_id: reg.user_id,
          type: "event",
          title: "📅 Event Tomorrow!",
          message: `"${event.title}" is happening tomorrow. Don't miss it!`,
          link: "/dashboard/community/events",
        });
      }
    }

    if (eventNotifs.length > 0) {
      await supabase.from("notifications").insert(eventNotifs);
    }
  }

  return new Response(
    JSON.stringify({ success: true, message: "Reminders sent!" }),
    { headers: { "Content-Type": "application/json" } }
  );
});