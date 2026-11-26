import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ConceptList } from "@/components/ConceptList";
import { concepts } from "@/data/concepts";

export const metadata: Metadata = { title: "Concepts" };

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Le vocabulaire"
        title={
          <>
            Les mots <span className="text-gilded italic">pour penser</span>
          </>
        }
      >
        {concepts.length} concepts essentiels, de l&apos;absurde au wu wei. Chacun te mène aux penseurs qui l&apos;ont
        forgé, et tu peux leur demander de te l&apos;expliquer.
      </PageHeader>
      <ConceptList />
    </>
  );
}
