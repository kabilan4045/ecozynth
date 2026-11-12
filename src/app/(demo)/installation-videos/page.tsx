import type { Metadata } from 'next'

import { PageShell, TileGrid } from '@/components/ecozynth/blocks'
import { getProduct } from '@/demo/data/products'
import { installationVideos } from '@/demo/data/videos'

export const metadata: Metadata = { title: 'Installation Videos' }

export default function InstallationVideosPage() {
  return (
    <PageShell
      crumbs={[{ label: 'Support' }, { label: 'Installation videos' }]}
      description="Lorem ipsum dolor sit amet. Step-by-step videos for every product (placeholders)."
      title="Installation videos"
    >
      <TileGrid
        items={installationVideos.map((v) => {
          const product = getProduct(v.productSlug)
          return {
            title: v.title,
            text: product ? `For: ${product.name}` : undefined,
            meta: `${v.category} · ${v.duration}`,
            icon: 'video' as const,
            tone: product?.division,
            href: product ? `/product/${product.slug}` : undefined,
          }
        })}
        withImage
      />
    </PageShell>
  )
}
