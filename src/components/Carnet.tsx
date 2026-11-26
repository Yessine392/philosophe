"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { ranks, rankOf, removeNote, updateProgress, useProgress, xpOf } from "@/lib/progress";
import { philosopherBySlug } from "@/data/philosophers";
import { paths, totalLessons } from "@/data/paths";
import { Avatar } from "./Avatar";
import { Markdown } from "./Markdown";
import { PathProgressBar } from "./PathProgress";

export function Carnet() {
  const progress = useProgress();
  const xp = xpOf(progress);
  const rank = rankOf(xp);
  const lessonsDone = Object.keys(progress.lessons).length;

  const sourceLabel = (s: string) => {
    const p = philosopherBySlug[s];
    if (p) return { label: `Dialogue avec ${p.name}`, href: `/dialogue/${s}`, p };
    const [ps, ls] = s.split("/");
    const path = paths.find((x) => x.slug === ps);
    const lesson = path?.lessons.find((l) => l.slug === ls);
    return { label: lesson ? `Méditation · ${lesson.title}` : "Note", href: lesson ? `/parcours/${ps}/${ls}` : "#", p: undefined };
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="glass relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold-300/15 blur-3xl" />
        <p className="text-xs tracking-[0.35em] text-gold-300/80 uppercase">Ton rang</p>
        <h2 className="mt-3 font-display text-6xl font-light text-gilded italic">{rank.title}</h2>
        <p className="mt-3 text-white/55">{rank.hint}</p>
        <div className="mt-8">
          <div className="flex justify-between text-sm text-white/50">
            <span>{xp} points de sagesse</span>
            {rank.next && <span>Prochain rang : {rank.next.title} ({rank.next.min})</span>}
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-gold-200 to-gold-400 transition-all duration-700" style={{ width: `${rank.pct * 100}%` }} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {ranks.map((r, i) => (
              <span
                key={r.title}
                className={`rounded-full px-3 py-1 text-xs ${i <= rank.index ? "bg-gold-300/15 text-gold-200" : "border border-white/10 text-white/30"}`}
              >
                {r.title}
              </span>
            ))}
          </div>
        </div>
        <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            [`${lessonsDone}/${totalLessons}`, "leçons"],
            [progress.met.length, "philosophes rencontrés"],
            [progress.messages, "questions posées"],
            [progress.debates, "débats arbitrés"],
          ].map(([n, l]) => (
            <div key={l as string}>
              <dt className="font-display text-4xl text-white">{n}</dt>
              <dd className="mt-1 text-xs tracking-wider text-white/40 uppercase">{l}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-[2rem] p-8">
          <h2 className="font-display text-2xl text-white">Parcours</h2>
          <div className="mt-6 space-y-5">
            {paths.map((p) => (
              <Link key={p.slug} href={`/parcours/${p.slug}`} className="block">
                <p className="mb-2 text-white/80">{p.title}</p>
                <PathProgressBar path={p} />
              </Link>
            ))}
          </div>
        </div>
        <div className="glass rounded-[2rem] p-8">
          <h2 className="font-display text-2xl text-white">Tes maîtres</h2>
          {progress.met.length === 0 ? (
            <p className="mt-6 text-white/45">
              Tu n&apos;as encore parlé à personne.{" "}
              <Link href="/dialogue/socrate" className="text-gold-200 underline-offset-4 hover:underline">
                Socrate est un bon début.
              </Link>
            </p>
          ) : (
            <div className="mt-6 flex flex-wrap gap-3">
              {progress.met
                .filter((s) => philosopherBySlug[s])
                .map((s) => (
                  <Link key={s} href={`/dialogue/${s}`} title={philosopherBySlug[s].name} className="transition hover:scale-110">
                    <Avatar philosopher={philosopherBySlug[s]} size={52} />
                  </Link>
                ))}
            </div>
          )}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-display text-3xl text-white">Carnet de pensées</h2>
        <p className="mt-2 text-white/45">Les réponses gardées pendant tes dialogues et tes méditations.</p>
        {progress.notes.length === 0 ? (
          <p className="glass mt-6 rounded-[2rem] p-8 text-white/45">
            Ton carnet est vide. Dans un dialogue, survole une réponse et choisis « Garder dans mon carnet ».
          </p>
        ) : (
          <div className="mt-6 columns-1 gap-4 md:columns-2">
            {progress.notes.map((n) => {
              const src = sourceLabel(n.source);
              return (
                <div key={n.id} className="glass group mb-4 break-inside-avoid rounded-3xl p-6">
                  <div className="flex items-center gap-3">
                    {src.p && <Avatar philosopher={src.p} size={30} />}
                    <Link href={src.href} className="flex-1 text-xs tracking-wider text-gold-300/80 uppercase hover:text-gold-200">
                      {src.label}
                    </Link>
                    <button
                      onClick={() => removeNote(n.id)}
                      className="text-white/30 opacity-0 transition group-hover:opacity-100 hover:text-rose-300"
                      aria-label="Supprimer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <div className="mt-4 text-[0.95rem] leading-relaxed text-white/75">
                    <Markdown text={n.text} />
                  </div>
                  <p className="mt-4 text-xs text-white/30">{new Date(n.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <div className="mt-16 text-center">
        <button
          onClick={() => {
            if (window.confirm("Effacer toute ta progression et ton carnet ?")) {
              updateProgress(() => ({ lessons: {}, met: [], messages: 0, debates: 0, notes: [] }));
            }
          }}
          className="text-xs text-white/30 hover:text-rose-300"
        >
          Réinitialiser ma progression
        </button>
      </div>
    </div>
  );
}
