import Image from "next/image";
import Link from "next/link";
import { EventData } from "@/data/events";
import { generateSlug } from "@/utils/slug";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: EventData;
  onEventClick?: () => void;
}

export default function EventCard({ event, onEventClick }: EventCardProps) {
  const eventSlug = generateSlug(event.title);

  const handleClick = () => {
    if (onEventClick) onEventClick();
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      
      {/* Poster */}
      <Link href={`/events/${eventSlug}`} onClick={handleClick}>
        <Image
          src={event.poster}
          alt={event.title}
          width={450}
          height={450}
          className="w-full h-auto object-cover hover:opacity-95 transition-opacity cursor-pointer"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-3 px-4 pb-4">
        <Link href={`/events/${eventSlug}`} onClick={handleClick}>
          <h3 className="font-bold text-[20px] text-[#2F4157] hover:underline cursor-pointer">
            {event.title}
          </h3>
        </Link>

        <p className="text-[14px] text-gray-600 leading-relaxed line-clamp-3">
          {event.seo.meta_description}
        </p>

        {/* CTA */}
        <Button
          asChild
          className="mt-4 bg-[#E56668] text-white px-5 py-2 w-fit hover:bg-[#C04C4E]"
        >
          <Link href={`/events/${eventSlug}`} onClick={handleClick}>
            Read More
          </Link>
        </Button>
      </div>
    </div>
  );
}