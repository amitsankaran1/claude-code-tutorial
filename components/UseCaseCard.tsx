import type { UseCase } from "@/lib/content";

export function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <article className="rounded-lg border border-ink-100 bg-white p-5 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-ink-900 mb-1">
        {useCase.title}
      </h3>

      <div className="mt-3 mb-4">
        <div className="text-[11px] font-mono uppercase tracking-wider text-ink-500 mb-1">
          Situation
        </div>
        <p className="text-[15px] text-ink-700 leading-relaxed">
          {useCase.situation}
        </p>
      </div>

      <div className="mb-4">
        <div className="text-[11px] font-mono uppercase tracking-wider text-ink-500 mb-1">
          Primitives used
        </div>
        <div className="flex flex-wrap gap-1.5">
          {useCase.primitives.map((p, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-md border border-ink-300 bg-ink-50 px-2 py-0.5 text-[12px] font-mono text-ink-700"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[11px] font-mono uppercase tracking-wider text-ink-500 mb-2">
          Steps
        </div>
        <ol className="list-decimal pl-5 space-y-1.5 text-[15px] text-ink-700 leading-relaxed marker:text-ink-500">
          {useCase.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
    </article>
  );
}
