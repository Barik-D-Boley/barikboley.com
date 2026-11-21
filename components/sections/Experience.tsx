import Panel from '../ui/Panel';
import SectionHeader from '../ui/SectionHeader';

const experience = [
  {
    role: "B.S. Mechanical Engineering",
    organization: "Brigham Young University–Idaho",
    date: "Expected April 2029",
  },
  {
    role: "Full-Time Volunteer Representative",
    organization: "The Church of Jesus Christ of Latter-day Saints",
    date: "Aug 2023 — Aug 2025",
  },
  {
    role: "Cybersecurity Technical Support Intern",
    organization: "Venafi, a Palo Alto Company",
    date: "June 2022 — Aug 2023",
  },
  {
    role: "Eagle Scout",
    organization: "Boy Scouts of America",
    date: "Awarded Dec 2019",
  },
]

export default function ExperienceTimeline({ number = "002" }: { number?: string }) {
  return (
    <Panel className="timeline-panel" id="experience">
      <SectionHeader eyebrow={`Experience / ${number}`} title="EXPERIENCE TIMELINE" />
      
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
    </Panel>
  )
}