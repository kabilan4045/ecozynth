import type { Metadata } from 'next'
import Link from 'next/link'

import { AccountShell } from '@/components/ecozynth/AccountShell'
import { AccountGreeting } from '@/components/ecozynth/AccountWidgets'
import { TileGrid } from '@/components/ecozynth/blocks'
import { Badge } from '@/components/ecozynth/ui/Badge'
import { Card } from '@/components/ecozynth/ui/layout'
import { mockOrders } from '@/demo/data/orders'
import { formatDate, formatINR } from '@/demo/format'

export const metadata: Metadata = { title: 'My Account' }

export default function AccountOverviewPage() {
  const recent = mockOrders[0]
  return (
    <AccountShell current="/account" title="My account">
      <AccountGreeting />
      <Card className="mt-4 p-4">
        <p className="text-sm text-muted">Most recent order</p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
          <Link className="font-semibold hover:underline" href={`/account/orders/${recent.id}`}>
            #{recent.id} · {formatDate(recent.placedOn)}
          </Link>
          <Badge tone="warning">{recent.status}</Badge>
        </div>
        <p className="mt-1 text-sm">{formatINR(recent.total)}</p>
      </Card>
      <h2 className="mt-8 mb-4 text-lg font-semibold">Quick links</h2>
      <TileGrid
        items={[
          { title: 'Orders', text: 'Lorem ipsum order history', icon: 'truck', href: '/account/orders' },
          { title: 'Addresses', text: 'Lorem ipsum saved addresses', icon: 'building', href: '/account/addresses' },
          { title: 'Warranties', text: 'Lorem ipsum registered products', icon: 'shield', href: '/account/warranties' },
          { title: 'Service requests', text: 'Lorem ipsum tickets', icon: 'wrench', href: '/account/service-requests' },
          { title: 'Profile', text: 'Lorem ipsum personal details', icon: 'user', href: '/account/profile' },
          { title: 'Track an order', text: 'Lorem ipsum delivery status', icon: 'truck', href: '/track-order' },
        ]}
      />
    </AccountShell>
  )
}
