'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Cloud, Zap, TrendingUp, RefreshCw } from 'lucide-react'

interface LiveData {
  temperature: number
  humidity: number
  electricityRate: number
  peakHour: boolean
  timestamp: string
}

export default function LiveDataBanner() {
  const [data, setData] = useState<LiveData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchLiveData = async () => {
    try {
      const [weatherRes, electricityRes] = await Promise.all([
        fetch('/api/weather'),
        fetch('/api/electricity'),
      ])

      const weather = await weatherRes.json()
      const electricity = await electricityRes.json()

      if (weather.success && electricity.success) {
        setData({
          temperature: Math.round(weather.data.temperature),
          humidity: Math.round(weather.data.humidity),
          electricityRate: electricity.data.current_rate,
          peakHour: electricity.data.peak_hours.includes(
            new Date().getHours().toString().padStart(2, '0')
          ),
          timestamp: new Date().toLocaleTimeString('en-HK', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        })
      }
    } catch (error) {
      console.error('Failed to fetch live data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLiveData()
    const interval = setInterval(fetchLiveData, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="bg-slate-800/30 backdrop-blur-sm border-y border-slate-700 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Loading live data...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-y border-thermal-cool/20 py-4"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-thermal-cool" />
            <span className="text-gray-400">Hong Kong Now:</span>
            <span className="text-white font-bold">{data.temperature}°C</span>
            <span className="text-gray-500">•</span>
            <span className="text-white font-bold">{data.humidity}%</span>
          </div>

          <div className="flex items-center gap-2">
            <Zap className={`w-5 h-5 ${data.peakHour ? 'text-thermal-hot animate-pulse' : 'text-energy-green'}`} />
            <span className="text-gray-400">Electricity:</span>
            <span className={`font-bold ${data.peakHour ? 'text-thermal-hot' : 'text-energy-green'}`}>
              HK${data.electricityRate}/kWh
            </span>
            {data.peakHour && (
              <span className="px-2 py-1 bg-thermal-hot/20 text-thermal-hot text-xs rounded-full font-bold">
                PEAK HOUR
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-energy-green" />
            <span className="text-gray-400">Potential Savings:</span>
            <motion.span
              key={data.timestamp}
              initial={{ scale: 1.2, color: '#2ECC71' }}
              animate={{ scale: 1, color: '#ffffff' }}
              className="font-bold"
            >
              {data.peakHour ? '40%' : '25%'}
            </motion.span>
          </div>

          <div className="text-gray-500 text-xs">
            Updated {data.timestamp}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
