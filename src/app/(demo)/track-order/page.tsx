import type { Metadata } from 'next'

import { Note, PageShell } from '@/components/ecozynth/blocks'
import { DummyForm } from '@/components/ecozynth/forms/DummyForm'
import { OrderTimeline } from '@/components/ecozynth/OrderTimeline'
import { Card } from '@/components/ecozynth/ui/layout'
import { mockOrders } from '@/demo/data/orders'

export const metadata: Metadata = { title: 'Track Order' }

export default async function TrackOrderPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams
  const sample = mockOrders[1]
  return (
    <PageShell crumbs={[{ label: 'Track order' }]} description="Lorem ipsum dolor sit amet. Enter your order ID to see its status." title="Track your order">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-4 sm:p-6">
          <DummyForm
            className="sm:grid-cols-1"
            fields={[
              { name: 'orderId', label: 'Order ID', type: 'text', required: true, full: true, defaultValue: id ?? '', hint: 'e.g. EZ103877' },
              { name: 'contact', label: 'Phone or email', type: 'text', required: true, full: true },
            ]}
            submitLabel="Track order"
            successText="Lorem ipsum: your order is on its way. See the sample timeline."
            successTitle="Order found (demo)"
          />
        </Card>
        <Card className="p-4 sm:p-6">
          <h2 className="font-semibold">Sample status: {sample.id}</h2>
          <p className="mb-4 text-sm text-muted">
            {sample.courier} · Tracking {sample.trackingNumber}
          </p>
          <OrderTimeline order={sample} />
        </Card>
      </div>
      <div className="mt-6">
        <Note>Demo page: any order ID shows the sample timeline above.</Note>
      </div>
    </PageShell>
  )
}
