import { Suspense } from "react";
import NewPasswordClient from "./new-password-client";
import { Loader2, Lock } from "lucide-react";

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <NewPasswordClient />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F8FA] px-4 py-10 font-sans">
      <div className="w-full max-w-md">
        
        {/* Skeleton Card yang proporsional dengan form aslinya */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#EAEAEA] flex flex-col space-y-8 min-h-[480px]">
          
          {/* Header Skeleton */}
          <div className="text-center space-y-4 flex flex-col items-center">
            {/* Animated Icon Placeholder */}
            <div className="relative flex items-center justify-center mb-2">
              <div className="w-16 h-16 bg-[#F0F4F8] rounded-full animate-pulse absolute"></div>
              <Lock className="text-[#294154]/10 absolute" size={28} />
              <Loader2 className="animate-spin text-[#E56668] relative z-10" size={36} strokeWidth={2.5} />
            </div>
            
            {/* Title & Subtitle Mocks */}
            <div className="h-7 w-56 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="space-y-2 flex flex-col items-center w-full mt-2">
              <div className="h-3 w-4/5 bg-gray-100 rounded-full animate-pulse"></div>
              <div className="h-3 w-3/5 bg-gray-100 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Form Skeletons */}
          <div className="space-y-6 pt-4 border-t border-gray-50">
            {/* Input Field Skeleton */}
            <div className="space-y-3">
              <div className="h-4 w-32 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-[52px] w-full bg-gray-100 rounded-xl animate-pulse"></div>
              <div className="h-3 w-48 bg-gray-100 rounded-full animate-pulse"></div>
            </div>

            {/* Submit Button Skeleton */}
            <div className="h-[52px] w-full bg-gray-200 rounded-full animate-pulse"></div>
          </div>

          {/* Footer Back Link Skeleton */}
          <div className="flex justify-center pt-2">
            <div className="h-3 w-24 bg-gray-100 rounded-full animate-pulse"></div>
          </div>

        </div>
      </div>
    </div>
  );
}