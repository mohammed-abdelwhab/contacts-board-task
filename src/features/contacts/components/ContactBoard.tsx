import { BoardColumn } from "./BoardColumn";
import { STAGES } from "../constants";
import type { ContactBoardProps, Stage } from "../types";

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
      className="w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
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