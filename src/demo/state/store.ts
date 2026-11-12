'use client'

import { useSyncExternalStore } from 'react'

type StorageKind = 'local' | 'session'

export type PersistentStore<T> = {
  get: () => T
  set: (next: T | ((prev: T) => T)) => void
  reset: () => void
  /** React hook. Returns `initial` during SSR and hydration, then the stored value. */
  use: () => T
}

const getStorage = (kind: StorageKind): Storage | null => {
  if (typeof window === 'undefined') return null
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage
  } catch {
    return null
  }
}

/**
 * Tiny storage-backed store read with useSyncExternalStore.
 * SSR-safe: the server snapshot is always `initial`, so there is no hydration mismatch.
 * Syncs across tabs for localStorage.
 */
export const createPersistentStore = <T>(
  key: string,
  kind: StorageKind,
  initial: T,
  parse: (raw: unknown) => T | null = (raw) => raw as T,
): PersistentStore<T> => {
  let state = initial
  let loaded = false
  const listeners = new Set<() => void>()

  const load = () => {
    if (loaded || typeof window === 'undefined') return
    loaded = true
    try {
      const raw = getStorage(kind)?.getItem(key)
      if (raw) state = parse(JSON.parse(raw)) ?? initial
    } catch {
      state = initial
    }
  }

  const emit = () => listeners.forEach((listener) => listener())

  const get = () => {
    load()
    return state
  }

  const set: PersistentStore<T>['set'] = (next) => {
    load()
    state = typeof next === 'function' ? (next as (prev: T) => T)(state) : next
    try {
      getStorage(kind)?.setItem(key, JSON.stringify(state))
    } catch {
      // Storage full or blocked: keep the in-memory value.
    }
    emit()
  }

  const reset = () => {
    state = initial
    try {
      getStorage(kind)?.removeItem(key)
    } catch {
      // ignore
    }
    emit()
  }

  const subscribe = (listener: () => void) => {
    listeners.add(listener)
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return
      loaded = false
      load()
      emit()
    }
    window.addEventListener('storage', onStorage)
    return () => {
      listeners.delete(listener)
      window.removeEventListener('storage', onStorage)
    }
  }

  const getServerSnapshot = () => initial

  const use = () => useSyncExternalStore(subscribe, get, getServerSnapshot)

  return { get, set, reset, use }
}

const noopSubscribe = () => () => {}

/** True after hydration on the client (for UI that depends on stored state). */
export const useHydrated = (): boolean =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  )
