'use client'

import { useState } from 'react'

import { DEMO_OTP } from '@/demo/config'

import { DummyForm } from './forms/DummyForm'
import { Logo } from './Logo'
import { cn } from './ui/cn'
import { Card } from './ui/layout'

type Tab = 'login' | 'register'

/** Dummy login/register card with tabs. Any valid details work; OTP hint shown. */
export const AuthForms = ({ initialTab = 'login' }: { initialTab?: Tab }) => {
  const [tab, setTab] = useState<Tab>(initialTab)
  const [method, setMethod] = useState<'phone' | 'email'>('phone')

  return (
    <Card className="mx-auto w-full max-w-md p-5 sm:p-8">
      <div className="mb-6 flex justify-center">
        <Logo size="lg" />
      </div>
      <div className="mb-6 grid grid-cols-2 rounded-[var(--radius-ui)] bg-surface-alt p-1" role="tablist">
        {(['login', 'register'] as const).map((t) => (
          <button
            aria-selected={tab === t}
            className={cn(
              'min-h-11 rounded-[var(--radius-ui)] text-sm font-medium',
              tab === t ? 'bg-surface text-ink shadow-sm' : 'text-muted',
            )}
            key={t}
            onClick={() => setTab(t)}
            role="tab"
            type="button"
          >
            {t === 'login' ? 'Login' : 'Register'}
          </button>
        ))}
      </div>

      {tab === 'login' ? (
        <>
          <div className="mb-4 flex gap-4 text-sm">
            <button
              className={cn('min-h-11', method === 'phone' ? 'font-semibold text-brand-green-dark' : 'text-muted')}
              onClick={() => setMethod('phone')}
              type="button"
            >
              Mobile + OTP
            </button>
            <button
              className={cn('min-h-11', method === 'email' ? 'font-semibold text-brand-green-dark' : 'text-muted')}
              onClick={() => setMethod('email')}
              type="button"
            >
              Email + password
            </button>
          </div>
          {method === 'phone' ? (
            <>
              <DummyForm
                action="login-phone"
                className="sm:grid-cols-1"
                collection="customers"
                fields={[
                  { name: 'phone', label: 'Mobile number', type: 'phone', required: true, full: true },
                  { name: 'otp', label: 'OTP', type: 'text', required: true, full: true, hint: `Demo OTP: ${DEMO_OTP}` },
                ]}
                key="phone"
                submitLabel="Log in"
                successHref="/account"
              />
            </>
          ) : (
            <DummyForm
              action="login-email"
              className="sm:grid-cols-1"
              collection="customers"
              fields={[
                { name: 'email', label: 'Email', type: 'email', required: true, full: true },
                { name: 'password', label: 'Password', type: 'password', required: true, full: true, hint: 'Any 6+ characters' },
              ]}
              key="email"
              submitLabel="Log in"
              successHref="/account"
            />
          )}
        </>
      ) : (
        <DummyForm
          action="register"
          className="sm:grid-cols-1"
          collection="customers"
          fields={[
            { name: 'name', label: 'Full name', type: 'name', required: true, full: true },
            { name: 'phone', label: 'Mobile number', type: 'phone', required: true, full: true },
            { name: 'email', label: 'Email', type: 'email', required: true, full: true },
            { name: 'password', label: 'Password', type: 'password', required: true, full: true },
            { name: 'terms', label: 'I accept the terms and privacy policy', type: 'checkbox', required: true },
          ]}
          submitLabel="Create account"
          successHref="/account"
        />
      )}
    </Card>
  )
}
