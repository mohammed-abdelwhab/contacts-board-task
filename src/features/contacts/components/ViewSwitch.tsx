import type { ViewSwitchProps } from "../types";

export function ViewSwitch({ mode, onModeChange }: ViewSwitchProps) {
  return (
    <div
      role="tablist"
      aria-label="View mode"
      className="inline-flex p-1 bg-[#0D1527]/90 rounded-xl border border-white/10 shadow-lg backdrop-blur-md select-none relative"
    >
      <button
        role="tab"
        type="button"
        aria-selected={mode === "table"}
        aria-controls="table-view"
        id="tab-table"
        onClick={() => onModeChange("table")}
        className={`relative z-10 flex items-center gap-2 px-3.5 py-1.5 text-[13px] rounded-lg transition-all duration-200 cursor-pointer focus-ring ${
          mode === "table"
            ? "font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_16px_rgba(0,120,255,0.45)] border border-cyan-400/40"
            : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
        }`}
      >
        <svg
          className={`w-3.5 h-3.5 transition-colors duration-200 ${
            mode === "table" ? "text-white" : "text-slate-400"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h18M3 14h18m-9-4v8m-8 0h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>Table</span>
        {mode === "table" && (
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-200 inline-block ml-0.5 animate-pulse" />
        )}
      </button>

      <button
        role="tab"
        type="button"
        aria-selected={mode === "board"}
        aria-controls="board-view"
        id="tab-board"
        onClick={() => onModeChange("board")}
        className={`relative z-10 flex items-center gap-2 px-3.5 py-1.5 text-[13px] rounded-lg transition-all duration-200 cursor-pointer focus-ring ${
          mode === "board"
            ? "font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_16px_rgba(0,120,255,0.45)] border border-cyan-400/40"
            : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
        }`}
      >
        <svg
          className={`w-3.5 h-3.5 transition-colors duration-200 ${
            mode === "board" ? "text-white" : "text-slate-400"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2m7 10a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <span>Board</span>
        {mode === "board" && (
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-200 inline-block ml-0.5 animate-pulse" />
        )}
      </button>
    </div>
  );
}