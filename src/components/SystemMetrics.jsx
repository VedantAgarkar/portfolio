import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const comparisons = [
  {
    label: 'AI RESPONSE LATENCY',
    system: 'Decision Engine',
    before: { val: 850, unit: 'ms', display: '850ms' },
    after: { val: 120, unit: 'ms', display: '120ms' },
    improvement: '85.8% FASTER',
  },
  {
    label: 'BATTERY LIFE',
    system: 'GPU State Controller',
    before: { val: 20, unit: 'hr', display: '1.5hr' },
    after: { val: 100, unit: 'hr', display: '6hr+' },
    improvement: '4× INCREASE',
  },
  {
    label: 'DOCUMENT PROCESSING',
    system: 'Legal Doc Intelligence',
    before: { val: 85, unit: 'min', display: '45 min manual' },
    after: { val: 10, unit: 'sec', display: '< 1 min auto' },
    improvement: '98.5% TIME SAVED',
  },
  {
    label: 'FILE TRANSFER SPEED',
    system: 'LAN Transfer Protocol',
    before: { val: 22, unit: 'mbps', display: 'USB 12Mbps' },
    after: { val: 100, unit: 'mbps', display: 'WiFi 55Mbps' },
    improvement: '4.5× THROUGHPUT',
  },
]

function ComparisonBar({ item }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="border p-6" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0d0d0d' }}>
      <div className="flex justify-between items-start mb-1">
        <div className="font-mono text-xs text-muted tracking-widest">{item.label}</div>
        <span
          className="font-mono text-xs px-2 py-0.5"
          style={{ color: '#C8FF00', border: '1px solid rgba(200,255,0,0.3)' }}
        >
          {item.improvement}
        </span>
      </div>
      <div className="font-sans text-sm font-medium text-white mb-4">// {item.system}</div>

      {/* Before */}
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="font-mono text-xs text-muted">BEFORE</span>
          <span className="font-mono text-xs text-muted">{item.before.display}</span>
        </div>
        <div className="metric-bar-track">
          <motion.div
            className="h-full"
            style={{ background: 'rgba(255,255,255,0.15)', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: item.before.val / 100 } : { scaleX: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* After */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="font-mono text-xs" style={{ color: '#C8FF00' }}>AFTER</span>
          <span className="font-mono text-xs" style={{ color: '#C8FF00' }}>{item.after.display}</span>
        </div>
        <div className="metric-bar-track">
          <motion.div
            className="metric-bar-fill"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: item.after.val / 100 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  )
}

export default function SystemMetrics() {
  return (
    <section className="section-border py-20 px-6 grid-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-3 font-mono text-xs text-muted tracking-widest">// SYSTEM_METRICS</div>
        <h2 className="font-sans font-black text-4xl md:text-5xl mb-3 tracking-tight">
          OPTIMIZATION<span style={{ color: '#C8FF00' }}>_</span>
        </h2>
        <p className="font-sans text-sm text-muted mb-12">Before vs. after. Real numbers, real systems.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {comparisons.map((item) => (
            <ComparisonBar key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
