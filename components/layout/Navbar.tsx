'use client';

import { useEffect, useState } from "react"
import Icon from "@/components/Icon"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSections, setActiveSections] = useState<string[]>([])
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const sectionIds = ["projects", "about", "experience", "contact"]

    const handleScroll = () => {
      if (window.scrollY < 250) {
        setActiveSections([]) // Updated to plural and array
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setActiveSections((prev) => {
          let updated = [...prev]
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!updated.includes(entry.target.id)) updated.push(entry.target.id)
            } else {
              updated = updated.filter((id) => id !== entry.target.id)
            }
          })
          return updated
        })
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: 0.1,
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.unobserve(el)
      })
      window.removeEventListener("scroll", handleScroll)
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
      {menuOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Barik David Boley, back to top">
          <span>BARIK DAVID BOLEY</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
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
            className={activeSections.includes("projects") ? "active" : ""}
          >
            Projects
          </a>
          <a
            href="#about"
            onClick={closeMenu}
            className={activeSections.includes("about") ? "active" : ""}
          >
            About
          </a>
          <a
            href="#experience"
            onClick={closeMenu}
            className={activeSections.includes("experience") ? "active" : ""}
          >
            Experience
          </a>
          <a
            href="#contact"
            onClick={closeMenu}
            className={activeSections.includes("contact") ? "active" : ""}
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