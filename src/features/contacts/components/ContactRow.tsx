import { Avatar } from "../../../components/ui/Avatar";
import { Chip } from "../../../components/ui/Chip";
import { EmptyValue } from "../../../components/ui/EmptyValue";
import { STAGE_STYLE } from "../constants";
import type { ContactRowProps, Stage } from "../types";

function StageBadge({ stage }: { stage: Stage }) {
  const { bg, text, border } = STAGE_STYLE[stage];
  return (
    <span
      className={`inline-flex items-center text-[12px] font-medium rounded px-2 py-0.5 border ${bg} ${text} ${border}`}
    >
      {stage}
    </span>
  );
}

function LabelsCell({ labels, selected }: { labels: string[]; selected?: boolean | undefined }) {
  if (labels.length === 0) return <EmptyValue />;
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {labels.map((label) => (
        <Chip key={label} label={label} selected={selected} />
      ))}
    </div>
  );
}

export function ContactRow({ contact, selected, onSelect }: ContactRowProps) {
  const handleClick = () => onSelect?.(contact);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <tr
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`transition-colors duration-150 cursor-pointer h-[40px] ${
        selected
          ? "bg-[#EEF4F9] border-l-2 border-l-[#3B6F9F]"
          : "hover:bg-[#FAF9F6]"
      }`}
    >
      <td className="py-2 px-4">
        <div className="flex items-center gap-2.5">
          <Avatar name={contact.name} selected={selected} />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="focus-ring text-left outline-none cursor-pointer"
            aria-current={selected ? "true" : undefined}
            aria-label={`Open ${contact.name}`}
            data-testid={contact.id}
            data-contact-id={contact.id}
          >
            <span
              className={`font-medium ${
                selected ? "text-[#2C577D]" : "text-[#1E1E1E]"
              }`}
            >
              {contact.name}
            </span>
          </button>
        </div>
      </td>
      <td
        className={`py-2 px-4 ${
          selected ? "text-[#1E1E1E] font-medium" : "text-[#4A4844]"
        }`}
      >
        {contact.company}
      </td>
      <td className="py-2 px-4 text-[#6E6B65]">
        {contact.role ? (
          <span>{contact.role}</span>
        ) : (
          <EmptyValue />
        )}
      </td>
      <td className="py-2 px-4 text-[#4A4844]">
        {contact.owner ? (
          <span>{contact.owner}</span>
        ) : (
          <EmptyValue />
        )}
      </td>
      <td className="py-2 px-4">
        <LabelsCell labels={contact.labels} selected={selected} />
      </td>
      <td className="py-2 px-4">
        <StageBadge stage={contact.stage} />
      </td>
    </tr>
  );
}