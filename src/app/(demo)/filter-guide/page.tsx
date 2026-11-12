import type { Metadata } from 'next'
import Link from 'next/link'

import { BlockTitle, PageShell } from '@/components/ecozynth/blocks'
import { DummyForm } from '@/components/ecozynth/forms/DummyForm'
import { ProductGrid } from '@/components/ecozynth/ShopListing'
import { Card } from '@/components/ecozynth/ui/layout'
import { getProduct } from '@/demo/data/products'
import type { Product } from '@/demo/data/types'

export const metadata: Metadata = { title: 'Which Filter Do I Need?' }

export default function FilterGuidePage() {
  const recommended = ['shower-pure-15', 'ez-soft-pro-whole-house-softener', 'wash-guard-washing-machine-filter']
    .map(getProduct)
    .filter((p): p is Product => Boolean(p))

  return (
    <PageShell
      crumbs={[{ label: 'Aqua', href: '/aqua' }, { label: 'Filter guide' }]}
      description="Lorem ipsum dolor sit amet. Answer five quick questions to find the right filter."
      title="Which filter do I need?"
    >
      <Card className="p-4 sm:p-6">
        <DummyForm
          fields={[
            { name: 'property', label: '1. Property type', type: 'radio', required: true, options: ['Apartment', 'Independent house', 'Villa', 'Office'] },
            { name: 'source', label: '2. Water source', type: 'radio', required: true, options: ['Borewell', 'Municipal', 'Tanker', 'Mixed'] },
            { name: 'problem', label: '3. Main problem', type: 'radio', required: true, options: ['Hair fall / dry skin', 'Scaling', 'Bad taste', 'Not sure'] },
            { name: 'where', label: '4. Where do you need it?', type: 'radio', required: true, options: ['Whole house', 'Bathroom', 'Kitchen', 'Appliances'] },
            { name: 'budget', label: '5. Budget', type: 'radio', required: true, options: ['Under ₹2,000', '₹2,000–₹10,000', '₹10,000–₹25,000', 'Above ₹25,000'] },
          ]}
          submitLabel="Show my recommendation"
          successText="Lorem ipsum: based on your answers, see the recommended products below."
          successTitle="Your recommendation is ready"
        />
      </Card>
      <BlockTitle>Recommended for you (example)</BlockTitle>
      <ProductGrid products={recommended} />
      <p className="mt-6 text-muted">
        Not sure?{' '}
        <Link className="text-brand-green-dark underline" href="/water-test">
          Book a free water test
        </Link>
      </p>
    </PageShell>
  )
}
