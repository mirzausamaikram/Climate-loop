'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

export default function Contact() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-700 text-center"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            Let's Build the Future of Energy
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Interested in collaborating or learning more about Climate Loop?
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href="mailto:hello@climateloop.hk"
              className="flex items-center gap-2 px-6 py-3 bg-thermal-cool hover:bg-thermal-cool/80 text-slate-900 font-bold rounded-lg transition-all"
            >
              <Mail className="w-5 h-5" />
              <span>Get In Touch</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-gray-500"
        >
          <p>© 2026 Climate Loop. All rights reserved.</p>
          <p className="mt-2">Developed by Usama Ikram</p>
        </motion.div>
      </div>
    </section>
  )
}
