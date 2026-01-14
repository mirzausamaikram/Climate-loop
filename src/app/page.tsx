import Hero from '@/components/Hero'
import LiveDataBanner from '@/components/LiveDataBanner'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import ThermalVisualization from '@/components/ThermalVisualization'
import SavingsCalculator from '@/components/SavingsCalculator'
import APIDemo from '@/components/APIDemo'
import TechnicalBlog from '@/components/TechnicalBlog'
import CaseStudy from '@/components/CaseStudy'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <ThemeToggle />
      <Hero />
      <LiveDataBanner />
      <Problem />
      <Solution />
      <ThermalVisualization />
      <SavingsCalculator />
      <APIDemo />
      <TechnicalBlog />
      <CaseStudy />
      <Testimonials />
      <Contact />
    </main>
  )
}
