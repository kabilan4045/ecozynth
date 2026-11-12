import type { CurrenciesConfig } from '@payloadcms/plugin-ecommerce/types'

/**
 * Ecozynth sells in India only. Amounts are stored in the smallest unit (paise),
 * so ₹1,499.00 is stored as 149900.
 */
export const INR = {
  code: 'INR',
  decimals: 2,
  label: 'Indian Rupee',
  symbol: '₹',
}

export const currenciesConfig: CurrenciesConfig = {
  defaultCurrency: 'INR',
  supportedCurrencies: [INR],
}

export const formatINR = (amountInPaise: number | null | undefined): string =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
    (amountInPaise ?? 0) / 100,
  )
