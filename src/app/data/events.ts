export interface EventData {
  id: string;
  title: string;
  poster: string;
  description: string;
  registrationLink: string;
  startDate: string;
  registrationTimeDeadline: string;
  registrationDateDeadline: string;
}

export const eventsData: EventData[] = [
  {
    id: "1",
    title: "IELS Global Gateway: English as Your Global Passport",
    poster: "/images/contents/events/event-poster-1.png",
    description:
      "IELS Circle brings together a vibrant community of like-minded learners, where you can enhance your grammar, speaking, writing, and reading skills through daily interactions, weekly themes, and monthly activities. Our comprehensive program includes personalized feedback sessions, interactive workshops, peer-to-peer learning opportunities, and access to exclusive resources designed to accelerate your English language proficiency journey.",
    registrationLink: "/register/iels-global-gateway",
    startDate: "2025-05-25",
    registrationTimeDeadline: "23:59",
    registrationDateDeadline: "2025-05-20",
  },
  {
    id: "2",
    title: "IELS Circle: Community Learning Experience",
    poster: "/images/contents/events/event-poster-2.png",
    description:
      "Join our vibrant community of English learners and enhance your language skills through interactive sessions, peer learning, and expert guidance in a supportive environment. This immersive experience includes daily conversation practice, weekly themed discussions, monthly cultural exchange events, and personalized learning paths tailored to your specific goals and proficiency level.",
    registrationLink: "/register/iels-circle",
    startDate: "2025-06-15",
    registrationTimeDeadline: "18:00",
    registrationDateDeadline: "2025-06-10",
  },
  {
    id: "3",
    title: "IELS Workshop: Business English Mastery",
    poster: "/images/contents/events/event-poster-1.png",
    description:
      "Master business English communication skills including presentations, negotiations, and professional writing. Perfect for career advancement and professional development. This intensive workshop covers advanced business vocabulary, cross-cultural communication strategies, email etiquette, meeting facilitation techniques, and executive-level presentation skills that will set you apart in the global marketplace.",
    registrationLink: "/register/business-english",
    startDate: "2025-07-10",
    registrationTimeDeadline: "17:00",
    registrationDateDeadline: "2025-07-05",
  },
  {
    id: "4",
    title: "IELS Speaking Club: Confidence Building",
    poster: "/images/contents/events/event-poster-2.png",
    description:
      "Build confidence in English speaking through structured practice sessions, public speaking exercises, and real-world conversation scenarios. Our proven methodology includes pronunciation coaching, fluency development, accent reduction techniques, and practical exercises that simulate real-world situations like job interviews, business meetings, and social interactions.",
    registrationLink: "/register/speaking-club",
    startDate: "2025-08-20",
    registrationTimeDeadline: "20:00",
    registrationDateDeadline: "2025-08-15",
  },
  {
    id: "5",
    title: "IELS Grammar Intensive: Advanced Structures",
    poster: "/images/contents/events/event-poster-1.png",
    description:
      "Deep dive into advanced English grammar structures, complex sentence patterns, and nuanced language usage for advanced learners. This comprehensive course explores subjunctive mood, conditional sentences, passive voice variations, reported speech complexities, and stylistic choices that distinguish native-level proficiency from intermediate understanding.",
    registrationLink: "/register/grammar-intensive",
    startDate: "2025-09-05",
    registrationTimeDeadline: "19:00",
    registrationDateDeadline: "2025-08-30",
  },
  {
    id: "6",
    title: "IELS Writing Workshop: Academic Excellence",
    poster: "/images/contents/events/event-poster-2.png",
    description:
      "Develop academic writing skills including essay structure, research methodology, citation formats, and critical analysis techniques. This workshop provides hands-on experience with argumentative essays, research papers, literature reviews, and thesis development while mastering APA, MLA, and Chicago citation styles for scholarly excellence.",
    registrationLink: "/register/writing-workshop",
    startDate: "2025-10-12",
    registrationTimeDeadline: "12:00",
    registrationDateDeadline: "2025-9-19",
  },
];
