import type { Metadata } from 'next'
import Link from 'next/link'

import { PageShell, TileGrid } from '@/components/ecozynth/blocks'
import { SearchBox } from '@/components/ecozynth/layout/SearchBox'
import { ProductGrid } from '@/components/ecozynth/ShopListing'
import { blogPosts } from '@/demo/data/blog'
import { formatDate } from '@/demo/format'
import { searchProducts } from '@/demo/search'

export const metadata: Metadata = { title: 'Search' }

const popular = ['shower filter', 'softener', 'solar kit', 'cartridge', 'inverter']

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = ((await searchParams).q ?? '').trim()
  const productResults = q ? searchProducts(q) : []
  const articleResults = q
    ? blogPosts.filter((p) => `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q.toLowerCase()))
    : []

  return (
    <PageShell crumbs={[{ label: 'Search' }]} title={q ? `Results for “${q}”` : 'Search'}>
      <SearchBox className="mb-6 max-w-xl" initialQuery={q} key={q} />

      {!q || (productResults.length === 0 && articleResults.length === 0) ? (
        <div>
          {q ? <p className="mb-3 font-medium">No results for “{q}”. Try one of these:</p> : <p className="mb-3 font-medium">Popular searches</p>}
          <ul className="flex flex-wrap gap-2">
            {popular.map((term) => (
              <li key={term}>
                <Link
                  className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm hover:bg-surface-hover"
                  href={`/search?q=${encodeURIComponent(term)}`}
                >
                  {term}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <h2 className="mb-4 text-lg font-semibold">Products ({productResults.length})</h2>
          {productResults.length ? <ProductGrid products={productResults} /> : <p className="text-muted">No products found.</p>}
          <h2 className="mt-10 mb-4 text-lg font-semibold">Articles ({articleResults.length})</h2>
          {articleResults.length ? (
            <TileGrid
              items={articleResults.map((p) => ({
                title: p.title,
                text: p.excerpt,
                meta: formatDate(p.date),
                href: `/blog/${p.slug}`,
                icon: 'file' as const,
              }))}
            />
          ) : (
            <p className="text-muted">No articles found.</p>
          )}
        </>
      )}
    </PageShell>
  )
}
