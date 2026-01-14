import Hero from '@/components/Hero'
import LiveDataBanner from '@/components/LiveDataBanner'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import ThermalVisualization from '@/components/ThermalVisualization'
import SavingsCalculator from '@/components/SavingsCalculator'
import APIDemo from '@/components/APIDemo'
import CaseStudy from '@/components/CaseStudy'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Hero />
      <LiveDataBanner />
      <Problem />
      <Solution />
      <ThermalVisualization />
      <SavingsCalculator />
      <APIDemo />
      <CaseStudy />
      <Contact />
    </main>
  )
}
