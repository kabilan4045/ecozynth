import type { Metadata } from 'next'

import { BlockTitle, PageShell, Steps } from '@/components/ecozynth/blocks'
import { DummyForm } from '@/components/ecozynth/forms/DummyForm'
import { Card } from '@/components/ecozynth/ui/layout'
import { getProduct } from '@/demo/data/products'

export const metadata: Metadata = { title: 'Get a Quote' }

export default async function SolarQuotePage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const product = getProduct((await searchParams).product ?? '')
  return (
    <PageShell
      crumbs={[{ label: 'Solar', href: '/solar' }, { label: 'Get a quote' }]}
      description="Lorem ipsum dolor sit amet. Book a free site survey and get an exact quote."
      title="Get a quote / book a free site survey"
    >
      <Card className="p-4 sm:p-6">
        <DummyForm
          collection="solar-leads"
          fields={[
            { name: 'propertyType', label: 'Property type', type: 'radio', required: true, options: ['Home', 'Business'] },
            { name: 'interest', label: 'System interest', type: 'text', defaultValue: product?.name ?? '', full: true },
            { name: 'pincode', label: 'Pincode', type: 'pincode', required: true },
            { name: 'city', label: 'City', type: 'text', required: true },
            { name: 'state', label: 'State', type: 'state', required: true },
            { name: 'bill', label: 'Monthly bill (₹)', type: 'text', required: true },
            { name: 'roofType', label: 'Roof type', type: 'select', options: ['RCC', 'Metal sheet', 'Tiled', 'Other'], required: true },
            { name: 'roofArea', label: 'Roof area (sq ft)', type: 'text' },
            { name: 'date', label: 'Preferred survey date', type: 'date', required: true },
            { name: 'slot', label: 'Time slot', type: 'select', options: ['9–12 am', '12–3 pm', '3–6 pm'], required: true },
            { name: 'name', label: 'Full name', type: 'name', required: true },
            { name: 'phone', label: 'Mobile number', type: 'phone', required: true },
            { name: 'email', label: 'Email', type: 'email', full: true },
            { name: 'consent', label: 'I agree to be contacted about my enquiry', type: 'checkbox', required: true },
          ]}
          referencePrefix="SQ"
          submitLabel="Book free site survey"
          successText="Lorem ipsum: our solar expert will call you within 48 hours to confirm the survey."
          successTitle="Survey request received"
        />
      </Card>
      <BlockTitle>What happens next</BlockTitle>
      <Steps steps={['We call you', 'Free site survey', 'Exact quote', 'Installation']} />
    </PageShell>
  )
}
