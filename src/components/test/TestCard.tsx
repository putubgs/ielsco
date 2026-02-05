import { Play, CheckCircle2, Lock, Clock, FileText, TrendingUp } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TestCardProps {
  title: string;
  description: string;
  duration: string;
  sections: number;
  status: 'not_started' | 'in_progress' | 'completed';
  score?: number;
  testType: 'pre-test' | 'post-test';
  isLocked?: boolean;
  lockReason?: string;
  href?: string;
}

export default function TestCard({
  title,
  description,
  duration,
  sections,
  status,
  score,
  testType,
  isLocked = false,
  lockReason,
  href
}: TestCardProps) {
  
  const getStatusBadge = () => {
    if (isLocked) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full">
          <Lock size={12} />
          Locked
        </span>
      );
    }
    
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
            <CheckCircle2 size={12} />
            Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
            <Clock size={12} />
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
            <Play size={12} />
            Ready
          </span>
        );
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8.0) return 'text-green-600';
    if (score >= 7.0) return 'text-blue-600';
    if (score >= 6.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const CardContent = (
    <div className={cn(
      "bg-white rounded-2xl p-6 border shadow-sm h-full relative overflow-hidden transition-all",
      isLocked 
        ? "border-gray-200 opacity-75" 
        : status === 'completed'
        ? "border-green-200 hover:shadow-lg"
        : "border-gray-100 hover:shadow-lg hover:border-[#E56668]/30"
    )}>
      {/* Lock Overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-gray-900/5 backdrop-blur-[1px] z-10 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200 text-center max-w-xs">
            <Lock className="mx-auto text-gray-400 mb-3" size={32} />
            <p className="font-bold text-gray-700 mb-2">Test Locked</p>
            <p className="text-sm text-gray-600">{lockReason}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#2F4157] mb-2">
            {title}
          </h3>
          {getStatusBadge()}
        </div>
        
        {status === 'completed' && score !== undefined && (
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">Overall Score</p>
            <p className={cn("text-3xl font-bold", getScoreColor(score))}>
              {score.toFixed(1)}
            </p>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
        {description}
      </p>

      {/* Test Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Clock size={16} className="text-gray-400" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FileText size={16} className="text-gray-400" />
          <span>{sections} sections</span>
        </div>
      </div>

      {/* CTA Button */}
      {!isLocked && (
        <div>
          {status === 'completed' ? (
            <button
              disabled
              className="w-full py-3 bg-gray-100 text-gray-500 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={18} />
              Test Completed
            </button>
          ) : href ? (
            <Link
              href={href}
              className="block w-full py-3 bg-[#E56668] text-white rounded-xl font-bold hover:bg-[#C04C4E] transition-colors shadow-lg text-center flex items-center justify-center gap-2"
            >
              <Play size={18} />
              {status === 'in_progress' ? 'Continue Test' : 'Start Test'}
            </Link>
          ) : (
            <button
              disabled
              className="w-full py-3 bg-gray-200 text-gray-500 rounded-xl font-bold cursor-not-allowed"
            >
              Not Available
            </button>
          )}
        </div>
      )}

      {/* Score Trend (if completed) */}
      {status === 'completed' && score !== undefined && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp size={14} className="text-green-500" />
            <span className="text-gray-600">
              {testType === 'post-test' && score >= 7.0 
                ? 'Excellent improvement!' 
                : 'View detailed breakdown'}
            </span>
          </div>
        </div>
      )}
    </div>
  );

  return CardContent;
}