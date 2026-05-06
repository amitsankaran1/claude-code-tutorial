"use client";

import { useEffect, useState } from "react";
import { NAV_ENTRIES } from "@/lib/content";

export function Sidebar() {
  const [active, setActive] = useState<string>(NAV_ENTRIES[0]!.id);

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

  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen overflow-y-auto py-12 pl-8 pr-4 border-r border-ink-100">
      <div className="text-[11px] font-mono uppercase tracking-wider text-ink-500 mb-4">
        Claude Code · TUI
      </div>
      <nav>
        <ul className="space-y-1">
          {NAV_ENTRIES.map((entry) => {
            const isActive = active === entry.id;
            return (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  className={`flex items-baseline gap-2 rounded-md px-2 py-1.5 text-[13px] transition ${
                    isActive
                      ? "bg-ink-100 text-ink-900 font-medium"
                      : "text-ink-500 hover:text-ink-900 hover:bg-ink-50"
                  }`}
                >
                  <span className="font-mono text-[11px] tabular-nums text-ink-500 shrink-0">
                    {entry.number}
                  </span>
                  <span>{entry.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
