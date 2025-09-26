import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { eventsData } from "@/data/events";
import { generateSlug } from "@/utils/slug";
import { Metadata } from "next";

// Function to find event by slug
function findEventBySlug(slug: string) {
  return eventsData.find((event) => generateSlug(event.title) === slug);
}

interface EventDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const event = findEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found - IELS",
      description: "The requested event could not be found.",
    };
  }

  return {
    title: event.seo.meta_title,
    description: event.seo.meta_description,
    keywords: event.seo.meta_keywords,
    openGraph: {
      title: event.seo.meta_title,
      description: event.seo.meta_description,
      images: [event.poster],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: event.seo.meta_title,
      description: event.seo.meta_description,
      images: [event.poster],
    },
  };
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;

  // Find the event by slug
  const event = findEventBySlug(slug);

  // If event not found, show 404
  if (!event) {
    notFound();
  }

  // Check if registration is still open (GMT+7)
  const now = new Date();
  const [year, month, day] = event.registrationDateDeadline
    .split("-")
    .map(Number);
  const [hours, minutes] = event.registrationTimeDeadline
    .split(":")
    .map(Number);

  // Create deadline date in UTC (GMT+7 time minus 7 hours = UTC)
  const deadlineUTC = new Date(
    Date.UTC(year, month - 1, day, hours - 7, minutes, 0)
  );

  const isRegistrationOpen = deadlineUTC > now;

  return (
    <div>
      <Header />

      {/* Main Content */}
      <div className="bg-white px-6 lg:px-[100px] py-16">
        <div className="max-w-6xl mx-auto">
          {/* Simple Flex Layout: Image Left, Content Right */}
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left: Event Poster */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <Image
                  src={event.poster}
                  alt={event.title}
                  width={600}
                  height={800}
                  className="w-full h-auto rounded-[20px] shadow-lg"
                  priority
                />

                {/* Registration Status Badge */}
                <div
                  className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium ${
                    isRegistrationOpen
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {isRegistrationOpen ? "Open" : "Closed"}
                </div>
              </div>
            </div>

            {/* Right: Event Details */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              {/* Event Title */}
              <h1 className="text-4xl lg:text-5xl font-bold text-[#2F4157] mb-6 leading-tight">
                {event.title}
              </h1>

              {/* Event Description */}
              <div
                className="w-full text-justify text-sm sm:text-base leading-relaxed [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-1 pb-12"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />

              {/* Action Buttons */}
              <div className="flex">
                {isRegistrationOpen && (
                  <Link
                    href={event.registrationLink}
                    className="inline-flex items-center justify-center bg-[#2F4157] text-white px-8 py-4 rounded-[20px] font-semibold text-lg hover:bg-[#4B5B6E] transition-colors shadow-lg"
                    target="_blank"
                  >
                    Register Now
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
