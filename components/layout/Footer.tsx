export default function Footer() {
  return (
    <footer className="flex min-h-[72px] items-center justify-between gap-5 border-t border-[var(--line)] px-[5vw] py-3 font-mono text-[11px] tracking-[0.08em] text-slate-400 max-[780px]:flex-col max-[780px]:justify-center max-[780px]:gap-1 max-[780px]:py-4 max-[780px]:text-center print:hidden">
      <div className="flex flex-wrap items-center gap-4 max-[780px]:justify-center max-[780px]:gap-x-3 max-[780px]:gap-y-0.5">
        <span className="whitespace-nowrap">BARIK BOLEY / PORTFOLIO</span>
        <nav className="flex items-center gap-1.5 text-slate-300" aria-label="Previous portfolio versions">
          <span className="text-slate-300">ARCHIVE</span>
          <a
            className="inline-flex min-h-8 items-center px-0.5 text-slate-300 no-underline transition-colors duration-150 hover:text-sky-400 hover:underline max-[780px]:min-h-11"
            href="/legacy/v1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View the first portfolio version"
          >
            v1.0
          </a>
          <span className="text-slate-400">/</span>
          <a
            className="inline-flex min-h-8 items-center px-0.5 text-slate-300 no-underline transition-colors duration-150 hover:text-sky-400 hover:underline max-[780px]:min-h-11"
            href="/legacy/v2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View the second portfolio version"
          >
            v2.0
          </a>
        </nav>
      </div>
      <div className="flex justify-end max-[780px]:justify-center">
        <nav className="flex items-center gap-2 whitespace-nowrap text-slate-400" aria-label="Social links">
          <a
            className="inline-flex min-h-10 items-center px-1 text-slate-400 no-underline transition-colors duration-150 hover:text-sky-400 max-[780px]:min-h-11"
            href="https://github.com/Barik-D-Boley"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span className="text-slate-400">/</span>
          <a
            className="inline-flex min-h-10 items-center px-1 text-slate-400 no-underline transition-colors duration-150 hover:text-sky-400 max-[780px]:min-h-11"
            href="https://www.linkedin.com/in/barik-boley"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  )
}