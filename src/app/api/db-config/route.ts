import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  createTursoClient,
  getDb,
  getDbStatusInfo,
  initSchemaOnClient,
  saveLocalDbConfig,
  seedMinimalOnClient,
  type DbClient,
} from "@/lib/db";

async function migrateIfTargetEmpty(source: DbClient, target: DbClient) {
  const existingClasses = await target.queryOne<{ c: number }>(
    "SELECT COUNT(*) as c FROM classes"
  );
  if (existingClasses && Number(existingClasses.c) > 0) {
    return { migrated: false, classes: 0, students: 0, rekap: 0 };
  }

  const school = await source.queryOne<{
    name: string;
    npsn: string;
    address: string;
    headmaster: string;
    academic_year: string;
    semester: string;
  }>("SELECT name, npsn, address, headmaster, academic_year, semester FROM schools WHERE id = 1");

  if (school) {
    await target.execute(
      `
        UPDATE schools
        SET name = ?, npsn = ?, address = ?, headmaster = ?, academic_year = ?, semester = ?
        WHERE id = 1
      `,
      [
        school.name,
        school.npsn,
        school.address,
        school.headmaster,
        school.academic_year,
        school.semester,
      ]
    );
  }

  const classes = await source.query<{ id: number; name: string; homeroom_teacher: string }>(
    "SELECT id, name, homeroom_teacher FROM classes ORDER BY id ASC"
  );
  const classIdMap = new Map<number, number>();
  for (const cls of classes) {
    const res = await target.execute(
      "INSERT INTO classes (name, homeroom_teacher) VALUES (?, ?)",
      [cls.name, cls.homeroom_teacher]
    );
    classIdMap.set(Number(cls.id), res.lastInsertRowid);
  }

  const students = await source.query<{
    id: number;
    class_id: number;
    nis: string;
    name: string;
    gender: string;
  }>("SELECT id, class_id, nis, name, gender FROM students ORDER BY id ASC");
  const studentIdMap = new Map<number, number>();
  for (const st of students) {
    const newClassId = classIdMap.get(Number(st.class_id));
    if (!newClassId) continue;
    const res = await target.execute(
      "INSERT INTO students (class_id, nis, name, gender) VALUES (?, ?, ?, ?)",
      [newClassId, st.nis, st.name, st.gender]
    );
    studentIdMap.set(Number(st.id), res.lastInsertRowid);
  }

  const records = await source.query<{
    student_id: number;
    period: string;
    hadir: number;
    sakit: number;
    izin: number;
    alpha: number;
    note: string;
  }>("SELECT student_id, period, hadir, sakit, izin, alpha, note FROM rekap_records");
  let rekapCount = 0;
  for (const r of records) {
    const newStudentId = studentIdMap.get(Number(r.student_id));
    if (!newStudentId) continue;
    await target.execute(
      `
        INSERT INTO rekap_records (student_id, period, hadir, sakit, izin, alpha, note)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(student_id, period) DO NOTHING
      `,
      [newStudentId, r.period, r.hadir, r.sakit, r.izin, r.alpha, r.note]
    );
    rekapCount++;
  }

  return {
    migrated: true,
    classes: classIdMap.size,
    students: studentIdMap.size,
    rekap: rekapCount,
  };
}

async function syncVercelEnvAndRedeploy(url: string, authToken: string) {
  const vercelToken = (process.env.VERCEL_TOKEN || "").trim();
  const projectId = (
    process.env.VERCEL_PROJECT_ID || "prj_yvoPpaxf0I5LfvL9VIv0HrqOsbDq"
  ).trim();
  const teamId = (process.env.VERCEL_TEAM_ID || "team_PykbCiKcrBezgAFycpWDU996").trim();

  if (!vercelToken) {
    return { synced: false, reason: "VERCEL_TOKEN belum diset di Environment Variables Vercel." };
  }

  const teamQuery = teamId ? `&teamId=${encodeURIComponent(teamId)}` : "";
  const headers = {
    Authorization: `Bearer ${vercelToken}`,
    "Content-Type": "application/json",
  };

  const envVars = [
    { key: "TURSO_DATABASE_URL", value: url },
    { key: "TURSO_AUTH_TOKEN", value: authToken },
  ];

  for (const item of envVars) {
    const res = await fetch(
      `https://api.vercel.com/v10/projects/${encodeURIComponent(projectId)}/env?upsert=true${teamQuery}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          key: item.key,
          value: item.value,
          type: "encrypted",
          target: ["production", "preview", "development"],
        }),
      }
    );
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gagal menyimpan env ${item.key} ke Vercel (${res.status}): ${errText}`);
    }
  }

  let redeployTriggered = false;
  let deploymentUrl: string | null = null;

  const listQuery = teamId ? `&teamId=${encodeURIComponent(teamId)}` : "";
  const listRes = await fetch(
    `https://api.vercel.com/v6/deployments?projectId=${encodeURIComponent(projectId)}&target=production&limit=1${listQuery}`,
    { headers }
  );

  if (listRes.ok) {
    const listData = (await listRes.json()) as {
      deployments?: Array<{ uid: string; name: string }>;
    };
    const latest = listData.deployments?.[0];
    if (latest) {
      const redeployQuery = teamId ? `?teamId=${encodeURIComponent(teamId)}` : "";
      const redeployRes = await fetch(
        `https://api.vercel.com/v13/deployments${redeployQuery}`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            name: latest.name || "xiiclass",
            deploymentId: latest.uid,
            target: "production",
          }),
        }
      );
      if (redeployRes.ok) {
        const dep = (await redeployRes.json()) as { url?: string };
        redeployTriggered = true;
        deploymentUrl = dep.url ? `https://${dep.url}` : null;
      }
    }
  }

  return { synced: true, redeployTriggered, deploymentUrl };
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Akses Admin diperlukan." }, { status: 401 });
  }

  try {
    const status = getDbStatusInfo();
    const db = await getDb();
    const cls = await db.queryOne<{ c: number }>("SELECT COUNT(*) as c FROM classes");
    const st = await db.queryOne<{ c: number }>("SELECT COUNT(*) as c FROM students");
    const rek = await db.queryOne<{ c: number }>("SELECT COUNT(*) as c FROM rekap_records");

    return NextResponse.json({
      mode: status.mode,
      urlMasked: status.urlMasked,
      isVercel: Boolean(process.env.VERCEL),
      vercelApiReady: Boolean(process.env.VERCEL_TOKEN),
      stats: {
        classes: Number(cls?.c ?? 0),
        students: Number(st?.c ?? 0),
        rekap: Number(rek?.c ?? 0),
      },
    });
  } catch {
    return NextResponse.json({ error: "Gagal membaca status database." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (process.env.DEMO_MODE === "true") {
    return NextResponse.json(
      { error: "Mode Demo: Pengaturan database dinonaktifkan." },
      { status: 403 }
    );
  }
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Akses Admin diperlukan." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const action = body.action === "test" ? "test" : "save";
    const url = String(body.url || "").trim();
    const authToken = String(body.authToken || "").trim();
    const migrateLocal = Boolean(body.migrateLocal);

    if (!url || !authToken) {
      return NextResponse.json(
        { error: "Database URL dan Auth Token wajib diisi." },
        { status: 400 }
      );
    }

    if (!/^libsql:\/\/|^https?:\/\//i.test(url)) {
      return NextResponse.json(
        { error: "Format URL harus diawali libsql:// atau https://" },
        { status: 400 }
      );
    }

    const targetDb = await createTursoClient(url, authToken);
    await targetDb.query("SELECT 1 as ok");

    if (action === "test") {
      return NextResponse.json({ ok: true, message: "Koneksi ke Turso berhasil." });
    }

    await initSchemaOnClient(targetDb);
    await seedMinimalOnClient(targetDb);

    let migration = { migrated: false, classes: 0, students: 0, rekap: 0 };
    if (migrateLocal) {
      const currentDb = await getDb();
      migration = await migrateIfTargetEmpty(currentDb, targetDb);
    }

    if (process.env.VERCEL) {
      const vercelResult = await syncVercelEnvAndRedeploy(url, authToken);
      if (!vercelResult.synced) {
        return NextResponse.json(
          { error: vercelResult.reason || "Gagal menyinkronkan ke Vercel." },
          { status: 400 }
        );
      }
      return NextResponse.json({
        ok: true,
        mode: "turso",
        redeployTriggered: vercelResult.redeployTriggered,
        deploymentUrl: vercelResult.deploymentUrl,
        migration,
      });
    }

    saveLocalDbConfig(url, authToken);
    return NextResponse.json({
      ok: true,
      mode: "turso",
      redeployTriggered: false,
      migration,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Gagal menghubungkan database.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
