// src/lib/quizData.ts
export type Answer = {
  id: string;
  label: string;
  emoji?: string;
  // points for simple static mapping (tweak keys later)
  points?: Partial<Record<string, number>>;
};

export type Question = {
  id: number;
  title: string;
  prompt: string;
  image?: string; // optional illustration path
  options: Answer[];
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Why do you want to learn English?",
    prompt: "Choose the option that best fits your dream.",
    image: "/images/illustrations/quiz/why.png",
    options: [
      { id: "study", label: "To study abroad", emoji: "🎓", points: { scholar: 3, dreamer: 1 } },
      { id: "remote", label: "To work remotely", emoji: "🌐", points: { remote: 3 } },
      { id: "career", label: "To grow my career", emoji: "🚀", points: { climber: 3 } },
      { id: "social", label: "To meet new people", emoji: "🌏", points: { explorer: 3 } },
    ],
  },
  {
    id: 2,
    title: "Where do you dream of using English?",
    prompt: "Pick a region that excites you the most.",
    image: "/images/illustrations/quiz/map.png",
    options: [
      { id: "uk", label: "UK", emoji: "🇬🇧", points: { scholar: 2 } },
      { id: "usa", label: "USA", emoji: "🇺🇸", points: { remote: 2, climber: 1 } },
      { id: "au", label: "Australia", emoji: "🇦🇺", points: { explorer: 2 } },
      { id: "jp", label: "Japan", emoji: "🇯🇵", points: { creator: 1, explorer: 1 } },
      { id: "kr", label: "Korea", emoji: "🇰🇷", points: { creator: 1 } },
      { id: "unsure", label: "Not sure yet", emoji: "🌍", points: { dreamer: 2 } },
    ],
  },
  {
    id: 3,
    title: "How confident are you in English today?",
    prompt: "Be honest — this helps us recommend the right path.",
    options: [
      { id: "beg", label: "Beginner", emoji: "🐣", points: { starter: 3 } },
      { id: "mid", label: "Intermediate", emoji: "💪", points: { remote: 1, climber: 1 } },
      { id: "adv", label: "Advanced", emoji: "🧠", points: { scholar: 1, creator: 1 } },
    ],
  },
  {
    id: 4,
    title: "How do you prefer to learn?",
    prompt: "Pick the style that helps you stay consistent.",
    options: [
      { id: "solo", label: "By myself (independent)", emoji: "📚", points: { remote: 1, scholar: 1 } },
      { id: "mentor", label: "With a mentor/tutor", emoji: "🧑", points: { climber: 2, scholar: 1 } },
      { id: "group", label: "In a group / club", emoji: "🫂", points: { networker: 2, explorer: 1 } },
      { id: "game", label: "Challenges / games", emoji: "🎯", points: { starter: 1, dreamer: 1 } },
    ],
  },
  {
    id: 5,
    title: "How much time can you spend per day?",
    prompt: "Consistency matters more than long sessions.",
    options: [
      { id: "10", label: "10 minutes", emoji: "⏱️", points: { starter: 2 } },
      { id: "20", label: "20 minutes", emoji: "🕑", points: { dreamer: 1, remote: 1 } },
      { id: "30", label: "30 minutes", emoji: "⏳", points: { climber: 1, scholar: 1 } },
      { id: "60+", label: "More than 30 minutes", emoji: "🚀", points: { climber: 2, scholar: 1 } },
    ],
  },
  {
    id: 6,
    title: "What’s your ultimate goal?",
    prompt: "Pick the long-term result you want most.",
    options: [
      { id: "scholarship", label: "Get a scholarship abroad", emoji: "🎓", points: { scholar: 3 } },
      { id: "remotejob", label: "Land a remote job", emoji: "💻", points: { remote: 3 } },
      { id: "speak", label: "Improve speaking confidence", emoji: "🗣️", points: { networker: 2, starter: 1 } },
      { id: "connect", label: "Build global connections", emoji: "🤝", points: { explorer: 2, networker: 1 } },
    ],
  },
];

// Personas (short for recommendation)
export const PERSONAS: Record<string, { title: string; description: string; classes: string[]; image?: string }> = {
  scholar: {
    title: "THE GLOBAL SCHOLAR 🎓",
    description:
      "You love structure, research and academic excellence. With steady practice and targeted training, you'll thrive in international classrooms, scholarship journeys, and academic interviews. We’ll help you sharpen writing, research and presentation skills so you can shine in applications and interviews.",
    classes: ["IELTS Academic Writing Workshop", "Scholarship Mentoring", "Academic Presentation Skills"],
    image: "/images/illustrations/personas/scholar.png",
  },
  remote: {
    title: "THE REMOTE ACHIEVER 🌐",
    description:
      "You want freedom and impact — remote work and global collaboration excite you. Focus on business communication, interview preparation, and collaboration tools. With the right portfolio and speaking confidence, global job opportunities will open.",
    classes: ["Business English for Remote Jobs", "Interview Masterclass", "Digital Collaboration Skills"],
    image: "/images/illustrations/personas/remote.png",
  },
  climber: {
    title: "THE CAREER CLIMBER 🚀",
    description:
      "Ambitious and strategic — you aim for promotions and leadership across borders. We'll focus on business writing, negotiation, and presentation to help you stand out in multinational teams and interviews.",
    classes: ["Business Writing & Presentations", "Leadership in English", "Networking for Global Professionals"],
    image: "/images/illustrations/personas/climber.png",
  },
  explorer: {
    title: "THE CULTURE EXPLORER 🌏",
    description:
      "You love cultural exchange, meeting new people, and learning through conversations. We'll help you build social confidence, storytelling skills and practical conversation techniques for travel and global networking.",
    classes: ["Conversation Club", "Travel & Culture English", "Global Social Networking"],
    image: "/images/illustrations/personas/explorer.png",
  },
  starter: {
    title: "THE FEARLESS STARTER ⚡️",
    description:
      "You’ve got big dreams and a brave heart. Start with daily habits, short practice sessions, and community support to build momentum quickly. Small wins lead to big progress.",
    classes: ["Essential English Bootcamp", "Daily Practice Challenges", "Beginner Speaking Confidence"],
    image: "/images/illustrations/personas/starter.png",
  },
  networker: {
    title: "THE NETWORK BUILDER 🤝",
    description:
      "You grow through people—building meaningful connections, collaborations and opportunities. We’ll sharpen networking language, personal branding, and conversation starters to help you expand your global circles.",
    classes: ["Networking in English", "Personal Branding", "Global Community Leadership"],
    image: "/images/illustrations/personas/networker.png",
  },
  dreamer: {
    title: "THE BOLD DREAMER 🌠",
    description:
      "You see a bigger future and are excited to plan for it. With goal-setting, consistent practice, and mentorship, your vision becomes a roadmap — and then reality.",
    classes: ["Goal Setting & English Strategy", "Growth Mindset Coaching", "Motivation & Productivity in English"],
    image: "/images/illustrations/personas/dreamer.png",
  },
};
