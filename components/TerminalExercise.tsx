"use client";

import { useEffect, useState } from "react";
import type { TerminalExerciseData } from "@/lib/content";
import { useProgress } from "@/lib/progress";

function normalize(s: string) {
  return s.trim().replace(/\s+/g, " ").toLowerCase();
}

export function TerminalExercise({
  data,
  index,
}: {
  data: TerminalExerciseData;
  index: number;
}) {
  const prompt = data.prompt ?? "$ ";
  const { isCompleted, markCompleted } = useProgress();
  const alreadyDone = isCompleted(data.id);

  const [input, setInput] = useState("");
  const [state, setState] = useState<
    "idle" | "incorrect" | "correct" | "revealed"
  >(alreadyDone ? "correct" : "idle");
  const [attempts, setAttempts] = useState(0);
  const [hintIndex, setHintIndex] = useState(-1);

  useEffect(() => {
    if (alreadyDone && state === "idle") {
      setState("correct");
      setInput(data.expected[0]!);
    }
  }, [alreadyDone, state, data.expected]);

  const locked = state === "correct" || state === "revealed";

  const submit = () => {
    if (locked || !input.trim()) return;
    const norm = normalize(input);
    const ok = data.expected.some((e) => normalize(e) === norm);
    if (ok) {
      setState("correct");
      markCompleted(data.id);
    } else {
      setAttempts((a) => a + 1);
      setState("incorrect");
    }
  };

  const showHint = () => {
    if (data.hints && hintIndex < data.hints.length - 1) {
      setHintIndex((i) => i + 1);
    }
  };

  const reveal = () => {
    setInput(data.expected[0]!);
    setState("revealed");
    markCompleted(data.id);
  };

  const reset = () => {
    setInput("");
    setState("idle");
    setAttempts(0);
    setHintIndex(-1);
  };

  return (
    <div className="rounded-lg border border-ink-200 bg-white p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[11px] text-ink-500">
          Exercise {index + 1}
        </span>
        <span className="inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase text-emerald-800">
          skills
        </span>
      </div>

      <div className="text-[15px] text-ink-700 leading-relaxed mb-3">
        {data.task}
      </div>

      <div className="rounded-md bg-ink-900 text-ink-50 p-4 font-mono text-[13px] leading-relaxed overflow-x-auto">
        {data.history?.map((h, i) => (
          <div key={i}>
            <div>
              <span className="text-emerald-400">{prompt}</span>
              {h.line}
            </div>
            {h.output ? (
              <div className="text-ink-300 whitespace-pre-wrap">{h.output}</div>
            ) : null}
          </div>
        ))}
        <div className="flex items-baseline gap-1.5">
          <span className="text-emerald-400 select-none shrink-0">
            {prompt.trim() || "▎"}
          </span>
          <input
            type="text"
            className="flex-1 min-w-0 bg-transparent outline-none caret-emerald-400 placeholder:text-ink-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
            placeholder={locked ? "" : "type here, press Enter…"}
            disabled={locked}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
          />
        </div>
        {state === "correct" && data.successOutput ? (
          <div className="text-emerald-300 mt-1 whitespace-pre-wrap">
            {data.successOutput}
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          onClick={submit}
          disabled={locked || !input.trim()}
          className="rounded-md bg-ink-900 text-white px-3 py-2 text-[13px] font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ink-700 transition"
        >
          Run
        </button>
        {!locked && data.hints && data.hints.length > 0 ? (
          <button
            onClick={showHint}
            disabled={hintIndex >= data.hints.length - 1}
            className="rounded-md border border-ink-300 bg-white px-3 py-2 text-[13px] text-ink-700 hover:bg-ink-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {hintIndex < 0 ? "Hint" : "Next hint"}
          </button>
        ) : null}
        {!locked && attempts >= 2 ? (
          <button
            onClick={reveal}
            className="text-[13px] text-ink-500 hover:text-ink-900 underline underline-offset-2"
          >
            Show answer
          </button>
        ) : null}
        {locked ? (
          <button
            onClick={reset}
            className="text-[13px] text-ink-500 hover:text-ink-900 underline underline-offset-2"
          >
            Reset
          </button>
        ) : null}
        {state === "correct" ? (
          <span className="text-[13px] text-emerald-700 font-medium ml-auto">
            ✓ Correct
          </span>
        ) : null}
        {state === "revealed" ? (
          <span className="text-[13px] text-ink-500 ml-auto">
            Answer revealed
          </span>
        ) : null}
      </div>

      {hintIndex >= 0 && state !== "correct" ? (
        <div className="mt-3 rounded-md bg-amber-50 border border-amber-200 p-3 text-[13px] text-ink-700 leading-relaxed">
          <span className="font-mono text-[10px] text-amber-700 uppercase tracking-wider mr-2">
            Hint {hintIndex + 1} / {data.hints!.length}
          </span>
          {data.hints![hintIndex]}
        </div>
      ) : null}

      {state === "incorrect" && hintIndex < 0 ? (
        <div className="mt-3 text-[13px] text-ink-500">
          Not quite — try again. Hit <span className="font-mono">Hint</span> if
          you're stuck.
        </div>
      ) : null}
    </div>
  );
}
