import { useState } from "react";
import { useContacts } from "./state/ContactsContext";
import { ViewSwitch } from "./components/ViewSwitch";
import { ContactTable } from "./components/ContactTable";
import { ContactBoard } from "./components/ContactBoard";
import { DetailsPanel } from "./components/DetailsPanel";
import { usePanelFocus } from "./hooks/usePanelFocus";
import type { ViewMode, Contact } from "./types";

function Content({
  contacts,
  view,
  selectedId,
  onSelectContact,
}: {
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

  // Keyboard accessibility: Escape key to close, focus management
  usePanelFocus(Boolean(selectedContact), handleClosePanel, selectedId);

  return (
    <div className="min-h-screen bg-transparent text-[#1E1E1E] antialiased flex flex-col justify-between relative selection:bg-[#E8F0F8] selection:text-[#1D5685]">
      {/* Main Content wrapper */}
      <main
        className={`w-full max-w-[1240px] mx-auto px-4 sm:px-8 pt-8 pb-12 flex-1 transition-opacity duration-200 ${
          selectedContact ? "opacity-35" : ""
        }`}
      >
        {/* Header Row with Spaced Heading & Badge */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-6 border-b border-black/10">
          <div className="flex items-center gap-4">
            <h1 className="text-[22px] font-bold text-[#1E1E1E] tracking-tight">Contacts</h1>
            <span className="text-[12px] font-semibold text-[#374151] bg-white/80 backdrop-blur-xs px-3 py-0.5 rounded-full border border-black/10 shadow-xs">
              {contacts.length} contacts
            </span>
          </div>
          <ViewSwitch mode={view} onModeChange={setView} />
        </header>

        {/* View Content (Table or Board) with animated transition */}
        <div key={view} className="animate-view-transition">
          <Content
            contacts={contacts}
            view={view}
            selectedId={selectedId}
            onSelectContact={handleSelect}
          />
        </div>
      </main>

      {/* Dimmed Backdrop Overlay when Details Panel is Open */}
      {selectedContact && (
        <div
          className="fixed inset-0 bg-black/35 backdrop-blur-[2px] z-40 transition-opacity duration-200 cursor-pointer"
          onClick={handleClosePanel}
          aria-hidden="true"
        />
      )}

      {/* Slide-over Right Drawer Details Panel */}
      {selectedContact && (
        <DetailsPanel
          key={selectedContact.id}
          contact={selectedContact}
          onSave={(stage, notes) => handleSave(selectedContact.id, stage, notes)}
          onCancel={handleClosePanel}
        />
      )}
    </div>
  );
}