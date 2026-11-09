# Portfolio Features & Repository Ground Truth

This document describes the portfolio as implemented in the repository. It distinguishes completed behavior from outstanding work and follows the current source, component names, types, data, styles, and npm scripts.

## Project overview

The site is a single-page portfolio for Barik David Boley, presenting a dual focus in Mechanical Engineering and Software Development. The page introduces the work, provides a filterable project catalog and project details, and includes profile, experience, contact, and legacy portfolio links.

The visual language is technical and dark: the base background is `#0f172a`, panels use `#1e293b` and `#162234`, blue accents use `#0ea5e9` and `#38bdf8`, and orange accents use `#ea580c` (with `#fb923c` in some section styles). Monospace type is used for indices and labels. These colors are implemented through CSS variables and component classes; they are not all Tailwind theme tokens.

## Repository map

```text
app/
  globals.css                          # Tailwind imports, theme variables, CSS imports
  layout.tsx                           # Root layout, fonts, and metadata
  page.tsx                             # Home-page composition and section order
  icon.png
  icon1.png
  styles/
    layout/
      footer.css
      navbar.css                       # Sticky header and section scroll offsets
    sections/
      about.css
      contact.css
      experience.css
      hero.css
      media-queries.css                # Responsive, reduced-motion, and print rules
      project-gallery.css
      project-gallery/
        layout.css                     # Gallery, modal, and content layout rules
    ui/
      buttons.css
      panel.css
      section-header.css
components/
  Icon.tsx
  layout/
    Footer.tsx
    Navbar.tsx
  sections/
    About.tsx                          # Default export AboutSection
    Contact.tsx                        # Default export ContactSection
    Experience.tsx                     # Default export ExperienceTimeline
    Hero.tsx
    ProjectGallery.tsx
    Skills.tsx                          # Skills grouped with related project links
  ui/
    Buttons.tsx
    Panel.tsx
    ProjectModal.tsx
    SectionHeader.tsx
data/
  projects.ts                          # Project records
  skills.ts                            # Skill groups and related project IDs
types/
  project.ts                           # Project and project-detail types
archive/
  portfolio-v1/                        # Original legacy v1 source
  portfolio-v2/                        # Original legacy v2 source
public/
  Barik_Boley_Resume.pdf
  legacy/
    v1/                                # Runtime files for the static legacy site
    v2/                                # Production build of the legacy React site
  project-visuals/
    walmart-receipt-parser/
      sheets-output.png
      extension-demo.gif
    htgr-monlith/
      monolith_cad_drawing.png
      monolith_cubit_mesh.png
      monolith_cubit_mesh_zoomed.png
      monolith_paraview_disp.png
      monolith_paraview_hydro.png
      monolith_paraview_temp.png
      monolith_paraview_vonmises.png
package.json
next.config.ts
postcss.config.mjs
eslint.config.mjs
tsconfig.json
```

`app/page.tsx` renders `Navbar`, `Hero`, `ProjectGallery`, `About`, `Experience`, `Skills`, `Contact`, and `Footer`, in that order. The gallery precedes the About/Experience wrapper, and Skills follows that wrapper. `About.tsx`, `Experience.tsx`, and `Contact.tsx` are the actual filenames; there are no `AboutSection.tsx`, `ExperienceTimeline.tsx`, or `ContactSection.tsx` files.

The content grid is a vertical flex layout. The About and Experience panels share a two-column wrapper (`1.7fr 1fr`) at wider widths and stack at widths up to 1040px. Project cards lazy-load the first project media item when it is a still image; otherwise they show a neutral branded fallback. GIFs are reserved for the project details modal.

## Implementation status

### Completed

#### Hero

`components/sections/Hero.tsx` renders:

- The heading “MECHANICAL ENGINEERING & SOFTWARE DEVELOPMENT.”
- The subtitle “Bridging physical and digital systems.”
- BYU-Idaho student status and expected graduation in April 2029.
- Resume PDF, GitHub, and LinkedIn links.
- A `SYS.STATUS: AVAILABLE` status box with “Open to opportunities.”

The status box is hidden at viewport widths of 1040px or less. The resume file is `public/Barik_Boley_Resume.pdf`.

#### Navigation

`components/layout/Navbar.tsx` renders a sticky header and links to Projects, About, Experience, Contact, and the resume. An `IntersectionObserver` watches the `projects`, `about`, `experience`, and `contact` IDs with `rootMargin: "-20% 0px -35% 0px"` and `threshold: 0.1`. It allows multiple links to be active when multiple sections intersect and clears active links when `window.scrollY < 250`.

At widths up to 780px, the navigation becomes a menu with a backdrop. The menu closes on backdrop click, Escape, or link activation. Section anchors have `scroll-margin-top: 80px` in `app/styles/layout/navbar.css`; smooth scrolling is enabled in the global styles.

#### Project gallery and catalog

`components/sections/ProjectGallery.tsx` reads project records from `data/projects.ts` and provides these filters:

- Featured
- FEA & Simulation
- Automation & Tools
- Web & Full-Stack
- Hardware & CAD

Featured is selected by default and includes records where `featured` is `true`. The main grid shows at most four matching projects. Cards open the project details modal by mouse or keyboard (Enter/Space). The cards do not show a View Details label or a GitHub Code link; a Live link is shown only when the project has a live or demo URL, and it stops click propagation.

The “View All Projects” button is always available on Featured. A category view shows a “See More [Category] Projects” button only when that category has more than four records. The catalog opened by this button lists all projects on Featured, or the matching category projects after a category is selected. Its filter buttons update the active filter used by both the page and catalog. The count badge displays the total matching records, even though the main grid is capped at four.

The catalog closes on Escape or a click on the backdrop, and locks body scrolling while open. Its backdrop scrolls vertically; its header (including the close button) is sticky. The filter row itself is not sticky. The catalog container has no maximum-height rule in its CSS.
When a project is opened from the catalog, the first Escape closes only the project details modal; a subsequent Escape closes the catalog.

#### Project details modal

`components/ui/ProjectModal.tsx` receives a `Project | null` and an `onClose` callback from the gallery. Selecting a card opens it; it closes on Escape, a backdrop click, or the close button. While it is open, body scrolling is disabled and the previous inline body overflow value is restored when it closes.

When `details.media` contains items, the selected cover image is shown first in the hero viewer. Set `isCover: true` on the intended still image; if multiple still images are marked, the last marked item in the media array takes precedence. If no image is marked, the first still image is used. A thumbnail group and clickable previous/next arrows appear when there is more than one media item. Selecting a thumbnail, clicking an arrow, or pressing the Left/Right arrow keys changes the active image; navigation wraps at either end. Number keys 1–9 select the corresponding image when it exists. Thumbnails wrap onto multiple rows rather than scrolling horizontally. Images and GIFs use an `<img>` element, so GIFs animate naturally.

The modal conditionally renders Problem Statement, Key Challenges, System Architecture, Key Metrics, and Tools & Technologies. Section headings have no decorative bullets; Key Challenges retains semantic list bullets. Empty challenge and metric arrays are omitted; blank text sections are omitted. A single GitHub CTA appears after the project details when `githubUrl` exists. Modal Live Demo links are not rendered.

The details modal has no viewport-height limit or separately scrolling body. The overlay contents flow in one vertical scroll area, with the page behind it locked while the modal is open. The overlay's normal browser scrollbar may be visible; there is no nested modal-body scrollbar or horizontal thumbnail scrollbar.

#### Project gallery and detail media

The gallery renders local project stills as card covers and supports still images and GIFs in the project details modal. Cover selection is shared between cards and the modal: the last marked still image takes precedence, otherwise the first still image is used. Projects without media or with failed card images use a neutral fallback; failed modal media has an explicit unavailable state.

The modal supports thumbnails, previous/next controls, and Left/Right and 1–9 keyboard navigation when multiple media items are available. The project catalog and details modal preserve their existing Escape ordering and scrolling behavior.

Available media for Walmart Receipt Parser and MHTGR Thermal-Mechanical FEA is wired from `public/project-visuals/`. The remaining projects have no matching assets in the repository; adding their visuals is deferred until those assets are available and does not block this implementation.

#### About, experience, contact, and footer

- `components/sections/About.tsx` exports `AboutSection` and renders a profile summary, Eagle Scout background, English/Spanish language statement, and facts for Rexburg, Idaho; English / Spanish; and Design + Automation. It does not show an education fact or a Spanish proficiency level.
- `components/sections/Experience.tsx` exports `ExperienceTimeline` and renders three numbered entries: Full-Time Teaching Missionary / Community Service (Aug 2023 — Aug 2025); Customer Support Representative / Intern, Venafi (June 2022 — Aug 2023); and Sales Associate / Go Paddle AZ (Apr 2021 — July 2021).
- `components/sections/Contact.tsx` exports `ContactSection` and renders “LET’S BUILD SOMETHING THAT WORKS.”, supporting copy, and a mailto button for `barik.boley@gmail.com`. GitHub and LinkedIn are not rendered in this section; they are linked from the hero and footer.
- `components/layout/Footer.tsx` renders the portfolio identity, GitHub and LinkedIn links, and archive links to `/portfolio_1/contact` and `/portfolio_2/home` on `barikboley.com`. The archive links open in new tabs.

## Data model and current records

The following definitions match `types/project.ts`:

```typescript
export type Category =
  | "FEA & Simulation"
  | "Automation & Tools"
  | "Web & Full-Stack"
  | "Hardware & CAD";

export interface Metric {
  label: string;
  value: string;
}

export interface ProjectMedia {
  url: string;
  type: "image" | "gif";
  caption?: string;
  alt?: string;
  isCover?: boolean;
}

export interface ProjectDetails {
  problemStatement: string;
  keyChallenges: string[];
  systemArchitecture: string;
  metrics?: Metric[];
  toolsUsed: string[];
  media: ProjectMedia[];
}

export interface Project {
  id?: string;
  title: string;
  tagline?: string;
  description: string;
  tags: string[];
  category: Category;
  number: string;
  featured?: boolean;
  status?: "planned" | "under development" | "maintenance" | "complete";
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  details?: ProjectDetails;
}
```

`ProjectDetails` fields other than `metrics` are required by the type whenever a `details` object is supplied. `id`, `tagline`, `featured`, `status`, links, `details`, and `metrics` are optional.

`data/projects.ts` exports a lowercase `projects: Project[]` array and a compatibility alias `PROJECTS = projects`. The current array contains seven records, with four featured:

| Number | Project | Category | Featured |
| --- | --- | --- | --- |
| 01 | Anti-Theft Package Security System | Hardware & CAD | Yes |
| 02 | Pele HTGR MOOSE Simulation | FEA & Simulation | Yes |
| 03 | Walmart Receipt Parser | Web & Full-Stack | Yes |
| 04 | Python Utility Belt | Automation & Tools | Yes |
| 05 | MHTGR Thermal-Mechanical FEA | FEA & Simulation | No |
| 06 | Progressive Overload Analytics | Automation & Tools | No |
| 07 | Personal Portfolio | Web & Full-Stack | No |

Legacy portfolio versions are not project records; they are links in the footer. Project media is stored under `public/project-visuals/` and referenced by root-relative URLs. The data currently has visuals for Walmart Receipt Parser and MHTGR Thermal-Mechanical FEA; the other projects have empty media arrays and use the gallery fallback.

When adding or editing a project, update `data/projects.ts` and follow the required fields and union values in `types/project.ts`. Put local media under `public/` and use root-relative URLs (for example, `/project-visuals/project-id/cover.png`). Set `featured: true` to include an item in the default view. Set `isCover: true` on the intended still image to choose the card cover and initial modal image; keep only one marked image to avoid ambiguity. If multiple still images are marked, the last one in the media array takes precedence. If no item is marked, the first still image is used. Keep GIFs as additional modal media.

## Styling and responsive behavior

`app/globals.css` imports Tailwind CSS, `tw-animate-css`, shadcn's Tailwind stylesheet, Google-hosted Inter, and the site's CSS files. The root variables define the dark background, panel, line, text, blue, and orange colors. The root layout also loads Geist, Geist Mono, and Playfair Display through `next/font`.

Styles are split across `app/styles/layout/`, `app/styles/sections/`, `app/styles/sections/project-gallery/`, and `app/styles/ui/`. The sticky navbar and 80px section offsets are in `app/styles/layout/navbar.css`; gallery card/modal rules are in `app/styles/sections/project-gallery/layout.css`.

Responsive rules are in `app/styles/sections/media-queries.css`: the hero status box is hidden at 1040px; the About/Experience wrapper stacks at that breakpoint; the navigation becomes a menu and the project grid becomes one column at 780px; narrower layouts also adjust the hero, actions, and footer. Reduced-motion preferences shorten transitions and disable smooth scrolling. Print styles hide navigation, hero actions, contact, and footer and use a light page background.

## Runtime and verification

`package.json` defines Next.js `16.3.2`, React/React DOM `19.2.8`, TypeScript `^5`, Tailwind CSS `^4`, and `lucide-react` among the dependencies. The repository has no dedicated Vercel configuration in `next.config.ts` and no test script in `package.json`; the presence of the live domain or Vercel in project content does not establish deployment configuration in this repository.

Available commands:

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

`npm run lint` runs ESLint. `npm run build` runs the Next.js production build. Visual and interaction checks should cover responsive navigation, category filtering, catalog and details modal interactions, media links, section navigation, and external/contact links. No automated test command is currently defined.

## Completed work

### Legacy portfolio archive

- Kept the original v1 and v2 source trees under `archive/`, outside the publicly served directory.
- Published the required v1 static runtime files and v2 production build at `/legacy/v1/` and `/legacy/v2/`.
- Published the original v1 pages (homepage, resume, qualifications, and project gallery) and added only the base-path adjustment needed to host them under `/legacy/v1/`.
- Configured the v2 production build with the correct asset prefix and router basename; added fallback routing for its client-side pages.
- Updated the footer archive links and redirects for the non-trailing-slash paths.
- Disabled v2 source maps in the production build.

### Skills section

- Added a compact Technical Skills section with Simulation & CAD and Programming & Tools groups, sized to be comparable to the About panel.
- Displayed the provided skills and linked supported associations to the corresponding project details on the portfolio.
- Added Skills to the primary navigation and section scroll offsets.

### Mobile responsiveness and layout polish

**Goal:** Improve usability and visual consistency on phones and small tablets while preserving the existing desktop design.

#### Completed behavior

- Audited responsive layouts across the hero, project gallery and filters, project catalog and details modal, About, Experience, Contact, navigation, and footer.
- Added a fade, slide, and height transition to the mobile navigation. Escape, backdrop clicks, and link activation close the menu; `aria-expanded` stays accurate and reduced-motion preferences are respected.
- Redesigned the footer to be minimal and well-aligned. The portfolio identity and GitHub/LinkedIn links remain visible, and the archive links are secondary content on phones and desktop.
- Addressed clipping, horizontal overflow, awkward wrapping, cramped spacing, and touch-target size issues found during the responsive review.
- Preserved the desktop layout and existing interactions.

#### Implemented responsive fixes

- Section headers stack and stay left-aligned on phones. Gallery filters use a consistent two-column layout, with Featured spanning the first row.
- Mobile menu, filter, modal-close, media-arrow, social, and footer links have larger touch targets. Timeline, project, and archive text has improved small-screen sizing.
- Removed the body's fixed minimum width after testing found horizontal overflow at a 320px viewport.

#### Verification completed

- [x] Reviewed each page section and interactive surface at phone and small-tablet widths; addressed confirmed layout issues.
- [x] Added open/close animation to the mobile navigation and ensured reduced-motion settings minimize or disable it.
- [x] Redesigned footer hierarchy and spacing; kept archive links available but visually secondary on every device.
- [x] Verified keyboard, touch, and existing navigation behavior remain usable.
- [x] Checked 320px, common phone widths, tablet width, and desktop; verified there is no unintended horizontal scrolling.
- [x] Ran `npm run lint` and `npm run build`, and visually checked responsive layouts.

**Files involved:** `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`, `app/styles/layout/navbar.css`, `app/styles/layout/footer.css`, `app/styles/sections/media-queries.css`, and section styles updated during the audit.

## Active work

### Hero opportunity callout and visual

**Goal:** Make the hero's status and visual useful to recruiters without losing the existing technical design.

#### Agreed behavior

- Retain a compact, recruiter-focused opportunity callout, with final copy still to be approved.
- The callout should convey interest in mechanical or nuclear engineering internships and openness to software development internships.
- Keep the callout available at mobile widths rather than hiding it.
- Replace the CSS rings and diagonal line with the portfolio icon in a static circular treatment. Preserve the circle-only appearance on mobile; do not add an auto-rotating carousel.

### Project status badges

**Goal:** Make project lifecycle status visible at a glance throughout the gallery.

#### Agreed behavior

- Show a status badge on every project card in both the main gallery and full catalog.
- Assign statuses to active projects:
  - Progressive Overload Analytics: `planned`.
  - Personal Portfolio and Pele HTGR MOOSE Simulation: `under development`.
  - Python Utility Belt: `maintenance`, displayed as **Ongoing**.
  - Other active projects: `complete`.
- Keep supported status values in sync with `types/project.ts`; do not reactivate the commented-out Anti-Theft project as part of this work.

### Navigation highlighting

**Goal:** Make the current location clear without highlighting multiple navigation links simultaneously.

#### Agreed behavior

- Ensure no more than one section link is highlighted at a time.
- Select the active link from the current scroll position and preserve the existing behavior of clearing the highlight near the top of the page.

### Tailwind migration

**Goal:** Consolidate the site styling around Tailwind while preserving the current design and behavior.

#### Agreed behavior

- Migrate component, section, layout, and responsive styling from traditional CSS files to Tailwind utilities as far as practical.
- Keep only necessary global styles, theme tokens, and rules that are not reasonably represented with Tailwind utilities.
- Preserve the existing visual design, responsive behavior, accessibility, and interactions during migration.

### Naming consistency and text readability

**Goal:** Make naming consistent throughout the repository and improve legibility of small text.

#### Agreed behavior

- Audit naming conventions across source files, style files, assets, imports, and documentation. Rename only where it improves consistency, and update every reference when renaming.
- Correct the apparent `htgr-monlith` spelling inconsistency in the asset folder and all media URLs.
- Audit small informational text, labels, and captions for legibility. Improve text size and contrast while preserving visual hierarchy and responsive layouts.

### Implementation checklist

- [ ] Finalize the recruiter callout copy and implement the static icon visual for desktop and mobile.
- [ ] Assign and display the agreed status on every active project card in both gallery and catalog views.
- [ ] Update navigation logic so no more than one section can be active at a time.
- [ ] Migrate styling to Tailwind utilities as far as practical, retaining only necessary global/theme CSS.
- [ ] Complete the repository-wide naming audit and verify renamed assets still load.
- [ ] Improve small-text readability and check desktop and mobile layouts.
- [ ] Run `npm run lint` and `npm run build`, then verify affected sections, links, and interactions in the browser.
