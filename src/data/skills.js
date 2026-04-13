export const skillCategories = [
  {
    id: 'languages',
    label: 'PROGRAMMING LANGUAGES',
    icon: '</>',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'C', level: 70 },
      { name: 'C++', level: 65 },
    ],
  },
  {
    id: 'frameworks',
    label: 'FRAMEWORKS & TOOLS',
    icon: '⚙',
    skills: [
      { name: 'Streamlit', level: 85 },
      { name: 'AI/ML Libraries', level: 80 },
      { name: 'Git & GitHub', level: 75 },
    ],
  },
  {
    id: 'networking',
    label: 'NETWORKING',
    icon: '⬡',
    skills: [
      { name: 'CCNA Knowledge', level: 75 },
      { name: 'Network Architecture', level: 70 },
      { name: 'Protocol Understanding', level: 72 },
    ],
  },
  {
    id: 'soft',
    label: 'SOFT SKILLS',
    icon: '◈',
    skills: [
      { name: 'Communication', level: 90 },
      { name: 'Leadership', level: 88 },
      { name: 'Presentation', level: 92 },
    ],
  },
]

export const builtSystems = [
  {
    id: 'event-pipelines',
    name: 'EVENT PIPELINES',
    status: 'ACTIVE',
    description: 'OpenRouter → Streamlit LLM pipeline with multi-domain routing and query classification.',
    metrics: '< 120ms latency',
  },
  {
    id: 'auth-protocols',
    name: 'AUTH PROTOCOLS',
    status: 'STABLE',
    description: 'HTTP-based peer authentication for LAN file transfer. Stateless, no external dependencies.',
    metrics: '0 external deps',
  },
  {
    id: 'graph-architectures',
    name: 'GRAPH ARCHITECTURES',
    status: 'ACTIVE',
    description: 'Force-directed network visualization mapping system topology and project dependency graphs.',
    metrics: '60fps render',
  },
  {
    id: 'edge-optimization',
    name: 'EDGE OPTIMIZATION',
    status: 'STABLE',
    description: 'GPU MUX switching logic — state-based power controller triggered by AC adapter signal.',
    metrics: '4× battery gain',
  },
]

export const services = [
  {
    id: 'web-dev',
    title: 'WEBSITE DEVELOPMENT',
    code: 'SRV_01',
    description: 'Custom-built web applications — no templates, no drag-and-drop. From landing pages to full-stack systems.',
    tags: ['React', 'HTML/CSS', 'Tailwind', 'Vite'],
  },
  {
    id: 'software-projects',
    title: 'SOFTWARE PROJECTS',
    code: 'SRV_02',
    description: 'End-to-end software delivery — from spec to shipping. AI integrations, automation tools, data pipelines.',
    tags: ['Python', 'Streamlit', 'API Integration', 'LLM'],
  },
  {
    id: 'automation',
    title: 'AUTOMATION & SCRIPTING',
    code: 'SRV_03',
    description: 'Real-life automation that actually solves problems — workflow automation, system scripts, scheduled tasks.',
    tags: ['Python', 'Shell', 'System API', 'Task Automation'],
  },
]
