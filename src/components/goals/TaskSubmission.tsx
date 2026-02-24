"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Send, Link as LinkIcon, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GoalTask } from "@/types/goals";

interface TaskSubmissionProps {
  task: GoalTask;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskId: string, submissionUrl: string, notes?: string) => Promise<boolean>;
}

export default function TaskSubmission({
  task,
  isOpen,
  onClose,
  onSubmit
}: TaskSubmissionProps) {
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Efek untuk menandai component sudah mount dan handle scroll locking
  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate URL
    if (!submissionUrl.trim()) {
      setError("Please provide a submission link");
      return;
    }
    
    // Basic URL validation
    try {
      new URL(submissionUrl);
    } catch {
      setError("Please enter a valid URL (must include https://)");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await onSubmit(task.id, submissionUrl, notes || undefined);
      
      if (result) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          // Reset form
          setSubmissionUrl("");
          setNotes("");
          setSuccess(false);
        }, 2000);
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const modalContent = (
    <div 
      className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      {/* BACKDROP */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#2F4157]/60 backdrop-blur-sm"
      />

      {/* MODAL CARD */}
      <div 
        className="relative z-10 bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full shadow-2xl animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200 max-h-[90dvh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="shrink-0 bg-white border-b border-gray-100 px-6 py-5 rounded-t-3xl z-20">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <h3 className="text-2xl font-bold text-[#2F4157] mb-1">
                Submit Assignment
              </h3>
              <p className="text-sm text-gray-600">
                {task.title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors flex-shrink-0"
              disabled={isSubmitting}
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Task Description */}
            {task.description && (
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-start gap-3">
                  <FileText className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-xs font-bold text-blue-900 uppercase tracking-wide mb-1">
                      Task Requirements
                    </p>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      {task.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Submission Instructions */}
            <div className="space-y-4">
              <h4 className="font-bold text-[#2F4157] text-lg">
                How to Submit
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-[#E56668] text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">
                    1
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Upload your work</strong> to Google Drive, Dropbox, or any cloud storage
                  </p>
                </div>
                
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-[#E56668] text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">
                    2
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Set sharing permissions</strong> to "Anyone with the link can view"
                  </p>
                </div>
                
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-[#E56668] text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">
                    3
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Copy the shareable link</strong> and paste it below
                  </p>
                </div>
              </div>
            </div>
            
            {/* Submission URL Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Submission Link <span className="text-[#E56668]">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <LinkIcon size={18} />
                </div>
                <input
                  type="url"
                  value={submissionUrl}
                  onChange={(e) => setSubmissionUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className={cn(
                    "w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl font-medium text-[#2F4157] placeholder:text-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-[#E56668] focus:border-transparent transition-all",
                    error ? "border-red-300 bg-red-50" : "border-gray-200"
                  )}
                  disabled={isSubmitting || success}
                  required
                />
              </div>
              
              {/* Common Platform Examples */}
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">Examples:</span>
                <button
                  type="button"
                  onClick={() => setSubmissionUrl("https://drive.google.com/")}
                  className="text-xs text-blue-600 hover:underline"
                  disabled={isSubmitting || success}
                >
                  Google Drive
                </button>
                <span className="text-xs text-gray-300">•</span>
                <button
                  type="button"
                  onClick={() => setSubmissionUrl("https://www.dropbox.com/")}
                  className="text-xs text-blue-600 hover:underline"
                  disabled={isSubmitting || success}
                >
                  Dropbox
                </button>
                <span className="text-xs text-gray-300">•</span>
                <button
                  type="button"
                  onClick={() => setSubmissionUrl("https://onedrive.live.com/")}
                  className="text-xs text-blue-600 hover:underline"
                  disabled={isSubmitting || success}
                >
                  OneDrive
                </button>
              </div>
            </div>
            
            {/* Additional Notes (Optional) */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any context or questions for your mentor..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium text-[#2F4157] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E56668] focus:border-transparent transition-all resize-none"
                disabled={isSubmitting || success}
              />
              <p className="text-xs text-gray-500 mt-1">
                You can include any challenges you faced or specific feedback you're looking for
              </p>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-semibold text-red-900 mb-0.5">
                    Submission Error
                  </p>
                  <p className="text-sm text-red-700">
                    {error}
                  </p>
                </div>
              </div>
            )}
            
            {/* Success Message */}
            {success && (
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-semibold text-green-900 mb-0.5">
                    Submitted Successfully!
                  </p>
                  <p className="text-sm text-green-700">
                    Your mentor will review this within 2-3 business days.
                  </p>
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all text-sm"
                disabled={isSubmitting || success}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={cn(
                  "flex-1 py-3 px-6 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2",
                  isSubmitting || success
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#E56668] text-white hover:bg-[#C04C4E] shadow-lg hover:shadow-xl"
                )}
                disabled={isSubmitting || success}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 size={18} />
                    Submitted
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit to Mentor
                  </>
                )}
              </button>
            </div>
            
            {/* Mentor Review Info */}
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="text-xs text-purple-900 font-medium mb-1">
                📋 What Happens Next?
              </p>
              <ul className="text-xs text-purple-800 space-y-1 list-disc list-inside">
                <li>Your mentor will be notified</li>
                <li>Expect feedback within 2-3 business days</li>
                <li>You'll receive a score and detailed comments</li>
                <li>Task will be marked complete once verified</li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}