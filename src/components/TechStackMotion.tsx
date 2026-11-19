"use client";

import React, { useState, useEffect } from "react";

// Official brand SVG vector icons (Mathematically accurate paths)
function NextJsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" className={className} fill="none" aria-label="Next.js">
      <circle cx="90" cy="90" r="90" fill="#000" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="url(#paint0_linear_next)"
      />
      <rect fill="url(#paint1_linear_next)" height="72" width="12" x="115" y="54" />
      <defs>
        <linearGradient
          id="paint0_linear_next"
          gradientUnits="userSpaceOnUse"
          x1="109"
          x2="144.5"
          y1="116.5"
          y2="160.5"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_next"
          gradientUnits="userSpaceOnUse"
          x1="121"
          x2="120.799"
          y1="54"
          y2="106.875"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ReactIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} aria-label="React">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function TypeScriptIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="TypeScript">
      <rect width="24" height="24" rx="3.5" fill="#3178C6" />
      <path
        d="M18.488 9.75c.612 0 1.154.037 1.627.111.473.074.908.187 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242.924.924 0 0 0-.393.374.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function TailwindCssIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#38BDF8" aria-label="Tailwind CSS">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  );
}

function SqliteIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#003B57" aria-label="SQLite">
      <path d="M12.186 2.04c-.454.004-.908.06-1.348.168-3.05.748-4.992 3.195-5.385 6.096-.197 1.455.087 2.822.756 4.02.668 1.198 1.696 2.15 2.894 2.88 2.398 1.46 5.342 2.115 8.16 1.748 1.41-.184 2.766-.677 3.96-1.468.324-.214.542-.564.582-.95.04-.386-.1-.77-.384-1.036-.284-.266-.67-.374-1.05-.292-1.034.225-2.1.31-3.16.25-2.485-.14-4.838-.99-6.84-2.44-.999-.724-1.84-1.64-2.41-2.71-.57-1.07-.78-2.31-.56-3.52.44-2.43 2.1-4.39 4.47-5.11 2.37-.72 4.98-.16 6.84 1.47.78.69 1.41 1.52 1.86 2.45.45.93.68 1.95.68 2.99 0 .5-.05 1-.15 1.49-.08.4.1.8.46 1.03.36.23.82.2 1.16-.07.34-.27.5-.7.42-1.13-.15-.79-.24-1.6-.24-2.42 0-1.42-.36-2.82-1.03-4.08-.67-1.26-1.62-2.35-2.76-3.19-2.02-1.49-4.52-2.16-7.01-2.14z" />
    </svg>
  );
}

function TurbopackIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-label="Turbopack">
      <defs>
        <linearGradient id="turbo_gradient_hud" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0070F3" />
          <stop offset="1" stopColor="#FF0080" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9.5" stroke="url(#turbo_gradient_hud)" strokeWidth="2.5" />
      <path
        d="M12 6.5V12l4 3.5"
        stroke="url(#turbo_gradient_hud)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RemotionIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 250 250" className={className} fill="#0B84F3" aria-label="Remotion">
      <g>
        <path
          fillOpacity=".3"
          d="M81.03 33.963c-3.848.208-6.95.814-10.075 1.995c-1.558.583-4.114 1.852-5.52 2.73c-5.881 3.662-10.364 9.169-12.702 15.577c-.466 1.268-1.728 5.315-2.54 8.1c-5.407 18.617-8.476 38.975-9.135 60.521c-.104 3.432-.104 11.603 0 14.979c.442 14.285 1.816 27.181 4.307 40.332c1.012 5.323 2.635 12.473 3.575 15.721c1.92 6.599 5.841 12.217 11.418 16.335c3.736 2.761 7.978 4.613 12.678 5.523c2.266.438 5.255.638 7.457.494c3.045-.199 9.087-1.005 13.996-1.875c22.128-3.918 42.568-10.933 61.104-20.972c11.739-6.36 21.774-13.247 31.456-21.602c9.65-8.316 17.877-17.261 25.117-27.3c1.679-2.323 2.523-3.679 3.366-5.387c2.17-4.405 3.19-8.786 3.182-13.686c0-4.565-.868-8.619-2.74-12.768c-.9-2.003-1.759-3.44-3.688-6.169c-7.102-10.047-14.985-18.801-24.594-27.308c-14.896-13.184-32.589-23.997-52.346-32c-4.283-1.733-8.501-3.257-13.579-4.909c-10.751-3.487-24.056-6.511-35.313-8.02c-1.767-.24-4.17-.375-5.423-.31"
        />
        <path
          fillOpacity=".6"
          d="M91.457 53.379c-3.029.163-5.47.64-7.929 1.57c-1.227.458-3.237 1.457-4.344 2.147c-4.628 2.883-8.156 7.216-9.995 12.258c-.367.999-1.36 4.182-1.998 6.374c-4.256 14.65-6.67 30.67-7.19 47.625c-.081 2.7-.081 9.13 0 11.786c.349 11.241 1.43 21.389 3.39 31.738c.796 4.188 2.074 9.815 2.813 12.371c1.511 5.193 4.597 9.614 8.985 12.854c2.94 2.173 6.278 3.63 9.977 4.345c1.782.346 4.135.503 5.867.39c2.396-.157 7.15-.791 11.014-1.476c17.412-3.083 33.497-8.603 48.083-16.503c9.237-5.005 17.134-10.424 24.752-16.999c7.594-6.543 14.068-13.583 19.765-21.482c1.321-1.828 1.985-2.895 2.649-4.239c1.707-3.466 2.51-6.914 2.504-10.77c0-3.592-.683-6.782-2.156-10.047c-.708-1.576-1.385-2.707-2.902-4.854c-5.59-7.906-11.792-14.795-19.354-21.489c-11.722-10.374-25.644-18.883-41.191-25.181c-3.37-1.363-6.689-2.562-10.685-3.862c-8.46-2.745-18.93-5.124-27.788-6.311c-1.39-.189-3.281-.295-4.267-.245"
        />
        <path d="M102.247 73.517c-2.178.117-3.933.46-5.702 1.129c-.882.33-2.328 1.047-3.123 1.544c-3.329 2.073-5.866 5.189-7.189 8.815c-.264.718-.978 3.008-1.437 4.584c-3.06 10.535-4.797 22.055-5.17 34.249c-.059 1.941-.059 6.566 0 8.476c.25 8.083 1.028 15.381 2.438 22.823c.573 3.013 1.491 7.059 2.023 8.897c1.087 3.734 3.305 6.914 6.461 9.244c2.114 1.562 4.515 2.61 7.175 3.125c1.282.248 2.973.361 4.219.28c1.724-.113 5.143-.569 7.921-1.061c12.522-2.218 24.089-6.187 34.578-11.868c6.643-3.599 12.322-7.497 17.801-12.225c5.461-4.705 10.117-9.768 14.213-15.449c.951-1.314 1.428-2.082 1.905-3.048c1.228-2.493 1.805-4.972 1.801-7.745c0-2.583-.491-4.877-1.551-7.225c-.509-1.134-.995-1.947-2.087-3.491c-4.019-5.686-8.479-10.64-13.917-15.454c-8.43-7.46-18.442-13.58-29.623-18.109c-2.423-.98-4.81-1.842-7.684-2.777c-6.083-1.973-13.613-3.685-19.983-4.538c-1-.136-2.36-.213-3.069-.177" />
      </g>
    </svg>
  );
}

function SheetJsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#217346" aria-label="SheetJS XLSX">
      <path d="M21.17 2.06H6.83A2.83 2.83 0 004 4.89v14.22a2.83 2.83 0 002.83 2.83h14.34A2.83 2.83 0 0024 19.11V4.89a2.83 2.83 0 00-2.83-2.83zm-7.67 15.5l-2.05-3.56-2.06 3.56H7.13l3.22-5.11-3.06-4.95h2.32l1.89 3.38 1.88-3.38h2.32l-3.06 4.95 3.22 5.11h-2.36z" />
    </svg>
  );
}

interface TechNode {
  id: string;
  name: string;
  version: string;
  layer: string;
  tagline: string;
  description: string;
  specBenchmark: string;
  specFootprint: string;
  specImplementation: string;
  pipelineConnection: string;
  brandColor: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const TECH_NODES: TechNode[] = [
  {
    id: "react",
    name: "React 19",
    version: "v19.3.0",
    layer: "CORE UI ARCHITECTURE",
    tagline: "Concurrent Server Components & Zero-Bundle Tables",
    description:
      "Merender tabel rekap kehadiran siswa (40+ baris per kelas) secara penuh di sisi server. Komponen HTML dikirim siap tayang tanpa beban komputasi JavaScript hydration di browser HP siswa/guru.",
    specBenchmark: "< 8ms Initial Render",
    specFootprint: "0 KB Client JS Impact",
    specImplementation: "Server Components & Server Actions",
    pipelineConnection: "Menerima payload SQLite WAL → Streaming langsung ke DOM",
    brandColor: "#61DAFB",
    Icon: ReactIcon,
  },
  {
    id: "next",
    name: "Next.js 16",
    version: "v16.4.6",
    layer: "RUNTIME & APPLICATION ROUTER",
    tagline: "App Router Production Hub & Edge Optimization",
    description:
      "Menangani routing modular sub-path (/xiiclass), layout nesting terpadu antar halaman rekap, sesi otentikasi role-based, dan caching statis instan.",
    specBenchmark: "100% Sub-Path Isolation",
    specFootprint: "Zero Route Latency",
    specImplementation: "Turbopack Bundler Engine",
    pipelineConnection: "Menjaga session cookie terenkripsi → Dispatch API internal",
    brandColor: "#FFFFFF",
    Icon: NextJsIcon,
  },
  {
    id: "sqlite",
    name: "SQLite Local",
    version: "v3.45 (libsql)",
    layer: "LOCAL PERSISTENCE ENGINE",
    tagline: "Zero-Latency Embedded Database dengan WAL Mode",
    description:
      "Menyimpan rekapitulasi kehadiran harian madrasah langsung di filesystem lokal berformat single-file. Mendukung konkurensi Write-Ahead Logging (WAL) tanpa dependensi server database terpisah yang boros RAM.",
    specBenchmark: "Zero Socket Latency",
    specFootprint: "Single-File ACID Reliability",
    specImplementation: "better-sqlite3 & WAL Mode",
    pipelineConnection: "Data Absensi → Ditulis atomik ke disk lokal",
    brandColor: "#0078D7",
    Icon: SqliteIcon,
  },
  {
    id: "turbopack",
    name: "Turbopack",
    version: "v4.3 Native Rust",
    layer: "COMPILATION ENGINE",
    tagline: "Sub-Second Incremental Compilation & Fast HMR",
    description:
      "Engine kompilasi berbasis Rust yang menggantikan Webpack. Memproses perubahan CSS dan komponen tabel secara inkremental dalam hitungan milidetik tanpa jeda reload yang lama.",
    specBenchmark: "< 50ms Incremental HMR",
    specFootprint: "Rust Native Binary",
    specImplementation: "@tailwindcss/turbopack",
    pipelineConnection: "Mendeteksi modifikasi kode → Live Hot-Module Replacement",
    brandColor: "#0070F3",
    Icon: TurbopackIcon,
  },
  {
    id: "typescript",
    name: "TypeScript",
    version: "v5.7 Strict",
    layer: "STATIC TYPE SYSTEM",
    tagline: "Strict Type Safety & Invariant Data Contracts",
    description:
      "Memastikan setiap mutasi kehadiran, kalkulasi persentase alpa/izin/sakit, dan struktur ekspor A4 terkunci dengan skema tipe ketat. Mencegah bug runtime data siswa sebelum sampai ke produksi.",
    specBenchmark: "100% Strict Type Coverage",
    specFootprint: "Compile-Time Guard",
    specImplementation: "Zod Schema Validation",
    pipelineConnection: "Memvalidasi input guru → Menjamin integritas tabel",
    brandColor: "#3178C6",
    Icon: TypeScriptIcon,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS v4",
    version: "v4.3.3 Oxide",
    layer: "DESIGN TOKENS & STYLING",
    tagline: "Engine CSS Berbasis Token Semantik Bebas AI-Slop",
    description:
      "Menerapkan palet resmi Forest Canopy (#072417) dan Lime (#A3E635) dengan WCAG AAA contrast ratio. Seluruh token dideklarasikan pada :root tanpa ad-hoc hex acak, responsif mulus dari 375px hingga 4K.",
    specBenchmark: "< 14 KB Compiled CSS",
    specFootprint: "Pure CSS Variables",
    specImplementation: "Tailwind v4 Oxide Engine",
    pipelineConnection: "Memberi styling adaptif pada tabel, modal, dan frame preview",
    brandColor: "#38BDF8",
    Icon: TailwindCssIcon,
  },
  {
    id: "sheetjs",
    name: "SheetJS (XLSX)",
    version: "v0.18.5",
    layer: "SPREADSHEET GENERATION",
    tagline: "Ekspor Format Cetak Formal A4 Langsung di Client",
    description:
      "Membangun file spreadsheet Excel (.xlsx) dengan struktur kolom formal: nomor induk, nama, kehadiran rinci, rekapitulasi persentase, dan kolom stempel pengesahan Kop Madrasah.",
    specBenchmark: "Instant Instant A4 Buffer",
    specFootprint: "Direct Binary ArrayBuffer",
    specImplementation: "xlsx.writeFileXLSX",
    pipelineConnection: "Data Rekap Siswa → Diunduh sebagai format resmi Excel",
    brandColor: "#217346",
    Icon: SheetJsIcon,
  },
  {
    id: "remotion",
    name: "Remotion Engine",
    version: "v4.0.540",
    layer: "PROGRAMMATIC MOTION VIDEO",
    tagline: "Video Showcase & Showreel 60 FPS Terprogram",
    description:
      "Merender video walkthrough antarmuka E-Rekap dengan animasi kinetik presisi frame-by-frame. Mengotomasi pembuatan teaser dan dokumentasi fitur tanpa software video editor manual.",
    specBenchmark: "60 FPS Render Fidelity",
    specFootprint: "Code-as-Video Pipeline",
    specImplementation: "Remotion React Canvas",
    pipelineConnection: "DOM Rekapitulasi → Diubah menjadi frame video MP4",
    brandColor: "#0B84F3",
    Icon: RemotionIcon,
  },
];

export function TechStackMotion() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeNode = TECH_NODES[activeIdx];
  const ActiveIcon = activeNode.Icon;

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Section Header: Anti-Slop, High-Craft Editorial */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2.5">
        <div className="inline-flex items-center gap-2 border border-[#0A3D26]/20 bg-[#F4F9F5] px-3 py-1 rounded-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#15803D]" />
          <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-[#0A3D26]">
            FONDASI & TEKNOLOGI
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
          Arsitektur Kinerja Tinggi
        </h2>
        <p className="text-xs sm:text-sm text-[var(--ink-muted)] max-w-lg mx-auto leading-relaxed">
          Pilih modul di bawah untuk memeriksa anatomi runtime, persistensi lokal, dan jalur data operasional E-Rekap.
        </p>
      </div>

      {/* THE HARDWARE-STYLE WORKBENCH STAGE (Bukan Grid Card Kotak-Kotak Biasa!) */}
      <div className="rounded-2xl border-2 border-[#0A3D26]/25 bg-[#051C12] text-white shadow-[0_20px_50px_-12px_rgba(5,28,18,0.5)] overflow-hidden">
        {/* Top Control Bar: Mechanical Selector Ribbon */}
        <div className="border-b border-[#0A3D26]/60 bg-[#03130C] px-3 py-2.5 sm:px-5 sm:py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#A3E635] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#A3E635]">
                ENGINEERING TELEMETRY DOCK
              </span>
            </div>
            <span className="hidden sm:inline font-mono text-[10px] text-emerald-300/60">
              KLIK MODUL UNTUK INSPEKSI LANGSUNG
            </span>
          </div>

          {/* Tactile Hardware Selector Pads (Horizontal Scroll on Mobile, Grid on Desktop) */}
          <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none select-none">
            {TECH_NODES.map((node, idx) => {
              const NodeIcon = node.Icon;
              const isActive = activeIdx === idx;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`flex-shrink-0 flex items-center sm:flex-col justify-center sm:justify-start gap-2 sm:gap-1.5 rounded-lg px-2.5 py-2 sm:p-2 text-left transition-all duration-150 ${
                    isActive
                      ? "bg-[#0A3D26] text-white ring-1 ring-[#A3E635] shadow-[0_0_12px_rgba(163,230,53,0.2)]"
                      : "bg-[#072518]/60 text-emerald-200/70 hover:bg-[#072518] hover:text-white border border-[#0A3D26]/40"
                  }`}
                >
                  <div className="h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center shrink-0">
                    <NodeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-mono text-[11px] sm:text-[10px] font-bold truncate">
                      {node.name}
                    </span>
                  </div>
                  {isActive && (
                    <span className="hidden sm:block h-1 w-full bg-[#A3E635] rounded-full mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* The Live Diagnostic Screen (Inspector Display Bay) */}
        <div className="p-4 sm:p-7 relative overflow-hidden bg-gradient-to-b from-[#072417] to-[#04160E]">
          {/* Subtle Technical Grid Lines Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(#A3E635 1px, transparent 1px), linear-gradient(90deg, #A3E635 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 space-y-6">
            {/* Display Header Status */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0A3D26]/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] sm:text-xs font-bold text-[#A3E635] bg-[#0A3D26] px-2.5 py-0.5 rounded border border-[#A3E635]/30">
                  {activeNode.layer}
                </span>
                <span className="font-mono text-[10px] text-emerald-300/70">
                  SYS_ID // 0{activeIdx + 1}
                </span>
              </div>
              <div className="font-mono text-[10px] text-emerald-300/80">
                VERSI: <span className="font-bold text-white">{activeNode.version}</span>
              </div>
            </div>

            {/* Main Stage: Asymmetrical Dynamic Inspection */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-start">
              {/* Left Column: Official Logo Chamber (Glow in True Brand Color) */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl bg-[#03140C] border border-[#0A3D26]/70 shadow-inner text-center">
                <div
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl flex items-center justify-center p-3 mb-3 border border-white/10 transition-transform duration-300 hover:scale-110"
                  style={{
                    backgroundColor: "rgba(10, 61, 38, 0.4)",
                    boxShadow: `0 0 24px -4px ${activeNode.brandColor}33`,
                  }}
                >
                  <ActiveIcon className="h-12 w-12 sm:h-14 sm:w-14" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {activeNode.name}
                </h3>
                <span className="font-mono text-[11px] font-semibold text-[#A3E635] mt-1">
                  {activeNode.tagline}
                </span>
              </div>

              {/* Right Column: Architectural Role & Precision Spec Table */}
              <div className="md:col-span-8 space-y-4">
                <div>
                  <h4 className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-300/70 mb-1.5">
                    Peran Operasional di E-Rekap:
                  </h4>
                  <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-sans">
                    {activeNode.description}
                  </p>
                </div>

                {/* Technical Spec Matrix Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="rounded-lg bg-[#03140C]/90 border border-[#0A3D26]/70 p-3">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-emerald-300/60">
                      BENCHMARK
                    </span>
                    <span className="block font-mono text-xs sm:text-sm font-bold text-[#A3E635] mt-0.5">
                      {activeNode.specBenchmark}
                    </span>
                  </div>

                  <div className="rounded-lg bg-[#03140C]/90 border border-[#0A3D26]/70 p-3">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-emerald-300/60">
                      FOOTPRINT
                    </span>
                    <span className="block font-mono text-xs sm:text-sm font-bold text-white mt-0.5">
                      {activeNode.specFootprint}
                    </span>
                  </div>

                  <div className="rounded-lg bg-[#03140C]/90 border border-[#0A3D26]/70 p-3">
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-emerald-300/60">
                      IMPLEMENTASI
                    </span>
                    <span className="block font-mono text-xs sm:text-sm font-bold text-white mt-0.5 truncate">
                      {activeNode.specImplementation}
                    </span>
                  </div>
                </div>

                {/* Pipeline Connection Hook */}
                <div className="flex items-center gap-2 rounded-lg bg-[#0A3D26]/40 border border-[#A3E635]/20 px-3.5 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635] shrink-0" />
                  <span className="font-mono text-[10px] sm:text-xs text-emerald-200">
                    <strong className="text-[#A3E635]">Jalur Data:</strong> {activeNode.pipelineConnection}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hardware Strip: Verified Production Pipeline */}
        <div className="border-t border-[#0A3D26]/60 bg-[#020F09] px-4 py-2.5 sm:px-6 sm:py-3 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-xs font-mono text-emerald-300/70 select-none">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#15803D]" />
            <span className="font-bold text-white">E-Rekap Production Engine</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#A3E635]">Next.js 16</span>
            <span>→</span>
            <span className="text-[#A3E635]">React 19 SSR</span>
            <span>→</span>
            <span className="text-[#A3E635]">SQLite WAL</span>
            <span>→</span>
            <span className="text-[#A3E635]">A4 XLSX & Video</span>
          </div>
        </div>
      </div>
    </section>
  );
}
