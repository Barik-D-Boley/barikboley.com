import Panel from '../ui/Panel';
import SectionHeader from '../ui/SectionHeader';

interface TimelineEntry {
  role: string;
  organization: string;
  date: string;
  details?: string[];
}

interface TimelineGroup {
  id: string;
  title: string;
  entries: TimelineEntry[];
}

const education: TimelineGroup = {
  id: "education",
  title: "Education",
  entries: [
    {
      role: "B.S. Mechanical Engineering",
      organization: "Brigham Young University–Idaho",
      date: "Expected April 2029",
      details: [
        "GPA: 4.00 · 4-Year Merit Scholarship",
        "Coursework: Statics, Strength of Materials, Dynamics, Manufacturing Processes, Multivariable & Vector Calculus, Engineering Computation, Parametric CAD",
      ],
    },
  ],
}

const work: TimelineGroup = {
  id: "work",
  title: "Work Experience",
  entries: [
    {
      role: "Full-Time Volunteer Representative",
      organization: "The Church of Jesus Christ of Latter-day Saints",
      date: "Aug 2023 — Aug 2025",
      details: [
        "Led training and performance-improvement cycles for teams of 9–22 peers.",
        "Taught complex, structured concepts fluently in Spanish to local audiences.",
        "Kept a strict daily schedule in high-accountability two-person teams.",
      ],
    },
    {
      role: "Cybersecurity Technical Support Intern",
      organization: "Venafi, a Palo Alto Company",
      date: "June 2022 — Aug 2023",
      details: [
        "Reproduced VM certificate failures and wrote technical guides to speed up SecOps issue resolution.",
        "Troubleshot certificate lifecycles and API integrations in enterprise PKI workflows.",
        "Led the team in support-ticket volume, resolving high-frequency SSL renewals and account requests.",
      ],
    },
    {
      role: "Sales Associate",
      organization: "Go Paddle AZ",
      date: "Apr 2021 — July 2021",
    },
    {
      role: "Landscaper",
      organization: "J&R Property Maintenance Corp.",
      date: "May 2020 — July 2020",
      details: [
        "Built residential landscapes in West Jordan, UT and Phoenix, AZ, working 60–80 hour weeks.",
        "Installed sod, stone pathways, and retaining walls alongside senior site foremen.",
      ],
    },
  ],
}

const leadership: TimelineGroup = {
  id: "leadership",
  title: "Leadership & Service",
  entries: [
    {
      role: "Operations & Protocol Volunteer",
      organization: "Rexburg Idaho Temple",
      date: "Oct 2025 — Present",
      details: [
        "Apply high-precision operational protocols during weekly 4-hour shifts.",
      ],
    },
    {
      role: "Community Program Lead",
      organization: "The Church of Jesus Christ of Latter-day Saints",
      date: "Sept 2025 — Apr 2026",
      details: [
        "Directed a 3-person executive team and managed a $125 budget to expand community outreach.",
      ],
    },
    {
      role: "Eagle Scout",
      organization: "Boy Scouts of America",
      date: "Awarded Dec 2019",
      details: [
        "Managed a 111-hour project, directing 18 volunteers to run a talent show for ~30 memory-care residents.",
      ],
    },
  ],
}

function Timeline({ group }: { group: TimelineGroup }) {
  return (
    <section className={`timeline-group timeline-group-${group.id}`} aria-labelledby={`timeline-${group.id}`}>
      <h3 className="timeline-group-title" id={`timeline-${group.id}`}>{group.title}</h3>
      <ol className="timeline">
        {group.entries.map((item, index) => (
          <li className="timeline-item" key={`${item.role}-${item.date}`}>
            <span className="timeline-node" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h4>{item.role}</h4>
              <p className="timeline-org">{item.organization}</p>
              <time>{item.date}</time>
              {item.details && (
                <ul className="timeline-details">
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default function ExperienceTimeline({ number = "002" }: { number?: string }) {
  return (
    <Panel className="timeline-panel" id="experience">
      <SectionHeader eyebrow={`Experience / ${number}`} title="EXPERIENCE & EDUCATION" />

      <div className="timeline-layout">
        <Timeline group={work} />
        <div className="timeline-side">
          <Timeline group={education} />
          <Timeline group={leadership} />
        </div>
      </div>
    </Panel>
  )
}
