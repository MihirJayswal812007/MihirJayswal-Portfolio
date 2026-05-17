/**
 * Root layout — Mihir Jayswal Portfolio
 * Injects all four Google Fonts as CSS variables.
 * Fonts: Cinzel (display) · Cormorant Garamond (headings/quotes) · Inter (body/UI) · JetBrains Mono (terminal)
 */
import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// ── Display / H1 — epic cinematic serif (LOTR / Star Wars feel)
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

// ── H2 / Section headings / Quotes — ancient manuscript serif
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// ── Body / UI / Nav / Buttons — clean modern sans
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// ── Terminal / Code — monospace (Contact section + easter eggs only)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mihir Jayswal — AI/ML Engineer & Full Stack Developer",
  description:
    "Personal portfolio of Mihir Jayswal — B-Tech AI/ML Engineer building intelligent, cinematic web experiences. One portfolio to rule them all.",
  keywords: [
    "Mihir Jayswal",
    "AI ML Engineer",
    "Full Stack Developer",
    "Portfolio",
    "Next.js",
    "React",
    "Machine Learning",
    "LangChain",
    "TypeScript",
  ],
  authors: [{ name: "Mihir Jayswal", url: "https://github.com/MihirJayswal812007" }],
  creator: "Mihir Jayswal",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Mihir Jayswal — AI/ML Engineer & Full Stack Developer",
    description:
      "Not all those who wander are without code. A cinematic portfolio by Mihir Jayswal.",
    siteName: "Mihir Jayswal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mihir Jayswal — AI/ML Engineer & Full Stack Developer",
    description:
      "Not all those who wander are without code. A cinematic portfolio.",
    creator: "@MihirJayswal",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Prevent FOUC — dark background set inline before CSS loads
      style={{ background: "#07070F" }}
    >
      <body
        className={`
          ${cinzel.variable}
          ${cormorant.variable}
          ${inter.variable}
          ${jetbrainsMono.variable}
          font-inter antialiased
          bg-bg-base text-parchment
          overflow-x-hidden
        `}
      >
        {/* Global grain overlay — sits at z-0, behind all section content (z-10+) */}
        {/* Applied once at root so every section shares the same texture DNA */}
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
