import type { Division, IconName } from '@/demo/data/types'

import { Icon } from './icons'
import { cn } from './ui/cn'

const aspects = {
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-[21/9]',
  '4/3': 'aspect-[4/3]',
  '3/4': 'aspect-[3/4]',
} as const

const tones = {
  aqua: 'bg-aqua-50 text-aqua',
  solar: 'bg-solar-50 text-solar',
  neutral: 'bg-surface-alt text-muted',
} as const

type PlaceholderProps = {
  aspect?: keyof typeof aspects
  /** Division tint: aqua-50, solar-50 or neutral surface-alt. */
  tone?: Division | 'neutral'
  icon?: IconName
  label?: string
  className?: string
}

/** Stand-in for every image in the wireframe demo (no external images). */
export const Placeholder = ({
  aspect = 'square',
  tone = 'neutral',
  icon = 'image',
  label,
  className,
}: PlaceholderProps) => (
  <div
    aria-hidden={label ? undefined : true}
    aria-label={label}
    className={cn(
      'flex w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-[var(--radius-ui)]',
      aspects[aspect],
      tones[tone],
      className,
    )}
    role={label ? 'img' : undefined}
  >
    <Icon className="size-8 opacity-80" name={icon} strokeWidth={1.5} />
    {label ? <span className="px-3 text-center text-xs font-medium text-muted">{label}</span> : null}
  </div>
)
