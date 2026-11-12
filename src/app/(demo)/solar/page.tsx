import type { Metadata } from 'next'

import { PageShell } from '@/components/ecozynth/blocks'
import { ShopListing } from '@/components/ecozynth/ShopListing'
import { ButtonLink } from '@/components/ecozynth/ui/Button'
import { Card } from '@/components/ecozynth/ui/layout'

export const metadata: Metadata = { title: 'Solar Shop' }

export default async function SolarShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>
}) {
  const { category, sort } = await searchParams
  return (
    <PageShell
      crumbs={[{ label: 'Solar' }]}
      description="Lorem ipsum dolor sit amet: rooftop solar kits, inverters, panels and accessories."
      title="Solar products"
    >
      <Card className="mb-6 flex flex-col gap-3 bg-solar-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium">Not sure what size you need? Lorem ipsum dolor sit amet.</p>
        <div className="flex flex-wrap gap-2">
          <ButtonLink href="/solar-calculator" size="sm">
            Solar calculator
          </ButtonLink>
          <ButtonLink href="/solar-quote" size="sm" variant="outline">
            Get a quote
          </ButtonLink>
        </div>
      </Card>
      <ShopListing category={category} division="solar" sort={sort} />
    </PageShell>
  )
}
