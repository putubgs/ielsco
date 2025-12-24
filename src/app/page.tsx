"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import CountUp from "react-countup";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <>
      <Header />
<div className="flex flex-col w-full gap-[50px] lg:gap-[100px] bg-white">
  {/* Hero Section */}
<div
  className="
      relative
      px-4 sm:px-8 lg:px-[100px]
      flex flex-col lg:flex-row
      items-center justify-center
      w-full
      gap-8 lg:gap-16
      pt-16 sm:pt-26 lg:pt-30
      pb-20 lg:pb-28
      bg-[url(/images/contents/general/indonesia_map.png)]
      bg-no-repeat bg-cover bg-center
      overflow-hidden
    "
>
  {/* === Mascot (Top on Mobile, Left on Desktop) === */}
  <div className="order-1 lg:order-none flex justify-center items-center w-full lg:w-1/2 z-10 mt-[-10px] sm:mt-0 lg:mt-0">
    <Image
      src="/images/contents/general/Hi!.svg"
      alt="IELS Mascot"
      width={500}
      height={500}
      className="w-[320px] sm:w-[450px] md:w-[500px] lg:w-[700px] h-auto object-contain mx-auto"
    />
  </div>

    {/* === Text Section === */}
    <div className="order-2 lg:order-none flex flex-col justify-center items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 space-y-6 py-12 lg:py-0 z-10">
      {/* Headline */}
      <div className="text-[28px] sm:text-[36px] lg:text-[52px] text-[#2F4157] font-light leading-tight">
        <p>
          <span className="font-extrabold">A fun, structured, and </span>
        </p>
        <p>
          <span className="font-extrabold text-[#E56668]">
            global way to learn English.
          </span>
        </p>
      </div>

      {/* Subtitle */}
      <p className="text-base sm:text-lg lg:text-xl text-[#2F4157]/80 max-w-2xl leading-relaxed">
        At IELS, you don&apos;t just study grammar — you join a vibrant community
        that helps you <strong>learn, speak, and grow</strong> toward your global goals.
      </p>

          {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          
          {/* Start Now */}
          <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]">
          <Link
            href="/welcome/start"
            >
           Start Now 🚀
          </Link>
          </Button>

          {/* Already have an account */}
          <Button asChild className="bg-[#294154] text-white font-semibold px-6 py-3 hover:bg-[#21363f]">
          <Link
            href="/sign-in" 
          >
            I have an account
          </Link>
          </Button>

        </div>
    </div>

    {/* optional: subtle background overlay for clarity */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white/10 lg:to-transparent"></div>
  </div>



          {/* Image Grid */}
          <div className="flex flex-col w-full gap-[50px] lg:gap-[100px] bg-white">
        {/* Hero Section */}
        <div className="px-4 sm:px-8 lg:px-[100px] flex flex-col w-full gap-[10px] lg:gap-[20px] -mt-[60px] lg:-mt-[120px] h-full bg-[url(/images/contents/general/indonesia_map.png)] bg-no-repeat bg-cover bg-center">
 

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
              <div className="h-[120px] bg-[#E56668] rounded-[15px] flex items-center justify-center">
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
                <div className="h-full bg-[#2F4157] rounded-[20px] flex items-center justify-center">
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
                <div className="bg-[#2F4157] rounded-[20px] h-full flex items-center justify-center">
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
                <div className="bg-[#E56668] rounded-[20px] h-full flex items-center justify-center">
                  <Image
                    src="/images/contents/general/chat.png"
                    alt="Chat"
                    width={90}
                    height={90}
                  />
                </div>
              </div>

              <div className="rounded-[20px] w-[20%] bg-[#2F4157] text-white px-12 items-center justify-center flex">
                <p className="text-left">
                  Join a growing community where English meets purpose.
                </p>
              </div>
            </div></div></div>
        </div>
        {/* Stats and CTA Section */}
        <div className="flex flex-col px-4 sm:px-8 lg:px-[100px]">
          <div className="bg-[#2F4157] flex flex-col lg:flex-row rounded-t-[30px] px-6 sm:px-8 lg:px-12 py-[40px] lg:py-[60px] w-full gap-8 lg:gap-12">
            <div className="flex w-full items-center gap-4 h-full justify-center">
              <div className="text-white text-[24px] lg:text-[32px] items-center justify-center flex flex-col -space-y-2 lg:-space-y-3">
                <p className="font-bold text-[36px] md:text-[48px]">
                  <CountUp end={2000} duration={2.5} separator="," enableScrollSpy />+
                </p>
                <p className="text-[24px] lg:text-[32px]">MEMBERS</p>
              </div>
            </div>
            <div className="flex flex-col w-full items-center gap-4">
              <div className="text-white flex text-[24px] lg:text-[32px] items-center flex gap-4">
                <p className="font-bold text-[36px] md:text-[48px]">
                  <CountUp end={100} duration={2.5} enableScrollSpy />+
                </p>
                <p className="text-white text-[20px] md:text-[28px] leading-tight">
                  WINNING <br /> STORIES
                </p>
              </div>
              <p className="text-white text-[14px] lg:text-[18px] text-center leading-tight">
                member stories of national <br /> & international achievements
              </p>
            </div>
            <div className="flex flex-col w-full items-center gap-4">
              <div className="text-white flex text-[24px] lg:text-[32px] items-center flex gap-4">
                <p className="font-bold text-[36px] md:text-[48px]">
                  <CountUp end={25} duration={2.5} enableScrollSpy />+
                </p>
                <p className="text-white text-[20px] md:text-[28px] leading-tight">
                  GLOBAL <br /> CAREERS
                </p>
              </div>
              <p className="text-white text-[14px] lg:text-[18px] text-center leading-tight">
                member stories of remote <br /> work & internships abroad
              </p>
            </div>
            <div className="flex flex-col w-full items-center gap-4">
              <div className="text-white flex text-[24px] lg:text-[32px] items-center flex gap-4">
                <p className="font-bold text-[36px] md:text-[48px]">
                  <CountUp end={13} duration={2.5} enableScrollSpy />+
                </p>
                <p className="text-white text-[20px] md:text-[28px] leading-tight">
                  STUDY <br /> ABROAD
                </p>
              </div>
              <p className="text-white text-[14px] lg:text-[18px] text-center leading-tight">
                member stories of <br /> international study journeys
              </p>
            </div>
    
          </div>
 <div className="relative w-full mt-auto rounded-b-[30px] overflow-hidden">
  {/* Background + Overlay */}
  <div className="relative bg-[url(/images/contents/general/landing_page_2.png)] bg-cover bg-center h-[350px] lg:h-[500px] flex flex-col items-center lg:items-start justify-center gap-6 px-8 sm:px-16 lg:px-[200px] text-white">
    {/* ✅ overlay yang aman di semua viewport */}
    <div className="absolute inset-0 bg-black/40 lg:bg-transparent"></div>

    {/* ✅ konten di atas overlay */}
    <div className="relative z-10 text-center lg:text-left">
      <p className="text-[21px] sm:text-[25px] lg:text-[28px] font-extrabold leading-tight mb-4">
        Create your own story of
        <br />
        global success with IELS!
      </p>
      <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]">
      <Link
        href="/stories"
      >
        Discover More Member Stories
      </Link>
      </Button>
    </div>
  </div>
</div>
</div>
{/* IELS Lounge Section (FINAL FIXED VERSION) */}
<div className="w-full overflow-hidden px-4 sm:px-8 lg:px-[100px]">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 py-16">

    {/* Left Text (Title) */}
    <div className="text-center lg:text-right w-full lg:w-1/3">
      <h2 className="text-[32px] sm:text-[40px] lg:text-[52px] font-extrabold text-[#2F4157] leading-tight">
        IELS <br />
        <span className="font-bold">Lounge</span>
      </h2>

      {/* Desktop Button */}
      <div className="hidden lg:block mt-6">
         <br/>
        <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]">
       <Link
          href="/iels-lounge"
          >
          Join the Community
        </Link>
        </Button>
      </div>
    </div>

    {/* Middle Image */}
    <div className="flex justify-center w-full lg:w-1/3">
      <Image
        src="/images/contents/general/landing_page_3.png"
        alt="IELS Lounge"
        width={400}
        height={400}
        className="w-[80%] sm:w-[300px] lg:w-[350px] h-auto object-contain"
      />
    </div>

    {/* Right Text + Mobile Button */}
    <div className="text-center lg:text-left w-full lg:w-1/3 flex flex-col gap-5">
      <p className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold leading-tight text-[#2F4157]">
        We speak English Every Night!
      </p>
      <p className="text-[14px] sm:text-[16px] text-[#2F4157]/80 leading-relaxed">
        Join IELS Lounge, a supportive community where you practice English in real conversations, build confidence, and unlock opportunities.
        <br /><br />
        Start with small daily habits, speak without fear of mistakes, and learn together — here, no one dominates; everyone grows side by side.
      </p>

      {/* Mobile Button */}
      <div className="block lg:hidden mt-4">
        <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]">
          <Link
          href="/iels-lounge"
      
        >
          Join the Community
        </Link></Button>
      </div>
    </div>
  </div>
</div>
 {/* ===== IELS English Test ===== */}
<section className="py-4 px-6 sm:px-10 lg:px-[100px]">
  <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
    <div className="flex-1 text-center lg:text-left">
      <h2 className="text-[28px] sm:text-[36px] lg:text-[52px] font-extrabold mb-4">
        IELS <span className="text-[#E56668]">English Test</span> 
      </h2>
      <p className="text-80 text-lg mb-6">
        Hey IELScout! Ever wondered how ready your English really is for the world?  
        The <strong className="text-[#E56668]">IELS English Test</strong> helps you measure your real communication skills, not just grammar — so you know exactly where to grow.
      </p>
      <p className="text-sm italic text-60 mb-8">
        Coming soon: online test dashboard & score insights.
      </p>
      <br/><Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]"><Link
        href="/test"
    
      >
        Take the Test
      </Link></Button>
    </div>
    <div className="flex-1 flex justify-center">
      <img
        src="/images/contents/general/ielstest.svg"
        alt="IELS English Test"
        className="w-[440px] sm:w-[500px] lg:w-[600px] h-auto object-contain mx-auto"
      />
    </div>
  </div>
</section>

{/* ===== IELS for Schools ===== */}
<section className="py-4 px-5 sm:px-10 lg:px-[100px]">
  <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
    <div className="flex-1 flex justify-center">
      <img
        src="/images/contents/general/ielsschool.svg"
        alt="IELS for Schools"
        className="w-[440px] sm:w-[500px] lg:w-[600px] h-auto object-contain mx-auto"
      />
    </div>
    <div className="flex-1 text-center lg:text-left">
      <h2 className="text-[28px] sm:text-[36px] lg:text-[52px] font-extrabold mb-4">
        IELS for Schools <span className="text-[#E56668]"></span>
      </h2>
      <p className="text-80 text-lg mb-6">
        Hi, teachers! Let’s bring global English learning right into your classrooms.  
        <strong className="text-[#E56668]"> IELS for Schools</strong> is a year-long structured program packed with challenges, mentorship, and cultural immersion designed for real student growth.
      </p>
      <br/><Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]"><Link
        href="/products/schools"
      >
        Explore the Program
      </Link></Button>
    </div>
  </div>
</section>

{/* ===== IELS Events ===== */}
<section className="py-4 px-6 sm:px-10 lg:px-[100px]">
  <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
    <div className="flex-1 text-center lg:text-left">
      <h2 className="text-[28px] sm:text-[36px] lg:text-[52px] font-extrabold mb-4">
        Join <span className="text-[#E56668]">Global Learning</span> Experiences 
      </h2>
      <p className="text-80 text-lg mb-6">
        Step out of the textbook — and into real conversations.  
        <strong className="text-[#E56668]"> IELS Events</strong> let you join speaking clubs, bootcamps, and workshops guided by global mentors.  
        Learn English by living it.
      </p>
      <br/><Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]">
      <Link
        href="/events"
      >
        See What&apos;s On
      <br/></Link></Button>
    </div>
    <div className="flex-1 flex justify-center">
      <img
        src="/images/contents/general/ielsevents.svg"
        alt="IELS Events"
        className="w-[440px] sm:w-[500px] lg:w-[600px] h-auto object-contain mx-auto"
      />
    </div>
  </div>
</section>

{/* ===== Free Resources ===== */}
<section className="py-4 px-6 sm:px-10 lg:px-[100px]">
  <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
    <div className="flex-1 flex justify-center">
      <img
        src="/images/contents/general/ielsresources.svg"
        alt="Free Resources"
        className="w-[440px] sm:w-[500px] lg:w-[600px] h-auto object-contain mx-auto"
      />
    </div>
    <div className="flex-1 text-center lg:text-left">
      <h2 className="text-[28px] sm:text-[36px] lg:text-[52px] font-extrabold mb-4">
        Learn Anytime, 
       <p> Anywhere — <span className="text-[#E56668]">for Free</span>
        
        </p>
      </h2>
      <p className="text-80 text-lg mb-6">
        Access <strong className="text-[#E56668]">IELS Free Resources</strong> — e-books, grammar guides, and study materials built for curious learners like you.  
        Learn anywhere, anytime, at your own pace.
      </p>
      <br/><Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]"><Link
        href="/products/resources"
      >
        Access Library
      </Link></Button>
    </div>
  </div>
</section>

{/* ===== Partner with IELS ===== */}
<section className="py-4 px-6 sm:px-10 lg:px-[100px]">
  <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
    <div className="flex-1 text-center lg:text-left">
      <h2 className="text-[28px] sm:text-[36px] lg:text-[52px] font-extrabold mb-4">
        <span className="text-[#E56668]">Partners </span> with Us 
      </h2>
      <p className="text-80 text-lg mb-6">
        Whether you’re a school, company, or organization — let’s work together  
        to make English education more accessible and meaningful.  
        <strong className="text-[#E56668]"> Partner with IELS</strong> to co-create programs, support learners, and shape the future of education.
      </p>
      <br/><Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]"><Link
        href="/partners"
      >
        Become a Partner
      </Link></Button>
    </div>
    <div className="flex-1 flex justify-center">
      <img
        src="/images/contents/general/ielspartner.svg"
        alt="Partner with IELS"
        className="w-[440px] sm:w-[500px] lg:w-[600px] h-auto object-contain mx-auto"
      />
    </div>
  </div>
</section>
{/* Final CTA Section with Transition Banner */}
<section className="w-full bg-white text-center text-[#1A2534] pt-5 pb-0 px-5 sm:px-5 lg:px-[100px] overflow-hidden">
  <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-6">
    <h2 className="text-[36px] sm:text-[48px] lg:text-[64px] font-extrabold leading-tight">
      Learn English <br/> With <span className="text-[#E56668]">IELS!</span>
    </h2>
    <Button asChild className="bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]"><Link
      href="/welcome/start"
    >
      Start Now 
    </Link>
    </Button>
  </div>
</section>
 
{/* 🌊 Responsive Footer Wave Section */}
<div className="relative w-full overflow-hidden">
  {/* Wave container: tinggi menyesuaikan device */}
  <div className="w-full h-[220px] sm:h-[280px] md:h-[350px] lg:h-[350px] relative">
    <img
      src="/images/contents/general/footer_wave.svg"
      alt="Footer Wave"
      className="absolute left-1/2 top-0 -translate-x-1/2 w-[160%] sm:w-[140%] md:w-screen h-full object-cover pointer-events-none select-none"
    />
  </div>
</div>
        </div>
      <Footer />

    </>
  );
}
