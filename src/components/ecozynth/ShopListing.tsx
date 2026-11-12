import Link from 'next/link'

import { getCategoriesByDivision } from '@/demo/data/categories'
import { getProductsByDivision } from '@/demo/data/products'
import type { Division, Product } from '@/demo/data/types'

import { ProductCard } from './ProductCard'
import { cn } from './ui/cn'

export const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'newest', label: 'Newest' },
] as const

export const sortProducts = (list: Product[], sort: string): Product[] => {
  const sorted = [...list]
  if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
  else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
  else if (sort === 'rating') sorted.sort((a, b) => b.rating - a.rating)
  else if (sort === 'newest') sorted.sort((a, b) => b.addedOn.localeCompare(a.addedOn))
  else sorted.sort((a, b) => a.featuredRank - b.featuredRank)
  return sorted
}

/** Responsive product grid: 2 columns mobile, 3 tablet, 4 desktop. */
export const ProductGrid = ({ products }: { products: Product[] }) => (
  <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
    {products.map((product) => (
      <li key={product.id}>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
)

const chip = (active: boolean) =>
  cn(
    'inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm font-medium whitespace-nowrap',
    active
      ? 'border-brand-green-dark bg-brand-green-light text-brand-green-dark'
      : 'border-line bg-surface text-ink hover:bg-surface-hover',
  )

/** Category chips + sort links + grid. State lives in the URL (?category=&sort=). */
export const ShopListing = ({
  division,
  category,
  sort,
}: {
  division: Division
  category?: string
  sort?: string
}) => {
  const base = `/${division}`
  const categories = getCategoriesByDivision(division)
  const activeSort = SORTS.some((s) => s.value === sort) ? (sort as string) : 'featured'
  const list = sortProducts(
    getProductsByDivision(division).filter((p) => !category || p.category === category),
    activeSort,
  )
  const href = (next: { category?: string; sort?: string }) => {
    const params = new URLSearchParams()
    const c = 'category' in next ? next.category : category
    const s = 'sort' in next ? next.sort : activeSort
    if (c) params.set('category', c)
    if (s && s !== 'featured') params.set('sort', s)
    const query = params.toString()
    return query ? `${base}?${query}` : base
  }

  return (
    <div>
      <nav aria-label="Categories" className="scrollbar-none -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
        <Link aria-current={!category ? 'page' : undefined} className={chip(!category)} href={href({ category: undefined })}>
          All
        </Link>
        {categories.map((c) => (
          <Link
            aria-current={category === c.slug ? 'page' : undefined}
            className={chip(category === c.slug)}
            href={href({ category: c.slug })}
            key={c.slug}
          >
            {c.name}
          </Link>
        ))}
      </nav>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-y border-line py-3">
        <p className="text-sm text-muted" role="status">
          {list.length} {list.length === 1 ? 'product' : 'products'}
        </p>
        <div className="flex flex-wrap items-center gap-1 text-sm">
          <span className="text-muted">Sort:</span>
          {SORTS.map((s) => (
            <Link
              aria-current={activeSort === s.value ? 'true' : undefined}
              className={cn(
                'inline-flex min-h-11 items-center rounded-[var(--radius-ui)] px-2 hover:bg-surface-hover',
                activeSort === s.value && 'font-semibold text-brand-green-dark',
              )}
              href={href({ sort: s.value })}
              key={s.value}
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>

      {list.length ? (
        <ProductGrid products={list} />
      ) : (
        <div className="rounded-[var(--radius-card)] border border-line p-8 text-center">
          <p className="font-medium">No products in this category yet.</p>
          <Link className="mt-2 inline-flex min-h-11 items-center text-brand-green-dark underline" href={base}>
            Clear filters
          </Link>
        </div>
      )}
    </div>
  )
}
