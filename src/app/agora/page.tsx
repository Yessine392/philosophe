import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Agora } from "@/components/Agora";

export const metadata: Metadata = { title: "L'Agora" };

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="L'Agora"
        title={
          <>
            Que les siècles <span className="text-gilded italic">se disputent</span>
          </>
        }
      >
        Choisis deux philosophes et une question. Écoute-les s&apos;affronter, interviens en modérateur, puis demande la
        synthèse du professeur.
      </PageHeader>
      <Suspense fallback={<div className="min-h-96" />}>
        <Agora />
      </Suspense>
    </>
  );
}
