import Panel from "@/components/ui/Panel"
import SectionHeader from "@/components/ui/SectionHeader"

export default function AboutSection({ number }: { number: string }) {
  return (
    <Panel className="p-[clamp(22px,3vw,38px)]" id="about">
      <SectionHeader eyebrow={`Profile / ${number}`} title="ABOUT ME" />
      <p className="mt-6 text-sm leading-[1.7] font-medium text-slate-100">
        I’m a mechanical engineering student and software developer who
        enjoys building systems that move seamlessly between real-world
        constraints and clean digital logic.
      </p>
      <p className="mt-[13px] text-sm leading-[1.7] text-[var(--muted)]">
        As an Eagle Scout, I learned to lead with preparation, service,
        and accountability. I’m bilingual in English and Spanish,
        bringing clear communication to every team and technical
        challenge.
      </p>
      <dl className="mt-[25px] grid border-t border-[var(--line)]">
        <div className="flex justify-between gap-[14px] border-b border-[var(--line)] py-3 font-mono text-xs">
          <dt className="text-[var(--muted)] uppercase">Location</dt>
          <dd className="text-right text-slate-200">Rexburg, Idaho</dd>
        </div>
        <div className="flex justify-between gap-[14px] border-b border-[var(--line)] py-3 font-mono text-xs">
          <dt className="text-[var(--muted)] uppercase">Languages</dt>
          <dd className="text-right text-slate-200">English / Spanish</dd>
        </div>
        <div className="flex justify-between gap-[14px] border-b border-[var(--line)] py-3 font-mono text-xs">
          <dt className="text-[var(--muted)] uppercase">Focus</dt>
          <dd className="text-right text-slate-200">Design + Automation</dd>
        </div>
      </dl>
    </Panel>
  )
}