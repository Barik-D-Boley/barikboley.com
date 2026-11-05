'use client';

import { useState } from "react"
import Icon from "@/components/Icon"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="topbar">
      <a
        className="brand"
        href="#top"
        aria-label="Barik David Boley, back to top"
      >
        <span className="brand-mark">B</span>
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
        <a href="#about" onClick={closeMenu}>
          About
        </a>
        <a href="#experience" onClick={closeMenu}>
          Experience
        </a>
        <a href="#projects" onClick={closeMenu}>
          Projects
        </a>
        <a href="#contact" onClick={closeMenu}>
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
  )
}