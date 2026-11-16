"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  CheckCircle,
  FirstAidKit,
  EnvelopeSimple,
  WarningCircle,
  UsersThree,
  ArrowUpRight,
  ArrowClockwise,
  GraduationCap,
  BookOpenText,
  ChalkboardTeacher,
  SquaresFour,
  ChartDonut,
} from "@phosphor-icons/react";
import { AppShell } from "@/components/AppShell";
import { AmbientBackdrop } from "@/components/AmbientBackdrop";
import { PeriodPicker } from "@/components/CustomPickers";
import { withBasePath } from "@/lib/paths";

interface OverviewData {
  period: string;
  school: {
    name: string;
    npsn: string;
    address: string;
    academic_year: string;
    semester: string;
  };
  classes: Array<{
    id: number;
    name: string;
    homeroom_teacher: string;
    student_count: number;
  }>;
  summary: {
    total_students: number;
    total_hadir: number;
    total_sakit: number;
    total_izin: number;
    total_alpha: number;
    attendance_rate: number;
  };
  classBreakdown: Array<{
    id: number;
    name: string;
    homeroom_teacher: string;
    total_students: number;
    hadir: number;
    sakit: number;
    izin: number;
    alpha: number;
  }>;
}

function AttendanceRing({ rate }: { rate: number }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, rate));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative flex h-24 w-24 items-center justify-center shrink-0">
      <svg className="h-24 w-24 -rotate-90" viewBox="0 0 84 84" aria-hidden="true">
        <circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="7"
        />
        <circle
          cx="42"
          cy="42"
          r={radius}
          fill="none"
          stroke="#A3E635"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 600ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-num text-lg font-extrabold text-white leading-none">
          {clamped}%
        </span>
        <span className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-lime-200/90">
          Hadir
        </span>
      </div>
    </div>
  );
}

const CLASS_ICONS = [GraduationCap, BookOpenText, ChalkboardTeacher];

export default function DashboardPage() {
  const [period, setPeriod] = useState(() => new Date().toISOString().slice(0, 7));
  const [classId, setClassId] = useState("all");
  const [viewMode, setViewMode] = useState<"summary" | "chart">("summary");
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOverview = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        withBasePath(
          `/api/overview?period=${encodeURIComponent(period)}&classId=${encodeURIComponent(classId)}`
        )
      );
      if (!res.ok) throw new Error("Gagal memuat ringkasan data.");
      const json = (await res.json()) as OverviewData;
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  }, [period, classId]);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  const totalSessions =
    (data?.summary.total_hadir ?? 0) +
    (data?.summary.total_sakit ?? 0) +
    (data?.summary.total_izin ?? 0) +
    (data?.summary.total_alpha ?? 0);

  const pctOf = (v: number) =>
    totalSessions > 0 ? Math.round((v / totalSessions) * 1000) / 10 : 0;

  return (
    <AppShell>
      <div className="space-y-5">
        {/* Deep Forest Canopy Hero (Full-bleed mobile, rounded-3xl desktop) */}
        <section
          aria-label="Ringkasan Sistem"
          className="relative overflow-hidden rounded-b-[32px] lg:rounded-3xl bg-[#0A3D26] text-white shadow-[0_22px_48px_-16px_rgba(7,41,25,0.45)] animate-cascade"
        >
          <img
            src={withBasePath("/banner-madrasah.jpg")}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-[#072919]/95 via-[#0A3D26]/88 to-[#115737]/72"
          />
          <AmbientBackdrop variant="canopy" />

          <div className="relative z-10 px-5 pt-5 pb-12 sm:px-7 sm:pt-7 sm:pb-14 space-y-6">
            {/* Top App Row */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={withBasePath("/icon-erekap.png")}
                  alt="E-Rekap"
                  width={40}
                  height={40}
                  className="lg:hidden h-10 w-10 shrink-0 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                />
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-lime-200/90 truncate">
                    {data?.school
                      ? `TA ${data.school.academic_year} • ${data.school.semester}`
                      : "E-Rekap Madrasah"}
                  </p>
                  <p className="text-sm font-extrabold text-white lg:hidden leading-tight">E-Rekap</p>
                </div>
              </div>

              <div className="shrink-0">
                <PeriodPicker value={period} onChange={setPeriod} variant="canopy" />
              </div>
            </div>

            {/* Hero Metric & Action Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-3">
                <p className="text-xs font-semibold text-emerald-100/80">
                  Total Persentase Kehadiran
                </p>
                <div className="flex items-baseline gap-3">
                  <h1 className="font-num text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                    {loading ? "—" : `${data?.summary.attendance_rate ?? 0}%`}
                  </h1>
                  <span className="rounded-full bg-white/15 px-2.5 py-0.5 font-num text-xs font-bold text-emerald-100">
                    {loading ? "..." : `${data?.summary.total_students ?? 0} Siswa`}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <Link
                    href={`/rekap?period=${encodeURIComponent(period)}&classId=${encodeURIComponent(classId)}`}
                    className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-4 py-2.5 text-xs sm:text-sm font-extrabold text-[#072919] shadow-[0_8px_20px_-4px_rgba(163,230,53,0.5)] hover:bg-[#BEF264]"
                  >
                    <span>Buka Rekap</span>
                    <ArrowUpRight size={16} weight="bold" />
                  </Link>
                  <Link
                    href="/info"
                    className="btn-tactile inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2.5 text-xs sm:text-sm font-bold text-white ring-1 ring-white/20 backdrop-blur-md hover:bg-white/20"
                  >
                    <span>Info Sekolah</span>
                  </Link>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-4 rounded-2xl bg-black/20 p-3.5 ring-1 ring-white/15 backdrop-blur-md self-start md:self-auto">
                <AttendanceRing rate={loading ? 0 : data?.summary.attendance_rate ?? 0} />
                <div className="space-y-1.5 text-xs font-semibold text-emerald-100/90">
                  <p className="flex items-center justify-between gap-4">
                    <span>Hadir</span>
                    <span className="font-num font-bold text-white">{data?.summary.total_hadir ?? 0}</span>
                  </p>
                  <p className="flex items-center justify-between gap-4">
                    <span>Sakit</span>
                    <span className="font-num font-bold text-amber-200">{data?.summary.total_sakit ?? 0}</span>
                  </p>
                  <p className="flex items-center justify-between gap-4">
                    <span>Izin</span>
                    <span className="font-num font-bold text-sky-200">{data?.summary.total_izin ?? 0}</span>
                  </p>
                  <p className="flex items-center justify-between gap-4">
                    <span>Alpha</span>
                    <span className="font-num font-bold text-rose-200">{data?.summary.total_alpha ?? 0}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Overlapping White Category Sheet (-mt-8) */}
        <section
          aria-label="Pilih Kelas"
          className="relative z-20 -mt-8 mx-3.5 lg:mx-0 sheet-overlap rounded-3xl p-4 sm:p-5 animate-cascade"
          style={{ animationDelay: "40ms" }}
        >
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-sm font-extrabold text-[var(--ink)]">Filter Kelas</h2>
            <span className="font-num text-xs font-bold text-[var(--ink-muted)]">
              {data ? `${data.classes.length} Kelas Aktif` : "..."}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setClassId("all")}
              className="btn-tactile flex flex-col items-center gap-2 group"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-all ${
                  classId === "all"
                    ? "bg-[#0A3D26] text-[#A3E635] ring-4 ring-[#A3E635]/30 shadow-md"
                    : "bg-[var(--surface-mint)] text-[var(--canopy)] group-hover:bg-[#d7efe0]"
                }`}
              >
                <SquaresFour size={22} weight={classId === "all" ? "fill" : "regular"} />
              </span>
              <span
                className={`text-xs font-bold truncate max-w-full ${
                  classId === "all" ? "text-[var(--canopy)]" : "text-[var(--ink-muted)]"
                }`}
              >
                Semua
              </span>
            </button>

            {data?.classes.map((cls, idx) => {
              const active = classId === String(cls.id);
              const Icon = CLASS_ICONS[idx % CLASS_ICONS.length];
              return (
                <button
                  key={cls.id}
                  type="button"
                  onClick={() => setClassId(String(cls.id))}
                  className="btn-tactile flex flex-col items-center gap-2 group"
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-all ${
                      active
                        ? "bg-[#0A3D26] text-[#A3E635] ring-4 ring-[#A3E635]/30 shadow-md"
                        : "bg-[var(--surface-mint)] text-[var(--canopy)] group-hover:bg-[#d7efe0]"
                    }`}
                  >
                    <Icon size={22} weight={active ? "fill" : "regular"} />
                  </span>
                  <span
                    className={`text-xs font-bold truncate max-w-full ${
                      active ? "text-[var(--canopy)]" : "text-[var(--ink-muted)]"
                    }`}
                  >
                    {cls.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <div className="px-3.5 lg:px-0 space-y-6">
          {/* Error State */}
          {error && (
            <div
              role="alert"
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-900"
            >
              <div className="flex items-center gap-2.5 text-sm font-medium">
                <WarningCircle size={20} weight="fill" className="text-red-700 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                type="button"
                onClick={loadOverview}
                className="btn-tactile inline-flex items-center gap-1.5 rounded-lg bg-red-700 px-3 py-1.5 text-xs font-semibold text-white"
              >
                <ArrowClockwise size={14} />
                <span>Coba Lagi</span>
              </button>
            </div>
          )}

          {/* View Mode Switcher (Ringkasan vs Grafik) */}
          <div className="flex items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Mode Tampilan Dashboard"
              className="inline-flex items-center gap-1 rounded-full bg-[var(--surface)] p-1 border border-[var(--border)] shadow-[var(--shadow-card)]"
            >
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === "summary"}
                onClick={() => setViewMode("summary")}
                className={`btn-tactile inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold transition-colors ${
                  viewMode === "summary"
                    ? "bg-[#0A3D26] text-[#A3E635] shadow-sm"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                }`}
              >
                <SquaresFour size={15} weight={viewMode === "summary" ? "fill" : "regular"} />
                <span>Ringkasan</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === "chart"}
                onClick={() => setViewMode("chart")}
                className={`btn-tactile inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-extrabold transition-colors ${
                  viewMode === "chart"
                    ? "bg-[#0A3D26] text-[#A3E635] shadow-sm"
                    : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                }`}
              >
                <ChartDonut size={15} weight={viewMode === "chart" ? "fill" : "regular"} />
                <span>Grafik</span>
              </button>
            </div>

            <span className="font-num text-xs font-bold text-[var(--ink-muted)]">
              {totalSessions.toLocaleString("id-ID")} Sesi Tercatat
            </span>
          </div>

          {viewMode === "chart" ? (
            <section aria-label="Visualisasi Grafik Kehadiran" className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-cascade">
              {/* SVG Donut Chart Card */}
              <div className="lg:col-span-5 card-pro rounded-3xl p-5 sm:p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--canopy)]">
                      Proporsi Kehadiran
                    </p>
                    <h3 className="text-base font-extrabold text-[var(--ink)]">
                      Distribusi Status Bulanan
                    </h3>
                  </div>
                  <span className="font-num rounded-full bg-[var(--surface-mint)] px-3 py-1 text-xs font-extrabold text-[var(--canopy)]">
                    {data?.summary.attendance_rate ?? 0}% Hadir
                  </span>
                </div>

                {(() => {
                  const segments = [
                    { label: "Hadir", val: data?.summary.total_hadir ?? 0, color: "#15803D", dot: "bg-[#15803D]" },
                    { label: "Sakit", val: data?.summary.total_sakit ?? 0, color: "#F59E0B", dot: "bg-amber-500" },
                    { label: "Izin", val: data?.summary.total_izin ?? 0, color: "#0284C7", dot: "bg-sky-600" },
                    { label: "Alpha", val: data?.summary.total_alpha ?? 0, color: "#E11D48", dot: "bg-rose-600" },
                  ];
                  const r = 64;
                  const circ = 2 * Math.PI * r;
                  let accOffset = 0;

                  return (
                    <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-6">
                      <div className="relative h-44 w-44 shrink-0 flex items-center justify-center">
                        <svg viewBox="0 0 160 160" className="h-44 w-44 -rotate-90">
                          <circle
                            cx="80"
                            cy="80"
                            r={r}
                            fill="none"
                            stroke="var(--bg)"
                            strokeWidth="20"
                          />
                          {totalSessions > 0 &&
                            segments.map((seg) => {
                              if (seg.val <= 0) return null;
                              const len = (seg.val / totalSessions) * circ;
                              const dashArray = `${len} ${circ - len}`;
                              const dashOffset = -accOffset;
                              accOffset += len;
                              return (
                                <circle
                                  key={seg.label}
                                  cx="80"
                                  cy="80"
                                  r={r}
                                  fill="none"
                                  stroke={seg.color}
                                  strokeWidth="20"
                                  strokeDasharray={dashArray}
                                  strokeDashoffset={dashOffset}
                                  className="transition-all duration-700 ease-out"
                                />
                              );
                            })}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="font-num text-2xl font-extrabold text-[var(--ink)]">
                            {totalSessions.toLocaleString("id-ID")}
                          </span>
                          <span className="text-[11px] font-bold text-[var(--ink-muted)]">
                            Total Sesi
                          </span>
                        </div>
                      </div>

                      <div className="w-full grid grid-cols-2 sm:grid-cols-1 gap-2.5">
                        {segments.map((seg) => (
                          <div
                            key={seg.label}
                            className="flex items-center justify-between rounded-2xl bg-[var(--bg)] px-3.5 py-2.5"
                          >
                            <span className="flex items-center gap-2 text-xs font-bold text-[var(--ink)]">
                              <span className={`h-2.5 w-2.5 rounded-full ${seg.dot}`} />
                              {seg.label}
                            </span>
                            <span className="font-num text-xs font-extrabold text-[var(--ink)]">
                              {seg.val} <span className="text-[var(--ink-muted)]">({pctOf(seg.val)}%)</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Per-Class Stacked Bar Comparison */}
              <div className="lg:col-span-7 card-pro rounded-3xl p-5 sm:p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--canopy)]">
                      Komparasi Kelas
                    </p>
                    <h3 className="text-base font-extrabold text-[var(--ink)]">
                      Grafik Kehadiran Per Kelas
                    </h3>
                  </div>
                  <Link
                    href="/rekap"
                    className="text-xs font-bold text-[var(--canopy)] hover:underline underline-offset-4"
                  >
                    Buka Tabel
                  </Link>
                </div>

                {!data || data.classBreakdown.length === 0 ? (
                  <div className="rounded-2xl bg-[var(--bg)] p-8 text-center text-xs font-semibold text-[var(--ink-muted)]">
                    Belum ada data kelas untuk divisualisasikan.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {data.classBreakdown.map((row) => {
                      const total = row.hadir + row.sakit + row.izin + row.alpha;
                      const rate = total > 0 ? Math.round((row.hadir / total) * 1000) / 10 : 0;
                      const w = (val: number) => (total > 0 ? `${(val / total) * 100}%` : "0%");
                      return (
                        <div key={row.id} className="space-y-2 rounded-2xl bg-[var(--bg)] p-3.5">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <p className="text-sm font-extrabold text-[var(--ink)]">{row.name}</p>
                              <p className="text-[11px] font-medium text-[var(--ink-muted)]">
                                {row.total_students} Siswa • {row.homeroom_teacher}
                              </p>
                            </div>
                            <span className="font-num rounded-full bg-[#0A3D26] px-2.5 py-1 text-xs font-extrabold text-[#A3E635]">
                              {rate}%
                            </span>
                          </div>

                          <div className="h-3.5 w-full overflow-hidden rounded-full bg-white flex">
                            <div style={{ width: w(row.hadir) }} className="h-full bg-[#15803D]" title={`Hadir: ${row.hadir}`} />
                            <div style={{ width: w(row.sakit) }} className="h-full bg-amber-500" title={`Sakit: ${row.sakit}`} />
                            <div style={{ width: w(row.izin) }} className="h-full bg-sky-600" title={`Izin: ${row.izin}`} />
                            <div style={{ width: w(row.alpha) }} className="h-full bg-rose-600" title={`Alpha: ${row.alpha}`} />
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-[11px] font-num font-bold text-[var(--ink-muted)]">
                            <span className="text-[#15803D]">H: {row.hadir}</span>
                            <span className="text-amber-700">S: {row.sakit}</span>
                            <span className="text-sky-700">I: {row.izin}</span>
                            <span className="text-rose-700">A: {row.alpha}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          ) : (
            <>
          {/* 4 Metric Cards */}
          <section aria-label="Metrik Kehadiran" className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {[
              {
                label: "Hadir",
                value: data?.summary.total_hadir ?? 0,
                icon: CheckCircle,
                bg: "bg-[var(--status-hadir-bg)]",
                fg: "text-[var(--status-hadir-fg)]",
                bar: "bg-[#15803D]",
              },
              {
                label: "Sakit",
                value: data?.summary.total_sakit ?? 0,
                icon: FirstAidKit,
                bg: "bg-[var(--status-sakit-bg)]",
                fg: "text-[var(--status-sakit-fg)]",
                bar: "bg-amber-500",
              },
              {
                label: "Izin",
                value: data?.summary.total_izin ?? 0,
                icon: EnvelopeSimple,
                bg: "bg-[var(--status-izin-bg)]",
                fg: "text-[var(--status-izin-fg)]",
                bar: "bg-sky-600",
              },
              {
                label: "Alpha",
                value: data?.summary.total_alpha ?? 0,
                icon: WarningCircle,
                bg: "bg-[var(--status-alpha-bg)]",
                fg: "text-[var(--status-alpha-fg)]",
                bar: "bg-rose-600",
              },
            ].map((item) => {
              const Icon = item.icon;
              const share = pctOf(item.value);
              return (
                <div
                  key={item.label}
                  className="card-pro rounded-2xl p-4 flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--ink-muted)]">
                      {item.label}
                    </span>
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${item.bg} ${item.fg}`}>
                      <Icon size={17} weight="fill" />
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-num text-2xl font-extrabold text-[var(--ink)]">
                      {loading ? "—" : item.value.toLocaleString("id-ID")}
                    </p>
                    <span className={`font-num text-xs font-extrabold ${item.fg}`}>
                      {share}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--bg)]">
                    <div
                      style={{ width: `${Math.min(100, share)}%` }}
                      className={`h-full rounded-full ${item.bar}`}
                    />
                  </div>
                </div>
              );
            })}
          </section>

          {/* Class Breakdown Cards (Ref-2 Right Screen Architecture) */}
          <section aria-label="Ringkasan Per Kelas" className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UsersThree size={20} weight="fill" className="text-[var(--canopy)]" />
                <h2 className="text-base font-extrabold text-[var(--ink)]">
                  Ringkasan Per Kelas
                </h2>
              </div>
              <Link
                href="/rekap"
                className="text-xs font-bold text-[var(--canopy)] hover:underline underline-offset-4"
              >
                Lihat Semua
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-36 animate-pulse rounded-3xl card-pro" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data?.classBreakdown.map((row) => {
                  const total = row.hadir + row.sakit + row.izin + row.alpha;
                  const rate = total > 0 ? Math.round((row.hadir / total) * 1000) / 10 : 0;
                  return (
                    <Link
                      key={row.id}
                      href={`/rekap?classId=${row.id}&period=${encodeURIComponent(period)}`}
                      className="card-pro rounded-3xl p-5 flex flex-col justify-between gap-4 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-base font-extrabold text-[var(--ink)] group-hover:text-[var(--canopy)] transition-colors">
                            {row.name}
                          </h3>
                          <p className="text-xs font-medium text-[var(--ink-muted)]">
                            {row.total_students} Siswa • {row.homeroom_teacher}
                          </p>
                        </div>
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-raised)] text-[var(--ink)] group-hover:bg-[#0A3D26] group-hover:text-[#A3E635] transition-colors">
                          <ArrowUpRight size={16} weight="bold" />
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-left">
                        <div>
                          <p className="text-[11px] font-medium text-[var(--ink-muted)]">Hadir</p>
                          <p className="font-num text-sm font-extrabold text-[var(--ink)]">{row.hadir}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium text-[var(--ink-muted)]">Sakit</p>
                          <p className="font-num text-sm font-extrabold text-[var(--ink)]">{row.sakit}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium text-[var(--ink-muted)]">Izin</p>
                          <p className="font-num text-sm font-extrabold text-[var(--ink)]">{row.izin}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium text-[var(--ink-muted)]">Alpha</p>
                          <p className="font-num text-sm font-extrabold text-[var(--ink)]">{row.alpha}</p>
                        </div>
                      </div>

                      {/* Thick Progress Bar + Dark Obsidian Percentage Pill */}
                      <div className="space-y-2">
                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--bg)]">
                          <div
                            style={{ width: `${Math.min(100, rate)}%` }}
                            className="h-full rounded-full bg-gradient-to-r from-[#115737] to-[#84CC16]"
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[var(--ink-muted)]">
                            Kehadiran
                          </span>
                          <span className="font-num rounded-full bg-[#0B1410] px-2.5 py-0.5 text-[11px] font-extrabold text-white">
                            {rate}%
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}
