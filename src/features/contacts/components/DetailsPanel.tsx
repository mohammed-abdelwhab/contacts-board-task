import { useState } from "react";
import { Avatar } from "../../../components/ui/Avatar";
import { STAGES } from "../constants";
import type { DetailsPanelProps, Stage } from "../types";

export function DetailsPanel({ contact, onSave, onCancel }: DetailsPanelProps) {
  const [draftStage, setDraftStage] = useState<Stage>(contact.stage);
  const [draftNotes, setDraftNotes] = useState<string>(contact.notes ?? "");

  const isStageDirty = draftStage !== contact.stage;
  const isNotesDirty = draftNotes !== (contact.notes ?? "");
  const isDirty = isStageDirty || isNotesDirty;

  const handleSave = () => {
    onSave?.(draftStage, draftNotes);
  };

  return (
    <aside
      role="dialog"
      aria-label={`Contact details: ${contact.name}`}
      className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-white border-l border-[#E2DFD8] panel-shadow z-50 flex flex-col justify-between"
    >
      {/* Panel Header */}
      <div className="p-6 border-b border-[#E8E6E1] flex items-start justify-between bg-white">
        <div className="flex items-center gap-3.5">
          <Avatar name={contact.name} size="lg" />
          <div>
            <h2
              id="panel-heading"
              tabIndex={-1}
              className="text-[17px] font-bold text-[#1E1E1E] leading-tight outline-none"
            >
              {contact.name}
            </h2>
            <p className="text-[13px] text-[#6E6B65] mt-0.5">{contact.company}</p>
          </div>
        </div>

        {/* Clearly Visible Close Button */}
        <button
          type="button"
          aria-label="Close details"
          onClick={onCancel}
          className="p-2 text-[#4A4844] hover:text-[#1E1E1E] bg-[#F4F3EF] hover:bg-[#E8E6E1] rounded-full transition-all duration-150 cursor-pointer focus-ring shadow-2xs"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Panel Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar bg-white">
        {/* Field: Email */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A8782] mb-1.5">
            Email
          </label>
          <div className="text-[13px] text-[#2D2C2A] bg-[#FAF9F6] border border-[#E8E6E1] px-3.5 py-2.5 rounded-lg font-medium select-all">
            {contact.email}
          </div>
        </div>

        {/* Field: Company */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A8782] mb-1.5">
            Company
          </label>
          <div className="text-[13px] text-[#2D2C2A] bg-[#FAF9F6] border border-[#E8E6E1] px-3.5 py-2.5 rounded-lg font-medium">
            {contact.company}
          </div>
        </div>

        {/* Field: Role */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A8782] mb-1.5">
            Role
          </label>
          <div className="text-[13px] text-[#2D2C2A] bg-[#FAF9F6] border border-[#E8E6E1] px-3.5 py-2.5 rounded-lg font-medium">
            {contact.role || "—"}
          </div>
        </div>

        {/* Field: Owner */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A8782] mb-1.5">
            Owner
          </label>
          <div className="text-[13px] text-[#2D2C2A] bg-[#FAF9F6] border border-[#E8E6E1] px-3.5 py-2.5 rounded-lg font-medium flex items-center justify-between">
            <span>{contact.owner || "—"}</span>
            {contact.owner && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1D5685] bg-[#E8F0F8] px-2 py-0.5 rounded-full">
                Internal
              </span>
            )}
          </div>
        </div>

        {/* Field: Labels */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A8782] mb-1.5">
            Labels
          </label>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {contact.labels.length > 0 ? (
              contact.labels.map((l) => (
                <span
                  key={l}
                  className="text-[11px] font-medium text-[#4A4844] bg-[#F4F3EF] border border-[#E5E3DE] rounded-md px-2.5 py-1"
                >
                  {l}
                </span>
              ))
            ) : (
              <span className="text-[12px] text-[#A8A49D] italic">—</span>
            )}
          </div>
        </div>

        {/* Field: Stage Dropdown */}
        <div className="pt-2 border-t border-[#F0EFEA]">
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="contact-stage-select"
              className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A8782]"
            >
              Stage
            </label>
            {isStageDirty && (
              <span className="text-[10px] uppercase font-bold text-[#1D5685] bg-[#E8F0F8] px-2 py-0.5 rounded-full border border-[#C5DFF5]">
                Modified
              </span>
            )}
          </div>
          <div className="relative">
            <select
              id="contact-stage-select"
              aria-label="Stage"
              value={draftStage}
              onChange={(e) => setDraftStage(e.target.value as Stage)}
              className="w-full bg-white border border-[#D5D2CA] focus:border-[#3B6F9F] text-[13px] text-[#1E1E1E] font-medium px-3.5 py-2.5 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B6F9F]/20 transition-all cursor-pointer shadow-2xs"
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#6E6B65]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Field: Notes */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="contact-notes-input"
              className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A8782]"
            >
              Notes
            </label>
            {isNotesDirty && (
              <span className="text-[10px] uppercase font-bold text-[#FF5733] bg-[#FFF0ED] px-2 py-0.5 rounded-full border border-[#FFD5CC]">
                Unsaved changes
              </span>
            )}
          </div>
          <textarea
            id="contact-notes-input"
            aria-label="Notes"
            rows={4}
            value={draftNotes}
            onChange={(e) => setDraftNotes(e.target.value)}
            placeholder="Type notes regarding client discussion, follow-ups, or requirements..."
            className="w-full bg-white border border-[#D5D2CA] text-[13px] text-[#1E1E1E] p-3 rounded-lg focus-ring outline-none resize-none transition-all placeholder:text-[#A8A49D] shadow-2xs leading-relaxed"
          />
        </div>
      </div>

      {/* Panel Footer */}
      <div className="p-4 border-t border-[#E8E6E1] bg-[#FAF9F6] flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-[13px] font-medium text-[#4A4844] bg-white border border-[#D5D2CA] rounded-lg hover:bg-[#F4F3EF] hover:border-[#B8B4AA] transition-colors duration-150 focus-ring cursor-pointer shadow-2xs"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!isDirty}
          onClick={handleSave}
          className={`px-5 py-2 text-[13px] font-semibold rounded-lg shadow-sm transition-all duration-150 flex items-center gap-1.5 focus-ring ${
            isDirty
              ? "text-white bg-[#3B6F9F] hover:bg-[#315C84] cursor-pointer"
              : "text-[#A8A49D] bg-[#F0EFEA] border border-[#E2E0D8] cursor-not-allowed"
          }`}
        >
          Save
        </button>
      </div>
    </aside>
  );
}