import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Chat } from "@/components/Chat";
import { getPhilosopher, philosophers } from "@/data/philosophers";

export function generateStaticParams() {
  return philosophers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/dialogue/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getPhilosopher(slug);
  return p ? { title: `Dialogue avec ${p.name}` } : {};
}

export default async function Page(props: PageProps<"/dialogue/[slug]">) {
  const { slug } = await props.params;
  const p = getPhilosopher(slug);
  if (!p) notFound();
  return <Chat philosopher={p} />;
}
