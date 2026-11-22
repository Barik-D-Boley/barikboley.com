import { projects } from "@/data/projects";
import { Project } from "@/types/project";

/** The hash a project's direct link uses, e.g. "#pele". */
export function getProjectHash(project: Pick<Project, "slug">): string {
  return `#${project.slug}`;
}

/**
 * Resolve a URL hash to a project. Accepts the short form ("#pele") and the
 * older long form ("#project-pele-htgr-moose") so existing links keep working.
 */
export function findProjectByHash(hash: string): Project | undefined {
  const value = decodeURIComponent(hash.replace(/^#/, ""));
  if (!value) return undefined;

  const legacyId = value.match(/^project-(.+)$/)?.[1];
  if (legacyId) return projects.find((item) => item.id === legacyId);

  return projects.find((item) => item.slug === value);
}
