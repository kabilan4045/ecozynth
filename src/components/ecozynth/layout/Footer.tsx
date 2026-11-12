import { ChevronDown, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'

import { CONTACT } from '@/demo/config'
import { footerColumns } from '@/demo/routes'

import { Logo } from '../Logo'
import { Container } from '../ui/layout'

const socials = [
  { label: 'Facebook', icon: Facebook },
  { label: 'Instagram', icon: Instagram },
  { label: 'YouTube', icon: Youtube },
  { label: 'LinkedIn', icon: Linkedin },
  { label: 'X (Twitter)', icon: Twitter },
]

const paymentMethods = ['UPI', 'Visa', 'Mastercard', 'RuPay', 'COD']

const linkClass = 'inline-flex min-h-11 items-center text-sm text-muted hover:text-ink hover:underline md:min-h-9'

export const Footer = () => (
  <footer className="mt-auto border-t border-line bg-surface-alt">
    <Container className="py-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,4fr)]">
        {/* Brand + contact */}
        <div>
          <Logo size="lg" />
          <p className="mt-4 max-w-xs text-sm text-muted">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Clean water and clean energy for Indian homes.
          </p>
          <ul className="mt-4 space-y-1 text-sm">
            <li>
              <a className="inline-flex min-h-11 items-center gap-2 hover:underline md:min-h-9" href={CONTACT.phoneHref}>
                <Phone aria-hidden className="size-4 text-brand-slate" /> {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="inline-flex min-h-11 items-center gap-2 hover:underline md:min-h-9" href={CONTACT.whatsappHref}>
                <MessageCircle aria-hidden className="size-4 text-brand-slate" /> WhatsApp {CONTACT.whatsappDisplay}
              </a>
            </li>
            <li>
              <a className="inline-flex min-h-11 items-center gap-2 hover:underline md:min-h-9" href={`mailto:${CONTACT.email}`}>
                <Mail aria-hidden className="size-4 text-brand-slate" /> {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-2 py-2 text-muted">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-slate" /> {CONTACT.address}
            </li>
          </ul>
          <ul aria-label="Social media" className="mt-3 flex gap-1">
            {socials.map(({ label, icon: SocialIcon }) => (
              <li key={label}>
                <a
                  aria-label={label}
                  className="inline-flex size-11 items-center justify-center rounded-[var(--radius-ui)] text-brand-slate hover:bg-surface-hover"
                  href="#"
                >
                  <SocialIcon aria-hidden className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Link columns: grid on desktop, accordions on mobile */}
        <nav aria-label="Footer">
          <div className="hidden gap-6 md:grid md:grid-cols-3 lg:grid-cols-5">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="mb-2 text-sm font-semibold">{column.title}</h2>
                <ul>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link className={linkClass} href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="divide-y divide-line border-y border-line md:hidden">
            {footerColumns.map((column) => (
              <details className="group" key={column.title}>
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between font-semibold [&::-webkit-details-marker]:hidden">
                  {column.title}
                  <ChevronDown aria-hidden className="size-5 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <ul className="pb-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link className={linkClass} href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </nav>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
        <ul aria-label="Payment methods" className="flex flex-wrap gap-2">
          {paymentMethods.map((method) => (
            <li
              className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-brand-slate"
              key={method}
            >
              {method}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Ecozynth. All rights reserved. Demo preview, not a live store.
        </p>
      </div>
    </Container>
  </footer>
)
