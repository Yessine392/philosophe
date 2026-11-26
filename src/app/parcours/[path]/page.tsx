import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Avatar } from "@/components/Avatar";
import { PathIcon } from "@/components/PathIcon";
import { LessonStatus, PathProgressBar } from "@/components/PathProgress";
import { pathBySlug, paths } from "@/data/paths";
import { philosopherBySlug } from "@/data/philosophers";

export function generateStaticParams() {
  return paths.map((p) => ({ path: p.slug }));
}

export async function generateMetadata(props: PageProps<"/parcours/[path]">): Promise<Metadata> {
  const { path } = await props.params;
  return pathBySlug[path] ? { title: pathBySlug[path].title } : {};
}

export default async function Page(props: PageProps<"/parcours/[path]">) {
  const { path: slug } = await props.params;
  const path = pathBySlug[slug];
  if (!path) notFound();
  const index = paths.indexOf(path);
  const next = paths[index + 1];

  return (
    <div className="mx-auto max-w-4xl px-4 pt-32 sm:px-6">
      <Link href="/parcours" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white">
        <ArrowLeft size={16} /> Tous les parcours
      </Link>
      <Reveal className="mt-10">
        <span
          className="grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-ink-900"
          style={{ boxShadow: `0 0 60px -6px hsl(${path.hue} 80% 60% / 0.55)` }}
        >
          <PathIcon name={path.icon} size={26} strokeWidth={1.5} style={{ color: `hsl(${path.hue} 80% 75%)` }} />
        </span>
        <p className="mt-8 text-xs tracking-[0.35em] text-gold-300/80 uppercase">
          Parcours {index + 1} · {path.subtitle}
        </p>
        <h1 className="mt-4 font-display text-5xl font-light text-white sm:text-6xl">{path.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{path.description}</p>
        <div className="mt-8 max-w-md">
          <PathProgressBar path={path} />
        </div>
      </Reveal>

      <ol className="mt-14 space-y-4">
        {path.lessons.map((l, i) => (
          <Reveal key={l.slug} delay={i * 0.08}>
            <li>
              <Link
                href={`/parcours/${path.slug}/${l.slug}`}
                className="group glass flex flex-col gap-5 rounded-[2rem] p-6 transition hover:border-white/20 sm:flex-row sm:items-center sm:p-7"
              >
                <span className="font-display text-5xl font-light text-white/20 italic transition group-hover:text-gold-300/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-2xl text-white">{l.title}</h2>
                    <LessonStatus pathSlug={path.slug} lessonSlug={l.slug} />
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/50">{l.intro}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {l.philosophers.map((s) => (
                        <Avatar key={s} philosopher={philosopherBySlug[s]} size={28} className="rounded-full ring-2 ring-ink-900" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                      <Clock size={13} /> {l.minutes} min
                    </span>
                  </div>
                </div>
                <ArrowRight className="hidden text-gold-300 transition group-hover:translate-x-1 sm:block" />
              </Link>
            </li>
          </Reveal>
        ))}
      </ol>

      {next && (
        <Link
          href={`/parcours/${next.slug}`}
          className="mt-14 flex items-center justify-between rounded-[2rem] border border-dashed border-white/15 p-7 text-white/60 transition hover:border-gold-300/40 hover:text-white"
        >
          <span>
            <span className="text-xs tracking-widest text-white/35 uppercase">Parcours suivant</span>
            <span className="mt-1 block font-display text-2xl">{next.title}</span>
          </span>
          <ArrowRight />
        </Link>
      )}
    </div>
  );
}
