import SectionHeading from "./SectionHeading";
// `profile` is only needed by the commented-out portfolio card at the bottom
// of this file — restore it together with that card.
// import { profile } from "@/lib/content";
import { projects } from "@/lib/content";

export default function Work() {
  return (
    <section id="work" className="relative scroll-mt-24 py-28 lg:py-40">
      <div className="container-x">
        <SectionHeading
          index="03"
          label="Selected work"
          title={
            <>
              Platforms built for{" "}
              <span className="font-serif italic text-acid">real users</span>,
              real money and real load.
            </>
          }
          lead="These are client projects, so there are no public links — the live products and the code belong to the companies they were built for. What follows is what the work actually involved."
        />

        {/* An odd number of cards would leave a lit empty cell in the last row,
            so a trailing odd card stretches across both columns. This resolves
            itself either way — no change needed when card 04 comes back. */}
        <div className="mt-16 grid gap-px border border-line bg-line lg:mt-20 lg:grid-cols-2 lg:[&>article:last-child:nth-child(odd)]:col-span-2">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className="edge-card group relative flex flex-col p-7 lg:p-9"
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <div className="ticks absolute inset-0" aria-hidden />

              <div className="flex items-start justify-between gap-6">
                <span className="font-mono text-[11px] tracking-[0.2em] text-acid">
                  {project.index}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                    {project.year}
                  </span>
                  <span
                    className={`border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em] ${
                      project.status === "shipped"
                        ? "border-acid/30 bg-acid/8 text-acid"
                        : "border-line-2 text-muted"
                    }`}
                  >
                    {project.status === "shipped" ? "Shipped" : "Internal"}
                  </span>
                </div>
              </div>

              <h3 className="mt-7 text-[clamp(1.4rem,2.4vw,1.9rem)] font-medium leading-tight tracking-[-0.03em] text-bone">
                {project.title}
              </h3>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-acid-dim">
                {project.category}
              </p>

              <p className="mt-5 text-[15px] leading-relaxed text-bone/78">
                {project.blurb}
              </p>

              <ul className="mt-6 space-y-3 border-t border-line pt-6">
                {project.points.map((point, pi) => (
                  <li key={pi} className="flex gap-3.5">
                    <span
                      className="mt-[0.6em] size-1 shrink-0 rounded-full bg-faint transition-colors duration-500 group-hover:bg-acid"
                      aria-hidden
                    />
                    <span className="text-[14px] leading-relaxed text-muted">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="border border-line px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint transition-colors duration-400 group-hover:border-line-2 group-hover:text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          {/* ---------- portfolio placeholder — card 04 ----------------------
              PARKED until the full portfolio is ready. To bring it back:
                1. Delete the opening comment marker above this block and the
                   closing one after </article>.
                2. Uncomment the `profile` import at the top of this file.
              The inner div below is a wireframe skeleton standing in for the
              case-study layout. (Its annotation lives here rather than inline
              because JSX comments cannot be nested.)

          <article
            className="edge-card group relative flex flex-col overflow-hidden p-7 lg:p-9"
            data-reveal
            style={{ "--reveal-delay": "270ms" } as React.CSSProperties}
          >
            <div className="ticks absolute inset-0" aria-hidden />
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-45"
              aria-hidden
            >
              <div className="grid-field absolute inset-0" />
            </div>

            <div className="flex items-start justify-between gap-6">
              <span className="font-mono text-[11px] tracking-[0.2em] text-faint">
                04
              </span>
              <span className="border border-dashed border-line-2 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">
                In progress
              </span>
            </div>

            <div className="mt-10 space-y-3" aria-hidden>
              {[
                ["w-1/3", "h-24"],
                ["w-2/3", "h-2"],
                ["w-1/2", "h-2"],
                ["w-5/6", "h-2"],
                ["w-2/5", "h-2"],
              ].map(([w, h], si) => (
                <div
                  key={si}
                  className={`${w} ${h} border border-dashed border-line-2/60 bg-bone/2`}
                  style={{
                    animation: `fade-pulse ${3 + si * 0.35}s ease-in-out ${si * 0.18}s infinite`,
                  }}
                />
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-[clamp(1.4rem,2.4vw,1.9rem)] font-medium leading-tight tracking-[-0.03em] text-bone/55">
                Full portfolio
                <span className="ml-1 inline-block text-acid animate-[fade-pulse_1.4s_ease-in-out_infinite]">
                  _
                </span>
              </h3>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">
                Deep-dive case studies — architecture decisions, trade-offs and
                measured outcomes — are being written up now. This slot is
                reserved for them.
              </p>

              <a
                href={`mailto:${profile.email}?subject=Portfolio%20request`}
                className="mt-8 inline-flex items-center gap-3 border-b border-line-2 pb-1 font-mono text-[11px] uppercase tracking-[0.16em] text-bone transition-colors duration-300 hover:border-acid hover:text-acid"
              >
                Request early access
                <span className="transition-transform duration-400 ease-out-expo group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </article>

          ---------- end portfolio placeholder ---------- */}
        </div>
      </div>
    </section>
  );
}
