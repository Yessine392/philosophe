import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, MapPin, MessageCircle, Swords } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { Reveal } from "@/components/Reveal";
import { PhilosopherCard } from "@/components/PhilosopherCard";
import { getPhilosopher, philosophers } from "@/data/philosophers";
import { conceptBySlug } from "@/data/concepts";
import { eraById, traditionById } from "@/data/eras";
import { paths } from "@/data/paths";

export function generateStaticParams() {
  return philosophers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/philosophes/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getPhilosopher(slug);
  return p ? { title: p.name, description: p.tagline } : {};
}

export default async function Page(props: PageProps<"/philosophes/[slug]">) {
  const { slug } = await props.params;
  const p = getPhilosopher(slug);
  if (!p) notFound();

  const era = eraById[p.era];
  const lessons = paths.flatMap((path) =>
    path.lessons.filter((l) => l.philosophers.includes(p.slug)).map((l) => ({ path, l })),
  );
  const neighbours = philosophers
    .filter((x) => x.slug !== p.slug && (x.era === p.era || x.concepts.some((c) => p.concepts.includes(c))))
    .sort((a, b) => b.concepts.filter((c) => p.concepts.includes(c)).length - a.concepts.filter((c) => p.concepts.includes(c)).length)
    .slice(0, 3);
  const rival = neighbours[0];

  return (
    <article>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[36rem] max-w-4xl rounded-full blur-3xl"
          style={{ background: `radial-gradient(closest-side, hsl(${p.hue} 70% 50% / 0.28), transparent)` }}
        />
        <div className="relative mx-auto max-w-5xl px-4 pt-36 pb-16 text-center sm:px-6">
          <Reveal>
            <Avatar philosopher={p} size={132} className="mx-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]" />
            <p className="mt-8 text-xs tracking-[0.35em] text-gold-300/80 uppercase">
              {era.name} · {traditionById[p.tradition].name}
            </p>
            <h1 className="mt-4 font-display text-5xl font-light tracking-tight text-white sm:text-7xl">{p.name}</h1>
            <p className="mt-3 text-white/50">{p.dates}</p>
            <p className="mx-auto mt-8 max-w-2xl font-display text-2xl leading-snug text-white/85 italic sm:text-3xl">
              « {p.tagline} »
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={`/dialogue/${p.slug}`}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-200 via-gold-300 to-gold-400 px-7 py-3.5 font-medium text-ink-950 shadow-[0_10px_40px_-10px] shadow-gold-400/60"
              >
                <MessageCircle size={18} /> Dialoguer avec {p.name.split(" (")[0]}
              </Link>
              {rival && (
                <Link
                  href={`/agora?a=${p.slug}&b=${rival.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-white/80 transition hover:border-white/30 hover:text-white"
                >
                  <Swords size={18} /> Le faire débattre
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="glass rounded-[2rem] p-8 sm:p-10">
          <h2 className="font-display text-3xl text-white">Sa vie</h2>
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/45">
            <MapPin size={14} /> {p.place} · {p.school}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-white/70">{p.bio}</p>
          <div className="hairline my-10" />
          <h2 className="font-display text-3xl text-white">Ses idées clés</h2>
          <ol className="mt-6 space-y-5">
            {p.ideas.map((idea, i) => (
              <li key={i} className="flex gap-5">
                <span className="font-display text-2xl text-gold-300/70 italic">{i + 1}</span>
                <p className="pt-1 leading-relaxed text-white/75">{idea}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.1} className="glass rounded-[2rem] p-8">
            <h2 className="flex items-center gap-2 font-display text-2xl text-white">
              <BookOpen size={20} className="text-gold-300" /> Œuvres
            </h2>
            <ul className="mt-5 space-y-2.5">
              {p.works.map((w) => (
                <li key={w} className="font-display text-white/75 italic">{w}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15} className="glass rounded-[2rem] p-8">
            <h2 className="font-display text-2xl text-white">Paroles</h2>
            <div className="mt-5 space-y-5">
              {p.quotes.map((q) => (
                <blockquote key={q} className="border-l-2 border-gold-300/50 pl-4 leading-relaxed text-white/70">
                  {q}
                </blockquote>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2} className="glass rounded-[2rem] p-8">
            <h2 className="font-display text-2xl text-white">Concepts</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.concepts.map((c) => (
                <Link
                  key={c}
                  href={`/concepts#${c}`}
                  className="rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-white/70 transition hover:border-gold-300/50 hover:text-white"
                >
                  {conceptBySlug[c]?.name ?? c}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <section className="mx-auto mt-6 max-w-6xl px-4 sm:px-6">
        <Reveal className="glass rounded-[2rem] p-8 sm:p-10">
          <h2 className="font-display text-3xl text-white">Commencer la conversation</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {p.starters.map((s) => (
              <Link
                key={s}
                href={`/dialogue/${p.slug}?q=${encodeURIComponent(s)}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 text-white/75 transition hover:border-gold-300/40 hover:text-white"
              >
                {s}
                <ArrowRight size={16} className="shrink-0 text-gold-300 transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      {lessons.length > 0 && (
        <section className="mx-auto mt-6 max-w-6xl px-4 sm:px-6">
          <Reveal className="glass rounded-[2rem] p-8 sm:p-10">
            <h2 className="font-display text-3xl text-white">L&apos;étudier dans les parcours</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {lessons.map(({ path, l }) => (
                <Link
                  key={l.slug}
                  href={`/parcours/${path.slug}/${l.slug}`}
                  className="rounded-2xl border border-white/[0.08] px-5 py-4 transition hover:border-gold-300/40"
                >
                  <p className="text-xs tracking-wider text-gold-300/70 uppercase">{path.title}</p>
                  <p className="mt-1 font-display text-xl text-white">{l.title}</p>
                  <p className="mt-1 text-sm text-white/40">{l.minutes} min</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {neighbours.length > 0 && (
        <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl text-white">Dans la même constellation</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {neighbours.map((n) => (
              <PhilosopherCard key={n.slug} p={n} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
