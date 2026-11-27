import Link from "next/link";
import type { Philosopher } from "@/lib/types";
import { eraById } from "@/data/eras";
import { Avatar } from "./Avatar";

export function PhilosopherCard({ p }: { p: Philosopher }) {
  return (
    <Link
      href={`/philosophes/${p.slug}`}
      className="group glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition duration-500 hover:-translate-y-1 hover:border-white/20"
      style={{ ["--h" as string]: p.hue }}
    >
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-0 blur-3xl transition duration-700 group-hover:opacity-60"
        style={{ background: `hsl(${p.hue} 80% 55% / 0.45)` }}
      />
      <div className="flex items-center gap-4">
        <Avatar philosopher={p} size={60} className="transition duration-700 group-hover:rotate-12" />
        <div className="min-w-0">
          <h3 className="truncate font-display text-xl text-white">{p.name}</h3>
          <p className="text-xs text-white/45">{p.dates}</p>
        </div>
      </div>
      <p className="mt-5 flex-1 font-display text-[1.05rem] leading-snug text-white/75 italic">«&nbsp;{p.tagline}&nbsp;»</p>
      <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] tracking-wide text-white/50 uppercase">
        <span className="rounded-full border border-white/10 px-2.5 py-1">{eraById[p.era].name}</span>
        <span className="rounded-full border border-white/10 px-2.5 py-1">{p.school}</span>
      </div>
    </Link>
  );
}
