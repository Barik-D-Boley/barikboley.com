import Icon from "@/components/Icon"

const archiveProjects = [
  { title: "Productivity Dashboard", category: "Python/Data", code: "PY-06" },
  { title: "Custom Desktop PC", category: "Hardware", code: "HW-03" },
  { title: "Load-Bearing Bracket", category: "Mechanical/CAD", code: "ME-08" },
  { title: "Portfolio v1", category: "Web Dev", code: "WD-02" },
]

export default function ArchiveSection({ number = "004" }: { number?: string }) {
  return (
    <section className="panel archive-panel">
      <div className="section-header archive-header">
        <div>
          <div className="section-kicker">Additional builds / {number}</div>
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
  )
}