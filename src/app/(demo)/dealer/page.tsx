import type { Metadata } from 'next'

import { BlockTitle, CheckList, PageShell, Steps, TileGrid } from '@/components/ecozynth/blocks'
import { DummyForm } from '@/components/ecozynth/forms/DummyForm'
import { Card } from '@/components/ecozynth/ui/layout'

export const metadata: Metadata = { title: 'Become a Dealer' }

export default function DealerPage() {
  return (
    <PageShell
      crumbs={[{ label: 'Become a dealer' }]}
      description="Lorem ipsum dolor sit amet. Partner with Ecozynth in your city."
      title="Become a dealer / distributor"
    >
      <TileGrid
        items={[
          { title: 'Lorem ipsum margins', text: 'Dolor sit amet consectetur.', icon: 'badge' },
          { title: 'Lorem ipsum training', text: 'Dolor sit amet consectetur.', icon: 'wrench' },
          { title: 'Lorem ipsum marketing', text: 'Dolor sit amet consectetur.', icon: 'image' },
          { title: 'Lorem ipsum leads', text: 'Dolor sit amet consectetur.', icon: 'user' },
          { title: 'Lorem ipsum support', text: 'Dolor sit amet consectetur.', icon: 'headset' },
          { title: 'Lorem ipsum logistics', text: 'Dolor sit amet consectetur.', icon: 'truck' },
        ]}
      />
      <BlockTitle>How it works</BlockTitle>
      <Steps steps={['Apply online', 'Discovery call', 'Agreement', 'Start selling']} />
      <BlockTitle>Requirements</BlockTitle>
      <CheckList items={['Lorem ipsum showroom or office', 'Dolor sit GST registration', 'Amet local sales team', 'Consectetur service capability']} />
      <BlockTitle>Apply now</BlockTitle>
      <Card className="p-4 sm:p-6">
        <DummyForm
          collection="dealer-applications"
          fields={[
            { name: 'business', label: 'Business name', type: 'text', required: true },
            { name: 'contact', label: 'Contact person', type: 'name', required: true },
            { name: 'phone', label: 'Mobile number', type: 'phone', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'city', label: 'City', type: 'text', required: true },
            { name: 'state', label: 'State', type: 'state', required: true },
            { name: 'gstin', label: 'GSTIN', type: 'gstin' },
            { name: 'businessType', label: 'Business type', type: 'select', options: ['Retailer', 'Distributor', 'Installer', 'Other'], required: true },
            { name: 'interest', label: 'Product interest', type: 'radio', required: true, options: ['Aqua', 'Solar', 'Both'] },
            { name: 'message', label: 'Message', type: 'textarea' },
          ]}
          referencePrefix="DL"
          submitLabel="Submit application"
          successTitle="Application received"
        />
      </Card>
    </PageShell>
  )
}
