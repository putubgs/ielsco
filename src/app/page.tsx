"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import CountUp from "react-countup";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex flex-col w-full gap-[50px] lg:gap-[100px]">
        {/* Hero Section */}
        <div className="px-4 sm:px-8 lg:px-[100px] flex flex-col w-full gap-[50px] lg:gap-[100px] -mt-[60px] lg:-mt-[120px] h-full bg-[url(/images/contents/general/indonesia_map.png)] bg-no-repeat bg-cover bg-center">
          <div className="w-full flex pt-[120px] lg:pt-[200px]">
            <div className="hidden lg:block lg:w-[25%]"></div>
            <div className="w-full lg:w-[50%] flex justify-center">
              <div className="text-[28px] sm:text-[36px] lg:text-[52px] text-white font-thin flex flex-col -space-y-2 lg:-space-y-6 text-center lg:text-left">
                <p>
                  From <span className="font-bold">Local Roots</span>
                </p>
                <p>
                  To{" "}
                  <span className="font-bold text-[#E56668]">Global Goals</span>
                </p>
              </div>
            </div>
            <div className="hidden lg:block lg:w-[25%] text-white text-[15px] mt-auto mb-4">
              <p className="w-[85%]">
                IELS bridges the gap between education and opportunity, starting
                with you.
              </p>
            </div>
          </div>

          {/* Mobile tagline */}
          <div className="lg:hidden text-white text-center text-sm px-4">
            <p>
              IELS bridges the gap between education and opportunity, starting
              with you.
            </p>
          </div>

          {/* Image Grid */}
          <div className="flex flex-col lg:flex-row w-full gap-4 h-auto lg:h-[350px]">
            {/* Mobile: 2x3 Grid Layout */}
            <div className="lg:hidden grid grid-cols-2 gap-4 w-full">
              {/* Row 1 */}
              <div className="h-[120px] bg-[#1A2534] rounded-[15px] flex items-center justify-center">
                <Image
                  src="/images/contents/general/welcoming.png"
                  alt="Welcoming"
                  width={120}
                  height={70}
                />
              </div>
              <div className="h-[120px] bg-[#E56668] rounded-[15px] flex items-center justify-center">
                <Image
                  src="/images/contents/general/laptop.png"
                  alt="Laptop"
                  width={60}
                  height={60}
                />
              </div>

              {/* Row 2 - Main Image spans full width */}
              <div className="col-span-2 bg-[url('/images/contents/general/landing_page_1.png')] rounded-[15px] h-[180px] bg-cover bg-center"></div>

              {/* Row 3 */}
              <div className="h-[120px] bg-[#E56668] rounded-[15px] flex items-center justify-center">
                <Image
                  src="/images/contents/general/pencil.png"
                  alt="Pencil"
                  width={60}
                  height={60}
                />
              </div>
              <div className="h-[120px] bg-[#1A2534] rounded-[15px] flex items-center justify-center">
                <Image
                  src="/images/contents/general/speaking.png"
                  alt="Speaking"
                  width={60}
                  height={60}
                />
              </div>

              {/* Row 4 */}
              <div className="h-[120px] bg-[#D3D3D3] rounded-[15px] flex items-center justify-center">
                <Image
                  src="/images/contents/general/globe.png"
                  alt="Globe"
                  width={60}
                  height={60}
                />
              </div>
              <div className="h-[120px] bg-[#FFFFFF] rounded-[15px] flex items-center justify-center">
                <Image
                  src="/images/contents/general/chat.png"
                  alt="Chat"
                  width={60}
                  height={60}
                />
              </div>

              {/* Row 5 - Text section spans full width */}
              <div className="col-span-2 rounded-[15px] bg-[#1A2534] text-white p-6 flex items-center justify-center min-h-[100px]">
                <p className="text-center text-sm leading-tight">
                  Join a growing community where English meets purpose.
                </p>
              </div>
            </div>

            {/* Desktop: Original Layout */}
            <div className="hidden lg:flex lg:flex-row w-full gap-4 h-[350px]">
              <div className="flex flex-col gap-4 w-[20%]">
                <div className="h-full bg-[#1A2534] rounded-[20px] flex items-center justify-center">
                  <Image
                    src="/images/contents/general/welcoming.png"
                    alt="Welcoming"
                    width={165}
                    height={150}
                  />
                </div>
                <div className="h-full bg-[#E56668] rounded-[20px] flex items-center justify-center">
                  <Image
                    src="/images/contents/general/laptop.png"
                    alt="Laptop"
                    width={99}
                    height={99}
                  />
                </div>
              </div>

              <div className="bg-[url('/images/contents/general/landing_page_1.png')] rounded-[20px] w-[35%] bg-cover bg-center"></div>

              <div className="flex flex-col gap-4 w-[15%]">
                <div className="bg-[#E56668] rounded-[20px] h-full flex items-center justify-center">
                  <Image
                    src="/images/contents/general/pencil.png"
                    alt="Pencil"
                    width={90}
                    height={90}
                  />
                </div>
                <div className="bg-[#1A2534] rounded-[20px] h-full flex items-center justify-center">
                  <Image
                    src="/images/contents/general/speaking.png"
                    alt="Speaking"
                    width={90}
                    height={90}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 w-[15%]">
                <div className="bg-[#D3D3D3] rounded-[20px] h-full flex items-center justify-center">
                  <Image
                    src="/images/contents/general/globe.png"
                    alt="Globe"
                    width={90}
                    height={90}
                  />
                </div>
                <div className="bg-[#FFFFFF] rounded-[20px] h-full flex items-center justify-center">
                  <Image
                    src="/images/contents/general/chat.png"
                    alt="Chat"
                    width={90}
                    height={90}
                  />
                </div>
              </div>

              <div className="rounded-[20px] w-[20%] bg-[#1A2534] text-white px-12 items-center justify-center flex">
                <p className="text-left">
                  Join a growing community where English meets purpose.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats and CTA Section */}
        <div className="flex flex-col px-4 sm:px-8 lg:px-[100px]">
          <div className="bg-white flex flex-col lg:flex-row rounded-t-[30px] px-6 sm:px-8 lg:px-12 py-[40px] lg:py-[60px] w-full gap-8 lg:gap-12">
            <div className="flex flex-col w-full items-center gap-4">
              <div className="text-[24px] lg:text-[32px] items-center flex flex-col -space-y-2 lg:-space-y-3">
                <p className="font-bold">
                  <CountUp
                    end={3000}
                    duration={2.5}
                    separator=","
                    enableScrollSpy
                  />
                  +
                </p>
                <p>MEMBERS</p>
              </div>
              <p className="text-[14px] lg:text-[18px] text-center leading-tight">
                Have joined our online programs and workshops.
              </p>
            </div>
            <div className="flex flex-col w-full items-center gap-4">
              <div className="text-[24px] lg:text-[32px] items-center flex flex-col -space-y-2 lg:-space-y-3">
                <p className="font-bold">
                  <CountUp end={92} duration={2.5} enableScrollSpy />%
                </p>
                <p>OF MENTEES</p>
              </div>
              <p className="text-[14px] lg:text-[18px] text-center leading-tight">
                Reported increased confidence in using English for academic and
                professional needs.
              </p>
            </div>
            <div className="flex flex-col w-full items-center gap-4">
              <div className="text-[24px] lg:text-[32px] items-center flex flex-col -space-y-2 lg:-space-y-3">
                <p className="font-bold">
                  <CountUp end={25} duration={2.5} enableScrollSpy />+
                </p>
                <p>MENTORS</p>
              </div>
              <p className="text-[14px] lg:text-[18px] text-center leading-tight">
                From top universities and international institutions.
              </p>
            </div>
          </div>
          <div className="text-white flex flex-col gap-6 px-8 sm:px-16 lg:px-[200px] items-center lg:items-start justify-center pt-[50px] lg:pt-[100px] w-full mt-auto bg-[url(/images/contents/general/landing_page_2.png)] bg-cover bg-center h-[350px] lg:h-[500px] rounded-b-[30px] relative">
            <div className="absolute inset-0 bg-black opacity-40 lg:opacity-0 rounded-b-[30px]"></div>
            <p className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-tight text-center lg:text-left relative z-10">
              Unlock our potential.
              <br />
              Grow with IELS!
            </p>
            <p className="text-[13px] lg:text-[15px] text-center lg:text-left relative z-10">
              Join IELS to learn, connect, and grow together with a community
              that empowers your potential.
            </p>
          </div>
        </div>

        {/* IELS Lounge Section */}
        <div className="flex px-4 sm:px-8 lg:px-[100px] rounded-[20px] items-center justify-center">
          <div className="bg-white rounded-[20px] w-full flex flex-col lg:flex-row py-[30px] lg:py-[40px] items-center justify-center gap-[15px] lg:gap-[20px] px-6 lg:px-[50px]">
            <div className="max-w-[400px] p-6 lg:p-12 flex flex-col text-[36px] lg:text-[52px] leading-tight text-center lg:text-end">
              <p>IELS</p>
              <p className="font-bold">Lounge</p>
            </div>
            <Image
              src="/images/contents/general/landing_page_3.png"
              alt="Iels Lounge"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto max-w-[280px] lg:max-w-[350px]"
            />
            <div className="max-w-[400px] p-6 lg:p-12 flex flex-col gap-6 text-center lg:text-left">
              <p className="text-[24px] lg:text-[32px] font-bold leading-tight">
                You don&apos;t have to grow alone.
              </p>
              <p className="text-[13px] lg:text-[15px]">
                Be part of <span className="font-bold">IELS Lounge</span>, a
                community where future global professionals support and uplift
                each other, while mastering English that works in real life.
              </p>
              <Link
                href=""
                className="bg-[#E56668] text-white rounded-[20px] text-center w-fit px-[40px] lg:px-[60px] py-2 mx-auto lg:mx-0"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="flex px-4 sm:px-8 lg:px-[100px] rounded-[20px] items-center justify-center">
          <div className="bg-[#D9D9D9] rounded-[20px] w-full flex flex-col px-6 lg:px-12 py-6 gap-5">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Image
                src="/images/logos/iels_blue.png"
                alt="IELS Logo Blue"
                width={60}
                height={60}
                className="lg:w-[90px] h-auto"
              />
              <p className="text-[28px] sm:text-[36px] lg:text-[52px] pt-0 lg:pt-6 text-center">
                IELS <span className="font-bold">Testimonial</span>
              </p>
              <div className="hidden sm:block"></div>
            </div>
            <div className="flex flex-col sm:flex-row overflow-x-auto gap-6 lg:gap-12 pb-8 lg:mx-auto">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-2xl p-6 shadow-lg min-w-[280px] sm:max-w-sm flex flex-col flex-shrink-0"
                >
                  <p className="text-gray-800 text-[14px] lg:text-[16px] leading-tight mb-6">
                    IELS taught me that learning English doesn&apos;t have to be
                    stressful. Every session is interactive and insightful. It
                    keeps me motivated to grow and improve.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-[33px] h-[33px] rounded-full bg-[#D9D9D9]"></div>
                    <div className="flex flex-col text-[12px] lg:text-[13px] -space-y-1">
                      <p className="font-bold">Zainufri Aziz</p>
                      <p>Universitas Padjajaran</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Media Partners Section */}
        <div className="bg-[#1A2534] flex flex-col py-[75px] lg:py-[150px] gap-6">
          <div className="flex flex-col lg:flex-row w-full gap-6">
            <div className="hidden lg:flex bg-white rounded-r-[20px] flex-col gap-4 py-8 pr-8 w-[20%]">
              {[...Array(6)].map((_, i) => (
                <hr key={i} className="h-px bg-gray-200 border-0" />
              ))}
            </div>
            <div className="w-full lg:w-[60%] bg-white rounded-[20px] flex items-center justify-center p-4 lg:p-0 min-h-[100px]">
              <Image
                src="/images/logos/media-partners/180-degrees-its.png"
                alt="Media Partner"
                width={150}
                height={80}
                className="lg:w-auto lg:h-auto object-contain"
              />
            </div>
            <div className="hidden lg:flex bg-white rounded-l-[20px] flex-col gap-4 py-8 pl-8 w-[20%]">
              {[...Array(6)].map((_, i) => (
                <hr key={i} className="h-px bg-gray-200 border-0" />
              ))}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-6">
            <div className="hidden lg:block bg-white rounded-r-[20px] w-[20%]"></div>
            <div className="w-full lg:w-[60%] bg-white rounded-[20px] flex items-center justify-center p-4 lg:p-0 min-h-[100px]">
              <Image
                src="/images/logos/media-partners/180-degrees-its.png"
                alt="Media Partner"
                width={150}
                height={80}
                className="lg:w-auto lg:h-auto object-contain"
              />
            </div>
            <div className="hidden lg:flex bg-white rounded-l-[20px] flex-col gap-4 py-8 pl-8 w-[20%]">
              {[...Array(6)].map((_, i) => (
                <hr key={i} className="h-px bg-gray-200 border-0" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
