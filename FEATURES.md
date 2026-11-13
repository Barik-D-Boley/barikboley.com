# Portfolio features

This document records durable project context and the desired behavior of planned features. It is not a full inventory of the current implementation.

## Project context

This is a single-page portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS. Its visual direction is a technical, dark interface with navy backgrounds (`#0f172a`, `#131B2E`), slate surfaces (`#1e293b`), sky-blue accents (`#0ea5e9`, `#38bdf8`), and orange highlights (`#ea580c`).

### Key entry points

- `app/page.tsx` composes the page sections.
- `components/` contains the page, layout, and UI components.
- `data/projects.ts` and `data/skills.ts` contain portfolio content.
- `types/project.ts` defines the project data contract.
- `app/styles/` contains global, section, layout, and UI styles.
- `public/` contains static assets and project visuals.

Use the source files as the authority for current implementation details. Avoid copying detailed component behavior, file inventories, data schemas, or CSS rules into this document; those details change with the code.

### Project guardrails

- Keep project data in `data/projects.ts` and conform to `types/project.ts`.
- Preserve the established visual design and responsive behavior unless a feature explicitly changes them.
- Keep interactions accessible by keyboard and touch. Preserve Escape handling and body-scroll locking for overlays.
- Prefer Tailwind utilities for component styling where practical; retain CSS for global tokens and rules better expressed in stylesheets.
- Do not reactivate archived or commented-out projects unless a feature explicitly requires it.

## Feature workflow

Give each feature a stable ID so it can be referenced without relying on list position. Keep one status per feature; do not maintain a second checklist elsewhere in this document.

Statuses:

- **Proposed** — needs clarification or agreement before implementation.
- **Ready** — requirements are clear and implementation can begin.
- **In progress** — implementation has started.
- **Blocked** — work depends on a decision or external input; state what is needed.
- **Done** — acceptance criteria are implemented and verified.

When implementing a feature, inspect the relevant source first. Treat feature specs as the intended behavior and source code as evidence of current behavior. If they conflict, surface the discrepancy rather than silently changing the requirement. Update the status to Done only after verifying the acceptance criteria.

### Feature template

```md
### AREA-01: Short feature title
**Status:** Proposed

**Goal:** User or product outcome.
**Scope:** What this feature changes.
**Out of scope:** Related work intentionally excluded.

**Acceptance criteria**
- [ ] Observable, testable behavior.

**Validation**
- [ ] Relevant automated checks and manual scenarios.
```

## Feature specs

### HERO-01: Recruiter callout and mobile hero
**Status:** Blocked — final callout copy needs approval.

**Goal:** Make the hero useful to recruiters without losing its technical visual style.
**Scope:** Refine the mobile hero at the existing 780px breakpoint; preserve the desktop composition.
**Out of scope:** A CSS-only replacement for the portfolio logo or an auto-rotating visual.

**Acceptance criteria**
- [ ] Approved copy communicates interest in mechanical or nuclear engineering internships and openness to software development internships.
- [ ] On mobile, the existing icon appears inside a static circle, partially in the hero background beside or behind the heading.
- [ ] The mobile text column is centered within balanced margins while its text remains left-aligned.
- [ ] The status box remains visible below the copy and action buttons.
- [ ] The orange diagonal accent line is removed.
- [ ] The layout is checked against the supplied mobile reference; desktop composition remains unchanged.

**Validation**
- [ ] Review at phone, tablet, and desktop widths; check for clipping and horizontal overflow.

### PROJECT-STATUS-01: Project lifecycle badges
**Status:** In progress — badge rendering exists; maintenance wording needs alignment.

**Goal:** Make lifecycle status clear on project cards.
**Scope:** Project status data and its display in the main gallery and full catalog.
**Out of scope:** Reactivating the commented-out Anti-Theft project.

**Acceptance criteria**
- [x] Every active project has the agreed lifecycle status, using the values in `types/project.ts`.
- [x] Every project card displays its status in both the main gallery and catalog.
- [x] The `maintenance` status displays as **Ongoing**.

**Validation**
- [x] Check each active project in both gallery and catalog views.

### NAV-01: Single active section highlight
**Status:** Done

**Goal:** Make the current location clear without highlighting multiple section links.

**Acceptance criteria**
- [x] At most one section link is highlighted at a time.
- [x] When multiple sections are visible, the section nearest the top of the viewport is selected.
- [x] The highlight clears when `window.scrollY < 250`.

**Validation**
- [x] Verified the behavior against `components/layout/Navbar.tsx`.

### STYLE-01: Tailwind migration
**Status:** Done

**Goal:** Consolidate styling around Tailwind while preserving the existing design and behavior.
**Scope:** Migrate component, section, layout, responsive, and print styles to Tailwind utilities. Keep `globals.css` for Tailwind imports, theme tokens, base resets, and global accessibility defaults.
**Out of scope:** Visual redesigns or changes to interaction behavior.

**Acceptance criteria**
- [x] The site retains its existing appearance, responsive behavior, accessibility, print behavior, and interactions.
- [x] No component or section styles remain in authored CSS stylesheets.
- [x] Keep changes focused; do not combine unrelated visual redesigns with the migration.

**Validation**
- [x] Run `npm run lint` and `npm run build`.
- [x] Visually check the page at mobile, tablet, and desktop widths; verify navigation and modal interactions.

### CONSISTENCY-01: Naming and small-text readability
**Status:** In progress

**Goal:** Improve naming consistency and legibility without broad, unnecessary renames.
**Scope:** Audit source, styles, assets, imports, and user-facing small text.

**Acceptance criteria**
- [x] Use the correctly spelled `htgr-monolith` asset-folder name and update every reference.
- [x] Rename other items only when the inconsistency is clear and all references can be updated safely.
- [x] Improve small-text size or contrast where needed while preserving hierarchy and responsive layouts.

**Validation**
- [x] Verify renamed assets load and check affected text at phone and desktop widths.
