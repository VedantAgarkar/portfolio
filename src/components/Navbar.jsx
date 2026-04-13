import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'SERVICES', href: '#services' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('HOME')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (label, href) => {
    setActive(label)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled ? 'bg-bg/95 backdrop-blur-sm border-b border-white/08' : 'bg-transparent'
        }`}
        style={{ borderBottom: scrolled ? '1px solid rgba(200,255,0,0.15)' : '1px solid transparent' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          {/* Logo */}
          <button
            onClick={() => handleNav('HOME', '#home')}
            className="font-mono font-bold text-sm tracking-widest"
            style={{ color: '#C8FF00' }}
          >
            VA_SYS
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.label, link.href)}
                className="relative font-sans text-xs tracking-widest font-semibold transition-colors duration-150"
                style={{
                  color: active === link.label ? '#C8FF00' : 'rgba(255,255,255,0.5)',
                }}
              >
                {link.label}
                {active === link.label && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Status Badge */}
          <div className="hidden md:flex items-center gap-2">
            <span className="status-dot-active" />
            <span className="font-mono text-xs text-muted">AVAILABLE_FOR_HIRE</span>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className="block w-5 h-0.5 transition-all"
              style={{
                background: '#C8FF00',
                transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
              }}
            />
            <span
              className="block w-5 h-0.5 transition-all"
              style={{
                background: '#C8FF00',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-0.5 transition-all"
              style={{
                background: '#C8FF00',
                transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 grid-bg flex flex-col items-center justify-center gap-8"
            style={{ background: 'rgba(10,10,10,0.98)' }}
          >
            {links.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleNav(link.label, link.href)}
                className="font-sans font-bold text-2xl tracking-widest transition-colors"
                style={{ color: active === link.label ? '#C8FF00' : '#fff' }}
              >
                {link.label}
              </motion.button>
            ))}
            <div className="flex items-center gap-2 mt-8">
              <span className="status-dot-active" />
              <span className="font-mono text-xs text-muted">AVAILABLE_FOR_HIRE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
