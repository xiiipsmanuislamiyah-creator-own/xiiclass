"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealCardProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  threshold?: number;
  direction?: "up" | "scale" | "left" | "right";
  style?: React.CSSProperties;
}

export function ScrollRevealCard({
  children,
  className = "",
  delayMs = 0,
  threshold = 0.12,
  direction = "up",
  style = {},
}: ScrollRevealCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Check if element is already in initial viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const timer = setTimeout(() => setIsVisible(true), Math.max(30, delayMs));
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs, threshold]);

  const initialTransform =
    direction === "up"
      ? "translate3d(0, 36px, 0)"
      : direction === "scale"
      ? "scale(0.94) translate3d(0, 24px, 0)"
      : direction === "left"
      ? "translate3d(-32px, 0, 0)"
      : "translate3d(32px, 0, 0)";

  return (
    <div
      ref={cardRef}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0, 0, 0) scale(1)" : initialTransform,
        transition: `opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 650ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
        willChange: "opacity, transform",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
