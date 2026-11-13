import Panel from '../ui/Panel';
import SectionHeader from '../ui/SectionHeader';

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
    <Panel className="p-[clamp(22px,3vw,38px)]" id="experience">
      <SectionHeader eyebrow={`Experience / ${number}`} title="EXPERIENCE TIMELINE" />
      
      <div className="relative mt-7 grid gap-[30px] before:absolute before:top-2 before:bottom-2 before:left-[15px] before:w-px before:bg-[linear-gradient(var(--blue),rgba(14,165,233,0.1))] before:content-['']">
        {experience.map((item, index) => (
          <article className="relative grid grid-cols-[32px_1fr] gap-[15px]" key={item.role}>
            <span className="z-1 grid h-[31px] w-[31px] place-items-center rounded-full border border-sky-500 bg-[#142236] font-mono text-[8px] leading-none text-sky-400 shadow-[0_0_0_5px_var(--panel)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="max-w-[220px] text-xs leading-[1.35] font-bold text-slate-50 uppercase max-[780px]:max-w-none max-[780px]:text-[13px]">{item.role}</h3>
              <p className="mt-1 text-[9px] font-bold tracking-[0.07em] text-sky-400 uppercase max-[780px]:text-[10px]">{item.organization}</p>
              <time className="mt-[5px] block font-mono text-[9px] text-[var(--muted)] max-[780px]:text-[10px]">{item.date}</time>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  )
}