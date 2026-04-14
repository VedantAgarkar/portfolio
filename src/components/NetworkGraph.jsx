import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

// ─── Device Icon SVGs ───────────────────────────────────────────────
function IconInternet({ size = 32, color = '#C8FF00' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="16" rx="14" ry="9" stroke={color} strokeWidth="1.5" fill="none"/>
      <ellipse cx="16" cy="16" rx="6" ry="9" stroke={color} strokeWidth="1.2" fill="none"/>
      <line x1="2" y1="16" x2="30" y2="16" stroke={color} strokeWidth="1.2"/>
      <line x1="4" y1="10" x2="28" y2="10" stroke={color} strokeWidth="1"/>
      <line x1="4" y1="22" x2="28" y2="22" stroke={color} strokeWidth="1"/>
    </svg>
  )
}

function IconFirewall({ size = 32, color = '#C8FF00' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 3 L28 8 L28 18 C28 24 22 29 16 31 C10 29 4 24 4 18 L4 8 Z" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="10" y1="13" x2="22" y2="13" stroke={color} strokeWidth="1.2"/>
      <line x1="10" y1="17" x2="22" y2="17" stroke={color} strokeWidth="1.2"/>
      <line x1="10" y1="21" x2="22" y2="21" stroke={color} strokeWidth="1.2"/>
    </svg>
  )
}

function IconRouter({ size = 32, color = '#C8FF00' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="7" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="16" cy="16" r="2" fill={color}/>
      <line x1="16" y1="9" x2="16" y2="4" stroke={color} strokeWidth="1.2"/>
      <line x1="16" y1="23" x2="16" y2="28" stroke={color} strokeWidth="1.2"/>
      <line x1="9" y1="16" x2="4" y2="16" stroke={color} strokeWidth="1.2"/>
      <line x1="23" y1="16" x2="28" y2="16" stroke={color} strokeWidth="1.2"/>
      <line x1="11.5" y1="11.5" x2="7.5" y2="7.5" stroke={color} strokeWidth="1.2"/>
      <line x1="20.5" y1="20.5" x2="24.5" y2="24.5" stroke={color} strokeWidth="1.2"/>
      <line x1="20.5" y1="11.5" x2="24.5" y2="7.5" stroke={color} strokeWidth="1.2"/>
      <line x1="11.5" y1="20.5" x2="7.5" y2="24.5" stroke={color} strokeWidth="1.2"/>
    </svg>
  )
}

function IconSwitch({ size = 32, color = '#C8FF00' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="3" y="11" width="26" height="10" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
      {[7, 11, 15, 19, 23].map(x => (
        <rect key={x} x={x} y="14" width="2" height="4" fill={color} opacity="0.7"/>
      ))}
      <line x1="8" y1="11" x2="6" y2="6" stroke={color} strokeWidth="1"/>
      <line x1="24" y1="11" x2="26" y2="6" stroke={color} strokeWidth="1"/>
      <line x1="8" y1="21" x2="6" y2="26" stroke={color} strokeWidth="1"/>
      <line x1="24" y1="21" x2="26" y2="26" stroke={color} strokeWidth="1"/>
    </svg>
  )
}

function IconServer({ size = 32, color = '#C8FF00' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="6" y="4" width="20" height="7" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
      <rect x="6" y="13" width="20" height="7" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
      <rect x="6" y="22" width="20" height="7" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="22" cy="7.5" r="1.5" fill={color}/>
      <circle cx="22" cy="16.5" r="1.5" fill={color}/>
      <circle cx="22" cy="25.5" r="1.5" fill={color}/>
      <line x1="9" y1="7.5" x2="18" y2="7.5" stroke={color} strokeWidth="1" opacity="0.6"/>
      <line x1="9" y1="16.5" x2="18" y2="16.5" stroke={color} strokeWidth="1" opacity="0.6"/>
      <line x1="9" y1="25.5" x2="18" y2="25.5" stroke={color} strokeWidth="1" opacity="0.6"/>
    </svg>
  )
}

function IconPC({ size = 32, color = '#C8FF00' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="4" y="4" width="24" height="18" rx="1.5" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="4" y1="18" x2="28" y2="18" stroke={color} strokeWidth="1"/>
      <line x1="12" y1="22" x2="10" y2="28" stroke={color} strokeWidth="1.2"/>
      <line x1="20" y1="22" x2="22" y2="28" stroke={color} strokeWidth="1.2"/>
      <line x1="9" y1="28" x2="23" y2="28" stroke={color} strokeWidth="1.2"/>
      <circle cx="16" cy="20.5" r="1" fill={color}/>
    </svg>
  )
}

// ─── Device config ───────────────────────────────────────────────────
const DEVICE_TYPES = {
  internet: { label: 'INTERNET', Icon: IconInternet, group: 0, hitR: 20, color: '#C8FF00' },
  firewall: { label: 'FIREWALL', Icon: IconFirewall, group: 1, hitR: 18, color: '#C8FF00' },
  router:   { label: 'ROUTER',   Icon: IconRouter,   group: 1, hitR: 18, color: '#C8FF00' },
  switch:   { label: 'SWITCH',   Icon: IconSwitch,   group: 2, hitR: 16, color: 'rgba(200,255,0,0.75)' },
  server:   { label: 'SERVER',   Icon: IconServer,   group: 3, hitR: 16, color: 'rgba(200,255,0,0.6)' },
  pc:       { label: 'PC',       Icon: IconPC,       group: 4, hitR: 14, color: 'rgba(200,255,0,0.45)' },
}

// ─── Initial default topology ────────────────────────────────────────
let nodeIdCounter = 100
const makeNode = (type, x, y, id) => ({ id: id ?? nodeIdCounter++, type, x, y, vx: 0, vy: 0, name: `${DEVICE_TYPES[type].label}_${(nodeIdCounter % 99).toString().padStart(2,'0')}` })

const DEFAULT_NODES = [
  { id: 0, type: 'internet',  x: 400, y: 80,  vx: 0, vy: 0, name: 'INTERNET' },
  { id: 1, type: 'firewall',  x: 400, y: 180, vx: 0, vy: 0, name: 'FIREWALL' },
  { id: 2, type: 'router',    x: 400, y: 290, vx: 0, vy: 0, name: 'ROUTER_01' },
  { id: 3, type: 'switch',    x: 230, y: 380, vx: 0, vy: 0, name: 'SWITCH_A' },
  { id: 4, type: 'switch',    x: 570, y: 380, vx: 0, vy: 0, name: 'SWITCH_B' },
  { id: 5, type: 'server',    x: 130, y: 460, vx: 0, vy: 0, name: 'SERVER_01' },
  { id: 6, type: 'server',    x: 670, y: 460, vx: 0, vy: 0, name: 'SERVER_02' },
  { id: 7, type: 'server',    x: 230, y: 460, vx: 0, vy: 0, name: 'AI_PIPELINE' },
  { id: 8, type: 'pc',        x: 130, y: 540, vx: 0, vy: 0, name: 'CLIENT_A' },
  { id: 9, type: 'pc',        x: 330, y: 540, vx: 0, vy: 0, name: 'CLIENT_B' },
  { id: 10, type: 'pc',       x: 470, y: 540, vx: 0, vy: 0, name: 'CLIENT_C' },
  { id: 11, type: 'pc',       x: 670, y: 540, vx: 0, vy: 0, name: 'CLIENT_D' },
]
const DEFAULT_LINKS = [
  [0,1],[1,2],[2,3],[2,4],
  [3,5],[3,7],[4,6],[3,8],[3,9],[4,10],[4,11],
]

// ─── Physics hook ────────────────────────────────────────────────────
function usePhysics(nodes, width, height) {
  const posRef = useRef({})
  const [positions, setPositions] = useState({})
  const pinned = useRef({})
  const activeRef = useRef(true)
  const rafRef = useRef()
  const linksRef = useRef([])

  // Init positions for new nodes
  useEffect(() => {
    nodes.forEach(n => {
      if (!posRef.current[n.id]) {
        posRef.current[n.id] = { x: n.x ?? width / 2, y: n.y ?? height / 2, vx: 0, vy: 0 }
      }
    })
    // Clean removed nodes
    const ids = new Set(nodes.map(n => n.id))
    Object.keys(posRef.current).forEach(id => {
      if (!ids.has(Number(id))) delete posRef.current[id]
    })
  }, [nodes, width, height])

  const tick = useCallback(() => {
    const cx = width / 2, cy = height / 2
    const ids = Object.keys(posRef.current).map(Number)
    const pos = {}
    ids.forEach(id => { pos[id] = { ...posRef.current[id] } })

    // Repulsion
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const a = pos[ids[i]], b = pos[ids[j]]
        const dx = b.x - a.x, dy = b.y - a.y
        const d = Math.sqrt(dx*dx + dy*dy) || 1
        const f = 5000 / (d * d)
        const fx = (dx/d)*f, fy = (dy/d)*f
        a.vx -= fx; a.vy -= fy; b.vx += fx; b.vy += fy
      }
    }

    // Link attraction
    linksRef.current.forEach(([a, b]) => {
      const pa = pos[a], pb = pos[b]
      if (!pa || !pb) return
      const dx = pb.x - pa.x, dy = pb.y - pa.y
      const d = Math.sqrt(dx*dx + dy*dy) || 1
      const f = (d - 110) * 0.04
      const fx = (dx/d)*f, fy = (dy/d)*f
      pa.vx += fx; pa.vy += fy; pb.vx -= fx; pb.vy -= fy
    })

    // Center gravity
    ids.forEach(id => { pos[id].vx += (cx - pos[id].x) * 0.004; pos[id].vy += (cy - pos[id].y) * 0.004 })

    // Integrate
    ids.forEach(id => {
      if (pinned.current[id] !== undefined) {
        pos[id].x = pinned.current[id].x; pos[id].y = pinned.current[id].y
        pos[id].vx = 0; pos[id].vy = 0
      } else {
        pos[id].vx *= 0.75; pos[id].vy *= 0.75
        pos[id].x = Math.max(28, Math.min(width - 28, pos[id].x + pos[id].vx))
        pos[id].y = Math.max(28, Math.min(height - 28, pos[id].y + pos[id].vy))
      }
    })

    posRef.current = pos
    if (activeRef.current) setPositions({ ...pos })
    rafRef.current = requestAnimationFrame(tick)
  }, [width, height])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  // Visibility pause
  useEffect(() => {
    const el = document.getElementById('network-graph')
    if (!el || !('IntersectionObserver' in window)) return
    const obs = new IntersectionObserver(([e]) => { activeRef.current = e.isIntersecting }, { threshold: 0.05 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const startDrag = useCallback((id, sx, sy, nx, ny, scale = 1) => {
    const onMove = (e) => {
      const cx = e.touches?.[0].clientX ?? e.clientX
      const cy = e.touches?.[0].clientY ?? e.clientY
      pinned.current[id] = { x: nx + (cx - sx) / scale, y: ny + (cy - sy) / scale }
    }
    const onUp = () => {
      delete pinned.current[id]
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [])

  return { positions, startDrag, linksRef, activeRef }
}

// ─── Curved path helper ────────────────────────────────────────────
function curvePath(x1, y1, x2, y2) {
  const mx = (x1+x2)/2, my = (y1+y2)/2
  const dx = x2-x1, dy = y2-y1
  return `M ${x1} ${y1} Q ${mx - dy*0.15} ${my + dx*0.15} ${x2} ${y2}`
}

// ─── Main Topology Component ──────────────────────────────────────
function NetworkTopology({ width, height }) {
  const [nodes, setNodes] = useState(() => DEFAULT_NODES)
  const [links, setLinks] = useState(() => DEFAULT_LINKS)
  const [selected, setSelected] = useState(null)
  const [connectMode, setConnectMode] = useState(false)
  const [deleteLinkMode, setDeleteLinkMode] = useState(false)
  const [connectFrom, setConnectFrom] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [view, setView] = useState({ x: 0, y: 0, scale: 1 })
  const isPanning = useRef(false)
  const panOrigin = useRef({})

  const { positions, startDrag, linksRef } = usePhysics(nodes, width, height)
  linksRef.current = links

  // Wheel zoom
  useEffect(() => {
    const el = document.getElementById('network-svg')
    if (!el) return
    const fn = (e) => { e.preventDefault(); setView(v => ({ ...v, scale: Math.min(4, Math.max(0.2, v.scale * (e.deltaY < 0 ? 1.12 : 0.9))) })) }
    el.addEventListener('wheel', fn, { passive: false })
    return () => el.removeEventListener('wheel', fn)
  }, [width])

  const onSvgDown = (e) => {
    if (e.target !== e.currentTarget && e.target.getAttribute('data-bg') !== 'true') return
    setSelected(null)
    if (!connectMode) {
      isPanning.current = true
      panOrigin.current = { mx: e.clientX, my: e.clientY, vx: view.x, vy: view.y }
    }
    e.preventDefault()
  }

  useEffect(() => {
    const onMove = (e) => {
      if (!isPanning.current) return
      setView(v => ({ ...v, x: panOrigin.current.vx + (e.clientX - panOrigin.current.mx), y: panOrigin.current.vy + (e.clientY - panOrigin.current.my) }))
    }
    const onUp = () => { isPanning.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [])

  // Add node from toolbar
  const addNode = (type) => {
    const id = nodeIdCounter++
    const cx = (width / 2 - view.x) / view.scale
    const cy = (height / 2 - view.y) / view.scale
    const jitter = () => (Math.random() - 0.5) * 80
    setNodes(prev => [...prev, { id, type, x: cx + jitter(), y: cy + jitter(), vx: 0, vy: 0, name: `${DEVICE_TYPES[type].label}_${String(id).slice(-2)}` }])
  }

  // Delete selected node and its links
  const deleteSelected = () => {
    if (selected === null) return
    setLinks(prev => prev.filter(([a, b]) => a !== selected && b !== selected))
    setNodes(prev => prev.filter(n => n.id !== selected))
    setSelected(null)
  }



  // Delete link on click
  const deleteLink = (a, b) => {
    setLinks(prev => prev.filter(([la, lb]) => !(la === a && lb === b) && !(la === b && lb === a)))
  }

  return (
    <div className="flex flex-col h-full">
      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <svg
          id="network-svg"
          width={width}
          height="100%"
          style={{ display: 'block', width: '100%', height: '100%', cursor: connectMode ? 'crosshair' : deleteLinkMode ? 'not-allowed' : 'move' }}
          onMouseDown={onSvgDown}
        >
          <defs>
            <filter id="dev-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <pattern id="topo-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(200,255,0,0.04)" strokeWidth="0.5"/>
            </pattern>
          </defs>

          <rect data-bg="true" width="100%" height="100%" fill="url(#topo-grid)"/>

          <g transform={`translate(${view.x},${view.y}) scale(${view.scale})`}>
            {/* Links */}
            {links.map(([a, b], i) => {
              const pa = positions[a], pb = positions[b]
              if (!pa || !pb) return null
              const lit = hovered === a || hovered === b || selected === a || selected === b
              return (
                <g key={i}>
                  {/* Invisible thick hit area — only interactive in deleteLinkMode */}
                  <path d={curvePath(pa.x, pa.y, pb.x, pb.y)} fill="none" stroke="transparent" strokeWidth={12}
                    style={{ cursor: deleteLinkMode ? 'pointer' : 'default', pointerEvents: deleteLinkMode ? 'auto' : 'none' }}
                    onClick={() => deleteLinkMode && deleteLink(a, b)}
                    onMouseEnter={() => deleteLinkMode && setHovered(`link-${i}`)}
                    onMouseLeave={() => setHovered(null)}
                  />
                  <path
                    d={curvePath(pa.x, pa.y, pb.x, pb.y)} fill="none"
                    stroke={
                      deleteLinkMode && hovered === `link-${i}` ? 'rgba(255,80,80,0.8)'
                      : lit ? 'rgba(200,255,0,0.6)'
                      : deleteLinkMode ? 'rgba(255,80,80,0.35)'
                      : 'rgba(200,255,0,0.2)'
                    }
                    strokeWidth={deleteLinkMode && hovered === `link-${i}` ? 2.5 : lit ? 1.5 : 1}
                    strokeDasharray={deleteLinkMode ? '4 2' : lit ? 'none' : '5 3'}
                    style={{ transition: 'stroke 0.1s' }}
                  />
                </g>
              )
            })}

            {/* Nodes */}
            {nodes.map(n => {
              const p = positions[n.id]
              if (!p) return null
              const cfg = DEVICE_TYPES[n.type]
              const { Icon } = cfg
              const isSel = selected === n.id
              const isConnFrom = connectFrom === n.id
              const icoSize = cfg.hitR * 2

              return (
                <g
                  key={n.id}
                  transform={`translate(${p.x},${p.y})`}
                  style={{ cursor: connectMode ? 'crosshair' : 'grab', userSelect: 'none' }}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()

                    if (connectMode) {
                      // Connect mode: first click = source, second click = target
                      if (connectFrom === null) {
                        setConnectFrom(n.id)
                      } else if (connectFrom !== n.id) {
                        const exists = links.some(([a, b]) =>
                          (a === connectFrom && b === n.id) || (a === n.id && b === connectFrom)
                        )
                        if (!exists) setLinks(prev => [...prev, [connectFrom, n.id]])
                        setConnectFrom(null)
                        setConnectMode(false)
                      }
                      return
                    }

                    // Normal mode: toggle selection + start drag
                    setSelected(prev => prev === n.id ? null : n.id)
                    startDrag(n.id, e.clientX, e.clientY, p.x, p.y, view.scale)
                  }}
                >
                  {/* Large invisible hit circle — guarantees clicks always register */}
                  <circle r={cfg.hitR + 10} fill="transparent" stroke="none" />

                  {/* Selection / connect ring */}
                  {(isSel || isConnFrom) && (
                    <circle r={cfg.hitR + 8} fill="none"
                      stroke={isConnFrom ? '#00ffaa' : '#C8FF00'}
                      strokeWidth={1.5} strokeDasharray="4 2" opacity={0.8}/>
                  )}
                  {/* Hover glow bg */}
                  {hovered === n.id && (
                    <circle r={cfg.hitR + 6} fill="rgba(200,255,0,0.07)"/>
                  )}

                  {/* SVG Icon (centered) */}
                  <g transform={`translate(${-icoSize/2},${-icoSize/2})`} style={{ pointerEvents: 'none' }}
                    filter={isSel || hovered === n.id ? 'url(#dev-glow)' : undefined}>
                    <Icon size={icoSize} color={cfg.color}/>
                  </g>

                  {/* Label below */}
                  <text
                    y={cfg.hitR + 12}
                    textAnchor="middle"
                    fontSize={7}
                    fontFamily="'Space Mono', monospace"
                    fill={isSel ? '#C8FF00' : hovered === n.id ? 'rgba(200,255,0,0.85)' : 'rgba(200,255,0,0.45)'}
                    style={{ pointerEvents: 'none', transition: 'fill 0.15s' }}
                  >
                    {n.name}
                  </text>
                </g>
              )
            })}

            {/* Connect-mode "from" hint line following cursor — skipped for simplicity */}
          </g>
        </svg>

        {/* Status overlay */}
        <div className="absolute top-3 left-4 font-mono text-xs text-muted pointer-events-none">
          NODES: {nodes.length} // LINKS: {links.length}
        </div>
        <div className="absolute top-3 right-4 flex items-center gap-2 pointer-events-none">
          {connectMode && (
            <span className="font-mono text-[10px] px-2 py-0.5" style={{ background: 'rgba(0,255,170,0.15)', color: '#00ffaa', border: '1px solid rgba(0,255,170,0.3)' }}>
              {connectFrom !== null ? 'CLICK TARGET NODE' : 'CLICK SOURCE NODE'}
            </span>
          )}
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" style={{ boxShadow: '0 0 4px #C8FF00' }}/>
          <span className="font-mono text-xs text-accent">LIVE</span>
        </div>
      </div>

      {/* ─── Packet Tracer Toolbar ─────────── */}
      <div className="border-t flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#050505' }}>
        {/* Device palette */}
        <div className="flex items-center gap-0 overflow-x-auto">
          {Object.entries(DEVICE_TYPES).map(([type, cfg]) => {
            const { Icon, label } = cfg
            return (
              <button
                key={type}
                onClick={() => addNode(type)}
                title={`Add ${label}`}
                className="flex flex-col items-center justify-center gap-1 px-4 py-2.5 flex-shrink-0 border-r transition-colors hover:bg-white/5 active:bg-accent/10"
                style={{ borderColor: 'rgba(255,255,255,0.06)', minWidth: 70 }}
              >
                <Icon size={24} color="rgba(200,255,0,0.6)"/>
                <span className="font-mono text-[8px] text-muted tracking-wider">{label}</span>
              </button>
            )
          })}

          {/* Divider */}
          <div className="w-px h-10 self-center mx-1" style={{ background: 'rgba(255,255,255,0.08)' }}/>

          {/* Connect tool */}
          <button
            onClick={() => { setConnectMode(c => !c); setConnectFrom(null); setDeleteLinkMode(false) }}
            className="flex flex-col items-center justify-center gap-1 px-4 py-2.5 flex-shrink-0 border-r transition-colors"
            style={{
              borderColor: 'rgba(255,255,255,0.06)', minWidth: 70,
              background: connectMode ? 'rgba(0,255,170,0.1)' : 'transparent',
            }}
            title="Connect two nodes"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="5" cy="12" r="3" stroke={connectMode ? '#00ffaa' : 'rgba(200,255,0,0.6)'} strokeWidth="1.5"/>
              <circle cx="19" cy="12" r="3" stroke={connectMode ? '#00ffaa' : 'rgba(200,255,0,0.6)'} strokeWidth="1.5"/>
              <line x1="8" y1="12" x2="16" y2="12" stroke={connectMode ? '#00ffaa' : 'rgba(200,255,0,0.6)'} strokeWidth="1.5" strokeDasharray="2 1.5"/>
            </svg>
            <span className="font-mono text-[8px] tracking-wider" style={{ color: connectMode ? '#00ffaa' : 'rgba(200,255,0,0.45)' }}>CONNECT</span>
          </button>

          {/* Delete Link tool */}
          <button
            onClick={() => { setDeleteLinkMode(d => !d); setConnectMode(false); setConnectFrom(null) }}
            className="flex flex-col items-center justify-center gap-1 px-4 py-2.5 flex-shrink-0 border-r transition-colors"
            style={{
              borderColor: 'rgba(255,255,255,0.06)', minWidth: 70,
              background: deleteLinkMode ? 'rgba(255,80,80,0.1)' : 'transparent',
            }}
            title="Toggle delete-link mode — click a wire to remove it"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <line x1="4" y1="12" x2="20" y2="12" stroke={deleteLinkMode ? 'rgba(255,80,80,0.9)' : 'rgba(200,255,0,0.6)'} strokeWidth="1.5" strokeDasharray="3 2"/>
              <line x1="9" y1="7" x2="15" y2="17" stroke={deleteLinkMode ? 'rgba(255,80,80,0.9)' : 'rgba(200,255,0,0.6)'} strokeWidth="2" strokeLinecap="round"/>
              <line x1="15" y1="7" x2="9" y2="17" stroke={deleteLinkMode ? 'rgba(255,80,80,0.9)' : 'rgba(200,255,0,0.6)'} strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="font-mono text-[8px] tracking-wider" style={{ color: deleteLinkMode ? 'rgba(255,80,80,0.9)' : 'rgba(200,255,0,0.45)' }}>DEL LINK</span>
          </button>

          {/* Delete selected */}
          <button
            onClick={deleteSelected}
            disabled={selected === null}
            className="flex flex-col items-center justify-center gap-1 px-4 py-2.5 flex-shrink-0 border-r transition-colors hover:bg-red-500/10"
            style={{ borderColor: 'rgba(255,255,255,0.06)', minWidth: 70, opacity: selected !== null ? 1 : 0.35 }}
            title="Delete selected node"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="rgba(255,80,80,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="10" y1="11" x2="10" y2="17" stroke="rgba(255,80,80,0.8)" strokeWidth="1.5"/>
              <line x1="14" y1="11" x2="14" y2="17" stroke="rgba(255,80,80,0.8)" strokeWidth="1.5"/>
            </svg>
            <span className="font-mono text-[8px] tracking-wider" style={{ color: 'rgba(255,80,80,0.7)' }}>DELETE</span>
          </button>

          {/* Reset */}
          <button
            onClick={() => { setNodes(DEFAULT_NODES); setLinks(DEFAULT_LINKS); setSelected(null); setConnectMode(false); setConnectFrom(null); setDeleteLinkMode(false) }}
            className="flex flex-col items-center justify-center gap-1 px-4 py-2.5 flex-shrink-0 transition-colors hover:bg-white/5"
            style={{ minWidth: 70 }}
            title="Reset topology"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.36 2.64L3 8" stroke="rgba(200,255,0,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3 3v5h5" stroke="rgba(200,255,0,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-mono text-[8px] text-muted tracking-wider">RESET</span>
          </button>
        </div>

        {/* Hint bar */}
        <div className="px-4 py-1.5 border-t flex items-center gap-4" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <span className="font-mono text-[9px] text-muted">SCROLL TO ZOOM</span>
          <span className="font-mono text-[9px] text-muted">DRAG BACKGROUND TO PAN</span>
          <span className="font-mono text-[9px] text-muted">CLICK NODE TO SELECT</span>
          <span className="font-mono text-[9px] text-muted">HOVER LINK → CLICK TO DELETE</span>
        </div>
      </div>
    </div>
  )
}

// ─── Responsive wrapper ───────────────────────────────────────────
function GraphContainer() {
  const ref = useRef()
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const update = () => { if (ref.current) setSize({ w: ref.current.offsetWidth, h: ref.current.offsetHeight }) }
    update()
    const ro = new ResizeObserver(update)
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={ref} id="network-graph" className="w-full h-full" style={{ touchAction: 'none' }}>
      {size.w > 0 && <NetworkTopology width={size.w} height={size.h} />}
    </div>
  )
}

// ─── Section export ───────────────────────────────────────────────
export default function NetworkGraph() {
  return (
    <section className="section-border py-20 px-6 grid-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-3 font-mono text-xs text-muted tracking-widest">// SIMULATED_NETWORK_TOPOLOGY</div>
        <h2 className="font-sans font-black text-4xl md:text-5xl mb-3 tracking-tight">
          NETWORK VIEW<span style={{ color: '#C8FF00' }}>_</span>
        </h2>
        <p className="font-sans text-sm text-muted mb-8">
          Interactive topology builder — add devices, connect them, drag to arrange.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border overflow-hidden"
          style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#080808', height: '560px' }}
        >
          <GraphContainer />
        </motion.div>
      </div>
    </section>
  )
}
