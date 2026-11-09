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
        illustrations.css
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
package.json
next.config.ts
postcss.config.mjs
eslint.config.mjs
tsconfig.json
```

`app/page.tsx` renders `Navbar`, `Hero`, `ProjectGallery`, `About`, `Experience`, `Contact`, and `Footer`, in that order. The gallery precedes the About/Experience wrapper. `About.tsx`, `Experience.tsx`, and `Contact.tsx` are the actual filenames; there are no `AboutSection.tsx`, `ExperienceTimeline.tsx`, or `ContactSection.tsx` files.

The content grid is a vertical flex layout. The About and Experience panels share a two-column wrapper (`1.7fr 1fr`) at wider widths and stack at widths up to 1040px. The project cards use CSS-generated illustrations based on the `art` field; they do not load images or play GIFs on hover.

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

Featured is selected by default and includes records where `featured` is `true`. The main grid shows at most four matching projects. Cards open the project details modal by mouse or keyboard (Enter/Space); Code and Live links stop click propagation so they do not open the modal.

The “View All Projects” button is always available on Featured. A category view shows a “See More [Category] Projects” button only when that category has more than four records. The catalog opened by this button lists all projects on Featured, or the matching category projects after a category is selected. Its filter buttons update the active filter used by both the page and catalog. The count badge displays the total matching records, even though the main grid is capped at four.

The catalog closes on Escape or a click on the backdrop, and locks body scrolling while open. Its backdrop scrolls vertically; its header (including the close button) is sticky. The filter row itself is not sticky. The catalog container has no maximum-height rule in its CSS.

#### Project details modal

`components/ui/ProjectModal.tsx` receives a `Project | null` and an `onClose` callback from the gallery. Selecting a card opens it; it closes on Escape, a backdrop click, or the close button. While it is open, body scrolling is disabled and the previous inline body overflow value is restored when it closes.

When `details.media` contains items, the first item is shown as the hero image and a thumbnail strip appears when there is more than one. Selecting a thumbnail changes the active image. The declared media type (`"image"` or `"gif"`) is not used to select a renderer; both are rendered with an `<img>` element.

The modal conditionally renders Problem Statement, Key Challenges, System Architecture, Key Metrics, and Tools & Technologies. Empty challenge and metric arrays are omitted; blank text sections are omitted. GitHub and live/demo links are shown in the header (on wider screens) and footer when the corresponding URLs exist. `liveUrl` takes precedence over `demoUrl` for the Live Demo link.

The details modal has a viewport-height-limited container and a separately scrollable body. Its layout shares the modal backdrop styles with the catalog, but its own container has `max-height: 90vh`.

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
  art: "cad" | "data" | "hardware" | "web";
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

Legacy portfolio versions are not project records; they are links in the footer. The current details data includes media URLs under `/images/projects/`, but the repository's `public/` directory currently contains only the resume PDF. Those referenced project images therefore need to be supplied for the modal media to resolve.

When adding or editing a project, update `data/projects.ts` and follow the required fields and union values in `types/project.ts`. Put local media under `public/` and use root-relative URLs (for example, `/images/projects/example.png`). Set `featured: true` to include an item in the default view. `art` controls the generated card illustration; it is not a media URL.

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

- Add the project media files referenced by `data/projects.ts` under `public/images/projects/` (or update the records to valid assets). Until then, the data-driven modal images will resolve to missing files.

All other features documented above are present in the current implementation; no other active roadmap items are recorded in the repository.
