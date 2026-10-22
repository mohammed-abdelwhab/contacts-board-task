import { ContactCard } from "./ContactCard";
import { EmptyValue } from "../../../components/ui/EmptyValue";
import { STAGE_STYLE } from "../constants";
import type { BoardColumnProps } from "../types";

export function BoardColumn({
  stage,
  contacts,
  selectedId,
  onSelectContact,
}: BoardColumnProps) {
  const { bg, text } = STAGE_STYLE[stage];

  return (
    <div data-column={stage} className="flex flex-col shrink-0 w-[260px] min-h-[400px]">
      <header className="flex items-center justify-between mb-2">
        <h3 className={`font-medium text-sm ${text}`}>{stage}</h3>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${bg} ${text}`}>
          {contacts.length}
        </span>
      </header>
      <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1">
        {contacts.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center px-2">
            <EmptyValue children="No contacts" />
          </div>
        ) : (
          contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              selected={contact.id === selectedId}
              onSelect={onSelectContact}
            />
          ))
        )}
      </div>
    </div>
  );
}