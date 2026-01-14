'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Flame, Wind, Zap } from 'lucide-react'

const problems = [
  {
    icon: Flame,
    title: 'Thermal Stack Effect',
    description: 'Heat rises from lower floors, warming upper floors unnecessarily',
    waste: '60%',
    color: 'thermal-hot',
  },
  {
    icon: Wind,
    title: 'Waste Heat Exchange',
    description: 'AC units on lower floors expel heat that makes upper floors even hotter',
    waste: '45%',
    color: 'thermal-hot',
  },
  {
    icon: Zap,
    title: 'Peak Load Staggering',
    description: 'Everyone turns on AC at 7pm → grid strain → 3x higher costs',
    waste: '300%',
    color: 'red-500',
  },
  {
    icon: TrendingUp,
    title: 'Sun-Exposure Inequity',
    description: 'South-facing units pay 40% more in cooling than north-facing units',
    waste: '40%',
    color: 'orange-500',
  },
]

export default function Problem() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 text-white">
            The Hong Kong Problem Nobody Is Solving
          </h2>
          <p className="text-xl text-gray-400">
            Hong Kong's buildings waste 60% of their cooling energy due to physics nobody accounts for
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-thermal-hot/50 transition-all hover:thermal-glow cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-${problem.color}/10`}>
                    <Icon className={`w-8 h-8 text-${problem.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {problem.description}
                    </p>
                    <div className="inline-block px-4 py-2 bg-red-500/20 rounded-full">
                      <span className="text-red-400 font-bold">
                        {problem.waste} energy waste
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
          className="mt-12 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-8 text-center border border-red-500/30"
        >
          <p className="text-2xl text-white font-bold mb-2">
            Current "Solution": Everyone suffers and pays more
          </p>
          <p className="text-xl text-gray-300">
            No coordination. No optimization. No fairness.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
