"use client";

import { useEffect, useState } from "react";
import type { MultipleChoiceData } from "@/lib/content";
import { useProgress } from "@/lib/progress";

export function MultipleChoice({
  data,
  index,
}: {
  data: MultipleChoiceData;
  index: number;
}) {
  const { isCompleted, markCompleted } = useProgress();
  const alreadyDone = isCompleted(data.id);
  const correctIndex = data.options.findIndex((o) => o.correct);

  const [selected, setSelected] = useState<number | null>(
    alreadyDone ? correctIndex : null,
  );
  const [submitted, setSubmitted] = useState(alreadyDone);

  useEffect(() => {
    if (alreadyDone && !submitted) {
      setSelected(correctIndex);
      setSubmitted(true);
    }
  }, [alreadyDone, submitted, correctIndex]);

  const handleSubmit = () => {
    setSubmitted(true);
    if (selected === correctIndex) markCompleted(data.id);
  };

  const reset = () => {
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <div className="rounded-lg border border-ink-200 bg-white p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[11px] text-ink-500">
          Exercise {index + 1}
        </span>
        <span className="inline-flex items-center rounded-md border border-ink-300 bg-ink-100 px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase text-ink-700">
          knowledge
        </span>
      </div>

      <div className="text-[15px] text-ink-700 leading-relaxed mb-4">
        {data.question}
      </div>

      <div className="space-y-2 mb-4">
        {data.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === correctIndex;
          let style = "border-ink-200 bg-white hover:border-ink-300";
          if (submitted) {
            if (isCorrect) style = "border-emerald-300 bg-emerald-50";
            else if (isSelected) style = "border-red-300 bg-red-50";
            else style = "border-ink-100 bg-white opacity-50";
          } else if (isSelected) {
            style = "border-ink-700 bg-ink-50";
          }
          return (
            <button
              key={i}
              onClick={() => !submitted && setSelected(i)}
              disabled={submitted}
              className={`w-full text-left rounded-md border px-4 py-3 text-[14px] text-ink-700 leading-relaxed transition flex items-start gap-3 ${style}`}
            >
              <span className="font-mono text-[12px] text-ink-500 shrink-0 mt-0.5">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt.text}</span>
              {submitted && isCorrect ? (
                <span className="text-emerald-700 font-medium shrink-0">✓</span>
              ) : null}
              {submitted && isSelected && !isCorrect ? (
                <span className="text-red-700 font-medium shrink-0">✗</span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleSubmit}
          disabled={selected === null || submitted}
          className="rounded-md bg-ink-900 text-white px-3 py-2 text-[13px] font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ink-700 transition"
        >
          Submit
        </button>
        {submitted ? (
          <button
            onClick={reset}
            className="text-[13px] text-ink-500 hover:text-ink-900 underline underline-offset-2"
          >
            Try again
          </button>
        ) : null}
        {submitted ? (
          <span
            className={`text-[13px] font-medium ml-auto ${
              selected === correctIndex ? "text-emerald-700" : "text-ink-700"
            }`}
          >
            {selected === correctIndex ? "✓ Correct" : "Not quite"}
          </span>
        ) : null}
      </div>

      {submitted ? (
        <div className="mt-4 rounded-md bg-ink-50 border border-ink-200 p-4 text-[13px] text-ink-700 leading-relaxed">
          <div className="text-[10px] font-mono uppercase tracking-wider text-ink-500 mb-1">
            Why
          </div>
          {data.explanation}
        </div>
      ) : null}
    </div>
  );
}
