export const projects = [
  {
    id: 'decision-engine',
    index: '01',
    title: 'Intelligent Decision Engine',
    category: 'AI / LLM PIPELINE',
    description:
      'Multi-domain AI advisory system powered by DeepSeek R1 via OpenRouter. Routes queries across agriculture, startup consulting, business strategy, and general problem-solving. Deployed and self-hosted after client cancellation.',
    metrics: [
      { label: 'Avg Latency', value: '~120ms', raw: 120 },
      { label: 'Domains Covered', value: '4', raw: 4 },
      { label: 'Uptime', value: '99.9%', raw: 99.9 },
    ],
    stack: ['Python', 'Streamlit', 'OpenRouter', 'DeepSeek R1'],
    github: 'https://github.com/VedantAgarkar',
    diagramType: 'llm-pipeline',
  },
  {
    id: 'legal-doc',
    index: '02',
    title: 'Legal Document Intelligence System',
    category: 'DOCUMENT PROCESSING',
    description:
      'Automated legal workflow system that ingests document references from CSV, generates structured summaries via LLM, and exports downloadable PDF reports. Built during internship at Sumago Infotech Pvt. Ltd.',
    metrics: [
      { label: 'Documents Processed', value: '70+', raw: 70 },
      { label: 'Output Format', value: 'PDF', raw: 100 },
      { label: 'Formats Parsed', value: 'CSV → PDF', raw: 85 },
    ],
    stack: ['Python', 'OpenRouter', 'PDF Generation', 'Streamlit'],
    github: 'https://github.com/VedantAgarkar',
    diagramType: 'doc-pipeline',
  },
  {
    id: 'gpu-mux',
    index: '03',
    title: 'GPU State Controller',
    category: 'SYSTEM AUTOMATION',
    description:
      'Automated digital MUX for a gaming laptop GPU — monitors AC adapter state and toggles discrete GPU on/off accordingly. Solved a critical battery drain issue: unplugged runtime extended from 1.5 hours to 6+ hours.',
    metrics: [
      { label: 'Battery Life Gain', value: '4× increase', raw: 400 },
      { label: 'Detection Latency', value: '<200ms', raw: 200 },
      { label: 'Power Saved', value: '~18W avg', raw: 90 },
    ],
    stack: ['Python', 'Windows API', 'PowerShell', 'Task Scheduler'],
    github: 'https://github.com/VedantAgarkar',
    diagramType: 'state-machine',
  },
  {
    id: 'lan-transfer',
    index: '04',
    title: 'Local Network Transfer Protocol',
    category: 'NETWORK / SOCKET',
    description:
      'Peer-to-peer file transfer system over LAN using Python HTTP. No external servers, no cloud — pure socket-based communication. Achieved 55 Mbps peak throughput limited only by WiFi 4 hardware ceiling.',
    metrics: [
      { label: 'Peak Throughput', value: '55 Mbps', raw: 55 },
      { label: 'Protocol', value: 'HTTP/LAN', raw: 100 },
      { label: 'External Servers', value: 'ZERO', raw: 0 },
    ],
    stack: ['Python', 'HTTP', 'Socket Programming', 'LAN'],
    github: 'https://github.com/VedantAgarkar',
    diagramType: 'peer-to-peer',
  },
]
