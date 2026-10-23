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
      className={`rounded-xl p-4 transition-all duration-200 cursor-pointer flex flex-col gap-3 text-left focus-ring outline-none w-full border ${
        selected
          ? "bg-[#132347] border-2 border-[#0099FF] shadow-[0_0_20px_rgba(0,153,255,0.25)] relative"
          : "bg-[#0E182E]/80 hover:bg-[#13203C] border-white/10 hover:border-cyan-500/40 shadow-lg hover:shadow-[0_0_15px_rgba(0,180,255,0.15)]"
      }`}
      data-testid={contact.id}
      data-contact-id={contact.id}
      aria-label={`Open ${contact.name}`}
    >
      {/* Top row: Name & Selected indicator */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[14px] font-semibold text-white leading-snug">
            {contact.name}
          </span>
          {selected && (
            <span className="text-[10px] uppercase tracking-wider text-cyan-300 font-bold bg-blue-950/80 px-2 py-0.5 rounded-full border border-cyan-800/80">
              Selected
            </span>
          )}
        </div>
        <div className="text-[12px] text-slate-400 mt-1 flex items-center gap-1.5">
          <span className="font-medium text-slate-300">{contact.company}</span>
          {contact.role && (
            <>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{contact.role}</span>
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
        <div className="text-[11px] text-slate-500 italic">No labels</div>
      )}

      {/* Footer metadata: Stage & Owner */}
      <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.08] text-[11px]">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md font-medium text-[11px] border ${meta.bg} ${meta.text} ${meta.border}`}
        >
          {contact.stage}
        </span>
        {contact.owner ? (
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            {contact.owner}
          </span>
        ) : (
          <span className="text-[11px] text-slate-500">—</span>
        )}
      </div>
    </button>
  );
}