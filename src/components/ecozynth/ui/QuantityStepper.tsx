'use client'

import { Minus, Plus } from 'lucide-react'

import { cn } from './cn'

/** − qty + control. Clamps between min and max (stock). */
export const QuantityStepper = ({
  value,
  onChange,
  min = 1,
  max,
  label = 'Quantity',
  className,
}: {
  value: number
  onChange: (value: number) => void
  min?: number
  max: number
  label?: string
  className?: string
}) => (
  <div
    aria-label={label}
    className={cn('inline-flex items-center rounded-[var(--radius-ui)] border border-line', className)}
    role="group"
  >
    <button
      aria-label="Decrease quantity"
      className="inline-flex size-11 items-center justify-center hover:bg-surface-hover disabled:opacity-40"
      disabled={value <= min}
      onClick={() => onChange(Math.max(min, value - 1))}
      type="button"
    >
      <Minus aria-hidden className="size-4" />
    </button>
    <output aria-live="polite" className="min-w-10 text-center font-medium tabular-nums">
      {value}
    </output>
    <button
      aria-label="Increase quantity"
      className="inline-flex size-11 items-center justify-center hover:bg-surface-hover disabled:opacity-40"
      disabled={value >= max}
      onClick={() => onChange(Math.min(max, value + 1))}
      type="button"
    >
      <Plus aria-hidden className="size-4" />
    </button>
  </div>
)
