"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import * as XLSX from "xlsx";
import {
  ShieldCheck,
  SignOut,
  FloppyDisk,
  Plus,
  Trash,
  CheckCircle,
  WarningCircle,
  LockKey,
  Users,
  Buildings,
  Table,
  FileXls,
  UploadSimple,
  Database,
  PlugCharging,
} from "@phosphor-icons/react";
import { AppShell } from "@/components/AppShell";
import { AmbientBackdrop } from "@/components/AmbientBackdrop";
import { PeriodPicker, CustomSelect } from "@/components/CustomPickers";
import { withBasePath } from "@/lib/paths";

interface RekapEntry {
  student_id: number;
  nis: string;
  name: string;
  gender: "L" | "P";
  class_id: number;
  class_name: string;
  hadir: number;
  sakit: number;
  izin: number;
  alpha: number;
  note: string;
}

interface ClassItem {
  id: number;
  name: string;
  homeroom_teacher: string;
  student_count: number;
}

interface SchoolForm {
  name: string;
  npsn: string;
  address: string;
  headmaster: string;
  academic_year: string;
  semester: string;
}

export default function AdminPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState("");

  // Login form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active tab
  const [tab, setTab] = useState<"rekap" | "master" | "school" | "database">("rekap");

  // Toast feedback
  const [toast, setToast] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const showToast = (type: "ok" | "err", text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  };

  // Rekap edit & backup state
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [period, setPeriod] = useState(() => new Date().toISOString().slice(0, 7));
  const [entries, setEntries] = useState<RekapEntry[]>([]);
  const [savingRekap, setSavingRekap] = useState(false);
  const [importingXlsx, setImportingXlsx] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Master data state
  const [newClassName, setNewClassName] = useState("");
  const [newClassTeacher, setNewClassTeacher] = useState("");
  const [newStudentNis, setNewStudentNis] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentGender, setNewStudentGender] = useState<"L" | "P">("L");

  // School & password settings
  const [school, setSchool] = useState<SchoolForm>({
    name: "",
    npsn: "",
    address: "",
    headmaster: "",
    academic_year: "",
    semester: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Database setup state
  const [dbStatus, setDbStatus] = useState<{
    mode: "turso" | "local";
    urlMasked: string | null;
    isVercel: boolean;
    vercelApiReady: boolean;
    stats: { classes: number; students: number; rekap: number };
  } | null>(null);
  const [dbUrl, setDbUrl] = useState("");
  const [dbToken, setDbToken] = useState("");
  const [migrateLocal, setMigrateLocal] = useState(true);
  const [dbTesting, setDbTesting] = useState(false);
  const [dbSaving, setDbSaving] = useState(false);

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch(withBasePath("/api/auth/session"));
      const data = await res.json();
      setAuthenticated(Boolean(data.authenticated));
      setAdminName(data.admin?.displayName || "Admin");
    } catch {
      setAuthenticated(false);
    } finally {
      setAuthChecked(true);
    }
  }, []);

  const loadMeta = useCallback(async () => {
    const [cRes, sRes, dRes] = await Promise.all([
      fetch(withBasePath("/api/classes")),
      fetch(withBasePath("/api/school")),
      fetch(withBasePath("/api/db-config")),
    ]);
    if (cRes.ok) {
      const cd = await cRes.json();
      const list = (cd.classes || []) as ClassItem[];
      setClasses(list);
      if (list.length > 0 && !selectedClassId) {
        setSelectedClassId(String(list[0].id));
      }
    }
    if (sRes.ok) {
      const sd = await sRes.json();
      if (sd.school) setSchool(sd.school);
    }
    if (dRes.ok) {
      const dd = await dRes.json();
      setDbStatus(dd);
    }
  }, [selectedClassId]);

  const loadRekapEntries = useCallback(async () => {
    if (!selectedClassId) return;
    const res = await fetch(
      withBasePath(
        `/api/rekap?period=${encodeURIComponent(period)}&classId=${encodeURIComponent(selectedClassId)}`
      )
    );
    if (res.ok) {
      const data = await res.json();
      setEntries(data.rows || []);
    }
  }, [selectedClassId, period]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (authenticated) {
      loadMeta();
    }
  }, [authenticated, loadMeta]);

  useEffect(() => {
    if (authenticated && selectedClassId) {
      loadRekapEntries();
    }
  }, [authenticated, selectedClassId, period, loadRekapEntries]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      const res = await fetch(withBasePath("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || "Login gagal.");
      } else {
        setAuthenticated(true);
        setAdminName(data.admin?.displayName || "Admin");
        setPassword("");
        window.dispatchEvent(new Event("erekap-auth-changed"));
      }
    } catch {
      setLoginError("Gagal menghubungi server.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch(withBasePath("/api/auth/logout"), { method: "POST" });
    setAuthenticated(false);
    window.dispatchEvent(new Event("erekap-auth-changed"));
  };

  const updateEntryField = (
    studentId: number,
    field: "hadir" | "sakit" | "izin" | "alpha" | "note",
    value: number | string
  ) => {
    setEntries((prev) =>
      prev.map((item) => {
        if (item.student_id !== studentId) return item;
        if (field === "note") return { ...item, note: String(value) };
        return { ...item, [field]: Math.max(0, Number(value) || 0) };
      })
    );
  };

  const handleSaveRekap = async () => {
    setSavingRekap(true);
    try {
      const res = await fetch(withBasePath("/api/rekap"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          period,
          entries: entries.map((e) => ({
            student_id: e.student_id,
            hadir: e.hadir,
            sakit: e.sakit,
            izin: e.izin,
            alpha: e.alpha,
            note: e.note,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan.");
      showToast("ok", `Rekap berhasil disimpan (${data.count} siswa).`);
    } catch (err) {
      showToast("err", err instanceof Error ? err.message : "Gagal menyimpan rekap.");
    } finally {
      setSavingRekap(false);
    }
  };

  const handleExportFullBackup = async () => {
    try {
      const res = await fetch(
        withBasePath(`/api/rekap?period=${encodeURIComponent(period)}&classId=all`)
      );
      if (!res.ok) throw new Error("Gagal mengambil data backup.");
      const data = await res.json();
      const rows = (data.rows || []) as Array<{
        nis: string;
        name: string;
        class_name: string;
        gender: string;
        hadir: number;
        sakit: number;
        izin: number;
        alpha: number;
        percentage: number;
        note: string;
      }>;

      const sheetRows = rows.map((r, idx) => ({
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
        Keterangan: r.note || "",
      }));

      const ws = XLSX.utils.json_to_sheet(sheetRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Backup Rekap");
      XLSX.writeFile(wb, `Backup-E-Rekap-${period}.xlsx`);
      showToast("ok", `Backup Excel (${rows.length} siswa) berhasil diunduh.`);
    } catch (err) {
      showToast("err", err instanceof Error ? err.message : "Gagal ekspor backup.");
    }
  };

  const handleImportBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportingXlsx(true);
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const firstSheet = wb.Sheets[wb.SheetNames[0]];
      const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(firstSheet);

      const normalized = rawRows
        .map((r) => ({
          nis: String(r["No. Absen"] ?? r["No Absen"] ?? r["NIS/NISN"] ?? r["NIS"] ?? r["nis"] ?? "").trim(),
          name: String(r["Nama Siswa"] ?? r["Nama"] ?? r["name"] ?? "").trim(),
          class_name: String(r["Kelas"] ?? r["class_name"] ?? "").trim(),
          gender: (String(r["L/P"] ?? r["gender"] ?? "L").toUpperCase() === "P" ? "P" : "L") as "L" | "P",
          hadir: Number(r["Hadir (H)"] ?? r["Hadir"] ?? r["H"] ?? r["hadir"] ?? 0) || 0,
          sakit: Number(r["Sakit (S)"] ?? r["Sakit"] ?? r["S"] ?? r["sakit"] ?? 0) || 0,
          izin: Number(r["Izin (I)"] ?? r["Izin"] ?? r["I"] ?? r["izin"] ?? 0) || 0,
          alpha: Number(r["Alpha (A)"] ?? r["Alpha"] ?? r["A"] ?? r["alpha"] ?? 0) || 0,
          note: String(r["Keterangan"] ?? r["note"] ?? "").trim(),
        }))
        .filter((r) => r.nis && r.name);

      const res = await fetch(withBasePath("/api/rekap/import"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ period, rows: normalized }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengimpor file.");
      showToast("ok", `Impor backup berhasil (${data.importedCount} baris diproses).`);
      await loadMeta();
      await loadRekapEntries();
    } catch (err) {
      showToast("err", err instanceof Error ? err.message : "Format file Excel tidak valid.");
    } finally {
      setImportingXlsx(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAddClass = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(withBasePath("/api/classes"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newClassName, homeroom_teacher: newClassTeacher }),
    });
    const data = await res.json();
    if (!res.ok) {
      showToast("err", data.error || "Gagal menambah kelas.");
      return;
    }
    setNewClassName("");
    setNewClassTeacher("");
    showToast("ok", "Kelas baru ditambahkan.");
    await loadMeta();
  };

  const handleDeleteClass = async (id: number) => {
    const res = await fetch(withBasePath(`/api/classes?id=${id}`), { method: "DELETE" });
    if (res.ok) {
      showToast("ok", "Kelas dihapus.");
      if (selectedClassId === String(id)) setSelectedClassId("");
      await loadMeta();
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassId) return;
    const res = await fetch(withBasePath("/api/students"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        class_id: Number(selectedClassId),
        nis: newStudentNis,
        name: newStudentName,
        gender: newStudentGender,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      showToast("err", data.error || "Gagal menambah siswa.");
      return;
    }
    setNewStudentNis("");
    setNewStudentName("");
    showToast("ok", "Siswa ditambahkan.");
    await loadRekapEntries();
    await loadMeta();
  };

  const handleDeleteStudent = async (id: number) => {
    const res = await fetch(withBasePath(`/api/students?id=${id}`), { method: "DELETE" });
    if (res.ok) {
      showToast("ok", "Siswa dihapus.");
      await loadRekapEntries();
      await loadMeta();
    }
  };

  const handleSaveSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(withBasePath("/api/school"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(school),
    });
    if (res.ok) {
      showToast("ok", "Profil lembaga diperbarui.");
    } else {
      showToast("err", "Gagal memperbarui profil lembaga.");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(withBasePath("/api/auth/password"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) {
      showToast("err", data.error || "Gagal mengganti password.");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    showToast("ok", "Password Admin berhasil diperbarui.");
  };

  const handleTestDb = async () => {
    setDbTesting(true);
    try {
      const res = await fetch(withBasePath("/api/db-config"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test", url: dbUrl, authToken: dbToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast("err", data.error || "Koneksi gagal.");
      } else {
        showToast("ok", data.message || "Koneksi berhasil.");
      }
    } catch {
      showToast("err", "Gagal menguji koneksi database.");
    } finally {
      setDbTesting(false);
    }
  };

  const handleSaveDb = async (e: React.FormEvent) => {
    e.preventDefault();
    setDbSaving(true);
    try {
      const res = await fetch(withBasePath("/api/db-config"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save",
          url: dbUrl,
          authToken: dbToken,
          migrateLocal,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast("err", data.error || "Gagal menghubungkan database.");
        return;
      }
      setDbToken("");
      await loadMeta();
      if (data.redeployTriggered) {
        showToast(
          "ok",
          "Database terhubung & tersimpan ke Vercel. Sinkronisasi aktif dalam ~30-45 detik."
        );
      } else {
        showToast("ok", "Database Cloud (Turso) berhasil dihubungkan dan siap digunakan.");
      }
    } catch {
      showToast("err", "Terjadi kesalahan saat menyimpan konfigurasi database.");
    } finally {
      setDbSaving(false);
    }
  };

  return (
    <AppShell>
      {/* Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl px-4 py-3 text-sm font-bold shadow-xl border ${
            toast.type === "ok"
              ? "bg-[#0A3D26] text-[#A3E635] border-emerald-900"
              : "bg-red-700 text-white border-red-900"
          }`}
        >
          {toast.type === "ok" ? <CheckCircle size={18} weight="fill" /> : <WarningCircle size={18} weight="fill" />}
          <span>{toast.text}</span>
        </div>
      )}

      {!authChecked ? (
        <div className="py-14 text-center text-sm font-semibold text-[var(--ink-muted)]">
          Memeriksa sesi Admin...
        </div>
      ) : !authenticated ? (
        <div className="space-y-5">
          {/* Canopy Header for Login */}
          <section className="relative overflow-hidden rounded-b-[28px] lg:rounded-3xl bg-[#0A3D26] px-5 pt-6 pb-14 sm:px-7 text-white shadow-[0_18px_40px_-14px_rgba(7,41,25,0.45)] animate-cascade">
            <AmbientBackdrop variant="canopy" />
            <div className="relative z-10 flex items-center gap-3.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-[#A3E635] ring-1 ring-white/20">
                <LockKey size={24} weight="fill" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#A3E635]">
                  Otorisasi Pengelola
                </p>
                <h1 className="text-2xl font-extrabold tracking-tight text-white">
                  Login Admin E-Rekap
                </h1>
              </div>
            </div>
          </section>

          <div className="relative z-20 -mt-9 mx-auto max-w-md px-3.5 lg:px-0 animate-cascade">
            <div className="sheet-overlap rounded-3xl p-6 sm:p-7 space-y-5">
              <p className="text-xs font-medium text-[var(--ink-muted)] leading-relaxed">
                Siswa dan guru tetap dapat meninjau Dashboard &amp; Tabel Rekap tanpa login. Masuk sebagai Admin untuk mengelola data dan backup XLSX.
              </p>

              {process.env.NEXT_PUBLIC_DEMO_MODE === "true" && (
                <div
                  role="status"
                  className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs font-bold text-amber-900 leading-relaxed"
                >
                  Mode Demo (Pratinjau Publik): Fitur login dan perubahan data Admin dinonaktifkan. Silakan jelajahi Dashboard, Grafik, dan Tabel Rekap.
                </div>
              )}

              {loginError && (
                <div
                  role="alert"
                  className="flex items-center gap-2 rounded-2xl bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs font-bold text-red-800"
                >
                  <WarningCircle size={16} weight="fill" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="admin-username" className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                    Username
                  </label>
                  <input
                    id="admin-username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full rounded-2xl bg-[var(--bg)] px-4 py-3 text-sm font-semibold text-[var(--ink)] min-h-[44px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="admin-password" className="block text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                    Password
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl bg-[var(--bg)] px-4 py-3 text-sm font-semibold text-[var(--ink)] min-h-[44px]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading || process.env.NEXT_PUBLIC_DEMO_MODE === "true"}
                  className="btn-tactile w-full rounded-full bg-[#A3E635] px-5 py-3.5 text-sm font-extrabold text-[#072919] shadow-md hover:bg-[#BEF264] disabled:opacity-60 min-h-[46px]"
                >
                  {process.env.NEXT_PUBLIC_DEMO_MODE === "true"
                    ? "Login Dinonaktifkan (Mode Demo)"
                    : loginLoading
                      ? "Memverifikasi..."
                      : "Masuk sebagai Admin"}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Unified Canopy Header */}
          <section className="relative overflow-hidden rounded-b-[28px] lg:rounded-3xl bg-[#0A3D26] px-5 pt-5 pb-12 sm:px-7 sm:pt-7 text-white shadow-[0_18px_40px_-14px_rgba(7,41,25,0.45)] animate-cascade">
            <AmbientBackdrop variant="canopy" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 text-[#A3E635] ring-1 ring-white/20 shrink-0">
                  <ShieldCheck size={24} weight="fill" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#A3E635]">
                    Panel Pengelola Terautentikasi
                  </p>
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                    {adminName}
                  </h1>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="btn-tactile inline-flex items-center gap-2 self-start rounded-full bg-white/12 px-4 py-2 text-xs font-bold text-white ring-1 ring-white/20 hover:bg-white/20"
              >
                <SignOut size={16} weight="bold" />
                <span>Keluar Admin</span>
              </button>
            </div>
          </section>

          {/* Overlapping Navigation Tabs Sheet */}
          <section className="relative z-20 -mt-8 mx-3.5 lg:mx-0 sheet-overlap rounded-3xl p-3 animate-cascade">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "rekap" as const, label: "Edit Rekap & Backup", icon: Table },
                { id: "master" as const, label: "Kelas & Siswa", icon: Users },
                { id: "school" as const, label: "Pengaturan & Akun", icon: Buildings },
                { id: "database" as const, label: "Database", icon: Database },
              ].map((t) => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`btn-tactile inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-bold ${
                      active
                        ? "bg-[#0A3D26] text-[#A3E635] shadow-sm"
                        : "bg-[var(--bg)] text-[var(--ink-muted)] hover:text-[var(--ink)]"
                    }`}
                  >
                    <Icon size={17} weight={active ? "fill" : "regular"} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <div className="px-3.5 lg:px-0 space-y-5">
            {/* TAB 1: EDIT REKAP & BACKUP XLSX */}
            {tab === "rekap" && (
              <section className="space-y-4">
                <div className="card-pro rounded-3xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 relative z-30">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <CustomSelect
                      value={selectedClassId}
                      onChange={setSelectedClassId}
                      ariaLabel="Pilih Kelas"
                      options={classes.map((c) => ({ value: String(c.id), label: c.name }))}
                    />

                    <PeriodPicker value={period} onChange={setPeriod} />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleImportBackup}
                      className="hidden"
                      id="xlsx-import-input"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={importingXlsx}
                      className="btn-tactile inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-mint)] px-3.5 py-2 text-xs font-bold text-[var(--canopy)] hover:bg-[#d7efe0]"
                    >
                      <UploadSimple size={15} weight="bold" />
                      <span>{importingXlsx ? "Mengimpor..." : "Impor XLSX"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExportFullBackup}
                      className="btn-tactile inline-flex items-center gap-1.5 rounded-full bg-[var(--bg)] px-3.5 py-2 text-xs font-bold text-[var(--ink)] hover:bg-slate-200/70"
                    >
                      <FileXls size={15} weight="bold" className="text-[var(--canopy)]" />
                      <span>Backup XLSX</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveRekap}
                      disabled={savingRekap || entries.length === 0}
                      className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-4 py-2 text-xs sm:text-sm font-extrabold text-[#072919] shadow-sm hover:bg-[#BEF264] disabled:opacity-50"
                    >
                      <FloppyDisk size={17} weight="fill" />
                      <span>{savingRekap ? "Menyimpan..." : "Simpan Rekap"}</span>
                    </button>
                  </div>
                </div>

                {/* Consistent Formal Editable Table */}
                <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-card)] overflow-hidden relative z-10">
                  <div className="w-full overflow-x-auto overscroll-x-contain touch-pan-x touch-pan-y">
                    <table className="w-full text-left border-collapse min-w-[680px]">
                      <thead>
                        <tr className="bg-[var(--surface-raised)] border-b border-[var(--border-strong)] text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                          <th className="py-3.5 px-4 text-right w-12">No</th>
                          <th className="py-3.5 px-3">No. Absen</th>
                          <th className="py-3.5 px-3">
                            Nama Siswa
                          </th>
                          <th className="py-3.5 px-2 text-center w-20">Hadir</th>
                          <th className="py-3.5 px-2 text-center w-20">Sakit</th>
                          <th className="py-3.5 px-2 text-center w-20">Izin</th>
                          <th className="py-3.5 px-2 text-center w-20">Alpha</th>
                          <th className="py-3.5 px-4 min-w-[180px]">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border)] text-sm">
                        {entries.map((entry, idx) => (
                          <tr key={entry.student_id} className="hover:bg-[var(--surface-raised)] group">
                            <td className="py-3 px-4 text-right font-num text-[var(--ink-muted)]">
                              {idx + 1}
                            </td>
                            <td className="py-3 px-3 font-num text-xs font-semibold text-[var(--ink-muted)] whitespace-nowrap">
                              {entry.nis}
                            </td>
                            <td className="py-3 px-3 font-bold text-[var(--ink)] whitespace-nowrap">
                              {entry.name}
                            </td>
                            {(["hadir", "sakit", "izin", "alpha"] as const).map((field) => (
                              <td key={field} className="py-2.5 px-2 text-center">
                                <input
                                  type="number"
                                  inputMode="numeric"
                                  min={0}
                                  value={entry[field]}
                                  onChange={(e) =>
                                    updateEntryField(entry.student_id, field, e.target.value)
                                  }
                                  aria-label={`${field} ${entry.name}`}
                                  className="font-num w-16 min-h-[40px] rounded-xl bg-[var(--bg)] px-2 py-1.5 text-center text-base sm:text-sm font-extrabold text-[var(--ink)]"
                                />
                              </td>
                            ))}
                            <td className="py-2.5 px-4">
                              <input
                                type="text"
                                value={entry.note}
                                onChange={(e) =>
                                  updateEntryField(entry.student_id, "note", e.target.value)
                                }
                                placeholder="Catatan opsional..."
                                className="w-full min-w-[160px] min-h-[40px] rounded-xl bg-[var(--bg)] px-3 py-1.5 text-base sm:text-xs font-medium text-[var(--ink)]"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}

            {/* TAB 2: MASTER DATA KELAS & SISWA */}
            {tab === "master" && (
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="card-pro rounded-3xl p-5 space-y-4">
                  <h2 className="text-base font-extrabold text-[var(--ink)]">Tambah Kelas Baru</h2>
                  <form onSubmit={handleAddClass} className="space-y-3">
                    <input
                      type="text"
                      required
                      value={newClassName}
                      onChange={(e) => setNewClassName(e.target.value)}
                      placeholder="Nama Kelas (misal: XII IPA 2)"
                      className="w-full rounded-2xl bg-[var(--bg)] px-4 py-2.5 text-sm font-medium"
                    />
                    <input
                      type="text"
                      value={newClassTeacher}
                      onChange={(e) => setNewClassTeacher(e.target.value)}
                      placeholder="Nama Wali Kelas"
                      className="w-full rounded-2xl bg-[var(--bg)] px-4 py-2.5 text-sm font-medium"
                    />
                    <button
                      type="submit"
                      className="btn-tactile inline-flex items-center gap-1.5 rounded-full bg-[#0A3D26] px-4 py-2.5 text-xs font-extrabold text-[#A3E635]"
                    >
                      <Plus size={15} weight="bold" />
                      <span>Tambah Kelas</span>
                    </button>
                  </form>

                  <div className="pt-3 border-t border-[var(--border)] space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                      Daftar Kelas
                    </p>
                    {classes.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center justify-between rounded-2xl bg-[var(--bg)] px-4 py-2.5"
                      >
                        <div>
                          <p className="text-sm font-extrabold text-[var(--ink)]">{c.name}</p>
                          <p className="text-xs text-[var(--ink-muted)]">
                            {c.homeroom_teacher} • <span className="font-num">{c.student_count}</span> siswa
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteClass(c.id)}
                          aria-label={`Hapus kelas ${c.name}`}
                          className="rounded-xl p-2 text-red-700 hover:bg-red-100"
                        >
                          <Trash size={16} weight="bold" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-pro rounded-3xl p-5 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-base font-extrabold text-[var(--ink)]">Tambah Siswa</h2>
                    <CustomSelect
                      value={selectedClassId}
                      onChange={setSelectedClassId}
                      ariaLabel="Kelas tujuan siswa"
                      options={classes.map((c) => ({ value: String(c.id), label: c.name }))}
                    />
                  </div>

                  <form onSubmit={handleAddStudent} className="space-y-3">
                    <input
                      type="text"
                      required
                      value={newStudentNis}
                      onChange={(e) => setNewStudentNis(e.target.value)}
                      placeholder="No. Absen (misal: 07)"
                      className="font-num w-full rounded-2xl bg-[var(--bg)] px-4 py-2.5 text-sm font-semibold"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={newStudentName}
                        onChange={(e) => setNewStudentName(e.target.value)}
                        placeholder="Nama Lengkap Siswa"
                        className="flex-1 rounded-2xl bg-[var(--bg)] px-4 py-2.5 text-sm font-medium"
                      />
                      <CustomSelect
                        value={newStudentGender}
                        onChange={(v) => setNewStudentGender(v === "P" ? "P" : "L")}
                        ariaLabel="Jenis Kelamin"
                        options={[
                          { value: "L", label: "L" },
                          { value: "P", label: "P" },
                        ]}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-tactile inline-flex items-center gap-1.5 rounded-full bg-[#0A3D26] px-4 py-2.5 text-xs font-extrabold text-[#A3E635]"
                    >
                      <Plus size={15} weight="bold" />
                      <span>Tambah Siswa</span>
                    </button>
                  </form>

                  <div className="pt-3 border-t border-[var(--border)] space-y-2 max-h-72 overflow-y-auto">
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                      Siswa di Kelas Terpilih
                    </p>
                    {entries.map((st) => (
                      <div
                        key={st.student_id}
                        className="flex items-center justify-between rounded-2xl bg-[var(--bg)] px-4 py-2"
                      >
                        <div>
                          <p className="text-sm font-bold text-[var(--ink)]">{st.name}</p>
                          <p className="font-num text-xs text-[var(--ink-muted)]">
                            {st.nis} • {st.gender}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteStudent(st.student_id)}
                          aria-label={`Hapus siswa ${st.name}`}
                          className="rounded-xl p-2 text-red-700 hover:bg-red-100"
                        >
                          <Trash size={16} weight="bold" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* TAB 3: PENGATURAN LEMBAGA & PASSWORD */}
            {tab === "school" && (
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <form onSubmit={handleSaveSchool} className="card-pro rounded-3xl p-5 space-y-3">
                  <h2 className="text-base font-extrabold text-[var(--ink)]">
                    Profil Lembaga (Kop Cetak A4)
                  </h2>
                  {[
                    { key: "name" as const, label: "Nama Sekolah / Madrasah", mono: false },
                    { key: "npsn" as const, label: "NPSN", mono: true },
                    { key: "address" as const, label: "Alamat Lengkap", mono: false },
                    { key: "headmaster" as const, label: "Kepala Madrasah", mono: false },
                    { key: "academic_year" as const, label: "Tahun Ajaran", mono: true },
                    { key: "semester" as const, label: "Semester", mono: false },
                  ].map((f) => (
                    <div key={f.key} className="space-y-1">
                      <label className="block text-xs font-bold text-[var(--ink-muted)]">
                        {f.label}
                      </label>
                      <input
                        type="text"
                        value={school[f.key]}
                        onChange={(e) => setSchool({ ...school, [f.key]: e.target.value })}
                        className={`w-full rounded-2xl bg-[var(--bg)] px-4 py-2.5 text-sm font-medium ${
                          f.mono ? "font-num" : ""
                        }`}
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[#A3E635] px-5 py-2.5 text-xs font-extrabold text-[#072919]"
                  >
                    <FloppyDisk size={16} weight="fill" />
                    <span>Simpan Profil Lembaga</span>
                  </button>
                </form>

                <form
                  onSubmit={handleChangePassword}
                  className="card-pro rounded-3xl p-5 space-y-4 self-start"
                >
                  <h2 className="text-base font-extrabold text-[var(--ink)]">
                    Ganti Password Admin
                  </h2>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[var(--ink-muted)]">
                      Password Saat Ini
                    </label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded-2xl bg-[var(--bg)] px-4 py-2.5 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[var(--ink-muted)]">
                      Password Baru (min. 6 karakter)
                    </label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-2xl bg-[var(--bg)] px-4 py-2.5 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-tactile inline-flex items-center gap-2 rounded-full bg-[#0B1410] px-5 py-2.5 text-xs font-extrabold text-white"
                  >
                    <LockKey size={16} weight="fill" />
                    <span>Perbarui Password</span>
                  </button>
                </form>
              </section>
            )}

            {/* TAB 4: PENGATURAN DATABASE CLOUD (TURSO) */}
            {tab === "database" && (
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <form onSubmit={handleSaveDb} className="card-pro rounded-3xl p-5 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-base font-extrabold text-[var(--ink)]">
                      Hubungkan Database Cloud (Turso)
                    </h2>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold ${
                        dbStatus?.mode === "turso"
                          ? "bg-[var(--surface-mint)] text-[var(--canopy)]"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          dbStatus?.mode === "turso" ? "bg-emerald-600" : "bg-amber-600"
                        }`}
                      />
                      {dbStatus?.mode === "turso" ? "Turso Cloud Aktif" : "Penyimpanan Lokal"}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                    Masukkan kredensial database Turso (libSQL) milik sekolah agar seluruh data absensi tersimpan permanen tanpa perlu membuka dashboard Vercel.
                  </p>

                  {dbStatus?.urlMasked && (
                    <div className="rounded-2xl bg-[var(--bg)] px-4 py-2.5 text-xs">
                      <span className="font-bold text-[var(--ink-muted)]">URL Aktif: </span>
                      <span className="font-num font-bold text-[var(--ink)]">{dbStatus.urlMasked}</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[var(--ink-muted)]">
                      Database URL (libsql://...)
                    </label>
                    <input
                      type="text"
                      required
                      value={dbUrl}
                      onChange={(e) => setDbUrl(e.target.value)}
                      placeholder="libsql://nama-db-sekolah.turso.io"
                      className="font-num w-full rounded-2xl bg-[var(--bg)] px-4 py-2.5 text-sm font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[var(--ink-muted)]">
                      Auth Token
                    </label>
                    <input
                      type="password"
                      required
                      value={dbToken}
                      onChange={(e) => setDbToken(e.target.value)}
                      placeholder="eyJhbGciOi..."
                      className="font-num w-full rounded-2xl bg-[var(--bg)] px-4 py-2.5 text-sm"
                    />
                  </div>

                  <label className="flex items-center gap-2.5 text-xs font-semibold text-[var(--ink)] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={migrateLocal}
                      onChange={(e) => setMigrateLocal(e.target.checked)}
                      className="h-4 w-4 rounded accent-[#0A3D26]"
                    />
                    <span>Salin data saat ini ke database baru jika masih kosong</span>
                  </label>

                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <button
                      type="button"
                      disabled={dbTesting || !dbUrl || !dbToken}
                      onClick={handleTestDb}
                      className="btn-tactile inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-mint)] px-4 py-2.5 text-xs font-extrabold text-[var(--canopy)] disabled:opacity-50"
                    >
                      <PlugCharging size={16} weight="bold" />
                      <span>{dbTesting ? "Menguji..." : "Tes Koneksi"}</span>
                    </button>

                    <button
                      type="submit"
                      disabled={dbSaving || !dbUrl || !dbToken}
                      className="btn-tactile inline-flex items-center gap-1.5 rounded-full bg-[#A3E635] px-5 py-2.5 text-xs font-extrabold text-[#072919] disabled:opacity-50"
                    >
                      <FloppyDisk size={16} weight="fill" />
                      <span>{dbSaving ? "Menghubungkan..." : "Simpan & Hubungkan"}</span>
                    </button>
                  </div>
                </form>

                <div className="card-pro rounded-3xl p-5 space-y-4 self-start">
                  <h2 className="text-base font-extrabold text-[var(--ink)]">
                    Ringkasan & Panduan Singkat
                  </h2>

                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { label: "Kelas", val: dbStatus?.stats.classes ?? 0 },
                      { label: "Siswa", val: dbStatus?.stats.students ?? 0 },
                      { label: "Rekap", val: dbStatus?.stats.rekap ?? 0 },
                    ].map((s) => (
                      <div key={s.label} className="rounded-2xl bg-[var(--bg)] p-3 text-center">
                        <p className="font-num text-xl font-extrabold text-[var(--ink)]">{s.val}</p>
                        <p className="text-[11px] font-bold text-[var(--ink-muted)]">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <ol className="space-y-2 text-xs text-[var(--ink-muted)] leading-relaxed list-decimal list-inside">
                    <li>
                      Buat database gratis di <strong className="text-[var(--ink)]">turso.tech</strong> (1 akun gratis cukup untuk ribuan siswa).
                    </li>
                    <li>
                      Salin <strong className="text-[var(--ink)]">Database URL</strong> (<code className="font-num">libsql://...</code>) dan buat <strong className="text-[var(--ink)]">Auth Token</strong> (Read &amp; Write).
                    </li>
                    <li>
                      Tempel di form sebelah, klik <strong className="text-[var(--ink)]">Tes Koneksi</strong>, lalu <strong className="text-[var(--ink)]">Simpan &amp; Hubungkan</strong>.
                    </li>
                  </ol>
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}
