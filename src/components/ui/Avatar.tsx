import type { AvatarProps } from "../../features/contacts/types";

export function Avatar({ name, selected, size = "sm", className }: AvatarProps) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  const sizeClasses =
    size === "lg"
      ? "w-10 h-10 text-[14px]"
      : "w-6 h-6 text-[11px]";

  const colorClasses = selected || size === "lg"
    ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_0_12px_rgba(0,140,255,0.4)]"
    : "bg-white/10 text-slate-200 border border-white/10";

  return (
    <span
      aria-hidden="true"
      className={`rounded-full font-medium flex items-center justify-center shrink-0 transition-colors ${sizeClasses} ${colorClasses} ${className ?? ""}`}
    >
      {initials || "?"}
    </span>
  );
}