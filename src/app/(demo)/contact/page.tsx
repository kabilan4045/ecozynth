import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { BlockTitle, PageShell } from '@/components/ecozynth/blocks'
import { DummyForm } from '@/components/ecozynth/forms/DummyForm'
import { Placeholder } from '@/components/ecozynth/Placeholder'
import { Card } from '@/components/ecozynth/ui/layout'
import { CONTACT } from '@/demo/config'

export const metadata: Metadata = { title: 'Contact Us' }

const cards = [
  { title: 'Call us', value: CONTACT.phoneDisplay, href: CONTACT.phoneHref, icon: Phone },
  { title: 'WhatsApp', value: CONTACT.whatsappDisplay, href: CONTACT.whatsappHref, icon: MessageCircle },
  { title: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: Mail },
  { title: 'Visit', value: CONTACT.address, href: '#map', icon: MapPin },
]

export default function ContactPage() {
  return (
    <PageShell crumbs={[{ label: 'Contact' }]} description={`Lorem ipsum dolor sit amet. ${CONTACT.hours}.`} title="Contact us">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ title, value, href, icon: CardIcon }) => (
          <li key={title}>
            <a className="block h-full" href={href}>
              <Card className="h-full p-4 hover:border-brand-slate">
                <CardIcon aria-hidden className="size-6 text-brand-green-dark" />
                <p className="mt-2 font-semibold">{title}</p>
                <p className="text-sm break-words text-muted">{value}</p>
              </Card>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Send us a message</h2>
          <DummyForm
            collection="contact-messages"
            fields={[
              { name: 'name', label: 'Full name', type: 'name', required: true },
              { name: 'phone', label: 'Mobile number', type: 'phone', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true, full: true },
              { name: 'subject', label: 'Subject', type: 'select', required: true, options: ['Product question', 'Order help', 'Solar enquiry', 'Other'], full: true },
              { name: 'message', label: 'Message', type: 'textarea', required: true },
            ]}
            referencePrefix="CT"
            submitLabel="Send message"
            successTitle="Message sent"
          />
        </div>
        <div id="map">
          <h2 className="mb-4 text-xl font-semibold">Find us</h2>
          <Placeholder aspect="4/3" icon="building" label="Map placeholder" />
        </div>
      </div>
      <BlockTitle>Quick help</BlockTitle>
      <ul className="flex flex-wrap gap-3">
        {[
          ['FAQ', '/faq'],
          ['Track order', '/track-order'],
          ['Service request', '/service-request'],
        ].map(([label, href]) => (
          <li key={href}>
            <Link className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm hover:bg-surface-hover" href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
