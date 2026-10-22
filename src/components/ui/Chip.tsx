import type { ChipProps } from "../../features/contacts/types";

export function Chip({ label }: ChipProps) {
  return (
    <span className="inline-flex h-5 items-center rounded border border-surface-line bg-surface-card px-1.5 text-xs text-ink-700">
      {label}
    </span>
  );
}