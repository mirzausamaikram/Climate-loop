'use client'

import { motion } from 'framer-motion'
import { Code2, Database, Cpu, Zap } from 'lucide-react'

const techStack = [
  {
    category: 'AI & Optimization',
    icon: Zap,
    technologies: ['Graph Neural Networks', 'Time Series Forecasting', 'Reinforcement Learning', 'Energy Matching Algorithm'],
    color: 'orange-400',
  },
]

export default function TechStack() {
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
          <p className="text-xl text-gray-400">
            Production-ready stack built for scale and real-time performance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techStack.map((stack, index) => {
            const Icon = stack.icon
            return (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-thermal-cool/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-lg bg-${stack.color}/10`}>
                    <Icon className={`w-8 h-8 text-${stack.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {stack.category}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {stack.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg"
                    >
                      <div className={`w-2 h-2 rounded-full bg-${stack.color}`} />
                      <span className="text-gray-300">{tech}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Key Technical Innovations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-thermal-cool/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">⚡</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                Real-time Matching Engine
              </h4>
              <p className="text-gray-400">
                Modified stock exchange algorithm for energy coordination
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-energy-green/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">🧠</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                Predictive ML Models
              </h4>
              <p className="text-gray-400">
                Forecast building-wide temperature evolution
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-thermal-hot/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">🎨</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                WebGL Thermal Simulation
              </h4>
              <p className="text-gray-400">
                Client-side CFD simulations at 60 FPS
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
