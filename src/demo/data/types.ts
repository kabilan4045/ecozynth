/**
 * Shared types for the demo mock data.
 * Shapes are kept close to the planned Payload collections so pages can later
 * be fed real data without redesign.
 */

export type Division = 'aqua' | 'solar'

/** Icon keys resolved to lucide icons in src/components/ecozynth/icons.tsx */
export type IconName =
  | 'softener'
  | 'tank'
  | 'shower'
  | 'tap'
  | 'appliance'
  | 'cartridge'
  | 'tester'
  | 'accessory'
  | 'home-solar'
  | 'battery'
  | 'factory'
  | 'inverter'
  | 'panel'
  | 'cable'
  | 'droplet'
  | 'sun'
  | 'shield'
  | 'truck'
  | 'badge'
  | 'headset'
  | 'wrench'
  | 'video'
  | 'file'
  | 'image'
  | 'user'
  | 'building'

export type Category = {
  slug: string
  name: string
  division: Division
  icon: IconName
  description: string
}

export type Review = {
  id: string
  author: string
  city: string
  rating: number
  title: string
  body: string
  date: string
  verified: boolean
}

export type ProductFaq = { question: string; answer: string }

export type ProductVariant = { name: string; options: string[] }

export type ProductBadge = 'Bestseller' | 'New' | 'Combo'

type BaseProduct = {
  id: string
  slug: string
  name: string
  category: string
  price: number
  mrp: number
  rating: number
  reviewCount: number
  stock: number
  badge?: ProductBadge
  shortDescription: string
  /** Paragraphs for the Description tab. */
  description: string[]
  /** Lower number = shown first under "Featured". */
  featuredRank: number
  /** ISO date, used for "Newest" sort. */
  addedOn: string
  variants?: ProductVariant[]
  faqs: ProductFaq[]
  reviews: Review[]
}

export type AquaProduct = BaseProduct & {
  division: 'aqua'
  specs: {
    stages: string
    filterLife: string
    connectionSize: string
    warranty: string
  }
}

export type SolarProduct = BaseProduct & {
  division: 'solar'
  capacityKw: number
  panelCount: number
  panelWp: number
  phase: 1 | 3
  pricePerWp: number
  warrantyYears: number
  inverterBrand: string
  includesInstallation: boolean
  /** True for kits that need a site survey before installation. */
  requiresSurvey: boolean
  whatsIncluded: string[]
}

export type Product = AquaProduct | SolarProduct

export type BlogSection = {
  id: string
  heading: string
  level: 2 | 3
  paragraphs: string[]
}

export type BlogPost = {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  excerpt: string
  featured?: boolean
  sections: BlogSection[]
  relatedProductSlugs: string[]
}

export type InstallationVideo = {
  id: string
  title: string
  category: string
  duration: string
  productSlug: string
  description: string
}

export type FaqCategory = 'Orders & Shipping' | 'Aqua Products' | 'Solar' | 'Warranty & Service' | 'Payments'

export type Faq = { id: string; category: FaqCategory; question: string; answer: string }

export type Certificate = {
  id: string
  name: string
  issuer: string
  year: number
  type: 'Quality' | 'Product' | 'Solar' | 'Environment'
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered'

export type OrderTimelineStep = 'Ordered' | 'Packed' | 'Shipped' | 'Out for delivery' | 'Delivered'

export type Address = {
  id: string
  fullName: string
  phone: string
  line1: string
  line2?: string
  landmark?: string
  city: string
  state: string
  pincode: string
  isDefault?: boolean
}

export type OrderItem = {
  productSlug: string
  name: string
  division: Division
  variant?: string
  quantity: number
  price: number
}

export type Order = {
  id: string
  placedOn: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  discount: number
  shipping: number
  total: number
  paymentMethod: string
  address: Address
  timeline: { step: OrderTimelineStep; date: string | null }[]
  courier: string
  trackingNumber: string
  email: string
  phone: string
}

export type Testimonial = {
  id: string
  name: string
  city: string
  division: Division
  rating: number
  quote: string
}
