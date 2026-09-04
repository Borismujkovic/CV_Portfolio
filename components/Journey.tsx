import SectionHeading from "./SectionHeading";
import { journey } from "@/lib/content";

export default function Journey() {
  return (
    <section
      id="journey"
      className="relative scroll-mt-24 overflow-hidden border-t border-line bg-ink-2/30 py-28 lg:py-40"
    >
      {/* faint grid, fading out downward */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="grid-field absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-ink)_0%,transparent_22%,transparent_78%,var(--color-ink)_100%)]" />
      </div>

      <div className="container-x">
        <SectionHeading
          index="04"
          label="Career journey"
          title={
            <>
              Three years of{" "}
              <span className="font-serif italic text-acid">compounding</span>{" "}
              production experience.
            </>
          }
          lead="From front-end features on a real-time crypto platform to owning full-stack delivery inside a microservices architecture."
        />

        <ol className="relative mt-20 lg:mt-24">
          {/* continuous timeline rail behind the rows */}
          <span
            className="pointer-events-none absolute left-[3px] top-0 hidden h-full w-px bg-gradient-to-b from-acid/50 via-line-2 to-transparent lg:block"
            aria-hidden
          />

          {journey.map((role, i) => (
            <li
              key={role.company}
              className="group relative grid gap-6 border-t border-line py-10 lg:grid-cols-12 lg:gap-12 lg:py-14 lg:pl-10"
              data-reveal
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              {/* acid rule that grows across the row on hover */}
              <span
                className="absolute left-0 top-0 h-px w-0 bg-acid transition-[width] duration-700 ease-out-expo group-hover:w-full"
                aria-hidden
              />
              {/* node on the rail */}
              <span
                className="absolute -top-[3px] left-0 hidden size-[7px] rounded-full border border-line-2 bg-ink transition-colors duration-500 group-hover:border-acid group-hover:bg-acid lg:block"
                aria-hidden
              />

              {/* period */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-2">
                  <span className="font-mono text-[2rem] leading-none tracking-tight text-bone/25 transition-colors duration-500 group-hover:text-acid lg:text-[2.6rem]">
                    {role.end === "Present" ? "NOW" : role.end}
                  </span>
                  {role.current ? (
                    <span className="inline-flex items-center gap-1.5 border border-acid/30 bg-acid/8 px-2 py-0.5">
                      <span className="size-1 rounded-full bg-acid animate-[pulse-dot_2.2s_ease-in-out_infinite]" />
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-acid">
                        Current
                      </span>
                    </span>
                  ) : null}
                </div>
                <p className="eyebrow mt-3 lg:mt-4">{role.period}</p>
              </div>

              {/* detail */}
              <div className="lg:col-span-9">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="text-[clamp(1.35rem,2.4vw,1.9rem)] font-medium tracking-[-0.028em] text-bone">
                    {role.title}
                  </h3>
                  <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-acid-dim">
                    {role.company}
                  </span>
                </div>

                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
                  {role.summary}
                </p>

                <ul className="mt-7 space-y-3.5">
                  {role.points.map((point, pi) => (
                    <li key={pi} className="flex gap-4">
                      <span
                        className="mt-[0.62em] size-1 shrink-0 rounded-full bg-faint transition-colors duration-500 group-hover:bg-acid"
                        aria-hidden
                      />
                      <span className="max-w-3xl text-[14.5px] leading-relaxed text-bone/72">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {role.stack.map((tech) => (
                    <li
                      key={tech}
                      className="border border-line px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-faint transition-colors duration-400 group-hover:border-line-2 group-hover:text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="border-t border-line" />
      </div>
    </section>
  );
}
