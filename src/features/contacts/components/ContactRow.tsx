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
      className={`transition-colors ${
        selected
          ? "bg-surface-selected"
          : "hover:bg-surface-hover"
      }`}
      style={{ backgroundColor: selected ? "var(--color-surface-selected)" : undefined }}
    >
      <th scope="row" className="relative lg:sticky lg:left-0 bg-inherit z-10">
        <div className="flex items-center gap-2 px-3 py-2 min-w-[200px]">
          <Avatar name={contact.name} />
          <button
            type="button"
            onClick={handleClick}
            className="focus-ring text-left w-full"
            aria-current={selected ? "true" : undefined}
          >
            <span className="font-medium text-ink-900">{contact.name}</span>
          </button>
        </div>
      </th>
      <td className="px-3 py-2 text-sm text-ink-700 whitespace-nowrap">
        {contact.company}
      </td>
      <td className="px-3 py-2 text-sm whitespace-nowrap">
        {contact.role ? (
          <span className="text-ink-700">{contact.role}</span>
        ) : (
          <EmptyValue />
        )}
      </td>
      <td className="px-3 py-2 text-sm whitespace-nowrap">
        {contact.owner ? (
          <span className="text-ink-700">{contact.owner}</span>
        ) : (
          <EmptyValue />
        )}
      </td>
      <td className="px-3 py-2 whitespace-nowrap">
        <LabelsCell labels={contact.labels} />
      </td>
      <td className="px-3 py-2 whitespace-nowrap">
        <StageBadge stage={contact.stage} />
      </td>
    </tr>
  );
}