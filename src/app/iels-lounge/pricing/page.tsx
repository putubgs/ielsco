import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function IelsLounge() {
  return (
    <div>
      <Header />
      <div className="flex w-full px-4 sm:px-8 lg:px-[100px] pb-[70px]">
        <div className="flex flex-col gap-8 lg:gap-12 bg-white rounded-[20px] lg:rounded-[30px] w-full px-4 sm:px-6 lg:px-[75px] py-6 sm:py-8 lg:py-[50px]">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-12">
            <div className="w-full lg:w-1/4 text-center lg:text-end text-[28px] sm:text-[36px] lg:text-[52px] flex flex-col -space-y-1 sm:-space-y-2 lg:-space-y-6">
              <p>IELS</p>
              <p className="font-bold">Lounge</p>
            </div>
            <div className="w-full lg:w-3/4 text-[14px] sm:text-[15px] flex flex-col gap-3">
              <p>
                IELS Lounge is your daily English practice space—a safe and
                friendly community where you can speak, make mistakes, and grow
                without pressure. Here, every night is an opportunity to
                practice, connect, and build confidence alongside people who are
                learning just like you.
              </p>
              <p>
                Whether you want to start with small conversations or dive
                deeper into challenges, IELS Lounge gives you the space to
                practice English, ask questions, and feel supported—so you can
                finally overcome the struggles you&apos;ve faced while learning
                English and make progress every day.
              </p>
            </div>
          </div>
          {/* Main Content Section */}
          <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-12">
            {/* Image Section - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:flex w-1/4 flex-col justify-center pt-[100px]">
              <Image
                src="/images/contents/general/iels_lounge.png"
                alt="Iels Lounge"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
              />
            </div>

            {/* Comparison Table */}
            <div className="flex w-full lg:w-3/4">
              {/* Desktop Table */}
              <table className="hidden lg:table w-full items-center">
                <thead></thead>
                <tr
                className="flex items-center justify-between w-full py-4 text-[24px] text-[#2F4157]">
                  <th className="flex-[1.5] text-center font-medium">
                    <p className="text-shadow-md">Benefits &</p>
                    <p className="text-shadow-md">Features</p>
                  </th>
                  <th className="flex-1 text-center font-medium text-[#6F7680]">
                    <p className="font-bold text-shadow-md">IELS Lounge</p>
                    <p className="text-shadow-md">Free</p>
                  </th>
                  <th className="flex-1 text-center font-medium">
                    <p className="font-bold text-shadow-md">IELS Lounge</p>
                    <p className="text-shadow-md">Premium</p>
                  </th>
                  <th className="flex-1 text-center font-medium">
                    <p className="font-bold text-shadow-md">IELS Lounge</p>
                    <p className="text-shadow-md">Exclusive</p>
                  </th>
                </tr>
                <tr className="flex items-center justify-between w-full bg-[#D9D9D9] rounded-l-[20px] text-[15px] rounded-tr-[20px]">
                  <tr className="flex-[1.5] text-center">
                    <td className="pl-5">
                      <div className="bg-[#2F4157] rounded-[11px] p-2 w-[50px] h-[50px]">
                        <Image
                          src="/images/contents/general/white_discord_icon.png"
                          alt="Iels Lounge Free"
                          width={100}
                          height={0}
                          className="w-[60px] h-auto"
                        />
                      </div>
                    </td>
                    <td className="pl-4">
                      <p className="text-start">
                        Access to all community events
                      </p>
                    </td>
                  </tr>
                  <td className="flex-1 flex justify-center items-center bg-[#BBBEC2] py-4">
                    <Image
                      src="/images/contents/general/blue_tick_icon.png"
                      alt="Iels Lounge Free"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#C1C6CD] py-4">
                    <Image
                      src="/images/contents/general/blue_tick_icon.png"
                      alt="Iels Lounge Premium"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#9CA3AF] py-4 rounded-tr-[20px]">
                    <Image
                      src="/images/contents/general/blue_tick_icon.png"
                      alt="Iels Lounge Exclusive"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                </tr>
                <tr className="flex items-center justify-between w-full bg-[#D9D9D9] rounded-l-[20px] text-[15px]">
                  <tr className="flex-[1.5] text-center">
                    <td className="pl-5">
                      <div className="bg-[#2F4157] rounded-[11px] p-2 w-[50px] h-[50px] flex justify-center items-center">
                        <Image
                          src="/images/contents/general/white_discord_icon.png"
                          alt="Iels Lounge Free"
                          width={100}
                          height={0}
                          className="w-[60px] h-auto"
                        />
                      </div>
                    </td>
                    <td className="pl-4">
                      <p className="text-start">Daily Nightly Speaking Club</p>
                    </td>
                  </tr>
                  <td className="flex-1 flex justify-center items-center bg-[#6F7680] py-4">
                    <Image
                      src="/images/contents/general/red_cross_icon.png"
                      alt="Iels Lounge Free"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#7C8896] py-4">
                    <Image
                      src="/images/contents/general/blue_tick_icon.png"
                      alt="Iels Lounge Premium"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#6B7280] py-4">
                    <Image
                      src="/images/contents/general/blue_tick_icon.png"
                      alt="Iels Lounge Exclusive"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                </tr>
                <tr className="flex items-center justify-between w-full bg-[#D9D9D9] rounded-l-[20px] text-[15px]">
                  <tr className="flex-[1.5] text-center">
                    <td className="pl-5">
                      <div className="bg-[#2F4157] rounded-[11px] p-2 w-[50px] h-[50px] flex justify-center items-center">
                        <Image
                          src="/images/contents/general/white_recording_icon.png"
                          alt="Iels Lounge Free"
                          width={100}
                          height={0}
                          className="w-[60px] h-auto"
                        />
                      </div>
                    </td>
                    <td className="pl-4">
                      <p className="text-start">2x Zoom Classes every month</p>
                    </td>
                  </tr>
                  <td className="flex-1 flex justify-center items-center bg-[#BBBEC2] py-4">
                    <Image
                      src="/images/contents/general/red_cross_icon.png"
                      alt="Iels Lounge Free"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#C1C6CD] py-4">
                    <Image
                      src="/images/contents/general/blue_tick_icon.png"
                      alt="Iels Lounge Premium"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#9CA3AF] py-4">
                    <Image
                      src="/images/contents/general/blue_tick_icon.png"
                      alt="Iels Lounge Exclusive"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                </tr>
                <tr className="flex items-center justify-between w-full bg-[#D9D9D9] rounded-l-[20px] text-[15px]">
                  <tr className="flex-[1.5] text-center">
                    <td className="pl-5">
                      <div className="bg-[#2F4157] rounded-[11px] p-2 w-[50px] h-[50px]">
                        <Image
                          src="/images/contents/general/white_discord_icon.png"
                          alt="Iels Lounge Free"
                          width={100}
                          height={0}
                          className="w-[60px] h-auto"
                        />
                      </div>
                    </td>
                    <td className="pl-4">
                      <p className="text-start">
                        Premium-only Discord & WhatsApp channels
                      </p>
                    </td>
                  </tr>
                  <td className="flex-1 flex justify-center items-center bg-[#6F7680] py-4">
                    <Image
                      src="/images/contents/general/red_cross_icon.png"
                      alt="Iels Lounge Free"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#7C8896] py-4">
                    <Image
                      src="/images/contents/general/blue_tick_icon.png"
                      alt="Iels Lounge Premium"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#6B7280] py-4">
                    <Image
                      src="/images/contents/general/blue_tick_icon.png"
                      alt="Iels Lounge Exclusive"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                </tr>
                <tr className="flex items-center justify-between w-full bg-[#D9D9D9] rounded-l-[20px] text-[15px]">
                  <tr className="flex-[1.5] text-center">
                    <td className="pl-5">
                      <div className="bg-[#2F4157] rounded-[11px] p-2 w-[50px] h-[50px]">
                        <Image
                          src="/images/contents/general/white_globe_icon.png"
                          alt="Iels Lounge Free"
                          width={100}
                          height={0}
                          className="w-[60px] h-auto"
                        />
                      </div>
                    </td>
                    <td className="pl-4">
                      <p className="text-start">
                        Updates from our global industry partners
                      </p>
                    </td>
                  </tr>
                  <td className="flex-1 flex justify-center items-center bg-[#BBBEC2] py-4">
                    <Image
                      src="/images/contents/general/red_cross_icon.png"
                      alt="Iels Lounge Free"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#C1C6CD] py-4">
                    <Image
                      src="/images/contents/general/blue_tick_icon.png"
                      alt="Iels Lounge Premium"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#9CA3AF] py-4">
                    <Image
                      src="/images/contents/general/blue_tick_icon.png"
                      alt="Iels Lounge Exclusive"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                </tr>
                <tr className="flex items-center justify-between w-full bg-[#D9D9D9] rounded-l-[20px] text-[15px]">
                  <tr className="flex-[1.5] text-center">
                    <td className="pl-5">
                      <div className="bg-[#2F4157] rounded-[11px] p-2 w-[50px] h-[50px] flex justify-center items-center">
                        <Image
                          src="/images/logos/iels_white.png"
                          alt="Iels Lounge Free"
                          width={100}
                          height={0}
                          className="w-[60px] h-auto"
                        />
                      </div>
                    </td>
                    <td className="pl-4">
                      <p className="text-start">
                        Early access to IELS program + 10% OFF
                      </p>
                    </td>
                  </tr>
                  <td className="flex-1 flex justify-center items-center bg-[#6F7680] py-4">
                    <Image
                      src="/images/contents/general/red_cross_icon.png"
                      alt="Iels Lounge Free"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#7C8896] py-4">
                    <Image
                      src="/images/contents/general/blue_tick_icon.png"
                      alt="Iels Lounge Premium"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#6B7280] py-4">
                    <Image
                      src="/images/contents/general/blue_tick_icon.png"
                      alt="Iels Lounge Exclusive"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                </tr>
                <tr className="flex items-center justify-between w-full bg-[#D9D9D9] rounded-l-[20px] text-[15px] rounded-br-[20px]">
                  <tr className="flex-[1.5] text-center">
                    <td className="pl-5">
                      <div className="bg-[#2F4157] rounded-[11px] p-2 w-[50px] h-[50px] flex justify-center items-center">
                        <Image
                          src="/images/logos/iels_white.png"
                          alt="Iels Lounge Free"
                          width={100}
                          height={0}
                          className="w-[60px] h-auto"
                        />
                      </div>
                    </td>
                    <td className="pl-4">
                      <p className="text-start">
                        IELS Member ID for faster event access
                      </p>
                    </td>
                  </tr>
                  <td className="flex-1 flex justify-center items-center bg-[#BBBEC2] py-4">
                    <Image
                      src="/images/contents/general/red_cross_icon.png"
                      alt="Iels Lounge Free"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#C1C6CD] py-4">
                    <Image
                      src="/images/contents/general/blue_tick_icon.png"
                      alt="Iels Lounge Premium"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#9CA3AF] py-4">
                    <Image
                      src="/images/contents/general/blue_tick_icon.png"
                      alt="Iels Lounge Exclusive"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                </tr>
                <tr className="flex items-center justify-between w-full bg-[#D9D9D9] rounded-l-[20px] text-[15px]">
                  <tr className="flex-[1.5] text-center">
                    <td className="pl-5">
                      <div className="bg-[#2F4157] rounded-[11px] p-2 w-[50px] h-[50px] flex justify-center items-center">
                        <Image
                          src="/images/logos/iels_white.png"
                          alt="Iels Lounge Exclusive"
                          width={100}
                          height={0}
                          className="w-[60px] h-auto"
                        />
                      </div>
                    </td>
                    <td className="pl-4">
                      <p className="text-start font-bold">
                        Lifetime Access to IELS Lounge
                      </p>
                    </td>
                  </tr>
                  <td className="flex-1 flex justify-center items-center bg-[#6F7680] py-4">
                    <Image
                      src="/images/contents/general/red_cross_icon.png"
                      alt="Iels Lounge Free"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#7C8896] py-4">
                    <Image
                      src="/images/contents/general/red_cross_icon.png"
                      alt="Iels Lounge Premium"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#6B7280] py-4">
                    <Image
                      src="/images/contents/general/blue_tick_icon.png"
                      alt="Iels Lounge Exclusive"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                </tr>
                <tr className="flex items-center justify-between w-full bg-[#D9D9D9] rounded-l-[20px] text-[15px] rounded-br-[20px]">
                  <tr className="flex-[1.5] text-center">
                    <td className="pl-5">
                      <div className="bg-[#2F4157] rounded-[11px] p-2 w-[50px] h-[50px] flex justify-center items-center">
                        <Image
                          src="/images/logos/iels_white.png"
                          alt="Iels Lounge Exclusive"
                          width={100}
                          height={0}
                          className="w-[60px] h-auto"
                        />
                      </div>
                    </td>
                    <td className="pl-4">
                      <p className="text-start font-bold">
                        Private Mentoring with Founders
                      </p>
                    </td>
                  </tr>
                  <td className="flex-1 flex justify-center items-center bg-[#BBBEC2] py-4">
                    <Image
                      src="/images/contents/general/red_cross_icon.png"
                      alt="Iels Lounge Free"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#C1C6CD] py-4">
                    <Image
                      src="/images/contents/general/red_cross_icon.png"
                      alt="Iels Lounge Premium"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                  <td className="flex-1 flex justify-center items-center bg-[#9CA3AF] py-4 rounded-br-[20px]">
                    <Image
                      src="/images/contents/general/blue_tick_icon.png"
                      alt="Iels Lounge Exclusive"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[50px] h-auto"
                    />
                  </td>
                </tr>
                <tr className="flex justify-between w-full py-4">
                  <td className="w-full flex-[1.5]"></td>
                  <td className="w-full flex-1 px-2">
                    <Button asChild className="bg-[#6F7680] text-white text-center rounded-[20px] w-full block font-semibold py-3 hover:bg-[#6F7680]/80">
                      <Link
                      href="https://forms.gle/E9KbHVZEmaw8B9nh6"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Free Access
                    </Link></Button>
                  </td>
                  <td className="w-full flex-1 pl-2">
                    <Button asChild className="bg-[#2F4157] text-white text-center rounded-[20px] w-full block font-semibold py-3 hover:bg-[#2F4157]/80">
                    <Link
                      href="https://ielsco.myr.id/membership/iels-lounge-premium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Rp200.000/year
                    </Link></Button>
                     <Button asChild className="bg-[#2F4157] text-white text-center rounded-[20px] w-full block font-semibold py-3 mt-2 hover:bg-[#2F4157]/80">
                     <Link
                      href="https://ielsco.myr.id/membership/iels-lounge-premium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Rp25.000/month
                    </Link></Button>
                  </td>
                  <td className="w-full flex-1 pl-2">
                    <Button asChild className="bg-[#2F4157] text-white text-center rounded-[20px] w-full block font-semibold py-3 hover:bg-[#2F4157]/80">
                    <Link
                      href="https://ielsco.myr.id/membership/iels-lounge-premium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Rp500.000
                    </Link></Button>
                    <p className="text-center text-[12px] text-gray-600 mt-1">
                      Lifetime Access
                    </p>
                  </td>
                </tr>
              </table>

              {/* Mobile Comparison - Clear Offer Structure */}
              <div className="lg:hidden w-full space-y-6">
                {/* Mobile Header */}
                <div className="text-center">
                  <h2 className="text-[24px] font-bold text-[#2F4157] mb-2">
                    Choose Your Plan
                  </h2>
                  <p className="text-[16px] text-[#6F7680]">
                    Select the experience that fits your journey
                  </p>
                </div>

                {/* Free Plan Card */}
                <div className="bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF] rounded-[20px] p-6 border-2 border-[#DEE2E6]">
                  <div className="text-center mb-6">
                    <div className="bg-[#6F7680] rounded-[15px] p-4 w-fit mx-auto mb-4">
                      <Image
                        src="/images/contents/general/white_discord_icon.png"
                        alt="Free Plan"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </div>
                    <h3 className="text-[20px] font-bold text-[#6F7680] mb-2">
                      IELS Lounge Free
                    </h3>
                    <p className="text-[18px] font-bold text-[#6F7680] mb-4">
                      Completely Free
                    </p>
                    <p className="text-[14px] text-[#6F7680] mb-6">
                      Perfect for getting started and exploring our community
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/contents/general/blue_tick_icon.png"
                        alt="Included"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-[14px] text-[#2F4157]">
                        Access to all community events
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/contents/general/red_cross_icon.png"
                        alt="Not included"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-[14px] text-[#9CA3AF]">
                        2x Zoom Classes every month
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/contents/general/red_cross_icon.png"
                        alt="Not included"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-[14px] text-[#9CA3AF]">
                        Premium-only Discord & WhatsApp channels
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/contents/general/red_cross_icon.png"
                        alt="Not included"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-[14px] text-[#9CA3AF]">
                        Updates from global industry partners
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/contents/general/red_cross_icon.png"
                        alt="Not included"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-[14px] text-[#9CA3AF]">
                        Early access to IELS program + 10% OFF
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/contents/general/red_cross_icon.png"
                        alt="Not included"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-[14px] text-[#9CA3AF]">
                        IELS Member ID for faster event access
                      </span>
                    </div>
                  </div>
                  <Button asChild className="bg-[#6F7680] text-white  rounded-[15px] w-full block text-center font-semibold py-3 hover:bg-[#6F7680]/80">
                  <Link
                   
                    href="https://forms.gle/E9KbHVZEmaw8B9nh6"
                    target="_blank"
                  >
                    Get Free Access
                  </Link></Button>
                </div>

                {/* Premium Plan Card */}
                <div className="bg-gradient-to-br from-[#2F4157] to-[#1A252F] rounded-[20px] p-6 border-2 border-[#2F4157] relative">
                  {/* Popular Badge */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#FF6B35] text-white px-4 py-1 rounded-full text-[12px] font-bold">
                      MOST POPULAR
                    </div>
                  </div>

                  <div className="text-center mb-6 mt-4">
                    <div className="bg-white rounded-[15px] h-[64px] p-3 w-fit mx-auto mb-4 flex items-center justify-center">
                      <Image
                        src="/images/logos/iels_blue.png"
                        alt="Premium Plan"
                        width={32}
                        height={32}
                        className="w-10 h-auto"
                      />
                    </div>
                    <h3 className="text-[20px] font-bold text-white mb-2">
                      IELS Lounge Premium
                    </h3>
                    <div className="mb-4">
                      <p className="text-[24px] font-bold text-white">
                        Rp200.000
                      </p>
                      <p className="text-[14px] text-[#B8C5D1]">per year</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-[18px] font-bold text-white">
                        or Rp25.000
                      </p>
                      <p className="text-[14px] text-[#B8C5D1]">per month</p>
                    </div>
                    <p className="text-[14px] text-[#B8C5D1] mb-6">
                      Unlock the full IELS experience with exclusive benefits
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/contents/general/white_tick_icon.png"
                        alt="Included"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-[14px] text-white">
                        Access to all community events
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/contents/general/white_tick_icon.png"
                        alt="Included"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-[14px] text-white">
                        2x Zoom Classes every month
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/contents/general/white_tick_icon.png"
                        alt="Included"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-[14px] text-white">
                        Premium-only Discord & WhatsApp channels
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/contents/general/white_tick_icon.png"
                        alt="Included"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-[14px] text-white">
                        Updates from global industry partners
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/contents/general/white_tick_icon.png"
                        alt="Included"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-[14px] text-white">
                        Early access to IELS program + 10% OFF
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/contents/general/white_tick_icon.png"
                        alt="Included"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-[14px] text-white">
                        IELS Member ID for faster event access
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button asChild className="bg-white text-[#2F4157] rounded-[15px] w-full block text-center py-4 text-[16px] font-bold hover:bg-[#F8F9FA] transition-colors">
                    <Link
                      
                      href="https://ielsco.myr.id/membership/iels-lounge-premium"
                      target="_blank"
                    >
                      Choose Yearly Plan
                    </Link></Button>
                     <Button asChild className="bg-transparent text-white border-2 border-white rounded-[15px] w-full block text-center py-4 text-[16px] font-bold hover:bg-white hover:text-[#2F4157] transition-colors">
                    <Link
   
                      href="https://ielsco.myr.id/membership/iels-lounge-premium"
                      target="_blank"
                    >
                      Choose Monthly Plan
                    </Link></Button>
                  </div>
                </div>

                {/* Exclusive Plan Card */}
                <div className="bg-gradient-to-br from-[#2F4157] to-[#1A252F] rounded-[20px] p-6 border-2 border-[#2F4157] relative">
                  {/* Exclusive Badge */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#ffbf00] text-white px-4 py-1 rounded-full text-[12px] font-bold">
                      EXCLUSIVE
                    </div>
                  </div>

                  <div className="text-center mb-6 mt-4">
                    <div className="bg-white rounded-[15px] h-[64px] p-3 w-fit mx-auto mb-4 flex items-center justify-center">
                      <Image
                        src="/images/logos/iels_blue.png"
                        alt="Exclusive Plan"
                        width={32}
                        height={32}
                        className="w-10 h-auto"
                      />
                    </div>
                    <h3 className="text-[20px] font-bold text-white mb-2">
                      IELS Lounge Exclusive
                    </h3>
                    <div className="mb-4">
                      <p className="text-[24px] font-bold text-white">
                        Rp500.000
                      </p>
                      <p className="text-[14px] text-[#B8C5D1]">
                        Lifetime Access
                      </p>
                    </div>
                    <p className="text-[14px] text-[#B8C5D1] mb-6">
                      The ultimate IELS experience with exclusive lifetime
                      benefits
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/contents/general/white_tick_icon.png"
                        alt="Included"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-[14px] text-white font-bold">
                        Includes All Premium Benefits
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/contents/general/white_tick_icon.png"
                        alt="Included"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-[14px] text-white">
                        Lifetime Access to IELS Lounge
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/contents/general/white_tick_icon.png"
                        alt="Included"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                      <span className="text-[14px] text-white">
                        Private Mentoring with Founders
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button asChild className="bg-white text-[#2F4157] rounded-[15px] w-full block text-center py-4 text-[16px] font-bold hover:bg-[#F8F9FA] transition-colors">
                      <Link

                      href="https://ielsco.myr.id/membership/iels-lounge-premium"
                      target="_blank"
                    >
                      Get Lifetime Access
                    </Link></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
