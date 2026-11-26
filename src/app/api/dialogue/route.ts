import { getPhilosopher } from "@/data/philosophers";
import { dialogueSystemPrompt } from "@/lib/persona";
import { hasCredentials, missingKeyResponse, sanitizeHistory, streamText } from "@/lib/claude";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const philosopher = body && typeof body.slug === "string" ? getPhilosopher(body.slug) : undefined;
  if (!philosopher) {
    return Response.json({ error: "Philosophe inconnu." }, { status: 404 });
  }
  const messages = sanitizeHistory(body.messages);
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "Aucune question à poser." }, { status: 400 });
  }
  if (!hasCredentials()) return missingKeyResponse();

  return streamText({ system: dialogueSystemPrompt(philosopher), messages });
}
