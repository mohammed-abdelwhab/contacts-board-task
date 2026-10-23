import type { Stage } from "./types";

export const STAGES: readonly Stage[] = [
  "Lead",
  "Prospect",
  "Qualified",
  "Customer",
] as const;

/**
 * One style per stage matching Stitch Quiet Ledger design.
 * Distinct muted tints, text label always present.
 */
export const STAGE_STYLE: Record<
  Stage,
  { label: string; bg: string; text: string; border: string; dot: string; countBg: string }
> = {
  Lead: {
    label: "Lead",
    bg: "bg-[#F0EFEA]",
    text: "text-[#4A4844]",
    border: "border-[#E2E0D8]",
    dot: "bg-[#8A8782]",
    countBg: "bg-[#EFECE6] text-[#8A8782]",
  },
  Prospect: {
    label: "Prospect",
    bg: "bg-[#E8F0F8]",
    text: "text-[#2C577D]",
    border: "border-[#D2E2F0]",
    dot: "bg-[#3B6F9F]",
    countBg: "bg-[#E8F0F8] text-[#3B6F9F]",
  },
  Qualified: {
    label: "Qualified",
    bg: "bg-[#FEF5E7]",
    text: "text-[#8A5B16]",
    border: "border-[#F9E5C3]",
    dot: "bg-[#D97706]",
    countBg: "bg-[#FEF5E7] text-[#8A5B16]",
  },
  Customer: {
    label: "Customer",
    bg: "bg-[#EAF4EE]",
    text: "text-[#23633E]",
    border: "border-[#CFE8D7]",
    dot: "bg-[#16A34A]",
    countBg: "bg-[#EAF4EE] text-[#23633E]",
  },
};