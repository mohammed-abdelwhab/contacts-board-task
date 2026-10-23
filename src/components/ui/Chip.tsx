import type { ChipProps } from "../../features/contacts/types";

export function Chip({ label, selected }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center text-[11px] text-[#5E5B55] rounded px-1.5 py-0.5 border ${
        selected ? "bg-white border-[#D2E2F0]" : "bg-[#F4F3EF] border-[#E5E3DE]"
      }`}
    >
      {label}
    </span>
  );
}