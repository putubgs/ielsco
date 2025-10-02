export interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    university: string;
    avatar: string;
  };
}

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    content:
      "Joining IELS Lounge has been such a fun experience! In just one month, there were already so many activities to join 🤭 Totally worth it, especially since the membership price is very affordable. <br/><br/>Oh, and the members are all super kind and friendly! That’s definitely a big plus, everyone is here to learn English (including me hahaa) and the vibe is always supportive, no judgment even for beginners 🙌<br/> <br/> I really hope IELS keeps growing, and hopefully the membership price stays the same too 🙏",
    author: {
      name: "Michelle Elizabeth Dualim",
      university: "Institute of Economic Science Student - Management",
      avatar: "/images/contents/testimonials/micheline.png",
    },
  },
  {
    id: "2",
    content:
      "My experience in IELS for almost 2 months has been super fun! I’d definitely recommend it to my friends who want to learn English but are afraid of being judged, especially in speaking. The environment here is so supportive, it makes us more confident to try speaking without worrying about mistakes.<br/><br/> That’s why the Speaking Club has been the most memorable part for me, it feels like learning while playing, so enjoyable!",
    author: {
      name: "Syifa Hana",
      university: "UPI Student - Psychology",
      avatar: "/images/contents/testimonials/syifa-hana.png",
    },
  },
  {
    id: "3",
    content:
      "The most exciting part for me is the Speaking Club, I get to interact with many people who are also learning English. Another memorable activity is Word of the Day, which helps me add new vocabulary, especially idioms.",
    author: {
      name: "Linda Yuniarti",
      university: "Education Field - Course Pioneer",
      avatar: "/images/contents/testimonials/linda-yuniarti.png",
    },
  },
  {
    id: "4",
    content:
      "After joining IELS for about 2 weeks, I honestly feel more confident when speaking, even though my grammar is still not perfect. <br/><br/> I’ve also met many people whose speaking is better than mine, which motivates me to keep improving. It really feels like I’ve found the right place because the environment is so supportive.",
    author: {
      name: "Fathurrizqo",
      university: "UNNES Student - Computer Science",
      avatar: "/images/contents/testimonials/rizko.png",
    },
  },
  {
    id: "5",
    content:
      "For me, IELS is not just a community that gathers people, but also the right place to grow our communication skills in English.<br/><br/> In Speaking Club, we don’t just practice English, we also build confidence while speaking, and that has helped me a lot.",
    author: {
      name: "Elmayra Ratri",
      university: "Dumplupınar üniversitesi Student - Business Administration",
      avatar: "/images/contents/testimonials/elma.png",
    },
  },
  //   {
  //     id: "6",
  //     content:
  //       "The comprehensive curriculum at IELS covers everything from academic writing to professional communication. It's been a game-changer for my career.",
  //     author: {
  //       name: "Lisa Wang",
  //       university: "Universitas Diponegoro",
  //       avatar: "/images/contents/testimonials/avatar-6.jpg",
  //     },
  //   },
];
