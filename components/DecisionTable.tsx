import { DECISION_ROWS } from "@/lib/content";

export function DecisionTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-ink-100">
      <table className="w-full text-left text-[15px]">
        <thead className="bg-ink-50 text-ink-700">
          <tr>
            <th className="px-4 py-3 font-semibold w-2/3">You want to…</th>
            <th className="px-4 py-3 font-semibold">Use</th>
          </tr>
        </thead>
        <tbody>
          {DECISION_ROWS.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-white" : "bg-ink-50/40"}
            >
              <td className="px-4 py-3 text-ink-700">{row.goal}</td>
              <td className="px-4 py-3 font-mono text-[13px] text-ink-900">
                {row.tool}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
