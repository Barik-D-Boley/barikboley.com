'use client';

import { useEffect, useMemo, useRef, useState } from "react"
import { projects } from "@/data/projects"
import { Project } from "@/types/project"
import { getProjectCoverMediaIndex } from "@/lib/project-media"
import Panel from '../ui/Panel';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Buttons';
import ProjectModal from '../ui/ProjectModal';
import ProjectStatusBadge from '../ui/ProjectStatusBadge';
import Icon from '../Icon';

const filters = [
  "Featured",
  "FEA & Simulation",
  "Automation & Tools",
  "Web & Full-Stack",
  "Hardware & CAD",
]

function ProjectCardMedia({ project }: { project: Project }) {
  const mediaList = project.details?.media
  const coverIndex = getProjectCoverMediaIndex(mediaList)
  const media = coverIndex === -1 ? undefined : mediaList?.[coverIndex]
  const [failedUrl, setFailedUrl] = useState<string | null>(null)

  if (!media || media.type !== "image" || failedUrl === media.url) {
    return (
      <div className="project-visual project-visual-fallback" aria-hidden="true">
        <span>PROJECT VISUAL</span>
        <strong>{failedUrl === media?.url ? "IMAGE UNAVAILABLE" : "COMING SOON"}</strong>
      </div>
    )
  }

  return (
    <div className="project-visual">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={media.url}
        alt={media.alt || media.caption || project.title}
        loading="lazy"
        decoding="async"
        onError={() => setFailedUrl(media.url)}
      />
    </div>
  )
}

export default function ProjectGallery({ number = "001" }: { number?: string }) {
  const [activeFilter, setActiveFilter] = useState("Featured")
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const selectedProjectRef = useRef(selectedProject)

  useEffect(() => {
    selectedProjectRef.current = selectedProject
  }, [selectedProject])

  useEffect(() => {
    const openProjectFromHash = () => {
      const projectId = window.location.hash.match(/^#project-(.+)$/)?.[1]
      if (!projectId) {
        setSelectedProject(null)
        return
      }

      const project = projects.find((item) => item.id === projectId)
      if (project) setSelectedProject(project)
    }

    openProjectFromHash()
    window.addEventListener("hashchange", openProjectFromHash)
    return () => window.removeEventListener("hashchange", openProjectFromHash)
  }, [])

  const categoryProjects = useMemo(() => {
    if (activeFilter === "Featured") {
      return projects.filter((project) => project.featured)
    }
    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  const visibleProjects = useMemo(() => {
    return categoryProjects.slice(0, 4)
  }, [categoryProjects])

  const modalProjects = useMemo(() => {
    if (activeFilter === "Featured") {
      return projects
    }
    return categoryProjects
  }, [activeFilter, categoryProjects])

  const showSeeMore = activeFilter === "Featured" || categoryProjects.length > 4
  const seeMoreLabel = activeFilter === "Featured" ? "View All Projects" : `See More ${activeFilter} Projects`

  useEffect(() => {
    if (isCatalogModalOpen) {
      document.body.style.overflow = "hidden"
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          if (selectedProjectRef.current) return
          setIsCatalogModalOpen(false)
        }
      }
      window.addEventListener("keydown", handleKeyDown)
      return () => {
        document.body.style.overflow = ""
        window.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [isCatalogModalOpen])

  return (
    <Panel className="projects-panel" id="projects">
      <SectionHeader eyebrow={`Selected work / ${number}`} title="PROJECT GALLERY">
        <span className="project-count">
          {categoryProjects.length.toString().padStart(2, "0")} SHOWING
        </span>
      </SectionHeader>

      <div className="filter-row" role="group" aria-label="Filter projects">
        {filters.map((filter) => (
          <Button
            variant="filter"
            className={activeFilter === filter ? "active" : ""}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="featured-label">
        <span>{activeFilter === "Featured" ? "Top Builds" : `${activeFilter} Projects`}</span>
        <i />
      </div>

      <div className="projects-grid">
        {visibleProjects.map((project) => (
          <article 
            className="project-card cursor-pointer group hover:border-sky-500/60 transition-all duration-200"
            key={project.title}
            onClick={() => setSelectedProject(project)}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedProject(project);
              }
            }}
          >
            <ProjectCardMedia project={project} />
            <div className="project-body">
              <div className="project-index flex items-center justify-between">
                <span>PRJ / {project.number}</span>
                <ProjectStatusBadge status={project.status} />
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-list">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              {(project.liveUrl || project.demoUrl) && (
                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-700/40">
                  <a
                    href={project.liveUrl || project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-mono text-slate-400 hover:text-sky-400 flex items-center gap-1.5 transition-colors"
                  >
                    <Icon name="arrow" size={14} />
                    <span>Live</span>
                  </a>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {showSeeMore && (
        <div className="see-more-row">
          <Button variant="see-more" onClick={() => setIsCatalogModalOpen(true)}>
            {seeMoreLabel}
          </Button>
        </div>
      )}

      {/* Catalog Modal */}
      {isCatalogModalOpen && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCatalogModalOpen(false)
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
                onClick={() => setIsCatalogModalOpen(false)}
                aria-label="Close modal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="modal-body">
              <div className="filter-row modal-filter-row" role="group">
                {filters.map((filter) => (
                  <Button
                    variant="filter"
                    className={activeFilter === filter ? "active" : ""}
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={activeFilter === filter}
                  >
                    {filter}
                  </Button>
                ))}
              </div>

              <div className="projects-grid modal-projects-grid">
                {modalProjects.map((project) => (
                  <article 
                    className="project-card cursor-pointer group hover:border-sky-500/60 transition-all duration-200"
                    key={project.title}
                    onClick={() => setSelectedProject(project)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedProject(project);
                      }
                    }}
                  >
                    <ProjectCardMedia project={project} />
                    <div className="project-body">
                      <div className="project-index flex items-center justify-between">
                        <span>PRJ / {project.number}</span>
                        <ProjectStatusBadge status={project.status} />
                      </div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="tag-list">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>

                      {(project.liveUrl || project.demoUrl) && (
                        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-700/40">
                          <a
                            href={project.liveUrl || project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-mono text-slate-400 hover:text-sky-400 flex items-center gap-1.5 transition-colors"
                          >
                            <Icon name="arrow" size={14} />
                            <span>Live</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popout Details Modal */}
      <ProjectModal
        key={selectedProject?.id ?? selectedProject?.title ?? "closed"}
        project={selectedProject}
        onClose={() => {
          setSelectedProject(null)
          if (window.location.hash.startsWith("#project-")) {
            window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`)
          }
        }}
      />
    </Panel>
  )
}
