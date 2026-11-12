import Link from 'next/link'
import type { ReactNode } from 'react'

import { Breadcrumbs } from './Breadcrumbs'
import { Container } from './ui/layout'

const accountNav = [
  { label: 'Overview', href: '/account' },
  { label: 'Orders', href: '/account/orders' },
  { label: 'Addresses', href: '/account/addresses' },
  { label: 'Warranties', href: '/account/warranties' },
  { label: 'Service requests', href: '/account/service-requests' },
  { label: 'Profile', href: '/account/profile' },
]

/** Account frame: sidebar on desktop, horizontal scrollable tabs on mobile. */
export const AccountShell = ({
  title,
  current,
  children,
  crumbs = [],
}: {
  title: string
  /** href of the active nav item */
  current: string
  children: ReactNode
  crumbs?: { label: string; href?: string }[]
}) => (
  <>
    <Breadcrumbs
      items={[{ label: 'My account', href: '/account' }, ...(current === '/account' ? [] : crumbs.length ? crumbs : [{ label: title }])]}
    />
    <Container className="pb-16">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <nav aria-label="Account">
          <ul className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
            {accountNav.map((item) => {
              const active = item.href === current
              return (
                <li className="shrink-0" key={item.href}>
                  <Link
                    aria-current={active ? 'page' : undefined}
                    className={
                      'flex min-h-11 items-center rounded-[var(--radius-ui)] px-3 text-sm font-medium whitespace-nowrap ' +
                      (active
                        ? 'bg-brand-green-light text-brand-green-dark'
                        : 'border border-line text-ink hover:bg-surface-hover lg:border-0')
                    }
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="min-w-0">
          <h1 className="mb-6 text-2xl font-semibold sm:text-3xl">{title}</h1>
          {children}
        </div>
      </div>
    </Container>
  </>
)
