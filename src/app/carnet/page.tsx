import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Carnet } from "@/components/Carnet";

export const metadata: Metadata = { title: "Mon carnet" };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Mon carnet" title={<>Ton chemin <span className="text-gilded italic">de pensée</span></>}>
        Ta progression, tes maîtres et les pensées que tu as voulu garder. Tout reste sur ton appareil.
      </PageHeader>
      <Carnet />
    </>
  );
}
