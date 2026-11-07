## Feature Spec: Project Popout Modal & Details Architecture

### 1. Data Schema Updates (`types/project.ts`)
Extend the single `projects.ts` data structure to support detailed engineering & software popouts:

```typescript
export interface Metric {
  label: string;
  value: string;
}

export interface ProjectMedia {
  url: string;
  type: 'image' | 'gif';
  caption?: string;
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
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  status?: 'planned' | 'under development' | 'maintenance' | 'complete';
  githubUrl?: string;
  liveUrl?: string;
  details?: ProjectDetails;
}
```

### 2. Unified Data File (`data/projects.ts`)
All projects exist in one array in `data/projects.ts`. Popout data lives inside the optional details object:

```typescript
import { Project } from '@/types/project';

export const PROJECTS: Project[] = [
  {
    id: 'portfolio-v3',
    title: 'Personal Portfolio',
    tagline: 'High-performance developer portfolio built with Next.js & TypeScript',
    description: 'Custom portfolio featuring asymmetric desktop grid layouts and modular CSS styling.',
    tags: ['Next.js', 'React', 'TypeScript', 'CSS Modules'],
    status: 'complete',
    githubUrl: 'https://github.com/barikboley/portfolio',
    liveUrl: 'https://barikboley.com',
    details: {
      problemStatement: 'Needed a lightweight, pixel-perfect personal showcase without framework bloat.',
      keyChallenges: [
        'Configuring multi-active Intersection Observer states for side-by-side desktop grid columns.',
        'Ensuring zero-layout-shift responsive stacking on mobile viewports.'
      ],
      systemArchitecture: 'Next.js App Router architecture utilizing modular layout CSS and custom stateful navbar hooks.',
      metrics: [
        { label: 'Lighthouse Score', value: '99/100' },
        { label: 'Build Time', value: '< 1.5s' }
      ],
      toolsUsed: ['Next.js 14', 'TypeScript', 'Vanilla CSS Modules', 'Vercel'],
      media: [
        { url: '/images/projects/portfolio-main.png', type: 'image', caption: 'Desktop Layout View' },
        { url: '/images/projects/portfolio-mobile.png', type: 'image', caption: 'Mobile Responsive Stacking' }
      ]
    }
  }
];
```

### 3. Component Spec (`components/ui/ProjectModal.tsx`)
Layout & Behavior Guidelines for Coding Agent:
- **State Management:** Control modal visibility using local parent React state (e.g., `const [selectedProject, setSelectedProject] = useState<Project null |>(null)`).
- **Triggering:** Entire card click opens modal. Direct GitHub/Demo links on card stay clickable independently via `e.stopPropagation()`.
- **Keyboard Accessibility:** Modal closes on `Esc` key press or clicking outside container backdrop. Disable background body scroll (`overflow: hidden`) when modal is open.
- **Hero + Thumbnail Gallery:** Render primary selected image/GIF in main container. Render horizontal thumbnail gallery underneath; clicking thumbnail swaps hero image.
- **Sub-sections & Data Fallbacks:** Gracefully omit sub-sections if their corresponding field is missing or empty (e.g., if `details`, `metrics`, or `media` are undefined) without throwing runtime errors or rendering blank UI containers. When present, display up to 4 distinct styled sub-sections:
  1. Problem Statement
  2. Key Challenges (bulleted list)
  3. System Architecture
  4. Relevant Metrics (styled grid of stat cards/badges)
- **Action CTAs:** Prominent "View Repository on GitHub" and "Live Demo" buttons located in header and footer.
- **Styling:** Match site theme (`bg-[#131B2E]`, `border-sky-500/20`, dark blurred backdrop, cyan accents, monospace tag badges).