import { motion } from 'framer-motion'

const stats = [
  { value: '600K+', label: 'REQ/SEC (SIMULATED)', sub: 'stress-tested pipeline' },
  { value: '99.99%', label: 'UPTIME (TESTED)', sub: 'across deployed systems' },
  { value: '4×', label: 'AVG OPTIMIZATION', sub: 'before → after' },
]

export default function Mindset() {
  return (
    <section className="section-border py-24 px-6 grid-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 font-mono text-xs text-muted tracking-widest">// THE_MINDSET</div>
            <h2 className="font-sans font-black leading-tight tracking-tight mb-8" style={{ fontSize: 'clamp(2rem,5vw,4rem)' }}>
              <span style={{ fontStyle: 'italic', textDecoration: 'underline', textDecorationColor: '#C8FF00', textDecorationThickness: '3px' }}>
                THE MINDSET_
              </span>
            </h2>
            <blockquote className="border-l-2 pl-6 space-y-2" style={{ borderColor: '#C8FF00' }}>
              {[
                "I don't chase features.",
                'I chase performance.',
                'If it fails at scale,',
                'it was never built right.',
              ].map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="font-sans font-bold text-xl md:text-2xl"
                  style={{ color: i < 2 ? '#fff' : 'rgba(255,255,255,0.5)' }}
                >
                  {line}
                </motion.p>
              ))}
            </blockquote>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-1"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="border p-6 flex items-center gap-6"
                style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0d0d0d' }}
              >
                <div
                  className="font-sans font-black text-3xl md:text-4xl flex-shrink-0"
                  style={{ color: '#C8FF00' }}
                >
                  {s.value}
                </div>
                <div>
                  <div className="font-mono text-xs text-white tracking-widest mb-1">{s.label}</div>
                  <div className="font-sans text-xs text-muted">{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
