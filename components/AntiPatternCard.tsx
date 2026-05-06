import type { AntiPattern } from "@/lib/content";

export function AntiPatternCard({ anti }: { anti: AntiPattern }) {
  return (
    <article className="rounded-lg border border-orange-200 bg-orange-50/40 p-5">
      <h3 className="text-base font-semibold text-warn mb-3">{anti.trap}</h3>
      <dl className="space-y-2.5 text-[14px] leading-relaxed">
        <div>
          <dt className="text-[11px] font-mono uppercase tracking-wider text-ink-500 mb-0.5">
            Feels productive because
          </dt>
          <dd className="text-ink-700">{anti.feelsProductiveBecause}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-mono uppercase tracking-wider text-ink-500 mb-0.5">
            What's actually happening
          </dt>
          <dd className="text-ink-700">{anti.reality}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-mono uppercase tracking-wider text-ink-500 mb-0.5">
            Do this instead
          </dt>
          <dd className="text-ink-900 font-medium">{anti.doInstead}</dd>
        </div>
      </dl>
    </article>
  );
}
