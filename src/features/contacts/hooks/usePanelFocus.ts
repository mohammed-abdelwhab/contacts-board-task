import { useEffect, useRef } from "react";

export function usePanelFocus(
  isOpen: boolean,
  onClose: () => void,
  triggerId: string | null
) {
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = triggerId
        ? document.querySelector(`[data-contact-id="${triggerId}"]`)
        : document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

      const heading = document.getElementById("panel-heading");
      heading?.focus();
    } else if (triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [isOpen, triggerId]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
}