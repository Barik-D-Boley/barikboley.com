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

export default function ExperienceTimeline({ number = "002" }: { number?: string }) {
  return (
    <section className="panel timeline-panel" id="experience">
      <div className="section-kicker">Career / {number}</div>
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
  )
}