import type { Metadata } from 'next'

import { AccountShell } from '@/components/ecozynth/AccountShell'
import { ComingSoonButton } from '@/components/ecozynth/AccountWidgets'
import { Badge } from '@/components/ecozynth/ui/Badge'
import { Card } from '@/components/ecozynth/ui/layout'
import { defaultAddress } from '@/demo/data/orders'

export const metadata: Metadata = { title: 'Saved Addresses' }

const addresses = [
  defaultAddress,
  { ...defaultAddress, id: 'addr-2', fullName: 'Demo Office', line1: 'Unit 4, Lorem Tech Park', isDefault: false },
]

export default function AddressesPage() {
  return (
    <AccountShell current="/account/addresses" title="Saved addresses">
      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((a) => (
          <Card className="p-4" key={a.id}>
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold">{a.fullName}</p>
              {a.isDefault ? <Badge tone="green">Default</Badge> : null}
            </div>
            <p className="mt-1 text-sm text-muted">
              {a.line1}, {a.line2}, {a.city}, {a.state} {a.pincode}
              <br />
              Phone: {a.phone}
            </p>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <ComingSoonButton label="Add new address" message="Address editing is available in the final site" />
      </div>
    </AccountShell>
  )
}
