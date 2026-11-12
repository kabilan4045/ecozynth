'use client'

import { COUPONS, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from '../config'
import { isSolarKit } from '../data/products'
import type { Division, Product } from '../data/types'
import { createPersistentStore } from './store'

export type CartItem = {
  /** productId + variant, unique per line. */
  key: string
  productId: string
  slug: string
  name: string
  division: Division
  category: string
  price: number
  mrp: number
  variant?: string
  quantity: number
  stock: number
  /** Solar kits need a site survey before installation. */
  requiresSurvey: boolean
}

export type CartState = { items: CartItem[]; coupon: string | null }

const EMPTY_CART: CartState = { items: [], coupon: null }

const isCartState = (raw: unknown): raw is CartState =>
  typeof raw === 'object' &&
  raw !== null &&
  Array.isArray((raw as CartState).items) &&
  ((raw as CartState).coupon === null || typeof (raw as CartState).coupon === 'string')

const cartStore = createPersistentStore<CartState>('ecozynth-demo-cart', 'local', EMPTY_CART, (raw) =>
  isCartState(raw) ? raw : null,
)

const lineKey = (productId: string, variant?: string) => (variant ? `${productId}::${variant}` : productId)

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

/* ------------------------------------------------------------------ */
/* Actions                                                             */
/* ------------------------------------------------------------------ */

/** Adds a product. Returns the quantity actually in the cart for that line. */
export const addToCart = (product: Product, quantity = 1, variant?: string): number => {
  if (product.stock <= 0) return 0
  const key = lineKey(product.id, variant)
  let finalQty = 0

  cartStore.set((cart) => {
    const existing = cart.items.find((item) => item.key === key)
    if (existing) {
      finalQty = clamp(existing.quantity + quantity, 1, existing.stock)
      return {
        ...cart,
        items: cart.items.map((item) => (item.key === key ? { ...item, quantity: finalQty } : item)),
      }
    }
    finalQty = clamp(quantity, 1, product.stock)
    const item: CartItem = {
      key,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      division: product.division,
      category: product.category,
      price: product.price,
      mrp: product.mrp,
      variant,
      quantity: finalQty,
      stock: product.stock,
      requiresSurvey: isSolarKit(product),
    }
    return { ...cart, items: [...cart.items, item] }
  })

  return finalQty
}

export const updateQuantity = (key: string, quantity: number): void =>
  cartStore.set((cart) => ({
    ...cart,
    items: cart.items.map((item) =>
      item.key === key ? { ...item, quantity: clamp(quantity, 1, item.stock) } : item,
    ),
  }))

/** Removes a line and returns it with its position, for "Undo". */
export const removeFromCart = (key: string): { item: CartItem; index: number } | null => {
  const cart = cartStore.get()
  const index = cart.items.findIndex((item) => item.key === key)
  if (index === -1) return null
  const item = cart.items[index]
  cartStore.set({ ...cart, items: cart.items.filter((line) => line.key !== key) })
  return { item, index }
}

/** Puts a removed line back where it was (undo). */
export const restoreCartItem = (item: CartItem, index: number): void =>
  cartStore.set((cart) => {
    if (cart.items.some((line) => line.key === item.key)) return cart
    const items = [...cart.items]
    items.splice(Math.min(index, items.length), 0, item)
    return { ...cart, items }
  })

export const clearCart = (): void => cartStore.set(EMPTY_CART)

export type CouponResult = { ok: true; label: string } | { ok: false; error: string }

export const applyCoupon = (code: string): CouponResult => {
  const normalised = code.trim().toUpperCase()
  if (!normalised) return { ok: false, error: 'Enter a coupon code' }
  const coupon = COUPONS[normalised]
  if (!coupon) return { ok: false, error: 'This coupon code is not valid' }
  cartStore.set((cart) => ({ ...cart, coupon: normalised }))
  return { ok: true, label: coupon.label }
}

export const removeCoupon = (): void => cartStore.set((cart) => ({ ...cart, coupon: null }))

/* ------------------------------------------------------------------ */
/* Totals                                                              */
/* ------------------------------------------------------------------ */

export type CartTotals = {
  itemCount: number
  subtotal: number
  /** Savings against MRP (for display). */
  mrpSavings: number
  discount: number
  shipping: number
  total: number
  /** Amount still needed for free shipping (0 when already free). */
  freeShippingRemaining: number
  hasSolarKit: boolean
  couponLabel: string | null
}

export const getCartTotals = (cart: CartState): CartTotals => {
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const mrpSavings = cart.items.reduce((sum, item) => sum + (item.mrp - item.price) * item.quantity, 0)

  const coupon = cart.coupon ? COUPONS[cart.coupon] : undefined
  const discountable = coupon
    ? cart.items
        .filter((item) => coupon.appliesTo === 'all' || item.division === coupon.appliesTo)
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0
  const discount = coupon ? Math.round((discountable * coupon.percentOff) / 100) : 0

  const afterDiscount = subtotal - discount
  const shipping =
    itemCount === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE

  return {
    itemCount,
    subtotal,
    mrpSavings,
    discount,
    shipping,
    total: afterDiscount + shipping,
    freeShippingRemaining: itemCount === 0 ? 0 : Math.max(0, FREE_SHIPPING_THRESHOLD - afterDiscount),
    hasSolarKit: cart.items.some((item) => item.requiresSurvey),
    couponLabel: coupon?.label ?? null,
  }
}

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

export const useCart = (): CartState => cartStore.use()

export const useCartTotals = (): CartTotals => getCartTotals(cartStore.use())
