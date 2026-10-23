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
      className="flex flex-col bg-[#0B1325]/75 p-3.5 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md min-h-[380px] w-full"
    >
      {/* Column Header */}
      <header className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 px-1">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${dot} shadow-[0_0_8px_currentColor]`} aria-hidden="true" />
          <h3 className={`text-[13px] font-semibold tracking-wide ${text}`}>{stage}</h3>
        </div>
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border border-white/10 ${countBg}`}>
          {contacts.length}
        </span>
      </header>

      {/* Cards Stream */}
      <div className="flex-1 flex flex-col gap-3">
        {contacts.length === 0 ? (
          <div className="h-32 border-2 border-dashed border-white/15 rounded-xl flex flex-col items-center justify-center p-4 text-center bg-white/[0.02]">
            <svg
              className="w-5 h-5 text-slate-500 mb-1.5 stroke-[1.5]"
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
            <span className="text-[12px] font-medium text-slate-400">No contacts yet</span>
            <span className="text-[10px] text-slate-500 mt-0.5">
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