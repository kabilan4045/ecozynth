/**
 * Shared form validators for the demo.
 * Each validator returns an error message, or undefined when the value is valid.
 */

export type FieldValue = string | boolean | string[] | File | null
export type Validator = (value: FieldValue, values: Record<string, FieldValue>) => string | undefined

export const patterns = {
  /** Indian mobile number: 10 digits starting with 6–9. */
  mobile: /^[6-9]\d{9}$/,
  /** Indian pincode: 6 digits, not starting with 0. */
  pincode: /^[1-9]\d{5}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  /** GSTIN: 2-digit state code, PAN (5 letters, 4 digits, 1 letter), entity code, Z, checksum. */
  gstin: /^[0-3][0-9][A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
}

const asText = (value: FieldValue): string => (typeof value === 'string' ? value.trim() : '')

const isEmpty = (value: FieldValue): boolean => {
  if (value === null || value === false) return true
  if (typeof value === 'string') return value.trim() === ''
  if (Array.isArray(value)) return value.length === 0
  return false
}

export const required =
  (message = 'This field is required'): Validator =>
  (value) =>
    isEmpty(value) ? message : undefined

export const mobile =
  (message = 'Enter a valid 10-digit mobile number'): Validator =>
  (value) =>
    asText(value) && !patterns.mobile.test(asText(value)) ? message : undefined

export const pincode =
  (message = 'Enter a valid 6-digit pincode'): Validator =>
  (value) =>
    asText(value) && !patterns.pincode.test(asText(value)) ? message : undefined

export const email =
  (message = 'Enter a valid email address'): Validator =>
  (value) =>
    asText(value) && !patterns.email.test(asText(value)) ? message : undefined

/** Validates only when filled (GSTIN is optional on forms). */
export const gstin =
  (message = 'Enter a valid 15-character GSTIN'): Validator =>
  (value) =>
    asText(value) && !patterns.gstin.test(asText(value).toUpperCase()) ? message : undefined

export const minLength =
  (min: number, message?: string): Validator =>
  (value) =>
    asText(value) && asText(value).length < min
      ? (message ?? `Enter at least ${min} characters`)
      : undefined

/** Date input value must not be after today. */
export const notInFuture =
  (message = 'Date cannot be in the future'): Validator =>
  (value) =>
    asText(value) && asText(value) > todayISO() ? message : undefined

/** Date input value must not be before today. */
export const notInPast =
  (message = 'Choose today or a later date'): Validator =>
  (value) =>
    asText(value) && asText(value) < todayISO() ? message : undefined

/** File checks (type and size), client-side only. */
export const file =
  (opts: { types: string[]; maxMb: number }): Validator =>
  (value) => {
    if (!(value instanceof File)) return undefined
    const ext = value.name.split('.').pop()?.toLowerCase() ?? ''
    if (!opts.types.includes(ext)) return `Allowed file types: ${opts.types.join(', ').toUpperCase()}`
    if (value.size > opts.maxMb * 1024 * 1024) return `File must be ${opts.maxMb} MB or smaller`
    return undefined
  }

/** Local "YYYY-MM-DD" for today, matching native date input values. */
export const todayISO = (): string => {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

/** Run validators in order and return the first error. */
export const runValidators = (
  value: FieldValue,
  validators: Validator[] | undefined,
  values: Record<string, FieldValue>,
): string | undefined => {
  for (const validate of validators ?? []) {
    const error = validate(value, values)
    if (error) return error
  }
  return undefined
}
