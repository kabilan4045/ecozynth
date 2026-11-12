import type { AdminViewServerProps } from 'payload'
import type { Order } from '@/payload-types'
import { Gutter } from '@payloadcms/ui'
import {
  AlertTriangle,
  Clock,
  ImagePlus,
  IndianRupee,
  ListOrdered,
  Plus,
  ShoppingBag,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { formatINR } from '@/utilities/currencies'

import './index.scss'

const TIME_ZONE = 'Asia/Kolkata'
const LOW_STOCK_THRESHOLD = 5

/** Midnight (IST) today and on the 1st of this month, as ISO strings for queries. */
const getISTBoundaries = (now: Date) => {
  const [year, month, day] = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(now)
    .split('-')

  return {
    startOfToday: new Date(`${year}-${month}-${day}T00:00:00+05:30`).toISOString(),
    startOfMonth: new Date(`${year}-${month}-01T00:00:00+05:30`).toISOString(),
  }
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-IN', {
    timeZone: TIME_ZONE,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))

const customerLabel = (order: Order): string => {
  if (order.customer && typeof order.customer === 'object') {
    return order.customer.name || order.customer.email
  }
  return order.customerEmail || 'Guest'
}

type StatCardProps = {
  hint: string
  icon: React.ReactNode
  label: string
  tone?: 'default' | 'warning'
  value: string
}

const StatCard = ({ hint, icon, label, tone = 'default', value }: StatCardProps) => (
  <div className={`ecz-stat ecz-stat--${tone}`}>
    <div className="ecz-stat__head">
      <span className="ecz-stat__label">{label}</span>
      <span className="ecz-stat__icon">{icon}</span>
    </div>
    <div className="ecz-stat__value">{value}</div>
    <div className="ecz-stat__hint">{hint}</div>
  </div>
)

/** Replaces the default admin dashboard (admin.components.views.dashboard). */
export const EcommerceDashboard = async ({ initPageResult }: AdminViewServerProps) => {
  const { payload } = initPageResult.req
  const adminRoute = payload.config.routes.admin
  const { startOfToday, startOfMonth } = getISTBoundaries(new Date())

  const [ordersToday, monthOrders, pendingOrders, lowStockProducts, lowStockVariants, recent] =
    await Promise.all([
      payload.count({
        collection: 'orders',
        where: { createdAt: { greater_than_equal: startOfToday } },
      }),
      payload.find({
        collection: 'orders',
        depth: 0,
        pagination: false,
        select: { amount: true },
        where: {
          and: [
            { createdAt: { greater_than_equal: startOfMonth } },
            { status: { not_in: ['cancelled', 'refunded'] } },
          ],
        },
      }),
      payload.count({ collection: 'orders', where: { status: { equals: 'processing' } } }),
      payload.count({
        collection: 'products',
        where: {
          and: [
            { enableVariants: { not_equals: true } },
            { inventory: { less_than: LOW_STOCK_THRESHOLD } },
          ],
        },
      }),
      payload.count({
        collection: 'variants',
        where: { inventory: { less_than: LOW_STOCK_THRESHOLD } },
      }),
      payload.find({
        collection: 'orders',
        depth: 1,
        limit: 10,
        sort: '-createdAt',
      }),
    ])

  const revenueThisMonth = monthOrders.docs.reduce((sum, order) => sum + (order.amount ?? 0), 0)
  const lowStock = lowStockProducts.totalDocs + lowStockVariants.totalDocs

  return (
    <Gutter className="ecz-dashboard">
      <header className="ecz-dashboard__header">
        <div>
          <h1 className="ecz-dashboard__title">Store overview</h1>
          <p className="ecz-dashboard__subtitle">Orders, revenue and stock at a glance.</p>
        </div>
        <div className="ecz-dashboard__actions">
          <Link className="ecz-action ecz-action--primary" href={`${adminRoute}/collections/products/create`}>
            <Plus aria-hidden size={16} /> Add product
          </Link>
          <Link className="ecz-action" href={`${adminRoute}/collections/orders`}>
            <ListOrdered aria-hidden size={16} /> View orders
          </Link>
          <Link className="ecz-action" href={`${adminRoute}/collections/media/create`}>
            <ImagePlus aria-hidden size={16} /> Upload media
          </Link>
        </div>
      </header>

      <section aria-label="Key figures" className="ecz-stats">
        <StatCard
          hint="Since midnight (IST)"
          icon={<ShoppingBag aria-hidden size={18} />}
          label="Orders today"
          value={String(ordersToday.totalDocs)}
        />
        <StatCard
          hint="Excludes cancelled and refunded"
          icon={<IndianRupee aria-hidden size={18} />}
          label="Revenue this month"
          value={formatINR(revenueThisMonth)}
        />
        <StatCard
          hint="Status: processing"
          icon={<Clock aria-hidden size={18} />}
          label="Pending orders"
          value={String(pendingOrders.totalDocs)}
        />
        <StatCard
          hint={`Stock below ${LOW_STOCK_THRESHOLD}, incl. variants`}
          icon={<AlertTriangle aria-hidden size={18} />}
          label="Low-stock products"
          tone={lowStock > 0 ? 'warning' : 'default'}
          value={String(lowStock)}
        />
      </section>

      <section className="ecz-card">
        <div className="ecz-card__head">
          <h2 className="ecz-card__title">Recent orders</h2>
          <Link className="ecz-card__link" href={`${adminRoute}/collections/orders`}>
            View all
          </Link>
        </div>

        {recent.docs.length === 0 ? (
          <p className="ecz-empty">No orders yet. New orders will appear here.</p>
        ) : (
          <div className="ecz-table-wrap">
            <table className="ecz-table">
              <thead>
                <tr>
                  <th scope="col">Order</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th className="ecz-table__num" scope="col">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {recent.docs.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <Link href={`${adminRoute}/collections/orders/${order.id}`}>#{order.id}</Link>
                    </td>
                    <td>{customerLabel(order)}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>
                      <span className={`ecz-status ecz-status--${order.status ?? 'unknown'}`}>
                        {order.status ?? '—'}
                      </span>
                    </td>
                    <td className="ecz-table__num">{formatINR(order.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Gutter>
  )
}
