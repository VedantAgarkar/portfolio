import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'

export default function Hero() {
  const handleScroll = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen grid-bg scanline-container flex flex-col justify-center px-6 pt-14 overflow-hidden"
    >
      {/* Corner labels */}
      <div className="absolute top-16 left-6 font-mono text-xs text-muted tracking-widest hidden md:block">
        [SYS_INIT_v2.0]
      </div>
      <div className="absolute top-16 right-6 font-mono text-xs tracking-widest hidden md:flex items-center gap-2">
        <span className="status-dot-active" />
        <span className="text-muted">STATUS: ONLINE</span>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span
            className="font-mono text-xs tracking-widest px-3 py-1 border"
            style={{ borderColor: '#C8FF00', color: '#C8FF00' }}
          >
            VEDANT AGARKAR // MALKAPUR, IN
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans font-bold leading-none tracking-tight text-white mb-2"
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', lineHeight: 0.9 }}
        >
          I BUILD SYSTEMS
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans font-bold leading-none tracking-tight mb-8"
          style={{
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            lineHeight: 0.9,
            color: '#C8FF00',
            WebkitTextStroke: '2px #C8FF00',
          }}
        >
          THAT DON'T BREAK.
        </motion.h1>

        {/* Typing Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-lg md:text-xl mb-10"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          <span style={{ color: '#C8FF00' }}>{'>'} </span>
          <TypeAnimation
            sequence={[
              'AI Engineer_',
              2000,
              'Systems Builder_',
              2000,
              'Network Architect_',
              2000,
              'Automation Specialist_',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <button
            className="btn-primary"
            onClick={() => handleScroll('#projects')}
          >
            VIEW SYSTEMS →
          </button>
          <button
            className="btn-outline"
            onClick={() => handleScroll('#contact')}
          >
            ESTABLISH CONTACT
          </button>
        </motion.div>

        {/* Terminal Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="border-t pt-6 flex flex-wrap gap-6 font-mono text-xs text-muted"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          {[
            ['SYSTEM', 'ONLINE'],
            ['LOCATION', 'MALKAPUR, IN'],
            ['STACK', 'PYTHON // REACT // AI'],
            ['STATUS', 'AVAILABLE_FOR_HIRE'],
          ].map(([key, val]) => (
            <div key={key} className="flex gap-2">
              <span className="text-muted">{key}:</span>
              <span style={{ color: '#C8FF00' }}>{val}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Grid accent lines */}
      <div
        className="absolute right-0 top-0 bottom-0 w-px hidden lg:block"
        style={{ background: 'rgba(200,255,0,0.08)' }}
      />
      <div
        className="absolute right-[33%] top-0 bottom-0 w-px hidden lg:block"
        style={{ background: 'rgba(200,255,0,0.04)' }}
      />
    </section>
  )
}
