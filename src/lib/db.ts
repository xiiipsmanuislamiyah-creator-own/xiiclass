import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const DATA_DIR = process.env.VERCEL
  ? "/tmp/erekap-data"
  : path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "rekap.db");

let dbInstance: Database.Database | null = null;

export function getDb(): Database.Database {
  if (dbInstance) return dbInstance;

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  initSchema(db);
  seedIfEmpty(db);

  dbInstance = db;
  return db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schools (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      name TEXT NOT NULL,
      npsn TEXT NOT NULL,
      address TEXT NOT NULL,
      headmaster TEXT NOT NULL,
      academic_year TEXT NOT NULL,
      semester TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      homeroom_teacher TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class_id INTEGER NOT NULL,
      nis TEXT NOT NULL,
      name TEXT NOT NULL,
      gender TEXT NOT NULL CHECK (gender IN ('L', 'P')),
      FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
    );

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
    );

    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      display_name TEXT NOT NULL
    );
  `);
}

function seedIfEmpty(db: Database.Database) {
  const schoolCount = db.prepare("SELECT COUNT(*) as c FROM schools").get() as { c: number };
  if (schoolCount.c === 0) {
    db.prepare(`
      INSERT INTO schools (id, name, npsn, address, headmaster, academic_year, semester)
      VALUES (1, ?, ?, ?, ?, ?, ?)
    `).run(
      "MA NU Islamiyah Asembagus",
      "20584645",
      "Jl. Raya No. 170 Asembagus, Desa Trigonco, Kec. Asembagus, Kab. Situbondo, Jawa Timur",
      "Drs. H. Ahmad Fauzi, M.Pd.I",
      "2026/2027",
      "Ganjil"
    );
  }

  const adminCount = db.prepare("SELECT COUNT(*) as c FROM admins").get() as { c: number };
  if (adminCount.c === 0) {
    const hash = bcrypt.hashSync("admin123", 10);
    db.prepare(`
      INSERT INTO admins (username, password_hash, display_name)
      VALUES (?, ?, ?)
    `).run("admin", hash, "Administrator Rekap");
  }

  const classCount = db.prepare("SELECT COUNT(*) as c FROM classes").get() as { c: number };
  if (classCount.c === 0) {
    const insertClass = db.prepare("INSERT INTO classes (name, homeroom_teacher) VALUES (?, ?)");
    const insertStudent = db.prepare("INSERT INTO students (class_id, nis, name, gender) VALUES (?, ?, ?, ?)");
    const insertRekap = db.prepare(`
      INSERT INTO rekap_records (student_id, period, hadir, sakit, izin, alpha, note)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const currentPeriod = new Date().toISOString().slice(0, 7);

    const seedData = [
      {
        name: "X IPA 1",
        teacher: "Siti Aminah, S.Pd",
        students: [
          { nis: "01", name: "Ahmad Rifqi Maulana", gender: "L", h: 20, s: 1, i: 0, a: 0, note: "" },
          { nis: "02", name: "Aisyah Nur Hidayah", gender: "P", h: 21, s: 0, i: 0, a: 0, note: "" },
          { nis: "03", name: "Bagus Pratama Putra", gender: "L", h: 19, s: 1, i: 1, a: 0, note: "Izin acara keluarga" },
          { nis: "04", name: "Citra Dewi Lestari", gender: "P", h: 21, s: 0, i: 0, a: 0, note: "" },
          { nis: "05", name: "Dimas Wahyu Saputra", gender: "L", h: 18, s: 0, i: 1, a: 2, note: "Perlu pembinaan wali kelas" },
          { nis: "06", name: "Firda Amalia Putri", gender: "P", h: 20, s: 1, i: 0, a: 0, note: "" },
        ],
      },
      {
        name: "XI IPA 1",
        teacher: "M. Syafi'i, S.Ag",
        students: [
          { nis: "01", name: "Fajar Kurniawan", gender: "L", h: 21, s: 0, i: 0, a: 0, note: "" },
          { nis: "02", name: "Hana Maulida", gender: "P", h: 19, s: 2, i: 0, a: 0, note: "Surat dokter terlampir" },
          { nis: "03", name: "Ilham Akbar Wijaya", gender: "L", h: 20, s: 0, i: 1, a: 0, note: "Dispensasi lomba OSN" },
          { nis: "04", name: "Khusnul Khotimah", gender: "P", h: 21, s: 0, i: 0, a: 0, note: "" },
          { nis: "05", name: "Lukman Hakim", gender: "L", h: 19, s: 0, i: 1, a: 1, note: "" },
          { nis: "06", name: "Nadia Rahmawati", gender: "P", h: 20, s: 1, i: 0, a: 0, note: "" },
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
          { nis: "05", name: "Taufik Hidayatullah", gender: "L", h: 19, s: 1, i: 0, a: 1, note: "" },
          { nis: "06", name: "Zahra Aulia Nisa", gender: "P", h: 20, s: 0, i: 1, a: 0, note: "" },
        ],
      },
    ];

    const tx = db.transaction(() => {
      for (const cls of seedData) {
        const res = insertClass.run(cls.name, cls.teacher);
        const classId = Number(res.lastInsertRowid);
        for (const st of cls.students) {
          const stRes = insertStudent.run(classId, st.nis, st.name, st.gender);
          const studentId = Number(stRes.lastInsertRowid);
          insertRekap.run(studentId, currentPeriod, st.h, st.s, st.i, st.a, st.note);
        }
      }
    });
    tx();
  }
}
