// sign-in/forgot/verify/page.tsx
import { Suspense } from "react";
import VerifyOtpForgotClient from "./verify-client";
import { Loader2, Shield } from "lucide-react";

export default function VerifyForgotPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <VerifyOtpForgotClient />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F8FA] px-4 py-10 font-sans">
      <div className="w-full max-w-md">
        
        {/* Skeleton Card yang ukurannya mirip dengan form aslinya */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#EAEAEA] flex flex-col items-center justify-center space-y-8 min-h-[450px]">
          
          {/* Animated Icon Placeholder */}
          <div className="relative flex items-center justify-center mb-2">
            <div className="w-20 h-20 bg-[#F0F4F8] rounded-full animate-pulse absolute"></div>
            <Shield className="text-[#294154]/20 absolute" size={32} />
            <Loader2 className="animate-spin text-[#E56668] relative z-10" size={40} strokeWidth={2.5} />
          </div>

          {/* Loading Text */}
          <div className="text-center space-y-3 w-full">
            <h2 className="text-xl font-extrabold text-[#294154]">
              Securing Connection...
            </h2>
            <p className="text-gray-400 text-sm animate-pulse">
              Preparing your verification environment
            </p>
          </div>

          {/* Fake Input & Button Skeletons */}
          <div className="w-full space-y-6 pt-6 border-t border-gray-50">
             <div className="space-y-2 flex flex-col items-center">
               <div className="h-3 w-24 bg-gray-200 rounded-full animate-pulse"></div>
               <div className="h-12 w-full max-w-[200px] bg-gray-100 rounded-xl animate-pulse mt-2"></div>
             </div>
             <div className="h-14 bg-gray-100 rounded-full animate-pulse w-full"></div>
          </div>

        </div>
      </div>
    </div>
  );
}