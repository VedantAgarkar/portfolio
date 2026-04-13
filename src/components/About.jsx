import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const GRAPH_DATA = {
  nodes: [
    { id: 'VA', name: 'VEDANT', group: 0, size: 14 },
    { id: 'P1', name: 'DECISION ENGINE', group: 1, size: 8 },
    { id: 'P2', name: 'LEGAL DOC SYS', group: 1, size: 8 },
    { id: 'P3', name: 'GPU CONTROLLER', group: 1, size: 8 },
    { id: 'P4', name: 'LAN TRANSFER', group: 1, size: 8 },
    { id: 'T1', name: 'Python', group: 2, size: 5 },
    { id: 'T2', name: 'React', group: 2, size: 5 },
    { id: 'T3', name: 'Streamlit', group: 2, size: 5 },
    { id: 'T4', name: 'OpenRouter', group: 2, size: 5 },
    { id: 'T5', name: 'HTTP/Socket', group: 2, size: 5 },
    { id: 'T6', name: 'Windows API', group: 2, size: 5 },
    { id: 'T7', name: 'AI/ML Libs', group: 2, size: 5 },
  ],
  links: [
    { source: 'VA', target: 'P1' },
    { source: 'VA', target: 'P2' },
    { source: 'VA', target: 'P3' },
    { source: 'VA', target: 'P4' },
    { source: 'P1', target: 'T1' },
    { source: 'P1', target: 'T3' },
    { source: 'P1', target: 'T4' },
    { source: 'P1', target: 'T7' },
    { source: 'P2', target: 'T1' },
    { source: 'P2', target: 'T3' },
    { source: 'P2', target: 'T4' },
    { source: 'P3', target: 'T1' },
    { source: 'P3', target: 'T6' },
    { source: 'P4', target: 'T1' },
    { source: 'P4', target: 'T5' },
    { source: 'VA', target: 'T2' },
  ],
}

function ForceGraphComponent() {
  const containerRef = useRef(null)
  const graphRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [ForceGraph2D, setForceGraph2D] = useState(null)

  useEffect(() => {
    import('react-force-graph-2d').then((mod) => {
      setForceGraph2D(() => mod.default)
      setLoaded(true)
    })
  }, [])

  const nodeColor = (node) => {
    if (node.group === 0) return '#C8FF00'
    if (node.group === 1) return '#ffffff'
    return 'rgba(200,255,0,0.4)'
  }

  if (!loaded || !ForceGraph2D) {
    return (
      <div className="flex items-center justify-center h-64 font-mono text-xs text-muted">
        LOADING_GRAPH...
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full h-64 md:h-80 overflow-hidden">
      <ForceGraph2D
        ref={graphRef}
        graphData={GRAPH_DATA}
        backgroundColor="transparent"
        nodeLabel="name"
        nodeColor={nodeColor}
        nodeRelSize={4}
        linkColor={() => 'rgba(200,255,0,0.25)'}
        linkWidth={1}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name
          const fontSize = node.group === 0 ? 9 : 7
          ctx.font = `bold ${fontSize}px Space Mono, monospace`
          ctx.fillStyle = nodeColor(node)
          ctx.beginPath()
          ctx.arc(node.x, node.y, node.size / 2, 0, 2 * Math.PI)
          ctx.fill()
          if (globalScale >= 0.8) {
            ctx.fillStyle = node.group === 0 ? '#C8FF00' : 'rgba(255,255,255,0.7)'
            ctx.textAlign = 'center'
            ctx.fillText(label, node.x, node.y + node.size)
          }
        }}
        cooldownTicks={80}
        width={containerRef.current?.offsetWidth || 400}
        height={containerRef.current?.offsetHeight || 300}
      />
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="section-border py-20 px-6 grid-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-3 font-mono text-xs text-muted tracking-widest">// SYS_ABOUT</div>
        <h2 className="font-sans font-black text-4xl md:text-5xl mb-12 tracking-tight">
          ABOUT<span style={{ color: '#C8FF00' }}>_</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="font-sans text-xl leading-relaxed mb-8"
              style={{ color: 'rgba(255,255,255,0.85)' }}
            >
              Final-year CS diploma student at{' '}
              <span style={{ color: '#C8FF00' }}>V.B. Kolte College of Engineering</span>, Malkapur.
            </p>
            <p
              className="font-sans text-base leading-relaxed mb-8"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              I build things that work — AI pipelines, network tools, automation scripts. I don't
              wait for permission to ship. My work sits at the intersection of artificial intelligence
              and network infrastructure, building scalable, intelligent systems that solve real
              problems.
            </p>
            <p
              className="font-sans text-base leading-relaxed mb-10"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              Whether it's wiring an LLM pipeline to handle multi-domain queries or automating power
              management on a laptop — I care about outcomes, not abstractions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { val: '4', label: 'SYSTEMS SHIPPED' },
                { val: '2', label: 'INTERNSHIPS' },
                { val: '55Mbps', label: 'PEAK THROUGHPUT' },
              ].map((s) => (
                <div key={s.label} className="border-t pt-4" style={{ borderColor: 'rgba(200,255,0,0.3)' }}>
                  <div
                    className="font-sans font-black text-2xl mb-1"
                    style={{ color: '#C8FF00' }}
                  >
                    {s.val}
                  </div>
                  <div className="font-mono text-xs text-muted tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Dependency Graph */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border"
            style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0e0e0e' }}
          >
            <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <span className="font-mono text-xs text-muted">// PROJECT_DEPENDENCY_MAP</span>
            </div>
            <ForceGraphComponent />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
