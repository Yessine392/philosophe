"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { rankOf, useProgress, xpOf } from "@/lib/progress";

const links = [
  { href: "/parcours", label: "Parcours" },
  { href: "/philosophes", label: "Philosophes" },
  { href: "/agora", label: "Agora" },
  { href: "/concepts", label: "Concepts" },
  { href: "/frise", label: "Frise" },
];

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center rounded-full border border-gold-300/40 bg-gradient-to-br from-gold-200/20 to-transparent font-display text-lg text-gold-200 transition group-hover:border-gold-300/80">
        Φ
        <span className="absolute inset-0 rounded-full bg-gold-300/20 opacity-0 blur-md transition group-hover:opacity-100" />
      </span>
      <span className="font-display text-xl tracking-tight text-white">Philosophe</span>
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const progress = useProgress();
  const xp = xpOf(progress);
  const rank = rankOf(xp);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        className={`flex w-full max-w-6xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled || open ? "glass bg-ink-950/85 shadow-2xl shadow-black/40" : "border border-transparent"
        }`}
      >
        <Logo />
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    active ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <Link
            href="/carnet"
            className="group flex items-center gap-2 rounded-full border border-gold-300/25 bg-gold-300/5 py-1.5 pr-3.5 pl-1.5 text-sm text-gold-200 transition hover:border-gold-300/60"
            title={`${xp} points de sagesse`}
          >
            <span className="relative h-7 w-7">
              <svg viewBox="0 0 36 36" className="h-7 w-7 -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="var(--color-gold-300)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${Math.max(0.02, rank.pct) * 94.2} 94.2`}
                />
              </svg>
              <span className="absolute inset-0 grid place-items-center text-[10px] font-semibold text-gold-200">
                {rank.index + 1}
              </span>
            </span>
            <span className="hidden text-gold-200 sm:inline">{rank.title}</span>
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-full text-white/80 hover:bg-white/10 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="glass absolute inset-x-3 top-[4.6rem] rounded-3xl p-3 md:hidden">
          {[...links, { href: "/carnet", label: "Mon carnet" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 font-display text-lg text-white/85 hover:bg-white/5"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
