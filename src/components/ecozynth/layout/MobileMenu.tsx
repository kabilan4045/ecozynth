'use client'

import * as Dialog from '@radix-ui/react-dialog'
import {
  ArrowLeft,
  ChevronRight,
  Droplets,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
  Phone,
  Sun,
  Truck,
  Twitter,
  User,
  X,
  Youtube,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { CONTACT } from '@/demo/config'
import { headerNav, type NavItem } from '@/demo/routes'

import { Logo } from '../Logo'
import { cn } from '../ui/cn'

const rowClass =
  'flex min-h-14 w-full items-center justify-between gap-3 border-b border-line px-4 text-left text-lg font-medium text-ink active:bg-surface-hover'

const subRowClass =
  'flex min-h-13 w-full items-center justify-between gap-3 border-b border-line px-4 text-base text-ink active:bg-surface-hover'

const socials = [
  { label: 'Facebook', icon: Facebook },
  { label: 'Instagram', icon: Instagram },
  { label: 'YouTube', icon: Youtube },
  { label: 'LinkedIn', icon: Linkedin },
  { label: 'X (Twitter)', icon: Twitter },
]

/**
 * Menu body with drill-down submenus (tap "Aqua" → Aqua screen with Back).
 * Lives inside Dialog.Content, so the open submenu resets each time the menu closes.
 */
const MenuPanels = ({ close }: { close: () => void }) => {
  const [sub, setSub] = useState<NavItem | null>(null)

  if (sub) {
    return (
      <div>
        <button
          autoFocus
          className="flex min-h-12 w-full items-center gap-2 px-4 text-sm font-medium text-muted"
          onClick={() => setSub(null)}
          type="button"
        >
          <ArrowLeft aria-hidden className="size-5" />
          Back to menu
        </button>
        <h2 className="border-b border-line px-4 pb-3 text-2xl font-semibold">{sub.label}</h2>
        <ul>
          {sub.children?.map((child) => (
            <li key={child.href + child.label}>
              <Link className={subRowClass} href={child.href} onClick={close}>
                {child.label}
                <ChevronRight aria-hidden className="size-5 shrink-0 text-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      {/* Division shortcuts */}
      <div className="grid grid-cols-2 gap-3 p-4">
        <Link
          className="flex min-h-20 flex-col justify-between rounded-[var(--radius-card)] bg-aqua-50 p-3 ring-1 ring-aqua ring-inset"
          href="/aqua"
          onClick={close}
        >
          <Droplets aria-hidden className="size-6 text-aqua" />
          <span className="font-heading text-base font-semibold">Shop Aqua</span>
        </Link>
        <Link
          className="flex min-h-20 flex-col justify-between rounded-[var(--radius-card)] bg-solar-50 p-3 ring-1 ring-solar ring-inset"
          href="/solar"
          onClick={close}
        >
          <Sun aria-hidden className="size-6 text-solar" />
          <span className="font-heading text-base font-semibold">Shop Solar</span>
        </Link>
      </div>

      {/* Main navigation */}
      <nav aria-label="Mobile">
        <ul className="border-t border-line">
          {headerNav.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <button className={rowClass} onClick={() => setSub(item)} type="button">
                  {item.label}
                  <ChevronRight aria-hidden className="size-5 shrink-0 text-muted" />
                </button>
              ) : (
                <Link className={rowClass} href={item.href} onClick={close}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Account & help */}
      <div className="mt-6 px-4">
        <p className="mb-1 text-sm font-medium text-muted">Account &amp; help</p>
        <ul>
          {[
            { label: 'My account', href: '/account', icon: User },
            { label: 'Track order', href: '/track-order', icon: Truck },
          ].map(({ label, href, icon: RowIcon }) => (
            <li key={href}>
              <Link className="flex min-h-12 items-center gap-3 text-base" href={href} onClick={close}>
                <RowIcon aria-hidden className="size-5 text-brand-slate" />
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a className="flex min-h-12 items-center gap-3 text-base" href={CONTACT.phoneHref}>
              <Phone aria-hidden className="size-5 text-brand-slate" />
              Call {CONTACT.phoneDisplay}
            </a>
          </li>
          <li>
            <a className="flex min-h-12 items-center gap-3 text-base" href={CONTACT.whatsappHref}>
              <MessageCircle aria-hidden className="size-5 text-brand-slate" />
              Chat on WhatsApp
            </a>
          </li>
        </ul>
        <ul aria-label="Social media" className="mt-4 mb-6 flex gap-1">
          {socials.map(({ label, icon: SocialIcon }) => (
            <li key={label}>
              <a
                aria-label={label}
                className="inline-flex size-11 items-center justify-center rounded-full border border-line text-brand-slate"
                href="#"
              >
                <SocialIcon aria-hidden className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Full-screen mobile menu (Shopify-style), opened from the header hamburger. */
export const MobileMenu = ({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const close = () => onOpenChange(false)
  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className={cn('fixed inset-0 z-50 flex h-dvh flex-col bg-surface focus:outline-none lg:hidden')}
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          {/* Same height as the site header so the switch feels seamless */}
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-line px-4">
            <Logo onClick={close} size="sm" />
            <Dialog.Close
              aria-label="Close menu"
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-[var(--radius-ui)] hover:bg-surface-hover"
            >
              <X aria-hidden className="size-6" />
            </Dialog.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
            <MenuPanels close={close} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
