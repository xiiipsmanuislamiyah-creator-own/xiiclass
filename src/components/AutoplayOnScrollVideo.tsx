"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  SpeakerHigh,
  SpeakerSimpleSlash,
  Play,
  Pause,
  ArrowClockwise,
  CornersOut,
  CornersIn,
  DownloadSimple,
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
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(68);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const resolvedVideoSrc = withBasePath(videoSrc);
  const resolvedPosterSrc = posterSrc ? withBasePath(posterSrc) : undefined;

  // Viewport Intersection Observer for Auto-play / Auto-pause
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return;
          if (entry.isIntersecting) {
            // Autoplay muted when scrolled into view
            videoRef.current.muted = true;
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
            }
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Safe manual play/pause trigger with fallback
  const handlePlayToggle = useCallback(async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (!video.paused) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await video.play();
      setIsPlaying(true);
      setHasError(false);
    } catch (err) {
      console.warn("Autoplay audio blocked, attempting muted fallback:", err);
      try {
        video.muted = true;
        setIsMuted(true);
        await video.play();
        setIsPlaying(true);
        setHasError(false);
      } catch (fallbackErr) {
        console.error("Playback failed completely:", fallbackErr);
        setHasError(true);
      }
    }
  }, []);

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
    videoRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  // Interactive Timeline Scrub
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = pct * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Toggle Fullscreen
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden rounded-2xl bg-white border border-[#0A3D26]/16 shadow-[0_20px_60px_-16px_rgba(10,61,38,0.2)] transition-all duration-300 ${className}`}
    >
      {/* Technical Repository & Showcase Bar (Responsive Mobile & Desktop) */}
      <div className="flex h-11 items-center justify-between border-b border-[#0A3D26]/12 bg-[#F8FBF9] px-3 sm:px-4 select-none gap-2">
        {/* Left: Project & Format Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="h-2 w-2 rounded-full bg-[#15803D]" />
          <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0A3D26]">
            E-Rekap · Production Preview
          </span>
        </div>

        {/* Right: Functional Repository Link */}
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1.5 sm:gap-2 rounded-md border border-[#0A3D26]/14 bg-white px-2.5 sm:px-3 py-1 font-mono text-[10px] sm:text-[11px] font-semibold text-[#0A3D26] shadow-2xs hover:border-[#15803D] hover:text-[#15803D] hover:bg-[#F2FBF5] transition-all shrink-0"
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
          <span className="sm:hidden tracking-tight font-bold">xiiclass</span>
          <span className="hidden sm:inline tracking-tight">{repoLabel}</span>
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
        className="relative aspect-video w-full cursor-pointer bg-[#051C12] overflow-hidden"
        onClick={() => handlePlayToggle()}
        title={isPlaying ? "Klik untuk jeda" : "Klik untuk memutar"}
      >
        <video
          ref={videoRef}
          src={resolvedVideoSrc}
          poster={resolvedPosterSrc}
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover select-none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => setHasError(true)}
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration;
            if (Number.isFinite(d) && d > 0) setDuration(d);
          }}
          onTimeUpdate={(e) => {
            setCurrentTime(e.currentTarget.currentTime);
          }}
        />

        {/* Center Tactile Play Button Overlay (Active when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/25 backdrop-blur-[2px] transition-all">
            <button
              type="button"
              onClick={(e) => handlePlayToggle(e)}
              className="group/btn flex items-center gap-3 rounded-full bg-[#072518] px-5 py-3 text-white shadow-2xl border-2 border-[#A3E635] hover:scale-105 active:scale-95 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A3E635] text-[#072518]">
                <Play size={20} weight="fill" className="ml-0.5" />
              </div>
              <span className="font-mono text-xs sm:text-sm font-bold tracking-wide">
                Putar Showreel (68s)
              </span>
            </button>
          </div>
        )}

        {/* Error Fallback Banner */}
        {hasError && (
          <div className="absolute top-3 left-3 right-3 bg-red-900/90 text-white text-xs font-mono p-2.5 rounded-lg border border-red-500/50 flex items-center justify-between">
            <span>Video tidak dapat dimuat langsung di browser ini.</span>
            <a
              href={resolvedVideoSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold text-yellow-300 ml-2"
            >
              Buka File MP4
            </a>
          </div>
        )}

        {/* Full-Featured Bottom Control Bar */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between gap-2 bg-[#051C12]/85 backdrop-blur-md border border-white/10 rounded-xl px-3 py-1.5 text-white shadow-lg">
          {/* Left Controls: Play/Pause & Time */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => handlePlayToggle(e)}
              aria-label={isPlaying ? "Jeda" : "Putar"}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 hover:bg-[#A3E635] hover:text-[#072518] transition-colors"
            >
              {isPlaying ? (
                <Pause size={16} weight="fill" />
              ) : (
                <Play size={16} weight="fill" className="ml-0.5" />
              )}
            </button>

            <span className="font-mono text-[11px] text-emerald-200">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Controls: Mute, Restart, Fullscreen */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleSound}
              aria-label={isMuted ? "Aktifkan suara" : "Bisukan suara"}
              className={`flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs font-mono font-bold transition-all ${
                isMuted
                  ? "bg-white/10 text-slate-300 hover:bg-white/20"
                  : "bg-[#A3E635] text-[#072518]"
              }`}
            >
              {isMuted ? (
                <>
                  <SpeakerSimpleSlash size={16} weight="bold" />
                  <span className="hidden sm:inline text-[10px]">Bisu</span>
                </>
              ) : (
                <>
                  <SpeakerHigh size={16} weight="fill" />
                  <span className="hidden sm:inline text-[10px]">Suara</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleRestart}
              aria-label="Ulangi dari awal"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title="Ulangi video"
            >
              <ArrowClockwise size={15} weight="bold" />
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Layar penuh"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title="Layar Penuh"
            >
              {isFullscreen ? (
                <CornersIn size={15} weight="bold" />
              ) : (
                <CornersOut size={15} weight="bold" />
              )}
            </button>
          </div>
        </div>

        {/* Clickable / Draggable Interactive Timeline Scrubber */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2 bg-black/40 cursor-pointer z-30 group/scrub hover:h-3 transition-all"
          onClick={handleScrub}
          title="Geser waktu video"
        >
          <div
            className="h-full bg-gradient-to-r from-[#10B981] to-[#A3E635] shadow-[0_0_8px_#A3E635]"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
