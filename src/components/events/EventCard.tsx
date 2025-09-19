import Image from "next/image";
import Link from "next/link";
import { EventData } from "@/app/data/events";

interface EventCardProps {
  event: EventData;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Image
        src={event.poster}
        alt={event.title}
        width={450}
        height={450}
        className="w-full h-auto rounded-[20px]"
      />
      <div className="flex flex-col gap-4">
        <p className="font-bold text-[24px]">{event.title}</p>
        <p className="text-[15px]">
          {event.description.length > 215
            ? `${event.description.substring(0, 215)}...`
            : event.description}
        </p>
      </div>
      <Link
        href={event.registrationLink}
        className="border-1 border-black rounded-[20px] px-2 py-1 w-fit mt-8 hover:bg-black hover:text-white transition-colors"
      >
        Read More
      </Link>
    </div>
  );
}
