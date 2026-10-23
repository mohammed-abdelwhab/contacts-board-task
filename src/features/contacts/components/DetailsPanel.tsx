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
      className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-white border-l border-[#E8E6E1] panel-shadow z-30 flex flex-col justify-between"
    >
      {/* Panel Header */}
      <div className="p-6 border-b border-[#E8E6E1] flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={contact.name} size="lg" />
          <div>
            <h2
              id="panel-heading"
              tabIndex={-1}
              className="text-[16px] font-semibold text-[#1E1E1E] leading-tight outline-none"
            >
              {contact.name}
            </h2>
            <p className="text-[13px] text-[#6E6B65] mt-0.5">{contact.company}</p>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          aria-label="Close details"
          onClick={onCancel}
          className="text-[#8A8782] hover:text-[#1E1E1E] hover:bg-[#F4F3EF] p-1.5 rounded-md transition-colors duration-150 focus-ring cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Panel Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
        {/* Field: Email */}
        <div>
          <label className="block text-[12px] font-normal text-[#8A8782] mb-1.5">
            Email
          </label>
          <div className="text-[14px] text-[#2D2C2A] bg-[#FAF9F6] border border-[#E8E6E1] px-3 py-2 rounded-md font-normal select-all">
            {contact.email}
          </div>
        </div>

        {/* Field: Company */}
        <div>
          <label className="block text-[12px] font-normal text-[#8A8782] mb-1.5">
            Company
          </label>
          <div className="text-[14px] text-[#2D2C2A] bg-[#FAF9F6] border border-[#E8E6E1] px-3 py-2 rounded-md font-normal">
            {contact.company}
          </div>
        </div>

        {/* Field: Role */}
        <div>
          <label className="block text-[12px] font-normal text-[#8A8782] mb-1.5">
            Role
          </label>
          <div className="text-[14px] text-[#2D2C2A] bg-[#FAF9F6] border border-[#E8E6E1] px-3 py-2 rounded-md font-normal">
            {contact.role || "—"}
          </div>
        </div>

        {/* Field: Owner */}
        <div>
          <label className="block text-[12px] font-normal text-[#8A8782] mb-1.5">
            Owner
          </label>
          <div className="text-[14px] text-[#2D2C2A] bg-[#FAF9F6] border border-[#E8E6E1] px-3 py-2 rounded-md font-normal flex items-center justify-between">
            <span>{contact.owner || "—"}</span>
            {contact.owner && (
              <span className="text-[11px] text-[#8A8782]">Internal</span>
            )}
          </div>
        </div>

        {/* Field: Labels */}
        <div>
          <label className="block text-[12px] font-normal text-[#8A8782] mb-1.5">
            Labels
          </label>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {contact.labels.length > 0 ? (
              contact.labels.map((l) => (
                <span
                  key={l}
                  className="text-[12px] text-[#5E5B55] bg-[#F4F3EF] border border-[#E5E3DE] rounded px-2 py-0.5 font-medium"
                >
                  {l}
                </span>
              ))
            ) : (
              <span className="text-[13px] text-[#A8A49D]">—</span>
            )}
          </div>
        </div>

        {/* Field: Stage */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="contact-stage-select" className="block text-[12px] font-normal text-[#8A8782]">
              Stage
            </label>
            {isStageDirty && (
              <span className="text-[11px] text-[#3B6F9F] font-medium bg-[#E8F0F8] px-1.5 py-0.5 rounded">
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
              className="w-full bg-white border border-[#E8E6E1] focus:border-[#3B6F9F] text-[14px] text-[#2C577D] font-medium px-3 py-2 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#3B6F9F]/20 transition-all cursor-pointer"
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#3B6F9F]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Field: Notes */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="contact-notes-input" className="block text-[12px] font-normal text-[#8A8782]">
              Notes
            </label>
            {isNotesDirty && (
              <span className="text-[11px] text-[#3B6F9F] font-medium">Unsaved changes</span>
            )}
          </div>
          <textarea
            id="contact-notes-input"
            aria-label="Notes"
            rows={4}
            value={draftNotes}
            onChange={(e) => setDraftNotes(e.target.value)}
            placeholder="No notes yet"
            className="w-full bg-white border border-[#E8E6E1] text-[14px] text-[#1E1E1E] p-3 rounded-md focus-ring outline-none resize-none transition-all placeholder:text-[#A8A49D]"
          />
        </div>
      </div>

      {/* Panel Footer */}
      <div className="p-4 border-t border-[#E8E6E1] bg-[#FAF9F6] flex items-center justify-end gap-2.5">
        <button
          type="button"
          onClick={onCancel}
          className="px-3.5 py-1.5 text-[13px] font-normal text-[#4A4844] bg-white border border-[#E3E0D8] rounded-md hover:bg-[#F4F3EF] hover:border-[#D5D2CA] transition-colors duration-150 focus-ring cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!isDirty}
          onClick={handleSave}
          className={`px-4 py-1.5 text-[13px] font-medium rounded-md shadow-sm transition-colors duration-150 flex items-center gap-1.5 focus-ring ${
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