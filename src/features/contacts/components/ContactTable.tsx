import { ContactRow } from "./ContactRow";
import type { ContactTableProps } from "../types";

export function ContactTable({
  contacts,
  selectedId,
  onSelectContact,
}: ContactTableProps) {
  return (
    <div className="bg-[#0B1222]/85 rounded-2xl border border-white/10 overflow-x-auto shadow-2xl backdrop-blur-xl">
      <table className="w-full text-left border-collapse" role="grid">
        <thead>
          <tr className="bg-[#0F172A]/90 border-b border-white/10 text-[11px] uppercase tracking-wider text-slate-400 font-medium select-none">
            <th scope="col" className="py-3.5 px-4 w-[260px]">
              Name
            </th>
            <th scope="col" className="py-3.5 px-4 w-[180px]">
              Company
            </th>
            <th scope="col" className="py-3.5 px-4 w-[180px]">
              Role
            </th>
            <th scope="col" className="py-3.5 px-4 w-[140px]">
              Owner
            </th>
            <th scope="col" className="py-3.5 px-4">
              Labels
            </th>
            <th scope="col" className="py-3.5 px-4 w-[130px]">
              Stage
            </th>
          </tr>
        </thead>
        <tbody className="text-[13px] text-slate-200">
          {contacts.map((contact) => (
            <ContactRow
              key={contact.id}
              contact={contact}
              selected={contact.id === selectedId}
              onSelect={onSelectContact}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}