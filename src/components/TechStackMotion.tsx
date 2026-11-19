"use client";

import React from "react";
import {
  Lightning,
  Database,
  Code,
  Cpu,
  VideoCamera,
  FileXls,
  Sparkle,
  TerminalWindow,
} from "@phosphor-icons/react";

interface TechItem {
  name: string;
  role: string;
  category: "core" | "storage" | "engine" | "intelligence";
  icon: React.ComponentType<{ size?: number; weight?: "bold" | "fill" | "regular"; className?: string }>;
}

const TECH_ITEMS: TechItem[] = [
  { name: "Next.js 16", role: "App Router & SSR", category: "core", icon: Lightning },
  { name: "React 19", role: "Server Components", category: "core", icon: Code },
  { name: "TypeScript", role: "Strict Type Safety", category: "core", icon: TerminalWindow },
  { name: "Turbopack", role: "Sub-Second HMR", category: "engine", icon: Cpu },
  { name: "SQLite", role: "Zero-Lag Local Storage", category: "storage", icon: Database },
  { name: "Tailwind v4", role: "High-Performance CSS", category: "core", icon: Sparkle },
  { name: "Remotion", role: "Programmatic 60 FPS", category: "engine", icon: VideoCamera },
  { name: "SheetJS", role: "Instant XLSX Engine", category: "storage", icon: FileXls },
];

export function TechStackMotion() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      {/* Section Header (Typographic, No Card) */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#0A3D26] bg-[#EAF6EE] px-3.5 py-1 rounded-full border border-[#0A3D26]/15">
          FONDASI & TEKNOLOGI
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
          Arsitektur Kinerja Tinggi
        </h2>
        <p className="text-xs sm:text-sm text-[var(--ink-muted)] max-w-lg mx-auto leading-relaxed">
          Dirancang tanpa perantara berat: kompilasi Turbopack instan, persistensi SQLite lokal, dan automasi grafis 60 FPS.
        </p>
      </div>

      {/* PANGGUNG 1: THE GRAVITATIONAL ORBIT (Saling Melingkar & Mengorbit - Tanpa Card) */}
      <div className="relative mx-auto flex items-center justify-center my-6 min-h-[460px] sm:min-h-[520px]">
        {/* Background Ambient Aura */}
        <div className="absolute w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        {/* Outer Orbit Trajectory (500px) */}
        <div className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full border border-dashed border-[#0A3D26]/18 animate-orbit-ccw pointer-events-none">
          {/* Node 1: SQLite (Top) */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 pointer-events-auto">
            <div className="animate-orbit-node-ccw flex items-center gap-2 bg-[#F1F5F2] px-3 py-1 rounded-full text-xs font-mono font-bold text-[#0A3D26] shadow-xs border border-[#0A3D26]/20 hover:border-[#A3E635] hover:scale-110 transition-all cursor-default">
              <Database size={14} weight="fill" className="text-[#0A3D26]" />
              <span>SQLite</span>
            </div>
          </div>

          {/* Node 2: Tailwind v4 (Right) */}
          <div className="absolute top-1/2 -right-3.5 -translate-y-1/2 pointer-events-auto">
            <div className="animate-orbit-node-ccw flex items-center gap-2 bg-[#F1F5F2] px-3 py-1 rounded-full text-xs font-mono font-bold text-[#0A3D26] shadow-xs border border-[#0A3D26]/20 hover:border-[#A3E635] hover:scale-110 transition-all cursor-default">
              <Sparkle size={14} weight="fill" className="text-[#0A3D26]" />
              <span>Tailwind v4</span>
            </div>
          </div>

          {/* Node 3: Remotion (Bottom) */}
          <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 pointer-events-auto">
            <div className="animate-orbit-node-ccw flex items-center gap-2 bg-[#F1F5F2] px-3 py-1 rounded-full text-xs font-mono font-bold text-[#0A3D26] shadow-xs border border-[#0A3D26]/20 hover:border-[#A3E635] hover:scale-110 transition-all cursor-default">
              <VideoCamera size={14} weight="fill" className="text-[#0A3D26]" />
              <span>Remotion 60fps</span>
            </div>
          </div>

          {/* Node 4: SheetJS (Left) */}
          <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 pointer-events-auto">
            <div className="animate-orbit-node-ccw flex items-center gap-2 bg-[#F1F5F2] px-3 py-1 rounded-full text-xs font-mono font-bold text-[#0A3D26] shadow-xs border border-[#0A3D26]/20 hover:border-[#A3E635] hover:scale-110 transition-all cursor-default">
              <FileXls size={14} weight="fill" className="text-[#0A3D26]" />
              <span>SheetJS</span>
            </div>
          </div>
        </div>

        {/* Inner Orbit Trajectory (320px) */}
        <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full border border-solid border-[#0A3D26]/22 animate-orbit-cw pointer-events-none">
          {/* Node 5: Next.js 16 (Top-Right) */}
          <div className="absolute top-[8%] right-[8%] pointer-events-auto">
            <div className="animate-orbit-node-cw flex items-center gap-1.5 bg-[#0A3D26] px-3 py-1 rounded-full text-xs font-mono font-extrabold text-[#A3E635] shadow-md hover:scale-110 transition-all cursor-default">
              <Lightning size={13} weight="fill" />
              <span>Next.js 16</span>
            </div>
          </div>

          {/* Node 6: React 19 (Bottom-Right) */}
          <div className="absolute bottom-[8%] right-[8%] pointer-events-auto">
            <div className="animate-orbit-node-cw flex items-center gap-1.5 bg-[#0A3D26] px-3 py-1 rounded-full text-xs font-mono font-bold text-white shadow-md hover:scale-110 transition-all cursor-default">
              <Code size={13} weight="bold" className="text-[#A3E635]" />
              <span>React 19</span>
            </div>
          </div>

          {/* Node 7: TypeScript (Bottom-Left) */}
          <div className="absolute bottom-[8%] left-[8%] pointer-events-auto">
            <div className="animate-orbit-node-cw flex items-center gap-1.5 bg-[#0A3D26] px-3 py-1 rounded-full text-xs font-mono font-bold text-white shadow-md hover:scale-110 transition-all cursor-default">
              <TerminalWindow size={13} weight="bold" className="text-[#A3E635]" />
              <span>TypeScript</span>
            </div>
          </div>

          {/* Node 8: Turbopack (Top-Left) */}
          <div className="absolute top-[8%] left-[8%] pointer-events-auto">
            <div className="animate-orbit-node-cw flex items-center gap-1.5 bg-[#0A3D26] px-3 py-1 rounded-full text-xs font-mono font-bold text-[#A3E635] shadow-md hover:scale-110 transition-all cursor-default">
              <Cpu size={13} weight="fill" />
              <span>Turbopack</span>
            </div>
          </div>
        </div>

        {/* Central Core: E-Rekap Engine Nucleus */}
        <div className="relative z-10 flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#072919] text-white shadow-[0_12px_32px_rgba(7,41,25,0.4)] border-2 border-[#A3E635]/40 select-none">
          <div className="h-2 w-2 rounded-full bg-[#A3E635] animate-ping mb-1" />
          <span className="font-mono text-[10px] font-bold tracking-widest text-[#A3E635] uppercase">
            CORE ENGINE
          </span>
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
            E-Rekap
          </span>
          <span className="font-mono text-[9px] text-emerald-200/70">v1.0.0</span>
        </div>
      </div>

      {/* PANGGUNG 2: DUAL BI-DIRECTIONAL KINETIC TICKER (Menyilang & Mengalir - Tanpa Card) */}
      <div className="relative mt-8 pt-6 border-t border-[#0A3D26]/12 space-y-3 select-none">
        {/* Track 1: Mengalir ke Kiri */}
        <div className="relative overflow-hidden w-full py-1">
          <div className="animate-stream-left items-center gap-8 text-xs sm:text-sm font-mono font-bold text-[var(--ink)]">
            {Array.from({ length: 4 }).map((_, repeatIdx) => (
              <React.Fragment key={repeatIdx}>
                <span className="flex items-center gap-2 hover:text-[#0A3D26] transition-colors">
                  <Lightning size={16} weight="fill" className="text-[#15803D]" />
                  NEXT.JS 16
                </span>
                <span className="text-[#0A3D26]/25 font-bold">//</span>
                <span className="flex items-center gap-2 hover:text-[#0A3D26] transition-colors">
                  <Database size={16} weight="fill" className="text-[#15803D]" />
                  SQLITE PERSISTEN
                </span>
                <span className="text-[#0A3D26]/25 font-bold">//</span>
                <span className="flex items-center gap-2 hover:text-[#0A3D26] transition-colors">
                  <Cpu size={16} weight="fill" className="text-[#15803D]" />
                  TURBOPACK 4.3
                </span>
                <span className="text-[#0A3D26]/25 font-bold">//</span>
                <span className="flex items-center gap-2 hover:text-[#0A3D26] transition-colors">
                  <Code size={16} weight="bold" className="text-[#15803D]" />
                  REACT 19 SERVER COMPONENTS
                </span>
                <span className="text-[#0A3D26]/25 font-bold">//</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Track 2: Mengalir ke Kanan (Menyilang) */}
        <div className="relative overflow-hidden w-full py-1">
          <div className="animate-stream-right items-center gap-8 text-xs sm:text-sm font-mono font-bold text-[var(--ink-muted)]">
            {Array.from({ length: 4 }).map((_, repeatIdx) => (
              <React.Fragment key={repeatIdx}>
                <span className="flex items-center gap-2 hover:text-[var(--ink)] transition-colors">
                  <VideoCamera size={16} weight="fill" className="text-[#0A3D26]" />
                  REMOTION ENGINE 60FPS
                </span>
                <span className="text-[#0A3D26]/25 font-bold">//</span>
                <span className="flex items-center gap-2 hover:text-[var(--ink)] transition-colors">
                  <Sparkle size={16} weight="fill" className="text-[#0A3D26]" />
                  TAILWIND CSS v4
                </span>
                <span className="text-[#0A3D26]/25 font-bold">//</span>
                <span className="flex items-center gap-2 hover:text-[var(--ink)] transition-colors">
                  <TerminalWindow size={16} weight="bold" className="text-[#0A3D26]" />
                  STRICT TYPESCRIPT
                </span>
                <span className="text-[#0A3D26]/25 font-bold">//</span>
                <span className="flex items-center gap-2 hover:text-[var(--ink)] transition-colors">
                  <FileXls size={16} weight="fill" className="text-[#0A3D26]" />
                  INSTANT EXCEL EXPORT
                </span>
                <span className="text-[#0A3D26]/25 font-bold">//</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
