import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-4xl px-4 pt-36 pb-12 text-center sm:px-6">
      <Reveal>
        <p className="text-xs font-medium tracking-[0.35em] text-gold-300/80 uppercase">{eyebrow}</p>
        <h1 className="mt-5 font-display text-5xl leading-[1.02] font-light tracking-tight text-white sm:text-6xl md:text-7xl">
          {title}
        </h1>
        {children && <div className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{children}</div>}
      </Reveal>
    </header>
  );
}
