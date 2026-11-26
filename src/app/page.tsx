import Link from "next/link";
import { ArrowRight, BookOpen, MessageCircle, Swords } from "lucide-react";
import { Orbit } from "@/components/Orbit";
import { DailyThought } from "@/components/DailyThought";
import { Reveal } from "@/components/Reveal";
import { Avatar } from "@/components/Avatar";
import { philosophers, philosopherBySlug } from "@/data/philosophers";
import { eras } from "@/data/eras";
import { paths, totalLessons } from "@/data/paths";
import { concepts } from "@/data/concepts";

const featured = ["socrate", "marc-aurele", "lao-tseu", "spinoza", "nietzsche", "simone-weil", "averroes", "camus"];

const pillars = [
  {
    icon: BookOpen,
    title: "Des parcours",
    text: `${paths.length} parcours, ${totalLessons} leçons, de Milet à Saint-Germain-des-Prés, de Lu à Kyōto. Chaque leçon se termine par un quiz et une méditation.`,
    href: "/parcours",
    cta: "Commencer à apprendre",
  },
  {
    icon: MessageCircle,
    title: "Des dialogues",
    text: `${philosophers.length} philosophes incarnés à partir de leurs œuvres. Ils ne récitent pas : ils t'interrogent, te contredisent et te font penser.`,
    href: "/philosophes",
    cta: "Choisir un maître",
  },
  {
    icon: Swords,
    title: "L'Agora",
    text: "Fais débattre Kant et Nietzsche, Confucius et Rousseau, Arendt et Machiavel. Interviens en modérateur, puis reçois une synthèse.",
    href: "/agora",
    cta: "Ouvrir un débat",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pt-32 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-40">
          <Reveal className="relative z-10 text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs tracking-[0.2em] text-white/60 uppercase">
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-gold-300" />
              Vingt-cinq siècles de pensée
            </p>
            <h1 className="mt-8 font-display text-6xl leading-[0.95] font-light tracking-tight text-white sm:text-7xl xl:text-8xl">
              Deviens
              <br />
              <span className="text-gilded animate-shimmer italic">philosophe.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/60 lg:mx-0">
              Apprends l&apos;histoire de la pensée, d&apos;Orient et d&apos;Occident, puis dialogue avec ceux qui
              l&apos;ont écrite. Socrate t&apos;attend sur l&apos;agora. Il a quelques questions pour toi.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/parcours"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-200 via-gold-300 to-gold-400 px-7 py-3.5 font-medium text-ink-950 shadow-[0_10px_40px_-10px] shadow-gold-400/60 transition hover:shadow-gold-300/80"
              >
                Commencer le parcours
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/dialogue/socrate"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] py-2 pr-6 pl-2 text-white/85 transition hover:border-white/30 hover:text-white"
              >
                <Avatar philosopher={philosopherBySlug.socrate} size={34} />
                Parler à Socrate
              </Link>
            </div>
            <dl className="mx-auto mt-14 grid max-w-md grid-cols-3 gap-6 lg:mx-0">
              {[
                [philosophers.length, "philosophes"],
                [totalLessons, "leçons"],
                [concepts.length, "concepts"],
              ].map(([n, label]) => (
                <div key={label}>
                  <dt className="font-display text-4xl text-white">{n}</dt>
                  <dd className="mt-1 text-xs tracking-widest text-white/40 uppercase">{label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.2} className="relative -mx-4 sm:mx-0">
            <Orbit />
          </Reveal>
        </div>
      </section>

      {/* PILIERS */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <Link
                href={p.href}
                className="group glass flex h-full flex-col rounded-[2rem] p-8 transition duration-500 hover:-translate-y-1 hover:border-gold-300/30"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold-300/30 bg-gold-300/10 text-gold-200">
                  <p.icon size={22} strokeWidth={1.5} />
                </span>
                <h2 className="mt-8 font-display text-3xl text-white">{p.title}</h2>
                <p className="mt-4 flex-1 leading-relaxed text-white/55">{p.text}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm text-gold-200">
                  {p.cta}
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PENSÉE DU JOUR */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2.5rem] p-8 sm:p-14">
            <div className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative">
              <DailyThought />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ILS T'ATTENDENT */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs tracking-[0.35em] text-gold-300/80 uppercase">Ils t&apos;attendent</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight font-light text-white sm:text-5xl">
              Pose une question. <span className="text-white/45 italic">Reçois-en dix.</span>
            </h2>
          </Reveal>
        </div>
        <div className="scrollbar-none mt-12 flex snap-x gap-5 overflow-x-auto px-4 pb-6 sm:px-[max(1.5rem,calc((100vw_-_72rem)/2_+_1.5rem))]">
          {featured.map((slug, i) => {
            const p = philosopherBySlug[slug];
            return (
              <Reveal key={slug} delay={i * 0.05} className="w-[300px] shrink-0 snap-start sm:w-[340px]">
                <div className="glass flex h-full flex-col rounded-[2rem] p-6">
                  <div className="flex items-center gap-4">
                    <Avatar philosopher={p} size={56} />
                    <div>
                      <h3 className="font-display text-xl text-white">{p.name}</h3>
                      <p className="text-xs text-white/45">{p.school}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-1 flex-col gap-2">
                    {p.starters.map((s) => (
                      <Link
                        key={s}
                        href={`/dialogue/${slug}?q=${encodeURIComponent(s)}`}
                        className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-sm text-white/70 transition hover:border-gold-300/40 hover:bg-gold-300/5 hover:text-white"
                      >
                        {s}
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ÉPOQUES */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <p className="text-xs tracking-[0.35em] text-gold-300/80 uppercase">Le grand voyage</p>
          <h2 className="mt-4 font-display text-4xl font-light text-white sm:text-5xl">Six âges de la pensée</h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {eras.map((era, i) => {
            const members = philosophers.filter((p) => p.era === era.id);
            return (
              <Reveal key={era.id} delay={i * 0.06} className="h-full">
                <Link
                  href={`/philosophes?epoque=${era.id}`}
                  className="group relative flex h-full flex-col bg-ink-950/90 p-7 transition hover:bg-ink-900"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100"
                    style={{ background: `radial-gradient(30rem 14rem at 0% 0%, hsl(${era.hue} 70% 50% / 0.14), transparent)` }}
                  />
                  <span className="font-display text-sm text-white/35">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-2xl text-white">{era.name}</h3>
                  <p className="text-xs tracking-wider text-gold-300/70 uppercase">{era.range}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-white/50">{era.description}</p>
                  <div className="mt-6 flex -space-x-2">
                    {members.slice(0, 6).map((m) => (
                      <Avatar key={m.slug} philosopher={m} size={30} className="rounded-full ring-2 ring-ink-950" />
                    ))}
                    {members.length > 6 && (
                      <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-white/10 text-[10px] text-white/70 ring-2 ring-ink-950">
                        +{members.length - 6}
                      </span>
                    )}
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
        <Reveal>
          <h2 className="font-display text-5xl leading-tight font-light text-white sm:text-6xl">
            Une vie sans examen
            <br />
            <span className="text-gilded italic">ne vaut pas d&apos;être vécue.</span>
          </h2>
          <p className="mt-6 text-white/45">— Socrate, dans l&apos;Apologie de Platon</p>
          <Link
            href="/parcours/naissance-de-la-philosophie/du-mythe-au-logos"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-gold-300/40 px-7 py-3.5 text-gold-200 transition hover:bg-gold-300/10"
          >
            Première leçon : du mythe au logos <ArrowRight size={18} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
