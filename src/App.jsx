import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ScrollStrip from './components/ScrollStrip'
import About from './components/About'
import Experience from './components/Experience'
import CaseStudies from './components/CaseStudies'
import SystemMetrics from './components/SystemMetrics'
import BuiltSystems from './components/BuiltSystems'
import NetworkGraph from './components/NetworkGraph'
import Skills from './components/Skills'
import Mindset from './components/Mindset'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import RubiksCube from './components/RubiksCube'

export default function App() {
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  return (
    <div className="min-h-screen bg-bg noise relative">
      <Navbar />
      {isDesktop && <RubiksCube />}
      <main className="relative z-10">
        <Hero />
        <ScrollStrip />
        <About />
        <Experience />
        <CaseStudies />
        <SystemMetrics />
        <BuiltSystems />
        <NetworkGraph />
        <Skills />
        <Mindset />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

