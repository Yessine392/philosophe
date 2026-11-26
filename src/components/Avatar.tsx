import type { Philosopher } from "@/lib/types";

const overrides: Record<string, string> = { avicenne: "IS", averroes: "IR", bouddha: "Bu" };

function initials(name: string) {
  const clean = name.replace(/\(.*?\)/g, "").replace(/[.]/g, " ").trim();
  const parts = clean.split(/\s+/).filter((w) => !/^(d'|de|du|la|le|von|van)$/i.test(w));
  if (parts.length === 1) return parts[0].slice(0, 2);
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Portrait génératif : un médaillon unique pour chaque philosophe. */
export function Avatar({
  philosopher,
  size = 56,
  className = "",
}: {
  philosopher: Philosopher;
  size?: number;
  className?: string;
}) {
  const h = philosopher.hue;
  const id = `av-${philosopher.slug}`;
  const seed = philosopher.slug.length + philosopher.born;
  const rays = 12 + (Math.abs(seed) % 10);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`shrink-0 ${className}`}
      role="img"
      aria-label={philosopher.name}
    >
      <defs>
        <radialGradient id={`${id}-g`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor={`hsl(${h} 85% 72%)`} />
          <stop offset="55%" stopColor={`hsl(${h} 55% 38%)`} />
          <stop offset="100%" stopColor={`hsl(${(h + 40) % 360} 50% 14%)`} />
        </radialGradient>
        <linearGradient id={`${id}-r`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f6e3b4" />
          <stop offset="50%" stopColor={`hsl(${h} 70% 70%)`} />
          <stop offset="100%" stopColor="#c99a43" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${id}-g)`} />
      <g opacity="0.22" stroke="#fff" strokeWidth="0.6">
        {Array.from({ length: rays }).map((_, i) => {
          const a = (i / rays) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={50 + Math.cos(a) * 30}
              y1={50 + Math.sin(a) * 30}
              x2={50 + Math.cos(a) * 44}
              y2={50 + Math.sin(a) * 44}
            />
          );
        })}
      </g>
      <circle cx="50" cy="50" r="47" fill="none" stroke={`url(#${id}-r)`} strokeWidth="2" />
      <circle cx="50" cy="50" r="29" fill="rgb(6 6 11 / 0.35)" stroke="rgb(255 255 255 / 0.25)" strokeWidth="0.6" />
      <text
        x="50"
        y="51"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fontSize="26"
        fontStyle="italic"
        fill="#fff8e8"
      >
        {overrides[philosopher.slug] ?? initials(philosopher.name)}
      </text>
    </svg>
  );
}
