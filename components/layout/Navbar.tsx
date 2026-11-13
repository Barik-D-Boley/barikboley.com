'use client';

import { useEffect, useState } from "react"
import Image from "next/image"
import Icon from "@/components/Icon"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const sectionIds = ["projects", "about", "experience", "skills", "contact"]

    const updateActiveSection = () => {
      if (window.scrollY < 250) {
        setActiveSection("")
        return
      }

      let nearestSection: { id: string; distance: number } | undefined

      sectionIds.forEach((id) => {
        const section = document.getElementById(id)
        if (!section) return

        const rect = section.getBoundingClientRect()
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) return

        const distance = Math.abs(rect.top)
        if (!nearestSection || distance < nearestSection.distance) {
          nearestSection = { id, distance }
        }
      })

      setActiveSection(nearestSection?.id ?? "")
    }

    window.addEventListener("scroll", updateActiveSection, { passive: true })
    window.addEventListener("resize", updateActiveSection)
    updateActiveSection()

    return () => {
      window.removeEventListener("scroll", updateActiveSection)
      window.removeEventListener("resize", updateActiveSection)
    }
  }, [])

  useEffect(() => {
    if (menuOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMenuOpen(false)
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => {
        window.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [menuOpen])

  return (
    <>
      <div
        className={`pointer-events-none fixed inset-0 z-40 bg-slate-900/0 opacity-0 transition-[background-color,opacity] duration-[180ms] ${
          menuOpen
            ? "pointer-events-auto bg-slate-900/60 opacity-100 backdrop-blur-[4px]"
            : ""
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <header className="sticky top-0 z-50 flex min-h-[90px] items-center justify-between border-b border-[var(--line)] bg-[rgba(15,23,42,0.88)] px-[5vw] backdrop-blur-[16px] max-[780px]:min-h-16 print:hidden">
        <a className="flex min-w-0 items-center gap-2.5 text-[15px] font-extrabold tracking-[0.09em] text-white no-underline max-[480px]:gap-2 max-[480px]:text-[11px]" href="#top" aria-label="Barik Boley, back to top">
          <Image
            className="block h-7 w-11 shrink-0 object-contain max-[480px]:h-[23px] max-[480px]:w-9"
            src="/icon.svg"
            alt=""
            width={44}
            height={28}
            priority
          />
          <span>BARIK BOLEY</span>
        </a>

        <button
          className="hidden min-h-11 min-w-11 rounded border border-[var(--line)] bg-[var(--panel)] p-[9px] text-white max-[780px]:block"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name="menu" />
        </button>

        <nav
          className={`flex items-center gap-7 max-[780px]:absolute max-[780px]:left-0 max-[780px]:right-0 max-[780px]:top-16 max-[780px]:grid max-[780px]:max-h-0 max-[780px]:items-stretch max-[780px]:gap-0 max-[780px]:overflow-hidden max-[780px]:border-b max-[780px]:border-[var(--line)] max-[780px]:bg-[#111c2e] max-[780px]:px-[5vw] max-[780px]:py-0 max-[780px]:opacity-0 max-[780px]:pointer-events-none max-[780px]:invisible max-[780px]:scale-y-[0.97] max-[780px]:shadow-[0_20px_35px_rgba(0,0,0,0.35)] max-[780px]:[transition:max-height_280ms_ease,opacity_220ms_ease,padding_220ms_ease,transform_280ms_ease,visibility_0s_linear_280ms] motion-reduce:delay-0 ${
            menuOpen
              ? "max-[780px]:visible max-[780px]:max-h-[420px] max-[780px]:translate-y-0 max-[780px]:scale-y-100 max-[780px]:px-[5vw] max-[780px]:pt-5 max-[780px]:pb-6 max-[780px]:opacity-100 max-[780px]:pointer-events-auto max-[780px]:[transition-delay:0s]"
              : "max-[780px]:-translate-y-4"
          }`}
          aria-label="Primary navigation"
        >
          <a
            href="#projects"
            onClick={closeMenu}
            aria-current={activeSection === "projects" ? "location" : undefined}
            className={`relative text-sm font-semibold tracking-[0.06em] uppercase no-underline after:absolute after:right-0 after:-bottom-2 after:left-0 after:h-px after:origin-center after:scale-x-0 after:bg-sky-500 after:content-[''] after:transition-transform after:duration-[180ms] hover:after:scale-x-100 focus-visible:after:scale-x-100 max-[780px]:border-b max-[780px]:border-[var(--line)] max-[780px]:py-3.5 max-[780px]:after:-bottom-px ${
              activeSection === "projects" ? "text-sky-400 after:scale-x-100" : "text-slate-300"
            }`}
          >
            Projects
          </a>
          <a
            href="#about"
            onClick={closeMenu}
            aria-current={activeSection === "about" ? "location" : undefined}
            className={`relative block text-sm font-semibold tracking-[0.06em] uppercase no-underline after:absolute after:right-0 after:-bottom-2 after:left-0 after:h-px after:origin-center after:scale-x-0 after:bg-sky-500 after:content-[''] after:transition-transform after:duration-[180ms] hover:after:scale-x-100 focus-visible:after:scale-x-100 max-[780px]:border-b max-[780px]:border-[var(--line)] max-[780px]:py-3.5 max-[780px]:after:-bottom-px min-[1041px]:hidden ${
              activeSection === "about" ? "text-sky-400 after:scale-x-100" : "text-slate-300"
            }`}
          >
            About
          </a>
          <a
            href="#experience"
            onClick={closeMenu}
            aria-current={activeSection === "experience" ? "location" : undefined}
            className={`relative block text-sm font-semibold tracking-[0.06em] uppercase no-underline after:absolute after:right-0 after:-bottom-2 after:left-0 after:h-px after:origin-center after:scale-x-0 after:bg-sky-500 after:content-[''] after:transition-transform after:duration-[180ms] hover:after:scale-x-100 focus-visible:after:scale-x-100 max-[780px]:border-b max-[780px]:border-[var(--line)] max-[780px]:py-3.5 max-[780px]:after:-bottom-px min-[1041px]:hidden ${
              activeSection === "experience" ? "text-sky-400 after:scale-x-100" : "text-slate-300"
            }`}
          >
            Experience
          </a>
          <a
            href="#about"
            onClick={closeMenu}
            aria-current={activeSection === "about" || activeSection === "experience" ? "location" : undefined}
            className={`relative hidden text-sm font-semibold tracking-[0.06em] uppercase no-underline after:absolute after:right-0 after:-bottom-2 after:left-0 after:h-px after:origin-center after:scale-x-0 after:bg-sky-500 after:content-[''] after:transition-transform after:duration-[180ms] hover:after:scale-x-100 focus-visible:after:scale-x-100 max-[780px]:border-b max-[780px]:border-[var(--line)] max-[780px]:py-3.5 max-[780px]:after:-bottom-px min-[1041px]:block ${
              activeSection === "about" || activeSection === "experience"
                ? "text-sky-400 after:scale-x-100"
                : "text-slate-300"
            }`}
          >
            About &amp; Experience
          </a>
          <a
            href="#skills"
            onClick={closeMenu}
            aria-current={activeSection === "skills" ? "location" : undefined}
            className={`relative text-sm font-semibold tracking-[0.06em] uppercase no-underline after:absolute after:right-0 after:-bottom-2 after:left-0 after:h-px after:origin-center after:scale-x-0 after:bg-sky-500 after:content-[''] after:transition-transform after:duration-[180ms] hover:after:scale-x-100 focus-visible:after:scale-x-100 max-[780px]:border-b max-[780px]:border-[var(--line)] max-[780px]:py-3.5 max-[780px]:after:-bottom-px ${
              activeSection === "skills" ? "text-sky-400 after:scale-x-100" : "text-slate-300"
            }`}
          >
            Skills
          </a>
          <a
            href="#contact"
            onClick={closeMenu}
            aria-current={activeSection === "contact" ? "location" : undefined}
            className={`relative text-sm font-semibold tracking-[0.06em] uppercase no-underline after:absolute after:right-0 after:-bottom-2 after:left-0 after:h-px after:origin-center after:scale-x-0 after:bg-sky-500 after:content-[''] after:transition-transform after:duration-[180ms] hover:after:scale-x-100 focus-visible:after:scale-x-100 max-[780px]:border-b max-[780px]:border-[var(--line)] max-[780px]:py-3.5 max-[780px]:after:-bottom-px ${
              activeSection === "contact" ? "text-sky-400 after:scale-x-100" : "text-slate-300"
            }`}
          >
            Contact
          </a>
          <a
            className="inline-flex items-center gap-2 rounded border border-sky-500 bg-[rgba(14,165,233,0.06)] px-3.5 py-2.5 text-[11px] font-bold tracking-[0.05em] text-sky-400 uppercase transition-colors duration-[180ms] hover:bg-sky-500 hover:text-[#07111f] max-[780px]:mt-3.5 max-[780px]:min-h-11 max-[780px]:justify-center"
            href="/Barik_Boley_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            <Icon name="download" size={15} />
            Resume
          </a>
        </nav>
      </header>
    </>
  )
}