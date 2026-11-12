import type { Metadata } from 'next'
import Link from 'next/link'

import { AccountShell } from '@/components/ecozynth/AccountShell'
import { statusTone } from '@/components/ecozynth/OrderTimeline'
import { Badge } from '@/components/ecozynth/ui/Badge'
import { Card } from '@/components/ecozynth/ui/layout'
import { mockOrders } from '@/demo/data/orders'
import { formatDate, formatINR } from '@/demo/format'

export const metadata: Metadata = { title: 'My Orders' }

export default function OrdersPage() {
  return (
    <AccountShell current="/account/orders" title="My orders">
      {/* Cards on mobile */}
      <ul className="space-y-3 md:hidden">
        {mockOrders.map((order) => (
          <li key={order.id}>
            <Link href={`/account/orders/${order.id}`}>
              <Card className="p-4 hover:border-brand-slate">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">#{order.id}</span>
                  <Badge tone={statusTone[order.status]}>{order.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {formatDate(order.placedOn)} · {order.items.length} item(s) · {formatINR(order.total)}
                </p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
      {/* Table on desktop */}
      <div className="hidden overflow-x-auto rounded-[var(--radius-card)] border border-line md:block">
        <table className="w-full text-sm">
          <thead className="bg-surface-alt text-left text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr className="border-t border-line" key={order.id}>
                <td className="px-4 py-3">
                  <Link className="font-medium text-brand-green-dark hover:underline" href={`/account/orders/${order.id}`}>
                    #{order.id}
                  </Link>
                </td>
                <td className="px-4 py-3">{formatDate(order.placedOn)}</td>
                <td className="px-4 py-3">{order.items.length}</td>
                <td className="px-4 py-3">{formatINR(order.total)}</td>
                <td className="px-4 py-3">
                  <Badge tone={statusTone[order.status]}>{order.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AccountShell>
  )
}
