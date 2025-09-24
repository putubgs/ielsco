export interface MemberStory {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
}

export const memberStoriesData: MemberStory[] = [
  {
    id: "1",
    title: "Jo's Week Long Adventure at ISUFST, Philippines 🇵🇭",
    description:
      "From learning passive voice to pitching real-world projects, IELcoS mentees are breaking boundaries and making global moves.",
    author: {
      name: "Jo",
      avatar: "/images/contents/stories/member-stories.png",
    },
  },
  {
    id: "2",
    title: "Sarah's Journey from Beginner to Fluent Speaker",
    description:
      "Discover how Sarah transformed her English skills through IELS programs, from struggling with basic conversations to confidently presenting at international conferences.",
    author: {
      name: "Sarah",
      avatar: "/images/contents/stories/member-stories.png",
    },
  },
  {
    id: "3",
    title: "Ahmad's Success Story: From Local to Global",
    description:
      "Ahmad shares his inspiring journey of how IELS helped him secure a remote job with a multinational company, proving that determination and the right support can change everything.",
    author: {
      name: "Ahmad",
      avatar: "/images/contents/stories/member-stories.png",
    },
  },
  {
    id: "4",
    title: "Maria's Cultural Exchange Experience",
    description:
      "Maria reflects on her transformative experience participating in IELS cultural exchange programs, building lasting friendships and expanding her worldview through language learning.",
    author: {
      name: "Maria",
      avatar: "/images/contents/stories/member-stories.png",
    },
  },
  {
    id: "5",
    title: "David's Remote Work Success with IELS Support",
    description:
      "David credits IELS for helping him develop the communication skills needed to thrive in his remote software development role, connecting with clients worldwide.",
    author: {
      name: "David",
      avatar: "/images/contents/stories/member-stories.png",
    },
  },
  {
    id: "6",
    title: "Lisa's Academic Achievement Through English Mastery",
    description:
      "Lisa shares how improving her English through IELS programs opened doors to prestigious international scholarships and academic opportunities she never thought possible.",
    author: {
      name: "Lisa",
      avatar: "/images/contents/stories/member-stories.png",
    },
  },
];
