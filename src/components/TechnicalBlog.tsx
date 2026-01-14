'use client'

import { motion } from 'framer-motion'
import { Code, Cpu, TrendingUp, Zap } from 'lucide-react'

export default function TechnicalBlog() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 text-white">
            How the Algorithm Works
          </h2>
          <p className="text-xl text-gray-400">
            The technical architecture behind vertical energy coordination
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-thermal-cool/10">
                <Cpu className="w-8 h-8 text-thermal-cool" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  1. Physics-Based Thermal Model
                </h3>
                <p className="text-gray-400 mb-4">
                  Each apartment is modeled as a thermal capacitor with heat flows from:
                </p>
                <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                  <pre>{`T(t+1) = T(t) + Δt * (
  Q_AC / (m * c_p)          // Cooling power
  - U * A * (T - T_outdoor) // Wall losses  
  + k * (T_above - T)       // Heat from above
  - k * (T - T_below)       // Heat to below
)`}</pre>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-energy-green/10">
                <TrendingUp className="w-8 h-8 text-energy-green" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  2. Greedy Optimization with Thermal Disadvantage
                </h3>
                <p className="text-gray-400 mb-4">
                  Algorithm prioritizes floors with highest thermal disadvantage score:
                </p>
                <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                  <pre>{`disadvantage_score = (
  heat_from_above * 2.5    // Upper floors suffer most
  + outdoor_exposure * 1.8  // West-facing penalty
  + current_temperature     // Hottest get priority
  - thermal_mass           // Concrete retains better
)`}</pre>
                </div>
                <p className="text-gray-400 mt-4">
                  Floors with highest scores are scheduled for pre-cooling first, creating a cascade effect downward.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-thermal-hot/10">
                <Zap className="w-8 h-8 text-thermal-hot" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  3. Real-Time Matching Engine
                </h3>
                <p className="text-gray-400 mb-4">
                  Modified limit order book algorithm (like stock exchanges) matches cooling capacity with demand:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-thermal-cool font-bold mt-1">•</span>
                    <span><strong>Off-Peak (11PM-7AM):</strong> Upper floors "buy" cheap cooling capacity, pre-cooling to 20°C</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-thermal-cool font-bold mt-1">•</span>
                    <span><strong>Peak Hours (2PM-6PM):</strong> Upper floors "sell" their thermal mass by coasting without AC</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-thermal-cool font-bold mt-1">•</span>
                    <span><strong>Building-wide:</strong> Coordinated schedules reduce aggregate peak demand by 35-40%</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-orange-400/10">
                <Code className="w-8 h-8 text-orange-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  4. Implementation Stack
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-lg font-bold text-thermal-cool mb-2">Backend</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Python: Optimization engine (SciPy, NumPy)</li>
                      <li>• Flask API: REST endpoints for schedules</li>
                      <li>• PostgreSQL + TimescaleDB: Time-series data</li>
                      <li>• WebSockets: Real-time updates</li>
                    </ul>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-lg font-bold text-energy-green mb-2">Frontend</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• Next.js 14: Server + client rendering</li>
                      <li>• Three.js: 3D thermal visualization</li>
                      <li>• Framer Motion: Smooth animations</li>
                      <li>• TypeScript: Type-safe development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-thermal-cool/20 to-energy-green/20 rounded-xl p-8 border border-thermal-cool/30"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Key Innovation</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Unlike traditional demand response (which just shifts individual load), Climate Loop exploits the 
              <span className="text-thermal-hot font-bold"> vertical thermal coupling</span> in high-rises. 
              When upper floors pre-cool, they reduce heat transfer to lower floors, creating a multiplier effect. 
              A 1 kW shift in top floors can reduce building-wide peak demand by 2.5 kW due to thermal cascading.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
