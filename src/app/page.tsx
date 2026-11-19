"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Table,
  UsersThree,
  ShieldCheck,
  Printer,
  FileXls,
  CheckCircle,
  Buildings,
} from "@phosphor-icons/react";
import { SplashScreen } from "@/components/SplashScreen";
import { AmbientBackdrop } from "@/components/AmbientBackdrop";
import { useCurtainNavigation } from "@/components/TransitionProvider";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { AnimatedSparkline } from "@/components/AnimatedSparkline";
import { ScrollRevealCard } from "@/components/ScrollRevealCard";
import { AutoplayOnScrollVideo } from "@/components/AutoplayOnScrollVideo";
import { withBasePath } from "@/lib/paths";

interface LiveSummary {
  attendanceRate: number;
  totalStudents: number;
  totalClasses: number;
  academicYear: string;
  semester: string;
}

const TYPED_PHRASES = ["Lebih Presisi.", "Lebih Transparan.", "Siap Cetak A4."];

function TypewriterHeading() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPED_PHRASES[phraseIdx];
    const delay = deleting ? 45 : charIdx === current.length ? 1800 : 80;
    const t = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setCharIdx((c) => c + 1);
        } else {
          setDeleting(true);
        }
      } else {
        if (charIdx > 0) {
          setCharIdx((c) => c - 1);
        } else {
          setDeleting(false);
          setPhraseIdx((p) => (p + 1) % TYPED_PHRASES.length);
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [phraseIdx, charIdx, deleting]);

  return (
    <span className="text-[#0F5132] inline-flex items-baseline">
      <span>{TYPED_PHRASES[phraseIdx].slice(0, charIdx)}</span>
      <span
        aria-hidden="true"
        className="animate-caret ml-1 inline-block h-[0.88em] w-[3px] rounded-full bg-[#A3E635] ring-1 ring-[#0F5132]/30 align-baseline"
      />
    </span>
  );
}

export default function LandingPage() {
  const { navigateWithCurtain } = useCurtainNavigation();
  const [stats, setStats] = useState<LiveSummary>({
    attendanceRate: 94.7,
    totalStudents: 18,
    totalClasses: 3,
    academicYear: "2026/2027",
    semester: "Ganjil",
  });

  useEffect(() => {
    fetch(withBasePath("/api/overview"))
      .then((r) => r.json())
      .then((d) => {
        if (d?.summary) {
          setStats({
            attendanceRate: d.summary.attendance_rate ?? 94.7,
            totalStudents: d.summary.total_students ?? 18,
            totalClasses: d.classes?.length ?? 3,
            academicYear: d.school?.academic_year || "2026/2027",
            semester: d.school?.semester || "Ganjil",
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <SplashScreen />

      <div className="relative min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)] overflow-x-hidden">
        <AmbientBackdrop variant="light" />

        {/* Sticky Top Navbar */}
        <header className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between animate-cascade">
          <div className="flex items-center gap-3">
            <img
              src={withBasePath("/icon-erekap.png")}
              alt="Logo E-Rekap"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 object-contain drop-shadow-sm"
            />
            <div>
              <p className="text-base font-extrabold tracking-tight text-[var(--ink)] leading-none">
                E-Rekap
              </p>
              <p className="text-[11px] font-semibold text-[var(--ink-muted)] mt-0.5">
                Rekapitulasi Kehadiran
              </p>
            </div>
          </div>

          <nav aria-label="Menu Beranda" className="hidden md:flex items-center gap-6 text-sm font-bold text-[var(--ink-muted)]">
            <a href="#fitur" className="hover:text-[var(--canopy)] transition-colors">
              Fitur Utama
            </a>
            <button
              type="button"
              onClick={() => navigateWithCurtain("/rekap", "MEMBUKA TABEL REKAP")}
              className="hover:text-[var(--canopy)] transition-colors"
            >
              Tabel Rekap
            </button>
            <button
              type="button"
              onClick={() => navigateWithCurtain("/info", "MEMBUKA INFO APP")}
              className="hover:text-[var(--canopy)] transition-colors"
            >
              Tentang App
            </button>
          </nav>

          <button
            type="button"
            onClick={() => navigateWithCurtain("/dashboard", "MEMBUKA DASHBOARD")}
            className="btn-tactile inline-flex items-center gap-1.5 rounded-full bg-[#0A3D26] px-4 py-2.5 text-xs sm:text-sm font-extrabold text-[#A3E635] shadow-md hover:bg-[#072919]"
          >
            <span>Buka App</span>
            <ArrowUpRight size={15} weight="bold" />
          </button>
        </header>

        {/* Hero Section with Typewriter & 3D Depth Cards */}
        <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-8 pb-12 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1
              className="animate-cascade text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.12] min-h-[2.3em] sm:min-h-[2.2em]"
              style={{ animationDelay: "140ms" }}
            >
              Rekap Kehadiran Siswa <br className="hidden sm:inline" />
              <TypewriterHeading />
            </h1>

            <p
              className="animate-cascade mx-auto max-w-xl text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed"
              style={{ animationDelay: "220ms" }}
            >
              Pantau persentase kehadiran per kelas secara terbuka, kelola data rekap & backup Excel oleh Admin, dan cetak laporan standar sekolah dalam satu ketukan.
            </p>

            {/* Primary & Secondary CTAs */}
            <div
              className="animate-cascade flex flex-wrap items-center justify-center gap-3 pt-1"
              style={{ animationDelay: "300ms" }}
            >
              <button
                type="button"
                onClick={() => navigateWithCurtain("/dashboard", "MEMBUKA DASHBOARD")}
                className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-6 py-3.5 text-sm font-extrabold text-[#072919] shadow-[0_12px_26px_-6px_rgba(163,230,53,0.65)] hover:bg-[#BEF264]"
              >
                <span>Masuk ke Dashboard</span>
                <ArrowUpRight size={18} weight="bold" />
              </button>

              <button
                type="button"
                onClick={() => navigateWithCurtain("/rekap", "MEMBUKA TABEL REKAP")}
                className="btn-tactile inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[var(--ink)] shadow-sm ring-1 ring-[var(--border-strong)] hover:bg-[var(--surface-raised)]"
              >
                <Table size={18} weight="bold" className="text-[var(--canopy)]" />
                <span>Lihat Tabel Rekap</span>
              </button>
            </div>

            {/* 3D Depth Floating Live Snapshot Strip */}
            <div className="animate-card-3d pt-4" style={{ animationDelay: "380ms" }}>
              <div className="mx-auto max-w-2xl sheet-overlap rounded-3xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                {/* 1. Kehadiran Card + Live Animated SVG Trendline */}
                <div className="rounded-2xl bg-[var(--bg)] p-3.5 sm:p-4 flex flex-col justify-between gap-2.5">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                        Kehadiran
                      </p>
                      <span className="font-num text-[10px] font-bold text-[#15803D] bg-emerald-100/70 rounded-full px-2 py-0.5">
                        Real-time
                      </span>
                    </div>
                    <p className="mt-1 font-num text-2xl sm:text-3xl font-extrabold text-[var(--canopy)]">
                      <AnimatedCounter value={stats.attendanceRate} decimals={1} suffix="%" />
                    </p>
                  </div>
                  {/* Animated SVG Trend Line */}
                  <div className="pt-1 border-t border-[var(--border)]">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-[var(--ink-muted)] mb-1">
                      <span>Tren Kehadiran</span>
                      <span className="font-num font-extrabold text-[#15803D]">Aktif</span>
                    </div>
                    <AnimatedSparkline
                      data={[88.5, 91.0, 89.2, 93.4, 92.8, stats.attendanceRate]}
                      width={140}
                      height={32}
                      strokeColor="#0F5132"
                      fillColor="rgba(15, 81, 50, 0.14)"
                      strokeWidth={2.4}
                      showPulse={true}
                    />
                  </div>
                </div>

                {/* 2. Total Siswa Card + Rombel Capacity Curve */}
                <div className="rounded-2xl bg-[var(--bg)] p-3.5 sm:p-4 flex flex-col justify-between gap-2.5">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                        Total Siswa
                      </p>
                      <span className="font-num text-[10px] font-bold text-slate-700 bg-slate-200/70 rounded-full px-2 py-0.5">
                        Terdaftar
                      </span>
                    </div>
                    <p className="mt-1 font-num text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
                      <AnimatedCounter value={stats.totalStudents} />
                    </p>
                  </div>
                  {/* Micro Capacity Sparkline */}
                  <div className="pt-1 border-t border-[var(--border)]">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-[var(--ink-muted)] mb-1">
                      <span>Kapasitas Rombel</span>
                      <span className="font-num font-extrabold text-[var(--ink)]">100%</span>
                    </div>
                    <AnimatedSparkline
                      data={[6, 6, 6, 6, 6, 6]}
                      width={140}
                      height={32}
                      strokeColor="#334155"
                      fillColor="rgba(51, 65, 85, 0.10)"
                      strokeWidth={2}
                      showPulse={false}
                    />
                  </div>
                </div>

                {/* 3. Multi-Kelas Card + Distribution Bars */}
                <div className="rounded-2xl bg-[var(--bg)] p-3.5 sm:p-4 flex flex-col justify-between gap-2.5">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                        Multi-Kelas
                      </p>
                      <span className="font-num text-[10px] font-bold text-[#A3E635] bg-[#0A3D26] rounded-full px-2 py-0.5">
                        Tingkat MA
                      </span>
                    </div>
                    <p className="mt-1 font-num text-2xl sm:text-3xl font-extrabold text-[var(--ink)]">
                      <AnimatedCounter value={stats.totalClasses} />
                    </p>
                  </div>
                  {/* Rombel Distribution Progress */}
                  <div className="pt-1 border-t border-[var(--border)] space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-semibold text-[var(--ink-muted)]">
                      <span>X, XI, XII</span>
                      <span className="font-num font-extrabold text-[var(--canopy)]">3 Rombel</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--border)] flex">
                      <div style={{ width: "33.3%" }} className="h-full bg-[#0A3D26]" title="X IPA 1" />
                      <div style={{ width: "33.3%" }} className="h-full bg-[#15803D]" title="XI IPA 1" />
                      <div style={{ width: "33.4%" }} className="h-full bg-[#A3E635]" title="XII IPS 1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive In-View Kinetic Showcase Teaser (Autoplay on Scroll) */}
        <section className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center max-w-2xl mx-auto mb-6 space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF6EE] px-3.5 py-1 text-xs font-extrabold text-[#0A3D26] border border-[#0A3D26]/12 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>KINETIC TYPOGRAPHY · AUTOPLAY ON SCROLL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)]">
              Antarmuka Responsif, Alur Kerja Nyata
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-muted)]">
              Saksikan ringkasan otomatis, interaksi tabel spreadsheet Excel layar penuh, hingga kesiapan cetak A4 formal.
            </p>
          </div>

          <AutoplayOnScrollVideo
            videoSrc="/erekap-horizontal-upgraded.mp4"
            posterSrc="/erekap-horizontal-poster.jpg"
            urlLabel="rhmt.biz.id/xiiclass"
            badgeLabel="SHOWCASE RESMI 60S · MOTION GRAPHICS"
          />
        </section>

        {/* 4-Column 3D Perspective Capability Strip (Scroll-Triggered Stagger) */}
        <section
          id="fitur"
          className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Multi-Kelas Terpadu",
                desc: "Ringkasan kehadiran per kelas dengan persentase dan bar komposisi otomatis.",
                icon: UsersThree,
              },
              {
                title: "Review & Admin",
                desc: "Siswa dan guru bebas memantau rekap; edit data terkunci aman untuk Admin.",
                icon: ShieldCheck,
              },
              {
                title: "Cetak A4 Formal",
                desc: "Layout A4 Landscape siap cetak lengkap dengan Kop Surat resmi lembaga.",
                icon: Printer,
              },
              {
                title: "Backup & Ekspor XLSX",
                desc: "Ekspor laporan dan impor ulang backup spreadsheet .xlsx langsung dari Admin.",
                icon: FileXls,
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <ScrollRevealCard
                  key={item.title}
                  delayMs={idx * 130}
                  direction="up"
                  threshold={0.15}
                  className="card-pro rounded-3xl p-5 space-y-3 cursor-default transition-transform duration-200 active:scale-[0.98] hover:shadow-lg"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-mint)] text-[var(--canopy)]">
                    <Icon size={22} weight="fill" />
                  </span>
                  <h2 className="text-base font-extrabold text-[var(--ink)]">{item.title}</h2>
                  <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </ScrollRevealCard>
              );
            })}
          </div>
        </section>

        {/* Deep Forest Showcase Banner (Scroll-Triggered Smooth Scale) */}
        <section className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-12">
          <ScrollRevealCard
            delayMs={100}
            direction="scale"
            threshold={0.2}
            className="relative overflow-hidden rounded-3xl bg-[#0A3D26] p-6 sm:p-9 text-white shadow-[0_20px_45px_-14px_rgba(7,41,25,0.45)]"
          >
            <AmbientBackdrop variant="canopy" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2.5 max-w-xl">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A3E635]">
                  <CheckCircle size={15} weight="fill" />
                  <span>Siap Pakai & Database Persisten</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Transparansi Rekapitulasi Standar Sekolah
                </h2>
                <p className="text-sm text-emerald-100/85 leading-relaxed">
                  Seluruh data rekap tersimpan rapi di database SQLite dan dapat diakses dari HP maupun desktop layaknya aplikasi native.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigateWithCurtain("/dashboard", "MEMBUKA DASHBOARD")}
                  className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-5 py-3 text-sm font-extrabold text-[#072919] shadow-md hover:bg-[#BEF264]"
                >
                  <span>Mulai Jelajahi Dashboard</span>
                  <ArrowUpRight size={17} weight="bold" />
                </button>
                <Link
                  href="/info"
                  className="btn-tactile inline-flex items-center gap-2 rounded-full bg-white/12 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/20 hover:bg-white/20"
                >
                  <Buildings size={17} weight="bold" />
                  <span>Tentang App & Dev</span>
                </Link>
              </div>
            </div>
          </ScrollRevealCard>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold text-[var(--ink-muted)]">
            <span>E-Rekap — Sistem Rekapitulasi Kehadiran Siswa</span>
            <span>
              Dikembangkan oleh{" "}
              <a
                href="https://rhmt.biz.id"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[var(--canopy)] hover:underline"
              >
                R_HMT OFC
              </a>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
