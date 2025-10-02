// src/data/careers-data.ts
import { generateSlug } from "@/utils/slug";

export interface Career {
  id: string;
  title: string;
  division: string;
  level: string;
  description: string;
  deadline?: string;
  applyLink: string;
  mode: "Onsite" | "Hybrid" | "Remote";
  bannerImage: string;
  jobDescription: string;   // sekarang pakai HTML string
  requirements: string;     // HTML string (gabung general & specific)
  benefits: string;  
  duration?: string;
  seo?: {
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
  };
}

export const careersData: Career[] = [
  {
    id: "1",
    title: "Tech Manager",
    division: "Tech",
    level: "Manager",
    description:
      "Lead the overall technology development at IELS, ensuring smooth product delivery and long-term scalability. You will manage both frontend and backend teams while aligning technical priorities with organizational goals. This role requires strong leadership, problem-solving, and the ability to translate vision into execution.",
    deadline: "25 Oct 2025",
    applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
    mode: "Remote",
    bannerImage: "/images/contents/careers/banner/tech.png",
    jobDescription: `
    <ul>
      <li>Lead and execute IELS’ technical roadmap, including product architecture and scalability planning.</li>
      <li>Manage and mentor both frontend and backend developers to ensure smooth delivery of features.</li>
      <li>Collaborate with product and design teams to align technical solutions with user needs.</li>
      <li>Optimize system performance, reliability, and security across all platforms.</li>
      <li>Stay updated with the latest technologies to drive innovation in the IELS ecosystem.</li>
    </ul>
    `,
    requirements: `
    <h4>General Requirements</h4>
    <ul>
      <li>Strong background in web development (frontend &amp; backend).</li>
      <li>Excellent leadership and communication skills.</li>
      <li>Problem-solving mindset and ability to prioritize technical goals with business strategy.</li>
      <li>Proactive, adaptable, and capable of leading remote teams.</li>
      <li>Active Indonesian university student or fresh graduate with proven tech portfolio.</li>
    </ul>
    <h4>Specific Requirements (Plus Points)</h4>
    <ul>
      <li>Experience managing full-stack web applications or edtech platforms.</li>
      <li>Familiarity with Next.js, React, or similar frameworks.</li>
      <li>Prior experience leading a development team or technical project.</li>
    </ul>
    `,
    benefits: `
    <ul>
      <li>Quarterly profit-sharing based on organization performance.</li>
      <li>Direct mentorship from experienced professionals in the edtech &amp; startup industry.</li>
      <li>Access to exclusive global networking opportunities across Asia-Pacific.</li>
      <li>Support for international career advancement and collaborations with partner companies.</li>
      <li>Free access to standardized tests (e.g., TOEFL/IELTS/TOEIC) and professional training.</li>
    </ul>
    `,
    duration: "6–12 months (remote-based, flexible schedule)",
    seo: {
      meta_title: "Tech Manager - Careers at IELS",
      meta_description:
        "Lead IELS' tech team to build scalable web platforms for English learners. Remote, flexible, and impactful leadership opportunity.",
      meta_keywords:
        "IELS careers, Tech Manager, web development, remote, edtech leadership"
    }
  },
  {
    id: "2",
    title: "Community Experience Associate",
    division: "Community",
    level: "Associate",
    description:
      "Ensure that every member of the IELS Lounge feels welcomed, supported, and engaged. You will organize activities, moderate discussions, and collect feedback to improve member satisfaction. This role is ideal for those passionate about creating meaningful experiences in online communities.",
    deadline: "30 Oct 2025",
    applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
    mode: "Remote",
    bannerImage: "/images/contents/careers/banner/community.png",
    jobDescription: `
      <ul>
        <li>Plan and execute community engagement activities on Discord and WhatsApp.</li>
        <li>Moderate discussions to maintain a healthy and inclusive learning environment.</li>
        <li>Collect and analyze member feedback to improve the community experience.</li>
        <li>Collaborate with marketing and product teams to create meaningful events.</li>
        <li>Help design onboarding processes to welcome and retain new members.</li>
      </ul>
    `,
    requirements: `
      <h4>General Requirements</h4>
      <ul>
        <li>University student or fresh graduate with strong communication skills.</li>
        <li>Passionate about community building and online engagement.</li>
        <li>Able to work with digital tools (Discord, Google Workspace, Notion).</li>
        <li>Proactive and able to work independently as well as in teams.</li>
        <li>Creative problem solver with interest in digital communities or education.</li>
      </ul>
      <h4>Specific Requirements (Plus Points)</h4>
      <ul>
        <li>Previous experience moderating or managing online communities.</li>
        <li>Exposure to event planning, content creation, or user experience design.</li>
        <li>Strong understanding of online learner engagement strategies.</li>
      </ul>
    `,
    benefits: `
      <ul>
        <li>Quarterly profit-sharing based on organization performance.</li>
        <li>Direct mentorship from experienced professionals in the edtech & startup industry.</li>
        <li>Access to exclusive global networking opportunities across Asia-Pacific.</li>
        <li>Support for international career advancement and collaborations with partner companies.</li>
        <li>Free access to standardized tests (e.g., TOEFL/IELTS/TOEIC) and professional training.</li>
      </ul>
    `,
    duration: "3–6 months (remote-based, flexible schedule)",
    seo: {
      meta_title: "Community Experience Associate - Careers at IELS",
      meta_description:
        "Join IELS as a Community Experience Associate to help create meaningful online community engagement on Discord & WhatsApp. Remote & flexible opportunity.",
      meta_keywords:
        "IELS careers, Community Experience Associate, community engagement, online moderation, remote internship"
    }
  },
  {
  id: "3",
  title: "Frontend Associate",
  division: "Tech",
  level: "Associate",
  description:
    "Work closely with the product and design teams to build user-friendly, responsive web experiences for the IELS community. You will translate UI/UX designs into clean and efficient code. This role offers hands-on experience in delivering impactful features for thousands of learners.",
  deadline: "25 Oct 2025",
  applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
  mode: "Remote",
  bannerImage: "/images/contents/careers/banner/tech.png",
  jobDescription: `
    <ul>
      <li>Develop responsive, accessible, and performant user interfaces for IELS platforms.</li>
      <li>Translate UI/UX wireframes and prototypes into high-quality React/Next.js code.</li>
      <li>Collaborate with designers and backend engineers to deliver new features and improvements.</li>
      <li>Optimize web pages for maximum speed, scalability, and cross-browser compatibility.</li>
      <li>Participate in code reviews, maintain clean architecture, and suggest UI/UX enhancements.</li>
    </ul>
  `,
  requirements: `
    <h4>General Requirements</h4>
    <ul>
      <li>University student or fresh graduate with strong passion for web development.</li>
      <li>Proactive, eager to learn, and comfortable working in a fast-paced startup environment.</li>
      <li>Capable of working independently as well as collaborating with a remote team.</li>
      <li>Problem-solving mindset with attention to detail and code quality.</li>
      <li>Active Indonesian students (batch 2023–2025) or recent graduates from any major (preferably tech-related).</li>
    </ul>
    <h4>Specific Requirements (Plus Points)</h4>
    <ul>
      <li>Experience with React, Next.js, or other modern JavaScript frameworks.</li>
      <li>Familiarity with Tailwind CSS, TypeScript, or similar UI libraries.</li>
      <li>Understanding of API integration and state management (Redux, Zustand, etc.).</li>
    </ul>
  `,
  benefits: `
    <ul>
      <li>Quarterly profit-sharing based on organization performance.</li>
      <li>Direct mentorship from experienced professionals in the edtech & startup industry.</li>
      <li>Access to exclusive global networking opportunities across Asia-Pacific.</li>
      <li>Support for international career advancement and collaborations with partner companies.</li>
      <li>Free access to standardized tests (e.g., TOEFL/IELTS/TOEIC) and professional training.</li>
    </ul>
  `,
  duration: "3–6 months (remote-based, flexible schedule)",
  seo: {
    meta_title: "Frontend Associate - Careers at IELS",
    meta_description:
      "Join IELS as a Frontend Associate to develop responsive and user-friendly web platforms using React and Next.js. Remote & flexible opportunity.",
    meta_keywords:
      "IELS careers, Frontend Associate, React, Next.js, Tailwind CSS, web development, remote internship"
  }
},
{
  id: "4",
  title: "Backend Associate",
  division: "Tech",
  level: "Associate",
  description:
    "Support the development of scalable backend systems that power IELS platforms. You will be responsible for database management, API integrations, and ensuring system reliability. This role is perfect for those who want to strengthen their technical foundation while contributing to a real-world product.",
  deadline: "25 Oct 2025",
  applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
  mode: "Remote",
  bannerImage: "/images/contents/careers/banner/tech.png",
  jobDescription: `
    <ul>
      <li>Build and maintain scalable backend services and APIs to support IELS platforms.</li>
      <li>Design and manage databases with optimized queries and secure data flow.</li>
      <li>Implement authentication, authorization, and other essential backend features.</li>
      <li>Collaborate with frontend engineers to integrate APIs and deliver seamless user experiences.</li>
      <li>Monitor server performance, troubleshoot issues, and ensure system reliability.</li>
    </ul>
  `,
  requirements: `
    <h4>General Requirements</h4>
    <ul>
      <li>University student or fresh graduate passionate about backend development and system architecture.</li>
      <li>Proactive, responsible, and eager to solve complex technical challenges.</li>
      <li>Capable of working independently as well as collaborating with a distributed team.</li>
      <li>Problem-solving mindset with focus on scalability and security.</li>
      <li>Active Indonesian students (batch 2023–2025) or recent graduates from any major (preferably tech-related).</li>
    </ul>
    <h4>Specific Requirements (Plus Points)</h4>
    <ul>
      <li>Experience with Node.js, Express, or similar backend frameworks.</li>
      <li>Understanding of RESTful APIs, GraphQL, or database design (SQL/NoSQL).</li>
      <li>Knowledge of authentication systems (JWT, OAuth) and server deployment (Vercel, AWS, etc.).</li>
    </ul>
  `,
  benefits: `
    <ul>
      <li>Quarterly profit-sharing based on organization performance.</li>
      <li>Direct mentorship from experienced professionals in the edtech & startup industry.</li>
      <li>Access to exclusive global networking opportunities across Asia-Pacific.</li>
      <li>Support for international career advancement and collaborations with partner companies.</li>
      <li>Free access to standardized tests (e.g., TOEFL/IELTS/TOEIC) and professional training.</li>
    </ul>
  `,
  duration: "3–6 months (remote-based, flexible schedule)",
  seo: {
    meta_title: "Backend Associate - Careers at IELS",
    meta_description:
      "Join IELS as a Backend Associate to build scalable APIs, manage databases, and ensure system reliability for an edtech platform. Remote & flexible opportunity.",
    meta_keywords:
      "IELS careers, Backend Associate, Node.js, API development, database management, remote internship"
  }
},
{
  id: "5",
  title: "UI/UX Associate",
  division: "Tech",
  level: "Associate",
  description:
    "Help design intuitive, accessible, and visually engaging interfaces for IELS products. You will conduct user research, create wireframes, and collaborate with developers to ensure seamless implementation. This role allows you to shape how learners interact with IELS’ ecosystem daily.",
  deadline: "25 Oct 2025",
  applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
  mode: "Remote",
  bannerImage: "/images/contents/careers/banner/tech.png",
  jobDescription: `
    <ul>
      <li>Conduct user research, gather feedback, and translate insights into actionable design solutions.</li>
      <li>Create wireframes, prototypes, and high-fidelity UI designs aligned with IELS’ visual identity.</li>
      <li>Collaborate with product managers and developers to ensure smooth implementation.</li>
      <li>Maintain and evolve IELS’ design system for consistency across platforms.</li>
      <li>Stay updated on UX trends, accessibility standards, and best practices in web/mobile design.</li>
    </ul>
  `,
  requirements: `
    <h4>General Requirements</h4>
    <ul>
      <li>University student or fresh graduate passionate about design and user experience.</li>
      <li>Creative problem solver with strong visual and interaction design skills.</li>
      <li>Proactive and able to work independently as well as in collaborative settings.</li>
      <li>Basic understanding of frontend development for effective developer collaboration.</li>
      <li>Active Indonesian students (batch 2023–2025) or recent graduates from any major.</li>
    </ul>
    <h4>Specific Requirements (Plus Points)</h4>
    <ul>
      <li>Proficiency with Figma, Adobe XD, or similar design/prototyping tools.</li>
      <li>Experience in designing for educational, youth, or community-driven platforms.</li>
      <li>Understanding of usability testing and accessibility best practices.</li>
    </ul>
  `,
  benefits: `
    <ul>
      <li>Quarterly profit-sharing based on organization performance.</li>
      <li>Direct mentorship from experienced professionals in the edtech & startup industry.</li>
      <li>Access to exclusive global networking opportunities across Asia-Pacific.</li>
      <li>Support for international career advancement and collaborations with partner companies.</li>
      <li>Free access to standardized tests (e.g., TOEFL/IELTS/TOEIC) and professional training.</li>
    </ul>
  `,
  duration: "3–6 months (remote-based, flexible schedule)",
  seo: {
    meta_title: "UI/UX Associate - Careers at IELS",
    meta_description:
      "Join IELS as a UI/UX Associate to design engaging and user-friendly digital learning experiences for a growing global student community. Remote & flexible opportunity.",
    meta_keywords:
      "IELS careers, UI/UX Associate, Figma, product design, user research, remote internship"
  }
},
{
  id: "6",
  title: "Community Growth Associate",
  division: "Community",
  level: "Associate",
  description:
    "Help expand IELS’ community through outreach, partnerships, and activation programs. You will identify opportunities to bring new members onboard while ensuring existing members remain active. This role combines strategy, communication, and creativity to scale IELS’ impact.",
  deadline: "30 Oct 2025",
  applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
  mode: "Hybrid",
  bannerImage: "/images/contents/careers/banner/community.png",
  jobDescription: `
    <ul>
      <li>Identify and execute strategies to grow IELS community membership and engagement.</li>
      <li>Conduct outreach to student communities, organizations, and potential partners.</li>
      <li>Organize and support activation programs to onboard and retain new members.</li>
      <li>Collaborate with marketing and creative teams to promote community activities.</li>
      <li>Track growth metrics and analyze data to optimize outreach strategies.</li>
    </ul>
  `,
  requirements: `
    <h4>General Requirements</h4>
    <ul>
      <li>University student or fresh graduate with strong networking and communication skills.</li>
      <li>Passionate about community development, outreach, and partnership building.</li>
      <li>Proactive, self-driven, and comfortable working both independently and in teams.</li>
      <li>Organized and able to handle multiple projects with attention to detail.</li>
      <li>Active Indonesian students (batch 2023–2025) or recent graduates from any major.</li>
    </ul>
    <h4>Specific Requirements (Plus Points)</h4>
    <ul>
      <li>Experience in community outreach, campus ambassador programs, or partnership management.</li>
      <li>Familiarity with CRM tools or digital marketing channels for outreach.</li>
      <li>Understanding of growth hacking and community engagement strategies.</li>
    </ul>
  `,
  benefits: `
    <ul>
      <li>Quarterly profit-sharing based on organization performance.</li>
      <li>Direct mentorship from experienced professionals in the edtech & startup industry.</li>
      <li>Access to exclusive global networking opportunities across Asia-Pacific.</li>
      <li>Support for international career advancement and collaborations with partner companies.</li>
      <li>Free access to standardized tests (e.g., TOEFL/IELTS/TOEIC) and professional training.</li>
    </ul>
  `,
  duration: "3–6 months (hybrid-based, flexible schedule)",
  seo: {
    meta_title: "Community Growth Associate - Careers at IELS",
    meta_description:
      "Join IELS as a Community Growth Associate to expand our student community, build partnerships, and drive engagement initiatives. Hybrid & flexible opportunity.",
    meta_keywords:
      "IELS careers, Community Growth Associate, outreach, partnership building, student community growth"
  }
},
{
  id: "7",
  title: "SEO Writer Associate",
  division: "Marketing",
  level: "Associate",
  description:
    "Create compelling, SEO-optimized content that increases IELS’ visibility across digital platforms. You will conduct keyword research, write blogs or web copies, and track performance through analytics. This role helps you sharpen your content strategy skills while driving measurable impact for community growth.",
  deadline: "30 Oct 2025",
  applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
  mode: "Remote",
  bannerImage: "/images/contents/careers/banner/marketing.png",
  jobDescription: `
    <ul>
      <li>Research and write high-quality, SEO-optimized content for blogs, website, and landing pages.</li>
      <li>Conduct keyword research to identify content opportunities and improve visibility.</li>
      <li>Collaborate with marketing and product teams to support campaigns with strong copy.</li>
      <li>Analyze SEO performance using tools like Google Analytics and Search Console.</li>
      <li>Stay updated with SEO trends, algorithm updates, and content marketing best practices.</li>
    </ul>
  `,
  requirements: `
    <h4>General Requirements</h4>
    <ul>
      <li>University student or fresh graduate passionate about writing and digital marketing.</li>
      <li>Strong communication skills with ability to write engaging, clear, and persuasive copy.</li>
      <li>Proactive learner who can adapt to SEO trends and marketing strategies.</li>
      <li>Capable of working independently and meeting content deadlines.</li>
      <li>Active Indonesian students (batch 2023–2025) or recent graduates from any major.</li>
    </ul>
    <h4>Specific Requirements (Plus Points)</h4>
    <ul>
      <li>Experience writing SEO-friendly articles, blogs, or web copy.</li>
      <li>Basic understanding of keyword research tools (Ahrefs, SEMrush, or Google Keyword Planner).</li>
      <li>Knowledge of on-page SEO and content performance tracking tools (Google Analytics, Search Console).</li>
    </ul>
  `,
  benefits: `
    <ul>
      <li>Quarterly profit-sharing based on organization performance.</li>
      <li>Direct mentorship from experienced professionals in the edtech & startup industry.</li>
      <li>Access to exclusive global networking opportunities across Asia-Pacific.</li>
      <li>Support for international career advancement and collaborations with partner companies.</li>
      <li>Free access to standardized tests (e.g., TOEFL/IELTS/TOEIC) and professional training.</li>
    </ul>
  `,
  duration: "3–6 months (remote-based, flexible schedule)",
  seo: {
    meta_title: "SEO Writer Associate - Careers at IELS",
    meta_description:
      "Join IELS as an SEO Writer Associate to create impactful, optimized content for web and digital platforms. Remote & flexible opportunity.",
    meta_keywords:
      "IELS careers, SEO Writer Associate, content marketing, SEO content writing, digital marketing"
  }
}

  // Tambahkan job lainnya dengan struktur sama
];
