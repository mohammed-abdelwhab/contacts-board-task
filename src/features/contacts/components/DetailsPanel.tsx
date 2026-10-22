import { X } from "lucide-react";
import { Chip } from "../../../components/ui/Chip";
import { EmptyValue } from "../../../components/ui/EmptyValue";
import { Button } from "../../../components/ui/Button";
import { STAGE_STYLE, STAGES } from "../constants";
import type { DetailsPanelProps, Stage } from "../types";

function FieldLabel({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return (
    <dt className={`text-xs font-medium text-ink-500 uppercase tracking-wider ${className ?? ""}`}>
      {children}
    </dt>
  );
}

function FieldValue({ children }: { children: React.ReactNode }) {
  return <dd className="text-sm text-ink-700">{children}</dd>;
}

export function DetailsPanel({ contact, onSave, onCancel }: DetailsPanelProps) {
  const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSave?.(e.target.value as Stage, contact.notes ?? "");
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onSave?.(contact.stage, e.target.value);
  };

  const handleSave = () => {
    onSave?.(contact.stage, contact.notes ?? "");
  };

  return (
    <aside
      role="dialog"
      aria-label={`Contact details: ${contact.name}`}
      className="relative flex flex-col h-full w-full lg:w-[400px] lg:flex-shrink-0 rounded-lg border border-surface-line bg-surface-card"
    >
      <header className="flex items-center justify-between border-b border-surface-line px-4 py-3">
        <div>
          <h2 className="font-medium text-ink-900">{contact.name}</h2>
          <p className="text-sm text-ink-500">{contact.company}</p>
        </div>
        <Button.Icon
          type="button"
          aria-label="Close panel"
          onClick={onCancel}
          className="text-ink-500 hover:text-ink-700"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button.Icon>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <dl className="space-y-3">
          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2">
            <FieldLabel>Email</FieldLabel>
            <FieldValue>{contact.email}</FieldValue>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2">
            <FieldLabel>Company</FieldLabel>
            <FieldValue>{contact.company}</FieldValue>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2">
            <FieldLabel>Role</FieldLabel>
            <FieldValue>
              {contact.role ? (
                <span>{contact.role}</span>
              ) : (
                <EmptyValue />
              )}
            </FieldValue>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2">
            <FieldLabel>Owner</FieldLabel>
            <FieldValue>
              {contact.owner ? (
                <span>{contact.owner}</span>
              ) : (
                <EmptyValue />
              )}
            </FieldValue>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2">
            <FieldLabel>Labels</FieldLabel>
            <FieldValue>
              {contact.labels.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {contact.labels.map((label) => (
                    <Chip key={label} label={label} />
                  ))}
                </div>
              ) : (
                <EmptyValue />
              )}
            </FieldValue>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2">
            <FieldLabel>Stage</FieldLabel>
            <FieldValue>
              <select
                defaultValue={contact.stage}
                onChange={handleStageChange}
                className="w-full rounded-md border border-surface-line bg-surface-card px-2 py-1 text-sm text-ink-700 focus-ring"
              >
                {STAGES.map((stage) => {
                  const { bg, text } = STAGE_STYLE[stage];
                  return (
                    <option key={stage} value={stage} className={`${bg} ${text}`}>
                      {stage}
                    </option>
                  );
                })}
              </select>
            </FieldValue>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2">
            <FieldLabel className="pt-2">Notes</FieldLabel>
            <FieldValue>
              <textarea
                defaultValue={contact.notes ?? ""}
                onChange={handleNotesChange}
                rows={4}
                className="w-full rounded-md border border-surface-line bg-surface-card px-2 py-1.5 text-sm text-ink-700 placeholder:text-ink-500 focus-ring resize-none"
                placeholder="No notes yet"
              />
            </FieldValue>
          </div>
        </dl>
      </div>

      <footer className="flex items-center justify-end gap-2 border-t border-surface-line px-4 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleSave}
        >
          Save
        </Button>
      </footer>
    </aside>
  );
}