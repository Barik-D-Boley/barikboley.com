export default function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <span className="footer-brand">BARIK DAVID BOLEY / PORTFOLIO</span>
        <nav className="legacy-links" aria-label="Previous portfolio versions">
          <span className="legacy-label">ARCHIVE</span>
          <a
            href="/legacy/v1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View the first portfolio version"
          >
            v1.0
          </a>
          <span className="legacy-divider">/</span>
          <a
            href="/legacy/v2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View the second portfolio version"
          >
            v2.0
          </a>
        </nav>
      </div>
      <div className="footer-right">
        <nav className="footer-socials" aria-label="Social links">
          <a
            href="https://github.com/Barik-D-Boley"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span>/</span>
          <a
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