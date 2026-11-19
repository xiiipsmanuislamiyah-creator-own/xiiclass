export interface TechnicalCornerMarksProps {
  variant?: "light" | "dark";
  className?: string;
  size?: number; // size in px, default 14
}

export function TechnicalCornerMarks({
  variant = "light",
  className = "",
  size = 14,
}: TechnicalCornerMarksProps) {
  const isDark = variant === "dark";
  const strokeClass = isDark
    ? "border-[#A3E635]/35 group-hover:border-[#A3E635]/80"
    : "border-[#0A3D26]/20 group-hover:border-[#15803D]/60";

  return (
    <div
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden rounded-3xl ${className}`}
      aria-hidden="true"
    >
      {/* Top-Left Corner Tick */}
      <span
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`absolute top-3.5 left-3.5 border-t-[1.5px] border-l-[1.5px] ${strokeClass} transition-colors duration-300 rounded-tl-[3px]`}
      />
      {/* Top-Right Corner Tick */}
      <span
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`absolute top-3.5 right-3.5 border-t-[1.5px] border-r-[1.5px] ${strokeClass} transition-colors duration-300 rounded-tr-[3px]`}
      />
      {/* Bottom-Left Corner Tick */}
      <span
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`absolute bottom-3.5 left-3.5 border-b-[1.5px] border-l-[1.5px] ${strokeClass} transition-colors duration-300 rounded-bl-[3px]`}
      />
      {/* Bottom-Right Corner Tick */}
      <span
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`absolute bottom-3.5 right-3.5 border-b-[1.5px] border-r-[1.5px] ${strokeClass} transition-colors duration-300 rounded-br-[3px]`}
      />
    </div>
  );
}
