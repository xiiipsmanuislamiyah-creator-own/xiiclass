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
  repoUrl?: string;
  repoLabel?: string;
  className?: string;
}

export function AutoplayOnScrollVideo({
  videoSrc,
  posterSrc,
  repoUrl = "https://github.com/xiiipsmanuislamiyah-creator-own/xiiclass",
  repoLabel = "github.com/xiiipsmanuislamiyah-creator-own/xiiclass",
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
      {/* Technical Repository & Showcase Bar (No Fake Browser Chrome) */}
      <div className="flex h-11 items-center justify-between border-b border-[#0A3D26]/10 bg-[#F8FBF9] px-4 select-none">
        {/* Left: Project & Format Indicator */}
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-sm bg-[#15803D]" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0A3D26]/75">
            E-Rekap · Production Preview
          </span>
        </div>

        {/* Right: Functional Repository Anchor Link */}
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-2 rounded-lg border border-[#0A3D26]/14 bg-white px-3 py-1 font-mono text-[11px] font-semibold text-[#0A3D26] shadow-2xs hover:border-[#15803D] hover:text-[#15803D] hover:bg-[#F2FBF5] transition-all"
          title="Buka Repositori GitHub"
        >
          <svg
            className="w-3.5 h-3.5 shrink-0 text-[#0A3D26] group-hover/link:text-[#15803D] transition-colors"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <span className="tracking-tight">{repoLabel}</span>
          <svg
            className="w-3 h-3 text-[#0A3D26]/50 group-hover/link:text-[#15803D] transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
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
