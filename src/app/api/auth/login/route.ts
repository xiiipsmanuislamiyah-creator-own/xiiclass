import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/db";
import { createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  if (process.env.DEMO_MODE === "true") {
    return NextResponse.json(
      { error: "Mode Demo: Login Admin dinonaktifkan pada pratinjau publik." },
      { status: 403 }
    );
  }
  try {
    const body = await req.json();
    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password wajib diisi." },
        { status: 400 }
      );
    }

    const db = await getDb();
    const admin = await db.queryOne<{
      id: number;
      username: string;
      password_hash: string;
      display_name: string;
    }>("SELECT id, username, password_hash, display_name FROM admins WHERE username = ?", [
      username,
    ]);

    if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
      return NextResponse.json(
        { error: "Username atau password salah." },
        { status: 401 }
      );
    }

    const token = createSessionToken({
      adminId: admin.id,
      username: admin.username,
      displayName: admin.display_name,
    });

    const res = NextResponse.json({
      ok: true,
      admin: { username: admin.username, displayName: admin.display_name },
    });

    res.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 });
  }
}
