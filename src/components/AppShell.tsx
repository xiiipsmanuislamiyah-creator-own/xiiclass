"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  SquaresFour,
  Table,
  SlidersHorizontal,
  Info,
  ShieldCheck,
  Eye,
} from "@phosphor-icons/react";
import { withBasePath } from "@/lib/paths";
import { SplashScreen } from "./SplashScreen";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: SquaresFour },
  { href: "/rekap", label: "Rekap", icon: Table },
  { href: "/admin", label: "Kelola", icon: SlidersHorizontal },
  { href: "/info", label: "Info", icon: Info },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const syncSession = () => {
      fetch(withBasePath("/api/auth/session"))
        .then((r) => r.json())
        .then((d) => setIsAdmin(Boolean(d?.authenticated)))
        .catch(() => setIsAdmin(false));
    };
    syncSession();
    window.addEventListener("erekap-auth-changed", syncSession);
    return () => window.removeEventListener("erekap-auth-changed", syncSession);
  }, [pathname]);

  return (
    <>
      <SplashScreen />

      <div className="min-h-screen flex flex-col lg:flex-row text-[var(--ink)]">
        {/* Desktop Sidebar (>= 1024px) */}
        <aside className="no-print hidden lg:flex lg:w-68 lg:flex-col lg:fixed lg:inset-y-0 bg-[var(--surface)] border-r border-[var(--border)] shadow-[4px_0_24px_-12px_rgba(10,61,38,0.12)] z-30">
          <Link href="/" className="flex items-center gap-3.5 px-5 py-5 border-b border-[var(--border)] hover:bg-[var(--surface-raised)] transition-colors">
            <img
              src={withBasePath("/icon-erekap.png")}
              alt="Ikon E-Rekap"
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 object-contain drop-shadow-sm"
            />
            <div className="min-w-0">
              <p className="text-base font-extrabold tracking-tight text-[var(--ink)] truncate">
                E-Rekap
              </p>
              <p className="text-xs font-medium text-[var(--ink-muted)] truncate">
                Beranda & Portal
              </p>
            </div>
          </Link>

          <nav aria-label="Navigasi Utama" className="flex-1 px-3.5 py-5 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`btn-tactile flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${
                    active
                      ? "bg-[#0A3D26] text-white shadow-[0_10px_22px_-8px_rgba(10,61,38,0.55)]"
                      : "text-[var(--ink-muted)] hover:bg-[var(--surface-mint)] hover:text-[var(--canopy)]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={20} weight={active ? "fill" : "regular"} />
                    <span>{item.label}</span>
                  </span>
                  {active && (
                    <span className="h-2 w-2 rounded-full bg-[#A3E635]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[var(--border)]">
            <div
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold ${
                isAdmin
                  ? "bg-[#0A3D26] text-[#A3E635]"
                  : "bg-[var(--surface-mint)] text-[var(--canopy)]"
              }`}
            >
              {isAdmin ? (
                <>
                  <ShieldCheck size={17} weight="fill" />
                  <span>Mode Admin (Akses Edit)</span>
                </>
              ) : (
                <>
                  <Eye size={17} weight="bold" />
                  <span>Mode Review (Publik)</span>
                </>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 lg:pl-68 pb-28 lg:pb-12">
          <div className="mx-auto max-w-6xl lg:px-8 lg:py-6">{children}</div>
        </main>

        {/* Mobile Deep Forest Pill Dock (< 1024px) */}
        <nav
          aria-label="Navigasi Bawah"
          className="no-print lg:hidden fixed bottom-3.5 inset-x-4 z-40 mx-auto max-w-md rounded-full bg-[#0A3D26] border border-white/15 shadow-[var(--shadow-dock)] p-1.5"
        >
          <div className="flex items-center justify-between gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  className={`btn-tactile flex items-center justify-center gap-1.5 min-h-[44px] rounded-full text-xs font-extrabold transition-all ${
                    active
                      ? "bg-[#A3E635] text-[#072919] px-4 shadow-md shrink-0"
                      : "flex-1 text-emerald-100/75 hover:text-white"
                  }`}
                >
                  <Icon size={20} weight={active ? "fill" : "regular"} />
                  {active && <span className="whitespace-nowrap">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
