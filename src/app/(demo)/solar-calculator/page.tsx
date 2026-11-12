import type { Metadata } from 'next'

import { BlockTitle, PageShell } from '@/components/ecozynth/blocks'
import { ProductGrid } from '@/components/ecozynth/ShopListing'
import { SolarCalculatorDemo } from '@/components/ecozynth/SolarCalculatorDemo'
import { solarProducts } from '@/demo/data/products'

export const metadata: Metadata = { title: 'Solar Savings Calculator' }

export default function SolarCalculatorPage() {
  return (
    <PageShell
      crumbs={[{ label: 'Solar', href: '/solar' }, { label: 'Solar calculator' }]}
      description="Lorem ipsum dolor sit amet. Move the slider to see an illustrative system size and savings."
      title="Solar savings calculator"
    >
      <SolarCalculatorDemo />
      <BlockTitle>Recommended kits</BlockTitle>
      <ProductGrid products={solarProducts.filter((p) => p.requiresSurvey).slice(0, 4)} />
    </PageShell>
  )
}
