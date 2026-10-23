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
    ? "bg-[#3B6F9F] text-white"
    : "bg-[#EFECE6] text-[#5E5B55]";

  return (
    <span
      aria-hidden="true"
      className={`rounded-full font-medium flex items-center justify-center shrink-0 transition-colors ${sizeClasses} ${colorClasses} ${className ?? ""}`}
    >
      {initials || "?"}
    </span>
  );
}