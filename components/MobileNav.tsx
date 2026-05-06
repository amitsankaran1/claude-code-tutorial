"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_ENTRIES } from "@/lib/content";
import { useProgress } from "@/lib/progress";

export function MobileNav() {
  const [active, setActive] = useState<string>(NAV_ENTRIES[0]!.id);
  const listRef = useRef<HTMLUListElement>(null);
  const { sectionStatus } = useProgress();

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
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    NAV_ENTRIES.forEach((e) => {
      const el = document.getElementById(e.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const activeEl = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [active]);

  return (
    <div className="lg:hidden sticky top-0 z-20 bg-ink-50/95 backdrop-blur border-b border-ink-100">
      <div className="px-4 pt-3 pb-1 flex items-baseline justify-between">
        <div className="text-[11px] font-mono uppercase tracking-wider text-ink-500">
          Claude Code · TUI
        </div>
        <div className="text-[11px] font-mono text-ink-500">
          {NAV_ENTRIES.find((e) => e.id === active)?.number}
          {" / "}
          {NAV_ENTRIES.length.toString().padStart(2, "0")}
        </div>
      </div>
      <ul
        ref={listRef}
        className="flex gap-1 px-3 py-2 overflow-x-auto whitespace-nowrap scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {NAV_ENTRIES.map((entry) => {
          const status = sectionStatus(entry.id);
          const isActive = active === entry.id;
          const isLocked = status === "locked";
          const isComplete = status === "complete";

          const baseStyle = isActive
            ? "bg-ink-900 text-white border-ink-900"
            : isLocked
              ? "bg-ink-100 text-ink-400 border-ink-200"
              : "bg-white text-ink-700 border-ink-100";

          return (
            <li key={entry.id} data-id={entry.id} className="shrink-0">
              <a
                href={`#${entry.id}`}
                className={`inline-flex items-baseline gap-1.5 rounded-md border px-2.5 py-1.5 text-[12px] transition ${baseStyle}`}
              >
                <span
                  className={`font-mono text-[10px] tabular-nums ${
                    isActive
                      ? "text-white/70"
                      : isLocked
                        ? "text-ink-400"
                        : "text-ink-500"
                  }`}
                >
                  {entry.number}
                </span>
                <span>{entry.label}</span>
                {isLocked ? (
                  <span className="text-[10px] ml-0.5" aria-hidden>
                    🔒
                  </span>
                ) : isComplete ? (
                  <span
                    className={`text-[10px] ml-0.5 ${
                      isActive ? "text-emerald-300" : "text-emerald-600"
                    }`}
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
    </div>
  );
}
