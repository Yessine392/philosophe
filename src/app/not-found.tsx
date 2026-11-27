import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-48 text-center">
      <p className="font-display text-8xl text-gilded italic">404</p>
      <h1 className="mt-6 font-display text-3xl text-white">Cette page est restée dans la caverne.</h1>
      <p className="mt-4 text-white/50">Ce que tu cherches n&apos;est peut-être qu&apos;une ombre sur la paroi.</p>
      <Link href="/" className="mt-10 inline-block rounded-full border border-gold-300/40 px-6 py-3 text-gold-200 hover:bg-gold-300/10">
        Remonter vers la lumière
      </Link>
    </div>
  );
}
