'use client'

import { motion } from 'framer-motion'
import { Building2, TrendingDown, DollarSign } from 'lucide-react'

export default function CaseStudy() {
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
            Business Impact
          </h2>
          <p className="text-xl text-gray-400">
            If all Hong Kong high-rises adopted Climate Loop
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-energy-green/20 to-energy-green/5 rounded-xl p-8 border border-energy-green/30 text-center"
          >
            <TrendingDown className="w-16 h-16 mx-auto mb-4 text-energy-green" />
            <p className="text-5xl font-bold text-white mb-2">15%</p>
            <p className="text-xl text-gray-300">City electricity demand reduction</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-thermal-cool/20 to-thermal-cool/5 rounded-xl p-8 border border-thermal-cool/30 text-center"
          >
            <DollarSign className="w-16 h-16 mx-auto mb-4 text-thermal-cool" />
            <p className="text-5xl font-bold text-white mb-2">HK$4.2B</p>
            <p className="text-xl text-gray-300">Annual savings for residents</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-thermal-hot/20 to-thermal-hot/5 rounded-xl p-8 border border-thermal-hot/30 text-center"
          >
            <Building2 className="w-16 h-16 mx-auto mb-4 text-thermal-hot" />
            <p className="text-5xl font-bold text-white mb-2">1.8M</p>
            <p className="text-xl text-gray-300">Tons CO₂ reduction per year</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-700"
        >
          <h3 className="text-3xl font-bold text-white mb-8">
            Real Building Example: Cosco Tower (Mid-Levels)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-700/50 rounded-xl p-6">
              <h4 className="text-xl font-bold text-white mb-4">Building Profile</h4>
              <div className="space-y-3 text-gray-300">
                <p><span className="text-thermal-cool font-bold">Floors:</span> 42 stories</p>
                <p><span className="text-thermal-cool font-bold">Units:</span> 168 apartments</p>
                <p><span className="text-thermal-cool font-bold">Avg Unit Size:</span> 850 sq ft</p>
                <p><span className="text-thermal-cool font-bold">Current Peak Load:</span> 2.4 MW</p>
                <p><span className="text-thermal-cool font-bold">Annual Energy Cost:</span> HK$8.2M</p>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-6">
              <h4 className="text-xl font-bold text-white mb-4">Climate Loop Impact</h4>
              <div className="space-y-3 text-gray-300">
                <p><span className="text-energy-green font-bold">Peak Reduction:</span> 35% (840 kW)</p>
                <p><span className="text-energy-green font-bold">Demand Charges Saved:</span> HK$1.8M/year</p>
                <p><span className="text-energy-green font-bold">Per Unit Savings:</span> HK$890/month</p>
                <p><span className="text-energy-green font-bold">Payback Period:</span> 14 months</p>
                <p><span className="text-energy-green font-bold">CO₂ Reduction:</span> 520 tons/year</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-energy-green/20 to-thermal-cool/20 rounded-xl p-6 border border-energy-green/30">
            <h4 className="text-xl font-bold text-white mb-3">Coordination Strategy</h4>
            <p className="text-gray-300 leading-relaxed">
              Upper floors (35-42) pre-cool 2°C below setpoint during off-peak hours (11PM-7AM at HK$0.82/kWh).
              During peak (2PM-6PM at HK$1.65/kWh), they coast 4 hours without AC using thermal mass.
              Lower floors reduce cooling during same peak hours since heat rises from below is minimized.
              Building-wide coordination achieves 35% peak demand reduction vs. 12% with individual optimization.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          viewport={{ once: true }}
          className="mt-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-700"
        >
          <h3 className="text-3xl font-bold text-white mb-8">
            Monetization Strategy
          </h3>

          <div className="space-y-6">
            <div className="flex items-start gap-6 p-6 bg-slate-700/30 rounded-xl">
              <div className="w-12 h-12 bg-energy-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">1</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Property Management SaaS
                </h4>
                <p className="text-gray-400 mb-2">
                  Dashboard showing 25% energy savings with automated HK BEAM Plus reporting
                </p>
                <p className="text-energy-green font-bold">
                  HK$5,000/month per building
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 bg-slate-700/30 rounded-xl">
              <div className="w-12 h-12 bg-thermal-cool/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">2</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Transaction Fees
                </h4>
                <p className="text-gray-400 mb-2">
                  2% fee on every energy credit trade between residents
                </p>
                <p className="text-thermal-cool font-bold">
                  Recurring revenue per transaction
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-6 bg-slate-700/30 rounded-xl">
              <div className="w-12 h-12 bg-thermal-hot/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">3</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Carbon Credit Marketplace
                </h4>
                <p className="text-gray-400 mb-2">
                  Convert verified energy savings to carbon credits for corporate ESG reporting
                </p>
                <p className="text-thermal-hot font-bold">
                  HK$400,000 per building per year
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-thermal-cool/20 to-energy-green/20 rounded-xl p-12 border border-thermal-cool/30 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            The Killer Insight
          </h3>
          <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            "Hong Kong's biggest problem wasn't just expensive electricity—it was{' '}
            <span className="text-thermal-hot font-bold">vertical energy inequality</span>.
            Upper floors subsidize lower floors' comfort. Climate Loop turns physics into fairness,
            using coordination to redistribute thermal advantages."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
