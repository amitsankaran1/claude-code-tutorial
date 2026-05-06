import type { Exercise } from "@/lib/content";
import { TerminalExercise } from "./TerminalExercise";
import { MultipleChoice } from "./MultipleChoice";
import { Reveal } from "./Reveal";

export function QuizBlock({ exercises }: { exercises?: Exercise[] }) {
  if (!exercises || exercises.length === 0) return null;
  return (
    <div className="mt-8">
      <div className="text-[11px] font-mono uppercase tracking-wider text-ink-500 mb-3">
        Practice — pass to unlock the next section
      </div>
      <div className="space-y-4">
        {exercises.map((ex, i) => {
          if (ex.kind === "terminal") {
            return <TerminalExercise key={ex.id} data={ex} index={i} />;
          }
          if (ex.kind === "choice") {
            return <MultipleChoice key={ex.id} data={ex} index={i} />;
          }
          return <Reveal key={ex.id} data={ex} index={i} />;
        })}
      </div>
    </div>
  );
}
