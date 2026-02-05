import { useState, useEffect } from "react";
import { X, Download, Share2, CheckCircle2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface CertificateViewerProps {
  attemptId: string;
  onClose: () => void;
}

export default function CertificateViewer({ attemptId, onClose }: CertificateViewerProps) {
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState<{
    certificateNumber: string;
    pdfUrl: string;
    verificationCode: string;
    issuedAt: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchCertificate();
  }, [attemptId]);

  const fetchCertificate = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/test/generate-certificate?attemptId=${attemptId}`);
      const data = await response.json();

      if (!response.ok) {
        // Certificate doesn't exist, need to generate
        if (response.status === 404) {
          await generateCertificate();
          return;
        }
        throw new Error(data.error || 'Failed to fetch certificate');
      }

      setCertificate(data.certificate);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load certificate');
    } finally {
      setLoading(false);
    }
  };

  const generateCertificate = async () => {
    try {
      setGenerating(true);
      const response = await fetch('/api/test/generate-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate certificate');
      }

      setCertificate(data.certificate);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate certificate');
    } finally {
      setGenerating(false);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (certificate?.pdfUrl) {
      window.open(certificate.pdfUrl, '_blank');
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'IELS Test Certificate',
      text: `I achieved ${certificate?.certificateNumber} in my IELS test!`,
      url: `https://iels.id/verify/${certificate?.verificationCode}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled share
      }
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard.writeText(shareData.url);
      alert('Certificate verification link copied to clipboard!');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-[#2F4157]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 rounded-t-3xl z-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#2F4157]">
                Your Certificate
              </h3>
              {certificate && (
                <p className="text-sm text-gray-600 mt-1">
                  Certificate No: {certificate.certificateNumber}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading || generating ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-[#E56668] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-semibold">
                {generating ? 'Generating your certificate...' : 'Loading certificate...'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                This may take a few seconds
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <X size={40} className="text-red-600" />
              </div>
              <p className="text-lg font-bold text-gray-800 mb-2">Unable to Load Certificate</p>
              <p className="text-sm text-gray-600 text-center max-w-md">
                {error}
              </p>
              <button
                onClick={fetchCertificate}
                className="mt-4 px-6 py-2 bg-[#E56668] text-white rounded-lg font-semibold hover:bg-[#C04C4E] transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : certificate ? (
            <>
              {/* Certificate Preview */}
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 mb-6">
                <div className="bg-white rounded-xl p-8 text-center">
                  <div className="mb-6">
                    <CheckCircle2 size={64} className="mx-auto text-green-600 mb-4" />
                    <h4 className="text-2xl font-bold text-[#2F4157] mb-2">
                      Certificate Issued Successfully!
                    </h4>
                    <p className="text-gray-600">
                      Congratulations on completing your IELS test!
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <p className="text-xs text-blue-600 font-semibold mb-1">Certificate Number</p>
                      <p className="text-lg font-bold text-blue-900">{certificate.certificateNumber}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl">
                      <p className="text-xs text-purple-600 font-semibold mb-1">Verification Code</p>
                      <p className="text-lg font-bold text-purple-900">{certificate.verificationCode}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-sm text-green-900">
                      <strong>Issued on:</strong> {new Date(certificate.issuedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 py-3 bg-[#E56668] text-white rounded-xl font-bold hover:bg-[#C04C4E] transition-colors shadow-lg"
                >
                  <Download size={20} />
                  Download Certificate
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <Share2 size={20} />
                  Share Certificate
                </button>
              </div>

              {/* Verification Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <ExternalLink size={16} className="text-gray-400" />
                  <span>
                    Verify this certificate at:{' '}
                    <a
                      href={`https://iels.id/verify/${certificate.verificationCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E56668] font-semibold hover:underline"
                    >
                      iels.id/verify/{certificate.verificationCode}
                    </a>
                  </span>
                </p>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}