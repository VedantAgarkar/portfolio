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

export default function App() {
  return (
    <div className="min-h-screen bg-bg noise">
      <Navbar />
      <main>
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
