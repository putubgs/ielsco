"use client";

import { useState } from "react";
import { Crown, Zap, Lock, ArrowRight, X } from "lucide-react";
import TierBadge, { type TierType } from "./TierBadge";
import PricingModal from "./PricingModal";

interface UpgradePromptProps {
  feature: string;
  requiredTier: "insider" | "visionary";
  description?: string;
  variant?: "inline" | "modal" | "card";
  className?: string;
}

export default function UpgradePrompt({
  feature,
  requiredTier,
  description,
  variant = "inline",
  className
}: UpgradePromptProps) {
  const [showPricing, setShowPricing] = useState(false);

  const Icon = requiredTier === "visionary" ? Crown : Zap;
  const tierName = requiredTier === "visionary" ? "Visionary" : "Insider";
  const tierColor = requiredTier === "visionary" 
    ? "from-yellow-400 to-yellow-600" 
    : "from-purple-500 to-purple-700";

  // ============================================
  // INLINE VARIANT (Small lock prompt)
  // ============================================
  if (variant === "inline") {
    return (
      <>
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm ${className}`}>
          <Lock size={14} className="text-gray-400" />
          <span className="text-gray-600">
            <strong>{feature}</strong> requires <TierBadge tier={requiredTier} size="xs" />
          </span>
          <button
            onClick={() => setShowPricing(true)}
            className="ml-1 text-purple-600 hover:text-purple-700 font-bold text-xs underline"
          >
            Upgrade
          </button>
        </div>
        {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}
      </>
    );
  }

  // ============================================
  // CARD VARIANT (Full feature lock card)
  // ============================================
  if (variant === "card") {
    return (
      <>
        <div className={`relative overflow-hidden bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center ${className}`}>
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50"></div>
          
          <div className="relative z-10 space-y-4">
            {/* Lock Icon */}
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
              <Lock className="text-gray-400" size={32} />
            </div>

            {/* Title */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature} is Locked
              </h3>
              {description && (
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  {description}
                </p>
              )}
            </div>

            {/* Required Tier Badge */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <span>Available for</span>
              <TierBadge tier={requiredTier} size="md" />
              <span>members</span>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setShowPricing(true)}
              className={`
                inline-flex items-center gap-2 px-6 py-3 
                bg-gradient-to-r ${tierColor}
                text-white rounded-xl font-bold
                hover:shadow-lg hover:scale-105
                transition-all
              `}
            >
              <Icon size={18} fill="currentColor" />
              Upgrade to {tierName}
              <ArrowRight size={18} />
            </button>

            {/* Secondary info */}
            <p className="text-xs text-gray-500">
              {requiredTier === "insider" 
                ? "Starting from Rp 25k/month"
                : "One-time payment Rp 500k"}
            </p>
          </div>
        </div>
        {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}
      </>
    );
  }

  // ============================================
  // MODAL VARIANT (Full screen takeover)
  // ============================================
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl p-8 relative animate-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={() => {}}
            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>

          {/* Content */}
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
              <Lock className="text-gray-400" size={40} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Unlock {feature}
              </h2>
              {description && (
                <p className="text-gray-600">
                  {description}
                </p>
              )}
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-600 mb-2">This feature requires:</p>
              <TierBadge tier={requiredTier} size="lg" />
            </div>

            <button
              onClick={() => setShowPricing(true)}
              className={`
                w-full py-4 rounded-xl font-bold text-lg
                bg-gradient-to-r ${tierColor}
                text-white
                hover:shadow-xl transition-all
                flex items-center justify-center gap-2
              `}
            >
              <Icon size={20} fill="currentColor" />
              Upgrade to {tierName}
            </button>

            <p className="text-xs text-gray-500">
              Join {requiredTier === "insider" ? "hundreds" : "elite members"} who've already upgraded
            </p>
          </div>
        </div>
      </div>
      {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}
    </>
  );
}

// ============================================
// SPECIALIZED VARIANTS
// ============================================

// Quick inline lock badge
export function FeatureLock({ requiredTier }: { requiredTier: "insider" | "visionary" }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs text-gray-600">
      <Lock size={10} />
      <TierBadge tier={requiredTier} size="xs" showIcon={false} />
    </span>
  );
}

// Overlay for disabled buttons
export function DisabledOverlay({ children, requiredTier }: { children: React.ReactNode, requiredTier: "insider" | "visionary" }) {
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <>
      <div 
        onClick={() => setShowPrompt(true)}
        className="relative cursor-not-allowed"
      >
        <div className="pointer-events-none opacity-50">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Lock size={20} className="text-gray-600" />
        </div>
      </div>
      {showPrompt && (
        <UpgradePrompt
          feature="This Feature"
          requiredTier={requiredTier}
          variant="modal"
        />
      )}
    </>
  );
}