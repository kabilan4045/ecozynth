/**
 * Ecozynth demo configuration.
 *
 * ⚠️ PLACEHOLDER VALUES. Every number in this file is illustrative only and must be
 * confirmed with Ecozynth before launch. Change them here and the whole demo updates.
 */

/* ------------------------------------------------------------------ */
/* Shop & cart                                                         */
/* ------------------------------------------------------------------ */

/** Orders at or above this amount (after discount) ship free. PLACEHOLDER. */
export const FREE_SHIPPING_THRESHOLD = 999

/** Standard shipping fee below the free-shipping threshold. PLACEHOLDER. */
export const STANDARD_SHIPPING_FEE = 79

/** Extra charge for express delivery. PLACEHOLDER. */
export const EXPRESS_SHIPPING_FEE = 149

/** Cash on delivery is not offered above this order total. PLACEHOLDER. */
export const COD_MAX_ORDER_TOTAL = 20000

/** Coupon codes. PLACEHOLDER: ECO10 = 10% off Aqua items only. */
export const COUPONS: Record<string, { percentOff: number; appliesTo: 'aqua' | 'solar' | 'all'; label: string }> =
  {
    ECO10: { percentOff: 10, appliesTo: 'aqua', label: '10% off Aqua products' },
  }

/** Products per page on shop listings ("Load more" adds this many). */
export const SHOP_PAGE_SIZE = 12

/** Delivery estimate shown on product pages and checkout. PLACEHOLDER. */
export const DELIVERY_DAYS = { standard: { min: 3, max: 5 }, express: { min: 1, max: 2 } }

/**
 * Pincode serviceability rule. PLACEHOLDER: pincodes starting with 1–8 are serviceable.
 * Real rule will come from Shiprocket later.
 */
export const isPincodeServiceable = (pincode: string): boolean => /^[1-8]\d{5}$/.test(pincode)

/* ------------------------------------------------------------------ */
/* Mock login                                                          */
/* ------------------------------------------------------------------ */

/** The only OTP accepted by the demo login. Shown as a hint on screen. */
export const DEMO_OTP = '123456'

/** Seconds before "Resend OTP" becomes available. */
export const OTP_RESEND_SECONDS = 30

/* ------------------------------------------------------------------ */
/* EMI estimate (solar product pages)                                  */
/* ------------------------------------------------------------------ */

/** Annual interest rate used for the EMI estimate. PLACEHOLDER. */
export const EMI_ANNUAL_RATE_PERCENT = 12

export const EMI_TENURES_MONTHS = [12, 24, 36] as const

/** Standard reducing-balance EMI formula. */
export const calculateEmi = (principal: number, months: number): number => {
  const r = EMI_ANNUAL_RATE_PERCENT / 12 / 100
  if (r === 0) return principal / months
  const factor = (1 + r) ** months
  return (principal * r * factor) / (factor - 1)
}

/* ------------------------------------------------------------------ */
/* Solar savings calculator                                            */
/* ------------------------------------------------------------------ */

export const SOLAR = {
  /** Units (kWh) generated per kW of panels per month. PLACEHOLDER (~4 units/kW/day). */
  UNITS_PER_KW_PER_MONTH: 120,
  /** Shadow-free roof area needed per kW. PLACEHOLDER. */
  ROOF_SQFT_PER_KW: 100,
  /** Average grid tariff in ₹ per unit, used to convert bill ↔ units. PLACEHOLDER. */
  TARIFF_PER_UNIT: 8,
  /** Installed system cost in ₹ per watt. PLACEHOLDER. */
  COST_PER_WATT: { home: 60, business: 52 },
  /** Panel size used to count panels. PLACEHOLDER. */
  PANEL_WP: 540,
  /** Smallest and largest system the calculator recommends (kW). */
  MIN_KW: 1,
  MAX_KW: { home: 10, business: 100 },
  /** Lifetime used for long-term savings. */
  LIFETIME_YEARS: 25,
  /** Yearly tariff increase applied to long-term savings. PLACEHOLDER. */
  TARIFF_ESCALATION_PERCENT: 3,
  /**
   * Residential subsidy. PLACEHOLDER slabs (to be confirmed with Ecozynth):
   * ₹30,000 per kW for the first 2 kW, ₹18,000 for the 3rd kW, capped at ₹78,000.
   */
  SUBSIDY: { perKwFirstTwo: 30000, thirdKw: 18000, cap: 78000 },
} as const

export type PropertyType = 'home' | 'business'

export type SolarInput = {
  /** Monthly electricity bill in ₹ (used when mode is 'bill'). */
  monthlyBill: number
  /** Monthly consumption in units (used when mode is 'units'). */
  monthlyUnits: number
  mode: 'bill' | 'units'
  propertyType: PropertyType
  /** Available shadow-free roof area in sq ft (0 = unknown). */
  roofAreaSqft: number
}

export type SolarEstimate = {
  monthlyUnits: number
  systemKw: number
  panelCount: number
  roofAreaNeededSqft: number
  roofTooSmall: boolean
  systemCost: number
  subsidy: number
  netCost: number
  monthlySavings: number
  yearlySavings: number
  paybackYears: number
  lifetimeSavings: number
}

/** Residential subsidy for a system size (PLACEHOLDER slabs above). */
export const estimateSubsidy = (systemKw: number, propertyType: PropertyType): number => {
  if (propertyType !== 'home') return 0
  const { perKwFirstTwo, thirdKw, cap } = SOLAR.SUBSIDY
  const firstTwo = Math.min(systemKw, 2) * perKwFirstTwo
  const third = Math.max(0, Math.min(systemKw - 2, 1)) * thirdKw
  return Math.min(firstTwo + third, cap)
}

/** Illustrative solar estimate. Final figures come from the site survey. */
export const calculateSolar = (input: SolarInput): SolarEstimate => {
  const monthlyUnits =
    input.mode === 'bill' ? input.monthlyBill / SOLAR.TARIFF_PER_UNIT : input.monthlyUnits

  const rawKw = monthlyUnits / SOLAR.UNITS_PER_KW_PER_MONTH
  // Round up to the nearest 0.5 kW, within sensible limits.
  const systemKw = Math.min(
    SOLAR.MAX_KW[input.propertyType],
    Math.max(SOLAR.MIN_KW, Math.ceil(rawKw * 2) / 2),
  )

  const panelCount = Math.ceil((systemKw * 1000) / SOLAR.PANEL_WP)
  const roofAreaNeededSqft = Math.round(systemKw * SOLAR.ROOF_SQFT_PER_KW)
  const systemCost = Math.round(systemKw * 1000 * SOLAR.COST_PER_WATT[input.propertyType])
  const subsidy = estimateSubsidy(systemKw, input.propertyType)
  const netCost = systemCost - subsidy

  const generatedUnits = systemKw * SOLAR.UNITS_PER_KW_PER_MONTH
  const monthlySavings = Math.round(Math.min(generatedUnits, monthlyUnits) * SOLAR.TARIFF_PER_UNIT)
  const yearlySavings = monthlySavings * 12

  // Long-term savings with a yearly tariff increase (geometric series).
  const g = SOLAR.TARIFF_ESCALATION_PERCENT / 100
  const lifetimeSavings = Math.round(
    g === 0
      ? yearlySavings * SOLAR.LIFETIME_YEARS
      : (yearlySavings * ((1 + g) ** SOLAR.LIFETIME_YEARS - 1)) / g,
  )

  return {
    monthlyUnits: Math.round(monthlyUnits),
    systemKw,
    panelCount,
    roofAreaNeededSqft,
    roofTooSmall: input.roofAreaSqft > 0 && input.roofAreaSqft < roofAreaNeededSqft,
    systemCost,
    subsidy,
    netCost,
    monthlySavings,
    yearlySavings,
    paybackYears: yearlySavings > 0 ? Math.round((netCost / yearlySavings) * 10) / 10 : 0,
    lifetimeSavings,
  }
}

/* ------------------------------------------------------------------ */
/* Contact details (placeholders)                                      */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  phoneDisplay: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  whatsappDisplay: '+91 98765 43210',
  /** Placeholder: the real WhatsApp link (wa.me/…) comes later. */
  whatsappHref: '#',
  email: 'hello@ecozynth.example',
  address: 'Lorem Ipsum Road, Sector 00, Bengaluru, Karnataka 560001',
  hours: 'Mon–Sat, 9:30 am – 6:30 pm',
} as const
