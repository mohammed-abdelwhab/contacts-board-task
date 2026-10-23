# Contact Management UI

A minimal, accessible contact management interface with Table and Board (Kanban) views, built with React 19, TypeScript, Tailwind CSS v4, and Vite.

## Overview

This project implements a static-to-interactive contact management UI featuring:

- **Table view** — semantic `<table>` with sticky Name column, horizontal scroll, row selection
- **Board view** — four Kanban columns (Lead, Prospect, Qualified, Customer) with card-based layout
- **Details panel** — overlay panel for viewing/editing contact details (Stage, Notes) with draft/save/cancel workflow
- **Full keyboard support** — focus management, Escape to close, focus restoration

## How to Run

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Run tests
npm test
```

Requires Node 20+.

## What's Built

| Component | Purpose |
|-----------|---------|
| `ContactsPage` | Page container owning view mode + selected contact |
| `ContactTable` | Semantic table with sticky header, row selection |
| `ContactRow` | Focusable row with `data-contact-id` for focus restoration |
| `ContactBoard` | Horizontal scrolling Kanban board |
| `BoardColumn` | Column with header, count, empty state |
| `ContactCard` | Card with name, company, labels, stage badge |
| `DetailsPanel` | Overlay panel with controlled draft inputs |
| `ViewSwitch` | Accessible tab list for Table/Board |
| `Avatar`, `Chip`, `Button`, `EmptyValue` | Shared UI primitives |

## Field Allocation

| Field | Table | Card | Panel | Reasoning |
|-------|-------|------|-------|-----------|
| Name | ✓ (with avatar) | ✓ | Header | Primary identifier |
| Company | ✓ | ✓ | Header | Organizational context |
| Role | ✓ | — | Read-only | Detail-level; not for scanning |
| Owner | ✓ | — | Read-only | Detail-level; not for scanning |
| Labels | ✓ | ✓ | Chips | Scannable tags in all views |
| Stage | ✓ (badge) | ✓ (badge) | Select | Workflow control; editable in panel |
| Email | — | — | Read-only | PII; only needed for outreach |
| Notes | — | — | Textarea | Long-form; only relevant in detail view |

## Architecture and State

```
┌─────────────────────────────────────────────────────┐
│                    ContactsPage                      │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │ view: string│  │selectedId:str│  │  derived   │  │
│  └──────┬──────┘  └──────┬───────┘  └─────┬──────┘  │
│         │                │                │          │
│         ▼                ▼                ▼          │
│  ┌────────────────────────────────────────────────┐  │
│  │              ContactsProvider                   │  │
│  │  ┌──────────────────────────────────────────┐  │  │
│  │  │           useReducer(contactsReducer)    │  │  │
│  │  │  state: Contact[]  ←── INITIAL: CONTACTS │  │  │
│  │  │  action: { type: 'contact/updated',      │  │  │
│  │  │    id, changes: { stage?, notes? } }     │  │  │
│  │  └──────────────────┬───────────────────────┘  │  │
│  │                     │                          │  │
│  │  useContacts() ────►│ updateContact(id, changes)│  │
│  └─────────────────────┼──────────────────────────┘  │
└────────────────────────┼────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
    ┌─────────┐    ┌───────────┐    ┌──────────────┐
    │ Table   │    │ Board     │    │ DetailsPanel │
    │ (rows)  │    │ (cards)   │    │ (draft state)│
    └─────────┘    └───────────┘    └──────────────┘
```

### State Model (Single Source of Truth)

- **`contacts: Contact[]`** — lives **only** in the reducer. Both Table and Board derive columns by filtering `contacts` by `stage` at render time. No copies.
- **`view` (ViewMode)** and **`selectedId`** — plain `useState` in `ContactsPage`.
- **`selectedContact`** — derived via `contacts.find(c => c.id === selectedId)`.
- **Hook (`useContacts`)** — exposes `{ contacts, updateContact }`, hides `dispatch`.

### Reducer

```typescript
type ContactAction =
  | { type: 'contact/updated'; id: string; changes: Partial<Pick<Contact, 'stage' | 'notes'>> };

function contactsReducer(state: Contact[], action: ContactAction): Contact[]
```

- Unknown `id` → returns same state reference (no-op).
- Unchanged contacts keep their references (structural sharing).
- Shallow equality check on `{ stage, notes }` prevents unnecessary new array allocation.

### Draft-in-Panel Pattern

`DetailsPanel` maintains **local** draft state (`draftStage`, `draftNotes`) initialized from the contact. This isolates typing from the global store — the Table and Board **do not re-render** on keystrokes.

- **Save** — calls `updateContact(id, { stage, notes })`, then closes panel.
- **Cancel / Close / Escape** — discards draft, closes panel.
- **Opening another contact while dirty** — silently discards draft (known trade-off; see below).

### Why Context + useReducer?

- **Single source of truth** for contacts avoids sync bugs between Table and Board.
- **No prop drilling** — components access contacts via `useContacts()`.
- **Testable** — reducer is a pure function; provider can be wrapped with test data.
- **Lightweight** — ~10 contacts; no need for external state libraries.

### Deliberate No-Memoization

No `React.memo`, `useMemo`, or `useCallback` are used. With ~10 contacts and a shallow component tree, the cost of memoization (extra comparisons, closure staleness) exceeds the benefit. Re-renders are fast enough; the draft-in-panel pattern already prevents the only expensive re-render scenario (typing in Notes).

### Dirty-Draft Trade-off (Known)

> **Opening another contact while the draft is dirty silently discards unsaved changes.**

This is intentional for simplicity. A production app would add a confirmation dialog or auto-save. Documented here so the next implementer knows it's a conscious choice, not an oversight.

## Design Notes

### Type
- **Single typeface: Inter** (400/500/600 via `@fontsource/inter`).
- Scale: 12px / 13px / 14px / 16px with tight line-heights (1.4–1.6).
- Medium (500) only for emphasis; Regular (400) for body.

### Color
- **Neutral warm-gray scale** (`--color-ink-900` → `--color-ink-100`).
- **One accent**: `--color-accent` (#3B6F9F, muted steel blue) for focus rings, active tab, Save button.
- **Stage badges**: distinct muted tints (gray/blue/amber/green) — text labels always present, color never the only cue.
- **Surfaces**: page `#FCFAF8`, card `#FFFFFF`, hover `#F7F4EF`, hairline borders `#E6E3DF`.

### Spacing & Density
- **4px base rhythm** via Tailwind's spacing scale.
- Table rows: ~40px height, 12px horizontal / 8px vertical cell padding.
- Board cards: 16px internal padding, 12px gap.
- Page max-width: 1280px with 24px side padding.

### Hierarchy
- Page header: title + contact count left, ViewSwitch right.
- Table: quiet sticky header, hairline row dividers, clear hover/selected states.
- Board: well-spaced columns (280px) with stage-colored header/count, dashed-border empty state.
- Panel: grouped read-only fields (label above value), styled form controls, primary/secondary button weights, disabled Save state.

### Motion
- **150ms ease-out** (`cubic-bezier(0.22, 1, 0.36, 1)`) on hover, focus, selected, panel enter/exit.
- Gentle card transition when stage changes (via `key={contact.id}` remount).
- **`prefers-reduced-motion` respected** — all transitions become 0ms via `@media (prefers-reduced-motion: reduce)` in CSS.

## Accessibility and Keyboard Behavior

| Interaction | Behavior |
|-------------|----------|
| Table row | Focusable button in Name cell (`aria-current` on selected), `data-contact-id` for focus restoration |
| Board card | `<button role="button">` with `aria-label`, `data-contact-id` |
| ViewSwitch | `role="tablist"` / `role="tab"` with `aria-selected` |
| DetailsPanel | `role="dialog"` + `aria-label="Contact details: {name}"`, focus moves to heading on open |
| Escape key | Closes panel (same as Cancel) |
| Focus restoration | On close, returns to triggering row/card via `[data-contact-id]` |
| Contrast | WCAG AA on all text (ink-900 on surface-page = 15:1, ink-500 = 4.6:1) |

## Testing

```bash
npm test
```

- **Unit tests** (`contactsReducer.test.ts`): stage change, notes change, unknown id, structural sharing, contact count/ids uniqueness.
- **Integration tests** (`ContactsPage.test.tsx` + RTL + user-event):
  1. Open from Table → change Stage → Save → switch to Board → assert card in new column exactly once.
  2. Edit → Cancel → reopen → assert saved values (not draft).
  3. Move into empty Customer column → assert empty state disappears.
- **Queries** use `role`, `label`, `data-contact-id`, `data-testid` — never CSS classes (Phase B safe).

## Not Done / Next Steps

- Drag-and-drop reordering on Board
- Search and filters (by name, company, stage, label)
- Responsive mobile layout (< 1024px)
- Dirty-draft confirmation dialog / auto-save
- Persistence (localStorage, API sync)
- Virtualized lists for large datasets
- Column customization (show/hide, reorder)

## AI Usage

AI assisted with the first draft of the code, styling, and README. I reviewed and refactored all generated code for correctness, accessibility, and adherence to the brief.