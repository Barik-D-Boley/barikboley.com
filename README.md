# Personal Portfolio Website

## Purpose of the Project
This portfolio website bridges the gap between my Mechanical Engineering background and Software Development skills. Its primary purpose is to serve as a high-performance, easily navigable display of my projects tailored for recruiters and hiring managers. 

The site is designed with a "project-first" mentality, immediately presenting my top-tier resume projects to reduce friction for time-crunched visitors, while also providing a robust, filterable archive for my extended technical and hardware projects.

## Tech Stack & Tools
Based on the goal of ensuring maximum reliability when working with AI coding agents (specifically Flash models), this project utilizes an Agent-Optimized Tech Stack:
* **Frontend Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Data Management:** Centralized JSON Schema (`/data/portfolio.json`) for all text, project details, and links.
* **Icons:** Lucide React (or similar standard icon library)
* **Theme Management:** `next-themes` for Dark/Light mode toggling
* **Contact Form:** Serverless (Web3Forms or Formspree)

## Core Functionality
* **Project-First Layout:** A home page that immediately highlights "Tier 1" resume projects (e.g., Anti-Theft Security System, Automated Receipt Parser) before the 'About' section.
* **Hover-to-Play Media:** Static images for project cards by default, switching to looping GIFs (like CAD moving parts) only on mouse hover to keep the UI clean.
* **Dynamic Archive Filter:** A static grid layout for extended projects with a functional category filter (Mechanical/CAD, Data/Python, Web Dev, Hardware).
* **Legacy Portfolios:** Easter egg links in the footer pointing to V1/V2 of past portfolio websites to showcase continuous growth.
* **Optimized Assets:** Utilization of Next.js `<Image>` components for blazing-fast load times.

## Development Roadmap

### [1] Planning & Setup
- [x] Define purpose of project
- [x] Determine project languages (Next.js, Tailwind)
- [x] Determine what pages the website will have
- [x] Figure out other functionality the project will have
- [x] Set development roadmap
- [x] Generate README

### [2] Website Design
- [ ] Determine color palette (Technical, mechanical aesthetic)
- [ ] Design project presentation (UI cards, static grid, hover-effects)
- [ ] Generate/Gather images for all pages and specific features
- [ ] Add section/links for old portfolio websites (Easter egg in footer)

### [3] Execution
- [ ] Set up Next.js repository and local environment
- [ ] Draft the central `data/portfolio.json` schema
- [ ] Connect ChatGPT / AI coding agents (set up `AGENTS.md` or `.cursorrules`)
- [ ] Code one page or feature at a time (Hero, Featured Projects, Archive, Contact)
- [ ] Swap JSON placeholder text with final written content

### [4] Deployment & Testing
- [ ] Verify responsive mobile-first design
- [ ] Ensure all Next.js build commands pass without errors
- [ ] Connect serverless contact form
- [ ] Deploy via Vercel or GitHub Pages

## How to Run Locally
To run this project on your local machine for development:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.