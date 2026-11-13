import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: "pele-htgr-moose",
    title: "Pele HTGR MOOSE Simulation",
    tagline: "Developing a CAD-to-simulation workflow for an HTGR microreactor unit cell.",
    description:
      "A work-in-progress workflow connecting reactor geometry, meshing, neutronics, and thermo-mechanical analysis for a Project Pele HTGR unit cell.",
    tags: ["OpenMC", "MOOSE Framework", "Python", "Coreform Cubit"],
    category: "FEA & Simulation",
    number: "02",
    featured: true,
    status: "under development",
    githubUrl: "https://github.com/Barik-D-Boley/pele-htgr-moose-simulation",
    details: {
      problemStatement: "Build a reproducible workflow for exploring how spatially varying fission heating could inform thermal and mechanical analysis of an HTGR fuel unit cell.",
      keyChallenges: [
        "Preparing the unit-cell CAD geometry and finite-element mesh for the planned analysis.",
        "The OpenMC model and MOOSE input are present, but the OpenMC model has not yet been run and the coupled simulation has not been completed.",
        "Implementing and verifying the data-transfer step; the current MOOSE fuel-wall heat flux is a placeholder rather than an OpenMC-derived input."
      ],
      systemArchitecture: "Planned workflow: model the unit cell in CAD, generate a mesh with Coreform Cubit, run OpenMC for spatial power tallies, transfer those data into MOOSE for thermo-mechanical analysis, then inspect outputs in ParaView. The repository currently contains the CAD files, generated mesh, OpenMC model script, and a draft MOOSE input; coupling and post-processing remain to be implemented.",
      toolsUsed: ["OpenMC", "MOOSE Framework", "Python", "Coreform Cubit", "SolidWorks", "ParaView"],
      media: []
    }
  },
  {
    id: "walmart-receipt-parser",
    title: "Walmart Receipt Parser",
    tagline: "A Chrome extension that scrapes Walmart order pages and sends receipt data to Google Sheets.",
    description:
      "A self-configured browser extension and backend that extracts itemized receipt details from Walmart order pages and records them in a personal Google Sheet.",
    tags: ["Chrome Extension", "Web Scraping", "Node.js", "Google Sheets"],
    category: "Web & Full-Stack",
    number: "03",
    featured: true,
    status: "complete",
    githubUrl: "https://github.com/Barik-D-Boley/walmart-receipt-parser",
    details: {
      problemStatement: "An existing receipt-parser extension did not work the way I wanted, so I built a custom tool to automate transferring Walmart receipt details into my spreadsheet.",
      keyChallenges: [
        "The scraper depends on the structure of Walmart's order-page HTML, so changes to the site can break extraction.",
        "Users must configure their own Google Cloud service-account credentials and share their target spreadsheet with that account.",
        "A future version is planned to obtain receipt data by intercepting the site's API traffic instead of relying on page markup."
      ],
      systemArchitecture: "A Chrome Extension Manifest V3 script extracts order and item details from a Walmart order page, sends the data to a Node.js/Express backend, and writes formatted records to Google Sheets through the Sheets API. After the one-time setup with a user's own credentials and spreadsheet, it is ready for regular use.",
      toolsUsed: ["Chrome Extension API (Manifest V3)", "JavaScript", "Node.js", "Express", "Google Sheets API", "Vercel"],
      media: [
        {
          url: "/project-visuals/walmart-receipt-parser/sheets-output.png",
          type: "image",
          caption: "Parsed receipt data in Google Sheets",
          alt: "Google Sheets showing parsed receipt line items",
          isCover: true,
        },
        {
          url: "/project-visuals/walmart-receipt-parser/extension-demo.gif",
          type: "gif",
          caption: "Receipt parser browser extension demonstration",
          alt: "Animated demonstration of the receipt parser extension",
        },
      ]
    }
  },
  {
    id: "python-utility-belt",
    title: "Python Utility Belt",
    tagline: "Six local Python utilities for common image and document tasks.",
    description:
      "A collection of six standalone utilities launched through one runner, including local image background removal and PDF merging.",
    tags: ["Python", "CLI", "Image Processing", "PDF Tools"],
    category: "Automation & Tools",
    number: "04",
    featured: true,
    status: "maintenance",
    githubUrl: "https://github.com/Barik-D-Boley/python-utility-belt",
    details: {
      problemStatement: "Provide convenient, focused tools for image and document tasks that can be run locally instead of relying on online converters.",
      keyChallenges: [
        "Organizing six standalone utilities behind a central runner with short commands and per-tool dependencies.",
        "Supporting distinct workflows, including AI-based or color-keyed image background removal and merging PDFs with images.",
        "Documenting setup requirements and dependencies so each utility can be run independently."
      ],
      systemArchitecture: "A Python runner dispatches commands to separate utility modules and checks or installs each tool's optional dependencies. The suite includes image background removal, citation cleaning, PDF merging, PDF trimming, PowerPoint merging, and QR-code generation.",
      metrics: [
        { label: "Utilities", value: "6" },
      ],
      toolsUsed: ["Python", "Pillow", "pypdf", "rembg", "ONNX Runtime"],
      media: []
    }
  },
  {
    id: "mhtgr-fea",
    title: "MHTGR Thermal-Mechanical FEA",
    tagline: "A demonstration CAD-to-simulation workflow for a nuclear graphite fuel monolith.",
    description:
      "A CAD, meshing, thermo-mechanical simulation, and visualization workflow for an IG-110 graphite monolith, with outputs presented as demonstration results rather than validated predictions.",
    tags: ["SolidWorks", "Coreform Cubit", "MOOSE", "ParaView"],
    category: "FEA & Simulation",
    number: "05",
    featured: true,
    status: "complete",
    githubUrl: "https://github.com/Barik-D-Boley/mhtgr-thermal-mechanical-fea",
    details: {
      problemStatement: "Demonstrate an end-to-end process for taking a graphite fuel-monolith design from CAD through meshing, coupled thermal-mechanical analysis, and result visualization.",
      keyChallenges: [
        "Building a structured hexahedral mesh around the monolith's fuel and coolant channels.",
        "Transferring the CAD geometry and mesh into a MOOSE simulation with thermal and mechanical boundary conditions.",
        "Treating the reported outputs as demonstration results: they have not been validated against experimental or other real-world results."
      ],
      systemArchitecture: "A SolidWorks model is exported to STEP, meshed in Coreform Cubit, solved using MOOSE heat-conduction and tensor-mechanics physics, and visualized in ParaView. The repository documents a reproducible CAD-to-simulation workflow.",
      metrics: [
        { label: "Mesh Elements", value: "18,430" },
        { label: "Avg. Scaled Jacobian", value: "> 0.81" },
        { label: "Peak Temperature", value: "662 K" },
        { label: "Peak von Mises Stress", value: "~1.52 MPa" },
        { label: "Peak Displacement", value: "0.603 mm" },
      ],
      toolsUsed: ["SolidWorks", "Coreform Cubit", "MOOSE Framework", "ParaView"],
      media: [
        {
          url: "/project-visuals/htgr-monlith/monolith_cad_drawing.png",
          type: "image",
          caption: "Nuclear graphite fuel monolith CAD drawing",
          alt: "CAD drawing of the nuclear graphite fuel monolith",
          isCover: true,
        },
        {
          url: "/project-visuals/htgr-monlith/monolith_cubit_mesh.png",
          type: "image",
          caption: "Finite element mesh of the fuel monolith",
          alt: "Finite element mesh of the nuclear graphite fuel monolith",
        },
        {
          url: "/project-visuals/htgr-monlith/monolith_cubit_mesh_zoomed.png",
          type: "image",
          caption: "Zoomed view of the finite element mesh",
          alt: "Zoomed-in view of the fuel monolith finite element mesh",
        },
        {
          url: "/project-visuals/htgr-monlith/monolith_paraview_disp.png",
          type: "image",
          caption: "Monolith displacement simulation",
          alt: "ParaView visualization of simulated monolith displacement",
        },
        {
          url: "/project-visuals/htgr-monlith/monolith_paraview_hydro.png",
          type: "image",
          caption: "Monolith hydrostatic stress simulation",
          alt: "ParaView visualization of simulated hydrostatic stress",
        },
        {
          url: "/project-visuals/htgr-monlith/monolith_paraview_temp.png",
          type: "image",
          caption: "Monolith temperature simulation",
          alt: "ParaView visualization of the monolith temperature distribution",
          isCover: true,
        },
        {
          url: "/project-visuals/htgr-monlith/monolith_paraview_vonmises.png",
          type: "image",
          caption: "Monolith von Mises stress simulation",
          alt: "ParaView visualization of von Mises stress in the monolith",
        },
      ]
    }
  },
  {
    id: "progressive-overload-analytics",
    title: "Progressive Overload Tracker 2.0",
    tagline: "An active rebuild of a personal workout-tracking spreadsheet ecosystem.",
    description:
      "A streamlined, data-driven Google Sheets and Apps Script tracker in development, based on personal workout logs and planned for use as an example project.",
    tags: ["Google Sheets", "Google Apps Script", "JavaScript", "Fitness Tracking"],
    category: "Automation & Tools",
    number: "06",
    featured: false,
    status: "under development",
    githubUrl: "https://github.com/Barik-D-Boley/sheets-progressive-overload-analytics",
    details: {
      problemStatement: "Build a more streamlined and maintainable version of a personal strength-training tracker, with an example of the system that others can understand and adapt.",
      keyChallenges: [
        "Establishing a consistent data schema and normalizing historical workout and exercise records.",
        "Planning a foundation that can support later workout-entry automation and progression analytics.",
        "The README roadmap describes future work; most of those features have not been implemented yet."
      ],
      systemArchitecture: "The project is a Google Sheets ecosystem developed locally with Google Apps Script and clasp. Its current focus is the data foundation and migration to a normalized schema; logging automation, progression calculations, dashboards, and other roadmap features remain future work.",
      toolsUsed: ["Google Sheets", "Google Apps Script", "JavaScript", "clasp", "Node.js"],
      media: []
    }
  },
  {
    id: "portfolio-v3",
    title: "Personal Portfolio",
    tagline: "A project-first portfolio developed with AI coding agents and GitHub Copilot.",
    description: "A portfolio showcasing mechanical engineering and software projects, built through AI-assisted coding with Barik directing and reviewing the migration.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "GitHub Copilot"],
    category: "Web & Full-Stack",
    number: "07",
    featured: false,
    status: "under development",
    githubUrl: "https://github.com/Barik-D-Boley/barikboley.com",
    liveUrl: "https://barikboley.com",
    details: {
      problemStatement: "Create a project-first online portfolio that presents mechanical engineering and software work together in one responsive site.",
      keyChallenges: [
        "Directing and reviewing an AI-assisted migration while keeping the portfolio's content, components, and design aligned.",
        "Building a reusable project gallery with category filters, project detail modals, and media viewers.",
        "Adapting the page layout and interactions across desktop and mobile screens."
      ],
      systemArchitecture: "A Next.js App Router single-page portfolio built with React and TypeScript. Reusable section and UI components assemble the page, while project content and modal details are maintained as structured data. Styling uses Tailwind CSS alongside section-specific CSS, with Vercel hosting.",
      toolsUsed: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "GitHub Copilot", "Vercel"],
      media: []
    }
  }
];

export const PROJECTS = projects;
