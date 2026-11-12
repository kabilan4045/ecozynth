import type { Metadata } from 'next'

import { BlockTitle, Note, PageShell } from '@/components/ecozynth/blocks'
import { OrderSummary } from '@/components/ecozynth/CartView'
import { DummyForm } from '@/components/ecozynth/forms/DummyForm'

export const metadata: Metadata = { title: 'Checkout' }

export default function CheckoutPage() {
  return (
    <PageShell crumbs={[{ label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} title="Checkout">
      <Note>Demo checkout: no payment is taken. Secure payment via Razorpay (connected in final site).</Note>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0">
          <BlockTitle>1. Contact &amp; address</BlockTitle>
          <DummyForm
            action="checkout"
            collection="orders"
            fields={[
              { name: 'phone', label: 'Mobile number', type: 'phone', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              { name: 'name', label: 'Full name', type: 'name', required: true, full: true },
              { name: 'line1', label: 'Address line 1', type: 'text', required: true, full: true },
              { name: 'line2', label: 'Address line 2', type: 'text', full: true },
              { name: 'pincode', label: 'Pincode', type: 'pincode', required: true },
              { name: 'city', label: 'City', type: 'text', required: true },
              { name: 'state', label: 'State', type: 'state', required: true },
              { name: 'gstin', label: 'GSTIN (for business invoice)', type: 'gstin' },
              { name: 'delivery', label: '2. Delivery method', type: 'radio', required: true, options: ['Standard (3–5 days)', 'Express (1–2 days, +₹149)'] },
              { name: 'payment', label: '3. Payment method', type: 'radio', required: true, options: ['UPI', 'Card', 'Net Banking', 'Cash on Delivery'] },
            ]}
            submitLabel="Place order"
            successHref="/order-confirmation"
          />
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary />
        </div>
      </div>
    </PageShell>
  )
}
