import type { Metadata } from 'next'

import { AccountShell } from '@/components/ecozynth/AccountShell'
import { Badge } from '@/components/ecozynth/ui/Badge'
import { ButtonLink } from '@/components/ecozynth/ui/Button'
import { Card } from '@/components/ecozynth/ui/layout'

export const metadata: Metadata = { title: 'My Warranties' }

const warranties = [
  { id: 'WR-284113', product: 'EZ Soft Pro Whole-House Softener', until: '2028-03-14', active: true },
  { id: 'WR-190552', product: 'ShowerPure 15-Stage Shower Filter', until: '2026-05-05', active: false },
]

export default function WarrantiesPage() {
  return (
    <AccountShell current="/account/warranties" title="My warranties">
      <ul className="space-y-3">
        {warranties.map((w) => (
          <li key={w.id}>
            <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <p className="font-semibold">{w.product}</p>
                <p className="text-sm text-muted">
                  {w.id} · Covered until {w.until}
                </p>
              </div>
              <Badge tone={w.active ? 'success' : 'neutral'}>{w.active ? 'Active' : 'Expired'}</Badge>
            </Card>
          </li>
        ))}
      </ul>
      <ButtonLink className="mt-6" href="/warranty-registration">
        Register a product
      </ButtonLink>
    </AccountShell>
  )
}
