import { marqueeItems } from "@/lib/content";

function Run() {
  /* Each run carries its own trailing gap, so two of them are exactly 2×
     the width of one — which makes translateX(-50%) seamless. */
  return (
    <ul className="flex shrink-0 items-center gap-10 pr-10">
      {marqueeItems.map((item) => (
        <li key={item} className="flex items-center gap-10">
          <span className="font-mono text-[12px] whitespace-nowrap uppercase tracking-[0.22em] text-muted transition-colors duration-300 hover:text-acid">
            {item}
          </span>
          <span className="text-acid/40">✦</span>
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <div
      className="relative flex overflow-hidden border-y border-line bg-ink-2/40 py-4"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent lg:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent lg:w-40" />

      <div className="marquee-track flex w-max">
        <Run />
        <Run />
      </div>
    </div>
  );
}
