import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex flex-col w-full mb-12">
        <div className="px-[125px] flex flex-col w-full gap-[100px] -mt-[120px] h-full bg-[url(/images/contents/general/indonesia_map.png)] bg-no-repeat bg-cover">
          <div className="w-full flex pt-[200px]">
            <div className="w-[25%]"></div>
            <div className="w-[50%] flex justify-center">
              <div className="text-[52px] text-white font-thin flex flex-col -space-y-6">
                <p>
                  From <span className="font-bold">Local Roots</span>
                </p>
                <p>
                  To{" "}
                  <span className="font-bold text-[#E56668]">Global Goals</span>
                </p>
              </div>
            </div>
            <div className="w-[25%] text-white text-[15px] mt-auto mb-4">
              <p className="w-[85%]">
                IELS bridges the gap between education and opportunity, starting
                with you.
              </p>
            </div>
          </div>
          <div className="flex w-full h-[350px]">
            <div className="flex flex-col w-[20%]">
              <div className="flex h-full bg-[#1A2534] rounded-[20px]">

              </div>
              <div className="h-full bg-[#E56668] rounded-[20px] flex items-center justify-center">
                <Image
                  src="/images/contents/general/laptop.png"
                  alt="Chat Icon"
                  width={99}
                  height={99}
                />
              </div>
            </div>
            <div className="bg-[url('/images/contents/general/landing_page_1.png')] rounded-[20px] w-[35%] bg-cover"></div>
            <div className="flex flex-col w-[15%]">
              <div className="bg-[#E56668] rounded-[20px] h-full flex items-center justify-center">
                <Image
                  src="/images/contents/general/pencil.png"
                  alt="Chat Icon"
                  width={90}
                  height={90}
                />
              </div>
              <div className="bg-[#1A2534] rounded-[20px] h-full flex items-center justify-center">
                <Image
                  src="/images/contents/general/speaking.png"
                  alt="Chat Icon"
                  width={90}
                  height={90}
                />
              </div>
            </div>
            <div className="flex flex-col w-[15%]">
              <div className="bg-[#D3D3D3] rounded-[20px] h-full flex items-center justify-center">
                <Image
                  src="/images/contents/general/globe.png"
                  alt="Chat Icon"
                  width={90}
                  height={90}
                />
              </div>
              <div className="bg-[#FFFFFF] rounded-[20px] h-full flex items-center justify-center">
                <Image
                  src="/images/contents/general/chat.png"
                  alt="Chat Icon"
                  width={90}
                  height={90}
                />
              </div>
            </div>
            <div className="rounded-[20px] w-[20%] bg-[#1A2534] text-white px-12 items-center justify-start flex">
              <p>Join a growing community where English meets <br /> purpose.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
