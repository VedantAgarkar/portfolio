import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const TOPO_DATA = {
  nodes: [
    { id: 'inet', name: 'INTERNET', group: 0, size: 12 },
    { id: 'fw', name: 'FIREWALL', group: 1, size: 9 },
    { id: 'r1', name: 'ROUTER_01', group: 1, size: 9 },
    { id: 'sw1', name: 'SWITCH_A', group: 2, size: 7 },
    { id: 'sw2', name: 'SWITCH_B', group: 2, size: 7 },
    { id: 's1', name: 'SERVER_01', group: 3, size: 6 },
    { id: 's2', name: 'SERVER_02', group: 3, size: 6 },
    { id: 's3', name: 'AI_PIPELINE', group: 3, size: 6 },
    { id: 'c1', name: 'CLIENT_A', group: 4, size: 4 },
    { id: 'c2', name: 'CLIENT_B', group: 4, size: 4 },
    { id: 'c3', name: 'CLIENT_C', group: 4, size: 4 },
    { id: 'c4', name: 'CLIENT_D', group: 4, size: 4 },
  ],
  links: [
    { source: 'inet', target: 'fw' },
    { source: 'fw', target: 'r1' },
    { source: 'r1', target: 'sw1' },
    { source: 'r1', target: 'sw2' },
    { source: 'sw1', target: 's1' },
    { source: 'sw1', target: 's3' },
    { source: 'sw2', target: 's2' },
    { source: 'sw1', target: 'c1' },
    { source: 'sw1', target: 'c2' },
    { source: 'sw2', target: 'c3' },
    { source: 'sw2', target: 'c4' },
  ],
}

function ForceTopology() {
  const containerRef = useRef(null)
  const [ForceGraph2D, setForceGraph2D] = useState(null)
  const [dims, setDims] = useState({ w: 800, h: 400 })

  useEffect(() => {
    import('react-force-graph-2d').then((mod) => setForceGraph2D(() => mod.default))
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      setDims({
        w: containerRef.current.offsetWidth,
        h: containerRef.current.offsetHeight,
      })
    }
  }, [])

  const nodeColor = (node) => {
    const colors = ['#C8FF00', '#C8FF00', 'rgba(200,255,0,0.6)', 'rgba(200,255,0,0.4)', 'rgba(255,255,255,0.4)']
    return colors[node.group] || '#fff'
  }

  if (!ForceGraph2D) {
    return (
      <div className="flex items-center justify-center h-full font-mono text-xs text-muted">
        INITIALIZING_TOPOLOGY...
      </div>
    )
  }

  return (
    <ForceGraph2D
      graphData={TOPO_DATA}
      backgroundColor="transparent"
      nodeLabel="name"
      nodeColor={nodeColor}
      nodeRelSize={3}
      linkColor={() => 'rgba(200,255,0,0.2)'}
      linkWidth={1}
      nodeCanvasObject={(node, ctx, scale) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size / 2, 0, 2 * Math.PI)
        ctx.fillStyle = nodeColor(node)
        ctx.fill()
        if (scale > 0.6) {
          ctx.font = `6px Space Mono`
          ctx.fillStyle = 'rgba(255,255,255,0.5)'
          ctx.textAlign = 'center'
          ctx.fillText(node.name, node.x, node.y + node.size + 2)
        }
      }}
      cooldownTicks={100}
      width={dims.w}
      height={dims.h}
    />
  )
}

export default function NetworkGraph() {
  return (
    <section className="section-border py-20 px-6 grid-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-3 font-mono text-xs text-muted tracking-widest">// SIMULATED_NETWORK_TOPOLOGY</div>
        <h2 className="font-sans font-black text-4xl md:text-5xl mb-3 tracking-tight">
          NETWORK VIEW<span style={{ color: '#C8FF00' }}>_</span>
        </h2>
        <p className="font-sans text-sm text-muted mb-8">
          Simulated topology — live force-directed graph. Drag nodes to interact.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative border"
          style={{
            borderColor: 'rgba(255,255,255,0.08)',
            background: '#080808',
            height: '420px',
          }}
        >
          {/* Corner labels */}
          <div className="absolute top-3 left-3 font-mono text-xs text-muted z-10">
            NODES: {TOPO_DATA.nodes.length} // LINKS: {TOPO_DATA.links.length}
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            <span className="status-dot-active" />
            <span className="font-mono text-xs text-muted">LIVE</span>
          </div>

          <div className="w-full h-full">
            <ForceTopology />
          </div>

          {/* Overlay legend */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-4 font-mono text-xs z-10">
            {[
              { color: '#C8FF00', label: 'CORE' },
              { color: 'rgba(200,255,0,0.5)', label: 'SERVER' },
              { color: 'rgba(255,255,255,0.4)', label: 'CLIENT' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                <span className="text-muted">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
