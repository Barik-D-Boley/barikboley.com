# Barik David Boley — Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38BDF8?style=flat-square&logo=tailwindcss)
![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel)

A project-first portfolio presenting my dual focus in **Mechanical Engineering and Software Development**. It connects physical engineering work—CAD, simulation, and prototyping—with software projects in automation and web development. I am a student at **BYU-Idaho**, expected to graduate in **April 2029**.

## Live links and contact

- **Live site:** [barikboley.com](https://barikboley.com)
- **GitHub:** [github.com/Barik-D-Boley](https://github.com/Barik-D-Boley)
- **LinkedIn:** [linkedin.com/in/barik-boley](https://www.linkedin.com/in/barik-boley)
- **Resume:** [Download the PDF](./public/Barik_Boley_Resume.pdf)
- **Email:** [barik.boley@gmail.com](mailto:barik.boley@gmail.com)

## Core feature architecture

The site is a single-page portfolio assembled in `app/page.tsx` from reusable layout, section, and UI components.

- **Hero and status box:** Introduces the Mechanical Engineering and Software Development focus, BYU-Idaho graduation date, resume and social calls to action, and availability status.
- **Project gallery:** Shows featured work first, with filters for **FEA & Simulation**, **Automation & Tools**, **Web & Full-Stack**, and **Hardware & CAD**. The featured view and category views show up to four cards at a time; the catalog modal provides access to the full list.
- **Project popout modal:** Selecting a card opens project information, available GitHub/demo links, and a hero-media viewer with thumbnails to switch between images or GIFs. The four narrative sections—**Problem Statement**, **Key Challenges**, **System Architecture**, and **Key Metrics**—are rendered when their data is present. Tools and technologies are also listed when available.
- **About and experience:** The About profile and numbered experience timeline sit together in a side-by-side content layout on wider screens and adapt for smaller screens.
- **Technical skills:** A compact skills section groups Simulation & CAD and Programming & Tools, with supported skills linking to related project details on the portfolio.
- **Legacy portfolios:** The footer links to v1 and v2 at `/legacy/v1/` and `/legacy/v2/`; original source is kept in `archive/`, outside the public directory.
- **Contact and footer:** Provides an email call to action, social links, and archive links to earlier portfolio versions.

## Tech stack and tooling

- **Next.js 16** with the App Router
- **React 19** (React 18+ compatible component patterns)
- **TypeScript**
- **Tailwind CSS 4** for utility styling, alongside the site's section-specific CSS
- **Vercel** for hosting and deployment
- **Lucide React** for icons
- **ESLint** with the Next.js Core Web Vitals and TypeScript configurations

The installed versions are defined in `package.json`. The project currently uses React 19; React 18+ describes the requested compatibility level, not the version pinned in this repository.

## Repository structure

```text
.
├── app/
│   ├── layout.tsx                 # Root layout, document metadata, and fonts
│   ├── page.tsx                   # Home page composition and section order
│   ├── globals.css                # Tailwind imports, theme tokens, and CSS imports
│   └── styles/
│       ├── layout/                # Navigation and footer styles
│       ├── sections/              # Hero, profile, timeline, gallery, contact styles
│       │   └── project-gallery/   # Gallery layout and project illustration styles
│       └── ui/                    # Shared panel, button, and section-heading styles
├── components/
│   ├── layout/                    # Navbar and Footer
│   ├── sections/                  # Hero, ProjectGallery, About, Experience, Skills, Contact
│   ├── ui/                        # Buttons, panels, headings, and project modal
│   └── Icon.tsx                   # Shared icon wrapper
├── data/
│   ├── projects.ts                # Portfolio project content and details
│   └── skills.ts                  # Skill groups and related project IDs
├── types/
│   └── project.ts                 # Category, Project, ProjectDetails, and media types
├── lib/
│   └── utils.ts                   # Shared utility helpers
├── archive/                       # Original legacy portfolio source trees
├── public/
│   ├── Barik_Boley_Resume.pdf     # Downloadable resume
│   ├── legacy/                    # Deployable legacy site files
│   │   ├── v1/
│   │   └── v2/
│   └── project-visuals/           # Project gallery media
├── package.json                   # Dependencies and npm scripts
├── eslint.config.mjs              # ESLint configuration
├── next.config.ts                 # Next.js configuration
├── postcss.config.mjs             # PostCSS configuration
└── tsconfig.json                  # TypeScript configuration and path aliases
```

## Local setup and build commands

Use a supported Node.js LTS release and npm. From the repository root, install dependencies, start the development server, and create a production build:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Stop the development server with `Ctrl+C`, then run:

```bash
npm run build
```

To run the ESLint checks:

```bash
npm run lint
```

To smoke-test the production build locally after it succeeds:

```bash
npm run start
```

The production server is available at [http://localhost:3000](http://localhost:3000). Stop it with `Ctrl+C`.

## Data schema and content guide

Project content lives in `data/projects.ts` as an exported `Project[]`, with its shape defined by the `Project` and `ProjectDetails` interfaces in `types/project.ts`. Update the data rather than duplicating project copy in the gallery or modal components.

### Project fields

| Field | Required | Description |
| --- | --- | --- |
| `id` | No | Optional stable project identifier. |
| `title` | Yes | Project name. |
| `tagline` | No | Short summary used in project detail views; falls back to `description`. |
| `description` | Yes | Card description and fallback project summary. |
| `tags` | Yes | Short labels shown on project cards and used as a fallback technology list. |
| `category` | Yes | One of the `Category` values below; drives category filtering. |
| `art` | Yes | Card illustration variant: `"cad"`, `"data"`, `"hardware"`, or `"web"`. |
| `number` | Yes | Display index, typically a zero-padded string such as `"01"`. |
| `featured` | No | Set to `true` to include the project in the default Featured view. |
| `status` | No | `"planned"`, `"under development"`, `"maintenance"`, or `"complete"`. |
| `githubUrl`, `liveUrl`, `demoUrl` | No | Optional repository, live-site, or demo links. |
| `details` | No | Additional content for the project popout modal. |

`Category` is defined as:

```ts
type Category =
  | "FEA & Simulation"
  | "Automation & Tools"
  | "Web & Full-Stack"
  | "Hardware & CAD";
```

**Featured** is a gallery view, not a project category. Set `featured: true` to include a project there.

### Project details

`ProjectDetails` supports the following fields:

- `problemStatement`: project motivation or problem being addressed.
- `keyChallenges`: an array of implementation challenges.
- `systemArchitecture`: a concise explanation of the system or workflow.
- `metrics`: optional array of `{ label, value }` objects for measurable results.
- `toolsUsed`: technologies and tools used; when present, these populate the modal's tools section instead of the card tags.
- `media`: an array of `{ url, type, caption? }` objects. `type` is `"image"` or `"gif"`. The first item is initially displayed; additional items appear as selectable thumbnails.

Place local assets in `public/` and reference them with a URL from the public root, such as `"/images/projects/example.png"`. The modal omits empty optional detail sections. Keep content accurate and ensure each local media URL resolves to an existing asset.

### Example project entry

```ts
{
  id: "sample-project",
  title: "Sample Project",
  tagline: "A one-line summary of the work.",
  description: "What the project does and why it matters.",
  tags: ["TypeScript", "Automation"],
  category: "Automation & Tools",
  art: "data",
  number: "05",
  featured: false,
  status: "complete",
  githubUrl: "https://github.com/your-account/sample-project",
  details: {
    problemStatement: "Describe the problem this project solves.",
    keyChallenges: ["Describe a key engineering or implementation challenge."],
    systemArchitecture: "Summarize the main components and how they work together.",
    metrics: [{ label: "Processing time", value: "< 2s" }],
    toolsUsed: ["TypeScript", "Node.js"],
    media: [
      {
        url: "/images/projects/sample-project.png",
        type: "image",
        caption: "Sample project overview",
      },
    ],
  },
}
```

Add the entry to the `projects` array in `data/projects.ts`. Keep required fields populated, use only the declared category/art/status values, and use unique project identifiers and display numbers where practical.

## Roadmap and verification

Use this checklist when developing or preparing a change for release:

- [ ] Keep project content and its types in sync in `data/projects.ts` and `types/project.ts`.
- [ ] Verify category filters, Featured selection, and full catalog behavior after changing project entries.
- [ ] Verify project cards open the correct details, media thumbnails swap the hero media, and optional detail sections handle missing data.
- [ ] Check navigation, contact and social links, resume download, and legacy portfolio links.
- [ ] Review the page at desktop and mobile widths, including the side-by-side About/timeline layout.
- [ ] Run `npm run lint` and `npm run build`; resolve failures before merging or deploying.
- [ ] After a successful production build, smoke-test with `npm run start` and confirm key page sections and links work.

`npm run build` is the production build and TypeScript/Next.js integration check. `npm run lint` runs ESLint. There is currently no dedicated test script in `package.json`; verify interactive behavior in the browser as part of the release checklist.
