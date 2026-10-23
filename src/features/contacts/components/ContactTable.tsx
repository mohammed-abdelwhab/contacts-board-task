import { ContactRow } from "./ContactRow";
import type { ContactTableProps } from "../types";

export function ContactTable({
  contacts,
  selectedId,
  onSelectContact,
}: ContactTableProps) {
  return (
    <div className="bg-white rounded-lg border border-[#E8E6E1] overflow-x-auto shadow-xs">
      <table className="w-full text-left border-collapse" role="grid">
        <thead>
          <tr className="bg-[#F7F6F3] border-b border-[#E8E6E1] text-[12px] text-[#8A8782] font-normal">
            <th scope="col" className="py-2.5 px-4 font-normal w-[240px]">
              Name
            </th>
            <th scope="col" className="py-2.5 px-4 font-normal w-[180px]">
              Company
            </th>
            <th scope="col" className="py-2.5 px-4 font-normal w-[180px]">
              Role
            </th>
            <th scope="col" className="py-2.5 px-4 font-normal w-[130px]">
              Owner
            </th>
            <th scope="col" className="py-2.5 px-4 font-normal">
              Labels
            </th>
            <th scope="col" className="py-2.5 px-4 font-normal w-[120px]">
              Stage
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F0EFEA] text-[13px] text-[#2D2C2A]">
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