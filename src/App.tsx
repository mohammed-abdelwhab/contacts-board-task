import { useState } from "react";
import { ViewSwitch } from "./features/contacts/components/ViewSwitch";
import { ContactTable } from "./features/contacts/components/ContactTable";
import { ContactBoard } from "./features/contacts/components/ContactBoard";
import { DetailsPanel } from "./features/contacts/components/DetailsPanel";
import { CONTACTS, SELECTED_ID } from "./features/contacts/data/contacts";
import type { ViewMode, Contact } from "./features/contacts/types";

function SectionTitle({
  children,
  id,
}: { children: React.ReactNode; id?: string }) {
  return (
    <h3 id={id} className="mb-3 text-sm font-medium text-ink-500 uppercase tracking-wider">
      {children}
    </h3>
  );
}

function Toolbar({ mode, onModeChange }: { mode: ViewMode; onModeChange: (m: ViewMode) => void }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div />
      <ViewSwitch mode={mode} onModeChange={onModeChange} />
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState<ViewMode>("table");
  const [selectedId, setSelectedId] = useState<string | undefined>(SELECTED_ID);
  const selectedContact = CONTACTS.find((c) => c.id === selectedId);

  const handleSelect = (contact: Contact) => {
    setSelectedId(contact.id);
  };

  return (
    <div className="min-h-screen bg-surface-page p-6 lg:p-8 font-sans antialiased">
      <div className="mx-auto max-w-[1440px] space-y-12">
        {/* Table View */}
        <section aria-labelledby="table-title">
          <SectionTitle id="table-title">Table View</SectionTitle>
          <Toolbar mode={mode} onModeChange={setMode} />
          <ContactTable
            contacts={CONTACTS}
            selectedId={selectedId}
            onSelectContact={handleSelect}
          />
        </section>

        {/* Board View */}
        <section aria-labelledby="board-title">
          <SectionTitle id="board-title">Board View</SectionTitle>
          <Toolbar mode={mode} onModeChange={setMode} />
          <ContactBoard
            contacts={CONTACTS}
            selectedId={selectedId}
            onSelectContact={handleSelect}
          />
        </section>

        {/* Details Panel */}
        {selectedContact && (
          <section aria-labelledby="details-title">
            <SectionTitle id="details-title">Details Panel</SectionTitle>
            <div className="relative h-[500px] lg:h-[560px]">
              <DetailsPanel
                contact={selectedContact}
                onSave={(stage, notes) => {
                  console.log("Save:", { id: selectedContact.id, stage, notes });
                }}
                onCancel={() => console.log("Cancel")}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}