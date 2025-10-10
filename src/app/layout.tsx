import type { Metadata } from "next";
import { Inter, Geologica } from "next/font/google";
import "./globals.css";

// Import komponen Header 
import Header from "@/components/header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IELS | English Community",
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

        <main className="pt-32">{children}</main>
      </body>
    </html>
  );
}
