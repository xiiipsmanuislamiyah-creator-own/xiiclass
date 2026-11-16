import Database from "better-sqlite3";
import { createClient, type Client as LibsqlClient, type InValue } from "@libsql/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

export interface DbStatement {
  sql: string;
  args?: InValue[];
}

export interface DbRunResult {
  lastInsertRowid: number;
  rowsAffected: number;
}

export interface DbClient {
  mode: "turso" | "local";
  query<T = Record<string, unknown>>(sql: string, args?: InValue[]): Promise<T[]>;
  queryOne<T = Record<string, unknown>>(sql: string, args?: InValue[]): Promise<T | undefined>;
  execute(sql: string, args?: InValue[]): Promise<DbRunResult>;
  batch(statements: DbStatement[]): Promise<void>;
}

const DATA_DIR = process.env.VERCEL
  ? "/tmp/erekap-data"
  : path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "rekap.db");
const LOCAL_CONFIG_PATH = path.join(DATA_DIR, "db-config.json");

let cachedDb: DbClient | null = null;
let initPromise: Promise<DbClient> | null = null;

function readTursoCredentials(): { url: string; authToken: string } | null {
  const envUrl = (process.env.TURSO_DATABASE_URL || "").trim();
  const envToken = (process.env.TURSO_AUTH_TOKEN || "").trim();
  if (envUrl && envToken) {
    return { url: envUrl, authToken: envToken };
  }

  if (!process.env.VERCEL && fs.existsSync(LOCAL_CONFIG_PATH)) {
    try {
      const raw = JSON.parse(fs.readFileSync(LOCAL_CONFIG_PATH, "utf8")) as {
        url?: string;
        authToken?: string;
      };
      if (raw.url && raw.authToken) {
        return { url: raw.url.trim(), authToken: raw.authToken.trim() };
      }
    } catch {
      // Ignore malformed local config and fall back to SQLite
    }
  }

  return null;
}

export function getDbStatusInfo(): { mode: "turso" | "local"; urlMasked: string | null } {
  const creds = readTursoCredentials();
  if (!creds) {
    return { mode: "local", urlMasked: null };
  }
  const masked = creds.url.replace(/^(libsql:\/\/|https?:\/\/)([^.@/]+)(.*)$/, (_, proto, host, rest) => {
    const shortHost = host.length > 10 ? `${host.slice(0, 6)}...${host.slice(-4)}` : host;
    return `${proto}${shortHost}${rest}`;
  });
  return { mode: "turso", urlMasked: masked };
}

export function saveLocalDbConfig(url: string, authToken: string): void {
  if (process.env.VERCEL) return;
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(
    LOCAL_CONFIG_PATH,
    JSON.stringify({ url: url.trim(), authToken: authToken.trim() }, null, 2),
    "utf8"
  );
  resetDbInstance();
}

export function resetDbInstance(): void {
  cachedDb = null;
  initPromise = null;
}

export function wrapLibsqlClient(client: LibsqlClient): DbClient {
  return {
    mode: "turso",
    async query<T = Record<string, unknown>>(sql: string, args: InValue[] = []): Promise<T[]> {
      const res = await client.execute({ sql, args });
      return res.rows as unknown as T[];
    },
    async queryOne<T = Record<string, unknown>>(sql: string, args: InValue[] = []): Promise<T | undefined> {
      const res = await client.execute({ sql, args });
      return res.rows[0] as unknown as T | undefined;
    },
    async execute(sql: string, args: InValue[] = []): Promise<DbRunResult> {
      const res = await client.execute({ sql, args });
      return {
        lastInsertRowid: Number(res.lastInsertRowid ?? 0),
        rowsAffected: res.rowsAffected,
      };
    },
    async batch(statements: DbStatement[]): Promise<void> {
      if (statements.length === 0) return;
      await client.batch(
        statements.map((s) => ({ sql: s.sql, args: s.args ?? [] })),
        "write"
      );
    },
  };
}

function wrapSqliteClient(db: Database.Database): DbClient {
  return {
    mode: "local",
    async query<T = Record<string, unknown>>(sql: string, args: InValue[] = []): Promise<T[]> {
      return db.prepare(sql).all(...args) as T[];
    },
    async queryOne<T = Record<string, unknown>>(sql: string, args: InValue[] = []): Promise<T | undefined> {
      return db.prepare(sql).get(...args) as T | undefined;
    },
    async execute(sql: string, args: InValue[] = []): Promise<DbRunResult> {
      const res = db.prepare(sql).run(...args);
      return {
        lastInsertRowid: Number(res.lastInsertRowid),
        rowsAffected: res.changes,
      };
    },
    async batch(statements: DbStatement[]): Promise<void> {
      if (statements.length === 0) return;
      const tx = db.transaction((items: DbStatement[]) => {
        for (const item of items) {
          db.prepare(item.sql).run(...(item.args ?? []));
        }
      });
      tx(statements);
    },
  };
}

export async function createTursoClient(url: string, authToken: string): Promise<DbClient> {
  const client = createClient({ url: url.trim(), authToken: authToken.trim() });
  return wrapLibsqlClient(client);
}

export async function initSchemaOnClient(db: DbClient): Promise<void> {
  const statements: DbStatement[] = [
    {
      sql: `
        CREATE TABLE IF NOT EXISTS schools (
          id INTEGER PRIMARY KEY CHECK (id = 1),
          name TEXT NOT NULL,
          npsn TEXT NOT NULL,
          address TEXT NOT NULL,
          headmaster TEXT NOT NULL,
          academic_year TEXT NOT NULL,
          semester TEXT NOT NULL
        )
      `,
    },
    {
      sql: `
        CREATE TABLE IF NOT EXISTS classes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE,
          homeroom_teacher TEXT NOT NULL
        )
      `,
    },
    {
      sql: `
        CREATE TABLE IF NOT EXISTS students (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          class_id INTEGER NOT NULL,
          nis TEXT NOT NULL,
          name TEXT NOT NULL,
          gender TEXT NOT NULL CHECK (gender IN ('L', 'P')),
          FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
        )
      `,
    },
    {
      sql: `
        CREATE TABLE IF NOT EXISTS rekap_records (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          student_id INTEGER NOT NULL,
          period TEXT NOT NULL,
          hadir INTEGER NOT NULL DEFAULT 0,
          sakit INTEGER NOT NULL DEFAULT 0,
          izin INTEGER NOT NULL DEFAULT 0,
          alpha INTEGER NOT NULL DEFAULT 0,
          note TEXT NOT NULL DEFAULT '',
          updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(student_id, period),
          FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
        )
      `,
    },
    {
      sql: `
        CREATE TABLE IF NOT EXISTS admins (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          display_name TEXT NOT NULL
        )
      `,
    },
  ];

  await db.batch(statements);
}

export async function seedMinimalOnClient(db: DbClient): Promise<void> {
  const schoolCount = await db.queryOne<{ c: number }>("SELECT COUNT(*) as c FROM schools");
  if (!schoolCount || Number(schoolCount.c) === 0) {
    await db.execute(
      `
        INSERT INTO schools (id, name, npsn, address, headmaster, academic_year, semester)
        VALUES (1, ?, ?, ?, ?, ?, ?)
      `,
      [
        "MA NU Islamiyah Asembagus",
        "20584645",
        "Jl. Raya No. 170 Asembagus, Desa Trigonco, Kec. Asembagus, Kab. Situbondo, Jawa Timur",
        "Drs. H. Ahmad Fauzi, M.Pd.I",
        "2026/2027",
        "Ganjil",
      ]
    );
  }

  const adminCount = await db.queryOne<{ c: number }>("SELECT COUNT(*) as c FROM admins");
  if (!adminCount || Number(adminCount.c) === 0) {
    const hash = bcrypt.hashSync("admin123", 10);
    await db.execute(
      `
        INSERT INTO admins (username, password_hash, display_name)
        VALUES (?, ?, ?)
      `,
      ["admin", hash, "Administrator Rekap"]
    );
  }

  if (process.env.DEMO_MODE === "true") {
    const classCount = await db.queryOne<{ c: number }>("SELECT COUNT(*) as c FROM classes");
    if (!classCount || Number(classCount.c) === 0) {
      const currentPeriod = new Date().toISOString().slice(0, 7);
      const demoClasses = [
        {
          name: "X IPA 1",
          teacher: "Siti Aminah, S.Pd",
          students: [
            { nis: "01", name: "Ahmad Rifqi Maulana", gender: "L", h: 20, s: 1, i: 0, a: 0, note: "" },
            { nis: "02", name: "Aisyah Nur Hidayah", gender: "P", h: 21, s: 0, i: 0, a: 0, note: "" },
            { nis: "03", name: "Bagus Pratama Putra", gender: "L", h: 19, s: 1, i: 1, a: 0, note: "Izin acara keluarga" },
            { nis: "04", name: "Citra Dewi Lestari", gender: "P", h: 21, s: 0, i: 0, a: 0, note: "" },
            { nis: "05", name: "Dimas Wahyu Saputra", gender: "L", h: 18, s: 0, i: 1, a: 2, note: "Perlu pembinaan" },
          ],
        },
        {
          name: "XI IPA 1",
          teacher: "M. Syafi'i, S.Ag",
          students: [
            { nis: "01", name: "Fajar Kurniawan", gender: "L", h: 21, s: 0, i: 0, a: 0, note: "" },
            { nis: "02", name: "Hana Maulida", gender: "P", h: 19, s: 2, i: 0, a: 0, note: "Surat dokter" },
            { nis: "03", name: "Ilham Akbar Wijaya", gender: "L", h: 20, s: 0, i: 1, a: 0, note: "Dispensasi OSN" },
            { nis: "04", name: "Khusnul Khotimah", gender: "P", h: 21, s: 0, i: 0, a: 0, note: "" },
          ],
        },
        {
          name: "XII IPS 1",
          teacher: "Nurul Huda, M.Pd",
          students: [
            { nis: "01", name: "Moh. Zainul Arifin", gender: "L", h: 20, s: 0, i: 1, a: 0, note: "" },
            { nis: "02", name: "Putri Salsabila", gender: "P", h: 21, s: 0, i: 0, a: 0, note: "" },
            { nis: "03", name: "Rizky Aditya", gender: "L", h: 18, s: 2, i: 1, a: 0, note: "" },
            { nis: "04", name: "Siti Fatimah Az-Zahra", gender: "P", h: 21, s: 0, i: 0, a: 0, note: "" },
          ],
        },
      ];

      for (const cls of demoClasses) {
        const clsRes = await db.execute(
          "INSERT INTO classes (name, homeroom_teacher) VALUES (?, ?)",
          [cls.name, cls.teacher]
        );
        const classId = clsRes.lastInsertRowid;
        for (const st of cls.students) {
          const stRes = await db.execute(
            "INSERT INTO students (class_id, nis, name, gender) VALUES (?, ?, ?, ?)",
            [classId, st.nis, st.name, st.gender]
          );
          await db.execute(
            "INSERT INTO rekap_records (student_id, period, hadir, sakit, izin, alpha, note) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [stRes.lastInsertRowid, currentPeriod, st.h, st.s, st.i, st.a, st.note]
          );
        }
      }
    }
  }
}

export async function getDb(): Promise<DbClient> {
  if (cachedDb) return cachedDb;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const turso = readTursoCredentials();
    let client: DbClient;

    if (turso) {
      const libsql = createClient({ url: turso.url, authToken: turso.authToken });
      client = wrapLibsqlClient(libsql);
    } else {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const sqlite = new Database(DB_PATH);
      sqlite.pragma("journal_mode = WAL");
      sqlite.pragma("foreign_keys = ON");
      client = wrapSqliteClient(sqlite);
    }

    await initSchemaOnClient(client);
    await seedMinimalOnClient(client);
    cachedDb = client;
    return client;
  })();

  try {
    return await initPromise;
  } catch (err) {
    initPromise = null;
    throw err;
  }
}
