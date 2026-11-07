import type { NextConfig } from "next";


const nextConfig: NextConfig = {
    // Tambahkan blok ini:
env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://hkubzamchahvdpvojepc.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrdWJ6YW1jaGFodmRwdm9qZXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0ODQ0MjMsImV4cCI6MjA4MTA2MDQyM30.6CZZRCuV6jkFZ_dYq2gpHlDqX2n7Pcm_jxyMCjx_G4I",
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