import type { ViewSwitchProps } from "../types";

export function ViewSwitch({ mode, onModeChange }: ViewSwitchProps) {
  return (
    <div
      role="tablist"
      aria-label="View mode"
      className="inline-flex p-0.5 bg-[#EFECE6] rounded-md border border-[#E3E0D8]"
    >
      <button
        role="tab"
        type="button"
        aria-selected={mode === "table"}
        aria-controls="table-view"
        id="tab-table"
        onClick={() => onModeChange("table")}
        className={`flex items-center gap-1.5 px-3 py-1 text-[13px] rounded transition-colors duration-150 focus-ring cursor-pointer ${
          mode === "table"
            ? "font-medium text-[#3B6F9F] bg-white rounded shadow-sm border border-[#E3E0D8]"
            : "text-[#6E6B65] hover:text-[#1E1E1E]"
        }`}
      >
        <svg
          className="w-3.5 h-3.5"
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
      </button>
      <button
        role="tab"
        type="button"
        aria-selected={mode === "board"}
        aria-controls="board-view"
        id="tab-board"
        onClick={() => onModeChange("board")}
        className={`flex items-center gap-1.5 px-3 py-1 text-[13px] rounded transition-colors duration-150 focus-ring cursor-pointer ${
          mode === "board"
            ? "font-medium text-[#3B6F9F] bg-white rounded shadow-sm border border-[#E3E0D8]"
            : "text-[#6E6B65] hover:text-[#1E1E1E]"
        }`}
      >
        <svg
          className="w-3.5 h-3.5"
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
      </button>
    </div>
  );
}