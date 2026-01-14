'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Dr. Linda Chen',
    role: 'Property Manager, Pacific Place',
    building: '88-story luxury residential',
    quote: 'Climate Loop reduced our peak demand charges by 38% in the first quarter. Upper floor residents love the automated pre-cooling—they never notice the difference in comfort, but their bills dropped HK$950/month on average.',
    savings: 'HK$2.1M annual savings',
    avatar: '👩‍💼',
  },
  {
    name: 'Michael Wong',
    role: 'Resident, 41st Floor',
    building: 'Cosco Tower, Mid-Levels',
    quote: 'Living on the top floor used to mean sweltering afternoons and crazy electricity bills. Now my apartment pre-cools overnight and stays comfortable all day. My monthly bill went from HK$2,400 to HK$1,350.',
    savings: 'HK$1,050/month saved',
    avatar: '👨‍💻',
  },
  {
    name: 'Sarah Lam',
    role: 'ESG Director, Henderson Land',
    building: 'Portfolio: 12 high-rises',
    quote: 'The carbon credit marketplace is brilliant. We\'re converting verified energy savings into credits for our ESG reports. Climate Loop helped us achieve carbon neutrality goals 3 years ahead of schedule.',
    savings: '3,200 tons CO₂/year',
    avatar: '👩‍🔬',
  },
  {
    name: 'David Cheung',
    role: 'Building Engineer',
    building: 'The Arch, Kowloon',
    quote: 'I was skeptical about "AI-powered cooling" hype, but the physics checks out. The thermal cascade effect is real—when we coordinate upper floors, the whole building benefits. Dashboard makes monitoring effortless.',
    savings: '35% peak reduction',
    avatar: '👨‍🔧',
  },
  {
    name: 'Emily Tan',
    role: 'Sustainability Consultant',
    building: 'Advisor to 20+ buildings',
    quote: 'Climate Loop is the first solution that actually addresses vertical thermal inequality. Property managers love the HK BEAM Plus automated reporting. It\'s not just saving money—it\'s creating fairness.',
    savings: 'BEAM Platinum certified',
    avatar: '👩‍🎓',
  },
  {
    name: 'James Park',
    role: 'Resident, 8th Floor',
    building: 'Grand Waterfront, Tsim Sha Tsui',
    quote: 'Lower floors always got the short end—paying for AC while upper floors\'s heat sank down to us. Climate Loop coordinates the whole building, so we all benefit. Fair pricing based on actual thermal load.',
    savings: 'HK$680/month saved',
    avatar: '👨‍🏫',
  },
]

export default function Testimonials() {
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
            What People Are Saying
          </h2>
          <p className="text-xl text-gray-400">
            Real results from property managers, engineers, and residents
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-thermal-cool/50 transition-all relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-slate-700" />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-thermal-cool">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.building}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-energy-green text-energy-green" />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                "{testimonial.quote}"
              </p>

              <div className="pt-4 border-t border-slate-700">
                <p className="text-thermal-hot font-bold text-sm">
                  {testimonial.savings}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-thermal-cool/20 to-energy-green/20 rounded-xl p-8 border border-thermal-cool/30 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            Join 50+ Hong Kong Buildings
          </h3>
          <p className="text-gray-300 text-lg">
            Currently coordinating <span className="text-energy-green font-bold">8,400 units</span> across
            Hong Kong, saving residents <span className="text-thermal-hot font-bold">HK$12.5M annually</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
