"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X } from "lucide-react";
import { concepts, conceptBySlug } from "@/data/concepts";
import { philosopherBySlug } from "@/data/philosophers";
import { Avatar } from "./Avatar";

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function ConceptList() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const fromHash = () => {
      const h = decodeURIComponent(window.location.hash.slice(1)).replace(/^concept-/, "");
      if (conceptBySlug[h]) {
        setOpen(h);
        setTimeout(() => document.getElementById(h)?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const list = useMemo(() => {
    const q = norm(query.trim());
    return [...concepts]
      .sort((a, b) => a.name.localeCompare(b.name, "fr"))
      .filter((c) => !q || norm(`${c.name} ${c.short} ${c.body}`).includes(q));
  }, [query]);

  const current = open ? conceptBySlug[open] : null;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="glass mx-auto flex max-w-xl items-center gap-3 rounded-full px-5">
        <Search size={18} className="text-white/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Chercher un concept…"
          className="h-12 w-full bg-transparent text-white placeholder:text-white/35 focus:outline-none"
        />
      </div>
      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {list.map((c) => (
          <button
            id={c.slug}
            key={c.slug}
            onClick={() => {
              setOpen(c.slug);
              history.replaceState(null, "", `#concept-${c.slug}`);
            }}
            className={`glass mb-4 block w-full break-inside-avoid rounded-3xl p-6 text-left transition hover:-translate-y-0.5 hover:border-gold-300/30 ${
              open === c.slug ? "border-gold-300/50" : ""
            }`}
          >
            <h3 className="font-display text-2xl text-white">{c.name}</h3>
            <p className="mt-2 leading-relaxed text-white/55">{c.short}</p>
            <div className="mt-4 flex -space-x-1.5">
              {c.philosophers.slice(0, 5).map((s) => (
                <Avatar key={s} philosopher={philosopherBySlug[s]} size={24} className="rounded-full ring-2 ring-ink-900" />
              ))}
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-950/70 p-3 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setOpen(null);
              history.replaceState(null, "", window.location.pathname + ("__philoSearch" in window ? "#concepts" : ""));
            }}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88svh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/10 bg-ink-900 p-8 shadow-2xl sm:p-10"
            >
              <button
                onClick={() => {
                  setOpen(null);
                  history.replaceState(null, "", window.location.pathname + ("__philoSearch" in window ? "#concepts" : ""));
                }}
                className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full text-white/50 hover:bg-white/10 hover:text-white"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
              <p className="text-xs tracking-[0.35em] text-gold-300/80 uppercase">Concept</p>
              <h2 className="mt-3 font-display text-4xl text-white">{current.name}</h2>
              <p className="mt-3 font-display text-xl text-white/70 italic">{current.short}</p>
              <p className="mt-6 leading-[1.85] text-white/75">{current.body}</p>
              <h3 className="mt-8 text-xs tracking-[0.25em] text-white/40 uppercase">Penseurs</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {current.philosophers.map((s) => {
                  const p = philosopherBySlug[s];
                  return (
                    <Link
                      key={s}
                      href={`/dialogue/${s}?q=${encodeURIComponent(`Que penses-tu de la notion de ${current.name.toLowerCase()} ?`)}`}
                      className="flex items-center gap-3 rounded-2xl border border-white/[0.08] p-3 transition hover:border-gold-300/40"
                    >
                      <Avatar philosopher={p} size={34} />
                      <span className="text-sm text-white/80">{p.name}</span>
                    </Link>
                  );
                })}
              </div>
              {current.related.length > 0 && (
                <>
                  <h3 className="mt-8 text-xs tracking-[0.25em] text-white/40 uppercase">Voir aussi</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {current.related.map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          setOpen(r);
                          history.replaceState(null, "", `#concept-${r}`);
                        }}
                        className="rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-white/70 hover:border-gold-300/50 hover:text-white"
                      >
                        {conceptBySlug[r].name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
