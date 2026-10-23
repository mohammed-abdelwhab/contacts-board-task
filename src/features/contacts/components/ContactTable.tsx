import { ContactRow } from "./ContactRow";
import type { ContactTableProps } from "../types";

export function ContactTable({
  contacts,
  selectedId,
  onSelectContact,
}: ContactTableProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E8E6E1] overflow-x-auto shadow-sm">
      <table className="w-full text-left border-collapse" role="grid">
        <thead>
          <tr className="bg-[#F7F6F3] border-b border-[#E8E6E1] text-[11px] uppercase tracking-wider text-[#8A8782] font-medium select-none">
            <th scope="col" className="py-3 px-4 w-[260px]">
              Name
            </th>
            <th scope="col" className="py-3 px-4 w-[180px]">
              Company
            </th>
            <th scope="col" className="py-3 px-4 w-[180px]">
              Role
            </th>
            <th scope="col" className="py-3 px-4 w-[140px]">
              Owner
            </th>
            <th scope="col" className="py-3 px-4">
              Labels
            </th>
            <th scope="col" className="py-3 px-4 w-[130px]">
              Stage
            </th>
          </tr>
        </thead>
        <tbody className="text-[13px] text-[#2D2C2A]">
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