"use client";

import { useSyncExternalStore } from "react";

export interface Progress {
  /** clé « parcours/leçon » → meilleur score au quiz (0–3) */
  lessons: Record<string, number>;
  /** slugs des philosophes avec qui l'on a dialogué */
  met: string[];
  messages: number;
  debates: number;
  notes: { id: string; text: string; source: string; date: string }[];
}

const KEY = "philosophe:progress:v1";
const EMPTY: Progress = { lessons: {}, met: [], messages: 0, debates: 0, notes: [] };

let cache: Progress = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function read(): Progress {
  if (loaded) return cache;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) cache = { ...EMPTY, ...JSON.parse(raw) };
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: Progress) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* stockage indisponible : on garde la progression en mémoire */
  }
  listeners.forEach((l) => l());
}

export function updateProgress(fn: (p: Progress) => Progress) {
  write(fn(read()));
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      loaded = false;
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function xpOf(p: Progress) {
  const lessonXp = Object.values(p.lessons).reduce((n, score) => n + 40 + score * 20, 0);
  return lessonXp + p.met.length * 25 + p.messages * 5 + p.debates * 30 + p.notes.length * 10;
}

export const ranks = [
  { min: 0, title: "Curieux", hint: "Tout commence par l'étonnement." },
  { min: 120, title: "Apprenti", hint: "Tu as franchi le seuil de l'Académie." },
  { min: 400, title: "Disciple", hint: "Tes questions deviennent plus fines." },
  { min: 900, title: "Dialecticien", hint: "Tu sais éprouver une thèse." },
  { min: 1600, title: "Philosophe", hint: "Tu aimes la sagesse et tu la cherches." },
  { min: 2600, title: "Sage", hint: "Tu as conversé avec les siècles." },
];

export function rankOf(xp: number) {
  let i = 0;
  for (let k = 0; k < ranks.length; k++) if (xp >= ranks[k].min) i = k;
  const next = ranks[i + 1];
  const pct = next ? (xp - ranks[i].min) / (next.min - ranks[i].min) : 1;
  return { ...ranks[i], index: i, next, pct };
}

export function recordMessage(slug: string) {
  updateProgress((p) => ({
    ...p,
    messages: p.messages + 1,
    met: p.met.includes(slug) ? p.met : [...p.met, slug],
  }));
}

export function recordLesson(key: string, score: number) {
  updateProgress((p) => ({
    ...p,
    lessons: { ...p.lessons, [key]: Math.max(score, p.lessons[key] ?? 0) },
  }));
}

export function recordDebate() {
  updateProgress((p) => ({ ...p, debates: p.debates + 1 }));
}

export function addNote(text: string, source: string) {
  updateProgress((p) => ({
    ...p,
    notes: [
      { id: Math.random().toString(36).slice(2), text, source, date: new Date().toISOString() },
      ...p.notes,
    ].slice(0, 200),
  }));
}

export function removeNote(id: string) {
  updateProgress((p) => ({ ...p, notes: p.notes.filter((n) => n.id !== id) }));
}
