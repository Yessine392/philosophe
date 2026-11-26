import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { PhilosopherExplorer } from "@/components/PhilosopherExplorer";
import { philosophers } from "@/data/philosophers";

export const metadata: Metadata = { title: "Les philosophes" };

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Le panthéon"
        title={
          <>
            {philosophers.length} maîtres, <span className="text-gilded italic">un seul dialogue</span>
          </>
        }
      >
        D&apos;Héraclite à Foucault, de Confucius à Fanon. Choisis un penseur, découvre sa vie et ses idées, puis
        engage la conversation.
      </PageHeader>
      <Suspense fallback={<div className="min-h-96" />}>
        <PhilosopherExplorer />
      </Suspense>
    </>
  );
}
