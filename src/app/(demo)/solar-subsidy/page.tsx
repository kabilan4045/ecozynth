import type { Metadata } from 'next'

import { BlockTitle, CheckList, LoremSection, Note, PageShell, Steps } from '@/components/ecozynth/blocks'
import { Accordion } from '@/components/ecozynth/ui/Accordion'
import { ButtonLink } from '@/components/ecozynth/ui/Button'
import { LOREM } from '@/demo/data/lorem'
import { formatINR } from '@/demo/format'

export const metadata: Metadata = { title: 'Solar Subsidy' }

const table = [
  ['1 kW', 30000],
  ['2 kW', 60000],
  ['3 kW and above', 78000],
] as const

export default function SolarSubsidyPage() {
  return (
    <PageShell crumbs={[{ label: 'Solar', href: '/solar' }, { label: 'Solar subsidy' }]} title="Solar subsidy information">
      <Note>Placeholder information, to be confirmed with Ecozynth.</Note>
      <LoremSection image="sun" title="Overview" tone="solar" />
      <BlockTitle>Who is eligible</BlockTitle>
      <CheckList items={['Lorem ipsum homeowner', 'Dolor sit grid connection', 'Amet roof ownership', 'Consectetur approved vendor']} />
      <BlockTitle>Subsidy by system size (placeholder)</BlockTitle>
      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line">
        <table className="w-full text-sm">
          <thead className="bg-surface-alt text-left text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">System size</th>
              <th className="px-4 py-3 font-medium">Subsidy (placeholder)</th>
            </tr>
          </thead>
          <tbody>
            {table.map(([size, amount]) => (
              <tr className="border-t border-line" key={size}>
                <td className="px-4 py-3">{size}</td>
                <td className="px-4 py-3">{formatINR(amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BlockTitle>How to apply</BlockTitle>
      <Steps steps={['Register online', 'Site survey', 'Installation', 'Subsidy credited']} />
      <BlockTitle>Documents required</BlockTitle>
      <CheckList items={['Electricity bill', 'Aadhaar card', 'Property document', 'Bank details']} />
      <BlockTitle>FAQ</BlockTitle>
      <Accordion
        items={['How long does the subsidy take?', 'Can businesses apply?', 'Is the subsidy paid to me directly?'].map((q) => ({
          id: q,
          title: q,
          content: LOREM,
        }))}
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/solar-calculator">Try the calculator</ButtonLink>
        <ButtonLink href="/solar-quote" variant="outline">
          Get a quote
        </ButtonLink>
      </div>
    </PageShell>
  )
}
