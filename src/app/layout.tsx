import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { TransitionProvider } from "@/components/TransitionProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans-base",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-base",
  subsets: ["latin"],
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/xiiclass";

export const metadata: Metadata = {
  title: "E-Rekap — Sistem Rekapitulasi Kehadiran",
  description: "Aplikasi rekapitulasi kehadiran siswa berstandar formal sekolah.",
  manifest: `${basePath}/manifest.json`,
  icons: {
    icon: [
      { url: `${basePath}/icon-erekap-32.png`, sizes: "32x32", type: "image/png" },
      { url: `${basePath}/icon-erekap-192.png`, sizes: "192x192", type: "image/png" },
      { url: `${basePath}/icon-erekap.png`, sizes: "512x512", type: "image/png" },
    ],
    apple: `${basePath}/apple-touch-icon.png`,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F5132",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
