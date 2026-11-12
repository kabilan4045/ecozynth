import type { Metadata } from 'next'

import { BlockTitle, PageShell, TileGrid } from '@/components/ecozynth/blocks'
import { DummyForm } from '@/components/ecozynth/forms/DummyForm'
import { Card } from '@/components/ecozynth/ui/layout'

export const metadata: Metadata = { title: 'Bulk & Business Enquiry' }

const segments = ['Housing societies', 'Hotels', 'Hospitals', 'Schools & campuses', 'Offices', 'Industries']

export default function BulkEnquiryPage() {
  return (
    <PageShell
      crumbs={[{ label: 'Bulk enquiry' }]}
      description="Lorem ipsum dolor sit amet. Water and solar solutions for large projects."
      title="Bulk & business enquiry"
    >
      <TileGrid items={segments.map((s) => ({ title: s, text: 'Lorem ipsum dolor sit amet.', icon: 'building' as const }))} />
      <BlockTitle>Tell us about your project</BlockTitle>
      <Card className="p-4 sm:p-6">
        <DummyForm
          collection="bulk-enquiries"
          fields={[
            { name: 'organisation', label: 'Organisation name', type: 'text', required: true },
            { name: 'segment', label: 'Segment', type: 'select', required: true, options: segments },
            { name: 'requirement', label: 'Requirement', type: 'radio', required: true, options: ['Aqua', 'Solar', 'Both'] },
            { name: 'quantity', label: 'Approx. quantity or kW', type: 'text' },
            { name: 'location', label: 'Location', type: 'text', required: true },
            { name: 'timeline', label: 'Timeline', type: 'select', options: ['This month', '1–3 months', '3–6 months', 'Later'] },
            { name: 'name', label: 'Contact name', type: 'name', required: true },
            { name: 'phone', label: 'Mobile number', type: 'phone', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true, full: true },
            { name: 'message', label: 'Message', type: 'textarea' },
          ]}
          referencePrefix="BE"
          submitLabel="Send enquiry"
          successTitle="Enquiry received"
        />
      </Card>
    </PageShell>
  )
}
