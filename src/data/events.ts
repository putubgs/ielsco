export interface EventData {
  id: string;
  title: string;
  poster: string;
  description: string;
  registrationLink: string;
  startDate: string;
  registrationTimeDeadline: string;
  registrationDateDeadline: string;
  seo: {
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
  };
}

// NOTE: The description MUST use HTML tags for formatting
// use https://text-html.com/ for description formatting
export const eventsData: EventData[] = [
  {
    id: "1",
    title: "IELS Step Up x Skilio",
    poster: "/images/contents/events/event-poster-1.png",
    description: `<div>
<div><strong>Join a transformative 8-week journey with IELS Circle, a dynamic and inclusive English learning community that brings together passionate individuals eager to grow in their language skills.</strong></div>
<div>&nbsp;</div>
<div>Whether you're a beginner or looking to polish your English fluency, this program is designed to support your progress through consistent engagement, meaningful conversations, and collaborative activities.</div>
<div>&nbsp;</div>
<div><strong>What You'll Experience:</strong></div>
<ul>
<li>Interactive learning sessions with expert instructors</li>
<li>Peer-to-peer collaboration and feedback</li>
<li>Real-world conversation practice</li>
<li>Personalized learning paths</li>
<li>Cultural exchange opportunities</li>
</ul>
<div>&nbsp;</div>
<div><strong>Program Highlights:</strong></div>
<ol>
<li>Weekly group sessions focusing on practical English usage</li>
<li>One-on-one mentorship with experienced speakers</li>
<li>Project-based learning with real-world applications</li>
<li>Networking opportunities with global professionals</li>
</ol>
<div>&nbsp;</div>
<div>This program is perfect for anyone looking to enhance their English communication skills in a supportive, international environment.</div>
</div>`,
    registrationLink: "https://bit.ly/StepUp-R",
    startDate: "2025-04-05",
    registrationTimeDeadline: "23:59",
    registrationDateDeadline: "2025-03-27",
    seo: {
      meta_title:
        "IELS Step Up x Skilio - Transformative English Learning Program",
      meta_description:
        "Join a transformative 8-week journey with IELS Circle, a dynamic and inclusive English learning community that brings together passionate individuals eager to grow in their language skills.",
      meta_keywords:
        "IELS, Step Up, Skilio, English learning, language skills, transformative journey, community learning",
    },
  },
  {
    id: "2",
    title: "IELS Circle: Community Learning Experience",
    poster: "/images/contents/events/event-poster-2.png",
    description: `<div>
<div><strong>Join our vibrant community of English learners and enhance your language skills through interactive sessions, peer learning, and expert guidance in a supportive environment.</strong></div>
<div>&nbsp;</div>
<div>This immersive experience includes daily conversation practice, weekly themed discussions, monthly cultural exchange events, and personalized learning paths tailored to your specific goals and proficiency level.</div>
<div>&nbsp;</div>
<div><strong>Community Features:</strong></div>
<ul>
<li>Daily conversation practice sessions</li>
<li>Weekly themed discussions on current topics</li>
<li>Monthly cultural exchange events</li>
<li>Personalized learning paths</li>
<li>Expert guidance and feedback</li>
</ul>
<div>&nbsp;</div>
<div><strong>Learning Structure:</strong></div>
<ol>
<li>Morning warm-up sessions (15 minutes daily)</li>
<li>Interactive group discussions (1 hour, 3x per week)</li>
<li>One-on-one practice sessions (30 minutes weekly)</li>
<li>Cultural exchange events (monthly)</li>
<li>Progress assessment and feedback (bi-weekly)</li>
</ol>
<div>&nbsp;</div>
<div>Perfect for learners who want to improve their English in a supportive, community-driven environment with regular practice and expert guidance.</div>
</div>`,
    registrationLink: "#",
    startDate: "2025-06-15",
    registrationTimeDeadline: "18:00",
    registrationDateDeadline: "2025-06-10",
    seo: {
      meta_title:
        "IELS Circle: Community Learning Experience - English Learning Program",
      meta_description:
        "Join our vibrant community of English learners and enhance your language skills through interactive sessions, peer learning, and expert guidance in a supportive environment.",
      meta_keywords:
        "IELS, Circle, community learning, English learners, interactive sessions, peer learning, expert guidance, language skills",
    },
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
    seo: {
      meta_title:
        "IELS Workshop: Business English Mastery - Professional Development",
      meta_description:
        "Master business English communication skills including presentations, negotiations, and professional writing. Perfect for career advancement and professional development.",
      meta_keywords:
        "IELS, business English, professional development, presentations, negotiations, professional writing, career advancement",
    },
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
    seo: {
      meta_title:
        "IELS Speaking Club: Confidence Building - English Speaking Practice",
      meta_description:
        "Build confidence in English speaking through structured practice sessions, public speaking exercises, and real-world conversation scenarios.",
      meta_keywords:
        "IELS, speaking club, confidence building, English speaking, practice sessions, public speaking, conversation scenarios",
    },
  },
  {
    id: "5",
    title: "IELS Grammar Intensive: Basic to Advanced in 2 Hours",
    poster: "/images/contents/events/event-poster-1.png",
    description:
      "Deep dive into advanced English grammar structures, complex sentence patterns, and nuanced language usage for advanced learners. This comprehensive course explores subjunctive mood, conditional sentences, passive voice variations, reported speech complexities, and stylistic choices that distinguish native-level proficiency from intermediate understanding.",
    registrationLink: "/register/grammar-intensive",
    startDate: "2025-09-05",
    registrationTimeDeadline: "19:00",
    registrationDateDeadline: "2025-08-30",
    seo: {
      meta_title:
        "IELS Grammar Intensive: Advanced Structures - English Grammar Course",
      meta_description:
        "Deep dive into advanced English grammar structures, complex sentence patterns, and nuanced language usage for advanced learners.",
      meta_keywords:
        "IELS, grammar intensive, advanced structures, English grammar, complex sentences, nuanced language, advanced learners",
    },
  },
  {
    id: "6",
    title: "Step Up! Your Career, Borderless",
    poster: "/images/contents/events/step-up-event.jpeg",
    description:
      "Develop academic writing skills including essay structure, research methodology, citation formats, and critical analysis techniques. This workshop provides hands-on experience with argumentative essays, research papers, literature reviews, and thesis development while mastering APA, MLA, and Chicago citation styles for scholarly excellence.",
    registrationLink: "https://bit.ly/StepUpVol2Regist",
    startDate: "2025-10-12",
    registrationTimeDeadline: "21:00",
    registrationDateDeadline: "2025-09-25",
    seo: {
      meta_title:
        "IELS Writing Workshop: Academic Excellence - Academic Writing Course",
      meta_description:
        "Develop academic writing skills including essay structure, research methodology, citation formats, and critical analysis techniques.",
      meta_keywords:
        "IELS, writing workshop, academic excellence, academic writing, essay structure, research methodology, citation formats",
    },
  },
];
