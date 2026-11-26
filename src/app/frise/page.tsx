import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Avatar } from "@/components/Avatar";
import { eras, traditionById } from "@/data/eras";
import { philosophers } from "@/data/philosophers";

export const metadata: Metadata = { title: "Frise chronologique" };

const fmt = (y: number) => (y < 0 ? `${-y} av. J.-C.` : `${y}`);

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Frise"
        title={
          <>
            Vingt-cinq siècles <span className="text-gilded italic">d&apos;un seul regard</span>
          </>
        }
      >
        Les philosophes par date de naissance, de l&apos;Ionie au Paris des années 1960. Clique sur un nom pour
        découvrir sa pensée.
      </PageHeader>
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div className="absolute top-0 bottom-0 left-12 w-px bg-gradient-to-b from-transparent via-gold-300/30 to-transparent md:left-1/2" />
        {eras.map((era) => {
          const members = philosophers.filter((p) => p.era === era.id).sort((a, b) => a.born - b.born);
          return (
            <section key={era.id} className="relative pb-10">
              <Reveal>
                <div className="sticky top-24 z-10 mb-8 flex md:justify-center">
                  <div className="glass ml-14 max-w-[calc(100%_-_3.5rem)] rounded-3xl px-5 py-2 md:ml-0 md:max-w-none md:rounded-full">
                    <span className="font-display text-lg text-white">{era.name}</span>
                    <span className="ml-3 text-xs tracking-wider text-white/45 uppercase">{era.range}</span>
                  </div>
                </div>
              </Reveal>
              <div className="space-y-5">
                {members.map((p, i) => {
                  const left = i % 2 === 0;
                  return (
                    <Reveal key={p.slug} y={16}>
                      <div className={`relative flex md:w-1/2 ${left ? "md:pr-12" : "md:ml-auto md:pl-12"}`}>
                        <span
                          className={`absolute top-6 left-8 h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-ink-950 ${left ? "md:right-0 md:left-auto md:translate-x-1/2" : "md:left-0"}`}
                          style={{ background: `hsl(${era.hue} 80% 65%)` }}
                        />
                        <Link
                          href={`/philosophes/${p.slug}`}
                          className="group glass ml-14 flex min-w-0 flex-1 items-center gap-4 rounded-3xl p-4 transition hover:border-white/20 md:ml-0"
                        >
                          <Avatar philosopher={p} size={52} />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-gold-300/70">{fmt(p.born)}</p>
                            <h3 className="truncate font-display text-xl text-white">{p.name}</h3>
                            <p className="truncate text-sm text-white/45">
                              {p.school} · {traditionById[p.tradition].name}
                            </p>
                          </div>
                        </Link>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
