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
  className?: string;
}

export function AutoplayOnScrollVideo({
  videoSrc,
  posterSrc,
  urlLabel = "rhmt.biz.id/xiiclass",
  className = "",
}: AutoplayOnScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isUserPaused, setIsUserPaused] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(68);

  // Viewport Intersection Observer for Auto-play / Auto-pause
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isUserPaused && videoRef.current) {
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => setIsPlaying(true))
                  .catch(() => {
                    setIsPlaying(false);
                  });
              }
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: 0.25,
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
    setCurrentTime(0);
    videoRef.current.play().then(() => {
      setIsPlaying(true);
      setIsUserPaused(false);
    });
  };

  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden rounded-3xl bg-white border border-[#0A3D26]/14 shadow-[0_26px_65px_-16px_rgba(10,61,38,0.18),0_6px_18px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_36px_85px_-18px_rgba(10,61,38,0.24)] ${className}`}
    >
      {/* Clean Browser Chrome Header */}
      <div className="flex h-11 items-center justify-between border-b border-[#0A3D26]/10 bg-[#F8FBF9] px-4 select-none">
        {/* Mac OS Window Controls */}
        <div className="flex items-center gap-1.5 w-16">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
        </div>

        {/* Clean URL Pill */}
        <div className="flex items-center gap-1.5 rounded-full border border-[#0A3D26]/12 bg-white px-3.5 py-1 text-xs font-semibold text-[#0A3D26] shadow-2xs">
          <svg className="w-3 h-3 text-[#0A3D26]/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="font-mono text-[11px] font-bold tracking-tight">
            https://{urlLabel}
          </span>
        </div>

        {/* Right side spacer for visual balance */}
        <div className="w-16 hidden sm:block" />
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
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration;
            if (Number.isFinite(d) && d > 0) setDuration(d);
          }}
          onTimeUpdate={(e) => {
            setCurrentTime(e.currentTarget.currentTime);
          }}
        />

        {/* Subtle Hover Play/Pause Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/15 transition-opacity duration-200 ${
            isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#0A3D26] shadow-xl backdrop-blur-sm transition-transform active:scale-95 hover:scale-105">
            {isPlaying ? (
              <Pause size={24} weight="fill" />
            ) : (
              <Play size={24} weight="fill" className="ml-1" />
            )}
          </div>
        </div>

        {/* Bottom Floating Control Bar */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Aktifkan suara" : "Bisukan suara"}
            className="flex h-9 items-center gap-1.5 rounded-full bg-white/95 px-3.5 text-xs font-bold text-[#0A3D26] shadow-md backdrop-blur-md border border-[#0A3D26]/12 hover:bg-white active:scale-95 transition-all"
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
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#0A3D26] shadow-md backdrop-blur-md border border-[#0A3D26]/12 hover:bg-white active:scale-95 transition-all"
            title="Putar Ulang Video"
          >
            <ArrowClockwise size={16} weight="bold" />
          </button>
        </div>

        {/* Live Smooth Scrub Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/25 overflow-hidden z-20">
          <div
            className="h-full bg-gradient-to-r from-[#0F5132] via-[#10B981] to-[#A3E635] transition-all duration-100 ease-linear shadow-[0_0_8px_#A3E635]"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
