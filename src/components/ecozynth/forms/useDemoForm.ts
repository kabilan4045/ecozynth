'use client'

import { useId, useState, type FormEvent } from 'react'

import { runValidators, type FieldValue, type Validator } from '@/demo/validation'

type Values = Record<string, FieldValue>
type Rules<V extends Values> = Partial<Record<keyof V & string, Validator[]>>
type Errors<V extends Values> = Partial<Record<keyof V & string, string>>

/** Simulated network delay for demo submissions. */
export const SUBMIT_DELAY_MS = 800
export const simulateSubmit = () => new Promise<void>((resolve) => setTimeout(resolve, SUBMIT_DELAY_MS))

/**
 * Minimal form state + validation for the demo (no extra dependencies).
 * - Validates a field on blur, then live once it has been touched.
 * - On submit: validates everything, focuses the first invalid field, simulates an 800 ms request.
 */
export const useDemoForm = <V extends Values>({
  initialValues,
  rules,
}: {
  initialValues: V
  /** Static rules, or a function when rules depend on other values. */
  rules?: Rules<V> | ((values: V) => Rules<V>)
}) => {
  const [values, setValues] = useState<V>(initialValues)
  const [errors, setErrors] = useState<Errors<V>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof V & string, boolean>>>({})
  const [submitting, setSubmitting] = useState(false)
  /** Put on the <form> as id={form.formId}; used to focus the first invalid field. */
  const formId = useId()

  const rulesFor = (current: V): Rules<V> => (typeof rules === 'function' ? rules(current) : (rules ?? {}))

  const validateField = (name: keyof V & string, current: V) =>
    runValidators(current[name], rulesFor(current)[name], current)

  const setValue = <K extends keyof V & string>(name: K, value: V[K]) => {
    const next = { ...values, [name]: value }
    setValues(next)
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validateField(name, next) }))
  }

  const handleBlur = (name: keyof V & string) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, values) }))
  }

  /** Focus the first field (in DOM order) that has an error. */
  const focusFirstError = (found: Errors<V>) => {
    const form = document.getElementById(formId)
    if (!(form instanceof HTMLFormElement)) return
    for (const element of Array.from(form.elements)) {
      const name = (element as HTMLInputElement).name
      if (name && found[name as keyof V & string]) {
        ;(element as HTMLElement).focus()
        return
      }
    }
  }

  /** Validate all fields (or only `names`, for multi-step forms). Returns true when valid. */
  const validate = (names?: (keyof V & string)[]): boolean => {
    const currentRules = rulesFor(values)
    const fieldNames = names ?? (Object.keys(currentRules) as (keyof V & string)[])
    const found: Errors<V> = {}
    for (const name of fieldNames) {
      const error = runValidators(values[name], currentRules[name], values)
      if (error) found[name] = error
    }
    setErrors((prev) => {
      const next = { ...prev }
      for (const name of fieldNames) next[name] = found[name]
      return next
    })
    setTouched((prev) => {
      const next = { ...prev }
      for (const name of fieldNames) next[name] = true
      return next
    })
    const valid = Object.keys(found).length === 0
    if (!valid) focusFirstError(found)
    return valid
  }

  /** Submit handler: validate, simulate the request, then call onValid. */
  const handleSubmit = (onValid: (values: V) => void | Promise<void>) => async (event: FormEvent) => {
    event.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await simulateSubmit()
      await onValid(values)
    } finally {
      setSubmitting(false)
    }
  }

  /** Props for the demo field components. */
  const field = <K extends keyof V & string>(name: K) => ({
    name,
    value: values[name],
    error: errors[name],
    onChange: (value: V[K]) => setValue(name, value),
    onBlur: () => handleBlur(name),
  })

  const reset = (next: V = initialValues) => {
    setValues(next)
    setErrors({})
    setTouched({})
  }

  return {
    values,
    errors,
    submitting,
    formId,
    field,
    setValue,
    setValues,
    validate,
    handleSubmit,
    reset,
    hasErrors: Object.values(errors).some(Boolean),
  }
}
