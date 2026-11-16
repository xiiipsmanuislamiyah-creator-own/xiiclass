import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period") || new Date().toISOString().slice(0, 7);
    const classId = searchParams.get("classId");
    const q = (searchParams.get("q") || "").trim().toLowerCase();

    let sql = `
      SELECT
        s.id as student_id,
        s.nis,
        s.name,
        s.gender,
        s.class_id,
        c.name as class_name,
        c.homeroom_teacher,
        COALESCE(r.hadir, 0) as hadir,
        COALESCE(r.sakit, 0) as sakit,
        COALESCE(r.izin, 0) as izin,
        COALESCE(r.alpha, 0) as alpha,
        COALESCE(r.note, '') as note
      FROM students s
      JOIN classes c ON c.id = s.class_id
      LEFT JOIN rekap_records r ON r.student_id = s.id AND r.period = ?
      WHERE 1=1
    `;
    const params: Array<string | number> = [period];

    if (classId && classId !== "all") {
      sql += " AND s.class_id = ?";
      params.push(Number(classId));
    }

    if (q) {
      sql += " AND (LOWER(s.name) LIKE ? OR LOWER(s.nis) LIKE ?)";
      params.push(`%${q}%`, `%${q}%`);
    }

    sql += " ORDER BY c.name ASC, s.name ASC";

    const rows = await db.query<{
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
      note: string;
    }>(sql, params);

    const enriched = rows.map((row) => {
      const hadir = Number(row.hadir) || 0;
      const sakit = Number(row.sakit) || 0;
      const izin = Number(row.izin) || 0;
      const alpha = Number(row.alpha) || 0;
      const total = hadir + sakit + izin + alpha;
      const percentage = total > 0 ? Math.round((hadir / total) * 1000) / 10 : 0;
      return { ...row, hadir, sakit, izin, alpha, total, percentage };
    });

    return NextResponse.json({ period, rows: enriched });
  } catch {
    return NextResponse.json({ error: "Gagal memuat data rekap." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Login Admin diperlukan untuk mengubah rekap." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const period = String(body.period || "").trim();
    const entries = body.entries as Array<{
      student_id: number;
      hadir: number;
      sakit: number;
      izin: number;
      alpha: number;
      note?: string;
    }>;

    if (!period || !Array.isArray(entries)) {
      return NextResponse.json({ error: "Payload rekap tidak valid." }, { status: 400 });
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

    await db.batch(
      entries.map((item) => ({
        sql: upsertSql,
        args: [
          Number(item.student_id),
          period,
          Math.max(0, Number(item.hadir) || 0),
          Math.max(0, Number(item.sakit) || 0),
          Math.max(0, Number(item.izin) || 0),
          Math.max(0, Number(item.alpha) || 0),
          String(item.note || "").trim(),
        ],
      }))
    );

    return NextResponse.json({ ok: true, count: entries.length });
  } catch {
    return NextResponse.json({ error: "Gagal menyimpan data rekap." }, { status: 500 });
  }
}
