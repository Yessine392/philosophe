"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp, ChevronDown, Pause, Play, ScrollText, Shuffle, Swords } from "lucide-react";
import { philosophers, philosopherBySlug } from "@/data/philosophers";
import { eraById } from "@/data/eras";
import type { Philosopher } from "@/lib/types";
import { Avatar } from "./Avatar";
import { Markdown } from "./Markdown";
import { recordDebate } from "@/lib/progress";

type Entry = { speaker: string; text: string };

const MAX_AUTO_TURNS = 8;

const suggestions = [
  "Le bonheur dépend-il de nous ?",
  "Faut-il toujours dire la vérité ?",
  "Sommes-nous vraiment libres ?",
  "La fin justifie-t-elle les moyens ?",
  "Peut-on être heureux sans les autres ?",
  "La technique nous rend-elle plus humains ?",
  "Qu'est-ce qu'une vie réussie ?",
  "Doit-on obéir aux lois injustes ?",
];

const pairs: [string, string][] = [
  ["kant", "nietzsche"],
  ["epicure", "epictete"],
  ["confucius", "lao-tseu"],
  ["machiavel", "arendt"],
  ["hobbes", "rousseau"],
  ["descartes", "hume"],
  ["al-ghazali", "averroes"],
  ["sartre", "camus"],
];

function Picker({
  value,
  onChange,
  exclude,
  label,
}: {
  value: Philosopher;
  onChange: (slug: string) => void;
  exclude: string;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const sorted = useMemo(() => [...philosophers].sort((a, b) => a.born - b.born), []);
  return (
    <div ref={ref} className="relative">
      <p className="mb-2 text-xs tracking-[0.25em] text-white/40 uppercase">{label}</p>
      <button
        onClick={() => setOpen((o) => !o)}
        className="glass flex w-full items-center gap-3 rounded-2xl p-3 text-left transition hover:border-white/20"
      >
        <Avatar philosopher={value} size={44} />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-display text-lg text-white">{value.name}</span>
          <span className="block truncate text-xs text-white/40">{value.dates}</span>
        </span>
        <ChevronDown size={18} className={`text-white/40 transition ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute inset-x-0 top-full z-40 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-white/10 bg-ink-900/95 p-1.5 shadow-2xl backdrop-blur-xl"
          >
            {sorted
              .filter((p) => p.slug !== exclude)
              .map((p) => (
                <button
                  key={p.slug}
                  onClick={() => {
                    onChange(p.slug);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-white/[0.06] ${
                    p.slug === value.slug ? "bg-white/[0.06]" : ""
                  }`}
                >
                  <Avatar philosopher={p} size={30} />
                  <span className="flex-1 truncate text-sm text-white/85">{p.name}</span>
                  <span className="text-[10px] tracking-wider text-white/30 uppercase">{eraById[p.era].name}</span>
                </button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Agora() {
  const params = useSearchParams();
  const initialA = params.get("a") ?? undefined;
  const initialB = params.get("b") ?? undefined;
  const [aSlug, setA] = useState(initialA && philosopherBySlug[initialA] ? initialA : "kant");
  const [bSlug, setB] = useState(
    initialB && philosopherBySlug[initialB] && initialB !== aSlug ? initialB : aSlug === "nietzsche" ? "kant" : "nietzsche",
  );
  const a = philosopherBySlug[aSlug];
  const b = philosopherBySlug[bSlug];
  const [topic, setTopic] = useState(suggestions[2]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [synthesis, setSynthesis] = useState("");
  const [speaking, setSpeaking] = useState<string | null>(null);
  // Nombre de tours de parole jusqu'auquel la lecture automatique continue.
  const [autoUntil, setAutoUntil] = useState(0);
  const [interjection, setInterjection] = useState("");
  const [error, setError] = useState<string | null>(null);
  const started = entries.length > 0;
  const philoCount = entries.filter((e) => e.speaker !== "eleve").length;
  const autoActive = philoCount < autoUntil;
  const bottomRef = useRef<HTMLDivElement>(null);
  const entriesRef = useRef<Entry[]>([]);
  entriesRef.current = entries;

  useEffect(() => {
    if (started) bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [entries, synthesis, started]);

  async function stream(body: object, onText: (t: string) => void) {
    const res = await fetch("/api/agora", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok || !res.body) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "L'Agora est fermée pour le moment.");
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let acc = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      acc += decoder.decode(value, { stream: true });
      onText(acc);
    }
    return acc;
  }

  async function turn(history: Entry[] = entriesRef.current) {
    if (speaking) return;
    const philoTurns = history.filter((e) => e.speaker === aSlug || e.speaker === bSlug);
    const last = philoTurns[philoTurns.length - 1];
    const next = !last ? aSlug : last.speaker === aSlug ? bSlug : aSlug;
    setError(null);
    setSpeaking(next);
    const base = [...history, { speaker: next, text: "" }];
    setEntries(base);
    try {
      const text = await stream({ a: aSlug, b: bSlug, topic, transcript: history, next }, (t) =>
        setEntries([...history, { speaker: next, text: t }]),
      );
      const done = [...history, { speaker: next, text }];
      setEntries(done);
      if (history.length === 0) recordDebate();
      return done;
    } catch (e) {
      setError((e as Error).message);
      setEntries(history);
      setAutoUntil(0);
    } finally {
      setSpeaking(null);
    }
  }

  // Lecture automatique : enchaîne les tours.
  useEffect(() => {
    if (!autoActive || speaking) return;
    const t = setTimeout(() => turn(), 900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoActive, speaking, entries]);

  async function synthesize() {
    setAutoUntil(0);
    setSpeaking("synthese");
    setSynthesis("");
    setError(null);
    try {
      await stream({ a: aSlug, b: bSlug, topic, transcript: entries, next: "synthese" }, setSynthesis);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSpeaking(null);
    }
  }

  function interject() {
    const text = interjection.trim();
    if (!text || speaking) return;
    const next = [...entries, { speaker: "eleve", text }];
    setEntries(next);
    setInterjection("");
    turn(next);
  }

  function reset() {
    setEntries([]);
    setSynthesis("");
    setAutoUntil(0);
    setError(null);
  }

  function shuffle() {
    const [x, y] = pairs[Math.floor(Math.random() * pairs.length)];
    setA(x);
    setB(y);
    setTopic(suggestions[Math.floor(Math.random() * suggestions.length)]);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      {!started ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-[2rem] p-6 sm:p-10">
          <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
            <Picker label="Premier orateur" value={a} exclude={bSlug} onChange={setA} />
            <div className="hidden pb-5 text-center font-display text-2xl text-gold-300 italic sm:block">contre</div>
            <Picker label="Second orateur" value={b} exclude={aSlug} onChange={setB} />
          </div>
          <div className="mt-8">
            <p className="mb-2 text-xs tracking-[0.25em] text-white/40 uppercase">La question</p>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              maxLength={300}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 font-display text-xl text-white placeholder:text-white/30 focus:border-gold-300/40 focus:outline-none"
              placeholder="Formule la question à débattre…"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setTopic(s)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs transition ${
                    topic === s ? "border-gold-300/60 text-gold-200" : "border-white/10 text-white/50 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => {
                setAutoUntil(MAX_AUTO_TURNS);
              }}
              disabled={!topic.trim()}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-200 via-gold-300 to-gold-400 px-7 py-4 font-medium text-ink-950 shadow-[0_10px_40px_-10px] shadow-gold-400/60 disabled:opacity-40"
            >
              <Swords size={18} /> Ouvrir le débat
            </button>
            <button
              onClick={shuffle}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-white/75 hover:text-white"
            >
              <Shuffle size={16} /> Duel au hasard
            </button>
          </div>
          {error && <p className="mt-6 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-100">{error}</p>}
        </motion.div>
      ) : (
        <div>
          <div className="glass sticky top-20 z-20 rounded-[2rem] bg-ink-900/85 p-4 sm:top-24 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              {[a, b].map((p, i) => (
                <div key={p.slug} className={`flex min-w-0 items-center gap-3 ${i === 1 ? "flex-row-reverse text-right" : ""}`}>
                  <div className={`rounded-full transition duration-500 ${speaking === p.slug ? "scale-110 shadow-[0_0_40px] shadow-gold-300/50" : "opacity-60"}`}>
                    <Avatar philosopher={p} size={48} />
                  </div>
                  <span className="hidden min-w-0 sm:block">
                    <span className="block truncate font-display text-lg text-white">{p.name}</span>
                    <span className="block text-xs text-white/40">{speaking === p.slug ? "parle…" : p.school}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center font-display text-lg text-white/80 italic">« {topic} »</p>
          </div>

          <div className="mt-8 space-y-6 pb-56">
            {entries.map((e, i) => {
              if (e.speaker === "eleve") {
                return (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-lg text-center">
                    <p className="text-xs tracking-widest text-gold-300/70 uppercase">Le modérateur</p>
                    <p className="mt-1 font-display text-lg text-white/80 italic">{e.text}</p>
                  </motion.div>
                );
              }
              const p = philosopherBySlug[e.speaker];
              const right = e.speaker === bSlug;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: right ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-3 ${right ? "flex-row-reverse" : ""}`}
                >
                  <Avatar philosopher={p} size={38} className="mt-1 hidden sm:block" />
                  <div
                    className={`max-w-[90%] rounded-3xl border px-5 py-4 sm:max-w-[80%] ${right ? "rounded-tr-lg" : "rounded-tl-lg"}`}
                    style={{
                      borderColor: `hsl(${p.hue} 60% 60% / 0.25)`,
                      background: `linear-gradient(160deg, hsl(${p.hue} 60% 50% / 0.1), rgb(255 255 255 / 0.02))`,
                    }}
                  >
                    <p className="mb-1.5 text-xs tracking-wider uppercase" style={{ color: `hsl(${p.hue} 80% 78%)` }}>
                      {p.name}
                    </p>
                    <div className="leading-relaxed text-white/85">
                      {e.text ? <Markdown text={e.text} /> : <span className="animate-pulse-soft text-white/40">prend la parole…</span>}
                    </div>
                  </div>
                </motion.div>
              );
            })}
            {(synthesis || speaking === "synthese") && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-gold-300/30 bg-gold-300/[0.06] p-7">
                <p className="flex items-center gap-2 text-xs tracking-[0.3em] text-gold-300 uppercase">
                  <ScrollText size={14} /> Synthèse du professeur
                </p>
                <div className="mt-4 leading-relaxed text-white/85">
                  {synthesis ? <Markdown text={synthesis} /> : <span className="animate-pulse-soft text-white/40">Le professeur rassemble ses notes…</span>}
                </div>
              </motion.div>
            )}
            {error && <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-100">{error}</p>}
            <div ref={bottomRef} />
          </div>

          <div className="fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-ink-950 via-ink-950/95 to-transparent px-4 pt-10 pb-5">
            <div className="mx-auto max-w-4xl">
              <div className="mb-3 flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setAutoUntil(autoActive ? 0 : philoCount + MAX_AUTO_TURNS)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink-900/80 px-4 py-2 text-sm text-white/80 hover:text-white"
                >
                  {autoActive ? <Pause size={14} /> : <Play size={14} />} {autoActive ? "Pause" : "Lecture auto"}
                </button>
                <button
                  onClick={() => turn()}
                  disabled={!!speaking}
                  className="rounded-full border border-white/15 bg-ink-900/80 px-4 py-2 text-sm text-white/80 hover:text-white disabled:opacity-40"
                >
                  Tour suivant
                </button>
                <button
                  onClick={synthesize}
                  disabled={!!speaking || entries.length < 2}
                  className="inline-flex items-center gap-2 rounded-full border border-gold-300/40 bg-ink-900/80 px-4 py-2 text-sm text-gold-200 disabled:opacity-40"
                >
                  <ScrollText size={14} /> Synthèse
                </button>
                <button onClick={reset} className="rounded-full px-4 py-2 text-sm text-white/45 hover:text-white">
                  Nouveau débat
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  interject();
                }}
                className="glass flex items-center gap-2 rounded-full p-1.5 pl-5"
              >
                <input
                  value={interjection}
                  onChange={(e) => setInterjection(e.target.value)}
                  placeholder="Intervenir en modérateur : relancer, objecter, demander un exemple…"
                  className="h-11 flex-1 bg-transparent text-white placeholder:text-white/35 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!interjection.trim() || !!speaking}
                  className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold-200 to-gold-400 text-ink-950 disabled:opacity-30"
                  aria-label="Intervenir"
                >
                  <ArrowUp size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
