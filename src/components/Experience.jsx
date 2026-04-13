import { motion } from 'framer-motion'
import { experience } from '../data/experience'

export default function Experience() {
  return (
    <section id="experience" className="section-border py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-3 font-mono text-xs text-muted tracking-widest">// SYS_EXPERIENCE</div>
        <h2 className="font-sans font-black text-4xl md:text-5xl mb-12 tracking-tight">
          EXPERIENCE<span style={{ color: '#C8FF00' }}>_</span>
        </h2>

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, #C8FF00, rgba(200,255,0,0.1))' }}
          />

          <div className="space-y-10 md:pl-16">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[52px] top-2 w-3 h-3 border-2 hidden md:block"
                  style={{ borderColor: '#C8FF00', background: '#0A0A0A' }}
                />

                {/* Card */}
                <div
                  className="border p-6 transition-all duration-200 group-hover:border-accent"
                  style={{
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderLeft: '2px solid #C8FF00',
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="font-mono text-xs tracking-widest mb-1" style={{ color: '#C8FF00' }}>
                        {exp.company}
                      </div>
                      <h3 className="font-sans font-bold text-xl text-white">{exp.role}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="font-mono text-xs px-2 py-1 tracking-widest"
                        style={{ background: 'rgba(200,255,0,0.1)', color: '#C8FF00', border: '1px solid rgba(200,255,0,0.3)' }}
                      >
                        {exp.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4 font-mono text-xs text-muted">
                    <span>◷ {exp.period}</span>
                    <span>⌖ {exp.type}</span>
                  </div>

                  <p className="font-sans text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
