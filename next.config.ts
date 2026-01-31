import type { NextConfig } from "next";


const nextConfig: NextConfig = {
    // Tambahkan blok ini:
env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Domain spesifik error kamu
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com', // Wildcard biar aman kalau Google ganti server (lh4, lh5, dst)
      },
    ],
  },
};

export default nextConfig;