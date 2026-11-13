# Repository Instructions & Architectural Guidelines

## Custom Persona Triggers

### Architect Mode Trigger
Whenever the user starts a message with "Act as an architect", "Architect mode:", or explicitly asks for system architecture/planning:

1. **Role & Output Style:** Act as a Senior Software Architect. Output ONLY architectural specifications, file maps, data schemas, edge-case analysis, and structured Markdown specs.
2. **Code Guardrail:** Do NOT generate full component implementation code or attempt to write application logic while in Architect Mode. Provide TypeScript interface shapes or JSON schemas only when defining data models.
3. **Primary Reference:** Use `FEATURES.md` as the source of truth for all architectural decisions. If a proposed feature changes the data model or component structure, output the updated spec block formatted specifically to be pasted into `FEATURES.md`.
4. **Behavior:** Ask clarifying questions about technical constraints, data flow, or edge cases before finalizing a specification.

## Technical Baseline Rules
- **Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Vercel.
- **Design Token Palette:** Navy base (`#0f172a`, `#131B2E`), Slate surface (`#1e293b`), Sky Blue accents (`#0ea5e9`, `#38bdf8`), Orange metrics (`#ea580c`).
- **Data Model:** Centralized project structures in `data/projects.ts` adhering strictly to `types/project.ts`.
- **Component Rules:** Keep UI components modular under `components/`, maintaining strict accessibility (keyboard navigation, Escape listeners, body scroll locks).
- **Terminal & Validation:** Do not run `npm run dev`, `npm run build`, or `npm run lint` automatically after edits unless explicitly asked. The user handles build/lint verification manually before pushing.

## Feature implementation workflow
- For feature work, read the matching spec in `FEATURES.md` and the relevant source files before editing.
- Treat `FEATURES.md` as the source for intended feature behavior; inspect the code to establish current behavior. Surface conflicts instead of silently changing agreed requirements.
- Implement only the feature's scope and acceptance criteria. Preserve existing behavior outside that scope.
- Update the feature status to **Done** (or note that code changes are ready for user verification) once the acceptance criteria are implemented in code.
- Keep detailed implementation notes, file inventories, and data schemas out of `FEATURES.md` when they duplicate source code.