import type { Pill as PillType } from "@/lib/content";

const TONE_STYLES: Record<PillType["tone"], string> = {
  neutral: "bg-ink-100 text-ink-700 border-ink-300",
  warn: "bg-orange-50 text-warn border-orange-200",
  experimental: "bg-blue-50 text-blue-800 border-blue-200",
};

export function Pill({ pill }: { pill: PillType }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase ${TONE_STYLES[pill.tone]}`}
    >
      {pill.label}
    </span>
  );
}
