import { profile, socials } from "@/lib/content";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-line py-28 lg:py-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="grid-field absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(100%_70%_at_50%_100%,transparent_5%,var(--color-ink)_72%)]" />
        <div className="absolute bottom-[-22rem] left-1/2 size-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,247,81,0.085),transparent_60%)] blur-2xl" />
      </div>

      <div className="container-x">
        <div className="flex items-center gap-3" data-reveal>
          <span className="font-mono text-[11px] tracking-[0.2em] text-acid">
            06
          </span>
          <span className="h-px w-8 bg-line-2" />
          <span className="eyebrow">Contact</span>
        </div>

        <h2
          className="mt-10 max-w-4xl text-[clamp(2.4rem,7vw,5.4rem)] font-medium leading-[0.94] tracking-[-0.042em]"
          data-reveal
          style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
        >
          Have something worth{" "}
          <span className="font-serif italic text-acid">building</span>?
        </h2>

        <p
          className="mt-8 max-w-xl text-[16px] leading-relaxed text-muted"
          data-reveal
          style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
        >
          {profile.availabilityNote}. Send the brief, the repo, or just the
          problem you&rsquo;re stuck on — I read everything and reply within a
          working day.
        </p>

        {/* primary email CTA */}
        <a
          href={`mailto:${profile.email}`}
          className="group mt-14 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-line-2 pb-6 transition-colors duration-500 hover:border-acid"
          data-reveal
          style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
        >
          <span className="text-[clamp(1.35rem,4.4vw,3rem)] font-medium tracking-[-0.035em] text-bone transition-colors duration-400 group-hover:text-acid">
            {profile.email}
          </span>
          <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.18em] text-faint transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-acid">
            Write to me →
          </span>
        </a>

        {/* detail grid */}
        <dl className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Phone", v: profile.phone, href: `tel:${profile.phoneHref}` },
            { k: "Based in", v: profile.location, href: undefined },
            { k: "Time zone", v: profile.timezone, href: undefined },
            {
              k: "Status",
              v: profile.available ? "Available" : "Booked",
              href: undefined,
              live: true,
            },
          ].map((item, i) => (
            <div
              key={item.k}
              className="edge-card group relative p-6"
              data-reveal
              style={{ "--reveal-delay": `${300 + i * 70}ms` } as React.CSSProperties}
            >
              <div className="ticks absolute inset-0" aria-hidden />
              <dt className="eyebrow">{item.k}</dt>
              <dd className="mt-3 flex items-center gap-2 text-[15px] tracking-tight text-bone">
                {"live" in item && item.live ? (
                  <span className="size-1.5 rounded-full bg-acid animate-[pulse-dot_2.2s_ease-in-out_infinite]" />
                ) : null}
                {item.href ? (
                  <a href={item.href} className="link-wipe hover:text-acid">
                    {item.v}
                  </a>
                ) : (
                  item.v
                )}
              </dd>
            </div>
          ))}
        </dl>

        {/* socials */}
        <ul
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3"
          data-reveal
          style={{ "--reveal-delay": "560ms" } as React.CSSProperties}
        >
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                className="link-wipe font-mono text-[11.5px] uppercase tracking-[0.16em] text-faint transition-colors duration-300 hover:text-bone"
              >
                {social.label}
                <span className="ml-2 normal-case tracking-normal text-faint/60">
                  {social.handle}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
