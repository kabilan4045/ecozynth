'use client'

import { toast as sonner } from 'sonner'

/**
 * Demo toast helpers (rendered by <DemoToaster /> in the demo layout).
 * Wraps sonner so pages don't depend on the library directly.
 */
export const toast = {
  success: (message: string, description?: string) => sonner.success(message, { description }),
  error: (message: string, description?: string) => sonner.error(message, { description }),
  info: (message: string, description?: string) => sonner(message, { description }),
  /** Toast with an action button, e.g. "Undo". */
  action: (message: string, label: string, onClick: () => void) =>
    sonner(message, { action: { label, onClick } }),
}
