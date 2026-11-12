import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import type { ReactNode } from 'react'

import { AnnouncementBar } from '@/components/ecozynth/layout/AnnouncementBar'
import { DemoToaster } from '@/components/ecozynth/layout/DemoToaster'
import { Footer } from '@/components/ecozynth/layout/Footer'
import { Header } from '@/components/ecozynth/layout/Header'
import { WhatsAppButton } from '@/components/ecozynth/layout/WhatsAppButton'

import './demo.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'Ecozynth', template: '%s | Ecozynth' },
  description: 'Ecozynth wireframe demo: water softeners, filters and rooftop solar.',
  robots: { index: false, follow: false },
  // Placeholder favicon until the client supplies a square icon.
  icons: { icon: '/brand/logo.png' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function DemoLayout({ children }: { children: ReactNode }) {
  return (
    <html className={`${poppins.variable} ${inter.variable}`} lang="en-IN">
      <body className="flex min-h-dvh flex-col">
        <a
          className="sr-only z-50 rounded-[var(--radius-ui)] bg-surface px-4 py-2 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
          href="#main"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main className="flex-1" id="main">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <DemoToaster />
      </body>
    </html>
  )
}
