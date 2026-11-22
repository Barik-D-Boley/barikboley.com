export interface Certification {
  /** Full certification title, used for the link's accessible name. */
  name: string;
  /** Path to the certificate PDF in /public. */
  url: string;
}

export interface Skill {
  name: string;
  certification?: Certification;
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
        name: "Finite Element Analysis (FEA)",
        relatedProjects: [
          { id: "mhtgr-fea", label: "MHTGR FEA" },
          { id: "pele-htgr-moose", label: "Pele HTGR" },
        ],
      },
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
        certification: {
          name: "Certified SOLIDWORKS Associate (CSWA)",
          url: "/certifications/solidworks-cswa.pdf",
        },
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
        certification: {
          name: "Autodesk Certified User: Inventor",
          url: "/certifications/autodesk-certified-user-inventor.pdf",
        },
        relatedProjects: [],
      },
    ],
  },
  {
    name: "Programming & Tools",
    skills: [
      {
        name: "Python",
        relatedProjects: [
          { id: "pele-htgr-moose", label: "Pele HTGR" },
          { id: "mhtgr-fea", label: "MHTGR FEA" },
          { id: "python-utility-belt", label: "Python Tools" },
        ],
      },
      {
        name: "Git",
        relatedProjects: [
          { id: "pele-htgr-moose", label: "Pele HTGR" },
          { id: "python-utility-belt", label: "Python Tools" },
          { id: "portfolio-v3", label: "Portfolio" },
        ],
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
        certification: {
          name: "CIW JavaScript Specialist",
          url: "/certifications/ciw-javascript-specialist.pdf",
        },
        relatedProjects: [
          { id: "walmart-receipt-parser", label: "Receipt Parser" },
          { id: "progressive-overload-analytics", label: "Progressive Overload" },
        ],
      },
      {
        name: "HTML/CSS",
        certification: {
          name: "Microsoft Technology Associate: HTML5 Application Development Fundamentals",
          url: "/certifications/mta-html5-app-development.pdf",
        },
        relatedProjects: [
          { id: "portfolio-v3", label: "Portfolio" },
          { id: "progressive-overload-analytics", label: "Progressive Overload" },
        ],
      },
    ],
  },
];
