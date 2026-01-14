'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator } from 'lucide-react'

export default function SavingsCalculator() {
  const [floor, setFloor] = useState(20)
  const [orientation, setOrientation] = useState('south')
  const [size, setSize] = useState(600)

  // Simple calculation algorithm
  const calculateSavings = () => {
    let baseSavings = 200
    
    // Floor factor (higher = more savings potential)
    const floorFactor = Math.min(floor / 50, 1) * 100
    
    // Orientation factor
    const orientationFactor = {
      south: 1.4,
      west: 1.2,
      east: 1.0,
      north: 0.8,
    }[orientation] || 1
    
    // Size factor
    const sizeFactor = size / 600
    
    const monthlySavings = Math.round(baseSavings * (1 + floorFactor / 100) * orientationFactor * sizeFactor)
    const credits = Math.round(monthlySavings * 0.3)
    const totalBenefit = monthlySavings + credits
    const yearlyBenefit = totalBenefit * 12
    
    return {
      monthlySavings,
      credits,
      totalBenefit,
      yearlyBenefit,
    }
  }

  const savings = calculateSavings()

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Calculator className="w-16 h-16 mx-auto mb-4 text-energy-green" />
          <h2 className="text-5xl font-bold mb-4 text-white">
            Calculate Your Savings
          </h2>
          <p className="text-xl text-gray-400">
            See how much you could save with Climate Loop
          </p>
        </motion.div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-700">
          <div className="space-y-8">
            {/* Floor Input */}
            <div>
              <label className="block text-white font-bold mb-3 text-lg">
                Floor Number: {floor}
              </label>
              <input
                type="range"
                min="1"
                max="60"
                value={floor}
                onChange={(e) => setFloor(Number(e.target.value))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-thermal-cool"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>Ground</span>
                <span>60th Floor</span>
              </div>
            </div>

            {/* Orientation Input */}
            <div>
              <label className="block text-white font-bold mb-3 text-lg">
                Orientation
              </label>
              <div className="grid grid-cols-4 gap-4">
                {['north', 'east', 'south', 'west'].map((dir) => (
                  <button
                    key={dir}
                    onClick={() => setOrientation(dir)}
                    className={`py-3 px-6 rounded-lg font-bold capitalize transition-all ${
                      orientation === dir
                        ? 'bg-thermal-cool text-slate-900'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Input */}
            <div>
              <label className="block text-white font-bold mb-3 text-lg">
                Apartment Size: {size} sq ft
              </label>
              <input
                type="range"
                min="300"
                max="1500"
                step="50"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-thermal-cool"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>300 sq ft</span>
                <span>1500 sq ft</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <motion.div
            key={`${floor}-${orientation}-${size}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-12 bg-gradient-to-r from-energy-green/20 to-thermal-cool/20 rounded-xl p-8 border border-energy-green/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Your Estimated Savings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-slate-800/50 rounded-lg">
                <p className="text-gray-400 mb-2">Monthly Electricity Savings</p>
                <p className="text-4xl font-bold text-energy-green">
                  HK${savings.monthlySavings}
                </p>
              </div>
              
              <div className="text-center p-6 bg-slate-800/50 rounded-lg">
                <p className="text-gray-400 mb-2">Energy Credits Earned</p>
                <p className="text-4xl font-bold text-thermal-cool">
                  +HK${savings.credits}
                </p>
              </div>
              
              <div className="text-center p-6 bg-slate-800/50 rounded-lg md:col-span-2">
                <p className="text-gray-400 mb-2">Total Monthly Benefit</p>
                <p className="text-5xl font-bold text-white">
                  HK${savings.totalBenefit}
                </p>
                <p className="text-thermal-cool mt-2">
                  HK${savings.yearlyBenefit}/year
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
