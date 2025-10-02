import type { Metadata } from "next";
import { Inter, Geologica } from "next/font/google";
import "./globals.css";

// Import komponen Header (dan Footer kalau ada)
import Header from "@/components/header";
// import Footer from "./Footer"; // optional

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IELS (Inclusive English Learning Space)",
  description:
    "Empowering youths for global success through a supportive community and mentorship. Join our Community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geologica.variable} ${inter.variable} antialiased bg-[#2F4157] font-inter`}
      >
        {/* Global Header */}
        <Header />

        {/* Wrapper untuk konten halaman */}
        <main className="pt-32">{children}</main>

        {/* Global Footer (opsional) */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
