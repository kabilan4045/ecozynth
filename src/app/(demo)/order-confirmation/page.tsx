import { CheckCircle2 } from 'lucide-react'
import type { Metadata } from 'next'

import { Steps } from '@/components/ecozynth/blocks'
import { Breadcrumbs } from '@/components/ecozynth/Breadcrumbs'
import { Logo } from '@/components/ecozynth/Logo'
import { ButtonLink } from '@/components/ecozynth/ui/Button'
import { Card, Container } from '@/components/ecozynth/ui/layout'

export const metadata: Metadata = { title: 'Order Confirmation' }

/** Dummy confirmation with a sample order number. */
export default function OrderConfirmationPage() {
  const orderId = 'EZ104521'
  return (
    <>
      <Breadcrumbs items={[{ label: 'Order confirmation' }]} />
      <Container className="max-w-3xl pb-16">
        <Card className="flex flex-col items-center p-6 text-center sm:p-10">
          <Logo size="lg" />
          <CheckCircle2 aria-hidden className="mt-6 size-12 text-success" />
          <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">Thank you for your order!</h1>
          <p className="mt-2 text-muted">
            Order number <strong className="font-mono text-ink">{orderId}</strong> · Lorem ipsum dolor sit amet.
          </p>
          <dl className="mt-6 grid w-full gap-3 text-left sm:grid-cols-3">
            {[
              ['Estimated delivery', 'Lorem 3–5 days'],
              ['Payment', 'UPI (demo)'],
              ['Deliver to', 'Lorem Ipsum Road, Bengaluru'],
            ].map(([k, v]) => (
              <div className="rounded-[var(--radius-ui)] bg-surface-alt p-3" key={k}>
                <dt className="text-xs text-muted">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink href={`/track-order?id=${orderId}`}>Track order</ButtonLink>
            <ButtonLink href="/" variant="outline">
              Continue shopping
            </ButtonLink>
          </div>
        </Card>
        <h2 className="mt-10 mb-4 text-xl font-semibold">What happens next</h2>
        <Steps steps={['Order confirmed', 'Packed', 'Shipped', 'Delivered']} />
      </Container>
    </>
  )
}
