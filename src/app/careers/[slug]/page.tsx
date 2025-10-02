import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { careersData } from "@/data/careers-data";
import { generateSlug } from "@/utils/slug";
import { Metadata } from "next";
import Link from "next/link";

interface DetailCareerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: DetailCareerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const career = careersData.find((job) => generateSlug(job.title) === slug);

  if (!career) {
    return {
      title: "Career Not Found - IELS",
      description: "The requested career opportunity could not be found.",
    };
  }

  return {
    title: career.seo?.meta_title || career.title,
    description: career.seo?.meta_description,
    keywords: career.seo?.meta_keywords,
    openGraph: {
      title: career.seo?.meta_title || career.title,
      description: career.seo?.meta_description,
      images: [career.bannerImage],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: career.seo?.meta_title || career.title,
      description: career.seo?.meta_description,
      images: [career.bannerImage],
    },
  };
}

export default async function DetailCareerPage({
  params,
}: DetailCareerPageProps) {
  const { slug } = await params;
  const career = careersData.find((job) => generateSlug(job.title) === slug);

  if (!career) {
    return (
      <div>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white">
          <h1 className="text-2xl font-bold text-[#2F4157] mb-4">
            Career Not Found
          </h1>
          <p className="text-gray-600">
            The career opportunity you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col bg-white pb-12">
        {/* Banner */}
        <Image
          src={career.bannerImage}
          alt={career.title}
          width={1300}
          height={500}
          className="w-screen md:h-[335px] h-[150px] object-cover"
        />

        <div className="flex flex-col w-full px-4 sm:px-8 lg:px-[100px] mt-8 gap-6 lg:flex-row">
          {/* Left content */}
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2F4157]">
              {career.title}
            </h1>
            <p className="text-sm text-gray-600">
              {career.division} • {career.level} • {career.mode}
            </p>

            {/* Job Description */}
            {career.jobDescription && (
              <div>
              <h3 className="text-xl font-bold mt-8 mb-2 text-[#2F4157]">Job Description</h3>
            <div
              className="w-full text-justify text-sm sm:text-base leading-relaxed [&_ul]:list-disc [&_ul]:ml-6 [&_li]:mb-1"
              dangerouslySetInnerHTML={{ __html: career.jobDescription }}
            />
              </div>
            )}

            {/* Requirements */}
            {career.requirements && (
              <div>
              <h3 className="text-xl font-bold mt-8 mb-2 text-[#2F4157]">Requirements</h3>
              <div
                className="w-full text-justify text-sm sm:text-base leading-relaxed [&_ul]:list-disc [&_ul]:ml-6 [&_li]:mb-1 [&_h4]:mt-3 [&_h4]:font-semibold"
                dangerouslySetInnerHTML={{ __html: career.requirements }}
              />
              </div>
            )}

            {/* Benefits */}
            {career.benefits && (
              <div>
              <h3 className="text-xl font-bold mt-8 mb-2 text-[#2F4157]">Benefits</h3>
              <div
                className="w-full text-justify text-sm sm:text-base leading-relaxed [&_ul]:list-disc [&_ul]:ml-6 [&_li]:mb-1"
                dangerouslySetInnerHTML={{ __html: career.benefits }}
              />
              </div>
            )}

            {/* Duration */}
            {career.duration && (
              <div>
                <h2 className="text-xl font-semibold text-[#2F4157] mb-2">
                  Duration
                </h2>
                <p className="text-gray-700">{career.duration}</p>
              </div>
            )}

            {/* Apply Button */}
            <div className="mt-6">
              <a
                href={career.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#e56668] hover:bg-red-500 text-white px-6 py-3 rounded-full text-sm font-semibold"
              >
                Apply Now
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 bg-gray-50 rounded-2xl p-6 shadow-sm h-fit">
            <h3 className="font-bold text-lg text-[#2F4157] mb-2">
              Position Details
            </h3>
            <p><strong>Division:</strong> {career.division}</p>
            <p><strong>Level:</strong> {career.level}</p>
            <p><strong>Mode:</strong> {career.mode}</p>
            {career.deadline && (
              <p><strong>Deadline:</strong> {career.deadline}</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
