import type {
  ButtonProps,
  IconButtonProps,
} from "../../features/contacts/types";

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-md border text-sm font-medium transition-base focus-ring disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "border-transparent bg-accent text-white hover:bg-accent/90 active:bg-accent disabled:hover:bg-accent shadow-xs hover:shadow-sm",
  secondary:
    "border-surface-line bg-surface-card text-ink-700 hover:bg-surface-hover hover:border-ink-300 active:bg-surface-hover shadow-xs",
  ghost:
    "border-transparent bg-transparent text-ink-700 hover:bg-surface-hover active:bg-surface-hover",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
};

export function Button({
  variant = "secondary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={[base, variants[variant], sizes[size], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

Button.Icon = function IconButton({
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={[
        "inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-ink-700 transition-base hover:bg-surface-hover active:bg-surface-hover focus-ring",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
};