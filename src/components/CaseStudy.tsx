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
