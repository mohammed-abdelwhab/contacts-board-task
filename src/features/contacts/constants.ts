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
    bg: "bg-slate-800/60",
    text: "text-slate-300",
    border: "border-slate-700/60",
    dot: "bg-slate-400",
    countBg: "bg-slate-800/80 text-slate-300",
    nameBadge: "bg-slate-800/60 text-slate-200 border border-slate-700/70 hover:border-slate-500",
  },
  Prospect: {
    label: "Prospect",
    bg: "bg-blue-950/60",
    text: "text-cyan-300",
    border: "border-cyan-800/50",
    dot: "bg-cyan-400",
    countBg: "bg-blue-950/80 text-cyan-300",
    nameBadge: "bg-blue-950/60 text-cyan-300 border border-cyan-800/60 hover:border-cyan-400",
  },
  Qualified: {
    label: "Qualified",
    bg: "bg-amber-950/50",
    text: "text-amber-300",
    border: "border-amber-800/50",
    dot: "bg-amber-400",
    countBg: "bg-amber-950/80 text-amber-300",
    nameBadge: "bg-amber-950/50 text-amber-300 border border-amber-800/60 hover:border-amber-400",
  },
  Customer: {
    label: "Customer",
    bg: "bg-emerald-950/50",
    text: "text-emerald-300",
    border: "border-emerald-800/50",
    dot: "bg-emerald-400",
    countBg: "bg-emerald-950/80 text-emerald-300",
    nameBadge: "bg-emerald-950/50 text-emerald-300 border border-emerald-800/60 hover:border-emerald-400",
  },
};