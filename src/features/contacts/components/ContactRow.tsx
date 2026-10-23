import { Avatar } from "../../../components/ui/Avatar";
import { Chip } from "../../../components/ui/Chip";
import { EmptyValue } from "../../../components/ui/EmptyValue";
import { STAGE_STYLE } from "../constants";
import type { ContactRowProps, Stage } from "../types";

function StageBadge({ stage }: { stage: Stage }) {
  const { bg, text } = STAGE_STYLE[stage];
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${bg} ${text}`}>
      {stage}
    </span>
  );
}

function LabelsCell({ labels }: { labels: string[] }) {
  if (labels.length === 0) return <EmptyValue />;
  return (
    <span className="flex flex-wrap gap-1">
      {labels.map((label) => (
        <Chip key={label} label={label} />
      ))}
    </span>
  );
}

export function ContactRow({ contact, selected, onSelect }: ContactRowProps) {
  const handleClick = () => onSelect?.(contact);

  return (
    <tr
      className={`transition-base ${
        selected
          ? "bg-surface-selected"
          : "hover:bg-surface-hover"
      }`}
      style={{ backgroundColor: selected ? "var(--color-surface-selected)" : undefined }}
    >
      <th scope="row" className="relative lg:sticky lg:left-0 bg-inherit z-10">
        <div className="flex items-center gap-3 px-3 py-2.5 min-w-[220px]">
          <Avatar name={contact.name} />
          <button
            type="button"
            onClick={handleClick}
            className="focus-ring text-left w-full"
            aria-current={selected ? "true" : undefined}
            aria-label={`Open ${contact.name}`}
            data-testid={contact.id}
            data-contact-id={contact.id}
          >
            <span className="font-medium text-ink-900">{contact.name}</span>
          </button>
        </div>
      </th>
      <td className="px-3 py-2.5 text-sm text-ink-700 whitespace-nowrap border-l border-surface-line/50">
        {contact.company}
      </td>
      <td className="px-3 py-2.5 text-sm whitespace-nowrap border-l border-surface-line/50">
        {contact.role ? (
          <span className="text-ink-700">{contact.role}</span>
        ) : (
          <EmptyValue />
        )}
      </td>
      <td className="px-3 py-2.5 text-sm whitespace-nowrap border-l border-surface-line/50">
        {contact.owner ? (
          <span className="text-ink-700">{contact.owner}</span>
        ) : (
          <EmptyValue />
        )}
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap border-l border-surface-line/50">
        <LabelsCell labels={contact.labels} />
      </td>
      <td className="px-3 py-2.5 whitespace-nowrap border-l border-surface-line/50">
        <StageBadge stage={contact.stage} />
      </td>
    </tr>
  );
}