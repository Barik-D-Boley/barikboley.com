import type { ReactNode } from "react";
import { Award } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import { getProjectHash } from "@/lib/project-links";
import Panel from "@/components/ui/Panel";
import PillList from "@/components/ui/PillList";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Skills({ number = "004" }: { number?: string }) {
  return (
    <Panel className="scroll-mt-20 p-4 sm:p-6 lg:p-10" id="skills">
      <SectionHeader eyebrow={`Capabilities / ${number}`} title="TECHNICAL SKILLS" />

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {skillGroups.map((group) => {
          return (
            <section
              aria-labelledby={`skill-group-${group.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              key={group.name}
              className="rounded-xl border border-slate-400/15 bg-slate-500/5 p-3 sm:p-4"
            >
              <h3
                className="border-b border-sky-300/20 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-300"
                id={`skill-group-${group.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              >
                {group.name}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.skills.map((skill) => {
                  return (
                    <li
                      className="flex flex-col gap-2 border-b border-slate-400/10 py-2 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                      key={skill.name}
                    >
                      <span className="min-w-0 text-sm font-medium leading-5 text-slate-100 break-words">
                        {skill.name}
                      </span>
                      {(() => {
                        const pills: { key: string; node: ReactNode }[] = [];

                        if (skill.certification) {
                          pills.push({
                            key: "certification",
                            node: (
                              <a
                                aria-label={`View ${skill.certification.name} certificate (PDF, opens in a new tab)`}
                                className="inline-flex items-center gap-1 rounded-full border border-orange-400/40 bg-orange-500/5 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-orange-300 transition-colors hover:border-orange-300 hover:bg-orange-500/10"
                                href={skill.certification.url}
                                rel="noopener noreferrer"
                                target="_blank"
                                title={skill.certification.name}
                              >
                                <Award aria-hidden="true" size={11} strokeWidth={2.2} />
                                Certified
                              </a>
                            ),
                          });
                        }

                        for (const relatedProject of skill.relatedProjects) {
                          const project = projects.find((item) => item.id === relatedProject.id);
                          if (!project) continue;

                          pills.push({
                            key: relatedProject.id,
                            node: (
                              <a
                                aria-label={`View ${project.title} project details`}
                                className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/5 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-sky-300 transition-colors hover:border-sky-300 hover:bg-sky-500/10"
                                href={getProjectHash(project)}
                              >
                                {relatedProject.label}
                              </a>
                            ),
                          });
                        }

                        return pills.length > 0 ? <PillList items={pills} /> : null;
                      })()}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </Panel>
  );
}
