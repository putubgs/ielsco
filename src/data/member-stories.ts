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

// NOTE: The content MUST use HTML tags for formatting
// use https://text-html.com/ for content formatting
export const memberStoriesData: MemberStory[] = [
    {
     id: "1",
     title: "Jo's Week Long Adventure at ISUFST, Philipines 🇵🇭",
     content: `<div>
<div><strong>From Malang to the Philippines, George Abraham—better known as Jo—brought the spirit of IELS across borders. As a Project Leader at IELS and a Computer Science student from Universitas Brawijaya, Jo spent a week on a cultural and academic exchange program at Iloilo State University of Fisheries Science and Technology (ISUFST).</strong></div>
<div>&nbsp;</div>
<div>During his stay, Jo had the chance to explore <strong>five different campuses</strong>, join IT-focused short courses, and engage with both faculty and students. The experience wasn’t only about academics—it was about immersion. From joining local tours and exploring the city, to enjoying the beaches of Iloilo, Jo embraced the warmth of Filipino culture with excitement and curiosity.</div>
<div>&nbsp;</div>
<div><strong>“What made the journey even more special was how English became my bridge,”</strong> Jo shared. Conversations with fellow students and lecturers flowed naturally, even when he stumbled or made small mistakes. <em>“As long as you have the confidence to speak, you’ll be fine. People aren’t that scary—especially when they know you’re still learning too.”</em></div>
<div>&nbsp;</div>
<div>For Jo, his time at ISUFST wasn’t just an academic trip; it was proof of how language can unlock global experiences. Being part of the IELS community gave him the courage and practice to communicate confidently in real-world settings. <strong>From English Lounge discussions to teamwork inside IELS projects, he felt prepared to step outside Indonesia and connect internationally.</strong></div>
<div>&nbsp;</div>
<div>Jo’s story is a reminder that opportunities often come to those who dare to try. By stepping into new environments, embracing mistakes, and trusting the skills he built with IELS, he showed that Indonesian students can thrive on the global stage.</div>
<div>&nbsp;</div>
<div><em>“I hope more students realize that English isn’t just a subject—it’s a passport. If you have the willingness to learn and the courage to use it, the world becomes a lot closer.”</em></div>
<div>&nbsp;</div>
</div>
<h4>✍️ Content Written <strong>by Najlaa Thufailah Shafut</strong><br data-start="343" data-end="346" /> 🎨 Design <strong>by Muhammad Athallah Khairi</strong></h4>
<p>&nbsp;</p>
<a href="https://www.instagram.com/iels_co" target="_blank"
   style="display:inline-block; padding:10px 20px; background:#fff; color:#000; text-decoration:none; border:1px solid #000; border-radius:999px; font-weight:bold;">
   Read More
</a>`,
     bannerImage:
       "/images/contents/stories/member-stories/banner/philippines-banner.png",
     author: {
       name: "George Abraham - IELS Internal Team",
       avatar:
         "/images/contents/stories/member-stories/profile/jo.png",
     },
     date: "September 29, 2025",
     location: "Malang",
     seo: {
       meta_title:
         "Jo's Week Long Adventure at ISUFST, Philippines - IELS Member Story",
       meta_description:
         "Follow George Abraham (Jo), a Project Leader at IELS and Computer Science student from Universitas Brawijaya, as he joins a cultural and academic exchange at ISUFST in the Philippines. Discover how English confidence opened doors to global opportunities.",
       meta_keywords:
         "IELS, member story, George Abraham, Jo, ISUFST, Philippines exchange, Universitas Brawijaya, student leadership, English confidence, global opportunities, academic exchange",
     },
   },
   {
     id: "2",
     title: "Shania's Journey: UNSIKA's Delegate Goes to Malaysia",
     content: `<div>
<div><strong>Shania Rizky Henanto—one of IELS’s Project Leaders and a proud student of Universitas Singaperbangsa Karawang (UNSIKA)—stepped onto the international stage as Indonesia’s representative at the prestigious ASEAN Classroom 2025 program.</strong></div>
<div>&nbsp;</div>
<div>Supported by her faculty and backed by her active journey with IELS, Shania joined the ASEAN Classroom alongside students from top universities across the region. For a week, she took part in <strong>international forums, cross-cultural discussions, and collaborative projects</strong> designed to strengthen regional cooperation among Southeast Asian youth.</div>
<div>&nbsp;</div>
<div>Being <strong>chosen as a delegate for UNSIKA</strong> was no small feat. It reflected years of her consistent participation in academic and organizational activities, and her passion for representing Indonesia in global platforms. From working with international peers to sharing perspectives on youth leadership, Shania carried both her identity and her country’s pride with confidence.</div>
<div>&nbsp;</div>
<div><strong>“English was the key that unlocked it all,”</strong> Shania shared. <em>“I use English every single day at IELS, and that practice built my confidence. In international settings, people don’t judge you like grammar police—they value your ideas and your courage to speak up.”</em></div>
<div>&nbsp;</div>
<div>Through IELS, Shania found a space to sharpen her communication, collaborate with peers, and grow into a leader ready for the global stage. <strong>Her journey in Malaysia proves that when language meets opportunity, Indonesian students can shine brightly among the best in Southeast Asia.</strong></div>
<div>&nbsp;</div>
<div><em>“I want others to know that English isn’t about perfection—it’s about connection. The more you practice, the more confident you become. And with confidence, the world opens its doors to you.”</em></div>
<div>&nbsp;</div>
</div>
<h4>✍️ Content Written <strong>by Najlaa Thufailah Shafut</strong><br data-start="343" data-end="346" /> 🎨 Design <strong>by Muhammad Athallah Khairi</strong></h4>
<p>&nbsp;</p>
<a href="https://www.instagram.com/iels_co" target="_blank"
   style="display:inline-block; padding:10px 20px; background:#fff; color:#000; text-decoration:none; border:1px solid #000; border-radius:999px; font-weight:bold;">
   Read More
</a>`,
     bannerImage:
       "/images/contents/stories/member-stories/banner/malaysia-banner.png",
     author: {
       name: "Shania Rizky Henanto - IELS Internal Team",
       avatar:
         "/images/contents/stories/member-stories/profile/shania.png",
     },
     date: "September 29, 2025",
     location: "Jakarta",
     seo: {
       meta_title:
         "Shania’s ASEAN Classroom 2025 Journey in Malaysia - IELS Member Story",
       meta_description:
         "Discover Shania Rizky Henanto’s journey as a Project Leader at IELS and delegate from Universitas Singaperbangsa Karawang (UNSIKA) at the ASEAN Classroom 2025 in Malaysia. Learn how English and IELS shaped her confidence in international collaboration.",
       meta_keywords:
         "IELS, member story, Shania Rizky Henanto, ASEAN Classroom 2025, Malaysia, Universitas Singaperbangsa Karawang, UNSIKA, student delegate, international collaboration, English learning, global opportunities",
     },
   },
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
//     date: "October 27, 2025",
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
