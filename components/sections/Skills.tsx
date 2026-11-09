import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import Panel from "../ui/Panel";
import SectionHeader from "../ui/SectionHeader";

export default function Skills({ number = "004" }: { number?: string }) {
  return (
    <Panel className="p-6 sm:p-8 lg:p-10" id="skills">
      <SectionHeader eyebrow={`Capabilities / ${number}`} title="TECHNICAL SKILLS" />

      <div className="mt-4 grid grid-cols-2 gap-3 md:gap-6">
        {skillGroups.map((group) => (
          <section
            aria-labelledby={`skill-group-${group.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            key={group.name}
          >
            <h3
              className="border-b border-slate-400/20 pb-2 text-xs font-bold uppercase tracking-[0.12em] text-sky-300"
              id={`skill-group-${group.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            >
              {group.name}
            </h3>
            <ul className="mt-2">
              {group.skills.map((skill) => {
                return (
                  <li
                    className="flex items-center justify-between gap-2 border-b border-slate-400/10 py-1 last:border-b-0"
                    key={skill.name}
                  >
                    <span className="min-w-0 text-sm font-medium leading-5 text-slate-100">
                      {skill.name}
                    </span>
                    {skill.relatedProjects.length > 0 && (
                      <div className="flex shrink-0 flex-wrap justify-end gap-1">
                        {skill.relatedProjects.map((relatedProject, index) => {
                          const project = projects.find(
                            (item) => item.id === relatedProject.id,
                          );

                          if (!project) return null;

                          return (
                            <span className="inline-flex items-center gap-1" key={relatedProject.id}>
                              {index > 0 && (
                                <span aria-hidden="true" className="text-2xl font-bold leading-none text-sky-300">
                                  ·
                                </span>
                              )}
                              <a
                                aria-label={`View ${project.title} project details`}
                                className="see-more-button !px-2 !py-1 !text-[9px]"
                                href={`#project-${project.id}`}
                              >
                                {relatedProject.label}
                              </a>
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </Panel>
  );
}
