import { LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import type { ComponentProps } from 'react'

import { cn } from './cn'

/*
 * Primary uses brand-green-dark as the background: white on brand-green (#7AC143)
 * is only 2.2:1 contrast (see the Phase 1 notes).
 */
const variants = {
  primary: 'bg-brand-green-dark text-surface hover:bg-brand-green',
  secondary: 'bg-brand-slate text-surface hover:bg-brand-slate-dark',
  outline: 'border border-line bg-surface text-ink hover:bg-surface-hover',
  ghost: 'bg-transparent text-ink hover:bg-surface-hover',
  danger: 'bg-danger text-surface hover:opacity-90',
} as const

const sizes = {
  sm: 'min-h-11 px-3 text-sm',
  md: 'min-h-11 px-4 text-base',
  lg: 'min-h-12 px-6 text-base',
  icon: 'size-11 p-0',
} as const

export type ButtonVariant = keyof typeof variants
export type ButtonSize = keyof typeof sizes

type StyleProps = { variant?: ButtonVariant; size?: ButtonSize; fullWidth?: boolean; className?: string }

/** Button classes, for styling a <Link> as a button. */
export const buttonClasses = ({ variant = 'primary', size = 'md', fullWidth, className }: StyleProps = {}) =>
  cn(
    'inline-flex items-center justify-center gap-2 rounded-[var(--radius-ui)] font-medium whitespace-nowrap transition-colors',
    'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  )

type ButtonProps = ComponentProps<'button'> & StyleProps & { loading?: boolean }

export const Button = ({
  variant,
  size,
  fullWidth,
  loading = false,
  className,
  children,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    aria-busy={loading || undefined}
    className={buttonClasses({ variant, size, fullWidth, className })}
    disabled={disabled || loading}
    type={type}
    {...props}
  >
    {loading ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : null}
    {children}
  </button>
)

type ButtonLinkProps = ComponentProps<typeof Link> & StyleProps

export const ButtonLink = ({ variant, size, fullWidth, className, ...props }: ButtonLinkProps) => (
  <Link className={buttonClasses({ variant, size, fullWidth, className })} {...props} />
)
