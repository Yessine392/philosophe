"use client";

import Link from "next/link";
import { philosopherBySlug } from "@/data/philosophers";
import { Avatar } from "./Avatar";

const rings = [
  { r: 150, dur: 70, slugs: ["socrate", "confucius", "kant", "beauvoir"] },
  { r: 235, dur: 110, slugs: ["nietzsche", "lao-tseu", "spinoza", "averroes", "camus", "arendt"] },
  { r: 320, dur: 160, slugs: ["platon", "bouddha", "descartes", "avicenne", "marx", "wittgenstein", "epicure", "fanon"] },
];

export function Orbit() {
  return (
    <div className="pointer-events-none relative mx-auto aspect-square w-[min(92vw,700px)] select-none">
      <div className="absolute inset-0 grid place-items-center">
        <div className="h-40 w-40 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff6df,#e0b866_35%,#7c5cff33_70%,transparent_72%)] blur-[1px] animate-float" />
        <div className="absolute h-72 w-72 rounded-full bg-gold-300/10 blur-3xl" />
      </div>
      {rings.map((ring, ri) => {
        const pct = (ring.r / 350) * 50 * 0.95;
        const reverse = ri % 2 === 1;
        return (
          <div key={ri} className="absolute inset-0">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
              style={{ width: `${pct * 2}%`, height: `${pct * 2}%` }}
            />
            <div
              className="absolute inset-0"
              style={{ animation: `orbit ${ring.dur}s linear infinite${reverse ? " reverse" : ""}` }}
            >
              {ring.slugs.map((slug, i) => {
                const p = philosopherBySlug[slug];
                const a = ((i / ring.slugs.length) * 360 + ri * 25) * (Math.PI / 180);
                const size = ri === 0 ? 54 : ri === 1 ? 46 : 40;
                return (
                  <div
                    key={slug}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${50 + Math.cos(a) * pct}%`, top: `${50 + Math.sin(a) * pct}%` }}
                  >
                    <div style={{ animation: `orbit ${ring.dur}s linear infinite${reverse ? "" : " reverse"}` }}>
                      <Link
                        href={`/philosophes/${slug}`}
                        className="pointer-events-auto block scale-75 rounded-full shadow-[0_0_40px_-8px] shadow-gold-300/40 transition hover:scale-110 sm:scale-100"
                        title={p.name}
                      >
                        <Avatar philosopher={p} size={size} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
