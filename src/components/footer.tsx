import Image from "next/image";
import Link from "next/link";
import { Instagram, X, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <div className="bg-white flex flex-col lg:flex-row w-full py-8 lg:py-12 px-4 sm:px-8 lg:px-[100px] gap-8 lg:gap-0 border-t-1 border-gray-200">
      {/* Logo and Social Icons */}
      <div className="flex flex-col lg:w-[25%] gap-4 lg:gap-3 items-center lg:items-start">
        <Image
          src="/images/logos/iels_gray.png"
          alt="IELS Logo - Gray"
          width={60}
          height={60}
          className="md:w-[75px]"
        />
        <div className="flex gap-4 lg:gap-3">
          <Link href="#" className="hover:opacity-70 transition-opacity">
            <X style={{ fontSize: 24 }} className="lg:text-[25px]" />
          </Link>
          <Link href="#" className="hover:opacity-70 transition-opacity">
            <Instagram style={{ fontSize: 24 }} className="lg:text-[25px]" />
          </Link>
          <Link href="#" className="hover:opacity-70 transition-opacity">
            <LinkedIn style={{ fontSize: 24 }} className="lg:text-[25px]" />
          </Link>
        </div>
      </div>

      {/* Follow Us Section */}
      <div className="flex flex-col lg:w-[25%] gap-4 lg:gap-6 text-center lg:text-left">
        <div>
          <p className="font-bold text-lg lg:text-base">Follow Us:</p>
        </div>
        <div className="flex flex-col gap-2 lg:gap-3">
          <Link
            href="https://www.instagram.com/iels_co"
            className="hover:underline transition-all duration-200 text-sm lg:text-base"
            target="_blank"
          >
            Instagram
          </Link>
          <Link
            href="https://www.linkedin.com/company/iels-co"
            className="hover:underline transition-all duration-200 text-sm lg:text-base"
            target="_blank"
          >
            LinkedIn
          </Link>
          <Link
            href="https://www.tiktok.com/@iels_co"
            className="hover:underline transition-all duration-200 text-sm lg:text-base"
            target="_blank"
          >
            Tiktok
          </Link>
          <Link
            href="https://www.threads.com/@iels_co"
            className="hover:underline transition-all duration-200 text-sm lg:text-base"
            target="_blank"
          >
            Threads
          </Link>
          <Link
            href="https://x.com/ielsforall"
            className="hover:underline transition-all duration-200 text-sm lg:text-base"
            target="_blank"
          >
            X
          </Link>
        </div>
      </div>

      {/* About IELS Section */}
      <div className="flex flex-col lg:w-[25%] gap-4 lg:gap-6 text-center lg:text-left">
        <div>
          <p className="font-bold text-lg lg:text-base">About IELS:</p>
        </div>
        <div className="flex flex-col gap-2 lg:gap-3">
          <Link
            href="/about"
            className="hover:underline transition-all duration-200 text-sm lg:text-base"
          >
            About us
          </Link>
          <Link
            href="/stories"
            className="hover:underline transition-all duration-200 text-sm lg:text-base"
          >
            Our Stories
          </Link>
          <Link
            href="/events"
            className="hover:underline transition-all duration-200 text-sm lg:text-base"
          >
            Events & Programs
          </Link>
          <Link
            href="#"
            className="hover:underline transition-all duration-200 text-sm lg:text-base"
          >
            Career in IELS
          </Link>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col lg:w-[25%] gap-4 lg:gap-6 text-center lg:text-left">
        <div>
          <p className="font-bold text-lg lg:text-base">Our Contact:</p>
        </div>
        <div className="flex flex-col gap-3 lg:gap-3">
          <p className="text-sm lg:text-base">
            WhatsApp:{" "}
            <Link
              href="https://wa.me/6285770024261"
              className="underline hover:opacity-70 transition-opacity break-all"
              target="_blank"
            >
              085770024261
            </Link>
          </p>
          <p className="text-sm lg:text-base">
            Gmail:{" "}
            <Link
              href="mailto:hello@iels.com"
              className="underline hover:opacity-70 transition-opacity break-all"
            >
              hello@iels.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
