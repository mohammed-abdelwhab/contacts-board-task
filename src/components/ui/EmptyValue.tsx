import type { EmptyValueProps } from "../../features/contacts/types";

export function EmptyValue({ children }: EmptyValueProps) {
  return (
    <span className="text-ink-500">{children ?? "—"}</span>
  );
}