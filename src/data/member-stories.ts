export interface MemberStory {
  id: string;
  title: string;
  content: string;
  bannerImage: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  location: string;
  seo: {
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
  };
}

export const memberStoriesData: MemberStory[] = [
//   {
//     id: "1",
//     title: "Jo's Week Long Adventure at ISUFST, Philipines 🇵🇭",
//     content: `<div>
// <div><strong>A proud achievement has emerged from the International English Language Society (IELS) as one of its outstanding alumni, Nadine Aulia Ramadhani, has officially been accepted into the Google Global Internship Program 2025. </strong></div>
// <div>&nbsp;</div>
// <div>This highly competitive international program selects only a small percentage of applicants from across the globe, making Nadine's acceptance a remarkable milestone. Nadine will join Google's Product Marketing team for the Asia-Pacific region, based in their Singapore office, for a 12-week internship starting this June. Her role will include contributing to marketing strategies for Google's regional products, conducting user research, and working on cross-functional campaigns under the mentorship of seasoned industry professionals.</div>
// <div>&nbsp;</div>
// <div>From Language Classes to Global Opportunities Nadine completed IELS's English for Academic and Professional Purposes (EAPP) program in 2023, a course designed to build job-readiness and workplace communication skills. Known for her active participation, leadership in group activities, and sharp communication skills, Nadine stood out throughout her time at IELS. "What IELS gave me was more than just language skills," Nadine shared. "The training helped me think critically, present confidently, and communicate professionally&mdash;all of which were crucial during the interview and case study rounds at Google." A Rigorous Selection Process The selection process for Google's Global Internship Program is known to be one of the most rigorous in the industry. Candidates must pass multiple stages, including online assessments, behavioral interviews, and a live case challenge. During her case study round, Nadine was tasked with creating a go-to-market strategy for a digital product targeted at Southeast Asian youth&mdash;complete with budgeting, user personas, and outreach plans.</div>
// <div>&nbsp;</div>
// <div>Nadine's proposal, which emphasized digital inclusivity and community impact, caught the attention of Google's recruitment panel. Her unique insights and structured approach were noted as "well-aligned with Google's mission to make information universally accessible and useful." Backed by the IELS Community The IELS community celebrated Nadine's achievement with pride. Dr. Arman Siregar, Director of Academic Programs at IELS, expressed his appreciation: "Nadine's success showcases what's possible when language learning is contextualized to real-world challenges. Our mission has always been to prepare students not only to speak English&mdash;but to succeed in global environments." He further emphasized the importance of experiential learning and soft-skill development as key components of IELS's curriculum, stating that the institute will continue to evolve in line with industry needs. Inspiring Future Generations For Nadine, this internship is more than just a career opportunity&mdash;it's a stepping stone toward giving back. "I want to prove that Indonesian youth can thrive globally when given the right tools and opportunities. I hope to use this experience to inspire others and maybe someday mentor students just like me," she said. After completing her internship, Nadine plans to continue working on social-impact projects that bridge technology and community empowerment&mdash;and perhaps return to Google in a full-time capacity in the near future.</div>
// <div>&nbsp;</div>
// <ol>
// <li>test</li>
// <li>test 2</li>
// <li>test 3</li>
// </ol>
// </div>
// <p>&nbsp;</p>`,
//     bannerImage:
//       "/images/contents/stories/member-stories/banner/philippines-banner.png",
//     author: {
//       name: "George Abraham (Jo)",
//       avatar:
//         "/images/contents/stories/member-stories/profile/member-stories.png",
//     },
//     date: "May 25, 2025",
//     location: "Jakarta",
//     seo: {
//       meta_title:
//         "Jo's Week Long Adventure at ISUFST, Philippines - IELS Member Story",
//       meta_description:
//         "From learning passive voice to pitching real-world projects, IELcoS mentees are breaking boundaries and making global moves.",
//       meta_keywords:
//         "IELS, member story, international exchange, Philippines, ISUFST, English learning, global opportunities",
//     },
//   },
//   {
//     id: "2",
//     title: "Sarah's Journey from Beginner to Fluent Speaker",
//     content: `Sarah's transformation from a shy, hesitant English learner to a confident international speaker is nothing short of remarkable. When she first joined IELS, Sarah struggled with basic conversations and felt overwhelmed by the prospect of speaking English in professional settings. Through IELS's structured programs and supportive community, Sarah gradually built her confidence and skills. Today, she presents at international conferences and mentors other learners on their English journey. Her story demonstrates the power of consistent practice, community support, and the right learning environment in achieving language mastery.`,
//     bannerImage:
//       "/images/contents/stories/member-stories/banner/philippines-banner.png",
//     author: {
//       name: "Sarah",
//       avatar:
//         "/images/contents/stories/member-stories/profile/member-stories.png",
//     },
//     date: "April 15, 2025",
//     location: "Jakarta",
//     seo: {
//       meta_title:
//         "Sarah's Journey from Beginner to Fluent Speaker - IELS Success Story",
//       meta_description:
//         "Discover how Sarah transformed her English skills through IELS programs, from struggling with basic conversations to confidently presenting at international conferences.",
//       meta_keywords:
//         "IELS, success story, English learning, beginner to fluent, language transformation, international conferences",
//     },
//   },
//   {
//     id: "3",
//     title: "Ahmad's Success Story: From Local to Global",
//     content: `Ahmad's journey from local opportunities to global success showcases the transformative power of English proficiency in today's connected world. Starting with limited English skills, Ahmad dedicated himself to IELS programs, focusing on professional communication and business English. His hard work paid off when he secured a remote position with a multinational company, allowing him to work with international teams and expand his career horizons. Ahmad's story proves that with determination and the right support, language barriers can be overcome to achieve global success.`,
//     bannerImage:
//       "/images/contents/stories/member-stories/banner/philippines-banner.png",
//     author: {
//       name: "Ahmad",
//       avatar:
//         "/images/contents/stories/member-stories/profile/member-stories.png",
//     },
//     date: "March 20, 2025",
//     location: "Jakarta",
//     seo: {
//       meta_title:
//         "Ahmad's Success Story: From Local to Global - IELS Member Story",
//       meta_description:
//         "Ahmad shares his inspiring journey of how IELS helped him secure a remote job with a multinational company, proving that determination and the right support can change everything.",
//       meta_keywords:
//         "IELS, member story, remote work, multinational company, global opportunities, career success, English skills",
//     },
//   },
//   {
//     id: "4",
//     title: "Maria's Cultural Exchange Experience",
//     content: `Maria's participation in IELS cultural exchange programs opened doors to new friendships, perspectives, and opportunities she never imagined. Through these programs, Maria connected with learners from different countries, sharing experiences and learning about diverse cultures while improving her English. The cultural exchange not only enhanced her language skills but also broadened her worldview and built lasting international friendships. Maria's experience demonstrates how language learning can be a gateway to cultural understanding and global connections.`,
//     bannerImage:
//       "/images/contents/stories/member-stories/banner/philippines-banner.png",
//     author: {
//       name: "Maria",
//       avatar:
//         "/images/contents/stories/member-stories/profile/member-stories.png",
//     },
//     date: "February 10, 2025",
//     location: "Jakarta",
//     seo: {
//       meta_title: "Maria's Cultural Exchange Experience - IELS Member Story",
//       meta_description:
//         "Maria reflects on her transformative experience participating in IELS cultural exchange programs, building lasting friendships and expanding her worldview through language learning.",
//       meta_keywords:
//         "IELS, member story, cultural exchange, international friendships, worldview expansion, language learning, transformative experience",
//     },
//   },
//   {
//     id: "5",
//     title: "David's Remote Work Success with IELS Support",
//     content: `David's success in remote software development is a testament to how strong English communication skills can open doors to global opportunities. Through IELS programs, David developed the professional communication skills necessary to work effectively with international clients and teams. His ability to clearly articulate technical concepts and collaborate across cultures has made him a valuable asset in the global tech industry. David's story shows how language proficiency can be a key differentiator in competitive remote work environments.`,
//     bannerImage:
//       "/images/contents/stories/member-stories/banner/philippines-banner.png",
//     author: {
//       name: "David",
//       avatar:
//         "/images/contents/stories/member-stories/profile/member-stories.png",
//     },
//     date: "January 5, 2025",
//     location: "Jakarta",
//     seo: {
//       meta_title:
//         "David's Remote Work Success with IELS Support - Member Story",
//       meta_description:
//         "David credits IELS for helping him develop the communication skills needed to thrive in his remote software development role, connecting with clients worldwide.",
//       meta_keywords:
//         "IELS, member story, remote work, software development, communication skills, global clients, professional development",
//     },
//   },
//   {
//     id: "6",
//     title: "Lisa's Academic Achievement Through English Mastery",
//     content: `Lisa's academic journey demonstrates how English proficiency can unlock prestigious international opportunities. Through IELS programs, Lisa developed the advanced English skills needed for academic writing, research, and international scholarship applications. Her improved English opened doors to prestigious international scholarships and academic programs that were previously out of reach. Lisa's story illustrates how language mastery can be a key factor in accessing world-class educational opportunities and advancing academic careers.`,
//     bannerImage:
//       "/images/contents/stories/member-stories/banner/philippines-banner.png",
//     author: {
//       name: "Lisa",
//       avatar:
//         "/images/contents/stories/member-stories/profile/member-stories.png",
//     },
//     date: "December 15, 2024",
//     location: "Jakarta",
//     seo: {
//       meta_title:
//         "Lisa's Academic Achievement Through English Mastery - IELS Member Story",
//       meta_description:
//         "Lisa shares how improving her English through IELS programs opened doors to prestigious international scholarships and academic opportunities she never thought possible.",
//       meta_keywords:
//         "IELS, member story, academic achievement, international scholarships, English mastery, academic opportunities, educational success",
//     },
//   },
];
