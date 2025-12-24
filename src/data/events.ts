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
    title: "Step Up! IELS x Skilio: Your Fast Track to International Careers!",
    poster: "/images/contents/events/step-up! iels x skilio.png",
    description: `<div>
  <div>📅 Program Timeline: 5 - 27 April 2025
  <div>&nbsp;</div>
  <div><strong>Join <em>Step Up! IELS x Skilio</em> — a focused 5-week English bootcamp series for professionals. Learn directly from industry experts, get one-on-one mentoring, and finish ready for real remote work opportunities.</strong></div>
  <div>&nbsp;</div>
  <div>This bootcamp is designed for working professionals who want fast, practical improvements: clearer communication, stronger interview skills, and a polished professional profile that opens doors to remote internships and international roles.</div>
  <div>&nbsp;</div>
  <div><strong>What You'll Experience:</strong></div>
  <ul>
    <li>Expert-led interactive sessions tailored for professional contexts</li>
    <li>One-on-one mentoring to sharpen your speaking and career story</li>
    <li>Practical CV and LinkedIn building workshops</li>
    <li>Interview practice with feedback and real-case simulations</li>
    <li>Project tasks that replicate workplace communication</li>
  </ul>
  <div>&nbsp;</div>
  <div><strong>Program Highlights:</strong></div>
  <ol>
    <li>Five-week intensive format with clear weekly goals</li>
    <li>Mentorship from experienced professionals and language coaches</li>
    <li>Hands-on sessions focused on remote work communication and collaboration</li>
    <li>Final assessment and interview preparation with direct feedback</li>
  </ol>
  <div>&nbsp;</div>
  <div><strong>Graduation Outcome:</strong></div>
  <div>Graduates receive priority consideration for remote internship opportunities offered by Skilio—real placements to apply your skills and start building global experience.</div>
</div>
  <div>&nbsp;</div>
 <a href="https://www.instagram.com/p/DG5MJscBQ8W/?utm_source=ig_web_copy_link&igsh=MWtrZnI5M3BwbmRpYg==" target="_blank" 
   style="
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background-color: #E56668;
    color: #ffffff;
    text-decoration: none;
    border-radius: 999px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.2s ease;
  "
  onmouseover="this.style.backgroundColor='#C04C4E'"
  onmouseout="this.style.backgroundColor='#E56668'"
  onmousedown="this.style.transform='scale(0.97)'"
  onmouseup="this.style.transform='scale(1)'"
>
  Read More
</a>`,
    registrationLink: "https://bit.ly/StepUp-R",
    startDate: "2025-03-05",
    registrationTimeDeadline: "23:59",
    registrationDateDeadline: "2025-04-5",
    seo: {
      meta_title:
        "Step Up! IELS x Skilio - 5-Week English Bootcamp for Professionals",
      meta_description:
        "Step Up! IELS x Skilio is a 5-week English bootcamp designed for professionals. Learn directly from experts, build your CV and LinkedIn, practice interviews, and graduate with opportunities for remote internships from Skilio.",
      meta_keywords:
        "IELS, Step Up, Skilio, English bootcamp, professional English, career mentoring, CV building, LinkedIn profile, interview skills, remote internship, work abroad",
    },
  },
  {
    id: "2",
    title: "IELS Circle: Transform Your English Skills in 8 Weeks",
    poster: "/images/contents/events/iels-circle.webp",
    description: `<div>
  <div>📅 Program Timeline: 13 January - 8 March 2025</div>
  <div>&nbsp;</div>
  <div><strong><em>IELS Circle</em> — Transform Your English Skills in 8 Weeks. Join an active English community with daily activities, live Zoom sessions, and unlimited chances to practice in a safe, supportive space.</strong></div>
  <div>&nbsp;</div>
  <div>Whether you’re starting small or aiming big, IELS Circle gives you the environment you need: daily practice, peer support, and structured activities that help you stay consistent while having fun.</div>
  <div>&nbsp;</div>
  <div><strong>What You'll Experience:</strong></div>
  <ul>
    <li>Daily English practice activities within the community</li>
    <li>Weekly Zoom sessions for interactive learning</li>
    <li>A safe space to speak without fear of mistakes</li>
    <li>Collaboration, peer feedback, and encouragement</li>
    <li>Connection with 500+ English learners around the world</li>
  </ul>
  <div>&nbsp;</div>
  <div><strong>Program Highlights:</strong></div>
  <ol>
    <li>8 weeks of community-driven structured learning</li>
    <li>Consistent daily practice to build habits</li>
    <li>Guided Zoom activities with mentors and peers</li>
    <li>Access to 100+ curated English resources from IELS</li>
  </ol>
  <div>&nbsp;</div>
  <div><strong>Community Impact:</strong></div>
  <div>By joining IELS Circle, you don’t just study — you connect, grow, and elevate your confidence in using English for study, work, and global opportunities.</div>
</div>
<div>&nbsp;</div>
<a href="https://www.instagram.com/p/DECV1UghuuL/?utm_source=ig_web_copy_link&igsh=N2ZwdzM1d2hnaGkw" target="_blank"
     style="
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background-color: #E56668;
    color: #ffffff;
    text-decoration: none;
    border-radius: 999px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.2s ease;
  "
  onmouseover="this.style.backgroundColor='#C04C4E'"
  onmouseout="this.style.backgroundColor='#E56668'"
  onmousedown="this.style.transform='scale(0.97)'"
  onmouseup="this.style.transform='scale(1)'"
>
  Read More
</a>`,
    registrationLink: "#",
    startDate: "2025-01-01",
    registrationTimeDeadline: "18:00",
    registrationDateDeadline: "2025-01-13",
    seo: {
      meta_title:
        "IELS Circle - Transform Your English Skills in 8 Weeks",
      meta_description:
        "IELS Circle is an 8-week English learning community where you can practice daily, join weekly Zoom sessions, connect with 500+ learners, and access 100+ English resources. Build confidence and improve your English in a safe, supportive space.",
      meta_keywords:
        "IELS, IELS Circle, English learning, English community, daily English practice, Zoom sessions, English resources, learn English, practice English, study English, improve English skills",
    },
  },
  {
    id: "3",
    title: "IELS Insight Series: Study Abroad, Grow Beyond – Global UGRAD",
    poster: "/images/contents/events/event-poster-1.png",
    description: `<div>
  <div>📅 Event Date: Saturday, 2 August 2025</div>
  <div>⏰ Time: 09.00 – 12.00 GMT+7</div>
  <div>&nbsp;</div>
  <div><strong><em>IELS Insight Series: Study Abroad, Grow Beyond – Global UGRAD.</em> Discover how you can study in the U.S. for one semester with a fully funded scholarship.</strong></div>
  <div>&nbsp;</div>
  <div>Global UGRAD is a U.S. government-funded program that covers tuition, housing, and living costs — all without requiring a perfect GPA or pre-submitted TOEFL score. This could be your chance to experience world-class education abroad at zero cost.</div>
  <div>&nbsp;</div>
  <div><strong>Speakers:</strong></div>
  <ul>
    <li><strong>Nyiur Salsabila Frida</strong> — Global UGRAD 2024 Awardee at Southern Illinois University Edwardsville</li>
    <li><strong>Muhammad Zaki Fazansyah</strong> — Global UGRAD 2024 Awardee at University of South Dakota</li>
  </ul>
  <div>&nbsp;</div>
  <div><strong>What You'll Learn:</strong></div>
  <ul>
    <li>Step-by-step guidance on preparing your application</li>
    <li>Insider tips directly from past Global UGRAD awardees</li>
    <li>First-hand stories of studying and living in the U.S.</li>
    <li>How to stand out even without a perfect GPA or TOEFL score</li>
  </ul>
  <div>&nbsp;</div>
  <div><strong>Why Join:</strong></div>
  <div>This session is your shortcut to understanding one of the most accessible yet underrated fully funded scholarships for Indonesian students. Learn directly from those who made it and start your journey to studying abroad.</div>
</div>
<div>&nbsp;</div>
<a href="https://www.instagram.com/p/DMScTRIhOcw/?utm_source=ig_web_copy_link&igsh=MXRlbTQ4djBmYTYxNQ==" target="_blank"
   style="
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background-color: #E56668;
    color: #ffffff;
    text-decoration: none;
    border-radius: 999px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.2s ease;
  "
  onmouseover="this.style.backgroundColor='#C04C4E'"
  onmouseout="this.style.backgroundColor='#E56668'"
  onmousedown="this.style.transform='scale(0.97)'"
  onmouseup="this.style.transform='scale(1)'"
>
  Read More
</a>`,
    registrationLink: "/register/business-english",
    startDate: "2025-07-10",
    registrationTimeDeadline: "17:00",
    registrationDateDeadline: "2025-07-05",
    seo: {
      meta_title:
        "IELS Insight Series: Study Abroad, Grow Beyond – Global UGRAD",
      meta_description:
        "Learn how to apply for the Global UGRAD scholarship — a fully funded program that allows Indonesian students to study in the U.S. for one semester. Hear directly from 2024 awardees about applications, tips, and life abroad.",
      meta_keywords:
        "IELS, IELS Insight Series, Global UGRAD, study abroad, fully funded scholarship, U.S. education, exchange program, Indonesian students, academic opportunities, international experience",
    },
  },
  {
    id: "4",
    title: "Dare to Dream: Take-Off to 3 Continents!",
    poster: "/images/contents/events/event-poster-2.png",
    description: `<div>
  <div>📅 Event Dates: 23 August, 30 August, and 6 September 2025</div>
  <div>⏰ Time: 09.00 GMT+7</div>
  <div>&nbsp;</div>
  <div><strong><em>Dare to Dream: Take-Off to 3 Continents!</em> Your complete guide to studying abroad with fully funded scholarships in Japan, Australia, Hungary, and Turkey.</strong></div>
  <div>&nbsp;</div>
  <div>Confused about how to study abroad? This series will walk you step-by-step through top scholarships that can take you across three continents — all fully funded.</div>
  <div>&nbsp;</div>
  <div><strong>Scholarship Focus:</strong></div>
  <ul>
    <div>Japan — MEXT</li>
    <div>Australia — AAS & AIYEP</li>
    <div>Hungary — Stipendium Hungaricum</li>
    <div>Turkey — Türkiye Bursları</li>
  </ul>
  <div>&nbsp;</div>
  <div><strong>What You'll Get:</strong></div>
  <ul>
    <li>📘 Free IELTS preparation e-book</li>
    <li>🎓 Scholarship clinic & consultation with mentors</li>
    <li>🎤 Mock interview practice sessions</li>
    <li>📝 Essay proofreading by real mentors</li>
  </ul>
  <div>&nbsp;</div>
  <div><strong>Event Schedule:</strong></div>
  <ol>
    <li><strong>23 August</strong> — Departure Day: Study Abroad 101</li>
    <li><strong>30 August</strong> — Scholarship Clinics: Deep Dive into 4 Countries</li>
    <li><strong>6 September</strong> — Arrival Day: Application Masterclass</li>
  </ol>
  <div>&nbsp;</div>
  <div><strong>Why Join:</strong></div>
  <div>This isn’t just theory — you’ll get practical guidance, real feedback, and tailored support to help you succeed in your scholarship applications and take off toward your global dreams.</div>
</div>
<div>&nbsp;</div>
<a href="https://www.instagram.com/p/DM5BEqGBCZe/?utm_source=ig_web_copy_link&igsh=MXUzNnBpZnI5ODFxag==" target="_blank"
   style="
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background-color: #E56668;
    color: #ffffff;
    text-decoration: none;
    border-radius: 999px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.2s ease;
  "
  onmouseover="this.style.backgroundColor='#C04C4E'"
  onmouseout="this.style.backgroundColor='#E56668'"
  onmousedown="this.style.transform='scale(0.97)'"
  onmouseup="this.style.transform='scale(1)'"
>
  Read More
</a>`,
    registrationLink: "/register/speaking-club",
    startDate: "2025-08-20",
    registrationTimeDeadline: "20:00",
    registrationDateDeadline: "2025-08-15",
    seo: {
      meta_title:
        "Dare to Dream: Take-Off to 3 Continents | Fully Funded Scholarships",
      meta_description:
        "Confused about studying abroad? Join Dare to Dream: Take-Off to 3 Continents and learn step-by-step guidance for fully funded scholarships to Japan (MEXT), Australia (AAS & AIYEP), Hungary (Stipendium Hungaricum), and Turkey (Türkiye Bursları). Includes IELTS prep e-book, clinics, mock interviews, and essay proofreading.",
      meta_keywords:
        "IELS, Dare to Dream, study abroad, scholarships, MEXT, AAS, AIYEP, Stipendium Hungaricum, Türkiye Bursları, IELTS prep, essay proofreading, mock interview, scholarship consultation",
    },
  },
  {
    id: "5",
    title: "IELS Grammar: Basic to Advanced in 2 Hours",
    poster: "/images/contents/events/iels-grammar.jpg",
    description: `<div>
  <div>📅 Event Date: 21 December 2024</div>
  <div>⏰ Time: 09.30 - 11.30 GMT+7</div>
  <div>&nbsp;</div>
  <div><strong><em>IELS Grammar</em> — Basic to Advanced in 2 Hours. A comprehensive hands-on workshop to sharpen your grammar foundation and take it to the next level.</strong></div>
  <div>&nbsp;</div>
  <div>Led by <strong>Arbadza Rido</strong>, EFL & ESL Teacher in South East Asia, this session is designed to help you gain clarity in grammar rules, apply them in real communication, and feel confident in academic, professional, and everyday contexts.</div>
  <div>&nbsp;</div>
  <div><strong>What You'll Learn:</strong></div>
  <ul>
    <li>Clear understanding of grammar rules and common mistakes</li>
    <li>Pro-level tips for applying grammar in writing and speaking</li>
    <li>Confidence boost for academic, professional, and social settings</li>
    <li>FREE session materials and cheat sheets</li>
  </ul>
  <div>&nbsp;</div>
  <div><strong>Program Highlights:</strong></div>
  <ol>
    <li>2-hour intensive grammar-focused workshop</li>
    <li>Practical exercises to apply grammar in real use</li>
    <li>Guided session with expert explanations and live Q&A</li>
    <li>Free downloadable resources to support your learning</li>
  </ol>
  <div>&nbsp;</div>
  <div><strong>Why Join:</strong></div>
  <div>This isn’t just another grammar lecture. You’ll leave with practical tools, renewed confidence, and the ability to write and speak with clarity and accuracy.</div>
</div>
<div>&nbsp;</div>
<a href="https://www.instagram.com/p/DDjgyPmB0pt/?utm_source=ig_web_copy_link&igsh=MWd5bWFneHB3cDFkYQ==" target="_blank"
   style="
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background-color: #E56668;
    color: #ffffff;
    text-decoration: none;
    border-radius: 999px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.2s ease;
  "
  onmouseover="this.style.backgroundColor='#C04C4E'"
  onmouseout="this.style.backgroundColor='#E56668'"
  onmousedown="this.style.transform='scale(0.97)'"
  onmouseup="this.style.transform='scale(1)'"
>
  Read More
</a>`,
    registrationLink: "/register/grammar-intensive",
    startDate: "2024-12-01",
    registrationTimeDeadline: "19:00",
    registrationDateDeadline: "2023-12-21",
    seo: {
      meta_title:
        "IELS Grammar: Basic to Advanced in 2 Hours | English Workshop",
      meta_description:
        "Master English grammar in just 2 hours with IELS! 🚀 Join Arbadza Rido, EFL & ESL Teacher in South East Asia, for a hands-on workshop covering grammar rules, writing & speaking tips, and free learning materials.",
      meta_keywords:
        "IELS, grammar workshop, English grammar, grammar rules, advanced grammar, English for academic purposes, English for professionals, writing skills, speaking skills, grammar practice, English event",
    },
  },
  {
    id: "6",
    title: "Step Up! Your Career, Borderless",
    poster: "/images/contents/events/step-up-event.jpeg",
    description: `<div>
  <div>📅 Program Timeline: 11 October - 25 November 2025</div>
  <div>&nbsp;</div>
  <div><strong><em>Step Up! Vol. 2.0 — Your Career, Borderless.</em> A 3-week transformative career bootcamp to prepare you for global and remote opportunities.</strong></div>
  <div>&nbsp;</div>
  <div>Want to land remote internships and get paid up to <strong>300 SGD/month</strong>? This program gives you the skills, mentorship, and portfolio you need to stand out in today’s competitive job market.</div>
  <div>&nbsp;</div>
  <div><strong>What You'll Experience:</strong></div>
  <ul>
    <li>2 interactive webinars with expert mentors</li>
    <li>1:1 mentorship sessions for personalized guidance</li>
    <li>Final Project: Career Map, CV & LinkedIn, Elevator Pitch Video</li>
    <li>Certificate of completion</li>
    <li>Exclusive access to IELS Lounge Premium</li>
  </ul>
  <div>&nbsp;</div>
  <div><strong>Program Highlights:</strong></div>
  <ol>
    <li>3-week intensive career readiness journey</li>
    <li>Personalized feedback from experienced mentors</li>
    <li>Hands-on projects to build a global-ready portfolio</li>
    <li>Affordable packages starting from 30K</li>
  </ol>
  <div>&nbsp;</div>
  <div><strong>Why Join:</strong></div>
  <div>Step Up! Vol. 2.0 isn’t just training — it’s your gateway to borderless opportunities. Get career-ready, grow your network, and unlock your chance to work globally.</div>
  <div>&nbsp;</div>
  <div>🚨 Don’t wait — registration closes on <strong>10 October 2025 at 23.59 GMT+7</strong>.</div>
</div>
<div>&nbsp;</div>
<a href="https://www.instagram.com/p/DO3HtnngaDn/?utm_source=ig_web_copy_link&igsh=dHJxZTRib2QyZnNw" target="_blank"
   style="
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background-color: #E56668;
    color: #ffffff;
    text-decoration: none;
    border-radius: 999px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.2s ease;
  "
  onmouseover="this.style.backgroundColor='#C04C4E'"
  onmouseout="this.style.backgroundColor='#E56668'"
  onmousedown="this.style.transform='scale(0.97)'"
  onmouseup="this.style.transform='scale(1)'"
>
  Read More
</a>`,
    registrationLink: "https://forms.gle/WzidhZoT8YfgsJwx7",
    startDate: "2025-10-11",
    registrationTimeDeadline: "23:59",
    registrationDateDeadline: "2025-10-10",
    seo: {
      meta_title:
        "Step Up! Vol. 2.0 - Your Career, Borderless | IELS Career Bootcamp",
      meta_description:
        "Step Up! Vol. 2.0 is a 3-week career bootcamp by IELS designed to help you secure remote internships and global opportunities. Join webinars, mentorship, and hands-on projects to build your CV, LinkedIn, and elevator pitch. Affordable packages start from 30K!",
      meta_keywords:
        "IELS, Step Up, career bootcamp, remote internship, mentorship, CV building, LinkedIn profile, elevator pitch, global opportunities, professional English",
    },
  },
  {
    id: "7",
    title: "Beyond Borders: Youth Skills That Conquer the World",
    poster: "/images/contents/events/beyond-borders.webp",
    description: `<div>
  <div>📅 Event Date: Saturday, 30 August 2025</div>
  <div>⏰ Time: 19.00 – 21.00 GMT+7</div>
  <div>&nbsp;</div>
  <div><strong><em>Beyond Borders: Youth Skills That Conquer the World</em> — A special collaboration between IELS and LuarSekolah to prepare young people for global opportunities.</strong></div>
  <div>&nbsp;</div>
  <div>🌍 Do you dream of working internationally but don’t know where to start? This event is your chance to discover how to build the skills and mindset that employers worldwide are looking for.</div>
  <div>&nbsp;</div>
  <div><strong>What You'll Gain:</strong></div>
  <ul>
    <li>✅ Practical strategies to kickstart your global career</li>
    <li>✅ Future-proof skills that top employers demand</li>
    <li>✅ How to combine English + professional skills to stand out</li>
    <li>✅ A growth mindset to collaborate, compete, and succeed internationally</li>
  </ul>
  <div>&nbsp;</div>
  <div><strong>Why Join:</strong></div>
  <div>This isn’t just a talk — it’s a roadmap to help you level up your skills, sharpen your competitive edge, and take the first step toward conquering the world stage.</div>
</div>
<div>&nbsp;</div>
<a href="https://www.instagram.com/p/DNdH2drBTpp/?utm_source=ig_web_copy_link&igsh=MWtidXAwMHVoOWp5Mg==" target="_blank"
   style="
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background-color: #E56668;
    color: #ffffff;
    text-decoration: none;
    border-radius: 999px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.2s ease;
  "
  onmouseover="this.style.backgroundColor='#C04C4E'"
  onmouseout="this.style.backgroundColor='#E56668'"
  onmousedown="this.style.transform='scale(0.97)'"
  onmouseup="this.style.transform='scale(1)'"
>
  Read More
</a>`,
    registrationLink: "https://forms.gle/WzidhZoT8YfgsJwx7",
    startDate: "2025-8-30",
    registrationTimeDeadline: "23:59",
    registrationDateDeadline: "2025-8-30",
    seo: {
      meta_title:
        "Beyond Borders: Youth Skills That Conquer the World | IELS x LuarSekolah",
      meta_description:
        "Join Beyond Borders: Youth Skills That Conquer the World — a special IELS x LuarSekolah event on 30 August 2025. Learn practical strategies, future-proof skills, and the mindset to kickstart your global career",
      meta_keywords:
        "IELS, LuarSekolah, Beyond Borders, youth skills, global career, international work, future skills, English and career, professional skills, international opportunities, Zoom webinar 2025",
    },
  },
  {
    id: "8",
    title: "Free TOEIC Try Out — by EStudyMe",
    poster: "/images/contents/events/free-toeic.png",
    description: `<div>
  <div>📅 Test Period: 26 September – 5 October 2025</div>
  <div>⏰ Duration: ~2 Hours (Timed Test)</div>
  <div>&nbsp;</div>
  <div><strong><em>Free TOEIC Try Out</em> — A collaboration between IELS and EStudyMe to give you the closest experience to the official TOEIC exam.</strong></div>
  <div>&nbsp;</div>
  <div>The TOEIC Try Out is designed to simulate real exam conditions, with authentic question formats, strict timing, and a full set of 200 questions to measure your English proficiency in listening and reading.</div>
  <div>&nbsp;</div>
  <div><strong>🎯 What You Will Experience:</strong></div>
  <ul>
    <li>✅ Full-length TOEIC simulation: 200 questions (100 Listening + 100 Reading)</li>
    <li>✅ Timed test under official TOEIC conditions</li>
    <li>✅ Authentic question types that mirror the real exam</li>
    <li>✅ Practice your time management and accuracy</li>
  </ul>
  <div>&nbsp;</div>
  <div><strong>📝 Test Details:</strong></div>
  <ul>
    <li><strong>Format:</strong> Online – Computer-Based / Internet-Based Test</li>
    <li><strong>Questions:</strong> 200 (100 Listening + 100 Reading)</li>
    <li><strong>Duration:</strong> ~2 hours</li>
    <li><strong>Fee:</strong> Free — designed by EStudyMe, fully facilitated by IELS</li>
    <li><strong>Eligibility:</strong> Open for all learners who want to measure their English proficiency</li>
  </ul>
  <div>&nbsp;</div>
  <div><strong>Why Join:</strong></div>
  <div>This free try out is your chance to practice with real TOEIC exam standards, identify your strengths and weaknesses, and boost your confidence before taking the official test.</div>
</div>`,
    registrationLink: "https://estudyme.com/study/simulation-test/toeic-testpro/test-1-62b69492bbc57b27fe10f7ac/",
    startDate: "2025-10-05",
    registrationTimeDeadline: "23:59",
    registrationDateDeadline: "2025-10-05",
    seo: {
      meta_title:
        "Free TOEIC Try Out Online",
      meta_description:
        "Join the Free TOEIC Try Out by EStudyMe (26 Sept – 5 Oct 2025). Experience a full-length, timed TOEIC simulation with 200 questions, authentic format, and realistic difficulty. Perfect practice for official TOEIC exam takers.",
      meta_keywords:
        "TOEIC try out, free TOEIC test, TOEIC online simulation, TOEIC practice test, TOEIC preparation, TOEIC listening, TOEIC reading, IELS TOEIC, TOEIC",
    },
  },
{
  id: "9",
  title: "IELS Lounge Premium — October 2025: Speak to Connect",
  poster: "/images/contents/events/lounge-october.png",
  description: `<div>
  <div><strong>📅 Period: October 11 – October 31, 2025</strong></div>
  <div>⏰ Daily Activities + Exclusive Sessions</div>
  <div>&nbsp;</div>
  <div><strong><em>IELS Lounge Premium</em> this October brings you daily practice sessions designed to boost your storytelling, teamwork, and project planning skills — all in English.</strong></div>
  <div>&nbsp;</div>
  <div><strong>🎯 What You Will Experience:</strong></div>
  <ul>
    <li>✅ <strong>Speaking Club Every Night (8 PM)</strong> — daily practice with friends through stories, discussions, and fun activities</li>
    <li>✅ <strong>Weekly Themes</strong>:<br/>
        - Week 1: Sharing Experiences <br/>
        - Week 2: Group Work & Collaboration <br/>
        - Week 3: Agreeing & Disagreeing <br/>
        - Week 4: Planning Future Projects</li>
    <li>✅ <strong>Exclusive Events for Premium Members:</strong><br/>
        - Week 2: Group Work Challenge – Build the Best Team Strategy <br/>
        - Week 4: Future Project Pitch – Shaping Ideas Together</li>
    <li>✅ Bi-weekly Zoom activities (roleplays, games, teamwork challenges)</li>
    <li>✅ Daily content on Discord & WhatsApp (vocabulary, idioms, grammar tips, quizzes, reflection)</li>
  </ul>
  <div>&nbsp;</div>
  <div><strong>Why Join:</strong></div>
  <div>In IELS Lounge, English becomes part of your daily rhythm. You’ll gain vocabulary for real-life use, build confidence in speaking, and grow teamwork skills through projects and shared stories. Learning here feels closer, lighter, and way more fun.</div>
</div>
<div>&nbsp;</div>
<a href="https://www.instagram.com/p/DPQ3B_DgflP/?igsh=MWw5enkwNXZrMWdldg==" target="_blank"
   style="
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background-color: #E56668;
    color: #ffffff;
    text-decoration: none;
    border-radius: 999px;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.2s ease;
  "
  onmouseover="this.style.backgroundColor='#C04C4E'"
  onmouseout="this.style.backgroundColor='#E56668'"
  onmousedown="this.style.transform='scale(0.97)'"
  onmouseup="this.style.transform='scale(1)'"
>
  Read More
</a>`,
  registrationLink: "https://ielsco.com/iels-lounge",
  startDate: "2025-10-11",
  registrationTimeDeadline: "23:59",
  registrationDateDeadline: "2025-10-28",
  seo: {
    meta_title: "IELS Lounge Premium October 2025 — Speak to Connect",
    meta_description:
      "Join IELS Lounge Premium this October (11–31 Oct 2025). Daily speaking practice + exclusive events to grow your storytelling, teamwork, and project planning skills in English. Only 25k/month.",
    meta_keywords:
      "IELS Lounge Premium, English speaking club, daily English practice, storytelling in English, teamwork skills, project planning English, IELS October program",
  },
},
{
  id: "10",
  title: "English Student Launchpad — Your Global English Career Starts Here",
  poster: "/images/contents/events/launchpad.png",
  description: `<div>
  <div><strong>📅 Journey Duration: November 2025 – February 2026</strong></div>
  <div>⏰ Weekly Community Activities & Monthly Webinars</div>
  <div>&nbsp;</div>
  <div><strong><em>English Student Launchpad</em> is a 3-month journey incubator designed to help English majors turn their degree into a real global career path.</strong></div>
  <div>&nbsp;</div>
  <div><strong>What You Will Experience:</strong></div>
  <ul>
    <li><strong>Remote Work & Global Career Roadmap</strong> — practical guidance to land international/remote jobs</li>
    <li><strong>Exclusive Community Access</strong> — join 500+ peers with the same global ambition</li>
    <li><strong>Weekly Skill-Building Activities</strong> — discussions, tasks, and peer support</li>
    <li><strong>3 Major Webinars:</strong><br/>
        - December 2025: Unlocking Global Employment <br/>
        - January 2026: Mastering TEFL/TESL for Teaching Abroad <br/>
        - February 2026: Global Resume Workshop
    </li>
    <li><strong>Capstone Project</strong> — graduate with a global-ready portfolio</li>
  </ul>
  <div>&nbsp;</div>
  <div><strong>📌 Your Launchpad Roadmap</strong></div>
  <ul>
    <li><strong>December 2025</strong> — Remote Work & Global Jobs</li>
    <li><strong>January 2026</strong> — TEFL/TESL & Teaching Abroad</li>
    <li><strong>February 2026</strong> — Portfolio Building + Next Steps</li>
  </ul>
  <div>&nbsp;</div>
  <div><strong>Choose Your Launch Tier:</strong></div>
  <ul>
    <li><strong>Solo Pass:</strong> Rp15.000 — full 3-month experience</li>
    <li><strong>Friend Discount:</strong> Rp10.000/person (Rp20.000 for 2) — launch together and save more</li>
  </ul>
  <div>&nbsp;</div>
  <div>English Student Launchpad is built for learners who want to turn English into real opportunities — with practical skills, clearer direction, and a supportive community.</div>
</div>`,
  registrationLink: " https://forms.gle/nvLAcbnAw5aAPvBf8",
  startDate: "2025-12-14",
  registrationTimeDeadline: "23:59",
  registrationDateDeadline: "2025-12-14",
  seo: {
    meta_title:
      "English Student Launchpad — Global Career Journey for English Majors",
    meta_description:
      "Join the English Student Launchpad (Nov 2025 – Feb 2026), a 3-month guided journey for English majors to pursue global careers through webinars, portfolio building, and weekly community activities.",
    meta_keywords:
      "English Student Launchpad, English major career, TEFL TESL workshop, remote English jobs, international English careers, English portfolio, English webinar, global opportunities",
  },
}
];
