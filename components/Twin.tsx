"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import { profile } from "@/lib/content";
import { SUGGESTED_QUESTIONS } from "@/lib/twin";

type Message = { role: "user" | "assistant"; content: string };

const GREETING =
  "I'm the digital twin of Boris — an AI trained on his CV. Ask about his experience, the platforms he's shipped, or how he works.";

export default function Twin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /* Keep the newest message in view while text streams in. */
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(question: string) {
    const text = question.trim();
    if (!text || streaming) return;

    setError(null);
    setInput("");

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const detail = await res
          .json()
          .then((d) => d?.error as string | undefined)
          .catch(() => undefined);
        throw new Error(detail ?? "The twin is unavailable right now.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: answer }]);
      }

      // Flush any partial multi-byte character still held by the decoder.
      const tail = decoder.decode();
      if (tail) {
        answer += tail;
        setMessages([...next, { role: "assistant", content: answer }]);
      }

      if (!answer.trim()) {
        throw new Error("The twin returned an empty answer. Try rephrasing.");
      }
    } catch (err) {
      if ((err as Error)?.name === "AbortError") {
        // user pressed stop — keep whatever streamed in
      } else {
        setMessages(next);
        setError((err as Error).message || "Something went wrong.");
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  }

  const started = messages.length > 0;

  return (
    <section
      id="twin"
      className="relative scroll-mt-24 py-28 lg:py-40"
    >
      <div className="container-x">
        <SectionHeading
          index="05"
          label="Digital twin"
          title={
            <>
              Ask my{" "}
              <span className="font-serif italic text-acid">digital twin</span>{" "}
              anything about the work.
            </>
          }
          lead="An AI trained on my CV, answering in my voice. It only knows what's on this page — for anything else, email me."
        />

        <div
          className="mt-14 lg:mt-16"
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          <div className="group relative border border-line bg-ink/60 backdrop-blur-sm">
            <div className="ticks absolute inset-0 z-10" aria-hidden />

            {/* ---------- title bar ---------- */}
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="relative flex size-1.5">
                  <span
                    className={`absolute inset-0 rounded-full bg-acid ${
                      streaming ? "animate-[ping-ring_1.4s_ease-out_infinite]" : ""
                    }`}
                  />
                  <span className="relative size-1.5 rounded-full bg-acid" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone">
                  Digital twin
                </span>
                <span className="font-mono text-[10px] tracking-[0.14em] text-faint">
                  {streaming ? "· THINKING" : "· ONLINE"}
                </span>
              </div>
              {started ? (
                <button
                  type="button"
                  onClick={() => {
                    abortRef.current?.abort();
                    setMessages([]);
                    setError(null);
                    inputRef.current?.focus();
                  }}
                  className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint transition-colors duration-300 hover:text-acid"
                >
                  Clear
                </button>
              ) : null}
            </div>

            {/* ---------- transcript ---------- */}
            <div
              ref={logRef}
              className="max-h-[26rem] min-h-[15rem] space-y-5 overflow-y-auto px-5 py-6 lg:px-7"
              aria-live="polite"
              aria-atomic="false"
              aria-label="Conversation with the digital twin"
            >
              <Bubble role="assistant" content={GREETING} />

              {messages.map((m, i) => (
                <Bubble
                  key={i}
                  role={m.role}
                  content={m.content}
                  pending={
                    streaming && i === messages.length - 1 && m.role === "assistant"
                  }
                />
              ))}

              {error ? (
                <p
                  role="alert"
                  className="border border-red-500/30 bg-red-500/8 px-4 py-3 text-[13.5px] leading-relaxed text-red-200/90"
                >
                  {error}
                </p>
              ) : null}
            </div>

            {/* ---------- suggestions ---------- */}
            {!started ? (
              <div className="flex flex-wrap gap-2 border-t border-line px-5 py-4 lg:px-7">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => void send(q)}
                    className="border border-line bg-ink/40 px-3 py-1.5 text-left text-[12.5px] text-muted transition-all duration-400 ease-out-expo hover:-translate-y-0.5 hover:border-acid/40 hover:text-bone"
                  >
                    {q}
                  </button>
                ))}
              </div>
            ) : null}

            {/* ---------- composer ---------- */}
            <div className="flex items-end gap-3 border-t border-line px-5 py-4 lg:px-7">
              <label htmlFor="twin-input" className="sr-only">
                Ask the digital twin a question
              </label>
              <textarea
                id="twin-input"
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = Math.min(el.scrollHeight, 128) + "px";
                }}
                onKeyDown={onKeyDown}
                maxLength={2000}
                placeholder="Ask me anything…"
                className="max-h-32 min-h-[2.5rem] flex-1 resize-none bg-transparent py-2 text-[14.5px] leading-relaxed text-bone placeholder:text-faint focus:outline-none"
              />

              {streaming ? (
                <button
                  type="button"
                  onClick={() => abortRef.current?.abort()}
                  className="shrink-0 border border-line-2 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors duration-300 hover:border-acid hover:text-acid"
                >
                  Stop
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void send(input)}
                  disabled={!input.trim()}
                  className="group/send relative shrink-0 overflow-hidden bg-acid px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-25"
                >
                  <span className="relative z-10 transition-colors duration-400 group-hover/send:text-acid">
                    Send
                  </span>
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink-3 transition-transform duration-500 ease-out-expo group-hover/send:scale-y-100" />
                </button>
              )}
            </div>
          </div>

          <p className="mt-4 max-w-2xl font-mono text-[10.5px] leading-relaxed tracking-[0.1em] text-faint uppercase">
            AI-generated · grounded in my CV · may be imprecise — confirm
            anything that matters at{" "}
            <a
              href={`mailto:${profile.email}`}
              className="link-wipe text-muted hover:text-acid"
            >
              {profile.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Bubble({
  role,
  content,
  pending,
}: {
  role: "user" | "assistant";
  content: string;
  pending?: boolean;
}) {
  const isUser = role === "user";

  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div className={`max-w-[85%] ${isUser ? "text-right" : ""}`}>
        <span className="eyebrow block">{isUser ? "You" : "Boris (AI)"}</span>
        <div
          className={`mt-2 whitespace-pre-wrap px-4 py-3 text-[14.5px] leading-relaxed ${
            isUser
              ? "border border-line-2 bg-ink-3/60 text-bone"
              : "border-l-2 border-acid/60 bg-bone/2 text-bone/88"
          }`}
        >
          {content}
          {pending ? (
            <span className="ml-0.5 inline-block animate-[fade-pulse_1.1s_ease-in-out_infinite] text-acid">
              ▍
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
