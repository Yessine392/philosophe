"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowUp, Bookmark, BookmarkCheck, RotateCcw, Square } from "lucide-react";
import type { Philosopher } from "@/lib/types";
import { Avatar } from "./Avatar";
import { Markdown } from "./Markdown";
import { addNote, recordMessage } from "@/lib/progress";

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
  const q = new URLSearchParams(window.location.search).get("q");
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

  useEffect(() => {
    if (streaming) return;
    try {
      localStorage.setItem(storageKey(p.slug), JSON.stringify(messages.slice(-60)));
    } catch {
      /* ignore */
    }
  }, [messages, streaming, p.slug]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

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
      window.history.replaceState(null, "", `/dialogue/${p.slug}`);
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
    addNote(m.content, p.slug);
    setSaved(new Set(saved).add(i));
  };

  const empty = messages.length === 0;

  return (
    <div className="relative mx-auto flex min-h-[100svh] max-w-3xl flex-col px-4 pt-24 sm:px-6">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 mx-auto h-[30rem] max-w-3xl rounded-full blur-3xl"
        style={{ background: `radial-gradient(closest-side, hsl(${p.hue} 70% 45% / 0.22), transparent)` }}
      />

      <div className="glass sticky top-20 z-20 flex items-center gap-3 rounded-full bg-ink-900/85 py-2 pr-2 pl-2 sm:top-24">
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
          <p className="truncate text-xs text-white/45">
            {streaming ? (
              <span className="text-gold-200">réfléchit…</span>
            ) : (
              `${p.dates} · ${p.school}`
            )}
          </p>
        </div>
        {!empty && (
          <button
            onClick={reset}
            className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs text-white/55 transition hover:bg-white/10 hover:text-white"
          >
            <RotateCcw size={14} /> <span className="hidden sm:inline">Nouvelle conversation</span>
          </button>
        )}
      </div>

      <div className="flex-1 pt-8 pb-40">
        {empty ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="pt-10 text-center"
          >
            <Avatar philosopher={p} size={110} className="mx-auto" />
            <h1 className="mt-6 font-display text-4xl font-light text-white sm:text-5xl">{p.name}</h1>
            <p className="mx-auto mt-4 max-w-lg font-display text-xl text-white/70 italic">«&nbsp;{p.tagline}&nbsp;»</p>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/45">
              Pose ta question comme tu la poserais à un maître. Il te répondra à partir de ses œuvres, et
              t&apos;interrogera à son tour.
            </p>
            <div className="mx-auto mt-10 grid max-w-xl gap-2.5">
              {p.starters.map((s, i) => (
                <motion.button
                  key={s}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  onClick={() => send(s)}
                  className="glass rounded-2xl px-5 py-3.5 text-left text-white/75 transition hover:border-gold-300/40 hover:text-white"
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <AnimatePresence initial={false}>
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end"
                  >
                    <div className="max-w-[85%] rounded-3xl rounded-br-lg bg-gradient-to-br from-white/[0.12] to-white/[0.06] px-5 py-3.5 leading-relaxed whitespace-pre-wrap text-white">
                      {m.content}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group flex gap-4"
                  >
                    <Avatar philosopher={p} size={36} className="mt-1 hidden sm:block" />
                    <div className="min-w-0 flex-1">
                      <p className="mb-1.5 text-xs tracking-wider text-gold-300/70 uppercase">{p.name.split(" (")[0]}</p>
                      <div className="text-[1.04rem] leading-[1.75] text-white/85">
                        {m.content ? (
                          <Markdown text={m.content} />
                        ) : (
                          <span className="inline-flex gap-1.5 py-2">
                            {[0, 1, 2].map((d) => (
                              <span
                                key={d}
                                className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-gold-300"
                                style={{ animationDelay: `${d * 0.2}s` }}
                              />
                            ))}
                          </span>
                        )}
                        {streaming && i === messages.length - 1 && m.content && (
                          <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-gold-300" />
                        )}
                      </div>
                      {m.content && !(streaming && i === messages.length - 1) && (
                        <button
                          onClick={() => save(i)}
                          className="mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-white/35 opacity-100 transition hover:bg-white/5 hover:text-gold-200 sm:opacity-0 sm:group-hover:opacity-100"
                        >
                          {saved.has(i) ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                          {saved.has(i) ? "Dans ton carnet" : "Garder dans mon carnet"}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ),
              )}
            </AnimatePresence>
          </div>
        )}
        {error && (
          <div className="mt-8 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-100">
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 bg-gradient-to-t from-ink-950 via-ink-950/95 to-transparent px-4 pt-10 pb-5 sm:px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="glass mx-auto flex max-w-3xl items-end gap-2 rounded-[1.75rem] p-2 pl-5 shadow-2xl shadow-black/50 focus-within:border-gold-300/40"
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
            placeholder={`Interroge ${p.name.split(" (")[0]}…`}
            className="max-h-[200px] flex-1 resize-none bg-transparent py-3 leading-relaxed text-white placeholder:text-white/35 focus:outline-none"
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
        <p className="mx-auto mt-2.5 max-w-3xl text-center text-[11px] text-white/30">
          Personnage incarné par une IA à partir des œuvres : il peut se tromper. Vérifie dans les textes.
        </p>
      </div>
    </div>
  );
}
