import type { Metadata } from 'next'

import { BlockTitle, PageShell, TileGrid } from '@/components/ecozynth/blocks'
import { blogPosts } from '@/demo/data/blog'
import { formatDate } from '@/demo/format'

export const metadata: Metadata = { title: 'Blog' }

export default function BlogPage() {
  const [featured, ...rest] = blogPosts
  const toTile = (p: (typeof blogPosts)[number]) => ({
    title: p.title,
    text: p.excerpt,
    meta: `${p.category} · ${formatDate(p.date)} · ${p.readTime}`,
    href: `/blog/${p.slug}`,
    icon: 'file' as const,
  })

  return (
    <PageShell crumbs={[{ label: 'Blog' }]} description="Lorem ipsum dolor sit amet. Tips on water and solar." title="Blog">
      <BlockTitle>Featured</BlockTitle>
      <TileGrid columns={2} items={[toTile(featured)]} withImage />
      <BlockTitle>Latest articles</BlockTitle>
      <TileGrid items={rest.map(toTile)} withImage />
    </PageShell>
  )
}
