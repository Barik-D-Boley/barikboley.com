'use client';

import { useEffect, useMemo, useState } from "react"
import { projects } from "@/data/projects"

const filters = [
  "Featured",
  "FEA & Simulation",
  "Automation & Tools",
  "Web & Full-Stack",
  "Hardware & CAD",
]

function ProjectVisual({ variant }: { variant: string }) {
  if (variant === "cad") {
    return (
      <div className="project-visual visual-cad" aria-hidden="true">
        <div className="cad-grid" />
        <div className="cad-cube">
          <span />
          <span />
          <span />
        </div>
        <div className="dimension-line dimension-x">240 mm</div>
        <div className="dimension-line dimension-y">180</div>
        <div className="visual-label">ASSEMBLY / REV.03</div>
      </div>
    )
  }

  if (variant === "data") {
    return (
      <div className="project-visual visual-data" aria-hidden="true">
        <div className="code-window">
          <i />
          <i />
          <i />
          <span className="code-line line-long" />
          <span className="code-line line-med" />
          <span className="code-line line-short" />
          <span className="code-line line-med" />
        </div>
        <div className="data-card">
          <b>$4,218</b>
          <span>EXPENSES PARSED</span>
          <div className="bars">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="visual-label">96.4% MATCH CONFIDENCE</div>
      </div>
    )
  }

  if (variant === "hardware") {
    return (
      <div className="project-visual visual-hardware" aria-hidden="true">
        <div className="board">
          <span className="chip" />
          <span className="chip chip-small" />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="signal">
          <span />
          <span />
          <span />
        </div>
        <div className="visual-label">SENSOR ARRAY / ONLINE</div>
      </div>
    )
  }

  return (
    <div className="project-visual visual-web" aria-hidden="true">
      <div className="browser-shell">
        <div className="browser-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="browser-content">
          <span className="web-sidebar" />
          <div>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      <div className="visual-label">RESPONSIVE / ACCESSIBLE</div>
    </div>
  )
}

export default function ProjectGallery({ number = "001" }: { number?: string }) {
  const [activeFilter, setActiveFilter] = useState("Featured")
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Full list of projects belonging to the active filter
  const categoryProjects = useMemo(() => {
    if (activeFilter === "Featured") {
      return projects.filter((project) => project.featured)
    }
    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  // Limit main page view to 4 items maximum
  const visibleProjects = useMemo(() => {
    return categoryProjects.slice(0, 4)
  }, [categoryProjects])

  // Full dataset visible inside the modal
  const modalProjects = useMemo(() => {
    if (activeFilter === "Featured") {
      return projects
    }
    return categoryProjects
  }, [activeFilter, categoryProjects])

  // Show button on "Featured" tab OR whenever a category has more than 4 items
  const showSeeMore = activeFilter === "Featured" || categoryProjects.length > 4

  const seeMoreLabel =
    activeFilter === "Featured"
      ? "View All Projects"
      : `See More ${activeFilter} Projects`

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsModalOpen(false)
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => {
        document.body.style.overflow = ""
        window.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [isModalOpen])

  return (
    <section className="panel projects-panel" id="projects">
      <div className="section-header">
        <div>
          <div className="section-kicker">Selected work / {number}</div>
          <h2>PROJECT GALLERY</h2>
        </div>
        <span className="project-count">
          {categoryProjects.length.toString().padStart(2, "0")} SHOWING
        </span>
      </div>

      <div
        className="filter-row"
        role="group"
        aria-label="Filter projects"
      >
        {filters.map((filter) => (
          <button
            className={
              activeFilter === filter
                ? "filter-button active"
                : "filter-button"
            }
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
            aria-pressed={activeFilter === filter}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="featured-label">
        <span>{activeFilter === "Featured" ? "Top Builds" : `${activeFilter} Projects`}</span>
        <i />
      </div>

      <div className="projects-grid">
        {visibleProjects.map((project) => (
          <article className="project-card" key={project.title}>
            <ProjectVisual variant={project.art} />
            <div className="project-body">
              <div className="project-index">
                PRJ / {project.number}
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-list">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {showSeeMore && (
        <div className="see-more-row">
          <button
            type="button"
            className="see-more-button"
            onClick={() => setIsModalOpen(true)}
          >
            {seeMoreLabel}
          </button>
        </div>
      )}

      {isModalOpen && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalOpen(false)
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal-container">
            <div className="modal-header">
              <div>
                <div className="section-kicker">Catalog / Full View</div>
                <h2 id="modal-title">
                  {activeFilter === "Featured" ? "ALL PROJECTS CATALOG" : `${activeFilter.toUpperCase()} PROJECTS`}
                </h2>
              </div>
              <button
                type="button"
                className="modal-close-button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="modal-body">
              <div
                className="filter-row modal-filter-row"
                role="group"
                aria-label="Filter projects in modal"
              >
                {filters.map((filter) => (
                  <button
                    className={
                      activeFilter === filter
                        ? "filter-button active"
                        : "filter-button"
                    }
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    type="button"
                    aria-pressed={activeFilter === filter}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="projects-grid modal-projects-grid">
                {modalProjects.map((project) => (
                  <article className="project-card" key={project.title}>
                    <ProjectVisual variant={project.art} />
                    <div className="project-body">
                      <div className="project-index">
                        PRJ / {project.number}
                      </div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="tag-list">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}