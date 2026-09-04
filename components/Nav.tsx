"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "@/lib/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 24);
        if (window.scrollY < window.innerHeight * 0.55) setActive("");
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const sections = nav
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        // While the hero still fills the screen, nothing should read as active.
        if (window.scrollY < window.innerHeight * 0.55) {
          setActive("");
          return;
        }
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-ink/72 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-20">
          {/* Wordmark */}
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label={`${profile.name} — back to top`}
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-acid/60 animate-[ping-ring_2.6s_var(--ease-out-expo)_infinite]" />
              <span className="relative size-2 rounded-full bg-acid" />
            </span>
            <span className="font-mono text-[13px] tracking-tight">
              <span className="text-bone">boris</span>
              <span className="text-faint">.mujkovic</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative rounded-full px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                    isActive
                      ? "text-bone"
                      : "text-faint hover:text-muted"
                  }`}
                >
                  <span
                    className={`mr-1.5 transition-colors duration-300 ${
                      isActive ? "text-acid" : "text-faint/50"
                    }`}
                  >
                    {item.index}
                  </span>
                  {item.label}
                  <span
                    className={`absolute inset-x-3 -bottom-px h-px origin-left bg-acid transition-transform duration-500 ease-out-expo ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="group relative hidden overflow-hidden border border-line-2 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone transition-colors duration-300 hover:border-acid sm:inline-block"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">
                Get in touch
              </span>
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-acid transition-transform duration-400 ease-out-expo group-hover:scale-y-100" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-9 flex-col items-center justify-center gap-[5px] border border-line md:hidden"
            >
              <span
                className={`h-px w-4 bg-bone transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-4 bg-bone transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Scroll progress rail */}
        <div
          className="h-px origin-left bg-gradient-to-r from-acid via-acid to-cobalt transition-none"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden
        />
      </header>

      {/* Mobile sheet */}
      <div
        // `inert` keeps the closed sheet out of the tab order and the a11y tree
        // — it stays mounted only so it can transition.
        inert={!open}
        className={`fixed inset-0 z-40 bg-ink/97 backdrop-blur-xl transition-opacity duration-400 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav
          className="container-x flex h-full flex-col justify-center gap-1"
          aria-label="Mobile"
        >
          {nav.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-line py-5 transition-transform duration-500 ease-out-expo"
              style={{
                transform: open ? "none" : "translateY(14px)",
                opacity: open ? 1 : 0,
                transitionDelay: `${open ? i * 55 + 90 : 0}ms`,
                transitionProperty: "transform, opacity",
              }}
            >
              <span className="font-mono text-[11px] text-acid">{item.index}</span>
              <span className="text-3xl font-medium tracking-tight text-bone">
                {item.label}
              </span>
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            onClick={() => setOpen(false)}
            className="mt-8 font-mono text-xs text-muted"
          >
            {profile.email}
          </a>
        </nav>
      </div>
    </>
  );
}
