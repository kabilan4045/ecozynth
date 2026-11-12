'use client'

import { CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { indiaStates } from '@/demo/data/india-states'
import { makeReference } from '@/demo/format'
import { loginWithEmail, loginWithPhone, registerUser } from '@/demo/state/auth'
import { clearCart } from '@/demo/state/cart'
import { email, gstin, mobile, pincode, required, type FieldValue, type Validator } from '@/demo/validation'

import { ButtonLink } from '../ui/Button'
import { Card } from '../ui/layout'
import { cn } from '../ui/cn'
import {
  CheckboxField,
  CheckboxGroup,
  DateField,
  FileField,
  RadioGroup,
  SelectField,
  SubmitButton,
  TextareaField,
  TextField,
} from './Fields'
import { useDemoForm } from './useDemoForm'

export type DummyFieldType =
  | 'text'
  | 'name'
  | 'email'
  | 'phone'
  | 'pincode'
  | 'gstin'
  | 'password'
  | 'select'
  | 'state'
  | 'radio'
  | 'checkboxes'
  | 'checkbox'
  | 'textarea'
  | 'date'
  | 'file'

export type DummyField = {
  name: string
  label: string
  type: DummyFieldType
  required?: boolean
  options?: string[]
  /** Spans both columns on wider screens. */
  full?: boolean
  hint?: string
  defaultValue?: string
}

/** What happens after a successful submit (functions can't be passed from server pages). */
export type DummyFormAction = 'none' | 'login-phone' | 'login-email' | 'register' | 'checkout'

const initialFor = (field: DummyField): FieldValue => {
  if (field.type === 'checkboxes') return []
  if (field.type === 'checkbox') return false
  if (field.type === 'file') return null
  return field.defaultValue ?? ''
}

const rulesFor = (field: DummyField): Validator[] => {
  const rules: Validator[] = field.required ? [required()] : []
  if (field.type === 'email') rules.push(email())
  if (field.type === 'phone') rules.push(mobile())
  if (field.type === 'pincode') rules.push(pincode())
  if (field.type === 'gstin') rules.push(gstin())
  return rules
}

/**
 * Dummy form for the wireframe: renders fields from a config list, checks
 * required fields and formats, simulates sending, then shows a success panel.
 * Nothing is sent anywhere.
 */
export const DummyForm = ({
  fields,
  submitLabel = 'Submit',
  successTitle = 'Thank you! We have received your request.',
  successText = 'Lorem ipsum dolor sit amet. Our team will contact you within 24 hours.',
  referencePrefix,
  collection,
  action = 'none',
  successHref,
  className,
}: {
  fields: DummyField[]
  submitLabel?: string
  successTitle?: string
  successText?: string
  /** e.g. "CT" → reference "CT-482913". */
  referencePrefix?: string
  /** Future Payload collection this form will save to (documentation only). */
  collection?: string
  action?: DummyFormAction
  /** Navigate here after success instead of showing the success panel. */
  successHref?: string
  className?: string
}) => {
  const router = useRouter()
  const [reference, setReference] = useState<string | null>(null)

  const form = useDemoForm({
    initialValues: Object.fromEntries(fields.map((f) => [f.name, initialFor(f)])) as Record<string, FieldValue>,
    rules: Object.fromEntries(fields.map((f) => [f.name, rulesFor(f)])),
  })

  const onValid = (values: Record<string, FieldValue>) => {
    // TODO: connect to Payload collection `${collection}` (demo: nothing is sent).
    void collection
    const text = (name: string) => (typeof values[name] === 'string' ? (values[name] as string) : '')

    if (action === 'login-phone') loginWithPhone(text('phone'))
    if (action === 'login-email') loginWithEmail(text('email'))
    if (action === 'register') registerUser({ name: text('name'), phone: text('phone'), email: text('email') })
    if (action === 'checkout') clearCart()

    if (successHref) {
      router.push(successHref)
      return
    }
    setReference(referencePrefix ? makeReference(referencePrefix) : '')
  }

  if (reference !== null) {
    return (
      <Card className={cn('flex flex-col items-start gap-3 p-6', className)} role="status">
        <CheckCircle2 aria-hidden className="size-10 text-success" />
        <h2 className="text-xl font-semibold">{successTitle}</h2>
        {reference ? (
          <p>
            Reference number: <strong className="font-mono">{reference}</strong>
          </p>
        ) : null}
        <p className="text-muted">{successText}</p>
        <div className="mt-2 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <button
            className="min-h-11 px-2 text-brand-green-dark underline"
            onClick={() => {
              setReference(null)
              form.reset()
            }}
            type="button"
          >
            Submit another
          </button>
        </div>
      </Card>
    )
  }

  return (
    <form
      className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2', className)}
      id={form.formId}
      noValidate
      onSubmit={form.handleSubmit(onValid)}
    >
      {fields.map((field) => {
        const props = form.field(field.name)
        const common = {
          className: cn(field.full && 'sm:col-span-2'),
          hint: field.hint,
          label: field.label,
          name: field.name,
          required: field.required,
        }
        const str = typeof props.value === 'string' ? props.value : ''
        const onText = (value: string) => props.onChange(value)

        switch (field.type) {
          case 'select':
          case 'state':
            return (
              <SelectField
                {...common}
                error={props.error}
                key={field.name}
                onBlur={props.onBlur}
                onChange={onText}
                options={field.type === 'state' ? indiaStates : (field.options ?? [])}
                value={str}
              />
            )
          case 'radio':
            return (
              <RadioGroup
                {...common}
                className={cn('sm:col-span-2', common.className)}
                columns={2}
                error={props.error}
                key={field.name}
                onBlur={props.onBlur}
                onChange={onText}
                options={(field.options ?? []).map((o) => ({ value: o, label: o }))}
                value={str}
                variant="cards"
              />
            )
          case 'checkboxes':
            return (
              <CheckboxGroup
                {...common}
                className={cn('sm:col-span-2', common.className)}
                error={props.error}
                key={field.name}
                onBlur={props.onBlur}
                onChange={(value) => props.onChange(value)}
                options={field.options ?? []}
                value={Array.isArray(props.value) ? props.value : []}
              />
            )
          case 'checkbox':
            return (
              <CheckboxField
                className="sm:col-span-2"
                checked={props.value === true}
                error={props.error}
                key={field.name}
                label={field.label}
                name={field.name}
                onBlur={props.onBlur}
                onChange={(checked) => props.onChange(checked)}
              />
            )
          case 'textarea':
            return (
              <TextareaField
                {...common}
                className="sm:col-span-2"
                error={props.error}
                key={field.name}
                onBlur={props.onBlur}
                onChange={onText}
                value={str}
              />
            )
          case 'date':
            return (
              <DateField {...common} error={props.error} key={field.name} onBlur={props.onBlur} onChange={onText} value={str} />
            )
          case 'file':
            return (
              <FileField
                {...common}
                accept=".pdf,.jpg,.jpeg,.png"
                error={props.error}
                key={field.name}
                onBlur={props.onBlur}
                onChange={(file) => props.onChange(file)}
                value={props.value instanceof File ? props.value : null}
              />
            )
          default: {
            const typeProps =
              field.type === 'email'
                ? { type: 'email' as const, autoComplete: 'email' }
                : field.type === 'phone'
                  ? { type: 'tel' as const, inputMode: 'numeric' as const, autoComplete: 'tel-national', maxLength: 10, prefix: '+91' }
                  : field.type === 'pincode'
                    ? { type: 'tel' as const, inputMode: 'numeric' as const, autoComplete: 'postal-code', maxLength: 6 }
                    : field.type === 'password'
                      ? { type: 'password' as const, autoComplete: 'current-password' }
                      : field.type === 'name'
                        ? { autoComplete: 'name' }
                        : {}
            return (
              <TextField
                {...common}
                {...typeProps}
                error={props.error}
                key={field.name}
                onBlur={props.onBlur}
                onChange={onText}
                value={str}
              />
            )
          }
        }
      })}
      <div className="sm:col-span-2">
        <SubmitButton loading={form.submitting}>{submitLabel}</SubmitButton>
      </div>
    </form>
  )
}
