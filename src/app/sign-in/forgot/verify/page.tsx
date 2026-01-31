import { Suspense } from "react";
import VerifyOtpForgotClient from "./verify-client";
import { Loader2 } from "lucide-react";

export default function VerifyForgotPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <VerifyOtpForgotClient />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F8FA] space-y-4">
      <Loader2 className="animate-spin text-[#E56668]" size={40} />
      <p className="text-gray-500 font-medium animate-pulse">Verifying security...</p>
    </div>
  );
}