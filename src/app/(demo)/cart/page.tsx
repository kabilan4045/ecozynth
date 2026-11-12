import type { Metadata } from 'next'

import { PageShell } from '@/components/ecozynth/blocks'
import { CartView } from '@/components/ecozynth/CartView'

export const metadata: Metadata = { title: 'Cart' }

export default function CartPage() {
  return (
    <PageShell crumbs={[{ label: 'Cart' }]} title="Your cart">
      <CartView />
    </PageShell>
  )
}
