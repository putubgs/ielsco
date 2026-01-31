import { Suspense } from "react";
import NewPasswordClient from "./new-password-client";
import { Loader2 } from "lucide-react";

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <NewPasswordClient />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F8FA] space-y-4">
      <Loader2 className="animate-spin text-[#E56668]" size={40} />
      <p className="text-gray-500 font-medium animate-pulse">Loading secure page...</p>
    </div>
  );
}