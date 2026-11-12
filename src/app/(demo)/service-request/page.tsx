import type { Metadata } from 'next'

import { BlockTitle, PageShell } from '@/components/ecozynth/blocks'
import { DummyForm } from '@/components/ecozynth/forms/DummyForm'
import { Card } from '@/components/ecozynth/ui/layout'
import { products } from '@/demo/data/products'
import { formatINR } from '@/demo/format'

export const metadata: Metadata = { title: 'Service / AMC Request' }

const plans = [
  { name: 'Basic AMC', price: 1499, text: 'Lorem ipsum 1 visit a year' },
  { name: 'Standard AMC', price: 2999, text: 'Lorem ipsum 2 visits + cartridge' },
  { name: 'Premium AMC', price: 4999, text: 'Lorem ipsum 4 visits + all parts' },
]

export default function ServiceRequestPage() {
  return (
    <PageShell
      crumbs={[{ label: 'Support' }, { label: 'Service request' }]}
      description="Lorem ipsum dolor sit amet. Book installation, repair or an AMC visit."
      title="Service / AMC request"
    >
      <ul className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <li key={plan.name}>
            <Card className="h-full p-4">
              <h2 className="font-semibold">{plan.name}</h2>
              <p className="mt-1 text-2xl font-semibold">
                {formatINR(plan.price)}
                <span className="text-sm font-normal text-muted"> / year</span>
              </p>
              <p className="mt-2 text-sm text-muted">{plan.text}</p>
            </Card>
          </li>
        ))}
      </ul>
      <BlockTitle>Raise a request</BlockTitle>
      <Card className="p-4 sm:p-6">
        <DummyForm
          collection="service-requests"
          fields={[
            { name: 'type', label: 'Request type', type: 'select', required: true, options: ['Installation', 'Repair', 'AMC', 'Cartridge replacement', 'Solar maintenance'] },
            { name: 'product', label: 'Product', type: 'select', required: true, options: products.map((p) => p.name) },
            { name: 'orderId', label: 'Order ID or warranty ID', type: 'text' },
            { name: 'date', label: 'Preferred date', type: 'date', required: true },
            { name: 'issue', label: 'Describe the issue', type: 'textarea', required: true },
            { name: 'photo', label: 'Photo', type: 'file' },
            { name: 'address', label: 'Address', type: 'text', required: true, full: true },
            { name: 'pincode', label: 'Pincode', type: 'pincode', required: true },
            { name: 'name', label: 'Full name', type: 'name', required: true },
            { name: 'phone', label: 'Mobile number', type: 'phone', required: true },
          ]}
          referencePrefix="SR"
          submitLabel="Submit request"
          successTitle="Service request created"
        />
      </Card>
    </PageShell>
  )
}
