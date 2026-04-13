export default function Footer() {
  return (
    <footer className="section-border py-8 px-6 grid-bg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-mono font-bold text-sm tracking-widest" style={{ color: '#C8FF00' }}>
            VA_SYS
          </span>
          <span className="text-muted font-mono text-xs">© 2025 VEDANT AGARKAR</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="status-dot-active" />
          <span className="font-mono text-xs text-muted">SYSTEM: ONLINE</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/VedantAgarkar"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-accent transition-colors tracking-widest"
            style={{ '--accent': '#C8FF00' }}
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/vedant-agarkar-786b81310/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-accent transition-colors tracking-widest"
          >
            LINKEDIN
          </a>
          <a
            href="mailto:agarkarvedant@gmail.com"
            className="font-mono text-xs text-muted hover:text-accent transition-colors tracking-widest"
          >
            EMAIL
          </a>
        </div>
      </div>
    </footer>
  )
}
