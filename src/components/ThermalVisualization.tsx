'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Building3D = dynamic(() => import('./Building3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-thermal-cool border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white">Loading 3D Model...</p>
      </div>
    </div>
  ),
})

export default function ThermalVisualization() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 text-white">
            Thermal Flow Visualization
          </h2>
          <p className="text-xl text-gray-400">
            Interactive 3D model showing heat distribution in Hong Kong high-rises
          </p>
        </motion.div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-700">
          <div className="aspect-video bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl relative overflow-hidden">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white">Loading...</div>}>
              <Building3D />
            </Suspense>
            
            {/* Controls hint */}
            <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 text-sm text-gray-300">
              <p className="font-bold mb-1">Controls:</p>
              <p>🖱️ Drag to rotate • Scroll to zoom</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-6 bg-thermal-hot/10 rounded-lg border border-thermal-hot/30">
              <p className="text-4xl font-bold text-thermal-hot mb-2">60%</p>
              <p className="text-gray-300">Top floor waste</p>
            </div>
            <div className="text-center p-6 bg-orange-500/10 rounded-lg border border-orange-500/30">
              <p className="text-4xl font-bold text-orange-400 mb-2">35%</p>
              <p className="text-gray-300">Mid floor waste</p>
            </div>
            <div className="text-center p-6 bg-thermal-cool/10 rounded-lg border border-thermal-cool/30">
              <p className="text-4xl font-bold text-thermal-cool mb-2">20%</p>
              <p className="text-gray-300">Ground floor waste</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
