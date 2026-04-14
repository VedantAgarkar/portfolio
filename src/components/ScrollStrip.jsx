const ITEMS = [
  'SCALABLE',
  'RESILIENT',
  'DISTRIBUTED',
  'CONCURRENT',
  'OPTIMIZED',
  'FAULT-TOLERANT',
  'AUTOMATED',
  'EFFICIENT',
]

export default function ScrollStrip() {
  // Triple the items to ensure the track is always longer than the screen
  const doubled = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div className="relative z-20 py-16 -my-10 overflow-hidden">
      <div
        className="w-[110%] -left-[5%] flex items-center py-6 border-y-2 bg-[#C8FF00] border-[#000] transform -rotate-[3deg] scale-105"
      >
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="font-mono font-black text-[16px] tracking-[0.3em] uppercase whitespace-nowrap px-10 flex items-center"
              style={{ color: '#000' }}
            >
              {item}
              <span className="ml-10 opacity-40">■</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
