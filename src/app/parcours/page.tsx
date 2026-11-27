import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { PathIcon } from "@/components/PathIcon";
import { PathProgressBar } from "@/components/PathProgress";
import { Avatar } from "@/components/Avatar";
import { paths } from "@/data/paths";
import { philosopherBySlug } from "@/data/philosophers";

export const metadata: Metadata = { title: "Parcours" };

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Apprendre"
        title={
          <>
            Le chemin <span className="text-gilded italic">vers la sagesse</span>
          </>
        }
      >
        Sept parcours qui traversent l&apos;histoire de la pensée. Lis, médite, réponds au quiz, puis va discuter
        directement avec les philosophes rencontrés.
      </PageHeader>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-[27px] hidden w-px bg-gradient-to-b from-gold-300/40 via-white/10 to-transparent sm:block" />
          <div className="space-y-6">
            {paths.map((path, i) => {
              const people = [...new Set(path.lessons.flatMap((l) => l.philosophers))];
              return (
                <Reveal key={path.slug} delay={i * 0.05}>
                  <div className="flex gap-6">
                    <div className="relative z-10 hidden sm:block">
                      <span
                        className="grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-ink-900 text-white"
                        style={{ boxShadow: `0 0 40px -6px hsl(${path.hue} 80% 60% / 0.5)` }}
                      >
                        <PathIcon name={path.icon} size={22} strokeWidth={1.5} style={{ color: `hsl(${path.hue} 80% 75%)` }} />
                      </span>
                    </div>
                    <Link
                      href={`/parcours/${path.slug}`}
                      className="group glass relative flex-1 overflow-hidden rounded-[2rem] p-7 transition duration-500 hover:-translate-y-0.5 hover:border-white/20 sm:p-8"
                    >
                      <div
                        className="pointer-events-none absolute -top-20 -right-10 h-60 w-60 rounded-full opacity-40 blur-3xl transition group-hover:opacity-70"
                        style={{ background: `hsl(${path.hue} 70% 50% / 0.35)` }}
                      />
                      <div className="relative">
                        <p className="text-xs tracking-[0.3em] text-white/40 uppercase">
                          Parcours {i + 1} · {path.subtitle}
                        </p>
                        <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">{path.title}</h2>
                        <p className="mt-3 max-w-2xl leading-relaxed text-white/55">{path.description}</p>
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex -space-x-2">
                            {people.slice(0, 7).map((s) => (
                              <Avatar key={s} philosopher={philosopherBySlug[s]} size={32} className="rounded-full ring-2 ring-ink-900" />
                            ))}
                          </div>
                          <span className="inline-flex items-center gap-2 text-sm text-gold-200">
                            {path.lessons.length} leçons · {path.lessons.reduce((n, l) => n + l.minutes, 0)} min
                            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                          </span>
                        </div>
                        <div className="mt-6">
                          <PathProgressBar path={path} />
                        </div>
                      </div>
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
