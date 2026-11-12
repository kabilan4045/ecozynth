'use client'

import { useNav, usePreferences } from '@payloadcms/ui'
import { useEffect } from 'react'

/** Payload's preference key for the sidebar state (PREFERENCE_KEYS.NAV). */
const NAV_PREFERENCE_KEY = 'nav'

/** At or below this width the sidebar is a pop-over menu, so leave it closed. */
const SIDEBAR_MIN_WIDTH = 1024

/**
 * Ecozynth: open the admin sidebar by default on desktop.
 * Payload only does this above 1440px; most laptops are narrower.
 * A user who closes the sidebar keeps it closed (Payload saves that preference).
 */
export const NavDefaultOpen = () => {
  const { setNavOpen } = useNav()
  const { getPreference } = usePreferences()

  useEffect(() => {
    let cancelled = false

    const openIfAllowed = async () => {
      if (window.innerWidth <= SIDEBAR_MIN_WIDTH) return
      const saved = await getPreference<{ open?: boolean }>(NAV_PREFERENCE_KEY)
      if (!cancelled && saved?.open !== false) setNavOpen(true)
    }

    // Run after Payload's own nav effects, which close the sidebar below 1440px on load.
    const timer = window.setTimeout(() => void openIfAllowed(), 0)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [getPreference, setNavOpen])

  return null
}
