import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";

export default function Gallery() {
  return (
    <div>
      <Header />
      <div className="flex flex-col bg-white md:py-[75px] md:gap-[125px] py-[30px] gap-[50px]">
        <div className="flex px-4 sm:px-8 lg:px-[100px] rounded-[20px] items-center justify-center">
          <div className="flex flex-col bg-[#D9D9D9] rounded-[20px] w-full flex flex-col px-6 lg:px-12 py-6 pb-12 gap-5">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Image
                src="/images/logos/iels_blue.png"
                alt="IELS Logo Blue"
                width={60}
                height={60}
                className="lg:w-[90px] h-auto"
              />
              <p className="text-[28px] sm:text-[36px] lg:text-[52px] pt-0 lg:pt-6 text-center">
                IELS <span className="font-bold">Global Gateway</span>
              </p>
              <div className="hidden sm:block"></div>
            </div>
            <Image
              src="/images/contents/general/iels_global_gateway.png"
              alt="Global Gateway"
              width={600}
              height={600}
              className="mx-auto"
            />
          </div>
        </div>
        <div className="flex px-4 sm:px-8 lg:px-[100px] rounded-[20px] items-center justify-center">
          <div className="bg-[#D9D9D9] rounded-[20px] w-full flex flex-col px-6 lg:px-12 py-6 pb-12 gap-5">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Image
                src="/images/logos/iels_blue.png"
                alt="IELS Logo Blue"
                width={60}
                height={60}
                className="lg:w-[90px] lg:h-[90px]"
              />
              <p className="text-[28px] sm:text-[36px] lg:text-[52px] pt-0 lg:pt-6 text-center">
                IELS <span className="font-bold">Circle</span>
              </p>
              <div className="hidden sm:block"></div>
            </div>
            <Image
              src="/images/contents/general/iels_circle.png"
              alt="Circle"
              width={600}
              height={600}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
