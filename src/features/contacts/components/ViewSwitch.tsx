import type { ViewSwitchProps } from "../types";

export function ViewSwitch({ mode, onModeChange }: ViewSwitchProps) {
  return (
    <div
      role="tablist"
      aria-label="View mode"
      className="inline-flex p-1 bg-[#EFECE6] rounded-lg border border-[#E3E0D8] shadow-xs select-none relative"
    >
      <button
        role="tab"
        type="button"
        aria-selected={mode === "table"}
        aria-controls="table-view"
        id="tab-table"
        onClick={() => onModeChange("table")}
        className={`relative z-10 flex items-center gap-2 px-3.5 py-1.5 text-[13px] rounded-md transition-all duration-200 cursor-pointer focus-ring ${
          mode === "table"
            ? "font-semibold text-[#1D5685] bg-white shadow-sm border border-[#E0DCD4]"
            : "text-[#6E6B65] hover:text-[#1E1E1E] hover:bg-white/40 border border-transparent"
        }`}
      >
        <svg
          className={`w-3.5 h-3.5 transition-colors duration-200 ${
            mode === "table" ? "text-[#1D5685]" : "text-[#8A8782]"
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
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] inline-block ml-0.5 animate-pulse" />
        )}
      </button>

      <button
        role="tab"
        type="button"
        aria-selected={mode === "board"}
        aria-controls="board-view"
        id="tab-board"
        onClick={() => onModeChange("board")}
        className={`relative z-10 flex items-center gap-2 px-3.5 py-1.5 text-[13px] rounded-md transition-all duration-200 cursor-pointer focus-ring ${
          mode === "board"
            ? "font-semibold text-[#1D5685] bg-white shadow-sm border border-[#E0DCD4]"
            : "text-[#6E6B65] hover:text-[#1E1E1E] hover:bg-white/40 border border-transparent"
        }`}
      >
        <svg
          className={`w-3.5 h-3.5 transition-colors duration-200 ${
            mode === "board" ? "text-[#1D5685]" : "text-[#8A8782]"
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
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5733] inline-block ml-0.5 animate-pulse" />
        )}
      </button>
    </div>
  );
}