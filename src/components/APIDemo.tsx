'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Play, CheckCircle, XCircle } from 'lucide-react'

export default function APIDemo() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const [apiResults, setApiResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const demos = [
    {
      id: 'weather',
      title: 'HK Observatory Weather',
      endpoint: '/api/weather',
      description: 'Real-time temperature & humidity data',
      color: 'thermal-cool',
    },
    {
      id: 'electricity',
      title: 'CLP Power Rates',
      endpoint: '/api/electricity',
      description: 'Current electricity pricing & peak hours',
      color: 'energy-green',
    },
    {
      id: 'building',
      title: 'Building Energy Data',
      endpoint: '/api/buildings?buildingId=TEST001',
      description: 'Sample building energy metrics',
      color: 'thermal-hot',
    },
  ]

  const runDemo = async (demo: typeof demos[0]) => {
    setLoading(true)
    setActiveDemo(demo.id)
    
    try {
      const response = await fetch(demo.endpoint)
      const data = await response.json()
      setApiResults(data)
    } catch (error) {
      setApiResults({ error: 'Failed to fetch data' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Code className="w-16 h-16 mx-auto mb-4 text-thermal-cool" />
          <h2 className="text-5xl font-bold mb-4 text-white">
            Live API Integration
          </h2>
          <p className="text-xl text-gray-400">
            Real Hong Kong data powering intelligent energy decisions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {demos.map((demo, index) => (
            <motion.button
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => runDemo(demo)}
              disabled={loading}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                activeDemo === demo.id
                  ? `border-${demo.color} bg-${demo.color}/10`
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
              } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white">{demo.title}</h3>
                <Play className={`w-6 h-6 text-${demo.color}`} />
              </div>
              <p className="text-gray-400 text-sm mb-3">{demo.description}</p>
              <code className="text-xs text-gray-500 break-all">
                GET {demo.endpoint}
              </code>
            </motion.button>
          ))}
        </div>

        {apiResults && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {apiResults.success !== false ? (
                  <CheckCircle className="w-6 h-6 text-energy-green" />
                ) : (
                  <XCircle className="w-6 h-6 text-thermal-hot" />
                )}
                API Response
              </h3>
              <button
                onClick={() => setApiResults(null)}
                className="text-gray-400 hover:text-white text-sm"
              >
                Close
              </button>
            </div>
            
            <div className="bg-slate-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-green-400">
                {JSON.stringify(apiResults, null, 2)}
              </pre>
            </div>

            {apiResults.success !== false && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(apiResults.data || {}).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-xs text-gray-400 mb-1 uppercase">{key}</p>
                    <p className="text-lg font-bold text-white truncate">
                      {typeof value === 'object' ? 'Object' : String(value)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-thermal-cool/20 to-energy-green/20 rounded-xl p-8 border border-thermal-cool/30"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Data Sources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-thermal-cool font-bold mb-2">Hong Kong Observatory</p>
              <p className="text-gray-400 text-sm">
                Real-time weather data & 7-day forecasts
              </p>
            </div>
            <div>
              <p className="text-energy-green font-bold mb-2">CLP Power Hong Kong</p>
              <p className="text-gray-400 text-sm">
                Time-of-use electricity rates & peak hours
              </p>
            </div>
            <div>
              <p className="text-thermal-hot font-bold mb-2">Building Energy Database</p>
              <p className="text-gray-400 text-sm">
                Aggregated savings & performance metrics
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
