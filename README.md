# Contact Management UI

A minimal, accessible, and responsive contact management interface featuring Table and Board (Kanban) views, built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**.

---

## Overview

This project implements a fully interactive contact management UI adhering to modern design principles and strict accessibility standards:

- **Table View** — Semantic `<table>` with sticky Name column, horizontal scroll container, responsive padding, stage-synchronized name badges, and keyboard-selectable rows.
- **Board View (Kanban)** — Notion-inspired horizontal column layout with intelligent 3-column wrapping (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`), live column contact counts, stage indicator dots, and empty state placeholders.
- **Details Panel** — Slide-over drawer with high-contrast close button, dimmed backdrop blur overlay, and isolated draft editing for Stage and Notes with explicit Save/Cancel workflow.
- **State Synchronization** — Single source of truth powered by `useReducer` and React Context; updates made in the details drawer immediately sync across both Table and Board views.
- **Full Keyboard & A11y Support** — Full Tab navigation, Enter/Space activation, Escape key dismiss, and focus restoration to the triggering row/card using `data-contact-id`.
- **Catchy Modern Aesthetics** — Deep cosmic midnight canvas (`#030712`) with ambient celestial cyan/blue glows, sleek frosted glass surfaces, and smooth micro-animations.

---

## How to Run Locally

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Run production build
npm run build

# Preview production build locally
npm run preview

# Run automated test suite
npm test
```

> **Requirements:** Node.js 20+ and npm 10+.

---

## Deployment (Vercel)

Deploying this repository to Vercel requires **zero manual setup or secrets** in GitHub.

### Step-by-Step Deployment:
1. **Push to GitHub**: Ensure your latest changes are pushed to your remote repository branch (e.g. `main`).
2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in.
   - Click **Add New... > Project**.
   - Select and import this repository (`mohammed-abdelwhab/contacts-board-task`).
3. **Build & Output Settings**:
   - Vercel automatically detects **Vite**.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. **Deploy**:
   - Click **Deploy**. Your site will build and be live in seconds with preview and production URLs.
5. **SPA Routing Support**:
   - The repository includes `vercel.json` pre-configured with client-side rewrites so direct navigation and page refreshes work seamlessly.

---

## What's Built

| Component | Purpose |
|-----------|---------|
| `ContactsPage` | Root container managing active view mode, selection state, backdrop, and drawer |
| `ContactTable` | Semantic table with sticky name column, responsive scrolling, and row selection |
| `ContactRow` | Keyboard-accessible table row with stage-synced name badge and avatar initials |
| `ContactBoard` | Responsive Notion-style Kanban board (3-column wrap on desktop, 1-2 on mobile/tablet) |
| `BoardColumn` | Kanban column with stage indicator dot, live count pill, and dashed empty state |
| `ContactCard` | Notion-style card with name, company, role, owner, labels, and stage pill |
| `DetailsPanel` | Accessible slide-over right drawer with isolated draft inputs, backdrop, and focus lock |
| `ViewSwitch` | Modern animated segmented toggle with Aqua Blue / Sunset Orange status indicators |
| `Avatar`, `Chip`, `Button`, `EmptyValue` | Reusable atomic UI primitives |

---

## Field Allocation

| Field | Table | Card | Panel | Reasoning |
|-------|:-----:|:----:|:-----:|-----------|
| **Name** | ✓ (with avatar) | ✓ | Header | Primary identifier with initials avatar |
| **Company** | ✓ | ✓ | Header | Crucial organizational context |
| **Role** | ✓ | — | Read-only | Detail-level metadata; shown in panel |
| **Owner** | ✓ | — | Read-only | Account executive assignment |
| **Labels** | ✓ | ✓ | Chips | Fast scannable taxonomy badges |
| **Stage** | ✓ (badge) | ✓ (badge) | Select | Workflow status; directly editable in panel |
| **Email** | — | — | Read-only | PII data; reserved for detail drawer |
| **Notes** | — | — | Textarea | Free-form notes; editable with draft isolation |

---

## Architecture and State Management

```
┌─────────────────────────────────────────────────────────────────┐
│                          ContactsPage                           │
│  ┌────────────────┐     ┌────────────────┐    ┌──────────────┐  │
│  │  view: string  │     │ selectedId: str│    │   derived    │  │
│  └───────┬────────┘     └───────┬────────┘    └──────┬───────┘  │
│          │                      │                    │          │
│          ▼                      ▼                    ▼          │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    ContactsProvider                        │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │             useReducer(contactsReducer)              │  │ │
│  │  │  state: Contact[]  ←── INITIAL: CONTACTS             │  │ │
│  │  │  action: { type: 'contact/updated',                  │  │ │
│  │  │    id, changes: { stage?, notes? } }                 │  │ │
│  │  └──────────────────────────┬───────────────────────────┘  │ │
│  │                             │                              │ │
│  │  useContacts() ────────────►│ updateContact(id, changes)   │ │
│  └─────────────────────────────┼──────────────────────────────┘ │
└────────────────────────────────┼────────────────────────────────┘
                                 │
                 ┌───────────────┼───────────────┐
                 ▼               ▼               ▼
            ┌─────────┐    ┌───────────┐   ┌──────────────┐
            │  Table  │    │   Board   │   │ DetailsPanel │
            │ (rows)  │    │  (cards)  │   │(draft state) │
            └─────────┘    └───────────┘   └──────────────┘
```

### 1. Single Source of Truth
- **`contacts: Contact[]`** lives exclusively inside `contactsReducer`. Both Table and Board derive their view projections directly from this state array.
- There are no duplicate or intermediate state arrays. When a contact's stage is updated, the change is instantly reflected across both views.

### 2. Isolated Draft-in-Panel Pattern
`DetailsPanel` maintains local draft state (`draftStage`, `draftNotes`).
- Typing in notes or changing the stage dropdown only modifies local drawer state.
- The global store and the underlying Table/Board **never re-render on keystrokes**.
- **Save**: Dispatches `contact/updated`, updates the reducer state, and closes the panel.
- **Cancel / Escape / Backdrop Click**: Discards drafts with zero state mutation and closes the drawer.

---

## Design System & Aesthetics

### 1. Palette & Surface Energy
- **Cosmic Midnight Canvas**: Deep space background (`#030712`) enriched with ambient celestial blue and electric cyan radial glows, creating an ultra-premium, modern dark SaaS aesthetic.
- **Surface Elevation & Contrast**: Frosted dark glass surfaces (`#0B1222` / `#0D1527`) paired with subtle luminous hairline borders (`rgba(255, 255, 255, 0.08)` / `border-white/10`) and multi-layer depth shadows.
- **Interactive Accents**:
  - Focus Ring: High-visibility electric blue (`#0099FF`)
  - Primary CTAs & Active View Tab: Glowing electric blue gradient (`from-blue-600 to-cyan-500`) with soft ambient drop glow
  - Status Indicators: Ambient pulsing cyan dots and translucent tinted stage pills

### 2. Stage-Synchronized Name Badges
- In the Table view, contact names feature subtle translucent glass badges that dynamically match their current pipeline stage (Lead = Slate, Prospect = Blue/Cyan, Qualified = Amber, Customer = Emerald).
- Generous spacing (`gap-3`) separates avatar initials from contact names for clean scannability.

### 3. Responsive Notion-Style Board
- **3-Column Wrapping Layout**: Configured with `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`. Columns display side-by-side without horizontal scrolling and wrap cleanly to subsequent lines.
- **Dashed Empty States**: Columns without contacts (e.g. Customer) display a centered icon and helpful guidance text inside a dashed border.

### 4. Animated View Switch
- Dark glass segmented pill toggle featuring smooth tab transitions, active blue/cyan gradient elevation, and pulsing status indicators for the active mode.

---

## Accessibility & Keyboard Navigation

| Interaction | Implementation & Standard |
|-------------|---------------------------|
| **Table Navigation** | Keyboard-focusable row button (`aria-current` on selected contact). |
| **Board Navigation** | Accessible `<button role="button">` cards with full `aria-label` description. |
| **Activation** | Both `Enter` and `Space` open the contact's details drawer. |
| **Details Drawer** | Accessible slide-over `role="dialog"` with `aria-label` and focus management. |
| **Escape to Close** | Pressing `Escape` anywhere in the application closes the drawer and discards unsaved drafts. |
| **Focus Restoration** | When the drawer closes, keyboard focus automatically returns to the triggering element using `[data-contact-id]`. |
| **WCAG Contrast** | Text, badges, and interactive controls maintain WCAG AA compliance (4.5:1+ contrast ratio). |

---

## Testing Suite

All tests can be executed with:

```bash
npm test
```

### Coverage:
- **Unit Tests** (`contactsReducer.test.ts`):
  - Validates stage transitions, notes modifications, and unknown ID resilience.
  - Ensures structural sharing (unmodified contacts keep existing object references).
  - Verifies contact collection integrity and unique IDs.
- **Integration Tests** (`ContactsPage.test.tsx`):
  - **Cross-View Synchronization**: Opens a contact from the Table view, updates their stage, saves, switches to the Board view, and verifies the card is in the new column.
  - **Draft Cancellation**: Modifies fields, cancels or presses Escape, re-opens, and asserts that unsaved edits were discarded.
  - **Empty State Update**: Moves a contact into an empty stage (e.g. Customer) and verifies that the dashed empty state placeholder disappears and the new card appears.
  - Queries prioritize semantic roles, accessible labels, and `data-testid` attributes.

---

## Design Choices & Trade-Offs

1. **Single Source of Truth (`useReducer` + Context)**:
   - *Choice*: Maintained all contact records inside a unified reducer at the provider root. Table and Board purely filter and project from this array.
   - *Trade-off*: Avoids state synchronization bugs between Table and Board views without needing heavy external state management libraries (Zustand, Redux).

2. **Draft-in-Drawer Isolation**:
   - *Choice*: `DetailsPanel` manages its own local draft state (`draftStage`, `draftNotes`).
   - *Trade-off*: Prevents typing in long-form notes from re-rendering the parent page, table rows, and board cards on every keystroke.

3. **Dirty Draft Dismissal**:
   - *Choice*: Pressing `Escape` or clicking the backdrop overlay silently discards unsaved draft edits.
   - *Trade-off*: Delivers a frictionless, rapid-scanning experience without modal alert fatigue. For a full production system, a subtle "Unsaved changes" indicator or confirmation prompt would be the natural extension.

4. **3-Column Wrapping Kanban vs. Infinite Scroll**:
   - *Choice*: Configured the board with a responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5`) that wraps columns to the next row when needed.
   - *Trade-off*: Ensures all 4 stages (including empty states) remain directly visible on typical displays without forcing users into clumsy horizontal scrolling.

---

## What Was Left Unfinished / Future Improvements

In line with the 3–4 hour suggested scope, the focus was kept strictly on delivering a rock-solid, accessible core flow:
- **Drag-and-Drop Reordering**: Adding accessible drag-and-drop between Kanban columns (e.g. via `@hello-pangea/dnd` or native Pointer events).
- **Global Search & Multi-Filter**: Quick filtering by keyword, stage, owner, or taxonomy labels.
- **Persistence Layer**: Syncing state with `localStorage` or a REST/GraphQL backend.
- **Bulk Selection & Actions**: Multi-row selection in Table view for batch stage updates or exports.

---

## License

MIT