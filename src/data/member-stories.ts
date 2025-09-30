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
   subcategory: "Internals" | "Lounge" | "Speakers" | "Inspires";
}

// NOTE: The content MUST use HTML tags for formatting
// use https://text-html.com/ for content formatting
export const memberStoriesData: MemberStory[] = [
    {
     id: "1",
     title: "Jo's Week Long Adventure at ISUFST, Philipines 🇵🇭",
     subcategory: "Internals",
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
<a href="https://www.instagram.com/p/DPJJ3zcgcJ5/?utm_source=ig_web_copy_link&igsh=MWhucW82a2dtMGhoYg==" target="_blank"
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
     subcategory: "Internals",
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
<a href="https://www.instagram.com/p/DPJJ3zcgcJ5/?utm_source=ig_web_copy_link&igsh=MWhucW82a2dtMGhoYg==" target="_blank"
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
{
  id: "3",
  title: "From Dreams to Reality: Sarah’s Internship Journey in Singapore",
  subcategory: "Lounge",
  content: `<div>
<div><strong>Sarah Meuthya Zahwa—one of IELS’s active community members—turned her long-time dream into reality by securing an internship at <em>Innovate Marketing Studio</em>, a digital marketing agency based in Singapore.</strong></div>
<div>&nbsp;</div>
<div>“Singapore has always been one of my dream countries,” Sarah shared. Earlier this year, she discovered IELS’s <strong>Step Up! program</strong> and immediately joined, hoping to gain mentorship on <strong>international internships and career preparation</strong>. “That’s why I was interested in a mentorship focused on internships abroad—I wanted to gain experience working in a Singaporean setting,” she said. <em>“And Step Up! exceeded my expectations!”</em></div>
<div>&nbsp;</div>
<div>Through Step Up!, Sarah learned that <strong>being skilled isn’t enough—we also need to communicate our value effectively</strong>. The mentorship provided her with practical insight on personal branding and international communication, laying the foundation for her career breakthrough.</div>
<div>&nbsp;</div>
<div>Now interning abroad, Sarah is thriving in a <strong>fast-paced global environment</strong>. She embraces new experiences, adapts to diverse work cultures, and applies the lessons from Step Up! in her daily work. “Even now, I’m still using the communication tips I learned—from writing professional emails to maintaining active communication at work. These skills helped me build confidence and prepared me to face the career world.”</div>
<div>&nbsp;</div>
<div><em>“For me, Step Up! isn’t just a program—it’s a long-term career investment. If you’re looking for a practical learning experience to go international, don’t hesitate to join Step Up! Vol. 2.”</em></div>
<div>&nbsp;</div>
</div>
<h4>✍️ Content Written <strong>by Valerine Aubrey Surjadi</strong><br data-start="343" data-end="346" /> 🎨 Design <strong>by Zainufri Aziz</strong></h4>
<p>&nbsp;</p>
<a href="https://www.instagram.com/p/DPOLpNwkUAR/?img_index=1" target="_blank"
   style="display:inline-block; padding:10px 20px; background:#fff; color:#000; text-decoration:none; border:1px solid #000; border-radius:999px; font-weight:bold;">
   Read More
</a>`,
  bannerImage:
    "/images/contents/stories/member-stories/banner/singapore-banner.png",
  author: {
    name: "Sarah Meuthya Zahwa - IELS Community Member",
    avatar:
      "/images/contents/stories/member-stories/profile/sarah.png",
  },
  date: "October 1, 2025",
  location: "Jakarta",
  seo: {
    meta_title:
      "Sarah’s Internship Journey in Singapore with IELS Step Up! - Member Story",
    meta_description:
      "Read how Sarah Meuthya Zahwa, an IELS community member, transformed her dream into reality through the Step Up! program, leading to her internship at a Singaporean digital marketing agency.",
    meta_keywords:
      "IELS, member story, Sarah Meuthya Zahwa, Step Up! program, Singapore internship, Innovate Marketing Studio, international career, personal branding, communication skills, global opportunities",
     },
    },
    {
  id: "4",
  title: "Hitting Career Marks: Rafi’s Internship Journey in Singapore",
  subcategory: "Lounge",
  content: `<div>
<div><strong>Muhammad Rafi Al Azhim—an aspiring tech talent and former Software Engineer Intern at <em>Bamboo System Technology</em>, a Singapore-based tech company—achieved his career milestone through international internship experience.</strong></div>
<div>&nbsp;</div>
<div>From the very beginning, Rafi had set his sights on <strong>international internships</strong>. The relevant insights and skills offered in IELS’s <strong>Step Up! program</strong> became his biggest motivation to join. “Step Up! went beyond my hopes,” he recalled. <em>“I learned everything from how to introduce myself to create a strong impression to how to compete in the current global career landscape.”</em></div>
<div>&nbsp;</div>
<div>With the knowledge and confidence gained from Step Up!, Rafi felt <strong>more prepared to apply abroad</strong>. The mentorship gave him not only soft skills but also practical tools such as CV reviews and pitching sessions. “What was really useful to me was the CV review and pitching sessions. They helped me create more professional CVs and understand how to present myself in job applications.”</div>
<div>&nbsp;</div>
<div>His internship in Singapore proved to be a <strong>precious professional experience</strong>. “I learned firsthand about working in an international company, especially about their professional culture and expectations,” Rafi shared. There were certainly challenges, but they became opportunities for growth and resilience in a fast-paced industry.</div>
<div>&nbsp;</div>
<div><em>“I would definitely recommend joining Step Up! Vol. 2. It’s a wonderful chance to upgrade your skills in preparation for global challenges, and even to chase international career opportunities.”</em></div>
<div>&nbsp;</div>
</div>
<h4>✍️ Content Written <strong>by Valerine Aubrey Surjadi</strong><br data-start="343" data-end="346" /> 🎨 Design <strong>by Zainufri Aziz</strong></h4>
<p>&nbsp;</p>
<a href="https://www.instagram.com/p/DPOLpNwkUAR/?img_index=1" target="_blank"
   style="display:inline-block; padding:10px 20px; background:#fff; color:#000; text-decoration:none; border:1px solid #000; border-radius:999px; font-weight:bold;">
   Read More
</a>`,
  bannerImage:
    "/images/contents/stories/member-stories/banner/singapore-banner.png",
  author: {
    name: "Muhammad Rafi Al Azhim - IELS Community Member",
    avatar:
      "/images/contents/stories/member-stories/profile/rafi.png",
  },
  date: "October 1, 2025",
  location: "Jakarta",
  seo: {
    meta_title:
      "Rafi’s Internship Journey in Singapore with IELS Step Up! - Member Story",
    meta_description:
      "Discover how Muhammad Rafi Al Azhim, an IELS community member, prepared for and succeeded in his international internship at Bamboo System Technology in Singapore through the Step Up! program.",
    meta_keywords:
      "IELS, member story, Muhammad Rafi Al Azhim, Step Up! program, Singapore internship, Bamboo System Technology, software engineer, CV review, pitching, international career, global opportunities",
  },
}
];
