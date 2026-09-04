# Boris Mujkovic — Personal Site

A single-page professional site: dark, grid-driven, one acid signal colour.
Built with Next.js 16 (App Router), React 19 and Tailwind CSS v4.

## Run it

```bash
npm install
cp .env.example .env   # then paste your OpenRouter key
npm run dev            # http://localhost:3000
```

The Digital Twin chat needs `OPENROUTER_API_KEY` in `.env`. Without it the rest
of the site works normally and the chat returns a clear "not configured" error.

```bash
npm run build && npm run start   # production build
npm run typecheck                # tsc --noEmit
```

## Where things live

| Path                   | What it is                                                        |
| ---------------------- | ----------------------------------------------------------------- |
| `lib/content.ts`       | **All copy and data.** Edit here — every section reads from it.    |
| `app/globals.css`      | Design tokens, background system, reveal/motion, card primitives.  |
| `app/layout.tsx`       | Fonts, metadata, JSON-LD, the pre-paint `.js` gate.                |
| `components/`          | One file per section, plus `Nav` and `MotionRoot`.                 |
| `app/icon.svg`         | Favicon.                                                           |
| `lib/twin.ts`          | Digital Twin system prompt, built from `content.ts`.               |
| `app/api/chat/route.ts`| Streaming OpenRouter proxy. The API key never leaves the server.   |
| `components/Twin.tsx`  | The chat UI.                                                       |

## How it's put together

- **Sections are server components.** A single client component,
  `components/MotionRoot.tsx`, drives every interaction: scroll-reveal
  (`IntersectionObserver` over `[data-reveal]`), the cursor light on cards
  (`--mx` / `--my`), and scroll progress. No animation library.
- **Reveals are gated behind `.js`** on `<html>`, set by an inline script before
  first paint. With JavaScript disabled the whole page renders fully visible
  rather than blank.
- **`prefers-reduced-motion` is honoured** — reveals resolve immediately and
  ambient animation is cut.
- **Design tokens** are Tailwind v4 `@theme` variables (`ink`, `bone`, `acid`,
  `line`, …), so colours and easing are changed in one place.

## The Digital Twin

Section 05 is an AI chat that answers questions about the CV.

- **Model:** `openai/gpt-oss-120b` via OpenRouter. It is a *reasoning* model —
  each response streams `reasoning` deltas before `content`. The route forwards
  only `content`, and `reasoning: { effort: "low" }` keeps the thinking budget
  small so it does not eat into `max_tokens`.
- **Grounding:** `lib/twin.ts` compiles the entire system prompt from
  `lib/content.ts`. Update the CV data and the twin updates with it — there is
  no second copy of the facts. Left ungrounded this model invents employers and
  projects freely, so the dossier is doing real work.
- **Guardrails (all verified against the live model):** refuses employers not in
  the CV, deflects salary/notice questions to email, admits it is an AI when
  asked, declines prompt-injection and off-topic requests.
- **Server-side only:** the browser talks to `/api/chat`; the API key stays in
  the Node process and is never sent to the browser.
- **Streaming:** the route re-emits plain text deltas, flushing the decoder and
  any trailing SSE frame at the end so the last characters are never dropped.
- **Limits:** 12 requests/minute per IP, 12 messages of history, 2000 chars per
  message. The rate limiter is in-memory, so it resets on restart and is not
  shared across instances — put a real one in front if this is ever deployed
  behind more than one node.

## Updating the content

Almost everything is in `lib/content.ts`:

- `profile` — name, role, contact details, availability, tagline.
- `stats` — the four figures under the hero.
- `about` — narrative paragraphs and the profile spec sheet.
- `journey` — roles, dates, bullets and per-role stack.
- `projects` — the work cards.
- `stackGroups` — capability rows.
- `socials` — **the LinkedIn and GitHub URLs are placeholders.** Point them at
  your real profiles.

## Before deploying

1. Set the real `socials` URLs in `lib/content.ts`.
2. Change `metadataBase` in `app/layout.tsx` from `http://localhost:3000` to the
   live domain, and add an Open Graph image.
