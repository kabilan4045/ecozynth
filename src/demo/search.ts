import { getCategory } from './data/categories'
import { products } from './data/products'
import type { Product } from './data/types'

/** Matches product name, category and description (header suggestions and search page). */
export const searchProducts = (query: string): Product[] => {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return products.filter((product) =>
    [product.name, getCategory(product.category)?.name ?? '', product.shortDescription]
      .join(' ')
      .toLowerCase()
      .includes(q),
  )
}
