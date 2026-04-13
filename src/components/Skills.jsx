import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillCategories } from '../data/skills'

function SkillBar({ name, level, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="font-sans text-sm font-medium text-white">{name}</span>
        <span className="font-mono text-xs" style={{ color: '#C8FF00' }}>{level}%</span>
      </div>
      <div className="metric-bar-track">
        <motion.div
          className="metric-bar-fill"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: level / 100 } : { scaleX: 0 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-border py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-3 font-mono text-xs text-muted tracking-widest">// SYS_SKILLS</div>
        <h2 className="font-sans font-black text-4xl md:text-5xl mb-12 tracking-tight">
          SKILLS<span style={{ color: '#C8FF00' }}>_</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className="border p-6"
              style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0d0d0d' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="font-mono text-sm border px-2 py-1"
                  style={{ borderColor: 'rgba(200,255,0,0.3)', color: '#C8FF00' }}
                >
                  {cat.icon}
                </span>
                <h3 className="font-sans font-bold text-sm tracking-widest text-white">{cat.label}</h3>
              </div>
              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={ci * 0.1 + si * 0.1}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
