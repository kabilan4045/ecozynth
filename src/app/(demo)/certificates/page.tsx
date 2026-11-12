import type { Metadata } from 'next'

import { ComingSoonButton } from '@/components/ecozynth/AccountWidgets'
import { BlockTitle, PageShell, TileGrid } from '@/components/ecozynth/blocks'
import { Card } from '@/components/ecozynth/ui/layout'
import { certificates, downloads } from '@/demo/data/certificates'

export const metadata: Metadata = { title: 'Certificates & Downloads' }

export default function CertificatesPage() {
  return (
    <PageShell
      crumbs={[{ label: 'Certificates & downloads' }]}
      description="Lorem ipsum dolor sit amet. Placeholder certificates and brochures."
      title="Certificates & downloads"
    >
      <TileGrid
        items={certificates.map((c) => ({ title: c.name, text: c.issuer, meta: `${c.type} · ${c.year}`, icon: 'file' as const }))}
        withImage
      />
      <BlockTitle>Downloads</BlockTitle>
      <ul className="grid gap-3 sm:grid-cols-2">
        {downloads.map((d) => (
          <li key={d.id}>
            <Card className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="font-semibold">{d.name}</p>
                <p className="text-sm text-muted">{d.size}</p>
              </div>
              <ComingSoonButton label="Download" />
            </Card>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
