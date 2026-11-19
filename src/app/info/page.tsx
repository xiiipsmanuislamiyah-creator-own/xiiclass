"use client";

import { useEffect, useState } from "react";
import {
  Globe,
  GithubLogo,
  TiktokLogo,
  ArrowUpRight,
  ShieldCheck,
  Database,
  Printer,
  FileXls,
  Buildings,
  MapPin,
  IdentificationCard,
  MonitorPlay,
} from "@phosphor-icons/react";
import { AppShell } from "@/components/AppShell";
import { AmbientBackdrop } from "@/components/AmbientBackdrop";
import { withBasePath } from "@/lib/paths";

interface SchoolData {
  name: string;
  npsn: string;
  address: string;
  headmaster: string;
  academic_year: string;
  semester: string;
}

export default function InfoPage() {
  const [school, setSchool] = useState<SchoolData | null>(null);

  useEffect(() => {
    fetch(withBasePath("/api/school"))
      .then((r) => r.json())
      .then((d) => setSchool(d.school))
      .catch(() => {});
  }, []);

  return (
    <AppShell>
      <div className="space-y-5">
        {/* Canopy Header — Institutional Precision Banner */}
        <section className="relative overflow-hidden rounded-b-[28px] lg:rounded-3xl bg-gradient-to-br from-[#0A3D26] via-[#093521] to-[#062215] px-5 pt-6 pb-14 sm:px-7 sm:pt-7 text-white border-b border-[#A3E635]/25 ring-1 ring-inset ring-white/10 shadow-[0_20px_44px_-14px_rgba(7,41,25,0.52)] animate-cascade">
          <AmbientBackdrop variant="canopy" />
          {/* Technical Grid & Dot-Matrix Texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(163,230,53,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(163,230,53,0.45) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage: "radial-gradient(ellipse 85% 80% at 70% 40%, black 35%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 85% 80% at 70% 40%, black 35%, transparent 100%)",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] p-2 ring-1 ring-[#A3E635]/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_24px_-8px_rgba(0,0,0,0.45)] backdrop-blur-xs">
                <img
                  src={withBasePath("/icon-erekap.png")}
                  alt="Ikon E-Rekap"
                  width={56}
                  height={56}
                  className="h-12 w-12 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                />
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#A3E635]">
                    Detail Aplikasi Web
                  </p>
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-snug">
                    E-Rekap — Sistem Rekapitulasi Kehadiran
                  </h1>
                </div>

                {/* Functional Status & Metadata Chips */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-num inline-flex items-center rounded-full bg-white/[0.09] px-2.5 py-0.5 text-[11px] font-bold text-white ring-1 ring-white/15">
                    v1.0.0
                  </span>
                  <span className="font-num inline-flex items-center gap-1.5 rounded-full bg-[#A3E635]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#BEF264] ring-1 ring-[#A3E635]/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635] shadow-[0_0_8px_#A3E635]" />
                    Status: Aktif
                  </span>
                  <span className="font-num inline-flex items-center gap-1.5 rounded-full bg-black/25 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-100/90 ring-1 ring-white/10">
                    <Database size={12} weight="fill" className="text-[#A3E635]" />
                    DB: SQLite
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Anchor: Attendance Telemetry Sparkline & Core Capabilities */}
            <div className="hidden lg:flex flex-col items-end gap-2.5 shrink-0 rounded-2xl bg-black/20 px-4 py-3 ring-1 ring-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-num text-[10px] font-semibold uppercase tracking-wider text-emerald-200/70">
                    Arsitektur Sistem
                  </p>
                  <p className="font-num text-xs font-bold text-white">
                    Next.js + SQLite WAL
                  </p>
                </div>
                <svg
                  width="76"
                  height="28"
                  viewBox="0 0 76 28"
                  fill="none"
                  aria-hidden="true"
                  className="text-[#A3E635]"
                >
                  <path
                    d="M2 22 L14 17 L24 19 L36 10 L48 13 L60 5 L74 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 22 L14 17 L24 19 L36 10 L48 13 L60 5 L74 7 L74 26 L2 26 Z"
                    fill="currentColor"
                    fillOpacity="0.14"
                  />
                  <circle cx="74" cy="7" r="2.5" fill="currentColor" />
                </svg>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-100/80">
                <span className="rounded-md bg-white/[0.08] px-2 py-0.5">Review Publik</span>
                <span className="rounded-md bg-white/[0.08] px-2 py-0.5">Panel Admin</span>
                <span className="rounded-md bg-white/[0.08] px-2 py-0.5">Backup XLSX</span>
              </div>
            </div>
          </div>
        </section>

        {/* Overlapping Content Stack */}
        <div className="relative z-20 -mt-9 px-3.5 lg:px-0 space-y-5">
          {/* 1. TOP: Detail & Spesifikasi Aplikasi */}
          <section
            aria-label="Detail Aplikasi"
            className="sheet-overlap rounded-3xl p-5 sm:p-6 space-y-5 animate-cascade"
            style={{ animationDelay: "40ms" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-extrabold text-[var(--ink)]">
                  Tentang Aplikasi E-Rekap
                </h2>
                <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-0.5">
                  Platform rekapitulasi kehadiran siswa berbasis web dengan akses Review Publik dan Panel Admin terproteksi.
                </p>
              </div>
              <span className="font-num self-start inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-mint)] px-3 py-1 text-xs font-bold text-[var(--canopy)] ring-1 ring-[var(--border-strong)]">
                <ShieldCheck size={14} weight="fill" />
                Mode Review & Admin
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {[
                {
                  icon: ShieldCheck,
                  title: "Review & Admin",
                  desc: "Siswa/guru bebas meninjau rekap; perubahan data hanya melalui login Admin.",
                },
                {
                  icon: Database,
                  title: "SQLite Persisten",
                  desc: "Seluruh data kelas, siswa, No. Absen, dan rekap tersimpan aman di server.",
                },
                {
                  icon: FileXls,
                  title: "Backup XLSX (Import/Export)",
                  desc: "Ekspor laporan serta impor restore data spreadsheet .xlsx di panel Admin.",
                },
                {
                  icon: Printer,
                  title: "Siap Cetak A4 Landscape",
                  desc: "Format tabel formal standar sekolah lengkap dengan Kop Surat resmi.",
                },
              ].map((spec) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={spec.title}
                    className="rounded-2xl bg-[var(--surface-raised)] border border-[var(--border-strong)] p-4 space-y-2.5 shadow-[0_4px_14px_-6px_rgba(10,61,38,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] transition-transform duration-150 hover:-translate-y-0.5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--surface-mint)] text-[var(--canopy)] ring-1 ring-[var(--border-strong)]">
                      <Icon size={19} weight="fill" />
                    </span>
                    <p className="text-sm font-extrabold text-[var(--ink)]">{spec.title}</p>
                    <p className="text-xs text-[var(--ink-muted)] leading-relaxed">{spec.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 1.5. Panduan Visual & Video Showcase E-Rekap */}
          <section
            aria-label="Panduan Visual & Video Showcase"
            className="card-pro rounded-3xl p-5 sm:p-7 space-y-6 animate-cascade"
            style={{ animationDelay: "70ms" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--surface-mint)] text-[var(--canopy)] ring-1 ring-[var(--border-strong)]">
                    <MonitorPlay size={16} weight="fill" />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--canopy)]">
                    Panduan Interaktif
                  </p>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[var(--ink)]">
                  Video Panduan & Alur Penggunaan
                </h2>
                <p className="text-xs sm:text-sm text-[var(--ink-muted)]">
                  Simulasi alur operasional E-Rekap: dari review harian, manajemen filter kelas, hingga ekspor laporan.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="font-num inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-mint)] px-3 py-1 text-xs font-extrabold text-[var(--canopy)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--canopy)] animate-pulse" />
                  Durasi 60 Detik
                </span>
                <span className="font-num rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-bold text-[var(--ink-muted)]">
                  720p HD • 5.0 MB
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Kolom Kiri: Responsive Phone Device Mockup Frame */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[280px] sm:max-w-[310px] rounded-[36px] bg-[#0E1713] p-2.5 sm:p-3 shadow-[0_20px_50px_-15px_rgba(10,61,38,0.4),0_0_0_1px_rgba(255,255,255,0.1)_inset] ring-1 ring-black/30">
                  {/* Speaker Notch Accent */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-1.5 h-4 w-20 rounded-full bg-black/80 px-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
                    <div className="h-1 w-6 rounded-full bg-white/20" />
                  </div>

                  {/* Video Container (9:16 Aspect Ratio) */}
                  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[26px] bg-black">
                    <video
                      controls
                      playsInline
                      preload="none"
                      poster={withBasePath("/erekap-showcase-poster.jpg")}
                      className="h-full w-full object-cover"
                    >
                      <source src={withBasePath("/erekap-showcase.mp4")} type="video/mp4" />
                      Browser Anda tidak mendukung pemutar video HTML5.
                    </video>
                  </div>

                  {/* Home Bar Indicator Accent */}
                  <div className="mt-2 flex justify-center">
                    <div className="h-1 w-24 rounded-full bg-white/30" />
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: 4 Tahapan Inti yang Diperagakan di Video */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-[var(--canopy)]">
                    Ringkasan Alur Sistem
                  </p>
                  <h3 className="text-base sm:text-lg font-extrabold text-[var(--ink)]">
                    4 Fitur Utama yang Ditunjukkan dalam Video
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      step: "01",
                      title: "Tinjau Rekap Tanpa Login",
                      desc: "Akses publik langsung menampilkan persentase hadir, sakit, izin, dan alpha secara real-time.",
                      badge: "Akses Publik",
                    },
                    {
                      step: "02",
                      title: "Navigasi Cepat per Kelas",
                      desc: "Pilih filter instan untuk beralih antar rombel (X IPA, XI IPA, XII IPS) dengan performa responsif.",
                      badge: "Filter Rombel",
                    },
                    {
                      step: "03",
                      title: "Input & Koreksi Terproteksi",
                      desc: "Modifikasi absensi tersentralisasi di Panel Admin dengan autentikasi kata sandi terenkripsi.",
                      badge: "Admin Enkripsi",
                    },
                    {
                      step: "04",
                      title: "Format Excel & Cetak Dokumen",
                      desc: "Dukungan penuh impor/ekspor .xlsx serta cetak langsung Kop Surat resmi madrasah ukuran A4.",
                      badge: "Export & Cetak",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex items-start gap-3.5 rounded-2xl bg-[var(--surface-raised)] border border-[var(--border)] p-3.5 sm:p-4 transition-all duration-150 hover:border-[var(--border-strong)] hover:shadow-xs"
                    >
                      <span className="font-num flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-mint)] text-xs font-extrabold text-[var(--canopy)] ring-1 ring-[var(--border-strong)]">
                        {item.step}
                      </span>
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-extrabold text-[var(--ink)] truncate">
                            {item.title}
                          </p>
                          <span className="font-num shrink-0 rounded-md bg-[var(--bg)] px-2 py-0.5 text-[10px] font-bold text-[var(--ink-muted)] border border-[var(--border)]">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[var(--ink-muted)]">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <ShieldCheck size={16} weight="fill" className="text-[var(--canopy)]" />
                    Kompatibel di semua browser HP & Desktop
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[var(--border-strong)] hidden sm:inline-block" />
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Database size={16} weight="fill" className="text-[var(--canopy)]" />
                    Fast-start streaming (langsung play tanpa lag)
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 2. MIDDLE: Lembaga Terdaftar (Compact) */}
          <section
            aria-label="Informasi Lembaga"
            className="card-pro rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-cascade"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-start sm:items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--surface-mint)] text-[var(--canopy)]">
                <Buildings size={22} weight="fill" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                  Lembaga Terdaftar
                </p>
                <p className="text-sm font-extrabold text-[var(--ink)]">
                  {school?.name || "MA NU Islamiyah Asembagus"}
                </p>
                <p className="text-xs text-[var(--ink-muted)] flex items-center gap-1 mt-0.5">
                  <MapPin size={13} weight="fill" className="text-[var(--canopy)] shrink-0" />
                  <span>
                    {school?.address ||
                      "Jl. Raya No. 170 Asembagus, Desa Trigonco, Kec. Asembagus, Kab. Situbondo"}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--bg)] px-3 py-1.5 font-num text-xs font-bold text-[var(--ink)]">
                <IdentificationCard size={14} weight="fill" className="text-[var(--canopy)]" />
                NPSN {school?.npsn || "20584645"}
              </span>
              <span className="rounded-full bg-[var(--surface-mint)] px-3 py-1.5 font-num text-xs font-bold text-[var(--canopy)]">
                TA {school?.academic_year || "2026/2027"} ({school?.semester || "Ganjil"})
              </span>
            </div>
          </section>

          {/* 2.5. Anggota Kelompok (Tampil pada versi tugas kelas, disembunyikan pada mode demo) */}
          {process.env.NEXT_PUBLIC_DEMO_MODE !== "true" && (
            <section
              aria-label="Anggota Kelompok"
              className="card-pro rounded-3xl p-5 sm:p-6 space-y-4 animate-cascade"
              style={{ animationDelay: "140ms" }}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--canopy)]">
                    Tim Penyusun
                  </p>
                  <h2 className="text-lg font-extrabold text-[var(--ink)]">
                    Anggota Kelompok
                  </h2>
                </div>
                <span className="font-num rounded-full bg-[var(--surface-mint)] px-3 py-1 text-xs font-extrabold text-[var(--canopy)]">
                  6 Anggota
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {[
                  { name: "Rohmatulloh", role: "Ketua & Pengembang" },
                  { name: "M. Wildan Ulin Nuha", role: "Anggota Kelompok" },
                  { name: "Reski Abdillah", role: "Anggota Kelompok" },
                  { name: "Ananda Iksan Wijaya", role: "Anggota Kelompok" },
                  { name: "M. Hafid", role: "Anggota Kelompok" },
                  { name: "M. Kafka", role: "Anggota Kelompok" },
                ].map((member, idx) => (
                  <div
                    key={member.name}
                    className="flex items-center gap-3 rounded-2xl bg-[var(--bg)] px-3.5 py-3"
                  >
                    <span className="font-num flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0A3D26] text-xs font-extrabold text-[#A3E635]">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold text-[var(--ink)] truncate">
                        {member.name}
                      </p>
                      <p className="text-[11px] font-semibold text-[var(--ink-muted)] truncate">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 3. BOTTOM: Personal Branding & Profil Pengembang (Rohmatulloh / R_HMT OFC) */}
          <section
            aria-label="Profil Pengembang"
            className="card-pro rounded-3xl p-5 sm:p-6 space-y-5 animate-cascade"
            style={{ animationDelay: "160ms" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 rounded-2xl p-0.5 bg-gradient-to-br from-[#A3E635] via-[#115737] to-[#072919] shadow-lg">
                  <img
                    src={withBasePath("/pp-dev.webp")}
                    alt="Foto Profil Rohmatulloh (R_HMT OFC)"
                    width={80}
                    height={80}
                    className="h-full w-full rounded-[14px] object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="inline-flex items-center rounded-full bg-[var(--surface-mint)] px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-[var(--canopy)]">
                    Pelajar MA • Web & Agentic Dev
                  </span>
                  <h2 className="text-xl font-extrabold tracking-tight text-[var(--ink)]">
                    Rohmatulloh <span className="text-[var(--canopy)]">(R_HMT OFC)</span>
                  </h2>
                  <p className="text-xs font-semibold text-[var(--ink-muted)]">
                    Personal Branding: <span className="font-bold text-[var(--ink)]">rhmt ofc</span> • Indonesia
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href="https://rhmt.biz.id"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-4 py-2.5 text-xs font-extrabold text-[#072919] shadow-sm hover:bg-[#BEF264]"
                >
                  <Globe size={16} weight="bold" />
                  <span>rhmt.biz.id</span>
                  <ArrowUpRight size={14} weight="bold" />
                </a>

                <a
                  href="https://github.com/xiiipsmanuislamiyah-creator-own/xiiclass"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[#0B1410] px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
                >
                  <GithubLogo size={16} weight="fill" />
                  <span>Source Code</span>
                  <ArrowUpRight size={14} weight="bold" />
                </a>

                <a
                  href="https://github.com/rhmt-ofc"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[var(--bg)] px-4 py-2.5 text-xs font-bold text-[var(--ink)] hover:bg-[var(--surface-raised)]"
                >
                  <GithubLogo size={16} weight="fill" />
                  <span>github.com/rhmt-ofc</span>
                </a>

                <a
                  href="https://www.tiktok.com/@rhmtofc"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[var(--surface-mint)] px-4 py-2.5 text-xs font-bold text-[var(--canopy)] hover:bg-[#d7efe0]"
                >
                  <TiktokLogo size={16} weight="fill" />
                  <span>@rhmtofc</span>
                </a>
              </div>
            </div>

            <p className="text-sm text-[var(--ink-muted)] leading-relaxed border-t border-[var(--border)] pt-4">
              Saya <strong>R_HMT OFC</strong>, pelajar MA yang mendalami pengembangan web modern, automasi sistem, dan kolaborasi bersama AI. <strong>E-Rekap</strong> dibangun dengan arsitektur Next.js + SQLite untuk menghadirkan pengalaman aplikasi native yang rapi dan berstandar sekolah.
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
