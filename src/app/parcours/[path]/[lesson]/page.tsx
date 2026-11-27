import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Avatar } from "@/components/Avatar";
import { Quiz } from "@/components/Quiz";
import { Meditation } from "@/components/Meditation";
import { getLesson, paths } from "@/data/paths";
import { philosopherBySlug } from "@/data/philosophers";

export function generateStaticParams() {
  return paths.flatMap((p) => p.lessons.map((l) => ({ path: p.slug, lesson: l.slug })));
}

export async function generateMetadata(props: PageProps<"/parcours/[path]/[lesson]">): Promise<Metadata> {
  const { path, lesson } = await props.params;
  const found = getLesson(path, lesson);
  return found ? { title: found.lesson.title } : {};
}

export default async function Page(props: PageProps<"/parcours/[path]/[lesson]">) {
  const { path: pathSlug, lesson: lessonSlug } = await props.params;
  const found = getLesson(pathSlug, lessonSlug);
  if (!found) notFound();
  const { path, lesson, index } = found;
  const next = path.lessons[index + 1];
  const nextPath = !next ? paths[paths.indexOf(path) + 1] : undefined;

  return (
    <article className="mx-auto max-w-3xl px-4 pt-32 sm:px-6">
      <Link href={`/parcours/${path.slug}`} className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white">
        <ArrowLeft size={16} /> {path.title}
      </Link>

      <Reveal className="mt-10">
        <p className="text-xs tracking-[0.35em] text-gold-300/80 uppercase">
          Leçon {index + 1} / {path.lessons.length}
        </p>
        <h1 className="mt-4 font-display text-5xl leading-[1.05] font-light text-white sm:text-6xl">{lesson.title}</h1>
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-white/40">
          <Clock size={14} /> {lesson.minutes} min de lecture
        </p>
        <p className="mt-8 font-display text-2xl leading-relaxed text-white/80 italic">{lesson.intro}</p>
      </Reveal>

      <div className="mt-14 space-y-12">
        {lesson.sections.map((s, i) => (
          <Reveal key={s.title}>
            <section>
              <h2 className="flex items-baseline gap-4 font-display text-3xl text-white">
                <span className="text-lg text-gold-300/60 italic">{["I", "II", "III", "IV"][i]}</span>
                {s.title}
              </h2>
              <p className="mt-5 text-[1.08rem] leading-[1.85] text-white/70">{s.body}</p>
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14">
        <div className="glass rounded-[2rem] p-7 sm:p-9">
          <h2 className="font-display text-2xl text-white">À retenir</h2>
          <ul className="mt-5 space-y-3">
            {lesson.keyIdeas.map((k) => (
              <li key={k} className="flex gap-3 leading-relaxed text-white/75">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" />
                {k}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal className="mt-6">
        <Meditation prompt={lesson.meditation} source={`${path.slug}/${lesson.slug}`} />
      </Reveal>

      <Reveal className="mt-6">
        <div className="glass rounded-[2rem] p-7 sm:p-9">
          <h2 className="font-display text-2xl text-white">Prolonger avec les maîtres</h2>
          <p className="mt-2 text-sm text-white/45">Pose-leur directement tes questions sur cette leçon.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {lesson.philosophers.map((s) => {
              const p = philosopherBySlug[s];
              return (
                <Link
                  key={s}
                  href={`/dialogue/${s}?q=${encodeURIComponent(`Je viens d'étudier « ${lesson.title} ». ${lesson.meditation}`)}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] p-4 transition hover:border-gold-300/40"
                >
                  <Avatar philosopher={p} size={44} />
                  <span className="flex-1">
                    <span className="block font-display text-lg text-white">{p.name}</span>
                    <span className="text-xs text-white/40">{p.dates}</span>
                  </span>
                  <MessageCircle size={18} className="text-gold-300 transition group-hover:scale-110" />
                </Link>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div className="mt-6">
        <Quiz questions={lesson.quiz} lessonKey={`${path.slug}/${lesson.slug}`} />
      </div>

      <div className="mt-12">
        {next ? (
          <Link
            href={`/parcours/${path.slug}/${next.slug}`}
            className="group flex items-center justify-between rounded-[2rem] bg-gradient-to-r from-gold-200 via-gold-300 to-gold-400 p-7 text-ink-950"
          >
            <span>
              <span className="text-xs tracking-widest uppercase opacity-70">Leçon suivante</span>
              <span className="mt-1 block font-display text-2xl">{next.title}</span>
            </span>
            <ArrowRight className="transition group-hover:translate-x-1" />
          </Link>
        ) : nextPath ? (
          <Link
            href={`/parcours/${nextPath.slug}`}
            className="group flex items-center justify-between rounded-[2rem] bg-gradient-to-r from-gold-200 via-gold-300 to-gold-400 p-7 text-ink-950"
          >
            <span>
              <span className="text-xs tracking-widest uppercase opacity-70">Parcours terminé · Parcours suivant</span>
              <span className="mt-1 block font-display text-2xl">{nextPath.title}</span>
            </span>
            <ArrowRight className="transition group-hover:translate-x-1" />
          </Link>
        ) : (
          <Link href="/agora" className="block rounded-[2rem] border border-gold-300/40 p-7 text-center font-display text-2xl text-gold-200">
            Tu as tout parcouru. Va maintenant débattre sur l&apos;Agora →
          </Link>
        )}
      </div>
    </article>
  );
}
