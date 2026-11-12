const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

/** ₹1,49,999 style rupee formatting (demo prices are whole rupees). */
export const formatINR = (amount: number): string => inr.format(Math.round(amount))

const number = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 1 })
export const formatNumber = (value: number): string => number.format(value)

const dateFormat = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'Asia/Kolkata',
})

/** "12 Nov 2026" */
export const formatDate = (value: string | Date): string => dateFormat.format(new Date(value))

/** Discount percentage between MRP and price, rounded. */
export const discountPercent = (price: number, mrp: number): number =>
  mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0

/** Mock reference number, e.g. "WT-482913". */
export const makeReference = (prefix: string): string =>
  `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`
