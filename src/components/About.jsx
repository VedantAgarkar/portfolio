import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const NODES = [
  { id: 0, name: 'VEDANT', group: 0, r: 22 },
  { id: 1, name: 'DECISION ENGINE', group: 1, r: 14 },
  { id: 2, name: 'LEGAL DOC SYS', group: 1, r: 14 },
  { id: 3, name: 'GPU CONTROLLER', group: 1, r: 14 },
  { id: 4, name: 'LAN TRANSFER', group: 1, r: 14 },
  { id: 5, name: 'Python', group: 2, r: 9 },
  { id: 6, name: 'React', group: 2, r: 9 },
  { id: 7, name: 'Streamlit', group: 2, r: 9 },
  { id: 8, name: 'OpenRouter', group: 2, r: 9 },
  { id: 9, name: 'HTTP', group: 2, r: 9 },
  { id: 10, name: 'WinAPI', group: 2, r: 9 },
  { id: 11, name: 'AI/ML', group: 2, r: 9 },
]

const LINKS = [
  [0,1],[0,2],[0,3],[0,4],[0,6],
  [1,5],[1,7],[1,8],[1,11],
  [2,5],[2,7],[2,8],
  [3,5],[3,10],
  [4,5],[4,9],
]

function useForceGraph(width, height) {
  const [positions, setPositions] = useState(() => {
    const cx = width / 2, cy = height / 2
    return NODES.map((n, i) => {
      const angle = (i / NODES.length) * 2 * Math.PI
      const dist = n.group === 0 ? 0 : n.group === 1 ? 95 : 185
      return { id: n.id, x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle), vx: 0, vy: 0 }
    })
  })

  const posRef = useRef(positions)
  const pinnedRef = useRef({})
  const rafRef = useRef()

  const tick = useCallback(() => {
    const cx = width / 2, cy = height / 2
    const pos = posRef.current.map(p => ({ ...p }))

    // Repulsion
    for (let i = 0; i < pos.length; i++) {
      for (let j = i + 1; j < pos.length; j++) {
        const dx = pos[j].x - pos[i].x, dy = pos[j].y - pos[i].y
        const dist = Math.sqrt(dx*dx + dy*dy) || 1
        const force = 4500 / (dist * dist)
        const fx = (dx / dist) * force, fy = (dy / dist) * force
        pos[i].vx -= fx; pos[i].vy -= fy
        pos[j].vx += fx; pos[j].vy += fy
      }
    }

    // Link attraction
    LINKS.forEach(([a, b]) => {
      const pa = pos[a], pb = pos[b]
      const dx = pb.x - pa.x, dy = pb.y - pa.y
      const dist = Math.sqrt(dx*dx + dy*dy) || 1
      const target = a === 0 ? 110 : 80
      const force = (dist - target) * 0.035
      const fx = (dx / dist) * force, fy = (dy / dist) * force
      pa.vx += fx; pa.vy += fy
      pb.vx -= fx; pb.vy -= fy
    })

    // Center gravity
    pos.forEach(p => {
      p.vx += (cx - p.x) * 0.006
      p.vy += (cy - p.y) * 0.006
    })

    // Integrate
    pos.forEach(p => {
      if (pinnedRef.current[p.id] !== undefined) {
        p.x = pinnedRef.current[p.id].x
        p.y = pinnedRef.current[p.id].y
        p.vx = 0; p.vy = 0
      } else {
        p.vx *= 0.72; p.vy *= 0.72
        p.x += p.vx; p.y += p.vy
        const node = NODES[p.id]
        p.x = Math.max(node.r + 20, Math.min(width - node.r - 20, p.x))
        p.y = Math.max(node.r + 20, Math.min(height - node.r - 20, p.y))
      }
    })

    posRef.current = pos
    // Only update React state (trigger re-render) when visible
    if (activeRef.current) setPositions([...pos])
    rafRef.current = requestAnimationFrame(tick)
  }, [width, height])

  const activeRef = useRef(true)

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  // Pause physics when off-screen
  useEffect(() => {
    const el = document.getElementById('about-graph')
    if (!el || !('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver(
      ([entry]) => { activeRef.current = entry.isIntersecting },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const startDrag = useCallback((id, startX, startY, nodeX, nodeY, scale = 1) => {
    const onMove = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX
      const cy2 = e.touches ? e.touches[0].clientY : e.clientY
      pinnedRef.current[id] = {
        x: nodeX + (cx - startX) / scale,
        y: nodeY + (cy2 - startY) / scale,
      }
    }
    const onUp = () => {
      delete pinnedRef.current[id]
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onUp)
  }, [])

  return { positions, startDrag }
}

function getCurvedPath(x1, y1, x2, y2, curve = 0.18) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
  const dx = x2 - x1, dy = y2 - y1
  const cx = mx - dy * curve, cy2 = my + dx * curve
  return `M ${x1} ${y1} Q ${cx} ${cy2} ${x2} ${y2}`
}

function GraphContainer() {
  const wrapRef = useRef()
  const [size, setSize] = useState({ w: 0, h: 0 })
  const { positions, startDrag } = useForceGraph(
    size.w || 400,
    size.h || 300
  )
  const [hovered, setHovered] = useState(null)

  // Pan + zoom state
  const [view, setView] = useState({ x: 0, y: 0, scale: 1 })
  const isPanning = useRef(false)
  const panOrigin = useRef({ mx: 0, my: 0, vx: 0, vy: 0 })

  useEffect(() => {
    const update = () => {
      if (wrapRef.current) setSize({ w: wrapRef.current.offsetWidth, h: wrapRef.current.offsetHeight })
    }
    update()
    const ro = new ResizeObserver(update)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  // Wheel zoom
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      const delta = e.deltaY < 0 ? 1.12 : 0.9
      setView(v => ({ ...v, scale: Math.min(3.5, Math.max(0.3, v.scale * delta)) }))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [size])

  // Pan on background drag
  const onSvgMouseDown = (e) => {
    // Only pan if clicking directly on svg or the bg rect
    if (e.target !== e.currentTarget && e.target.getAttribute('data-bg') !== 'true') return
    isPanning.current = true
    panOrigin.current = { mx: e.clientX, my: e.clientY, vx: view.x, vy: view.y }
    e.preventDefault()
  }

  useEffect(() => {
    const onMove = (e) => {
      if (!isPanning.current) return
      setView(v => ({
        ...v,
        x: panOrigin.current.vx + (e.clientX - panOrigin.current.mx),
        y: panOrigin.current.vy + (e.clientY - panOrigin.current.my),
      }))
    }
    const onUp = () => { isPanning.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [])

  const handleNodeMouseDown = (n, p, e) => {
    e.preventDefault()
    e.stopPropagation()
    startDrag(n.id, e.clientX, e.clientY, p.x, p.y, view.scale)
  }

  if (!size.w) return <div ref={wrapRef} className="w-full h-full" />

  return (
    <div ref={wrapRef} id="about-graph" className="w-full h-full" style={{ touchAction: 'none' }}>
      <svg
        width={size.w}
        height={size.h}
        style={{ display: 'block', cursor: 'move' }}
        onMouseDown={onSvgMouseDown}
      >
        <defs>
          <filter id="glow-lime" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-sm" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Invisible background to capture pan */}
        <rect data-bg="true" width={size.w} height={size.h} fill="transparent" />

        {/* All graph content inside transform group */}
        <g transform={`translate(${view.x},${view.y}) scale(${view.scale})`}>
          {/* Links */}
          {LINKS.map(([a, b], i) => {
            const pa = positions[a], pb = positions[b]
            if (!pa || !pb) return null
            const lit = hovered === a || hovered === b
            return (
              <path
                key={i}
                d={getCurvedPath(pa.x, pa.y, pb.x, pb.y)}
                fill="none"
                stroke={lit ? 'rgba(200,255,0,0.55)' : 'rgba(200,255,0,0.13)'}
                strokeWidth={lit ? 1.5 : 0.8}
                style={{ transition: 'stroke 0.15s' }}
              />
            )
          })}

          {/* Nodes */}
          {NODES.map((n) => {
            const p = positions[n.id]
            if (!p) return null
            const isHov = hovered === n.id
            const isMain = n.group === 0
            const isMid = n.group === 1

            return (
              <g
                key={n.id}
                transform={`translate(${p.x},${p.y})`}
                style={{ cursor: 'grab', userSelect: 'none' }}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                onMouseDown={(e) => handleNodeMouseDown(n, p, e)}
                onTouchStart={(e) => { e.preventDefault(); startDrag(n.id, e.touches[0].clientX, e.touches[0].clientY, p.x, p.y, view.scale) }}
              >
                {/* Main node double-ring */}
                {isMain && (
                  <>
                    <circle r={n.r + 16} fill="none" stroke="rgba(200,255,0,0.05)" strokeWidth={1} />
                    <circle r={n.r + 8} fill="none" stroke="rgba(200,255,0,0.1)" strokeWidth={1} />
                  </>
                )}

                {/* Hover halo */}
                {isHov && (
                  <circle r={n.r + 9} fill={isMain ? 'rgba(200,255,0,0.1)' : 'rgba(255,255,255,0.05)'} />
                )}

                {/* Node circle */}
                <circle
                  r={n.r}
                  fill={isMain ? '#C8FF00' : isMid ? 'rgba(255,255,255,0.9)' : 'rgba(200,255,0,0.4)'}
                  stroke={isMain ? 'transparent' : isMid ? 'rgba(255,255,255,0.25)' : 'rgba(200,255,0,0.4)'}
                  strokeWidth={0.8}
                  filter={isMain ? 'url(#glow-lime)' : isHov ? 'url(#glow-sm)' : undefined}
                />

                {/* VEDANT label */}
                {isMain && (
                  <text textAnchor="middle" dominantBaseline="middle" fontSize={6.5}
                    fontFamily="'Space Mono', monospace" fontWeight="bold" fill="#000" letterSpacing={0.5}
                    style={{ pointerEvents: 'none' }}>
                    VEDANT
                  </text>
                )}

                {/* Project node label (multi-word wrapping) */}
                {isMid && n.name.split(' ').map((word, wi, arr) => (
                  <text key={wi}
                    y={(wi - (arr.length - 1) / 2) * 7}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize={4.8} fontFamily="'Space Mono', monospace" fontWeight="bold" fill="#111"
                    style={{ pointerEvents: 'none' }}>
                    {word}
                  </text>
                ))}

                {/* Tech node: inner dot + label below */}
                {n.group === 2 && (
                  <>
                    <circle r={3} fill="rgba(200,255,0,0.9)" style={{ pointerEvents: 'none' }} />
                    <text y={n.r + 9} textAnchor="middle" fontSize={6}
                      fontFamily="'Space Grotesk', sans-serif" fontWeight="500"
                      fill={isHov ? 'rgba(200,255,0,0.9)' : 'rgba(255,255,255,0.4)'}
                      style={{ pointerEvents: 'none', transition: 'fill 0.15s' }}>
                      {n.name}
                    </text>
                  </>
                )}
              </g>
            )
          })}
        </g>
      </svg>
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
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="font-sans text-xl leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Final-year CS diploma student at{' '}
              <span style={{ color: '#C8FF00' }}>V.B. Kolte College of Engineering</span>, Malkapur.
            </p>
            <p className="font-sans text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
              I build things that work — AI pipelines, network tools, automation scripts. My work sits
              at the intersection of artificial intelligence and network infrastructure, building scalable,
              intelligent systems that solve real problems.
            </p>
            <p className="font-sans text-base leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Whether it's wiring an LLM pipeline to handle multi-domain queries or automating power
              management on a laptop — I care about outcomes, not abstractions.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[{ v: '4', l: 'SYSTEMS SHIPPED' }, { v: '2', l: 'INTERNSHIPS' }, { v: '55Mbps', l: 'PEAK THROUGHPUT' }].map(s => (
                <div key={s.l} className="border-t pt-4" style={{ borderColor: 'rgba(200,255,0,0.3)' }}>
                  <div className="font-sans font-black text-2xl mb-1" style={{ color: '#C8FF00' }}>{s.v}</div>
                  <div className="font-mono text-xs text-muted tracking-widest">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="border overflow-hidden h-80"
            style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0a0a0a' }}
          >
            <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <span className="font-mono text-xs text-muted">// PROJECT_DEPENDENCY_MAP</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ boxShadow: '0 0 4px #C8FF00' }} />
                <span className="text-[10px] font-mono text-accent">SCROLL·ZOOM — DRAG·PAN</span>
              </span>
            </div>
            <div className="h-[calc(100%-41px)]">
              <GraphContainer />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="border p-8 relative overflow-hidden"
            style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0e0e0e' }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent/10 border border-accent/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <h3 className="font-sans font-black text-2xl tracking-tight">EDUCATION</h3>
            </div>
            <div className="space-y-10 relative">
              <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-accent/20" />
              <div className="relative pl-8">
                <div className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full bg-accent border-4 border-[#0e0e0e]" />
                <h4 className="font-sans font-bold text-lg mb-1">Diploma in Computer Science</h4>
                <p className="font-sans text-sm text-muted mb-4">Padm. Dr. V. B. Kolte College of Engineering (MSBTE)</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  {[{ s: '1ST SEM', v: '81.29%' },{ s: '2ND SEM', v: '78.00%' },{ s: '3RD SEM', v: '86.00%' },{ s: '4TH SEM', v: '84.24%' },{ s: '5TH SEM', v: '92.82%' }].map(s => (
                    <div key={s.s} className="bg-white/5 border border-white/10 p-3 rounded-sm text-center">
                      <div className="font-mono text-[10px] text-accent mb-1">{s.s}</div>
                      <div className="font-sans font-black text-sm">{s.v}</div>
                    </div>
                  ))}
                </div>
                <div className="font-mono text-xs text-muted">Expected: 2026</div>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full bg-muted border-4 border-[#0e0e0e]" />
                <h4 className="font-sans font-bold text-lg mb-1">SSC (80%)</h4>
                <p className="font-sans text-sm text-muted">M.S.M English School, Malkapur, Completed 2023</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="border p-8 relative overflow-hidden"
            style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0e0e0e' }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent/10 border border-accent/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8FF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15l-3 3-3-3 3-3 3 3z"/><path d="M15 12l3 3 3-3-3-3-3 3z"/><path d="M12 9l-3-3-3 3 3 3 3-3z"/></svg>
              </div>
              <h3 className="font-sans font-black text-2xl tracking-tight">STRENGTHS</h3>
            </div>
            <div className="space-y-4">
              {['Communication & Presentation', 'Leadership (Anchor & Speaker)', 'CCNA Networking Knowledge', 'AI/ML Expertise (Streamlit)'].map(item => (
                <div key={item} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-sm hover:border-accent/40 transition-colors group">
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 group-hover:shadow-[0_0_6px_#C8FF00] transition-all" />
                  <span className="font-sans font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
