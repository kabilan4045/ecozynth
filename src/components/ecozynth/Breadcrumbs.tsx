import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { Container } from './ui/layout'

export type Crumb = { label: string; href?: string }

/** Breadcrumbs for every page except Home. "Home" is added automatically. */
export const Breadcrumbs = ({ items }: { items: Crumb[] }) => {
  const all: Crumb[] = [{ label: 'Home', href: '/' }, ...items]
  return (
    <Container>
      <nav aria-label="Breadcrumb" className="py-3">
        <ol className="scrollbar-none flex items-center gap-1 overflow-x-auto text-sm whitespace-nowrap text-muted">
          {all.map((crumb, index) => {
            const isLast = index === all.length - 1
            return (
              <li className="flex items-center gap-1" key={`${crumb.label}-${index}`}>
                {index > 0 ? <ChevronRight aria-hidden className="size-4 shrink-0" /> : null}
                {crumb.href && !isLast ? (
                  <Link className="inline-flex min-h-8 items-center hover:text-ink hover:underline" href={crumb.href}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? 'page' : undefined} className="font-medium text-ink">
                    {crumb.label}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </Container>
  )
}
