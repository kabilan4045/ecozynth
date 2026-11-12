'use client'

import { useState } from 'react'

import { calculateSolar, type PropertyType } from '@/demo/config'
import { formatINR, formatNumber } from '@/demo/format'

import { RadioGroup } from './forms/Fields'
import { ButtonLink } from './ui/Button'
import { Card } from './ui/layout'

/** Dummy calculator: bill slider + property type → live illustrative estimate. */
export const SolarCalculatorDemo = ({ compact = false }: { compact?: boolean }) => {
  const [bill, setBill] = useState(3000)
  const [propertyType, setPropertyType] = useState<PropertyType>('home')
  const result = calculateSolar({ mode: 'bill', monthlyBill: bill, monthlyUnits: 0, propertyType, roofAreaSqft: 0 })

  const rows = compact
    ? [
        ['Recommended system', `${formatNumber(result.systemKw)} kW`],
        ['Yearly savings', formatINR(result.yearlySavings)],
      ]
    : [
        ['Recommended system', `${formatNumber(result.systemKw)} kW`],
        ['Number of panels', String(result.panelCount)],
        ['Roof area needed', `${result.roofAreaNeededSqft} sq ft`],
        ['Estimated system cost', formatINR(result.systemCost)],
        ['Estimated subsidy', formatINR(result.subsidy)],
        ['Net cost', formatINR(result.netCost)],
        ['Monthly savings', formatINR(result.monthlySavings)],
        ['Yearly savings', formatINR(result.yearlySavings)],
        ['Payback period', `${result.paybackYears} years`],
        ['25-year savings', formatINR(result.lifetimeSavings)],
      ]

  return (
    <div className={compact ? '' : 'grid gap-6 lg:grid-cols-2'}>
      <Card className="flex flex-col gap-5 p-4 sm:p-6">
        <div>
          <label className="flex justify-between text-sm font-medium" htmlFor="bill-slider">
            <span>Monthly electricity bill</span>
            <span className="font-semibold">{formatINR(bill)}</span>
          </label>
          <input
            className="mt-3 h-11 w-full accent-brand-green-dark"
            id="bill-slider"
            max={20000}
            min={1000}
            onChange={(event) => setBill(Number(event.target.value))}
            step={500}
            type="range"
            value={bill}
          />
          <div className="flex justify-between text-xs text-muted">
            <span>₹1,000</span>
            <span>₹20,000</span>
          </div>
        </div>
        {!compact ? (
          <RadioGroup
            columns={2}
            label="Property type"
            name="property"
            onChange={(v) => setPropertyType(v as PropertyType)}
            options={[
              { value: 'home', label: 'Home' },
              { value: 'business', label: 'Business' },
            ]}
            value={propertyType}
            variant="cards"
          />
        ) : null}
      </Card>
      <Card className={compact ? 'mt-4 p-4' : 'p-4 sm:p-6'}>
        <dl aria-live="polite" className="divide-y divide-line">
          {rows.map(([label, value]) => (
            <div className="flex justify-between gap-4 py-2" key={label}>
              <dt className="text-muted">{label}</dt>
              <dd className="font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-muted">Illustrative estimate. Final figures after site survey.</p>
        <ButtonLink className="mt-4" fullWidth href={compact ? '/solar-calculator' : '/solar-quote'}>
          {compact ? 'Open full calculator' : 'Get exact quote'}
        </ButtonLink>
      </Card>
    </div>
  )
}
