import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Akses Admin diperlukan." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const classId = Number(body.class_id);
    const nis = String(body.nis || "").trim();
    const name = String(body.name || "").trim();
    const gender = body.gender === "P" ? "P" : "L";

    if (!classId || !nis || !name) {
      return NextResponse.json({ error: "Kelas, No. Absen, dan Nama wajib diisi." }, { status: 400 });
    }

    const db = await getDb();
    const res = await db.execute(
      "INSERT INTO students (class_id, nis, name, gender) VALUES (?, ?, ?, ?)",
      [classId, nis, name, gender]
    );

    return NextResponse.json({ ok: true, id: res.lastInsertRowid });
  } catch {
    return NextResponse.json({ error: "Gagal menambahkan siswa." }, { status: 500 });
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
      return NextResponse.json({ error: "ID siswa diperlukan." }, { status: 400 });
    }

    const db = await getDb();
    await db.execute("DELETE FROM students WHERE id = ?", [id]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus siswa." }, { status: 500 });
  }
}
