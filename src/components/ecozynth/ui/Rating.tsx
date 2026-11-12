import { Star } from 'lucide-react'

import { cn } from './cn'

/** Read-only star rating, e.g. 4.6 ★ (128). */
export const Rating = ({
  value,
  count,
  className,
  showValue = true,
}: {
  value: number
  count?: number
  className?: string
  showValue?: boolean
}) => (
  <div className={cn('flex items-center gap-1.5 text-sm', className)}>
    <span aria-hidden className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          className={cn('size-4', i < Math.round(value) ? 'fill-solar text-solar' : 'text-line')}
          key={i}
        />
      ))}
    </span>
    <span className="sr-only">Rated {value} out of 5</span>
    {showValue ? <span aria-hidden className="font-medium text-ink">{value.toFixed(1)}</span> : null}
    {count !== undefined ? <span className="text-muted">({count})</span> : null}
  </div>
)
