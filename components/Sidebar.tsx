"use client";

import { useEffect, useState } from "react";
import { NAV_ENTRIES } from "@/lib/content";
import { useProgress } from "@/lib/progress";

export function Sidebar() {
  const [active, setActive] = useState<string>(NAV_ENTRIES[0]!.id);
  const { sectionStatus, ready, completedCount, totalExercises, resetAll } =
    useProgress();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    NAV_ENTRIES.forEach((e) => {
      const el = document.getElementById(e.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const onReset = () => {
    if (confirm("Reset all progress? This will re-lock every section.")) {
      resetAll();
    }
  };

  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen overflow-y-auto py-12 pl-8 pr-4 border-r border-ink-100">
      <div className="text-[11px] font-mono uppercase tracking-wider text-ink-500 mb-4">
        Claude Code · TUI
      </div>
      <nav>
        <ul className="space-y-1">
          {NAV_ENTRIES.map((entry) => {
            const status = sectionStatus(entry.id);
            const isActive = active === entry.id;
            const isLocked = status === "locked";
            const isComplete = status === "complete";

            const baseClass = isActive
              ? "bg-ink-100 text-ink-900 font-medium"
              : isLocked
                ? "text-ink-400 cursor-default"
                : "text-ink-700 hover:text-ink-900 hover:bg-ink-50";

            return (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  className={`flex items-baseline gap-2 rounded-md px-2 py-1.5 text-[13px] transition ${baseClass}`}
                >
                  <span
                    className={`font-mono text-[11px] tabular-nums shrink-0 ${
                      isLocked ? "text-ink-400" : "text-ink-500"
                    }`}
                  >
                    {entry.number}
                  </span>
                  <span className="flex-1 truncate">{entry.label}</span>
                  {isLocked ? (
                    <span className="text-ink-400 text-[11px]" aria-hidden>
                      🔒
                    </span>
                  ) : isComplete ? (
                    <span
                      className="text-emerald-600 text-[11px] font-medium"
                      aria-hidden
                    >
                      ✓
                    </span>
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-6 pt-4 border-t border-ink-100 text-[11px] text-ink-500 leading-relaxed">
        {ready ? (
          <>
            <div>
              Progress: {completedCount} / {totalExercises} exercises
            </div>
            <button
              onClick={onReset}
              className="mt-2 text-[11px] text-ink-500 hover:text-ink-900 underline decoration-ink-300 underline-offset-2"
            >
              Reset progress
            </button>
          </>
        ) : null}
      </div>
    </aside>
  );
}
