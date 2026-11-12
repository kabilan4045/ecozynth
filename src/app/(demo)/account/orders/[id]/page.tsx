import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { AccountShell } from '@/components/ecozynth/AccountShell'
import { ComingSoonButton } from '@/components/ecozynth/AccountWidgets'
import { OrderTimeline, statusTone } from '@/components/ecozynth/OrderTimeline'
import { Badge } from '@/components/ecozynth/ui/Badge'
import { ButtonLink } from '@/components/ecozynth/ui/Button'
import { Card } from '@/components/ecozynth/ui/layout'
import { getMockOrder } from '@/demo/data/orders'
import { formatDate, formatINR } from '@/demo/format'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Order ${(await params).id}` }
}

export default async function OrderDetailPage({ params }: Props) {
  const order = getMockOrder((await params).id)
  if (!order) notFound()

  return (
    <AccountShell
      crumbs={[{ label: 'Orders', href: '/account/orders' }, { label: `#${order.id}` }]}
      current="/account/orders"
      title={`Order #${order.id}`}
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Badge tone={statusTone[order.status]}>{order.status}</Badge>
        <span className="text-sm text-muted">Placed on {formatDate(order.placedOn)}</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-4 sm:p-6">
          <h2 className="mb-4 font-semibold">Status</h2>
          <OrderTimeline order={order} />
        </Card>
        <div className="space-y-6">
          <Card className="p-4 sm:p-6">
            <h2 className="mb-3 font-semibold">Items</h2>
            <ul className="divide-y divide-line text-sm">
              {order.items.map((item) => (
                <li className="flex justify-between gap-3 py-2" key={item.productSlug}>
                  <span>
                    {item.name}
                    {item.variant ? ` (${item.variant})` : ''} × {item.quantity}
                  </span>
                  <span className="shrink-0">{formatINR(item.price * item.quantity)}</span>
                </li>
              ))}
              <li className="flex justify-between py-2 font-semibold">
                <span>Total</span>
                <span>{formatINR(order.total)}</span>
              </li>
            </ul>
          </Card>
          <Card className="p-4 sm:p-6">
            <h2 className="mb-2 font-semibold">Delivery address</h2>
            <p className="text-sm text-muted">
              {order.address.fullName}, {order.address.line1}, {order.address.city}, {order.address.state} {order.address.pincode}
            </p>
          </Card>
          <div className="flex flex-wrap gap-3">
            <ComingSoonButton label="Download invoice" />
            <ButtonLink href="/service-request" variant="ghost">
              Need help?
            </ButtonLink>
          </div>
        </div>
      </div>
    </AccountShell>
  )
}
