import type { AvatarProps } from "../../features/contacts/types";

export function Avatar({ name }: AvatarProps) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-300/25 text-xs font-medium text-ink-700"
    >
      {initials || "?"}
    </span>
  );
}