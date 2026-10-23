export type Stage = "Lead" | "Prospect" | "Qualified" | "Customer";

export type ViewMode = "table" | "board";

export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  role?: string;
  owner?: string;
  labels: string[];
  stage: Stage;
  notes?: string;
}

// Shared primitives ----------------------------------------------------------

export interface AvatarProps {
  name: string;
  selected?: boolean | undefined;
  size?: "sm" | "md" | "lg" | undefined;
  className?: string | undefined;
}

export interface EmptyValueProps {
  /** Rendered when the value is missing. Defaults to "—". */
  children?: string;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  /** Forwarded to the icon-only button for screen readers. */
  "aria-label"?: string;
}

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  title?: string;
}

export interface ChipProps {
  label: string;
  selected?: boolean | undefined;
}

// View switch ----------------------------------------------------------------

export interface ViewSwitchProps {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

// Table ----------------------------------------------------------------------

export interface ContactRowProps {
  contact: Contact;
  selected?: boolean;
  onSelect?: ((contact: Contact) => void) | undefined;
}

export interface ContactTableProps {
  contacts: Contact[];
  selectedId?: string | undefined;
  onSelectContact?: ((contact: Contact) => void) | undefined;
}

// Board ----------------------------------------------------------------------

export interface ContactCardProps {
  contact: Contact;
  selected?: boolean;
  onSelect?: ((contact: Contact) => void) | undefined;
}

export interface BoardColumnProps {
  stage: Stage;
  contacts: Contact[];
  selectedId?: string | undefined;
  onSelectContact?: ((contact: Contact) => void) | undefined;
}

export interface ContactBoardProps {
  contacts: Contact[];
  selectedId?: string | undefined;
  onSelectContact?: ((contact: Contact) => void) | undefined;
}

// Details panel --------------------------------------------------------------

export interface DetailsPanelProps {
  contact: Contact;
  /** Optional callback wired to the Save button. Receives the new stage and notes. */
  onSave?: (stage: Stage, notes: string) => void;
  /** Optional callback wired to the Cancel button. */
  onCancel?: () => void;
}