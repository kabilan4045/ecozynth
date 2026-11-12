'use client'

import { createPersistentStore } from './store'

/**
 * Mock authentication. Nothing is verified against a server.
 * Phone OTP: any valid Indian mobile + DEMO_OTP. Email: any valid email + 6+ char password.
 */
export type DemoUser = {
  name: string
  phone: string
  email: string
  loggedInWith: 'phone' | 'email'
}

const isUser = (raw: unknown): raw is DemoUser =>
  typeof raw === 'object' && raw !== null && typeof (raw as DemoUser).name === 'string'

const authStore = createPersistentStore<DemoUser | null>('ecozynth-demo-auth', 'local', null, (raw) =>
  isUser(raw) ? raw : null,
)

export const loginWithPhone = (phone: string): void =>
  authStore.set({ name: 'Demo Customer', phone, email: '', loggedInWith: 'phone' })

export const loginWithEmail = (email: string): void =>
  authStore.set({ name: 'Demo Customer', phone: '', email, loggedInWith: 'email' })

export const registerUser = (user: { name: string; phone: string; email: string }): void =>
  authStore.set({ ...user, loggedInWith: 'email' })

export const updateProfile = (changes: Partial<Pick<DemoUser, 'name' | 'phone' | 'email'>>): void =>
  authStore.set((user) => (user ? { ...user, ...changes } : user))

export const logout = (): void => authStore.reset()

export const useAuth = (): DemoUser | null => authStore.use()
