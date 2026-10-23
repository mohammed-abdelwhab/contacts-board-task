import { useState, type ReactNode } from "react";
import { useContacts } from "./state/ContactsContext";
import { ViewSwitch } from "./components/ViewSwitch";
import { ContactTable } from "./components/ContactTable";
import { ContactBoard } from "./components/ContactBoard";
import { DetailsPanel } from "./components/DetailsPanel";
import type { ViewMode, Contact } from "./types";

function SectionTitle({
  children,
  id,
  className,
}: { children: ReactNode; id?: string; className?: string }) {
  return (
    <h3 id={id} className={`mb-3 text-sm font-medium text-ink-500 uppercase tracking-wider ${className ?? ""}`}>
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

function Content({ contacts, view, selectedId, onSelectContact }: {
  contacts: Contact[];
  view: ViewMode;
  selectedId: string | null;
  onSelectContact: (contact: Contact) => void;
}) {
  if (view === "table") {
    return (
      <ContactTable
        contacts={contacts}
        selectedId={selectedId ?? undefined}
        onSelectContact={onSelectContact}
      />
    );
  }
  return (
    <ContactBoard
      contacts={contacts}
      selectedId={selectedId ?? undefined}
      onSelectContact={onSelectContact}
    />
  );
}

export function ContactsPage() {
  const { contacts, updateContact } = useContacts();
  const [view, setView] = useState<ViewMode>("table");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedContact = contacts.find((c) => c.id === selectedId) ?? null;

  const handleSelect = (contact: Contact) => {
    setSelectedId(contact.id);
  };

  const handleClosePanel = () => {
    setSelectedId(null);
  };

  const handleSave = (id: string, stage: Contact["stage"], notes: string | undefined) => {
    const changes: Partial<Contact> = { stage };
    if (notes !== undefined) {
      changes.notes = notes;
    }
    updateContact(id, changes);
    handleClosePanel();
  };

  return (
    <div className="min-h-screen bg-surface-page font-sans antialiased">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6 py-6 lg:py-8 space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-lg lg:text-xl font-medium text-ink-900">Contacts</h1>
            <p className="text-sm text-ink-500 mt-0.5">{contacts.length} contacts</p>
          </div>
          <Toolbar mode={view} onModeChange={setView} />
        </header>

        <Content
          contacts={contacts}
          view={view}
          selectedId={selectedId}
          onSelectContact={handleSelect}
        />

        {selectedContact && (
          <section aria-labelledby="details-title" className="relative lg:absolute lg:top-20 lg:right-0 lg:w-[420px] lg:max-h-[calc(100vh-8rem)]">
            <SectionTitle id="details-title" className="sr-only">Details</SectionTitle>
            <DetailsPanel
              key={selectedContact.id}
              contact={selectedContact}
              onSave={(stage, notes) => handleSave(selectedContact.id, stage, notes)}
              onCancel={handleClosePanel}
            />
          </section>
        )}
      </div>
    </div>
  );
}