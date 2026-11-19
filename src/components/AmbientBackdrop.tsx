"use client";

import {
  PencilSimpleLine,
  ClipboardText,
  ChartBar,
  CheckCircle,
  GraduationCap,
  FileXls,
} from "@phosphor-icons/react";

export function AmbientBackdrop({ variant = "light" }: { variant?: "light" | "canopy" }) {
  if (variant === "canopy") {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-orb absolute -top-12 -right-10 h-44 w-44 rounded-full bg-[#A3E635]/18 blur-2xl" />
        <div className="animate-float-orb-rev absolute -bottom-16 left-1/4 h-52 w-52 rounded-full bg-emerald-400/14 blur-2xl" />
        <svg
          className="animate-spin-slow absolute -right-12 -bottom-12 h-56 w-56 text-white/10"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="1" strokeDasharray="6 8" />
          <circle cx="100" cy="100" r="64" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" />
        </svg>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {/* Ambient Glowing Orbs */}
      <div className="animate-float-orb absolute -top-24 right-[-6%] h-96 w-96 rounded-full bg-[#A3E635]/24 blur-3xl" />
      <div className="animate-float-orb-rev absolute top-[38%] -left-24 h-80 w-80 rounded-full bg-[#115737]/14 blur-3xl" />

      {/* Rotating Orbital Geometry */}
      <svg
        className="animate-spin-slow absolute top-20 right-[7%] h-72 w-72 text-[#0A3D26]/[0.07]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 8" />
        <circle cx="100" cy="100" r="68" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" />
      </svg>

      {/* Subtle Academic Accent Chips (Desktop Only, Never Obscures Mobile) */}
      <div className="animate-float-icon absolute top-28 left-[4%] hidden lg:flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-[#0A3D26] shadow-[0_12px_28px_-8px_rgba(10,61,38,0.22)] ring-1 ring-[#0A3D26]/10 backdrop-blur-sm">
        <PencilSimpleLine size={20} weight="duotone" />
      </div>

      <div className="animate-float-icon-alt absolute top-44 right-[5%] hidden lg:flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A3D26]/90 text-[#A3E635] shadow-[0_14px_30px_-8px_rgba(10,61,38,0.35)] ring-1 ring-white/20">
        <ClipboardText size={22} weight="duotone" />
      </div>

      <div className="animate-float-icon-alt absolute top-[54%] left-[4%] hidden md:flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF6EE]/90 text-[#0F5132] shadow-md ring-1 ring-[#0F5132]/15">
        <ChartBar size={20} weight="duotone" />
      </div>

      <div className="animate-float-icon absolute top-[58%] right-[6%] hidden md:flex h-11 w-11 items-center justify-center rounded-2xl bg-white/85 text-[#15803D] shadow-md ring-1 ring-[#0A3D26]/10">
        <CheckCircle size={20} weight="duotone" />
      </div>

      <div className="animate-float-icon absolute bottom-28 left-[12%] hidden lg:flex h-10 w-10 items-center justify-center rounded-full bg-[#A3E635]/85 text-[#072919] shadow-md">
        <GraduationCap size={19} weight="fill" />
      </div>

      <div className="animate-float-icon-alt absolute bottom-24 right-[12%] hidden lg:flex h-10 w-10 items-center justify-center rounded-2xl bg-white/85 text-[#0A3D26] shadow-md ring-1 ring-[#0A3D26]/10">
        <FileXls size={19} weight="duotone" />
      </div>
    </div>
  );
}
