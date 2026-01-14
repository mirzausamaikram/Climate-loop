'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-thermal-hot/10 via-transparent to-thermal-cool/10 animate-pulse" />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-gradient">Climate Loop</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-4">
            Vertical Energy Trading for Hong Kong High-Rises
          </p>
          
          <p className="text-xl md:text-2xl text-thermal-cool mb-12">
            Turn wasted thermal energy into{' '}
            <span className="text-energy-green font-bold">25-40% savings</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto border border-thermal-cool/20">
            <p className="text-lg text-gray-200 leading-relaxed">
              Hong Kong buildings waste{' '}
              <span className="text-thermal-hot font-bold">HK$4.2 billion</span>{' '}
              annually because everyone turns on AC at 7pm, creating massive peak loads that cost 3x normal rates.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto border border-energy-green/20">
            <p className="text-lg text-gray-200 leading-relaxed">
              <span className="text-energy-green font-bold">Climate Loop</span> coordinates cooling schedules within buildings, 
              reducing peak demand and saving residents{' '}
              <span className="text-energy-green font-bold">HK$200-400/month</span>.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-8 h-8 mx-auto text-thermal-cool" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
