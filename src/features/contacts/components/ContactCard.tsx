import { Chip } from "../../../components/ui/Chip";
import { STAGE_STYLE } from "../constants";
import type { ContactCardProps } from "../types";

export function ContactCard({
  contact,
  selected,
  onSelect,
}: ContactCardProps) {
  const meta = STAGE_STYLE[contact.stage];
  const handleClick = () => onSelect?.(contact);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-xl p-4 transition-all duration-150 cursor-pointer flex flex-col gap-3 text-left focus-ring outline-none w-full border ${
        selected
          ? "bg-[#F4F8FC] border-2 border-[#3B6F9F] shadow-sm relative"
          : "bg-white border-[#E5E2DC] shadow-2xs hover:border-[#CBD3DC] hover:shadow-sm"
      }`}
      data-testid={contact.id}
      data-contact-id={contact.id}
      aria-label={`Open ${contact.name}`}
    >
      {/* Top row: Name & Selected indicator */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[14px] font-semibold text-[#1E1E1E] leading-snug">
            {contact.name}
          </span>
          {selected && (
            <span className="text-[10px] uppercase tracking-wider text-[#1D5685] font-bold bg-[#E8F0F8] px-2 py-0.5 rounded-full border border-[#C5DFF5]">
              Selected
            </span>
          )}
        </div>
        <div className="text-[12px] text-[#6E6B65] mt-1 flex items-center gap-1.5">
          <span className="font-medium text-[#4A4844]">{contact.company}</span>
          {contact.role && (
            <>
              <span className="text-[#A8A49D]">•</span>
              <span className="text-[#6E6B65]">{contact.role}</span>
            </>
          )}
        </div>
      </div>

      {/* Labels */}
      {contact.labels.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {contact.labels.map((label) => (
            <Chip key={label} label={label} />
          ))}
        </div>
      ) : (
        <div className="text-[11px] text-[#A8A49D] italic">No labels</div>
      )}

      {/* Footer metadata: Stage & Owner */}
      <div className="flex items-center justify-between pt-2.5 border-t border-[#F0EFEA] text-[11px]">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md font-medium text-[11px] border ${meta.bg} ${meta.text} ${meta.border}`}
        >
          {contact.stage}
        </span>
        {contact.owner ? (
          <span className="text-[11px] text-[#8A8782] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A8782]/60" />
            {contact.owner}
          </span>
        ) : (
          <span className="text-[11px] text-[#A8A49D]">—</span>
        )}
      </div>
    </button>
  );
}