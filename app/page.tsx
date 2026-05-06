import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { GatedSection } from "@/components/GatedSection";
import { FeatureCard } from "@/components/FeatureCard";
import { DecisionTable } from "@/components/DecisionTable";
import { UseCaseCard } from "@/components/UseCaseCard";
import { PatternCard } from "@/components/PatternCard";
import { AntiPatternCard } from "@/components/AntiPatternCard";
import { QuizBlock } from "@/components/QuizBlock";
import { ProgressProvider } from "@/lib/progress";
import {
  BIG_PICTURE,
  TERMINAL_101,
  PRIMITIVES,
  AUTOMATION,
  MODEL_CONTROL,
  USE_CASES,
  PATTERNS,
  ANTI_PATTERNS,
  CHEATSHEET,
  SOURCES,
  EXERCISES,
} from "@/lib/content";

export default function Page() {
  return (
    <ProgressProvider>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1 min-w-0">
          <MobileNav />

          <main className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-12 py-8 sm:py-12">
            <header className="mb-10 sm:mb-12">
              <div className="text-[11px] font-mono uppercase tracking-wider text-ink-500 mb-3">
                Field Guide · Nov 2025 – May 2026
              </div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-ink-900 tracking-tight leading-tight">
                Claude Code in the TUI
              </h1>
              <p className="mt-4 text-ink-700 leading-relaxed text-base sm:text-lg max-w-prose">
                Each section unlocks the next. Pass the practice exercises to
                progress.
              </p>
            </header>

            <GatedSection
              id="terminal-101"
              number="01"
              title="Terminal & TUI 101"
              intro={TERMINAL_101.intro}
            >
              <div className="space-y-4">
                {TERMINAL_101.blocks.map((block) => (
                  <article
                    key={block.title}
                    className="rounded-lg border border-ink-100 bg-white p-5 sm:p-6"
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-ink-900 mb-1">
                      {block.title}
                    </h3>
                    {block.metaphor ? (
                      <p className="text-[13px] italic text-ink-500 mb-3">
                        {block.metaphor}
                      </p>
                    ) : null}
                    <p className="text-[15px] text-ink-700 leading-relaxed">
                      {block.body}
                    </p>
                  </article>
                ))}

                <article className="rounded-lg border border-ink-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-ink-900 mb-3">
                    A small lexicon
                  </h3>
                  <dl className="divide-y divide-ink-100">
                    {TERMINAL_101.lexicon.map((item) => (
                      <div
                        key={item.term}
                        className="py-3 grid grid-cols-1 sm:grid-cols-[8rem_1fr] gap-1 sm:gap-4"
                      >
                        <dt className="font-mono text-[13px] text-ink-900">
                          {item.term}
                        </dt>
                        <dd className="text-[14px] text-ink-700 leading-relaxed">
                          {item.def}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              </div>
              <QuizBlock exercises={EXERCISES["terminal-101"]} />
            </GatedSection>

            <GatedSection
              id="big-picture"
              number="02"
              title="The Big Picture"
              intro={BIG_PICTURE}
            >
              <div className="rounded-lg border border-ink-100 bg-white p-5 sm:p-6">
                <div className="text-[11px] font-mono uppercase tracking-wider text-ink-500 mb-3">
                  Mental model
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    {
                      word: "Package",
                      body: "Skills, Plugins, Conductors — turn repeated work into a callable unit.",
                    },
                    {
                      word: "Delegate",
                      body: "Subagents, Agent Teams — push messy or specialized work into its own context.",
                    },
                    {
                      word: "Orchestrate",
                      body: "Hooks, /loop, Monitor, MCP — automate lifecycle moments and connect external systems.",
                    },
                  ].map((cell) => (
                    <div
                      key={cell.word}
                      className="rounded-md bg-ink-50 border border-ink-100 p-4"
                    >
                      <div className="text-sm font-semibold text-ink-900 mb-1">
                        {cell.word}
                      </div>
                      <p className="text-[13px] text-ink-700 leading-relaxed">
                        {cell.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <QuizBlock exercises={EXERCISES["big-picture"]} />
            </GatedSection>

            <GatedSection
              id="primitives"
              number="03"
              title="Core Primitives"
              intro="The seven building blocks. Each one solves a specific problem — and is most useful when you're clear about when not to reach for it."
            >
              <div className="space-y-4">
                {PRIMITIVES.map((f) => (
                  <FeatureCard key={f.id} feature={f} />
                ))}
              </div>
              <QuizBlock exercises={EXERCISES["primitives"]} />
            </GatedSection>

            <GatedSection
              id="automation"
              number="04"
              title="Automation & Long-Running Work"
              intro="Features that let Claude operate while you're not watching. The highest-leverage tools, and the ones most worth being deliberate about — read the 'When NOT to' lines twice."
            >
              <div className="space-y-4">
                {AUTOMATION.map((f) => (
                  <FeatureCard key={f.id} feature={f} />
                ))}
              </div>
              <QuizBlock exercises={EXERCISES["automation"]} />
            </GatedSection>

            <GatedSection
              id="models"
              number="05"
              title="Models & Control"
              intro="The model behind Claude Code, and the one knob that's worth knowing about."
            >
              <div className="space-y-4">
                {MODEL_CONTROL.map((f) => (
                  <FeatureCard key={f.id} feature={f} />
                ))}
              </div>
              <QuizBlock exercises={EXERCISES["models"]} />
            </GatedSection>

            <GatedSection
              id="decision"
              number="06"
              title="Decision Matrix"
              intro="When you want to do X, reach for Y. The fastest way to navigate the feature surface."
            >
              <DecisionTable />
              <QuizBlock exercises={EXERCISES["decision"]} />
            </GatedSection>

            <GatedSection
              id="use-cases"
              number="07"
              title="Real Use Cases for a PM at Notion"
              intro="Six scenarios where Claude Code earns its keep — chosen for the kind of work a PM actually does, not generic productivity theater."
            >
              <div className="space-y-4">
                {USE_CASES.map((u) => (
                  <UseCaseCard key={u.id} useCase={u} />
                ))}
              </div>
              <QuizBlock exercises={EXERCISES["use-cases"]} />
            </GatedSection>

            <GatedSection
              id="patterns"
              number="08"
              title="Patterns"
              intro="Cross-cutting habits, not features. The things worth doing reliably."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PATTERNS.map((p) => (
                  <PatternCard key={p.id} pattern={p} />
                ))}
              </div>
              <QuizBlock exercises={EXERCISES["patterns"]} />
            </GatedSection>

            <GatedSection
              id="anti-patterns"
              number="09"
              title="Anti-patterns"
              intro="Things that look productive and aren't. Concrete don'ts — workflows where Claude feels useful and isn't."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ANTI_PATTERNS.map((a) => (
                  <AntiPatternCard key={a.id} anti={a} />
                ))}
              </div>
              <QuizBlock exercises={EXERCISES["anti-patterns"]} />
            </GatedSection>

            <GatedSection
              id="cheatsheet"
              number="10"
              title="Quickstart Cheatsheet"
              intro="The commands that earn their keep. Copy-paste, then modify."
            >
              <div className="rounded-lg border border-ink-100 bg-white overflow-hidden">
                <ul className="divide-y divide-ink-100">
                  {CHEATSHEET.map((c, i) => (
                    <li
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 px-4 sm:px-5 py-3"
                    >
                      <code className="font-mono text-[12px] sm:text-[13px] text-ink-900 bg-ink-50 border border-ink-100 rounded px-2 py-1 sm:w-72 shrink-0 break-all sm:break-normal">
                        {c.command}
                      </code>
                      <span className="text-[14px] text-ink-700 leading-relaxed">
                        {c.useWhen}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <QuizBlock exercises={EXERCISES["cheatsheet"]} />
            </GatedSection>

            <GatedSection id="sources" number="11" title="Sources">
              <ul className="space-y-2 text-[15px]">
                {SOURCES.map((s, i) => (
                  <li key={i}>
                    <a
                      href={s.href}
                      className="text-ink-900 underline decoration-ink-300 underline-offset-4 hover:decoration-ink-700"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </GatedSection>

            <footer className="mt-16 pt-8 border-t border-ink-100 text-[13px] text-ink-500 leading-relaxed">
              Source:{" "}
              <code className="font-mono break-all">
                ~/Desktop/claude-code-features-nov2025-may2026.md
              </code>
              . Edit content in <code className="font-mono">lib/content.ts</code>
              .
            </footer>
          </main>
        </div>
      </div>
    </ProgressProvider>
  );
}
