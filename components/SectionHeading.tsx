import type { ReactNode } from "react";

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
};

export default function SectionHeading({ index, label, title, lead }: Props) {
  return (
    <header className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4">
        <div className="flex items-center gap-3" data-reveal>
          <span className="font-mono text-[11px] tracking-[0.2em] text-acid">
            {index}
          </span>
          <span className="h-px w-8 bg-line-2" />
          <span className="eyebrow">{label}</span>
        </div>
      </div>

      <div className="lg:col-span-8">
        <h2
          className="text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.035em] text-balance"
          data-reveal
          style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
        >
          {title}
        </h2>
        {lead ? (
          <p
            className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted"
            data-reveal
            style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
          >
            {lead}
          </p>
        ) : null}
      </div>
    </header>
  );
}
