'use client'

import { AlertCircle, Paperclip, X } from 'lucide-react'
import { useId, useRef, type ComponentProps, type ReactNode } from 'react'

import { Button } from '../ui/Button'
import { cn } from '../ui/cn'

/* ------------------------------------------------------------------ */
/* Shared styles                                                       */
/* ------------------------------------------------------------------ */

/** 16px text (no iOS zoom), 44px min height, token colours only. */
export const inputClasses = cn(
  'min-h-11 w-full rounded-[var(--radius-ui)] border border-line bg-surface px-3 text-base text-ink',
  'placeholder:text-muted',
  'focus:border-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green-light',
  'aria-invalid:border-danger aria-invalid:focus:ring-surface-hover',
  'disabled:cursor-not-allowed disabled:bg-surface-hover disabled:text-muted',
)

/** Forced focus look, used only on the style guide. */
const focusPreview = 'border-brand-green-dark ring-2 ring-brand-green-light'

type BaseFieldProps = {
  label: string
  name: string
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
  className?: string
  onBlur?: () => void
}

/** Label + control + hint + error, with ids wired for aria-describedby. */
export const FieldShell = ({
  id,
  label,
  error,
  hint,
  required,
  className,
  children,
  hideLabel = false,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
  children: ReactNode
  hideLabel?: boolean
}) => (
  <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
    <label className={cn('text-sm font-medium text-ink', hideLabel && 'sr-only')} htmlFor={id}>
      {label}
      {required ? (
        <span aria-hidden className="text-danger">
          {' '}
          *
        </span>
      ) : (
        <span className="font-normal text-muted"> (optional)</span>
      )}
    </label>
    {children}
    {hint && !error ? (
      <p className="text-sm text-muted" id={`${id}-hint`}>
        {hint}
      </p>
    ) : null}
    {error ? <FieldError id={`${id}-error`} message={error} /> : null}
  </div>
)

export const FieldError = ({ id, message }: { id: string; message: string }) => (
  <p className="flex items-start gap-1 text-sm text-danger" id={id}>
    <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
    {message}
  </p>
)

const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined

/* ------------------------------------------------------------------ */
/* Text input                                                          */
/* ------------------------------------------------------------------ */

type TextFieldProps = BaseFieldProps & {
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'search' | 'url'
  inputMode?: ComponentProps<'input'>['inputMode']
  autoComplete?: string
  placeholder?: string
  maxLength?: number
  /** Fixed text before the input, e.g. "+91". */
  prefix?: string
  /** Style guide only: show the focus style. */
  previewFocus?: boolean
}

export const TextField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  hint,
  required,
  disabled,
  className,
  type = 'text',
  inputMode,
  autoComplete,
  placeholder,
  maxLength,
  prefix,
  previewFocus,
}: TextFieldProps) => {
  const id = useId()
  const input = (
    <input
      aria-describedby={describedBy(id, error, hint)}
      aria-invalid={error ? true : undefined}
      autoComplete={autoComplete}
      className={cn(inputClasses, prefix && 'rounded-l-none', previewFocus && focusPreview)}
      disabled={disabled}
      id={id}
      inputMode={inputMode}
      maxLength={maxLength}
      name={name}
      onBlur={onBlur}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
    />
  )
  return (
    <FieldShell className={className} error={error} hint={hint} id={id} label={label} required={required}>
      {prefix ? (
        <div className="flex">
          <span className="inline-flex items-center rounded-l-[var(--radius-ui)] border border-r-0 border-line bg-surface-alt px-3 text-base text-muted">
            {prefix}
          </span>
          {input}
        </div>
      ) : (
        input
      )}
    </FieldShell>
  )
}

/* ------------------------------------------------------------------ */
/* Select (native for best mobile UX)                                  */
/* ------------------------------------------------------------------ */

export type Option = { value: string; label: string }

const toOptions = (options: (Option | string)[]): Option[] =>
  options.map((option) => (typeof option === 'string' ? { value: option, label: option } : option))

export const SelectField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  placeholder = 'Select…',
  error,
  hint,
  required,
  disabled,
  className,
  autoComplete,
}: BaseFieldProps & {
  value: string
  onChange: (value: string) => void
  options: (Option | string)[]
  placeholder?: string
  autoComplete?: string
}) => {
  const id = useId()
  return (
    <FieldShell className={className} error={error} hint={hint} id={id} label={label} required={required}>
      <select
        aria-describedby={describedBy(id, error, hint)}
        aria-invalid={error ? true : undefined}
        autoComplete={autoComplete}
        className={cn(inputClasses, 'appearance-auto pr-8')}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        value={value}
      >
        <option value="">{placeholder}</option>
        {toOptions(options).map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

/* ------------------------------------------------------------------ */
/* Textarea with optional character counter                            */
/* ------------------------------------------------------------------ */

export const TextareaField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  hint,
  required,
  disabled,
  className,
  rows = 4,
  minLength,
  maxLength,
  showCount = false,
  placeholder,
}: BaseFieldProps & {
  value: string
  onChange: (value: string) => void
  rows?: number
  minLength?: number
  maxLength?: number
  showCount?: boolean
  placeholder?: string
}) => {
  const id = useId()
  const count = value.trim().length
  return (
    <FieldShell className={className} error={error} hint={hint} id={id} label={label} required={required}>
      <textarea
        aria-describedby={cn(describedBy(id, error, hint), showCount && `${id}-count`) || undefined}
        aria-invalid={error ? true : undefined}
        className={cn(inputClasses, 'py-2.5')}
        disabled={disabled}
        id={id}
        maxLength={maxLength}
        name={name}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        value={value}
      />
      {showCount ? (
        <p
          aria-live="polite"
          className={cn('text-right text-xs', minLength && count < minLength ? 'text-muted' : 'text-success')}
          id={`${id}-count`}
        >
          {count}
          {maxLength ? ` / ${maxLength}` : ''} characters
          {minLength && count < minLength ? ` (minimum ${minLength})` : ''}
        </p>
      ) : null}
    </FieldShell>
  )
}

/* ------------------------------------------------------------------ */
/* Checkbox and checkbox group                                         */
/* ------------------------------------------------------------------ */

const checkClasses = 'size-5 shrink-0 accent-brand-green-dark disabled:cursor-not-allowed'

export const CheckboxField = ({
  label,
  name,
  checked,
  onChange,
  onBlur,
  error,
  disabled,
  className,
  description,
}: Omit<BaseFieldProps, 'required' | 'hint'> & {
  checked: boolean
  onChange: (checked: boolean) => void
  description?: ReactNode
}) => {
  const id = useId()
  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <label className="flex min-h-11 cursor-pointer items-start gap-3 py-2" htmlFor={id}>
        <input
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={error ? true : undefined}
          checked={checked}
          className={cn(checkClasses, 'mt-0.5')}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.checked)}
          type="checkbox"
        />
        <span className="text-base text-ink">
          {label}
          {description ? <span className="mt-0.5 block text-sm text-muted">{description}</span> : null}
        </span>
      </label>
      {error ? <FieldError id={`${id}-error`} message={error} /> : null}
    </div>
  )
}

export const CheckboxGroup = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
  hint,
  required,
  className,
  columns = 2,
}: BaseFieldProps & {
  value: string[]
  onChange: (value: string[]) => void
  options: (Option | string)[]
  columns?: 1 | 2 | 3
}) => {
  const id = useId()
  const toggle = (option: string) =>
    onChange(value.includes(option) ? value.filter((v) => v !== option) : [...value, option])
  return (
    <fieldset
      aria-describedby={describedBy(id, error, hint)}
      aria-invalid={error ? true : undefined}
      className={cn('flex min-w-0 flex-col gap-1.5', className)}
    >
      <legend className="mb-1 text-sm font-medium text-ink">
        {label}
        {required ? <span aria-hidden className="text-danger"> *</span> : null}
      </legend>
      <div
        className={cn(
          'grid gap-x-4',
          columns === 2 && 'sm:grid-cols-2',
          columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {toOptions(options).map((option) => (
          <label className="flex min-h-11 cursor-pointer items-center gap-3" key={option.value}>
            <input
              checked={value.includes(option.value)}
              className={checkClasses}
              name={name}
              onBlur={onBlur}
              onChange={() => toggle(option.value)}
              type="checkbox"
              value={option.value}
            />
            <span className="text-base">{option.label}</span>
          </label>
        ))}
      </div>
      {hint && !error ? (
        <p className="text-sm text-muted" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      {error ? <FieldError id={`${id}-error`} message={error} /> : null}
    </fieldset>
  )
}

/* ------------------------------------------------------------------ */
/* Radio group (stacked list or option cards)                          */
/* ------------------------------------------------------------------ */

export type RadioOption = Option & { description?: ReactNode; disabled?: boolean }

export const RadioGroup = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
  hint,
  required,
  className,
  variant = 'list',
  columns = 1,
}: BaseFieldProps & {
  value: string
  onChange: (value: string) => void
  options: RadioOption[]
  variant?: 'list' | 'cards'
  columns?: 1 | 2 | 3
}) => {
  const id = useId()
  return (
    <fieldset
      aria-describedby={describedBy(id, error, hint)}
      aria-invalid={error ? true : undefined}
      className={cn('flex min-w-0 flex-col gap-1.5', className)}
    >
      <legend className="mb-1 text-sm font-medium text-ink">
        {label}
        {required ? <span aria-hidden className="text-danger"> *</span> : null}
      </legend>
      <div
        className={cn(
          'grid gap-2',
          columns === 2 && 'sm:grid-cols-2',
          columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {options.map((option) => (
          <label
            className={cn(
              'flex min-h-11 cursor-pointer items-start gap-3',
              variant === 'cards' &&
                'rounded-[var(--radius-ui)] border border-line p-3 has-[:checked]:border-brand-green-dark has-[:checked]:bg-brand-green-light',
              option.disabled && 'cursor-not-allowed opacity-60',
            )}
            key={option.value}
          >
            <input
              checked={value === option.value}
              className={cn(checkClasses, 'mt-0.5')}
              disabled={option.disabled}
              name={name}
              onBlur={onBlur}
              onChange={() => onChange(option.value)}
              type="radio"
              value={option.value}
            />
            <span className="text-base">
              <span className="font-medium">{option.label}</span>
              {option.description ? (
                <span className="mt-0.5 block text-sm text-muted">{option.description}</span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
      {hint && !error ? (
        <p className="text-sm text-muted" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      {error ? <FieldError id={`${id}-error`} message={error} /> : null}
    </fieldset>
  )
}

/* ------------------------------------------------------------------ */
/* Date (native input)                                                 */
/* ------------------------------------------------------------------ */

export const DateField = ({
  min,
  max,
  ...props
}: Omit<TextFieldProps, 'type' | 'inputMode' | 'prefix' | 'maxLength' | 'placeholder'> & {
  min?: string
  max?: string
}) => {
  const id = useId()
  const { label, name, value, onChange, onBlur, error, hint, required, disabled, className } = props
  return (
    <FieldShell className={className} error={error} hint={hint} id={id} label={label} required={required}>
      <input
        aria-describedby={describedBy(id, error, hint)}
        aria-invalid={error ? true : undefined}
        className={inputClasses}
        disabled={disabled}
        id={id}
        max={max}
        min={min}
        name={name}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        type="date"
        value={value}
      />
    </FieldShell>
  )
}

/* ------------------------------------------------------------------ */
/* File input (client-side only, shows the chosen file name)           */
/* ------------------------------------------------------------------ */

export const FileField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  accept,
  error,
  hint,
  required,
  disabled,
  className,
}: BaseFieldProps & {
  value: File | null
  onChange: (file: File | null) => void
  accept?: string
}) => {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <FieldShell className={className} error={error} hint={hint} id={id} label={label} required={required}>
      <div
        className={cn(
          'flex flex-wrap items-center gap-3 rounded-[var(--radius-ui)] border border-dashed border-line p-3',
          error && 'border-danger',
        )}
      >
        <input
          accept={accept}
          aria-describedby={describedBy(id, error, hint)}
          aria-invalid={error ? true : undefined}
          className="sr-only"
          disabled={disabled}
          id={id}
          name={name}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
          ref={inputRef}
          type="file"
        />
        <Button disabled={disabled} onClick={() => inputRef.current?.click()} size="sm" variant="outline">
          <Paperclip aria-hidden className="size-4" />
          Choose file
        </Button>
        {value ? (
          <span className="flex min-w-0 items-center gap-1 text-sm">
            <span className="truncate">{value.name}</span>
            <button
              aria-label={`Remove ${value.name}`}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-ui)] text-muted hover:bg-surface-hover"
              onClick={() => {
                onChange(null)
                if (inputRef.current) inputRef.current.value = ''
              }}
              type="button"
            >
              <X aria-hidden className="size-4" />
            </button>
          </span>
        ) : (
          <span className="text-sm text-muted">No file chosen</span>
        )}
      </div>
    </FieldShell>
  )
}

/* ------------------------------------------------------------------ */
/* OTP input: 6 boxes, auto-advance, backspace, paste                  */
/* ------------------------------------------------------------------ */

export const OTPInput = ({
  value,
  onChange,
  length = 6,
  error,
  label = 'One-time password',
  name = 'otp',
  disabled,
}: {
  value: string
  onChange: (value: string) => void
  length?: number
  error?: string
  label?: string
  name?: string
  disabled?: boolean
}) => {
  const id = useId()
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const digits = Array.from({ length }, (_, i) => value[i] ?? '')

  const focusBox = (index: number) => refs.current[Math.max(0, Math.min(index, length - 1))]?.focus()

  const setDigits = (start: number, input: string) => {
    const clean = input.replace(/\D/g, '')
    if (!clean) return
    const next = digits.slice()
    clean
      .slice(0, length - start)
      .split('')
      .forEach((digit, offset) => {
        next[start + offset] = digit
      })
    onChange(next.join(''))
    focusBox(start + clean.length)
  }

  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined} className="flex min-w-0 flex-col gap-1.5">
      <legend className="mb-1 text-sm font-medium text-ink">{label}</legend>
      <div className="grid max-w-sm grid-cols-6 gap-2">
        {digits.map((digit, index) => (
          <input
            aria-invalid={error ? true : undefined}
            aria-label={`Digit ${index + 1} of ${length}`}
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            className={cn(inputClasses, 'h-12 min-w-0 px-0 text-center text-lg font-semibold')}
            disabled={disabled}
            inputMode="numeric"
            key={index}
            maxLength={length}
            name={index === 0 ? name : `${name}-${index}`}
            onChange={(event) => {
              const input = event.target.value
              if (input === '') {
                const next = digits.slice()
                next[index] = ''
                onChange(next.join(''))
                return
              }
              // Box already had a digit: keep only what was newly typed.
              const fresh = digit && input.length > 1 && input.startsWith(digit) ? input.slice(1) : input
              setDigits(index, fresh)
            }}
            onFocus={(event) => event.target.select()}
            onKeyDown={(event) => {
              if (event.key === 'Backspace' && !digits[index] && index > 0) focusBox(index - 1)
              if (event.key === 'ArrowLeft') focusBox(index - 1)
              if (event.key === 'ArrowRight') focusBox(index + 1)
            }}
            onPaste={(event) => {
              event.preventDefault()
              setDigits(index, event.clipboardData.getData('text'))
            }}
            ref={(element) => {
              refs.current[index] = element
            }}
            type="tel"
            value={digit}
          />
        ))}
      </div>
      {error ? <FieldError id={`${id}-error`} message={error} /> : null}
    </fieldset>
  )
}

/* ------------------------------------------------------------------ */
/* Form-level error and submit button                                  */
/* ------------------------------------------------------------------ */

export const FormError = ({ message }: { message?: string }) =>
  message ? (
    <div
      className="flex items-start gap-2 rounded-[var(--radius-ui)] border border-danger bg-surface p-3 text-sm text-danger"
      role="alert"
    >
      <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
      {message}
    </div>
  ) : null

export const SubmitButton = ({
  loading,
  children,
  fullWidth,
  className,
}: {
  loading?: boolean
  children: ReactNode
  fullWidth?: boolean
  className?: string
}) => (
  <Button className={className} fullWidth={fullWidth} loading={loading} size="lg" type="submit">
    {loading ? 'Please wait…' : children}
  </Button>
)
