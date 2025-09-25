import Image from "next/image";
import Link from "next/link";
import { EventData } from "@/data/events";
import { generateSlug } from "@/utils/slug";

interface EventCardProps {
  event: EventData;
  onEventClick?: () => void;
}

export default function EventCard({ event, onEventClick }: EventCardProps) {
  const eventSlug = generateSlug(event.title);

  const handleClick = () => {
    if (onEventClick) {
      onEventClick();
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <Link href={`/events/${eventSlug}`} onClick={handleClick}>
        <Image
          src={event.poster}
          alt={event.title}
          width={450}
          height={450}
          className="w-full h-auto rounded-[20px] hover:opacity-90 transition-opacity cursor-pointer"
        />
      </Link>
      <div className="flex flex-col gap-4">
        <Link href={`/events/${eventSlug}`} onClick={handleClick}>
          <p className="font-bold text-[24px] hover:text-[#2F4157] transition-colors cursor-pointer">
            {event.title}
          </p>
        </Link>
        <p className="text-[15px]">
          {event.seo.meta_description}
        </p>
      </div>
      <Link
        href={`/events/${eventSlug}`}
        onClick={handleClick}
        className="border-1 border-black rounded-[20px] px-2 py-1 w-fit mt-8 hover:bg-black hover:text-white transition-colors"
      >
        Read More
      </Link>
    </div>
  );
}
