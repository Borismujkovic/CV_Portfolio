import SectionHeading from "./SectionHeading";
import { about } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-28 lg:py-40">
      <div className="container-x">
        <SectionHeading
          index="01"
          label="About"
          title={
            <>
              Features owned{" "}
              <span className="font-serif italic text-acid">end to end</span> —
              from the first wireframe to production support.
            </>
          }
        />

        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* narrative */}
          <div className="space-y-6 lg:col-span-7">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`leading-relaxed ${
                  i === 0
                    ? "text-[17px] text-bone/90 lg:text-[19px]"
                    : "text-[15px] text-muted"
                }`}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                {p}
              </p>
            ))}

            <div
              className="!mt-10 border-l-2 border-acid/70 pl-6"
              data-reveal
              style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
            >
              <p className="font-serif text-[22px] italic leading-snug text-bone lg:text-[26px]">
                “Clean, maintainable, well-tested code isn&rsquo;t a phase at the
                end of a sprint. It&rsquo;s the only way the next feature stays
                cheap.”
              </p>
            </div>
          </div>

          {/* spec sheet */}
          <aside className="lg:col-span-5">
            <div
              className="group relative border border-line bg-ink-2/50 p-7 backdrop-blur-sm"
              data-reveal
              style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
            >
              <div className="ticks absolute inset-0" aria-hidden />

              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="eyebrow">Profile</span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-faint">
                  REF / BM-2026
                </span>
              </div>

              <dl className="mt-2 divide-y divide-line">
                {about.facts.map((fact) => (
                  <div key={fact.k} className="grid grid-cols-3 gap-4 py-4">
                    <dt className="eyebrow pt-0.5">{fact.k}</dt>
                    <dd className="col-span-2 text-[14px] leading-snug text-bone/90">
                      {fact.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
