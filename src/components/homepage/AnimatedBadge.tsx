interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export default function LoadingOverlay({
  isLoading,
  message = "Loading...",
}: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4 shadow-xl">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F4157]"></div>

        {/* Loading Message */}
        <p className="text-[#2F4157] font-medium text-lg">{message}</p>

        {/* Loading Dots Animation */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-[#2F4157] rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-[#2F4157] rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-[#2F4157] rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
