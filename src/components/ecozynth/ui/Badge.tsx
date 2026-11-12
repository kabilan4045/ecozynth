import type { ReactNode } from 'react'

import { cn } from './cn'

const tones = {
  green: 'bg-brand-green-light text-brand-green-dark',
  aqua: 'bg-aqua-50 text-ink ring-1 ring-inset ring-aqua',
  solar: 'bg-solar-50 text-ink ring-1 ring-inset ring-solar',
  neutral: 'bg-surface-hover text-ink',
  success: 'bg-surface text-success ring-1 ring-inset ring-success',
  warning: 'bg-surface text-ink ring-1 ring-inset ring-warning',
  danger: 'bg-surface text-danger ring-1 ring-inset ring-danger',
  info: 'bg-surface text-info ring-1 ring-inset ring-info',
} as const

export type BadgeTone = keyof typeof tones

export const Badge = ({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: BadgeTone
  children: ReactNode
  className?: string
}) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
      tones[tone],
      className,
    )}
  >
    {children}
  </span>
)

/** Division badge used on cards and product pages. */
export const DivisionBadge = ({ division, className }: { division: 'aqua' | 'solar'; className?: string }) => (
  <Badge className={className} tone={division}>
    {division === 'aqua' ? 'Aqua' : 'Solar'}
  </Badge>
)
