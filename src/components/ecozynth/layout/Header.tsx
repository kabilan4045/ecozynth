'use client'

import { ChevronDown, Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { headerNav, type NavItem } from '@/demo/routes'
import { useAuth } from '@/demo/state/auth'
import { useCartTotals } from '@/demo/state/cart'

import { Logo } from '../Logo'
import { cn } from '../ui/cn'
import { Container } from '../ui/layout'
import { MobileMenu } from './MobileMenu'
import { SearchBox } from './SearchBox'

/**
 * Open state tied to the path it was opened on: navigating to another page
 * closes menus automatically, without an effect.
 */
const usePathScopedState = <T extends string>() => {
  const pathname = usePathname()
  const [state, setState] = useState<{ value: T; path: string } | null>(null)
  const value = state && state.path === pathname ? state.value : null
  const set = (next: T | null) => setState(next ? { value: next, path: pathname } : null)
  return [value, set] as const
}

const isActive = (pathname: string, item: NavItem) =>
  item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

/* ------------------------------------------------------------------ */
/* Desktop navigation with dropdowns                                   */
/* ------------------------------------------------------------------ */

const DesktopNav = () => {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = usePathScopedState<string>()
  const navRef = useRef<HTMLElement>(null)

  // Close on outside click and on Escape.
  useEffect(() => {
    if (!openMenu) return
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenu(null)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [openMenu, setOpenMenu])

  return (
    <nav aria-label="Main" className="hidden lg:block" ref={navRef}>
      <ul className="flex items-center gap-0.5 xl:gap-1">
        {headerNav.map((item) => {
          const active = isActive(pathname, item)
          const linkClass = cn(
            'inline-flex min-h-11 items-center gap-1 rounded-[var(--radius-ui)] px-2 text-sm font-medium whitespace-nowrap hover:bg-surface-hover xl:px-3',
            active ? 'text-brand-green-dark' : 'text-ink',
          )
          if (!item.children) {
            return (
              <li key={item.label}>
                <Link aria-current={active ? 'page' : undefined} className={linkClass} href={item.href}>
                  {item.label}
                </Link>
              </li>
            )
          }
          const open = openMenu === item.label
          const menuId = `menu-${item.label.toLowerCase()}`
          return (
            <li className="relative" key={item.label}>
              <button
                aria-controls={menuId}
                aria-expanded={open}
                className={linkClass}
                onClick={() => setOpenMenu(open ? null : item.label)}
                type="button"
              >
                {item.label}
                <ChevronDown aria-hidden className={cn('size-4 transition-transform', open && 'rotate-180')} />
              </button>
              {open ? (
                <ul
                  className="absolute top-full left-0 z-50 mt-1 w-64 rounded-[var(--radius-card)] border border-line bg-surface p-2 shadow-sm"
                  id={menuId}
                >
                  {item.children.map((child) => (
                    <li key={child.href + child.label}>
                      <Link
                        className="flex min-h-10 items-center rounded-[var(--radius-ui)] px-3 text-sm hover:bg-surface-hover"
                        href={child.href}
                        onClick={() => setOpenMenu(null)}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/* ------------------------------------------------------------------ */
/* Mobile menu trigger (full-screen menu lives in MobileMenu.tsx)      */
/* ------------------------------------------------------------------ */

const MobileNav = () => {
  const [open, setOpen] = usePathScopedState<'open'>()
  return (
    <>
      <button
        aria-expanded={open === 'open'}
        aria-label="Open menu"
        className="-ml-2 inline-flex size-11 items-center justify-center rounded-[var(--radius-ui)] hover:bg-surface-hover lg:hidden"
        onClick={() => setOpen('open')}
        type="button"
      >
        <Menu aria-hidden className="size-6" />
      </button>
      <MobileMenu onOpenChange={(next) => setOpen(next ? 'open' : null)} open={open === 'open'} />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

const iconButton =
  'relative inline-flex size-11 items-center justify-center rounded-[var(--radius-ui)] text-ink hover:bg-surface-hover'

export const Header = () => {
  const user = useAuth()
  const { itemCount } = useCartTotals()
  const [searchOpen, setSearchOpen] = usePathScopedState<'open'>()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <Container className="flex h-14 items-center gap-1 sm:gap-2 lg:h-16">
        <MobileNav />
        {/* Mobile/tablet: logo centred in the space between the menu button and the icons */}
        <div className="flex min-w-0 flex-1 justify-center lg:hidden">
          <Logo priority size="sm" />
        </div>
        <Logo className="mr-2 hidden lg:inline-flex" priority size="md" />
        <DesktopNav />

        <div className="flex items-center gap-0 sm:gap-1 lg:ml-auto">
          <SearchBox className="hidden w-44 lg:block xl:w-64 2xl:w-72" />
          <button
            aria-expanded={searchOpen === 'open'}
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            className={cn(iconButton, 'lg:hidden')}
            onClick={() => setSearchOpen(searchOpen ? null : 'open')}
            type="button"
          >
            {searchOpen ? <X aria-hidden className="size-5" /> : <Search aria-hidden className="size-5" />}
          </button>
          <Link
            aria-label={user ? `My account (${user.name})` : 'Log in'}
            className={iconButton}
            href={user ? '/account' : '/login'}
          >
            <User aria-hidden className="size-5" />
          </Link>
          <Link aria-label={`Cart, ${itemCount} items`} className={iconButton} href="/cart">
            <ShoppingCart aria-hidden className="size-5" />
            {itemCount > 0 ? (
              <span className="absolute top-1 right-1 inline-flex min-w-5 items-center justify-center rounded-full bg-brand-green-dark px-1 text-xs leading-5 font-semibold text-surface">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            ) : null}
          </Link>
        </div>
      </Container>

      {searchOpen ? (
        <div className="border-t border-line lg:hidden">
          <Container className="py-2">
            <SearchBox autoFocus onNavigate={() => setSearchOpen(null)} />
          </Container>
        </div>
      ) : null}
    </header>
  )
}
