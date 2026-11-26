/** Routage par ancre (#nom) pour la version Artifact : pas de chemins, pas de paramètres d'URL. */
type W = Window & { __philoSearch?: string };
const w = window as W;
w.__philoSearch = w.__philoSearch ?? "";

let version = 0;
const listeners = new Set<() => void>();
const emit = () => {
  version++;
  listeners.forEach((l) => l());
};
window.addEventListener("hashchange", () => {
  // Une navigation par l'historique du navigateur perd les paramètres.
  if (!navigating) w.__philoSearch = "";
  navigating = false;
  emit();
});
let navigating = false;

export function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}
export const getVersion = () => version;

/** Convertit un chemin de l'application (« /parcours/x/y?a=b#c ») en ancre. */
export function toHash(href: string): { hash: string; search: string } {
  const [beforeHash, frag = ""] = href.split("#");
  const [path, query = ""] = beforeHash.split("?");
  const seg = path.split("/").filter(Boolean);
  let hash = "accueil";
  if (seg[0] === "parcours") {
    if (seg.length === 1) hash = "parcours";
    else if (seg.length === 2) hash = `parcours-${seg[1]}`;
    else hash = `lecon-${seg[1]}--${seg[2]}`;
  } else if (seg[0] === "philosophes") hash = seg[1] ? `philosophe-${seg[1]}` : "philosophes";
  else if (seg[0] === "dialogue" && seg[1]) hash = `dialogue-${seg[1]}`;
  else if (seg[0] === "concepts") hash = frag ? `concept-${frag}` : "concepts";
  else if (seg[0]) hash = seg[0];
  else if (!path && frag) hash = frag;
  return { hash, search: query ? `?${query}` : "" };
}

export type Route = { name: string; params: Record<string, string>; pathname: string };

export function currentRoute(): Route {
  const h = decodeURIComponent(window.location.hash.slice(1)) || "accueil";
  const m = (prefix: string) => (h.startsWith(prefix) ? h.slice(prefix.length) : null);
  let v: string | null;
  if ((v = m("lecon-"))) {
    const [path, lesson] = v.split("--");
    return { name: "lecon", params: { path, lesson }, pathname: `/parcours/${path}/${lesson}` };
  }
  if ((v = m("parcours-"))) return { name: "parcours-detail", params: { path: v }, pathname: `/parcours/${v}` };
  if ((v = m("philosophe-"))) return { name: "philosophe", params: { slug: v }, pathname: `/philosophes/${v}` };
  if ((v = m("dialogue-"))) return { name: "dialogue", params: { slug: v }, pathname: `/dialogue/${v}` };
  if (m("concept-") !== null) return { name: "concepts", params: {}, pathname: "/concepts" };
  if (h === "accueil") return { name: "accueil", params: {}, pathname: "/" };
  return { name: h, params: {}, pathname: `/${h}` };
}

export function navigate(href: string) {
  const { hash, search } = toHash(href);
  w.__philoSearch = search;
  if (window.location.hash.slice(1) === hash) {
    emit();
  } else {
    navigating = true;
    window.location.hash = hash;
  }
  window.scrollTo({ top: 0 });
}
