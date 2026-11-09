export type Category = 
  | "FEA & Simulation"
  | "Automation & Tools"
  | "Web & Full-Stack"
  | "Hardware & CAD";

export interface Metric {
  label: string;
  value: string;
}

export interface ProjectMedia {
  url: string;
  type: 'image' | 'gif';
  caption?: string;
  alt?: string;
  isCover?: boolean;
}

export interface ProjectDetails {
  problemStatement: string;
  keyChallenges: string[];
  systemArchitecture: string;
  metrics?: Metric[];
  toolsUsed: string[];
  media: ProjectMedia[];
}

export interface Project {
  id?: string;
  title: string;
  tagline?: string;
  description: string;
  tags: string[];
  category: Category;
  number: string;
  featured?: boolean;
  status?: 'planned' | 'under development' | 'maintenance' | 'complete';
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  details?: ProjectDetails;
}
