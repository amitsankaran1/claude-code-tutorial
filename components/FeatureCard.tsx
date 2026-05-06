import type { Feature } from "@/lib/content";
import { Pill } from "./Pill";

function Field({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="text-[11px] font-mono uppercase tracking-wider text-ink-500 mb-1">
        {label}
      </div>
      <div className="text-[15px] text-ink-700 leading-relaxed">{body}</div>
    </div>
  );
}

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article
      id={feature.id}
      className="scroll-mt-8 rounded-lg border border-ink-100 bg-white p-6"
    >
      <header className="mb-4 flex flex-wrap items-center gap-3">
        <h3 className="text-lg font-semibold text-ink-900">{feature.name}</h3>
        <div className="flex flex-wrap gap-1.5">
          {feature.pills?.map((p, i) => (
            <Pill key={i} pill={p} />
          ))}
        </div>
      </header>

      <div className="space-y-4">
        <Field label="What it is" body={feature.what} />
        <Field label="When to reach for it" body={feature.whenToUse} />
        <Field label="When NOT to" body={feature.whenNotToUse} />
        <Field label="Smarter, not just faster" body={feature.smarterTip} />
        {feature.livesAt ? (
          <Field label="Where it lives" body={feature.livesAt} />
        ) : null}
        {feature.example ? (
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-ink-500 mb-1">
              Example
            </div>
            <pre className="rounded-md bg-ink-50 border border-ink-100 p-3 text-[13px] font-mono text-ink-900 overflow-x-auto whitespace-pre-wrap">
              {feature.example}
            </pre>
          </div>
        ) : null}
      </div>
    </article>
  );
}
