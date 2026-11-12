'use client'

import { Toaster } from 'sonner'

/** Toast container for the demo, styled with the brand tokens. */
export const DemoToaster = () => (
  <Toaster
    closeButton
    position="top-center"
    toastOptions={{
      classNames: {
        toast: 'border border-line bg-surface text-ink font-sans rounded-[var(--radius-card)]',
        description: 'text-muted',
        success: '[&_[data-icon]]:text-success',
        error: '[&_[data-icon]]:text-danger',
        actionButton: 'bg-brand-green-dark text-surface',
      },
    }}
  />
)
