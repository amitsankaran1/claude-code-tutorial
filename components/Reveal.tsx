"use client";

import { useEffect, useState } from "react";
import type { RevealExerciseData } from "@/lib/content";
import { useProgress } from "@/lib/progress";

export function Reveal({
  data,
  index,
}: {
  data: RevealExerciseData;
  index: number;
}) {
  const { isCompleted, markCompleted } = useProgress();
  const done = isCompleted(data.id);
  const [revealed, setRevealed] = useState(done);

  useEffect(() => {
    if (done && !revealed) setRevealed(true);
  }, [done, revealed]);

  return (
    <div className="rounded-lg border border-ink-200 bg-white p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[11px] text-ink-500">
          Exercise {index + 1}
        </span>
        <span className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase text-blue-800">
          build
        </span>
      </div>

      <div className="text-[15px] text-ink-700 leading-relaxed mb-4">
        {data.task}
      </div>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="rounded-md border border-ink-300 bg-white px-3 py-2 text-[13px] text-ink-700 hover:bg-ink-50 transition"
        >
          Reveal a model answer
        </button>
      ) : (
        <>
          <div className="rounded-md bg-ink-50 border border-ink-200 p-4 text-[13px] text-ink-700 leading-relaxed whitespace-pre-line font-mono">
            {data.answer}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {!done ? (
              <button
                onClick={() => markCompleted(data.id)}
                className="rounded-md bg-ink-900 text-white px-3 py-2 text-[13px] font-medium hover:bg-ink-700 transition"
              >
                Mark complete
              </button>
            ) : (
              <span className="text-[13px] text-emerald-700 font-medium">
                ✓ Complete
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
