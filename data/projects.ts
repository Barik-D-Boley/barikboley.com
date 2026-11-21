import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: "mhtgr-fea",
    slug: "mhtgr",
    date: "Sept 2026",
    title: "MHTGR Thermal-Mechanical FEA",
    tagline: "Coupled thermal-mechanical FEA of a nuclear graphite fuel monolith, from CAD to stress results.",
    description: "Took an IG-110 graphite fuel monolith from CAD through meshing and coupled MOOSE analysis, predicting a ~1.52 MPa peak stress, well below the material's ~25 MPa tensile strength.",
    tags: ["SolidWorks", "Coreform Cubit", "MOOSE", "ParaView"],
    category: "FEA & Simulation",
    number: "01",
    featured: true,
    status: "complete",
    githubUrl: "https://github.com/Barik-D-Boley/mhtgr-thermal-mechanical-fea",
    details: {
      problemStatement: "Predict the temperature and thermal stress in a graphite fuel block under steady-state heating without adding artificial stress from the way the model is constrained.",
      keyChallenges: [
        "Resolving gradients around the fuel and coolant channels: built a structured 18,430-element HEX8 mesh in Coreform Cubit with an average scaled Jacobian above 0.81.",
        "Restraining the part without over-constraining it: applied an isostatic 3-2-1 point constraint that removes all six rigid-body modes without inducing thermal stress.",
        "Reporting results honestly: the inputs are representative values, so the outputs are demonstration results rather than validated predictions.",
      ],
      systemArchitecture: "A SolidWorks model is exported to STEP, meshed in Coreform Cubit, and solved in MOOSE with coupled heat conduction (temperature-dependent conductivity, convective channel cooling) and tensor mechanics. ParaView post-processing showed a 662 K peak temperature, 0.603 mm peak displacement, and hydrostatic stress from +0.44 to -0.50 MPa, marking the tensile core as the region most prone to micro-cracking.",
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
          url: "/project-visuals/htgr-monolith/monolith_cad_drawing.png",
          type: "image",
          caption: "Nuclear graphite fuel monolith CAD drawing",
          alt: "CAD drawing of the nuclear graphite fuel monolith",
          isCover: true,
        },
        {
          url: "/project-visuals/htgr-monolith/monolith_cubit_mesh.png",
          type: "image",
          caption: "Finite element mesh of the fuel monolith",
          alt: "Finite element mesh of the nuclear graphite fuel monolith",
        },
        {
          url: "/project-visuals/htgr-monolith/monolith_cubit_mesh_zoomed.png",
          type: "image",
          caption: "Zoomed view of the finite element mesh",
          alt: "Zoomed-in view of the fuel monolith finite element mesh",
        },
        {
          url: "/project-visuals/htgr-monolith/monolith_paraview_disp.png",
          type: "image",
          caption: "Monolith displacement simulation",
          alt: "ParaView visualization of simulated monolith displacement",
        },
        {
          url: "/project-visuals/htgr-monolith/monolith_paraview_hydro.png",
          type: "image",
          caption: "Monolith hydrostatic stress simulation",
          alt: "ParaView visualization of simulated hydrostatic stress",
        },
        {
          url: "/project-visuals/htgr-monolith/monolith_paraview_temp.png",
          type: "image",
          caption: "Monolith temperature simulation",
          alt: "ParaView visualization of the monolith temperature distribution",
          isCover: true,
        },
        {
          url: "/project-visuals/htgr-monolith/monolith_paraview_vonmises.png",
          type: "image",
          caption: "Monolith von Mises stress simulation",
          alt: "ParaView visualization of von Mises stress in the monolith",
        },
      ]
    }
  },
  {
    id: "pele-htgr-moose",
    slug: "pele",
    date: "Sept 2026 – Present",
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
    id: "python-utility-belt",
    slug: "utility-belt",
    date: "Oct – Nov 2026",
    title: "Python Utility Belt",
    tagline: "Six offline Python tools for image and document tasks, launched from one runner.",
    description: "Replaced online file converters with six local Python tools, including AI background removal and PDF merging, behind one runner that installs only what each tool needs.",
    tags: ["Python", "CLI", "Image Processing", "PDF Tools"],
    category: "Automation & Tools",
    number: "03",
    featured: true,
    status: "maintenance",
    githubUrl: "https://github.com/Barik-D-Boley/python-utility-belt",
    details: {
      problemStatement: "Everyday tasks like removing backgrounds from CAD renders, merging or trimming PDFs, and making QR codes meant uploading files to online converters.",
      keyChallenges: [
        "Keeping heavy dependencies optional: the runner installs only each tool's own packages, so the ~500 MB AI tool never weighs down the small ones.",
        "Handling different image types: background removal offers AI models for photos and color keying for CAD renders with flat backgrounds.",
        "Making the suite easy to extend: a scaffold command creates a new tool's folders, README, and dependency entries and registers it with the runner.",
      ],
      systemArchitecture: "A central run.py maps short commands (bg, pdfm, pdft, qr, and more) to standalone tool modules, checks their dependencies against pyproject.toml extras, and launches them. The suite covers background removal, citation cleaning, PDF merging and trimming, PowerPoint merging, and QR-code generation.",
      metrics: [
        { label: "Utilities", value: "6" },
      ],
      toolsUsed: ["Python", "Pillow", "pypdf", "rembg", "ONNX Runtime"],
      media: [
        {
          url: "/project-visuals/python-utility-belt/runner-menu.png",
          type: "image",
          caption: "Central runner listing the available tools",
          alt: "Terminal output of python run.py listing the six tool shortcuts and the scaffold command",
        },
        {
          url: "/project-visuals/python-utility-belt/qr-generator.png",
          type: "image",
          caption: "QR Code Generator creating a code for barikboley.com",
          alt: "Terminal session of the QR code generator next to the QR code it produced",
          isCover: true,
        },
        {
          url: "/project-visuals/python-utility-belt/bg-removal-before-after.png",
          type: "image",
          caption: "Auto-color keying removing the background from a ParaView render",
          alt: "Terminal session of the background remover with before and after images of a monolith temperature render",
        },
      ]
    }
  },
  {
    id: "walmart-receipt-parser",
    slug: "receipt-parser",
    date: "Aug – Sept 2026",
    title: "Walmart Receipt Parser",
    tagline: "A one-click Chrome extension that turns Walmart order pages into formatted Google Sheets records.",
    description: "Replaced manual receipt entry with a Chrome extension and serverless backend that send itemized Walmart orders to a formatted, duplicate-free Google Sheet in one click.",
    tags: ["Chrome Extension", "Web Scraping", "Node.js", "Google Sheets"],
    category: "Web & Full-Stack",
    number: "04",
    featured: true,
    status: "complete",
    githubUrl: "https://github.com/Barik-D-Boley/walmart-receipt-parser",
    details: {
      problemStatement: "Copying itemized grocery receipts into my budget spreadsheet by hand was slow and error-prone, and an existing receipt-parser extension didn't fit my sheet's layout.",
      keyChallenges: [
        "Extracting data from a page built for people: the scraper reads item details from Walmart's order-page markup, so site changes can break it.",
        "Keeping the sheet clean: the backend checks transaction numbers before writing, so the same order is never recorded twice.",
        "Setup for other users: each user supplies their own Google Cloud service account; a planned version reads the site's network data instead of its markup.",
      ],
      systemArchitecture: "A Manifest V3 extension injects a scraper into the order page and posts the data to a Node.js/Express API on Vercel. The API uses the Sheets batchUpdate method to create a tab for each purchase date in chronological order and apply currency formatting, so after a one-time setup each receipt takes one click.",
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
    id: "progressive-overload-analytics",
    slug: "overload-tracker",
    date: "Sept 2026 – Present",
    title: "Progressive Overload Tracker 2.0",
    tagline: "Rebuilding a personal workout-tracking spreadsheet into a maintainable Apps Script system.",
    description: "Redesigning years of personal strength-training logs into a normalized Google Sheets and Apps Script system, starting with a full feature spec and data-migration plan.",
    tags: ["Google Sheets", "Google Apps Script", "JavaScript", "Fitness Tracking"],
    category: "Automation & Tools",
    number: "05",
    featured: false,
    status: "under development",
    githubUrl: "https://github.com/Barik-D-Boley/sheets-progressive-overload-analytics",
    details: {
      problemStatement: "Years of workout logs live in a spreadsheet that grew without a plan, with inconsistent exercise names and no reliable way to track progress over time.",
      keyChallenges: [
        "Designing a schema that survives change: exercises get stable IDs, so renaming one updates history without breaking past records.",
        "Migrating legacy data safely: the planned one-time import previews and validates every row so nothing is silently lost or duplicated.",
        "Current scope: the specification and development workflow are complete; logging automation and progression analytics are still future work.",
      ],
      systemArchitecture: "Quarterly log tabs act as the single source of truth, with a read-only compiled view for search and charts and a Master tab for settings. Code is written locally in VS Code and version-controlled with Git, then pushed to Google Apps Script with clasp.",
      toolsUsed: ["Google Sheets", "Google Apps Script", "JavaScript", "clasp", "Node.js"],
      media: []
    }
  },
  {
    id: "portfolio-v3",
    slug: "portfolio",
    date: "Aug 2026 – Present",
    title: "Personal Portfolio",
    tagline: "A project-first portfolio built by directing and reviewing AI coding agents.",
    description: "Built a responsive portfolio that lets recruiters see engineering and software work without opening GitHub, by directing and reviewing AI coding agents.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "GitHub Copilot"],
    category: "Web & Full-Stack",
    number: "06",
    featured: false,
    status: "under development",
    githubUrl: "https://github.com/Barik-D-Boley/barikboley.com",
    liveUrl: "https://barikboley.com",
    details: {
      problemStatement: "Engineering recruiters rarely open the GitHub links on a resume, so project work needs to be visible and easy to scan on one site, on desktop and phone.",
      keyChallenges: [
        "Directing and reviewing AI-generated code so the content, components, and design stay consistent.",
        "Making each project easy to find and share: category filters, detail windows with image viewers, and a direct link for every project (e.g. /#mhtgr).",
        "Adapting layouts and interactions for desktop and mobile screens.",
      ],
      systemArchitecture: "A Next.js App Router single-page site built with React and TypeScript. Structured project data drives the gallery, detail windows, and direct links; styling uses Tailwind CSS with section-specific CSS, and the site is hosted on Vercel.",
      toolsUsed: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "GitHub Copilot", "Claude Code", "Vercel"],
      media: [
        {
          url: "/project-visuals/portfolio-v3/desktop-hero.png",
          type: "image",
          caption: "Desktop hero section",
          alt: "Portfolio home page hero on a desktop screen",
          isCover: true,
        },
        {
          url: "/project-visuals/portfolio-v3/desktop-project-gallery.png",
          type: "image",
          caption: "Project gallery with category filters",
          alt: "Project gallery section showing featured project cards and category filter buttons",
        },
        {
          url: "/project-visuals/portfolio-v3/desktop-project-modal.png",
          type: "image",
          caption: "Project detail modal with media viewer",
          alt: "Project detail modal showing an image carousel with thumbnails and the problem statement",
        },
        {
          url: "/project-visuals/portfolio-v3/mobile-hero.png",
          type: "image",
          caption: "Mobile layout",
          alt: "Portfolio home page hero on a phone-sized screen",
        },
      ]
    }
  }
];

export const PROJECTS = projects;
