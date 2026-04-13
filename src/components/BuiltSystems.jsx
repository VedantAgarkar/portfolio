import { motion } from 'framer-motion'
import { builtSystems } from '../data/skills'

export default function BuiltSystems() {
  return (
    <section className="section-border py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-3 font-mono text-xs text-muted tracking-widest">// BUILT_SYSTEMS</div>
        <h2 className="font-sans font-black text-4xl md:text-5xl mb-12 tracking-tight">
          BUILT SYSTEMS<span style={{ color: '#C8FF00' }}>_</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
          {builtSystems.map((sys, i) => (
            <motion.div
              key={sys.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="border p-6 group hover:border-accent transition-all duration-200 cursor-default"
              style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0d0d0d' }}
            >
              {/* Status row */}
              <div className="flex items-center gap-2 mb-4">
                {sys.status === 'ACTIVE' ? (
                  <span className="status-dot-active" />
                ) : (
                  <span className="status-dot-stable" />
                )}
                <span
                  className="font-mono text-xs tracking-widest"
                  style={{ color: sys.status === 'ACTIVE' ? '#C8FF00' : 'rgba(255,255,255,0.4)' }}
                >
                  {sys.status}
                </span>
              </div>

              <h3 className="font-sans font-black text-sm tracking-widest text-white mb-3 group-hover:text-accent transition-colors">
                {sys.name}
              </h3>

              <p className="font-sans text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {sys.description}
              </p>

              <div
                className="font-mono text-xs border-t pt-3 mt-auto"
                style={{ borderColor: 'rgba(255,255,255,0.06)', color: '#C8FF00' }}
              >
                {sys.metrics}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
