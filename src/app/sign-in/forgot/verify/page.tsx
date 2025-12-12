import { Suspense } from "react";
import VerifyOtpForgotClient from "./verify-client";

export default function VerifyForgotPage() {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyOtpForgotClient />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      Loading…
    </div>
  );
}