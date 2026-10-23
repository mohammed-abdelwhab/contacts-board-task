# Design Brief - Contact Management UI

**Aesthetic direction:** Minimal, light, quiet (Notion-like) but intentional and distinctive — not a templated default. A contact CRM for small teams who value clarity over dashboards.

**Type choice:** Inter as the single typeface (already in use), with a deliberate scale: 12/13/14/16px. Medium (500) only for emphasis; Regular (400) for body. No serif, no second family.

**Color approach:** Neutral warm-gray scale (#1A1A18 → #F3F1EC) + ONE accent (#3B6F9F, a muted steel blue) for focus rings, active tab, Save button. Stage badges use distinct muted tints of the accent hue family (gray/blue/amber/green) — text labels always present, color never the only cue.

**Spacing and density:** 4px base rhythm. Table rows ~40px height, comfortable cell padding (12px horizontal, 8px vertical). Board cards with 16px internal padding, 12px gap between cards. Page max-width 1280px with 24px side padding.

**Motion:** 150ms ease-out transitions on hover, focus, selected state, panel enter/exit. Gentle card transition (150ms) when stage changes. Respect `prefers-reduced-motion` — all transitions become 0ms. No animation libraries.