import type { EmptyValueProps } from "../../features/contacts/types";

export function EmptyValue({ children }: EmptyValueProps) {
  return (
    <span className="text-slate-500">{children ?? "—"}</span>
  );
}