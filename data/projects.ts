import { Project } from '@/types/project';

export const projects: Project[] = [
  // --- TOP FEATURED PROJECTS ---
  // {
  //   id: "anti-theft-system",
  //   title: "Anti-Theft Package Security System",
  //   tagline: "Mechanically engineered package enclosure combining tamper detection and secure delivery logic.",
  //   description:
  //     "A mechanically engineered package enclosure combining tamper detection, rapid prototyping, and secure delivery logic.",
  //   tags: ["CAD", "Inventor", "Prototyping"],
  //   category: "Hardware & CAD",
  //   number: "01",
  //   featured: false,
  //   status: "complete",
  //   githubUrl: "https://github.com/barikboley/anti-theft-system",
  //   details: {
  //     problemStatement: "Package theft from residential porches is rising rapidly, requiring a robust mechanical anti-theft enclosure that detects unauthorized access attempts in real time.",
  //     keyChallenges: [
  //       "Designing mechanical latching mechanisms resilient to forced physical entry.",
  //       "Integrating low-power sensors for continuous vibration and tamper monitoring.",
  //       "Optimizing 3D-printed enclosure geometries for outdoor durability and weather resistance."
  //     ],
  //     systemArchitecture: "Microcontroller-driven sensor array connected to electro-mechanical solenoids and local alarm indicators.",
  //     metrics: [
  //       { label: "Latch Resistance", value: "> 150 lbs" },
  //       { label: "Sensor Latency", value: "< 50ms" },
  //       { label: "Battery Standby", value: "72+ hours" }
  //     ],
  //     toolsUsed: ["Autodesk Inventor", "3D Printing / FDM", "C++", "Arduino / ESP32", "Microcontrollers"],
  //     media: []
  //   }
  // },
  {
    id: "pele-htgr-moose",
    title: "Pele HTGR MOOSE Simulation",
    tagline: "2-step coupled OpenMC–MOOSE thermo-mechanical microreactor simulation.",
    description:
      "2-step coupled OpenMC–MOOSE thermo-mechanical simulation of an HTGR microreactor TRISO unit cell.",
    tags: ["MOOSE Framework", "Python", "Multiphysics", "FEA"],
    category: "FEA & Simulation",
    number: "02",
    featured: true,
    status: "complete",
    githubUrl: "https://github.com/Barik-D-Boley/pele-htgr-moose-simulation",
    details: {
      problemStatement: "High-Temperature Gas-Cooled Reactors require high-fidelity multi-physics modeling to evaluate thermal stress and fission product containment inside TRISO fuel particles.",
      keyChallenges: [
        "Coupling OpenMC Monte Carlo particle transport output directly with the MOOSE finite element solver.",
        "Resolving extreme radial thermal gradients across sub-millimeter TRISO coating layers.",
        "Managing high-density finite element meshes while maintaining solver convergence."
      ],
      systemArchitecture: "Two-stage computational pipeline transferring volumetric heat generation profiles from OpenMC into MOOSE thermo-mechanical boundary conditions.",
      metrics: [
        { label: "Convergence Rate", value: "99.8%" },
        { label: "Mesh Elements", value: "1.2M" },
        { label: "Max Stress", value: "185 MPa" }
      ],
      toolsUsed: ["MOOSE Framework", "OpenMC", "Python", "Coreform Cubit", "Paraview", "FEA"],
      media: []
    }
  },
  {
    id: "walmart-receipt-parser",
    title: "Walmart Receipt Parser",
    tagline: "Automated receipt parsing Chrome Extension and Node.js extraction pipeline.",
    description:
      "Full-stack Chrome Extension (MV3) and Node.js API that extracts itemized receipts into Google Sheets.",
    tags: ["Chrome API", "Node.js", "Express", "Automation"],
    category: "Web & Full-Stack",
    number: "03",
    featured: true,
    status: "complete",
    githubUrl: "https://github.com/Barik-D-Boley/walmart-receipt-parser",
    details: {
      problemStatement: "Manual expense logging from online order receipts is inefficient and prone to human data entry error.",
      keyChallenges: [
        "Handling dynamic client-side rendering and obfuscated DOM selectors in online receipt pages.",
        "Ensuring idempotent transaction sync to prevent duplicate line items in spreadsheet ledgers.",
        "Securing Chrome Extension storage and API access keys across browser sessions."
      ],
      systemArchitecture: "Chrome Extension MV3 content scripts extract raw DOM payload, pass to Node.js/Express service, and write structured records into Google Sheets API.",
      metrics: [
        { label: "Parse Accuracy", value: "99.4%" },
        { label: "Avg Processing Time", value: "< 1.2s" },
        { label: "Items Processed", value: "5,000+" }
      ],
      toolsUsed: ["Chrome Extension API (MV3)", "Node.js", "Express", "TypeScript", "Google Sheets API"],
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
    tagline: "Privacy-focused local CLI utilities replacing bloated cloud web converters.",
    description:
      "A collection of local Python utilities built to replace paid web tools. Self-contained and privacy-focused.",
    tags: ["Python", "CLI", "Automation"],
    category: "Automation & Tools",
    number: "04",
    featured: true,
    status: "complete",
    githubUrl: "https://github.com/Barik-D-Boley/python-utility-belt",
    details: {
      problemStatement: "Uploading sensitive documents and images to third-party web converters presents privacy risks and rate-limiting friction.",
      keyChallenges: [
        "Structuring a zero-dependency CLI package architecture with pluggable subcommands.",
        "Optimizing multi-threaded batch operations for large image and PDF transformations.",
        "Maintaining fast startup times and cross-platform terminal compatibility."
      ],
      systemArchitecture: "Modular Python CLI toolkit organized into atomic utility modules executed via single terminal entrypoint.",
      metrics: [
        { label: "Tools Suite", value: "14 CLI Utilities" },
        { label: "Local Privacy", value: "100% Offline" },
        { label: "Batch Overhead", value: "< 15ms/file" }
      ],
      toolsUsed: ["Python 3.11", "Click CLI", "Pillow", "PyPDF2", "Multiprocessing"],
      media: []
    }
  },

  // --- ADDITIONAL CATALOG PROJECTS ---
  {
    id: "mhtgr-fea",
    title: "MHTGR Thermal-Mechanical FEA",
    tagline: "FEA evaluation of IG-110 nuclear graphite fuel monoliths.",
    description:
      "Coupled thermo-mechanical FEA of an IG-110 nuclear graphite fuel monolith using MOOSE Framework and Coreform Cubit.",
    tags: ["MOOSE Framework", "Coreform Cubit", "FEA"],
    category: "FEA & Simulation",
    number: "05",
    featured: true,
    status: "complete",
    githubUrl: "https://github.com/Barik-D-Boley/mhtgr-thermal-mechanical-fea",
    details: {
      problemStatement: "Evaluating thermal stresses and structural integrity in nuclear graphite fuel blocks under high thermal gradients.",
      keyChallenges: [
        "Generating high-quality hex-mesh representations of coolant channels using Coreform Cubit.",
        "Incorporating temperature-dependent thermal conductivity and elastic moduli properties for IG-110 graphite."
      ],
      systemArchitecture: "Cubit mesh input pipeline linked to MOOSE TensorMechanics and HeatConduction modules.",
      metrics: [
        { label: "Peak Temp", value: "1200°C" },
        { label: "Mesh Quality", value: "0.92 Jacobian" }
      ],
      toolsUsed: ["MOOSE Framework", "Coreform Cubit", "Python", "FEA"],
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
    title: "Progressive Overload Analytics",
    tagline: "Strength training progression calculator and workout analytics platform.",
    description:
      "Workout logging, automated progression logic, and performance analytics platform.",
    tags: ["JavaScript", "Automation", "Analytics"],
    category: "Automation & Tools",
    number: "06",
    featured: false,
    status: "complete",
    githubUrl: "https://github.com/Barik-D-Boley/sheets-progressive-overload-analytics",
    details: {
      problemStatement: "Athletes require accurate progressive overload calculations based on volume, RPE, and historical lift trends.",
      keyChallenges: [
        "Implementing adaptive load recommendation algorithms based on subjective fatigue inputs.",
        "Building offline-capable client-side data persistence with minimal UI latency."
      ],
      systemArchitecture: "Single-page application utilizing reactive state, local IndexedDB persistence, and statistical charting libraries.",
      metrics: [
        { label: "Calc Latency", value: "< 5ms" },
        { label: "Offline Capability", value: "100%" }
      ],
      toolsUsed: ["JavaScript", "HTML5", "CSS3", "Chart.js", "Web Storage"],
      media: []
    }
  },
  {
    id: "portfolio-v3",
    title: "Personal Portfolio",
    tagline: "High-performance developer portfolio built with Next.js & TypeScript",
    description: "Custom portfolio featuring asymmetric desktop grid layouts and modular CSS styling.",
    tags: ["Next.js", "React", "TypeScript", "CSS Modules"],
    category: "Web & Full-Stack",
    number: "07",
    featured: false,
    status: "complete",
    githubUrl: "https://github.com/Barik-D-Boley/barikboley.com",
    liveUrl: "https://barikboley.com",
    details: {
      problemStatement: "Needed a lightweight, pixel-perfect personal showcase without framework bloat.",
      keyChallenges: [
        "Configuring multi-active Intersection Observer states for side-by-side desktop grid columns.",
        "Ensuring zero-layout-shift responsive stacking on mobile viewports."
      ],
      systemArchitecture: "Next.js App Router architecture utilizing modular layout CSS and custom stateful navbar hooks.",
      metrics: [
        { label: "Lighthouse Score", value: "99/100" },
        { label: "Build Time", value: "< 1.5s" }
      ],
      toolsUsed: ["Next.js 14", "TypeScript", "Vanilla CSS Modules", "Vercel"],
      media: []
    }
  }
];

export const PROJECTS = projects;
