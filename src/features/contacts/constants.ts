import type { Stage } from "./types";

export const STAGES: readonly Stage[] = [
  "Lead",
  "Prospect",
  "Qualified",
  "Customer",
] as const;

/**
 * Styling definition per lifecycle stage.
 * Incorporates Stitch Quiet Ledger foundation enriched with Aqua Blue (#00D4FF) and Sunset Orange (#FF5733).
 */
export const STAGE_STYLE: Record<
  Stage,
  {
    label: string;
    bg: string;
    text: string;
    border: string;
    dot: string;
    countBg: string;
    nameBadge: string;
  }
> = {
  Lead: {
    label: "Lead",
    bg: "bg-[#F0EFEA]",
    text: "text-[#4A4844]",
    border: "border-[#E2E0D8]",
    dot: "bg-[#8A8782]",
    countBg: "bg-[#EFECE6] text-[#8A8782]",
    nameBadge: "bg-[#F4F3F0] text-[#3D3A35] border border-[#E2E0D8] hover:border-[#C8C5BC]",
  },
  Prospect: {
    label: "Prospect",
    bg: "bg-[#E8F0F8]",
    text: "text-[#2C577D]",
    border: "border-[#D2E2F0]",
    dot: "bg-[#00D4FF]",
    countBg: "bg-[#E8F0F8] text-[#1D5685]",
    nameBadge: "bg-[#F0F7FD] text-[#1D5685] border border-[#C5DFF5] hover:border-[#00D4FF]",
  },
  Qualified: {
    label: "Qualified",
    bg: "bg-[#FEF5E7]",
    text: "text-[#8A5B16]",
    border: "border-[#F9E5C3]",
    dot: "bg-[#FF5733]",
    countBg: "bg-[#FEF5E7] text-[#8A5B16]",
    nameBadge: "bg-[#FFF8F0] text-[#8A5B16] border border-[#FBE3CC] hover:border-[#FF5733]",
  },
  Customer: {
    label: "Customer",
    bg: "bg-[#EAF4EE]",
    text: "text-[#23633E]",
    border: "border-[#CFE8D7]",
    dot: "bg-[#16A34A]",
    countBg: "bg-[#EAF4EE] text-[#23633E]",
    nameBadge: "bg-[#F0F9F4] text-[#23633E] border border-[#CEE9D8] hover:border-[#16A34A]",
  },
};