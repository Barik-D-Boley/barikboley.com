export type Category = 
  | "FEA & Simulation"
  | "Automation & Tools"
  | "Web & Full-Stack"
  | "Hardware & CAD"

export interface Project {
  title: string
  description: string
  tags: string[]
  category: Category
  art: "cad" | "data" | "hardware" | "web"
  number: string
  featured?: boolean
  githubUrl?: string
  demoUrl?: string
}

export const projects: Project[] = [
  // --- TOP FEATURED PROJECTS ---
  {
    title: "Anti-Theft Package Security System",
    description:
      "A mechanically engineered package enclosure combining tamper detection, rapid prototyping, and secure delivery logic.",
    tags: ["CAD", "Inventor", "Prototyping"],
    category: "Hardware & CAD",
    art: "cad",
    number: "01",
    featured: true,
  },
  {
    title: "Pele HTGR MOOSE Simulation",
    description:
      "2-step coupled OpenMC–MOOSE thermo-mechanical simulation of an HTGR microreactor TRISO unit cell.",
    tags: ["MOOSE Framework", "Python", "Multiphysics", "FEA"],
    category: "FEA & Simulation",
    art: "data",
    number: "02",
    featured: true,
  },
  {
    title: "Walmart Receipt Parser",
    description:
      "Full-stack Chrome Extension (MV3) and Node.js API that extracts itemized receipts into Google Sheets.",
    tags: ["Chrome API", "Node.js", "Express", "Automation"],
    category: "Web & Full-Stack",
    art: "web",
    number: "03",
    featured: true,
  },
  {
    title: "Python Utility Belt",
    description:
      "A collection of local Python utilities built to replace paid web tools. Self-contained and privacy-focused.",
    tags: ["Python", "CLI", "Automation"],
    category: "Automation & Tools",
    art: "data",
    number: "04",
    featured: true,
  },

  // --- ADDITIONAL CATALOG PROJECTS ---
  {
    title: "MHTGR Thermal-Mechanical FEA",
    description:
      "Coupled thermo-mechanical FEA of an IG-110 nuclear graphite fuel monolith using MOOSE Framework and Coreform Cubit.",
    tags: ["MOOSE Framework", "Coreform Cubit", "FEA"],
    category: "FEA & Simulation",
    art: "cad",
    number: "05",
  },
  {
    title: "Progressive Overload Analytics",
    description:
      "Workout logging, automated progression logic, and performance analytics platform.",
    tags: ["JavaScript", "Automation", "Analytics"],
    category: "Automation & Tools",
    art: "data",
    number: "06",
  },
]