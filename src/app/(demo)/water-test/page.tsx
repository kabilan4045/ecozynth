import type { Metadata } from 'next'

import { BlockTitle, PageShell, TileGrid } from '@/components/ecozynth/blocks'
import { DummyForm } from '@/components/ecozynth/forms/DummyForm'
import { Card } from '@/components/ecozynth/ui/layout'

export const metadata: Metadata = { title: 'Free Water Test' }

export default function WaterTestPage() {
  return (
    <PageShell
      crumbs={[{ label: 'Aqua', href: '/aqua' }, { label: 'Free water test' }]}
      description="Lorem ipsum dolor sit amet. Our expert tests your water at home, free of charge."
      title="Book a free water test"
    >
      <TileGrid
        columns={4}
        items={['Hardness', 'TDS', 'pH', 'Iron'].map((t) => ({
          title: t,
          text: 'Lorem ipsum dolor sit amet.',
          icon: 'tester' as const,
          tone: 'aqua' as const,
        }))}
      />
      <BlockTitle>Your details</BlockTitle>
      <Card className="p-4 sm:p-6">
        <DummyForm
          collection="water-test-requests"
          fields={[
            { name: 'name', label: 'Full name', type: 'name', required: true },
            { name: 'phone', label: 'Mobile number', type: 'phone', required: true },
            { name: 'pincode', label: 'Pincode', type: 'pincode', required: true },
            { name: 'city', label: 'City', type: 'text', required: true },
            { name: 'source', label: 'Water source', type: 'radio', required: true, options: ['Borewell', 'Municipal', 'Tanker', 'Mixed'] },
            { name: 'problems', label: 'Problems you notice', type: 'checkboxes', options: ['Hair fall', 'Dry skin', 'White scaling', 'Stains', 'Bad taste/smell', 'Appliance damage'] },
            { name: 'date', label: 'Preferred date', type: 'date', required: true },
            { name: 'slot', label: 'Time slot', type: 'select', options: ['9–12 am', '12–3 pm', '3–6 pm'], required: true },
          ]}
          referencePrefix="WT"
          submitLabel="Book free test"
          successTitle="Water test booked"
        />
      </Card>
    </PageShell>
  )
}
