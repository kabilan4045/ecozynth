'use client'

import type { Order } from '../data/types'
import { createPersistentStore } from './store'

/** Announcement bar dismissal, remembered for the browser session. */
const announcementStore = createPersistentStore<boolean>(
  'ecozynth-demo-announcement-dismissed',
  'session',
  false,
  (raw) => (typeof raw === 'boolean' ? raw : null),
)

export const dismissAnnouncement = (): void => announcementStore.set(true)
export const useAnnouncementDismissed = (): boolean => announcementStore.use()

/** The most recent order, for the confirmation page (sessionStorage). */
const lastOrderStore = createPersistentStore<Order | null>('ecozynth-demo-last-order', 'session', null, (raw) =>
  typeof raw === 'object' && raw !== null && typeof (raw as Order).id === 'string' ? (raw as Order) : null,
)

export const saveLastOrder = (order: Order): void => lastOrderStore.set(order)
export const useLastOrder = (): Order | null => lastOrderStore.use()
