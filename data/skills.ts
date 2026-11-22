export interface Skill {
  name: string;
  relatedProjects: { id: string; label: string }[];
}

export interface SkillGroup {
  name: string;
  skills: Skill[];
}

// Skills within each group are ordered from most to least relevant.
export const skillGroups: SkillGroup[] = [
  {
    name: "Simulation & CAD",
    skills: [
      {
        name: "MOOSE Framework",
        relatedProjects: [
          { id: "pele-htgr-moose", label: "Pele HTGR" },
          { id: "mhtgr-fea", label: "MHTGR FEA" },
        ],
      },
      {
        name: "OpenMC",
        relatedProjects: [{ id: "pele-htgr-moose", label: "Pele HTGR" }],
      },
      {
        name: "Coreform Cubit",
        relatedProjects: [
          { id: "pele-htgr-moose", label: "Pele HTGR" },
          { id: "mhtgr-fea", label: "MHTGR FEA" },
        ],
      },
      {
        name: "SolidWorks (CSWA)",
        relatedProjects: [
          { id: "pele-htgr-moose", label: "Pele HTGR" },
          { id: "mhtgr-fea", label: "MHTGR FEA" },
        ],
      },
      {
        name: "ParaView",
        relatedProjects: [
          { id: "pele-htgr-moose", label: "Pele HTGR" },
          { id: "mhtgr-fea", label: "MHTGR FEA" },
        ],
      },
      {
        name: "Autodesk Inventor",
        relatedProjects: [],
      },
    ],
  },
  {
    name: "Programming & Tools",
    skills: [
      {
        name: "Python (h5py, SciPy)",
        relatedProjects: [
          { id: "pele-htgr-moose", label: "Pele HTGR" },
          { id: "mhtgr-fea", label: "MHTGR FEA" },
          { id: "python-utility-belt", label: "Python Tools" },
        ],
      },
      {
        name: "Git",
        relatedProjects: [],
      },
      {
        name: "Agentic Coding (Claude Code, GitHub Copilot)",
        relatedProjects: [{ id: "portfolio-v3", label: "Portfolio" }],
      },
      {
        name: "Excel & Google Sheets (Data Modeling)",
        relatedProjects: [
          { id: "walmart-receipt-parser", label: "Receipt Parser" },
          { id: "progressive-overload-analytics", label: "Progressive Overload" },
        ],
      },
      {
        name: "JavaScript",
        relatedProjects: [
          { id: "walmart-receipt-parser", label: "Receipt Parser" },
          { id: "progressive-overload-analytics", label: "Progressive Overload" },
        ],
      },
      {
        name: "HTML/CSS",
        relatedProjects: [
          { id: "portfolio-v3", label: "Portfolio" },
          { id: "progressive-overload-analytics", label: "Progressive Overload" },
        ],
      },
    ],
  },
];
