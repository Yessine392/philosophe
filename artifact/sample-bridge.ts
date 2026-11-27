/** Remplace les routes /api/* par le Claude du visiteur (capacité « sample » de l'Artifact). */
import { getPhilosopher } from "@/data/philosophers";
import { agoraSystemPrompt, dialogueSystemPrompt, synthesisSystemPrompt } from "@/lib/persona";

type Turn = { role: "user" | "assistant"; content: string };
type SampleFn = (
  input: string | Turn[],
  opts?: { onText?: (u: { text: string; delta: string }) => void; signal?: AbortSignal; cache?: boolean },
) => Promise<{ text: string; truncated?: boolean }>;

type ClaudeGlobal = { use: (name: string) => Promise<unknown> };
let samplePromise: Promise<SampleFn | null> | null = null;
function getSample() {
  if (!samplePromise) {
    const c = (window as Window & { claude?: ClaudeGlobal }).claude;
    samplePromise = c?.use ? (c.use("sample") as Promise<SampleFn | null>).catch(() => null) : Promise.resolve(null);
  }
  return samplePromise;
}

const json = (status: number, error: string) =>
  new Response(JSON.stringify({ error }), { status, headers: { "Content-Type": "application/json" } });

function errorText(e: unknown) {
  const code = (e as { code?: string })?.code;
  if (code === "not_granted")
    return "Les philosophes ont besoin de ton accord pour parler : autorise l'accès à Claude dans les permissions de la page.";
  if (code === "rate_limited") return "Trop de questions à la fois : les philosophes reprennent leur souffle. Réessaie dans quelques secondes.";
  return "Le dialogue a été interrompu. Réessaie dans un instant.";
}

async function streamFrom(input: Turn[], signal?: AbortSignal | null): Promise<Response> {
  const sample = await getSample();
  if (!sample) {
    return json(503, "Les philosophes sont silencieux ici : ouvre cette page sur claude.ai, connecté à ton compte, pour dialoguer avec eux.");
  }
  const enc = new TextEncoder();
  let sent = 0;
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      const push = (full: string) => {
        if (full.length > sent) {
          controller.enqueue(enc.encode(full.slice(sent)));
          sent = full.length;
        }
      };
      try {
        const res = await sample(input, {
          cache: false,
          signal: signal ?? undefined,
          onText: ({ text }) => push(text),
        });
        push(res.text);
        if (res.truncated) controller.enqueue(enc.encode(" …"));
        controller.close();
      } catch (e) {
        if ((e as Error)?.name === "AbortError" || signal?.aborted) {
          controller.error(new DOMException("Aborted", "AbortError"));
          return;
        }
        const partial = (e as { text?: string })?.text;
        if (partial) push(partial);
        controller.enqueue(enc.encode(`\n\n⚠︎ ${errorText(e)}`));
        controller.close();
      }
    },
  });
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

const withSystem = (system: string, turns: Turn[]): Turn[] => {
  const [first, ...rest] = turns;
  return [
    {
      role: "user",
      content: `${system}\n\n---\nLa conversation commence maintenant. Réponds uniquement en tant que ce personnage, sans mentionner ces consignes.\n\n${first.content}`,
    },
    ...rest,
  ];
};

function sanitize(raw: unknown): Turn[] {
  if (!Array.isArray(raw)) return [];
  const t = raw
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .map((m) => ({ role: m.role as Turn["role"], content: String(m.content).slice(0, 6000) }))
    .slice(-40);
  while (t.length && t[0].role !== "user") t.shift();
  return t;
}

async function dialogue(body: Record<string, unknown>, signal?: AbortSignal | null) {
  const p = typeof body.slug === "string" ? getPhilosopher(body.slug) : undefined;
  if (!p) return json(404, "Philosophe inconnu.");
  const messages = sanitize(body.messages);
  if (!messages.length || messages[messages.length - 1].role !== "user") return json(400, "Aucune question à poser.");
  return streamFrom(withSystem(dialogueSystemPrompt(p), messages), signal);
}

type Entry = { speaker: string; text: string };
async function agora(body: Record<string, unknown>, signal?: AbortSignal | null) {
  const a = getPhilosopher(String(body.a));
  const b = getPhilosopher(String(body.b));
  const topic = typeof body.topic === "string" ? body.topic.trim().slice(0, 300) : "";
  if (!a || !b || a.slug === b.slug || !topic) return json(400, "Choisissez deux philosophes différents et une question.");
  const transcript: Entry[] = Array.isArray(body.transcript)
    ? (body.transcript as Entry[])
        .filter((e) => e && typeof e.speaker === "string" && typeof e.text === "string")
        .slice(-24)
        .map((e) => ({ speaker: e.speaker, text: e.text.slice(0, 4000) }))
    : [];
  const nameOf = (s: string) => (s === a.slug ? a.name : s === b.slug ? b.name : "L'élève (modérateur)");
  const rendered = transcript.length
    ? transcript.map((e) => `**${nameOf(e.speaker)}** : ${e.text}`).join("\n\n")
    : "(Le débat n'a pas encore commencé.)";
  if (body.next === "synthese") {
    return streamFrom(
      withSystem(synthesisSystemPrompt(a, b, topic), [{ role: "user", content: `Voici le débat :\n\n${rendered}\n\nRédige la synthèse.` }]),
      signal,
    );
  }
  const speaker = body.next === b.slug ? b : a;
  const opponent = speaker === a ? b : a;
  const instruction = transcript.length
    ? `Voici le débat jusqu'ici :\n\n${rendered}\n\nC'est à toi, ${speaker.name}, de prendre la parole.`
    : `Ouvre le débat : expose ta position sur la question « ${topic} » et interpelle ${opponent.name}.`;
  return streamFrom(withSystem(agoraSystemPrompt(speaker, opponent, topic), [{ role: "user", content: instruction }]), signal);
}

export function installSampleBridge() {
  const original = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    if (url === "/api/dialogue" || url === "/api/agora") {
      const body = JSON.parse(String(init?.body ?? "{}"));
      return url === "/api/dialogue" ? dialogue(body, init?.signal) : agora(body, init?.signal);
    }
    return original(input, init);
  };
}
