import SectionHeading from "./SectionHeading";
import { stackGroups } from "@/lib/content";

export default function Stack() {
  return (
    <section
      id="stack"
      className="relative scroll-mt-24 border-t border-line bg-ink-2/30 py-28 lg:py-40"
    >
      <div className="container-x">
        <SectionHeading
          index="02"
          label="Capabilities"
          title={
            <>
              The toolkit, and the{" "}
              <span className="font-serif italic text-acid">judgement</span> for
              when to reach for it.
            </>
          }
        />

        <div className="mt-16 lg:mt-20">
          {stackGroups.map((group, i) => (
            <div
              key={group.label}
              className="group grid gap-5 border-t border-line py-8 lg:grid-cols-12 lg:gap-12"
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-faint transition-colors duration-500 group-hover:text-acid">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[17px] font-medium tracking-tight text-bone">
                    {group.label}
                  </h3>
                </div>
                <p className="mt-2 max-w-xs pl-[1.4375rem] text-[13.5px] leading-relaxed text-faint">
                  {group.note}
                </p>
              </div>

              <ul className="flex flex-wrap gap-2.5 self-center lg:col-span-8">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex-1 basis-30 border border-line bg-ink/40 px-3.5 py-2.5 text-center text-[13.5px] text-bone/78 transition-all duration-400 ease-out-expo hover:-translate-y-0.5 hover:border-acid/40 hover:bg-acid/6 hover:text-bone"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="border-t border-line" />
        </div>

        {/* ---------- working principles ---------- */}
        <div className="mt-20 grid gap-px border border-line bg-line md:grid-cols-3">
          {[
            {
              k: "Own it end to end",
              v: "UI design, API contract, data model, production support. The person who built it should be the person who understands it at 2am.",
            },
            {
              k: "Test what matters",
              v: "Jest and E2E coverage on the paths that carry money, auth and state — so refactoring stays a normal Tuesday rather than a risk.",
            },
            {
              k: "AI with a review gate",
              v: "Claude, Copilot and Cursor accelerate generation, refactoring and docs. Every generated line is read and validated before it merges.",
            },
          ].map((item, i) => (
            <div
              key={item.k}
              className="edge-card group relative p-7 lg:p-8"
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <div className="ticks absolute inset-0" aria-hidden />
              <span className="eyebrow">Principle {String(i + 1).padStart(2, "0")}</span>
              <h4 className="mt-4 text-[18px] font-medium tracking-[-0.02em] text-bone">
                {item.k}
              </h4>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">
                {item.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
