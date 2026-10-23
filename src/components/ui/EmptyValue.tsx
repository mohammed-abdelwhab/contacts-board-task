import type { EmptyValueProps } from "../../features/contacts/types";

export function EmptyValue({ children }: EmptyValueProps) {
  return (
    <span className="text-[#A8A49D]">{children ?? "—"}</span>
  );
}