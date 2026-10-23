import { Avatar } from "../../../components/ui/Avatar";
import { Chip } from "../../../components/ui/Chip";
import { EmptyValue } from "../../../components/ui/EmptyValue";
import { STAGE_STYLE } from "../constants";
import type { ContactRowProps, Stage } from "../types";

function StageBadge({ stage }: { stage: Stage }) {
  const { bg, text, border } = STAGE_STYLE[stage];
  return (
    <span
      className={`inline-flex items-center text-[12px] font-medium rounded-md px-2.5 py-0.5 border shadow-2xs ${bg} ${text} ${border}`}
    >
      {stage}
    </span>
  );
}

function LabelsCell({
  labels,
  selected,
}: {
  labels: string[];
  selected?: boolean | undefined;
}) {
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
  const meta = STAGE_STYLE[contact.stage];
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
      className={`transition-colors duration-150 cursor-pointer h-12 border-b border-[#F0EFEA] ${
        selected
          ? "bg-[#EEF4F9] border-l-4 border-l-[#3B6F9F]"
          : "hover:bg-[#FAF9F6]"
      }`}
    >
      {/* Name Column with Stage-Synced Badge & Generous Spacing */}
      <td className="py-2.5 px-4">
        <div className="flex items-center gap-3">
          <Avatar name={contact.name} selected={selected} />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="focus-ring text-left outline-none cursor-pointer p-0 bg-transparent border-0"
            aria-current={selected ? "true" : undefined}
            aria-label={`Open ${contact.name}`}
            data-testid={contact.id}
            data-contact-id={contact.id}
          >
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-md text-[13px] font-medium transition-all shadow-2xs ${meta.nameBadge}`}
            >
              {contact.name}
            </span>
          </button>
        </div>
      </td>

      {/* Company */}
      <td
        className={`py-2.5 px-4 text-[13px] ${
          selected ? "text-[#1E1E1E] font-medium" : "text-[#4A4844]"
        }`}
      >
        {contact.company}
      </td>

      {/* Role */}
      <td className="py-2.5 px-4 text-[13px] text-[#6E6B65]">
        {contact.role ? <span>{contact.role}</span> : <EmptyValue />}
      </td>

      {/* Owner */}
      <td className="py-2.5 px-4 text-[13px] text-[#4A4844]">
        {contact.owner ? (
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A8782]/70" />
            {contact.owner}
          </span>
        ) : (
          <EmptyValue />
        )}
      </td>

      {/* Labels */}
      <td className="py-2.5 px-4">
        <LabelsCell labels={contact.labels} selected={selected} />
      </td>

      {/* Stage */}
      <td className="py-2.5 px-4">
        <StageBadge stage={contact.stage} />
      </td>
    </tr>
  );
}