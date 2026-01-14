import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Climate Loop - Vertical Energy Trading for Hong Kong',
  description: 'Turn wasted thermal energy into savings. Coordinate cooling schedules in high-rises to reduce peak demand by 25-40%.',
  keywords: 'energy efficiency, Hong Kong, smart buildings, thermal optimization, peak demand reduction',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
