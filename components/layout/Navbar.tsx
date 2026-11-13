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
        className={`mobile-nav-backdrop${menuOpen ? " is-open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Barik Boley, back to top">
          <Image
            className="brand-logo"
            src="/icon.svg"
            alt=""
            width={44}
            height={28}
            priority
          />
          <span>BARIK BOLEY</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name="menu" />
        </button>

        <nav
          className={menuOpen ? "nav-links nav-open" : "nav-links"}
          aria-label="Primary navigation"
        >
          <a
            href="#projects"
            onClick={closeMenu}
            className={activeSection === "projects" ? "active" : ""}
          >
            Projects
          </a>
          <a
            href="#about"
            onClick={closeMenu}
            className={`nav-about-link${activeSection === "about" ? " active" : ""}`}
          >
            About
          </a>
          <a
            href="#experience"
            onClick={closeMenu}
            className={`nav-experience-link${activeSection === "experience" ? " active" : ""}`}
          >
            Experience
          </a>
          <a
            href="#about"
            onClick={closeMenu}
            className={`nav-about-experience${activeSection === "about" || activeSection === "experience" ? " active" : ""}`}
          >
            About &amp; Experience
          </a>
          <a
            href="#skills"
            onClick={closeMenu}
            className={activeSection === "skills" ? "active" : ""}
          >
            Skills
          </a>
          <a
            href="#contact"
            onClick={closeMenu}
            className={activeSection === "contact" ? "active" : ""}
          >
            Contact
          </a>
          <a
            className="resume-outline"
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