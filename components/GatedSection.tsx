"use client";

import type { ReactNode } from "react";
import { useProgress } from "@/lib/progress";
import { Section } from "./Section";

export function GatedSection({
  id,
  number,
  title,
  intro,
  children,
}: {
  id: string;
  number: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  const { isUnlocked, sectionStatus, previousSection, ready } = useProgress();
  const unlocked = isUnlocked(id);
  const status = sectionStatus(id);

  if (!ready) {
    return (
      <section
        id={id}
        className="scroll-mt-8 border-t border-ink-100 pt-12 pb-4"
      >
        <div className="mb-6">
          <div className="text-xs font-mono text-ink-500 mb-2">{number}</div>
          <h2 className="text-2xl font-semibold text-ink-900 tracking-tight">
            {title}
          </h2>
        </div>
        <div className="h-32" aria-hidden />
      </section>
    );
  }

  if (!unlocked) {
    const prev = previousSection(id);
    return (
      <section
        id={id}
        className="scroll-mt-8 border-t border-ink-100 pt-12 pb-4"
      >
        <div className="mb-6">
          <div className="text-xs font-mono text-ink-500 mb-2 flex items-center gap-2">
            <span>{number}</span>
            <span className="text-ink-400">· Locked</span>
          </div>
          <h2 className="text-2xl font-semibold text-ink-400 tracking-tight">
            {title}
          </h2>
        </div>
        <div className="rounded-lg border border-dashed border-ink-300 bg-ink-50/50 p-6 flex items-start gap-3">
          <span className="text-xl leading-none mt-0.5" aria-hidden>
            🔒
          </span>
          <div>
            <p className="text-[14px] text-ink-700 leading-relaxed">
              {prev ? (
                <>
                  Pass the exercises in section{" "}
                  <span className="font-mono">{prev.number}</span>{" "}
                  <span className="font-medium">{prev.label}</span> to unlock
                  this one.
                </>
              ) : (
                "Complete the previous section to unlock this one."
              )}
            </p>
            {prev ? (
              <a
                href={`#${prev.id}`}
                className="inline-block mt-2 text-[13px] text-ink-700 underline decoration-ink-300 underline-offset-4 hover:decoration-ink-700"
              >
                Jump back to section {prev.number} →
              </a>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <Section
      id={id}
      number={number}
      title={title}
      intro={intro}
      complete={status === "complete"}
    >
      {children}
    </Section>
  );
}
