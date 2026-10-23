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
      className="w-full overflow-x-auto pb-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start min-w-[760px] lg:min-w-0">
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