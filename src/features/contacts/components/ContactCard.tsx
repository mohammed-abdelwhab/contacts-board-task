import { Chip } from "../../../components/ui/Chip";
import type { ContactCardProps } from "../types";

export function ContactCard({
  contact,
  selected,
  onSelect,
}: ContactCardProps) {
  const handleClick = () => onSelect?.(contact);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`p-4 rounded-lg transition-all duration-150 cursor-pointer flex flex-col gap-2.5 text-left focus-ring outline-none w-full ${
        selected
          ? "bg-[#F8FAFC] border-2 border-[#3B6F9F] shadow-sm relative"
          : "bg-white border border-[#E8E6E1] hover:border-[#D5D2CA]"
      }`}
      data-testid={contact.id}
      data-contact-id={contact.id}
      aria-label={`Open ${contact.name}`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-medium text-[#1E1E1E]">
            {contact.name}
          </span>
          {selected && (
            <span className="text-[10px] uppercase tracking-wider text-[#3B6F9F] font-semibold bg-[#E8F0F8] px-1.5 py-0.5 rounded">
              Selected
            </span>
          )}
        </div>
        <div className="text-[13px] text-[#6E6B65] mt-0.5">{contact.company}</div>
      </div>

      {contact.labels.length > 0 ? (
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {contact.labels.map((label) => (
            <Chip key={label} label={label} />
          ))}
        </div>
      ) : (
        <div className="text-[12px] text-[#A8A49D] italic pt-0.5">No labels</div>
      )}
    </button>
  );
}