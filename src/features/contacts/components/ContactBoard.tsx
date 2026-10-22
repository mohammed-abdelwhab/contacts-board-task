import { BoardColumn } from "./BoardColumn";
import { STAGES } from "../constants";
import type { ContactBoardProps, Stage } from "../types";

const COLUMN_WIDTH = 280;
const COLUMN_GAP = 12;

export function ContactBoard({
  contacts,
  selectedId,
  onSelectContact,
}: ContactBoardProps) {
  return (
    <div
      id="board-view"
      role="region"
      aria-label="Board view"
      className="overflow-x-auto"
    >
      <div
        className="flex gap-3 min-w-max"
        style={{ minWidth: `${STAGES.length * COLUMN_WIDTH + (STAGES.length - 1) * COLUMN_GAP}px` }}
      >
        {STAGES.map((stage: Stage) => (
          <BoardColumn
            key={stage}
            stage={stage}
            contacts={contacts.filter((c) => c.stage === stage)}
            selectedId={selectedId}
            onSelectContact={onSelectContact}
          />
        ))}
      </div>
    </div>
  );
}