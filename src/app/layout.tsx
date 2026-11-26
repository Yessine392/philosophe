import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Philosophe — Deviens philosophe en dialoguant avec les siècles",
    template: "%s · Philosophe",
  },
  description:
    "Parcours d'apprentissage, concepts et dialogues avec plus de cinquante philosophes de tous les siècles et de toutes les traditions, incarnés par l'IA.",
};

export const viewport: Viewport = {
  themeColor: "#06060b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <div className="cosmos" aria-hidden />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
