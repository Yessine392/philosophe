import { philosophers, philosopherBySlug } from "../src/data/philosophers";
import { concepts, conceptBySlug } from "../src/data/concepts";
import { paths } from "../src/data/paths";
let bad = 0;
const err = (m: string) => { bad++; console.error("✗", m); };
const seen = new Set<string>();
for (const p of philosophers) {
  if (seen.has(p.slug)) err("dup philosopher " + p.slug); seen.add(p.slug);
  for (const c of p.concepts) if (!conceptBySlug[c]) err(`${p.slug} → concept ${c}`);
}
for (const c of concepts) {
  for (const s of c.philosophers) if (!philosopherBySlug[s]) err(`concept ${c.slug} → philo ${s}`);
  for (const r of c.related) if (!conceptBySlug[r]) err(`concept ${c.slug} → related ${r}`);
}
for (const p of paths) for (const l of p.lessons) {
  for (const s of l.philosophers) if (!philosopherBySlug[s]) err(`lesson ${l.slug} → philo ${s}`);
  for (const q of l.quiz) if (q.answer >= q.options.length) err(`quiz ${l.slug}`);
}
console.log(`${philosophers.length} philosophes, ${concepts.length} concepts, ${paths.length} parcours, ${paths.reduce((n,p)=>n+p.lessons.length,0)} leçons — ${bad} erreur(s)`);
process.exit(bad ? 1 : 0);
