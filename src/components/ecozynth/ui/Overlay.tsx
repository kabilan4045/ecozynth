'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from './cn'

type OverlayProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  /** Hide the visible title (it stays available to screen readers). */
  hideTitle?: boolean
  description?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}

const panelBase = 'fixed z-50 flex flex-col bg-surface focus:outline-none'

const OverlayShell = ({
  open,
  onOpenChange,
  title,
  hideTitle,
  description,
  children,
  footer,
  panelClassName,
}: OverlayProps & { panelClassName: string }) => (
  <Dialog.Root onOpenChange={onOpenChange} open={open}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-overlay" />
      <Dialog.Content className={cn(panelBase, panelClassName)}>
        <div className={cn('flex items-center justify-between gap-3 border-b border-line px-4 py-2', hideTitle && 'border-b-0')}>
          <Dialog.Title className={cn('font-heading text-lg font-semibold', hideTitle && 'sr-only')}>
            {title}
          </Dialog.Title>
          <Dialog.Close
            aria-label="Close"
            className="ml-auto inline-flex size-11 items-center justify-center rounded-[var(--radius-ui)] hover:bg-surface-hover"
          >
            <X aria-hidden className="size-5" />
          </Dialog.Close>
        </div>
        {description ? (
          <Dialog.Description className="px-4 pt-3 text-sm text-muted">{description}</Dialog.Description>
        ) : (
          <Dialog.Description className="sr-only">{title}</Dialog.Description>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">{children}</div>
        {footer ? <div className="border-t border-line px-4 py-3">{footer}</div> : null}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)

/** Centred modal. `fullScreenOnMobile` fills the screen below 640px. */
export const Modal = ({
  fullScreenOnMobile = false,
  size = 'md',
  className,
  ...props
}: OverlayProps & { fullScreenOnMobile?: boolean; size?: 'md' | 'lg' }) => (
  <OverlayShell
    {...props}
    panelClassName={cn(
      'left-1/2 top-1/2 max-h-[90dvh] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-card)]',
      size === 'md' ? 'max-w-lg' : 'max-w-3xl',
      fullScreenOnMobile &&
        'max-sm:inset-0 max-sm:h-dvh max-sm:max-h-none max-sm:w-full max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-none',
      className,
    )}
  />
)

/** Slide-in side drawer (mobile navigation, filters on desktop if needed). */
export const Drawer = ({
  side = 'left',
  className,
  ...props
}: OverlayProps & { side?: 'left' | 'right' }) => (
  <OverlayShell
    {...props}
    panelClassName={cn(
      'inset-y-0 h-dvh w-[min(22rem,88vw)]',
      side === 'left' ? 'left-0 border-r border-line' : 'right-0 border-l border-line',
      className,
    )}
  />
)

/** Bottom sheet (mobile filters). */
export const BottomSheet = ({ className, ...props }: OverlayProps) => (
  <OverlayShell
    {...props}
    panelClassName={cn(
      'inset-x-0 bottom-0 max-h-[85dvh] rounded-t-[var(--radius-card)] border-t border-line',
      className,
    )}
  />
)
