'use client'

import { ShoppingCart } from 'lucide-react'

import type { Product } from '@/demo/data/types'
import { addToCart } from '@/demo/state/cart'
import { toast } from '@/demo/state/toast'

import { Button, type ButtonSize, type ButtonVariant } from './ui/Button'

/** Adds a product to the cart and confirms with a toast. Disabled when out of stock. */
export const AddToCartButton = ({
  product,
  quantity = 1,
  variant,
  buttonVariant = 'primary',
  size = 'md',
  fullWidth,
  className,
  label = 'Add to cart',
  onAdded,
}: {
  product: Product
  quantity?: number
  /** Selected variant option, e.g. "Chrome". */
  variant?: string
  buttonVariant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
  label?: string
  onAdded?: () => void
}) => {
  const outOfStock = product.stock <= 0
  return (
    <Button
      className={className}
      disabled={outOfStock}
      fullWidth={fullWidth}
      onClick={() => {
        const inCart = addToCart(product, quantity, variant)
        toast.success(
          'Added to cart',
          `${product.name}${variant ? ` (${variant})` : ''} · ${inCart} in cart`,
        )
        onAdded?.()
      }}
      size={size}
      variant={buttonVariant}
    >
      <ShoppingCart aria-hidden className="size-4" />
      {outOfStock ? 'Out of stock' : label}
    </Button>
  )
}
