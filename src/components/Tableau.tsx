"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { Motif, Painting } from "@/data/tableaux";
import { paintingSrc } from "@/lib/tableauxSrc";

/* ------------------------------------------------------------------ */
/* Particules : étoiles, pluie, neige, braises, feuilles, oiseaux…     */
/* ------------------------------------------------------------------ */

type Particle = { x: number; y: number; vx: number; vy: number; r: number; p: number; s: number; life: number };
type Layer = { kind: Motif | "poussiere"; items: Particle[] };

const rand = (a: number, b: number) => a + Math.random() * (b - a);

function makeLayer(kind: Layer["kind"], w: number, h: number): Layer {
  const area = Math.max(0.35, (w * h) / (1280 * 800));
  const n = (k: number) => Math.round(k * area);
  const items: Particle[] = [];
  const add = (count: number, f: () => Particle) => {
    for (let i = 0; i < count; i++) items.push(f());
  };
  const base = () => ({ x: rand(0, w), y: rand(0, h), vx: 0, vy: 0, r: 1, p: rand(0, Math.PI * 2), s: rand(0.5, 1.5), life: Math.random() });
  switch (kind) {
    case "etoiles":
      add(n(90), () => ({ ...base(), y: rand(0, h * 0.45), r: rand(0.4, 1.5) }));
      break;
    case "pluie":
      add(n(170), () => ({ ...base(), vx: -1.4, vy: rand(9, 15), r: rand(10, 20) }));
      break;
    case "neige":
      add(n(130), () => ({ ...base(), vy: rand(0.4, 1.2), r: rand(0.8, 2.6) }));
      break;
    case "feu":
      add(n(70), () => ({ ...base(), y: rand(h * 0.5, h), vy: -rand(0.5, 1.6), r: rand(0.8, 2.4) }));
      break;
    case "vent":
      add(n(38), () => ({ ...base(), vx: rand(1.4, 3.2), r: rand(2, 4.2) }));
      break;
    case "oiseaux":
      add(Math.max(4, n(8)), () => ({ ...base(), y: rand(h * 0.08, h * 0.4), vx: rand(0.6, 1.3), r: rand(4, 8) }));
      break;
    case "joie":
      add(n(55), () => ({ ...base(), vy: -rand(0.15, 0.5), r: rand(0.8, 2.2) }));
      break;
    case "mer":
      add(n(110), () => ({ ...base(), y: rand(h * 0.62, h), r: rand(4, 14) }));
      break;
    case "poussiere":
      add(n(35), () => ({ ...base(), vx: rand(-0.12, 0.12), vy: -rand(0.05, 0.25), r: rand(0.6, 1.6) }));
      break;
    default:
      break;
  }
  return { kind, items };
}

function drawLayer(ctx: CanvasRenderingContext2D, layer: Layer, w: number, h: number, t: number) {
  const { kind, items } = layer;
  ctx.globalCompositeOperation = kind === "pluie" || kind === "oiseaux" || kind === "vent" ? "source-over" : "lighter";
  for (const q of items) {
    switch (kind) {
      case "etoiles": {
        const a = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.0012 * q.s + q.p));
        ctx.fillStyle = `rgba(255,248,225,${a})`;
        ctx.beginPath();
        ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "pluie": {
        q.x += q.vx;
        q.y += q.vy;
        if (q.y > h) {
          q.y = -20;
          q.x = rand(0, w + 40);
        }
        ctx.strokeStyle = "rgba(205,220,255,0.33)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(q.x, q.y);
        ctx.lineTo(q.x + q.vx * 1.6, q.y + q.r);
        ctx.stroke();
        break;
      }
      case "neige": {
        q.y += q.vy;
        q.x += Math.sin(t * 0.001 + q.p) * 0.4;
        if (q.y > h + 4) {
          q.y = -4;
          q.x = rand(0, w);
        }
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.beginPath();
        ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "feu": {
        q.y += q.vy;
        q.x += Math.sin(t * 0.002 + q.p) * 0.6;
        q.life += 0.004 * q.s;
        if (q.life > 1 || q.y < h * 0.2) {
          q.life = 0;
          q.y = rand(h * 0.8, h + 10);
          q.x = rand(0, w);
        }
        const a = Math.sin(q.life * Math.PI) * 0.9;
        ctx.fillStyle = `hsla(${28 + q.s * 10},100%,${55 + q.s * 8}%,${a})`;
        ctx.beginPath();
        ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "vent": {
        q.x += q.vx;
        q.y += Math.sin(t * 0.0015 + q.p) * 0.8;
        if (q.x > w + 10) {
          q.x = -10;
          q.y = rand(0, h);
        }
        ctx.save();
        ctx.translate(q.x, q.y);
        ctx.rotate(t * 0.002 * q.s + q.p);
        ctx.fillStyle = q.s > 1 ? "rgba(214,170,90,0.75)" : "rgba(150,170,110,0.7)";
        ctx.beginPath();
        ctx.ellipse(0, 0, q.r, q.r * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        break;
      }
      case "oiseaux": {
        q.x += q.vx;
        q.y += Math.sin(t * 0.001 + q.p) * 0.25;
        if (q.x > w + 20) {
          q.x = -20;
          q.y = rand(h * 0.08, h * 0.4);
        }
        const flap = Math.sin(t * 0.012 * q.s + q.p) * q.r * 0.6;
        ctx.strokeStyle = "rgba(25,20,18,0.8)";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(q.x - q.r, q.y - flap);
        ctx.quadraticCurveTo(q.x - q.r * 0.4, q.y - flap * 0.2, q.x, q.y);
        ctx.quadraticCurveTo(q.x + q.r * 0.4, q.y - flap * 0.2, q.x + q.r, q.y - flap);
        ctx.stroke();
        break;
      }
      case "joie":
      case "poussiere": {
        q.x += q.vx + Math.sin(t * 0.0008 + q.p) * 0.2;
        q.y += q.vy;
        if (q.y < -5) {
          q.y = h + 5;
          q.x = rand(0, w);
        }
        const a = (kind === "joie" ? 0.5 : 0.28) + 0.4 * Math.sin(t * 0.002 * q.s + q.p);
        ctx.fillStyle = kind === "joie" ? `rgba(255,214,130,${Math.max(0, a)})` : `rgba(255,240,210,${Math.max(0, a)})`;
        ctx.beginPath();
        ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "mer": {
        const a = Math.max(0, Math.sin(t * 0.0015 * q.s + q.p)) * 0.55;
        ctx.strokeStyle = `rgba(255,250,235,${a})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        const dx = Math.sin(t * 0.0006 + q.p) * 6;
        ctx.moveTo(q.x + dx, q.y);
        ctx.lineTo(q.x + dx + q.r, q.y);
        ctx.stroke();
        break;
      }
    }
  }
}

function Particles({ motifs, active }: { motifs: Motif[]; active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const key = motifs.join(",");

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !active) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let layers: Layer[] = [];
    let w = 0;
    let h = 0;
    const kinds = (key ? (key.split(",") as Motif[]) : []).filter((k) =>
      ["etoiles", "pluie", "neige", "feu", "vent", "oiseaux", "joie", "mer"].includes(k),
    ) as Layer["kind"][];
    if (!kinds.length || key.includes("lumiere") || key.includes("soleil")) kinds.push("poussiere");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layers = kinds.map((k) => makeLayer(k, w, h));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const l of layers) drawLayer(ctx, l, w, h, t);
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [key, active]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />;
}

/* ------------------------------------------------------------------ */
/* Le tableau                                                          */
/* ------------------------------------------------------------------ */

function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function Tableau({
  painting,
  motifs,
  seed = 0,
  className = "",
  children,
  still = false,
}: {
  painting: Painting;
  motifs: Motif[];
  seed?: number;
  className?: string;
  children?: ReactNode;
  /** Vignette fixe (carnet de voyage) : pas d'animation. */
  still?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (still) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, [still]);

  const has = (m: Motif) => motifs.includes(m);
  const f = painting.focus;
  const a = f[Math.floor(hash(seed + 1) * f.length)];
  let b = f[Math.floor(hash(seed + 2) * f.length)];
  if (b === a) b = f[(f.indexOf(a) + 1) % f.length];
  const night = has("nuit") || (painting.mood === "nuit" && !has("soleil") && !has("aube"));

  const filters: string[] = [];
  if (has("mort")) filters.push("grayscale(0.65)", "brightness(0.8)");
  if (has("nuit")) filters.push("brightness(0.62)", "saturate(0.85)");
  if (has("tempete")) filters.push("brightness(0.78)", "contrast(1.12)");
  if (has("ombres")) filters.push("brightness(0.8)", "contrast(1.1)");
  if (has("joie") || has("soleil")) filters.push("saturate(1.15)", "brightness(1.05)");
  if (has("brume")) filters.push("contrast(0.9)");

  const imgStyle = {
    "--x0": `${Math.round(a * 100)}%`,
    "--x1": `${Math.round(b * 100)}%`,
    "--s0": still ? 1 : 1.06 + hash(seed + 3) * 0.06,
    "--s1": still ? 1 : 1.16 + hash(seed + 4) * 0.1,
    objectPosition: `${Math.round(a * 100)}% 50%`,
    filter: filters.join(" ") || undefined,
    animationPlayState: active ? "running" : "paused",
  } as CSSProperties;

  const play = { animationPlayState: active ? "running" : "paused" } as CSSProperties;

  return (
    <div ref={ref} className={`relative overflow-hidden bg-ink-900 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={paintingSrc(painting.id)}
        alt={`${painting.title}, ${painting.style.toLowerCase()}`}
        className={`absolute inset-0 h-full w-full object-cover transition-[filter] duration-[2500ms] ${still ? "" : "tableau-pan"}`}
        style={imgStyle}
        draggable={false}
      />

      {!still && (
        <>
          {night && <div className="absolute inset-0 bg-[#0a1440]/40 mix-blend-multiply" />}
          {has("aube") && <div className="absolute inset-0 bg-gradient-to-t from-[#ff8f78]/35 via-[#ffc59a]/10 to-transparent mix-blend-screen" />}
          {has("soleil") && (
            <div className="tableau-breathe absolute inset-0 mix-blend-screen" style={{ ...play, background: "radial-gradient(circle at 74% 18%, rgba(255,220,150,0.6), transparent 42%)" }} />
          )}
          {has("lune") && (
            <div className="tableau-breathe absolute inset-0 mix-blend-screen" style={{ ...play, background: "radial-gradient(circle at 80% 16%, rgba(205,222,255,0.5), transparent 30%)" }} />
          )}
          {has("lumiere") && (
            <div
              className="tableau-rays absolute -inset-[30%] mix-blend-screen"
              style={{
                ...play,
                background: "repeating-conic-gradient(from 200deg at 62% 0%, rgba(255,232,180,0.16) 0deg 3deg, transparent 3deg 11deg)",
                maskImage: "radial-gradient(circle at 62% 20%, black, transparent 60%)",
                WebkitMaskImage: "radial-gradient(circle at 62% 20%, black, transparent 60%)",
              }}
            />
          )}
          {has("ombres") && (
            <div
              className="tableau-flicker absolute inset-0"
              style={{ ...play, background: "radial-gradient(ellipse at 50% 60%, transparent 25%, rgba(5,3,2,0.85) 85%)" }}
            />
          )}
          {has("feu") && <div className="tableau-flicker absolute inset-0 mix-blend-soft-light" style={{ ...play, background: "radial-gradient(ellipse at 50% 100%, rgba(255,120,40,0.5), transparent 60%)" }} />}
          {has("brume") && (
            <>
              <div className="tableau-fog absolute -inset-x-1/2 bottom-0 h-2/3 opacity-60" style={{ ...play, background: "radial-gradient(ellipse at 30% 70%, rgba(235,235,240,0.55), transparent 60%)" }} />
              <div className="tableau-fog-2 absolute -inset-x-1/2 bottom-0 h-1/2 opacity-50" style={{ ...play, background: "radial-gradient(ellipse at 70% 80%, rgba(225,228,235,0.5), transparent 55%)" }} />
            </>
          )}
          {has("tempete") && <div className="tableau-lightning absolute inset-0 bg-white" style={play} />}
          <Particles motifs={motifs} active={active} />
        </>
      )}

      {children}
    </div>
  );
}
