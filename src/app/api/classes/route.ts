import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const db = await getDb();
  const classes = await db.query(`
    SELECT c.id, c.name, c.homeroom_teacher, COUNT(s.id) as student_count
    FROM classes c
    LEFT JOIN students s ON s.class_id = c.id
    GROUP BY c.id
    ORDER BY c.name ASC
  `);
  return NextResponse.json({ classes });
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Akses Admin diperlukan." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const homeroomTeacher = String(body.homeroom_teacher || "").trim();

    if (!name) {
      return NextResponse.json({ error: "Nama kelas wajib diisi." }, { status: 400 });
    }

    const db = await getDb();
    const res = await db.execute("INSERT INTO classes (name, homeroom_teacher) VALUES (?, ?)", [
      name,
      homeroomTeacher || "-",
    ]);

    return NextResponse.json({ ok: true, id: res.lastInsertRowid });
  } catch {
    return NextResponse.json({ error: "Nama kelas sudah ada atau tidak valid." }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Akses Admin diperlukan." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));
    if (!id) {
      return NextResponse.json({ error: "ID kelas diperlukan." }, { status: 400 });
    }

    const db = await getDb();
    await db.execute("DELETE FROM classes WHERE id = ?", [id]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus kelas." }, { status: 500 });
  }
}
