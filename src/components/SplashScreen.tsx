"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "@/lib/paths";

export function SplashScreen() {
  const [phase, setPhase] = useState<"checking" | "show" | "exiting" | "done">("checking");

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem("erekap_splashed");
      if (seen) {
        setPhase("done");
        return;
      }
      setPhase("show");
      sessionStorage.setItem("erekap_splashed", "1");

      const exitTimer = setTimeout(() => setPhase("exiting"), 1150);
      const doneTimer = setTimeout(() => setPhase("done"), 1580);
      return () => {
        clearTimeout(exitTimer);
        clearTimeout(doneTimer);
      };
    } catch {
      setPhase("done");
    }
  }, []);

  if (phase === "checking" || phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#062315] text-white ${
        phase === "exiting" ? "animate-splash-exit pointer-events-none" : ""
      }`}
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 44%, rgba(163, 230, 53, 0.16), rgba(6, 35, 21, 1) 64%)",
      }}
    >
      <div className="flex flex-col items-center gap-5 px-6 text-center">
        {/* Remotion-Style Kinetic Logo Stage */}
        <div className="relative flex h-28 w-28 items-center justify-center">
          <svg
            className="animate-spin-slow absolute inset-0 h-full w-full text-[#A3E635]/60"
            viewBox="0 0 120 120"
            fill="none"
          >
            <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="1.5" strokeDasharray="10 7" />
            <circle cx="60" cy="60" r="46" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          </svg>
          <span className="curtain-halo absolute h-24 w-24 rounded-3xl ring-2 ring-[#A3E635]/40" />
          <div className="animate-remotion-logo relative h-20 w-20 shrink-0 drop-shadow-[0_14px_28px_rgba(0,0,0,0.45)]">
            <img
              src={withBasePath("/icon-erekap.png")}
              alt="Logo E-Rekap"
              width={80}
              height={80}
              loading="eager"
              decoding="sync"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="curtain-title text-3xl font-extrabold tracking-tight text-white">
            E-Rekap
          </p>
          <div className="mx-auto h-0.5 w-28 overflow-hidden rounded-full bg-white/15">
            <div className="animate-remotion-bar h-full w-full bg-[#A3E635]" />
          </div>
          <p className="curtain-sub font-num text-[11px] font-bold tracking-[0.22em] uppercase text-[#A3E635]">
            Sistem Rekapitulasi Kehadiran
          </p>
        </div>
      </div>
    </div>
  );
}
