import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAdminSession } from "@/lib/auth";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Akses ditolak." }, { status: 401 });
  }

  const body = await req.json();
  const currentPassword = String(body.currentPassword || "");
  const newPassword = String(body.newPassword || "");

  if (newPassword.length < 6) {
    return NextResponse.json(
      { error: "Password baru minimal 6 karakter." },
      { status: 400 }
    );
  }

  const db = await getDb();
  const admin = await db.queryOne<{ id: number; password_hash: string }>(
    "SELECT id, password_hash FROM admins WHERE id = ?",
    [session.adminId]
  );

  if (!admin || !bcrypt.compareSync(currentPassword, admin.password_hash)) {
    return NextResponse.json(
      { error: "Password lama tidak sesuai." },
      { status: 400 }
    );
  }

  const nextHash = bcrypt.hashSync(newPassword, 10);
  await db.execute("UPDATE admins SET password_hash = ? WHERE id = ?", [nextHash, admin.id]);

  return NextResponse.json({ ok: true });
}
