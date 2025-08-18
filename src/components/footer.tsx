import Image from "next/image";
import Link from "next/link";
import { Instagram, X, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <div className="bg-white flex w-full p-12">
      <div className="flex flex-col w-[25%] gap-3">
        <Image
          src="/images/logos/iels_gray.png"
          alt="IELS Logo - Gray"
          width={75}
          height={75}
        />
        <div className="flex gap-3">
          <Link href="#">
            <X style={{ fontSize: 25 }} />
          </Link>
          <Link href="#">
            <Instagram style={{ fontSize: 25 }} />
          </Link>
          <Link href="#">
            <LinkedIn style={{ fontSize: 25 }} />
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-[25%] gap-6">
        <div>
          <p className="font-bold">Follow Us:</p>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="#">Instagram</Link>
          <Link href="#">Threads</Link>
          <Link href="#">Tiktok</Link>
          <Link href="#">X</Link>
          <Link href="#">LinkedIn</Link>
        </div>
      </div>
      <div className="flex flex-col w-[25%] gap-6">
        <div>
          <p className="font-bold">About IELS:</p>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="#" className="">
            About us
          </Link>
          <Link href="#">Blog</Link>
          <Link href="#">Events & Programs</Link>
          <Link href="#">Career in IELS</Link>
        </div>
      </div>
      <div className="flex flex-col w-[25%] gap-6">
        <div>
          <p className="font-bold">Our Contact:</p>
        </div>
        <div className="flex flex-col gap-3">
          <p>
            WhatsApp: <Link href="#" className="underline">0851 9031 2426</Link>
          </p>
          <p>
            Gmail: <Link href="#" className="underline">iels.community@gmail.com</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
