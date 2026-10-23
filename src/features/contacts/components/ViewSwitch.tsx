import type { ViewSwitchProps } from "../types";

export function ViewSwitch({ mode, onModeChange }: ViewSwitchProps) {
  return (
    <div
      role="tablist"
      aria-label="View mode"
      className="inline-flex items-center gap-1 rounded-md bg-surface-hover p-1"
    >
      <button
        role="tab"
        type="button"
        aria-selected={mode === "table"}
        aria-controls="table-view"
        id="tab-table"
        onClick={() => onModeChange("table")}
        className={`flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-medium transition-base ${
          mode === "table"
            ? "bg-surface-card text-ink-900 shadow-sm"
            : "text-ink-500 hover:text-ink-700"
        }`}
      >
        Table
      </button>
      <button
        role="tab"
        type="button"
        aria-selected={mode === "board"}
        aria-controls="board-view"
        id="tab-board"
        onClick={() => onModeChange("board")}
        className={`flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-medium transition-base ${
          mode === "board"
            ? "bg-surface-card text-ink-900 shadow-sm"
            : "text-ink-500 hover:text-ink-700"
        }`}
      >
        Board
      </button>
    </div>
  );
}