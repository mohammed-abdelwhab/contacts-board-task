import { Avatar } from "../../../components/ui/Avatar";
import { Chip } from "../../../components/ui/Chip";
import { STAGE_STYLE } from "../constants";
import type { ContactCardProps } from "../types";

export function ContactCard({
  contact,
  selected,
  onSelect,
}: ContactCardProps) {
  const { bg, text } = STAGE_STYLE[contact.stage];

  const handleClick = () => onSelect?.(contact);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex flex-col gap-2 rounded-lg border p-3 transition-colors focus-ring ${
        selected
          ? "border-surface-selected-border bg-surface-selected"
          : "border-surface-line bg-surface-card hover:border-accent/30 hover:shadow-sm"
      }`}
      style={{
        borderColor: selected ? "var(--color-surface-selected-border)" : undefined,
        backgroundColor: selected ? "var(--color-surface-selected)" : undefined,
      }}
      data-testid={contact.id}
      data-contact-id={contact.id}
      aria-label={`Open ${contact.name}`}
    >
      <div className="flex items-start gap-2">
        <Avatar name={contact.name} />
        <div className="min-w-0 flex-1">
          <h4 className="font-medium text-ink-900 truncate">{contact.name}</h4>
          <p className="text-sm text-ink-500 truncate">{contact.company}</p>
        </div>
      </div>

      {contact.labels.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {contact.labels.map((label) => (
            <Chip key={label} label={label} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-1">
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${bg} ${text}`}>
          {contact.stage}
        </span>
      </div>
    </button>
  );
}