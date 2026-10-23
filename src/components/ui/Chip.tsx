import type { ChipProps } from "../../features/contacts/types";

export function Chip({ label }: ChipProps) {
  return (
    <span className="inline-flex h-5 items-center rounded-full border border-surface-line bg-surface-card px-2 text-xs text-ink-700 transition-fast hover:border-ink-300">
      {label}
    </span>
  );
}