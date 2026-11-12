import type { CollectionConfig, Config, GlobalConfig, Plugin } from 'payload'

/**
 * Ecozynth admin sidebar: ecommerce first.
 *
 * Runs after all other plugins, so it can also organise the collections that
 * the ecommerce and form-builder plugins add.
 *
 * `group: false` removes an item from the sidebar and dashboard only. Its routes,
 * API and data stay available (the storefront still reads Pages, Forms, Header and Footer).
 */
type NavEntry = {
  group: false | string
  labels?: CollectionConfig['labels']
}

const collectionNav: Record<string, NavEntry> = {
  // Store
  products: { group: 'Store' },
  categories: { group: 'Store' },
  orders: { group: 'Store' },
  carts: { group: 'Store' },
  transactions: { group: 'Store' },
  // Customers
  users: { group: 'Customers', labels: { singular: 'User', plural: 'Customers & Staff' } },
  // Media
  media: { group: 'Media' },
  // Hidden from the sidebar (still reachable by URL and used by the storefront)
  pages: { group: false },
  forms: { group: false },
  'form-submissions': { group: false },
  variants: { group: false }, // managed inside the product edit screen
  variantTypes: { group: false },
  variantOptions: { group: false },
  addresses: { group: false }, // managed inside the customer edit screen
}

const hiddenGlobals = new Set(['header', 'footer'])

/** Sidebar order. Groups appear in the order their first collection appears. */
const navOrder = Object.keys(collectionNav)

const orderIndex = (slug: string): number => {
  const index = navOrder.indexOf(slug)
  return index === -1 ? navOrder.length : index
}

const applyCollectionNav = (collection: CollectionConfig): CollectionConfig => {
  const entry = collectionNav[collection.slug]
  if (!entry) return collection

  return {
    ...collection,
    admin: { ...collection.admin, group: entry.group },
    ...(entry.labels ? { labels: entry.labels } : {}),
  }
}

const applyGlobalNav = (global: GlobalConfig): GlobalConfig =>
  hiddenGlobals.has(global.slug) ? { ...global, admin: { ...global.admin, group: false } } : global

export const adminNavPlugin: Plugin = (config: Config): Config => ({
  ...config,
  collections: (config.collections ?? [])
    .map(applyCollectionNav)
    .sort((a, b) => orderIndex(a.slug) - orderIndex(b.slug)),
  globals: (config.globals ?? []).map(applyGlobalNav),
})
