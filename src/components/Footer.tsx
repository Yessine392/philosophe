import Link from "next/link";
import { Logo } from "./Nav";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-white/5">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-white/45">
            Apprendre à penser en dialoguant avec ceux qui ont pensé avant nous. Les philosophes sont incarnés par une
            intelligence artificielle (Claude) à partir de leurs œuvres : vérifiez toujours dans les textes.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-14 gap-y-3 text-sm text-white/55">
          <Link href="/parcours" className="hover:text-white">Parcours</Link>
          <Link href="/philosophes" className="hover:text-white">Philosophes</Link>
          <Link href="/agora" className="hover:text-white">Agora</Link>
          <Link href="/concepts" className="hover:text-white">Concepts</Link>
          <Link href="/frise" className="hover:text-white">Frise</Link>
          <Link href="/carnet" className="hover:text-white">Mon carnet</Link>
        </div>
      </div>
      <p className="pb-10 text-center font-display text-sm text-white/30 italic">
        « L&apos;étonnement est le commencement de la philosophie. » — Platon, Théétète
      </p>
    </footer>
  );
}
