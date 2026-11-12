'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useId, useState, type FormEvent, type KeyboardEvent } from 'react'

import { getCategory } from '@/demo/data/categories'
import { formatINR } from '@/demo/format'
import { searchProducts } from '@/demo/search'

import { inputClasses } from '../forms/Fields'
import { cn } from '../ui/cn'

const MAX_SUGGESTIONS = 5

/**
 * Search input with up to 5 instant product suggestions (ARIA combobox).
 * Submitting goes to /search?q=…
 */
export const SearchBox = ({
  className,
  autoFocus,
  onNavigate,
  initialQuery = '',
}: {
  className?: string
  autoFocus?: boolean
  /** Called after navigating (e.g. to close the mobile search bar). */
  onNavigate?: () => void
  initialQuery?: string
}) => {
  const router = useRouter()
  const listId = useId()
  const [query, setQuery] = useState(initialQuery)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)

  const suggestions = searchProducts(query).slice(0, MAX_SUGGESTIONS)
  const showList = open && query.trim().length > 0

  const go = (href: string) => {
    setOpen(false)
    setActive(-1)
    router.push(href)
    onNavigate?.()
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (active >= 0 && suggestions[active]) {
      go(`/product/${suggestions[active].slug}`)
      return
    }
    go(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpen(true)
      setActive((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((i) => Math.max(i - 1, -1))
    } else if (event.key === 'Escape') {
      setOpen(false)
      setActive(-1)
    }
  }

  return (
    <form className={cn('relative', className)} onSubmit={onSubmit} role="search">
      <label className="sr-only" htmlFor={`${listId}-input`}>
        Search products
      </label>
      <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
      <input
        aria-activedescendant={active >= 0 ? `${listId}-opt-${active}` : undefined}
        aria-autocomplete="list"
        aria-controls={listId}
        aria-expanded={showList}
        autoComplete="off"
        autoFocus={autoFocus}
        className={cn(inputClasses, 'pl-9')}
        enterKeyHint="search"
        id={`${listId}-input`}
        onBlur={() => setOpen(false)}
        onChange={(event) => {
          setQuery(event.target.value)
          setOpen(true)
          setActive(-1)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Search products…"
        role="combobox"
        type="search"
        value={query}
      />
      {showList ? (
        <ul
          className="absolute inset-x-0 top-full z-50 mt-1 overflow-hidden rounded-[var(--radius-ui)] border border-line bg-surface shadow-sm"
          id={listId}
          role="listbox"
        >
          {suggestions.length === 0 ? (
            <li className="px-3 py-3 text-sm text-muted">No matching products. Press Enter to search all.</li>
          ) : (
            suggestions.map((product, index) => (
              <li aria-selected={index === active} id={`${listId}-opt-${index}`} key={product.id} role="option">
                <Link
                  className={cn(
                    'flex min-h-11 items-center justify-between gap-3 px-3 py-2 text-sm hover:bg-surface-hover',
                    index === active && 'bg-surface-hover',
                  )}
                  href={`/product/${product.slug}`}
                  onClick={() => go(`/product/${product.slug}`)}
                  // Keep focus in the input so onBlur doesn't close the list before the click.
                  onMouseDown={(event) => event.preventDefault()}
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-ink">{product.name}</span>
                    <span className="block truncate text-xs text-muted">{getCategory(product.category)?.name}</span>
                  </span>
                  <span className="shrink-0 font-medium">{formatINR(product.price)}</span>
                </Link>
              </li>
            ))
          )}
          <li className="border-t border-line">
            <button
              className="flex min-h-11 w-full items-center gap-2 px-3 text-left text-sm font-medium text-brand-green-dark hover:bg-surface-hover"
              onMouseDown={(event) => event.preventDefault()}
              type="submit"
            >
              <Search aria-hidden className="size-4" />
              See all results for “{query.trim()}”
            </button>
          </li>
        </ul>
      ) : null}
    </form>
  )
}
