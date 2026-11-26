"use client";

import { useProgress } from "@/lib/progress";
import type { Path } from "@/lib/types";

export function usePathDone(path: Path) {
  const progress = useProgress();
  return path.lessons.filter((l) => progress.lessons[`${path.slug}/${l.slug}`] !== undefined).length;
}

export function PathProgressBar({ path }: { path: Path }) {
  const done = usePathDone(path);
  const pct = (done / path.lessons.length) * 100;
  return (
    <div>
      <div className="flex justify-between text-xs text-white/45">
        <span>
          {done}/{path.lessons.length} leçons
        </span>
        {done === path.lessons.length && <span className="text-gold-200">Parcours accompli ✦</span>}
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, hsl(${path.hue} 70% 65%), var(--color-gold-300))` }}
        />
      </div>
    </div>
  );
}

export function LessonStatus({ pathSlug, lessonSlug }: { pathSlug: string; lessonSlug: string }) {
  const progress = useProgress();
  const score = progress.lessons[`${pathSlug}/${lessonSlug}`];
  if (score === undefined) return null;
  return (
    <span className="rounded-full border border-gold-300/40 bg-gold-300/10 px-2.5 py-1 text-[11px] text-gold-200">
      ✓ {score}/3
    </span>
  );
}
