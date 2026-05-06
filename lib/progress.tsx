"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { NAV_ENTRIES, EXERCISES } from "@/lib/content";

const STORAGE_KEY = "claude-code-tutorial:completed:v1";

const SECTION_ORDER = NAV_ENTRIES.map((e) => e.id);
const EXERCISE_IDS_BY_SECTION: Record<string, string[]> = Object.fromEntries(
  SECTION_ORDER.map((s) => [s, (EXERCISES[s] ?? []).map((e) => e.id)]),
);

export type SectionStatus = "locked" | "in-progress" | "complete";

type ProgressContextType = {
  isCompleted: (id: string) => boolean;
  markCompleted: (id: string) => void;
  isUnlocked: (sectionId: string) => boolean;
  sectionStatus: (sectionId: string) => SectionStatus;
  previousSection: (sectionId: string) => { id: string; number: string; label: string } | null;
  resetAll: () => void;
  ready: boolean;
  totalExercises: number;
  completedCount: number;
};

const ProgressContext = createContext<ProgressContextType | null>(null);

function computeUnlocked(completed: Set<string>): Set<string> {
  const unlocked = new Set<string>();
  for (const sectionId of SECTION_ORDER) {
    unlocked.add(sectionId);
    const exIds = EXERCISE_IDS_BY_SECTION[sectionId] ?? [];
    const allDone =
      exIds.length === 0 || exIds.every((id) => completed.has(id));
    if (!allDone) break;
  }
  return unlocked;
}

const TOTAL_EXERCISES = SECTION_ORDER.reduce(
  (sum, s) => sum + (EXERCISE_IDS_BY_SECTION[s]?.length ?? 0),
  0,
);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) setCompleted(new Set(arr));
      }
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  const unlocked = useMemo(() => {
    if (!ready) {
      const onlyFirst = new Set<string>();
      const first = SECTION_ORDER[0];
      if (first) onlyFirst.add(first);
      return onlyFirst;
    }
    return computeUnlocked(completed);
  }, [completed, ready]);

  const value = useMemo<ProgressContextType>(
    () => ({
      isCompleted: (id) => completed.has(id),
      markCompleted: (id) => {
        setCompleted((prev) => {
          if (prev.has(id)) return prev;
          const next = new Set(prev);
          next.add(id);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
          } catch {
            // ignore
          }
          return next;
        });
      },
      isUnlocked: (sectionId) => unlocked.has(sectionId),
      sectionStatus: (sectionId) => {
        if (!unlocked.has(sectionId)) return "locked";
        const exIds = EXERCISE_IDS_BY_SECTION[sectionId] ?? [];
        if (exIds.length === 0) return "complete";
        const allDone = exIds.every((id) => completed.has(id));
        return allDone ? "complete" : "in-progress";
      },
      previousSection: (sectionId) => {
        const idx = SECTION_ORDER.indexOf(sectionId);
        if (idx <= 0) return null;
        const prevId = SECTION_ORDER[idx - 1]!;
        const entry = NAV_ENTRIES.find((e) => e.id === prevId);
        return entry
          ? { id: entry.id, number: entry.number, label: entry.label }
          : null;
      },
      resetAll: () => {
        setCompleted(new Set());
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
      },
      ready,
      totalExercises: TOTAL_EXERCISES,
      completedCount: completed.size,
    }),
    [completed, unlocked, ready],
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextType {
  const ctx = useContext(ProgressContext);
  if (!ctx)
    throw new Error("useProgress must be used within a ProgressProvider");
  return ctx;
}
