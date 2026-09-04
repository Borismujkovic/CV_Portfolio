import { profile, stats } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden pt-28 pb-12 lg:pt-32"
    >
      {/* ---------- backdrop ---------- */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="grid-field absolute inset-0 opacity-70" />
        {/* fade the grid out toward the bottom */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_10%,var(--color-ink)_78%)]" />
        {/* acid bloom */}
        <div className="absolute -top-40 right-[-10%] size-[46rem] rounded-full bg-[radial-gradient(circle,rgba(200,247,81,0.09),transparent_62%)] blur-2xl animate-[float-slow_14s_ease-in-out_infinite]" />
        {/* cobalt counterweight */}
        <div className="absolute bottom-[-18rem] left-[-12%] size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(91,140,255,0.08),transparent_64%)] blur-2xl" />
      </div>

      {/* ---------- vertical edge label ---------- */}
      <div
        className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 xl:block"
        aria-hidden
      >
        <div className="flex origin-left -rotate-90 items-center gap-3 whitespace-nowrap">
          <span className="h-px w-10 bg-line-2" />
          <span className="eyebrow">
            {profile.location} — {profile.timezone}
          </span>
        </div>
      </div>

      <div className="container-x">
        {/* ---------- status row ---------- */}
        <div
          className="flex flex-wrap items-center justify-between gap-4"
          data-reveal
        >
          <div className="inline-flex items-center gap-2.5 border border-line bg-ink-2/60 px-3 py-1.5 backdrop-blur-sm">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 rounded-full bg-acid animate-[ping-ring_2.4s_ease-out_infinite]" />
              <span className="relative size-1.5 rounded-full bg-acid animate-[pulse-dot_2.4s_ease-in-out_infinite]" />
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
              {profile.availabilityNote}
            </span>
          </div>

          <span className="eyebrow hidden sm:block">
            {profile.role} / {profile.stackLine}
          </span>
        </div>

        {/* ---------- name ---------- */}
        <h1 className="mt-10 lg:mt-14">
          <span className="sr-only">
            {profile.name} — {profile.role}
          </span>
          <span
            aria-hidden
            className="block text-[clamp(3.6rem,13.6vw,11.5rem)] font-medium leading-[0.83] tracking-[-0.045em]"
          >
            <span
              className="block text-sweep"
              data-reveal
              style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
            >
              {profile.firstName}
            </span>
            <span
              className="mt-1 flex items-end gap-[0.14em] text-bone/92"
              data-reveal
              style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
            >
              {profile.lastName}
              <span className="mb-[0.18em] hidden h-px flex-1 bg-line-2 sm:block" />
              <span className="mb-[0.42em] hidden font-mono text-[11px] tracking-[0.2em] text-faint lg:block">
                EST. 2022
              </span>
            </span>
          </span>
        </h1>

        {/* ---------- tagline + intro ---------- */}
        <div className="mt-12 grid gap-10 border-t border-line pt-9 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <div
            className="lg:col-span-7"
            data-reveal
            style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
          >
            <p className="max-w-2xl text-[clamp(1.35rem,2.6vw,2.1rem)] font-medium leading-[1.18] tracking-[-0.025em] text-bone">
              {profile.tagline[0]}{" "}
              <span className="font-serif italic text-acid">
                {profile.tagline[1]}
              </span>
            </p>
          </div>

          <div
            className="flex flex-col justify-between gap-7 lg:col-span-5"
            data-reveal
            style={{ "--reveal-delay": "340ms" } as React.CSSProperties}
          >
            <p className="max-w-md text-[15px] leading-relaxed text-muted">
              {profile.intro}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="group relative overflow-hidden bg-acid px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink"
              >
                <span className="relative z-10 transition-colors duration-400 group-hover:text-acid">
                  View the work
                </span>
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink-3 transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
              </a>
              <a
                href="#contact"
                className="group border border-line-2 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors duration-300 hover:border-line-2 hover:text-bone"
              >
                Start a conversation
                <span className="ml-2 inline-block transition-transform duration-400 ease-out-expo group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ---------- stat strip ---------- */}
        <dl className="mt-14 grid grid-cols-2 border-t border-line lg:mt-20 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group relative flex flex-col-reverse gap-2.5 border-b border-line py-6 pr-4 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0"
              data-reveal
              style={
                { "--reveal-delay": `${420 + i * 70}ms` } as React.CSSProperties
              }
            >
              <dt className="eyebrow leading-snug">{stat.label}</dt>
              <dd className="font-mono text-[clamp(2rem,3.4vw,2.6rem)] leading-none tracking-tight text-bone transition-colors duration-400 group-hover:text-acid">
                {stat.value}
                <span className="text-acid">{stat.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
