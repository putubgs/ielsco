import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { programUpdatesData } from "@/data/program-updates";
import { partnerUpdatesData } from "@/data/partner-updates";
import { memberStoriesData } from "@/data/member-stories";
import { generateSlug } from "@/utils/slug";

interface DetailStoriesPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DetailStoriesPage({
  params,
}: DetailStoriesPageProps) {
  const { slug } = await params;

  // Find the member story by slug
  const memberStory = memberStoriesData.find(
    (story) => generateSlug(story.title) === slug
  );

  if (!memberStory) {
    return (
      <div>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white">
          <h1 className="text-2xl font-bold text-[#2F4157] mb-4">
            Story Not Found
          </h1>
          <p className="text-gray-600">
            The story you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

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
          src={memberStory.bannerImage}
          alt={memberStory.title}
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
                    src={memberStory.author.avatar}
                    alt={memberStory.author.name}
                    width={147}
                    height={147}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between py-3 w-full sm:w-auto h-[100px] sm:h-[120px] lg:h-[147px]">
                  <p className="text-lg sm:text-xl lg:text-[24px] w-full sm:w-[340px] font-bold text-[#2F4157] leading-tight">
                    {memberStory.title}
                  </p>
                  <p className="text-sm sm:text-[15px] text-[#2F4157] leading-relaxed flex">
                    {memberStory.author.name}
                  </p>
                </div>
              </div>
              <div className="self-start sm:self-end pb-3 text-sm sm:text-base font-bold md:font-normal">
                {memberStory.location}, {memberStory.date}
              </div>
            </div>
            <div 
              className="w-full text-justify text-sm sm:text-base leading-relaxed [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-1"
              dangerouslySetInnerHTML={{ __html: memberStory.content }}
            />
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
