// Construit le bundle de la version Artifact, avec les tableaux intégrés en data: URI.
import { build } from "esbuild";
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "artifact/dist");
mkdirSync(dist, { recursive: true });

const dir = resolve(root, "public/tableaux");
const images = Object.fromEntries(
  readdirSync(dir)
    .filter((f) => f.endsWith(".webp"))
    .map((f) => [f.replace(/\.webp$/, ""), "data:image/webp;base64," + readFileSync(resolve(dir, f)).toString("base64")]),
);
writeFileSync(
  resolve(dist, "tableauxSrc.ts"),
  `const images: Record<string, string> = ${JSON.stringify(images)};\nexport function paintingSrc(id: string): string { return images[id] ?? ""; }\n`,
);

await build({
  entryPoints: [resolve(root, "artifact/main.tsx")],
  bundle: true,
  minify: true,
  format: "iife",
  jsx: "automatic",
  target: "es2020",
  tsconfig: resolve(root, "tsconfig.json"),
  outfile: resolve(dist, "app.js"),
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "warning",
  alias: {
    "next/link": resolve(root, "artifact/shims/link.tsx"),
    "next/navigation": resolve(root, "artifact/shims/navigation.ts"),
  },
  plugins: [
    {
      name: "tableaux-integres",
      setup(b) {
        b.onResolve({ filter: /lib\/tableauxSrc$/ }, () => ({ path: resolve(dist, "tableauxSrc.ts") }));
      },
    },
  ],
});
