"use client";

import { useEffect, useRef, useState } from "react";
import {
  SpeakerHigh,
  SpeakerSimpleSlash,
  Play,
  Pause,
  ArrowClockwise,
} from "@phosphor-icons/react";
import { withBasePath } from "@/lib/paths";

interface AutoplayOnScrollVideoProps {
  videoSrc: string;
  posterSrc?: string;
  urlLabel?: string;
  badgeLabel?: string;
  className?: string;
}

export function AutoplayOnScrollVideo({
  videoSrc,
  posterSrc,
  urlLabel = "rhmt.biz.id/xiiclass",
  badgeLabel = "LIGHT KINETIC · 60 FPS",
  className = "",
}: AutoplayOnScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isUserPaused, setIsUserPaused] = useState<boolean>(false);
  const [inView, setInView] = useState<boolean>(false);

  // Viewport Intersection Observer for Auto-play / Auto-pause
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (!isUserPaused && videoRef.current) {
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => setIsPlaying(true))
                  .catch(() => {
                    // Autoplay prevented (standard browser policy)
                    setIsPlaying(false);
                  });
              }
            }
          } else {
            setInView(false);
            if (videoRef.current) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of video is visible
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [isUserPaused]);

  // Toggle Play / Pause manually
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setIsUserPaused(true);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setIsUserPaused(false);
      });
    }
  };

  // Toggle Sound (Mute / Unmute)
  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Restart video from beginning
  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => {
      setIsPlaying(true);
      setIsUserPaused(false);
    });
  };

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden rounded-3xl bg-white border border-[#0A3D26]/12 shadow-[0_24px_60px_-15px_rgba(10,61,38,0.14),0_6px_16px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_32px_75px_-18px_rgba(10,61,38,0.18)] ${className}`}
    >
      {/* Light Browser Chrome Header */}
      <div className="flex h-11 items-center justify-between border-b border-[#0A3D26]/8 bg-[#F8FBF9] px-4 select-none">
        {/* Mac OS Window Controls */}
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
        </div>

        {/* URL Pill Indicator */}
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#0A3D26]/10 bg-white px-3.5 py-1 text-xs font-semibold text-[#0A3D26] shadow-sm">
          <span
            className={`h-2 w-2 rounded-full ${
              inView && isPlaying ? "bg-[#10B981] animate-pulse" : "bg-slate-300"
            }`}
          />
          <span className="font-mono text-[11px] font-bold tracking-tight">
            https://{urlLabel}
          </span>
        </div>

        {/* Live Badge Status */}
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#EAF6EE] border border-[#0A3D26]/15 px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-[#0A3D26] tracking-wider uppercase">
            {badgeLabel}
          </span>
        </div>
      </div>

      {/* Video Viewport Stage */}
      <div
        className="relative aspect-video w-full cursor-pointer bg-[#F1F5F2] overflow-hidden"
        onClick={togglePlay}
        title={isPlaying ? "Klik untuk jeda" : "Klik untuk memutar"}
      >
        <video
          ref={videoRef}
          src={withBasePath(videoSrc)}
          poster={posterSrc ? withBasePath(posterSrc) : undefined}
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover select-none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Subtle Hover Play/Pause Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-200 ${
            isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#0A3D26] shadow-xl backdrop-blur-sm transition-transform active:scale-95">
            {isPlaying ? (
              <Pause size={24} weight="fill" />
            ) : (
              <Play size={24} weight="fill" className="ml-1" />
            )}
          </div>
        </div>

        {/* Bottom Floating Control Bar */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Aktifkan suara" : "Bisukan suara"}
            className="flex h-9 items-center gap-1.5 rounded-full bg-white/90 px-3 text-xs font-bold text-[#0A3D26] shadow-md backdrop-blur-md border border-[#0A3D26]/10 hover:bg-white active:scale-95 transition-all"
            title={isMuted ? "Aktifkan Suara" : "Bisukan Suara"}
          >
            {isMuted ? (
              <>
                <SpeakerSimpleSlash size={16} weight="bold" className="text-slate-500" />
                <span className="hidden sm:inline text-[11px]">Bisu</span>
              </>
            ) : (
              <>
                <SpeakerHigh size={16} weight="fill" className="text-[#15803D]" />
                <span className="hidden sm:inline text-[11px] text-[#15803D]">Suara Aktif</span>
              </>
            )}
          </button>

          {/* Restart Button */}
          <button
            type="button"
            onClick={handleRestart}
            aria-label="Ulangi dari awal"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#0A3D26] shadow-md backdrop-blur-md border border-[#0A3D26]/10 hover:bg-white active:scale-95 transition-all"
            title="Putar Ulang Video"
          >
            <ArrowClockwise size={16} weight="bold" />
          </button>
        </div>

        {/* In-View Status Toast */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#0A3D26]/10 px-3 py-1 text-[11px] font-bold text-[#0A3D26] shadow-sm">
            <span
              className={`h-2 w-2 rounded-full ${
                isPlaying ? "bg-[#A3E635] shadow-[0_0_6px_#A3E635]" : "bg-amber-400"
              }`}
            />
            <span>{isPlaying ? "Autoplay Aktif" : "Menunggu Interaksi"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
