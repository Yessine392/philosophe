import { getPhilosopher } from "@/data/philosophers";
import { agoraSystemPrompt, synthesisSystemPrompt } from "@/lib/persona";
import { hasCredentials, missingKeyResponse, streamText } from "@/lib/claude";

type Entry = { speaker: string; text: string };

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const a = body && getPhilosopher(String(body.a));
  const b = body && getPhilosopher(String(body.b));
  const topic = body && typeof body.topic === "string" ? body.topic.trim().slice(0, 300) : "";
  if (!a || !b || a.slug === b.slug || !topic) {
    return Response.json({ error: "Choisissez deux philosophes différents et une question." }, { status: 400 });
  }
  const transcript: Entry[] = Array.isArray(body.transcript)
    ? body.transcript
        .filter((e: Entry) => e && typeof e.speaker === "string" && typeof e.text === "string")
        .slice(-24)
        .map((e: Entry) => ({ speaker: e.speaker, text: e.text.slice(0, 4000) }))
    : [];
  if (!hasCredentials()) return missingKeyResponse();

  const nameOf = (s: string) =>
    s === a.slug ? a.name : s === b.slug ? b.name : "L'élève (modérateur)";
  const rendered = transcript.length
    ? transcript.map((e) => `**${nameOf(e.speaker)}** : ${e.text}`).join("\n\n")
    : "(Le débat n'a pas encore commencé.)";

  if (body.next === "synthese") {
    return streamText({
      system: synthesisSystemPrompt(a, b, topic),
      messages: [{ role: "user", content: `Voici le débat :\n\n${rendered}\n\nRédige la synthèse.` }],
      maxTokens: 4096,
    });
  }

  const speaker = body.next === b.slug ? b : a;
  const opponent = speaker === a ? b : a;
  const instruction = transcript.length
    ? `Voici le débat jusqu'ici :\n\n${rendered}\n\nC'est à toi, ${speaker.name}, de prendre la parole.`
    : `Ouvre le débat : expose ta position sur la question « ${topic} » et interpelle ${opponent.name}.`;

  return streamText({
    system: agoraSystemPrompt(speaker, opponent, topic),
    messages: [{ role: "user", content: instruction }],
    maxTokens: 2048,
  });
}
