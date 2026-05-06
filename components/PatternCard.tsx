import type { Pattern } from "@/lib/content";

export function PatternCard({ pattern }: { pattern: Pattern }) {
  return (
    <article className="rounded-lg border border-ink-100 bg-white p-5">
      <h3 className="text-base font-semibold text-ink-900 mb-3">
        {pattern.title}
      </h3>
      <dl className="space-y-2.5 text-[14px] leading-relaxed">
        <div className="flex gap-3">
          <dt className="w-20 shrink-0 text-[11px] font-mono uppercase tracking-wider text-ink-500 pt-0.5">
            Trigger
          </dt>
          <dd className="text-ink-700">{pattern.trigger}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="w-20 shrink-0 text-[11px] font-mono uppercase tracking-wider text-ink-500 pt-0.5">
            Pattern
          </dt>
          <dd className="text-ink-700">{pattern.pattern}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="w-20 shrink-0 text-[11px] font-mono uppercase tracking-wider text-ink-500 pt-0.5">
            Why
          </dt>
          <dd className="text-ink-700">{pattern.why}</dd>
        </div>
      </dl>
    </article>
  );
}
