'use client'

import { MessageCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { CONTACT } from '@/demo/config'

import { cn } from '../ui/cn'

/** Floating WhatsApp button. Sits higher on product pages to clear the sticky bar. */
export const WhatsAppButton = () => {
  const pathname = usePathname()
  const raised = pathname.startsWith('/product/')
  return (
    <a
      aria-label="Chat with us on WhatsApp"
      className={cn(
        'fixed right-4 z-30 inline-flex size-14 items-center justify-center rounded-full bg-success text-surface shadow-md hover:opacity-90',
        raised ? 'bottom-24 lg:bottom-6' : 'bottom-4 sm:bottom-6',
      )}
      href={CONTACT.whatsappHref}
    >
      <MessageCircle aria-hidden className="size-7" />
    </a>
  )
}
