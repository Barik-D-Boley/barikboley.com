'use client';

import { useMemo, useState } from "react"

type IconName = "arrow" | "code" | "download" | "linkedin" | "mail" | "menu"

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    code: (
      <>
        <path d="m8 9-3 3 3 3" />
        <path d="m16 9 3 3-3 3" />
        <path d="m14 5-4 14" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </>
    ),
    linkedin: (
      <>
        <rect x="4" y="9" width="4" height="11" rx="1" />
        <path d="M6 4.5v.01" />
        <path d="M12 20v-6.5a4 4 0 0 1 8 0V20" />
        <path d="M12 9v11" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  )
}

const filters = ["All", "Mechanical/CAD", "Python/Data", "Web Dev", "Hardware"]

const featuredProjects = [
  {
    title: "Anti-Theft Package Security System",
    description:
      "A mechanically engineered package enclosure combining tamper detection, rapid prototyping, and secure delivery logic.",
    tags: ["CAD", "Inventor", "Prototyping"],
    category: "Mechanical/CAD",
    art: "cad",
    number: "01",
  },
  {
    title: "Automated Receipt & Expense Parser",
    description:
      "A data workflow that extracts, validates, and categorizes transaction records into a clean expense dashboard.",
    tags: ["Python", "Data Extraction", "Automation"],
    category: "Python/Data",
    art: "data",
    number: "02",
  },
  {
    title: "Desktop Thermal Control System",
    description:
      "A sensor-driven airflow model designed to monitor temperature and optimize cooling performance under load.",
    tags: ["Hardware", "Sensors", "Testing"],
    category: "Hardware",
    art: "hardware",
    number: "03",
  },
  {
    title: "Engineering Portfolio Platform",
    description:
      "A responsive project system translating complex engineering work into clear, accessible technical stories.",
    tags: ["React", "TypeScript", "UI Systems"],
    category: "Web Dev",
    art: "web",
    number: "04",
  },
]

const archiveProjects = [
  { title: "Productivity Dashboard", category: "Python/Data", code: "PY-06" },
  { title: "Custom Desktop PC", category: "Hardware", code: "HW-03" },
  { title: "Load-Bearing Bracket", category: "Mechanical/CAD", code: "ME-08" },
  { title: "Portfolio v1", category: "Web Dev", code: "WD-02" },
]

const experience = [
  {
    role: "Full-Time Teaching Missionary",
    organization: "Community Service",
    date: "Aug 2023 — Aug 2025",
  },
  {
    role: "Customer Support Representative",
    organization: "Intern, Venafi",
    date: "June 2022 — Aug 2023",
  },
  {
    role: "Sales Associate",
    organization: "Go Paddle AZ",
    date: "Apr 2021 — July 2021",
  },
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

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [menuOpen, setMenuOpen] = useState(false)

  const visibleProjects = useMemo(
    () =>
      activeFilter === "All"
        ? featuredProjects
        : featuredProjects.filter(
            (project) => project.category === activeFilter,
          ),
    [activeFilter],
  )

  const closeMenu = () => setMenuOpen(false)
  const exportResume = () => window.print()

  return (
    <div className="site-shell">
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
          <a href="#projects" onClick={closeMenu}>
            Projects
          </a>
          <a href="#experience" onClick={closeMenu}>
            Experience
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
          <button
            className="resume-outline"
            type="button"
            onClick={exportResume}
          >
            <Icon name="download" size={15} />
            Download Resume
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <div className="eyebrow">
              <span>01</span> Engineer + Developer
            </div>
            <h1 id="hero-title">
              MECHANICAL ENGINEERING
              <span>& SOFTWARE DEVELOPMENT.</span>
            </h1>
            <p className="hero-subtitle">
              Bridging physical and digital systems.
            </p>
            <p className="student-line">
              Student @ BYU-Idaho <i /> Expected graduation: April 2029
            </p>
            <div className="hero-actions">
              <button
                type="button"
                className="primary-button"
                onClick={exportResume}
              >
                <Icon name="download" /> Resume (PDF)
              </button>
              <a
                className="primary-button"
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="code" /> GitHub
              </a>
              <a
                className="primary-button"
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="linkedin" /> LinkedIn
              </a>
            </div>
          </div>
          <div className="hero-metric" aria-hidden="true">
            <span>SYS.STATUS</span>
            <strong>AVAILABLE</strong>
            <div>
              <i /> Open to opportunities
            </div>
          </div>
        </section>

        <div className="content-grid">
          <aside className="context-column">
            <section className="panel about-panel" id="about">
              <div className="section-kicker">Profile / 001</div>
              <h2>ABOUT ME</h2>
              <p className="intro">
                I’m a mechanical engineering student and software developer who
                enjoys building systems that move seamlessly between real-world
                constraints and clean digital logic.
              </p>
              <p>
                As an Eagle Scout, I learned to lead with preparation, service,
                and accountability. I’m bilingual in English and Spanish,
                bringing clear communication to every team and technical
                challenge.
              </p>
              <dl className="profile-facts">
                <div>
                  <dt>Location</dt>
                  <dd>Rexburg, Idaho</dd>
                </div>
                <div>
                  <dt>Languages</dt>
                  <dd>English / Spanish</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Design + Automation</dd>
                </div>
              </dl>
            </section>
          </aside>

          <div className="work-column">
            <section className="panel projects-panel" id="projects">
              <div className="section-header">
                <div>
                  <div className="section-kicker">Selected work / 003</div>
                  <h2>PROJECT GALLERY</h2>
                </div>
                <span className="project-count">
                  {visibleProjects.length.toString().padStart(2, "0")} PROJECTS
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
                <span>Featured work</span>
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
            </section>

            <section className="panel timeline-panel" id="experience">
              <div className="section-kicker">Career / 002</div>
              <h2>EXPERIENCE TIMELINE</h2>
              <div className="timeline">
                {experience.map((item, index) => (
                  <article className="timeline-item" key={item.role}>
                    <span className="timeline-node">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{item.role}</h3>
                      <p>{item.organization}</p>
                      <time>{item.date}</time>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel archive-panel">
              <div className="section-header archive-header">
                <div>
                  <div className="section-kicker">Additional builds / 004</div>
                  <h2>THE ARCHIVE</h2>
                </div>
                <span className="archive-note">EXPERIMENTS + ITERATIONS</span>
              </div>
              <div className="archive-grid">
                {archiveProjects.map((project) => (
                  <article className="archive-card" key={project.title}>
                    <div className="archive-top">
                      <span>{project.code}</span>
                      <Icon name="arrow" size={16} />
                    </div>
                    <div className="archive-schematic" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.category}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section className="contact-panel" id="contact">
          <div>
            <div className="section-kicker">Connection / 005</div>
            <h2>LET’S BUILD SOMETHING THAT WORKS.</h2>
            <p>
              Interested in engineering, software, or the space where they meet?
            </p>
          </div>
          <a className="contact-button" href="mailto:barik.boley@example.com">
            <Icon name="mail" />
            Start a conversation
            <Icon name="arrow" />
          </a>
        </section>
      </main>

      <footer>
        <span>BARIK DAVID BOLEY / PORTFOLIO 2025</span>
        <span>DESIGNED WITH PRECISION. BUILT WITH LOGIC.</span>
      </footer>
    </div>
  )
}
