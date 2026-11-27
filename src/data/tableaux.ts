import type { Philosopher } from "@/lib/types";

/** Tableaux peints « à la manière de » chaque époque, où les philosophes prennent la parole. */
export interface Painting {
  id: string;
  title: string;
  style: string;
  /** Points d'intérêt horizontaux (0 → 1) que la caméra parcourt. */
  focus: number[];
  /** Ambiance de base, pour accorder les animations. */
  mood: "jour" | "crepuscule" | "nuit" | "interieur";
}

export const paintings: Record<string, Painting> = {
  "fresque-agora": { id: "fresque-agora", title: "L'agora au bord de la mer", style: "Fresque à la manière pompéienne", focus: [0.2, 0.55, 0.85], mood: "jour" },
  "fresque-jardin": { id: "fresque-jardin", title: "Le jardin des oliviers", style: "Fresque à la manière pompéienne", focus: [0.15, 0.5, 0.85], mood: "crepuscule" },
  "lavis-montagne": { id: "lavis-montagne", title: "Montagnes et eaux", style: "Lavis à l'encre, à la manière des rouleaux chinois", focus: [0.25, 0.45, 0.8], mood: "jour" },
  "lavis-lune": { id: "lavis-lune", title: "Bambous sous la lune", style: "Lavis à l'encre sur soie", focus: [0.15, 0.4, 0.7], mood: "nuit" },
  "inde-bodhi": { id: "inde-bodhi", title: "L'arbre de l'Éveil", style: "À la manière des peintures murales d'Ajanta", focus: [0.3, 0.45, 0.8], mood: "jour" },
  enluminure: { id: "enluminure", title: "Le cloître et la cité", style: "Enluminure sur fond d'or", focus: [0.15, 0.5, 0.75], mood: "jour" },
  "persan-jardin": { id: "persan-jardin", title: "Le jardin du savoir", style: "Miniature persane", focus: [0.2, 0.5, 0.8], mood: "jour" },
  "persan-nuit": { id: "persan-nuit", title: "La nuit des astronomes", style: "Miniature persane", focus: [0.3, 0.6, 0.85], mood: "nuit" },
  renaissance: { id: "renaissance", title: "La cité idéale", style: "Huile, Renaissance italienne", focus: [0.2, 0.5, 0.8], mood: "jour" },
  "hollande-etude": { id: "hollande-etude", title: "Le cabinet d'étude", style: "Clair-obscur hollandais, XVIIe siècle", focus: [0.15, 0.4, 0.7], mood: "interieur" },
  "hollande-port": { id: "hollande-port", title: "Le port au crépuscule", style: "Âge d'or hollandais", focus: [0.2, 0.55, 0.85], mood: "crepuscule" },
  "lumieres-ruines": { id: "lumieres-ruines", title: "Promenade aux ruines", style: "Paysage du XVIIIe siècle", focus: [0.25, 0.55, 0.8], mood: "jour" },
  "lumieres-ville": { id: "lumieres-ville", title: "Le fleuve au couchant", style: "Veduta du XVIIIe siècle", focus: [0.2, 0.5, 0.8], mood: "crepuscule" },
  "romantique-brume": { id: "romantique-brume", title: "Au-dessus de la mer de brume", style: "Peinture romantique allemande", focus: [0.3, 0.5, 0.75], mood: "crepuscule" },
  "romantique-lune": { id: "romantique-lune", title: "L'abbaye sous la lune", style: "Peinture romantique allemande", focus: [0.2, 0.55, 0.8], mood: "nuit" },
  "moderne-paris": { id: "moderne-paris", title: "Paris, la nuit", style: "Peinture moderne, entre expressionnisme et cubisme", focus: [0.15, 0.5, 0.85], mood: "nuit" },
  "moderne-mer": { id: "moderne-mer", title: "La route vers la mer", style: "Peinture moderne méditerranéenne", focus: [0.25, 0.5, 0.75], mood: "jour" },
};

const INDE = new Set(["bouddha", "nagarjuna"]);
const RENAISSANCE = new Set(["machiavel", "montaigne"]);
const MER_D_ABORD = new Set(["camus", "fanon", "simone-weil"]);

/** Les tableaux que traverse un dialogue avec ce philosophe, dans l'ordre du voyage. */
export function paintingsFor(p: Philosopher): Painting[] {
  let ids: string[];
  if (INDE.has(p.slug)) ids = ["inde-bodhi", "lavis-montagne"];
  else if (p.tradition === "orient") ids = ["lavis-montagne", "lavis-lune"];
  else if (p.tradition === "islam") ids = ["persan-jardin", "persan-nuit"];
  else if (p.era === "antiquite") ids = ["fresque-agora", "fresque-jardin"];
  else if (p.era === "medieval") ids = ["enluminure", "persan-jardin"];
  else if (RENAISSANCE.has(p.slug)) ids = ["renaissance", "lumieres-ruines"];
  else if (p.era === "renaissance") ids = ["hollande-etude", "hollande-port"];
  else if (p.era === "lumieres") ids = ["lumieres-ruines", "lumieres-ville"];
  else if (p.era === "xixe") ids = ["romantique-brume", "romantique-lune"];
  else ids = MER_D_ABORD.has(p.slug) ? ["moderne-mer", "moderne-paris"] : ["moderne-paris", "moderne-mer"];
  if (p.slug === "maimonide" || p.slug === "augustin") ids = ["enluminure", "fresque-jardin"];
  return ids.map((id) => paintings[id]);
}

export const motifs = {
  lumiere: "lumière",
  soleil: "soleil",
  aube: "aube",
  nuit: "nuit",
  etoiles: "étoiles",
  lune: "lune",
  mer: "eaux",
  pluie: "pluie",
  neige: "neige",
  feu: "feu",
  ombres: "ombres",
  brume: "brume",
  vent: "vent",
  oiseaux: "envol",
  tempete: "tempête",
  joie: "joie",
  mort: "finitude",
} as const;

export type Motif = keyof typeof motifs;
export const motifKeys = Object.keys(motifs) as Motif[];

const keywords: [Motif, RegExp][] = [
  ["lumiere", /lumi[eè]re|v[ée]rit[ée]|clart[ée]|[ée]clair|vision/g],
  ["soleil", /soleil|chaleur|midi|été/g],
  ["aube", /aube|na[iî]tre|naissance|commencement|commencer|origine|enfan/g],
  ["nuit", /\bnuit|obscur|t[ée]n[èe]bre|sommeil|r[êe]ve/g],
  ["etoiles", /[ée]toile|cosmos|univers|ciel|infini|astre/g],
  ["lune", /\blune/g],
  ["mer", /\bmer\b|oc[ée]an|fleuve|rivi[èe]re|\beau\b|flux|couler|vague/g],
  ["pluie", /pluie|larme|pleur|chagrin|tristesse/g],
  ["neige", /neige|hiver|froid|glace|silence/g],
  ["feu", /\bfeu\b|flamme|br[ûu]l|passion|d[ée]sir|ardeur/g],
  ["ombres", /caverne|ombre|illusion|apparence|reflet|prisonnier/g],
  ["brume", /brume|brouillard|doute|incertain|myst[èe]re|ignor/g],
  ["vent", /vent|souffle|devenir|changement|chang|mouvement|passage/g],
  ["oiseaux", /oiseau|libert[ée]|\blibre|envol|voler|ailes/g],
  ["tempete", /temp[êe]te|col[èe]re|guerre|violence|r[ée]volte|combat|lutte/g],
  ["joie", /joie|bonheur|heureu|plaisir|sourire|ami(ti[ée])?\b|amour/g],
  ["mort", /\bmort|mourir|finitude|t[ée]rir|fin de|tombe|deuil/g],
];

/** Devine les motifs d'un texte quand le philosophe ne les a pas indiqués. */
export function detectMotifs(text: string): Motif[] {
  const t = text.toLowerCase();
  return keywords
    .map(([m, re]) => [m, (t.match(re) || []).length] as const)
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([m]) => m);
}

const SCENE_RE = /^\s*\[\[\s*sc[eè]ne\s*:([^\]]*)\]\]\s*/i;

/**
 * Sépare l'indication de scène (« [[scène: lumiere, mer]] ») du texte du philosophe.
 * Pendant la diffusion, une indication encore incomplète est masquée.
 */
export function parseScene(raw: string): { motifs: Motif[]; body: string; declared: boolean } {
  const m = raw.match(SCENE_RE);
  if (m) {
    const found = m[1]
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .split(/[,|;/]/)
      .map((s) => s.trim())
      .filter((s): s is Motif => s in motifs);
    return { motifs: found.slice(0, 3), body: raw.slice(m[0].length), declared: true };
  }
  if (/^\s*\[(\[[^\]]*)?$/.test(raw) || /^\s*\[\[[^\]]*\]?$/.test(raw)) return { motifs: [], body: "", declared: false };
  return { motifs: [], body: raw, declared: false };
}

export function sceneOf(raw: string): { motifs: Motif[]; body: string } {
  const s = parseScene(raw);
  return { body: s.body, motifs: s.motifs.length ? s.motifs : detectMotifs(s.body) };
}
