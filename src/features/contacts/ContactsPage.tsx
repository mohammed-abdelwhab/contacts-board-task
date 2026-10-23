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

  // Keyboard navigation & accessibility: Escape to close, focus management
  usePanelFocus(Boolean(selectedContact), handleClosePanel, selectedId);

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#1E1E1E] antialiased flex flex-col justify-between relative selection:bg-[#E8F0F8] selection:text-[#1D5685]">
      {/* Main Content wrapper matching Stitch Quiet Ledger 1200px container */}
      <main
        className={`w-full max-w-[1200px] mx-auto px-4 sm:px-8 pt-8 pb-12 flex-1 transition-opacity duration-150 ${
          selectedContact ? "opacity-40" : ""
        }`}
      >
        {/* Header Row */}
        <header className="flex items-center justify-between pb-6 mb-6 border-b border-[#E8E6E1]">
          <div className="flex items-baseline gap-2.5">
            <h1 className="text-[20px] font-semibold text-[#1E1E1E] tracking-tight">Contacts</h1>
            <span className="text-[13px] text-[#8A8782] font-normal">{contacts.length} contacts</span>
          </div>
          <ViewSwitch mode={view} onModeChange={setView} />
        </header>

        {/* View Content (Table or Board) */}
        <Content
          contacts={contacts}
          view={view}
          selectedId={selectedId}
          onSelectContact={handleSelect}
        />

        {/* Design System Specs Footer matching Stitch Screen Spec */}
        <footer className="mt-14 pt-4 border-t border-[#E8E6E1] flex flex-wrap items-center justify-between text-[12px] text-[#8A8782]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B6F9F]" />
              Accent #3B6F9F
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBFBFA] border border-[#E3E0D8]" />
              Canvas #FBFBFA
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#E3E0D8]" />
              Surface #FFFFFF
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8E6E1]" />
              Border #E8E6E1
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>Inter 11, 12, 13, 14, 20px</span>
            <span>•</span>
            <span>4px grid</span>
            <span>•</span>
            <span>6px &amp; 8px radii</span>
            <span>•</span>
            <span>150ms ease-out</span>
          </div>
        </footer>
      </main>

      {/* Dimmed Backdrop Overlay */}
      {selectedContact && (
        <div
          className="fixed inset-0 bg-[#1E1E1E]/20 backdrop-blur-[1px] z-20 cursor-pointer"
          onClick={handleClosePanel}
          aria-hidden="true"
        />
      )}

      {/* 420px Right-Aligned Details Panel */}
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