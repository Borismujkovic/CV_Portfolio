import { SYSTEM_PROMPT, TWIN_MODEL } from "@/lib/twin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

/* ---------------- limits ---------------- */
const MAX_TURNS = 12; // messages of history kept
const MAX_CHARS_PER_MESSAGE = 2000;
const MAX_TOTAL_CHARS = 12_000;
const MAX_TOKENS = 800; // must cover reasoning + answer for gpt-oss
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 12;

type ChatMessage = { role: "user" | "assistant"; content: string };

/**
 * Per-process rate limit. Good enough for a single instance; it resets on
 * restart and is not shared across instances.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
    }
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "local";
}

function bad(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

function parseMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input) || input.length === 0) return null;

  const cleaned: ChatMessage[] = [];
  for (const raw of input.slice(-MAX_TURNS)) {
    if (typeof raw !== "object" || raw === null) return null;
    const { role, content } = raw as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const trimmed = content.trim();
    if (!trimmed) continue;
    cleaned.push({ role, content: trimmed.slice(0, MAX_CHARS_PER_MESSAGE) });
  }

  if (cleaned.length === 0) return null;
  if (cleaned.at(-1)?.role !== "user") return null;

  const total = cleaned.reduce((n, m) => n + m.content.length, 0);
  if (total > MAX_TOTAL_CHARS) return null;

  return cleaned;
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return bad("The chat is not configured: OPENROUTER_API_KEY is missing.", 503);
  }

  if (rateLimited(clientIp(req))) {
    return bad("Too many messages in a short window. Give it a minute.", 429);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid JSON body.", 400);
  }

  const messages = parseMessages((body as { messages?: unknown })?.messages);
  if (!messages) return bad("Invalid or empty messages.", 400);

  let upstream: Response;
  try {
    upstream = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // Header values must be Latin-1, so keep this ASCII-only.
        "X-Title": "Boris Mujkovic Digital Twin",
      },
      body: JSON.stringify({
        model: TWIN_MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
        temperature: 0.4,
        max_tokens: MAX_TOKENS,
        // gpt-oss is a reasoning model; keep the thinking budget small so the
        // answer itself is not truncated by max_tokens.
        reasoning: { effort: "low" },
      }),
      signal: AbortSignal.timeout(60_000),
    });
  } catch (error) {
    console.error("OpenRouter fetch failed", error);
    return bad("Could not reach the model provider.", 502);
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error("OpenRouter error", upstream.status, detail.slice(0, 500));
    return bad(
      upstream.status === 401
        ? "The OpenRouter API key was rejected."
        : "The model provider returned an error.",
      upstream.status === 401 ? 401 : 502
    );
  }

  /* Re-emit only the assistant's visible text. The upstream SSE also carries
     `reasoning` deltas and heartbeat comments, which must not reach the page. */
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();

      const emit = (line: string) => {
        if (!line.startsWith("data:")) return; // skips ": PROCESSING" comments
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") return;
        try {
          const json = JSON.parse(payload);
          const text = json?.choices?.[0]?.delta?.content;
          if (typeof text === "string" && text.length > 0) {
            controller.enqueue(encoder.encode(text));
          }
        } catch {
          // partial or non-JSON frame — ignore
        }
      };

      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) emit(line);
        }

        // Flush: the last frame may arrive without a trailing newline, and the
        // decoder may still hold a partial multi-byte character. Dropping
        // either truncates the end of the answer.
        buffer += decoder.decode();
        if (buffer.trim()) emit(buffer.trim());
      } catch (error) {
        console.error("stream error", error);
      } finally {
        controller.close();
        reader.releaseLock();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
