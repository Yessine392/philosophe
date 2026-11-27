import type { Era, Tradition } from "@/lib/types";

export const eras: Era[] = [
  {
    id: "antiquite",
    name: "Antiquité",
    range: "VIe s. av. J.-C. – Ve s.",
    description:
      "De Milet à Athènes, de Lu à Bénarès : l'étonnement devient méthode, et la sagesse un art de vivre.",
    hue: 38,
  },
  {
    id: "medieval",
    name: "Moyen Âge",
    range: "Ve – XVe s.",
    description:
      "Bagdad, Cordoue, Paris : la raison grecque rencontre la révélation, et les traductions bâtissent des ponts.",
    hue: 280,
  },
  {
    id: "renaissance",
    name: "Renaissance & âge classique",
    range: "XVe – XVIIe s.",
    description:
      "L'homme se découvre mesure de toute chose ; la méthode et le doute fondent la science moderne.",
    hue: 160,
  },
  {
    id: "lumieres",
    name: "Lumières",
    range: "XVIIIe s.",
    description:
      "Sapere aude ! La critique, la tolérance et le contrat social redessinent l'humain et la cité.",
    hue: 48,
  },
  {
    id: "xixe",
    name: "XIXe siècle",
    range: "XIXe s.",
    description:
      "L'Histoire, la volonté, l'angoisse, le soupçon : les grands systèmes et leurs démolisseurs.",
    hue: 350,
  },
  {
    id: "contemporain",
    name: "Contemporain",
    range: "XXe – XXIe s.",
    description:
      "Langage, existence, pouvoir, altérité : penser après les catastrophes et au cœur de la modernité.",
    hue: 210,
  },
];

export const traditions: Tradition[] = [
  { id: "occident", name: "Occident" },
  { id: "orient", name: "Asie" },
  { id: "islam", name: "Monde arabo-musulman" },
  { id: "afrique", name: "Afrique & diasporas" },
];

export const eraById = Object.fromEntries(eras.map((e) => [e.id, e])) as Record<
  Era["id"],
  Era
>;
export const traditionById = Object.fromEntries(
  traditions.map((t) => [t.id, t]),
) as Record<Tradition["id"], Tradition>;
