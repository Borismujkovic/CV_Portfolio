import { nav, profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2/40">
      <div className="container-x">
        {/* oversized wordmark */}
        <div className="overflow-hidden py-10 lg:py-14">
          <p
            className="select-none text-center text-[clamp(2.6rem,13.5vw,12rem)] font-medium leading-[0.8] tracking-[-0.05em] text-bone/6"
            aria-hidden
          >
            MUJKOVIC
          </p>
        </div>

        <div className="flex flex-col gap-6 border-t border-line py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="size-1.5 rounded-full bg-acid animate-[pulse-dot_2.4s_ease-in-out_infinite]" />
            <p className="font-mono text-[11px] tracking-[0.14em] text-faint">
              © {new Date().getFullYear()} {profile.name.toUpperCase()} — ALL
              RIGHTS RESERVED
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="link-wipe font-mono text-[11px] uppercase tracking-[0.16em] text-faint transition-colors duration-300 hover:text-bone"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
