import { ContactCard } from "./ContactCard";
import { STAGE_STYLE } from "../constants";
import type { BoardColumnProps } from "../types";

export function BoardColumn({
  stage,
  contacts,
  selectedId,
  onSelectContact,
}: BoardColumnProps) {
  const { text, dot, countBg } = STAGE_STYLE[stage];

  return (
    <div
      data-column={stage}
      className="flex flex-col bg-[#F7F6F3] p-3.5 rounded-xl border border-[#E8E6E1] shadow-2xs min-h-[380px] w-full"
    >
      {/* Column Header */}
      <header className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8E6E1]/80 px-1">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${dot} shadow-xs`} aria-hidden="true" />
          <h3 className={`text-[13px] font-semibold tracking-wide ${text}`}>{stage}</h3>
        </div>
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border border-black/5 ${countBg}`}>
          {contacts.length}
        </span>
      </header>

      {/* Cards Stream */}
      <div className="flex-1 flex flex-col gap-3">
        {contacts.length === 0 ? (
          <div className="h-32 border-2 border-dashed border-[#D5D2CA] rounded-xl flex flex-col items-center justify-center p-4 text-center bg-white/40">
            <svg
              className="w-5 h-5 text-[#A8A49D] mb-1.5 stroke-[1.5]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-[12px] font-medium text-[#8A8782]">No contacts yet</span>
            <span className="text-[10px] text-[#A8A49D] mt-0.5">
              Advance contacts to {stage}
            </span>
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