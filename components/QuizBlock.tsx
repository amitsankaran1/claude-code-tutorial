import type { ReactNode } from "react";
import type { QuizQuestion } from "@/lib/content";

function renderInline(text: string): ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={i}
          className="font-mono text-[13px] bg-ink-100 text-ink-900 px-1 py-0.5 rounded"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function QuizBlock({ questions }: { questions?: QuizQuestion[] }) {
  if (!questions || questions.length === 0) return null;
  return (
    <div className="mt-6 rounded-lg border border-dashed border-ink-300 bg-ink-50/50 p-5">
      <div className="text-[11px] font-mono uppercase tracking-wider text-ink-500 mb-4">
        Check yourself
      </div>
      <ol className="space-y-5">
        {questions.map((q, i) => (
          <li key={i}>
            <div className="flex items-start gap-2">
              <span
                className={`shrink-0 mt-[3px] inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase ${
                  q.type === "skills"
                    ? "bg-blue-50 text-blue-800 border-blue-200"
                    : "bg-ink-100 text-ink-700 border-ink-300"
                }`}
              >
                {q.type}
              </span>
              <span className="text-[15px] text-ink-700 leading-relaxed">
                {renderInline(q.q)}
              </span>
            </div>
            <details className="mt-2 ml-[3.25rem]">
              <summary className="text-[12px] text-ink-500 hover:text-ink-900">
                Reveal answer
              </summary>
              <div className="mt-2 text-[14px] text-ink-700 leading-relaxed">
                {renderInline(q.a)}
              </div>
            </details>
          </li>
        ))}
      </ol>
    </div>
  );
}
