export interface ProgramUpdate {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
}

export const programUpdatesData: ProgramUpdate[] = [
  {
    id: "1",
    title: "IELS Circle: New Monthly Program Launch",
    description:
      "Introducing our enhanced monthly program with advanced learning modules, expert mentorship sessions, and collaborative projects designed to accelerate your English proficiency journey.",
    image: "/images/contents/events/event-poster-1.png",
    category: "Program Launch",
    author: {
      name: "IELS Team",
      avatar: "/images/contents/general/iels_circle.png",
    },
  },
  {
    id: "2",
    title: "Advanced Grammar Workshop Series",
    description:
      "Join our comprehensive grammar workshop series featuring interactive lessons, real-world applications, and personalized feedback to master complex English structures.",
    image: "/images/contents/events/event-poster-2.png",
    category: "Workshop",
    author: {
      name: "IELS Team",
      avatar: "/images/contents/general/iels_circle.png",
    },
  },
  {
    id: "3",
    title: "IELS Step Up Program: Enhanced Curriculum",
    description:
      "Our flagship Step Up program now includes industry-specific modules, career coaching sessions, and direct connections with global employers seeking English-proficient talent.",
    image: "/images/contents/events/event-poster-1.png",
    category: "Curriculum Update",
    author: {
      name: "IELS Team",
      avatar: "/images/contents/general/iels_circle.png",
    },
  },
  {
    id: "4",
    title: "New Speaking Confidence Bootcamp",
    description:
      "Launching our intensive 4-week speaking confidence bootcamp designed to help participants overcome speaking anxiety and develop natural conversation skills through immersive practice.",
    image: "/images/contents/events/event-poster-2.png",
    category: "Bootcamp",
    author: {
      name: "IELS Team",
      avatar: "/images/contents/general/iels_circle.png",
    },
  },
  {
    id: "5",
    title: "IELS Digital Learning Platform Upgrade",
    description:
      "Experience our newly upgraded learning platform with AI-powered pronunciation feedback, personalized learning paths, and real-time progress tracking for optimal learning outcomes.",
    image: "/images/contents/events/event-poster-1.png",
    category: "Platform Update",
    author: {
      name: "IELS Team",
      avatar: "/images/contents/general/iels_circle.png",
    },
  },
  {
    id: "6",
    title: "IELS Mentorship Program Expansion",
    description:
      "Our mentorship program now connects learners with industry professionals worldwide, providing career guidance, networking opportunities, and real-world English application scenarios.",
    image: "/images/contents/events/event-poster-2.png",
    category: "Program Expansion",
    author: {
      name: "IELS Team",
      avatar: "/images/contents/general/iels_circle.png",
    },
  },
];
