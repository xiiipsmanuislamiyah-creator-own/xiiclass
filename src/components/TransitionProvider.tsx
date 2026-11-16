"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { withBasePath } from "@/lib/paths";

interface TransitionCtxValue {
  navigateWithCurtain: (href: string, label?: string) => void;
}

const TransitionContext = createContext<TransitionCtxValue>({
  navigateWithCurtain: () => {},
});

export function useCurtainNavigation() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [stage, setStage] = useState<"idle" | "entering" | "hold" | "leaving">("idle");
  const [subtitle, setSubtitle] = useState("MEMBUKA DASHBOARD");

  const navigateWithCurtain = useCallback(
    (href: string, label = "MEMBUKA RUANG REKAP") => {
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        router.push(href);
        return;
      }

      setSubtitle(label);
      setStage("entering");

      setTimeout(() => {
        setStage("hold");
        router.push(href);
      }, 420);

      setTimeout(() => {
        setStage("leaving");
      }, 1180);

      setTimeout(() => {
        setStage("idle");
      }, 1660);
    },
    [router]
  );

  return (
    <TransitionContext.Provider value={{ navigateWithCurtain }}>
      {children}

      {stage !== "idle" && (
        <div
          aria-hidden="true"
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#062315] text-white ${
            stage === "entering"
              ? "curtain-enter"
              : stage === "leaving"
              ? "curtain-leave pointer-events-none"
              : ""
          }`}
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 45%, rgba(163, 230, 53, 0.16), rgba(6, 35, 21, 1) 62%)",
          }}
        >
          <div className="flex flex-col items-center gap-5 px-6 text-center">
            <div className="relative flex h-28 w-28 items-center justify-center">
              <svg
                className="animate-spin-slow absolute inset-0 h-full w-full text-[#A3E635]/65"
                viewBox="0 0 120 120"
                fill="none"
              >
                <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="1.5" strokeDasharray="10 7" />
                <circle cx="60" cy="60" r="46" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
              </svg>
              <span className="curtain-halo absolute h-24 w-24 rounded-3xl ring-2 ring-[#A3E635]/45" />
              <div className="animate-remotion-logo relative h-20 w-20 shrink-0 drop-shadow-[0_14px_28px_rgba(0,0,0,0.45)]">
                <img
                  src={withBasePath("/icon-erekap.png")}
                  alt=""
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="overflow-hidden space-y-2">
              <p className="curtain-title text-3xl font-extrabold tracking-tight text-white">
                E-Rekap
              </p>
              <div className="mx-auto h-0.5 w-28 overflow-hidden rounded-full bg-white/15">
                <div className="animate-remotion-bar h-full w-full bg-[#A3E635]" />
              </div>
              <p className="curtain-sub font-num text-[11px] font-bold tracking-[0.24em] uppercase text-[#A3E635]">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </TransitionContext.Provider>
  );
}
