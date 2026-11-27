"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { philosophers } from "@/data/philosophers";
import { Avatar } from "./Avatar";

const pool = philosophers.flatMap((p) =>
  p.quotes.filter((q) => !q.startsWith("(")).map((q) => ({ p, q })),
);

const noop = () => () => {};

export function DailyThought() {
  const index = useSyncExternalStore(
    noop,
    () => (Math.floor(Date.now() / 86_400_000) * 7919) % pool.length,
    () => null,
  );
  const item = pool[index ?? 0];
  return (
    <div className={`transition-opacity duration-700 ${index === null ? "opacity-0" : "opacity-100"}`}>
      <p className="text-xs tracking-[0.35em] text-gold-300/80 uppercase">Pensée du jour</p>
      <blockquote className="mt-6 font-display text-3xl leading-tight font-light text-white sm:text-4xl md:text-5xl">
        <span className="text-gold-300">“</span>
        {item.q.replace(/\s*\([^)]*\)\.?$/, "")}
        <span className="text-gold-300">”</span>
      </blockquote>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Avatar philosopher={item.p} size={44} />
        <div className="text-sm">
          <p className="text-white">{item.p.name}</p>
          <p className="text-white/45">{item.p.dates}</p>
        </div>
        <Link
          href={`/dialogue/${item.p.slug}?q=${encodeURIComponent(`Que voulais-tu dire par : « ${item.q} » ?`)}`}
          className="ml-auto rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition hover:border-gold-300/60 hover:text-white"
        >
          Lui demander ce qu&apos;il voulait dire →
        </Link>
      </div>
    </div>
  );
}
