import type { Metadata } from 'next'

import { PageShell } from '@/components/ecozynth/blocks'
import { ShopListing } from '@/components/ecozynth/ShopListing'

export const metadata: Metadata = { title: 'Aqua Shop' }

export default async function AquaShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>
}) {
  const { category, sort } = await searchParams
  return (
    <PageShell
      crumbs={[{ label: 'Aqua' }]}
      description="Lorem ipsum dolor sit amet: water softeners, filters, cartridges and accessories."
      title="Aqua products"
    >
      <ShopListing category={category} division="aqua" sort={sort} />
    </PageShell>
  )
}
