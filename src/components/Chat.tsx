"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowUp, Bookmark, BookmarkCheck, BookOpen, ChevronDown, RotateCcw, Square, X } from "lucide-react";
import type { Philosopher } from "@/lib/types";
import { Avatar } from "./Avatar";
import { Markdown } from "./Markdown";
import { addNote, recordMessage } from "@/lib/progress";
import { motifs as motifLabels, paintingsFor, parseScene, sceneOf, type Motif, type Painting } from "@/data/tableaux";
import { Tableau } from "./Tableau";

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];
const roman = (n: number) => ROMAN[n] ?? String(n);

/** Les premières phrases d'une réponse, sans markdown, pour le carnet de voyage. */
function excerpt(text: string, sentences = 2) {
  const plain = text.replace(/[*_#>]/g, "").replace(/\s+/g, " ").trim();
  const parts = plain.match(/[^.!?…]+[.!?…]+[»"]?/g) ?? [plain];
  return parts.slice(0, sentences).join(" ").trim();
}

type Station = {
  n: number;
  index: number;
  question: string;
  body: string;
  motifs: Motif[];
  painting: Painting;
};

type Msg = { role: "user" | "assistant"; content: string };

const storageKey = (slug: string) => `philosophe:chat:${slug}`;

function loadHistory(slug: string): Msg[] {
  try {
    const raw = localStorage.getItem(storageKey(slug));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const noop = () => () => {};

/** L'historique vit dans le navigateur : on n'affiche le dialogue qu'une fois côté client. */
export function Chat(props: { philosopher: Philosopher }) {
  const isClient = useSyncExternalStore(noop, () => true, () => false);
  if (!isClient) return <div className="min-h-[100svh]" />;
  const w = window as Window & { __philoSearch?: string };
  const q = new URLSearchParams(w.__philoSearch ?? window.location.search).get("q");
  return <ChatInner key={props.philosopher.slug} {...props} initialQuestion={q ? q.slice(0, 600) : undefined} />;
}

function ChatInner({ philosopher, initialQuestion }: { philosopher: Philosopher; initialQuestion?: string }) {
  const p = philosopher;
  const [messages, setMessages] = useState<Msg[]>(() => loadHistory(p.slug));
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const started = useRef(false);
  const [carnetOpen, setCarnetOpen] = useState(false);
  const stationCount = messages.filter((m) => m.role === "assistant").length;
  const lastCount = useRef(stationCount);

  // Chaque nouvelle réponse ouvre un nouveau tableau : on s'y rend.
  useEffect(() => {
    if (stationCount > lastCount.current) {
      const id = `etape-${stationCount}`;
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
    lastCount.current = stationCount;
  }, [stationCount]);

  // Pendant que le philosophe parle, on suit le texte s'il dépasse l'écran.
  useEffect(() => {
    if (!streaming) return;
    const doc = document.documentElement;
    const nearBottom = doc.scrollHeight - (window.scrollY + window.innerHeight) < 260;
    if (nearBottom) bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages, streaming]);

  useEffect(() => {
    if (streaming) return;
    try {
      localStorage.setItem(storageKey(p.slug), JSON.stringify(messages.slice(-60)));
    } catch {
      /* ignore */
    }
  }, [messages, streaming, p.slug]);

  const send = useCallback(
    async (text: string, history?: Msg[]) => {
      const question = text.trim();
      if (!question || streaming) return;
      setError(null);
      const base = history ?? messages;
      const next: Msg[] = [...base, { role: "user", content: question }];
      setMessages([...next, { role: "assistant", content: "" }]);
      setInput("");
      setStreaming(true);
      recordMessage(p.slug);

      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch("/api/dialogue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: p.slug, messages: next }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Le philosophe ne répond pas.");
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages([...next, { role: "assistant", content: acc }]);
        }
      } catch (e) {
        if ((e as Error).name === "AbortError") {
          setMessages((m) => {
            const last = m[m.length - 1];
            return last?.role === "assistant" && !last.content ? m.slice(0, -1) : m;
          });
        } else {
          setError((e as Error).message);
          setMessages(next.slice(0, -1));
          setInput(question);
        }
      } finally {
        setStreaming(false);
        abortRef.current = null;
        textareaRef.current?.focus();
      }
    },
    [messages, streaming, p.slug],
  );

  // Question passée dans l'URL (?q=…)
  useEffect(() => {
    if (!initialQuestion || started.current) return;
    const t = setTimeout(() => {
      started.current = true;
      send(initialQuestion, loadHistory(p.slug));
      const w = window as Window & { __philoSearch?: string };
      if (w.__philoSearch !== undefined) w.__philoSearch = "";
      else window.history.replaceState(null, "", `/dialogue/${p.slug}`);
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [input]);

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setSaved(new Set());
    setError(null);
    try {
      localStorage.removeItem(storageKey(p.slug));
    } catch {}
  };

  const save = (i: number) => {
    const m = messages[i];
    if (!m || saved.has(i)) return;
    addNote(sceneOf(m.content).body, p.slug);
    setSaved(new Set(saved).add(i));
  };

  const route = paintingsFor(p);
  const shortName = p.name.split(" (")[0];
  const stations: Station[] = [];
  messages.forEach((m, i) => {
    if (m.role !== "assistant") return;
    const n = stations.length + 1;
    const live = streaming && i === messages.length - 1;
    const parsed = parseScene(m.content);
    const scene = live ? { body: parsed.body, motifs: parsed.motifs } : sceneOf(m.content);
    stations.push({
      n,
      index: i,
      question: messages[i - 1]?.role === "user" ? messages[i - 1].content : "",
      body: scene.body,
      motifs: scene.motifs,
      painting: route[n % route.length],
    });
  });
  const empty = stations.length === 0;

  return (
    <div className="relative">
      <div className="glass fixed inset-x-3 top-20 z-30 mx-auto flex max-w-3xl items-center gap-3 rounded-full bg-ink-950/75 py-2 pr-2 pl-2 sm:top-24">
        <Link
          href={`/philosophes/${p.slug}`}
          className="grid h-10 w-10 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
          aria-label="Retour à la fiche"
        >
          <ArrowLeft size={18} />
        </Link>
        <Avatar philosopher={p} size={40} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg leading-tight text-white">{p.name}</p>
          <p className="truncate text-xs text-white/50">
            {streaming ? (
              <span className="text-gold-200">le tableau s&apos;anime…</span>
            ) : empty ? (
              `${p.dates} · ${p.school}`
            ) : (
              `Étape ${roman(stations.length)} du voyage`
            )}
          </p>
        </div>
        {!empty && (
          <>
            <button
              onClick={() => setCarnetOpen(true)}
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs text-gold-200/80 transition hover:bg-white/10 hover:text-gold-100"
            >
              <BookOpen size={15} /> <span className="hidden sm:inline">Carnet de voyage</span>
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs text-white/55 transition hover:bg-white/10 hover:text-white"
              aria-label="Nouveau voyage"
            >
              <RotateCcw size={14} /> <span className="hidden md:inline">Nouveau voyage</span>
            </button>
          </>
        )}
      </div>

      {/* Prologue */}
      <section className="relative">
        <div className="sticky top-0 -mb-[100svh] h-[100svh] overflow-hidden">
          <Tableau painting={route[0]} motifs={[]} seed={0} className="tableau-reveal h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/35 to-ink-950" />
        </div>
        <div className="relative mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-end px-4 pt-44 pb-48 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Avatar philosopher={p} size={96} className="mx-auto shadow-2xl shadow-black/60" />
            <p className="mt-6 text-xs tracking-[0.3em] text-gold-200/80 uppercase">Un voyage avec</p>
            <h1 className="mt-2 font-display text-5xl font-light text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.7)] sm:text-6xl">{p.name}</h1>
            <p className="mx-auto mt-4 max-w-lg font-display text-xl text-white/80 italic drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              «&nbsp;{p.tagline}&nbsp;»
            </p>
            <p className="mt-6 text-[11px] tracking-wider text-white/45 uppercase">
              {route[0].title} · {route[0].style}
            </p>
          </motion.div>
          {empty ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-10 w-full max-w-xl"
            >
              <p className="mb-3 text-sm text-white/60">
                Chaque réponse t&apos;emmènera dans un nouveau tableau, qui s&apos;anime au fil de ses paroles. Choisis un chemin, ou pose ta propre question.
              </p>
              <div className="grid gap-2.5">
                {p.starters.map((st) => (
                  <button
                    key={st}
                    onClick={() => send(st)}
                    className="rounded-2xl border border-white/15 bg-ink-950/60 px-5 py-3.5 text-left text-white/85 backdrop-blur-md transition hover:border-gold-300/50 hover:text-white"
                  >
                    {st}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <a href={`#etape-1`} onClick={(e) => { e.preventDefault(); document.getElementById("etape-1")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-10 inline-flex items-center gap-2 text-sm text-gold-200/80 hover:text-gold-100">
              Reprendre le voyage <ChevronDown size={16} className="animate-bounce" />
            </a>
          )}
        </div>
      </section>

      {stations.map((st) => {
        const live = streaming && st.index === messages.length - 1;
        return (
          <section key={st.index} id={`etape-${st.n}`} className="relative scroll-mt-0">
            <div className="sticky top-0 -mb-[100svh] h-[100svh] overflow-hidden">
              <Tableau painting={st.painting} motifs={st.motifs} seed={st.n} className="tableau-reveal h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-transparent to-ink-950/90" />
            </div>
            <div className="relative mx-auto flex min-h-[100svh] max-w-3xl flex-col justify-end gap-5 px-4 pt-44 pb-44 sm:px-6">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center text-[11px] tracking-[0.3em] text-gold-200/90 uppercase drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]"
              >
                Étape {roman(st.n)} · {st.painting.title}
              </motion.p>
              {st.question && (
                <motion.blockquote
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="ml-auto max-w-[85%] rounded-3xl rounded-br-lg border border-white/10 bg-ink-950/55 px-5 py-3.5 text-right font-display text-lg leading-snug text-white/90 italic backdrop-blur-md"
                >
                  <span className="mb-1 block font-sans text-[10px] tracking-[0.25em] text-white/40 not-italic uppercase">Ta question</span>
                  {st.question}
                </motion.blockquote>
              )}
              <motion.article
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-[1.75rem] border border-gold-300/20 bg-ink-950/72 p-6 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <Avatar philosopher={p} size={34} />
                  <p className="text-xs tracking-[0.2em] text-gold-300/80 uppercase">{shortName}</p>
                </div>
                <div className="voyage-text text-[1.05rem] leading-[1.8] text-white/88">
                  {st.body ? (
                    <Markdown text={st.body} />
                  ) : (
                    <span className="inline-flex items-center gap-2 py-1 font-display text-white/55 italic">
                      Le tableau prend vie
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-gold-300" style={{ animationDelay: `${d * 0.2}s` }} />
                      ))}
                    </span>
                  )}
                  {live && st.body && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-gold-300" />}
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
                  {st.motifs.map((m) => (
                    <span key={m} className="rounded-full border border-gold-300/25 px-2.5 py-0.5 text-[11px] text-gold-200/80">
                      {motifLabels[m]}
                    </span>
                  ))}
                  <span className="mr-auto text-[11px] text-white/35 italic">{st.painting.style}</span>
                  {st.body && !live && (
                    <button
                      onClick={() => save(st.index)}
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-white/45 transition hover:bg-white/5 hover:text-gold-200"
                    >
                      {saved.has(st.index) ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                      {saved.has(st.index) ? "Dans ton carnet" : "Garder"}
                    </button>
                  )}
                </div>
              </motion.article>
            </div>
          </section>
        );
      })}

      {error && (
        <div className="relative mx-auto -mt-36 mb-40 max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl border border-rose-400/30 bg-rose-950/80 px-5 py-4 text-sm text-rose-100 backdrop-blur">{error}</div>
        </div>
      )}
      <div ref={bottomRef} />

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-ink-950 via-ink-950/80 to-transparent px-4 pt-12 pb-5 sm:px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="glass pointer-events-auto mx-auto flex max-w-3xl items-end gap-2 rounded-[1.75rem] bg-ink-950/70 p-2 pl-5 shadow-2xl shadow-black/50 focus-within:border-gold-300/40"
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder={empty ? `Interroge ${shortName}…` : "Continuer le voyage…"}
            className="max-h-[200px] flex-1 resize-none bg-transparent py-3 leading-relaxed text-white placeholder:text-white/40 focus:outline-none"
          />
          {streaming ? (
            <button
              type="button"
              onClick={() => abortRef.current?.abort()}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Interrompre"
            >
              <Square size={16} fill="currentColor" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-200 to-gold-400 text-ink-950 transition enabled:hover:scale-105 disabled:opacity-30"
              aria-label="Envoyer"
            >
              <ArrowUp size={20} />
            </button>
          )}
        </form>
        <p className="mx-auto mt-2.5 max-w-3xl text-center text-[11px] text-white/35">
          Personnage incarné par une IA à partir des œuvres : il peut se tromper. Tableaux imaginés à la manière de chaque époque.
        </p>
      </div>

      <AnimatePresence>
        {carnetOpen && (
          <CarnetDeVoyage philosopher={p} stations={stations} onClose={() => setCarnetOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function CarnetDeVoyage({ philosopher: p, stations, onClose }: { philosopher: Philosopher; stations: Station[]; onClose: () => void }) {
  const [kept, setKept] = useState(false);
  const shortName = p.name.split(" (")[0];
  const done = stations.filter((s) => s.body);

  const keep = () => {
    const text = [
      `**Voyage avec ${shortName}**`,
      ...done.map(
        (s) => `*Étape ${roman(s.n)} · ${s.painting.title}*\n\n**Toi :** ${s.question}\n\n**${shortName} :** ${excerpt(s.body, 3)}`,
      ),
    ].join("\n\n");
    addNote(text, p.slug);
    setKept(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex flex-col bg-ink-950/92 backdrop-blur-xl"
      role="dialog"
      aria-label="Carnet de voyage"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-5 pt-8 pb-4 sm:px-8">
        <div className="flex-1">
          <p className="text-[11px] tracking-[0.3em] text-gold-300/80 uppercase">Carnet de voyage</p>
          <h2 className="mt-1 font-display text-3xl font-light text-white sm:text-4xl">
            Avec <span className="text-gilded italic">{shortName}</span>
          </h2>
        </div>
        <button onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white" aria-label="Fermer">
          <X size={20} />
        </button>
      </div>

      <div className="scrollbar-none flex flex-1 snap-x snap-mandatory items-center gap-5 overflow-x-auto px-5 pb-10 sm:px-[max(2rem,calc((100vw_-_72rem)/2_+_2rem))]">
        {done.map((s, i) => (
          <motion.article
            key={s.index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-h-full w-[82vw] shrink-0 snap-center flex-col overflow-hidden rounded-[1.5rem] border border-gold-300/20 bg-ink-900 shadow-2xl shadow-black/50 sm:w-[24rem]"
          >
            <Tableau painting={s.painting} motifs={s.motifs} seed={s.n} still className="aspect-[2/1] w-full shrink-0" />
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6">
              <p className="text-[10px] tracking-[0.3em] text-gold-300/80 uppercase">
                Étape {roman(s.n)} · {s.painting.title}
              </p>
              {s.question && <p className="mt-3 font-display text-lg leading-snug text-white/90 italic">«&nbsp;{s.question}&nbsp;»</p>}
              <p className="mt-3 text-sm leading-relaxed text-white/65">{excerpt(s.body, 3)}</p>
              <p className="mt-auto pt-4 text-[11px] text-white/30 italic">{s.painting.style}</p>
            </div>
          </motion.article>
        ))}
        <div className="flex w-[70vw] shrink-0 snap-center flex-col items-center justify-center gap-4 text-center sm:w-[18rem]">
          <Avatar philosopher={p} size={72} />
          <p className="font-display text-xl text-white/85 italic">
            {done.length} étape{done.length > 1 ? "s" : ""} parcourue{done.length > 1 ? "s" : ""}
          </p>
          <button
            onClick={keep}
            disabled={kept}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-200 to-gold-400 px-5 py-3 text-sm font-medium text-ink-950 transition enabled:hover:scale-[1.03] disabled:opacity-60"
          >
            {kept ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            {kept ? "Gardé dans ton carnet" : "Garder ce voyage"}
          </button>
          <button onClick={onClose} className="text-sm text-white/50 hover:text-white">
            Continuer le voyage
          </button>
        </div>
      </div>
    </motion.div>
  );
}
