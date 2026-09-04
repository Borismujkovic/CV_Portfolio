"use client";

import { useEffect } from "react";

/**
 * One client component drives every interaction on the page, so the sections
 * themselves stay server-rendered:
 *
 *  1. Scroll-reveal — observes any `[data-reveal]` / `[data-rule]` element.
 *  2. Cursor tracking — feeds `--mx` / `--my` to the nearest `.edge-card`.
 *  3. Scroll progress — writes `--scroll-progress` on <html>.
 */
export default function MotionRoot() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- 1. Reveal on scroll ---------- */
    const targets = document.querySelectorAll<HTMLElement>(
      "[data-reveal], [data-rule]"
    );

    if (reduced) {
      targets.forEach((el) => {
        el.setAttribute(
          el.hasAttribute("data-rule") ? "data-rule" : "data-reveal",
          "in"
        );
      });
    }

    const observer = reduced
      ? null
      : new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              const el = entry.target as HTMLElement;
              el.setAttribute(
                el.hasAttribute("data-rule") ? "data-rule" : "data-reveal",
                "in"
              );
              observer?.unobserve(el);
            }
          },
          { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
        );

    targets.forEach((el) => observer?.observe(el));

    /* ---------- 2. Cursor light on cards ---------- */
    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const target = event.target as HTMLElement | null;
        const card = target?.closest<HTMLElement>(".edge-card");
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };

    if (!reduced) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    /* ---------- 3. Scroll progress ---------- */
    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        document.documentElement.style.setProperty(
          "--scroll-progress",
          progress.toFixed(4)
        );
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
    };
  }, []);

  return null;
}
