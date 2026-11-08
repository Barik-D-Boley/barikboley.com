# Feature Specifications: Personal Portfolio Website

## Overview
This specification document outlines the architecture, data schemas, UI components, and behavioral requirements for Barik David Boley's personal portfolio website. Built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, the site highlights a dual identity in **Mechanical Engineering** and **Software Development**.

---

## 1. Project Overview & Purpose
* **Target Audience:** Time-crunched technical recruiters, engineering managers, and software team leads.
* **Core Objective:** Bridge physical mechanical engineering (CAD, FEA, physical prototyping) with software development (Python CLI tools, full-stack web apps, automation).
* **Key Design Aesthetic:** "Precision meets logic"—dark slate navy background (`bg-[#0F172A]` / `bg-[#131B2E]`), sky blue interactive accents (`text-sky-400`), industrial orange metric kickers (`text-amber-500` / `text-orange-500`), monospace indices, and crisp technical borders.

---

## 2. Hero Section (`components/sections/Hero.tsx`)
* **Headline & Subtitle:** Prominently displays `MECHANICAL ENGINEERING & SOFTWARE DEVELOPMENT.` with the subtitle `Bridging physical and digital systems.`
* **Student Status Badge:** Highlights `Student @ BYU-Idaho | Expected graduation: April 2029`.
* **Primary Action CTAs:** Direct call-to-action buttons for:
  1. `Resume (PDF)` (links to static file `/Barik_Boley_Resume.pdf` opening in a new tab)
  2. `GitHub` (links to `https://github.com/Barik-D-Boley`)
  3. `LinkedIn` (links to `https://www.linkedin.com/in/barik-boley`)
* **System Metric Box:** Displays an engineering-style status widget (`SYS.STATUS: AVAILABLE` / `Open to opportunities`).

---

## 3. About Me Section (`components/sections/AboutSection.tsx`)
* **Profile Overview:** Concise summary emphasizing physical systems, digital logic, leadership as an Eagle Scout, and bilingual fluency (English & Spanish).
* **Profile Fact Grid:** Quick-reference definition list detailing:
  - **Location:** Rexburg, Idaho
  - **Languages:** English / Spanish (C1 Advanced)
  - **Focus:** Design + Automation

---

## 4. Experience Timeline (`components/sections/ExperienceTimeline.tsx`)
* **Vertical Node Timeline:** Chronological career nodes featuring numbered indicators (`01`, `02`, `03`).
* **Career History:**
  1. **Full-Time Teaching Missionary** | Community Service | *Aug 2023 — Aug 2025*
  2. **Customer Support Representative** | Intern, Venafi | *June 2022 — Aug 2023*
  3. **Sales Associate** | Go Paddle AZ | *Apr 2021 — July 2021*

---

## 5. Project Gallery & Dynamic Filtering (`components/sections/ProjectGallery.tsx`)
* **Category Taxonomy (4 Core Filters):**
  - `Featured` (Default tab showing top resume builds)
  - `FEA & Simulation` (MOOSE Framework, OpenMC, thermo-mechanical analysis)
  - `Automation & Tools` (Python CLI tools, Google Sheets automation)
  - `Web & Full-Stack` (Chrome extensions, Next.js web applications)
  - `Hardware & CAD` (SolidWorks CSWA designs, physical enclosures)
* **Grid & Card Limits:** Displays a default grid limit of 4 featured projects.
* **"See More" Expansion Logic:** Provides an inline toggle button on the `Featured` tab (`"See All Projects"` / `"Show Featured Only"`) that expands the grid in place without navigating away or breaking scroll position.

---

## 6. Project Popout Modal & Details Architecture (`components/ui/ProjectModal.tsx`)

### Data Schema Definitions (`types/project.ts`)
```typescript
export interface Metric {
  label: string;
  value: string;
}

export interface ProjectMedia {
  url: string;
  type: 'image' | 'gif';
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
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  status?: 'planned' | 'under development' | 'maintenance' | 'complete';
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  details?: ProjectDetails;
}
```

### Component Guidelines & Interaction Spec
* **State Management:** Controlled via local React parent state (`const [selectedProject, setSelectedProject] = useState<Project | null>(null)`).
* **Triggering & Event Isolation:** Clicking a project card opens the detailed modal. Direct GitHub/Demo links on card prevent event bubble via `e.stopPropagation()`.
* **Accessibility:** Modal closes on `Esc` key press or clicking backdrop. Disables background body scroll (`overflow: hidden`) when active.
* **Hero Visual & Media Gallery:** Displays primary hero visual (image or GIF) with a horizontal thumbnail strip underneath that swaps the active hero view when clicked.
* **Sub-sections & Data Fallbacks:** Gracefully omits sub-sections if their corresponding data field is missing or empty. Renders up to 4 styled sub-sections:
  1. **Problem Statement**
  2. **Key Challenges** (bulleted list)
  3. **System Architecture**
  4. **Relevant Metrics** (styled stat badges)
* **Action CTAs:** Prominent "View Repository on GitHub" and "Live Demo" CTAs in top header and bottom footer.

---

## 7. Contact Section (`components/sections/ContactSection.tsx`)
* **Primary Call-to-Action:** High-contrast panel featuring the heading `LET’S BUILD SOMETHING THAT WORKS.`
* **Email Direct Link:** Direct button linking to `mailto:barik.boley@gmail.com` with mail icon.
* **Social Connections:** Companion links for GitHub and LinkedIn profiles.

---

## 8. Legacy Portfolios & Footer (`components/layout/Footer.tsx`)
* **Easter Egg Archive Links:** Subtle footer links for version history opening in new tabs (`target="_blank" rel="noreferrer"`):
  - `v1.0 (Contact)` -> `https://barikboley.com/portfolio_1/contact`
  - `v2.0 (Home)` -> `https://barikboley.com/portfolio_2/home`
* **Brand Tagline:** `BARIK DAVID BOLEY / PORTFOLIO 2026 | DESIGNED WITH PRECISION. BUILT WITH LOGIC.`

---

## Execution & Verification Command
To verify TypeScript compilation and Next.js build integrity after implementing these features:
```bash
npm run build
```