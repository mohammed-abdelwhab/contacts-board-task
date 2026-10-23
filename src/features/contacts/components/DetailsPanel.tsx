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
      className="fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-[#0A1020] border-l border-white/10 panel-shadow z-50 flex flex-col justify-between text-white"
    >
      {/* Panel Header */}
      <div className="p-6 border-b border-white/10 flex items-start justify-between bg-[#080D1A]">
        <div className="flex items-center gap-3.5">
          <Avatar name={contact.name} size="lg" />
          <div>
            <h2
              id="panel-heading"
              tabIndex={-1}
              className="text-[17px] font-bold text-white leading-tight outline-none"
            >
              {contact.name}
            </h2>
            <p className="text-[13px] text-slate-400 mt-0.5">{contact.company}</p>
          </div>
        </div>

        {/* Clearly Visible Close Button */}
        <button
          type="button"
          aria-label="Close details"
          onClick={onCancel}
          className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all duration-150 cursor-pointer focus-ring shadow-xs"
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
      <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar bg-[#0A1020]">
        {/* Field: Email */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Email
          </label>
          <div className="text-[13px] text-slate-200 bg-white/[0.04] border border-white/10 px-3.5 py-2.5 rounded-xl font-medium select-all">
            {contact.email}
          </div>
        </div>

        {/* Field: Company */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Company
          </label>
          <div className="text-[13px] text-slate-200 bg-white/[0.04] border border-white/10 px-3.5 py-2.5 rounded-xl font-medium">
            {contact.company}
          </div>
        </div>

        {/* Field: Role */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Role
          </label>
          <div className="text-[13px] text-slate-200 bg-white/[0.04] border border-white/10 px-3.5 py-2.5 rounded-xl font-medium">
            {contact.role || "—"}
          </div>
        </div>

        {/* Field: Owner */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Owner
          </label>
          <div className="text-[13px] text-slate-200 bg-white/[0.04] border border-white/10 px-3.5 py-2.5 rounded-xl font-medium flex items-center justify-between">
            <span>{contact.owner || "—"}</span>
            {contact.owner && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300 bg-blue-950/80 px-2 py-0.5 rounded-full border border-cyan-800/80">
                Internal
              </span>
            )}
          </div>
        </div>

        {/* Field: Labels */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Labels
          </label>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {contact.labels.length > 0 ? (
              contact.labels.map((l) => (
                <span
                  key={l}
                  className="text-[11px] font-medium text-slate-300 bg-white/5 border border-white/10 rounded-md px-2.5 py-1"
                >
                  {l}
                </span>
              ))
            ) : (
              <span className="text-[12px] text-slate-500 italic">—</span>
            )}
          </div>
        </div>

        {/* Field: Stage Dropdown */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="contact-stage-select"
              className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400"
            >
              Stage
            </label>
            {isStageDirty && (
              <span className="text-[10px] uppercase font-bold text-cyan-300 bg-blue-950/80 px-2 py-0.5 rounded-full border border-cyan-800/80">
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
              className="w-full bg-[#0F182E] border border-white/15 focus:border-cyan-400 text-[13px] text-white font-medium px-3.5 py-2.5 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer shadow-xs"
            >
              {STAGES.map((s) => (
                <option key={s} value={s} className="bg-[#0B1325] text-white">
                  {s}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
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
              className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400"
            >
              Notes
            </label>
            {isNotesDirty && (
              <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-800/80">
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
            className="w-full bg-[#0F182E] border border-white/15 text-[13px] text-white p-3 rounded-xl focus-ring outline-none resize-none transition-all placeholder:text-slate-500 shadow-xs leading-relaxed"
          />
        </div>
      </div>

      {/* Panel Footer */}
      <div className="p-4 border-t border-white/10 bg-[#080D1A] flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-[13px] font-medium text-slate-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white transition-colors duration-150 focus-ring cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={!isDirty}
          onClick={handleSave}
          className={`px-5 py-2 text-[13px] font-semibold rounded-xl transition-all duration-150 flex items-center gap-1.5 focus-ring ${
            isDirty
              ? "text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-[0_0_20px_rgba(0,120,255,0.45)] cursor-pointer"
              : "text-slate-500 bg-white/5 border border-white/10 cursor-not-allowed"
          }`}
        >
          Save
        </button>
      </div>
    </aside>
  );
}