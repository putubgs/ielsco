// src/data/quizData.ts
export type Answer = {
  id: string;
  label: string;
  emoji?: string;
  points?: Partial<Record<string, number>>;
};

export type Question = {
  id: number;
  title: string;
  prompt: string;
  image?: string;
  options: Answer[];
};

// --------------------------------------------------------
// QUESTIONS
// --------------------------------------------------------
export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Where did you hear about IELS?",
    prompt: "Choose the platform where you first discovered us.",
    options: [
      { id: "instagram", label: "Instagram", emoji: "📸" },
      { id: "whatsapp", label: "WhatsApp", emoji: "💬" },
      { id: "friends", label: "Friends or Family", emoji: "👨‍👩‍👧‍👦" },
      { id: "media", label: "Media Partners", emoji: "📰" },
      { id: "roblox", label: "Roblox", emoji: "🎮" },
    ],
  },
  {
    id: 2,
    title: "Why do you want to learn English?",
    prompt: "Choose the option that best fits your dream.",
    options: [
      { id: "study", label: "To study abroad", emoji: "🎓", points: { academic: 3 } },
      { id: "remote", label: "To work remotely", emoji: "🌐", points: { career: 3 } },
      { id: "career", label: "To grow my career", emoji: "🚀", points: { career: 2 } },
      { id: "social", label: "To meet new people", emoji: "🌏", points: { social: 3 } },
    ],
  },
  {
    id: 3,
    title: "Where do you dream of using English?",
    prompt: "Pick a region that excites you the most.",
    options: [
      { id: "uk", label: "UK", emoji: "🇬🇧", points: { academic: 2 } },
      { id: "usa", label: "USA", emoji: "🇺🇸", points: { career: 2 } },
      { id: "au", label: "Australia", emoji: "🇦🇺", points: { social: 2 } },
      { id: "jp", label: "Japan", emoji: "🇯🇵", points: { social: 1 } },
      { id: "kr", label: "Korea", emoji: "🇰🇷", points: { social: 1 } },
      { id: "unsure", label: "Not sure yet", emoji: "🌍", points: { dream: 2 } },
    ],
  },
  {
    id: 4,
    title: "How confident are you in English today?",
    prompt: "Be honest — this helps us recommend the right path.",
    options: [
      { id: "beg", label: "I'm just getting started", points: { beginner: 3 } },
      { id: "beg", label: "I can understand a bit, but speaking still hard", points: { beginner: 2 } },
      { id: "mid", label: "I use English sometimes, but I want to be more fluent", points: { intermediate: 2 } },
      { id: "adv", label: "I feel confortable using English in most situations", points: { advanced: 2 } }
    ],
  },
  {
    id: 5,
    title: "How do you prefer to learn?",
    prompt: "Pick the style that helps you stay consistent.",
    options: [
      { id: "solo", label: "By myself", emoji: "📚", points: { academic: 1 } },
      { id: "mentor", label: "With a mentor", emoji: "🧑", points: { career: 1 } },
      { id: "group", label: "In a group", emoji: "👨‍👩‍👧‍👦", points: { social: 2 } },
      { id: "game", label: "Challenges / games", emoji: "🎯", points: { beginner: 1, dream: 1 } },
    ],
  },
];

// slider
export const DAILY_TARGET = {
  min: 5,
  max: 60,
  step: 5,
};

// achievement generator (kept same)
export function generateAchievement(scores: Record<string, number>) {
  const highest = Object.entries(scores || {}).sort((a, b) => b[1] - a[1])[0]?.[0];

  switch (highest) {
    case "academic":
      return {
        title: "You Can Grow Academically 🎓",
        text:
          "Your answers show a strong interest in academic growth. With the right consistency, you’re on track to excel in writing, reading, and speaking for international study opportunities.",
      };

    case "career":
      return {
        title: "You Can Boost Your Global Career 🌐",
        text:
          "You’re motivated by real opportunities—remote work, promotions, and international teams. With stronger English communication, big doors can open for you.",
      };

    case "social":
      return {
        title: "You Can Connect With People Worldwide 🌏",
        text:
          "You thrive on interaction and cultural experiences. English will help you build friendships, collaborate globally, and explore the world confidently.",
      };

    case "beginner":
      return {
        title: "You Can Build Strong English Foundations ⚡",
        text:
          "You’re ready to start strong. Small, consistent steps will rapidly build your confidence and make English feel natural.",
      };

    default:
      return {
        title: "You Can Achieve More Than You Think 🌠",
        text:
          "Your motivation is powerful. With even a simple routine, you can grow fast and unlock global opportunities.",
      };
  }
}