"use client";

import React, { useEffect, useState } from "react";
import { PlayCircle, X, FilmSlate } from "@phosphor-icons/react";
import { useCurtainNavigation } from "./TransitionProvider";

const STORAGE_KEY = "erekap_preview_prompt_seen";

export function PreviewPromptModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { navigateWithCurtain } = useCurtainNavigation();

  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) {
        // Natural entrance delay after dashboard renders
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  // Handle ESC key to dismiss
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setIsOpen(false);
  };

  const handleConfirm = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setIsOpen(false);
    navigateWithCurtain("/info", "MEMBUKA PREVIEW VIDEO");
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#04140D]/65 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={handleDismiss}
      />

      {/* Modal Dialog Card (High-Craft Architecture, No AI Slop) */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-[#072919] p-6 sm:p-8 text-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] border border-[#A3E635]/25 transition-all">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A3E635]/15 text-[#A3E635] border border-[#A3E635]/30">
              <FilmSlate size={22} weight="bold" />
            </span>
            <div>
              <span className="font-mono text-[10px] font-extrabold tracking-wider text-[#A3E635] uppercase">
                PANDUAN & WALKTHROUGH
              </span>
              <h2
                id="preview-modal-title"
                className="text-lg sm:text-xl font-extrabold tracking-tight text-white leading-snug"
              >
                Tonton Video Preview E-Rekap?
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Tutup jendela"
            className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Content Description */}
        <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed mb-6">
          Saksikan pratinjau alur kerja interaktif di halaman Info untuk memahami ringkasan telemetri, navigasi spreadsheet Excel layar penuh, hingga simulasi cetak formal A4 sebelum mulai mengelola data.
        </p>

        {/* Dual Actions: OK & Batal */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={handleDismiss}
            className="btn-tactile w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/20 text-xs sm:text-sm font-bold text-white/80 hover:bg-white/10 hover:text-white transition-all text-center"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="btn-tactile w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#A3E635] text-xs sm:text-sm font-extrabold text-[#072919] shadow-md hover:bg-[#BEF264] active:scale-95 transition-all text-center"
          >
            <PlayCircle size={18} weight="fill" />
            <span>Tonton Preview</span>
          </button>
        </div>
      </div>
    </div>
  );
}
