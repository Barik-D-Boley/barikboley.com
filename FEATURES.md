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
  ui/
    Buttons.tsx
    Panel.tsx
    ProjectModal.tsx
    SectionHeader.tsx
data/
  projects.ts                          # Project records
types/
  project.ts                           # Project and project-detail types
public/
  Barik_Boley_Resume.pdf
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

`app/page.tsx` renders `Navbar`, `Hero`, `ProjectGallery`, `About`, `Experience`, `Contact`, and `Footer`, in that order. The gallery precedes the About/Experience wrapper. `About.tsx`, `Experience.tsx`, and `Contact.tsx` are the actual filenames; there are no `AboutSection.tsx`, `ExperienceTimeline.tsx`, or `ContactSection.tsx` files.

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

#### About, experience, contact, and footer

- `components/sections/About.tsx` exports `AboutSection` and renders a profile summary, Eagle Scout background, English/Spanish language statement, and facts for Rexburg, Idaho; English / Spanish; and Design + Automation. It does not show an education fact or a Spanish proficiency level.
- `components/sections/Experience.tsx` exports `ExperienceTimeline` and renders three numbered entries: Full-Time Teaching Missionary / Community Service (Aug 2023 — Aug 2025); Customer Support Representative / Intern, Venafi (June 2022 — Aug 2023); and Sales Associate / Go Paddle AZ (Apr 2021 — July 2021).
- `components/sections/Contact.tsx` exports `ContactSection` and renders “LET’S BUILD SOMETHING THAT WORKS.”, supporting copy, and a mailto button for `barik.boley@gmail.com`. GitHub and LinkedIn are not rendered in this section; they are linked from the hero and footer.
- `components/layout/Footer.tsx` renders “BARIK DAVID BOLEY / PORTFOLIO 2026,” GitHub and LinkedIn links, “DESIGNED WITH PRECISION. BUILT WITH LOGIC.”, and archive links to `/portfolio_1/contact` and `/portfolio_2/home` on `barikboley.com`. The archive links open in new tabs.

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

## Active work

### Project gallery and detail media

**Goal:** Replace the CSS-generated project-card illustrations with real project imagery, and use the same project visuals in the project details modal.

#### Agreed behavior

- Gallery cards use a still cover image; GIFs do not animate in the scrolling gallery.
- Set `isCover: true` on the chosen still item in `details.media`; it is used for both the card cover and the modal's initial hero visual. When none is marked, the first still image is used. Do not add a separate project-level cover URL.
- Additional media items appear in the modal thumbnail strip. Previous/next buttons and Left/Right keyboard keys navigate the gallery, wrapping at either end. GIFs may animate in the modal; playback controls are not part of this feature.
- If a project has no media, or its image fails to load, retain the card layout and show a neutral branded fallback instead of a generated project-specific illustration. The details modal continues to omit its media viewer when there is no media.
- Store assets locally under `public/` and reference them with root-relative URLs.
- Support media for all projects, but prioritize adding available visuals to the four featured projects.

#### Existing assets to wire up

The following project visuals have been added to `public/project-visuals/`:

- Walmart Receipt Parser: `walmart-receipt-parser/sheets-output.png` and `walmart-receipt-parser/extension-demo.gif`.
- MHTGR Thermal-Mechanical FEA: `htgr-monlith/monolith_cad_drawing.png`, `htgr-monlith/monolith_cubit_mesh.png`, `htgr-monlith/monolith_cubit_mesh_zoomed.png`, `htgr-monlith/monolith_paraview_disp.png`, `htgr-monlith/monolith_paraview_hydro.png`, `htgr-monlith/monolith_paraview_temp.png`, and `htgr-monlith/monolith_paraview_vonmises.png`.

`data/projects.ts` now references these assets. The directory spelling `htgr-monlith` is the existing spelling and is used by those paths.

#### Implementation checklist

- [x] Add optional descriptive alternative text to `ProjectMedia`, use it for the hero image, and give thumbnail buttons accessible names.
- [x] Add optional `isCover` to `ProjectMedia` and share the cover-selection rule between project cards and the initial modal image.
- [x] Update `data/projects.ts` to remove stale `/images/projects/...` URLs and reference the available local project assets.
- [x] Wire available assets for Walmart Receipt Parser and MHTGR Thermal-Mechanical FEA. Keep the receipt-parser GIF after its still cover for modal viewing only.
- [ ] Add matching visuals for the other three featured projects when those assets are available; do not invent or reuse unrelated images.
- [ ] After featured coverage is addressed, add matching visuals for the remaining non-featured projects when assets are available.
- [x] Keep media support in place for all seven projects; projects without media use the branded card fallback.
- [x] Update `components/sections/ProjectGallery.tsx` to render the selected still cover and remove the project-specific generated artwork.
- [x] Add image-load failure handling so a broken card asset falls back without leaving a broken-image icon or disrupting the card.
- [x] Add the neutral fallback visual and card image sizing styles under `app/styles/sections/project-gallery/`.
- [x] Preserve the modal hero-and-clickable-thumbnail behavior and support both still images and GIFs.
- [x] Add clickable previous/next arrows and keep keyboard arrow navigation; both wrap around the media list.
- [x] Add `isCover` so project data can choose a still cover independently of gallery order; default to the first still image if none is marked.
- [x] Ensure Escape closes an open project modal before closing its parent catalog.
- [x] Show an explicit unavailable state for failed modal media and thumbnail images.

#### Acceptance and verification

- A project's marked still image appears as its card cover and initial modal hero; without a marked item, the first still image is used.
- Card covers remain still; GIFs are not rendered as card covers and may display in the modal.
- Clicking modal thumbnails, previous/next arrows, or pressing Left/Right switches the hero image, wrapping at either end; thumbnails wrap without a horizontal scrollbar.
- In the catalog, Escape closes the selected project modal first and closes the catalog only after the project modal is already closed.
- A GIF displays in the modal without extra playback controls.
- Projects without media and media URLs that fail to load show a neutral card fallback; failed modal media displays an explicit unavailable state.
- Gallery cards have no View Details label or GitHub Code link; any Live link still opens without opening the project modal.
- Previous/next media arrows use subtle translucent white styling and become more prominent on hover or keyboard focus.
- The existing project card visuals, filters, catalog, and keyboard activation continue to work.
- Verify the supplied local asset URLs and responsive card/modal layouts, then run `npm run lint` and `npm run build`.

No separate image host, new image dependency, gallery hover animation, or modal redesign is included in this feature.
