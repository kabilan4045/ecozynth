'use client'

import { Trash2 } from 'lucide-react'
import Link from 'next/link'

import { getCategory } from '@/demo/data/categories'
import { formatINR } from '@/demo/format'
import { removeFromCart, restoreCartItem, updateQuantity, useCart, useCartTotals } from '@/demo/state/cart'
import { useHydrated } from '@/demo/state/store'
import { toast } from '@/demo/state/toast'

import { Placeholder } from './Placeholder'
import { ButtonLink } from './ui/Button'
import { Card } from './ui/layout'
import { QuantityStepper } from './ui/QuantityStepper'

/** Order totals box (used on cart and checkout). */
export const OrderSummary = ({ showCheckout = false }: { showCheckout?: boolean }) => {
  const totals = useCartTotals()
  return (
    <Card className="p-4 sm:p-5">
      <h2 className="mb-3 text-lg font-semibold">Order summary</h2>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal ({totals.itemCount} items)</dt>
          <dd>{formatINR(totals.subtotal)}</dd>
        </div>
        {totals.discount ? (
          <div className="flex justify-between">
            <dt className="text-muted">Discount</dt>
            <dd className="text-success">−{formatINR(totals.discount)}</dd>
          </div>
        ) : null}
        <div className="flex justify-between">
          <dt className="text-muted">Shipping</dt>
          <dd>{totals.shipping ? formatINR(totals.shipping) : 'Free'}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-2 text-base font-semibold">
          <dt>Total</dt>
          <dd>{formatINR(totals.total)}</dd>
        </div>
      </dl>
      <p className="mt-2 text-xs text-muted">Inclusive of all taxes</p>
      {totals.freeShippingRemaining > 0 ? (
        <p className="mt-3 text-sm">Add {formatINR(totals.freeShippingRemaining)} more for free shipping.</p>
      ) : null}
      {showCheckout ? (
        <ButtonLink className="mt-4" fullWidth href="/checkout" size="lg">
          Proceed to checkout
        </ButtonLink>
      ) : null}
    </Card>
  )
}

/** Cart line items (dummy cart stored in the browser). */
export const CartView = () => {
  const hydrated = useHydrated()
  const cart = useCart()

  if (!hydrated) return <p className="text-muted">Loading cart…</p>

  if (cart.items.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-lg font-semibold">Your cart is empty</p>
        <p className="mt-1 text-muted">Lorem ipsum dolor sit amet. Add a few dummy products to try the flow.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/aqua">Shop Aqua</ButtonLink>
          <ButtonLink href="/solar" variant="outline">
            Shop Solar
          </ButtonLink>
        </div>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <ul className="divide-y divide-line rounded-[var(--radius-card)] border border-line">
        {cart.items.map((item) => (
          <li className="flex gap-3 p-3 sm:gap-4 sm:p-4" key={item.key}>
            <div className="w-20 shrink-0 sm:w-24">
              <Placeholder icon={getCategory(item.category)?.icon} tone={item.division} />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <Link className="font-medium hover:underline" href={`/product/${item.slug}`}>
                    {item.name}
                  </Link>
                  {item.variant ? <p className="text-sm text-muted">{item.variant}</p> : null}
                  {item.requiresSurvey ? (
                    <p className="text-sm text-muted">Site survey required before installation</p>
                  ) : null}
                </div>
                <p className="shrink-0 font-semibold">{formatINR(item.price * item.quantity)}</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <QuantityStepper max={item.stock} onChange={(q) => updateQuantity(item.key, q)} value={item.quantity} />
                <button
                  className="inline-flex min-h-11 items-center gap-1 px-2 text-sm text-muted hover:text-danger"
                  onClick={() => {
                    const removed = removeFromCart(item.key)
                    if (removed)
                      toast.action(`${removed.item.name} removed`, 'Undo', () =>
                        restoreCartItem(removed.item, removed.index),
                      )
                  }}
                  type="button"
                >
                  <Trash2 aria-hidden className="size-4" /> Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="lg:sticky lg:top-24 lg:self-start">
        <OrderSummary showCheckout />
      </div>
    </div>
  )
}
