import { ContactRow } from "./ContactRow";
import type { ContactTableProps } from "../types";

export function ContactTable({
  contacts,
  selectedId,
  onSelectContact,
}: ContactTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-surface-line bg-surface-card shadow-xs">
      <table className="w-full border-collapse text-sm" role="grid">
        <thead>
          <tr className="border-b border-surface-line bg-surface-hover">
            <th
              scope="col"
              className="relative lg:sticky lg:left-0 bg-inherit z-10 px-3 py-2 text-left font-medium text-ink-500 uppercase tracking-wider text-xs"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left font-medium text-ink-500 uppercase tracking-wider whitespace-nowrap text-xs border-l border-surface-line/50"
            >
              Company
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left font-medium text-ink-500 uppercase tracking-wider whitespace-nowrap text-xs border-l border-surface-line/50"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left font-medium text-ink-500 uppercase tracking-wider whitespace-nowrap text-xs border-l border-surface-line/50"
            >
              Owner
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left font-medium text-ink-500 uppercase tracking-wider whitespace-nowrap text-xs border-l border-surface-line/50"
            >
              Labels
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-left font-medium text-ink-500 uppercase tracking-wider whitespace-nowrap text-xs border-l border-surface-line/50"
            >
              Stage
            </th>
          </tr>
        </thead>
        <tbody>
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