"use client";

import React, { useEffect, useRef } from "react";

// Official brand SVG vector icons (Mathematically accurate paths)
function NextJsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" className={className} fill="none" aria-label="Next.js">
      <circle cx="90" cy="90" r="90" fill="#0F172A" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="url(#paint0_linear_next_clean)"
      />
      <rect fill="url(#paint1_linear_next_clean)" height="72" width="12" x="115" y="54" />
      <defs>
        <linearGradient
          id="paint0_linear_next_clean"
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
          id="paint1_linear_next_clean"
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

// Official SQLite Logo (Devicon: Classic Blue Database Container & Cyan Feather)
function SqliteIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} aria-label="SQLite">
      <defs>
        <linearGradient id="sqlite-official-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#95D7F4" offset="0%" />
          <stop stopColor="#0F7FCC" offset="92%" />
          <stop stopColor="#0F7FCC" offset="100%" />
        </linearGradient>
      </defs>
      <path
        d="M69.5 99.176c-.059-.73-.094-1.2-.094-1.2S67.2 83.087 64.57 78.642c-.414-.707.043-3.594 1.207-7.88.68 1.169 3.54 6.192 4.118 7.81.648 1.824.78 2.347.78 2.347s-1.57-8.082-4.144-12.797a162.286 162.286 0 012.004-6.265c.973 1.71 3.313 5.859 3.828 7.3.102.293.192.543.27.774.023-.137.05-.274.074-.414-.59-2.504-1.75-6.86-3.336-10.082 3.52-18.328 15.531-42.824 27.84-53.754H16.9c-5.387 0-9.789 4.406-9.789 9.789v88.57c0 5.383 4.406 9.789 9.79 9.789h52.897a118.657 118.657 0 01-.297-14.652"
        fill="#0B7FCC"
      />
      <path
        d="M65.777 70.762c.68 1.168 3.54 6.188 4.117 7.809.649 1.824.781 2.347.781 2.347s-1.57-8.082-4.144-12.797a164.535 164.535 0 012.004-6.27c.887 1.567 2.922 5.169 3.652 6.872l.082-.961c-.648-2.496-1.633-5.766-2.898-8.328 3.242-16.871 13.68-38.97 24.926-50.898H16.899a6.94 6.94 0 00-6.934 6.933v82.11c17.527-6.731 38.664-12.88 56.855-12.614-.672-2.605-1.441-4.96-2.25-6.324-.414-.707.043-3.597 1.207-7.879"
        fill="url(#sqlite-official-grad)"
      />
      <path
        d="M115.95 2.781c-5.5-4.906-12.164-2.933-18.734 2.899a44.347 44.347 0 00-2.914 2.859c-11.25 11.926-21.684 34.023-24.926 50.895 1.262 2.563 2.25 5.832 2.894 8.328.168.64.32 1.242.442 1.754.285 1.207.437 1.996.437 1.996s-.101-.383-.515-1.582c-.078-.23-.168-.484-.27-.773-.043-.125-.105-.274-.172-.434-.734-1.703-2.765-5.305-3.656-6.867-.762 2.25-1.437 4.36-2.004 6.265 2.578 4.715 4.149 12.797 4.149 12.797s-.137-.523-.782-2.347c-.578-1.621-3.441-6.64-4.117-7.809-1.164 4.281-1.625 7.172-1.207 7.88.809 1.362 1.574 3.722 2.25 6.323 1.524 5.867 2.586 13.012 2.586 13.012s.031.469.094 1.2a118.653 118.653 0 00.297 14.651c.504 6.11 1.453 11.363 2.664 14.172l.828-.449c-1.781-5.535-2.504-12.793-2.188-21.156.48-12.793 3.422-28.215 8.856-44.289 9.191-24.27 21.938-43.738 33.602-53.035-10.633 9.602-25.023 40.684-29.332 52.195-4.82 12.891-8.238 24.984-10.301 36.574 3.55-10.863 15.047-15.53 15.047-15.53s5.637-6.958 12.227-16.888c-3.95.903-10.43 2.442-12.598 3.352-3.2 1.344-4.067 1.8-4.067 1.8s10.371-6.312 19.27-9.171c12.234-19.27 25.562-46.648 12.141-58.621"
        fill="#003956"
      />
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
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-label="Tailwind CSS">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C4.337 13.382 2.976 12 6.001 12z"
        fill="#38BDF8"
      />
    </svg>
  );
}

function TurbopackIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-label="Turbopack">
      <defs>
        <linearGradient id="turbo_gradient_tech_light" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0070F3" />
          <stop offset="1" stopColor="#FF0080" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9.5" stroke="url(#turbo_gradient_tech_light)" strokeWidth="2.5" />
      <path
        d="M12 6.5V12l4 3.5"
        stroke="url(#turbo_gradient_tech_light)"
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

function SheetJsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#107C41" aria-label="SheetJS XLSX">
      <path d="M21.17 2.06H6.83A2.83 2.83 0 004 4.89v14.22a2.83 2.83 0 002.83 2.83h14.34A2.83 2.83 0 0024 19.11V4.89a2.83 2.83 0 00-2.83-2.83zm-7.67 15.5l-2.05-3.56-2.06 3.56H7.13l3.22-5.11-3.06-4.95h2.32l1.89 3.38 1.88-3.38h2.32l-3.06 4.95 3.22 5.11h-2.36z" />
    </svg>
  );
}

export interface TechNode {
  id: string;
  name: string;
  badge: string;
  ringIndex: number;
  initialPhase: number;
  speed: number;
  Icon: React.ComponentType<{ className?: string }>;
}

const TECH_NODES: TechNode[] = [
  {
    id: "next",
    name: "Next.js 16",
    badge: "App Router",
    ringIndex: 0,
    initialPhase: 0.2,
    speed: 0.012,
    Icon: NextJsIcon,
  },
  {
    id: "react",
    name: "React 19",
    badge: "Server Comps",
    ringIndex: 0,
    initialPhase: 0.2 + (2 * Math.PI) / 3,
    speed: 0.012,
    Icon: ReactIcon,
  },
  {
    id: "sqlite",
    name: "SQLite Local",
    badge: "WAL Mode",
    ringIndex: 0,
    initialPhase: 0.2 + (4 * Math.PI) / 3,
    speed: 0.012,
    Icon: SqliteIcon,
  },
  {
    id: "turbopack",
    name: "Turbopack",
    badge: "Rust Engine",
    ringIndex: 1,
    initialPhase: 0.4,
    speed: 0.011,
    Icon: TurbopackIcon,
  },
  {
    id: "typescript",
    name: "TypeScript",
    badge: "Strict Safe",
    ringIndex: 1,
    initialPhase: Math.PI + 0.4,
    speed: 0.011,
    Icon: TypeScriptIcon,
  },
  {
    id: "tailwind",
    name: "Tailwind v4",
    badge: "Oxide CSS",
    ringIndex: 2,
    initialPhase: 0.8,
    speed: 0.012,
    Icon: TailwindCssIcon,
  },
  {
    id: "sheetjs",
    name: "SheetJS",
    badge: "A4 XLSX",
    ringIndex: 2,
    initialPhase: 0.8 + (2 * Math.PI) / 3,
    speed: 0.012,
    Icon: SheetJsIcon,
  },
  {
    id: "remotion",
    name: "Remotion",
    badge: "60 FPS Video",
    ringIndex: 2,
    initialPhase: 0.8 + (4 * Math.PI) / 3,
    speed: 0.012,
    Icon: RemotionIcon,
  },
];

// Mathematical 3D Matrix Helpers
const RING_ANGLES = [-55 * Math.PI / 180, 0, 55 * Math.PI / 180];
const RING_COLORS = [
  "rgba(15, 81, 50, 0.35)",
  "rgba(10, 61, 38, 0.40)",
  "rgba(15, 81, 50, 0.35)",
];
const RING_BEAM_SPEEDS = [2.4, 2.7, 2.5]; // All positive: coherent and forward-moving

function transform3D(
  x0: number,
  y0: number,
  z0: number,
  yaw: number,
  pitch: number,
  fov = 550
) {
  const cosY = Math.cos(yaw),
    sinY = Math.sin(yaw);
  const x1 = x0 * cosY + z0 * sinY;
  const y1 = y0;
  const z1 = z0 * cosY - x0 * sinY;

  const cosP = Math.cos(pitch),
    sinP = Math.sin(pitch);
  const x2 = x1;
  const y2 = y1 * cosP - z1 * sinP;
  const z2 = z1 * cosP + y1 * sinP;

  const scale = fov / (fov + z2);
  return { x: x2, y: y2, z: z2, scale };
}

function getOrbitPoint3D(
  semiA: number,
  semiB: number,
  rotAngle: number,
  t: number
) {
  const ex = semiA * Math.cos(t);
  const ey = semiB * Math.sin(t);
  const x0 = ex * Math.cos(rotAngle) - ey * Math.sin(rotAngle);
  const y0 = ex * Math.sin(rotAngle) + ey * Math.cos(rotAngle);
  const z0 = -semiA * Math.sin(t) * 0.7;
  return { x: x0, y: y0, z: z0 };
}

export function TechStackMotion() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stageWidth = stage.clientWidth || 340;
    let stageHeight = stage.clientHeight || 340;
    let dpr = window.devicePixelRatio || 1;

    function resize() {
      if (!stage || !canvas || !ctx) return;
      const rect = stage.getBoundingClientRect();
      stageWidth = rect.width || 340;
      stageHeight = rect.height || 340;
      dpr = window.devicePixelRatio || 1;
      canvas.width = stageWidth * dpr;
      canvas.height = stageHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // Interactive Drag / Swipe camera controls
    let isDragging = false;
    let startX = 0,
      startY = 0;
    let camYaw = 0;
    let camPitch = 0;
    let targetYaw = 0;
    let targetPitch = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      stage.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      startX = e.clientX;
      startY = e.clientY;
      targetYaw += dx * 0.008;
      targetPitch = Math.max(
        -Math.PI * 0.44,
        Math.min(Math.PI * 0.44, targetPitch + dy * 0.008)
      );
    };

    const onPointerEnd = (e: PointerEvent) => {
      if (isDragging) {
        isDragging = false;
        try {
          stage.releasePointerCapture(e.pointerId);
        } catch (_) {}
        // SETELAH DIGESER: Otomatis kembali ke posisi awal yang simetris, pas, dan nyaman dilihat
        targetYaw = 0;
        targetPitch = 0;
      }
    };

    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", onPointerEnd);
    stage.addEventListener("pointercancel", onPointerEnd);
    stage.addEventListener("pointerleave", onPointerEnd);

    // Spherical Fibonacci Points for 3D ASCII Globe
    const NUM_GLYPHS = 460;
    const spherePoints: {
      nx: number;
      ny: number;
      nz: number;
      isEquator: boolean;
      idx: number;
    }[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < NUM_GLYPHS; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / NUM_GLYPHS);
      const nx = Math.cos(theta) * Math.sin(phi);
      const ny = Math.cos(phi);
      const nz = Math.sin(theta) * Math.sin(phi);
      const isEquator = Math.abs(ny) < 0.14;
      spherePoints.push({ nx, ny, nz, isEquator, idx: i });
    }

    // Micro-Sparks for subtle spatial radiance (Stardust / Quantum atmosphere)
    const NUM_SPARKS = 26;
    const sparks: {
      theta: number;
      distRatio: number;
      speed: number;
      zRatio: number;
      baseAlpha: number;
      size: number;
      seed: number;
    }[] = [];
    for (let s = 0; s < NUM_SPARKS; s++) {
      sparks.push({
        theta: Math.random() * Math.PI * 2,
        distRatio: 0.85 + Math.random() * 0.75,
        speed: 0.003 + Math.random() * 0.005,
        zRatio: (Math.random() - 0.5) * 1.2,
        baseAlpha: 0.18 + Math.random() * 0.28,
        size: 0.6 + Math.random() * 0.7,
        seed: Math.random() * 10,
      });
    }

    const nodePhases = TECH_NODES.map((n) => n.initialPhase);

    let sphereAngleY = 0;
    let globalTime = 0;
    let animId: number;

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, stageWidth, stageHeight);
      const centerX = stageWidth / 2;
      const centerY = stageHeight / 2;

      const semiA = stageWidth * 0.41;
      const semiB = semiA * 0.37;
      const sphereRadius = semiA * 0.36;

      // Smooth camera interpolation: saat dilepas, kembali halus ke 0, 0
      camYaw += (targetYaw - camYaw) * 0.08;
      camPitch += (targetPitch - camPitch) * 0.08;

      // CINCIN STATIS: TIDAK ADA rotasi otomatis cincin kamera. Cincin tetap diam & rapi!
      sphereAngleY += 0.01;
      globalTime += 0.016;

      // ==========================================
      // 0. BLUEPRINT RETICLE & SCHEMATIC GRID
      // Menghilangkan kesan kosong dengan watermark teknis arsitektur transparan
      // ==========================================
      ctx.save();
      // Outer calibration circle (Garis ukur presisi luar)
      ctx.strokeStyle = "rgba(15, 81, 50, 0.09)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, semiA * 1.08, 0, Math.PI * 2);
      ctx.stroke();

      // Inner calibration circle (Garis putus-putus presisi dalam)
      ctx.strokeStyle = "rgba(15, 81, 50, 0.07)";
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, semiA * 0.65, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      // Crosshair coordinate lines (Sumbu koordinat tipis)
      ctx.strokeStyle = "rgba(15, 81, 50, 0.08)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      // Horizontal axis
      ctx.moveTo(centerX - semiA * 1.16, centerY);
      ctx.lineTo(centerX - sphereRadius * 1.15, centerY);
      ctx.moveTo(centerX + sphereRadius * 1.15, centerY);
      ctx.lineTo(centerX + semiA * 1.16, centerY);
      // Vertical axis
      ctx.moveTo(centerX, centerY - semiA * 1.16);
      ctx.lineTo(centerX, centerY - sphereRadius * 1.15);
      ctx.moveTo(centerX, centerY + sphereRadius * 1.15);
      ctx.lineTo(centerX, centerY + semiA * 1.16);
      ctx.stroke();

      // Coordinate degree markers (000°, 090°, 180°, 270°)
      ctx.font = '500 7.5px "JetBrains Mono", monospace';
      ctx.fillStyle = "rgba(15, 81, 50, 0.22)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("000°", centerX + semiA * 1.12, centerY - 8);
      ctx.fillText("180°", centerX - semiA * 1.12, centerY - 8);
      ctx.fillText("090°", centerX + 12, centerY + semiA * 1.12);
      ctx.fillText("270°", centerX + 12, centerY - semiA * 1.12);

      // Corner blueprint registration marks (+)
      const cornerOffset = stageWidth * 0.44;
      const crossSz = 4.5;
      [
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ].forEach(([sx, sy]) => {
        const cx = centerX + sx * cornerOffset;
        const cy = centerY + sy * cornerOffset;
        ctx.strokeStyle = "rgba(15, 81, 50, 0.14)";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(cx - crossSz, cy);
        ctx.lineTo(cx + crossSz, cy);
        ctx.moveTo(cx, cy - crossSz);
        ctx.lineTo(cx, cy + crossSz);
        ctx.stroke();
      });
      ctx.restore();

      // ==========================================
      // 1. SPATIAL MICRO-SPARKS RADIANCE (Stardust Atmosfir)
      // Partikel halus melayang lembut mengisi kedalaman ruang
      // ==========================================
      sparks.forEach((sp) => {
        sp.theta += sp.speed;
        const dist = sphereRadius * sp.distRatio;
        const x = Math.cos(sp.theta) * dist;
        const y = Math.sin(sp.theta) * (dist * 0.78);
        const z = sp.zRatio * sphereRadius;
        const p = transform3D(x, y, z, camYaw, camPitch);
        const px = centerX + p.x * p.scale;
        const py = centerY + p.y * p.scale;

        const flicker = 0.7 + 0.3 * Math.sin(globalTime * 3 + sp.seed);
        const alpha =
          sp.baseAlpha *
          flicker *
          (0.5 + 0.5 * ((p.z + semiA * 0.7) / (semiA * 1.4)));

        ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, sp.size * p.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      // ==========================================
      // 2. 3 RUTHERFORD ATOMIC ORBIT RINGS & DUAL PHOTON PULSE
      // Foton ganda meluncur seimbang di seberang orbit (180° phase)
      // ==========================================
      RING_ANGLES.forEach((rotAngle, idx) => {
        ctx.strokeStyle = RING_COLORS[idx];
        ctx.lineWidth = 1.35;
        ctx.beginPath();
        const STEPS = 90;
        for (let s = 0; s <= STEPS; s++) {
          const t = (s / STEPS) * Math.PI * 2;
          const pt3D = getOrbitPoint3D(semiA, semiB, rotAngle, t);
          const p = transform3D(pt3D.x, pt3D.y, pt3D.z, camYaw, camPitch);
          const px = centerX + p.x * p.scale;
          const py = centerY + p.y * p.scale;
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // DUAL PHOTON PULSES (Foton primer & foton sekunder di seberangnya, meluncur searah)
        const leadT =
          (globalTime * RING_BEAM_SPEEDS[idx] + idx * 2.1) % (Math.PI * 2);
        const dualPulses = [leadT, (leadT + Math.PI) % (Math.PI * 2)];

        dualPulses.forEach((pulseT, pIdx) => {
          const isSecondary = pIdx === 1;
          const TRAIL_LEN = isSecondary ? 12 : 16;
          for (let j = 0; j < TRAIL_LEN; j++) {
            const segT = pulseT - j * 0.038;
            const pt3D = getOrbitPoint3D(semiA, semiB, rotAngle, segT);
            const p = transform3D(pt3D.x, pt3D.y, pt3D.z, camYaw, camPitch);
            const px = centerX + p.x * p.scale;
            const py = centerY + p.y * p.scale;

            const alpha =
              Math.pow(1 - j / TRAIL_LEN, 1.8) * (isSecondary ? 0.65 : 0.85);
            const sz =
              (isSecondary ? 0.6 : 0.75) * (1 - j / TRAIL_LEN) + 0.22;
            ctx.fillStyle = `rgba(15, 81, 50, ${alpha})`;
            ctx.beginPath();
            ctx.arc(px, py, sz, 0, Math.PI * 2);
            ctx.fill();
          }

          // Head photon bead
          const head3D = getOrbitPoint3D(semiA, semiB, rotAngle, pulseT);
          const pH = transform3D(head3D.x, head3D.y, head3D.z, camYaw, camPitch);
          const pxH = centerX + pH.x * pH.scale;
          const pyH = centerY + pH.y * pH.scale;

          ctx.fillStyle = "#0A3D26";
          ctx.beginPath();
          ctx.arc(pxH, pyH, isSecondary ? 1.3 : 1.6, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = isSecondary
            ? "rgba(16, 185, 129, 0.55)"
            : "rgba(16, 185, 129, 0.8)";
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.arc(pxH, pyH, isSecondary ? 2.6 : 3.2, 0, Math.PI * 2);
          ctx.stroke();
        });
      });

      // ==========================================
      // 3. CRISP OPTICAL EMISSION (Soft ambient wash)
      // ==========================================
      const subtleAura = ctx.createRadialGradient(
        centerX,
        centerY,
        sphereRadius * 0.2,
        centerX,
        centerY,
        sphereRadius * 1.05
      );
      subtleAura.addColorStop(0, "rgba(16, 185, 129, 0.08)");
      subtleAura.addColorStop(0.85, "rgba(15, 81, 50, 0.03)");
      subtleAura.addColorStop(1, "rgba(15, 81, 50, 0)");
      ctx.fillStyle = subtleAura;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius * 1.05, 0, Math.PI * 2);
      ctx.fill();

      // Sharp radiant photonic rim
      ctx.strokeStyle = "rgba(15, 81, 50, 0.28)";
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius * 1.02, 0, Math.PI * 2);
      ctx.stroke();

      // ==========================================
      // 4. RENDER CORE SPHERE (3D ASCII ART)
      // ==========================================
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const tilt = 0.22;

      const cosY = Math.cos(sphereAngleY);
      const sinY = Math.sin(sphereAngleY);
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      const projected = spherePoints.map((p) => {
        const x0 = p.nx * sphereRadius;
        const y0 = p.ny * sphereRadius;
        const z0 = p.nz * sphereRadius;

        const x1 = x0 * cosY - z0 * sinY;
        const z1 = z0 * cosY + x0 * sinY;
        const y2 = y0 * cosT - z1 * sinT;
        const z2 = z1 * cosT + y0 * sinT;

        const camPt = transform3D(x1, y2, z2, camYaw, camPitch);
        const px = centerX + camPt.x * camPt.scale;
        const py = centerY + camPt.y * camPt.scale;
        const normZ = (camPt.z + sphereRadius) / (2 * sphereRadius);

        return {
          px,
          py,
          z: camPt.z,
          normZ,
          isEquator: p.isEquator,
          idx: p.idx,
        };
      });

      projected.sort((a, b) => a.z - b.z);

      projected.forEach((p) => {
        const normZ = Math.max(0, Math.min(1, p.normZ));
        let char: string;
        if (p.isEquator) {
          char = p.idx % 2 === 0 ? "1" : "0";
        } else if (normZ > 0.85) {
          char = ["#", "@", "%", "*"][p.idx % 4];
        } else if (normZ > 0.6) {
          char = ["+", "*", "=", "x"][p.idx % 4];
        } else if (normZ > 0.35) {
          char = [":", "-", "~"][p.idx % 3];
        } else {
          char = "·";
        }

        const fontSize = Math.floor(5.5 + normZ * 4.5);
        ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;

        const alpha = 0.3 + Math.pow(normZ, 1.2) * 0.7;
        if (p.isEquator) {
          ctx.fillStyle = `rgba(10, 61, 38, ${alpha})`;
        } else if (normZ > 0.65) {
          ctx.fillStyle = `rgba(15, 81, 50, ${alpha})`;
        } else if (normZ > 0.35) {
          ctx.fillStyle = `rgba(21, 128, 61, ${alpha * 0.85})`;
        } else {
          ctx.fillStyle = `rgba(71, 85, 105, ${alpha * 0.45})`;
        }

        ctx.fillText(char, p.px, p.py);
      });

      // ==========================================
      // 5. 8 OFFICIAL BRAND NODES ON ORBITS
      // ==========================================
      TECH_NODES.forEach((node, i) => {
        nodePhases[i] += node.speed;
        const rotAngle = RING_ANGLES[node.ringIndex];
        const pt3D = getOrbitPoint3D(semiA, semiB, rotAngle, nodePhases[i]);
        const p = transform3D(pt3D.x, pt3D.y, pt3D.z, camYaw, camPitch);

        const px = centerX + p.x * p.scale;
        const py = centerY + p.y * p.scale;

        const el = nodeRefs.current[i];
        if (el) {
          el.style.left = `${px}px`;
          el.style.top = `${py}px`;
          const nodeScale = (
            0.85 +
            0.3 * ((p.z + semiA * 0.7) / (semiA * 1.4))
          ).toFixed(2);
          el.style.transform = `translate(-50%, -50%) scale(${nodeScale})`;
          el.style.zIndex = p.z > 0 ? "30" : "2";
          el.style.opacity = (
            0.75 +
            0.25 * ((p.z + semiA * 0.7) / (semiA * 1.4))
          ).toFixed(2);
        }
      });

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerEnd);
      stage.removeEventListener("pointercancel", onPointerEnd);
      stage.removeEventListener("pointerleave", onPointerEnd);
    };
  }, []);

  return (
    <section className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 select-none">
      {/* Editorial Section Header: Pure Typography, Zero Capsule Badges, Anti-Slop */}
      <div className="text-center max-w-xl mx-auto mb-5 sm:mb-7">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--ink)]">
          The Stack
        </h2>
        <p className="text-xs sm:text-sm text-[var(--ink-muted)] max-w-md mx-auto leading-relaxed mt-2">
          Fondasi arsitektur modern yang mentenagai kalkulasi rekapitulasi, persistensi lokal, dan ekspor instan E-Rekap.
        </p>
      </div>

      {/* THE 3D RUTHERFORD ATOM STAGE (Transparent Base with Blueprint Reticle & Dual Photon Orbit) */}
      <div className="relative mx-auto w-full max-w-[420px] aspect-square overflow-hidden cursor-grab active:cursor-grabbing">
        <div ref={stageRef} className="relative w-full h-full touch-none">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block"
          />

          {/* 8 Floating Brand Nodes on Orbit (Crisp Elevated White Discs) */}
          {TECH_NODES.map((node, i) => {
            const NodeIcon = node.Icon;
            return (
              <div
                key={node.id}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                title={node.name}
                className="absolute w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center p-2.5 bg-white border border-[#DFE5E0] shadow-[0_4px_14px_rgba(10,61,38,0.08)] select-none hover:scale-110 transition-transform"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <NodeIcon className="w-full h-full" />
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-ROW BI-DIRECTIONAL TICKER (Mengalir ke samping saling berlawanan arah tanpa card kaku) */}
      <div className="w-full max-w-3xl mx-auto mt-5 sm:mt-7 space-y-3 overflow-hidden">
        {/* Row 1: Flowing Left */}
        <div className="relative flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex shrink-0 gap-3.5 py-1.5 animate-[ticker-left_24s_linear_infinite] hover:[animation-play-state:paused]">
            {[...TECH_NODES, ...TECH_NODES].map((node, idx) => {
              const NodeIcon = node.Icon;
              return (
                <div
                  key={`r1-${node.id}-${idx}`}
                  className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-[var(--ink)] border border-[var(--border-strong)] shadow-xs hover:shadow-md hover:border-[#0A3D26]/30 select-none transition-all shrink-0"
                >
                  <NodeIcon className="w-5 h-5 shrink-0" />
                  <span className="whitespace-nowrap tracking-tight">{node.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2: Flowing Right */}
        <div className="relative flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex shrink-0 gap-3.5 py-1.5 animate-[ticker-right_24s_linear_infinite] hover:[animation-play-state:paused]">
            {[
              ...TECH_NODES.slice().reverse(),
              ...TECH_NODES.slice().reverse(),
            ].map((node, idx) => {
              const NodeIcon = node.Icon;
              return (
                <div
                  key={`r2-${node.id}-${idx}`}
                  className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-[var(--ink)] border border-[var(--border-strong)] shadow-xs hover:shadow-md hover:border-[#0A3D26]/30 select-none transition-all shrink-0"
                >
                  <NodeIcon className="w-5 h-5 shrink-0" />
                  <span className="whitespace-nowrap tracking-tight">{node.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
