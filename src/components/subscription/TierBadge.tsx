"use client";

import { Crown, Zap, Target } from "lucide-react";
import { cn } from "@/lib/utils";

export type TierType = "explorer" | "insider" | "visionary";

interface TierBadgeProps {
  tier: TierType;
  size?: "xs" | "sm" | "md" | "lg";
  showIcon?: boolean;
  showLabel?: boolean;
  className?: string;
}

const TIER_CONFIG = {
  explorer: {
    name: "Explorer",
    icon: Target,
    emoji: "🎒",
    colors: {
      bg: "bg-gray-100",
      text: "text-gray-600",
      border: "border-gray-200",
      iconColor: "text-gray-500"
    }
  },
  insider: {
    name: "Insider",
    icon: Zap,
    emoji: "⚡",
    colors: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      border: "border-purple-200",
      iconColor: "text-purple-600"
    }
  },
  visionary: {
    name: "Visionary",
    icon: Crown,
    emoji: "👑",
    colors: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
      iconColor: "text-yellow-600"
    }
  }
};

const SIZE_CONFIG = {
  xs: {
    padding: "px-2 py-0.5",
    text: "text-[10px]",
    iconSize: 10,
    gap: "gap-1"
  },
  sm: {
    padding: "px-2.5 py-1",
    text: "text-xs",
    iconSize: 12,
    gap: "gap-1.5"
  },
  md: {
    padding: "px-3 py-1.5",
    text: "text-sm",
    iconSize: 14,
    gap: "gap-2"
  },
  lg: {
    padding: "px-4 py-2",
    text: "text-base",
    iconSize: 16,
    gap: "gap-2"
  }
};

export default function TierBadge({
  tier,
  size = "sm",
  showIcon = true,
  showLabel = true,
  className
}: TierBadgeProps) {
  const config = TIER_CONFIG[tier];
  const sizeConfig = SIZE_CONFIG[size];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-bold uppercase tracking-wider border",
        config.colors.bg,
        config.colors.text,
        config.colors.border,
        sizeConfig.padding,
        sizeConfig.text,
        sizeConfig.gap,
        className
      )}
    >
      {showIcon && (
        <Icon 
          size={sizeConfig.iconSize} 
          className={config.colors.iconColor}
          fill={tier === "visionary" ? "currentColor" : "none"}
        />
      )}
      {showLabel && config.name}
    </span>
  );
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function getTierName(tier: TierType): string {
  return TIER_CONFIG[tier].name;
}

export function getTierEmoji(tier: TierType): string {
  return TIER_CONFIG[tier].emoji;
}

export function getTierColor(tier: TierType): string {
  return TIER_CONFIG[tier].colors.text;
}

export function isTierUnlocked(userTier: TierType, requiredTier: TierType): boolean {
  const tierHierarchy: Record<TierType, number> = {
    explorer: 1,
    insider: 2,
    visionary: 3
  };
  
  return tierHierarchy[userTier] >= tierHierarchy[requiredTier];
}