import Link from 'next/link'
import type { ReactNode } from 'react'

import type { Division, IconName } from '@/demo/data/types'
import { loremParagraphs } from '@/demo/data/lorem'

import { Breadcrumbs, type Crumb } from './Breadcrumbs'
import { Icon } from './icons'
import { Placeholder } from './Placeholder'
import { cn } from './ui/cn'
import { Card, Container, PageHeader } from './ui/layout'

/**
 * Reusable wireframe blocks. Every demo page is assembled from these so the
 * structure is easy to review now and easy to restyle in the design pass.
 */

/** Breadcrumbs + title + content, the standard inner-page frame. */
export const PageShell = ({
  crumbs,
  title,
  description,
  children,
  className,
}: {
  crumbs: Crumb[]
  title: string
  description?: string
  children: ReactNode
  className?: string
}) => (
  <>
    <Breadcrumbs items={crumbs} />
    <Container className={cn('pb-16', className)}>
      <PageHeader description={description} title={title} />
      {children}
    </Container>
  </>
)

/** Heading + lorem paragraphs, optionally with a placeholder image beside it. */
export const LoremSection = ({
  title,
  paragraphs = 2,
  image,
  tone = 'neutral',
  id,
  level = 'h2',
}: {
  title: string
  paragraphs?: number
  image?: IconName
  tone?: Division | 'neutral'
  id?: string
  level?: 'h2' | 'h3'
}) => {
  const Heading = level
  return (
    <section className={cn('py-6', image && 'grid items-center gap-6 md:grid-cols-2')} id={id}>
      <div>
        <Heading className={cn('font-semibold', level === 'h2' ? 'text-xl sm:text-2xl' : 'text-lg')}>
          {title}
        </Heading>
        {loremParagraphs(paragraphs).map((text, i) => (
          <p className="mt-3 text-muted" key={i}>
            {text}
          </p>
        ))}
      </div>
      {image ? <Placeholder aspect="4/3" icon={image} tone={tone} /> : null}
    </section>
  )
}

export type TileItem = {
  title: string
  text?: string
  href?: string
  icon?: IconName
  tone?: Division | 'neutral'
  meta?: string
}

/** Grid of simple cards (icon/placeholder + title + text). */
export const TileGrid = ({
  items,
  columns = 3,
  withImage = false,
}: {
  items: TileItem[]
  columns?: 2 | 3 | 4
  withImage?: boolean
}) => (
  <ul
    className={cn(
      'grid grid-cols-1 gap-4',
      columns >= 2 && 'sm:grid-cols-2',
      columns >= 3 && 'lg:grid-cols-3',
      columns === 4 && 'xl:grid-cols-4',
    )}
  >
    {items.map((item) => {
      const body = (
        <>
          {withImage ? (
            <Placeholder aspect="video" className="rounded-none" icon={item.icon} tone={item.tone} />
          ) : null}
          <div className="flex flex-1 flex-col gap-2 p-4">
            {!withImage && item.icon ? (
              <span
                className={cn(
                  'inline-flex size-10 items-center justify-center rounded-[var(--radius-ui)]',
                  item.tone === 'aqua' ? 'bg-aqua-50 text-aqua' : item.tone === 'solar' ? 'bg-solar-50 text-solar' : 'bg-brand-green-light text-brand-green-dark',
                )}
              >
                <Icon className="size-5" name={item.icon} />
              </span>
            ) : null}
            {item.meta ? <p className="text-xs text-muted">{item.meta}</p> : null}
            <h3 className="font-semibold">{item.title}</h3>
            {item.text ? <p className="text-sm text-muted">{item.text}</p> : null}
          </div>
        </>
      )
      return (
        <li key={item.title}>
          {item.href ? (
            <Link className="block h-full" href={item.href}>
              <Card className="flex h-full flex-col overflow-hidden transition-colors hover:border-brand-slate">{body}</Card>
            </Link>
          ) : (
            <Card className="flex h-full flex-col overflow-hidden">{body}</Card>
          )}
        </li>
      )
    })}
  </ul>
)

/** Numbered steps ("How it works"). */
export const Steps = ({ steps }: { steps: string[] }) => (
  <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {steps.map((step, i) => (
      <li key={step}>
        <Card className="h-full p-4">
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-brand-green-dark text-sm font-semibold text-surface">
            {i + 1}
          </span>
          <h3 className="mt-3 font-semibold">{step}</h3>
          <p className="mt-1 text-sm text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Card>
      </li>
    ))}
  </ol>
)

/** Placeholder numbers strip. */
export const StatStrip = ({ stats }: { stats: { value: string; label: string }[] }) => (
  <dl className="grid grid-cols-2 gap-4 rounded-[var(--radius-card)] bg-surface-alt p-6 md:grid-cols-4">
    {stats.map((stat) => (
      <div className="text-center" key={stat.label}>
        <dt className="text-sm text-muted">{stat.label}</dt>
        <dd className="font-heading text-2xl font-semibold">{stat.value}</dd>
      </div>
    ))}
  </dl>
)

/** Simple check-list. */
export const CheckList = ({ items }: { items: string[] }) => (
  <ul className="grid gap-2 sm:grid-cols-2">
    {items.map((item) => (
      <li className="flex items-start gap-2" key={item}>
        <Icon className="mt-0.5 size-5 shrink-0 text-success" name="badge" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

/** Small heading used between blocks. */
export const BlockTitle = ({ children, id }: { children: ReactNode; id?: string }) => (
  <h2 className="mt-10 mb-4 text-xl font-semibold sm:text-2xl" id={id}>
    {children}
  </h2>
)

/** Yellow-free info note (placeholder disclaimers etc.). */
export const Note = ({ children }: { children: ReactNode }) => (
  <p className="mb-6 rounded-[var(--radius-ui)] border border-line bg-surface-alt p-3 text-sm text-muted">{children}</p>
)
