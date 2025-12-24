// src/data/careers-data.ts
import { generateSlug } from "@/utils/slug";

export type Role = {
  title: string;
  level: string;
  mode: "Onsite" | "Hybrid" | "Remote";
  description: string;

  jobDescription: string;
  requirements: string;
  benefits: string;
  duration?: string;
  applyLink: string;
  seo?: {
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
  };
};

export type SubDivision = {
  name: string;
  objective: string;
  roles: Role[];
};

export type Division = {
  slug: string;
  title: string;
  image: string;
  description: string;
  subDivisions: SubDivision[];
};
export const divisions: Division[] = [
  {
  slug: "operations",
  title: "Operations",
  image: "/images/contents/careers/banner/operations.jpeg",
  description:
    "For execution-driven individuals who enjoy building systems, managing communities, and turning ideas into real programs and products.",
  subDivisions: [
    {
      name: "Project",
      objective:
        "Execute IELS’ strategic programs and flagship events with strong coordination, documentation, and operational excellence.",
      roles: [
        {
          title: "Project Associate",
          level: "Associate",
          mode: "Remote",
          description:
            "Support planning, coordination, and execution of IELS’ strategic programs and flagship events from preparation to post-event evaluation.",
          jobDescription: `
            <ul>
              <li>Support planning and coordination of IELS events and programs, including flagship initiatives.</li>
              <li>Handle operational tasks such as scheduling, logistics, timelines, and internal communications.</li>
              <li>Assist in documentation including proposals, reports, MoUs, and post-event evaluations.</li>
              <li>Coordinate with speakers, partners, and internal teams during execution.</li>
              <li>Participate in post-event reviews and propose improvements for future programs.</li>
            </ul>
          `,
          requirements: `
            <ul>
              <li>Detail-oriented and consistent in task execution.</li>
              <li>Comfortable working in fast-paced, team-based environments.</li>
              <li>Active Indonesian undergraduate students (Batch 2023–2025) from any major.</li>
              <li>High sense of responsibility and ownership.</li>
            </ul>
          `,
          benefits: `
            <ul>
              <li>Hands-on experience managing large-scale education and community events.</li>
              <li>Exposure to strategic planning and execution in an edtech ecosystem.</li>
            </ul>
          `,
          duration: "Flexible, minimum 10–12 hours/week",
          applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
        },
      ],
    },

    {
      name: "Community",
      objective:
        "Build a thriving, growing, and meaningful learning community through strong experience design and strategic growth.",
      roles: [
        {
          title: "Community Growth Associate",
          level: "Associate",
          mode: "Remote",
          description:
            "Drive the strategic growth of the IELS community by expanding reach, improving onboarding systems, and increasing long-term member engagement.",
          jobDescription: `
            <ul>
              <li>Design and execute strategies to grow the IELS community through Discord, social media, and campus outreach.</li>
              <li>Develop and manage community onboarding flows, roles, and engagement systems.</li>
              <li>Maintain community contact lists, growth trackers, and feedback databases.</li>
              <li>Collaborate with Creative and Marketing teams to promote community programs.</li>
              <li>Propose scalable community growth systems such as referrals, gamification, and campaigns.</li>
            </ul>
          `,
          requirements: `
            <ul>
              <li>Outgoing, self-motivated, and proactive personality.</li>
              <li>Interest or experience in online communities, Discord, or student organizations.</li>
              <li>Active Indonesian undergraduate students (Batch 2023–2025) from any major.</li>
              <li>High sense of responsibility and ownership.</li>
            </ul>
          `,
          benefits: `
            <ul>
              <li>Experience building and scaling a real learning community.</li>
              <li>Exposure to community growth strategy and systems thinking.</li>
            </ul>
          `,
          duration: "Flexible, minimum 10–12 hours/week",
          applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
        },

        {
          title: "Community Experience Associate",
          level: "Associate",
          mode: "Remote",
          description:
            "Design and deliver engaging end-to-end community experiences, including Speaking Club, learning journeys, and interactive events inside IELS Lounge.",
          jobDescription: `
            <ul>
              <li>Design and execute interactive activities such as Speaking Club, English Days, game nights, and mini challenges.</li>
              <li>Support end-to-end member journeys from onboarding to goal achievement.</li>
              <li>Facilitate discussions, virtual events, and peer-to-peer engagement.</li>
              <li>Track member participation and engagement, then propose improvements.</li>
              <li>Ensure a safe, inclusive, and supportive learning environment.</li>
            </ul>
          `,
          requirements: `
            <ul>
              <li>Friendly, empathetic, and enthusiastic about peer interaction.</li>
              <li>Passionate about education, community, and fun learning experiences.</li>
              <li>Active Indonesian undergraduate students (Batch 2023–2025) from any major.</li>
              <li>High sense of responsibility and ownership.</li>
            </ul>
          `,
          benefits: `
            <ul>
              <li>Hands-on experience in community experience design.</li>
              <li>Direct involvement in IELS Lounge and Speaking Club programs.</li>
            </ul>
          `,
          duration: "Flexible, minimum 10–12 hours/week",
          applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
        },
      ],
    },

    {
      name: "Product",
      objective:
        "Develop high-quality learning products, curriculum resources, and digital platforms that support personalized English learning.",
      roles: [
        {
          title: "Curriculum Associate",
          level: "Associate",
          mode: "Remote",
          description:
            "Support the development of structured, personalized English learning materials for IELS resources and courses.",
          jobDescription: `
            <ul>
              <li>Design structured English learning materials, lesson plans, and practice activities.</li>
              <li>Customize content for different skill levels and learning objectives.</li>
              <li>Support personalized materials used in IELS Courses and mentorship programs.</li>
              <li>Research best practices in English education and learning psychology.</li>
              <li>Review and revise materials based on feedback and learner outcomes.</li>
            </ul>
          `,
          requirements: `
            <h4>General Requirements</h4>
            <ul>
              <li>Strong interest in teaching and English language mastery.</li>
              <li>Analytical and creative in educational design.</li>
              <li>Active Indonesian undergraduate students (Batch 2023–2025) from any major.</li>
              <li>High sense of responsibility and ownership.</li>
            </ul>
  
          `,
          benefits: `
            <ul>
              <li>Experience building real-world English learning resources.</li>
              <li>Exposure to personalized learning systems.</li>
            </ul>
          `,
          duration: "Flexible, minimum 10–12 hours/week",
          applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
        },

        {
          title: "Digital Product Associate",
          level: "Associate",
          mode: "Remote",
          description:
            "Support the development and iteration of IELS’ digital products, including IELS Test, IELS Lounge, and IELS Courses.",
          jobDescription: `
            <ul>
              <li>Support development of digital learning products on the IELS website.</li>
              <li>Collaborate on product features aligned with learner needs.</li>
              <li>Implement and maintain front-end components (basic to intermediate).</li>
              <li>Test, iterate, and improve usability and functionality.</li>
              <li>Collect user feedback and translate it into product improvements.</li>
            </ul>
          `,
          requirements: `
            <ul>
              <li>Interest in digital products, technology, and learner experience.</li>
              <li>Independent, resourceful, and proactive.</li>
               <li>Active Indonesian undergraduate students (Batch 2023–2025) from any major.</li>
              <li>High sense of responsibility and ownership.</li>
            </ul>

          `,
          benefits: `
            <ul>
              <li>Hands-on experience building real edtech products.</li>
              <li>Exposure to product thinking, UX, and iteration cycles.</li>
            </ul>
          `,
          duration: "Flexible, minimum 10–12 hours/week",
          applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
        },
      ],
    },
  ],
},{
    slug: "growth",
    title: "Growth",
    image: "/images/contents/careers/banner/growth.jpeg",
    description:
      "For creative and strategic minds who love branding, storytelling, partnerships, and growing meaningful communities.",
    subDivisions: [
      {
        name: "Marketing",
        objective:
          "Grow IELS awareness, credibility, and engagement through strong content, communication, and digital strategies.",
        roles: [
          {
            title: "Content Writer Associate",
            level: "Associate",
            mode: "Remote",
            description:
              "Create engaging, on-brand English content that represents IELS’ voice across multiple platforms while supporting campaigns, programs, and community growth.",

            jobDescription: `
              <ul>
                <li>Write engaging English content across IELS marketing platforms (Instagram, LinkedIn, X, Threads), including captions and short-form copies.</li>
                <li>Produce 1–2 written content pieces per week aligned with content pillars and ongoing programs.</li>
                <li>Adapt writing tone and format based on platform characteristics and audience behavior.</li>
                <li>Monitor basic content performance and refine writing strategies accordingly.</li>
              </ul>
            `,
            requirements: `
            
              <ul>
                <li>Excellent English writing skills with clear, concise, and engaging style.</li>
                <li>Disciplined, responsible, responsive, and willing to prioritize IELS.</li>
                <li>Active Indonesian undergraduate students (Batch 2023–2025) from any major.</li>
                <li>High sense of responsibility and ownership.</li>
              </ul>
            `,
            benefits: `
              <ul>
                <li>Hands-on experience in content strategy and SEO-based writing.</li>
                <li>Portfolio development with real edtech projects.</li>
              </ul>
            `,
            duration: "Flexible, minimum 10–12 hours/week",
            applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
          },

          {
            title: "Social Media Specialist",
            level: "Associate",
            mode: "Remote",
            description:
              "Manage IELS’ social media execution and daily distribution while ensuring consistent engagement, responsiveness, and performance tracking.",

            jobDescription: `
              <ul>
                <li>Upload and manage content distribution across Instagram (feeds & stories) and LinkedIn.</li>
                <li>Drive post engagement by sharing content to Discord and Instagram Broadcast.</li>
                <li>Monitor and respond to comments, DMs, and basic audience interactions professionally.</li>
                <li>Prepare bi-weekly performance reports using platform insights.</li>
                <li>Optimize posting strategy through hashtags, tagging, links, and posting time analysis.</li>
              </ul>
            `,
            requirements: `
              <ul>
                <li>Detail-oriented and well-organized in managing posting schedules.</li>
                <li>Strong communication skills and professionalism.</li>
                <li>Active Indonesian undergraduate students (Batch 2023–2025) from any major.</li>
                <li>High sense of responsibility and ownership.</li>
              </ul>
            `,
            benefits: `
              <ul>
                <li>Hands-on experience managing real social media growth.</li>
                <li>Exposure to analytics, reporting, and audience behavior.</li>
              </ul>
            `,
            duration: "Flexible, minimum 10–12 hours/week",
            applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
          },

          {
            title: "Content Creator",
            level: "Associate",
            mode: "Remote",
            description:
              "Handle end-to-end content production to create engaging short-form videos that align with IELS’ brand voice and campaign goals.",

            jobDescription: `
              <ul>
                <li>Handle scripting, filming, editing, and caption writing.</li>
                <li>Produce and publish 1–2 Reels or TikTok videos per week.</li>
                <li>Stay updated with trends, formats, and platform best practices.</li>
                <li>Track basic content performance to support improvement.</li>
              </ul>
            `,
            requirements: `
              <ul>
                <li>Have a proper camera and proficient in CapCut.</li>
                <li>Strong English communication skills.</li>
                <li>Active Indonesian undergraduate students (Batch 2023–2025) from any major.</li>
                <li>High sense of responsibility and ownership.</li>
              </ul>
            `,
            benefits: `
              <ul>
                <li>Personal brand and creative portfolio growth.</li>
                <li>Hands-on experience in content production.</li>
              </ul>
            `,
            duration: "Flexible, minimum 10–12 hours/week",
            applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
          },
        ],
      },

      {
        name: "Creative & Brand Experience",
        objective:
          "Build a strong visual identity and interactive brand experience across digital platforms and learning environments.",
        roles: [
          {
            title: "Creative Associate",
            level: "Associate",
            mode: "Remote",
            description:
              "Execute visual and design tasks that translate ideas and briefs into strong, consistent, and impactful IELS brand visuals.",

            jobDescription: `
              <ul>
                <li>Execute visual and design tasks for social media, programs, and internal needs.</li>
                <li>Translate briefs into clear, engaging, and on-brand designs.</li>
                <li>Apply and maintain IELS design systems and visual guidelines.</li>
                <li>Revise designs based on feedback and quality standards.</li>
                <li>Organize and manage design files and assets properly.</li>
              </ul>
            `,
            requirements: `
              <ul>
                <li>Strong design portfolio using Figma.</li>
                <li>Ability to interpret briefs into brand-aligned visuals.</li>
                <li>Active Indonesian undergraduate students (Batch 2023–2025) from any major.</li>
                <li>High sense of responsibility and ownership.</li>
              </ul>
            `,
            benefits: `
              <ul>
                <li>Portfolio-building with real brand assets.</li>
                <li>Experience working with a growing edtech brand.</li>
              </ul>
            `,
            duration: "Flexible, minimum 10–12 hours/week",
            applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
          },

          {
            title: "Brand Experience Associate",
            level: "Associate",
            mode: "Remote",
            description:
              "Support interactive learning and community engagement inside the IELS Roblox ecosystem while shaping fun, youth-driven brand experiences.",

            jobDescription: `
              <ul>
                <li>Support daily community engagement inside Roblox.</li>
                <li>Help plan and execute Roblox learning activities and in-game events.</li>
                <li>Create trend-driven TikTok content related to Roblox gameplay.</li>
              </ul>
            `,
            requirements: `
              <ul>
                <li>Active and familiar with Roblox (minimum 5 months experience).</li>
                <li>Fluent in English (written & verbal).</li>
                <li>Active Indonesian undergraduate students (Batch 2023–2025) from any major.</li>
                <li>High sense of responsibility and ownership.</li>
              </ul>
            `,
            benefits: `
              <ul>
                <li>Hands-on experience in interactive edtech & community building.</li>
                <li>Exposure to digital learning innovation.</li>
              </ul>
            `,
            duration: "Flexible, minimum 10–12 hours/week",
            applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
          },
        ],
      },
    ],
  },

{
  slug: "finance",
  title: "Finance",
  image: "/images/contents/careers/banner/finance.jpeg",
  description:
    "For detail-oriented minds who value accountability, structured documentation, and long-term organizational sustainability.",
  subDivisions: [
    {
      name: "Accounting",
      objective:
        "Ensure financial transparency, accurate records, and reliable reporting across all IELS programs and activities.",
      roles: [
        {
          title: "Accounting Associate",
          level: "Associate",
          mode: "Remote",
          description:
            "Support IELS’ financial operations by managing transaction records, documentation, and reporting while ensuring accuracy, transparency, and accountability.",
          jobDescription: `
            <ul>
              <li>Record and track all income and expenses from IELS activities.</li>
              <li>Manage invoices, reimbursements, receipts, and payment documentation.</li>
              <li>Assist in preparing financial summaries and reports per program or event.</li>
              <li>Maintain organized financial records and transaction proofs.</li>
            </ul>
          `,
          requirements: `
            <ul>
              <li>Basic knowledge or strong interest in accounting, finance, or financial administration.</li>
              <li>Detail-oriented and able to maintain organized financial documentation.</li>
                <li>Active Indonesian undergraduate students (Batch 2023–2025) from any major.</li>
                <li>High sense of responsibility and ownership.</li>
            </ul>
          `,
          benefits: `
            <ul>
              <li>Hands-on experience in managing financial operations within an education-focused organization.</li>
              <li>Exposure to budgeting, reporting, and financial governance practices.</li>
            </ul>
          `,
          duration: "Flexible, minimum 10–12 hours/week",
          applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
          seo: {
            meta_title: "Accounting Associate - IELS",
            meta_description:
              "Join IELS as an Accounting Associate and gain hands-on experience in financial operations, reporting, and documentation within an education ecosystem.",
            meta_keywords: "IELS, accounting associate, finance, student accounting role, edtech",
          },
        },
      ],
    },

    {
      name: "Legal",
      objective:
        "Support legal documentation, contract management, and compliance across IELS programs, partnerships, and sponsorships.",
      roles: [
        {
          title: "Legal Associate",
          level: "Associate",
          mode: "Remote",
          description:
            "Handle legal documentation and administrative processes to ensure clear agreements, proper compliance, and smooth collaboration across IELS initiatives.",
          jobDescription: `
            <ul>
              <li>Draft and prepare MoUs, ToRs, and basic agreements using provided templates.</li>
              <li>Organize and manage legal documents and contract archives.</li>
              <li>Handle legal administration for programs, sponsorships, and partnerships.</li>
              <li>Coordinate contract signing and communication with related divisions.</li>
            </ul>
          `,
          requirements: `
            <ul>
              <li>Basic knowledge or strong interest in legal documentation, contracts, or organizational compliance.</li>
              <li>Strong attention to detail, especially in reading, reviewing, and writing formal documents.</li>
                <li>Active Indonesian undergraduate students (Batch 2023–2025) from any major.</li>
                <li>High sense of responsibility and ownership.</li>
            </ul>
          `,
          benefits: `
            <ul>
              <li>Exposure to legal administration, contracts, and compliance processes.</li>
              <li>Experience supporting partnerships and sponsorship documentation.</li>
            </ul>
          `,
          duration: "Flexible, minimum 10–12 hours/week",
          applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
          seo: {
            meta_title: "Legal Associate - IELS",
            meta_description:
              "Join IELS as a Legal Associate and gain experience in contracts, MoUs, and compliance for education and partnership programs.",
            meta_keywords: "IELS, legal associate, MoU, contracts, student legal role",
          },
        },
      ],
    },
  ],

},{
  slug: "talent",
  title: "Talent",
  image: "/images/contents/careers/banner/talent.jpeg",
  description:
    "For people-focused individuals who care about growth, performance, well-being, and building a healthy team culture.",
  subDivisions: [
    {
      name: "Talent Development",
      objective:
        "Support learning routines, team engagement, and early well-being signals across the organization.",
      roles: [
        {
          title: "Talent Development Associate",
          level: "Associate",
          mode: "Remote",
          description:
            "Support team growth and well-being by executing weekly development routines, tracking engagement, and providing early support signals.",
          jobDescription: `
            <ul>
              <li>Execute weekly development routines and learning activities.</li>
              <li>Conduct light check-ins and buddy follow-ups with team members.</li>
              <li>Track participation, engagement, and attendance consistently.</li>
              <li>Identify and flag early warning signals to the Manager.</li>
            </ul>
          `,
          requirements: `
            <ul>
              <li>Observant and attentive to behavioral or engagement changes.</li>
              <li>Consistent and reliable in recurring routines.</li>
                <li>Active Indonesian undergraduate students (Batch 2023–2025) from any major.</li>
                <li>High sense of responsibility and ownership.</li>
            </ul>
          `,
          benefits: `
            <ul>
              <li>Hands-on experience in people development and team well-being.</li>
              <li>Exposure to learning routines and engagement systems.</li>
            </ul>
          `,
          duration: "Flexible, minimum 10–12 hours/week",
          applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
        },
      ],
    },

    {
      name: "Talent Management",
      objective:
        "Maintain structured performance tracking, KPI monitoring, and appraisal systems across all divisions.",
      roles: [
        {
          title: "Talent Management Associate",
          level: "Associate",
          mode: "Remote",
          description:
            "Support performance management by collecting KPI data, maintaining dashboards, and assisting appraisal documentation.",
          jobDescription: `
            <ul>
              <li>Collect and validate KPI and OKR data from all divisions.</li>
              <li>Maintain performance dashboards and tracking tools.</li>
              <li>Support appraisal preparation and documentation.</li>
              <li>Conduct routine performance audits and follow-ups.</li>
            </ul>
          `,
          requirements: `
            <ul>
              <li>Detail-oriented and highly organized.</li>
              <li>Comfortable working with repetitive and structured data tasks.</li>
            <li>Active Indonesian undergraduate students (Batch 2023–2025) from any major.</li>
            <li>High sense of responsibility and ownership.</li>
            </ul>
          `,
          benefits: `
            <ul>
              <li>Exposure to KPI, OKR, and performance management systems.</li>
              <li>Hands-on experience in organizational analytics.</li>
            </ul>
          `,
          duration: "Flexible, minimum 10–12 hours/week",
          applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
        },
      ],
    },

    {
      name: "Talent Acquisition",
      objective:
        "Support recruitment execution, candidate coordination, and onboarding preparation.",
      roles: [
        {
          title: "Talent Acquisition Associate",
          level: "Associate",
          mode: "Remote",
          description:
            "Support end-to-end recruitment operations, candidate coordination, and onboarding preparation under the Talent Acquisition function.",
          jobDescription: `
            <ul>
              <li>Support recruitment execution and application screening.</li>
              <li>Manage application data, screening records, and candidate documentation.</li>
              <li>Coordinate interview schedules, assessments, and candidate communication.</li>
              <li>Assist onboarding preparation, including materials, timelines, and follow-ups.</li>
              <li>Maintain talent pool databases and update high-potential candidate records.</li>
            </ul>
          `,
          requirements: `
            <ul>
              <li>Highly responsive and reliable in operational tasks.</li>
              <li>Comfortable working with deadlines and administrative details.</li>
                <li>Active Indonesian undergraduate students (Batch 2023–2025) from any major.</li>
                <li>High sense of responsibility and ownership.</li>
            </ul>
          `,
          benefits: `
            <ul>
              <li>Hands-on experience in recruitment and onboarding processes.</li>
              <li>Exposure to talent pipeline and candidate experience design.</li>
            </ul>
          `,
          duration: "Flexible, minimum 10–12 hours/week",
          applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
        },
      ],
    },
  ],
},
{
  slug: "business",
  title: "Business",
  image: "/images/contents/careers/banner/business.jpeg",
  description:
    "For relationship builders who enjoy partnerships, negotiations, and expanding IELS’ impact through strategic external collaborations.",
  subDivisions: [
    {
      name: "Academic Partnership",
      objective:
        "Build and manage collaborations with schools and universities to expand IELS programs, learning access, and institutional partnerships.",
      roles: [
        {
          title: "Academic Partnership Associate",
          level: "Associate",
          mode: "Remote",
          description:
            "Support outreach, coordination, and partnership development with schools and universities to deliver IELS programs and long-term academic collaborations.",
          jobDescription: `
            <ul>
              <li>Support outreach to schools, universities, and educational institutions.</li>
              <li>Assist in preparing partnership proposals, pitch decks, and follow-up materials.</li>
              <li>Coordinate communication and meetings with academic partners.</li>
              <li>Maintain partnership trackers, contact lists, and documentation.</li>
              <li>Support implementation and evaluation of academic collaboration programs.</li>
            </ul>
          `,
          requirements: `
            <h4>General Requirements</h4>
            <ul>
              <li>Strong written and verbal communication skills.</li>
              <li>Professional, proactive, and comfortable interacting with external stakeholders.</li>
              <li>Detail-oriented and organized in managing partnership documentation.</li>
              <li>Active Indonesian students (Batch 2023–2025) from any major.</li>
              <li>Willing to prioritize IELS and be responsive in daily communication.</li>
            </ul>
            <h4>Specific Requirements (Plus Points)</h4>
            <ul>
              <li>Experience in student organizations, outreach, or institutional relations.</li>
              <li>Comfortable preparing proposals or presentation materials.</li>
              <li>Interest in education systems, school programs, or university collaborations.</li>
            </ul>
          `,
          benefits: `
            <ul>
              <li>Hands-on experience building academic partnerships.</li>
              <li>Exposure to institutional collaboration and B2B2C education models.</li>
            </ul>
          `,
          duration: "Flexible, minimum 10–12 hours/week",
          applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
        },
      ],
    },

    {
      name: "Corporate Partnership",
      objective:
        "Develop and manage sponsorships and corporate collaborations that support IELS programs, events, and long-term sustainability.",
      roles: [
        {
          title: "Corporate Partnership Associate",
          level: "Associate",
          mode: "Remote",
          description:
            "Support sponsor outreach, partnership coordination, and collaboration management with corporate and industry partners.",
          jobDescription: `
            <ul>
              <li>Support outreach to corporate partners, sponsors, and industry organizations.</li>
              <li>Assist in preparing sponsorship proposals, pitch decks, and collaboration materials.</li>
              <li>Coordinate sponsorship deliverables with internal teams and partners.</li>
              <li>Maintain sponsor databases, partnership trackers, and reporting documents.</li>
              <li>Support relationship management to ensure long-term partner engagement.</li>
            </ul>
          `,
          requirements: `
            <ul>
              <li>Strong communication and interpersonal skills.</li>
              <li>Professional, proactive, and comfortable handling external communications.</li>
              <li>Organized and detail-oriented in managing timelines and deliverables.</li>
              <li>Active Indonesian students (Batch 2023–2025) from any major.</li>
              <li>High sense of ownership and responsibility.</li>
            </ul>
          `,
          benefits: `
            <ul>
              <li>Hands-on experience managing real corporate partnerships.</li>
              <li>Exposure to sponsorship strategy, negotiation, and partnership execution.</li>
            </ul>
          `,
          duration: "Flexible, minimum 10–12 hours/week",
          applyLink: "https://forms.gle/DotTzXLZ9vzcF4BJA",
        },
      ],
    },
  ],
}


];

