# E-Rekap — Monthly Student Attendance Recap System

[![Next.js](https://img.shields.io/badge/Next.js-16.4-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Turso](https://img.shields.io/badge/Database-Turso%20%2F%20SQLite-4FF8D2?style=flat-square)](https://turso.tech/)
[![License: MIT](https://img.shields.io/badge/License-MIT-A3E635?style=flat-square)](LICENSE)

**E-Rekap** is an open-source, mobile-first monthly student attendance recap web application built with Next.js App Router, Tailwind CSS, and hybrid SQLite / Turso (libSQL) persistence. Designed for schools and homeroom teachers with zero-friction setup, printable A4 reports, Excel (`.xlsx`) backup/import, and an in-app Cloud Database setup wizard.

---

## Key Features

- **Public Attendance Dashboard (`/dashboard`)** — Monthly attendance summary, attendance rate, and per-class breakdown with period & class filtering.
- **Formal Recap Table & A4 Print (`/rekap`)** — Clean student attendance ledger (`Hadir`, `Sakit`, `Izin`, `Alpha`, percentage, notes) with print-ready A4 letterhead.
- **Admin Control Panel (`/admin`)** — Protected by HMAC-signed HTTP-only session cookies:
  - Inline monthly attendance editing and `.xlsx` export/import backup.
  - Class and student master data management.
  - School profile & letterhead configuration.
  - **In-App Cloud DB Setup (Turso / libSQL)** — Teachers can connect a Turso database directly from the Admin UI (with connection testing, automatic schema initialization, and optional data migration) without opening the Vercel dashboard.
- **Zero-Demo Clean Start** — Automatically initializes the 5 core tables (`schools`, `classes`, `students`, `rekap_records`, `admins`) without polluting production with dummy student records.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + Phosphor Icons
- **Database:** `@libsql/client` (Turso Cloud) with `better-sqlite3` local fallback
- **Auth:** `bcryptjs` + HMAC-SHA256 HTTP-only cookies
- **Spreadsheets:** SheetJS (`xlsx`)

---

## Project Structure

```text
src/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── dashboard/page.tsx       # Attendance analytics & class overview
│   ├── rekap/page.tsx           # Formal attendance table & A4 print view
│   ├── admin/page.tsx           # Admin panel (Rekap, Master Data, School, Database)
│   ├── info/page.tsx            # School profile, developer info & source code link
│   └── api/
│       ├── auth/                # Login, logout, session, password update
│       ├── classes/             # Class CRUD
│       ├── students/            # Student CRUD
│       ├── rekap/               # Attendance read/upsert & XLSX import
│       ├── school/              # School profile settings
│       ├── overview/            # Dashboard summary metrics
│       └── db-config/           # Turso connection test, setup & Vercel env sync
└── lib/
    ├── auth.ts                  # Cookie session utilities
    ├── db.ts                    # Unified async DbClient (Turso + SQLite fallback)
    └── paths.ts                 # Base path helper
```

---

## Quick Start (Local / VPS)

```bash
git clone https://github.com/xiiipsmanuislamiyah-creator-own/xiiclass.git
cd xiiclass
cp .env.example .env
npm install
npm run build
npm run start
```

Open `http://localhost:3000/xiiclass` (default admin login: `admin` / `admin123` — please change immediately in **Admin > Pengaturan & Akun**).

---

## Cloud Deployment (Vercel + Turso)

1. Deploy this repository to **Vercel** (root `/` automatically redirects to `/xiiclass` via `vercel.json`).
2. To allow teachers to connect their own Turso database directly from `/admin` without touching Vercel:
   - Add `VERCEL_TOKEN` (and optionally `VERCEL_PROJECT_ID`, `VERCEL_TEAM_ID`) in Vercel Project Environment Variables once.
   - Log in to `/xiiclass/admin`, open the **Database** tab, paste the Turso `libsql://...` URL & Auth Token, click **Tes Koneksi**, then **Simpan & Hubungkan**.

---

## License

Released under the [MIT License](LICENSE).
