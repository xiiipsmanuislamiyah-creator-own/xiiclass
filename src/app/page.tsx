"use client";

import { useEffect, useState } from "react";
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
import { ScrollRevealCard } from "@/components/ScrollRevealCard";
import { TechnicalCornerMarks } from "@/components/TechnicalCornerMarks";
import { AutoplayOnScrollVideo } from "@/components/AutoplayOnScrollVideo";
import { TechStackMotion } from "@/components/TechStackMotion";
import { withBasePath } from "@/lib/paths";

const TYPED_PHRASES = ["Lebih Presisi.", "Lebih Transparan.", "Siap Cetak A4.", "Otomatis & Real-time."];

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

        {/* Hero Section */}
        <section className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 pt-10 sm:pt-14 pb-8 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1
              className="animate-cascade text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--ink)] leading-[1.12]"
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
              className="animate-cascade flex flex-wrap items-center justify-center gap-3 pt-2"
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
          </div>
        </section>

        {/* Product Showcase Video (Clean High-Craft Frame, No AI Slop Badges) */}
        <section className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12 sm:pb-16">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)]">
              Antarmuka Responsif, Alur Kerja Nyata
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-muted)]">
              Pratinjau langsung alur kerja E-Rekap: rekapitulasi kehadiran per kelas, mode tabel Excel layar penuh, hingga stempel pengesahan formal ber-Kop Madrasah.
            </p>
          </div>

          <AutoplayOnScrollVideo
            videoSrc="/erekap-showreel-web.mp4"
            posterSrc="/erekap-showreel-poster.jpg"
            repoUrl="https://github.com/xiiipsmanuislamiyah-creator-own/xiiclass"
            repoLabel="github.com/xiiipsmanuislamiyah-creator-own/xiiclass"
          />
        </section>

        {/* Precision Technical Architecture Matrix (100% Official SVG Icons & Anti-Collision Grid) */}
        <TechStackMotion />

        {/* Asymmetrical High-Craft Bento Grid Feature Section (Stripe/Linear Architecture Mockups) */}
        <section
          id="fitur"
          className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14"
        >
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--ink)]">
              Dirancang untuk Akurasi Operasional
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-muted)]">
              Bukan sekadar formulir digital, melainkan instrumen rekapitulasi lengkap dengan integrasi lembar kerja dan standar legal lembaga.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* CARD 1: Backup & Ekspor XLSX (7 cols) */}
            <ScrollRevealCard
              delayMs={100}
              direction="up"
              threshold={0.15}
              className="lg:col-span-7 card-pro rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#0A3D26]/25 group relative"
            >
              <TechnicalCornerMarks />
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-mint)] text-[var(--canopy)] shadow-2xs group-hover:scale-105 transition-transform">
                    <FileXls size={24} weight="fill" />
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold tracking-tight text-[var(--ink)]">
                      Backup & Ekspor XLSX
                    </h3>
                    <p className="text-xs text-[var(--ink-muted)]">Otomatisasi spreadsheet siap audit</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed mt-3 max-w-xl">
                  Ekspor seluruh rekapitulasi kehadiran dalam hitungan detik. Format rapi berstandar Microsoft Excel lengkap dengan rumus kalkulasi persentase otomatis per siswa.
                </p>
              </div>

              {/* Micro-UI Stage: Authentic Spreadsheet Slice */}
              <div className="mt-5 rounded-2xl border border-[#0A3D26]/12 bg-[#F8FAF9] p-3 shadow-inner select-none">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#0A3D26]/10 text-[10px] font-mono text-[#0A3D26]/70">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#107C41]">XLSX</span>
                    <span>•</span>
                    <span className="text-[var(--ink)] font-semibold">Rekap_Semester_Ganjil.xlsx</span>
                  </div>
                  <span className="font-semibold text-[#15803D]">fx =SUM(D4:D35)</span>
                </div>

                <div className="rounded-lg bg-white border border-[#E2E8F0] overflow-x-auto text-[11px] font-mono">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F1F5F2] text-[#0A3D26] font-bold border-b border-[#E2E8F0]">
                        <th className="py-1 px-2 border-r border-[#E2E8F0] w-12 text-center text-[10px]">NISN</th>
                        <th className="py-1 px-2.5 border-r border-[#E2E8F0]">Nama Siswa</th>
                        <th className="py-1 px-2 border-r border-[#E2E8F0] text-center">Hadir</th>
                        <th className="py-1 px-2 border-r border-[#E2E8F0] text-center">Izin</th>
                        <th className="py-1 px-2 text-right font-extrabold text-[#15803D]">% Hadir</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F2] text-[#2D3748]">
                      <tr className="hover:bg-[#F9FCFA]">
                        <td className="py-1 px-2 border-r border-[#F1F5F2] text-center text-slate-400">3182</td>
                        <td className="py-1 px-2.5 border-r border-[#F1F5F2] font-semibold text-[var(--ink)]">Ahmad Farhan</td>
                        <td className="py-1 px-2 border-r border-[#F1F5F2] text-center font-bold text-[#15803D]">28</td>
                        <td className="py-1 px-2 border-r border-[#F1F5F2] text-center text-slate-500">1</td>
                        <td className="py-1 px-2 text-right font-bold text-[#15803D]">96.5%</td>
                      </tr>
                      <tr className="bg-[#F4FBF6]/60">
                        <td className="py-1 px-2 border-r border-[#F1F5F2] text-center text-slate-400">3185</td>
                        <td className="py-1 px-2.5 border-r border-[#F1F5F2] font-semibold text-[var(--ink)]">Siti Aisyah</td>
                        <td className="py-1 px-2 border-r border-[#F1F5F2] text-center font-bold text-[#15803D]">29</td>
                        <td className="py-1 px-2 border-r border-[#F1F5F2] text-center text-slate-400">0</td>
                        <td className="py-1 px-2 text-right font-extrabold text-[#15803D]">100%</td>
                      </tr>
                      <tr>
                        <td className="py-1 px-2 border-r border-[#F1F5F2] text-center text-slate-400">3189</td>
                        <td className="py-1 px-2.5 border-r border-[#F1F5F2] font-semibold text-[var(--ink)]">Budi Pratama</td>
                        <td className="py-1 px-2 border-r border-[#F1F5F2] text-center font-bold text-[#15803D]">27</td>
                        <td className="py-1 px-2 border-r border-[#F1F5F2] text-center text-slate-500">2</td>
                        <td className="py-1 px-2 text-right font-bold text-[#15803D]">93.1%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </ScrollRevealCard>

            {/* CARD 2: Cetak A4 Formal (5 cols) */}
            <ScrollRevealCard
              delayMs={200}
              direction="up"
              threshold={0.15}
              className="lg:col-span-5 card-pro rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#0A3D26]/25 group relative"
            >
              <TechnicalCornerMarks />
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-mint)] text-[var(--canopy)] shadow-2xs group-hover:scale-105 transition-transform">
                    <Printer size={24} weight="fill" />
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold tracking-tight text-[var(--ink)]">
                      Cetak A4 Formal
                    </h3>
                    <p className="text-xs text-[var(--ink-muted)]">Kop resmi & format legal</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed mt-3">
                  Tata letak dokumen A4 Landscape presisi siap cetak fisik. Lengkap dengan Kop Lembaga resmi dan kolom tanda tangan pengesahan.
                </p>
              </div>

              {/* Micro-UI Stage: Authentic A4 Paper Preview */}
              <div className="mt-5 rounded-2xl border border-[#0A3D26]/12 bg-[#F8FAF9] p-3 shadow-inner select-none relative overflow-hidden">
                <div className="bg-white rounded-lg border border-[#CBD5E1] p-3 shadow-xs space-y-2 relative">
                  <div className="text-center pb-1.5 border-b-2 border-double border-slate-700">
                    <div className="text-[8px] font-bold tracking-wider text-slate-900 uppercase">
                      KEMENTERIAN AGAMA REPUBLIK INDONESIA
                    </div>
                    <div className="text-[7px] text-slate-600 font-semibold uppercase">
                      MADRASAH ALIYAH NAHDLATUL ULAMA ISLAMIYAH
                    </div>
                  </div>

                  <div className="space-y-1 py-0.5">
                    <div className="h-1.5 w-3/4 bg-slate-200 rounded" />
                    <div className="grid grid-cols-4 gap-1">
                      <div className="h-2 bg-slate-100 rounded border border-slate-200" />
                      <div className="h-2 bg-slate-100 rounded border border-slate-200" />
                      <div className="h-2 bg-slate-100 rounded border border-slate-200" />
                      <div className="h-2 bg-slate-100 rounded border border-slate-200" />
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      <div className="h-2 bg-slate-50 rounded border border-slate-200" />
                      <div className="h-2 bg-slate-50 rounded border border-slate-200" />
                      <div className="h-2 bg-slate-50 rounded border border-slate-200" />
                      <div className="h-2 bg-slate-50 rounded border border-slate-200" />
                    </div>
                  </div>

                  <div className="flex justify-between items-end pt-1">
                    <div className="text-[7px] font-mono text-slate-400">Lampiran: Laporan Bulanan</div>
                    <div className="w-14 h-14 rounded-full border-2 border-emerald-700/60 p-0.5 rotate-[-10deg] flex items-center justify-center text-center">
                      <div className="w-full h-full rounded-full border border-dashed border-emerald-700/60 flex flex-col items-center justify-center text-[6px] font-bold text-emerald-800 leading-none">
                        <span>DISAHKAN</span>
                        <span className="text-[5px] text-emerald-600 font-mono mt-0.5">KEPALA MA</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollRevealCard>

            {/* CARD 3: Review & Admin (5 cols) */}
            <ScrollRevealCard
              delayMs={300}
              direction="up"
              threshold={0.15}
              className="lg:col-span-5 card-pro rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#0A3D26]/25 group relative"
            >
              <TechnicalCornerMarks />
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-mint)] text-[var(--canopy)] shadow-2xs group-hover:scale-105 transition-transform">
                    <ShieldCheck size={24} weight="fill" />
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold tracking-tight text-[var(--ink)]">
                      Review & Admin
                    </h3>
                    <p className="text-xs text-[var(--ink-muted)]">Proteksi akses dua tingkat</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed mt-3">
                  Akses transparan tanpa login untuk pemantauan siswa dan guru, sedangkan perubahan data terlindungi aman melalui otentikasi PIN Admin.
                </p>
              </div>

              {/* Micro-UI Stage: Security Gate Card */}
              <div className="mt-5 rounded-2xl border border-[#0A3D26]/12 bg-[#F8FAF9] p-3.5 shadow-inner select-none">
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-3 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--ink)]">
                    <span>Otentikasi Pengurus</span>
                    <span className="text-[10px] font-bold text-[#15803D] bg-[#EAF6EE] px-2 py-0.5 rounded-md">Bcrypt Secured</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 py-1.5 bg-[#F8FAF9] rounded-lg border border-slate-200">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <span key={i} className={`h-2.5 w-2.5 rounded-full ${i <= 4 ? "bg-[#0A3D26]" : "bg-slate-300"}`} />
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-100">
                    <span>Publik: Hanya Baca</span>
                    <span className="font-semibold text-[#0A3D26]">Admin: Hak Penuh</span>
                  </div>
                </div>
              </div>
            </ScrollRevealCard>

            {/* CARD 4: Multi-Kelas Terpadu (7 cols) */}
            <ScrollRevealCard
              delayMs={400}
              direction="up"
              threshold={0.15}
              className="lg:col-span-7 card-pro rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#0A3D26]/25 group relative"
            >
              <TechnicalCornerMarks />
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-mint)] text-[var(--canopy)] shadow-2xs group-hover:scale-105 transition-transform">
                    <UsersThree size={24} weight="fill" />
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold tracking-tight text-[var(--ink)]">
                      Multi-Kelas Terpadu
                    </h3>
                    <p className="text-xs text-[var(--ink-muted)]">Kompilasi kehadiran otomatis</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed mt-3 max-w-xl">
                  Satu sistem untuk seluruh jenjang kelas. Pantau distribusi kehadiran antar kelas secara komparatif dengan rasio komposisi kehadiran real-time.
                </p>
              </div>

              {/* Micro-UI Stage: Multi-Class Attendance Breakdown */}
              <div className="mt-5 rounded-2xl border border-[#0A3D26]/12 bg-[#F8FAF9] p-3.5 shadow-inner select-none">
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-3 shadow-xs space-y-2.5">
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-[var(--ink)] mb-1">
                      <span>Kelas XII IPS 1 (32 Siswa)</span>
                      <span className="font-bold text-[#15803D]">96.8%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                      <div className="bg-[#15803D] h-full" style={{ width: "96.8%" }} />
                      <div className="bg-amber-400 h-full" style={{ width: "3.2%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-[var(--ink)] mb-1">
                      <span>Kelas XII IPS 2 (30 Siswa)</span>
                      <span className="font-bold text-[#15803D]">93.3%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                      <div className="bg-[#15803D] h-full" style={{ width: "93.3%" }} />
                      <div className="bg-amber-400 h-full" style={{ width: "4.5%" }} />
                      <div className="bg-rose-500 h-full" style={{ width: "2.2%" }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#15803D]" /> Hadir</span>
                    <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Izin / Sakit</span>
                    <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Alpa</span>
                  </div>
                </div>
              </div>
            </ScrollRevealCard>
          </div>
        </section>

        {/* Deep Forest Showcase Banner (Scroll-Triggered Smooth Scale) */}
        <section className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <ScrollRevealCard
            delayMs={100}
            direction="scale"
            threshold={0.2}
            className="relative overflow-hidden rounded-3xl bg-[#0A3D26] p-6 sm:p-10 text-white shadow-[0_20px_45px_-14px_rgba(7,41,25,0.45)] group"
          >
            <TechnicalCornerMarks variant="dark" />
            <AmbientBackdrop variant="canopy" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A3E635]">
                  <CheckCircle size={16} weight="fill" />
                  <span>Siap Pakai & Database Persisten</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                  Transparansi Rekapitulasi Standar Sekolah
                </h2>
                <p className="text-sm sm:text-base text-emerald-100/85 leading-relaxed">
                  Seluruh data rekap tersimpan rapi di database SQLite lokal server dan dapat diakses cepat dari HP maupun desktop tanpa latensi cloud eksternal.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigateWithCurtain("/dashboard", "MEMBUKA DASHBOARD")}
                    className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-6 py-3.5 text-sm font-extrabold text-[#072919] shadow-md hover:bg-[#BEF264]"
                  >
                    <span>Mulai Jelajahi Dashboard</span>
                    <ArrowUpRight size={18} weight="bold" />
                  </button>
                  <Link
                    href="/info"
                    className="btn-tactile inline-flex items-center gap-2 rounded-full bg-white/12 px-6 py-3.5 text-sm font-bold text-white ring-1 ring-white/20 hover:bg-white/20"
                  >
                    <Buildings size={18} weight="bold" />
                    <span>Tentang App & Dev</span>
                  </Link>
                </div>
              </div>

              {/* Floating Glassmorphism Telemetry Card (Linear/Stripe Craft) */}
              <div className="w-full lg:w-auto lg:min-w-[340px] rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/15 p-5 shadow-2xl space-y-3.5 select-none">
                <div className="flex items-center justify-between text-xs text-emerald-200/90 pb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#A3E635]" />
                    <span className="font-mono uppercase font-bold tracking-wider">Persistensi Lokal WAL</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#A3E635]">0.4ms</span>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">100% On-Device</div>
                  <p className="text-xs text-emerald-100/75 mt-1 leading-relaxed">
                    Basis data SQLite berjalan langsung di server VPS tanpa dependensi API pihak ketiga.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2.5 pt-2.5 border-t border-white/10 text-[11px] font-mono">
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                    <span className="text-emerald-300/70 block text-[9px] uppercase tracking-wider">ENGINE</span>
                    <span className="font-bold text-white">WAL Mode</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                    <span className="text-emerald-300/70 block text-[9px] uppercase tracking-wider">INTEGRITAS</span>
                    <span className="font-bold text-white">ACID Safe</span>
                  </div>
                </div>
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
