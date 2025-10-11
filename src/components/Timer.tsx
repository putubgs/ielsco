"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  minutes: number;
  onTick?: (secondsLeft: number) => void;
  onFinish?: () => void;
};

export default function Timer({ minutes, onTick, onFinish }: Props) {
  const totalStart = Math.max(1, Math.floor(minutes * 60));
  const [secondsLeft, setSecondsLeft] = useState<number>(totalStart);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev - 1;
        onTick?.(next);
        if (next <= 0) {
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          onFinish?.();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const m = Math.floor(secondsLeft / 60);
  const s = (secondsLeft % 60).toString().padStart(2, "0");
  return <div className="font-mono text-lg font-semibold text-[#173E8C]">⏱ {m}:{s}</div>;
}
