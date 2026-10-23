import type { ChipProps } from "../../features/contacts/types";

export function Chip({ label, selected }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center text-[11px] rounded px-2 py-0.5 border ${
        selected
          ? "bg-blue-950/80 border-cyan-500/50 text-cyan-200"
          : "bg-white/[0.04] border-white/10 text-slate-300"
      }`}
    >
      {label}
    </span>
  );
}