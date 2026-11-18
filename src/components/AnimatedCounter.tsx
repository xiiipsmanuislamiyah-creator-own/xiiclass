"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 850,
  decimals = 0,
  suffix = "",
  prefix = "",
  className = "",
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const startValRef = useRef<number>(0);

  useEffect(() => {
    const startVal = startValRef.current;
    const delta = value - startVal;
    if (delta === 0) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;
    let animId: number;

    // Smooth Expo Out easing: snappy start, velvety deceleration
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutExpo(progress);
      const current = startVal + delta * eased;

      setDisplayValue(current);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
        startValRef.current = value;
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [value, duration]);

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toLocaleString("id-ID");

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
