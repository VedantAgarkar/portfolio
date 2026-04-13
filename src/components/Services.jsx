import { motion } from 'framer-motion'
import { services } from '../data/skills'

export default function Services() {
  const handleContact = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" className="section-border py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-3 font-mono text-xs text-muted tracking-widest">// SERVICES</div>
        <h2 className="font-sans font-black text-4xl md:text-5xl mb-3 tracking-tight">
          SERVICES<span style={{ color: '#C8FF00' }}>_</span>
        </h2>
        <p className="font-sans text-sm text-muted mb-12">Available for freelance engagements.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {services.map((srv, i) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border p-6 flex flex-col group hover:border-accent transition-all duration-200"
              style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0d0d0d' }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-muted">{srv.code}</span>
                <div
                  className="w-2 h-2 group-hover:bg-accent transition-colors"
                  style={{ background: 'rgba(255,255,255,0.2)' }}
                />
              </div>

              <h3 className="font-sans font-black text-lg tracking-widest text-white mb-3 group-hover:text-accent transition-colors">
                {srv.title}
              </h3>

              <p className="font-sans text-sm leading-relaxed mb-6 flex-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {srv.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {srv.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>

              <button
                onClick={handleContact}
                className="btn-outline text-xs self-start"
              >
                REQUEST SERVICE →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
