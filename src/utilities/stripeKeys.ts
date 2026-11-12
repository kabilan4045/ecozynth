/**
 * Ecozynth: returns the env value only if it is a real key, not an empty value
 * or a bare placeholder prefix like `sk_test_` from `.env.example`.
 * Stripe stays disabled until real keys are configured (Razorpay is planned instead).
 */
export const realKey = (value: string | undefined, prefixes: string[]): string | undefined => {
  if (!value) return undefined
  const isPlaceholder = prefixes.some((prefix) => value.length <= prefix.length)
  const hasValidPrefix = prefixes.some((prefix) => value.startsWith(prefix))
  return hasValidPrefix && !isPlaceholder ? value : undefined
}
