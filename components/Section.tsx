import type { ReactNode } from "react";

export function Section({
  id,
  number,
  title,
  intro,
  children,
  complete = false,
}: {
  id: string;
  number: string;
  title: string;
  intro?: string;
  children: ReactNode;
  complete?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-8 border-t border-ink-100 pt-12 pb-4">
      <div className="mb-6">
        <div className="text-xs font-mono text-ink-500 mb-2 flex items-center gap-2">
          <span>{number}</span>
          {complete ? (
            <span className="text-emerald-600 font-medium">✓ Complete</span>
          ) : null}
        </div>
        <h2 className="text-2xl font-semibold text-ink-900 tracking-tight">
          {title}
        </h2>
        {intro ? (
          <p className="mt-3 text-ink-700 leading-relaxed max-w-prose">
            {intro}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
