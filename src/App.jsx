import { useEffect } from 'react'
import { ScrollTrigger } from './lib/gsap'
import Navbar from './components/Navbar'
import ScrollCarScene from './components/ScrollCarScene'
import TechnologyList from './components/TechnologyList'
import EngineeringSection from './components/EngineeringSection'
import DesignSection from './components/DesignSection'
import ClosingSection from './components/ClosingSection'
import Footer from './components/Footer'

export default function App() {
  // Pin positions depend on text metrics, so measure again once the web font is in.
  // (ScrollTrigger already refreshes on window "load" and on resize.)
  useEffect(() => {
    let cancelled = false
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh()
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-lime focus:px-4 focus:py-2 focus:text-obsidian"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <ScrollCarScene />
        <TechnologyList />
        <EngineeringSection />
        <DesignSection />
        <ClosingSection />
      </main>
      <Footer />
    </>
  )
}
