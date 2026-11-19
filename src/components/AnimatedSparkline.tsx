"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedSparklineProps {
  data?: number[];
  width?: number;
  height?: number;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  duration?: number;
  showPulse?: boolean;
  showPoints?: boolean;
  className?: string;
}

export function AnimatedSparkline({
  data = [86, 89, 88, 92, 91, 94.7],
  width = 120,
  height = 36,
  strokeColor = "#A3E635",
  fillColor = "rgba(163, 230, 53, 0.16)",
  strokeWidth = 2.2,
  duration = 1000,
  showPulse = true,
  showPoints = false,
  className = "",
}: AnimatedSparklineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState<number>(300);
  const [isDrawn, setIsDrawn] = useState<boolean>(false);

  // Compute coordinates with comfortable padding
  const padX = 4;
  const padY = 6;
  const usableWidth = width - padX * 2;
  const usableHeight = height - padY * 2;

  const validData = data && data.length > 0 ? data : [0];
  const minVal = Math.min(...validData);
  const maxVal = Math.max(...validData);
  const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;

  const points = validData.map((val, idx) => {
    const x = padX + (idx / Math.max(1, validData.length - 1)) * usableWidth;
    const y = height - padY - ((val - minVal) / range) * usableHeight;
    return { x, y, val };
  });

  // Build smooth bezier path
  let pathD = "";
  if (points.length === 1) {
    pathD = `M ${padX} ${points[0].y} L ${width - padX} ${points[0].y}`;
  } else if (points.length === 2) {
    pathD = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  } else {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = i > 0 ? points[i - 1] : points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = i != points.length - 2 ? points[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      pathD += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
    }
  }

  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  const areaD = `${pathD} L ${lastPoint.x.toFixed(2)} ${height} L ${firstPoint.x.toFixed(2)} ${height} Z`;

  useEffect(() => {
    if (pathRef.current) {
      try {
        const len = pathRef.current.getTotalLength();
        if (len > 0) {
          setPathLength(len);
        }
      } catch (_) {}
    }

    // Trigger smooth 60fps draw animation
    const raf = requestAnimationFrame(() => {
      const timer = setTimeout(() => {
        setIsDrawn(true);
      }, 40);
      return () => clearTimeout(timer);
    });

    return () => cancelAnimationFrame(raf);
  }, [pathD]);

  return (
    <div className={`relative inline-block w-full overflow-visible ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full overflow-visible"
        style={{ height: `${height}px` }}
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`grad-${width}-${height}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.28" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Shaded Area Under Curve */}
        <path
          d={areaD}
          fill={`url(#grad-${width}-${height})`}
          style={{
            opacity: isDrawn ? 1 : 0,
            transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) 120ms`,
            willChange: "opacity",
          }}
        />

        {/* Smooth Animated Line Path */}
        <path
          ref={pathRef}
          d={pathD}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: isDrawn ? 0 : pathLength,
            transition: `stroke-dashoffset ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
            willChange: "stroke-dashoffset",
          }}
        />

        {/* Data Points */}
        {showPoints &&
          points.map((p, idx) => (
            <circle
              key={idx}
              cx={p.x}
              cy={p.y}
              r={2.5}
              fill={strokeColor}
              style={{
                opacity: isDrawn ? 1 : 0,
                transform: isDrawn ? "scale(1)" : "scale(0)",
                transformOrigin: `${p.x}px ${p.y}px`,
                transition: `all 400ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 60 + 200}ms`,
              }}
            />
          ))}

        {/* Live Beacon / Pulsing Dot at Endpoint */}
        {showPulse && lastPoint && (
          <g
            style={{
              opacity: isDrawn ? 1 : 0,
              transform: isDrawn ? "scale(1)" : "scale(0)",
              transformOrigin: `${lastPoint.x}px ${lastPoint.y}px`,
              transition: `transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${duration - 150}ms, opacity 400ms ease`,
            }}
          >
            <circle
              cx={lastPoint.x}
              cy={lastPoint.y}
              r={5}
              fill={strokeColor}
              className="animate-ping"
              style={{ transformOrigin: `${lastPoint.x}px ${lastPoint.y}px`, opacity: 0.6 }}
            />
            <circle cx={lastPoint.x} cy={lastPoint.y} r={3} fill={strokeColor} />
            <circle cx={lastPoint.x} cy={lastPoint.y} r={1.5} fill="#FFFFFF" />
          </g>
        )}
      </svg>
    </div>
  );
}
