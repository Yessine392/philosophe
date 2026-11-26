import Anthropic from "@anthropic-ai/sdk";

export const MODEL = process.env.PHILOSOPHE_MODEL || "claude-opus-5-5";

let client: Anthropic | null = null;

export function hasCredentials() {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

function getClient() {
  if (!client) client = new Anthropic();
  return client;
}

export function missingKeyResponse() {
  return Response.json(
    {
      error:
        "Les philosophes sont silencieux : aucune clé API Claude n'est configurée. Ajoutez ANTHROPIC_API_KEY dans le fichier .env.local puis relancez le serveur.",
    },
    { status: 503 },
  );
}

/**
 * Lance une génération en streaming et renvoie une Response dont le corps
 * est le texte brut, morceau par morceau.
 */
export function streamText(opts: {
  system: string;
  messages: Anthropic.Beta.BetaMessageParam[];
  maxTokens?: number;
  effort?: "low" | "medium" | "high";
}): Response {
  const encoder = new TextEncoder();

  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const stream = getClient().beta.messages.stream({
          model: MODEL,
          max_tokens: opts.maxTokens ?? 4096,
          system: opts.system,
          messages: opts.messages,
          thinking: { type: "adaptive" },
          output_config: { effort: opts.effort ?? "medium" },
          cache_control: { type: "ephemeral" },
          // Si un filtre de sécurité refuse la requête, l'API bascule
          // automatiquement vers un modèle de repli adapté.
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
        });

        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(
            encoder.encode(
              "\n\n*(Le philosophe garde le silence sur ce point. Essayez de reformuler votre question.)*",
            ),
          );
        } else if (final.stop_reason === "max_tokens") {
          controller.enqueue(encoder.encode(" …"));
        }
      } catch (err) {
        console.error("[philosophe] erreur Claude", err);
        let message = "Le dialogue a été interrompu. Réessayez dans un instant.";
        if (err instanceof Anthropic.AuthenticationError) {
          message = "La clé API Claude est invalide. Vérifiez ANTHROPIC_API_KEY.";
        } else if (err instanceof Anthropic.RateLimitError) {
          message = "Trop de questions à la fois : les philosophes reprennent leur souffle. Réessayez dans quelques secondes.";
        }
        controller.enqueue(encoder.encode(`\n\n⚠︎ ${message}`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}

export type ChatTurn = { role: "user" | "assistant"; content: string };

/** Nettoie et borne l'historique envoyé par le client. */
export function sanitizeHistory(raw: unknown, maxTurns = 40): ChatTurn[] {
  if (!Array.isArray(raw)) return [];
  const turns = raw
    .filter(
      (m): m is ChatTurn =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, 6000) }))
    .slice(-maxTurns);
  // L'API exige que la conversation commence par l'utilisateur.
  while (turns.length && turns[0].role !== "user") turns.shift();
  return turns;
}
