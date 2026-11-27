"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { philosophers } from "@/data/philosophers";
import { eras, traditions } from "@/data/eras";
import type { EraId, TraditionId } from "@/lib/types";
import { PhilosopherCard } from "./PhilosopherCard";

function norm(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function PhilosopherExplorer() {
  const params = useSearchParams();
  const initialEra = eras.find((e) => e.id === params.get("epoque"))?.id;
  const [era, setEra] = useState<EraId | "all">(initialEra ?? "all");
  const [trad, setTrad] = useState<TraditionId | "all">("all");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = norm(query.trim());
    return philosophers
      .filter((p) => era === "all" || p.era === era)
      .filter((p) => trad === "all" || p.tradition === trad)
      .filter(
        (p) =>
          !q ||
          norm([p.name, p.school, p.tagline, p.place, ...p.ideas, ...p.works].join(" ")).includes(q),
      )
      .sort((a, b) => a.born - b.born);
  }, [era, trad, query]);

  const chip = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm whitespace-nowrap transition ${
      active ? "bg-white text-ink-950" : "border border-white/10 text-white/60 hover:border-white/25 hover:text-white"
    }`;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="glass sticky top-20 z-30 rounded-3xl bg-ink-900/85 p-3 shadow-2xl shadow-black/30 sm:top-24">
        <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] px-4">
          <Search size={18} className="text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Chercher un nom, une idée, une œuvre… (ex. liberté, Éthique, Cordoue)"
            className="h-12 w-full bg-transparent text-white placeholder:text-white/35 focus:outline-none"
          />
        </div>
        <div className="scrollbar-none mt-3 flex gap-2 overflow-x-auto">
          <button className={chip(era === "all")} onClick={() => setEra("all")}>Toutes les époques</button>
          {eras.map((e) => (
            <button key={e.id} className={chip(era === e.id)} onClick={() => setEra(e.id)}>
              {e.name}
            </button>
          ))}
        </div>
        <div className="scrollbar-none mt-2 flex gap-2 overflow-x-auto">
          <button className={chip(trad === "all")} onClick={() => setTrad("all")}>Toutes les traditions</button>
          {traditions.map((t) => (
            <button key={t.id} className={chip(trad === t.id)} onClick={() => setTrad(t.id)}>
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-8 text-sm text-white/40">
        {list.length} philosophe{list.length > 1 ? "s" : ""}
      </p>
      <motion.div layout className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.slug}
              layout
              className="min-w-0"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
            >
              <PhilosopherCard p={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && (
        <p className="py-24 text-center font-display text-2xl text-white/40 italic">
          « Je sais que je ne sais rien »… et cette recherche non plus.
        </p>
      )}
    </div>
  );
}
