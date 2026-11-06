# Technical Specification: Feature 6 & Feature 8

## Overview
This specification details the exact implementation requirements for:
1. **Feature 6**: Project Gallery "See More" modal overlay & filtering system.
2. **Feature 8**: Navbar scroll-spy active state, scroll-margin offsets, and mobile drawer accessibility.

---

## 1. File Modification List
- `components/sections/ProjectGallery.tsx` (Modify for modal overlay and expanded filter state)
- `components/layout/Navbar.tsx` (Modify for scroll-spy active link highlighting & accessibility)
- `data/projects.ts` (Ensure project dataset excludes legacy portfolio sites v1/v2)
- `app/globals.css` (Add modal backdrop styling & sticky header scroll offsets)

---

## 2. Feature 6 Specification: "See More" Overlay & Filter Logic

### Requirements & Behavior
1. **Default Grid Limit**: Display a maximum of **4 projects** in the primary `ProjectGallery` view.
2. **Legacy Project Isolation**:
   - Keep legacy portfolios (`v1.0` and `v2.0`) **strictly out** of `data/projects.ts`. They exist solely as static links in `Footer.tsx`.
3. **Category Filtering**:
   - Filter tabs: `["Featured", "FEA & Simulation", "Automation & Tools", "Web & Full-Stack", "Hardware & CAD"]`.
   - Default tab: `"Featured"`.
   - Filtering filters the project dataset dynamically across both the main grid and the expanded modal.
4. **"See More" Trigger Button**:
   - Render a button at the bottom of `ProjectGallery.tsx` when `categoryProjects.length > 4` or when on `"Featured"`.
   - Button label: `"See More [Category] Projects"` (or `"View All Projects"` when on `"Featured"`).
5. **Modal / Darkened Overlay View**:
   - Clicking **"See More"** sets `isModalOpen = true` and locks background body scrolling (`document.body.style.overflow = 'hidden'`).
   - Renders a fixed backdrop (`bg-black/80` or `rgba(15, 23, 42, 0.85)` with `backdrop-filter: blur(12px)` and `z-index: 100`).
   - Displays a centered, scrollable container showcasing **all** projects belonging to the active filter category.
   - Filter buttons must remain interactive at the top of the modal view so users can switch categories without closing the modal.
   - Include a sticky **Close (X)** button at the top-right of the modal and support closing via the `Escape` key or clicking the backdrop outside the container.

---

## 3. Feature 8 Specification: Navbar Fixes & Scroll-Spy Active Links

### Requirements & Behavior
1. **Active Link Highlighting (Scroll-Spy)**:
   - Implement an `IntersectionObserver` in `Navbar.tsx` (or a custom hook `useScrollSpy`) tracking section IDs: `['about', 'experience', 'projects', 'contact']`.
   - Add an `.active` class or styled indicator to the link corresponding to the section currently visible in the middle of the viewport.
2. **Smooth Scroll & Header Offset**:
   - Add `scroll-margin-top: 80px` (or `scroll-padding-top: 80px` on `html`) to section containers `#about`, `#experience`, `#projects`, and `#contact` in CSS.
   - Ensure clicking topbar links smoothly scrolls to the section header without being obscured by the 72px sticky navbar.
3. **Mobile Menu Enhancements**:
   - Auto-close the mobile menu drawer whenever any navigation link is clicked.
   - Add a backdrop click listener and an `Escape` key listener to dismiss the mobile menu.

---

## 4. Acceptance Criteria & Self-Verification
Before completing the task, run the following verification steps:
1. Run `npm run build` to verify there are zero TypeScript compiler errors or missing props.
2. Verify that clicking "See More" opens a dark backdrop overlay centered on screen with scrollable cards.
3. Verify that changing filter tabs inside the modal updates displayed projects without breaking state.
4. Verify that scrolling down the main page dynamically updates the active link highlight in the top navigation bar.