import { discountPercent, formatINR } from '@/demo/format'

import { cn } from './cn'

/** Price with MRP struck through (muted) and discount % (danger). */
export const Price = ({
  price,
  mrp,
  size = 'md',
  className,
}: {
  price: number
  mrp?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) => {
  const off = mrp ? discountPercent(price, mrp) : 0
  return (
    <div className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-0.5', className)}>
      <span
        className={cn(
          'font-semibold text-ink',
          size === 'sm' && 'text-base',
          size === 'md' && 'text-lg',
          size === 'lg' && 'text-2xl sm:text-3xl',
        )}
      >
        {formatINR(price)}
      </span>
      {mrp && off > 0 ? (
        <>
          <span className="text-sm text-muted line-through">
            <span className="sr-only">MRP </span>
            {formatINR(mrp)}
          </span>
          <span className="text-sm font-medium text-danger">{off}% off</span>
        </>
      ) : null}
    </div>
  )
}
