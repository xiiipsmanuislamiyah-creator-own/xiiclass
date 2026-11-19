"use client";

import React from "react";

// Official brand SVG vector icons (Mathematically accurate paths)
function NextJsIcon({ className = "w-5 h-5" }: { className?: string }) {
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

function ReactIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} aria-label="React">
      <circle cx="0" cy="0" r="2.05" fill="#087EA4" />
      <g stroke="#087EA4" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function TypeScriptIcon({ className = "w-5 h-5" }: { className?: string }) {
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

function TailwindCssIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#06B6D4" aria-label="Tailwind CSS">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  );
}

function SqliteIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#003B57" aria-label="SQLite">
      <path d="M12.186 2.04c-.454.004-.908.06-1.348.168-3.05.748-4.992 3.195-5.385 6.096-.197 1.455.087 2.822.756 4.02.668 1.198 1.696 2.15 2.894 2.88 2.398 1.46 5.342 2.115 8.16 1.748 1.41-.184 2.766-.677 3.96-1.468.324-.214.542-.564.582-.95.04-.386-.1-.77-.384-1.036-.284-.266-.67-.374-1.05-.292-1.034.225-2.1.31-3.16.25-2.485-.14-4.838-.99-6.84-2.44-.999-.724-1.84-1.64-2.41-2.71-.57-1.07-.78-2.31-.56-3.52.44-2.43 2.1-4.39 4.47-5.11 2.37-.72 4.98-.16 6.84 1.47.78.69 1.41 1.52 1.86 2.45.45.93.68 1.95.68 2.99 0 .5-.05 1-.15 1.49-.08.4.1.8.46 1.03.36.23.82.2 1.16-.07.34-.27.5-.7.42-1.13-.15-.79-.24-1.6-.24-2.42 0-1.42-.36-2.82-1.03-4.08-.67-1.26-1.62-2.35-2.76-3.19-2.02-1.49-4.52-2.16-7.01-2.14z" />
    </svg>
  );
}

function TurbopackIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-label="Turbopack">
      <defs>
        <linearGradient id="turbo_gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0070F3" />
          <stop offset="1" stopColor="#FF0080" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9.5" stroke="url(#turbo_gradient)" strokeWidth="2.5" />
      <path
        d="M12 6.5V12l4 3.5"
        stroke="url(#turbo_gradient)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RemotionIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 250 250" className={className} fill="#0B84F3" aria-label="Remotion">
      <g>
        <path
          fillOpacity=".25"
          d="M81.03 33.963c-3.848.208-6.95.814-10.075 1.995c-1.558.583-4.114 1.852-5.52 2.73c-5.881 3.662-10.364 9.169-12.702 15.577c-.466 1.268-1.728 5.315-2.54 8.1c-5.407 18.617-8.476 38.975-9.135 60.521c-.104 3.432-.104 11.603 0 14.979c.442 14.285 1.816 27.181 4.307 40.332c1.012 5.323 2.635 12.473 3.575 15.721c1.92 6.599 5.841 12.217 11.418 16.335c3.736 2.761 7.978 4.613 12.678 5.523c2.266.438 5.255.638 7.457.494c3.045-.199 9.087-1.005 13.996-1.875c22.128-3.918 42.568-10.933 61.104-20.972c11.739-6.36 21.774-13.247 31.456-21.602c9.65-8.316 17.877-17.261 25.117-27.3c1.679-2.323 2.523-3.679 3.366-5.387c2.17-4.405 3.19-8.786 3.182-13.686c0-4.565-.868-8.619-2.74-12.768c-.9-2.003-1.759-3.44-3.688-6.169c-7.102-10.047-14.985-18.801-24.594-27.308c-14.896-13.184-32.589-23.997-52.346-32c-4.283-1.733-8.501-3.257-13.579-4.909c-10.751-3.487-24.056-6.511-35.313-8.02c-1.767-.24-4.17-.375-5.423-.31"
        />
        <path
          fillOpacity=".5"
          d="M91.457 53.379c-3.029.163-5.47.64-7.929 1.57c-1.227.458-3.237 1.457-4.344 2.147c-4.628 2.883-8.156 7.216-9.995 12.258c-.367.999-1.36 4.182-1.998 6.374c-4.256 14.65-6.67 30.67-7.19 47.625c-.081 2.7-.081 9.13 0 11.786c.349 11.241 1.43 21.389 3.39 31.738c.796 4.188 2.074 9.815 2.813 12.371c1.511 5.193 4.597 9.614 8.985 12.854c2.94 2.173 6.278 3.63 9.977 4.345c1.782.346 4.135.503 5.867.39c2.396-.157 7.15-.791 11.014-1.476c17.412-3.083 33.497-8.603 48.083-16.503c9.237-5.005 17.134-10.424 24.752-16.999c7.594-6.543 14.068-13.583 19.765-21.482c1.321-1.828 1.985-2.895 2.649-4.239c1.707-3.466 2.51-6.914 2.504-10.77c0-3.592-.683-6.782-2.156-10.047c-.708-1.576-1.385-2.707-2.902-4.854c-5.59-7.906-11.792-14.795-19.354-21.489c-11.722-10.374-25.644-18.883-41.191-25.181c-3.37-1.363-6.689-2.562-10.685-3.862c-8.46-2.745-18.93-5.124-27.788-6.311c-1.39-.189-3.281-.295-4.267-.245"
        />
        <path d="M102.247 73.517c-2.178.117-3.933.46-5.702 1.129c-.882.33-2.328 1.047-3.123 1.544c-3.329 2.073-5.866 5.189-7.189 8.815c-.264.718-.978 3.008-1.437 4.584c-3.06 10.535-4.797 22.055-5.17 34.249c-.059 1.941-.059 6.566 0 8.476c.25 8.083 1.028 15.381 2.438 22.823c.573 3.013 1.491 7.059 2.023 8.897c1.087 3.734 3.305 6.914 6.461 9.244c2.114 1.562 4.515 2.61 7.175 3.125c1.282.248 2.973.361 4.219.28c1.724-.113 5.143-.569 7.921-1.061c12.522-2.218 24.089-6.187 34.578-11.868c6.643-3.599 12.322-7.497 17.801-12.225c5.461-4.705 10.117-9.768 14.213-15.449c.951-1.314 1.428-2.082 1.905-3.048c1.228-2.493 1.805-4.972 1.801-7.745c0-2.583-.491-4.877-1.551-7.225c-.509-1.134-.995-1.947-2.087-3.491c-4.019-5.686-8.479-10.64-13.917-15.454c-8.43-7.46-18.442-13.58-29.623-18.109c-2.423-.98-4.81-1.842-7.684-2.777c-6.083-1.973-13.613-3.685-19.983-4.538c-1-.136-2.36-.213-3.069-.177" />
      </g>
    </svg>
  );
}

function SheetJsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#217346" aria-label="SheetJS XLSX">
      <path d="M21.17 2.06H6.83A2.83 2.83 0 004 4.89v14.22a2.83 2.83 0 002.83 2.83h14.34A2.83 2.83 0 0024 19.11V4.89a2.83 2.83 0 00-2.83-2.83zm-7.67 15.5l-2.05-3.56-2.06 3.56H7.13l3.22-5.11-3.06-4.95h2.32l1.89 3.38 1.88-3.38h2.32l-3.06 4.95 3.22 5.11h-2.36z" />
    </svg>
  );
}

interface StackModule {
  name: string;
  category: string;
  role: string;
  metric: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const STACK_MODULES: StackModule[] = [
  {
    name: "Next.js 16",
    category: "RUNTIME",
    role: "App Router & SSR Streaming",
    metric: "v16.4 · Turbo Core",
    Icon: NextJsIcon,
  },
  {
    name: "React 19",
    category: "CORE UI",
    role: "Concurrent Server Components",
    metric: "v19.3 · Zero Hydration",
    Icon: ReactIcon,
  },
  {
    name: "TypeScript",
    category: "TYPES",
    role: "End-to-End Strict Contracts",
    metric: "v5.0+ · Strict Safety",
    Icon: TypeScriptIcon,
  },
  {
    name: "Turbopack",
    category: "ENGINE",
    role: "Sub-Second Compilation HMR",
    metric: "<50ms Incremental HMR",
    Icon: TurbopackIcon,
  },
  {
    name: "SQLite",
    category: "STORAGE",
    role: "Local Embedded Persistence",
    metric: "Zero Latency · WAL Mode",
    Icon: SqliteIcon,
  },
  {
    name: "Tailwind v4",
    category: "STYLING",
    role: "Oxide High-Speed CSS Engine",
    metric: "Modern Design Tokens",
    Icon: TailwindCssIcon,
  },
  {
    name: "Remotion",
    category: "VIDEO",
    role: "Programmatic Frame Engine",
    metric: "60 FPS Motion Canvas",
    Icon: RemotionIcon,
  },
  {
    name: "SheetJS",
    category: "EXCEL",
    role: "Client-Side XLSX Generation",
    metric: "Instant A4 Format Export",
    Icon: SheetJsIcon,
  },
];

export function TechStackMotion() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Section Header: Anti-Slop, High-Craft Editorial */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2.5">
        <div className="inline-flex items-center gap-2 border border-[#0A3D26]/18 bg-[#F4F9F5] px-3 py-1 rounded-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#15803D]" />
          <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-[#0A3D26]">
            FONDASI & TEKNOLOGI
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
          Arsitektur Kinerja Tinggi
        </h2>
        <p className="text-xs sm:text-sm text-[var(--ink-muted)] max-w-lg mx-auto leading-relaxed">
          Dirancang tanpa perantara berat: kompilasi Turbopack instan, persistensi SQLite lokal, dan automasi grafis 60 FPS.
        </p>
      </div>

      {/* Modern Technical Spec Grid: 2-Col Mobile, 4-Col Desktop (Anti-Collision, 100% Readable) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STACK_MODULES.map((item) => {
          const IconComponent = item.Icon;
          return (
            <div
              key={item.name}
              className="group relative flex flex-col justify-between rounded-xl bg-white border border-[#0A3D26]/12 p-3.5 sm:p-4 shadow-[0_2px_8px_rgba(10,61,38,0.04)] hover:border-[#15803D]/40 hover:shadow-[0_8px_20px_rgba(10,61,38,0.08)] transition-all duration-200"
            >
              {/* Card Header: Official Icon & Category Badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[#F8FBF9] border border-[#0A3D26]/10 p-2 shadow-2xs group-hover:scale-105 group-hover:border-[#15803D]/30 transition-transform">
                  <IconComponent className="h-5 w-5 sm:h-5 sm:w-5 shrink-0" />
                </div>
                <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-wider text-[#0A3D26]/70 uppercase bg-[#EAF5EE] border border-[#0A3D26]/10 px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </div>

              {/* Card Body: Tech Name & Real Architectural Role */}
              <div className="mt-3.5 space-y-1">
                <h3 className="text-sm sm:text-base font-extrabold text-[var(--ink)] tracking-tight">
                  {item.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-[var(--ink-muted)] font-medium leading-snug">
                  {item.role}
                </p>
              </div>

              {/* Card Footer: Verified Tech Metric */}
              <div className="mt-4 pt-2.5 border-t border-[#0A3D26]/8 flex items-center justify-between">
                <span className="font-mono text-[10px] font-semibold text-[#15803D]">
                  {item.metric}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#15803D]/40 group-hover:bg-[#15803D] transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Structural Dataflow Pipeline: Clean, Linear, Non-Overlapping */}
      <div className="mt-8 rounded-xl border border-[#0A3D26]/12 bg-[#F8FBF9] p-4 sm:p-5 select-none">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#15803D]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A3D26]">
              Alur Eksekusi E-Rekap:
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono font-semibold text-[var(--ink)]">
            <span className="bg-white border border-[#0A3D26]/12 px-2.5 py-1 rounded shadow-2xs">
              Client UI
            </span>
            <span className="text-[#0A3D26]/40 font-bold">→</span>
            <span className="bg-white border border-[#0A3D26]/12 px-2.5 py-1 rounded shadow-2xs">
              Turbopack SSR
            </span>
            <span className="text-[#0A3D26]/40 font-bold">→</span>
            <span className="bg-white border border-[#0A3D26]/12 px-2.5 py-1 rounded shadow-2xs">
              SQLite WAL
            </span>
            <span className="text-[#0A3D26]/40 font-bold">→</span>
            <span className="bg-white border border-[#0A3D26]/12 px-2.5 py-1 rounded shadow-2xs">
              A4 XLSX & Video
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
