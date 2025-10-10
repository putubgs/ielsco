import Image from "next/image";
import Link from "next/link";
import { Instagram, X, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <footer className="bg-[#2f4157] w-full py-12 px-6 lg:px-[100px] border-t border-[#ffffff20] text-white">
      <div className="flex flex-col lg:flex-row justify-between gap-12">
        
        {/* Left: Logo & Socials */}
        <div className="flex flex-col lg:w-[25%] items-center lg:items-start gap-4">
          <Image
            src="/images/logos/iels_white.png"
            alt="IELS Logo - White"
            width={70}
            height={70}
          />
          <p className="text-sm text-white/80 max-w-[220px] text-center lg:text-left">
            Unlock Global Opportunities with Structured English Community.
          </p>
          <div className="flex gap-4 mt-3">
            <Link href="https://x.com/ielsforall" target="_blank" className="hover:opacity-70 transition">
              <X style={{ fontSize: 24, color: "white" }} />
            </Link>
            <Link href="https://www.instagram.com/iels_co" target="_blank" className="hover:opacity-70 transition">
              <Instagram style={{ fontSize: 24, color: "white" }} />
            </Link>
            <Link href="https://www.linkedin.com/company/iels-co" target="_blank" className="hover:opacity-70 transition">
              <LinkedIn style={{ fontSize: 24, color: "white" }} />
            </Link>
          </div>
        </div>

        {/* About Section */}
        <div className="flex flex-col lg:w-[18%] gap-4">
          <p className="font-bold text-lg text-white">About IELS</p>
          <div className="flex flex-col gap-2 text-white/80">
            {[
              { name: "About Us", url: "/about" },
              { name: "Mission", url: "/about" },
              { name: "Approach", url: "/about" },
              { name: "Partners", url: "/partners" },
              { name: "Careers", url: "/careers" },
              { name: "Testimonials", url: "/testimonials" },
              { name: "Research", url: "/#" },
              { name: "Courses", url: "/#" },
              { name: "IELS Guidelines", url: "/#" },
              { name: "Contact Us", url: "/#" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.url}
                className="hover:underline hover:text-white transition-all duration-200 text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div className="flex flex-col lg:w-[18%] gap-4">
          <p className="font-bold text-lg text-white">Community</p>
          <div className="flex flex-col gap-2 text-white/80">
            {[
              { name: "Member Stories", url: "/stories" },
              { name: "Program Updates", url: "/stories" },
              { name: "Partners Update", url: "/stories" },
              { name: "Speaking Club", url: "/speaking-club" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.url}
                className="hover:underline hover:text-white transition-all duration-200 text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Product Section */}
        <div className="flex flex-col lg:w-[18%] gap-4">
          <p className="font-bold text-lg text-white">Programs & Products</p>
          <div className="flex flex-col gap-2 text-white/80">
            {[
              { name: "IELS Lounge", url: "/iels-lounge" },
              { name: "IELS Insight Series", url: "/events" },
              { name: "IELS for Schools", url: "/iels-schools" },
              { name: "IELS Events", url: "/events" },
              { name: "IELS English Test", url: "/test" },
              { name: "English Students Launchpad", url: "/launchpad" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.url}
                className="hover:underline hover:text-white transition-all duration-200 text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="flex flex-col lg:w-[18%] gap-4">
          <p className="font-bold text-lg text-white">Help & Support</p>
          <div className="flex flex-col gap-3 text-white/80">
            <Link
              href="https://www.instagram.com/iels_co"
              target="_blank"
              className="hover:underline hover:text-white text-sm"
            >
              Social Media
            </Link>
            <Link
              href="https://wa.me/6285770024261"
              target="_blank"
              className="hover:underline hover:text-white text-sm"
            >
              WhatsApp: 085770024261
            </Link>
            <Link
              href="mailto:hello@ielsco.com"
              className="hover:underline hover:text-white text-sm"
            >
              Email: hello@ielsco.com
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-white/60 text-sm mt-12 border-t border-[#ffffff20] pt-6">
        © {new Date().getFullYear()} IELS. All rights reserved.
      </div>
    </footer>
  );
}