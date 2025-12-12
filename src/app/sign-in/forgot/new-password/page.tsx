import { Suspense } from "react";
import NewPasswordClient from "./new-password-client";

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NewPasswordClient />
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