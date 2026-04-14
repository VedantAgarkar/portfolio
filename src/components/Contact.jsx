import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const HANDSHAKE_STEPS = [
  { code: 'SYN', label: 'Initiating connection...', delay: 0 },
  { code: 'SYN-ACK', label: 'Handshake acknowledged...', delay: 800 },
  { code: 'ACK', label: 'Connection established.', delay: 1600 },
  { code: 'CONNECTED', label: 'Routing to endpoint...', delay: 2400 },
]

export default function Contact() {
  const [serviceName, setServiceName] = useState('')
  const [contactEndpoint, setContactEndpoint] = useState('')
  const [handshakeState, setHandshakeState] = useState('idle') // idle | running | done
  const [currentStep, setCurrentStep] = useState(-1)
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('agarkarvedant@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleHandshake = (e) => {
    e.preventDefault()
    if (!serviceName.trim() || !contactEndpoint.trim()) return

    setHandshakeState('running')
    setCurrentStep(0)

    HANDSHAKE_STEPS.forEach((step, i) => {
      setTimeout(() => {
        setCurrentStep(i)
        if (i === HANDSHAKE_STEPS.length - 1) {
          setTimeout(() => {
            setHandshakeState('done')
            // Open mailto
            const subject = encodeURIComponent(`Service Request: ${serviceName}`)
            const body = encodeURIComponent(
              `Hi Vedant,\n\nI'm reaching out regarding: ${serviceName}\n\nContact: ${contactEndpoint}\n\nLet's connect!`
            )
            window.open(`mailto:agarkarvedant@gmail.com?subject=${subject}&body=${body}`)
          }, 600)
        }
      }, step.delay)
    })
  }

  const reset = () => {
    setHandshakeState('idle')
    setCurrentStep(-1)
    setServiceName('')
    setContactEndpoint('')
    setCopied(false)
  }

  return (
    <section id="contact" className="section-border py-24 px-6 grid-bg scanline-container">
      <div className="max-w-7xl mx-auto">
        {/* Big heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-sans font-black tracking-tight mb-4"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', lineHeight: 0.9 }}
        >
          LET'S SCALE
          <br />
          <span style={{ color: '#C8FF00' }}>TOGETHER_</span>
        </motion.h2>

        <p className="font-sans text-sm text-muted mb-16 max-w-lg">
          Building something? Need a system that actually works? Send a request — I'll respond within 24 hours.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div>
            <AnimatePresence mode="wait">
              {handshakeState === 'idle' && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleHandshake}
                  className="space-y-8"
                >
                  <div>
                    <label className="font-mono text-xs text-muted tracking-widest block mb-3">
                      service_name
                    </label>
                    <input
                      className="sys-input"
                      placeholder="e.g. website_development / ai_integration"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-muted tracking-widest block mb-3">
                      contact_endpoint
                    </label>
                    <input
                      className="sys-input"
                      placeholder="email@domain.com or +91 XXXXXXXXXX"
                      value={contactEndpoint}
                      onChange={(e) => setContactEndpoint(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center text-sm">
                    ESTABLISH HANDSHAKE →
                  </button>
                </motion.form>
              )}

              {handshakeState === 'running' && (
                <motion.div
                  key="handshake"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border p-6 font-mono"
                  style={{ borderColor: 'rgba(200,255,0,0.3)', background: '#0a0a0a' }}
                >
                  <div className="text-xs text-muted mb-4 tracking-widest">// TCP_HANDSHAKE_SIMULATION</div>
                  <div className="space-y-3">
                    {HANDSHAKE_STEPS.map((step, i) => (
                      <motion.div
                        key={step.code}
                        initial={{ opacity: 0, x: -10 }}
                        animate={currentStep >= i ? { opacity: 1, x: 0 } : { opacity: 0.2, x: -10 }}
                        className="flex items-center gap-4"
                      >
                        <span
                          className="text-sm font-bold w-20"
                          style={{ color: currentStep >= i ? '#C8FF00' : 'rgba(255,255,255,0.2)' }}
                        >
                          [{step.code}]
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: currentStep >= i ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)' }}
                        >
                          {step.label}
                        </span>
                        {currentStep === i && (
                          <span className="terminal-cursor text-xs" style={{ color: '#C8FF00' }} />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {handshakeState === 'done' && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border p-8 text-center"
                  style={{ borderColor: '#C8FF00', background: 'rgba(200,255,0,0.04)' }}
                >
                  <div
                    className="font-mono font-bold text-xl mb-2"
                    style={{ color: '#C8FF00' }}
                  >
                    CONNECTION ESTABLISHED
                  </div>
                  <p className="font-sans text-sm text-muted mb-8">
                    If your email client didn't open automatically, use the manual options below:
                  </p>
                  
                  <div className="flex flex-col gap-3 justify-center max-w-xs mx-auto mb-8">
                    <a 
                      href={`mailto:agarkarvedant@gmail.com?subject=${encodeURIComponent(`Service Request: ${serviceName}`)}&body=${encodeURIComponent(
                        `Hi Vedant,\n\nI'm reaching out regarding: ${serviceName}\n\nContact: ${contactEndpoint}\n\nLet's connect!`
                      )}`} 
                      className="btn-outline text-xs justify-center"
                    >
                      OPEN MAIL APP
                    </a>
                    <button 
                      onClick={copyEmail}
                      className="btn-outline text-xs justify-center"
                    >
                      {copied ? 'EMAIL COPIED !' : 'COPY EMAIL ADDRESS'}
                    </button>
                    <a 
                      href={`https://wa.me/919561924895?text=${encodeURIComponent(`Hi Vedant,\n\nI'm reaching out regarding: ${serviceName}.\n\nYou can reach me at: ${contactEndpoint}`)}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-outline text-xs justify-center"
                      style={{ borderColor: 'rgba(37, 211, 102, 0.5)', color: '#25D366' }}
                    >
                      SEND VIA WHATSAPP
                    </a>
                  </div>

                  <button onClick={reset} className="font-mono text-xs text-muted hover:text-white transition-colors underline underline-offset-4 decoration-white/20">
                    ← START NEW REQUEST
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="font-mono text-xs text-muted tracking-widest mb-4">// DIRECT_ENDPOINTS</div>

            {[
              { label: 'EMAIL', value: 'agarkarvedant@gmail.com', href: 'mailto:agarkarvedant@gmail.com' },
              { label: 'PHONE', value: '+91 9561924895', href: 'tel:+919561924895' },
              { label: 'GITHUB', value: 'VedantAgarkar', href: 'https://github.com/VedantAgarkar' },
              { label: 'LINKEDIN', value: 'vedant-agarkar-786b81310', href: 'https://www.linkedin.com/in/vedant-agarkar-786b81310/' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center justify-between border p-4 group hover:border-accent transition-all duration-200"
                style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#0d0d0d' }}
              >
                <span className="font-mono text-xs text-muted tracking-widest">{item.label}</span>
                <span
                  className="font-mono text-xs group-hover:text-accent transition-colors"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  {item.value} →
                </span>
              </a>
            ))}

            <div
              className="p-4 border flex items-center gap-3"
              style={{ borderColor: 'rgba(200,255,0,0.2)', background: 'rgba(200,255,0,0.03)' }}
            >
              <span className="status-dot-active flex-shrink-0" />
              <span className="font-mono text-xs" style={{ color: '#C8FF00' }}>
                AVAILABLE FOR FREELANCE // OPEN TO OPPORTUNITIES
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
