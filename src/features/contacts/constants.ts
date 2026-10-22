import type { Stage } from "./types";

export const STAGES: readonly Stage[] = [
  "Lead",
  "Prospect",
  "Qualified",
  "Customer",
] as const;

/**
 * One style per stage. The text label always renders, so color is never the
 * only cue. Each entry is a pair of full Tailwind class strings: the badge
 * background tint and the badge text color.
 */
export const STAGE_STYLE: Record<
  Stage,
  { label: string; bg: string; text: string }
> = {
  Lead: { label: "Lead", bg: "bg-stage-lead-bg", text: "text-stage-lead" },
  Prospect: {
    label: "Prospect",
    bg: "bg-stage-prospect-bg",
    text: "text-stage-prospect",
  },
  Qualified: {
    label: "Qualified",
    bg: "bg-stage-qualified-bg",
    text: "text-stage-qualified",
  },
  Customer: {
    label: "Customer",
    bg: "bg-stage-customer-bg",
    text: "text-stage-customer",
  },
};