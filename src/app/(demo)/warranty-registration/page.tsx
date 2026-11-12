import type { Metadata } from 'next'
import Link from 'next/link'

import { PageShell } from '@/components/ecozynth/blocks'
import { DummyForm } from '@/components/ecozynth/forms/DummyForm'
import { Card } from '@/components/ecozynth/ui/layout'
import { products } from '@/demo/data/products'

export const metadata: Metadata = { title: 'Warranty Registration' }

export default function WarrantyRegistrationPage() {
  return (
    <PageShell
      crumbs={[{ label: 'Support' }, { label: 'Warranty registration' }]}
      description="Lorem ipsum dolor sit amet. Register your product to activate the warranty."
      title="Warranty registration"
    >
      <Card className="p-4 sm:p-6">
        <DummyForm
          collection="warranty-registrations"
          fields={[
            { name: 'product', label: 'Product', type: 'select', required: true, options: products.map((p) => p.name), full: true },
            { name: 'serial', label: 'Serial number', type: 'text', required: true },
            { name: 'purchaseDate', label: 'Purchase date', type: 'date', required: true },
            { name: 'from', label: 'Purchased from', type: 'select', required: true, options: ['Ecozynth website', 'Dealer', 'Marketplace'] },
            { name: 'invoice', label: 'Invoice', type: 'file', hint: 'PDF, JPG or PNG, up to 5 MB' },
            { name: 'name', label: 'Full name', type: 'name', required: true },
            { name: 'phone', label: 'Mobile number', type: 'phone', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'pincode', label: 'Pincode', type: 'pincode', required: true },
          ]}
          referencePrefix="WR"
          submitLabel="Register warranty"
          successTitle="Warranty registered"
        />
      </Card>
      <p className="mt-6 text-sm text-muted">
        Read the{' '}
        <Link className="text-brand-green-dark underline" href="/policies/warranty-policy">
          warranty policy
        </Link>
        .
      </p>
    </PageShell>
  )
}
