'use client'

import { motion } from 'framer-motion'
import { Clock, DollarSign, Users, BarChart3 } from 'lucide-react'

const solutions = [
  {
    icon: Clock,
    title: 'Coordinated Cooling Engine',
    description: 'Opt-in scheduling: Building agrees on staggered AC activation to reduce peak load by 25-40%',
    benefit: 'Reduce peak demand',
  },
  {
    icon: DollarSign,
    title: 'Smart Compensation',
    description: 'Units that delay their cooling get credits from those who cool first',
    benefit: 'Fair energy trading',
  },
  {
    icon: Users,
    title: 'Building-Wide Coordination',
    description: 'AI predicts optimal cooling windows based on thermal characteristics and resident preferences',
    benefit: 'Everyone saves together',
  },
  {
    icon: BarChart3,
    title: 'Real Savings Dashboard',
    description: 'Property managers see 25% energy savings with automated HK BEAM Plus reporting',
    benefit: 'Measurable impact',
  },
]

export default function Solution() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 text-white">
            The Climate Loop Solution
          </h2>
          <p className="text-xl text-thermal-cool">
            A coordination platform that staggers cooling schedules within buildings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {solutions.map((solution, index) => {
            const Icon = solution.icon
            return (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.03, borderColor: 'rgba(78, 205, 196, 0.7)' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-thermal-cool/20 hover:border-thermal-cool/50 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-thermal-cool/10">
                    <Icon className="w-8 h-8 text-thermal-cool" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {solution.description}
                    </p>
                    <div className="inline-block px-4 py-2 bg-energy-green/20 rounded-full">
                      <span className="text-energy-green font-bold">
                        ✓ {solution.benefit}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-energy-green/20 to-thermal-cool/20 rounded-xl p-12 text-center border border-energy-green/30"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            User Economics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div>
              <p className="text-5xl font-bold text-energy-green mb-2">
                HK$200-400
              </p>
              <p className="text-gray-300">Average monthly savings</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-thermal-cool mb-2">
                HK$50-150
              </p>
              <p className="text-gray-300">Additional earnings from credits</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-white mb-2">
                25-40%
              </p>
              <p className="text-gray-300">Peak demand reduction</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
