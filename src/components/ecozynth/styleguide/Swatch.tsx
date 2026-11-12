'use client'

import { useSyncExternalStore } from 'react'

const noopSubscribe = () => () => {}

/**
 * Colour swatch. The hex value is read from the live CSS variable, so the
 * stylesheet stays the single source of truth for colours.
 */
export const Swatch = ({ token, use }: { token: string; use: string }) => {
  const hex = useSyncExternalStore(
    noopSubscribe,
    () => getComputedStyle(document.documentElement).getPropertyValue(`--${token}`).trim().toUpperCase(),
    () => '',
  )
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
      <div className="h-16 border-b border-line" style={{ background: `var(--${token})` }} />
      <div className="p-3">
        <p className="font-mono text-sm font-medium">{token}</p>
        <p className="font-mono text-xs text-muted">{hex || '…'}</p>
        <p className="mt-1 text-xs text-muted">{use}</p>
      </div>
    </div>
  )
}
