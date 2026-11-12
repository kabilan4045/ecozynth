import type { ComponentProps, ReactNode } from 'react'

import { cn } from './cn'

/** Page-width container with responsive gutters. */
export const Container = ({ className, ...props }: ComponentProps<'div'>) => (
  <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...props} />
)

/** Vertical section spacing, optionally on the alternate background. */
export const Section = ({
  alt = false,
  className,
  ...props
}: ComponentProps<'section'> & { alt?: boolean }) => (
  <section className={cn('py-10 sm:py-14', alt && 'bg-surface-alt', className)} {...props} />
)

/** Section heading with optional description and action (e.g. "View all"). */
export const SectionHeading = ({
  title,
  description,
  action,
  as: Heading = 'h2',
  id,
}: {
  title: string
  description?: string
  action?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  id?: string
}) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
    <div className="max-w-2xl">
      <Heading className="text-xl font-semibold sm:text-2xl" id={id}>
        {title}
      </Heading>
      {description ? <p className="mt-1 text-muted">{description}</p> : null}
    </div>
    {action}
  </div>
)

/** 12px-radius bordered card. */
export const Card = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    className={cn('rounded-[var(--radius-card)] border border-line bg-surface', className)}
    {...props}
  />
)

/** Page title block used at the top of inner pages. */
export const PageHeader = ({ title, description }: { title: string; description?: string }) => (
  <div className="mb-6 sm:mb-8">
    <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
    {description ? <p className="mt-2 max-w-2xl text-muted">{description}</p> : null}
  </div>
)
