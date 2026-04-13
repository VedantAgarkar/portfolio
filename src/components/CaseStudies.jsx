import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'

/* ─── SVG System Diagrams ─── */
function LLMPipelineDiagram() {
  return (
    <svg viewBox="0 0 400 160" className="w-full h-40" style={{ background: '#0e0e0e' }}>
      {/* User */}
      <rect x="10" y="60" width="70" height="40" fill="none" stroke="rgba(200,255,0,0.5)" strokeWidth="1" />
      <text x="45" y="79" textAnchor="middle" fill="#C8FF00" fontSize="9" fontFamily="Space Mono">USER</text>
      <text x="45" y="92" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Space Mono">QUERY</text>
      {/* Arrow 1 */}
      <line x1="80" y1="80" x2="115" y2="80" stroke="#C8FF00" strokeWidth="1" markerEnd="url(#arr)" />
      {/* Router */}
      <rect x="115" y="55" width="80" height="50" fill="rgba(200,255,0,0.06)" stroke="#C8FF00" strokeWidth="1" />
      <text x="155" y="78" textAnchor="middle" fill="#C8FF00" fontSize="9" fontFamily="Space Mono">ROUTER</text>
      <text x="155" y="92" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Space Mono">CLASSIFY</text>
      {/* Arrow 2 */}
      <line x1="195" y1="80" x2="230" y2="80" stroke="#C8FF00" strokeWidth="1" />
      {/* DeepSeek */}
      <rect x="230" y="50" width="85" height="60" fill="rgba(200,255,0,0.08)" stroke="rgba(200,255,0,0.8)" strokeWidth="1.5" />
      <text x="272" y="75" textAnchor="middle" fill="#C8FF00" fontSize="9" fontFamily="Space Mono">DeepSeek</text>
      <text x="272" y="88" textAnchor="middle" fill="#C8FF00" fontSize="8" fontFamily="Space Mono">R1</text>
      <text x="272" y="102" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Space Mono">via OpenRouter</text>
      {/* Arrow 3 */}
      <line x1="315" y1="80" x2="355" y2="80" stroke="#C8FF00" strokeWidth="1" />
      {/* Output */}
      <rect x="355" y="60" width="38" height="40" fill="none" stroke="rgba(200,255,0,0.4)" strokeWidth="1" />
      <text x="374" y="79" textAnchor="middle" fill="#fff" fontSize="7" fontFamily="Space Mono">OUT</text>
      <text x="374" y="92" textAnchor="middle" fill="rgba(200,255,0,0.6)" fontSize="6" fontFamily="Space Mono">~120ms</text>
      {/* Domain labels */}
      <text x="10" y="130" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="Space Mono">FARMING</text>
      <text x="90" y="130" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="Space Mono">STARTUP</text>
      <text x="175" y="130" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="Space Mono">BUSINESS</text>
      <text x="265" y="130" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="Space Mono">GENERAL</text>
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#C8FF00" />
        </marker>
      </defs>
    </svg>
  )
}

function DocPipelineDiagram() {
  return (
    <svg viewBox="0 0 400 160" className="w-full h-40" style={{ background: '#0e0e0e' }}>
      <rect x="10" y="60" width="65" height="40" fill="none" stroke="rgba(200,255,0,0.5)" strokeWidth="1" />
      <text x="42" y="78" textAnchor="middle" fill="#C8FF00" fontSize="8" fontFamily="Space Mono">CSV</text>
      <text x="42" y="91" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Space Mono">INPUT</text>
      <line x1="75" y1="80" x2="110" y2="80" stroke="#C8FF00" strokeWidth="1" />
      <rect x="110" y="55" width="80" height="50" fill="rgba(200,255,0,0.06)" stroke="#C8FF00" strokeWidth="1" />
      <text x="150" y="78" textAnchor="middle" fill="#C8FF00" fontSize="9" fontFamily="Space Mono">LLM</text>
      <text x="150" y="91" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Space Mono">SUMMARIZE</text>
      <line x1="190" y1="80" x2="225" y2="80" stroke="#C8FF00" strokeWidth="1" />
      <rect x="225" y="55" width="80" height="50" fill="rgba(200,255,0,0.06)" stroke="rgba(200,255,0,0.7)" strokeWidth="1" />
      <text x="265" y="78" textAnchor="middle" fill="#C8FF00" fontSize="9" fontFamily="Space Mono">PDF</text>
      <text x="265" y="91" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Space Mono">GENERATOR</text>
      <line x1="305" y1="80" x2="345" y2="80" stroke="#C8FF00" strokeWidth="1" />
      <rect x="345" y="60" width="50" height="40" fill="rgba(200,255,0,0.1)" stroke="#C8FF00" strokeWidth="1.5" />
      <text x="370" y="78" textAnchor="middle" fill="#000" fontSize="8" fontFamily="Space Mono" fontWeight="bold">REPORT</text>
      <text x="370" y="91" textAnchor="middle" fill="#000" fontSize="7" fontFamily="Space Mono">.pdf</text>
      <rect x="345" y="60" width="50" height="40" fill="#C8FF00" />
      <text x="370" y="78" textAnchor="middle" fill="#000" fontSize="8" fontFamily="Space Mono" fontWeight="bold">REPORT</text>
      <text x="370" y="91" textAnchor="middle" fill="#000" fontSize="7" fontFamily="Space Mono">↓ .pdf</text>
      <text x="155" y="130" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="Space Mono">70+ DOCUMENTS PROCESSED</text>
    </svg>
  )
}

function StateMachineDiagram() {
  return (
    <svg viewBox="0 0 400 160" className="w-full h-40" style={{ background: '#0e0e0e' }}>
      <circle cx="70" cy="80" r="35" fill="rgba(200,255,0,0.06)" stroke="rgba(200,255,0,0.5)" strokeWidth="1" />
      <text x="70" y="76" textAnchor="middle" fill="#C8FF00" fontSize="9" fontFamily="Space Mono">AC</text>
      <text x="70" y="89" textAnchor="middle" fill="#C8FF00" fontSize="9" fontFamily="Space Mono">PLUGGED</text>
      <rect x="155" y="55" width="90" height="50" fill="rgba(200,255,0,0.06)" stroke="#C8FF00" strokeWidth="1.5" />
      <text x="200" y="76" textAnchor="middle" fill="#C8FF00" fontSize="9" fontFamily="Space Mono">GPU MUX</text>
      <text x="200" y="89" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="Space Mono">STATE CONTROLLER</text>
      <circle cx="330" cy="55" r="28" fill="rgba(200,255,0,0.1)" stroke="#C8FF00" strokeWidth="1.5" />
      <text x="330" y="51" textAnchor="middle" fill="#C8FF00" fontSize="8" fontFamily="Space Mono">GPU</text>
      <text x="330" y="64" textAnchor="middle" fill="#C8FF00" fontSize="8" fontFamily="Space Mono">ON</text>
      <circle cx="330" cy="115" r="28" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      <text x="330" y="111" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="Space Mono">GPU</text>
      <text x="330" y="124" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="Space Mono">OFF</text>
      <line x1="105" y1="70" x2="155" y2="72" stroke="#C8FF00" strokeWidth="1" />
      <line x1="245" y1="70" x2="302" y2="58" stroke="#C8FF00" strokeWidth="1" />
      <line x1="245" y1="90" x2="302" y2="108" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="4,3" />
      <text x="165" y="130" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="Space Mono">BATTERY: 1.5hr → 6hr+</text>
    </svg>
  )
}

function P2PDiagram() {
  return (
    <svg viewBox="0 0 400 160" className="w-full h-40" style={{ background: '#0e0e0e' }}>
      <rect x="10" y="55" width="80" height="50" fill="rgba(200,255,0,0.06)" stroke="#C8FF00" strokeWidth="1" />
      <text x="50" y="78" textAnchor="middle" fill="#C8FF00" fontSize="9" fontFamily="Space Mono">CLIENT</text>
      <text x="50" y="91" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Space Mono">SENDER</text>
      <rect x="180" y="40" width="40" height="80" fill="rgba(200,255,0,0.04)" stroke="rgba(200,255,0,0.3)" strokeWidth="1" strokeDasharray="4,3" />
      <text x="200" y="75" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="Space Mono">LAN</text>
      <text x="200" y="88" textAnchor="middle" fill="rgba(200,255,0,0.5)" fontSize="7" fontFamily="Space Mono">WiFi4</text>
      <text x="200" y="101" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="6" fontFamily="Space Mono">55Mbps</text>
      <rect x="310" y="55" width="80" height="50" fill="rgba(200,255,0,0.06)" stroke="#C8FF00" strokeWidth="1" />
      <text x="350" y="78" textAnchor="middle" fill="#C8FF00" fontSize="9" fontFamily="Space Mono">CLIENT</text>
      <text x="350" y="91" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="Space Mono">RECEIVER</text>
      <line x1="90" y1="80" x2="180" y2="80" stroke="#C8FF00" strokeWidth="1.5" />
      <line x1="220" y1="80" x2="310" y2="80" stroke="#C8FF00" strokeWidth="1.5" />
      <text x="200" y="140" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="Space Mono">HTTP // NO EXTERNAL SERVERS // ZERO CLOUD</text>
    </svg>
  )
}

const DIAGRAMS = {
  'llm-pipeline': LLMPipelineDiagram,
  'doc-pipeline': DocPipelineDiagram,
  'state-machine': StateMachineDiagram,
  'peer-to-peer': P2PDiagram,
}

function CaseStudyCard({ project, reversed }) {
  const Diagram = DIAGRAMS[project.diagramType]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border`}
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
    >
      {/* Diagram pane */}
      <div
        className={`${reversed ? 'lg:order-2' : ''} border-b lg:border-b-0`}
        style={{
          borderColor: 'rgba(255,255,255,0.08)',
          borderRight: !reversed ? '1px solid rgba(255,255,255,0.08)' : 'none',
          borderLeft: reversed ? '1px solid rgba(255,255,255,0.08)' : 'none',
        }}
      >
        <div className="px-4 py-2 border-b flex items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0d0d0d' }}>
          <span className="font-mono text-xs text-muted">{project.index}</span>
          <span className="font-mono text-xs" style={{ color: '#C8FF00' }}>{project.category}</span>
        </div>
        <div className="p-4">
          <Diagram />
        </div>
      </div>

      {/* Info pane */}
      <div className={`${reversed ? 'lg:order-1' : ''} p-8 flex flex-col justify-center`}>
        <div className="font-mono text-xs text-muted tracking-widest mb-2">{project.category}</div>
        <h3 className="font-sans font-black text-2xl md:text-3xl text-white mb-4 tracking-tight">
          {project.title}
        </h3>
        <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {project.description}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-mono font-bold text-sm mb-1" style={{ color: '#C8FF00' }}>{m.value}</div>
              <div className="font-mono text-xs text-muted">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline self-start text-xs"
        >
          VIEW ON GITHUB →
        </a>
      </div>
    </motion.div>
  )
}

export default function CaseStudies() {
  return (
    <section id="projects" className="section-border py-20 px-6 grid-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-3 font-mono text-xs text-muted tracking-widest">// CASE_STUDIES</div>
        <h2 className="font-sans font-black text-4xl md:text-5xl mb-3 tracking-tight">
          CASE STUDIES<span style={{ color: '#C8FF00' }}>_</span>
        </h2>
        <p className="font-sans text-sm text-muted mb-12">
          Real systems, real problems, real results.
        </p>

        <div className="space-y-1">
          {projects.map((p, i) => (
            <CaseStudyCard key={p.id} project={p} reversed={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
