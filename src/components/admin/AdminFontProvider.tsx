import { Inter } from 'next/font/google'
import React from 'react'

// Self-hosted by next/font at build time (no request to Google at runtime).
const inter = Inter({ subsets: ['latin'], display: 'swap' })

/** Sets Inter as the admin body font (admin.components.providers). */
export const AdminFontProvider = ({ children }: { children: React.ReactNode }) => (
  <>
    <style>{`:root { --font-body: ${inter.style.fontFamily}; }`}</style>
    {children}
  </>
)
