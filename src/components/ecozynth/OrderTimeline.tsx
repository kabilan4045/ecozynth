import { Check } from 'lucide-react'

import type { Order, OrderStatus } from '@/demo/data/types'
import { formatDate } from '@/demo/format'

import type { BadgeTone } from './ui/Badge'
import { cn } from './ui/cn'

/** Badge colour per order status. */
export const statusTone: Record<OrderStatus, BadgeTone> = {
  Processing: 'warning',
  Shipped: 'info',
  Delivered: 'success',
}

/** Ordered → Packed → Shipped → Out for delivery → Delivered. */
export const OrderTimeline = ({ order }: { order: Order }) => (
  <ol className="space-y-4">
    {order.timeline.map((step) => {
      const done = Boolean(step.date)
      return (
        <li className="flex items-start gap-3" key={step.step}>
          <span
            className={cn(
              'mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border',
              done ? 'border-success bg-success text-surface' : 'border-line text-muted',
            )}
          >
            {done ? <Check aria-hidden className="size-4" /> : null}
          </span>
          <div>
            <p className={cn('font-medium', !done && 'text-muted')}>{step.step}</p>
            <p className="text-sm text-muted">{step.date ? formatDate(step.date) : 'Pending'}</p>
          </div>
        </li>
      )
    })}
  </ol>
)
