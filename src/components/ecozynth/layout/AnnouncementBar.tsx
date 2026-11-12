'use client'

import { Sparkles, X } from 'lucide-react'
import Link from 'next/link'

import { FREE_SHIPPING_THRESHOLD } from '@/demo/config'
import { formatINR } from '@/demo/format'
import { dismissAnnouncement, useAnnouncementDismissed } from '@/demo/state/session'

/** One-line dismissible bar. Dismissal is remembered for the browser session. */
export const AnnouncementBar = () => {
  const dismissed = useAnnouncementDismissed()
  if (dismissed) return null

  return (
    <div className="bg-brand-slate-dark text-surface">
      <div className="mx-auto flex max-w-7xl items-center gap-2 pr-1 pl-4 sm:pl-6 lg:pl-8">
        <p className="flex min-w-0 flex-1 items-center justify-center gap-2 py-2 text-xs sm:text-sm">
          <Sparkles aria-hidden className="size-4 shrink-0 text-brand-green" />
          <span className="truncate">
          Free shipping on orders above {formatINR(FREE_SHIPPING_THRESHOLD)} ·{' '}
          <Link className="underline underline-offset-2" href="/solar-quote">
            Book a free solar site survey
          </Link>
          </span>
        </p>
        <button
          aria-label="Dismiss announcement"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-ui)] hover:bg-brand-slate"
          onClick={dismissAnnouncement}
          type="button"
        >
          <X aria-hidden className="size-4" />
        </button>
      </div>
    </div>
  )
}
