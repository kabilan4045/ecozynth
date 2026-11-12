import Link from 'next/link'

import { getCategory } from '@/demo/data/categories'
import type { Product } from '@/demo/data/types'

import { AddToCartButton } from './AddToCartButton'
import { Placeholder } from './Placeholder'
import { Badge, DivisionBadge } from './ui/Badge'
import { cn } from './ui/cn'
import { Price } from './ui/Price'
import { Rating } from './ui/Rating'

/** Stock label: out of stock, low stock (≤5) or in stock. */
export const StockStatus = ({ stock, className }: { stock: number; className?: string }) => {
  if (stock <= 0) return <span className={cn('text-sm font-medium text-danger', className)}>Out of stock</span>
  if (stock <= 5)
    return <span className={cn('text-sm font-medium text-ink', className)}>Only {stock} left</span>
  return <span className={cn('text-sm font-medium text-success', className)}>In stock</span>
}

/** Product card for grids and carousels. Data comes in through props. */
export const ProductCard = ({ product, className }: { product: Product; className?: string }) => {
  const category = getCategory(product.category)
  const href = `/product/${product.slug}`
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-colors hover:border-brand-slate',
        className,
      )}
    >
      <div className="relative">
        <Placeholder icon={category?.icon} tone={product.division} />
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          <DivisionBadge division={product.division} />
          {product.badge ? <Badge tone="green">{product.badge}</Badge> : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <p className="text-xs text-muted">{category?.name}</p>
        <h3 className="text-sm leading-snug font-medium sm:text-base">
          {/* Stretched link: the whole card is clickable, the button stays separate. */}
          <Link className="after:absolute after:inset-0 hover:underline" href={href}>
            {product.name}
          </Link>
        </h3>
        <Rating count={product.reviewCount} value={product.rating} />
        <Price mrp={product.mrp} price={product.price} size="sm" />
        <StockStatus stock={product.stock} />
        <div className="relative z-10 mt-auto pt-2">
          <AddToCartButton fullWidth product={product} size="sm" />
        </div>
      </div>
    </article>
  )
}
