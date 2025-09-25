import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { programUpdatesData } from "@/data/program-updates";
import { partnerUpdatesData } from "@/data/partner-updates";

export default function DetailNews() {
  // Function to get random items from arrays
  const getRandomItems = <T,>(array: T[], count: number): T[] => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Get 1 random program update and 1 random partner update
  const randomProgramUpdate = getRandomItems(programUpdatesData, 1)[0];
  const randomPartnerUpdate = getRandomItems(partnerUpdatesData, 1)[0];

  return (
    <div>
      <Header />
      <div className="flex flex-col bg-white md:gap-[65px] pb-12">
        <Image
          src="/images/contents/stories/member-stories/banner/philippines-banner.png"
          alt="Philippines"
          width={1300}
          height={500}
          className="w-screen md:h-[335px] h-[150px] object-cover"
        />
        <div className="flex flex-col lg:flex-row w-full px-4 sm:px-8 lg:px-[100px] gap-6 lg:gap-[100px] -mt-17 md:mt-0">
          <div className="flex flex-col md:gap-6 w-full lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center md:gap-4 gap-8">
              <div className="flex flex-col sm:flex-row items-start items-center gap-3 w-full sm:w-auto">
                <div className="w-[120px] h-[120px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[147px] lg:h-[147px] rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  <Image
                    src="/images/contents/stories/member-stories/profile/member-stories.png"
                    alt="Profile"
                    width={147}
                    height={147}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between py-3 w-full sm:w-auto h-[100px] sm:h-[120px] lg:h-[147px]">
                  <p className="text-lg sm:text-xl lg:text-[24px] w-full sm:w-[340px] font-bold text-[#2F4157] leading-tight">
                    Jo&apos;s Week Long Adventure at ISUFST, Philippines 🇵🇭
                  </p>
                  <p className="text-sm sm:text-[15px] text-[#2F4157] leading-relaxed flex">
                    George Abraham (Jo)
                  </p>
                </div>
              </div>
              <div className="self-start sm:self-end pb-3 text-sm sm:text-base font-bold md:font-normal">
                Jakarta, May 25, 2025
              </div>
            </div>
            <div className="flex w-full text-justify text-sm sm:text-base leading-relaxed">
              A proud achievement has emerged from the International English
              Language Society (IELS) as one of its outstanding alumni, Nadine
              Aulia Ramadhani, has officially been accepted into the Google
              Global Internship Program 2025. This highly competitive
              international program selects only a small percentage of
              applicants from across the globe, making Nadine&apos;s acceptance
              a remarkable milestone. Nadine will join Google&apos;s Product
              Marketing team for the Asia-Pacific region, based in their
              Singapore office, for a 12-week internship starting this June. Her
              role will include contributing to marketing strategies for
              Google&apos;s regional products, conducting user research, and
              working on cross-functional campaigns under the mentorship of
              seasoned industry professionals. From Language Classes to Global
              Opportunities Nadine completed IELS&apos;s English for Academic
              and Professional Purposes (EAPP) program in 2023, a course
              designed to build job-readiness and workplace communication
              skills. Known for her active participation, leadership in group
              activities, and sharp communication skills, Nadine stood out
              throughout her time at IELS. &quot;What IELS gave me was more than
              just language skills,&quot; Nadine shared. &quot;The training
              helped me think critically, present confidently, and communicate
              professionally—all of which were crucial during the interview and
              case study rounds at Google.&quot; A Rigorous Selection Process
              The selection process for Google&apos;s Global Internship Program
              is known to be one of the most rigorous in the industry.
              Candidates must pass multiple stages, including online
              assessments, behavioral interviews, and a live case challenge.
              During her case study round, Nadine was tasked with creating a
              go-to-market strategy for a digital product targeted at Southeast
              Asian youth—complete with budgeting, user personas, and outreach
              plans. Nadine&apos;s proposal, which emphasized digital
              inclusivity and community impact, caught the attention of
              Google&apos;s recruitment panel. Her unique insights and
              structured approach were noted as &quot;well-aligned with
              Google&apos;s mission to make information universally accessible
              and useful.&quot; Backed by the IELS Community The IELS community
              celebrated Nadine&apos;s achievement with pride. Dr. Arman
              Siregar, Director of Academic Programs at IELS, expressed his
              appreciation: &quot;Nadine&apos;s success showcases what&apos;s
              possible when language learning is contextualized to real-world
              challenges. Our mission has always been to prepare students not
              only to speak English—but to succeed in global environments.&quot;
              He further emphasized the importance of experiential learning and
              soft-skill development as key components of IELS&apos;s
              curriculum, stating that the institute will continue to evolve in
              line with industry needs. Inspiring Future Generations For Nadine,
              this internship is more than just a career opportunity—it&apos;s a
              stepping stone toward giving back. &quot;I want to prove that
              Indonesian youth can thrive globally when given the right tools
              and opportunities. I hope to use this experience to inspire others
              and maybe someday mentor students just like me,&quot; she said.
              After completing her internship, Nadine plans to continue working
              on social-impact projects that bridge technology and community
              empowerment—and perhaps return to Google in a full-time capacity
              in the near future.
            </div>
          </div>
          <div className="flex flex-col lg:flex-row xl:flex-col gap-2 sm:gap-4 lg:gap-6 w-full lg:w-1/4">
            <Image
              src="/images/contents/general/iels_insight.png"
              alt="IELS Insight Logo"
              width={300}
              height={50}
              className="h-auto w-full max-w-[250px] sm:max-w-[300px] mx-auto lg:mx-0"
            />

            {/* Cards Container - Responsive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-4 lg:gap-6 w-full">
              {/* Program Update Card */}
              <div className="flex flex-col gap-2 sm:gap-3 w-full">
                {/* Image Container with 50% height crop */}
                <div className="relative w-full h-[200px] sm:h-[220px] lg:h-[241px] overflow-hidden rounded-[15px]">
                  <Image
                    src={randomProgramUpdate.image}
                    alt={randomProgramUpdate.title}
                    width={450}
                    height={450}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Category Label */}
                <div className="flex flex-col gap-1 sm:gap-2">
                  <p className="text-red-500 font-bold text-xs uppercase tracking-wide">
                    Program Updates
                  </p>
                  <p className="font-bold text-lg sm:text-xl lg:text-[24px] text-[#2F4157] leading-tight">
                    {randomProgramUpdate.title}
                  </p>
                  <p className="text-sm text-[#2F4157] leading-relaxed">
                    {randomProgramUpdate.description.length > 150
                      ? `${randomProgramUpdate.description.substring(
                          0,
                          150
                        )}...`
                      : randomProgramUpdate.description}
                  </p>
                </div>
                <button className="border-1 border-[#2F4157] cursor-pointer rounded-[15px] px-2 py-1 w-fit mt-2 sm:mt-4 hover:bg-[#2F4157] hover:text-white transition-colors text-[#2F4157] text-sm">
                  Read More
                </button>
              </div>

              {/* Partner Update Card */}
              <div className="flex flex-col gap-2 sm:gap-3 w-full">
                {/* Image Container with 50% height crop */}
                <div className="relative w-full h-[200px] sm:h-[220px] lg:h-[241px] overflow-hidden rounded-[15px]">
                  <Image
                    src={randomPartnerUpdate.image}
                    alt={randomPartnerUpdate.title}
                    width={450}
                    height={450}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Category Label */}
                <div className="flex flex-col gap-1 sm:gap-2">
                  <p className="text-red-500 font-bold text-xs uppercase tracking-wide">
                    Partner Updates
                  </p>
                  <p className="font-bold text-lg sm:text-xl lg:text-[24px] text-[#2F4157] leading-tight">
                    {randomPartnerUpdate.title}
                  </p>
                  <p className="text-sm text-[#2F4157] leading-relaxed">
                    {randomPartnerUpdate.description.length > 150
                      ? `${randomPartnerUpdate.description.substring(
                          0,
                          150
                        )}...`
                      : randomPartnerUpdate.description}
                  </p>
                </div>
                <button className="border-1 border-[#2F4157] cursor-pointer rounded-[15px] px-2 py-1 w-fit mt-2 sm:mt-4 hover:bg-[#2F4157] hover:text-white transition-colors text-[#2F4157] text-sm">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
