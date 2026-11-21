import Panel from "@/components/ui/Panel"
import SectionHeader from "@/components/ui/SectionHeader"

export default function AboutSection({ number }: { number: string }) {
  return (
    <Panel className="scroll-mt-20 p-[clamp(22px,3vw,38px)]" id="about">
      <SectionHeader eyebrow={`Profile / ${number}`} title="ABOUT ME" />
      <p className="mt-6 text-sm leading-[1.7] font-medium text-slate-100">
        I’m a mechanical engineering student at BYU–Idaho working toward{" "}
        <strong className="font-bold text-orange-400">a career in nuclear engineering</strong>,
        with plans to pursue a master’s in nuclear engineering. My independent
        projects model high-temperature gas-cooled reactor components, taking
        designs from CAD through meshing and multiphysics simulation.
      </p>
      <p className="mt-[13px] text-sm leading-[1.7] text-[var(--muted)]">
        Outside of engineering, software development is my hobby. I build
        small tools that automate everyday tasks, and a few are featured
        above. I’m bilingual in English and Spanish, and as an Eagle Scout I
        learned to lead with preparation and accountability.
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
          <dd className="text-right text-slate-200">Nuclear Engineering</dd>
        </div>
      </dl>
    </Panel>
  )
}