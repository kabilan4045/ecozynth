import type { Metadata } from 'next'

import { BlockTitle, LoremSection, PageShell, StatStrip, Steps, TileGrid } from '@/components/ecozynth/blocks'
import { ButtonLink } from '@/components/ecozynth/ui/Button'

export const metadata: Metadata = { title: 'About Us' }

export default function AboutPage() {
  return (
    <PageShell crumbs={[{ label: 'About' }]} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." title="About Ecozynth">
      <LoremSection image="image" paragraphs={3} title="Our story" />
      <div className="grid gap-4 md:grid-cols-2">
        <LoremSection level="h3" paragraphs={1} title="Mission" />
        <LoremSection level="h3" paragraphs={1} title="Vision" />
      </div>
      <BlockTitle>Our values</BlockTitle>
      <TileGrid
        columns={4}
        items={['Quality', 'Honesty', 'Service', 'Sustainability'].map((v) => ({ title: v, text: 'Lorem ipsum dolor sit amet.', icon: 'badge' as const }))}
      />
      <div className="mt-10">
        <StatStrip
          stats={[
            { value: '00,000+', label: 'Happy customers' },
            { value: '000+', label: 'Solar installs' },
            { value: '00', label: 'Cities' },
            { value: '00', label: 'Years' },
          ]}
        />
      </div>
      <BlockTitle>Our journey</BlockTitle>
      <Steps steps={['20XX · Founded', '20XX · First softener', '20XX · Solar launch', '20XX · 10,000 customers']} />
      <BlockTitle>Team</BlockTitle>
      <TileGrid
        columns={4}
        items={['Lorem Ipsum', 'Dolor Sit', 'Amet Consectetur', 'Adipiscing Elit'].map((n) => ({
          title: n,
          text: 'Role placeholder',
          icon: 'user' as const,
        }))}
        withImage
      />
      <BlockTitle>Certified quality</BlockTitle>
      <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href="/certificates" variant="outline">
          View certificates
        </ButtonLink>
        <ButtonLink href="/aqua">Shop Aqua</ButtonLink>
        <ButtonLink href="/solar" variant="secondary">
          Shop Solar
        </ButtonLink>
      </div>
    </PageShell>
  )
}
