'use client';

import { useEffect, useMemo, useRef, useState } from "react"
import { projects } from "@/data/projects"
import { Project } from "@/types/project"
import { getProjectCoverMediaIndex } from "@/lib/project-media"
import Panel from "@/components/ui/Panel"
import SectionHeader from "@/components/ui/SectionHeader"
import Button from "@/components/ui/Button"
import ProjectModal from "@/components/ui/ProjectModal"
import ProjectStatusBadge from "@/components/ui/ProjectStatusBadge"
import Icon from "@/components/Icon"

const filters = [
  "Featured",
  "FEA & Simulation",
  "Automation & Tools",
  "Web & Full-Stack",
  "Hardware & CAD",
]

const projectCardClass =
  "cursor-pointer overflow-hidden rounded-md border border-slate-400/20 bg-[var(--panel-deep)] shadow-[0_14px_28px_rgba(2,8,23,0.25)] transition-[border-color,transform] duration-[180ms] hover:-translate-y-[3px] hover:border-sky-500/65"

const projectBodyClass = "p-[18px]"

const projectTitleClass =
  "mt-[7px] text-base leading-[1.25] font-bold tracking-[-0.02em] text-white"

const projectDescriptionClass =
  "mt-2 text-[13px] leading-[1.55] text-[var(--muted)]"

const projectTagsClass =
  "mt-4 flex flex-wrap gap-1.5"

function ProjectCardMedia({ project }: { project: Project }) {
  const mediaList = project.details?.media
  const coverIndex = getProjectCoverMediaIndex(mediaList)
  const media = coverIndex === -1 ? undefined : mediaList?.[coverIndex]
  const [failedUrl, setFailedUrl] = useState<string | null>(null)

  if (!media || media.type !== "image" || failedUrl === media.url) {
    return (
      <div
        className="grid h-[190px] place-items-center content-center gap-2 overflow-hidden border-b border-[var(--line)] bg-[image:linear-gradient(rgba(56,189,248,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.035)_1px,transparent_1px)] bg-[color:#0d1829] bg-size-[24px_24px] font-mono text-[8px] tracking-[0.12em] text-slate-500"
        aria-hidden="true"
      >
        <span>PROJECT VISUAL</span>
        <strong className="text-[10px] text-slate-400">{failedUrl === media?.url ? "IMAGE UNAVAILABLE" : "COMING SOON"}</strong>
      </div>
    )
  }

  return (
    <div className="relative grid h-[190px] place-items-center overflow-hidden border-b border-[var(--line)] bg-[#0d1829]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={media.url}
        alt={media.alt || media.caption || project.title}
        className="h-full w-full object-cover"
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
    <Panel className="scroll-mt-20 p-[clamp(22px,3vw,38px)] print:break-inside-avoid print:border-slate-300 print:bg-white print:shadow-none" id="projects">
      <SectionHeader eyebrow={`Selected work / ${number}`} title="PROJECT GALLERY">
        <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--muted)]">
          {categoryProjects.length.toString().padStart(2, "0")} SHOWING
        </span>
      </SectionHeader>

      <div className="mt-7 flex flex-wrap gap-[7px] max-[780px]:grid max-[780px]:grid-cols-2 max-[780px]:gap-2 print:hidden" role="group" aria-label="Filter projects">
        {filters.map((filter) => (
          <Button
            variant="filter"
            className={`${filter === "Featured" ? "max-[780px]:col-span-2" : ""} ${
              activeFilter === filter ? "border-sky-500 bg-sky-500 text-[#06131f]" : ""
            }`}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="mt-7 mb-[13px] flex items-center gap-[14px] text-[10px] font-extrabold tracking-[0.11em] text-orange-400 uppercase">
        <span>{activeFilter === "Featured" ? "Top Builds" : `${activeFilter} Projects`}</span>
        <i className="h-px flex-1 bg-[linear-gradient(90deg,rgba(234,88,12,0.5),transparent)]" />
      </div>

      <div className="grid grid-cols-2 gap-[14px] max-[780px]:grid-cols-1">
        {visibleProjects.map((project) => (
          <article 
            className={projectCardClass}
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
            <div className={projectBodyClass}>
              <div className="flex items-center justify-between gap-2 font-mono text-[11px] tracking-[0.1em] text-orange-400">
                <span>PRJ / {project.number}</span>
                <ProjectStatusBadge status={project.status} />
              </div>
              <h3 className={projectTitleClass}>{project.title}</h3>
              <p className={projectDescriptionClass}>{project.description}</p>
              <div className={projectTagsClass}>
                {project.tags.map((tag) => (
                  <span
                    className="rounded-[3px] border border-sky-500/40 px-[7px] py-[5px] font-mono text-[10px] tracking-[0.04em] text-sky-200 uppercase"
                    key={tag}
                  >
                    {tag}
                  </span>
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
        <div className="mt-6 flex justify-center">
          <Button variant="see-more" onClick={() => setIsCatalogModalOpen(true)}>
            {seeMoreLabel}
          </Button>
        </div>
      )}

      {/* Catalog Modal */}
      {isCatalogModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex justify-center overflow-y-auto bg-[rgba(15,23,42,0.88)] px-4 py-10 backdrop-blur-[12px] max-[780px]:px-3 max-[780px]:py-5"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCatalogModalOpen(false)
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="relative m-auto flex w-[min(1000px,94vw)] flex-col overflow-hidden rounded-lg border border-[var(--line-strong)] bg-[#1e293b] shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
            <div className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-[var(--line)] bg-[#1e293b] px-6 py-5 max-[780px]:p-4">
              <div>
                <div className="text-[10px] font-extrabold tracking-[0.16em] text-sky-400 uppercase">Catalog / Full View</div>
                <h2 className="mt-[7px] text-[clamp(1.25rem,2vw,1.75rem)] font-extrabold tracking-[-0.035em]" id="modal-title">
                  {activeFilter === "Featured" ? "ALL PROJECTS CATALOG" : `${activeFilter.toUpperCase()} PROJECTS`}
                </h2>
              </div>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded border border-[var(--line)] bg-[var(--panel-deep)] text-[var(--muted)] transition-colors duration-150 hover:border-sky-500 hover:text-white max-[780px]:h-11 max-[780px]:w-11"
                onClick={() => setIsCatalogModalOpen(false)}
                aria-label="Close modal"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="p-6 max-[780px]:p-4">
              <div className="mb-5 mt-0 grid grid-cols-2 gap-2 min-[781px]:flex min-[781px]:flex-wrap min-[781px]:gap-[7px] print:hidden" role="group">
                {filters.map((filter) => (
                  <Button
                    variant="filter"
                    className={`${filter === "Featured" ? "col-span-full" : ""} ${
                      activeFilter === filter ? "border-sky-500 bg-sky-500 text-[#06131f]" : ""
                    }`}
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    aria-pressed={activeFilter === filter}
                  >
                    {filter}
                  </Button>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-[14px] max-[780px]:grid-cols-1">
                {modalProjects.map((project) => (
                  <article 
                    className={projectCardClass}
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
                    <div className={projectBodyClass}>
                      <div className="flex items-center justify-between gap-2 font-mono text-[11px] tracking-[0.1em] text-orange-400">
                        <span>PRJ / {project.number}</span>
                        <ProjectStatusBadge status={project.status} />
                      </div>
                      <h3 className={projectTitleClass}>{project.title}</h3>
                      <p className={projectDescriptionClass}>{project.description}</p>
                      <div className={projectTagsClass}>
                        {project.tags.map((tag) => (
                          <span
                            className="rounded-[3px] border border-sky-500/40 px-[7px] py-[5px] font-mono text-[10px] tracking-[0.04em] text-sky-200 uppercase"
                            key={tag}
                          >
                            {tag}
                          </span>
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
