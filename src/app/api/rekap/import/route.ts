import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getDb } from "@/lib/db";

interface ImportRow {
  nis: string;
  name: string;
  class_name: string;
  gender: "L" | "P";
  hadir: number;
  sakit: number;
  izin: number;
  alpha: number;
  note: string;
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { error: "Login Admin diperlukan untuk mengimpor backup." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const period = String(body.period || new Date().toISOString().slice(0, 7)).trim();
    const rows = body.rows as ImportRow[];

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { error: "File Excel kosong atau format kolom tidak sesuai." },
        { status: 400 }
      );
    }

    const db = await getDb();

    const upsertSql = `
      INSERT INTO rekap_records (student_id, period, hadir, sakit, izin, alpha, note, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(student_id, period) DO UPDATE SET
        hadir = excluded.hadir,
        sakit = excluded.sakit,
        izin = excluded.izin,
        alpha = excluded.alpha,
        note = excluded.note,
        updated_at = CURRENT_TIMESTAMP
    `;

    const classCache = new Map<string, number>();
    let importedCount = 0;

    for (const r of rows) {
      const nis = String(r.nis || "").trim();
      const name = String(r.name || "").trim();
      const className = String(r.class_name || "").trim() || "Umum";
      if (!nis || !name) continue;

      let classId = classCache.get(className);
      if (!classId) {
        const existingCls = await db.queryOne<{ id: number }>(
          "SELECT id FROM classes WHERE name = ?",
          [className]
        );
        if (existingCls) {
          classId = Number(existingCls.id);
        } else {
          const res = await db.execute(
            "INSERT INTO classes (name, homeroom_teacher) VALUES (?, '-')",
            [className]
          );
          classId = res.lastInsertRowid;
        }
        classCache.set(className, classId);
      }

      const gender = String(r.gender || "L").toUpperCase() === "P" ? "P" : "L";
      const existingSt = await db.queryOne<{ id: number }>(
        "SELECT id FROM students WHERE nis = ? AND class_id = ?",
        [nis, classId]
      );

      let studentId: number;
      if (!existingSt) {
        const res = await db.execute(
          "INSERT INTO students (class_id, nis, name, gender) VALUES (?, ?, ?, ?)",
          [classId, nis, name, gender]
        );
        studentId = res.lastInsertRowid;
      } else {
        studentId = Number(existingSt.id);
        await db.execute("UPDATE students SET name = ?, gender = ? WHERE id = ?", [
          name,
          gender,
          studentId,
        ]);
      }

      await db.execute(upsertSql, [
        studentId,
        period,
        Math.max(0, Number(r.hadir) || 0),
        Math.max(0, Number(r.sakit) || 0),
        Math.max(0, Number(r.izin) || 0),
        Math.max(0, Number(r.alpha) || 0),
        String(r.note || "").trim(),
      ]);
      importedCount++;
    }

    return NextResponse.json({ ok: true, importedCount });
  } catch {
    return NextResponse.json(
      { error: "Gagal memproses impor backup Excel." },
      { status: 500 }
    );
  }
}
