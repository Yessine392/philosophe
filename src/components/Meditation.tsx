"use client";

import { useState } from "react";
import { Feather } from "lucide-react";
import { addNote } from "@/lib/progress";

export function Meditation({ prompt, source }: { prompt: string; source: string }) {
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-gold-300/20 bg-gradient-to-br from-gold-300/[0.07] to-transparent p-7 sm:p-10">
      <p className="flex items-center gap-2 text-xs tracking-[0.3em] text-gold-300/80 uppercase">
        <Feather size={14} /> Méditation
      </p>
      <p className="mt-4 font-display text-2xl leading-snug text-white">{prompt}</p>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setSaved(false);
        }}
        rows={4}
        placeholder="Écris librement ta réflexion…"
        className="mt-6 w-full resize-none rounded-2xl border border-white/10 bg-ink-950/50 p-4 leading-relaxed text-white placeholder:text-white/30 focus:border-gold-300/40 focus:outline-none"
      />
      <div className="mt-3 flex justify-end">
        <button
          disabled={!text.trim() || saved}
          onClick={() => {
            addNote(`${prompt}\n\n${text.trim()}`, source);
            setSaved(true);
          }}
          className="rounded-full bg-gold-300/90 px-5 py-2 text-sm font-medium text-ink-950 transition enabled:hover:bg-gold-200 disabled:opacity-40"
        >
          {saved ? "Gardé dans ton carnet ✓" : "Garder dans mon carnet"}
        </button>
      </div>
    </div>
  );
}
