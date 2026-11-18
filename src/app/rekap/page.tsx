"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import * as XLSX from "xlsx";
import {
  MagnifyingGlass,
  Printer,
  FileXls,
  ArrowsDownUp,
  WarningCircle,
  ArrowClockwise,
} from "@phosphor-icons/react";
import { AppShell } from "@/components/AppShell";
import { PeriodPicker } from "@/components/CustomPickers";
import { withBasePath } from "@/lib/paths";

interface RekapRow {
  student_id: number;
  nis: string;
  name: string;
  gender: "L" | "P";
  class_id: number;
  class_name: string;
  homeroom_teacher: string;
  hadir: number;
  sakit: number;
  izin: number;
  alpha: number;
  total: number;
  percentage: number;
  note: string;
}

interface SchoolInfo {
  name: string;
  npsn: string;
  address: string;
  academic_year: string;
  semester: string;
}

interface ClassInfo {
  id: number;
  name: string;
  homeroom_teacher: string;
}

function RekapContent() {
  const searchParams = useSearchParams();
  const [period, setPeriod] = useState(
    () => searchParams.get("period") || new Date().toISOString().slice(0, 7)
  );
  const [classId, setClassId] = useState(() => searchParams.get("classId") || "all");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "percentage">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const [rows, setRows] = useState<RekapRow[]>([]);
  const [school, setSchool] = useState<SchoolInfo | null>(null);
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [excelMode, setExcelMode] = useState(false);

  const fetchMeta = useCallback(async () => {
    try {
      const [sRes, cRes] = await Promise.all([
        fetch(withBasePath("/api/school")),
        fetch(withBasePath("/api/classes")),
      ]);
      if (sRes.ok) {
        const sd = await sRes.json();
        setSchool(sd.school);
      }
      if (cRes.ok) {
        const cd = await cRes.json();
        setClasses(cd.classes || []);
      }
    } catch {
      // handled in main table fetch
    }
  }, []);

  const fetchRekap = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = withBasePath(
        `/api/rekap?period=${encodeURIComponent(period)}&classId=${encodeURIComponent(classId)}&q=${encodeURIComponent(query)}`
      );
      const res = await fetch(url);
      if (!res.ok) throw new Error("Gagal mengambil data rekap.");
      const data = await res.json();
      setRows(data.rows || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  }, [period, classId, query]);

  useEffect(() => {
    fetchMeta();
  }, [fetchMeta]);

  useEffect(() => {
    const t = setTimeout(() => {
      fetchRekap();
    }, 150);
    return () => clearTimeout(t);
  }, [fetchRekap]);

  const sortedRows = [...rows].sort((a, b) => {
    if (sortBy === "percentage") {
      return sortDir === "asc" ? a.percentage - b.percentage : b.percentage - a.percentage;
    }
    return sortDir === "asc"
      ? a.name.localeCompare(b.name, "id")
      : b.name.localeCompare(a.name, "id");
  });

  const handleSort = (col: "name" | "percentage") => {
    if (sortBy === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(col);
      setSortDir(col === "percentage" ? "desc" : "asc");
    }
  };

  const handleExportExcel = () => {
    const exportData = sortedRows.map((r, idx) => ({
      No: idx + 1,
      "No. Absen": r.nis,
      "Nama Siswa": r.name,
      Kelas: r.class_name,
      "L/P": r.gender,
      "Hadir (H)": r.hadir,
      "Sakit (S)": r.sakit,
      "Izin (I)": r.izin,
      "Alpha (A)": r.alpha,
      "Persentase (%)": `${r.percentage}%`,
      Keterangan: r.note || "-",
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rekap Kehadiran");
    const clsName =
      classId === "all"
        ? "Semua-Kelas"
        : classes.find((c) => String(c.id) === classId)?.name.replace(/\s+/g, "-") || "Kelas";
    XLSX.writeFile(wb, `Rekap-Kehadiran-${clsName}-${period}.xlsx`);
  };

  const selectedClassName =
    classId === "all"
      ? "Semua Kelas"
      : classes.find((c) => String(c.id) === classId)?.name || "-";

  return (
    <AppShell>
      <div className="space-y-5">
        {/* Formal Kop Surat (Visible in Print Mode Only — No Signature Block) */}
        <div className="hidden print-only mb-4 border-b-2 border-black pb-3 text-center">
          <p className="text-base font-bold uppercase tracking-wide">
            {school?.name || "MA NU Islamiyah Asembagus"}
          </p>
          <p className="text-xs">
            NPSN: {school?.npsn || "20584645"} • {school?.address || ""}
          </p>
          <p className="mt-2 text-sm font-bold uppercase">
            REKAPITULASI KEHADIRAN SISWA ({selectedClassName}) — PERIODE {period}
          </p>
          <p className="text-xs">
            Tahun Ajaran {school?.academic_year || "2026/2027"} • Semester {school?.semester || "Ganjil"}
          </p>
        </div>

        {/* Canopy Header */}
        <section className="no-print relative overflow-hidden rounded-b-[28px] lg:rounded-3xl bg-[#0A3D26] px-5 pt-5 pb-11 sm:px-7 sm:pt-7 sm:pb-12 text-white shadow-[0_18px_40px_-14px_rgba(7,41,25,0.45)] animate-cascade">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-lime-200/90">
                Data Resmi Terverifikasi
              </p>
              <h1 className="text-2xl font-extrabold tracking-tight text-white">
                Rekapitulasi Kehadiran
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => setExcelMode(true)}
                disabled={sortedRows.length === 0}
                className="btn-tactile inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs sm:text-sm font-bold text-white ring-1 ring-white/20 backdrop-blur-md hover:bg-white/20 disabled:opacity-50"
              >
                <FileXls size={17} weight="bold" className="text-emerald-300" />
                <span>Tampilan Full Excel</span>
              </button>
              <button
                type="button"
                onClick={handleExportExcel}
                disabled={sortedRows.length === 0}
                className="btn-tactile inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs sm:text-sm font-bold text-white ring-1 ring-white/20 backdrop-blur-md hover:bg-white/20 disabled:opacity-50"
              >
                <FileXls size={17} weight="bold" className="text-[#A3E635]" />
                <span>Ekspor Excel</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                disabled={sortedRows.length === 0}
                className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-4 py-2 text-xs sm:text-sm font-extrabold text-[#072919] shadow-md hover:bg-[#BEF264] disabled:opacity-50"
              >
                <Printer size={17} weight="bold" />
                <span>Cetak A4</span>
              </button>
            </div>
          </div>
        </section>

        {/* Overlapping Search & Filter Sheet */}
        <section
          aria-label="Filter Rekap"
          className="no-print relative z-20 -mt-8 mx-3.5 lg:mx-0 sheet-overlap rounded-3xl p-4 space-y-3 animate-cascade"
          style={{ animationDelay: "40ms" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="relative flex-1">
              <MagnifyingGlass
                size={18}
                weight="bold"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-muted)] pointer-events-none"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari nama siswa atau No. Absen..."
                aria-label="Cari nama atau No. Absen"
                className="w-full rounded-2xl bg-[var(--bg)] pl-10 pr-4 py-2.5 text-sm font-medium text-[var(--ink)] min-h-[42px]"
              />
            </div>

            <PeriodPicker value={period} onChange={setPeriod} />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
            <button
              type="button"
              onClick={() => setClassId("all")}
              className={`btn-tactile shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold ${
                classId === "all"
                  ? "bg-[#0A3D26] text-white"
                  : "bg-[var(--surface-mint)] text-[var(--canopy)]"
              }`}
            >
              Semua Kelas
            </button>
            {classes.map((cls) => {
              const active = classId === String(cls.id);
              return (
                <button
                  key={cls.id}
                  type="button"
                  onClick={() => setClassId(String(cls.id))}
                  className={`btn-tactile shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold ${
                    active
                      ? "bg-[#0A3D26] text-white"
                      : "bg-[var(--surface-mint)] text-[var(--canopy)]"
                  }`}
                >
                  {cls.name}
                </button>
              );
            })}
          </div>
        </section>

        <div className="px-3.5 lg:px-0 space-y-4">
          {error && (
            <div
              role="alert"
              className="no-print flex items-center justify-between rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900"
            >
              <div className="flex items-center gap-2">
                <WarningCircle size={18} weight="fill" className="text-red-700" />
                <span>{error}</span>
              </div>
              <button
                type="button"
                onClick={fetchRekap}
                className="inline-flex items-center gap-1 rounded-lg bg-red-700 px-3 py-1.5 text-xs font-semibold text-white"
              >
                <ArrowClockwise size={14} />
                <span>Muat Ulang</span>
              </button>
            </div>
          )}

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 w-full animate-pulse rounded-3xl card-pro" />
              ))}
            </div>
          ) : sortedRows.length === 0 ? (
            <div className="card-pro rounded-3xl p-10 text-center space-y-1">
              <p className="text-sm font-bold text-[var(--ink)]">Data siswa tidak ditemukan</p>
              <p className="text-xs text-[var(--ink-muted)]">
                Coba ubah kata kunci pencarian atau pilih kelas lain.
              </p>
            </div>
          ) : (
            /* Formal Ledger Table (Consistent across Mobile, Desktop & Print) */
            <section
              aria-label="Daftar Rekapitulasi Siswa"
              className="card-pro rounded-3xl overflow-hidden animate-cascade"
              style={{ animationDelay: "80ms" }}
            >
              <div className="overflow-x-auto">
                <table className="print-table w-full text-left border-collapse min-w-[740px]">
                  <thead>
                    <tr className="bg-[var(--surface-raised)] border-b border-[var(--border-strong)] text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                      <th className="py-3.5 px-3.5 text-right w-12">No</th>
                      <th className="py-3.5 px-3.5">No. Absen</th>
                      <th
                        className="py-3.5 px-3.5 sticky left-0 bg-[var(--surface-raised)] z-10"
                        aria-sort={
                          sortBy === "name"
                            ? sortDir === "asc"
                              ? "ascending"
                              : "descending"
                            : "none"
                        }
                      >
                        <button
                          type="button"
                          onClick={() => handleSort("name")}
                          className="inline-flex items-center gap-1 hover:text-[var(--ink)]"
                        >
                          <span>Nama Siswa</span>
                          <ArrowsDownUp size={13} />
                        </button>
                      </th>
                      <th className="py-3.5 px-3">Kelas</th>
                      <th className="py-3.5 px-2.5 text-center">L/P</th>
                      <th className="py-3.5 px-3 text-right">H</th>
                      <th className="py-3.5 px-3 text-right">S</th>
                      <th className="py-3.5 px-3 text-right">I</th>
                      <th className="py-3.5 px-3 text-right">A</th>
                      <th
                        className="py-3.5 px-4 text-right"
                        aria-sort={
                          sortBy === "percentage"
                            ? sortDir === "asc"
                              ? "ascending"
                              : "descending"
                            : "none"
                        }
                      >
                        <button
                          type="button"
                          onClick={() => handleSort("percentage")}
                          className="inline-flex items-center justify-end gap-1 hover:text-[var(--ink)] ml-auto"
                        >
                          <span>%</span>
                          <ArrowsDownUp size={13} />
                        </button>
                      </th>
                      <th className="py-3.5 px-4">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)] text-sm">
                    {sortedRows.map((row, index) => (
                      <tr
                        key={row.student_id}
                        className="hover:bg-[var(--surface-raised)] transition-colors group"
                      >
                        <td className="py-3 px-3.5 text-right font-num text-[var(--ink-muted)]">
                          {index + 1}
                        </td>
                        <td className="py-3 px-3.5 font-num text-xs font-semibold text-[var(--ink-muted)] whitespace-nowrap">
                          {row.nis}
                        </td>
                        <td className="py-3 px-3.5 font-bold text-[var(--ink)] whitespace-nowrap sticky left-0 bg-[var(--surface)] group-hover:bg-[var(--surface-raised)] z-10">
                          {row.name}
                        </td>
                        <td className="py-3 px-3 text-xs font-bold text-[var(--ink-muted)] whitespace-nowrap">
                          {row.class_name}
                        </td>
                        <td className="py-3 px-2.5 text-center font-num text-xs font-bold">
                          {row.gender}
                        </td>
                        <td className="py-3 px-3 text-right font-num font-extrabold text-[var(--status-hadir-fg)]">
                          {row.hadir}
                        </td>
                        <td className="py-3 px-3 text-right font-num font-bold text-[var(--status-sakit-fg)]">
                          {row.sakit}
                        </td>
                        <td className="py-3 px-3 text-right font-num font-bold text-[var(--status-izin-fg)]">
                          {row.izin}
                        </td>
                        <td className="py-3 px-3 text-right font-num font-bold text-[var(--status-alpha-fg)]">
                          {row.alpha}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="font-num inline-flex items-center rounded-full bg-[#0B1410] px-2.5 py-0.5 text-xs font-extrabold text-white">
                            {row.percentage}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-[var(--ink-muted)] max-w-[200px] truncate">
                          {row.note || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>

      {excelMode && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white text-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 bg-[#0A3D26] px-4 py-2.5 text-white">
            <div className="flex items-center gap-3">
              <span className="rounded bg-emerald-400/20 px-2 py-0.5 font-mono text-xs font-bold text-emerald-200">
                XLSX SHEET
              </span>
              <span className="text-sm font-bold">
                Rekap Kehadiran ({selectedClassName}) · {period}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportExcel}
                className="rounded bg-[#A3E635] px-3 py-1.5 text-xs font-extrabold text-[#072919] hover:bg-[#BEF264]"
              >
                Download .xlsx
              </button>
              <button
                type="button"
                onClick={() => setExcelMode(false)}
                className="rounded border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/20"
              >
                Tutup
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-slate-50">
            <table className="w-full border-collapse text-xs">
              <thead className="sticky top-0 z-10 bg-slate-200 text-slate-800">
                <tr>
                  <th className="border border-slate-300 px-2.5 py-2 text-center font-bold">No</th>
                  <th className="border border-slate-300 px-2.5 py-2 text-left font-bold">NIS</th>
                  <th className="sticky left-0 z-20 border border-slate-300 bg-slate-200 px-3 py-2 text-left font-bold shadow-[3px_0_6px_-2px_rgba(0,0,0,0.12)]">Nama Siswa</th>
                  <th className="border border-slate-300 px-2 py-2 text-center font-bold">L/P</th>
                  <th className="border border-slate-300 px-2.5 py-2 text-left font-bold">Kelas</th>
                  <th className="border border-slate-300 px-2.5 py-2 text-left font-bold">Wali Kelas</th>
                  <th className="border border-slate-300 bg-emerald-100 px-2.5 py-2 text-center font-bold text-emerald-900">Hadir</th>
                  <th className="border border-slate-300 bg-amber-100 px-2.5 py-2 text-center font-bold text-amber-900">Sakit</th>
                  <th className="border border-slate-300 bg-sky-100 px-2.5 py-2 text-center font-bold text-sky-900">Izin</th>
                  <th className="border border-slate-300 bg-rose-100 px-2.5 py-2 text-center font-bold text-rose-900">Alpha</th>
                  <th className="border border-slate-300 px-2.5 py-2 text-center font-bold">Total</th>
                  <th className="border border-slate-300 px-2.5 py-2 text-center font-bold">%</th>
                  <th className="border border-slate-300 px-3 py-2 text-left font-bold">Catatan</th>
                </tr>
              </thead>
              <tbody>
                {sortedRows.map((row, idx) => (
                  <tr key={row.student_id} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/80"}>
                    <td className="border border-slate-300 px-2.5 py-1.5 text-center font-mono">{idx + 1}</td>
                    <td className="border border-slate-300 px-2.5 py-1.5 font-mono">{row.nis}</td>
                    <td className="sticky left-0 z-10 border border-slate-300 bg-inherit px-3 py-1.5 font-semibold whitespace-nowrap shadow-[3px_0_6px_-2px_rgba(0,0,0,0.08)]">{row.name}</td>
                    <td className="border border-slate-300 px-2 py-1.5 text-center">{row.gender}</td>
                    <td className="border border-slate-300 px-2.5 py-1.5 whitespace-nowrap">{row.class_name}</td>
                    <td className="border border-slate-300 px-2.5 py-1.5 whitespace-nowrap text-slate-600">{row.homeroom_teacher}</td>
                    <td className="border border-slate-300 px-2.5 py-1.5 text-center font-mono font-bold text-emerald-700">{row.hadir}</td>
                    <td className="border border-slate-300 px-2.5 py-1.5 text-center font-mono font-bold text-amber-700">{row.sakit}</td>
                    <td className="border border-slate-300 px-2.5 py-1.5 text-center font-mono font-bold text-sky-700">{row.izin}</td>
                    <td className="border border-slate-300 px-2.5 py-1.5 text-center font-mono font-bold text-rose-700">{row.alpha}</td>
                    <td className="border border-slate-300 px-2.5 py-1.5 text-center font-mono">{row.total}</td>
                    <td className="border border-slate-300 px-2.5 py-1.5 text-center font-mono font-bold">{row.percentage}%</td>
                    <td className="border border-slate-300 px-3 py-1.5 text-slate-600">{row.note || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AppShell>
  );
}

export default function RekapPage() {
  return (
    <Suspense fallback={<AppShell><div className="p-8 text-sm">Memuat rekap...</div></AppShell>}>
      <RekapContent />
    </Suspense>
  );
}
