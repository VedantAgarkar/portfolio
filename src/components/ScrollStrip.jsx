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
  const doubled = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS]

  return (
    <div
      className="w-full overflow-hidden py-3 border-y"
      style={{
        background: '#C8FF00',
        borderColor: '#C8FF00',
      }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-sans font-black text-sm tracking-widest uppercase whitespace-nowrap px-6"
            style={{ color: '#000' }}
          >
            {item}
            <span className="mx-4 opacity-40">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
